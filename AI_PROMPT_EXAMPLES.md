# AI Prompt Examples for QuantumCSS

These examples show how to instruct AI models to generate effective QuantumCSS code.

## Basic Component Generation

### Prompt 1: Create a Card Component
```
Create a responsive card component using QuantumCSS. The card should have:
- A starlight glass effect background
- A title and description
- A primary button
- Proper spacing and typography
- Theme-aware styling using data attributes

Use semantic classes where available and include hover states.
```

### Expected Output:
```html
<div class="starlight-card">
  <h3 class="text-xl font-bold mb-4">Card Title</h3>
  <p class="text-secondary mb-6">Description text with proper spacing</p>
  <button class="btn-starlight">Action Button</button>
</div>
```

### Prompt 2: Navigation Menu
```
Generate a responsive navigation menu using QuantumCSS with:
- Horizontal layout on desktop
- Mobile hamburger menu
- Dropdown submenu for "Services"
- Starlight theme styling
- Proper z-index layering
- Theme switching support

Use the built-in navigation components and include all necessary JavaScript for mobile toggle.
```

### Expected Output:
```html
<nav class="starlight-nav">
  <div class="container mx-auto px-8">
    <div class="flex justify-between items-center py-4">
      <div class="font-bold text-xl text-gradient-starlight">Logo</div>
      <div class="nav-desktop">
        <ul class="nav-list">
          <li><a href="#" class="nav-link">Home</a></li>
          <li>
            <div class="dropdown">
              <a href="#" class="nav-link">Services ▾</a>
              <div class="dropdown-menu">
                <a href="#" class="dropdown-item">Web Design</a>
                <a href="#" class="dropdown-item">Development</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="hamburger">
        <span></span><span></span><span></span>
      </div>
    </div>
  </div>
  <div class="nav-menu-mobile">
    <ul class="nav-list vertical">
      <li><a href="#" class="nav-link">Home</a></li>
      <li><a href="#" class="nav-link">Services</a></li>
    </ul>
  </div>
</nav>
```

## Layout Generation

### Prompt 3: Dashboard Grid
```
Create a dashboard layout using QuantumCSS with:
- Responsive grid layout (3 columns on desktop, 1 on mobile)
- Starlight cards for each widget
- Statistics cards with gradients
- Proper spacing using the complete spacing scale
- Z-index management for overlays
- Theme switching capability

Include examples of different card types: stats, charts, and user lists.
```

### Expected Output:
```html
<div class="container mx-auto px-8 py-8">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <!-- Stats Card -->
    <div class="starlight-card">
      <span class="stat-label">Total Users</span>
      <span class="stat-value">12,543</span>
      <div class="stat-trend up">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
        </svg>
        12.5%
      </div>
    </div>
    
    <!-- Chart Card -->
    <div class="starlight-card">
      <h3 class="text-lg font-bold mb-4">Revenue Chart</h3>
      <div class="h-32 bg-starlight/20 rounded-lg flex items-center justify-center">
        <span class="text-muted">Chart visualization</span>
      </div>
    </div>
    
    <!-- User List Card -->
    <div class="starlight-card">
      <h3 class="text-lg font-bold mb-4">Recent Users</h3>
      <div class="space-y-3">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-starlight rounded-full"></div>
          <span class="text-sm">John Doe</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Form Generation

### Prompt 4: Contact Form
```
Generate a contact form using QuantumCSS with:
- Starlight form styling
- All input types: text, email, select, textarea, checkbox
- Proper validation states
- Theme-aware styling
- Responsive layout
- Submit and cancel buttons

Use the starlight input classes and include proper spacing with the complete spacing scale.
```

### Expected Output:
```html
<form class="starlight-form max-w-2xl mx-auto">
  <div class="mb-6">
    <label class="block text-sm font-semibold mb-2">Full Name</label>
    <input type="text" class="input-starlight w-full" placeholder="Enter your name">
  </div>
  
  <div class="mb-6">
    <label class="block text-sm font-semibold mb-2">Email Address</label>
    <input type="email" class="input-starlight w-full" placeholder="your@email.com">
  </div>
  
  <div class="mb-6">
    <label class="block text-sm font-semibold mb-2">Inquiry Type</label>
    <select class="input-starlight select-starlight w-full">
      <option>General Question</option>
      <option>Technical Support</option>
      <option>Sales Inquiry</option>
    </select>
  </div>
  
  <div class="mb-6">
    <label class="block text-sm font-semibold mb-2">Message</label>
    <textarea class="input-starlight w-full" rows="5" placeholder="Tell us more..."></textarea>
  </div>
  
  <div class="mb-8">
    <label class="flex items-center gap-3">
      <input type="checkbox" class="checkbox-starlight">
      <span class="text-sm">I agree to the terms and conditions</span>
    </label>
  </div>
  
  <div class="flex gap-4">
    <button type="submit" class="btn-starlight flex-1">Send Message</button>
    <button type="button" class="btn-secondary">Cancel</button>
  </div>
