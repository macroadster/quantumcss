# Semantic Refactoring Workflow

This guide outlines a token-efficient strategy for refactoring complex "class soup" templates into reusable, semantic components.

## The Problem
Refactoring entire templates at once overloads the AI context window.
Mixing structural classes (`.email-sidebar`) with utility classes (`.flex .p-4`) makes the HTML hard to read and maintain.

## The Solution: Schema-First Component Extraction
Instead of rewriting files manually, we use a **Declarative Schema** to define how components should be transformed. We then extract them one by one.

### 1. Define the Rules
Edit `src/semantic/rules.json` to map old classes to new semantic tags.

**Example:**
```json
{
  "mail": {
    "components": {
      "sidebar": {
        "selector": ".email-sidebar",
        "targetTag": "nav",
        "stripClasses": true,
        "rules": [
          { "selector": ".compose-btn", "tag": "button", "addClass": "compose" },
          { "selector": ".nav-item", "tag": "a" }
        ]
      }
    }
  }
}
```

### 1.1 Aggressive Class Stripping
For components with heavy "utility soup" (e.g. Tailwind classes), enable `aggressiveStrip` to clean all unmatched children automatically.

```json
"hero": {
  "selector": ".hero-section",
  "targetTag": "section",
  "aggressiveStrip": true,
  "keepClasses": ["icon", "btn-primary"], 
  "rules": [...]
}
```
-   **aggressiveStrip**: Recursively removes `class` attributes from all children not matched by a rule.
-   **keepClasses**: List of classes to preserve (e.g. icons, specific functional classes) even when stripping.

### 2. Run the Extraction Tool
Use the extraction tool to isolate the component and apply the transformation automatically.

```bash
node src/semantic/extract.js examples/email-client.html mail sidebar > src/semantic/fixtures/mail-sidebar.html
```

This will:
1.  Read `examples/email-client.html`.
2.  Find `.email-sidebar`.
3.  Convert it to `<nav>`.
4.  Strip the old classes.
5.  Apply rules to children (e.g. `.nav-item` -> `<a>`).
6.  Output the clean HTML to the file.
7.  Print suggested CSS selectors to the console (stderr).

### 3. Implement the CSS
Copy the suggested CSS selectors from the console output into your structural CSS file (e.g. `src/semantic/presets/mail.css`).

```css
html.mail nav {
  /* Paste styles from original .email-sidebar here */
  display: flex;
  flex-direction: column;
  /* ... */
}
```

### 4. Reassemble
Once all components (sidebar, list, content) are extracted and refactored, you can assemble the final `mail.html` template using these clean building blocks.

## Benefits
-   **Token Efficiency:** The AI only needs to see one component at a time.
-   **Consistency:** The schema ensures all "sidebars" are transformed the same way.
-   **Reusability:** The extracted HTML is now a standalone semantic component, free of specific utility classes.
