const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const os = require('os');

const { generateCSS } = require('../src/generator');

function createTempProject(classes, config = {}) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'qcss-test-'));
  const htmlPath = path.join(dir, 'test.html');
  fs.writeFileSync(htmlPath, `<div class="${classes}"></div>`);
  const configPath = path.join(dir, 'quantum.config.json');
  const fullConfig = { content: [htmlPath], ...config };
  fs.writeFileSync(configPath, JSON.stringify(fullConfig));
  return { dir, configPath, cleanup: () => fs.rmSync(dir, { recursive: true, force: true }) };
}

function createAttrProject(attrs, config = {}) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'qcss-test-'));
  const htmlPath = path.join(dir, 'test.html');
  fs.writeFileSync(htmlPath, `<div ${attrs}></div>`);
  const configPath = path.join(dir, 'quantum.config.json');
  const fullConfig = { content: [htmlPath], ...config };
  fs.writeFileSync(configPath, JSON.stringify(fullConfig));
  return { dir, configPath, cleanup: () => fs.rmSync(dir, { recursive: true, force: true }) };
}

describe('Generator - Basic Utilities', () => {
  test('generates display utilities', () => {
    const { configPath, cleanup } = createTempProject('flex grid hidden block');
    try {
      const css = generateCSS(configPath);
      assert.match(css, /\.flex\s*\{[^}]*display:\s*flex/);
      assert.match(css, /\.grid\s*\{[^}]*display:\s*grid/);
      assert.match(css, /\.hidden\s*\{[^}]*display:\s*none/);
      assert.match(css, /\.block\s*\{[^}]*display:\s*block/);
    } finally { cleanup(); }
  });

  test('generates spacing utilities with CSS variables', () => {
    const { configPath, cleanup } = createTempProject('m-4 p-6 gap-8');
    try {
      const css = generateCSS(configPath);
      assert.match(css, /\.m-4\s*\{[^}]*margin:\s*var\(--q-space-4\)/);
      assert.match(css, /\.p-6\s*\{[^}]*padding:\s*var\(--q-space-6\)/);
      assert.match(css, /\.gap-8\s*\{[^}]*gap:\s*var\(--q-space-8\)/);
    } finally { cleanup(); }
  });

  test('generates border-radius with CSS variables', () => {
    const { configPath, cleanup } = createTempProject('rounded-lg rounded-full');
    try {
      const css = generateCSS(configPath);
      assert.match(css, /\.rounded-lg\s*\{[^}]*border-radius:\s*var\(--q-radius-lg\)/);
      assert.match(css, /\.rounded-full\s*\{[^}]*border-radius:\s*var\(--q-radius-full\)/);
    } finally { cleanup(); }
  });

  test('generates shadow utilities with CSS variables', () => {
    const { configPath, cleanup } = createTempProject('shadow-sm shadow-lg');
    try {
      const css = generateCSS(configPath);
      assert.match(css, /\.shadow-sm\s*\{[^}]*box-shadow:\s*var\(--q-shadow-sm\)/);
      assert.match(css, /\.shadow-lg\s*\{[^}]*box-shadow:\s*var\(--q-shadow-lg\)/);
    } finally { cleanup(); }
  });

  test('generates text color utilities without !important', () => {
    const { configPath, cleanup } = createTempProject('text-primary text-error');
    try {
      const css = generateCSS(configPath);
      assert.match(css, /\.text-primary\s*\{[^}]*color:\s*var\(--q-text-primary\)[^!]/);
      assert.match(css, /\.text-error\s*\{[^}]*color:\s*var\(--q-color-error\)/);
    } finally { cleanup(); }
  });

  test('generates flex utilities', () => {
    const { configPath, cleanup } = createTempProject('flex-col items-center justify-between');
    try {
      const css = generateCSS(configPath);
      assert.match(css, /\.flex-col\s*\{[^}]*flex-direction:\s*column/);
      assert.match(css, /\.items-center\s*\{[^}]*align-items:\s*center/);
      assert.match(css, /\.justify-between\s*\{[^}]*justify-content:\s*space-between/);
    } finally { cleanup(); }
  });
});

