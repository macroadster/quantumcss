# Project Instructions for AI Agents

This file provides instructions and context for AI coding agents working on this project.

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


## Build & Test

```bash
npm install
npm run build          # static layers → dist/quantum.min.css
npm run build:dev      # unminified build
npm run test:unit      # static ownership + theme tests
npm run emit:utils     # maintainer: refresh atomic utility catalog
npm run theme          # emit theme-overlay.css from quantum.config.json
```

## Architecture Overview

**Static-first CSS library** (no content-scan JIT in product build):

```
quantum-base.css → quantum-icons.css → quantum-components.css
  → quantum-animations.css → quantum-utilities.css
  → dist/quantum.min.css
```

| Layer | Owns |
|-------|------|
| base | `--q-*` tokens, element defaults |
| components | Named UI (full class definitions) |
| utilities | Finite atomics only |
| theme CLI | Optional CSS variable overlays |

See **AGENTS.md** (maintainers) and **SKILL.md** (AI consumers).

## Conventions & Patterns

1. Bare HTML first → component classes → utilities last.
2. Never define the same class in both components and utilities (`component-owned-classes.json`).
3. Theme via `--q-*` and `html[data-theme="light|dark"]` only.
4. Examples load only `dist/quantum.min.css`.
5. Use `bd` for issue tracking (see beads section above).
