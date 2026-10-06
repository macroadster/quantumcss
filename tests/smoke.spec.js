const { test, expect } = require('@playwright/test');
const path = require('path');

const indexUrl = `file://${path.resolve(__dirname, '../examples/index.html')}`;
const sinkUrl = `file://${path.resolve(__dirname, '../examples/kitchen-sink.html')}`;

test.describe('Example smoke', () => {
  test('index cards keep spacing and gradient backgrounds', async ({ page }) => {
    await page.goto(indexUrl);
    await expect(page.locator('.starlight-stars')).toBeVisible();

    const card = page.locator('.starlight-card').first();
    await expect(card).toBeVisible();

    const pad = await card.evaluate((el) => {
      const s = getComputedStyle(el);
      return { paddingTop: s.paddingTop, paddingLeft: s.paddingLeft };
    });
    expect(parseFloat(pad.paddingTop)).toBeGreaterThan(0);
    expect(parseFloat(pad.paddingLeft)).toBeGreaterThan(0);

    // Hero / accent gradients should resolve to an image, not 'none'
    const gradienty = page.locator('.bg-gradient-to-br, [class*="from-"]').first();
    if (await gradienty.count()) {
      const bgImage = await gradienty.evaluate((el) => getComputedStyle(el).backgroundImage);
      expect(bgImage).not.toBe('none');
    }
  });

  test('kitchen-sink can set data-theme', async ({ page }) => {
    await page.goto(sinkUrl);
    const html = page.locator('html');
    await html.evaluate((el) => el.setAttribute('data-theme', 'light'));
    await expect(html).toHaveAttribute('data-theme', 'light');
    const lightBg = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--q-light-bg').trim()
    );
    expect(lightBg.length).toBeGreaterThan(0);
  });

  test('Quantum Shell monitor icon stays visible in light, dark, and auto', async ({ page }) => {
    await page.goto(indexUrl);
    const shellIcon = page.locator('a[href="shell.html"] i.icon-display');
    const toggleAuto = page.locator('.theme-toggle > i.icon-display');

    for (const theme of ['dark', 'light', 'auto']) {
      await page.evaluate((value) => {
        localStorage.setItem('theme', value);
      }, theme);
      await page.reload();

      await expect(shellIcon).toBeVisible();
      await expect(shellIcon).not.toHaveClass(/\bhidden\b/);
      const box = await shellIcon.boundingBox();
      expect(box.width).toBeGreaterThan(24);
      expect(box.height).toBeGreaterThan(24);
      const mask = await shellIcon.evaluate((el) => {
        const style = getComputedStyle(el);
        return style.webkitMaskImage || style.maskImage;
      });
      expect(mask).toContain('url(');

      if (theme === 'auto') {
        await expect(toggleAuto).toBeVisible();
      } else {
        await expect(toggleAuto).toBeHidden();
      }
    }
  });
});
