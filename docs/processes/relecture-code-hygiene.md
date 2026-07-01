# Relecture code — éviter l'accumulation

**Updated:** 2026-07-01

Complète [`agent-session-workflow.md`](./agent-session-workflow.md) et [`cleanup-manifest-pattern.md`](./cleanup-manifest-pattern.md).  
**Pas encore automatisé** — rituels agent + humain.

---

## Problème visé

- Sous-fonctions dupliquées (« sous sous sous code »)
- Helpers utilisés une seule fois
- Branches mortes / flags jamais retirés
- Tâches agent répétitives non variabilisées (chemins en dur, copier-coller de prompts)

---

## Quand déclencher

| Moment | Action |
|--------|--------|
| **Fin de B (clôture phase)** | Checklist [`fin-de-B-cleanup.md`](./fin-de-B-cleanup.md) + mini audit modules touchés |
| **Après gros lot (feature)** | 1 passe « simplifier / fusionner / extraire config » |
| **Manifeste cleanup** | Chaque move `old_{A}_{B}/` → noter *pourquoi* obsolète |
| **Tâche récurrente 3+ fois** | Variabiliser (`version.config.json`, script npm, template REFERENCE) |

---

## Checklist agent (30–45 min max)

1. **Doublons** — grep noms de fonctions / patterns similaires dans le module modifié
2. **Indirection inutile** — wrapper d'une ligne → inline si call site unique
3. **Config** — chemins / labels en dur → `version.config.json` ou constante module
4. **Dead code** — commenter + move gitignore si fichier entier obsolète ([`archive-only.md`](./archive-only.md))
5. **Docs** — une source de vérité (REFERENCE processus, pas 3 copies divergentes)
6. **Validation** — `npm run build` + scripts `validate:*` du projet

**Interdit sans demande :** refactor massif, rename exports publics, fix lint global.

---

## Variabiliser les tâches récurrentes

| Si… | Alors… |
|-----|--------|
| Même prompt agent 3+ fois | Doc process REFERENCE + vars `project.bootstrap.vars.json` |
| Même chemin doc en dur | `version.config.json` |
| Même script one-off | `scripts/` nommé + entrée `package.json` |
| Spécifique à un jeu (IDLE) | `REFERENCE/projects/{projet}.md` — **pas** le template générique |

---

## Lien archive `old_{A}_{B}/`

À chaque **fin de phase B** (ex. clôture 2.2 → kickoff 2.3) :

1. Move reliquats infra → `old_{A}_{B}/` du B **quitté** (ex. `old_2_2/cursor-hooks-legacy/`)
2. Entrée manifeste cleanup
3. Passe relecture ci-dessus sur dossiers actifs

→ Détail : [`fin-de-B-cleanup.md`](./fin-de-B-cleanup.md)

---

## Référence IDLE

Phase 2.2 : hooks legacy Cursor → `old_2_2/cursor-hooks-legacy/` (2026-07).
