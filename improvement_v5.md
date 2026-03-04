# QuantumCSS: Beyond Class Soup (v1.12.0+)

## The Problem

AI generation produces dense, unreadable HTML:
```html
<div class="flex items-center justify-between px-4 py-3 bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50">
```

Even QuantumCSS requires too many classes:
```html
<div class="starlight-nav glass flex items-center justify-between">
```

The original vision was "zero-boilerplate atmospheric layouts" but we didn't go far enough.

---

## 1. Zero-Class Semantic Styling

Target semantic HTML elements directly without requiring any classes.

### Implementation

Add implicit defaults to `starlight.css` that apply automatically:

```css
/* Instead of .starlight-card, just use <article> */
article {
  background: var(--q-color-surface);
  border: 1px solid var(--q-color-border);
  border-radius: var(--q-radius-xl);
  padding: var(--q-space-6);
  transition: all 0.3s ease;
}

article:hover {
  border-color: var(--q-color-starlight-blue);
  transform: translateY(-2px);
}

/* <section> as content container */
section {
  padding: var(--q-space-12) var(--q-space-6);
  max-width: 1200px;
  margin: 0 auto;
}

/* <header> with nav implicit styling */
header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--q-glass-bg);
  backdrop-filter: var(--q-glass-blur);
  border-bottom: var(--q-glass-border);
}

/* <footer> as page footer */
footer {
  padding: var(--q-space-12) var(--q-space-6);
  background: var(--q-bg-primary);
  border-top: 1px solid var(--q-color-border);
}
```

### Usage

```html
<!-- Zero classes needed -->
<body>
  <header>
    <nav>Logo</nav>
  </header>
  <section>
    <article>
      <h1>Title</h1>
      <p>Content</p>
    </article>
  </section>
  <footer>&copy; 2026</footer>
</body>
```

---

## 2. Contextual Auto-Styling

Detect element position and apply appropriate styles automatically.

### Pattern: "What element is this?"

```css
/* Articles inside sections get card styling */
section > article {
  margin-bottom: var(--q-space-6);
  border-radius: var(--q-radius-2xl);
}

/* Articles in grids get compact styling */
.grid article,
[style*="grid"] article {
  padding: var(--q-space-4);
}

/* Links in nav get nav-link styling automatically */
nav a {
  color: var(--q-text-secondary);
  padding: var(--q-space-2) var(--q-space-4);
  border-radius: var(--q-radius-md);
  transition: all 0.2s ease;
}

nav a:hover {
  color: var(--q-color-starlight-blue);
  background: var(--q-highlight-bg);
}

/* Headings in articles get proper hierarchy */
article h1, article h2, article h3 {
  color: var(--q-text-primary);
  margin-bottom: var(--q-space-4);
}

article h1 { font-size: 2rem; font-weight: 700; }
article h2 { font-size: 1.5rem; font-weight: 600; }
article h3 { font-size: 1.25rem; font-weight: 600; }
```

---

## 3. Structural Layout Primitives

Provide single classes for common layouts instead of multiple utilities.

### Current (verbose)
```html
<div class="flex flex-col md:flex-row gap-6">
  <aside class="w-full md:w-64">Sidebar</aside>
  <main class="flex-1">Content</main>
</div>
```

### Target (simple)
```html
<div class="layout-sidebar">
  <aside>Sidebar</aside>
  <main>Content</main>
</div>
```

### Implementation
```css
/* Sidebar layout */
.layout-sidebar {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;
}

.layout-sidebar > aside {
  background: var(--q-color-surface);
  border-right: 1px solid var(--q-color-border);
  padding: var(--q-space-6);
}

.layout-sidebar > main {
  padding: var(--q-space-8);
  overflow-y: auto;
}

/* Responsive variant */
@media (max-width: 768px) {
  .layout-sidebar {
    grid-template-columns: 1fr;
  }
  
  .layout-sidebar > aside {
    border-right: none;
    border-bottom: 1px solid var(--q-color-border);
  }
}

/* Blog layout */
.layout-blog {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: var(--q-space-8);
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--q-space-8);
}

@media (max-width: 900px) {
  .layout-blog {
    grid-template-columns: 1fr;
  }
}

/* Centered content */
.layout-center {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--q-space-12) var(--q-space-6);
}
```

---

## 4. The "Smart" Component

A single `<quantum>` component that renders appropriate UI based on content.

### Usage
```html
<!-- Product card -->
<quantum type="card" title="$99" description="Best product ever">
  <button>Buy</button>
</quantum>

<!-- Form field -->
<quantum type="input" label="Email" placeholder="you@example.com">

<!-- Stat display -->
<quantum type="stat" value="1,234" label="Users">
```

### Implementation approach

Option A: Web Component
```javascript
class QuantumElement extends HTMLElement {
  // Render based on type attribute
}
customElements.define('quantum', QuantumElement);
```

Option B: Post-processing (better for AI generation)
```javascript
// Transform at generation time
document.querySelectorAll('quantum[type="card"]').forEach(el => {
  const title = el.getAttribute('title');
  const description = el.getAttribute('description');
  el.innerHTML = `
    <article class="starlight-card">
      <h3>${title}</h3>
      <p>${description}</p>
      ${el.innerHTML}
    </article>
  `;
});
```

---

## 5. AI Prompt Helper

Generate CSS from natural language prompts.

### Implementation: `scripts/ai-css.js`
```javascript
// Simple prompt-to-class mapper
const prompts = {
  "centered card": "layout-center starlight-card",
  "sidebar with content": "layout-sidebar",
  "dark glass header": "glass",
  "gradient title": "text-gradient-starlight",
  "floating action button": "btn-starlight btn-floating"
};

// Usage
function getClassesForPrompt(prompt) {
  return prompts[prompt.toLowerCase()] || "";
}
```

### Expanded mapping (future)
```javascript
const semanticPrompts = {
  "blog post": "article",
  "navigation bar": "header nav",
  "hero section": "section hero",
  "product grid": "grid layout-cards",
  "contact form": "form starlight-card",
  "footer links": "footer"
};
```

---

## 6. Backward Compatibility

All changes must be additive and backward compatible.

### Migration path
```css
/* Keep existing classes working */
.starlight-card { /* existing styles */ }

/* Add semantic element styling */
article { /* new implicit styles */ }

/* If both exist, class wins */
article.starlight-card {
  /* merged/combined styles */
}
```

---

## Goals

- [ ] 80% of use cases work with zero classes
- [ ] Semantic HTML looks good out of the box
- [ ] AI can generate clean, maintainable HTML
- [ ] Existing class-based templates still work
- [ ] Layout primitives reduce utility soup

---

**Next Session Focus**: Implement Sections 1-3 (Zero-Class Styling, Contextual Auto-Styling, Layout Primitives)
