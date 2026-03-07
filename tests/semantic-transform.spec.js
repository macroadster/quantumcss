const fs = require('fs');
const os = require('os');
const path = require('path');
const { test, expect } = require('@playwright/test');
const {
  runConfiguredTransforms,
  transformTemplate,
  writeTransformedTemplate
} = require('../src/semantic/transformer');

test.describe('Semantic Template Transformer', () => {
  test('transforms the email template into semantic HTML and scoped CSS', async () => {
    const source = fs.readFileSync(path.resolve(__dirname, '../examples/email-template.html'), 'utf8');
    const { template, html, css } = transformTemplate(source, { cssHref: 'email-template.mail.css' });

    expect(template).toBe('mail');
    expect(html).toContain('<html lang="en" class="mail">');
    expect(html).toContain('<nav>');
    expect(html).toContain('<aside>');
    expect(html).toContain('<main id="email-content">');
    expect(html).toContain('aria-current="page"');
    expect(html).toContain('<em>12</em>');
    expect(html).toContain('<mark data-label="work">Work</mark>');
    expect(html).toContain('<figure data-initials="JD"></figure>');

    expect(html).not.toMatch(/class="[^"]*\b(email-sidebar|email-list|nav-item|nav-badge|nav-section-title|label-work|avatar-lg)\b/);

    expect(css).toContain('/* LAYOUT - replaces .email-layout */');
    expect(css).toContain('html.mail body > nav');
    expect(css).toContain('/* ACTIVE NAV ITEM - replaces .nav-item.active */');
  });

  test('writes outputs with a relative CSS link', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'quantum-semantic-'));
    const htmlOutput = path.join(tempDir, 'email.semantic.html');
    const cssOutput = path.join(tempDir, 'styles', 'email.mail.css');

    const result = writeTransformedTemplate(
      path.resolve(__dirname, '../examples/email-template.html'),
      { htmlOutput, cssOutput }
    );

    expect(result.template).toBe('mail');
    expect(fs.existsSync(htmlOutput)).toBeTruthy();
    expect(fs.existsSync(cssOutput)).toBeTruthy();

    const writtenHtml = fs.readFileSync(htmlOutput, 'utf8');
    expect(writtenHtml).toContain('href="styles/email.mail.css"');
  });

  test('runs config-driven semantic transforms for the build pipeline', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'quantum-semantic-config-'));
    const config = {
      semanticTemplates: [
        {
          input: 'examples/email-template.html',
          htmlOutput: 'out/email.semantic.html',
          cssOutput: 'out/email.mail.css'
        }
      ]
    };

    const results = runConfiguredTransforms(config, path.resolve(__dirname, '..'));

    expect(results).toHaveLength(1);
    expect(results[0].template).toBe('mail');
    expect(fs.existsSync(path.join(path.resolve(__dirname, '..'), 'out/email.semantic.html'))).toBeTruthy();
    expect(fs.existsSync(path.join(path.resolve(__dirname, '..'), 'out/email.mail.css'))).toBeTruthy();

    fs.rmSync(path.join(path.resolve(__dirname, '..'), 'out'), { recursive: true, force: true });
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  for (const fixture of [
    {
      source: '../examples/chat-messaging.html',
      template: 'chat',
      htmlMarker: '<html lang="en" class="chat">',
      cssMarker: 'html.chat body'
    },
    {
      source: '../examples/music-streaming.html',
      template: 'music',
      htmlMarker: '<html lang="en" class="music">',
      cssMarker: 'html.music body'
    },
    {
      source: '../examples/blog-template.html',
      template: 'blog',
      htmlMarker: '<html lang="en" class="blog">',
      cssMarker: 'html.blog body'
    }
  ]) {
    test(`detects and emits the ${fixture.template} semantic adapter`, async () => {
      const source = fs.readFileSync(path.resolve(__dirname, fixture.source), 'utf8');
      const { template, html, css } = transformTemplate(source, { cssHref: `${fixture.template}.css` });

      expect(template).toBe(fixture.template);
      expect(html).toContain(fixture.htmlMarker);
      expect(html).toContain(`href="${fixture.template}.css"`);
      expect(css).toContain(fixture.cssMarker);
    });
  }
});
