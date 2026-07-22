---
name: quantumcss
description: >
  Build pages with QuantumCSS (@howssatoshi/quantumcss): one static CSS file,
  semantic HTML first, named components second, finite utilities last.
  Use when the user wants QuantumCSS, quantum.min.css, Starlight glass UI,
  kitchen-sink components, --q-* theming, or runs /quantumcss.
  Prefer this skill over inventing Tailwind-like class soup.
metadata:
  short-description: "QuantumCSS — semantic HTML + glass components"
  version: "latest"
---

# QuantumCSS Skill

You are generating UI with **QuantumCSS**: a **static**, single-file CSS library
(`quantum.min.css`, ~35 KB gzipped) with Starlight glass aesthetics.

**Goal:** fewest classes, working markup on first try, dark/light safe.

This skill is for **consumers and coding agents**. Follow the recipes exactly.
Do not invent class names, attribute APIs, or a JIT/build step.

---

## 0. Load the CSS (required)

Every page must link **only** the built product file. Never load `src/styles/*.css`
alongside it (double-applies rules).

**CDN (no install):**
```html
<link rel="stylesheet"
  href="https://unpkg.com/@howssatoshi/quantumcss@latest/dist/quantum.min.css">
```

**npm:**
```bash
npm install @howssatoshi/quantumcss
```
```html
<link rel="stylesheet"
  href="node_modules/@howssatoshi/quantumcss/dist/quantum.min.css">
```

**Optional JS** (tabs, accordion, stars, theme bootstrap) — only if you use those widgets:
```html
<script src="https://unpkg.com/@howssatoshi/quantumcss@latest/src/starlight.js"></script>
```
Or from the package: `node_modules/@howssatoshi/quantumcss/src/starlight.js`.

`starlight.js` **auto-inits on `DOMContentLoaded`** (stars, nav helpers, dropdowns, accordions,
tabs, theme). You normally only need the script tag — no manual `Starlight.init*()` calls.

There is **no content-scan JIT**. Do not run a Tailwind-style class scanner.
Theming is CSS variables only (`npx quantumcss theme` emits an overlay).

---

## 1. Priority order (non-negotiable)

1. **Bare HTML** — `<button>`, `<input>`, `<form>`, `<table>`, headings, `<nav>` are already styled.
2. **Component class** — `card`, `badge`, `alert`, `nav-header`, `dialog`, `starlight-*`, layout presets.
3. **Utility escape hatch** — finite static atomics (`mt-4`, `flex`, `text-center`) only when 1–2 are not enough.

Before adding a class: *Does bare HTML already look right?* If yes, skip the class.

```html
<!-- GOOD: ~18 chars of classes -->
<div class="card">
  <h2>Title</h2>
  <p>Description</p>
  <button class="btn-primary">Action</button>
</div>

<!-- BAD: utility soup that rebuilds card (and often invents non-existent classes) -->
<div class="bg-white/5 rounded-xl border border-white/8 p-6 backdrop-blur-lg shadow-lg">
  ...
</div>
```

**Opacity note:** this library uses **underscores**, not slashes: `bg-white_5`, `border-white_10`.
Do not write Tailwind-style `bg-white/5`. Prefer components over either form.

---

## 2. Page skeleton (start here)

Emit this shape for any new page. Dark theme is the default aesthetic.

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page title</title>
  <link rel="stylesheet"
    href="https://unpkg.com/@howssatoshi/quantumcss@latest/dist/quantum.min.css">
</head>
<body>
  <!-- optional ambient stars: include starlight.js (auto-inits) -->
  <div class="starlight-stars ani-nebula"></div>

  <header class="nav-header">
    <a href="/" class="nav-logo">
      <i class="icon-starlight"></i>
      <span class="text-gradient font-bold">Brand</span>
    </a>
    <nav class="nav-links" aria-label="Primary">
      <a href="#features">Features</a>
      <a href="#pricing">Pricing</a>
    </nav>
    <button class="btn-primary">Get started</button>
  </header>

  <main class="p-8">
    <div class="max-w-6xl mx-auto">
      <h1>Page title</h1>
      <p class="text-secondary">Subtitle or lead.</p>

      <div class="card">
        <h2>Section</h2>
        <p>Body copy. Prefer bare elements inside cards.</p>
        <button class="btn-primary">Continue</button>
      </div>
    </div>
  </main>
