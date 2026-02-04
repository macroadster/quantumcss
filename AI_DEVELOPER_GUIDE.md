# QuantumCSS AI Developer Guide

This guide helps AI models and developers generate consistent, high-quality code using the QuantumCSS framework.

## 🤖 AI-Friendly Design System

QuantumCSS is optimized for AI code generation with:
- **Predictable class naming**: Utility-first patterns that follow consistent conventions
- **Data attribute theming**: Uses `html[data-theme="light|dark"]` instead of body classes
- **Component compositions**: Semantic high-level classes built from atomic utilities
- **Comprehensive utility coverage**: All spacing, sizing, and positioning utilities available

## 🎯 Core Principles for AI Generation

### 1. Theme System (CRITICAL)
Always use data attributes for theming, not body classes:

```css
/* ❌ OLD WAY - Do not use */
body.light-mode .component { ... }

/* ✅ NEW WAY - AI Predictable */
html[data-theme="light"] .component { ... }
```

### 2. Class Naming Conventions
- **Utilities**: `.property-value` (e.g., `.text-center`, `.bg-primary`)
- **Components**: `.component-name` (e.g., `.starlight-card`, `.btn-primary`)
- **Modifiers**: `.component-modifier` (e.g., `.btn-large`, `.starlight-nav.vertical`)

### 3. Spacing System
Complete spacing scale available: `0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32`

```html
<!-- All directions -->
<div class="m-4 p-6 gap-8">

<!-- Directional -->
<div class="mt-4 mb-6 ml-2 mr-2">
<div class="px-4 py-2">

<!-- Axes -->
<div class="mx-auto my-8">
```

### 4. Z-Index Stack
Complete z-index utilities available: `auto, 0, 10, 20, 30, 40, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000`

```html
<div class="z-50"> <!-- Dropdowns -->
<div class="z-400"> <!-- Dialogs -->
<div class="z-800"> <!-- Tooltips -->
<div class="z-1000"> <!-- Navigation -->
```

## 🧩 Component Library

### Starlight Components (Premium)

#### Navigation
```html
<!-- Horizontal Navigation -->
<nav class="starlight-nav">
  <div class="nav-desktop">
    <ul class="nav-list">
      <li><a href="#" class="nav-link">Home</a></li>
      <li>
        <div class="dropdown">
          <a href="#" class="nav-link">Services ▾</a>
          <div class="dropdown-menu">
            <a href="#" class="dropdown-item">Web Design</a>
            <a href="#" class="dropdown-item">Development</a>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="hamburger">
    <span></span><span></span><span></span>
  </div>
</nav>

<!-- Vertical Sidebar -->
<nav class="starlight-nav vertical">
  <div class="nav-list vertical">
    <li><a href="#" class="nav-link">Dashboard</a></li>
    <li><a href="#" class="nav-link">Analytics</a></li>
  </div>
</nav>
```

#### Cards
```html
<!-- Starlight Glass Card -->
<div class="starlight-card">
  <h3 class="text-xl font-bold mb-4">Card Title</h3>
  <p class="text-secondary mb-6">Card content with glassmorphism effect</p>
  <button class="btn-starlight">Action</button>
</div>

<!-- Standard Card -->
<div class="card p-6 bg-white border border-neutral rounded-lg shadow-lg">
  <h4 class="font-semibold mb-2">Standard Card</h4>
  <p class="text-sm text-secondary">Basic card component</p>
</div>
```

#### Forms
```html
<div class="starlight-form">
  <div class="mb-4">
    <label class="block text-sm font-semibold mb-2">Email Address</label>
    <input type="email" class="input-starlight w-full" placeholder="you@example.com">
  </div>
  
  <div class="mb-4">
    <label class="block text-sm font-semibold mb-2">Priority</label>
    <select class="input-starlight select-starlight w-full">
      <option>High</option>
      <option>Medium</option>
      <option>Low</option>
    </select>
  </div>
  
  <div class="mb-6">
    <label class="flex items-center gap-3">
      <input type="checkbox" class="checkbox-starlight">
      <span>Enable notifications</span>
    </label>
  </div>
  
  <div class="flex gap-4">
    <button class="btn-starlight flex-1">Submit</button>
    <button class="btn-secondary">Cancel</button>
  </div>
</div>
```

#### Dialogs
```html
<!-- Dialog Overlay -->
<div class="dialog-overlay">
  <div class="starlight-dialog">
    <button class="dialog-close">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
    <h3 class="text-2xl font-bold mb-4 text-gradient-starlight">Confirm Action</h3>
    <p class="mb-6 opacity-70">Are you sure you want to proceed?</p>
    <div class="flex gap-4">
      <button class="btn-starlight flex-1">Confirm</button>
      <button class="btn-secondary flex-1">Cancel</button>
    </div>
  </div>
</div>
```

#### Buttons
```html
<!-- Primary Starlight Button -->
<button class="btn-starlight">Launch Protocol</button>

<!-- Secondary Button -->
<button class="btn-secondary">Cancel</button>

<!-- Ghost Button -->
<button class="btn-ghost">Learn More</button>

<!-- Outline Button -->
<button class="btn-outline">Get Started</button>

<!-- Button Sizes -->
<button class="btn-starlight btn-sm">Small</button>
<button class="btn-starlight">Default</button>
<button class="btn-starlight btn-lg">Large</button>
```

