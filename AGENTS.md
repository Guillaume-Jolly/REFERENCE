# REFERENCE — règles agents (multi-projets)

Ce dépôt **ne contient pas de code produit**. Il documente des **processus** et fournit des **templates**.

## Prime directive

Avant tout travail sur **un autre repo**, lire :

1. Ce fichier
2. [`docs/INDEX.md`](./docs/INDEX.md)
3. Le `AGENTS.md` **du projet cible**
4. [`docs/processes/versionnement-global.md`](./docs/processes/versionnement-global.md)

## Règles dures (tous projets)

- **Jamais supprimer** — **move uniquement** vers dossiers **gitignorés** ; purge manuelle user (local ou autre DD) ([`archive-only.md`](./docs/processes/archive-only.md))
- **Un seul writer agent** par working tree (pas Cursor + Codex en parallèle)
- **Push `main` / MEP** : go explicite du décideur (Guillaume)
- **MEP (A)** : agent propose, humain valide — jamais `version:mep` sans accord
- Diffs petits, reviewables ; pas de mélange feature/refactor/bugfix

## Bootstrap / upgrade projet

**Playbook agent (prompt utilisateur + checklist) :** [`docs/processes/copier-infra-reference.md`](./docs/processes/copier-infra-reference.md)

```bash
# Nouveau
node scripts/bootstrap-project.mjs "C:\Dev\Project\{MonApp}" --vars "...\project.bootstrap.vars.json"

# Existant — resync infra sans écraser DEV_LOG / AGENTS métier
node scripts/upgrade-project-from-reference.mjs "C:\Dev\Project\{MonApp}" --vars "...\project.bootstrap.vars.json"
```

Manuel : [`install-nouveau-projet.md`](./docs/processes/install-nouveau-projet.md).

## User Rules Cursor

Copier [`USER-RULES.md`](./USER-RULES.md) → Cursor Settings → User Rules.
