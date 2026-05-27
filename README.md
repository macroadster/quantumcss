# QuantumCSS

![Quantum CSS](https://img.shields.io/badge/Quantum%20CSS-v1.13.1-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Bundle Size](https://img.shields.io/badge/gzipped-~33%20KB-brightgreen)

**Beautiful UI by default.** One `<link>` tag. No class soup. No build step required.

QuantumCSS gives your HTML taste so you don't have to think about it. Buttons look like buttons. Cards look like cards. Forms look like forms. You write semantic markup; QuantumCSS makes it look good.

```html
<link rel="stylesheet" href="quantum.min.css">

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<main>
  <div class="card">
    <h2>Just write HTML</h2>
    <p>QuantumCSS handles the presentation.</p>
    <button>Get Started</button>
  </div>
</main>
```

No utility classes. No configuration. That markup renders a polished, dark-mode-ready UI with glassmorphism, smooth transitions, and responsive spacing out of the box.

## Philosophy

Think of QuantumCSS as the **SQLite of UI frameworks**:

- **Zero configuration** -- works the moment you include it
- **Tiny footprint** -- ~33 KB gzipped, ships as a single CSS file
- **Sensible defaults** -- beautiful without any classes at all
- **Batteries included** -- but you never have to think about the batteries

The inspiration is macOS Aqua: when Apple shipped those translucent, luminous buttons in 2000, every developer got beauty for free. `NSButton` didn't require 14 utility classes. It just *looked right*. QuantumCSS aims for that same quality -- a design system with built-in taste.

### The three layers

QuantumCSS has an opinionated layering model. Reach for the next layer only when the previous one isn't enough:

| Layer | What it does | Example |
|-------|-------------|---------|
| **1. Semantic defaults** | Bare HTML elements look great | `<button>`, `<input>`, `<table>` |
| **2. Component classes** | Small vocabulary for things HTML can't express | `card`, `badge`, `toast`, `avatar` |
| **3. Utility escape hatch** | Fine-grained overrides when you need them | `text-center`, `mt-4`, `bg-primary` |

Most pages need only layers 1 and 2. Layer 3 exists for the 20% of cases where you need precise control.

### Token efficiency

This layering matters for AI-assisted development. Compare a card component:

```html
<!-- Tailwind: ~180 characters of classes -->
<div class="bg-white rounded-lg shadow-lg p-6 border border-gray-200
            dark:bg-gray-800 dark:border-gray-700">
  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Title</h3>
  <p class="text-gray-600 dark:text-gray-300">Description</p>
  <button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md
                 hover:bg-blue-700 transition-colors">Action</button>
</div>

<!-- QuantumCSS: 18 characters -->
<div class="card">
  <h2>Title</h2>
  <p>Description</p>
  <button>Action</button>
</div>
```

Same visual result. 10x fewer tokens. That efficiency compounds across every page, every component, every prompt.

## Quick Start

### CDN (no build step)
```html
<link rel="stylesheet" href="https://unpkg.com/@howssatoshi/quantumcss/dist/quantum.min.css">
```

### npm
```bash
npm install @howssatoshi/quantumcss
```

Then either link the CSS directly:
```html
<link rel="stylesheet" href="node_modules/@howssatoshi/quantumcss/dist/quantum.min.css">
```

Or use the CLI to build a custom bundle with JIT utilities:
```bash
npx quantumcss build
```

## What You Get for Free

### Every HTML element, styled

QuantumCSS resets and styles base elements so bare markup looks polished:

- **Typography** -- `h1`-`h6`, `p`, `blockquote`, `code`, `pre` with proper scale and spacing
- **Forms** -- `input`, `textarea`, `select`, `button` with focus glow, transitions, and validation states
- **Tables** -- `table`, `th`, `td` with alternating rows and clean borders
- **Lists** -- `ul`, `ol`, `li` with sensible defaults
- **Links** -- `a` with color, hover transitions, and underline behavior

### Automatic dark/light mode

QuantumCSS follows `prefers-color-scheme` by default. No toggle needed -- it just works. When you do want manual control:

```javascript
document.documentElement.setAttribute('data-theme', 'light');
```

### Responsive spacing

Spacing tokens automatically scale down on narrow screens via CSS custom properties. A `--q-space-8` that gives 2rem on desktop becomes 1.5rem on mobile. No breakpoint classes needed for basic responsiveness.

### Accessibility

- High contrast mode support (`prefers-contrast: more`, `forced-colors: active`)
- Reduced motion support (`prefers-reduced-motion`)
- Focus indicators on all interactive elements

## Component Classes

For UI patterns that HTML doesn't natively express, QuantumCSS provides a small vocabulary of semantic classes:

| Class | What it renders |
|-------|----------------|
| `card` / `starlight-card` | Glass-effect container with border, shadow, padding |
| `badge` | Inline status indicator (add `badge-success`, `badge-error`, etc.) |
| `alert` | Notification banner (add `alert-warning`, `alert-success`, etc.) |
| `toast` | Floating notification |
| `nav-header` | Sticky glassmorphic navigation bar |
| `btn-primary` | Gradient call-to-action button |
| `btn-outline` / `btn-ghost` | Secondary button variants |
| `dialog` | Centered modal with backdrop |
| `accordion` | Collapsible content sections |
| `tab-list` / `tab-panel` | Tabbed interface |
| `dashboard` | Responsive 3-column grid |
| `search` | Search input with icon container |
| `timeline` | Vertical event timeline |

These compose the full Starlight design system -- a cosmic, glassmorphic aesthetic with smooth gradients and subtle depth.

```html
<!-- A complete dashboard with almost no classes -->
<header class="nav-header">
  <span>My App</span>
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
  </nav>
</header>

<main class="dashboard">
  <div class="card">
    <h3>Users</h3>
    <span class="badge badge-success">+12%</span>
    <p>12,543 active</p>
  </div>
  <div class="card">
    <h3>Revenue</h3>
    <p>$48,210</p>
  </div>
  <div class="card">
    <h3>Orders</h3>
    <p>1,893 this month</p>
  </div>
</main>
```

## Utility Escape Hatch

When you need fine-grained control, QuantumCSS includes a JIT utility engine. These are the exception, not the rule:

```html
<!-- Override spacing on a specific element -->
<div class="card mt-8 text-center">...</div>

<!-- Custom grid layout -->
<div class="grid grid-cols-2 gap-4">...</div>
```

### Attribute-based variants

Instead of cramming variants into class strings, QuantumCSS uses HTML attributes for responsive and interactive states:

```html
<div class="grid cols-1" md="cols-3" hover="bg-primary" dark="bg-black">
  <button class="btn-primary" hover="scale-105" active="scale-95">
    Launch
  </button>
</div>
```

This keeps markup readable and avoids the `class="sm:flex md:grid lg:grid-cols-3 xl:gap-8 hover:bg-blue-500 dark:bg-gray-900"` problem.

### Available utilities

The JIT engine supports spacing, colors, typography, layout, transforms, gradients, and more. Run `npx quantumcss manifest` to generate a complete catalog of available tokens for your project.

## Theming

### CSS custom properties

All design tokens use the `--q-` prefix and can be overridden:

```css
:root {
  --q-color-starlight-blue: #00d4ff;  /* accent color */
  --q-color-starlight-peach: #ffb38a; /* secondary accent */
  --q-bg-primary: #08081a;            /* background */
}
```

### Starlight design system

The default theme is "Starlight" -- a cosmic glassmorphic aesthetic with translucent surfaces, soft gradients, and depth-aware shadows. It ships with:

- Glass-effect surfaces with backdrop blur
- Cosmic gradient accents (peach-to-blue)
- Ambient glow on focus states
- Smooth transitions on all interactive elements

## CLI

```bash
npx quantumcss init                         # Create quantum.config.json
npx quantumcss build                        # Build dist/quantum.css
npx quantumcss build custom.css             # Custom output path
npx quantumcss watch                        # Rebuild on file changes
npx quantumcss scaffold blog index.html     # Generate starter template
npx quantumcss manifest design-system.json  # Export design tokens for AI
```

## Demo Pages

Working examples in the [examples/](examples/) directory:

| Template | Description |
|----------|-------------|
| [portfolio.html](examples/portfolio.html) | Landing page with timeline |
| [blog.html](examples/blog.html) | Blog layout |
| [news.html](examples/news.html) | News portal |
| [shopping.html](examples/shopping.html) | E-commerce store |
| [admin-panel.html](examples/admin-panel.html) | Admin dashboard |
| [analytics-dashboard.html](examples/analytics-dashboard.html) | Analytics view |
| [chat-messaging.html](examples/chat-messaging.html) | Chat interface |
| [email-client.html](examples/email-client.html) | Email inbox |
| [music-streaming.html](examples/music-streaming.html) | Music player |
| [video-streaming.html](examples/video-streaming.html) | Video platform |
| [kitchen-sink.html](examples/kitchen-sink.html) | Full component reference |

## Performance

- **~33 KB gzipped** -- full library including components, animations, and JIT utilities
- **Zero runtime JavaScript** required for styling
- **GPU-accelerated animations** with `will-change` and hardware transforms
- **CSS containment** isolates layout and paint for complex effects
- **JIT tree-shaking** -- only utilities you use appear in production builds

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

MIT -- see [LICENSE](LICENSE).
