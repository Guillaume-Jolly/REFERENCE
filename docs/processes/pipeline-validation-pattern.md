# Pattern pipeline validation

Adapter les scripts au projet (`package.json`).

## Release gate type

```bash
npm run build
# npm run validate:*   # domaine-spécifique
# npm run tnr:baseline # si baseline assets / corpus
```

## Principes

| Principe | Détail |
|----------|--------|
| **Build** | Minimum avant « terminé » |
| **Validate** | Scripts read-only qui échouent si incohérence data |
| **Lint** | Optionnel si dette connue — ne pas fix massif sans demande |
| **CI** | Reproduire validate + build sur PR / push `main` |

## Quand lancer quoi

| Changement | Validate typique |
|------------|------------------|
| Data / corpus | `validate:*` domaine |
| Assets manifest | `tnr:baseline` ou inventory script |
| UI / minigames | build + smoke manuel |

## CI garde-fou (cible)

- PR feature : cohérence label UI / semver **C**
- Merge main : **B** bumpé
- Tag MEP : **A** dans VERSION-INDEX

**Référence :** IDLE Isekai `docs/agent-guide/06-pipeline-validation.md`
