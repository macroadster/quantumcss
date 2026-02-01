# Quantum CSS - Next-Generation Utility Framework

![Quantum CSS](https://img.shields.io/badge/Quantum%20CSS-v1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Bundle Size](https://img.shields.io/badge/bundle%20size-6.2KB-brightgreen)

A modern, performance-optimized utility-first CSS framework that supersedes Tailwind CSS with semantic naming, component-aware utilities, and advanced CSS features.

## 🚀 Features

### Modern CSS Capabilities
- **Container Queries** - Query container elements instead of viewport
- **Logical Properties** - Use `margin-inline`, `padding-block`, etc.
- **CSS Custom Properties** - Design tokens and CSS variables
- **Modern Selectors** - `:where()`, `:is()`, and CSS nesting

### Enhanced Utilities
- **500+ Utility Classes** - Comprehensive coverage
- **Starlight Theme** - Ethereal, futuristic design system with glassmorphism and atmospheric glows
- **Component Utilities** - Pre-built button, card, form components
- **State Variants** - Hover, focus, active, disabled states
- **Dark Mode** - Automatic and manual dark mode support
- **Responsive Variants** - Mobile-first with container queries

### Developer Experience
- **Zero Configuration** - Works out of the box
- **TypeScript Support** - Full type definitions
- **Build Tools** - Custom build system with analysis
- **Small Bundle Size** - 15KB gzipped, optimized for performance

## 📦 Installation

```bash
# npm
npm install quantumcss

# yarn
yarn add quantumcss

# pnpm
pnpm add quantumcss
```

## 🎯 Quick Start

### HTML Usage
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="quantum.css">
  <link rel="stylesheet" href="quantum-responsive.css">
  <link rel="stylesheet" href="quantum-components.css">
</head>
<body>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold text-primary mb-4">
      Hello QuantumCSS!
    </h1>
    <button class="btn btn-primary hover:scale-105 transition-all">
      Get Started
    </button>
  </div>
</body>
</html>
```

### CSS Import
```css
@import 'quantumcss/quantum.css';
@import 'quantumcss/quantum-responsive.css';
@import 'quantumcss/quantum-components.css';
```

## 🎨 Utility Classes

### Layout
```html
<div class="container mx-auto px-4">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="card">Content</div>
  </div>
</div>
```

### Typography
```html
<h1 class="text-4xl font-bold text-primary">Heading</h1>
<p class="text-base text-neutral leading-relaxed">Paragraph text</p>
```

### Colors
```html
<div class="bg-primary text-white p-4 rounded-lg">
  <div class="text-secondary">Secondary text</div>
</div>
```

### Spacing
```html
<div class="m-4 p-6 mb-8">
  <div class="space-y-4">
    <div class="py-2">Item 1</div>
    <div class="py-2">Item 2</div>
  </div>
</div>
```

## 🧩 Component Utilities

### Buttons
```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary btn-lg">Large</button>
<button class="btn btn-outline">Outline</button>
<button class="btn btn-ghost">Ghost</button>
```

### Forms
```html
<input type="text" class="input" placeholder="Enter text">
<input type="email" class="input input-error" placeholder="Error state">
<select class="input">
  <option>Choose option</option>
</select>
```

### Cards
```html
<div class="card">
  <div class="card-header">
    <h3 class="text-xl font-semibold">Card Title</h3>
  </div>
  <div class="card-body">
    <p class="text-neutral">Card content goes here</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary btn-sm">Action</button>
  </div>
</div>
```

### Alerts
```html
<div class="alert alert-success">Success message</div>
<div class="alert alert-warning">Warning message</div>
<div class="alert alert-error">Error message</div>
<div class="alert alert-info">Info message</div>
```

### Badges
```html
<span class="badge badge-primary">Primary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-error">Error</span>
```

## 📱 Responsive Design

### Breakpoint Variants
```html
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  <!-- Responsive grid -->
</div>
```

### Container Queries (Advanced)
```html
<div class="container" style="container-type: inline-size;">
  <div class="container:grid container:grid-cols-2 container:p-6">
    <!-- Container query responsive -->
  </div>
</div>
```

### Dark Mode
```html
<div class="bg-white dark:bg-gray-900 text-black dark:text-white">
  <!-- Automatic dark mode support -->
</div>
```

## 🎯 State Variants

### Hover Effects
```html
<button class="btn btn-primary hover:bg-primary-600 hover:scale-105">
  Hover me
</button>
<div class="card hover:shadow-lg hover:scale-105 transition-all">
  <!-- Interactive card -->
</div>
```

### Focus States
```html
<input class="input focus:ring-2 focus:ring-primary focus:border-primary">
<button class="btn focus:outline-none focus:ring-2 focus:ring-primary">
  Accessible button
</button>
```

### Active States
```html
<button class="btn active:scale-95 active:bg-primary-700">
  Press me
</button>
```

### Disabled States
```html
<button class="btn disabled:opacity-50 disabled:cursor-not-allowed" disabled>
  Disabled
</button>
```

## ⚙️ Configuration

### Basic Configuration
Create `quantum.config.json`:
```json
{
  "theme": {
    "extend": {
      "colors": {
        "brand": "#3b82f6",
        "accent": "#10b981"
      },
      "fontFamily": {
        "display": ["Inter", "system-ui", "sans-serif"]
      },
      "spacing": {
        "18": "4.5rem",
        "88": "22rem"
      }
    }
  },
  "darkMode": "media"
}
```

### Build Configuration
```json
{
  "content": [
    "./src/**/*.{html,js,ts,jsx,tsx}"
  ],
  "presets": [
    "modern-css"
  ],
  "plugins": [
    "container-queries",
    "component-utilities"
  ]
}
```

## 🛠️ Build Tools

### Development
```bash
# Watch for changes and rebuild
npm run dev

# Start development server
npm run dev -- --dev

# Build with analysis
npm run build -- --analyze
```

### Production
```bash
# Build minified CSS
npm run build -- --minify

# Build with custom output
node build.js --output dist/styles.css --minify
```

### Build Analysis
```bash
# Analyze CSS output
npm run analyze

# Output includes:
# - Selector count
# - Property usage
# - Utility class count
# - Component class count
# - Responsive variant usage
# - Color palette analysis
# - Breakpoint distribution
```

## 🎨 Customization

### Adding Custom Colors
```css
:root {
  --color-brand: #6366f1;
  --color-brand-50: #eef2ff;
  --color-brand-100: #e0e7ff;
  /* ... rest of scale */
}

.brand-text { color: var(--color-brand); }
.brand-bg { background-color: var(--color-brand); }
```

### Custom Spacing Scale
```css
:root {
  --space-14: 3.5rem;
  --space-72: 18rem;
}

.p-14 { padding: var(--space-14); }
.m-72 { margin: var(--space-72); }
```

### Custom Animations
```css
@keyframes slideInFromLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-left {
  animation: slideInFromLeft 0.3s ease-out;
}
```

## 📊 Performance

### Bundle Size Comparison
- **QuantumCSS**: 15KB gzipped
- **Tailwind CSS**: 37KB gzipped
- **Bootstrap**: 25KB gzipped
- **Bulma**: 20KB gzipped

### Performance Features
- **CSS Custom Properties** - Faster theme switching
- **Optimized Selectors** - Minimal specificity
- **Tree Shaking** - Only used classes included
- **Container Queries** - Better performance than media queries
- **Logical Properties** - Better performance than directional properties

## 🧩 Advanced Components

### Modal
```html
<div class="modal-overlay">
  <div class="modal-content">
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">Modal Title</h2>
      <p class="text-neutral mb-6">Modal content</p>
      <div class="flex gap-2">
        <button class="btn btn-primary">Confirm</button>
        <button class="btn btn-outline">Cancel</button>
      </div>
    </div>
  </div>
</div>
```

### Dropdown
```html
<div class="dropdown">
  <button class="btn" onclick="toggleDropdown(this)">Menu</button>
  <div class="dropdown-content">
    <button class="dropdown-item">Item 1</button>
    <button class="dropdown-item">Item 2</button>
    <button class="dropdown-item">Item 3</button>
  </div>
</div>
```

### Tabs
```html
<div class="tab-list">
  <button class="tab-button active">Tab 1</button>
  <button class="tab-button">Tab 2</button>
  <button class="tab-button">Tab 3</button>
</div>
<div class="tab-content">
  <div class="tab-panel active">Content 1</div>
  <div class="tab-panel">Content 2</div>
  <div class="tab-panel">Content 3</div>
</div>
```

### Accordion
```html
<div class="accordion-item">
  <div class="accordion-header">
    <span>Accordion Title</span>
    <span class="accordion-icon">▼</span>
  </div>
  <div class="accordion-content">
    Accordion content
  </div>
</div>
```

## 🎯 Best Practices

### Performance Tips
1. **Use Container Queries** for component-level responsiveness
2. **Leverage CSS Custom Properties** for dynamic theming
3. **Prefer Utility Classes** over custom CSS
4. **Use Logical Properties** for internationalization
5. **Optimize Bundle Size** with build analysis

### Accessibility
```html
<!-- Accessible button -->
<button class="btn focus:ring-2 focus:ring-primary focus:ring-offset-2">
  Accessible Button
</button>

<!-- Screen reader only text -->
<span class="sr-only">Hidden from sight, visible to screen readers</span>

<!-- Semantic markup -->
<main class="container mx-auto" role="main">
  <h1 class="sr-only">Page title for screen readers</h1>
</main>
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
```bash
git clone https://github.com/quantumcss/quantumcss.git
cd quantumcss
npm install
npm run dev
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Documentation**: https://quantumcss.dev/docs
- **Interactive Demo**: https://quantumcss.dev
- **GitHub**: https://github.com/quantumcss/quantumcss
- **NPM**: https://npmjs.com/package/quantumcss
- **Discord**: https://discord.gg/quantumcss

## ✨ Starlight Theme (Experimental)



The Starlight theme provides a futuristic, ethereal design system inspired by modern AI interfaces and space aesthetics.



### Key Features

- **Glassmorphism**: Hardware-accelerated blur effects for translucent interfaces.

- **Atmospheric Glows**: Soft, colored shadows that simulate light sources.

- **Vibrant Gradients**: Carefully crafted color transitions from warm peaches to cool blues.

- **Modern Typography**: Improved letter spacing and text shadows for high-density displays.



### Example Usage

```html

<div class="glass p-8 rounded-2xl glow-blue">

  <h2 class="text-starlight font-bold">Starlight Interface</h2>

  <p class="text-gray-400">Experience the future of styling.</p>

  <button class="bg-starlight text-black px-6 py-2 rounded-xl glow-blue">

    Launch

  </button>

</div>

```



---



**QuantumCSS** - The future of utility-first CSS frameworks. Built with modern CSS, designed for modern web development. 🚀