</form>
```

## Theme Integration

### Prompt 5: Theme-Specific Component
```
Create a custom component with theme-aware styling using QuantumCSS. The component should:
- Use data attributes for theme switching (not body classes)
- Have different styles for light and dark themes
- Include hover states that work in both themes
- Use CSS custom properties for theme variables
- Follow the Starlight design system

Create a "feature card" that shows how to properly implement theme switching.
```

### Expected Output:
```html
<div class="feature-card">
  <div class="feature-icon">
    <svg class="w-8 h-8 text-starlight-blue" fill="currentColor" viewBox="0 0 20 20">
      <path d="M13 7H7v6h6V7z"/>
      <path fill-rule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2z" clip-rule="evenodd"/>
    </svg>
  </div>
  <h3 class="feature-title">Advanced Features</h3>
  <p class="feature-description">Experience the power of QuantumCSS with cutting-edge design patterns and theme integration.</p>
</div>
```

```css
.feature-card {
  @apply starlight-card p-6 text-center;
  transition: all var(--transition-base);
}

.feature-icon {
  @apply w-16 h-16 mx-auto mb-4 bg-starlight/20 rounded-full flex items-center justify-center;
  transition: all var(--transition-base);
}

.feature-title {
  @apply text-xl font-bold mb-3;
  transition: color var(--transition-base);
}

.feature-description {
  @apply text-secondary text-sm leading-relaxed;
  transition: color var(--transition-base);
}

html[data-theme="light"] .feature-card {
  @apply bg-white border-neutral-100 shadow-lg;
}

html[data-theme="light"] .feature-icon {
  @apply bg-blue-50;
}

html[data-theme="light"] .feature-title {
  @apply text-slate-900;
}

html[data-theme="light"] .feature-description {
  @apply text-slate-600;
}

.feature-card:hover .feature-icon {
  @apply scale-110;
  box-shadow: 0 0 20px var(--color-starlight-glow);
}

html[data-theme="light"] .feature-card:hover .feature-icon {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}
```

## Error Handling

### Prompt 6: Error States
```
Create error handling components using QuantumCSS:
- Error badge with proper colors
- Alert components with different severity levels
- Form validation error styling
- Error icon integration
- Theme-aware error colors (success, warning, error)

Make sure all error states work correctly in both light and dark themes.
```

### Expected Output:
```html
<!-- Error Alert -->
<div class="alert alert-error">
  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
  </svg>
  <span>There was an error processing your request</span>
</div>

<!-- Warning Alert -->
<div class="alert alert-warning">
  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
  </svg>
  <span>Please review your input before continuing</span>
</div>

<!-- Success Alert -->
<div class="alert alert-success">
  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
  </svg>
  <span>Your changes have been saved successfully</span>
</div>

<!-- Error Badge -->
<span class="badge badge-error">Failed</span>

<!-- Form Error State -->
<input type="email" class="input-starlight border-error" placeholder="Enter valid email">
<p class="text-error text-sm mt-2">Please enter a valid email address</p>
```

## Best Practices Prompts

### Prompt 7: Code Review
```
Review this QuantumCSS code and suggest improvements:
1. Check for proper theme switching implementation
2. Ensure semantic classes are used where available
3. Verify spacing uses the complete scale
4. Check z-index layering
5. Validate component structure

Provide specific recommendations following QuantumCSS best practices.
```

### Prompt 8: Optimization
```
Optimize this QuantumCSS component for:
1. Performance (minimize redundant utilities)
2. Maintainability (use semantic classes)
3. Accessibility (proper contrast and ARIA)
4. AI generation consistency
5. Theme switching reliability

Focus on making the code more predictable for AI generation.
```

## Key Reminders for AI Models

1. **Always use `html[data-theme]`** for theme-specific styles
2. **Leverage semantic components** before individual utilities
3. **Use the complete spacing scale** (0-32 with directional variants)
4. **Apply proper z-index utilities** for layer management
5. **Include theme switching** in all interactive components
6. **Test responsive behavior** at all breakpoints
7. **Use Starlight components** for premium UI elements

These examples serve as templates for generating consistent, high-quality QuantumCSS code across different use cases and component types.