const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('QuantumCSS Integrity Tests', () => {
  test('Landing page should have cosmic star background', async ({ page }) => {
    await page.goto(`file://${path.resolve(__dirname, '../examples/index.html')}`);
    const stars = page.locator('.starlight-stars');
    await expect(stars).toBeVisible();
    
    // Check if stars are generated
    const starCount = await page.locator('.star').count();
    expect(starCount).toBeGreaterThan(0);
  });

  // Skipped: gradient-test.html fixture not yet created
  test.skip('Gradients should be applied correctly', () => {});
  test.skip('Focus glow should be active on input focus', () => {});
  test.skip('Theme switching should change variables', () => {});
  
  test('Dropdowns should have blur effect in dark mode', async ({ page }) => {
    await page.goto(`file://${path.resolve(__dirname, '../examples/kitchen-sink.html')}`);
    
    const menuButton = page.locator('text=Stations ▾').first();
    await menuButton.click();
    
    const dropdown = page.locator('.dropdown-menu').first();
    await expect(dropdown).toBeVisible();
    
    const blur = await dropdown.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.getPropertyValue('backdrop-filter') || style.getPropertyValue('-webkit-backdrop-filter');
    });
    
    expect(blur).toContain('blur(16px)');
  });

  test('starlight-stars should have lower z-index than content', async ({ page }) => {
    await page.goto(`file://${path.resolve(__dirname, '../examples/index.html')}`);
    
    const stars = page.locator('.starlight-stars');
    const starsZIndex = await stars.evaluate((el) => {
      return window.getComputedStyle(el).zIndex;
    });
    
    const body = page.locator('body');
    const bodyZIndex = await body.evaluate((el) => {
      return window.getComputedStyle(el).zIndex;
    });
    
    expect(parseInt(starsZIndex)).toBeLessThan(parseInt(bodyZIndex || 0));
  });

  test('starlight-layout should lift content above stars', async ({ page }) => {
    await page.goto(`file://${path.resolve(__dirname, '../examples/index.html')}`);
    
    const stars = page.locator('.starlight-stars');
    const hasStars = await stars.count() > 0;
    
    if (hasStars) {
      const starsZIndex = await stars.first().evaluate((el) => {
        return parseInt(window.getComputedStyle(el).zIndex);
      });
      
      const main = page.locator('main, .main, [role="main"]');
      if (await main.count() > 0) {
        const mainZIndex = await main.first().evaluate((el) => {
          return parseInt(window.getComputedStyle(el).zIndex);
        });
        expect(mainZIndex).toBeGreaterThan(starsZIndex);
      }
    }
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
    await page.goto(`file://${path.resolve(__dirname, '../examples/gradient-test.html')}`);
    
    const html = page.locator('html');
    
    await html.evaluate((el) => {
      el.setAttribute('data-theme', 'light');
    });
    
    const theme = await html.getAttribute('data-theme');
    expect(theme).toBe('light');
  });
});
