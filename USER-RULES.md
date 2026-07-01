# User Rules — Cursor (global, tous projets)

Copier ce bloc dans **Cursor → Settings → Rules → User Rules**.

---

```markdown
# Règles transverses — tous projets

Processus détaillés : C:\Dev\Project\REFERENCE\docs\INDEX.md
Copie infra projet : C:\Dev\Project\REFERENCE\docs\processes\copier-infra-reference.md

## Aucune suppression définitive

- Agent / scripts : **jamais** supprimer un fichier du disque (`rm`, `Remove-Item`, `Delete` tool, `git clean`, vider un dossier).
- Seule action pour « retirer » : **déplacer** (`git mv` ou `mv`) vers un dossier **gitignoré** (`.gitignore`).
- Exemples : `old_assets/`, `old_v2.1/`, **`old_{A}_{B}/`** (ex. `old_2_2/`, `old_2_3/`), `archive/YYYY-MM-DD-<motif>/`.
- Fin de phase B : checklist `fin-de-B-cleanup.md` dans REFERENCE.
- **Purge** des gitignorés : uniquement Guillaume — manuellement sur le PC ou copie vers **autre disque (DD)**.
- « Nettoyer » = trier, documenter, move gitignore — pas supprimer.

## Secrets

- Jamais committer `.env`, clés API, tokens — seulement `.env.example` (noms sans valeurs).
- REFERENCE : `docs/processes/secrets-et-env.md`

## Versionnement A.B.C.X.Y

Format UI : v{A}.{B}.{C}.{X}.{Y}

- A = MEP prod (manuel, agent propose + dry-run, humain valide)
- B = push main (git hook auto ; go explicite avant push main)
- C = push branche (git hook auto)
- X/Y = hooks Cursor (prompt / tâche) — opt-out : même X / même Y

Install : npm run hooks:install (par clone)
Smoke test : npm run validate:stack

## Dev local

- `npm run dev:launcher` après bootstrap REFERENCE
- Process : REFERENCE/docs/processes/dev-launcher.md

## Agent

- Un seul writer agent par working tree
- Push main / MEP : go explicite du décideur
- Diffs petits ; pas de mélange feature/refactor/bugfix sans accord
- Nouveau projet : `scaffold-new-project.mjs` ou bootstrap REFERENCE — pas réinventer
```
