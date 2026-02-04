# QuantumCSS Self-Contained Component Architecture

This document explains the refactored component architecture that reduces implicit dependencies and makes components more self-contained and AI-predictable.

## 🎯 Architecture Principles

### 1. Data Attribute Configuration
Components now use data attributes for configuration instead of relying on fixed DOM structures:

```html
<!-- Before: Fixed structure -->
<nav class="starlight-nav">
  <div class="hamburger"></div>
  <div class="nav-menu-mobile"></div>
</nav>

<!-- After: Flexible configuration -->
<nav data-nav>
  <button data-nav-toggle data-nav-target-id="mobile-menu">Menu</button>
</nav>
<div id="mobile-menu" data-nav-menu>Menu content</div>
```

### 2. Explicit Component APIs
Each component exposes a clear API through data attributes and configuration options:

```html
<!-- Accordion with configuration -->
<div data-accordion 
     data-accordion-allow-multiple="false"
     data-accordion-close-others="true"
     data-accordion-group="main-accordion">
  <button data-accordion-header data-accordion-item-id="item1">Section 1</button>
  <div data-accordion-content id="item1">Content 1</div>
</div>
```

### 3. Backward Compatibility
All refactored components maintain backward compatibility with existing class-based implementations:

```html
<!-- Legacy (still works) -->
<button class="hamburger"></button>
<div class="nav-menu-mobile"></div>

<!-- New (recommended) -->
<button data-nav-toggle data-nav-target="#mobile-menu"></button>
<div id="mobile-menu" data-nav-menu></div>
```

## 🧩 Component Refactor Details

### Navigation System

#### New API
```html
<!-- Basic usage -->
<button data-nav-toggle data-nav-target="#main-menu">Toggle Menu</button>
<nav id="main-menu" data-nav-menu>Menu content</nav>

<!-- Advanced configuration -->
<button data-nav-toggle 
        data-nav-target-id="mobile-nav"
        data-nav-active-class="is-open"
        data-nav-close-outside="true">
  Open Navigation
</button>
<nav id="mobile-nav" data-nav-menu>Navigation items</nav>
```

#### Configuration Options
- `data-nav-toggle`: Marks element as navigation toggle
- `data-nav-target`: CSS selector for target menu
- `data-nav-target-id`: ID of target menu (alternative to selector)
- `data-nav-active-class`: CSS class for active state (default: "active")
- `data-nav-close-outside`: Whether to close on outside click (default: "true")

#### Events
```javascript
document.addEventListener('navToggle', (e) => {
  console.log('Navigation toggled:', e.detail);
});
```

#### Accessibility
Automatic ARIA attribute management:
- `aria-expanded` set on toggle button
- `aria-hidden` set on menu

### Accordion System

#### New API
```html
<!-- Simple accordion -->
<div data-accordion>
  <button data-accordion-header data-accordion-item-id="section1">Section 1</button>
  <div data-accordion-content id="section1">Content 1</div>
</div>

<!-- Advanced configuration -->
<div data-accordion 
     data-accordion-allow-multiple="true"
     data-accordion-close-others="false"
     data-accordion-group="faq"
     data-accordion-header=".faq-question"
     data-accordion-content=".faq-answer"
     data-accordion-item=".faq-item">
  <div class="faq-item">
    <button class="faq-question" data-accordion-item-id="faq1">Question 1?</button>
    <div class="faq-answer" id="faq1">Answer 1</div>
  </div>
</div>
```

#### Configuration Options
- `data-accordion`: Marks container as accordion
- `data-accordion-allow-multiple`: Allow multiple items open (default: "false")
- `data-accordion-close-others`: Auto-close others (default: "true")
- `data-accordion-group`: Group ID for coordinated accordions
- `data-accordion-header`: Selector for header elements (default: ".accordion-header")
- `data-accordion-content`: Selector for content elements (default: ".accordion-content")
- `data-accordion-item`: Selector for accordion items (default: ".accordion-item")
- `data-accordion-item-id`: Links header to specific content by ID

#### Events
```javascript
document.addEventListener('accordionToggle', (e) => {
  console.log('Accordion toggled:', e.detail);
});
```

### Tab System

#### New API
```html
<!-- Simple tabs -->
<div data-tabs>
  <div data-tabs-buttons>
    <button data-tabs-target="tab1">Tab 1</button>
    <button data-tabs-target="tab2">Tab 2</button>
  </div>
  <div data-tabs-panels>
    <div id="tab1">Content 1</div>
    <div id="tab2">Content 2</div>
  </div>
</div>

<!-- Advanced configuration -->
<div data-tabs 
     data-tabs-orientation="vertical"
     data-tabs-active-class="is-active"
     data-tabs-initial="tab2"
     data-tabs-buttons=".nav-tabs button"
     data-tabs-panels=".tab-panels .panel">
  <!-- Tab content -->
</div>
```

#### Configuration Options
- `data-tabs`: Marks container as tab system
- `data-tabs-buttons`: Selector for button container/buttons (default: ".tab-button")
- `data-tabs-panels`: Selector for panel container/panels (default: ".tab-panel")
- `data-tabs-active-class`: CSS class for active state (default: "active")
- `data-tabs-orientation`: Tab orientation ("horizontal" or "vertical")
- `data-tabs-initial`: Initial active tab ID
- `data-tabs-target`: Alternative to `data-tab` on buttons

#### Events
```javascript
document.addEventListener('tabChange', (e) => {
  console.log('Tab changed:', e.detail);
});
```

