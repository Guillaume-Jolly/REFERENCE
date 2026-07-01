# DEV_LOG et commits atomiques

## DEV_LOG

Fichier phase : `docs/traceability/changelog/DEV_LOG_{phase}.md` (configurable via `version.config.json`).

| Section | Rôle |
|---------|------|
| `## ⚠️ Sections ouvertes` | Injectée par `version:prompt` (X) — **à compléter en fin de prompt** |
| `## Historique complété` | Sections X finalisées |

Chaque section X :

- Titre, date, **but du prompt**
- Tableau **Y** : résumé, hash commit, label UI
- Validations + risques

## Commits atomiques

| DEV_LOG | Git |
|---------|-----|
| 1 ligne **Y** sans hash | `git add` ciblé → commit (message = résumé Y) |
| Section **X** complète | Commit récap possible (message = but du prompt) |

Relire DEV_LOG **avant** une série de commits.

## Message commit

```
<type>(<scope>): <intérêt en une phrase>

Pourquoi : …
Validations : build OK, …
Version UI : v{A}.{B}.{C}.{X}.{Y}
```

Types : `feat`, `fix`, `chore`, `docs`, `refactor`.

**Référence :** IDLE Isekai `docs/agent-guide/05-politique-versionnement.md`, `04-fichiers-par-commit.md`
