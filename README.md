# Quantum CSS - Next-Generation Utility Framework

![Quantum CSS](https://img.shields.io/badge/Quantum%20CSS-v1.2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Bundle Size](https://img.shields.io/badge/bundle%20size-15KB-brightgreen)

A modern, performance-optimized utility-first CSS framework with semantic naming, recursive component presets, and advanced cosmic effects.

## 🚀 Features

### Modern CSS Capabilities
- **Recursive Component Presets** - Define custom components in config using existing utilities
- **Cosmic Animation Library** - Advanced effects like parallax nebula drifts and orbit paths
- **High Contrast Mode** - Native support for `prefers-contrast` and `forced-colors`
- **JIT Dark Mode** - Dynamic generation of dark mode variants via `dark:` prefix

### Developer Experience
- **Advanced CLI Scaffolding** - Instantly generate pre-styled templates (Gaming, Blog, News, Shopping, Travel)
- **Dynamic Documentation** - Generate a "Kitchen Sink" overview of your unique design tokens
- **TypeScript Support** - Full type definitions
- **Zero Configuration** - Works out of the box

## 📦 Installation

```bash
npm install @howssatoshi/quantumcss
```

## 🎯 Quick Start

### CLI Scaffolding
Quickly jumpstart your project with a premium template:
```bash
npx @howssatoshi/quantumcss scaffold gaming index.html
```
*Available templates: `gaming`, `blog`, `news`, `shopping`, `travel`, `starlight`*

### HTML Usage
```html
<button class="btn-starlight ani-float">
  Launch Experience
</button>
```

## ⚙️ Configuration

### Component Presets
Define your own components in `quantum.config.json`:
```json
{
  "componentPresets": {
    "btn-action": "btn-starlight px-8 py-3 rounded-xl hover:scale-105 transition",
    "card-glass": "glass p-6 rounded-2xl border border-white/10 dark:bg-white/5"
  }
}
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

## 📊 Performance

### Bundle Size
- **QuantumCSS Core**: ~15KB gzipped
- **Optimized Selectors**: Minimal specificity for maximum performance
- **Tree Shaking**: Only used utilities and presets are generated in JIT mode

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.
