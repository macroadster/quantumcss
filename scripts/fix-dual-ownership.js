#!/usr/bin/env node
/**
 * QCS-56y: Resolve dual class ownership.
 * - Move named component/preset rules from quantum-utilities.css → quantum-components.css
 * - Drop broken/garbage duals (top-nav from bad scan)
 * - Prefer component styles for dialog, checkbox-starlight when both exist
 * - Remove pure atomic duplicates from components (overflow-y-auto)
 * - Update emit exclusion so re-emit does not reintroduce them
 */
const fs = require('fs');
const path = require('path');
const { utilityMaps } = require('../src/defaults');

const UTIL = path.resolve(__dirname, '../src/styles/quantum-utilities.css');
const COMP = path.resolve(__dirname, '../src/styles/quantum-components.css');

// Named classes that belong to components (string aliases + explicit duals)
const COMPONENT_OWNED = new Set([
  ...Object.entries(utilityMaps)
    .filter(([, v]) => typeof v === 'string')
    .map(([k]) => k),
  'top-nav',
  'top-nav-actions',
  'dialog',
  'search',
  // bases that are named UI primitives, not pure atomics
  'btn-base',
  'card-base',
  'input-base',
  'dialog-base',
  'dialog-bg',
  'modal-fixed',
  'badge-base',
  'nav-base',
  'theme-starlight',
  'theme-glass',
  'theme-glass-dark',
  'bg-starlight',
]);

// Prefer existing component base rules; do not import utility base for these
const PREFER_COMPONENT_BASE = new Set([
  'dialog',
  'checkbox-starlight',
  'top-nav',
  'top-nav-actions',
  'search',
]);

// Escape class name for regex
function escapeClass(name) {
  return name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/:/g, '\\:');
}

/**
 * Parse CSS into top-level rules (handles nested @media by keeping whole at-rule blocks).
 * Returns array of { type: 'rule'|'atrule'|'other', text }
 */
function parseTopLevel(css) {
  const chunks = [];
  let i = 0;
  const n = css.length;
  while (i < n) {
    // skip whitespace
    if (/\s/.test(css[i])) {
      let j = i;
      while (j < n && /\s/.test(css[j])) j++;
      chunks.push({ type: 'ws', text: css.slice(i, j) });
      i = j;
      continue;
    }
    // comments
    if (css.startsWith('/*', i)) {
      const end = css.indexOf('*/', i + 2);
      const j = end === -1 ? n : end + 2;
      chunks.push({ type: 'comment', text: css.slice(i, j) });
      i = j;
      continue;
    }
    // at-rules
    if (css[i] === '@') {
      // find opening brace or semicolon
      let j = i;
      let inStr = null;
      while (j < n) {
        const ch = css[j];
        if (inStr) {
          if (ch === inStr && css[j - 1] !== '\\') inStr = null;
          j++;
          continue;
        }
        if (ch === '"' || ch === "'") {
          inStr = ch;
          j++;
          continue;
        }
        if (ch === ';') {
          j++;
          chunks.push({ type: 'atrule', text: css.slice(i, j) });
          i = j;
          break;
        }
        if (ch === '{') {
          // balanced braces
          let depth = 0;
          while (j < n) {
            const c = css[j];
            if (!inStr && (c === '"' || c === "'")) {
              inStr = c;
              j++;
              continue;
            }
            if (inStr) {
              if (c === inStr && css[j - 1] !== '\\') inStr = null;
              j++;
              continue;
            }
            if (c === '{') depth++;
            else if (c === '}') {
              depth--;
              if (depth === 0) {
                j++;
                break;
              }
            }
            j++;
          }
          chunks.push({ type: 'atrule', text: css.slice(i, j) });
          i = j;
          break;
        }
        j++;
      }
      continue;
    }
    // normal rule: selector { ... }
    let j = i;
    let inStr = null;
    while (j < n) {
      const ch = css[j];
      if (inStr) {
        if (ch === inStr && css[j - 1] !== '\\') inStr = null;
        j++;
        continue;
      }
      if (ch === '"' || ch === "'") {
        inStr = ch;
        j++;
        continue;
      }
      if (ch === '{') {
        let depth = 0;
        while (j < n) {
          const c = css[j];
          if (!inStr && (c === '"' || c === "'")) {
            inStr = c;
            j++;
            continue;
          }
          if (inStr) {
            if (c === inStr && css[j - 1] !== '\\') inStr = null;
            j++;
            continue;
          }
          if (c === '{') depth++;
          else if (c === '}') {
            depth--;
            if (depth === 0) {
              j++;
              break;
            }
          }
          j++;
        }
        chunks.push({ type: 'rule', text: css.slice(i, j) });
        i = j;
        break;
      }
      j++;
    }
    if (j >= n && i < n) {
      chunks.push({ type: 'other', text: css.slice(i) });
      break;
    }
  }
  return chunks;
}

