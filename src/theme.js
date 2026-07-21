/**
 * Theme overlay emitter — maps quantum.config.json theme knobs to CSS variables.
 * Not a class tree-shaker. Tokens default in quantum-base.css; this only overrides.
 */
const fs = require('fs');
const path = require('path');

const DEFAULT_THEME = {
  colors: {
    primary: '#3b82f6',
    'starlight-blue': '#00d4ff',
    'starlight-peach': '#ffb38a',
    'starlight-orange': '#ff7e5f',
    'starlight-deep': '#08081a',
  },
  glass: { blur: '16px' },
  spacingScale: 1,
};

function loadConfig(configPath) {
  const resolved = path.resolve(configPath || 'quantum.config.json');
  if (!fs.existsSync(resolved)) return { theme: {} };
  try {
    return JSON.parse(fs.readFileSync(resolved, 'utf8'));
  } catch (err) {
    console.error(`❌ Error parsing ${resolved}:`, err.message);
    return { theme: {} };
  }
}

/**
 * Emit a :root { --q-* } override block from theme config.
 * Supports both legacy theme.extend and flat theme shapes.
 */
function generateThemeCSS(configPath) {
  const config = loadConfig(configPath);
  const theme = config.theme || {};
  const extend = theme.extend || {};
  const colors = { ...DEFAULT_THEME.colors, ...(theme.colors || {}), ...(extend.colors || {}) };
  const glass = { ...DEFAULT_THEME.glass, ...(theme.glass || {}), ...(extend.glass || {}) };
  const spacingScale =
    theme.spacingScale ??
    extend.spacingScale ??
    DEFAULT_THEME.spacingScale;

  const lines = [':root {'];

  const flatColor = (name, value) => {
    if (typeof value === 'string') {
      lines.push(`  --q-color-${name}: ${value};`);
      // primary-500 alias for hue knobs
      if (name === 'primary') {
        lines.push(`  --q-color-primary-500: ${value};`);
      }
      if (name === 'starlight-blue') {
        lines.push(`  --q-color-starlight: ${value};`);
        lines.push(`  --q-color-starlight-glow: color-mix(in srgb, ${value}, transparent 65%);`);
      }
    } else if (value && typeof value === 'object') {
      Object.entries(value).forEach(([shade, hex]) => {
        if (typeof hex === 'string') {
          lines.push(`  --q-color-${name}-${shade}: ${hex};`);
          if (shade === '500') lines.push(`  --q-color-${name}: ${hex};`);
        }
      });
    }
  };

  Object.entries(colors).forEach(([k, v]) => flatColor(k, v));

  if (glass.blur) {
    const blurVal = String(glass.blur).includes('blur')
      ? glass.blur
      : `blur(${glass.blur})`;
    lines.push(`  --q-glass-blur: ${blurVal};`);
  }

  const scale = Number(spacingScale) || 1;
  if (scale !== 1) {
    const base = 0.25 * scale;
    // Match kitchen-sink designer: --q-space-N where N is step index
    for (let i = 1; i <= 64; i++) {
      lines.push(`  --q-space-${i}: ${(base * i).toFixed(4).replace(/\.?0+$/, '')}rem;`);
    }
  }

  lines.push('}');
  lines.push('');
  return `/* QuantumCSS theme overlay */\n${lines.join('\n')}\n`;
}

module.exports = { generateThemeCSS, loadConfig, DEFAULT_THEME };
