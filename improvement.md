Context:
I have a CSS library called QuantumCSS that has grown into class soup. It has three layers:

Utilities — .p-4, .flex, .gap-8, .text-xl etc. (keep as-is, these are fine)
Components — .starlight-card, .btn-primary, .badge-success, .input-starlight, .avatar etc. (keep as-is, these are legitimate)
Templates — .layout-email-3col, .email-nav, .email-feed, .sidebar, .nav-item, .app-layout etc. (this is the problem — these need to be eliminated from HTML entirely)

The pattern I want you to follow:
Template layout and structure should be driven entirely by CSS structural selectors, scoped under an html class name. The HTML should only contain semantic tags, aria-* attributes, data-* attributes for variants, and utility classes for one-off tweaks. Zero structural class names in the HTML.

Example of what I want — BEFORE (class soup):
html<div class="layout-email-3col">
  <div class="email-nav sidebar flex flex-col p-4 gap-3">
    <div class="nav-section">
      <p class="nav-section-title">Labels</p>
      <a class="nav-item active">Inbox <span class="nav-badge">12</span></a>
    </div>
  </div>
  <div class="email-feed">...</div>
  <div class="email-content flex-1">...</div>
</div>

AFTER (semantic HTML, zero structural classes):
html<html class="mail">
  <body>
    <nav>
      <header>Starlight Mail</header>
      <button>+ Compose</button>
      <ul>
        <li><a href="#" aria-current="page">Inbox <em>12</em></a></li>
      </ul>
      <section>
        <h6>Labels</h6>
        <ul>
          <li><a href="#"><b style="--c:#38bdf8"></b> Work</a></li>
        </ul>
      </section>
      <footer>
        <b>JD</b>
        <span>John Doe <small>john.doe@email.com</small></span>
      </footer>
    </nav>
    <aside>...</aside>
    <main>...</main>
  </body>
</html>

The CSS that replaces all those structural classes:
csshtml.mail body {
  display: grid;
  grid-template-columns: 220px 300px 1fr;
  height: 100vh;
}
html.mail nav { /* replaces .email-nav .sidebar */ }
html.mail nav > ul li a[aria-current] { /* replaces .nav-item.active */ }
html.mail nav > ul li a em { /* replaces .nav-badge */ }
html.mail nav > section h6 { /* replaces .nav-section-title */ }
html.mail aside { /* replaces .email-feed */ }
html.blog main { /* replaces .email-content */ }

Selector translation rules you must follow:

Structural wrapper divs → body layout via CSS grid/flex
.sidebar, .email-nav, .music-nav → html.[template] nav
.email-feed, .chat-sidebar → html.[template] aside
.email-content, .main-content → html.[template] main
.nav-item.active → nav a[aria-current]
.nav-badge → nav a em
.nav-section-title → nav section h6
State classes (.active, .selected, .open) → aria-* attributes
Variant classes (.badge-success, .label-work) → data-* attributes or mark[data-color]
Avatar initials → figure[data-initials] with CSS content: attr(data-initials)
:has() for parent styling based on child content (e.g. section:has(input[type=email]) for newsletter panels)
First/last child roles → :first-child, :last-child selectors
Positional roles → :nth-child(), + adjacent, ~ sibling combinators

Your task:
I will give you an HTML template file that uses QuantumCSS class soup. You must:

Rewrite the HTML using only semantic tags, aria-*, data-*, and utility classes for one-off spacing/color tweaks
Write a scoped CSS block under html.[templatename] that recreates all structural and component styling using structural selectors
Preserve 100% of the visual appearance — colors, spacing, hover states, animations, layout
Add a comment above each CSS rule explaining which original class it replaces
Output the HTML and CSS separately so I can integrate them cleanly

Do not:

Invent new class names for structural purposes
Use classes to identify layout regions
Change the visual design

## Scaling the Modern Semantic Pattern (Lessons Learned)

### 1. Structural Selector Precision (The "Greedy Selector" Trap)
When styling semantic tags like `<nav>` or `<ul>`, always use direct child combinators (`>`) or contextual ancestors to prevent style leakage.
- **Incorrect:** `html.blog nav { ... }` (matches every nav in the document, including sidebar and footer).
- **Correct:** `html.blog body > nav { ... }` (matches only the primary site header).
- **Correct:** `html.blog aside nav { ... }` (matches only navigation widgets in the sidebar).

### 2. Intent-Based Variants (Data Attributes)
Instead of creating new classes for visual variants, use `data-variant` or `data-type`. This creates a "Design API" that is easier for AI to reason about.
- `data-variant="card"` vs `data-variant="glass"`
- `data-variant="primary"` vs `data-variant="outline"`
- `data-type="code"` vs `data-type="featured"`

### 3. Layout Integrity
- **Width & Box-Sizing:** When moving from utility-heavy HTML to structural CSS, ensure that layout containers (`main`, `footer`, `nav`) explicitly set `width: 100%` and `box-sizing: border-box`. 
- **Flex Consistency:** Use `flex-wrap: nowrap` and `flex-shrink: 0` for horizontal bars (like footers) to prevent elements from breaking into "blocks" on smaller viewports unless explicitly desired.

### 4. Preserving "Subtle" Design Utilities
Watch for utility classes in the original "class soup" that indicate specific design intent:
- `.italic` and `.font-black`: These often define the "brand voice" of headers. Ensure they are captured in the structural `h1`, `h2` selectors.
- `.space-y-4`: Translate these into `gap` properties within the structural CSS flex/grid rules.

### 5. AI Context Benefits
This approach is **Token Efficient**. Removing 50+ utility classes from a template reduces HTML weight by ~40-60%, allowing the AI to process larger, more complex applications within its context window without losing track of the architecture.
