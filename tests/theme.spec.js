const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { generateThemeCSS } = require('../src/theme');

describe('Theme overlay emitter', () => {
  test('emits color and glass variables from config', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'qtheme-'));
    const cfg = path.join(dir, 'quantum.config.json');
    fs.writeFileSync(
      cfg,
      JSON.stringify({
        theme: {
          colors: { primary: 'hsl(200, 91%, 60%)', 'starlight-blue': 'hsl(200, 100%, 50%)' },
          glass: { blur: '20px' },
          spacingScale: 1,
        },
      })
    );
    const css = generateThemeCSS(cfg);
    assert.match(css, /--q-color-primary:\s*hsl\(200/);
    assert.match(css, /--q-color-starlight-blue:\s*hsl\(200/);
    assert.match(css, /--q-glass-blur:\s*blur\(20px\)/);
    assert.doesNotMatch(css, /\.flex\s*\{/); // not a class emitter
  });

  test('spacingScale rewrites --q-space-* when not 1', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'qtheme-'));
    const cfg = path.join(dir, 'quantum.config.json');
    fs.writeFileSync(cfg, JSON.stringify({ theme: { spacingScale: 2 } }));
    const css = generateThemeCSS(cfg);
    assert.match(css, /--q-space-4:\s*2rem/);
  });
});
