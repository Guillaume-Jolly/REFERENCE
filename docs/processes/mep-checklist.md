# Checklist MEP (segment A)

**A = mise en PROD** — jamais 100 % auto.

## Comportement agent

1. **Proposer** : « Procédure MEP complète (A) ? » + cette checklist
2. **Interdit** : `npm run version:mep` sans accord explicite
3. `npm run version:mep -- --dry-run` → montrer semver → attendre **go**
4. Si go → `npm run version:mep` → enchaîner doc / tag / rappel deploy

**B ≠ MEP** — push `main` seul = bump **B** only.

## Checklist

| # | Action | Qui |
|---|--------|-----|
| 1 | `version:mep --dry-run` puis `version:mep` | Agent après go |
| 2 | `VERSION-INDEX.md` — entrée jalon A | Agent |
| 3 | DEV_LOG + `project-state.md` — clôture phase | Agent |
| 4 | Release gate (`build`, `validate:*`, TNR si applicable) | Agent |
| 5 | Tag git (convention projet) | Agent si demandé |
| 6 | Deploy appli prod | **Humain** |
| 7 | Smoke UI si écrans/assets | Agent ou humain |
| 8 | `release-events.jsonl` | Auto au bump |

## Après MEP

- Kickoff phase suivante si nouvelle phase → [kickoff-nouvelle-phase.md](./kickoff-nouvelle-phase.md)
