#!/usr/bin/env node
/**
 * Resync infra REFERENCE sur un projet existant (sans écraser DEV_LOG / AGENTS métier).
 * Usage:
 *   node scripts/upgrade-project-from-reference.mjs "C:\Dev\Project\MonApp"
 *   node scripts/upgrade-project-from-reference.mjs "C:\Dev\Project\MonApp" --vars vars.json
 *   node scripts/upgrade-project-from-reference.mjs "C:\Dev\Project\MonApp" --force-config
 */
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  installReferenceInfra,
  loadVars,
  parseBootstrapArgs,
  printPostInstallSteps,
} from './lib/bootstrap-lib.mjs'

const refRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const { targetRoot, varsPath, dryRun, forceConfig } = parseBootstrapArgs(process.argv)

if (!targetRoot) {
  console.error(
    'Usage: node scripts/upgrade-project-from-reference.mjs <chemin-projet> [--vars vars.json] [--force-config] [--dry-run]',
  )
  process.exit(1)
}

if (!existsSync(targetRoot)) {
  console.error(`[upgrade] Cible introuvable: ${targetRoot}`)
  process.exit(1)
}

const vars = loadVars(varsPath, targetRoot)
vars.projectPath = targetRoot

console.log(`[upgrade] Cible: ${targetRoot}`)
if (dryRun) console.log('[upgrade] Mode dry-run — aucune écriture')
if (forceConfig) console.log('[upgrade] --force-config : version.config.json sera réécrit')

installReferenceInfra({
  refRoot,
  targetRoot,
  mode: 'upgrade',
  dryRun,
  forceConfig,
  vars,
})

printPostInstallSteps(targetRoot, refRoot, 'upgrade')
