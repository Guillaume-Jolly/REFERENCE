# Fin de B — nettoyage de phase

**Updated:** 2026-07-01

Déclenché à la **clôture d'une phase semver** (incrément **B** : ex. fin `2.2` → kickoff `2.3`), **avant** ou **pendant** le kickoff phase suivante.

Complète : [`archive-only.md`](./archive-only.md), [`relecture-code-hygiene.md`](./relecture-code-hygiene.md), [`cleanup-manifest-pattern.md`](./cleanup-manifest-pattern.md).

---

## Convention `old_{A}_{B}/`

| Variable | Signification | Exemple |
|----------|---------------|---------|
| **A** | Major semver (MEP) | `2` |
| **B** | Minor semver (phase / branche longue) | `2` |
| **Dossier** | `old_{A}_{B}/` | `old_2_2/`, puis `old_2_3/` |

**Règle :** une phase = un seul dossier d'archive phase. Ne pas empiler plusieurs B dans le même `old_*`.

Configurer dans :
- `.gitignore` — pattern recommandé : `old_[0-9]*_[0-9]*/` ou entrée explicite `old_2_2/`
- `version.config.json` → `gitignoreArchiveDirs`

---

## Checklist agent — fin de B

| # | Action |
|---|--------|
| 1 | **DEV_LOG** phase clôturée — sections ⚠️ → Historique |
| 2 | **Move reliquats** → `old_{A}_{B}/` (hooks, scripts, docs wip, stubs obsolètes) — **jamais supprimer** |
| 3 | **Manifeste** — entrée dans `docs/CLEANUP_*_MANIFEST.md` ou équivalent |
| 4 | **Relecture hygiene** — 30–45 min : doublons, chemins en dur, tâches récurrentes → variabiliser ([`relecture-code-hygiene.md`](./relecture-code-hygiene.md)) |
| 5 | **Gitignore** — ajouter `old_{A}_{B}/` si nouvelle phase (ex. créer `old_2_3/` au kickoff 2.3) |
| 6 | **Kickoff** — branche, DEV_LOG nouvelle phase, reset X/Y ([`kickoff-nouvelle-phase.md`](./kickoff-nouvelle-phase.md)) |
| 7 | **Validation** — `npm run build` + `validate:*` du projet |

---

## Quand l'exécuter

| Moment | Fin de B ? |
|--------|------------|
| Push branche (C) | Non — sauf move ponctuel legacy |
| Merge / push `main` (B+1) | **Oui** — proposer cleanup + archive phase **avant** kickoff suivant |
| MEP (A) | Oui + checklist MEP |
| Kickoff nouvelle phase | **Oui** — créer le nouveau `old_{A}_{B}/` pour la phase **qu'on quitte** |

---

## Sous-dossiers typiques dans `old_{A}_{B}/`

```text
old_2_2/
  cursor-hooks-legacy/     # anciens hooks remplacés
  scripts-legacy/          # scripts bump / one-off remplacés
  docs-wip/                # brouillons doc phase
```

---

## Référence IDLE

Phase 2.2 (2026-07) : hooks Cursor legacy → `old_2_2/cursor-hooks-legacy/` (4 fichiers).
