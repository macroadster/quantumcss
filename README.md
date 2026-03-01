# Quantum CSS - Next-Generation Utility Framework

![Quantum CSS](https://img.shields.io/badge/Quantum%20CSS-v1.7.3-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Bundle Size](https://img.shields.io/badge/bundle%20size-24%20KB%20(gzipped)-brightgreen)

A modern, performance-optimized utility-first CSS framework with semantic naming, recursive component presets, and advanced cosmic effects.

## 🚀 Features

### Modern CSS Capabilities
- **Robust Theme Engine** - Seamlessly follow OS settings with automatic `prefers-color-scheme` detection and dynamic live-switching.
- **Recursive Component Presets** - Define custom components in config using existing utilities.
- **Cosmic Animation Library** - Advanced effects like parallax nebula drifts and orbit paths.
- **High Contrast Mode** - Native support for `prefers-contrast` and `forced-colors`.
- **JIT Dark Mode** - Dynamic generation of dark mode variants via `dark__` prefix.

### Developer Experience
- **Advanced CLI Scaffolding** - Instantly generate pre-styled templates (Gaming, Blog, News, Shopping, Travel)
- **Dynamic Documentation** - Generate a "Kitchen Sink" overview of your unique design tokens
- **Unified Naming Standard** - Consistent `--q-` prefix for all CSS variables (e.g., `--q-color-primary`).
- **Zero-Escape Naming** - No more `\:` or `\/` in your CSS! Uses clean `__` and `_` separators.
- **TypeScript Support** - Full type definitions
- **Zero Configuration** - Works out of the box

## 🎨 Advanced Utilities

### Gradients & Color Stops
QuantumCSS provides powerful JIT gradient utilities with support for multiple color stops and transparency:
- `bg-gradient-to-{r|l|t|b|tr|tl|br|bl}` - Set gradient direction
- `from-{color}`, `via-{color}`, `to-{color}` - Define color stops
- `from-{color}_50` - Opacity support for gradient stops
- `text-transparent bg-clip-text` - Create gradient text

### SVG & Data Visualization
Specialized utilities for handling complex SVG scaling and data overlays:
- `svg-fluid` - Responsive SVG scaling
- `vector-non-scaling` - Constant-width strokes regardless of SVG scale
- `overlay-base` - Centered absolute-positioned data labels
- `overlay-top-left`, `overlay-bottom-right`, etc. - Corner positioning

## 📦 Installation & CLI

Install the core library and the JIT engine:
```bash
npm install @howssatoshi/quantumcss
```

### Command Line Interface
QuantumCSS includes a powerful CLI for project orchestration:

- **`npx quantumcss init`** - Generate a default `quantum.config.json`.
- **`npx quantumcss build [output]`** - Generate the JIT CSS bundle (default: `dist/quantum.css`).
- **`npx quantumcss watch [output]`** - Automatically rebuild when your HTML or config changes.
- **`npx quantumcss scaffold <type>`** - Generate a starter template (`gaming`, `blog`, `travel`, etc.).

## ⚙️ Configuration

### Decoupled Component Architecture
QuantumCSS separates structural logic from aesthetic themes for maximum reusability. Define your own components in `quantum.config.json` by combining these layers:

**1. Structural & Interactive Base Classes**
- `nav-base` - Standard flex row navigation
- `card-base` - Flex column container with overflow hidden
- `btn-base` - Center-aligned interactive button
- `input-base` - Block-level form input
- `dialog-base` - Centered modal container
- `badge-base` - Inline-flex status indicator
- `focus-glow` - Premium cosmic focus state (soft colored glow)

**2. Aesthetic Theme Classes**
- `theme-starlight` - The iconic cosmic gradient and glow
- `theme-glass` - Clean translucent glassmorphism
- `theme-glass-dark` - Darker, higher contrast glassmorphism
- `glass` - Base glassmorphic utility

```json
{
  "componentPresets": {
    "btn-action": "btn-base theme-starlight px-8 py-3 focus-glow",
    "card-premium": "card-base theme-glass-dark p-10 shadow-2xl"
  }
}
```

### High-Level Component Presets (AI-Optimized)

Starlight UI provides "Organism-level" presets that compose multiple utilities into functional semantic blocks. Perfect for rapid prototyping and AI generation.

- `starlight-nav` - Complete sticky glassmorphic navigation bar
- `starlight-search` - Search container with integrated icon and padding
- `starlight-dashboard` - Responsive 3-column dashboard grid
- `starlight-gallery` - Optimized grid for image/media galleries
- `starlight-form` - Multi-column layout for advanced form controls
- `starlight-dialog` - Centered, animated glassmorphic modal

```html
<!-- Example: Create a full dashboard grid with one class -->
<div class="starlight-dashboard">
  <div class="starlight-card">...</div>
  <div class="starlight-card">...</div>
  <div class="starlight-card">...</div>
</div>
```

## ✨ Cosmic Animations

Bring your UI to life with space-inspired effects:
- `.ani-nebula` - Ethereal drifting gradient backgrounds
- `.ani-float` - Floating vertical motion
- `.ani-twinkle` - Sparkling star effects
- `.ani-orbit` - Circular orbital paths
- `.ani-svg-draw` - Progressive path drawing for icons

## 🛠️ Build Tools

### Documentation
Generate a live dashboard of your theme:
```bash
npm run docs
```
This creates `examples/kitchen-sink.html` with all your colors, spacing, presets, and animations.

### High Contrast Support
QuantumCSS automatically optimizes contrast for accessibility when the user enables high contrast mode in their OS.

## ⚡ Performance

### Rendering & Scrolling
- **GPU Acceleration**: Cosmic effects and star fields use `will-change` and hardware-accelerated transforms to ensure 60fps scrolling even on low-power devices.
- **CSS Containment**: Uses `contain: strict` on atmospheric backgrounds to isolate layout and paint cycles.
- **Motion Sensitivity**: Automatically scales down or disables complex animations when `prefers-reduced-motion` is detected.

### Optimized Payload
- **Gzipped Bundle**: ~24 KB (Full library + JIT utilities)
- **Zero Runtime**: No heavy JavaScript required for layout or styling.
- **JIT Tree-Shaking**: Only the utilities you actually use are included in your final production build.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.
