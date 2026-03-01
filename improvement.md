# Quantum CSS Library: Future Roadmap (v1.8.0+)

Following the successful stabilization of the v1.7.x series, which introduced the JIT engine, decoupled architecture, and standardized naming, the focus shifts toward developer experience, extensibility, and interactive polish.

## 1. Functional CLI Scaffolding
The CLI should evolve from a build wrapper to a full project orchestrator.
- **`init` Command**: Generate a sensible `quantum.config.json` and basic directory structure.
- **`scaffold` Command**: Boilerplate generation for common layouts (e.g., `quantumcss scaffold --template gaming`).
- **Watch Mode**: Improved chokidar integration for a seamless "hot reload" CSS experience.

## 2. "Glow Focus" Interaction System
Replace standard browser focus rings with a cohesive, cosmic interaction language.
- **Semantic Focus**: A `focus-glow` utility that automatically pulls the component's accent color (primary, starlight-blue, etc.).
- **Consistent States**: Unified focus/active/hover behavior across all interactive primitives (buttons, inputs, toggles).

## 3. Formalized Plugin Architecture
Enable community and project-specific extensions without modifying the core generator.
- **Dynamic Maps**: Allow external JS plugins to register new `utilityMaps`.
- **Preset Injection**: Plugins should be able to provide complex `componentPresets`.
- **Configuration Hooks**: Lifecycle hooks for the JIT engine to allow post-processing of generated CSS.

## 4. Interactive "Kitchen Sink" Playground
Transform the static documentation into a dynamic configuration tool.
- **Variable Sliders**: Real-time manipulation of core tokens (blur radius, primary hue, spacing scale).
- **Copy-Paste Export**: Allow users to "design" their theme in the browser and export the resulting `quantum.config.json`.

## 5. Advanced Data Visualization Primitives
Expand the SVG support into a set of specialized layout primitives.
- **Chart Containers**: Responsive aspect-ratio containers specifically for SVG charts.
- **Tooltip Portals**: Standardized way to handle high-z-index tooltips that don't get clipped by parent overflow.
