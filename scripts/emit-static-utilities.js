#!/usr/bin/env node
/**
 * Maintainer tool: rebuild finite atomic utility catalog as static CSS.
 * Output: src/styles/quantum-utilities.css
 *
 * Emits ONLY atomic utilities (object entries in defaults + example-used atomics).
 * Named UI components are owned by quantum-components.css — excluded via
 * src/styles/component-owned-classes.json (see scripts/fix-dual-ownership.js).
 *
 * Fail-closed for example HTML classes: map hit, arbitrary [...], or a known
 * atomic prefix pattern. Unknown semantic names (top-bar) are skipped.
 * Generator also refuses bare unknown identifiers; sanitize() is a last line.
 *
 * Does NOT emit a second :root token block (tokens live in quantum-base.css).
 */
const fs = require('fs');
const path = require('path');
const os = require('os');
const { glob } = require('glob');
const { utilityMaps } = require('../src/defaults');
const { generateCSS } = require('../src/generator');

const OUT = path.resolve(__dirname, '../src/styles/quantum-utilities.css');
const EXAMPLES = path.resolve(__dirname, '../examples');
const OWNED_PATH = path.resolve(__dirname, '../src/styles/component-owned-classes.json');

/** Longer prefixes first so max-w wins over w, gap-x over gap, etc. */
const ATOMIC_PREFIXES = [
  'backdrop-blur', 'translate-x', 'translate-y', 'scroll-m', 'scroll-p',
  'space-x', 'space-y', 'gap-x', 'gap-y', 'min-w', 'max-w', 'min-h', 'max-h',
  'col-span', 'row-span', 'grid-cols', 'grid-rows', 'overflow-x', 'overflow-y',
  'border-t', 'border-b', 'border-l', 'border-r', 'border-x', 'border-y',
  'rounded-t', 'rounded-b', 'rounded-l', 'rounded-r', 'inset-x', 'inset-y',
  'pointer-events', 'user-select', 'touch-action', 'will-change',
  'from', 'via', 'to', 'bg', 'text', 'fill', 'stroke', 'outline', 'ring',
  'border', 'rounded', 'shadow', 'opacity', 'blur', 'brightness', 'contrast',
  'grayscale', 'invert', 'saturate', 'sepia', 'hue-rotate',
  'p', 'px', 'py', 'pt', 'pb', 'pl', 'pr', 'ps', 'pe',
  'm', 'mx', 'my', 'mt', 'mb', 'ml', 'mr', 'ms', 'me',
  'w', 'h', 'size', 'basis', 'grow', 'shrink', 'order', 'z',
  'top', 'right', 'bottom', 'left', 'inset', 'gap',
  'font', 'leading', 'tracking', 'indent', 'align', 'decorate', 'decoration',
  'list', 'whitespace', 'break', 'truncate', 'hyphens',
  'flex', 'grid', 'col', 'row', 'content', 'items', 'justify', 'self', 'place',
  'overflow', 'object', 'overscroll', 'float', 'clear', 'isolate', 'box',
  'transition', 'duration', 'delay', 'ease', 'animate', 'scale', 'rotate',
  'skew-x', 'skew-y', 'origin', 'cursor', 'resize', 'scroll', 'snap',
  'aspect', 'columns', 'accent', 'caret', 'select', 'sr',
].sort((a, b) => b.length - a.length);

const SPACING_PREFIXES = new Set([
  'p', 'px', 'py', 'pt', 'pb', 'pl', 'pr', 'ps', 'pe',
  'm', 'mx', 'my', 'mt', 'mb', 'ml', 'mr', 'ms', 'me',
  'gap', 'gap-x', 'gap-y', 'space-x', 'space-y',
  'w', 'h', 'size', 'min-w', 'max-w', 'min-h', 'max-h', 'basis',
  'top', 'right', 'bottom', 'left', 'inset', 'inset-x', 'inset-y',
  'scroll-m', 'scroll-p', 'indent', 'translate-x', 'translate-y',
]);

