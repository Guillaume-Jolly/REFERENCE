#!/usr/bin/env node
/**
 * Installe le dev launcher générique REFERENCE sur un projet.
 * Usage: node scripts/install-dev-launcher.mjs "C:\Dev\Project\MonApp" [--vars dev-launcher.vars.json]
 */
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const refRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const templateDir = join(refRoot, 'templates', 'dev-launcher')
const target = process.argv[2]

if (!target) {
  console.error('Usage: node scripts/install-dev-launcher.mjs <chemin-projet> [--vars vars.json]')
  process.exit(1)
}

let varsPath = null
for (let i = 3; i < process.argv.length; i += 1) {
  if (process.argv[i] === '--vars' && process.argv[i + 1]) {
    varsPath = process.argv[i + 1]
    i += 1
  }
}

const targetRoot = target.replace(/\\/g, '/').replace(/\/$/, '')
const destDir = join(targetRoot, 'scripts', 'dev-launcher')

function copyIfMissing(src, dest) {
  if (existsSync(dest)) return false
  mkdirSync(dirname(dest), { recursive: true })
  cpSync(src, dest)
  return true
}

function loadVars() {
  const folder = basename(targetRoot)
  const defaults = {
    projectLabel: folder,
    dashboardPort: 9221,
    devPort: 5173,
    devScript: 'dev',
    accentColor: '#7eb8ff',
  }
  if (!varsPath || !existsSync(varsPath)) return defaults
  try {
    return { ...defaults, ...JSON.parse(readFileSync(varsPath, 'utf8')) }
  } catch {
    return defaults
  }
}

if (!existsSync(join(targetRoot, 'package.json'))) {
  console.error(`[dev-launcher] package.json introuvable : ${targetRoot}`)
  process.exit(1)
}

console.log(`[dev-launcher] Install → ${targetRoot}`)

mkdirSync(destDir, { recursive: true })
cpSync(templateDir, destDir, { recursive: true, force: true })

const vars = loadVars()
const exampleConfig = JSON.parse(
  readFileSync(join(templateDir, 'dev-launcher.config.example.json'), 'utf8'),
)
const configPath = join(targetRoot, 'dev-launcher.config.json')
if (!existsSync(configPath)) {
  writeFileSync(configPath, `${JSON.stringify({ ...exampleConfig, ...vars }, null, 2)}\n`)
  console.log('[dev-launcher] Créé dev-launcher.config.json')
} else {
  console.log('[dev-launcher] dev-launcher.config.json existant — conservé')
}

const pkgPath = join(targetRoot, 'package.json')
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
pkg.scripts = {
  ...pkg.scripts,
  'dev:launcher': 'node scripts/dev-launcher/server.mjs',
}
writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)

const batDest = join(targetRoot, 'Dev Launcher.bat')
if (!existsSync(batDest)) {
  cpSync(join(templateDir, 'Dev Launcher.bat'), batDest)
  console.log('[dev-launcher] Créé Dev Launcher.bat')
}

const gitignorePath = join(targetRoot, '.gitignore')
const sessionIgnore = 'scripts/dev-launcher/.dev-session/'
if (existsSync(gitignorePath)) {
  const current = readFileSync(gitignorePath, 'utf8')
  if (!current.includes('.dev-session')) {
    writeFileSync(gitignorePath, `${current.trimEnd()}\n\n# Dev launcher session\n${sessionIgnore}\n`)
  }
} else {
  writeFileSync(gitignorePath, `# Dev launcher session\n${sessionIgnore}\n`)
}

console.log('[dev-launcher] Terminé.')
console.log('  npm run dev:launcher')
console.log(`  Dashboard : http://127.0.0.1:${vars.dashboardPort}/`)
console.log(`  Doc : ${join(refRoot, 'docs', 'processes', 'dev-launcher.md')}`)
