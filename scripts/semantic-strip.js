const fs = require('fs');
const path = require('path');
const parse5 = require('parse5');

const UTILITY_PATTERNS = [
  /^flex$/, /^grid$/, /^block$/, /^inline-flex$/, /^hidden$/, /^static$/, /^relative$/, /^absolute$/, /^fixed$/, /^sticky$/,
  /^w-/, /^h-/, /^min-w-/, /^max-w-/, /^min-h-/, /^max-h-/,
  /^p-/, /^px-/, /^py-/, /^pt-/, /^pr-/, /^pb-/, /^pl-/, /^m-/, /^mx-/, /^my-/, /^mt-/, /^mr-/, /^mb-/, /^ml-/,
  /^gap-/, /^space-y-/, /^space-x-/,
  /^text-/, /^font-/, /^leading-/, /^tracking-/, /^uppercase$/, /^lowercase$/, /^capitalize$/,
  /^bg-/, /^bg-opacity-/, /^bg-gradient/,
  /^border/, /^border-t/, /^border-r/, /^border-b/, /^border-l/, /^rounded/, /^rounded-t/, /^rounded-b/, /^rounded-l/, /^rounded-r/, /^rounded-full/, /^rounded-xl/, /^rounded-lg/, /^rounded-md/, /^rounded-sm/,
  /^opacity-/, /^shadow/, /^shadow-lg/, /^shadow-xl/, /^shadow-md/, /^shadow-sm/,
  /^z-/, /^top-/, /^right-/, /^bottom-/, /^left-/, /^inset-/,
  /^overflow-/, /^visible$/, /^cursor-/,
  /^transition-/, /^duration-/, /^ease-/, /^transform$/, /^scale-/, /^rotate-/, /^translate-/,
  /^hover:/, /^focus:/, /^active:/, /^group-hover:/,
  /^md:/, /^lg:/, /^sm:/, /^xl:/, /^2xl:/, /^dark:/,
  /^whitespace-/, /^truncate$/, /^break-/, /^select-none$/,
  /^items-/, /^justify-/, /^self-/, /^order-/,
  /^aspect-/, /^object-/, /^cover$/, /^contain$/,
  /^sr-only$/, /^animate-/
];

const COMPONENT_PATTERNS = [
  /^starlight-card$/, /^starlight-navbar$/, /^btn-starlight$/, /^btn-primary$/, /^btn-outline$/, /^btn-ghost$/,
  /^avatar$/, /^badge$/, /^badge-count$/, /^badge-success$/, /^badge-error$/, /^badge-warning$/,
  /^input-starlight$/, /^checkbox-starlight$/, /^radio-starlight$/, /^toggle$/, /^range-starlight$/,
  /^chip$/, /^menu$/, /^toast$/, /^list$/, /^date-picker$/, /^pagination$/,
  /^glass$/, /^modal$/, /^dropdown$/, /^tab$/, /^accordion$/, /^alert$/, /^skeleton$/,
  /^btn-/, /^icon-btn$/
];

const LAYOUT_TAGS = ['header', 'nav', 'main', 'aside', 'section', 'footer', 'article'];
const LAYOUT_CLASSES = ['navbar', 'sidebar', 'hero', 'container', 'wrapper', 'grid', 'card'];

function isUtility(className) {
  return UTILITY_PATTERNS.some(p => p.test(className));
}

function isComponent(className) {
  return COMPONENT_PATTERNS.some(p => p.test(className));
}

