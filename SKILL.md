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
  version: "1.2.1"
---

# QuantumCSS Skill

One static file (`quantum.min.css`). **Fewest classes, correct trees, readable light/dark.**
No JIT. No invented classes.

## Sources of truth

1. **This skill** — policy, micro-recipes, short snippets  
2. **Kitchen-sink** (full catalog) — `examples/kitchen-sink.html` or  
   https://raw.githubusercontent.com/macroadster/quantumcss/main/examples/kitchen-sink.html  
   Prefer **raw HTML**, not GH Pages text extract.  
3. **CSS** — `src/styles/quantum-components.css` / `quantum-utilities.css`

---

## 0. Load + theme

```html
<link rel="stylesheet" href="https://unpkg.com/@howssatoshi/quantumcss@latest/dist/quantum.min.css">
<script src="https://unpkg.com/@howssatoshi/quantumcss@latest/src/starlight.js"></script>
```

| Attr on `<html>` | Role |
|------------------|------|
| `data-theme` | Active (`light` / `dark`) — never on `body` |
| `data-theme-default` | Fallback |
| `data-theme-storage="path"` | Per-pathname localStorage (avoids multi-demo pollution) |
| `data-theme-locked` | Always use default; ignore storage |

---

## 1. Priority

1. Bare HTML  2. Named component  3. Finite utilities last  

```html
<!-- GOOD --><div class="card"><h2>Title</h2><p>Body.</p><button class="btn-primary">Go</button></div>
<!-- BAD --> <div class="bg-white_5 rounded-xl border p-6 backdrop-blur">…
```

Opacity: `bg-white_5` not `bg-white/5`.

### Text hierarchy (critical for light marketing)

| Role | Use |
|------|-----|
| Headings + body reading | Bare `h1`–`h3`, bare `p` — **no** `text-secondary` on long copy |
| Lead / supporting | `text-secondary` (short only) |
| Captions / meta | `text-muted` or `text-sm text-muted` |
| Brand accent word | `text-gradient` (uses `--q-color-starlight-*`) |

**Do not** paint entire heroes or card descriptions with `text-secondary` — light pages look washed out.

---

## 2. Skeletons

### Dark product

```html
<html lang="en" data-theme="dark" data-theme-default="dark">
<body>
  <div class="starlight-stars ani-nebula" aria-hidden="true"></div>
  <header class="nav-header">…</header>
  <main class="p-8"><div class="max-w-6xl mx-auto">…</div></main>
</body>
```

### Light marketing (hotel, bakery, retail, editorial)

```html
<html lang="en" data-theme="light" data-theme-default="light" data-theme-storage="path">
<body>
  <!-- no starlight-stars -->
  <header class="nav-header">…</header>
  <main class="p-8"><div class="max-w-6xl mx-auto">…</div></main>
</body>
```

Rules: skip starfield; few `card`s; override `--q-color-starlight-*` for brand; solid ink is default (do not force light grey body text).

---

## 3. Micro-recipes + mini-snippets

### Buttons
bare · `btn-primary` · `btn-outline` · `btn-ghost` · `btn-secondary` · `btn-starlight` · `btn btn-glossy` · `btn-sm` / `btn-lg`

### Cards / surfaces
`card` · `card-premium` · `starlight-card` · `glass` · `surface-1` / `surface-2`  
Badges: `badge badge-{primary,secondary,success,warning,error}`  
Alerts: `alert alert-{success,warning,error,info}`

### Nav (hamburger)

```html
<input type="checkbox" id="nav-toggle" class="nav-toggle">
<header class="nav-header">
  <a href="/" class="nav-logo"><i class="icon-starlight"></i><span class="text-gradient font-bold">Brand</span></a>
  <nav class="nav-links" aria-label="Primary"><a href="#a">A</a></nav>
  <button class="btn-primary">CTA</button>
  <label for="nav-toggle" class="nav-hamburger" aria-label="Menu">
    <span class="nav-hamburger-icon"><span></span><span></span><span></span></span>
  </label>
</header>
<div class="nav-drawer"><div class="nav-drawer-inner"><a href="#a">A</a></div></div>
```

### Search
```html
<div class="search has-icon"><i class="icon-search"></i>
  <input type="search" class="search-input" placeholder="Search…"></div>
```

### Stats (pick **one** API per page)
```html
<div class="dashboard">
  <div class="starlight-card stat-card">
    <span class="stat-label">Label</span>
    <span class="stat-value">98</span>
    <div class="stat-trend up"><i class="icon-trend-up"></i> 2%</div>
  </div>
</div>
```

### Table
```html
<div class="table-premium-container">
  <div class="table-premium-header">
    <div class="table-premium-title">Title</div>
    <div class="table-premium-filters"></div>
  </div>
  <table class="table-premium">
    <thead><tr><th>A</th><th>B</th></tr></thead>
    <tbody><tr><td>1</td><td>2</td></tr></tbody>
  </table>
</div>
```

### Accordion (needs `starlight.js`)
```html
<div data-accordion>
  <div class="accordion-item accordion active">
    <div class="accordion-header">
      <span>Question?</span>
      <i class="icon-chevron-down accordion-icon"></i>
    </div>
    <div class="accordion-content"><p>Answer.</p></div>
  </div>
</div>
```
No `accordion-group`.

