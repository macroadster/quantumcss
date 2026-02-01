# FlowCSS - Utility-First CSS Framework

## Architecture Overview

FlowCSS is a next-generation utility-first CSS framework designed to supersede Tailwind CSS with:

- **Intuitive Naming**: Semantic, memorable class names
- **Performance Optimized**: Smaller bundle sizes with CSS custom properties
- **Enhanced Developer Experience**: Smart defaults and better composability
- **Modern Features**: Container queries, logical properties, and CSS Grid utilities
- **Zero Runtime**: Pure CSS with no JavaScript dependencies

## Core Design Principles

### 1. Semantic Naming Convention
```
Instead of: flex items-center justify-between
Use: flex-center-between
```

### 2. Logical Properties First
```
margin-inline: m-i-4
margin-block: m-b-4
```

### 3. Component Variants
```
button-primary
button-secondary
card-elevated
```

### 4. Smart Breakpoints
```
xs: 320px (mobile)
sm: 640px (tablet)
md: 768px (laptop)
lg: 1024px (desktop)
xl: 1280px (wide)
2xl: 1536px (ultrawide)
```

## File Structure
```
flowcss/
├── core/
│   ├── reset.css
│   ├── variables.css
│   └── base.css
├── utilities/
│   ├── layout.css
│   ├── spacing.css
│   ├── typography.css
│   ├── colors.css
│   └── effects.css
├── components/
│   ├── buttons.css
│   ├── cards.css
│   ├── forms.css
│   └── navigation.css
├── responsive/
│   ├── breakpoints.css
│   └── container.css
└── flowcss.min.css
```