const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const stylesDir = path.resolve(__dirname, '../src/styles');
const utilPath = path.join(stylesDir, 'quantum-utilities.css');
const basePath = path.join(stylesDir, 'quantum-base.css');
const buildPath = path.resolve(__dirname, '../scripts/build.js');

function extractClassNames(css) {
  const names = new Set();
  const re = /\.([a-zA-Z_][a-zA-Z0-9_-]*)/g;
  let m;
  while ((m = re.exec(css)) !== null) names.add(m[1]);
  return names;
}

const compPath = path.join(stylesDir, 'quantum-components.css');
const ownedPath = path.join(stylesDir, 'component-owned-classes.json');

function primaryClassNames(css) {
  const names = new Set();
  const re = /(?:^|})\s*([^{}]+?)\{/g;
  let m;
  while ((m = re.exec(css)) !== null) {
    const selectorList = m[1].trim();
    if (selectorList.startsWith('@') || selectorList.startsWith('/*')) continue;
    for (const sel of selectorList.split(',').map((s) => s.trim())) {
      const cm = sel.match(/^\.([a-zA-Z_][\w-]*)/);
      if (cm) names.add(cm[1]);
    }
  }
  return names;
}

describe('Static CSS architecture', () => {
  test('quantum-utilities.css exists and has core atomics', () => {
    assert.ok(fs.existsSync(utilPath), 'utilities file missing');
    const css = fs.readFileSync(utilPath, 'utf8');
    assert.match(css, /\.flex\s*\{[^}]*display:\s*flex/);
    assert.match(css, /\.p-4\s*\{[^}]*padding:\s*var\(--q-space-4\)/);
    assert.match(css, /\.overflow-y-auto\s*\{[^}]*overflow-y:\s*auto/);
    // Named UI must NOT live in utilities
    assert.doesNotMatch(css, /\.email-nav\s*\{/);
    assert.doesNotMatch(css, /\.dialog\s*\{/);
    assert.doesNotMatch(css, /\.btn-secondary\s*\{/);
    // No second token root in utilities
    assert.doesNotMatch(css, /:root\s*\{/);
  });

  test('named presets live in quantum-components.css', () => {
    const css = fs.readFileSync(compPath, 'utf8');
    const emailNav = css.match(/\.email-nav\s*\{[^}]+\}/)?.[0] || '';
    assert.match(emailNav, /display:\s*flex/);
    assert.match(emailNav, /overflow-y:\s*auto/);
    assert.match(css, /\.layout-email-3col\s*\{/);
    assert.match(css, /\.dialog\s*\{/);
    assert.match(css, /\.btn-secondary\s*\{[^}]*display:\s*inline-flex/);
    assert.match(css, /\.btn-starlight\s*\{[^}]*background:\s*linear-gradient/);
  });

  test('no dual primary ownership between utilities and components', () => {
    const owned = new Set(JSON.parse(fs.readFileSync(ownedPath, 'utf8')));
    const utilNames = primaryClassNames(fs.readFileSync(utilPath, 'utf8'));
    const dual = [...utilNames].filter((n) => owned.has(n));
    assert.deepEqual(
      dual,
      [],
      `component-owned classes still in utilities: ${dual.join(', ')}`
    );
  });

  test('design tokens live in quantum-base.css', () => {
    const css = fs.readFileSync(basePath, 'utf8');
    assert.match(css, /--q-space-4:/);
    assert.match(css, /--q-color-starlight-blue:/);
    assert.match(css, /--q-glass-blur:/);
  });

  test('build.js is static-only (no generateCSS / content scan)', () => {
    const src = fs.readFileSync(buildPath, 'utf8');
    assert.doesNotMatch(src, /generateCSS/);
    assert.doesNotMatch(src, /require\(['"]\.\.\/src\/generator['"]\)/);
    assert.match(src, /quantum-utilities\.css/);
  });
});
