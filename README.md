# REFERENCE — processus & templates agents (multi-projets)

Dépôt **central** : docs, templates et scripts pour initialiser n'importe quel projet Cursor/agent.

**Chemin :** `C:\Dev\Project\REFERENCE`

---

## Démarrage rapide (nouveau projet)

```powershell
cd C:\Dev\Project\REFERENCE
node scripts/bootstrap-project.mjs "C:\Dev\Project\MonApp"
cd C:\Dev\Project\MonApp
npm run hooks:install
```

Puis :

1. Éditer `version.config.json` (`projectLabel`, chemins DEV_LOG)
2. Copier [`USER-RULES.md`](./USER-RULES.md) → Cursor Settings → User Rules
3. Redémarrer Cursor (workspace **trusted**)

Détail : [`docs/processes/install-nouveau-projet.md`](./docs/processes/install-nouveau-projet.md)

---

## Contenu

| Dossier | Rôle |
|---------|------|
| [`docs/`](./docs/INDEX.md) | 11 processus (versionnement, MEP, archive, kickoff…) |
| [`templates/`](./templates/) | Hooks, scripts npm, règles `.mdc`, traceability |
| [`scripts/`](./scripts/) | `bootstrap-project.mjs`, `sync-templates-from.mjs` |
| [`projects/`](./projects/) | Implémentations de référence (IDLE Isekai Chill) |
| [`USER-RULES.md`](./USER-RULES.md) | Bloc global Cursor |

---

## Règle archive (tous projets)

**Jamais supprimer** — **move uniquement** vers dossiers **gitignorés** ; purge = Guillaume (manuel ou autre DD).

→ [`docs/processes/archive-only.md`](./docs/processes/archive-only.md)

---

## Versionnement A.B.C.X.Y

| Couche | Segments | Mécanisme |
|--------|----------|-----------|
| Release | A · B · C | git `pre-push` + scripts npm |
| Dev session | X · Y | hooks Cursor |

→ [`docs/processes/versionnement-global.md`](./docs/processes/versionnement-global.md)

---

## Maintenir REFERENCE

Quand **IDLE Isekai Chill** (ou autre ref) évolue :

```powershell
npm run sync:from-idle
# Vérifier templates/scripts/lib/version-config.mjs (générique REFERENCE)
git commit -m "sync templates from IDLE"
```

---

## Multi-root Cursor

Ouvrir **REFERENCE + projet actif** dans la même fenêtre pour que les agents lisent les docs sans copier.

Lien dans `AGENTS.md` du projet :

```markdown
Processus : C:\Dev\Project\REFERENCE\docs\INDEX.md
```