function isStructural(className) {
  if (isUtility(className) || isComponent(className)) return false;
  if (className === 'container' || className === 'wrapper') return false; // These are utilities, not structural
  if (className === 'flex' || className === 'flex-col' || className === 'grid' || className === 'block') return false;
  
  const structuralPatterns = [
    /layout/, /wrapper/, /container/, /content/, /main/, /section/,
    /header/, /footer/, /nav$/, /nav-/, /sidebar/, /aside/, /feed/,
    /card/, /item$/, /list$/, /grid/, /row/, /column/, /col/,
    /hero/, /featured/, /trending/, /newsletter/, /testimonial/,
    /category/, /product/, /marquee/, /search/,
    /trust/, /social/, /notification/, /activity/, /video/, /track/,
    /chat/, /email/, /user/, /profile/, /theme/, /floating/,
    /stars-bg/, /site-wrapper/, /hero-content/, /hero-glow/, /hero-sub/, /hero-eyebrow/,
    /categories-section/, /products-section/, /featured-section/, /trending-section/,
    /testimonials-section/, /newsletter-section/, /marquee-section/,
    /footer-grid/, /footer-links/, /footer-col/, /footer-brand/, /footer-bottom/, /footer-desc/,
    /product-card/, /product-grid/, /product-image/, /product-info/, /product-badge/, /product-quick-add/, /product-name/, /product-price/, /product-rating/, /product-colors/,
    /featured-card/, /featured-content/, /featured-bg/, /featured-title/, /featured-desc/,
    /testimonial-card/, /testimonial-author/, /testimonial-quote/, /testimonial-text/,
    /newsletter-form/, /newsletter-input/, /newsletter-card/, /newsletter-title/, /newsletter-sub/,
    /marquee-track/, /marquee-item/, /marquee-dot/,
    /search-bar/, /search-bar-wrap/, /search-bar-input/, /search-icon-pos/,
    /floating-cart/, /floating-cta/, /trust-item/, /trust-icon/, /trust-text/,
    /activity-list/, /activity-item/, /notification-dot/, /notification-btn/,
    /video-card/, /video-thumbnail/, /video-duration/, /video-title/, /video-feed/, /video-grid/,
    /track-list/, /playlist/, /album/, /artist/, /icon-btn/,
    /btn-wishlist/, /btn-quick-add/, /btn-outline-glow/, /price-current/, /price-original/, /price-discount/,
    /color-swatch/, /product-img-placeholder/, /product-brand/,
    /section-header/, /section-title/, /view-all-link/, /section-label/,
    /categories-scroll/, /cat-pill/, /cat-pill-icon/,
    /user-menu/, /user-profile/, /profile-section/, /profile-header/,
    /t-avatar/, /t-name/, /t-handle/,
    /featured-float-icon/, /featured-glow/,
    /nav-brand/, /nav-links/, /nav-section/, /nav-item/, /nav-badge/, /nav-section-title/
  ];
  
  return structuralPatterns.some(p => p.test(className));
}

function getAllClasses(node) {
  if (!node.attrs) return [];
  const classAttr = node.attrs.find(a => a.name === 'class');
  if (!classAttr) return [];
  return classAttr.value.split(/\s+/).filter(c => c);
}

function classifyClasses(classes) {
  return {
    utilities: classes.filter(isUtility),
    components: classes.filter(isComponent),
    structural: classes.filter(isStructural),
    other: classes.filter(c => !isUtility(c) && !isComponent(c) && !isStructural(c))
  };
}

function findNearestLayoutParent(path) {
  for (let i = path.length - 1; i >= 0; i--) {
    const tag = path[i];
    if (LAYOUT_TAGS.includes(tag)) return tag;
  }
  for (let i = path.length - 1; i >= 0; i--) {
    const tag = path[i];
    if (LAYOUT_CLASSES.includes(tag)) return tag;
  }
  return null;
}

function buildSelector(templateName, tagName, classes, path, classified) {
  const structural = classified.structural;
  const components = classified.components;
  const hasLayoutParent = path.some(t => LAYOUT_TAGS.includes(t));
  
  let selector = '';
  
  if (structural.length > 0) {
    const primary = structural[0];
    if (hasLayoutParent || path.length <= 2) {
      selector = `html.${templateName} ${tagName}.${primary}`;
    } else {
      const layoutParent = findNearestLayoutParent(path);
      if (layoutParent) {
        selector = `html.${templateName} ${layoutParent} ${tagName}.${primary}`;
      } else {
        selector = `html.${templateName} ${tagName}.${primary}`;
      }
    }
  } else if (components.length > 0) {
    const primary = components[0];
    const layoutParent = findNearestLayoutParent(path);
    if (layoutParent) {
      selector = `html.${templateName} ${layoutParent} ${tagName}.${primary}`;
    } else {
      selector = `html.${templateName} ${tagName}.${primary}`;
    }
  }
  
  return selector;
}

