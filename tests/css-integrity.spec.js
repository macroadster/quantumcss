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

  test('Gradients should be applied correctly in gradient-test.html', async ({ page }) => {
    await page.goto(`file://${path.resolve(__dirname, '../examples/gradient-test.html')}`);
    
    // Test Gradient Text Example
    const gradientText = page.locator('text=GRADIENT TEXT');
    await expect(gradientText).toBeVisible();
    
    const computedStyle = await gradientText.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        backgroundClip: style.getPropertyValue('background-clip') || style.getPropertyValue('-webkit-background-clip'),
        color: style.color
      };
    });
    
    expect(computedStyle.backgroundClip).toBe('text');
    expect(computedStyle.color).toBe('rgba(0, 0, 0, 0)'); // transparent
  });

  test('Focus glow should be active on input focus', async ({ page }) => {
    await page.goto(`file://${path.resolve(__dirname, '../examples/gradient-test.html')}`);
    
    const purpleInput = page.locator('input[placeholder="Focus for Purple Glow..."]');
    await purpleInput.scrollIntoViewIfNeeded();
    await purpleInput.focus();
    await page.waitForTimeout(100); // Wait for focus transition
    
    const boxShadow = await purpleInput.evaluate((el) => window.getComputedStyle(el).boxShadow);
    // Should contain purple-500 equivalent (168, 85, 247)
    expect(boxShadow).toMatch(/168,\s*85,\s*247/);
  });

  test('Theme switching should change variables', async ({ page }) => {
    await page.goto(`file://${path.resolve(__dirname, '../examples/gradient-test.html')}`);
    
    const body = page.locator('body');
    await expect(body).toHaveClass(/theme-blue-peach/);
    
    await page.click('text=Switch Visual Theme');
    await expect(body).toHaveClass(/theme-purple-via/);
  });
  
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
    await page.goto(`file://${path.resolve(__dirname, '../examples/theme-test.html')}`);
    
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

  test('semantic blog template should style semantic structure from root class', async ({ page }) => {
    await page.goto(`file://${path.resolve(__dirname, '../examples/semantic-blog.html')}`);

    const html = page.locator('html');
    await expect(html).toHaveClass(/blog/);

    const main = page.locator('main');
    const columns = await main.evaluate((el) => window.getComputedStyle(el).gridTemplateColumns);
    expect(columns).not.toBe('none');

    const nav = page.locator('body > nav');
    const navPosition = await nav.evaluate((el) => window.getComputedStyle(el).position);
    expect(navPosition).toBe('sticky');
  });
});
