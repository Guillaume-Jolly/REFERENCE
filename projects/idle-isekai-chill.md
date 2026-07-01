# IDLE Isekai Chill — référence implémentation

**Chemin :** `C:\Dev\Project\IDLE Isekai Chill`  
**Produit :** Havre des Brumes (idle / collection)

## Stack actif

| Composant | Emplacement |
|-----------|-------------|
| Hooks Cursor X/Y | `.cursor/hooks/` |
| Git hooks B/C | `.githooks/` + `npm run hooks:install` |
| Scripts version | `scripts/bump-*.mjs` |
| DEV_LOG phase | `docs/traceability/changelog/DEV_LOG_2_2.md` |
| Règles agent | `.cursor/rules/01-*.mdc`, `02-*`, `03-*` |
| Doc versionnement | `docs/agent-guide/08-versionnement-global.md` |

## Particularités vs template générique

- `version.config.json` pas encore branché — chemins DEV_LOG en dur (`DEV_LOG_2_2.md`)
- Validate : `validate:companion-bonds`, `validate:link-corpus`, `tnr:baseline`
- Archives : `old_assets/`, `old_v2.1/` (gitignorés)

## Bootstrap another project from here

```bash
cd C:\Dev\Project\REFERENCE
node scripts/bootstrap-project.mjs "C:\Dev\Project\MonNouveauProjet"
```
