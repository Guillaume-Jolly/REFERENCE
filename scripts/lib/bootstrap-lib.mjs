/**
 * Logique partagée bootstrap / upgrade infra REFERENCE → projet cible.
 */
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'

export function parseBootstrapArgs(argv) {
  const positional = []
  let varsPath = null
  let dryRun = false
  let forceConfig = false

  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === '--dry-run') dryRun = true
    else if (arg === '--force-config') forceConfig = true
    else if (arg === '--vars' && argv[i + 1]) {
      varsPath = argv[i + 1]
      i += 1
    } else if (!arg.startsWith('-')) positional.push(arg)
  }

  return {
    targetRoot: positional[0]?.replace(/\\/g, '/').replace(/\/$/, '') ?? null,
    varsPath,
    dryRun,
    forceConfig,
  }
}

export function loadVars(varsPath, targetRoot) {
  const today = new Date().toISOString().slice(0, 10)
  const folder = basename(targetRoot)
  const defaults = {
    projectPath: targetRoot,
    projectName: folder.toLowerCase().replace(/\s+/g, '-'),
    projectLabel: folder,
    semver: '1.0.0',
    gitBranch: 'main',
    devLogRelativePath: 'docs/traceability/changelog/DEV_LOG.md',
    versionIndexRelativePath: 'docs/traceability/changelog/VERSION-INDEX.md',
    releaseEventsRelativePath: 'docs/traceability/changelog/release-events.jsonl',
    gitignoreArchiveDirs: ['old_assets/', 'old_v2.1/', 'archive/'],
    referenceImplementationPath: 'C:\\Dev\\Project\\IDLE Isekai Chill',
    validateScripts: ['npm run build'],
  }

  if (!varsPath || !existsSync(varsPath)) return defaults

  try {
    return { ...defaults, ...JSON.parse(readFileSync(varsPath, 'utf8')) }
  } catch (error) {
    console.warn(`[bootstrap] vars illisibles (${varsPath}): ${error.message}`)
    return defaults
  }
}

export function substitutePlaceholders(content, vars) {
  const today = new Date().toISOString().slice(0, 10)
  return content
    .replaceAll('{Project Name}', vars.projectLabel)
    .replaceAll('{projectName}', vars.projectName)
    .replaceAll('{projectLabel}', vars.projectLabel)
    .replaceAll('{projectPath}', vars.projectPath)
    .replaceAll('{semver}', vars.semver)
    .replaceAll('{gitBranch}', vars.gitBranch)
    .replaceAll('{referenceImplementationPath}', vars.referenceImplementationPath)
    .replaceAll('YYYY-MM-DD', today)
}

function logAction(dryRun, message) {
  console.log(dryRun ? `[dry-run] ${message}` : message)
}

function copyDir(src, dest, dryRun) {
  logAction(dryRun, `[copy] ${src} → ${dest}`)
  if (dryRun) return
  mkdirSync(dest, { recursive: true })
  cpSync(src, dest, { recursive: true, force: true })
}

function copyIfMissing(src, dest, dryRun) {
  if (existsSync(dest)) return false
  logAction(dryRun, `[copy-if-missing] ${src} → ${dest}`)
  if (dryRun) return true
  mkdirSync(dirname(dest), { recursive: true })
  cpSync(src, dest)
  return true
}

function forceCopy(src, dest, dryRun) {
  logAction(dryRun, `[force] ${src} → ${dest}`)
  if (dryRun) return
  mkdirSync(dirname(dest), { recursive: true })
  cpSync(src, dest, { force: true })
}

export function mergePackageScripts(targetRoot, templates, dryRun) {
  const pkgPath = join(targetRoot, 'package.json')
  let pkg
  if (!existsSync(pkgPath)) {
    pkg = { name: 'my-project', private: true, version: '1.0.0', type: 'module', scripts: {} }
  } else {
    pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
  }
  const extra = JSON.parse(readFileSync(join(templates, 'package.scripts.json'), 'utf8'))
  pkg.scripts = { ...extra, ...pkg.scripts }
  if (!pkg.type) pkg.type = 'module'
  logAction(dryRun, `[merge] package.json scripts`)
  if (!dryRun) writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)
  return pkg
}

