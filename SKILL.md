---
name: quantumcss
description: >
  Build pages with QuantumCSS (@howssatoshi/quantumcss): one static CSS file,
  semantic HTML first, named components second, finite utilities last.
  Use when the user wants QuantumCSS, quantum.min.css, Starlight glass UI,
  kitchen-sink components, --q-* theming, luxury/marketing/dashboard shells,
  or runs /quantumcss. Prefer this skill over inventing Tailwind-like class soup.
metadata:
  short-description: "QuantumCSS — semantic HTML + glass components"
  version: "1.1.0"
---

# QuantumCSS Skill

You are generating UI with **QuantumCSS**: a **static** single-file CSS library
(`quantum.min.css`, ~35 KB gzipped) with Starlight glass aesthetics.

**Goal:** fewest classes, correct child structure, dark/light safe on first try.

This skill is for **consumers and coding agents**. Follow recipes exactly.
Do not invent class names, freeform attribute APIs, or a JIT/build step.

**Sources of truth (in order):**
1. This skill — policy, page workflow, common recipes, pitfalls
2. Live catalog — https://macroadster.github.io/quantumcss/examples/kitchen-sink.html
   (or package `examples/kitchen-sink.html`) for complex DOM you have not memorized
3. Package CSS — `src/styles/quantum-components.css` / `quantum-utilities.css`
4. App shells — `examples/*.html` (email, music, admin, portfolio, …)

If skill and kitchen-sink disagree on child structure, prefer **kitchen-sink** for
that widget, then verify the class exists in the shipped CSS.

---

## 0. Load the CSS (required)

Every page links **only** the built product. Never load `src/styles/*.css` alongside it.

**CDN:**
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

**Optional JS** (tabs, accordion, stars, theme bootstrap) — only if needed:
```html
<script src="https://unpkg.com/@howssatoshi/quantumcss@latest/src/starlight.js"></script>
```

`starlight.js` auto-inits on `DOMContentLoaded`. You normally need only the script tag.

**Theme bootstrap gotcha:** `starlight.js` re-applies theme from `localStorage` key
`theme`, then `html[data-theme-default]`, then `"dark"`. Explicit `data-theme` on
`<html>` can be overwritten by a previously stored value (including from another
demo on the same origin).

```html
<!-- Dark product / cosmic default -->
<html lang="en" data-theme="dark" data-theme-default="dark">

<!-- Light marketing / hospitality default -->
<html lang="en" data-theme="light" data-theme-default="light">
```

For a brand-fixed site, either skip `starlight.js`, or **force** the brand theme
before the script (do not only set when empty — shared `theme` keys pollute multi-page hosts):
```html
<script>
  try {
    // Prefer a site-scoped key when multiple Quantum demos share an origin
    var key = 'theme'; // or 'theme:' + location.pathname
    var brand = document.documentElement.getAttribute('data-theme-default') || 'dark';
    if (!localStorage.getItem(key)) localStorage.setItem(key, brand);
  } catch (e) {}
</script>
<script src="…/starlight.js"></script>
```

There is **no content-scan JIT**. Theming is CSS variables (+ optional overlay).

---

## 1. Priority order (non-negotiable)

1. **Bare HTML** — `<button>`, `<input>`, `<form>`, `<table>`, headings, `<nav>` are already styled.
2. **Component class** — `card`, `badge`, `nav-header`, `dialog`, `starlight-*`, layout shells, kitchen-sink widgets.
3. **Utility escape hatch** — finite static atomics only when 1–2 are not enough.

Before adding a class: *Does bare HTML already look right?* If yes, skip the class.

```html
<!-- GOOD -->
<div class="card">
  <h2>Title</h2>
  <p>Description</p>
  <button class="btn-primary">Action</button>
</div>

<!-- BAD: rebuild card -->
<div class="bg-white_5 rounded-xl border border-white_10 p-6 backdrop-blur-lg">…</div>
```

**Opacity:** underscores, not slashes — `bg-white_5`, not `bg-white/5`. Prefer components.

---

## 2. Page skeleton

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark" data-theme-default="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page title</title>
  <link rel="stylesheet"
    href="https://unpkg.com/@howssatoshi/quantumcss@latest/dist/quantum.min.css">
