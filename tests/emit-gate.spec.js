const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { isEmittableBase, sanitizeUtilityCSS } = require('../scripts/emit-static-utilities');

describe('Emit fail-closed gate', () => {
  test('rejects semantic leftovers like top-bar / bottom-section', () => {
    assert.equal(isEmittableBase('top-bar'), false);
    assert.equal(isEmittableBase('bottom-section'), false);
  });

  test('allows pattern atomics used by examples', () => {
    for (const cls of ['mb-10', 'px-10', 'bg-green-500', 'bg-gradient-to-br', 'from-blue-500_60', 'h-14', 'max-w-3xl', 'text-[10px]']) {
      assert.equal(isEmittableBase(cls), true, cls);
    }
  });

  test('sanitize strips bare-identifier position rules', () => {
    const dirty = `.top-bar {\n  top: bar;\n}\n.flex {\n  display: flex;\n}\n`;
    const clean = sanitizeUtilityCSS(dirty);
    assert.doesNotMatch(clean, /top-bar/);
    assert.match(clean, /\.flex/);
  });
});
