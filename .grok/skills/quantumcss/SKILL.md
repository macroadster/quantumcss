---
name: quantumcss
description: >
  Write token-efficient QuantumCSS markup and styles. Prefer bare semantic HTML,
  then component classes, then finite static utilities. Use for QuantumCSS UI,
  Starlight glassmorphism, kitchen-sink components, theming via --q-* variables,
  or when the user mentions quantum.min.css / @howssatoshi/quantumcss.
  Use when building pages with this library or when the user runs /quantumcss.
metadata:
  short-description: "QuantumCSS token-efficient UI"
---

# QuantumCSS Skill

You are generating UI with **QuantumCSS** (`dist/quantum.min.css`): a static, single-file CSS library with Starlight (cosmic glass) aesthetics. Goal: **minimal classes, maximum beauty, AI-token efficiency**.

## Non-negotiable priority order

1. **Bare HTML** — `<button>`, `<input>`, `<form>`, `<table>`, `<h1>`–`<p>`, `<nav>` are already styled.
2. **Component class** — `card`, `badge`, `alert`, `nav-header`, `dialog`, `dashboard`, `starlight-*`.
3. **Utility escape hatch** — finite static atomics (`mt-4`, `flex`, `text-center`, `grid`) only when 1–2 are insufficient.

Before adding any class, ask: *Does bare HTML already handle this?* If yes, skip the class.

```html
<!-- GOOD: ~18 chars of classes -->
<div class="card">
  <h2>Title</h2>
  <p>Description</p>
  <button>Action</button>
</div>

<!-- BAD: utility soup that rebuilds card -->
<div class="bg-white/5 rounded-xl border border-white/8 p-6 backdrop-blur-lg shadow-lg">
  <h2 class="text-xl font-bold mb-4">Title</h2>
  <p class="text-secondary mb-6">Description</p>
  <button class="btn-base px-4 py-2">Action</button>
</div>
```

## Product facts (do not invent a JIT)

- Ship **one file**: `dist/quantum.min.css` (or CDN / npm package path).
- Architecture is **static-first**: base → icons → components → animations → utilities. No content-scan JIT in the product build.
- Named UI lives in **components**. Atomic utilities are a **finite catalog**.
- Theming is **CSS variables** (`--q-*`), not class collection. Optional: `npx quantumcss theme` or kitchen-sink Theme Designer knobs.
- Examples load **only** `dist/quantum.min.css` — never double-load `src/styles/*.css` beside dist.

## Layer 1 — Semantic defaults (zero classes)

```html
<h1>Page title</h1>
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

Inputs, selects, and buttons already get glass, focus glow, and transitions.

## Layer 2 — Component classes

### Buttons
```html
<button>Default</button>
<button class="btn-primary">Get Started</button>   <!-- gradient CTA -->
<button class="btn-outline">Learn More</button>
<button class="btn-ghost">Cancel</button>
<button class="btn-starlight">Starlight CTA</button>
<button class="btn-secondary">Secondary glass</button>
```

### Cards & surfaces
```html
<div class="card">…</div>
<div class="starlight-card">…</div>
<div class="starlight-card-interactive">…</div>
<div class="glass">…</div>
```

### Navigation
```html
<header class="nav-header">
  <span>Logo</span>
  <nav>
    <a href="/">Home</a>
    <a href="/features">Features</a>
  </nav>
</header>
```

### Badges, alerts, dialog
```html
<span class="badge badge-success">Active</span>
<span class="badge badge-warning">Pending</span>
<span class="badge badge-error">Failed</span>

<div class="alert alert-success">Saved.</div>
<div class="alert alert-warning">Session expiring.</div>
<div class="alert alert-error">Connection failed.</div>

<div class="dialog-overlay">
  <div class="dialog">
    <button class="dialog-close" aria-label="Close">×</button>
    <h3>Confirm</h3>
    <p>Proceed?</p>
    <button class="btn-primary">Confirm</button>
    <button>Cancel</button>
  </div>
