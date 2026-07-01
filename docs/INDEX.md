# Index REFERENCE — docs multi-projets

**Updated:** 2026-07-01

| Priorité | Document | Contenu |
|----------|----------|---------|
| 1 | [copier-infra-reference.md](./processes/copier-infra-reference.md) | **Playbook agent** — « copie infra REFERENCE », vars, bootstrap / upgrade |
| 2 | [fin-de-B-cleanup.md](./processes/fin-de-B-cleanup.md) | **Fin de B** — `old_{A}_{B}/`, manifeste, kickoff phase suivante |
| 3 | [relecture-code-hygiene.md](./processes/relecture-code-hygiene.md) | Anti-accumulation code, variabiliser tâches récurrentes |
| 4 | [versionnement-global.md](./processes/versionnement-global.md) | **A.B.C.X.Y** — machine à états, rituels A/B/C, X/Y |
| 5 | [archive-only.md](./processes/archive-only.md) | Jamais supprimer — move vers gitignore ; purge manuelle user |
| 6 | [install-nouveau-projet.md](./processes/install-nouveau-projet.md) | Détail fichiers copiés + tests post-install |
| 7 | [dev-launcher.md](./processes/dev-launcher.md) | Lanceur dev localhost, port variable, dashboard versions |
| 8 | [kickoff-nouvelle-phase.md](./processes/kickoff-nouvelle-phase.md) | Démarrage phase / branche feature |
| 9 | [agent-session-workflow.md](./processes/agent-session-workflow.md) | Session agent, validation, communication |
| 10 | [dev-log-et-commits.md](./processes/dev-log-et-commits.md) | DEV_LOG, commits atomiques (1 Y ≈ 1 commit) |
| 11 | [doc-index-pattern.md](./processes/doc-index-pattern.md) | DOC_AGENT_INDEX, REFERENCES, project-state |
| 12 | [mep-checklist.md](./processes/mep-checklist.md) | Procédure MEP (A) — agent + humain |
| 13 | [pipeline-validation-pattern.md](./processes/pipeline-validation-pattern.md) | Release gate, validate:*, CI |
| 14 | [cleanup-manifest-pattern.md](./processes/cleanup-manifest-pattern.md) | Nettoyage = git mv + manifeste |
| 15 | [codex-report-format.md](./processes/codex-report-format.md) | Rapport Codex / revue Cursor |

## Templates & scripts

| Chemin | Contenu |
|--------|---------|
| [`../templates/README.md`](../templates/README.md) | **Core** (tous projets) vs **spécifique** (fiches `projects/`) |
| [`../templates/dev-launcher/`](../templates/dev-launcher/) | Lanceur dev localhost + dashboard versions |
| [`../scripts/bootstrap-project.mjs`](../scripts/bootstrap-project.mjs) | Install auto sur un repo |
| [`../scripts/install-dev-launcher.mjs`](../scripts/install-dev-launcher.mjs) | Install lanceur dev seul |
| [`../scripts/upgrade-project-from-reference.mjs`](../scripts/upgrade-project-from-reference.mjs) | Resync infra projet existant |
| [`../scripts/sync-templates-from.mjs`](../scripts/sync-templates-from.mjs) | Resync templates depuis projet ref |
| [`../USER-RULES.md`](../USER-RULES.md) | User Rules Cursor |

## Référence implémentée

| Projet | Chemin |
|--------|--------|
| IDLE Isekai Chill | `C:\Dev\Project\IDLE Isekai Chill` |
