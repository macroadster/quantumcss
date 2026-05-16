# Agent Instructions

This project uses **bd** (beads) for issue tracking. Run `bd onboard` to get started.

## Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --status in_progress  # Claim work
bd close <id>         # Complete work
bd sync               # Sync with git
```

## Landing the Plane (Session Completion)

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   bd sync
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds


<!-- bv-agent-instructions-v1 -->

---

## Beads Workflow Integration

This project uses [beads_viewer](https://github.com/Dicklesworthstone/beads_viewer) for issue tracking. Issues are stored in `.beads/` and tracked in git.

### Essential Commands

```bash
# View issues (launches TUI - avoid in automated sessions)
bv

# CLI commands for agents (use these instead)
bd ready              # Show issues ready to work (no blockers)
bd list --status=open # All open issues
bd show <id>          # Full issue details with dependencies
bd create --title="..." --type=task --priority=2
bd update <id> --status=in_progress
bd close <id> --reason="Completed"
bd close <id1> <id2>  # Close multiple issues at once
bd sync               # Commit and push changes
```

### Workflow Pattern

1. **Start**: Run `bd ready` to find actionable work
2. **Claim**: Use `bd update <id> --status=in_progress`
3. **Work**: Implement the task
4. **Complete**: Use `bd close <id>`
5. **Sync**: Always run `bd sync` at session end

### Key Concepts

- **Dependencies**: Issues can block other issues. `bd ready` shows only unblocked work.
- **Priority**: P0=critical, P1=high, P2=medium, P3=low, P4=backlog (use numbers, not words)
- **Types**: task, bug, feature, epic, question, docs
- **Blocking**: `bd dep add <issue> <depends-on>` to add dependencies

### Session Protocol

**Before ending any session, run this checklist:**

```bash
git status              # Check what changed
git add <files>         # Stage code changes
bd sync                 # Commit beads changes
git commit -m "..."     # Commit code
bd sync                 # Commit any new beads changes
git push                # Push to remote
```

### Best Practices

- Check `bd ready` at session start to find available work
- Update status as you work (in_progress → closed)
- Create new issues with `bd create` when you discover tasks
- Use descriptive titles and set appropriate priority/type
- Always `bd sync` before ending session

<!-- end-bv-agent-instructions -->

---

## CSS Architecture: JIT vs Component CSS

This project has two CSS generation systems. They must **never define the same class**.

### Ownership Rules

| System | File | Owns | Properties |
|--------|------|------|------------|
| **JIT aliases** | `src/defaults.js` (string entries) | Layout & sizing | `display`, `flex-*`, `grid-*`, `position`, `width`, `height`, `padding`, `margin`, `overflow`, `gap` |
| **Component CSS** | `src/styles/quantum-components.css` | Decoration & theming | `background`, `border`, `color`, `box-shadow`, `backdrop-filter`, `border-radius`, `transition`, `animation` |

### Decision Rules

1. **If a class needs decoration** (backgrounds, borders, shadows, transitions, hover states, light-mode overrides) → define it **only in component CSS**. Do not add a JIT alias.
2. **If a class is purely structural** (flex/grid layout, sizing, spacing, overflow) → define it **only as a JIT alias** in `defaults.js`. Do not add a component CSS rule.
3. **Never define the same class in both systems.** JIT loads after component CSS in the build, so JIT silently wins cascade conflicts.
4. **JIT property/value objects** (non-string entries like `flex`, `hidden`, `truncate`) are for atomic utilities only, never for named components.

### Where Things Live

- **Layout presets** (`email-nav`, `layout-email-3col`, `music-footer`, etc.) → JIT aliases in `defaults.js`
- **Decorated components** (`search`, `search-input`, `nav-glass`, `nav-header`, `glass`, `gallery`, etc.) → Component CSS only
- **UI widget bases** (`starlight-table-*`, `starlight-chart-*`, `starlight-player-*`) → JIT aliases for base layout, component CSS for variants/states/children only (light mode, hover, th/td styling)

### Build Pipeline

```
quantum-base.css → quantum-icons.css → quantum-components.css → quantum-animations.css → JIT utilities
```

JIT output is appended **last**, so it wins all cascade ties. This is why conflicts are dangerous.

### Example HTML

All example files should load **only** `dist/quantum.min.css` (which includes everything). Never load source CSS files (`src/styles/*.css`) alongside the built output — that double-applies rules and creates cascade bugs.

---

## Making a Release

```bash
# 1. Update version in package.json (semver: patch, minor, major)
vim package.json  # Update "version" field

# 2. Run release script (bumps version, builds, tags)
npm run release

# 3. Check git log for changes since last release
git log --oneline -20

# 4. Verify portfolio.html release history was updated by release script
#    The release script auto-adds entry; verify description is accurate.
#    If description is generic (e.g. "New features and improvements"),
#    edit examples/portfolio.html to add specific changes from git log.

# 5. Commit the portfolio.html update
git add examples/portfolio.html && git commit -m "docs: update release history"

# 6. Push tags and commits
git push && git push --tags
```

<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:ca08a54f -->
## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

## Session Completion

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   bd dolt push
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
<!-- END BEADS INTEGRATION -->
