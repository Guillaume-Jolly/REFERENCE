# Install — 2 méthodes

## A. Automatique (recommandé)

```powershell
cd C:\Dev\Project\REFERENCE
node scripts/bootstrap-project.mjs "C:\Dev\Project\MonApp"
cd C:\Dev\Project\MonApp
npm run hooks:install
```

Le bootstrap copie scripts, hooks, règles, traceability, merge `package.json` scripts, snippet `.gitignore`.

## B. Manuel

Copier depuis `C:\Dev\Project\REFERENCE\templates\` — voir sections ci-dessous.

---

## Fichiers de base

```text
package.json           ← fusionner templates/package.scripts.json
build-revision.json    ← templates/build-revision.json
version.config.json    ← templates/version.config.json
```

### version.config.json

```json
{
  "projectLabel": "Mon App",
  "devLogRelativePath": "docs/traceability/changelog/DEV_LOG.md",
  "versionIndexRelativePath": "docs/traceability/changelog/VERSION-INDEX.md",
  "releaseEventsRelativePath": "docs/traceability/changelog/release-events.jsonl",
  "gitignoreArchiveDirs": ["old_assets/", "old_v2.1/", "archive/"]
}
```

---

## Arborescence copiée (bootstrap)

```text
scripts/              ← bump-*, hooks-install, lib/, git-hooks/
.githooks/pre-push
.cursor/hooks.json + hooks/*.mjs
.cursor/rules/01-*.mdc, 02-*.mdc, 03-*.mdc
docs/traceability/    ← DEV_LOG, VERSION-INDEX, project-state
docs/DOC_AGENT_INDEX.md
```

---

## Après install

| # | Action |
|---|--------|
| 1 | `npm run hooks:install` |
| 2 | Éditer `version.config.json` |
| 3 | `AGENTS.md` — snippet ou personnaliser |
| 4 | User Rules ← `REFERENCE/USER-RULES.md` |
| 5 | Redémarrer Cursor |
| 6 | Test : message → Hooks Output → `executionLogLabel` |
| 7 | Test dry-run : `npm run version:mep -- --dry-run` |

---

## Zones gitignore archive

Snippet : `templates/gitignore.snippet` — **move only**, purge manuelle user.

---

## Référence complète

IDLE Isekai Chill : [`projects/idle-isekai-chill.md`](../../projects/idle-isekai-chill.md)
