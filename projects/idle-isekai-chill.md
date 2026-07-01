# IDLE Isekai Chill — référence implémentation

**Chemin :** `C:\Dev\Project\IDLE Isekai Chill`  
**Produit :** Havre des Brumes (idle / collection)

## Stack actif

| Composant | Emplacement |
|-----------|-------------|
| Hooks Cursor X/Y | `.cursor/hooks/` |
| Git hooks B/C | `.githooks/` + `npm run hooks:install` |
| Scripts version | `scripts/bump-*.mjs` |
| Config modop | `version.config.json` |
| DEV_LOG phase | `docs/traceability/changelog/DEV_LOG_2_2.md` |
| Règles agent | `.cursor/rules/01-*.mdc`, `02-*`, `03-*` |
| Doc versionnement | `docs/agent-guide/08-versionnement-global.md` |

## Spécifique IDLE (hors template générique REFERENCE)

| Domaine | Détail |
|---------|--------|
| **Validate** | `validate:companion-bonds`, `validate:link-corpus`, `tnr:baseline` |
| **Assets / BDD** | `assets/`, companions, Myrions, link corpus — voir `AGENTS.md` |
| **Archives** | `old_assets/`, `old_v2.1/`, `old_2_2/` (hooks legacy phase 2.2) |
| **Deploy** | `deploy/` gitignoré — PROD locale |

## CI GitHub (projet IDLE)

Profil recommandé dans `project.bootstrap.vars.json` :

```json
"ciProfile": "node-vite",
"validateScripts": ["npm run build", "npm run validate:companion-bonds", "npm run validate:link-corpus"]
```

Étapes spécifiques IDLE (hors template générique) — via `validateScripts` ou `ciExtraSteps` :

```json
"ciExtraSteps": ["npm run validate:companion-bonds", "npm run validate:link-corpus"]
```

Ne pas hardcoder ces scripts dans le template CI générique — voir fiche projet.


## Bootstrap autre projet

```bash
cd C:\Dev\Project\REFERENCE
node scripts/bootstrap-project.mjs "C:\Dev\Project\MonNouveauProjet" --vars "...\project.bootstrap.vars.json"
```
