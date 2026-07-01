# Pattern cleanup manifest

« Nettoyer » = **move vers gitignore** + **documenter** — jamais supprimer.

Voir [archive-only.md](./archive-only.md).

## Workflow

1. Identifier reliquats (docs WIP, scripts one-shot, staging terminé)
2. **`git mv`** (versionné) ou **`mv`** (non versionné) → dossier **gitignoré**
   - Ex. `old_v2.1/`, `old_assets/`, `archive/YYYY-MM-DD-<motif>/`
3. Écrire / MAJ un **manifeste** : `docs/CLEANUP_*_MANIFEST.md`

## Contenu manifeste

| Colonne | Exemple |
|---------|---------|
| Date / passe | 2026-07-01 passe 1 |
| Source | `docs/wip/foo.md` |
| Destination | `old_v2.1/docs_wip/foo.md` |
| Motif | Phase 2.1 terminée |

## Interdit

- `rm`, `Remove-Item`, vider `old_*`
- Committer le contenu des dossiers gitignorés lourds
- Purge disque — **humain uniquement** (local ou autre DD)

## Scripts retirés de package.json

Lister dans le manifeste les scripts npm désactivés + destination archive.

**Référence :** IDLE Isekai `docs/CLEANUP_2_2_RESIDUAL_MANIFEST.md`
