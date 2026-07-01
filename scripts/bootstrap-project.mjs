#!/usr/bin/env node
/**
 * Bootstrap infra REFERENCE sur un projet (nouveau ou vide).
 * Usage:
 *   node scripts/bootstrap-project.mjs "C:\Dev\Project\MonApp"
 *   node scripts/bootstrap-project.mjs "C:\Dev\Project\MonApp" --vars vars.json
 *   node scripts/bootstrap-project.mjs "C:\Dev\Project\MonApp" --dry-run
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
const { targetRoot, varsPath, dryRun } = parseBootstrapArgs(process.argv)

if (!targetRoot) {
  console.error('Usage: node scripts/bootstrap-project.mjs <chemin-projet> [--vars vars.json] [--dry-run]')
  process.exit(1)
}

if (!existsSync(targetRoot)) {
  console.error(`[bootstrap] Cible introuvable: ${targetRoot}`)
  process.exit(1)
}

const vars = loadVars(varsPath, targetRoot)
vars.projectPath = targetRoot

console.log(`[bootstrap] Cible: ${targetRoot}`)
if (dryRun) console.log('[bootstrap] Mode dry-run — aucune écriture')

installReferenceInfra({
  refRoot,
  targetRoot,
  mode: 'bootstrap',
  dryRun,
  forceConfig: false,
  vars,
})

printPostInstallSteps(targetRoot, refRoot, 'bootstrap')
