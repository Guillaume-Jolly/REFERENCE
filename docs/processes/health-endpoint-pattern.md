# Health endpoint — pattern multi-stack

**Updated:** 2026-07-01

Permet au **dev launcher** et aux outils de monitoring de détecter si le serveur répond.

Complète : [`dev-launcher.md`](./dev-launcher.md)

---

## Contrat minimal

`GET /api/health` → JSON `200` :

```json
{
  "status": "ok",
  "app_version": "v1.0.0.03",
  "semver": "1.0.0",
  "revision": 3,
  "projectLabel": "Mon App"
}
```

Champs optionnels : `features`, `api_version`, `projectSlug`.

---

## Python (référence MTG Tracker)

```python
if method == "GET" and path == "/api/health":
    self.json_response({
        "status": "ok",
        "app_version": app_version_label(),
        **version_identity(),
    })
```

Fichier : `MTG TRACKER/mtg_pwa/server.py`

---

## Node / Express (snippet)

```js
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    app_version: readVersionLabel(),
    semver: pkg.version,
  })
})
```

---

## Vite / front statique

Pas de `/api/health` natif — utiliser :

- `GET /build-info.json` (plugin [`templates/vite/sync-build-info.mjs`](../templates/vite/sync-build-info.mjs))
- ou probe URL racine `/` dans le dev launcher

---

## Dev launcher

- **Vite** : probe `gameUrl` + fetch `/build-info.json`
- **API Python** : ajouter probe `GET /api/health` (évolution future template)

---

## CI

Health check post-deploy optionnel :

```yaml
- run: curl -sf http://127.0.0.1:8000/api/health
```
