# Secrets & variables d'environnement

**Updated:** 2026-07-01

## Règle

| Fichier | Git | Contenu |
|---------|-----|---------|
| `.env.example` | ✅ versionné | Noms de variables, pas de secrets |
| `.env` | ❌ gitignoré | Valeurs locales |

Template : [`templates/env.example`](../templates/env.example)  
Règle Cursor : [`templates/cursor/rules/04-secrets-env.mdc`](../templates/cursor/rules/04-secrets-env.mdc)

## Bootstrap

Le bootstrap copie `env.example` → `.env.example` et ajoute `.env` au `.gitignore`.

## Agent

- Jamais committer `.env` ou clés en dur
- Nouvelle variable → MAJ `.env.example` + doc projet
