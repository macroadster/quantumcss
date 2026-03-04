# QuantumCSS: Architectural Evolution Roadmap (v1.11.0+)

Following the successful refactor of semantic tokens in v1.10.0, this document outlines the strategy for the next major iteration.

## 1. Zero-Boilerplate Atmospheric Layouts
Currently, using `starlight-stars` requires manual `z-index` and `background: transparent` management on the page level. We will internalize this logic.

- **Objective**: Create a `.starlight-layout` primitive.
- **Implementation**:
  ```css
  .starlight-layout {
    background: transparent !important;
    min-height: 100vh;
  }
  /* Automatically lift direct content children */
  .starlight-layout > :not(.starlight-stars) {
    position: relative;
    z-index: 1;
  }
  ```
- **Goal**: User only needs to add one class to `<body>` to get a working atmospheric background.

## 2. Global Component Color Audit
We need to eliminate "Color Debt" in `src/styles/quantum-components.css`. Many components still use hardcoded hex values or fixed opacity strings.

- **Tasks**:
  - Replace all `#fff`, `#ffffff`, and `#08081a` with `--q-text-primary` or `--q-color-bg`.
  - Migrate legacy component color variables to use `color-mix` against semantic tokens.
  - Standardize `border` utilities to use `--q-color-border` instead of hardcoded alpha values.

## 3. Automated Release Pipeline
Manual version bumping across 6+ files is error-prone. We will automate the "Source of Truth".

- **Objective**: Create `scripts/release.js`.
- **Logic**:
  - Read version from `package.json`.
  - Use regex to sync `README.md` badges, `build.js` banners, and `index.html` headers.
  - Automatically append the version to the `portfolio-resume.html` timeline.

## 4. Visual Integrity & Testing
As the framework grows, changes to core `z-index` or `positioning` in `quantum-base.css` risk breaking older templates.

- **Strategy**: 
  - Enhance `tests/css-integrity.spec.js`.
  - Add specific checks for stacking context (ensuring backgrounds are actually behind content).
  - verify that `html[data-theme]` triggers expected CSS variable swaps.
---

## 5. Semantic HTML Blog Presets (Implicit)
Users want to use native HTML5 semantic elements without adding any custom classes or manual hover/dark styling.

- **Objective**: Create implicit starlight styles that apply automatically to semantic elements.
- **Implementation**: Target semantic elements directly in CSS, not via explicit classes.

- **Tasks**:
  - Update `starlight.css` to target semantic elements implicitly:
    - `header` - Glassmorphic header styling (no class needed)
    - `nav` - Navigation with hover/dark/active baked in
    - `section` - Section container with responsive spacing
    - `article` - Article card with hover/dark/active presets
    - `aside` - Sidebar with appropriate width and positioning
    - `footer` - Footer with glassmorphic styling
  - Include built-in hover states, dark mode support, and responsive behavior in element selectors
  - Add example in `examples/` demonstrating blog layout

- **Usage**:
  ```html
  <html class="starlight-blog">
    <header>
      <nav>...</nav>
    </header>
    <section>
      <article>...</article>
      <aside>...</aside>
    </section>
    <footer>...</footer>
  </html>
  ```

- **Goal**: No `hover="..."`, `dark="..."`, `active="..."` attributes or explicit `starlight-*` classes needed.

---

**Next Session Focus**: Implementation of `.starlight-layout` and the Component Color Audit.