const COLOR_PREFIXES = new Set([
  'bg', 'text', 'from', 'via', 'to', 'border', 'outline', 'ring', 'fill', 'stroke', 'accent', 'caret',
]);

const KNOWN_VALUE_WORDS = new Set([
  'auto', 'full', 'screen', 'min', 'max', 'fit', 'px', 'none', 'solid', 'dashed', 'dotted',
  'double', 'hidden', 'scroll', 'clip', 'visible', 'current', 'transparent', 'inherit',
  'initial', 'unset', 'revert', 'static', 'relative', 'absolute', 'fixed', 'sticky',
  'baseline', 'top', 'middle', 'bottom', 'left', 'right', 'center', 'stretch', 'between',
  'around', 'evenly', 'start', 'end', 'normal', 'wide', 'wider', 'widest', 'tight',
  'tighter', 'loose', 'black', 'white', 'primary', 'secondary', 'muted', 'starlight',
  'video', 'square', 'all', 'colors', 'transform', 'sm', 'md', 'lg', 'xl', '2xl', '3xl',
  'thin', 'extralight', 'light', 'medium', 'semibold', 'bold', 'extrabold', 'italic',
  'underline', 'overline', 'line-through', 'pointer', 'wait', 'move', 'grab', 'text',
]);

function loadOwned() {
  if (!fs.existsSync(OWNED_PATH)) return new Set();
  return new Set(JSON.parse(fs.readFileSync(OWNED_PATH, 'utf8')));
}

function expandAliasLeaves(cls, seen = new Set()) {
  if (seen.has(cls)) return [];
  seen.add(cls);
  const v = utilityMaps[cls];
  if (typeof v === 'string') {
    return v.split(/\s+/).filter(Boolean).flatMap((c) => expandAliasLeaves(c, seen));
  }
  return [cls];
}

function collectExampleClasses() {
  const files = glob.sync('**/*.html', { cwd: EXAMPLES, absolute: true });
  const classes = new Set();
  const classRe = /class="([^"]+)"/g;
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    let m;
    while ((m = classRe.exec(content)) !== null) {
      m[1].split(/\s+/).forEach((c) => c && classes.add(c));
    }
  }
  return classes;
}

function baseClassName(token) {
  const parts = token.split(':');
  return parts[parts.length - 1].replace(/^-/, '');
}

/**
 * Fail-closed gate for example-scraped tokens.
 * Allow: utilityMaps hit, arbitrary values, or known atomic prefix + plausible value.
 */
function isEmittableBase(base) {
  if (!base) return false;
  if (utilityMaps[base] !== undefined) return true;
  if (base.includes('[') && base.includes(']')) return true;

  for (const prefix of ATOMIC_PREFIXES) {
    if (base === prefix) return utilityMaps[base] !== undefined || KNOWN_VALUE_WORDS.has(base);
    if (!base.startsWith(`${prefix}-`)) continue;
    const rest = base.slice(prefix.length + 1);
    if (!rest) return false;

    if (COLOR_PREFIXES.has(prefix)) return true;

    if (SPACING_PREFIXES.has(prefix)) {
      if (/^\d/.test(rest) || rest.includes('/') || rest.includes('_') || rest.startsWith('[')) return true;
      if (KNOWN_VALUE_WORDS.has(rest)) return true;
      // bare words like "bar" / "section" are semantic class leftovers — reject
      return false;
    }

    // Other prefixes: allow digits, keywords, multi-token (green-500), reject single unknown word
    if (/^\d/.test(rest) || rest.includes('-') || rest.includes('_') || rest.includes('/')) return true;
    if (KNOWN_VALUE_WORDS.has(rest)) return true;
    return false;
  }

  return false;
}

function isEmittableToken(token, owned) {
  if (!token) return false;
  const base = baseClassName(token);
  if (owned.has(base) || owned.has(token)) return false;
  return isEmittableBase(base);
}