export function mergeGitignore(targetRoot, templates, dryRun) {
  const gitignorePath = join(targetRoot, '.gitignore')
  const snippet = readFileSync(join(templates, 'gitignore.snippet'), 'utf8')
  if (existsSync(gitignorePath)) {
    const current = readFileSync(gitignorePath, 'utf8')
    if (!current.includes('old_assets/')) {
      logAction(dryRun, `[merge] .gitignore + archive snippet`)
      if (!dryRun) writeFileSync(gitignorePath, `${current.trimEnd()}\n\n${snippet}\n`)
    }
  } else {
    logAction(dryRun, `[create] .gitignore`)
    if (!dryRun) writeFileSync(gitignorePath, `${snippet}\n`)
  }
}

export function writeVersionConfig(targetRoot, vars, { dryRun, forceConfig, mode }) {
  const dest = join(targetRoot, 'version.config.json')
  if (existsSync(dest) && mode === 'upgrade' && !forceConfig) {
    logAction(dryRun, `[skip] version.config.json (existe — --force-config pour écraser)`)
    return
  }

  const payload = {
    projectLabel: vars.projectLabel,
    devLogRelativePath: vars.devLogRelativePath,
    versionIndexRelativePath: vars.versionIndexRelativePath,
    releaseEventsRelativePath: vars.releaseEventsRelativePath,
    gitignoreArchiveDirs: vars.gitignoreArchiveDirs,
  }
  logAction(dryRun, `[write] version.config.json`)
  if (!dryRun) writeFileSync(dest, `${JSON.stringify(payload, null, 2)}\n`)
}

export function applyProjectVars(targetRoot, templates, vars, dryRun) {
  const pkgPath = join(targetRoot, 'package.json')
  if (existsSync(pkgPath)) {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
    if (vars.projectName) pkg.name = vars.projectName
    if (vars.semver) pkg.version = vars.semver
    logAction(dryRun, `[vars] package.json name=${vars.projectName} version=${vars.semver}`)
    if (!dryRun) writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)
  }

  const templatedFiles = [
    [join(templates, 'DOC_AGENT_INDEX.md'), join(targetRoot, 'docs', 'DOC_AGENT_INDEX.md')],
    [join(templates, 'traceability', 'project-state.md'), join(targetRoot, 'docs', 'traceability', 'project-state.md')],
    [join(templates, 'AGENTS.md.snippet.md'), join(targetRoot, 'AGENTS.md')],
  ]

  for (const [src, dest] of templatedFiles) {
    if (!existsSync(src)) continue
    const raw = readFileSync(src, 'utf8')
    const next = substitutePlaceholders(raw, vars)
    if (existsSync(dest)) {
      logAction(dryRun, `[vars-skip-existing] ${dest}`)
      continue
    }
    logAction(dryRun, `[vars-write] ${dest}`)
    if (!dryRun) {
      mkdirSync(dirname(dest), { recursive: true })
      writeFileSync(dest, next)
    }
  }
}

/**
 * @param {'bootstrap'|'upgrade'} mode
 * bootstrap = nouvel install ; upgrade = resync infra sur projet existant
 */
