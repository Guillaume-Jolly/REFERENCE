# Format rapport Codex / revue Cursor

Après une tâche Codex bornée, écrire :

- `.ai/codex-report.md`
- `.ai/cursor-review-instructions.md`

(Dossier `.ai/` souvent gitignoré — local agent.)

## Template codex-report.md

```md
# Codex Report

## Task
Summary of the requested task.

## Files changed
Exact list of changed files.

## What changed
Clear technical summary.

## Validation
Commands run and results.

## Remaining risks
Uncertainties and limits.

## Cursor review instructions
What Cursor should inspect next.
```

## Rôle Cursor

Cockpit intégration — inspecter diffs, jugement gameplay/UI, validation finale.

**Source :** IDLE Isekai `AGENTS.md` § Codex Report Format
