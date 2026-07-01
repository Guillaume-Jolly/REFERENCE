# Templates REFERENCE — core vs spécifique

**Updated:** 2026-07-01

## Core (bootstrap — tous projets Cursor/Git)

Copiés par `bootstrap-project.mjs` / `upgrade-project-from-reference.mjs` :

| Dossier | Contenu |
|---------|---------|
| `scripts/` | Versionnement A.B.C.X.Y, hooks git, libs génériques |
| `githooks/` | `pre-push` → bump B/C |
| `cursor/hooks/` + `hooks.json` | Hooks Cursor X/Y |
| `cursor/rules/` | Archive, version prompt, release ABC |
| `traceability/` | DEV_LOG, VERSION-INDEX, project-state (stubs) |
| `version.config.json` | Variables projet (chemins DEV_LOG, label, archives) |
| `build-revision.json` | Compteurs X/Y |
| `package.scripts.json` | Scripts npm version:* |
| `gitignore.snippet` | Archives + agent local |

**Aucune dépendance** BDD, assets jeu, validate métier.

## Spécifique projet (hors templates)

Documenter dans [`projects/{nom}.md`](../projects/) — **ne pas** mettre dans `templates/` :

| Exemple IDLE | Où |
|--------------|-----|
| `validate:companion-bonds`, `validate:link-corpus` | `projects/idle-isekai-chill.md` |
| `DEV_LOG_2_2.md` (nom phase) | `version.config.json` du projet |
| Assets, staging, deploy | AGENTS.md projet |

## Resync depuis implémentation

```powershell
npm run sync:from-idle
```

Copie **infra générique** IDLE → `templates/`. Puis vérifier que `version-config.mjs` / `dev-log-open-section.mjs` restent génériques (pas de chemins phase en dur).
