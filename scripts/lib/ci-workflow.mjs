/**
 * Génère .github/workflows/ci.yml selon le profil projet (vars ou auto-détection).
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

/** @typedef {'node-scripts'|'node-vite'|'node-python'} CiProfile */

export const CI_PROFILES = {
  'node-scripts': {
    label: 'Node scripts only — pas de package-lock requis',
    nodeVersion: '22',
    npmCi: false,
    pythonVersion: null,
    pythonTest: null,
  },
  'node-vite': {
    label: 'npm dependencies (Vite, etc.) — npm ci + lockfile',
    nodeVersion: '22',
    npmCi: true,
    pythonVersion: null,
    pythonTest: null,
  },
  'node-python': {
    label: 'Infra Node + tests Python unittest',
    nodeVersion: '22',
    npmCi: false,
    pythonVersion: '3.11',
    pythonTest: 'python -m unittest discover -s tests -q',
  },
}

const CORE_STEPS = new Set([
  'npm ci',
  'npm install',
  'npm run hooks:install',
  'npm run validate:stack',
  'npm run build',
])

/**
 * @param {string} targetRoot
 * @param {Record<string, unknown>} vars
 * @returns {CiProfile}
 */
export function detectCiProfile(targetRoot, vars) {
  const explicit = vars.ciProfile
  if (explicit && CI_PROFILES[explicit]) return explicit

  const pkgPath = join(targetRoot, 'package.json')
  if (existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
      const deps = { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) }
      if (Object.keys(deps).length > 0) return 'node-vite'
    } catch {
      /* ignore */
    }
  }

  const pythonMarkers = ['pyproject.toml', 'requirements.txt', 'setup.py', 'run_mvp.py', 'mtg_pwa']
  if (pythonMarkers.some((name) => existsSync(join(targetRoot, name)))) {
    return 'node-python'
  }

  return 'node-scripts'
}

function extraSteps(vars) {
  const out = []
  for (const cmd of vars.validateScripts ?? []) {
    const trimmed = String(cmd).trim()
    if (!trimmed || CORE_STEPS.has(trimmed)) continue
    if (out.includes(trimmed)) continue
    out.push(trimmed)
  }
  for (const cmd of vars.ciExtraSteps ?? []) {
    const trimmed = String(cmd).trim()
    if (!trimmed || CORE_STEPS.has(trimmed) || out.includes(trimmed)) continue
    out.push(trimmed)
  }
  return out
}

function yamlStep(cmd, name) {
  const label = name ?? cmd.replace(/^npm run /, '').replace(/"/g, "'")
  return `      - name: ${label}\n        run: ${cmd}`
}

/**
 * @param {Record<string, unknown>} vars
 * @param {string} targetRoot
 */
export function renderCiWorkflow(vars, targetRoot) {
  const profileId = detectCiProfile(targetRoot, vars)
  const profile = CI_PROFILES[profileId]
  const nodeVersion = vars.ciNodeVersion ?? profile.nodeVersion
  const pythonVersion = vars.ciPythonVersion ?? profile.pythonVersion
  const pythonTest = vars.ciPythonTestCommand ?? profile.pythonTest

  const lines = [
    'name: CI',
    '',
    '# Généré par REFERENCE bootstrap — profil: ' + profileId,
    '# Régénérer: npm run bootstrap / upgrade avec --force-ci et ciProfile dans project.bootstrap.vars.json',
    '',
    'on:',
    '  push:',
    "    branches: [main, master, 'feature/**']",
    '  pull_request:',
    '    branches: [main, master]',
    '',
    'jobs:',
    '  validate:',
    '    runs-on: ubuntu-latest',
    '    steps:',
    '      - uses: actions/checkout@v4',
    '',
    '      - uses: actions/setup-node@v4',
    '        with:',
    `          node-version: '${nodeVersion}'`,
  ]

  if (profile.npmCi) {
    lines.push('          cache: npm', '')
    lines.push('      - name: Install npm dependencies', '        run: npm ci', '')
  } else {
    lines.push('')
  }

  if (pythonVersion) {
    lines.push(
      '      - uses: actions/setup-python@v5',
      '        with:',
      `          python-version: '${pythonVersion}'`,
      '',
    )
  }

  lines.push(
    yamlStep('npm run hooks:install', 'Install git hooks path'),
    '',
    yamlStep('npm run validate:stack', 'Validate infra stack'),
    '',
  )

  for (const cmd of extraSteps(vars)) {
    const stepName = cmd.startsWith('python ')
      ? 'Python tests'
      : cmd.replace(/^npm run /, 'Run ')
    lines.push(yamlStep(cmd, stepName), '')
  }

  lines.push(yamlStep('npm run build', 'Build / sync build-info'), '')

  if (pythonTest && !(vars.validateScripts ?? []).includes(pythonTest)) {
    lines.push(yamlStep(pythonTest, 'Python unit tests'), '')
  }

  return `${lines.join('\n').trimEnd()}\n`
}
