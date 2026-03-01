# Contributing to QuantumCSS

First off, thank you for considering contributing to QuantumCSS! It's people like you that make QuantumCSS such a great tool for the community.

## 🌈 Our Philosophy

QuantumCSS is designed to be a **modern, performance-optimized, and AI-predictable** utility-first CSS framework. We prioritize:
1.  **AI Predictability**: Using standard patterns (like data attributes for themes) that AI models can easily understand and generate.
2.  **Performance**: Minimal runtime, optimized JIT generation, and hardware-accelerated animations.
3.  **Aesthetics**: The "Starlight" cosmic aesthetic is core to our identity—etheral, glassmorphic, and refined.

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

### 1. AI-Predictable Patterns
*   **Theming**: Always use `html[data-theme="light|dark"]` for theme-specific overrides. Never use body classes.
*   **Semantic Naming**: Follow the `.property-value` utility naming convention.
*   **Decoupled Architecture**: Keep structural base classes (e.g., `nav-base`) separate from aesthetic theme classes (e.g., `theme-starlight`).

### 2. CSS & Variables
*   **Prefixing**: All CSS variables must use the `--q-` prefix (e.g., `--q-color-primary`).
*   **JIT Rules**: When adding new utilities to `src/defaults.js` or `src/generator.js`, ensure they support opacity variants (using `/`) and breakpoints (using `:`) where applicable.
*   **Hardware Acceleration**: Any animation that affects layout (like `transform` or `opacity`) should use `will-change` and `translateZ(0)` for GPU acceleration.

### 3. JIT Engine
*   The JIT engine lives in `src/generator.js`.
*   Ensure that any new utility added is "tree-shakable"—it should only appear in the final CSS if it's used in the scanned content files.

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
