# MTG Tracker — profil projet REFERENCE

**Chemin :** `C:\Dev\Project\MTG TRACKER`  
**Produit :** MTG Price Tracker (PWA collection + Cardmarket)

## Stack

| Composant | Emplacement |
|-----------|-------------|
| Backend | Python 3.11 — `run_mvp.py`, `mtg_pwa/` |
| Frontend | PWA vanilla — `mtg_pwa/static/` |
| Infra version | REFERENCE A.B.C.X.Y |
| Dev | `npm run dev:launcher` (dashboard 9222, Brave) |

## CI (`ciProfile`)

```json
"ciProfile": "node-python",
"validateScripts": [
  "npm run build",
  "python -m unittest discover -s tests -q"
]
```

Pas de `package-lock.json` — **ne pas** utiliser `node-vite` / `npm ci`.

Régénérer le workflow :

```bash
node C:\Dev\Project\REFERENCE\scripts\upgrade-project-from-reference.mjs "C:\Dev\Project\MTG TRACKER" --vars project.bootstrap.vars.json --force-ci
```

## Spécifique MTG (hors template générique)

| Domaine | Détail |
|---------|--------|
| Scripts métier | `scripts/*.py`, `scripts/prod_launcher/` |
| Cardmarket | `mtg_pwa/cardmarket_*.py` |
| Archives | `old_0_1/`, `old_assets/` |
| Tests | `tests/` — unittest ; `test_shared_catalog` nécessite DB attachée sans index cross-schema |

## Bootstrap / upgrade

```json
{
  "projectPath": "C:\\Dev\\Project\\MTG TRACKER",
  "projectName": "mtg-tracker",
  "projectLabel": "MTG Tracker",
  "ciProfile": "node-python",
  "devLogRelativePath": "docs/traceability/changelog/DEV_LOG_1_1.md"
}
```
