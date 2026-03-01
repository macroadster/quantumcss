const fs = require('fs');
const path = require('path');
const { glob } = require('glob');
const { defaultTheme, utilityMaps } = require('./defaults');

const breakpoints = { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' };

function generateCSS(configPath) {
  const resolvedPath = path.resolve(configPath);
  if (fs.existsSync(resolvedPath)) delete require.cache[resolvedPath];
  const config = fs.existsSync(resolvedPath) ? require(resolvedPath) : { content: [], theme: {} };
  
  const theme = JSON.parse(JSON.stringify(defaultTheme || {}));
  theme.colors = theme.colors || {};
  theme.spacing = theme.spacing || {};
  theme.borderRadius = theme.borderRadius || {};
  theme.fontSize = theme.fontSize || {};
  theme.maxWidth = theme.maxWidth || {};
  theme.shadows = theme.shadows || {};

  if (config.theme && config.theme.extend) {
    const ext = config.theme.extend;
    if (ext.colors) Object.assign(theme.colors, ext.colors);
    if (ext.spacing) Object.assign(theme.spacing, ext.spacing);
    if (ext.borderRadius) Object.assign(theme.borderRadius, ext.borderRadius);
    if (ext.fontSize) Object.assign(theme.fontSize, ext.fontSize);
    if (ext.maxWidth) Object.assign(theme.maxWidth, ext.maxWidth);
    if (ext.boxShadow) Object.assign(theme.shadows, ext.boxShadow);
  }

  const flattenedColors = {};
  Object.entries(theme.colors).forEach(([name, value]) => {
    if (typeof value === 'string') flattenedColors[name] = value;
    else {
      Object.entries(value || {}).forEach(([shade, hex]) => { flattenedColors[`${name}-${shade}`] = hex; });
      if (value && value['500']) flattenedColors[name] = value['500'];
    }
  });

  function resolveColor(key) {
    if (!key) return null;
    if (flattenedColors[key]) return flattenedColors[key];
    if (key.includes('/')) {
      const [base, opacity] = key.split('/');
      const color = flattenedColors[base] || flattenedColors[`${base}-500`];
      if (color && color.startsWith('#')) {
        const r = parseInt(color.slice(1, 3), 16), g = parseInt(color.slice(3, 5), 16), b = parseInt(color.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${parseInt(opacity) / 100})`;
      }
    }
    return null;
  }

  const getRGBA = (color) => {
    if (!color || color === 'transparent') return 'rgba(0,0,0,0)';
    if (color.startsWith('rgba')) return color;
    if (color.startsWith('#')) {
      const hex = color.length === 4 ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}` : color;
      const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, 1)`;
    }
    return color;
  };

  const withOpacity = (rgba, alpha) => {
    if (!rgba.startsWith('rgba')) return rgba;
    return rgba.replace(/[\d.]+\)$/, `${alpha})`);
  };

  const files = (config.content || []).flatMap(p => glob.sync(p));
  const rawClasses = new Set();
  const classAttrRegex = /class="([^"]+)"/g;

  files.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      let match;
      while ((match = classAttrRegex.exec(content)) !== null) {
        match[1].split(/\s+/).forEach(cls => { if (cls) rawClasses.add(cls); });
      }
    } catch {
      // Ignore errors reading files
    }
  });

  const utilities = new Set();
  const responsiveUtils = { 
    sm: new Set(), md: new Set(), lg: new Set(), xl: new Set(), '2xl': new Set(),
    dark: new Set()
  };

  /**
   * Escapes a class name for use in a CSS selector
   * @param {string} cls - The raw class name
   * @returns {string} The escaped selector
   */
  const escapeSelector = (cls) => {
    return cls.replace(/([:[\]/.\\])/g, '\\$1');
  };

  const sideMap = {
    p: 'padding', pt: 'padding-top', pr: 'padding-right', pb: 'padding-bottom', pl: 'padding-left',
    px: ['padding-left', 'padding-right'], py: ['padding-top', 'padding-bottom'],
    m: 'margin', mt: 'margin-top', mr: 'margin-right', mb: 'margin-bottom', ml: 'margin-left',
    mx: ['margin-left', 'margin-right'], my: ['margin-top', 'margin-bottom'],
    w: 'width', h: 'height', top: 'top', right: 'right', bottom: 'bottom', left: 'left',
    'max-w': 'max-width', 'max-h': 'max-height', 'min-w': 'min-width', 'min-h': 'min-height',
    gap: 'gap', 'gap-x': 'column-gap', 'gap-y': 'row-gap'
  };

  function getRulesForClass(fullCls, processedPresets = new Set()) {
    let cls = fullCls, variant = null, breakpoint = null, isNeg = false;
    if (cls.startsWith('-')) { isNeg = true; cls = cls.substring(1); }
    const parts = cls.split(':');
    let currentPart = 0;
    while (currentPart < parts.length) {
      const p = parts[currentPart];
      if (breakpoints[p]) { breakpoint = p; }
      else if (p === 'dark') { breakpoint = 'dark'; }
      else if (p === 'light') { breakpoint = 'light'; }
      else if (['hover', 'focus', 'placeholder', 'group-hover'].includes(p)) { variant = p; }
      else { cls = parts.slice(currentPart).join(':'); break; }
      currentPart++;
    }

    // Check Presets (User Config & Defaults)
    const presetValue = (config.componentPresets && config.componentPresets[cls]) || (utilityMaps[cls] && typeof utilityMaps[cls] === 'string' ? utilityMaps[cls] : null);
    
    if (presetValue && !processedPresets.has(cls)) {
      processedPresets.add(cls);
      const presetClasses = presetValue.split(/\s+/);
      let allGroups = [];
      presetClasses.forEach(pCls => {
        const subGroups = getRulesForClass(pCls, new Set(processedPresets));
        if (subGroups) {
          subGroups.forEach(group => {
            allGroups.push({
              breakpoint: breakpoint || group.breakpoint,
              variant: variant || group.variant,
              rules: group.rules
            });
          });
        }
      });
      return allGroups;
    }

    let property = null, value = null, customSelector = null;
    if (utilityMaps[cls] && typeof utilityMaps[cls] === 'object') {
      const entry = utilityMaps[cls];
      if (!Array.isArray(entry)) { 
        property = entry.property; 
        value = entry.value; 
        if (entry.variant && !variant) variant = entry.variant;
      }
      else { property = entry; }
    }

    if (!property || !value) {
      const cParts = cls.split('-');
      let prefix = cParts[0], valKey = cParts.slice(1).join('-');
      
      if (cParts[0] === 'focus' && cParts[1] === 'glow') {
        prefix = 'focus-glow';
        valKey = cParts.slice(2).join('-');
      } else if ((prefix === 'max' || prefix === 'min' || prefix === 'gap' || prefix === 'gap-x' || prefix === 'gap-y') && cParts[1]) {
        if (['w', 'h', 'x', 'y'].includes(cParts[1])) {
          prefix = `${cParts[0]}-${cParts[1]}`;
          valKey = cParts.slice(2).join('-');
        }
      }

      if (prefix === 'text') {
        if (theme.fontSize[valKey]) { property = ['font-size', 'line-height']; value = [theme.fontSize[valKey], (valKey.includes('xl') || parseInt(valKey) >= 3) ? '1.2' : '1.5']; }
        else { const color = resolveColor(valKey); if (color) { property = 'color'; value = `${color} !important`; } }
      } else if (prefix === 'bg') {
        if (cParts[1] === 'gradient' && cParts[2] === 'to') {
          const dirMap = { r: 'to right', l: 'to left', t: 'to top', b: 'to bottom', tr: 'to top right', tl: 'to top left', br: 'to bottom right', bl: 'to bottom left' };
          const dir = dirMap[cParts[3]];
          if (dir) {
            property = 'background-image';
            value = `linear-gradient(${dir}, var(--q-gradient-stops))`;
            const rules = [
              '  --q-gradient-from-transparent: rgba(0,0,0,0);',
              '  --q-gradient-to-transparent: rgba(0,0,0,0);',
              `  ${property}: ${value} !important;`,
              '  --q-gradient-stops: var(--q-gradient-from, var(--q-gradient-from-transparent)), var(--q-gradient-to, var(--q-gradient-to-transparent));'
            ];
            return [{ breakpoint: null, variant: null, customSelector: null, rules }];
          }
        }
        const color = resolveColor(valKey); 
        if (color) { property = 'background-color'; value = `${color} !important`; } 
      } else if (prefix === 'from') {
        const color = resolveColor(valKey);
        if (color) {
          const rgba = getRGBA(color);
          property = ['--q-gradient-from', '--q-gradient-to', '--q-gradient-from-transparent', '--q-gradient-stops'];
          value = [rgba, withOpacity(rgba, 0), withOpacity(rgba, 0), 'var(--q-gradient-from), var(--q-gradient-to)'];
        }
      } else if (prefix === 'via') {
        const color = resolveColor(valKey);
        if (color) {
          const rgba = getRGBA(color);
          property = ['--q-gradient-to', '--q-gradient-to-transparent', '--q-gradient-stops'];
          value = [withOpacity(rgba, 0), withOpacity(rgba, 0), `var(--q-gradient-from), ${rgba}, var(--q-gradient-to)`];
        }
      } else if (prefix === 'to') {
        const color = resolveColor(valKey);
        if (color) { property = '--q-gradient-to'; value = getRGBA(color); }
      } else if (prefix === 'z') { 
        if (valKey.startsWith('[') && valKey.endsWith(']')) value = valKey.slice(1, -1);
        else value = isNeg ? `-${valKey}` : valKey;
        property = 'z-index';
      }
      else if (prefix === 'top') {
        property = 'top';
        if (valKey.startsWith('[') && valKey.endsWith(']')) value = valKey.slice(1, -1);
        else value = theme.spacing[valKey] || valKey;
      }
      else if (prefix === 'aspect') {
        property = ['aspect-ratio', 'width', 'height'];
        let ratio = 'auto';
        if (valKey.startsWith('[') && valKey.endsWith(']')) ratio = valKey.slice(1, -1).replace(/\//g, ' / ');
        else if (valKey === 'video') ratio = '16 / 9';
        else if (valKey === 'square') ratio = '1 / 1';
        else ratio = valKey.replace(/\//g, ' / ');
        value = [ratio, '100%', 'auto'];
      } else if (prefix === 'grid' && cParts[1] === 'cols') {
        property = 'grid-template-columns'; value = `repeat(${cParts[2]}, minmax(0, 1fr))`;
      } else if (prefix === 'col' && cParts[1] === 'span') {
        property = 'grid-column'; value = `span ${cParts[2]} / span ${cParts[2]}`;
      } else if (prefix === 'space') {
        const amount = theme.spacing[cParts[2]] || `${parseFloat(cParts[2]) * 0.25}rem`;
        const escaped = escapeSelector(fullCls);
        customSelector = `.${escaped} > * + *`;
        property = cParts[1] === 'y' ? 'margin-top' : 'margin-left';
        value = isNeg ? `-${amount}` : amount;
      } else if (prefix === 'rounded') {
        property = 'border-radius';
        if (valKey.startsWith('[') && valKey.endsWith(']')) value = valKey.slice(1, -1);
        else if (theme.borderRadius[valKey]) value = theme.borderRadius[valKey];
        else {
          const num = parseFloat(valKey);
          value = isNaN(num) ? '0.375rem' : `${num * 0.125}rem`;
        }
      } else if (prefix === 'scale') {
        property = 'transform';
        value = `scale(${parseFloat(valKey) / 100})`;
      } else if (prefix === 'transition') {
        property = 'transition-property';
        if (valKey === 'all') value = 'all';
        else if (valKey === 'colors') value = 'color, background-color, border-color, text-decoration-color, fill, stroke';
        else if (valKey === 'transform') value = 'transform';
        else value = valKey;
      } else if (prefix === 'duration') {
        property = 'transition-duration';
        value = `${valKey}ms`;
      } else if (prefix === 'backdrop' && cParts[1] === 'blur') {
        property = ['backdrop-filter', '-webkit-backdrop-filter'];
        const blurMap = { sm: '4px', md: '12px', lg: '16px', xl: '24px' };
        const blurVal = blurMap[cParts[2]] || (isNaN(parseInt(cParts[2])) ? '8px' : `${cParts[2]}px`);
        value = `blur(${blurVal})`;
      } else if (sideMap[prefix]) {
        property = sideMap[prefix];
        let v = valKey;
        if (v.startsWith('[') && v.endsWith(']')) v = v.slice(1, -1);
        else if (v.includes('/')) v = `${(parseFloat(v.split('/')[0]) / parseFloat(v.split('/')[1]) * 100).toFixed(2)}%`;
        else {
          // Priority: 1. Specific theme map (e.g. maxWidth for max-w) 2. spacing map 3. Numeric conversion 4. raw value
          const themeMap = prefix === 'max-w' ? theme.maxWidth : (theme[prefix] || theme.spacing);
          v = (themeMap && themeMap[v]) || theme.spacing[v] || (/^\d+(\.\d+)?$/.test(v) ? `${parseFloat(v) * 0.25}rem` : v);
        }
        value = isNeg ? (Array.isArray(v) ? v.map(x => `-${x}`) : `-${v}`) : v;
      } else if (prefix === 'shadow') {
        if (theme.shadows[valKey]) { property = 'box-shadow'; value = theme.shadows[valKey]; }
        else if (valKey === '') { property = 'box-shadow'; value = theme.shadows.md || '0 4px 6px -1px rgb(0 0 0 / 0.1)'; }
      } else if (prefix === 'border') {
        const color = resolveColor(valKey);
        if (color) { property = 'border-color'; value = color; }
        else if (['l', 'r', 't', 'b'].includes(cParts[1])) {
          const sideMapSide = { l: 'left', r: 'right', t: 'top', b: 'bottom' };
          property = [`border-${sideMapSide[cParts[1]]}-width`, 'border-style'];
          value = [`${cParts[2]}px`, 'solid'];
        } else if (!isNaN(parseInt(valKey))) { 
          property = ['border-width', 'border-style']; 
          value = [`${parseInt(valKey)}px`, 'solid']; 
        } else if (['solid', 'dashed', 'dotted', 'double', 'none'].includes(valKey)) {
          property = 'border-style'; value = valKey;
        }
      } else if (prefix === 'focus-glow') {
        const color = resolveColor(valKey) || resolveColor('primary') || '#00d4ff';
        const rgba = getRGBA(color);
        const glowColor = withOpacity(rgba, 0.5);
        const ringColor = withOpacity(rgba, 0.25);
        
        const rules = [
          '  outline: none !important;',
          `  box-shadow: 0 0 0 4px ${ringColor}, 0 0 30px ${glowColor} !important;`
        ];
        
        // Apply to both focus and active states for better interactive feedback
        return [
          { breakpoint, variant: variant || 'focus', customSelector, rules },
          { breakpoint, variant: 'active', customSelector, rules }
        ];
      }
    }

    if (property && value) {
      let rules = Array.isArray(property) ? property.map((p, i) => `  ${p}: ${Array.isArray(value) ? value[i] : value};`) : [`  ${property}: ${value};`];
      return [{ breakpoint, variant, customSelector, rules }];
    }
    return null;
  }

  function processClass(fullCls) {
    const groups = getRulesForClass(fullCls);
    if (!groups) return;

    // Merge groups with same selector (breakpoint + variant)
    const merged = new Map();
    groups.forEach(group => {
      const key = `${group.breakpoint || ''}|${group.variant || ''}|${group.customSelector || ''}`;
      if (!merged.has(key)) {
        merged.set(key, { ...group, rules: [...group.rules] });
      } else {
        merged.get(key).rules.push(...group.rules);
      }
    });

    merged.forEach(group => {
      const { breakpoint, variant, customSelector, rules } = group;
      const escapedFull = escapeSelector(fullCls);
      let selector = customSelector || `.${escapedFull}`;
      if (variant) { if (variant === 'group-hover') selector = `.group:hover ${selector}`; else selector += `:${variant}`}
      
      if (breakpoint === 'light') {
        const block = `html[data-theme="light"] ${selector}, body.light-mode ${selector} {
${rules.join('\n')}
}
`;
        utilities.add(block);
      } else if (breakpoint === 'dark') {
        const block = `html[data-theme="dark"] ${selector}, body.dark-mode ${selector} {
${rules.join('\n')}
}
`;
        utilities.add(block);
        // Also add to media query for system preference
        const mediaBlock = `${selector} {
${rules.join('\n')}
}
`;
        responsiveUtils['dark'].add(mediaBlock);
      } else {
        const block = `${selector} {
${rules.join('\n')}
}
`;
        if (breakpoint) responsiveUtils[breakpoint].add(block); else utilities.add(block);
      }
    });
  }

  rawClasses.forEach(processClass);

  let rootVariables = ':root {\n';
  
  // Recursively flatten theme for variables
  const generateVars = (obj, prefix = '') => {
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'string') {
        rootVariables += `  --q-${prefix}${key}: ${value};\n`;
      } else if (typeof value === 'object' && value !== null) {
        generateVars(value, `${prefix}${key}-`);
      }
    });
  };

  // Map theme keys to standard prefixes
  const themeMap = {
    colors: 'color-',
    spacing: 'space-',
    borderRadius: 'radius-',
    shadows: 'shadow-',
    fontSize: 'size-',
    maxWidth: 'max-w-'
  };

  Object.entries(themeMap).forEach(([themeKey, varPrefix]) => {
    if (theme[themeKey]) {
      generateVars(theme[themeKey], varPrefix);
    }
  });

  rootVariables += '}\n\n';

  let css = '/* Quantum CSS JIT Output */\n' + rootVariables + Array.from(utilities).join('\n');
  Object.entries(breakpoints).forEach(([name, width]) => {
    if (responsiveUtils[name] && responsiveUtils[name].size > 0) {
      css += `\n@media (min-width: ${width}) {\n${Array.from(responsiveUtils[name]).map(u => '  ' + u.replace(/\n/g, '\n  ')).join('\n').trimEnd()}\n}\n`;
    }
  });

  if (responsiveUtils.dark && responsiveUtils.dark.size > 0) {
    css += `\n@media (prefers-color-scheme: dark) {\n${Array.from(responsiveUtils.dark).map(u => '  ' + u.replace(/\n/g, '\n  ')).join('\n').trimEnd()}\n}\n`;
  }

  return css;
}

module.exports = { generateCSS };