function rulePrimaryClasses(ruleText) {
  const brace = ruleText.indexOf('{');
  if (brace === -1) return [];
  const selector = ruleText.slice(0, brace);
  const names = new Set();
  // each selector in list
  for (const part of selector.split(',')) {
    const m = part.trim().match(/^\.([a-zA-Z_][\w-]*|\\.[a-zA-Z_][\w-]*)/);
    // handle escaped dots in class like starlight-chart-tab\.active
    const m2 = part.trim().match(/^\.((?:[a-zA-Z_][\w-]*|\\.)+)/);
    if (m2) {
      const raw = m2[1].replace(/\\./g, '.');
      // only the first class token
      const first = raw.split(/[^a-zA-Z0-9_.-]/)[0].replace(/^\./, '');
      // For .starlight-chart-tab.active the first class is starlight-chart-tab
      // For .starlight-chart-tab\.active the class name is starlight-chart-tab.active
      if (m2[1].includes('\\.')) {
        names.add(m2[1].replace(/\\./g, '.'));
      } else {
        names.add(first.split('.')[0]);
      }
    }
  }
  return [...names];
}

function atruleOwnedClasses(atruleText) {
  // collect classes from rules inside
  const inner = atruleText.replace(/^@[^{]+\{/, '').replace(/\}$/, '');
  const chunks = parseTopLevel(inner);
  const names = new Set();
  for (const c of chunks) {
    if (c.type === 'rule') rulePrimaryClasses(c.text).forEach((n) => names.add(n));
  }
  return [...names];
}

function isComponentOwnedRule(ruleText) {
  const classes = rulePrimaryClasses(ruleText);
  if (!classes.length) return false;
  // Move if ANY primary class is component-owned (for dual selectors rare)
  return classes.some((c) => COMPONENT_OWNED.has(c));
}

function isComponentOwnedAtrule(atruleText) {
  // Only move media blocks that exclusively (or primarily) style component-owned classes
  if (!atruleText.startsWith('@media') && !atruleText.startsWith('@supports')) {
    return false;
  }
  const owned = atruleOwnedClasses(atruleText);
  if (!owned.length) return false;
  // Move if every primary class in the media block is component-owned
  // (or if it has at least one and no pure utilities — check all)
  const chunks = parseTopLevel(
    atruleText.replace(/^@[^{]+\{/, '').replace(/\}$/, '')
  );
  const allPrimary = new Set();
  for (const c of chunks) {
    if (c.type === 'rule') rulePrimaryClasses(c.text).forEach((n) => allPrimary.add(n));
  }
  if (!allPrimary.size) return false;
  return [...allPrimary].every((n) => COMPONENT_OWNED.has(n));
}

function stripPreferComponentBases(rulesText) {
  // Remove rules whose primary class is in PREFER_COMPONENT_BASE (base only)
  const chunks = parseTopLevel(rulesText);
  const kept = [];
  for (const c of chunks) {
    if (c.type === 'rule') {
      const classes = rulePrimaryClasses(c.text);
      // drop if primary is prefer-component and selector is just the base class (no pseudo needed actually - drop all for those names as primary)
      if (classes.some((n) => PREFER_COMPONENT_BASE.has(n))) {
        // keep child/state if selector is more complex? For dialog only .dialog and variants
        // Drop all primary prefer-component rules from util import
        continue;
      }
    }
    if (c.type === 'atrule' && (c.text.startsWith('@media') || c.text.startsWith('@supports'))) {
      // filter inner
      const header = c.text.match(/^@[^{]+\{/)?.[0] || '';
      const inner = c.text.slice(header.length, c.text.endsWith('}') ? -1 : undefined);
      const innerChunks = parseTopLevel(inner);
      let newInner = '';
      for (const ic of innerChunks) {
        if (ic.type === 'rule') {
          const classes = rulePrimaryClasses(ic.text);
          if (classes.some((n) => PREFER_COMPONENT_BASE.has(n))) continue;
        }
        newInner += ic.text;
      }
      if (newInner.trim()) {
        kept.push({ type: 'atrule', text: header + newInner + '}' });
      }
      continue;
    }
    kept.push(c);
  }
  return kept.map((c) => c.text).join('');
}

// --- Main ---
const utilCss = fs.readFileSync(UTIL, 'utf8');
const compCss = fs.readFileSync(COMP, 'utf8');

const utilChunks = parseTopLevel(utilCss);
const stay = [];
const moved = [];

for (const chunk of utilChunks) {
  if (chunk.type === 'rule' && isComponentOwnedRule(chunk.text)) {
    moved.push(chunk);
    continue;
  }
  if (chunk.type === 'atrule' && isComponentOwnedAtrule(chunk.text)) {
    moved.push(chunk);
    continue;
  }
  stay.push(chunk);
}

let movedText = moved.map((c) => c.text).join('\n\n');
movedText = stripPreferComponentBases(movedText).trim();

// Clean utilities: collapse excess blank lines
let newUtil =
  stay
    .map((c) => c.text)
    .join('')
    .replace(/\n{3,}/g, '\n\n')
    .trim() + '\n';

// Update header comment
if (!newUtil.includes('Do not dual-define')) {
  // keep existing header if present
}
newUtil = newUtil.replace(
  /Finite atomic \+ preset catalog\. Do not dual-define these in component CSS\./,
  'Finite atomic utility catalog only. Named UI lives in quantum-components.css.'
);

// Remove atomic duplicates from components
let newComp = compCss.replace(
  /\n\.overflow-y-auto\s*\{\s*overflow-y:\s*auto;\s*\}\n/,
  '\n'
);

// Update stale JIT comments
newComp = newComp
  .replace(/base rule in JIT \(src\/defaults\.js\)/g, 'base rules colocated below')
  .replace(/base rules in JIT \(src\/defaults\.js\)/g, 'base rules colocated below')
  .replace(/base rule in JIT/g, 'base rules colocated below')
  .replace(/base rules in JIT/g, 'base rules colocated below')
  .replace(
    /LAYOUT PRESETS — Base\/dark rules live in quantum-utilities\.css \(static catalog\)\.\n   Light-mode overrides and child decorations remain below \/ elsewhere in this file\./,
    'LAYOUT PRESETS — Full base + light-mode rules live in this file (static-first ownership).'
  );

// Fill btn-secondary if still empty stub — will be replaced by moved rules if present
// Append moved section before end of file
const section = `
/* ============================================================================
   FLATTENED NAMED COMPONENTS (from former JIT aliases / utilities duals)
   Ownership: this file. Do not re-add these classes to quantum-utilities.css.
   ============================================================================ */

${movedText}
`;

if (movedText) {
  newComp = newComp.trimEnd() + '\n' + section + '\n';
}

// Merge btn-secondary: if moved has it, remove empty stub
if (movedText.includes('.btn-secondary')) {
  newComp = newComp.replace(
    /\.btn-secondary\s*\{\s*\/\* Synced with \.btn - inherits all styles \*\/\s*\}\n*/,
    ''
  );
}

fs.writeFileSync(UTIL, newUtil);
fs.writeFileSync(COMP, newComp);

// Write exclusion list for emit script
const excludePath = path.resolve(__dirname, '../src/styles/component-owned-classes.json');
fs.writeFileSync(
  excludePath,
  JSON.stringify([...COMPONENT_OWNED].sort(), null, 2) + '\n'
);

console.log('Moved chunks:', moved.length);
console.log('Moved CSS bytes:', movedText.length);
console.log('Utilities size:', (newUtil.length / 1024).toFixed(1), 'KB');
console.log('Components size:', (newComp.length / 1024).toFixed(1), 'KB');
console.log('Wrote', excludePath);