</body>
</html>
```

Theme toggle (optional):
```js
document.documentElement.setAttribute('data-theme', 'light'); // or 'dark'
```

Always set theme on `<html>`, never on `body`.

---

## 3. Layer 1 — Bare HTML (zero classes)

These already get glass, focus glow, and spacing:

```html
<h1>Title</h1>
<p>Body with comfortable line height.</p>
<blockquote>Pull quote.</blockquote>

<form>
  <label>Email <input type="email" placeholder="you@example.com"></label>
  <label>Message <textarea placeholder="…"></textarea></label>
  <label>Priority
    <select><option>High</option><option>Low</option></select>
  </label>
  <button type="submit">Send</button>
</form>

<button>Default glass button</button>

<table>
  <thead><tr><th>Name</th><th>Status</th></tr></thead>
  <tbody><tr><td>Alice</td><td>Active</td></tr></tbody>
</table>
```

Do **not** re-style bare buttons with `btn-base px-4 py-2 border rounded-lg` unless you are
building a true variant. Prefer bare `<button>` or a named variant below.

---

## 4. Layer 2 — Component recipes (copy structure)

Use **these exact class names and child structures**. Invented children will not style correctly.

### Buttons
```html
<button>Default</button>
<button class="btn-primary">Get Started</button>
<button class="btn-outline">Learn More</button>
<button class="btn-ghost">Cancel</button>
<button class="btn-secondary">Secondary</button>
<button class="btn-starlight">Starlight CTA</button>
<button class="btn-sm">Small</button>
<button class="btn-lg">Large</button>
```

### Cards & surfaces
```html
<div class="card">…</div>
<div class="card-premium">…</div>
<div class="starlight-card">…</div>
<div class="starlight-card-interactive">…</div>
<div class="glass">…</div>
```

### Badges & alerts
```html
<span class="badge badge-primary">Primary</span>
<span class="badge badge-secondary">Secondary</span>
<span class="badge badge-success">Active</span>
<span class="badge badge-warning">Pending</span>
<span class="badge badge-error">Failed</span>

<div class="alert alert-success">Saved.</div>
<div class="alert alert-warning">Session expiring.</div>
<div class="alert alert-error">Connection failed.</div>
<div class="alert alert-info">Note.</div>
```

### Nav header (desktop + CSS hamburger pattern)
```html
<input type="checkbox" id="nav-toggle" class="nav-toggle">
<header class="nav-header">
  <a href="/" class="nav-logo" aria-label="Brand">
    <i class="icon-starlight"></i>
    <span class="text-gradient font-bold">Brand</span>
  </a>
  <nav class="nav-links" aria-label="Primary">
    <a href="#">Home</a>
    <details class="nav-dropdown">
      <summary>More</summary>
      <div class="nav-dropdown-panel">
        <a href="#">Item A</a>
        <a href="#">Item B</a>
      </div>
    </details>
  </nav>
  <a href="/profile" class="nav-profile" aria-label="Profile">JD</a>
  <label for="nav-toggle" class="nav-hamburger" aria-label="Toggle menu">
    <span class="nav-hamburger-icon"><span></span><span></span><span></span></span>
  </label>
</header>
<div class="nav-drawer">
  <div class="nav-drawer-inner">
    <a href="#">Home</a>
    <a href="#">More</a>
  </div>
</div>
```

Simpler marketing nav is fine with only `nav-header` + `nav-logo` + `nav-links` + a CTA button.

### Dialog
```html
<div class="dialog-overlay hidden" id="confirm">
  <div class="dialog">
    <button class="dialog-close" type="button" aria-label="Close"
      onclick="document.getElementById('confirm').classList.add('hidden')">
      <i class="icon-close"></i>
    </button>
    <h3>Confirm</h3>
    <p class="text-secondary">Proceed?</p>
    <button class="btn-primary">Confirm</button>
    <button type="button"
      onclick="document.getElementById('confirm').classList.add('hidden')">Cancel</button>
  </div>
