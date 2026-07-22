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
  version: "1.2.0"
---

# QuantumCSS Skill

Generate UI with **QuantumCSS**: one static file (`quantum.min.css`, ~35 KB gzipped).
**Goal:** fewest classes, correct structure, dark/light safe. No JIT, no invented classes.

## Sources of truth

1. **This skill** — policy, workflow, micro-recipes, pitfalls
2. **Kitchen-sink (markup SSOT)** — `examples/kitchen-sink.html` or  
   https://macroadster.github.io/quantumcss/examples/kitchen-sink.html  
   Prefer the **raw HTML file** (repo/raw) over GH Pages text extract when copying DOM.
3. **CSS source** — `src/styles/quantum-components.css` / `quantum-utilities.css`
4. **App shells** — `examples/*.html`

If skill and kitchen-sink disagree on child structure, prefer **kitchen-sink**, then verify the class exists in CSS.

---

## 0. Load

```html
<link rel="stylesheet"
  href="https://unpkg.com/@howssatoshi/quantumcss@latest/dist/quantum.min.css">
<!-- optional: tabs, accordion, stars, theme -->
<script src="https://unpkg.com/@howssatoshi/quantumcss@latest/src/starlight.js"></script>
```

npm: `@howssatoshi/quantumcss` → `dist/quantum.min.css` + `src/starlight.js`.

Link **only** the dist CSS (never `src/styles/*.css` alongside it).

### Theme bootstrap

```html
<html lang="en" data-theme="dark" data-theme-default="dark">
<!-- light marketing: -->
<html lang="en" data-theme="light" data-theme-default="light"
      data-theme-storage="path">
<!-- brand-fixed (ignore foreign localStorage): -->
<html data-theme-default="light" data-theme-locked>
```

| Attribute | Role |
|-----------|------|
| `data-theme` | Active theme on `<html>` only (never `body`) |
| `data-theme-default` | Fallback when storage empty / invalid |
| `data-theme-storage` | `path` = per-pathname key; or a custom key string; default `theme` |
| `data-theme-locked` | Always use `data-theme-default`; skip reading storage on bootstrap |

`starlight.js` auto-inits. Set theme: `document.documentElement.setAttribute('data-theme', 'light')`.

---

## 1. Priority (non-negotiable)

1. **Bare HTML** — buttons, inputs, forms, tables, headings already styled  
2. **Named component** — `card`, `nav-header`, kitchen-sink widgets  
3. **Finite utilities** — spacing/layout only (`mt-4`, `flex`, `md:grid-cols-2`)

```html
<!-- GOOD --><div class="card"><h2>Title</h2><button class="btn-primary">Go</button></div>
<!-- BAD --> <div class="bg-white_5 rounded-xl border p-6 backdrop-blur-lg">…
```

Opacity uses **underscores**: `bg-white_5`, not `bg-white/5`.

---

## 2. Page skeletons

### Dark product / cosmic

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark" data-theme-default="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page</title>
  <link rel="stylesheet" href="https://unpkg.com/@howssatoshi/quantumcss@latest/dist/quantum.min.css">
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
    </nav>
    <button class="btn-primary">Get started</button>
  </header>
  <main class="p-8">
    <div class="max-w-6xl mx-auto">
      <h1>Title</h1>
      <p class="text-secondary">Lead.</p>
      <div class="card">
        <h2>Section</h2>
        <button class="btn-primary">Continue</button>
      </div>
    </div>
  </main>
  <script src="https://unpkg.com/@howssatoshi/quantumcss@latest/src/starlight.js"></script>
