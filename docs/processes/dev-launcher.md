# Dev Launcher — tests locaux

**Template :** [`templates/dev-launcher/`](../../templates/dev-launcher/)

Lanceur dev générique (dashboard + versions + logs), calqué sur IDLE Isekai et MTG Tracker.

---

## Install

```powershell
cd C:\Dev\Project\REFERENCE
node scripts/install-dev-launcher.mjs "C:\Dev\Project\MonApp"
```

Inclus aussi dans le **bootstrap** infra (`bootstrap-project.mjs`).

---

## Config `dev-launcher.config.json`

| Clé | Exemple IDLE | Exemple site web |
|-----|--------------|------------------|
| `dashboardPort` | 9221 | 9222 |
| `devPort` | 5173 | 3000 |
| `devScript` | `dev` | `dev` ou `start` |
| `projectLabel` | Havre des Brumes | Mon Site |

Variables env : `DEV_LAUNCHER_DASHBOARD_PORT`, `DEV_LAUNCHER_DEV_PORT`.

---

## Usage

```powershell
npm run dev:launcher
# ou Dev Launcher.bat (Windows)
```

Dashboard : `http://127.0.0.1:{dashboardPort}/`

---

## Versions affichées

1. **`public/build-info.json`** — live si servi par Vite, ou généré par `syncBuildInfoOnStart`
2. **`build-revision.json`** — X/Y (stack REFERENCE)
3. **Git** — branche, commit, dirty

Projets **sans** stack X/Y : semver `package.json` suffit.

---

## vs projet IDLE

IDLE a un lanceur dédié (`Havre Dev Launcher.bat`) — même architecture.  
Nouveaux projets : template REFERENCE.  
IDLE peut rester tel quel ou `upgrade` + fusion config plus tard.

---

## Référence

- IDLE : `scripts/dev-launcher/`, port dashboard 9221
- MTG : `launcher/dev_control_panel.py`, port app configurable
