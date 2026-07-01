#!/usr/bin/env node
/**
 * Resync templates depuis un projet source (défaut: IDLE Isekai Chill).
 * Usage: node scripts/sync-templates-from.mjs [chemin-source]
 */
import { cpSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const refRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const templates = join(refRoot, 'templates')
const source =
  process.argv[2] ?? 'C:\\Dev\\Project\\IDLE Isekai Chill'

const pairs = [
  ['scripts/bump-prompt.mjs', 'scripts/bump-prompt.mjs'],
  ['scripts/bump-task.mjs', 'scripts/bump-task.mjs'],
  ['scripts/bump-branch-push.mjs', 'scripts/bump-branch-push.mjs'],
  ['scripts/bump-main-push.mjs', 'scripts/bump-main-push.mjs'],
  ['scripts/bump-mep.mjs', 'scripts/bump-mep.mjs'],
  ['scripts/hooks-install.mjs', 'scripts/hooks-install.mjs'],
  ['scripts/git-hooks/on-pre-push.mjs', 'scripts/git-hooks/on-pre-push.mjs'],
  ['scripts/lib/worktree-fingerprint.mjs', 'scripts/lib/worktree-fingerprint.mjs'],
  ['scripts/lib/version-hook-log.mjs', 'scripts/lib/version-hook-log.mjs'],
  ['scripts/lib/version-hook-output.mjs', 'scripts/lib/version-hook-output.mjs'],
  ['scripts/lib/release-version.mjs', 'scripts/lib/release-version.mjs'],
  ['scripts/lib/release-bump-log.mjs', 'scripts/lib/release-bump-log.mjs'],
  ['.cursor/hooks.json', 'cursor/hooks.json'],
  ['.githooks/pre-push', 'githooks/pre-push'],
  ['.cursor/rules/01-no-deletion-archive-only.mdc', 'cursor/rules/01-no-deletion-archive-only.mdc'],
  ['.cursor/rules/02-version-prompt-first.mdc', 'cursor/rules/02-version-prompt-first.mdc'],
  ['.cursor/rules/03-version-release-ABC.mdc', 'cursor/rules/03-version-release-ABC.mdc'],
]

for (const [from, to] of pairs) {
  const srcPath = join(source, from)
  const destPath = join(templates, to)
  if (!existsSync(srcPath)) {
    console.warn(`[sync] skip (missing): ${srcPath}`)
    continue
  }
  cpSync(srcPath, destPath, { force: true })
  console.log(`[sync] ${from} → templates/${to}`)
}

// Hooks with spaces in name
for (const name of [
  'A.B.C.X.Y - X update - prompt indent.mjs',
  'A.B.C.X.Y - Y update - subprompt indent.mjs',
]) {
  const srcPath = join(source, '.cursor', 'hooks', name)
  const destPath = join(templates, 'cursor', 'hooks', name)
  if (existsSync(srcPath)) {
    cpSync(srcPath, destPath, { force: true })
    console.log(`[sync] .cursor/hooks/${name}`)
  }
}

console.log('[sync] Pense à vérifier version-config.mjs / dev-log-open-section (génériques REFERENCE).')