</div>
```
Show with `classList.remove('hidden')`. Overlay is `position: fixed` + flex-centered.

### Dashboard stats
```html
<div class="dashboard">
  <div class="starlight-stat">
    <div class="starlight-stat-header">
      <span class="starlight-stat-label">Revenue</span>
      <i class="icon-dollar starlight-stat-icon"></i>
    </div>
    <div class="starlight-stat-value">$48.2k</div>
  </div>
  <!-- more starlight-stat cards -->
</div>
```

### Gallery
```html
<div class="gallery">
  <div class="gallery-item">
    <img src="…" alt="">
    <div class="gallery-overlay">Caption</div>
  </div>
</div>
<!-- or denser grid: -->
<div class="gallery-grid">…</div>
```

### Layout shells (app templates)
Prefer named shells over hand-built grids:

| Class | Use |
|-------|-----|
| `layout-email-3col` | Email-style three panes |
| `layout-admin-2col` | Admin sidebar + content |
| `layout-analytics-2col` | Analytics shell |
| `layout-chat-2col` | Chat shell |
| `layout-music-2col` / `layout-music-row` | Music app |

Related pane classes: `email-nav`, `email-feed`, `email-content`, `admin-sidebar`,
`admin-content`, `music-nav`, `music-content`, `music-footer`, `chat-sidebar`, `chat-content`.

### Accordion (needs `starlight.js` for toggle behavior)
```html
<div data-accordion>
  <div class="accordion-item accordion active">
    <div class="accordion-header">
      <span>Section title</span>
      <i class="icon-chevron-down accordion-icon"></i>
    </div>
    <div class="accordion-content">
      <p>Panel body.</p>
    </div>
  </div>
  <div class="accordion-item accordion">
    <div class="accordion-header">
      <span>Another</span>
      <i class="icon-chevron-down accordion-icon"></i>
    </div>
    <div class="accordion-content">
      <p>More body.</p>
    </div>
  </div>
</div>
```
There is **no** `accordion-group` class. Use `data-accordion` + `accordion-item`.

### Tabs (needs `starlight.js`)
```html
<div class="tab-list touch-slide">
  <button type="button" class="tab-button active" data-tab="tab-a">Overview</button>
  <button type="button" class="tab-button" data-tab="tab-b">Details</button>
</div>
<div class="tab-content glass p-6 rounded-xl">
  <div class="tab-panel active" id="tab-a"><p>Overview panel</p></div>
  <div class="tab-panel" id="tab-b"><p>Details panel</p></div>
</div>
```

### Starlight widgets (prefer over hand-rolled)
`starlight-table` + `starlight-table-container`, `starlight-chart`, `starlight-stat`,
`starlight-avatar` (+ `-sm`/`-md`/`-lg`/`-xl`), `starlight-progress` +
`starlight-progress-bar` / `starlight-progress-fill`, `starlight-page-header`,
`starlight-breadcrumb`, `starlight-hero`, `starlight-footer`, `starlight-player-controls`.

### Loading
```html
<div class="skeleton w-full h-64"></div>
<div class="spinner"></div>
```

### Icons
Use mask icon classes: `<i class="icon-starlight"></i>`, `icon-close`, `icon-home-fill`,
`icon-search`, `icon-chevron-down`, `icon-sun`, `icon-moon`, `icon-github`, etc.
Icons are CSS-only (no icon font file).

### Motion
```html
<div class="ani-float">…</div>
<div class="ani-nebula">…</div>
```

---

## 5. Layer 3 — Utilities (escape hatch only)

Finite static catalog. **Do not invent** Tailwind-scale utilities that are not in the catalog.

| Need | Safe examples |
|------|----------------|
| Layout | `flex`, `flex-col`, `items-center`, `justify-between`, `grid`, `grid-cols-1`…`grid-cols-6`, `gap-2`…`gap-8` |
| Spacing | `p-4`, `px-6`, `py-8`, `m-0`, `mt-4`, `mb-8`, `mx-auto` (scale: 0,1,2,3,4,5,6,8,10,12,16,20,24,32) |
| Type | `text-sm`, `text-lg`, `text-xl`, `text-2xl`, `font-bold`, `text-center` |
| Color | `text-primary`, `text-secondary`, `text-muted`, `text-success`, `text-error`, `bg-primary` |
| Size | `w-full`, `max-w-6xl`, `h-12`, `rounded-xl` |
| State (class form) | `hover:scale-105`, `md:grid-cols-2`, `md:flex` |
| Visibility | `hidden` |

### Responsive & state — **class form preferred**

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
<button class="btn-primary hover:scale-105">Go</button>
```