function extractCSSProperties(classes, tagName) {
  const props = {};
  
  if (classes.includes('flex')) props.display = 'flex';
  else if (classes.includes('grid')) props.display = 'grid';
  else if (classes.includes('block')) props.display = 'block';
  else if (classes.includes('inline-flex')) props.display = 'inline-flex';
  else if (classes.includes('hidden')) props.display = 'none';
  
  if (classes.includes('flex-col')) props['flex-direction'] = 'column';
  if (classes.includes('flex-wrap')) props['flex-wrap'] = 'wrap';
  if (classes.includes('items-center')) props['align-items'] = 'center';
  if (classes.includes('items-start')) props['align-items'] = 'flex-start';
  if (classes.includes('items-end')) props['align-items'] = 'flex-end';
  if (classes.includes('justify-center')) props['justify-content'] = 'center';
  if (classes.includes('justify-between')) props['justify-content'] = 'space-between';
  if (classes.includes('justify-end')) props['justify-content'] = 'flex-end';
  if (classes.includes('justify-around')) props['justify-content'] = 'space-around';
  
  const gapMatch = classes.find(c => c.startsWith('gap-'));
  if (gapMatch) {
    const val = { '1': '0.25rem', '2': '0.5rem', '3': '0.75rem', '4': '1rem', '6': '1.5rem', '8': '2rem' }[gapMatch.replace('gap-', '')];
    if (val) props.gap = val;
  }
  
  const pMatch = classes.find(c => /^p-\d+$/.test(c));
  if (pMatch) {
    const val = { '1': '0.25rem', '2': '0.5rem', '3': '0.75rem', '4': '1rem', '5': '1.25rem', '6': '1.5rem', '8': '2rem' }[pMatch.replace('p-', '')];
    if (val) props.padding = val;
  }
  
  const mMatch = classes.find(c => /^m-\d+$/.test(c));
  if (mMatch) {
    const val = { '1': '0.25rem', '2': '0.5rem', '3': '0.75rem', '4': '1rem', '5': '1.25rem', '6': '1.5rem', '8': '2rem', 'auto': 'auto' }[mMatch.replace('m-', '')];
    if (val) props.margin = val;
  }
  
  if (classes.includes('mx-auto')) props.margin = '0 auto';
  
  const wMatch = classes.find(c => c.startsWith('w-'));
  if (wMatch) {
    const val = wMatch.replace('w-', '');
    if (val === 'full') props.width = '100%';
    else if (val === 'auto') props.width = 'auto';
    else if (val === '1/2') props.width = '50%';
    else if (val === '1/3') props.width = '33.333%';
    else if (val === '2/3') props.width = '66.666%';
    else if (val === '1/4') props.width = '25%';
    else if (val === '3/4') props.width = '75%';
    else if (val === 'screen') props.width = '100vw';
  }
  
  const hMatch = classes.find(c => c.startsWith('h-'));
  if (hMatch) {
    const val = hMatch.replace('h-', '');
    if (val === 'full') props.height = '100%';
    else if (val === 'screen') props.height = '100vh';
    else if (val === 'auto') props.height = 'auto';
  }
  
  const roundedMatch = classes.find(c => c.startsWith('rounded-'));
  if (roundedMatch) {
    const val = { 'none': '0', 'sm': '0.125rem', 'md': '0.375rem', 'lg': '0.5rem', 'xl': '0.75rem', '2xl': '1rem', '3xl': '1.5rem', 'full': '9999px' }[roundedMatch.replace('rounded-', '')];
    if (val) props['border-radius'] = val;
  }
  
  if (classes.includes('relative')) props.position = 'relative';
  if (classes.includes('absolute')) props.position = 'absolute';
  if (classes.includes('fixed')) props.position = 'fixed';
  if (classes.includes('sticky')) props.position = 'sticky';
  
  if (classes.includes('overflow-hidden')) props.overflow = 'hidden';
  if (classes.includes('overflow-auto')) props.overflow = 'auto';
  
  return props;
}

function walk(node, templateName, path = [], results = { css: new Map(), html: '' }) {
  if (!node || node.nodeName === '#document') return results;
  
  if (node.nodeName === '#text') {
    if (node.value.trim()) results.html += node.value;
    return results;
  }
  
  if (node.nodeName === '#comment') {
    return results;
  }
  
  const tagName = node.nodeName.toLowerCase();
  if (['script', 'style', 'link', 'meta', '!doctype'].includes(tagName)) {
    return results;
  }
  
  const classes = getAllClasses(node);
  const classified = classifyClasses(classes);
  
  let currentTag = tagName;
  let currentPath = [...path, currentTag];
  
  const keptClasses = [...classified.utilities, ...classified.other];
  
  results.html += `<${currentTag}`;
  if (keptClasses.length > 0) results.html += ` class="${keptClasses.join(' ')}"`;
  
  for (const attr of (node.attrs || [])) {
    if (attr.name === 'class') continue;
    results.html += ` ${attr.name}="${attr.value}"`;
  }
  results.html += '>';
  
  if ((classified.structural.length > 0 || classified.components.length > 0) && 
      currentTag !== 'body' && currentTag !== 'html') {
    const props = extractCSSProperties(classes, currentTag);
    const primaryClasses = [...classified.structural, ...classified.components];
    
    if (Object.keys(props).length > 0 && primaryClasses.length > 0) {
      const selector = buildSelector(templateName, currentTag, classes, currentPath, classified);
      const key = selector + ':' + JSON.stringify(props);
      
      if (!results.css.has(key)) {
        results.css.set(key, {
          selector,
          props,
          replaced: primaryClasses.join(', ')
        });
      }
    }
  }
  
  if (node.childNodes) {
    for (const child of node.childNodes) {
      walk(child, templateName, currentPath, results);
    }
  }
  
  results.html += `</${currentTag}>`;
  
  return results;
}

