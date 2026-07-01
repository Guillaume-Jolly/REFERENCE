# Workflow session agent

Générique — adapter validate:* au projet.

## Début de session

1. Lire `AGENTS.md` du projet + [`REFERENCE/docs/INDEX.md`](../../INDEX.md)
2. `git status --short`
3. `.ai/current-state.md` ou `docs/traceability/project-state.md`
4. Nouvelle phase ? → [kickoff-nouvelle-phase.md](./kickoff-nouvelle-phase.md)
5. X bump auto (hook Cursor) — backup `npm run version:prompt`

## Pendant

- Diff minimal, une intention par changement
- **Move gitignore only** — [archive-only.md](./archive-only.md)
- Tâche distincte → Y (`version:task` ou hook `stop`)
- DEV_LOG : ligne Y par lot

## Fin de tâche / lot

```bash
npm run build    # minimum
# + validate:* selon domaine touché
```

## Fin de prompt

- Compléter section DEV_LOG `⚠️ À COMPLÉTER`
- Commits atomiques si user demande (1 Y ≈ 1 commit)

## Communication

- Français sauf demande contraire
- Pas de push `main` / MEP sans go explicite
- Signaler régressions, conflits docs, 404 assets

## Un writer

Un seul agent writer par working tree (pas Cursor + Codex en parallèle).