**Attribute form also exists for a finite dual-emitted set** (not freeform):

```html
<div class="grid grid-cols-1" md="grid-cols-2">
<button class="btn-primary" hover="scale-105">
```

Rules:
- Prefer **class** variants (`md:grid-cols-2`, `hover:scale-105`).
- Attribute lanes only work for utilities that were dual-emitted. **Do not invent**
  attributes like `md="anything-you-want"` or `hover="bg-purple-500"`.
- Breakpoints: `sm` 640px · `md` 768px · `lg` 1024px · `xl` 1280px · `2xl` 1536px.

**Never** rebuild `card` / `nav-header` / `dashboard` with utilities when a component exists.

---

## 6. Theming

### Runtime
```js
document.documentElement.setAttribute('data-theme', 'light'); // or 'dark'
```

### Token overrides (`--q-*` only)
```css
:root {
  --q-color-starlight-blue: #00d4ff;
  --q-color-starlight-peach: #ffb38a;
  --q-color-starlight-orange: #ff7e5f;
  --q-bg-primary: #08081a;
  --q-glass-blur: blur(16px);
}
```

Theme-specific overrides always use the `html` attribute selector:
```css
html[data-theme="light"] .my-widget {
  background: var(--q-light-card-bg);
  color: var(--q-light-text);
}
```

### Optional theme overlay (maintainer / app owner)
```bash
npx quantumcss init          # create quantum.config.json
npx quantumcss theme         # emit theme-overlay.css
npx quantumcss scaffold blog # copy an example template
npx quantumcss manifest      # JSON architecture notes for agents
```

Load overlay **after** `quantum.min.css`. Config only changes tokens — never class collection.

---

## 7. Design tokens (quick map)

| Kind | Values |
|------|--------|
| Accents | starlight-blue `#00d4ff`, peach `#ffb38a`, orange `#ff7e5f`, deep `#08081a` |
| Semantic text utils | `text-primary`, `text-secondary`, `text-muted`, `text-success`, `text-error` |
| Spacing steps | 0=0, 1=4px, 2=8px, 3=12px, 4=16px, 6=24px, 8=32px, 12=48px, 16=64px, 32=128px |
| Radius utils | `rounded-sm` … `rounded-xl`, `rounded-full` (finite catalog) |

---

## 8. Guardrails

1. **One CSS file** — only `quantum.min.css` (+ optional theme overlay). No dual load of source layers.
2. **No JIT** — do not invent a content-scan build. Utilities are a finite static list.
3. **No invented classes** — if a name is not in this skill or the package CSS, do not use it.
4. **Semantic colors** — avoid fixed `text-black` / `bg-white` on unanchored content; use
   `text-primary` / `text-secondary` / theme tokens so light and dark both work.
5. **Opacity** — use `bg-white_5` style names, not `bg-white/5`. Prefer components instead.
6. **Focus** — glass controls already focus; do not stack competing ring utilities.
7. **Interactive widgets** — accordion/tabs/stars need `starlight.js` (or your own equivalent JS).
   Nav hamburger with checkbox + `nav-toggle` is CSS-only.
