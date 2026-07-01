# Archive only — aucune suppression définitive

**Règle absolue pour tous les projets.**

## Principe

| Qui | Action |
|-----|--------|
| **Agent / scripts** | **Déplacer** uniquement → dossier **gitignoré** |
| **Guillaume** | Purge manuelle des gitignorés, ou sauvegarde sur **autre disque (DD)** |

**Jamais** de suppression définitive par l’agent.

## Interdit (agent)

- `Remove-Item`, `rm -rf`, `git clean`, vider un dossier d’archive
- Outil `Delete` sur assets / archives
- Retirer du disque des fichiers « obsolètes », doublons, reliquats
- `git rm` sans accord explicite **fichier par fichier**

## Autorisé : move vers gitignore

1. Choisir une destination **listée dans `.gitignore`** du projet, ex. :
   - `old_assets/`, `old_v2.1/`, `archive/YYYY-MM-DD-<motif>/`
   - `Input chatgpt/`, `.tmp/`, `deploy/` (selon projet)
2. **Fichiers git** : `git mv` → zone gitignorée (fichier **conservé sur disque**)
3. **Fichiers non versionnés** : `mv` / `Move-Item` → zone gitignorée
4. Documenter les lots dans un **manifeste cleanup** ([cleanup-manifest-pattern.md](./cleanup-manifest-pattern.md))

Si la destination n’existe pas encore : la créer **et** l’ajouter au `.gitignore` avant le move.

## « Nettoyer »

= trier, gitignore, documenter, **déplacer** — **pas** supprimer, **pas** vider les archives.

Les dossiers gitignorés peuvent grossir : c’est voulu ; **purge = manuelle user** (local ou autre DD).

## Code

Commenter le mort plutôt que retirer (source).

## Template règle Cursor

Copier : [`templates/cursor/rules/01-no-deletion-archive-only.mdc`](../../templates/cursor/rules/01-no-deletion-archive-only.mdc)

## Par projet

Définir dans `AGENTS.md` ou `docs/agent-guide/` la liste des **zones gitignorées** autorisées pour les moves.

Exemple implémentée : `C:\Dev\Project\IDLE Isekai Chill` — `old_assets/`, `old_v2.1/`, `archive/`.
