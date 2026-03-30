# PRD: Semantic Component Normalization

Status: Draft
Date: 2026-03-19
Related issue: `css-ysh`

## Summary

The semantic HTML transition exposed a scaling problem: the library is trending toward 1800+ one-off component names with weak reuse across templates. That breaks the original goal of reducing class soup and makes the API worse for AI token efficiency, documentation, and long-term maintenance.

This normalization phase reduces the public semantic API to a smaller set of reusable component families. It replaces the overloaded `.starlight-nav` model with role-based navigation components, removes brand prefixes from public classes, and collapses visually similar components into generalized primitives plus variants.

## Problem Statement

The current library mixes three competing patterns:

1. Brand-prefixed public classes such as `.starlight-nav`, `.starlight-card`, `.starlight-avatar`, and `.starlight-notification-dot`.
2. Shorter, more role-based classes already in use such as `.nav-header`, `.aside-nav`, `.avatar`, `.icon-btn`, `.status-dot`, and `.notification-dot`.
3. Template-local or custom-element patterns such as `user-cell`, `email-label`, `attachment-card`, `.chat-tab`, `.category-tab`, `.legend-dot`, and `.action-btn`.

This creates several problems:

- Naming is inconsistent across templates.
- Similar structures are redefined as separate components.
- Brand prefixes add tokens without adding semantic meaning.
- Reuse drops because template-specific names become the default public API.
- The current semantic transition encourages component proliferation instead of normalization.

## Current State

The repo already shows that normalization has partially started:

- [`src/defaults.js`](/Users/eric/sandbox/css/src/defaults.js) still exports `starlight-*` presets such as `starlight-avatar*`, and `starlight-table-*`.
- [`src/styles/quantum-components.css`](/Users/eric/sandbox/css/src/styles/quantum-components.css) already contains unprefixed primitives such as `.nav-header`, `.avatar`, `.status-dot`, `.notification-dot`, `.tab-list`, `.tab-button`, and `.icon-btn`.
- [`examples/blog.html`](/Users/eric/sandbox/css/examples/blog.html) and [`examples/admin-panel.html`](/Users/eric/sandbox/css/examples/admin-panel.html) already use `.nav-header` and `.aside-nav`.
- [`examples/chat-messaging.html`](/Users/eric/sandbox/css/examples/chat-messaging.html), [`examples/video-streaming.html`](/Users/eric/sandbox/css/examples/video-streaming.html), and [`examples/analytics-dashboard.html`](/Users/eric/sandbox/css/examples/analytics-dashboard.html) introduce new one-off component names for tabs, dots, cards, and list rows instead of reusing shared primitives.

The problem is not missing components. The problem is a missing normalization rule for which components are allowed to become public.

## Goals

- Replace `.starlight-nav` and `.starlight-nav.vertical` style navigation with `nav-header` and `aside-nav`.
- Remove `starlight-` and `q-` from public class names.
- Consolidate overlapping semantic components into a smaller canonical set.
- Preserve the semantic HTML direction without exploding the number of public components.
- Make the public API more reusable across templates and more token-efficient for AI generation.

## Non-Goals

- Renaming internal CSS custom properties such as `--q-*` in this phase.
- Rewriting every visual style to look identical.
- Removing all template-local styles. Template-local styles may remain local if they are not promoted to shared API.
- Finalizing custom element strategy for every semantic tag experiment.

## Product Requirements

### 1. Navigation Normalization

The public navigation API must become role-based instead of brand-based.

#### Canonical Navigation Components

| Current pattern | Canonical component | Notes |
| --- | --- | --- |
| `.starlight-nav` | `.nav-header` | (REMOVED) Horizontal/global header navigation |
| `.starlight-navbar` | `.nav-header` | (REMOVED) Same role, no separate public component needed |
| `.starlight-nav.vertical` | `.aside-nav` | (REMOVED) Vertical/sidebar navigation |
| `.starlight-sidebar-nav` | `.aside-nav` | (REMOVED) Alias during migration, then deprecate |
| `.starlight-sidebar` used as nav shell | `.aside-nav` or layout wrapper | Split layout shell from nav semantics |

#### Requirement

