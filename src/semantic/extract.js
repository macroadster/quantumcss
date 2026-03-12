const fs = require('fs');
const path = require('path');
const parse5 = require('parse5');

// Load rules
const rulesPath = path.join(__dirname, 'rules.json');
const rules = JSON.parse(fs.readFileSync(rulesPath, 'utf8'));

// Helper to find nodes
function findNode(node, predicate) {
    if (predicate(node)) return node;
    if (node.childNodes) {
        for (const child of node.childNodes) {
            const result = findNode(child, predicate);
            if (result) return result;
        }
    }
    return null;
}

// Helper to extract attributes
function getAttr(node, name) {
    return (node.attrs || []).find(a => a.name === name)?.value;
}

// Helper to set attributes
function setAttr(node, name, value) {
    node.attrs = node.attrs || [];
    const existing = node.attrs.find(a => a.name === name);
    if (existing) {
        existing.value = value;
    } else {
        node.attrs.push({ name, value });
    }
}

// Transform a specific node based on rules
function transformNode(node, ruleSet, options = {}) {
    if (!node.tagName) return;

    const classVal = getAttr(node, 'class');
    const classes = classVal ? classVal.split(/\s+/) : [];
    
    let matchedRule = null;
    
    // Check if any rule applies
    for (const rule of ruleSet) {
        if (classes.includes(rule.selector.replace('.', ''))) {
            matchedRule = rule;
            break;
        }
    }

    if (matchedRule) {
        const rule = matchedRule;
        // Apply transformation
        if (rule.tag) node.tagName = rule.tag;
        
        // Handle attributes removal
        if (rule.removeAttributes) {
            node.attrs = (node.attrs || []).filter(a => !rule.removeAttributes.includes(a.name));
        }

        // Remove the matched class
        let newClasses = classes.filter(c => c !== rule.selector.replace('.', ''));
        
        if (rule.stripClasses) {
            newClasses = []; // Clear all classes
        }

        // Add new class if specified
        if (rule.addClass) {
            newClasses.push(rule.addClass);
        }

        if (newClasses.length > 0) {
            setAttr(node, 'class', newClasses.join(' '));
        } else {
            // Remove class attribute entirely if empty
            node.attrs = (node.attrs || []).filter(a => a.name !== 'class');
        }

        // Keep specific attributes if defined
        if (rule.keepAttributes) {
             node.attrs = (node.attrs || []).filter(a => rule.keepAttributes.includes(a.name) || (a.name === 'class' && newClasses.length > 0));
        } else {
             node.attrs = (node.attrs || []).filter(a => 
                a.name === 'class' || 
                a.name.startsWith('data-') || 
                a.name.startsWith('aria-') ||
                (rule.keepAttributes && rule.keepAttributes.includes(a.name)) ||
                !rule.removeAttributes?.includes(a.name)
            );
        }
    } else if (options.aggressiveStrip) {
        // No rule matched, but we want to strip classes
        let keptClasses = [];
        if (options.keepClasses && classes.length > 0) {
            keptClasses = classes.filter(c => options.keepClasses.includes(c));
        }
        
        if (keptClasses.length > 0) {
            setAttr(node, 'class', keptClasses.join(' '));
        } else {
            // Remove class attribute entirely
            node.attrs = (node.attrs || []).filter(a => a.name !== 'class');
        }
    }

    // Recurse
    if (node.childNodes) {
        node.childNodes.forEach(child => transformNode(child, ruleSet, options));
    }
}

