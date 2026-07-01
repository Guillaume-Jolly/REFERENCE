# Copier l'infra REFERENCE — playbook agent

**Usage :** 1 projet Cursor = 1 repo Git. Quand Guillaume dit *« copie l'infra REFERENCE »*, *« installe le modop »* ou *« mets à jour depuis REFERENCE »*, exécuter ce document **sans improviser**.

**Hub :** `C:\Dev\Project\REFERENCE`  
**Référence implémentée :** [`projects/idle-isekai-chill.md`](../../projects/idle-isekai-chill.md)

---

## Prompt utilisateur (copier-coller)

### Nouveau projet

```text
Projet : C:\Dev\Project\{NomApp}
Action : copie l'infra et le modop depuis REFERENCE (C:\Dev\Project\REFERENCE).
Adapte les variables (project.bootstrap.vars.json), exécute bootstrap + hooks:install,
vérifie que les hooks Cursor loggent le bon projectRoot, puis résume ce qui a été fait.
Ne supprime rien — archive/move uniquement si conflit de fichiers legacy.
```

### Projet existant (mise à jour infra)

```text
Projet : C:\Dev\Project\{NomApp}
Action : mets à jour l'infra depuis REFERENCE (upgrade, pas réinstall from scratch).
Garde le contenu métier (DEV_LOG, AGENTS personnalisé, src/). Resync scripts/hooks/règles.
Adapte version.config.json seulement si je le demande (--force-config).
Vérifie npm run hooks:install + un test hook. Résume le diff infra.
```

---

## Checklist agent (ordre strict)

| # | Étape | Commande / action |
|---|--------|-------------------|
| 0 | Lire | Ce fichier + [`versionnement-global.md`](./versionnement-global.md) + [`archive-only.md`](./archive-only.md) |
| 1 | Variables | Copier [`templates/project.bootstrap.vars.example.json`](../../templates/project.bootstrap.vars.example.json) → `{projet}/project.bootstrap.vars.json` et remplir |
| 2a | **Nouveau** | `node C:\Dev\Project\REFERENCE\scripts\bootstrap-project.mjs "{projet}" --vars "{projet}\project.bootstrap.vars.json"` |
| 2b | **Existant** | `node C:\Dev\Project\REFERENCE\scripts\upgrade-project-from-reference.mjs "{projet}" --vars "{projet}\project.bootstrap.vars.json"` |
| 3 | Git hooks | `cd "{projet}"` → `npm run hooks:install` |
| 4 | AGENTS | Si `AGENTS.md` existait : **fusionner** le snippet REFERENCE (ne pas écraser les règles métier) |
| 5 | DOC index | Mettre à jour `docs/DOC_AGENT_INDEX.md` (lien REFERENCE déjà dans le template) |
| 6 | Cursor | Rappeler : workspace **trusted**, redémarrage si hooks inactifs |
| 7 | User Rules | Une fois global : [`USER-RULES.md`](../../USER-RULES.md) → Cursor Settings |
| 8 | Valider | `npm run hooks:install` + `npm run dev:launcher` (dashboard versions) |
| 9 | Commit | 1 commit infra dédié — message type `chore: bootstrap infra REFERENCE` (si user demande commit) |

**Dry-run d'abord si doute :** ajouter `--dry-run` à bootstrap ou upgrade.

---

## Variables à adapter

Fichier : `project.bootstrap.vars.json` (racine du projet cible, gitignorable ou commité au choix).

| Clé | Exemple | Rôle |
|-----|---------|------|
| `projectPath` | `C:\Dev\Project\MonApp` | Chemin absolu — contrôle anti-mélange |
| `projectName` | `mon-app` | `package.json` → `name` |
| `projectLabel` | `Mon App` | Logs hooks, DEV_LOG, UI |
| `semver` | `2.2.0` | `package.json` → `version` (A.B.C de base) |
| `gitBranch` | `feature/2.2` | `project-state.md` (placeholder) |
| `devLogRelativePath` | `docs/.../DEV_LOG_2_2.md` | Journal X/Y — **unique par phase** |
| `gitignoreArchiveDirs` | `old_assets/`, `old_{A}_{B}/` (ex. `old_2_2/`), `archive/` | Zones move-only — fin de B |
| `validateScripts` | `npm run build`, `validate:*` | Documenter dans AGENTS.md |
| `referenceImplementationPath` | IDLE Isekai Chill | Pointeur doc |

Phase IDLE exemple :

```json
"devLogRelativePath": "docs/traceability/changelog/DEV_LOG_2_2.md",
"semver": "2.2.0",
"gitBranch": "feature/2.2",
"projectLabel": "Havre des Brumes"
```

---

## Nouveau vs existant

| | **Bootstrap** | **Upgrade** |
|---|---------------|-------------|
| Scripts / hooks / règles | Copie forcée | Copie forcée (infra) |
| `DEV_LOG`, `AGENTS.md` | Créés si absents | **Conservés** si déjà présents |
| `version.config.json` | Écrit | Conservé sauf `--force-config` |
| `build-revision.json` | Créé si absent | Conservé |

---

## Vérification (agent doit confirmer)

```powershell
cd "{projet}"
git rev-parse --show-toplevel          # = projectPath
git config --get core.hooksPath        # = .githooks
Test-Path .cursor/hooks.json           # True
Test-Path version.config.json          # True
npm run hooks:install
```

Puis dans Cursor (workspace = **ce** projet uniquement) :

1. Envoyer un message test
2. Hooks Output → `projectName`, `projectRoot`, `executionLogLabel`
3. `projectRoot` **doit** égaler `projectPath` du vars file

Optionnel :

```powershell
npm run version:mep -- --dry-run
```

---

## Maintenir REFERENCE (quand IDLE évolue)

Depuis REFERENCE :

```powershell
npm run sync:from-idle
# Re-vérifier templates génériques : version-config.mjs, dev-log-open-section.mjs, worktree-fingerprint.mjs
git commit -m "sync templates from IDLE"
```

Puis sur chaque projet consommateur : **upgrade** (pas bootstrap).

---

## Anti-patterns

- ❌ Ouvrir REFERENCE + projet actif dans le **même** workspace **sans** vérifier quel `projectRoot` les hooks loggent
- ❌ Bootstrap sur un repo déjà configuré (préférer **upgrade**)
- ❌ Écraser un `DEV_LOG_2_2.md` rempli de contenu
- ❌ Supprimer d'anciens hooks — **move** vers `old_{A}_{B}/` (ex. `old_2_2/cursor-hooks-legacy/`)
- ❌ Mélanger commit infra + feature gameplay dans le même commit

---

## Fichiers copiés (infra)

```text
scripts/                 bump-*, hooks-install, lib/, git-hooks/
.githooks/pre-push
.cursor/hooks.json + hooks/*.mjs
.cursor/rules/01-*.mdc, 02-*.mdc, 03-*.mdc
version.config.json
build-revision.json
docs/traceability/       DEV_LOG, VERSION-INDEX, project-state
docs/DOC_AGENT_INDEX.md
package.json             merge scripts version:*
.gitignore               + snippet archive
```

Détail install : [`install-nouveau-projet.md`](./install-nouveau-projet.md)