- All first-party examples must use `nav-header` or `aside-nav`.
- No new example or documentation should introduce `.starlight-nav`.
- Existing `.nav-logo`, `.nav-links`, `.nav-badge`, `.nav-drawer`, `.aside-nav-item`, `.aside-nav-label`, and `.aside-nav-badge` are acceptable because they are component-role names, not brand names.

### 2. Prefix Normalization

The public API must stop using `starlight-` and `q-` as component prefixes.

#### Scope

- Remove prefixes from public classes, public presets, and documented example markup.
- Keep `--q-*` CSS variables for now to avoid unnecessary theme/config churn.
- Keep internal build/config namespaces unchanged unless a separate refactor explicitly targets them.

#### Naming Rules

- Public component names should describe role, not theme.
- Brand-specific styling should be expressed as a theme or variant, not as the component name.
- Public names should follow `component`, `component-part`, or `component-variant`.

#### Rename Examples

| Current public name | Normalized name |
| --- | --- |
| `.starlight-card` | `.card-premium` or `.card-glass` |
| `.starlight-avatar` | `.avatar` |
| `.starlight-avatar-lg` | `.avatar.avatar-lg` |
| `.starlight-notification-dot` | `.notification-dot` |
| `.search` | `.search-field` or `.search-input-group` |
| `.icon-search` | `.icon-search` |
| `.icon-display` | `.icon-display` |

#### Requirement

- No newly added public class may start with `starlight-` or `q-`.
- During migration, old names must remain as aliases for at least one release cycle.
- Docs must clearly distinguish between public classes and internal `--q-*` token namespaces.

### 3. Canonical Component Inventory

The library needs a small canonical set of reusable components. Everything else should either compose from these or stay template-local.

#### Keep As First-Class Shared Components

| Canonical component | Reason |
| --- | --- |
| `nav-header` | Common horizontal navigation shell |
| `aside-nav` | Common vertical navigation shell |
| `card` | Base surface container |
| `card-header`, `card-body`, `card-footer` | Shared card composition |
| `btn` | Base action button |
| `icon-btn` | Shared icon-only action primitive |
| `avatar` | Reused across admin, chat, blog, and analytics |
| `badge` | Shared label/status/trend/count primitive |
| `tab-list`, `tab-button`, `tab-panel` | Shared tab system |
| `dot` | Shared visual indicator primitive |
| `search-field` | Common search input wrapper |
| `media-item` | New generalized row/list pattern |

#### Convert To Generalized Components

| Existing patterns | Convert to | Rationale |
| --- | --- | --- |
| `.stat-trend-up`, `.stat-trend-down`, `.role-badge`, `.status-badge`, `.label-*`, `email-label`, `.badge-count` | `badge` family | These are all short inline emphasis/status pills with different colors or sizes |
| `.user-cell`, `user-cell`, `attachment-card`, `.activity-item`, `.conversation-item` | `media-item` family | These all use a leading visual, main content block, and optional trailing meta/action |
| `.chat-tab`, `.category-tab`, `.chart-tab` | `tab-button` variants | Same interaction model, different skin |
| `.legend-dot`, `.status-dot`, `.notification-dot`, `.blue-dot`, `.green-dot`, `.red-dot` | `dot` family | Same visual primitive with different color/state/positioning |
| `.action-btn`, `.menu-btn`, some one-off toolbar buttons | `icon-btn` variants | Same structure, different size and intent |
| `.starlight-card`, `.starlight-feed-card`, `.stat-card`, `.chart-card`, `.quick-action-card`, `.table-container` | `card` family | Same surface primitive with composition and modifiers |

## Normalized Component Model

### Badge Family

Use `badge` as the canonical primitive.

Examples:

- trend pill: `badge badge-success`
- email label: `badge badge-info`
- role label: `badge badge-secondary`
- count badge: `badge badge-count`

Rule:

- Do not create a new component name for a color treatment that is already expressible as a badge variant.

### Media Item Family

Introduce `media-item` as the shared pattern for rows with a leading visual and textual content.

Suggested parts:

- `media-item-leading`
- `media-item-body`
- `media-item-title`
- `media-item-meta`
- `media-item-trailing`

