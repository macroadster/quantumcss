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

  if (config.theme && config.theme.extend) {
    const ext = config.theme.extend;
    if (ext.colors) Object.assign(theme.colors, ext.colors);
    if (ext.spacing) Object.assign(theme.spacing, ext.spacing);
    if (ext.borderRadius) Object.assign(theme.borderRadius, ext.borderRadius);
    if (ext.fontSize) Object.assign(theme.fontSize, ext.fontSize);
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
    } catch (e) {}
  });

  const utilities = new Set();
  const responsiveUtils = { sm: new Set(), md: new Set(), lg: new Set(), xl: new Set(), '2xl': new Set() };

  const sideMap = {
    p: 'padding', pt: 'padding-top', pr: 'padding-right', pb: 'padding-bottom', pl: 'padding-left',
    px: ['padding-left', 'padding-right'], py: ['padding-top', 'padding-bottom'],
    m: 'margin', mt: 'margin-top', mr: 'margin-right', mb: 'margin-bottom', ml: 'margin-left',
    mx: ['margin-left', 'margin-right'], my: ['margin-top', 'margin-bottom'],
    w: 'width', h: 'height', top: 'top', right: 'right', bottom: 'bottom', left: 'left',
    'max-w': 'max-width', 'max-h': 'max-height', 'min-w': 'min-width', 'min-h': 'min-height',
    gap: 'gap', 'gap-x': 'column-gap', 'gap-y': 'row-gap'
  };

  function getRulesForClass(fullCls) {
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

    // Check Presets
    if (config.componentPresets && config.componentPresets[cls]) {
      const presetClasses = config.componentPresets[cls].split(/\s+/);
      let allGroups = [];
      presetClasses.forEach(pCls => {
        const subGroups = getRulesForClass(pCls);
        if (subGroups) {
          subGroups.forEach(group => {
            // Apply the preset's own breakpoint/variant to sub-groups if they don't have one?
            // Actually, usually presets are used as base classes.
            // If someone does md:btn-primary, we want the md: to apply to all rules in the preset.
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
    if (utilityMaps[cls]) {
      const entry = utilityMaps[cls];
      if (typeof entry === 'object' && !Array.isArray(entry)) { property = entry.property; value = entry.value; }
      else { property = entry; }
    }

    if (!property || !value) {
      const cParts = cls.split('-');
      let prefix = cParts[0], valKey = cParts.slice(1).join('-');
      
      if ((prefix === 'max' || prefix === 'min' || prefix === 'gap' || prefix === 'gap-x' || prefix === 'gap-y') && cParts[1]) {
        if (['w', 'h', 'x', 'y'].includes(cParts[1])) {
          prefix = `${cParts[0]}-${cParts[1]}`;
          valKey = cParts.slice(2).join('-');
        }
      }

      if (prefix === 'text') {
        if (theme.fontSize[valKey]) { property = ['font-size', 'line-height']; value = [theme.fontSize[valKey], (valKey.includes('xl') || parseInt(valKey) >= 3) ? '1.2' : '1.5']; }
        else { const color = resolveColor(valKey); if (color) { property = 'color'; value = color; } }
      } else if (prefix === 'bg') { const color = resolveColor(valKey); if (color) { property = 'background-color'; value = color; } }
      else if (prefix === 'z') { property = 'z-index'; value = isNeg ? `-${valKey}` : valKey; }
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
        const amount = theme.spacing[cParts[2]] || `${parseInt(cParts[2]) * 0.25}rem`;
        const escaped = fullCls.replace(/([:[\/])/g, '\\$1');
        customSelector = `.${escaped} > * + *`;
        property = cParts[1] === 'y' ? 'margin-top' : 'margin-left';
        value = isNeg ? `-${amount}` : amount;
      } else if (prefix === 'rounded') {
        property = 'border-radius';
        if (valKey.startsWith('[') && valKey.endsWith(']')) value = valKey.slice(1, -1);
        else if (theme.borderRadius[valKey]) value = theme.borderRadius[valKey];
        else {
          const num = parseInt(valKey);
          value = isNaN(num) ? '0.375rem' : `${num * 0.125}rem`;
        }
      } else if (prefix === 'scale') {
        property = 'transform';
        value = `scale(${parseInt(valKey) / 100})`;
      } else if (prefix === 'transition') {
        property = 'transition-property';
        if (valKey === 'all') value = 'all';
        else if (valKey === 'colors') value = 'color, background-color, border-color, text-decoration-color, fill, stroke';
        else if (valKey === 'transform') value = 'transform';
        else value = valKey;
      } else if (prefix === 'duration') {
        property = 'transition-duration';
        value = `${valKey}ms`;
      } else if (sideMap[prefix]) {
        property = sideMap[prefix];
        let v = valKey;
        if (v.startsWith('[') && v.endsWith(']')) v = v.slice(1, -1);
        else if (v.includes('/')) v = `${(parseInt(v.split('/')[0])/parseInt(v.split('/')[1])*100).toFixed(2)}%`;
        else v = theme.spacing[v] || v;
        value = isNeg ? (Array.isArray(v) ? v.map(x => `-${x}`) : `-${v}`) : v;
      } else if (prefix === 'border') {
        const color = resolveColor(valKey);
        if (color) { property = 'border-color'; value = color; }
        else if (['l', 'r', 't', 'b'].includes(cParts[1])) {
          const sideMapSide = { l: 'left', r: 'right', t: 'top', b: 'bottom' };
          property = `border-${sideMapSide[cParts[1]]}-width`;
          value = `${cParts[2]}px`;
        } else if (!isNaN(parseInt(valKey))) { property = 'border-width'; value = `${parseInt(valKey)}px`; }
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
      const escapedFull = fullCls.replace(/([:[\/])/g, '\\$1');
      let selector = customSelector || `.${escapedFull}`;
      if (variant) { if (variant === 'group-hover') selector = `.group:hover ${selector}`; else selector += `:${variant}`}
      
      const block = `${selector} {
${rules.join('\n')}
}
`;
      if (breakpoint) responsiveUtils[breakpoint].add(block); else utilities.add(block);
    });
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