/** Drop rule blocks that still contain bare-identifier length/position values. */
function sanitizeUtilityCSS(css) {
  const keywords = 'auto|inherit|initial|unset|revert|none|full|min-content|max-content|fit-content';
  const prop = '(?:top|right|bottom|left|inset|width|height|min-width|max-width|min-height|max-height|margin(?:-[\\w-]+)?|padding(?:-[\\w-]+)?|gap|row-gap|column-gap|flex-basis)';
  const badDecl = new RegExp(`\\b${prop}\\s*:\\s*(?!${keywords})([a-z]+)\\s*;`, 'i');
  return css.replace(/(^|\n)([^{}/@][^{]*)\{([^{}]*)\}/g, (full, lead, selector, body) => {
    if (badDecl.test(body)) return lead;
    return full;
  });
}

function main() {
  const owned = loadOwned();
  const classes = new Set();
  let skippedExamples = 0;

  for (const [key, value] of Object.entries(utilityMaps)) {
    if (typeof value === 'string') {
      expandAliasLeaves(key).forEach((c) => {
        if (!owned.has(c) && typeof utilityMaps[c] !== 'string') classes.add(c);
      });
      continue;
    }
    if (!owned.has(key)) classes.add(key);
  }

  const exampleClasses = collectExampleClasses();
  for (const c of exampleClasses) {
    if (!isEmittableToken(c, owned)) {
      skippedExamples += 1;
      continue;
    }
    classes.add(c);
  }

  const list = [...classes].filter(Boolean).sort();
  console.log(
    `📦 Emitting ${list.length} atomic tokens (examples scanned: ${exampleClasses.size}, skipped non-atomics: ${skippedExamples}, owned excluded: ${owned.size})`
  );

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'qcss-emit-'));
  const htmlPath = path.join(tmpDir, 'all.html');
  const chunkSize = 80;
  let html = '';
  for (let i = 0; i < list.length; i += chunkSize) {
    html += `<div class="${list.slice(i, i + chunkSize).join(' ')}"></div>\n`;
  }
  fs.writeFileSync(htmlPath, html);

  const configPath = path.join(tmpDir, 'quantum.config.json');
  fs.writeFileSync(
    configPath,
    JSON.stringify({ content: [htmlPath], theme: { extend: {} }, plugins: [], componentPresets: {} }, null, 2)
  );

  let css = generateCSS(configPath);
  css = css.replace(/:root\s*\{[\s\S]*?\}\s*\n*/, '');
  css = css.replace(/^\/\* Quantum CSS JIT Output \*\/\s*/m, '');

  const ownedList = [...owned];
  for (const name of ownedList) {
    const esc = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    css = css.replace(new RegExp(`\\.${esc}(?![\\w-])[^{]*\\{[^}]*\\}\\s*`, 'g'), '');
  }

  css = sanitizeUtilityCSS(css);

  if (/\.top-bar\b/.test(css) || /top:\s*bar\s*;/.test(css)) {
    throw new Error('Emit produced forbidden top-bar / top: bar rules — fail closed');
  }
  if (/\.bottom-section\b/.test(css) || /bottom:\s*section\s*;/.test(css)) {
    throw new Error('Emit produced forbidden bottom-section / bottom: section rules — fail closed');
  }

  const header = `/*!
 * QuantumCSS static utilities
 * Finite atomic utility catalog only. Named UI lives in quantum-components.css.
 * Tokens: quantum-base.css. Named decorated UI: quantum-components.css.
 * Generated by scripts/emit-static-utilities.js — re-run after catalog changes,
 * then prefer hand-edits to this file for ongoing maintenance.
 * Component-owned class names: see component-owned-classes.json
 * Example HTML tokens are fail-closed (map / arbitrary / known atomic prefix).
 */

`;

  const finalCss = header + css.trim() + '\n';
  fs.writeFileSync(OUT, finalCss);
  fs.rmSync(tmpDir, { recursive: true, force: true });

  console.log(`✅ Wrote ${OUT}`);
  console.log(`   Size: ${(finalCss.length / 1024).toFixed(1)} KB raw`);
}

module.exports = { isEmittableBase, isEmittableToken, sanitizeUtilityCSS, baseClassName };

if (require.main === module) {
  main();
}
