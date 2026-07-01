#!/usr/bin/env node
/**
 * Bootstrap versionnement + hooks sur un projet existant.
 * Usage: node scripts/bootstrap-project.mjs "C:\Dev\Project\MonApp"
 */
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const refRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const templates = join(refRoot, 'templates')
const target = process.argv[2]

if (!target) {
  console.error('Usage: node scripts/bootstrap-project.mjs <chemin-projet>')
  process.exit(1)
}

const targetRoot = target.replace(/\\/g, '/').endsWith('/')
  ? target.slice(0, -1)
  : target

function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true })
  cpSync(src, dest, { recursive: true, force: true })
}

function mergePackageScripts() {
  const pkgPath = join(targetRoot, 'package.json')
  if (!existsSync(pkgPath)) {
    writeFileSync(
      pkgPath,
      `${JSON.stringify({ name: 'my-project', private: true, version: '1.0.0', type: 'module', scripts: {} }, null, 2)}\n`,
    )
  }
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
  const extra = JSON.parse(readFileSync(join(templates, 'package.scripts.json'), 'utf8'))
  pkg.scripts = { ...extra, ...pkg.scripts }
  if (!pkg.type) pkg.type = 'module'
  writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)
}

function copyIfMissing(src, dest) {
  if (existsSync(dest)) return false
  mkdirSync(dirname(dest), { recursive: true })
  cpSync(src, dest)
  return true
}

console.log(`[bootstrap] Cible: ${targetRoot}`)

copyDir(join(templates, 'scripts'), join(targetRoot, 'scripts'))
copyDir(join(templates, 'githooks'), join(targetRoot, '.githooks'))
copyDir(join(templates, 'cursor', 'hooks'), join(targetRoot, '.cursor', 'hooks'))
mkdirSync(join(targetRoot, '.cursor', 'rules'), { recursive: true })
for (const rule of ['01-no-deletion-archive-only.mdc', '02-version-prompt-first.mdc', '03-version-release-ABC.mdc']) {
  cpSync(join(templates, 'cursor', 'rules', rule), join(targetRoot, '.cursor', 'rules', rule), { force: true })
}
cpSync(join(templates, 'cursor', 'hooks.json'), join(targetRoot, '.cursor', 'hooks.json'), { force: true })

mkdirSync(join(targetRoot, 'docs', 'traceability', 'changelog'), { recursive: true })
copyIfMissing(join(templates, 'traceability', 'changelog', 'DEV_LOG.md'), join(targetRoot, 'docs', 'traceability', 'changelog', 'DEV_LOG.md'))
copyIfMissing(join(templates, 'traceability', 'changelog', 'VERSION-INDEX.md'), join(targetRoot, 'docs', 'traceability', 'changelog', 'VERSION-INDEX.md'))
copyIfMissing(join(templates, 'traceability', 'project-state.md'), join(targetRoot, 'docs', 'traceability', 'project-state.md'))
copyIfMissing(join(templates, 'DOC_AGENT_INDEX.md'), join(targetRoot, 'docs', 'DOC_AGENT_INDEX.md'))

copyIfMissing(join(templates, 'build-revision.json'), join(targetRoot, 'build-revision.json'))
copyIfMissing(join(templates, 'version.config.json'), join(targetRoot, 'version.config.json'))

mergePackageScripts()

const gitignorePath = join(targetRoot, '.gitignore')
const snippet = readFileSync(join(templates, 'gitignore.snippet'), 'utf8')
if (existsSync(gitignorePath)) {
  const current = readFileSync(gitignorePath, 'utf8')
  if (!current.includes('old_assets/')) {
    writeFileSync(gitignorePath, `${current.trimEnd()}\n\n${snippet}\n`)
  }
} else {
  writeFileSync(gitignorePath, `${snippet}\n`)
}

const agentsPath = join(targetRoot, 'AGENTS.md')
if (!existsSync(agentsPath)) {
  cpSync(join(templates, 'AGENTS.md.snippet.md'), agentsPath)
}

console.log('[bootstrap] Terminé. Étapes suivantes dans le projet cible:')
console.log('  1. npm run hooks:install')
console.log('  2. Éditer version.config.json (projectLabel, devLogRelativePath)')
console.log('  3. Redémarrer Cursor — workspace trusted')
console.log('  4. Copier USER-RULES depuis REFERENCE → Cursor Settings')
console.log(`  5. Doc: ${join(refRoot, 'docs', 'processes', 'install-nouveau-projet.md')}`)