#### Badges
```html
<span class="badge badge-primary">Primary</span>
<span class="badge badge-secondary">Secondary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-error">Error</span>
```

#### Accordion
```html
<div class="accordion-group">
  <div class="accordion-item accordion-starlight active">
    <div class="accordion-header">
      <span>Section Title</span>
      <svg class="accordion-icon w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </div>
    <div class="accordion-content">
      <p>Section content goes here...</p>
    </div>
  </div>
</div>
```

#### Tabs
```html
<div class="tab-list mb-4">
  <button class="tab-button active" data-tab="tab-1">Overview</button>
  <button class="tab-button" data-tab="tab-2">Details</button>
  <button class="tab-button" data-tab="tab-3">Settings</button>
</div>
<div class="tab-content glass p-6 rounded-xl">
  <div class="tab-panel active" id="tab-1">Overview content...</div>
  <div class="tab-panel" id="tab-2">Details content...</div>
  <div class="tab-panel" id="tab-3">Settings content...</div>
</div>
```

### Utility Classes

#### Colors
```html
<!-- Text Colors -->
<div class="text-primary">Primary text</div>
<div class="text-secondary">Secondary text</div>
<div class="text-success">Success message</div>
<div class="text-warning">Warning notice</div>
<div class="text-error">Error message</div>

<!-- Background Colors -->
<div class="bg-primary">Primary background</div>
<div class="bg-starlight">Starlight gradient</div>
```

#### Typography
```html
<h1 class="text-4xl font-bold">Large Bold Text</h1>
<p class="text-lg font-medium">Medium large text</p>
<span class="text-sm text-secondary">Small muted text</span>
```

#### Layout
```html
<!-- Flexbox -->
<div class="flex items-center justify-between gap-4">
  <div>Left content</div>
  <div>Right content</div>
</div>

<!-- Grid -->
<div class="grid grid-cols-3 gap-6">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>

<!-- Container -->
<div class="container mx-auto px-8">
  <!-- Centered content -->
</div>
```

## 🎨 Theme Development

### Theme Toggle Implementation
```javascript
// Use the built-in theme management
document.documentElement.setAttribute('data-theme', 'light');
document.documentElement.setAttribute('data-theme', 'dark');

// Or use the convenience function (included in starlight.js)
toggleTheme();
```

### Custom Theme Styles
```css
/* Always use data attributes for theme-specific styles */
html[data-theme="light"] .custom-component {
  background: #ffffff;
  color: #1e293b;
}

html[data-theme="dark"] .custom-component {
  background: var(--glass-bg);
  color: var(--text-primary);
}
```

## ⚡ Performance Tips

1. **Use semantic component classes** when possible (`.starlight-card` vs. individual utilities)
2. **Minimize redundant utilities** - `p-4 px-4 py-4` can be simplified to `p-4`
3. **Leverage the JIT generator** for custom utilities
4. **Prefer data attributes** over body classes for better AI predictability

## 🔄 Responsive Design

### Breakpoint System
- **sm**: 640px
- **md**: 768px  
- **lg**: 1024px
- **xl**: 1280px

### Responsive Utilities
```html
<div class="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <!-- Responsive grid layout -->
</div>

<div class="hidden md:block">
  <!-- Hide on mobile, show on desktop -->
</div>
```

## 🎭 Animations

### Cosmic Animations
```html
<div class="ani-float">Floating element</div>
<div class="ani-cosmic-pulse">Pulsing effect</div>
<div class="ani-twinkle">Twinkling star</div>
<div class="ani-nebula">Nebula background</div>
<div class="ani-orbit">Orbiting element</div>
```

### Animation Modifiers
```html
<div class="ani-float ani-slow">Slow animation</div>
<div class="ani-float ani-fast">Fast animation</div>
```

## 📱 Mobile Development

Always test responsive behavior and use mobile-first approach:

```html
<!-- Mobile-first design -->
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- Full width on mobile, then adapts -->
</div>

<!-- Touch-friendly targets -->
<button class="btn-starlight p-4 min-h-[44px]">
  <!-- Minimum touch target size -->
</button>
```

## 🚀 Quick Start for AI

When generating QuantumCSS code, always:

1. **Check for existing semantic components** before creating custom utility combinations
2. **Use data attributes** for any theme-specific styles
3. **Include the complete spacing scale** (0-32) in your utility vocabulary
4. **Leverage z-index utilities** for proper layer management
5. **Use Starlight components** for premium UI elements
6. **Test theme switching** with `html[data-theme]` attributes

## 📚 Reference Examples

See the `/examples` directory for complete implementations:
- `kitchen-sink.html` - Comprehensive component showcase
- `starlight.html` - Premium component demonstrations
- `index.html` - Main landing page with theme switching

This guide should be used as the primary reference for AI models generating QuantumCSS code to ensure consistency and best practices.