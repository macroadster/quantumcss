const fs = require('fs');
const path = require('path');
const { glob } = require('glob');
const { defaultTheme, utilityMaps } = require('./defaults');

const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};

function generateCSS(configPath) {
  delete require.cache[path.resolve(configPath)];
  const config = require(path.resolve(configPath));
  
  const contentPaths = config.content || [];
  const theme = { ...defaultTheme };
  if (config.theme) {
    if (config.theme.extend) {
      theme.colors = { ...theme.colors, ...config.theme.extend.colors };
      theme.spacing = { ...theme.spacing, ...config.theme.extend.spacing };
      theme.fontSize = { ...theme.fontSize, ...config.theme.extend.fontSize };
      theme.shadows = { ...theme.shadows, ...config.theme.extend.shadows };
    } else {
      Object.assign(theme, config.theme);
    }
  }

  const flattenedColors = {};
  Object.entries(theme.colors).forEach(([name, value]) => {
    if (typeof value === 'string') {
      flattenedColors[name] = value;
    } else {
      Object.entries(value).forEach(([shade, hex]) => {
        flattenedColors[`${name}-${shade}`] = hex;
      });
    }
  });

  const files = contentPaths.flatMap(p => glob.sync(p));
  const rawClasses = new Set();

  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(/[a-z0-9\-\/:]+/g);
    if (matches) {
      matches.forEach(cls => rawClasses.add(cls));
    }
  });

  let css = '/* Quantum CSS - High Performance Output */\n';
  css += '*, ::before, ::after { box-sizing: border-box; border-width: 0; border-style: solid; border-color: #e5e7eb; }\n';
  css += 'html { line-height: 1.5; -webkit-text-size-adjust: 100%; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }\n';
  css += 'body { margin: 0; line-height: inherit; }\n';
  css += 'img { display: block; max-width: 100%; height: auto; }\n';
  css += 'button { cursor: pointer; background: transparent; padding: 0; color: inherit; font: inherit; }\n\n';

  const utilities = new Set();
  const responsiveUtils = { sm: new Set(), md: new Set(), lg: new Set(), xl: new Set() };

  function processClass(fullCls) {
    let cls = fullCls;
    let variant = null;
    let breakpoint = null;

    const parts = cls.split(':');
    if (parts.length > 1) {
      if (breakpoints[parts[0]]) {
        breakpoint = parts[0];
        cls = parts.slice(1).join(':');
      }
      const subParts = cls.split(':');
      if (subParts.length > 1) {
        variant = subParts[0];
        cls = subParts[1];
      } else if (!breakpoint) {
        variant = parts[0];
        cls = parts[1];
      }
    }

    let property = null;
    let value = null;

    if (utilityMaps[cls]) {
      if (typeof utilityMaps[cls] === 'object' && !Array.isArray(utilityMaps[cls])) {
        property = utilityMaps[cls].property;
        value = utilityMaps[cls].value;
      } else {
        property = utilityMaps[cls];
      }
    }

    if (!property || !value) {
      const cParts = cls.split('-');
      const prefix = cParts[0];
      const valKey = cParts.slice(1).join('-');

      if (prefix === 'text') {
        if (theme.fontSize[valKey]) { property = 'font-size'; value = theme.fontSize[valKey]; } 
        else if (flattenedColors[valKey]) { property = 'color'; value = flattenedColors[valKey]; }
      } else if (prefix === 'bg') {
        property = 'background-color'; value = flattenedColors[valKey];
      } else if (prefix === 'shadow') {
        property = 'box-shadow'; value = theme.shadows[valKey] || theme.shadows.md;
      } else if (prefix === 'rounded') {
        property = 'border-radius';
        if (valKey === 'lg') value = '0.5rem';
        else if (valKey === 'full') value = '9999px';
        else value = theme.spacing[valKey] || (valKey ? `${parseInt(valKey) * 0.125}rem` : '0.25rem');
      } else if (prefix === 'border') {
          if (flattenedColors[valKey]) {
            property = 'border-color'; value = flattenedColors[valKey];
          } else if (cParts[1] === 'l' || cParts[1] === 'r' || cParts[1] === 't' || cParts[1] === 'b') {
             const sideMap = { l: 'left', r: 'right', t: 'top', b: 'bottom' };
             property = `border-${sideMap[cParts[1]]}-width`;
             value = `${cParts[2]}px`;
          }
      } else if (prefix === 'gap') {
        property = 'gap'; value = theme.spacing[valKey] || (valKey ? (isNaN(valKey) ? valKey : `${valKey}rem`) : '0px');
      } else if (prefix === 'grid' && cParts[1] === 'cols') {
        property = 'grid-template-columns';
        value = `repeat(${cParts[2]}, minmax(0, 1fr))`;
      } else if (prefix === 'flex' && cParts[1] === 'row') {
        property = 'flex-direction';
        value = 'row';
      } else if (prefix === 'w' || prefix === 'h') {
        property = utilityMaps[prefix];
        if (valKey.includes('/')) {
            const [n, d] = valKey.split('/');
            value = `${(parseInt(n)/parseInt(d)*100).toFixed(2)}%`;
        } else {
            value = theme.spacing[valKey] || valKey;
        }
      } else if (utilityMaps[prefix]) {
        const mapEntry = utilityMaps[prefix];
        if (typeof mapEntry === 'object' && !Array.isArray(mapEntry)) {
          property = mapEntry.property;
          value = mapEntry.value;
        } else {
          property = mapEntry;
          value = theme.spacing[valKey] || valKey;
        }
      }
    }

    if (property && value) {
      let selector = `.${fullCls.replace(/:/g, '\\:').replace(/\//g, '\\/')}`;
      if (variant === 'hover' || variant === 'focus') selector += `:${variant}`;
      
      let rules = '';
      if (Array.isArray(property)) {
        if (Array.isArray(value)) {
          rules = property.map((p, i) => `  ${p}: ${value[i]};`).join('\n');
        } else {
          rules = property.map(p => `  ${p}: ${value};`).join('\n');
        }
      } else {
        rules = `  ${property}: ${value};`;
      }

      const cssBlock = `${selector} {\n${rules}\n}\n`;
      if (breakpoint) { responsiveUtils[breakpoint].add(cssBlock); } 
      else { utilities.add(cssBlock); }
    }
  }

  rawClasses.forEach(processClass);

  css += Array.from(utilities).join('\n');
  Object.entries(breakpoints).forEach(([name, width]) => {
    if (responsiveUtils[name].size > 0) {
      css += `\n@media (min-width: ${width}) {\n`;
      css += Array.from(responsiveUtils[name]).map(u => '  ' + u.replace(/\n/g, '\n  ')).join('\n').trimEnd();
      css += '\n}\n';
    }
  });

  return css;
}

module.exports = { generateCSS };
