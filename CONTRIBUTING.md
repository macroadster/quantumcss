# Contributing to QuantumCSS

First off, thank you for considering contributing to QuantumCSS! It's people like you that make QuantumCSS such a great tool for the community.

## Our Philosophy

QuantumCSS provides **beautiful UI by default** -- like the SQLite of CSS frameworks. We prioritize:

1.  **Semantic HTML first**: Bare elements (`<button>`, `<input>`, `<nav>`) should look great with zero classes. Every class you add should be a deliberate choice, not a necessity.
2.  **Token efficiency**: The framework should be shareable and AI-friendly. A card is `<div class="card">`, not 14 utility classes. Less markup means fewer tokens, faster generation, and easier maintenance.
3.  **Taste by default**: The Starlight design system provides a cohesive, polished aesthetic out of the box. Developers get beauty for free -- like macOS Aqua gave every app gorgeous buttons without effort.
4.  **Performance**: ~35 KB gzipped, zero runtime JS, GPU-accelerated animations. Small enough to ship everywhere.

## 🛠️ Development Workflow

We use a **Research -> Strategy -> Execution** lifecycle for all changes.

1.  **Fork and Clone**: Start by forking the repository and cloning it locally.
2.  **Install Dependencies**: Run `npm install` to get the necessary tools.
3.  **Issue Tracking**: We use `bd` (beads) for local issue tracking. Run `bd onboard` to get started.
4.  **Create a Branch**: Create a feature branch for your changes.
5.  **Build and Test**: 
    *   Run `npm run build` (or `build:dev`) to concat static CSS layers into `dist/quantum.min.css`.
    *   Run `npm run test:unit` for architecture/theme unit tests.
    *   Open `examples/kitchen-sink.html` and other templates under `/examples` to verify visually.
    *   If you change the atomic catalog sources, run `npm run emit:utils` then rebuild (prefer hand-editing `quantum-utilities.css` long-term).

## 📏 Engineering Standards

### 1. Semantic-First Patterns
*   **Default styling**: New HTML element styles go in `quantum-base.css`. A bare `<button>` should look good.
*   **Component classes**: For UI patterns HTML can't express (cards, badges, toasts), add a single semantic class in `quantum-components.css`.
*   **Utilities as escape hatch**: Utility classes exist for one-off overrides. Don't build components out of utilities.
*   **Theming**: Always use `html[data-theme="light|dark"]` for theme-specific overrides. Never use body classes.

### 2. CSS & Variables
*   **Prefixing**: All CSS variables must use the `--q-` prefix (e.g., `--q-color-primary`).
*   **Utilities**: Add atomics only in `src/styles/quantum-utilities.css`. Named UI never goes there (see `component-owned-classes.json`). Prefer CSS variables (`var(--q-space-*)`) for spacing.
*   **Hardware Acceleration**: Any animation that affects layout (like `transform` or `opacity`) should use `will-change` and `translateZ(0)` for GPU acceleration.

### 3. Static utilities
*   Atomic utilities live in `src/styles/quantum-utilities.css`. Maintainers can refresh the catalog with `npm run emit:utils` (`src/generator.js` is emit-only, not the product build).
*   Named UI belongs in `quantum-components.css` only. See `component-owned-classes.json` and root [`SKILL.md`](SKILL.md) for AI usage rules.

### 4. AI agents
*   Use root [`SKILL.md`](SKILL.md) as the single agent guide (replaces the old `AI_DEVELOPER_GUIDE.md` / `AI_PROMPT_EXAMPLES.md` / `SYSTEM_PROMPT.md`).

### 5. Theming (not plugins)
*   Product CSS is static. There is no content-scan plugin pipeline in `npm run build`.
*   Theme knobs go in theme-only `quantum.config.json` and/or CSS variables; emit with `npm run theme` / `npx quantumcss theme`.
*   Extend the library by editing static CSS (`quantum-base.css`, `quantum-components.css`, `quantum-utilities.css`), not by inventing a JIT plugin API.

## 🧪 Testing & Validation

All changes MUST be verified visually and structurally:
1.  **Kitchen Sink**: Ensure `examples/kitchen-sink.html` renders correctly and includes your new tokens/utilities.
2.  **Regression Testing**: Check existing templates (`starlight.html`, `gaming-portal.html`, `email-client.html`, etc.) to ensure no visual regressions were introduced.
3.  **Build Verification**: Run `npm run build` and check raw + gzipped size (~35 KB gzip expected).

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