#### Keyboard Navigation
Built-in keyboard navigation:
- Arrow keys: Navigate tabs
- Home/End: Jump to first/last tab
- Enter/Space: Activate tab

### Theme System

#### New API
```html
<!-- Basic theme toggle -->
<button data-theme-toggle>Toggle Theme</button>

<!-- Advanced configuration -->
<button data-theme-toggle 
        data-themes="light,dark,auto"
        data-theme-storage="my-app-theme"
        data-theme-icon-light=".light-icon"
        data-theme-icon-dark=".dark-icon">
  Toggle Theme
</button>
```

#### Configuration Options
- `data-theme-toggle`: Marks element as theme toggle
- `data-themes`: Comma-separated list of available themes (default: "light,dark")
- `data-theme-storage`: localStorage key for theme persistence (default: "theme")
- `data-theme-icon-light`: Selector for light theme icon (default: ".sun-icon")
- `data-theme-icon-dark`: Selector for dark theme icon (default: ".moon-icon")

#### Global Configuration
```javascript
window.StarlightConfig = {
  theme: {
    defaultTheme: 'light',
    storageKey: 'my-theme',
    themes: ['light', 'dark', 'auto'],
    autoDetect: true
  }
};
```

#### Events
```javascript
document.addEventListener('themechange', (e) => {
  console.log('Theme changed:', e.detail);
});
```

## 📦 Component Usage Examples

### Self-Contained Modal
```html
<!-- Modal with minimal dependencies -->
<button data-modal-toggle="example-modal">Open Modal</button>

<div id="example-modal" data-modal>
  <div data-modal-content>
    <h2>Modal Title</h2>
    <p>Modal content</p>
    <button data-modal-close="example-modal">Close</button>
  </div>
</div>
```

### Configurable Dropdown
```html
<!-- Dropdown with custom configuration -->
<div data-dropdown 
     data-dropdown-trigger="#dropdown-trigger"
     data-dropdown-menu="#dropdown-menu"
     data-dropdown-active-class="show"
     data-dropdown-close-outside="true">
  <button id="dropdown-trigger">Dropdown</button>
  <div id="dropdown-menu" data-dropdown-menu>
    <a href="#" data-dropdown-item>Item 1</a>
    <a href="#" data-dropdown-item>Item 2</a>
  </div>
</div>
```

### Independent Form Validation
```html
<!-- Form with inline validation configuration -->
<form data-form data-form-validation="true">
  <div data-form-field>
    <label data-form-label>Email</label>
    <input type="email" 
           data-form-input 
           data-form-required="true"
           data-form-validate="email">
    <span data-form-error>Valid email required</span>
  </div>
</form>
```

## 🔄 Migration Guide

### From Legacy Classes to Data Attributes

#### Navigation
```html
<!-- Before -->
<button class="hamburger"></button>
<nav class="starlight-nav">
  <div class="nav-menu-mobile">
    <!-- Menu content -->
  </div>
</nav>

<!-- After -->
<button data-nav-toggle data-nav-target="#mobile-menu">Menu</button>
<nav id="mobile-menu" data-nav-menu>
  <!-- Menu content -->
</nav>
```

#### Accordions
```html
<!-- Before -->
<div class="accordion-item">
  <div class="accordion-header">Title</div>
  <div class="accordion-content">Content</div>
</div>

<!-- After -->
<div data-accordion>
  <button data-accordion-header data-accordion-item-id="item1">Title</button>
  <div data-accordion-content id="item1">Content</div>
</div>
```

#### Tabs
```html
<!-- Before -->
<div class="tab-list">
  <button class="tab-button" data-tab="tab1">Tab 1</button>
</div>
<div class="tab-content">
  <div class="tab-panel active" id="tab1">Content 1</div>
</div>

<!-- After -->
<div data-tabs>
  <div data-tabs-buttons>
    <button data-tabs-target="tab1">Tab 1</button>
  </div>
  <div data-tabs-panels>
    <div id="tab1">Content 1</div>
  </div>
</div>
```

## 🎯 Benefits for AI Generation

### 1. Predictable Structure
AI can generate components with consistent patterns because:
- All configuration is explicit via data attributes
- No hidden DOM structure requirements
- Clear separation between structure and behavior

### 2. Reduced Context Dependencies
Components work independently because:
- No reliance on specific parent-child relationships
- Configuration travels with the component
- Self-contained initialization

### 3. Flexible Integration
AI can combine components easily because:
- No naming conflicts
- Configurable CSS classes
- Event-based communication

### 4. Clear Intent
Data attributes make component purpose clear:
```html
<div data-accordion data-accordion-allow-multiple="true">
```

## 🔧 Developer Benefits

### 1. Easier Testing
- Components can be tested in isolation
- Configuration can be modified per test
- No complex DOM setup required

### 2. Better Reusability
- Components work in any context
- No global CSS dependencies
- Configurable behavior

### 3. Simplified Debugging
- Explicit configuration visible in HTML
- Clear event system
- Reduced side effects

### 4. Improved Performance
- No global initializers
- Lazy component loading
- Reduced coupling overhead

## 📚 Migration Strategy

1. **Gradual Migration**: Both systems work together
2. **Feature Flags**: Use data attributes for new features
3. **Documentation Updates**: Examples now show data attributes
4. **AI Training**: Update prompt examples with new patterns

This architecture makes QuantumCSS more maintainable, testable, and predictable for both human developers and AI systems.