function processTemplate(inputPath, outputDir) {
  const inputFile = path.basename(inputPath);
  const templateName = inputFile.replace('.html', '').replace(/[^a-zA-Z0-9]/g, '');
  
  console.log(`Processing ${inputFile}...`);
  
  const html = fs.readFileSync(inputPath, 'utf-8');
  const document = parse5.parse(html);
  
  const results = { css: new Map(), html: '' };
  
  function findBody(node) {
    if (!node) return null;
    if (node.nodeName === 'body') return node;
    if (node.childNodes) {
      for (const child of node.childNodes) {
        const result = findBody(child);
        if (result) return result;
      }
    }
    return null;
  }
  
  const body = findBody(document);
  if (body?.childNodes) {
    for (const child of body.childNodes) {
      walk(child, templateName, ['body'], results);
    }
  }
  
  // Build full HTML document
  function getHeadContent(node) {
    if (!node) return '';
    if (node.nodeName === 'head') {
      return node.childNodes
        .filter(n => n.nodeName === '#text' || (n.nodeName === 'meta') || (n.nodeName === 'link') || (n.nodeName === 'title') || (n.nodeName === 'style'))
        .map(n => parse5.serialize({ ...node, childNodes: [n] }))
        .join('\n');
    }
    if (node.childNodes) {
      for (const child of node.childNodes) {
        const result = getHeadContent(child);
        if (result) return result;
      }
    }
    return '';
  }
  
  const headContent = getHeadContent(document);
  
  // Reconstruct full HTML
  const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
${headContent.replace(/<head>|<\/head>/g, '').split('\n').map(l => '    ' + l).join('\n')}
    <style>
/* Scoped styles for ${templateName} */
${Array.from(results.css.values()).map(rule => {
  const props = Object.entries(rule.props).map(([k, v]) => `  ${k}: ${v};`).join('\n');
  return `/* Replaces .${rule.replaced} */\n${rule.selector} {\n${props}\n}`;
}).join('\n\n')}
    </style>
</head>
<body>
${formatHTML(results.html)}
</body>
</html>`;

  const outputHTML = path.join(outputDir, `${templateName}-semantic.html`);
  const outputCSS = path.join(outputDir, `${templateName}-semantic.css`);
  
  fs.writeFileSync(outputHTML, fullHTML);
  
  const cssContent = Array.from(results.css.values()).map(rule => {
    const props = Object.entries(rule.props).map(([k, v]) => `  ${k}: ${v};`).join('\n');
    return `/* Replaces .${rule.replaced} */\n${rule.selector} {\n${props}\n}`;
  }).join('\n\n');
  
  fs.writeFileSync(outputCSS, cssContent);
  
  console.log(`  -> HTML: ${outputHTML}`);
  console.log(`  -> CSS: ${outputCSS}`);
  console.log(`  -> ${results.css.size} unique CSS rules`);
  
  return { html: outputHTML, css: outputCSS, rules: results.css.size };
}

function formatHTML(html) {
  // Simple indentation formatter
  let indent = 0;
  const lines = [];
  const tokens = html.split(/(<[^>]+>)/g).filter(Boolean);
  
  for (const token of tokens) {
    if (token.match(/^<\/\w/)) {
      indent--;
    }
    lines.push('  '.repeat(Math.max(0, indent)) + token);
    if (token.match(/^<\w+[^>]*>$/) && !token.match(/^<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)\b/i)) {
      indent++;
    }
  }
  
  return lines.join('\n').replace(/^\s+$/gm, '').trim();
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const inputPath = args[0] || './examples/shopping.html';
  const outputDir = args[1] || './examples/research/shopping';
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  processTemplate(path.resolve(inputPath), path.resolve(outputDir));
}

module.exports = { processTemplate, classifyClasses, extractCSSProperties };
