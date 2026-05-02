# AI Prompt Examples for QuantumCSS

These examples show how to prompt AI models to generate QuantumCSS code that follows the "beautiful defaults" philosophy: semantic HTML first, component classes second, utility classes only when needed.

## The Golden Rule

Before adding a class, ask: "Does bare HTML already handle this?" If yes, skip the class.

---

## Example 1: Card Component

### Prompt
```
Create a card with a title, description, and action button using QuantumCSS.
```

### Expected Output
```html
<div class="card">
  <h3>Card Title</h3>
  <p>Description text with glassmorphism effect.</p>
  <button>Action</button>
</div>
```

That's it. The `card` class provides the glass surface, border, shadow, and padding. The `<h3>`, `<p>`, and `<button>` are styled by QuantumCSS defaults. No utility classes needed.

For a premium look, swap `card` for `starlight-card`:
```html
<div class="starlight-card">
  <h3>Premium Card</h3>
  <p>Enhanced glassmorphism with cosmic gradient accents.</p>
  <button class="btn-primary">Get Started</button>
</div>
```

---

## Example 2: Navigation

### Prompt
```
Create a navigation header with logo and links using QuantumCSS.
```

### Expected Output
```html
<header class="nav-header">
  <span>My App</span>
  <nav>
    <a href="/">Home</a>
    <a href="/features">Features</a>
    <a href="/pricing">Pricing</a>
    <a href="/contact">Contact</a>
  </nav>
</header>
```

One class: `nav-header`. The rest is plain HTML.

---

## Example 3: Dashboard Layout

### Prompt
```
Create a dashboard with stat cards using QuantumCSS.
```

### Expected Output
```html
<div class="dashboard">
  <div class="card">
    <h3>Total Users</h3>
    <p>12,543</p>
    <span class="badge badge-success">+12.5%</span>
  </div>

  <div class="card">
    <h3>Revenue</h3>
    <p>$48,210</p>
    <span class="badge badge-warning">-3.2%</span>
  </div>

  <div class="card">
    <h3>Active Orders</h3>
    <p>1,893</p>
    <span class="badge">This month</span>
  </div>
</div>
```

`dashboard` gives you the responsive 3-column grid. `card` gives you the glass container. `badge` gives you the status indicator. No layout utilities needed.

---

## Example 4: Contact Form

### Prompt
```
Create a contact form with name, email, message, and submit button.
```

### Expected Output
```html
<form>
  <label>Full Name
    <input type="text" placeholder="Enter your name">
  </label>

  <label>Email Address
    <input type="email" placeholder="you@example.com">
  </label>

  <label>Inquiry Type
    <select>
      <option>General Question</option>
      <option>Technical Support</option>
      <option>Sales Inquiry</option>
    </select>
  </label>

  <label>Message
    <textarea rows="5" placeholder="Tell us more..."></textarea>
  </label>

  <button type="submit">Send Message</button>
</form>
```

Zero classes. Every form element inherits Starlight glass styling, focus glow, and transitions automatically.

---

## Example 5: Alerts and Status

### Prompt
```
Create error, warning, and success notifications.
```

### Expected Output
```html
<div class="alert alert-error">Could not connect to the server.</div>
<div class="alert alert-warning">Your session expires in 5 minutes.</div>
<div class="alert alert-success">Changes saved successfully.</div>

<span class="badge badge-error">Failed</span>
<span class="badge badge-success">Active</span>
```

---

## Example 6: Dialog / Modal

### Prompt
```
Create a confirmation dialog.
```

### Expected Output
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

---

## Example 7: Responsive Grid (Layer 3 — Escape Hatch)

When you need a custom layout that isn't covered by `dashboard` or `gallery`, reach for utilities:

### Prompt
```
Create a 2-column layout on tablet and 4-column on desktop.
```

### Expected Output
```html
<div class="grid cols-1" md="cols-2" lg="cols-4">
  <div class="card"><h3>Item 1</h3></div>
  <div class="card"><h3>Item 2</h3></div>
  <div class="card"><h3>Item 3</h3></div>
  <div class="card"><h3>Item 4</h3></div>
</div>
```

Note: responsive breakpoints use attributes (`md="cols-2"`) instead of class prefixes (`md:cols-2`).

---

## Example 8: Themed Custom Component

When you need custom theme-aware styling:

```css
.pricing-card {
  /* Extends the built-in card styles */
}

html[data-theme="light"] .pricing-card {
  background: #ffffff;
  color: #1e293b;
  border-color: #e2e8f0;
}
```

Always use `html[data-theme="..."]` selectors for theme overrides. Never use body classes.

---

## Anti-Patterns to Avoid

### Utility soup when a component class exists
```html
<!-- Bad: rebuilding a card from scratch -->
<div class="bg-white/5 rounded-xl border border-white/8 p-6 backdrop-blur-lg shadow-lg">
  <h3 class="text-xl font-bold mb-4">Title</h3>
  <p class="text-secondary mb-6">Content</p>
</div>

<!-- Good: use the component class -->
<div class="card">
  <h3>Title</h3>
  <p>Content</p>
</div>
```

### Styling bare elements that already look right
```html
<!-- Bad: redundant classes on elements QuantumCSS already styles -->
<button class="btn-base bg-glass border rounded-lg px-4 py-2 cursor-pointer transition">
  Submit
</button>

<!-- Good: bare button is already styled -->
<button>Submit</button>
```

### Class-based breakpoints instead of attributes
```html
<!-- Bad: Tailwind-style class prefixes -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

<!-- Good: attribute-based variants -->
<div class="grid cols-1" md="cols-2" lg="cols-3">
```

---

## Quick Reference: When to Add Classes

| Need | Approach |
|------|----------|
| A button | `<button>` (no class needed) |
| A call-to-action button | `<button class="btn-primary">` |
| A card container | `<div class="card">` |
| A form | `<form>` with bare `<input>`, `<select>`, etc. |
| A navigation bar | `<header class="nav-header">` |
| A status indicator | `<span class="badge badge-success">` |
| A notification | `<div class="alert alert-warning">` |
| Custom spacing | `class="mt-4"` (utility escape hatch) |
| Responsive columns | `md="cols-3"` (attribute variant) |
