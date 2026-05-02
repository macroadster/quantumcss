# QuantumCSS -- AI Developer Guide

This guide teaches AI models and developers to generate QuantumCSS code that is minimal, semantic, and token-efficient.

## Core Principle: Write Less, Get More

QuantumCSS is designed around **beautiful defaults**. The framework styles semantic HTML elements automatically, so most of your output should be plain markup with very few classes. Resist the urge to add utility classes -- they're the escape hatch, not the primary tool.

**Priority order when generating markup:**

1. **Use bare HTML elements** -- `<button>`, `<input>`, `<nav>`, `<table>` are already styled
2. **Use a component class** -- `card`, `badge`, `alert` for patterns HTML doesn't express
3. **Use a utility class** -- `mt-4`, `text-center`, `grid` only when layers 1-2 aren't enough

### Why This Matters

Token efficiency. Every class you add costs tokens to generate and tokens for the user to read. A card in QuantumCSS:

```html
<!-- Good: 18 characters of classes -->
<div class="card">
  <h2>Title</h2>
  <p>Description</p>
  <button>Action</button>
</div>

<!-- Avoid: utility soup (unless you need specific overrides) -->
<div class="bg-white/5 rounded-xl border border-white/8 p-6 backdrop-blur-lg shadow-lg">
  <h2 class="text-xl font-bold mb-4">Title</h2>
  <p class="text-secondary mb-6">Description</p>
  <button class="btn-starlight">Action</button>
</div>
```

Both render identically. The first is 10x more efficient.

## Layer 1: Semantic HTML Defaults

These elements are styled automatically. Just use them.

### Typography
```html
<h1>Page Title</h1>          <!-- Scaled size, bold, proper margin -->
<h2>Section Title</h2>
<p>Body text with comfortable line height and spacing.</p>
<blockquote>Styled pull quote with accent border.</blockquote>
<code>Inline code</code>
<pre><code>Code block with monospace font</code></pre>
```

### Forms
```html
<form>
  <label>Email
    <input type="email" placeholder="you@example.com">
  </label>
  <label>Message
    <textarea placeholder="Tell us more..."></textarea>
  </label>
  <label>Priority
    <select>
      <option>High</option>
      <option>Medium</option>
      <option>Low</option>
    </select>
  </label>
  <button type="submit">Send</button>
</form>
```

All inputs get the Starlight glass styling, focus glow, and transitions automatically.

### Buttons
```html
<button>Default Button</button>         <!-- Glass surface, hover lift, active press -->
```

For call-to-action emphasis, use a variant class:
```html
<button class="btn-primary">Get Started</button>  <!-- Gradient, glow -->
<button class="btn-outline">Learn More</button>    <!-- Border-only -->
<button class="btn-ghost">Cancel</button>           <!-- Text-only -->
```

### Tables
```html
<table>
  <thead><tr><th>Name</th><th>Role</th><th>Status</th></tr></thead>
  <tbody>
    <tr><td>Alice</td><td>Engineer</td><td>Active</td></tr>
    <tr><td>Bob</td><td>Designer</td><td>Away</td></tr>
  </tbody>
</table>
```

## Layer 2: Component Classes

Use these for UI patterns that HTML doesn't have native elements for.

### Cards
```html
<div class="card">              <!-- Glass surface, border, shadow, padding -->
  <h3>Card Title</h3>
  <p>Card content</p>
</div>

<div class="starlight-card">   <!-- Premium: enhanced glassmorphism + glow -->
  <h3>Premium Card</h3>
  <p>With cosmic gradient accents</p>
</div>
```

### Navigation
```html
<header class="nav-header">
  <span>Logo</span>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </nav>
</header>
```

### Badges
```html
<span class="badge">Default</span>
<span class="badge badge-success">Active</span>
<span class="badge badge-warning">Pending</span>
<span class="badge badge-error">Failed</span>
```

### Alerts
```html
<div class="alert alert-success">Changes saved successfully.</div>
<div class="alert alert-warning">Your session expires in 5 minutes.</div>
<div class="alert alert-error">Could not connect to the server.</div>
```

### Dialogs
```html
<div class="dialog-overlay">
  <div class="dialog">
    <h3>Confirm Action</h3>
    <p>Are you sure you want to proceed?</p>
    <div>
      <button class="btn-primary">Confirm</button>
      <button>Cancel</button>
    </div>
  </div>
</div>
```