describe('Generator - Colors', () => {
  test('resolves color palette shades', () => {
    const { configPath, cleanup } = createTempProject('bg-primary-500 text-blue-600');
    try {
      const css = generateCSS(configPath);
      assert.match(css, /\.bg-primary-500\s*\{[^}]*background-color:\s*#3b82f6/);
      assert.match(css, /\.text-blue-600\s*\{[^}]*color:\s*#2563eb/);
    } finally { cleanup(); }
  });

  test('resolves color with opacity syntax', () => {
    const { configPath, cleanup } = createTempProject('bg-primary_50');
    try {
      const css = generateCSS(configPath);
      assert.match(css, /\.bg-primary_50\s*\{[^}]*background-color:\s*rgba\(59,\s*130,\s*246,\s*0\.5\)/);
    } finally { cleanup(); }
  });
});

describe('Generator - Responsive Breakpoints', () => {
  test('wraps breakpoint utilities in media queries', () => {
    const { configPath, cleanup } = createAttrProject('md="flex"');
    try {
      const css = generateCSS(configPath);
      assert.match(css, /@media\s*\(min-width:\s*768px\)/);
    } finally { cleanup(); }
  });

  test('handles dark variant', () => {
    const { configPath, cleanup } = createAttrProject('dark="bg-black"');
    try {
      const css = generateCSS(configPath);
      assert.match(css, /data-theme="dark"/);
    } finally { cleanup(); }
  });
});

describe('Generator - Gradients', () => {
  test('generates gradient direction utilities', () => {
    const { configPath, cleanup } = createTempProject('bg-gradient-to-r from-primary-500 to-blue-600');
    try {
      const css = generateCSS(configPath);
      assert.match(css, /linear-gradient\(to right/);
      assert.match(css, /--q-gradient-from/);
      assert.match(css, /--q-gradient-to/);
    } finally { cleanup(); }
  });
});

describe('Generator - Component Presets', () => {
  test('expands component presets from config', () => {
    const { configPath, cleanup } = createTempProject('my-btn', {
      componentPresets: { 'my-btn': 'flex items-center p-4' }
    });
    try {
      const css = generateCSS(configPath);
      assert.match(css, /\.my-btn\s*\{/);
      assert.match(css, /display:\s*flex/);
      assert.match(css, /align-items:\s*center/);
    } finally { cleanup(); }
  });

  test('expands built-in presets like btn-starlight', () => {
    const { configPath, cleanup } = createTempProject('btn-starlight');
    try {
      const css = generateCSS(configPath);
      assert.match(css, /\.btn-starlight\s*\{/);
      assert.match(css, /display:\s*inline-flex/);
    } finally { cleanup(); }
  });
});

describe('Generator - Config', () => {
  test('works with missing config file', () => {
    const css = generateCSS('/nonexistent/quantum.config.json');
    assert.ok(css.includes(':root'));
  });

  test('merges theme extensions', () => {
    const { configPath, cleanup } = createTempProject('bg-brand', {
      theme: { extend: { colors: { brand: '#ff0000' } } }
    });
    try {
      const css = generateCSS(configPath);
      assert.match(css, /--q-color-brand:\s*#ff0000/);
    } finally { cleanup(); }
  });
});

describe('Generator - Edge Cases', () => {
  test('handles negative values', () => {
    const { configPath, cleanup } = createTempProject('-mt-4');
    try {
      const css = generateCSS(configPath);
      assert.match(css, /\.-mt-4\s*\{[^}]*margin-top:/);
    } finally { cleanup(); }
  });

  test('handles arbitrary bracket values', () => {
    const { configPath, cleanup } = createTempProject('w-[300px] z-[999]');
    try {
      const css = generateCSS(configPath);
      assert.match(css, /width:\s*300px/);
      assert.match(css, /z-index:\s*999/);
    } finally { cleanup(); }
  });

  test('generates z-index utilities', () => {
    const { configPath, cleanup } = createTempProject('z-50 z-100');
    try {
      const css = generateCSS(configPath);
      assert.match(css, /\.z-50\s*\{[^}]*z-index:\s*50/);
      assert.match(css, /\.z-100\s*\{[^}]*z-index:\s*100/);
    } finally { cleanup(); }
  });

  test('generates root CSS variables', () => {
    const { configPath, cleanup } = createTempProject('flex');
    try {
      const css = generateCSS(configPath);
      assert.match(css, /:root\s*\{/);
      assert.match(css, /--q-color-primary/);
      assert.match(css, /--q-space-4/);
    } finally { cleanup(); }
  });
});