</head>
<body>
  <div class="starlight-stars ani-nebula" aria-hidden="true"></div>

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
      <p class="text-secondary">Lead copy.</p>
      <div class="card">
        <h2>Section</h2>
        <p>Prefer bare elements inside cards.</p>
        <button class="btn-primary">Continue</button>
      </div>
    </div>
  </main>
</body>
</html>
```

Theme toggle: set attribute on **`<html>` only**, never `body`.

```js
document.documentElement.setAttribute('data-theme', 'light'); // or 'dark'
```

### Light marketing skeleton (hospitality, editorial, retail)

When the brief is warm/airy (hotel, spa, fashion, food) rather than cosmic SaaS:

1. Use `data-theme="light"` + `data-theme-default="light"`.
2. **Skip** `starlight-stars` / `ani-nebula` unless the brand is space-themed.
3. Prefer bare type + a few `card`s — do not tile the whole page with glass cards.
4. Override `.text-gradient` and shift `--q-*` toward brand colors.
5. Expect light mode to still use **glass surfaces** (grey translucency). For truly
   quiet/airy material, add small brand CSS backgrounds and use more bare HTML.

---

## 3. Layer 1 — Bare HTML

Already get glass, focus glow, and spacing:

```html
<h1>Title</h1>
<p>Body.</p>
<blockquote>Pull quote.</blockquote>
<form>
  <label>Email <input type="email" placeholder="you@example.com"></label>
  <label>Message <textarea></textarea></label>
  <button type="submit">Send</button>
</form>
<button>Default glass button</button>
<table>
  <thead><tr><th>Name</th><th>Status</th></tr></thead>
  <tbody><tr><td>Alice</td><td>Active</td></tr></tbody>
</table>
```

Do **not** re-skin bare buttons with utility stacks unless building a true custom variant.

---

## 4. Layer 2 — Component recipes

Copy **exact class names and child structure**. Invented children will not style correctly.

### Buttons (all exist in CSS)

```html
<button>Default</button>
<button class="btn-primary">Primary</button>
<button class="btn-outline">Outline</button>
<button class="btn-ghost">Ghost</button>
<button class="btn-secondary">Secondary</button>
<button class="btn-starlight">Starlight CTA</button>
<button class="btn btn-glossy">Glossy</button>
<button class="btn btn-glossy-primary">Glossy primary</button>
<button class="btn-sm">Small</button>
<button class="btn-lg">Large</button>
```

### Cards & surfaces

```html
<div class="card">…</div>
<div class="card-premium">…</div>
<div class="starlight-card">…</div>
<div class="starlight-card-interactive">…</div>
<div class="glass p-6 rounded-xl">…</div>
<div class="surface-1 p-4 rounded-lg">…</div>
<div class="surface-2 p-4 rounded-lg">…</div>
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

### Nav header (marketing + hamburger)

Minimal marketing nav: `nav-header` + `nav-logo` + `nav-links` + CTA.

Full pattern (checkbox hamburger, CSS-only drawer) — see kitchen-sink. Essentials:

```html
<input type="checkbox" id="nav-toggle" class="nav-toggle">
<header class="nav-header">
  <a href="/" class="nav-logo">…</a>
  <nav class="nav-links" aria-label="Primary">…</nav>
  <a href="/profile" class="nav-profile" aria-label="Profile">JD</a>
  <label for="nav-toggle" class="nav-hamburger" aria-label="Toggle menu">
    <span class="nav-hamburger-icon"><span></span><span></span><span></span></span>
  </label>
</header>
<div class="nav-drawer"><div class="nav-drawer-inner">…</div></div>
```

### Vertical sidebar (`aside-nav`)

Prefer for admin/app shells. Kitchen-sink is authoritative for the full tree
(`aside-nav-header`, `aside-nav-inner`, `aside-nav-item`, `aside-nav-group`,
`aside-nav-footer`, `aside-nav-user`, …). Do not invent a custom sidebar grid
when `aside-nav` fits.

### Search

```html
<div class="search has-icon">
  <i class="icon-search"></i>
  <input type="search" class="search-input" placeholder="Search…">
</div>
```

### Dashboard stats — two valid APIs (both in CSS)

**A — kitchen-sink style (prefer when matching demos):**
```html
<div class="dashboard">
  <div class="starlight-card stat-card">
    <span class="stat-label">Revenue</span>
    <span class="stat-value">$48.2k</span>
    <div class="stat-trend up">
      <i class="icon-trend-up"></i> 2.1%
    </div>
  </div>
</div>
```