### Layout Presets
```html
<div class="dashboard">...</div>  <!-- 3-column responsive grid -->
<div class="gallery">...</div>    <!-- 4-column image grid -->
<div class="search">...</div>     <!-- Search bar with icon -->
```

### Accordion & Tabs
```html
<div class="accordion-group">
  <div class="accordion-item accordion active">
    <div class="accordion-header"><span>Section Title</span></div>
    <div class="accordion-content"><p>Content here</p></div>
  </div>
</div>

<div class="tab-list">
  <button class="tab-button active" data-tab="t1">Overview</button>
  <button class="tab-button" data-tab="t2">Details</button>
</div>
<div class="tab-content">
  <div class="tab-panel active" id="t1">Overview content</div>
  <div class="tab-panel" id="t2">Details content</div>
</div>
```

### Animations
```html
<div class="ani-float">Floating element</div>
<div class="ani-nebula">Ethereal background drift</div>
<div class="ani-twinkle">Sparkling star effect</div>
<div class="ani-orbit">Orbital path</div>
```

## Layer 3: Utility Escape Hatch

Use utilities sparingly for one-off adjustments. These are generated on demand by the JIT engine.

### Spacing
Scale: `0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32`

```html
<div class="mt-4 px-6 gap-8">  <!-- margin-top, padding-x, gap -->
```

### Layout
```html
<div class="flex items-center justify-between">...</div>
<div class="grid grid-cols-3 gap-6">...</div>
<div class="container mx-auto">...</div>
```

### Colors
```html
<span class="text-success">Saved</span>
<span class="text-error">Error</span>
<div class="bg-primary">...</div>
```

### Typography
```html
<span class="text-sm">Small</span>
<span class="text-xl font-bold">Large bold</span>
```

### Responsive via Attributes
Instead of class-based breakpoints, use HTML attributes:

```html
<div class="grid cols-1" md="cols-2" lg="cols-3">
  <!-- 1 col on mobile, 2 on tablet, 3 on desktop -->
</div>
```

Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)

### Interactive via Attributes
```html
<button class="btn-primary" hover="scale-105" active="scale-95">
  Click Me
</button>
```

## Theme System

### Automatic Dark/Light Mode
QuantumCSS follows `prefers-color-scheme` automatically. For manual control:

```javascript
document.documentElement.setAttribute('data-theme', 'light');
document.documentElement.setAttribute('data-theme', 'dark');
```

### Custom Themes via CSS Variables
Override any token with the `--q-` prefix:

```css
:root {
  --q-color-starlight-blue: #00d4ff;
  --q-color-starlight-peach: #ffb38a;
  --q-bg-primary: #08081a;
}
```

### Theme-Specific CSS (when needed)
```css
html[data-theme="light"] .custom-component {
  background: #ffffff;
  color: #1e293b;
}
```

Always use `html[data-theme="..."]` selectors, never body classes.

## Design Token Reference

### Colors
`primary`, `secondary`, `success`, `warning`, `error`, `neutral`
`starlight-blue` (#00d4ff), `starlight-peach` (#ffb38a), `starlight-orange` (#ff7e5f)

### Spacing
`0` (0px), `1` (4px), `2` (8px), `3` (12px), `4` (16px), `5` (20px), `6` (24px), `8` (32px), `10` (40px), `12` (48px), `16` (64px), `20` (80px), `24` (96px), `32` (128px)

### Border Radius
`none`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `full`

### Shadows
`sm`, `md`, `lg`, `xl`, `2xl`

### Z-Index
`auto, 0, 10, 20, 30, 40, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000`

## Quick Rules for AI Generation

1. **Start with bare HTML.** Add classes only when the default styling isn't enough.
2. **Prefer component classes** (`card`, `badge`, `alert`) over utility combinations.
3. **Use attributes for variants** (`md="cols-3"`) instead of class prefixes (`md:cols-3`).
4. **Use `html[data-theme]`** for theme-specific styles, never body classes.
5. **Run `npx quantumcss manifest`** to get the full token catalog for a project.

## Reference Examples

See the `examples/` directory for complete implementations:
- `kitchen-sink.html` -- Full component showcase
- `starlight.html` -- Premium Starlight components
- `index.html` -- Landing page with theme switching