</div>
```

### Layout presets (named — not utility grids)
```html
<div class="dashboard">…</div>          <!-- responsive multi-col stats -->
<div class="gallery">…</div>            <!-- image grid -->
<div class="search">…</div>             <!-- search shell -->
<div class="layout-email-3col">…</div>  <!-- app shells: email/music/chat/admin -->
<div class="email-nav">…</div>
<div class="music-footer">…</div>
```

### Starlight widgets (prefer these over hand-rolled tables/charts)
`starlight-table`, `starlight-table-container`, `starlight-chart`, `starlight-stat`, `starlight-avatar`, `starlight-progress`, `starlight-player-*`, `starlight-page-header`, `starlight-breadcrumb`, `gallery-grid`

### Accordion, tabs, motion
```html
<div class="accordion-group">…</div>
<div class="tab-list">…</div>
<div class="ani-float">…</div>
<div class="ani-nebula">…</div>
```

## Layer 3 — Utilities (escape hatch only)

Finite static catalog in `src/styles/quantum-utilities.css` (shipped inside dist).

| Need | Example |
|------|---------|
| Spacing | `mt-4`, `px-6`, `gap-8` (scale: 0,1,2,3,4,5,6,8,10,12,16,20,24,32) |
| Flex/grid | `flex items-center justify-between`, `grid grid-cols-3 gap-6` |
| Type | `text-sm`, `text-xl`, `font-bold` |
| Color | `text-success`, `text-error`, `text-primary`, `bg-primary` |
| Align | `text-center`, `mx-auto` |

### Responsive & state

Prefer **readable** markup. Both forms may exist in the catalog; do not invent new combinators.

```html
<!-- Class variants (common in examples) -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<!-- Attribute lanes (also supported where emitted) -->
<div class="grid grid-cols-1" md="grid-cols-2" lg="grid-cols-3">
<button class="btn-primary" hover="scale-105" active="scale-95">
```

Breakpoints: `sm` 640px · `md` 768px · `lg` 1024px · `xl` 1280px · `2xl` 1536px.

**Do not** rebuild components with utilities when `card` / `dashboard` / `nav-header` exists.

## Theming

### Runtime / manual theme
```js
document.documentElement.setAttribute('data-theme', 'light'); // or 'dark'
```

### Tokens (`--q-` prefix only)
```css
:root {
  --q-color-starlight-blue: #00d4ff;
  --q-color-starlight-peach: #ffb38a;
  --q-color-starlight-orange: #ff7e5f;
  --q-bg-primary: #08081a;
  --q-glass-blur: blur(16px);
}
```

Theme-specific overrides:
```css
html[data-theme="light"] .my-widget {
  background: var(--q-light-card-bg);
  color: var(--q-light-text);
}
```

Always use `html[data-theme="…"]` — never body theme classes.

Optional config (theme only, not class scan):

```json
{
  "theme": {
    "colors": { "primary": "hsl(217, 91%, 60%)", "starlight-blue": "hsl(217, 100%, 50%)" },
    "glass": { "blur": "16px" },
    "spacingScale": 1
  }
}
```

```bash
npx quantumcss theme          # emit theme-overlay.css
npx quantumcss manifest       # architecture notes for agents
```

## Design tokens (quick)

| Kind | Values |
|------|--------|
| Accents | `starlight-blue` #00d4ff, `starlight-peach` #ffb38a, `starlight-orange` #ff7e5f |
| Semantic | `primary`, `secondary`, `success`, `warning`, `error`, `neutral` |
| Spacing steps | 0=0, 1=4px … 4=16px … 8=32px … 16=64px … 32=128px |
| Radius | `none` `sm` `md` `lg` `xl` `2xl` `3xl` `full` |
| Shadow | `sm` `md` `lg` `xl` `2xl` |

## Guardrails

1. **Surface anchoring** — Do not put fixed colors (`text-black`, `bg-white`) on unanchored surfaces. Use semantic tokens (`text-primary`, theme vars) so light/dark both work.
2. **No fixed-color soup on body content** — prefer semantic text/background tokens.
3. **Focus** — glass controls should focus the outer shell (`:focus-within`); do not invent competing rings.
4. **Transparency** — prefer `color-mix` / existing glass tokens over hardcoded muddy `rgba`.
5. **Ownership** — never define the same class in both `quantum-utilities.css` and `quantum-components.css`. Named UI → components; atomics → utilities.
6. **No dual CSS loads** — examples and apps load only `dist/quantum.min.css`.
7. **Do not reintroduce content-scan JIT** into the product build.

## Anti-patterns

```html
<!-- BAD: rebuild card -->
<div class="bg-white/5 rounded-xl border p-6 backdrop-blur-lg">…

<!-- GOOD -->
<div class="card">…

<!-- BAD: re-style bare button that already looks right -->
<button class="btn-base border rounded-lg px-4 py-2 cursor-pointer">Submit</button>

<!-- GOOD -->
<button>Submit</button>
<!-- or -->
<button class="btn-primary">Submit</button>
```

## Prompt → expected shape (few-shot)

| User ask | Prefer |
|----------|--------|
| Card with title + CTA | `card` or `starlight-card` + bare `h3`/`p` + `btn-primary` |
| Nav header | `nav-header` + bare links |
| Dashboard stats | `dashboard` + `card` + `badge-*` |
| Contact form | bare `<form>` / inputs / button |
| Confirm modal | `dialog-overlay` > `dialog` |
| Custom 4-col only on desktop | `grid` + `md:`/`lg:` or layout preset if it fits |
| Restyle brand color | override `--q-color-starlight-blue` / primary tokens |

## Where to look in this repo

| Path | Role |
|------|------|
| `dist/quantum.min.css` | Ship this |
| `src/styles/quantum-base.css` | Tokens + element defaults |
| `src/styles/quantum-components.css` | Named UI (full ownership) |
| `src/styles/quantum-utilities.css` | Finite atomics |
| `src/styles/component-owned-classes.json` | Names utilities must not redefine |
| `examples/kitchen-sink.html` | Full component + theme designer |
| `examples/*.html` | App shells (email, music, admin, …) |
| `AGENTS.md` | Static-first ownership for maintainers |

## Generation checklist

- [ ] Started from bare HTML?
- [ ] Used a component class before any utility?
- [ ] Avoided utility soup for cards/nav/forms?
- [ ] Theme overrides use `html[data-theme]` and `--q-*`?
- [ ] Linked only `quantum.min.css`?
- [ ] Light and dark both readable (semantic colors)?
