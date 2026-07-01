# Kickoff nouvelle phase

Générique — adapter `{N}` à la phase cible (ex. `2.3`).

## Quand proposer (agent)

Dès le **1er message** si :

- Branche `feature/{N}` absente
- Semver pas bumpé pour la phase
- `build-revision.json` non reset (X très élevé post-release)
- Pas de `DEV_LOG_{phase}.md` actif
- Brief handoff « kickoff prévu »

**Formulation :** proposer checklist → si user confirme, exécuter sans redemander.

## Checklist

| # | Action |
|---|--------|
| 1 | Sync `main` |
| 2 | `git checkout -b feature/{N}` |
| 3 | `package.json` → `{N}.0.0` |
| 4 | `build-revision.json` → `{ revision: 1, subRevision: 0 }` |
| 5 | Créer `DEV_LOG_{phase}.md` avec section `⚠️ Sections ouvertes` |
| 6 | Vérifier `.cursor/hooks.json` + `npm run hooks:install` |
| 7 | `.ai/current-state.md`, `project-state.md`, brief handoff |
| 8 | Premier prompt travail → X bump (hook ou `version:prompt`) |
| 9 | `npm run build` (ou validate projet) |
| 10 | Commit kickoff **si user demande** |

## Ce qu’un kickoff n’est pas

- Pas une feature produit
- Pas un nettoyage massif (faire sur `main` en amont)
- Pas un fix lint global

## Après kickoff

- X/Y automatiques (hooks)
- DEV_LOG obligatoire
- Merge `main` → rituel **B** ([versionnement-global.md](./versionnement-global.md))

**Référence détaillée :** IDLE Isekai `docs/agent-guide/07-kickoff-nouvelle-version.md`