**B — starlight-stat style:**
```html
<div class="dashboard">
  <div class="starlight-stat">
    <div class="starlight-stat-header">
      <span class="starlight-stat-label">Revenue</span>
      <i class="icon-dollar starlight-stat-icon"></i>
    </div>
    <div class="starlight-stat-value">$48.2k</div>
  </div>
</div>
```

Pick **one** API per page. Do not mix halves of A and B.

### Premium table

```html
<div class="table-premium-container">
  <div class="table-premium-header">
    <div class="table-premium-title">Title</div>
    <div class="table-premium-filters">…</div>
  </div>
  <table class="table-premium">…</table>
</div>
```

Also valid: `starlight-table` + `starlight-table-container` when used in package examples.

### Gallery

```html
<div class="gallery">
  <div class="gallery-item">
    <img src="…" alt="">
    <div class="gallery-overlay">Caption</div>
  </div>
</div>
```

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
  </div>
</div>
```

Show: `classList.remove('hidden')`.

### Accordion (needs `starlight.js`)

```html
<div data-accordion>
  <div class="accordion-item accordion active">
    <div class="accordion-header">
      <span>Section</span>
      <i class="icon-chevron-down accordion-icon"></i>
    </div>
    <div class="accordion-content"><p>Body.</p></div>
  </div>
</div>
```

No `accordion-group` class. Use `data-accordion` + `accordion-item`.

### Tabs (needs `starlight.js`)

```html
<div class="tab-list touch-slide">
  <button type="button" class="tab-button active" data-tab="tab-a">Overview</button>
  <button type="button" class="tab-button" data-tab="tab-b">Details</button>
</div>
<div class="tab-content glass p-6 rounded-xl">
  <div class="tab-panel active" id="tab-a"><p>Overview</p></div>
  <div class="tab-panel" id="tab-b"><p>Details</p></div>
</div>
```

### Timeline

```html
<div class="timeline">
  <article class="timeline-item">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
      <span class="timeline-date">2024</span>
      <h4>Title</h4>
      <p class="text-sm text-secondary">Body.</p>
    </div>
  </article>
</div>
```

### Advanced form bits (kitchen-sink)

```html
<div class="form">
  <label class="text-sm font-semibold opacity-70">Name</label>
  <input type="text" class="input" placeholder="…">
  <input type="range" class="range-starlight" min="1" max="10">
  <div class="form-row">
    <div>
      <div class="font-semibold">Option</div>
      <div class="text-[10px] opacity-50">Help text</div>
    </div>
    <label class="toggle toggle-starlight">
      <input type="checkbox" class="toggle-input">
      <span class="toggle-slider"></span>
    </label>
  </div>
</div>
```

Bare `<form>` without `.form` / `.input` is still valid and preferred for simple contact forms.

### Layout shells

Prefer named shells over hand-built app grids:

| Class | Use |
|-------|-----|
| `layout-email-3col` | Email three panes |
| `layout-admin-2col` | Admin sidebar + content |
| `layout-analytics-2col` | Analytics |
| `layout-chat-2col` | Chat |
| `layout-music-2col` / `layout-music-row` | Music |

Related: `email-nav`, `admin-sidebar`, `admin-content`, `chat-sidebar`, `music-nav`, …

### Other Starlight widgets

`starlight-hero`, `starlight-footer`, `starlight-avatar` (+ size), `starlight-progress` +
`starlight-progress-bar` / `starlight-progress-fill`, `starlight-page-header`,
`starlight-breadcrumb`, `starlight-chart`, `starlight-player-controls`.

If structure is unclear, open kitchen-sink or package examples — do not invent children.

### Loading & motion

```html
<div class="skeleton w-full h-64"></div>
<div class="spinner"></div>
<div class="ani-float">…</div>
<div class="ani-nebula">…</div>
<div class="ani-cosmic-pulse">…</div>
<div class="ani-twinkle">…</div>
```

### Icons

CSS mask classes only (no icon font): `icon-starlight`, `icon-close`, `icon-search`,
`icon-clock-fill`, `icon-sun`, `icon-moon`, `icon-chevron-down`, `icon-cart`, …

Full list: kitchen-sink → Quantum Icons section.

---

## 5. Layer 3 — Utilities (escape hatch only)

Finite static catalog. **Do not invent** Tailwind-scale names.

| Need | Safe examples |
|------|----------------|
| Layout | `flex`, `flex-col`, `items-center`, `justify-between`, `grid`, `grid-cols-1`…`grid-cols-6`, `gap-2`…`gap-8` |
| Spacing | `p-4`, `px-6`, `py-8`, `m-0`, `mt-4`, `mb-8`, `mx-auto` (0,1,2,3,4,5,6,8,10,12,16,20,24,32) |
| Type | `text-sm`…`text-2xl`, `font-bold`, `text-center` |
| Color | `text-primary`, `text-secondary`, `text-muted`, `text-success`, `text-error`, `bg-primary` |
| Size | `w-full`, `max-w-6xl`, `h-12`, `rounded-xl` |
| State | `hover:scale-105`, `md:grid-cols-2`, `md:flex` |
| Visibility | `hidden` |

Prefer **class** responsive/state forms (`md:grid-cols-2`). Attribute forms
(`md="grid-cols-2"`) only work for a dual-emitted finite set — do not invent attributes.

Breakpoints: `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280 · `2xl` 1536.