### Tabs (needs `starlight.js`)
`tab-list` > `tab-button` (`data-tab`) + `tab-panel` (`id`)

### Dialog
`dialog-overlay` > `dialog` > `dialog-close` (+ `hidden` to hide)

### Timeline
`timeline` > `timeline-item` > `timeline-dot` + `timeline-content`

### Form
Bare `<form>` **or**:
```html
<form class="form">
  <label>Name <input class="input" type="text"></label>
  <label>Note <textarea class="input"></textarea></label>
  <label>Pick <select class="input">…</select></label>
  <div class="form-row">
    <div><div class="font-semibold">SMS</div><div class="text-sm text-muted">Optional</div></div>
    <label class="toggle toggle-starlight">
      <input type="checkbox" class="toggle-input"><span class="toggle-slider"></span>
    </label>
  </div>
  <button type="submit" class="btn-primary">Send</button>
</form>
```
Put `.input` on text, email, select, and textarea.

**Icon field / label row / divider**
```html
<label for="email">Email</label>
<div class="field has-icon">
  <i class="icon-mail field-icon" aria-hidden="true"></i>
  <input class="input" id="email" type="email" placeholder="you@company.com">
</div>
<div class="label-row">
  <label for="password">Password</label>
  <a href="#forgot" class="text-sm text-muted">Forgot?</a>
</div>
<div class="form-divider"><span class="text-sm text-muted">or continue with</span></div>
```

### Auth / login
```html
<main class="auth-shell">
  <div class="auth-card">
    <header class="text-center mb-8">…brand…</header>
    <section class="starlight-card">
      <form class="form-stack">
        <div>
          <label for="email">Email</label>
          <div class="field has-icon">
            <i class="icon-mail field-icon" aria-hidden="true"></i>
            <input class="input" id="email" type="email" required>
          </div>
        </div>
        <div class="form-row">…toggle…</div>
        <button type="submit" class="btn-starlight btn-shine w-full">Sign in</button>
      </form>
      <div class="form-divider"><span class="text-sm text-muted">or</span></div>
      <div class="grid grid-cols-2 gap-3">
        <button type="button" class="btn-outline w-full">GitHub</button>
        <button type="button" class="btn-outline w-full">Google</button>
      </div>
    </section>
  </div>
</main>
```
Full demo: `examples/login.html`. Classes: `auth-shell` · `auth-card` · `form-stack` · `field has-icon` · `field-icon` · `label-row` · `form-divider` · `btn-shine`.

### Sidebar / shells
`aside-nav` (full tree in kitchen-sink) · `layout-admin-2col` · `layout-email-3col` · `layout-chat-2col` · `auth-shell`

### Icons (common)
`icon-starlight` `icon-search` `icon-close` `icon-home-fill` `icon-heart` `icon-heart-fill`  
`icon-sun` `icon-moon` `icon-chevron-down` `icon-chevron-right` `icon-mail` `icon-phone`  
`icon-calendar` `icon-clock-fill` `icon-cart` `icon-globe` `icon-user` `icon-settings`  
`icon-check-circle-fill` `icon-trend-up` `icon-trend-down`  
Full list: kitchen-sink → Quantum Icons (or `quantum-icons.css`).

### Utilities (escape hatch)
`flex` `grid` `grid-cols-1`…`6` `gap-*` `p-*`/`m-*` `text-sm`…`2xl` `font-bold`  
`w-full` `max-w-6xl` `hidden` `md:grid-cols-2` `hover:scale-105`  
Breakpoints: sm 640 · md 768 · lg 1024 · xl 1280

---

## 4. Theming

```css
:root {
  --q-color-starlight-blue: #00d4ff;
  --q-color-starlight-peach: #ffb38a;
  --q-color-starlight-orange: #ff7e5f;
  --q-color-primary: #3b82f6;
}
```
`.text-gradient` follows starlight peach→blue tokens.  
Reading text tokens (`--q-light-text*`) stay ink — do not repurpose brand primary as body color.

---

## 5. Guardrails

1. One CSS file (+ optional overlay)  
2. No invented classes  
3. Light brand: no starfield; bare `p` for body; not every block a glass card  
4. One stats API per page  
5. Accordion root = `data-accordion`  

---

## 6. Prompt → emit

| Ask | Emit |
|-----|------|
| Landing | Light or dark skeleton + nav + cards + bare type |
| FAQ | Accordion snippet |
| Table | table-premium snippet |
| Form | bare form or `.form` + `.input` · icon fields `.field.has-icon` |
| Login / auth | Dark skeleton + `auth-shell` / `auth-card` + `form-stack` |
| Hospitality | Light skeleton; hierarchy table above |

## 7. Checklist

- [ ] Only `quantum.min.css` (+ starlight.js if needed)?  
- [ ] Bare HTML first; real component trees?  
- [ ] Headings/body = bare type (not all `text-secondary`)?  
- [ ] Theme attrs + path/locked if light brand?  
- [ ] No starfield on daylight brands?  
- [ ] Unknown widget → kitchen-sink raw, not invention?  

## 8. Workflow

1. Link CSS  2. Pick skeleton  3. Snippets above  4. Utilities last  5. Tokens  6. Checklist  

**Kitchen-sink raw:** https://raw.githubusercontent.com/macroadster/quantumcss/main/examples/kitchen-sink.html