Rule:

- `user-cell`, `attachment-card`, `activity-item`, and `conversation-item` should become either aliases or preset compositions of `media-item`.

### Tab Family

Use one tab system with visual variants instead of separate tab components by domain.

Suggested pattern:

- `tab-list`
- `tab-button`
- `tab-button.active`
- variant classes such as `tabs-pill`, `tabs-segmented`, `tabs-contrast`

Rule:

- Chat, video category, and chart tabs may keep different styling, but they must share one tab API.

### Dot Family

Use a single `dot` primitive with modifiers.

Suggested pattern:

- `dot`
- `dot-success`
- `dot-warning`
- `dot-danger`
- `dot-info`
- `dot-notification`
- `dot-online`
- `dot-offline`

Rule:

- If the only difference is color, glow, or absolute positioning, it should be a `dot` modifier, not a new component.

### Button Family

Use `btn` for text actions and `icon-btn` for icon-only actions.

Suggested pattern:

- `btn`
- `btn-primary`
- `btn-secondary`
- `icon-btn`
- `icon-btn-sm`
- `icon-btn-lg`
- `action-group`

Rule:

- `action-btn` and `menu-btn` should become aliases or variants, not independent primitives.

### Card Family

Use `card` as the base surface and express specialization through modifiers and sections.

Suggested pattern:

- `card`
- `card-interactive`
- `card-premium`
- `card-stat`
- `card-chart`
- `card-table`
- `card-action`
- `card-header`
- `card-body`
- `card-footer`

Rule:

- A new card type is allowed only if it changes layout structure, not just color or accent styling.

## Decision Rules For New Shared Components

A new shared component may be added only if at least one of the following is true:

- It is a primitive used across multiple domains, such as `avatar`, `badge`, or `card`.
- It appears in at least two example templates with the same structure.
- It cannot be expressed as a variant or composition of an existing canonical component.

Otherwise:

- Keep it template-local.
- Do not document it as public API.
- Do not add it to `src/defaults.js` as a named preset.

## Migration Plan

### Phase 1: Alias And Document

- Add canonical names to defaults and docs.
- Keep `starlight-*` and `q-*` aliases working.
- Document the new naming rules and component families.

### Phase 2: Migrate First-Party Examples

- Update all examples to use `nav-header` and `aside-nav`.
- Replace prefixed public classes in examples with normalized names.
- Collapse one-off tabs, dots, list items, and button variants into shared primitives.

### Phase 3: Deprecate Legacy Names

- Mark `starlight-*` and `q-*` public class names as deprecated.
- Keep aliases for one release cycle.
- Remove deprecated names only after examples and docs are fully migrated.

## Acceptance Criteria

- All first-party navigation examples use `nav-header` or `aside-nav`.
- No new public class introduced after this PRD uses `starlight-` or `q-`.
- All documented shared components map to the canonical inventory in this document.
- One-off classes like `.chat-tab`, `.category-tab`, `.legend-dot`, and `.action-btn` are either generalized or explicitly left template-local.
- Public shared components are added only when reuse is demonstrated across templates.
- Internal `--q-*` variables remain stable during this phase.

## Risks And Mitigations

| Risk | Mitigation |
| --- | --- |
| Breaking existing examples and downstream markup | Keep aliases for one release cycle |
| Collisions after removing `q-` from icon classes | Use `icon-*` rather than bare generic names |
| Too many card or badge variants recreate the same problem | Require new variants to map back to a canonical family |
| Semantic custom elements keep multiplying | Treat experimental tags as template-local until their structure is proven reusable |

## Recommended Next Work

1. Implement navigation aliasing so `starlight-nav` and `starlight-sidebar-nav` resolve to `nav-header` and `aside-nav`.
2. Audit all public `starlight-*` presets in [`src/defaults.js`](/Users/eric/sandbox/css/src/defaults.js) and define normalized replacements.
3. Introduce `media-item` and refactor `user-cell`, `attachment-card`, `activity-item`, and conversation rows around it.
4. Unify tabs, dots, and icon-action buttons under shared primitives.
5. Convert example templates so the canonical API is demonstrated consistently.

css-4ro, and css-xfi
