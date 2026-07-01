# Pattern index documentation

Éviter que les agents suivent des docs obsolètes.

## Fichiers type

| Fichier | Rôle |
|---------|------|
| `docs/DOC_AGENT_INDEX.md` | **Quoi lire / ignorer** — priorité 1 en onboarding |
| `docs/traceability/project-state.md` | État projet **versionné** (source de vérité) |
| `docs/traceability/REFERENCES.md` | Chemins croisés — MAJ si déplacement doc |
| `AGENTS.md` | Règles dures racine |
| `docs/HANDOFF_*_BRIEF.md` | Brief phase en cours |

## Règles agent

1. Lire **DOC_AGENT_INDEX** avant d'explorer `docs/` au hasard
2. Si chemin doc change → grep ancien path + MAJ `REFERENCES.md`
3. Docs archivées → pointer vers `old_*` gitignoré, pas maintenir les stale

## Stubs locaux (optionnel)

| Fichier | Git | Rôle |
|---------|-----|------|
| `.ai/current-state.md` | gitignoré | Initiative en cours |
| `.ai/next-task.md` | gitignoré | Tâche suivante |

Priorité : `project-state.md` versionné.

## Lien REFERENCE

Processus partagés : `C:\Dev\Project\REFERENCE\docs\INDEX.md`
