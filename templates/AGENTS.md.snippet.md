# AGENTS.md — snippet nouveau projet

Copier en tête du `AGENTS.md` du repo cible et compléter.

---

# {Project Name} — Agent Rules

## Prime directive

Stable, reviewable, save-compatible. Diffs petits.

## Before editing

1. This file
2. `C:\Dev\Project\REFERENCE\docs\INDEX.md` — processus partagés
3. `docs/DOC_AGENT_INDEX.md` — docs actives du projet
4. `docs/traceability/project-state.md`
5. `git status --short`
6. `npm run hooks:install` si clone neuf

## Hard rules

- **Never delete** — move to **gitignored** paths only ([archive-only](../REFERENCE/docs/processes/archive-only.md))
- One writer agent per working tree
- No push `main` / MEP without explicit user go
- MEP (A): agent proposes, user validates — `version:mep --dry-run` first
- Version X/Y: hooks Cursor or `version:prompt` / `version:task`

## Validation

```bash
npm run build
# project-specific validate:* scripts
```

## Reference implementation

`C:\Dev\Project\IDLE Isekai Chill`