**Never** rebuild `card` / `nav-header` / `dashboard` / `aside-nav` with utilities when a component exists.

---

## 6. Theming & brand pitfalls

### Runtime theme

```js
document.documentElement.setAttribute('data-theme', 'light');
```

### Token overrides (`--q-*`)

```css
:root {
  --q-color-starlight-blue: #00d4ff;
  --q-color-starlight-peach: #ffb38a;
  --q-color-starlight-orange: #ff7e5f;
  --q-bg-primary: #08081a;
  --q-color-primary: #3b82f6;
  --q-glass-blur: blur(16px);
}
```

Theme-specific rules: always `html[data-theme="light"] …`, not `body`.

### Known theming gaps (do not trust tokens alone)

| Surface | Issue | Fix |
|---------|--------|-----|
| `.text-gradient` | Often **hardcoded** sky→violet; may ignore `--q-color-starlight-*` | Override `.text-gradient` in page CSS with brand gradient |
| Glass / cards | Default is sci‑fi glass; **light theme still looks grey/glass**, not warm paper | Fewer cards; soft page background; bare HTML for long copy |
| Theme storage | Shared `localStorage.theme` across pages on same origin | Seed brand default; prefer site-scoped key for multi-demo hosts |
| Icons | Generic product icons | Prefer few icons; avoid packing every tile with icons on luxury sites |
| Stars | `starlight-stars` + `ani-nebula` bias cosmic dark UIs | Omit on hospitality / daylight brands |

### Optional theme overlay

```bash
npx quantumcss init
npx quantumcss theme          # theme-overlay.css
npx quantumcss scaffold blog  # example templates
npx quantumcss manifest       # architecture JSON for agents
```

Load overlay **after** `quantum.min.css`. Config changes tokens only, not class collection.

### When QuantumCSS is the wrong primary tool

If the brand needs quiet material luxury, print-like typography, or zero glass:
still use QuantumCSS for **structure** (nav, form, dialog, grid shells) but expect
**custom CSS** for identity. Do not force utility soup to fake a different design system.

---

## 7. Design tokens (quick map)

| Kind | Values |
|------|--------|
| Accents | starlight-blue `#00d4ff`, peach `#ffb38a`, orange `#ff7e5f`, deep `#08081a` |
| Semantic text | `text-primary`, `text-secondary`, `text-muted`, `text-success`, `text-error` |
| Spacing | 0=0, 1=4px, 2=8px, 3=12px, 4=16px, 6=24px, 8=32px, 12=48px, 16=64px, 32=128px |
| Radius | `rounded-sm` … `rounded-xl`, `rounded-full` (finite) |

Full color ramps: kitchen-sink Colors section (do not invent `blue-450` etc.).

---

## 8. Guardrails