export function installReferenceInfra({
  refRoot,
  targetRoot,
  mode,
  dryRun,
  forceConfig,
  vars,
}) {
  const templates = join(refRoot, 'templates')
  const actions = []

  const infraCopies = [
    [join(templates, 'scripts'), join(targetRoot, 'scripts'), 'always'],
    [join(templates, 'githooks'), join(targetRoot, '.githooks'), 'always'],
    [join(templates, 'cursor', 'hooks'), join(targetRoot, '.cursor', 'hooks'), 'always'],
  ]

  for (const [src, dest, policy] of infraCopies) {
    if (policy === 'always') copyDir(src, dest, dryRun)
    actions.push(`infra: ${basename(src)}`)
  }

  mkdirSync(join(targetRoot, '.cursor', 'rules'), { recursive: true })
  for (const rule of ['01-no-deletion-archive-only.mdc', '02-version-prompt-first.mdc', '03-version-release-ABC.mdc']) {
    forceCopy(join(templates, 'cursor', 'rules', rule), join(targetRoot, '.cursor', 'rules', rule), dryRun)
  }
  forceCopy(join(templates, 'cursor', 'hooks.json'), join(targetRoot, '.cursor', 'hooks.json'), dryRun)

  mkdirSync(join(targetRoot, 'docs', 'traceability', 'changelog'), { recursive: true })

  const docCopies = [
    [join(templates, 'traceability', 'changelog', 'DEV_LOG.md'), join(targetRoot, vars.devLogRelativePath)],
    [join(templates, 'traceability', 'changelog', 'VERSION-INDEX.md'), join(targetRoot, vars.versionIndexRelativePath)],
    [join(templates, 'traceability', 'project-state.md'), join(targetRoot, 'docs', 'traceability', 'project-state.md')],
    [join(templates, 'DOC_AGENT_INDEX.md'), join(targetRoot, 'docs', 'DOC_AGENT_INDEX.md')],
    [join(templates, 'build-revision.json'), join(targetRoot, 'build-revision.json')],
  ]

  for (const [src, dest] of docCopies) {
    const isRevision = dest.endsWith('build-revision.json')
    if (mode === 'upgrade' && existsSync(dest) && !isRevision) {
      logAction(dryRun, `[skip-existing] ${dest}`)
      continue
    }
    copyIfMissing(src, dest, dryRun)
  }

  mergePackageScripts(targetRoot, templates, dryRun)
  mergeGitignore(targetRoot, templates, dryRun)
  installDevLauncher(refRoot, targetRoot, vars, dryRun)
  writeVersionConfig(targetRoot, vars, { dryRun, forceConfig, mode: mode === 'bootstrap' ? 'bootstrap' : 'upgrade' })
  applyProjectVars(targetRoot, templates, vars, dryRun)

  return actions
}

function installDevLauncher(refRoot, targetRoot, vars, dryRun) {
  const src = join(refRoot, 'templates', 'dev-launcher')
  const dest = join(targetRoot, 'scripts', 'dev-launcher')
  logAction(dryRun, `[copy] dev-launcher → scripts/dev-launcher`)
  if (!dryRun) {
    mkdirSync(dest, { recursive: true })
    cpSync(src, dest, { recursive: true, force: true })
  }

  const configPath = join(targetRoot, 'dev-launcher.config.json')
  if (!existsSync(configPath)) {
    const example = readFileSync(join(src, 'dev-launcher.config.example.json'), 'utf8')
    const base = JSON.parse(example)
    const payload = {
      ...base,
      projectLabel: vars.projectLabel ?? base.projectLabel,
    }
    logAction(dryRun, `[write] dev-launcher.config.json`)
    if (!dryRun) writeFileSync(configPath, `${JSON.stringify(payload, null, 2)}\n`)
  }

  const batSrc = join(src, 'Dev Launcher.bat')
  const batDest = join(targetRoot, 'Dev Launcher.bat')
  copyIfMissing(batSrc, batDest, dryRun)

  const pkgPath = join(targetRoot, 'package.json')
  if (existsSync(pkgPath) && !dryRun) {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
    pkg.scripts = { ...pkg.scripts, 'dev:launcher': 'node scripts/dev-launcher/server.mjs' }
    writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)
  } else if (dryRun) {
    logAction(dryRun, '[merge] package.json dev:launcher script')
  }

  const gitignorePath = join(targetRoot, '.gitignore')
  const sessionLine = 'scripts/dev-launcher/.dev-session/'
  if (existsSync(gitignorePath)) {
    const current = readFileSync(gitignorePath, 'utf8')
    if (!current.includes('.dev-session') && !dryRun) {
      writeFileSync(gitignorePath, `${current.trimEnd()}\n\n# Dev launcher session\n${sessionLine}\n`)
    }
  }
}

export function printPostInstallSteps(targetRoot, refRoot, mode) {
  console.log(`\n[${mode}] Terminé pour: ${targetRoot}`)
  console.log('  1. cd projet cible → npm run hooks:install')
  console.log('  2. Vérifier version.config.json + dev-launcher.config.json')
  console.log('  3. Compléter AGENTS.md / docs/DOC_AGENT_INDEX.md si projet existant')
  console.log('  4. Redémarrer Cursor — workspace trusted')
  console.log('  5. User Rules ← REFERENCE/USER-RULES.md (une fois, global Cursor)')
  console.log('  6. Test hook : envoyer un message → Hooks Output → executionLogLabel')
  console.log('  7. Dev : npm run dev:launcher — voir docs/processes/dev-launcher.md')
  console.log(`  8. Playbook agent : ${join(refRoot, 'docs', 'processes', 'copier-infra-reference.md')}`)
}
