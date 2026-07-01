# Templates REFERENCE — core vs spécifique

**Updated:** 2026-07-01

## Core (bootstrap — tous projets Cursor/Git)

Copiés par `bootstrap-project.mjs` / `upgrade-project-from-reference.mjs` / `scaffold-new-project.mjs` :

| Dossier / fichier | Contenu |
|-------------------|---------|
| `scripts/` | Versionnement, `validate-stack.mjs`, `pre-commit.mjs`, `lint-staged.mjs` |
| `githooks/` | `pre-push` (B/C), `pre-commit` (stack + lint staged) |
| `cursor/hooks/` + `hooks.json` | Hooks Cursor X/Y |
| `cursor/rules/` | 01 archive, 02 X/Y, 03 ABC, **04 secrets** |
| `dev-launcher/` | Lanceur dev + dashboard |
| `vite/` | Plugin `sync-build-info.mjs` (optionnel front) |
| `github/` | CI workflow **généré** (`ci-workflow.mjs`) + PR template |
| `env.example` | Variables sans secrets |
| `traceability/` | DEV_LOG, VERSION-INDEX, project-state |
| `version.config.json` | Chemins DEV_LOG, archives |
| `package.scripts.json` | `validate:stack`, `dev:launcher`, version:* |

## Spécifique projet (hors templates)

Documenter dans [`projects/{nom}.md`](../projects/) :

| Exemple IDLE | Où |
|--------------|-----|
| `validate:companion-bonds`, `validate:link-corpus` | `projects/idle-isekai-chill.md` + `ciProfile` / `ciExtraSteps` |
| Assets, staging, deploy | AGENTS.md projet |

## Scripts REFERENCE

| Script | Rôle |
|--------|------|
| `scaffold-new-project.mjs` | git init + bootstrap + hooks + `--commit` |
| `validate:stack` (dans projet cible) | Smoke test infra |

## Profils CI (`ciProfile`)

Générés dans `.github/workflows/ci.yml` — voir `scripts/lib/ci-workflow.mjs` :

| Profil | Usage |
|--------|--------|
| `node-scripts` | Pas de deps npm (défaut safe) |
| `node-vite` | Lockfile + `npm ci` |
| `node-python` | Infra Node + unittest |

`--force-ci` sur upgrade pour régénérer.
