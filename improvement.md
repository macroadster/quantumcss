# Quantum CSS Library: Improvement Roadmap

Based on the initial implementation of the "Quantum Nexus" dashboard, the following areas have been identified for improvement to enhance the library's robustness, developer experience, and flexibility.

## 1. Complete Utility Coverage
The library currently lacks several standard utility classes that developers expect when using a utility-first framework.
- **Gradients:** Add full support for `bg-gradient-to-*` (r, l, t, b, tr, tl, br, bl) along with `from-*`, `via-*`, and `to-*` stops.
- **Typography:** Ensure `text-transparent` and `bg-clip-text` are consistently available across all themes.
- **Colors:** Ensure all theme colors (e.g., `starlight-blue`, `starlight-peach`) have corresponding `text-*`, `bg-*`, and `border-*` utilities, including opacity variants (e.g., `bg-primary/20`).

## 2. Decouple Theme from Structure
Component presets are currently too tightly coupled to the "Starlight" aesthetic, making them difficult to repurpose.
- **Abstract Logic:** Separate structural classes (e.g., `nav-base`, `card-base`) from aesthetic classes (e.g., `theme-starlight`, `theme-glass`).
- **Flexible Defaults:** Re-evaluate default layouts for components. For example, `starlight-nav` should likely default to a row layout rather than a column layout to match standard web patterns.

## 3. Configuration & Variable Consistency
There is a disconnect between `quantum.config.json` and the compiled CSS variables.
- **Dynamic Propagation:** Ensure that changes in the `config.json` theme section correctly propagate to the CSS variables used by components.
- **Naming Standards:** Standardize variable naming (e.g., use `--q-color-primary` consistently) to avoid confusion between library-provided variables and user-defined ones.

## 4. Enhanced SVG & Data Visualization Support
The library provides "impressive" containers but lacks the tools to manage the content within them effectively.
- **Scaling Utilities:** Add utility classes to handle SVG `preserveAspectRatio` and `viewBox` scaling issues (e.g., `svg-fluid`, `svg-fixed-text`).
- **Component Overlays:** Provide standardized patterns for absolute-positioned overlays (like data labels) that don't stretch with fluid SVG backgrounds.

## 5. Documentation & "It Just Works" Reliability
- **Component Specs:** Clearly document the internal CSS properties of presets (like `starlight-nav`) so developers know exactly what they are overriding.
- **Error Boundaries:** Ensure that if a theme or plugin is missing in the config, the library falls back gracefully rather than breaking the layout.