function matchesSelector(node, selector) {
    if (!node.tagName) return false;

    if (selector.startsWith('.')) {
        const className = selector.slice(1);
        const classVal = getAttr(node, 'class');
        return classVal && classVal.split(/\s+/).includes(className);
    }

    if (selector.startsWith('[')) {
        // Simple attribute matcher: [attr="value"] or [attr]
        const match = selector.match(/\[([\w-]+)(?:="([^"]*)")?\]/);
        if (!match) return false;
        const [, attrName, attrValue] = match;
        const actualValue = getAttr(node, attrName);
        if (attrValue === undefined) return false; // Attribute not present
        if (attrValue !== undefined && !match[2]) return true; // [attr] match
        return actualValue === attrValue;
    }

    // Tag match
    return node.tagName === selector.toLowerCase();
}

// Helper to get nth-of-type index
function getNthOfType(node) {
    if (!node.parentNode) return 1;
    const siblings = (node.parentNode.childNodes || []).filter(n => n.tagName === node.tagName);
    if (siblings.length <= 1) return '';
    const index = siblings.indexOf(node) + 1;
    return `:nth-of-type(${index})`;
}

// Transform a specific node based on rules
function transformNode(node, ruleSet, options = {}, styles = [], currentPath = '') {
    if (!node.tagName) return;

    const classVal = getAttr(node, 'class');
    const classes = classVal ? classVal.split(/\s+/) : [];
    
    let matchedRule = null;
    
    // Check if any rule applies
    for (const rule of ruleSet) {
        if (classes.includes(rule.selector.replace('.', ''))) {
            matchedRule = rule;
            break;
        }
    }

    let nodeSelector = currentPath; // Default if not changing
    let shouldLog = false;
    let originalClasses = classes.join(' ');

    if (matchedRule) {
        const rule = matchedRule;
        // Apply transformation
        if (rule.tag) node.tagName = rule.tag;
        
        nodeSelector = `${currentPath} > ${node.tagName}`;
        if (options.useNthChild) nodeSelector += getNthOfType(node);

        // Handle attributes removal
        if (rule.removeAttributes) {
            node.attrs = (node.attrs || []).filter(a => !rule.removeAttributes.includes(a.name));
        }

        // Remove the matched class
        let newClasses = classes.filter(c => c !== rule.selector.replace('.', ''));
        
        if (rule.stripClasses) {
            newClasses = []; // Clear all classes
            shouldLog = true;
        }

        // Add new class if specified
        if (rule.addClass) {
            newClasses.push(rule.addClass);
            nodeSelector += `.${rule.addClass}`;
        }

        if (newClasses.length > 0) {
            setAttr(node, 'class', newClasses.join(' '));
        } else {
            // Remove class attribute entirely if empty
            node.attrs = (node.attrs || []).filter(a => a.name !== 'class');
        }

        // Keep specific attributes if defined
        if (rule.keepAttributes) {
             node.attrs = (node.attrs || []).filter(a => rule.keepAttributes.includes(a.name) || (a.name === 'class' && newClasses.length > 0));
        } else {
             node.attrs = (node.attrs || []).filter(a => 
                a.name === 'class' || 
                a.name.startsWith('data-') || 
                a.name.startsWith('aria-') ||
                (rule.keepAttributes && rule.keepAttributes.includes(a.name)) ||
                !rule.removeAttributes?.includes(a.name)
            );
        }
        
        if (shouldLog && originalClasses) {
             styles.push({ selector: nodeSelector, original: originalClasses, type: 'rule' });
        }

    } else if (options.aggressiveStrip) {
        // No rule matched, but we want to strip classes
        let keptClasses = [];
        if (options.keepClasses && classes.length > 0) {
            keptClasses = classes.filter(c => options.keepClasses.includes(c));
        }
        
        if (keptClasses.length > 0) {
            setAttr(node, 'class', keptClasses.join(' '));
            // Log if we stripped something
            if (keptClasses.length < classes.length) {
                styles.push({ selector: `${currentPath} > ${node.tagName}${getNthOfType(node)}`, original: classes.join(' '), type: 'stripped' });
            }
        } else {
            // Remove class attribute entirely
            if (classes.length > 0) {
                 styles.push({ selector: `${currentPath} > ${node.tagName}${getNthOfType(node)}`, original: classes.join(' '), type: 'stripped' });
            }
            node.attrs = (node.attrs || []).filter(a => a.name !== 'class');
        }
    } else {
        // Just update path for children traversal
        // If we didn't match a rule and didn't strip, the path might be ambiguous or we just append tag
        // Ideally we only track path for semantic components
        nodeSelector = `${currentPath} > ${node.tagName}`;
    }

    // Recurse
    if (node.childNodes) {
        node.childNodes.forEach(child => transformNode(child, ruleSet, options, styles, nodeSelector));
    }
}

function processComponent(htmlFile, templateName, componentName, outputFile) {
    const htmlContent = fs.readFileSync(htmlFile, 'utf8');
    const doc = parse5.parse(htmlContent);
    
    const config = rules[templateName]?.components[componentName];
    if (!config) {
        console.error(`No configuration found for template: ${templateName}, component: ${componentName}`);
        return;
    }

    const rootNode = findNode(doc, n => matchesSelector(n, config.selector));

    if (!rootNode) {
        console.error(`Could not find root node with selector: ${config.selector}`);
        return;
    }

    // Apply transformations
    if (config.targetTag) rootNode.tagName = config.targetTag;
    
    // Remove the structural root class if it was a class selector
    let rootOriginalClasses = '';
    if (config.selector.startsWith('.')) {
        const rootSelector = config.selector.slice(1);
        const rootClasses = (getAttr(rootNode, 'class') || '').split(/\s+/);
        rootOriginalClasses = rootClasses.join(' ');
        const newRootClasses = rootClasses.filter(c => c !== rootSelector);
        if (newRootClasses.length > 0) setAttr(rootNode, 'class', newRootClasses.join(' '));
        else rootNode.attrs = rootNode.attrs.filter(a => a.name !== 'class');
    }

    const collectedStyles = [];
    const rootPath = `html.${templateName} ${config.targetTag}`;
    
    // Log root style
    if (rootOriginalClasses) {
        collectedStyles.push({ selector: rootPath, original: rootOriginalClasses, type: 'root' });
    }

    // Transform children
    transformNode(rootNode, config.rules || [], { 
        aggressiveStrip: config.aggressiveStrip,
        keepClasses: config.keepClasses,
        useNthChild: true // Enable for better CSS selectors
    }, collectedStyles, rootPath);


    // Serialize just this node
    const fragment = parse5.serialize({ childNodes: [rootNode] });
    
    // Output CSS
    const logOutput = (logger) => {
        logger(`/* Semantic CSS for ${templateName} ${componentName} */`);
        // Deduplicate styles by selector? Or just list them?
        // Listing is better so we see all occurrences.
        collectedStyles.forEach(style => {
            logger(`${style.selector} {`);
            logger(`  /* Original: ${style.original} */`);
            logger(`}`);
        });
    };

    if (outputFile) {
        fs.writeFileSync(outputFile, fragment);
        console.error(`HTML written to ${outputFile}`);
        logOutput(console.log); // CSS to stdout
    } else {
        console.log(fragment); // HTML to stdout
        console.error(`\n/* CSS Snippet Suggestion */`);
        logOutput(console.error); // CSS to stderr
    }
}

// CLI usage
const [,, file, template, component, outputFile] = process.argv;
if (file && template && component) {
    processComponent(file, template, component, outputFile);
} else {
    console.error("Usage: node extract.js <file> <template> <component> [output_html_file]");
}
