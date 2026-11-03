const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const starlightJs = fs.readFileSync(path.resolve(__dirname, '../src/starlight.js'), 'utf8');

test.describe('QuantumCSS Integrity Tests', () => {
  test('Landing page should have cosmic star background', async ({ page }) => {
    await page.goto(`file://${path.resolve(__dirname, '../examples/index.html')}`);
    const stars = page.locator('.starlight-stars');
    await expect(stars).toBeVisible();
    
    // Check if stars are generated
    const starCount = await page.locator('.star').count();
    expect(starCount).toBeGreaterThan(0);
  });

  // Gradients / focus-glow / theme coverage live in kitchen-sink + unit tests.
  // Keep this suite on real fixtures only.
  test('Navigation dropdown should open in kitchen-sink', async ({ page }) => {
    await page.goto(`file://${path.resolve(__dirname, '../examples/kitchen-sink.html')}`);

    const dropdown = page.locator('.nav-dropdown').first();
    await dropdown.locator('summary').click();

    await expect(dropdown.locator('.nav-dropdown-panel')).toBeVisible();
    await expect(dropdown).toHaveAttribute('open', '');
  });

  test('starlight-stars should have lower z-index than lifted content', async ({ page }) => {
    await page.goto(`file://${path.resolve(__dirname, '../examples/index.html')}`);

    const stars = page.locator('.starlight-stars');
    const starsZIndex = await stars.evaluate((el) => {
      return window.getComputedStyle(el).zIndex;
    });

    const lifted = page.locator('.starlight-layout > :not(.starlight-stars)').first();
    await expect(lifted).toHaveCount(1);
    const liftedZIndex = await lifted.evaluate((el) => {
      return window.getComputedStyle(el).zIndex;
    });

    expect(parseInt(liftedZIndex)).toBeGreaterThan(parseInt(starsZIndex));
  });

  test('starlight-layout lifts every direct child above stars', async ({ page }) => {
    await page.goto(`file://${path.resolve(__dirname, '../examples/index.html')}`);

    const stars = page.locator('.starlight-stars');
    await expect(stars).toHaveCount(1);
    const starsZIndex = parseInt(await stars.evaluate((el) => window.getComputedStyle(el).zIndex));

    const children = page.locator('.starlight-layout > :not(.starlight-stars)');
    await expect(children.first()).toHaveCount(1);

    const zIndices = await children.evaluateAll((nodes) =>
      nodes.map((el) => parseInt(window.getComputedStyle(el).zIndex))
    );

    expect(zIndices.length).toBeGreaterThan(0);
    for (const zIndex of zIndices) {
      expect(zIndex).toBeGreaterThan(starsZIndex);
    }
  });

  test('data-theme-locked beats OS preference on a cold load', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.setContent(`<!doctype html>
<html lang="en" data-theme="dark" data-theme-default="dark" data-theme-locked>
  <body><main><h1>Locked</h1></main><script>${starlightJs}</script></body>
</html>`);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('explicit data-theme-default beats OS preference on a cold load', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.setContent(`<!doctype html>
<html lang="en" data-theme="dark" data-theme-default="dark">
  <body><main><h1>Default</h1></main><script>${starlightJs}</script></body>
</html>`);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('html[data-theme] should swap CSS variables correctly', async ({ page }) => {
    await page.goto(`file://${path.resolve(__dirname, '../examples/kitchen-sink.html')}`);
    
    const html = page.locator('html');
    
    await html.evaluate((el) => {
      el.setAttribute('data-theme', 'light');
    });
    
    await page.waitForTimeout(100);
    
    const lightBg = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--q-light-bg').trim();
    });
    
    expect(lightBg).toBeTruthy();
  });

  test('html[data-theme] attribute can be set', async ({ page }) => {
    await page.goto(`file://${path.resolve(__dirname, '../examples/kitchen-sink.html')}`);
    
    const html = page.locator('html');
    
    await html.evaluate((el) => {
      el.setAttribute('data-theme', 'light');
    });
    
    const theme = await html.getAttribute('data-theme');
    expect(theme).toBe('light');
  });
});