8. **Ownership (library maintainers only)** — named UI in `quantum-components.css`; atomics in
   `quantum-utilities.css`; never both. See `component-owned-classes.json`.

---

## 9. Anti-patterns

```html
<!-- BAD: rebuild card -->
<div class="bg-white_5 rounded-xl border p-6 backdrop-blur-md">…

<!-- GOOD -->
<div class="card">…

<!-- BAD: re-style bare button -->
<button class="btn-base border rounded-lg px-4 py-2 cursor-pointer">Submit</button>

<!-- GOOD -->
<button>Submit</button>
<button class="btn-primary">Submit</button>

<!-- BAD: invented API -->
<div md="grid-cols-99" hover="glow-purple">…

<!-- GOOD: real responsive utilities -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">…

<!-- BAD: wrong accordion name -->
<div class="accordion-group">…

<!-- GOOD -->
<div data-accordion>…</div>
```

---

## 10. Prompt → markup map

| User ask | Emit |
|----------|------|
| Landing / marketing page | Skeleton + `nav-header` + `card` / `starlight-card` + bare type + `btn-primary` |
| Card + title + CTA | `card` or `starlight-card` + bare `h2`/`p` + `btn-primary` |
| Dashboard | `dashboard` + `starlight-stat` (+ optional `starlight-chart` / table) |
| Contact form | bare `<form>` / inputs / `<button type="submit">` |
| Confirm modal | `dialog-overlay` > `dialog` > `dialog-close` |
| App shell (email/admin/chat/music) | matching `layout-*-*` classes, not custom grids |
| Brand color change | override `--q-color-starlight-blue` / primary tokens |
| Light mode | `html[data-theme="light"]` |

---

## 11. Package map (when the repo or npm package is available)

| Path | Role |
|------|------|
| `dist/quantum.min.css` | **Ship this** — only stylesheet apps need |
| `src/starlight.js` | Optional UI helpers (tabs, accordion, stars, theme bootstrap) |
| `src/styles/quantum-base.css` | Tokens + element defaults |
| `src/styles/quantum-components.css` | Named UI (full ownership) |
| `src/styles/quantum-utilities.css` | Finite atomics (escape hatch) |
| `src/styles/quantum-icons.css` | Icon masks |
| `src/styles/quantum-animations.css` | `@keyframes` / `.ani-*` |
| `src/styles/component-owned-classes.json` | Names utilities must not redefine |
| `examples/kitchen-sink.html` | Full living catalog + Theme Designer |
| `examples/*.html` | App shells (email, music, admin, portfolio, …) |
| `AGENTS.md` | Maintainer ownership rules (not needed for app UI work) |

Live demos: open `examples/kitchen-sink.html` and app shells after `npm run build` if
editing the library itself. Consumers only need the CDN or `dist/` file.

CLI (from package):
```bash
npx quantumcss theme       # theme-overlay.css from quantum.config.json
npx quantumcss scaffold <type>  # gaming | blog | travel | shopping | starlight | news | docs
npx quantumcss manifest    # architecture JSON for agents
```

---

## 12. Generation checklist

- [ ] Linked **only** `quantum.min.css` (CDN or package path)?
- [ ] Started from bare HTML before adding classes?
- [ ] Used a **real** component recipe (correct children) before utilities?
- [ ] Avoided utility soup for cards / nav / forms / shells?
- [ ] Responsive classes use `md:` / `lg:` forms that exist (not invented attributes)?
- [ ] Theme via `html[data-theme]` and `--q-*` only?
- [ ] Light and dark both readable (semantic text colors)?
- [ ] Interactive pieces include `starlight.js` when needed?

---

## 13. Agent workflow

1. **Install or CDN-link** `quantum.min.css`.
2. **Start from the page skeleton** in §2.
3. **Compose with recipes** in §4; copy child structure, do not freestyle.
4. **Add utilities last** for spacing/alignment only.
5. **Theme** with `data-theme` and `--q-*` if asked.
6. **Verify** against the checklist — if a class is unknown, open kitchen-sink or
   search `quantum-components.css` / `quantum-utilities.css` rather than inventing.
