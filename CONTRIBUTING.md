# Contributing to QuantumCSS

First off, thank you for considering contributing to QuantumCSS! It's people like you that make QuantumCSS such a great tool for the community.

## Our Philosophy

QuantumCSS provides **beautiful UI by default** -- like the SQLite of CSS frameworks. We prioritize:

1.  **Semantic HTML first**: Bare elements (`<button>`, `<input>`, `<nav>`) should look great with zero classes. Every class you add should be a deliberate choice, not a necessity.
2.  **Token efficiency**: The framework should be shareable and AI-friendly. A card is `<div class="card">`, not 14 utility classes. Less markup means fewer tokens, faster generation, and easier maintenance.
3.  **Taste by default**: The Starlight design system provides a cohesive, polished aesthetic out of the box. Developers get beauty for free -- like macOS Aqua gave every app gorgeous buttons without effort.
4.  **Performance**: ~33 KB gzipped, zero runtime JS, GPU-accelerated animations. Small enough to ship everywhere.

## 🛠️ Development Workflow

We use a **Research -> Strategy -> Execution** lifecycle for all changes.

1.  **Fork and Clone**: Start by forking the repository and cloning it locally.
2.  **Install Dependencies**: Run `npm install` to get the necessary tools.
3.  **Issue Tracking**: We use `bd` (beads) for local issue tracking. Run `bd onboard` to get started.
4.  **Create a Branch**: Create a feature branch for your changes.
5.  **Build and Test**: 
    *   Run `npm run build:dev` to build the library and run the JIT engine.
    *   Run `npm run docs` to generate the "Kitchen Sink" (`examples/kitchen-sink.html`) and verify your changes visually.
    *   Verify your changes across multiple templates in the `/examples` directory.

## 📏 Engineering Standards

### 1. Semantic-First Patterns
*   **Default styling**: New HTML element styles go in `quantum-base.css`. A bare `<button>` should look good.
*   **Component classes**: For UI patterns HTML can't express (cards, badges, toasts), add a single semantic class in `quantum-components.css`.
*   **Utilities as escape hatch**: Utility classes exist for one-off overrides. Don't build components out of utilities.
*   **Theming**: Always use `html[data-theme="light|dark"]` for theme-specific overrides. Never use body classes.

### 2. CSS & Variables
*   **Prefixing**: All CSS variables must use the `--q-` prefix (e.g., `--q-color-primary`).
*   **JIT Rules**: When adding new utilities to `src/defaults.js` or `src/generator.js`, ensure they support opacity variants (using `/`) and breakpoints (using `:`) where applicable.
*   **Hardware Acceleration**: Any animation that affects layout (like `transform` or `opacity`) should use `will-change` and `translateZ(0)` for GPU acceleration.

### 3. JIT Engine
*   The JIT engine lives in `src/generator.js`.
*   Ensure that any new utility added is "tree-shakable"—it should only appear in the final CSS if it's used in the scanned content files.

#### Plugins & Extensions
You can extend QuantumCSS without modifying the core by creating a plugin. A plugin is a JavaScript function that receives the following context:

```javascript
module.exports = function({ theme, utilityMaps, componentPresets, addUtilities }) {
  // 1. Extend the theme (colors, spacing, etc.)
  theme.colors['custom'] = '#hexvalue';

  // 2. Add new utilities
  addUtilities({
    'my-utility': { property: 'display', value: 'flex' }
  });

  // 3. Register component presets
  componentPresets['my-button'] = 'btn-base bg-custom text-white';

  // 4. (Optional) Return a post-processing hook
  return {
    transformCSS: (css) => {
      return css + '\n/* Custom Post-processing */';
    }
  };
};
```

Register your plugin in `quantum.config.json`:
```json
{
  "plugins": ["./plugins/my-plugin.js"]
}
```

## 🧪 Testing & Validation

All changes MUST be verified visually and structurally:
1.  **Kitchen Sink**: Ensure `examples/kitchen-sink.html` renders correctly and includes your new tokens/utilities.
2.  **Regression Testing**: Check existing templates (`starlight.html`, `gaming-template.html`, etc.) to ensure no visual regressions were introduced.
3.  **Build Verification**: Run `npm run build` and check the console output for the final bundle size and gzipped size.

## 📝 Commit Messages

We follow a simple, focused commit message style:
*   `feat: ...` for new features or utilities.
*   `fix: ...` for bug fixes or layout corrections.
*   `docs: ...` for documentation updates.
*   `perf: ...` for performance optimizations.
*   `chore: ...` for maintenance tasks.

## 🤝 Getting Help

If you have questions or need guidance, feel free to open an issue or start a discussion. We're here to help!

---

*Powered by Quantum CSS · Build the Future of the Web*