</body>
</html>
```

### Light marketing / hospitality / retail

1. `data-theme="light"` + `data-theme-default="light"` (+ `data-theme-storage="path"` or `data-theme-locked` if needed)  
2. **Skip** `starlight-stars` / `ani-nebula` unless space-branded  
3. Prefer bare type + a few cards — do not glass-tile the whole page  
4. Shift `--q-*` tokens for brand; `.text-gradient` follows `--q-color-starlight-*`  

---

## 3. Micro-recipes

Copy **exact** class trees. Full DOM → kitchen-sink section named below.

| Need | Classes / contract | Kitchen-sink |
|------|-------------------|--------------|
| Buttons | bare, `btn-primary`, `btn-outline`, `btn-ghost`, `btn-secondary`, `btn-starlight`, `btn btn-glossy`, `btn-sm`/`btn-lg` | Component Presets |
| Cards | `card`, `card-premium`, `starlight-card`, `glass`, `surface-1`/`surface-2` | Presets / utilities |
| Badges | `badge badge-{primary,secondary,success,warning,error}` | Badges |
| Alerts | `alert alert-{success,warning,error,info}` | (CSS; simple class pair) |
| Nav | `nav-header` + `nav-logo` + `nav-links` + optional checkbox `nav-toggle` / `nav-hamburger` / `nav-drawer` | Navigation Menu |
| Sidebar | `aside-nav` tree (`aside-nav-item`, `aside-nav-group`, …) | Vertical Sidebar |
| Search | `search has-icon` > `icon-search` + `search-input` | Interactive Search |
| Stats A | `dashboard` > `starlight-card stat-card` > `stat-label` + `stat-value` + `stat-trend` | Dashboard Grid |
| Stats B | `dashboard` > `starlight-stat` > header/label/value | (alt API; pick one per page) |
| Table | `table-premium-container` > header + `table.table-premium` | Premium Data Table |
| Gallery | `gallery` > `gallery-item` > img + `gallery-overlay` | Gallery Widget |
| Dialog | `dialog-overlay` > `dialog` > `dialog-close` | Dialog Window |
| Accordion | `data-accordion` > `accordion-item accordion` > `accordion-header` + `accordion-content` | Accordion Group |
| Tabs | `tab-list` > `tab-button` + `tab-panel` (`data-tab` / id) | Tab Interface |
| Timeline | `timeline` > `timeline-item` > `timeline-dot` + `timeline-content` | Timeline |
| Form | bare `<form>` **or** `.form` + `.input` + optional `toggle-starlight` / `range-starlight` | Advanced Form |
| Layout shells | `layout-admin-2col`, `layout-email-3col`, `layout-chat-2col`, `layout-music-2col`, … | `examples/*` shells |
| Loading | `skeleton`, `spinner` | Loading States |
| Motion | `ani-float`, `ani-nebula`, `ani-cosmic-pulse`, `ani-twinkle` | Cosmic Animations |
| Icons | `icon-*` mask classes (no font file) | Quantum Icons |

**Accordion root is `data-accordion` — not `accordion-group`.**

### Utilities (escape hatch)

Finite set only: `flex`, `grid`, `grid-cols-1`…`6`, `gap-*`, `p-*`/`m-*` (scale 0–32), `text-sm`…`2xl`, `text-primary`/`secondary`/`muted`, `w-full`, `max-w-6xl`, `hidden`, `md:grid-cols-2`, `hover:scale-105`.  
Breakpoints: sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536.  
Prefer class form (`md:…`). Do not invent attributes or Tailwind-scale names.

---

## 4. Theming

```css
:root {
  --q-color-starlight-blue: #00d4ff;
  --q-color-starlight-peach: #ffb38a;
  --q-color-starlight-orange: #ff7e5f;
  --q-bg-primary: #08081a;
  --q-color-primary: #3b82f6;
}
```

`.text-gradient` uses starlight peach→blue tokens (override tokens, not the class, for brand color).

Optional: `npx quantumcss theme` → overlay after `quantum.min.css`.

**When Quantum is wrong as primary look:** quiet luxury / print editorial — still use structure components; add small brand CSS; avoid forcing utility soup.

---

## 5. Guardrails

1. One CSS file (+ optional theme overlay)  
2. No JIT / no invented classes  
3. Semantic text colors (`text-primary`…), not raw `text-black` on free content  
4. Interactive: accordion/tabs need `starlight.js`; nav hamburger is CSS-only  
5. One stats API per page (A **or** B)  
6. Light brands: no starfield; fewer glass cards  

### Anti-patterns

- Rebuilding `card` / `nav-header` with utility soup  
- `accordion-group` instead of `data-accordion`  
- Invented `md="…"` / `hover="…"` attributes  
- Assuming light theme alone makes UI “airy” without reducing glass density  

---

## 6. Prompt → emit

| Ask | Emit |
|-----|------|
| Landing | Skeleton + `nav-header` + `card` + `btn-primary` |
| Dashboard | `dashboard` + stats A or B |
| Admin | `aside-nav` or `layout-admin-2col` |
| Table | `table-premium-*` |
| FAQ | accordion micro-recipe |
| Modal | `dialog-overlay` > `dialog` |
| Timeline | `timeline` + items |
| Hospitality / light brand | Light skeleton; no stars; custom type OK |

---

## 7. Checklist

- [ ] Only `quantum.min.css` (+ optional overlay / starlight.js)?  
- [ ] Bare HTML first; real component trees second?  
- [ ] No utility soup for existing components?  
- [ ] Theme attrs + storage/locked set for brand?  
- [ ] Light brand: no starfield; not every block a card?  
- [ ] Stats API consistent?  
- [ ] Unknown widget → kitchen-sink raw HTML, not invention?  

## 8. Workflow

1. CDN/npm link CSS  
2. Dark **or** light skeleton; theme attributes  
3. Micro-recipes; open kitchen-sink only for complex DOM  
4. Utilities last  
5. Tokens for brand; checklist  

**Live catalog:** https://macroadster.github.io/quantumcss/examples/kitchen-sink.html  
**Raw (better for agents):** https://raw.githubusercontent.com/macroadster/quantumcss/main/examples/kitchen-sink.html