1. **One CSS file** — only `quantum.min.css` (+ optional theme overlay).
2. **No JIT** — no content-scan build; utilities are finite.
3. **No invented classes** — unknown name → kitchen-sink or source CSS, never freestyle.
4. **Semantic colors** — avoid fixed `text-black` / `bg-white` on unanchored content.
5. **Opacity** — `bg-white_5`, not `bg-white/5`.
6. **Focus** — glass controls already focus; do not stack competing rings.
7. **Interactive widgets** — accordion/tabs/stars need `starlight.js` (or equivalent).
   Nav hamburger with checkbox + `nav-toggle` is CSS-only.
8. **One stats API per page** — `stat-card` *or* `starlight-stat`, not mixed halves.
9. **Brand sites** — override `.text-gradient` and seed theme storage if using starlight.js.

---

## 9. Anti-patterns

```html
<!-- BAD: rebuild card -->
<div class="bg-white_5 rounded-xl border p-6 backdrop-blur-md">…

<!-- GOOD -->
<div class="card">…

<!-- BAD: wrong accordion root -->
<div class="accordion-group">…

<!-- GOOD -->
<div data-accordion>…

<!-- BAD: invent responsive attributes -->
<div md="grid-cols-99" hover="glow-purple">…

<!-- GOOD -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">…

<!-- BAD: assume text-gradient follows --q-* -->
<span class="text-gradient">Brand</span>  <!-- may stay purple -->

<!-- GOOD: brand override in page CSS -->
```

---

## 10. Prompt → markup map

| User ask | Emit |
|----------|------|
| Landing / marketing | Skeleton + `nav-header` + `card`/`starlight-card` + bare type + `btn-primary` |
| Card + CTA | `card` or `starlight-card` + bare `h2`/`p` + button variant |
| Dashboard | `dashboard` + `stat-card` *or* `starlight-stat` |
| Admin app | `aside-nav` or `layout-admin-2col`, not a custom 2-col utility grid |
| Data table | `table-premium-container` + `table-premium` |
| Contact form | bare `<form>` or `.form` + `.input` |
| Confirm modal | `dialog-overlay` > `dialog` |
| Timeline / roadmap | `timeline` + `timeline-item` |
| Search field | `search has-icon` + `search-input` |
| Brand color change | `--q-*` **and** override `.text-gradient` if used |
| Light mode | `html[data-theme="light"]` + `data-theme-default` / storage hygiene |
| Luxury / editorial brand | Quantum structure + **custom CSS** for type/hero; do not force cosmic glass |

---

## 11. Package map

| Path | Role |
|------|------|
| `dist/quantum.min.css` | **Ship this** |
| `src/starlight.js` | Tabs, accordion, stars, theme bootstrap |
| `src/styles/quantum-base.css` | Tokens + element defaults |
| `src/styles/quantum-components.css` | Named UI |
| `src/styles/quantum-utilities.css` | Finite atomics |
| `examples/kitchen-sink.html` | Living catalog + Theme Designer |
| `examples/*.html` | App shells |
| `AGENTS.md` | Maintainer ownership (not needed for app UI) |

Live: https://macroadster.github.io/quantumcss/examples/kitchen-sink.html

---

## 12. Generation checklist

- [ ] Linked **only** `quantum.min.css`?
- [ ] Started from bare HTML before classes?
- [ ] Used a **real** component recipe (correct children)?
- [ ] Avoided utility soup for cards / nav / forms / shells?
- [ ] Responsive via real `md:` / `lg:` classes (not invented attributes)?
- [ ] Theme via `html[data-theme]` / `data-theme-default` and storage hygiene?
- [ ] If using `.text-gradient` for brand, verified color (override if purple)?
- [ ] Light and dark readable (semantic text colors)?
- [ ] Interactive pieces include `starlight.js` when needed?
- [ ] Stats API consistent (`stat-card` XOR `starlight-stat`)?
- [ ] Light/hospitality brand: no starfield, not every block a glass card?

---

## 13. Agent workflow

1. Install or CDN-link `quantum.min.css`.
2. Start from the page skeleton (§2); pick dark **or** light marketing skeleton; set `data-theme-default`.
3. Compose with recipes (§4); for complex widgets open kitchen-sink once.
4. Add utilities last for spacing/alignment only.
5. Theme with `data-theme` and `--q-*`; fix `.text-gradient` if brand-critical.
6. Verify checklist — unknown class → kitchen-sink or source CSS, never invent.

For complex widgets not fully spelled out here (`aside-nav`, window manager), copy structure from `examples/kitchen-sink.html`.
