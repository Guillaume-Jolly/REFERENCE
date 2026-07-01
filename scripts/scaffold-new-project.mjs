#!/usr/bin/env node
/**
 * Scaffold complet : dossier + git init + bootstrap REFERENCE + hooks + commit initial optionnel.
 *
 * Usage:
 *   node scripts/scaffold-new-project.mjs "C:\Dev\Project\MonApp" --vars vars.json
 *   node scripts/scaffold-new-project.mjs "C:\Dev\Project\MonApp" --vars vars.json --commit
 */
import { execSync, spawnSync } from 'node:child_process'
import { existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  installReferenceInfra,
  loadVars,
  printPostInstallSteps,
} from './lib/bootstrap-lib.mjs'

const refRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
let targetRoot = null
let varsPath = null
let doCommit = false

for (let i = 0; i < args.length; i += 1) {
  if (args[i] === '--vars' && args[i + 1]) {
    varsPath = args[i + 1]
    i += 1
  } else if (args[i] === '--commit') {
    doCommit = true
  } else if (!args[i].startsWith('-')) {
    targetRoot = args[i].replace(/\\/g, '/').replace(/\/$/, '')
  }
}

if (!targetRoot) {
  console.error(
    'Usage: node scripts/scaffold-new-project.mjs <chemin> [--vars project.bootstrap.vars.json] [--commit]',
  )
  process.exit(1)
}

if (!existsSync(targetRoot)) {
  mkdirSync(targetRoot, { recursive: true })
  console.log(`[scaffold] Dossier créé : ${targetRoot}`)
}

const vars = loadVars(varsPath, targetRoot)
vars.projectPath = targetRoot

const isGit = existsSync(join(targetRoot, '.git'))
if (!isGit) {
  console.log('[scaffold] git init')
  execSync('git init', { cwd: targetRoot, stdio: 'inherit' })
}

installReferenceInfra({
  refRoot,
  targetRoot,
  mode: 'bootstrap',
  dryRun: false,
  forceConfig: false,
  vars,
})

console.log('[scaffold] npm run hooks:install')
spawnSync('npm', ['run', 'hooks:install'], { cwd: targetRoot, stdio: 'inherit', shell: true })

console.log('[scaffold] npm run validate:stack')
const validate = spawnSync('npm', ['run', 'validate:stack'], { cwd: targetRoot, stdio: 'inherit', shell: true })
if (validate.status !== 0) {
  console.warn('[scaffold] validate:stack a échoué — compléter le projet puis relancer')
}

if (doCommit) {
  execSync('git add -A', { cwd: targetRoot, stdio: 'inherit' })
  const msg = 'chore: bootstrap infra REFERENCE (hooks, version, launcher, CI)'
  execSync(`git commit -m "${msg}"`, { cwd: targetRoot, stdio: 'inherit' })
  console.log('[scaffold] Commit initial créé')
}

printPostInstallSteps(targetRoot, refRoot, 'scaffold')
