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

describe('Static CSS architecture', () => {
  test('quantum-utilities.css exists and has core atomics', () => {
    assert.ok(fs.existsSync(utilPath), 'utilities file missing');
    const css = fs.readFileSync(utilPath, 'utf8');
    assert.match(css, /\.flex\s*\{[^}]*display:\s*flex/);
    assert.match(css, /\.p-4\s*\{[^}]*padding:\s*var\(--q-space-4\)/);
    assert.match(css, /\.overflow-y-auto\s*\{[^}]*overflow-y:\s*auto/);
    assert.match(css, /\.email-nav\s*\{/);
    assert.match(css, /\.layout-email-3col\s*\{/);
    // No second token root in utilities
    assert.doesNotMatch(css, /:root\s*\{/);
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

  test('layout presets are flattened (not multi-class-only)', () => {
    const css = fs.readFileSync(utilPath, 'utf8');
    // Flattened email-nav should include flex + overflow + padding properties
    const block = css.match(/\.email-nav\s*\{[^}]+\}/)?.[0] || '';
    assert.match(block, /display:\s*flex/);
    assert.match(block, /overflow-y:\s*auto/);
    assert.match(block, /padding:/);
  });
});
