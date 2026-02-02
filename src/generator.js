const fs = require('fs');
const path = require('path');
const { glob } = require('glob');
const { defaultTheme, utilityMaps } = require('./defaults');

const breakpoints = { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' };

function generateCSS(configPath) {
  const resolvedPath = path.resolve(configPath);
  let config = { content: [], theme: { extend: {} } };
  
  if (fs.existsSync(resolvedPath)) {
    try {
      delete require.cache[resolvedPath];
      config = require(resolvedPath);
    } catch (e) {}
  }
  
  const theme = JSON.parse(JSON.stringify(defaultTheme));
  if (config.theme && config.theme.extend) {
    const ext = config.theme.extend;
    if (ext.colors) Object.assign(theme.colors, ext.colors);
    if (ext.spacing) Object.assign(theme.spacing, ext.spacing);
    if (ext.fontSize) Object.assign(theme.fontSize, ext.fontSize);
  }

  const flattenedColors = {};
  Object.entries(theme.colors).forEach(([name, value]) => {
    if (typeof value === 'string') flattenedColors[name] = value;
    else {
      Object.entries(value).forEach(([shade, hex]) => { flattenedColors[`${name}-${shade}`] = hex; });
      if (value['500']) flattenedColors[name] = value['500'];
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

  const files = (config.content || []).flatMap(p => glob.sync(p));
  const rawClasses = new Set();
  const classRegex = /class="([^"]+)"/g;

  files.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      let match;
      while ((match = classRegex.exec(content)) !== null) {
        match[1].split(/\s+/).forEach(cls => { if (cls) rawClasses.add(cls); });
      }
    } catch (e) {}
  });

  const utilities = new Set();
  const responsiveUtils = { sm: new Set(), md: new Set(), lg: new Set(), xl: new Set() };

  function processClass(fullCls) {
    let cls = fullCls, variant = null, breakpoint = null, isNeg = false;
    if (cls.startsWith('-')) { isNeg = true; cls = cls.substring(1); }
    const parts = cls.split(':');
    let currentPart = 0;
    while (currentPart < parts.length) {
      const p = parts[currentPart];
      if (breakpoints[p]) { breakpoint = p; }
      else if (['hover', 'focus', 'placeholder', 'group-hover'].includes(p)) { variant = p; }
      else { cls = parts.slice(currentPart).join(':'); break; }
      currentPart++;
    }

    let property = null, value = null, customSelector = null;
    if (utilityMaps[cls]) {
      const entry = utilityMaps[cls];
      if (typeof entry === 'object' && !Array.isArray(entry)) { property = entry.property; value = entry.value; }
      else { property = entry; }
    }

    if (!property || !value) {
      const cParts = cls.split('-');
      const prefix = cParts[0], valKey = cParts.slice(1).join('-');

      if (prefix === 'text') {
        if (theme.fontSize[valKey]) { property = ['font-size', 'line-height']; value = [theme.fontSize[valKey], (valKey.includes('xl') || parseInt(valKey) >= 3) ? '1.2' : '1.5']; }
        else { const color = resolveColor(valKey); if (color) { property = 'color'; value = color; } }
      } else if (prefix === 'bg') { const color = resolveColor(valKey); if (color) { property = 'background-color'; value = color; } }
      else if (prefix === 'z') { property = 'z-index'; value = isNeg ? `-${valKey}` : valKey; }
      else if (prefix === 'aspect') {
        property = ['aspect-ratio', 'width'];
        let ratio = 'auto';
        if (valKey.startsWith('[') && valKey.endsWith(']')) ratio = valKey.slice(1, -1).replace(/\//g, ' / ');
        else if (valKey === 'video') ratio = '16 / 9';
        else if (valKey === 'square') ratio = '1 / 1';
        else ratio = valKey.replace(/\//g, ' / ');
        value = [ratio, '100%'];
      } else if (prefix === 'grid' && cParts[1] === 'cols') {
        property = 'grid-template-columns'; value = `repeat(${cParts[2]}, minmax(0, 1fr))`;
      } else if (prefix === 'col' && cParts[1] === 'span') {
        property = 'grid-column'; value = `span ${cParts[2]} / span ${cParts[2]}`;
      } else if (prefix === 'gap') {
        const dirMap = { x: 'column-gap', y: 'row-gap' };
        property = dirMap[cParts[1]] || 'gap';
        const v = dirMap[cParts[1]] ? cParts[2] : valKey;
        value = theme.spacing[v] || v;
      } else if (prefix === 'space') {
        const amount = theme.spacing[cParts[2]] || (cParts[2] ? `${parseInt(cParts[2]) * 0.25}rem` : '0px');
        const escaped = fullCls.replace(/([:[\]\/])/g, '\\$1');
        customSelector = `.${escaped} > * + *`;
        property = cParts[1] === 'y' ? 'margin-top' : 'margin-left';
        value = isNeg ? `-${amount}` : amount;
      } else if (prefix === 'rounded') {
        property = 'border-radius';
        if (valKey === 'lg') value = '0.5rem'; else if (valKey === 'full') value = '9999px';
        else if (valKey === 'md') value = '0.375rem';
        else value = theme.spacing[valKey] || (valKey ? `${parseInt(valKey) * 0.125}rem` : '0.25rem');
      } else if (['w', 'h', 'p', 'm', 'pt', 'pr', 'pb', 'pl', 'px', 'py', 'mt', 'mr', 'mb', 'ml', 'mx', 'my', 'top', 'right', 'bottom', 'left'].includes(prefix)) {
        const sideMap = { 
          pt: 'padding-top', pr: 'padding-right', pb: 'padding-bottom', pl: 'padding-left', px: ['padding-left', 'padding-right'], py: ['padding-top', 'padding-bottom'],
          mt: 'margin-top',mr: 'margin-right', mb: 'margin-bottom', ml: 'margin-left', mx: ['margin-left', 'margin-right'], my: ['margin-top', 'margin-bottom'],
          p: 'padding', m: 'margin', w: 'width', h: 'height', top: 'top', right: 'right', bottom: 'bottom', left: 'left' 
        };
        property = sideMap[prefix] || prefix;
        let v = valKey;
        if (v.startsWith('[') && v.endsWith(']')) v = v.slice(1, -1);
        else if (v.includes('/')) v = `${(parseInt(v.split('/')[0])/parseInt(v.split('/')[1])*100).toFixed(2)}%`;
        else v = theme.spacing[v] || v;
        value = isNeg ? (Array.isArray(v) ? v.map(x => `-${x}`) : `-${v}`) : v;
      } else if (prefix === 'border') {
        const color = resolveColor(valKey);
        if (color) { property = 'border-color'; value = color; }
        else if (['l', 'r', 't', 'b'].includes(cParts[1])) {
          const sideMap = { l: 'left', r: 'right', t: 'top', b: 'bottom' };
          property = `border-${sideMap[cParts[1]]}-width`;
          value = `${cParts[2]}px`;
        } else if (!isNaN(parseInt(valKey))) { property = 'border-width'; value = `${parseInt(valKey)}px`; }
      }
    }

    if (property && value) {
      const escapedFull = fullCls.replace(/([:[\]\/])/g, '\\$1');
      let selector = customSelector || `.${escapedFull}`;
      if (variant) {
        if (variant === 'group-hover') selector = `.group:hover ${selector}`;
        else selector += `:${variant}`;
      }
      let rules = Array.isArray(property) ? property.map((p, i) => `  ${p}: ${Array.isArray(value) ? value[i] : value};`).join('\n') : `  ${property}: ${value};`;
      const block = `${selector} {
${rules}
}
`;
      if (breakpoint) responsiveUtils[breakpoint].add(block); else utilities.add(block);
    }
  }

  rawClasses.forEach(processClass);
  let css = '/* Quantum CSS JIT Output */\n' + Array.from(utilities).join('\n');
  Object.entries(breakpoints).forEach(([name, width]) => {
    if (responsiveUtils[name].size > 0) {
      css += `\n@media (min-width: ${width}) {\n${Array.from(responsiveUtils[name]).map(u => '  ' + u.replace(/\n/g, '\n  ')).join('\n').trimEnd()}\n}\n`;
    }
  });
  return css;
}

module.exports = { generateCSS };