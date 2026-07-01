/**
 * Journal local des bumps A/B/C (git push / MEP).
 */
import { appendFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { formatSemver } from './release-version.mjs'
import { releaseEventsPath } from './version-config.mjs'

export function appendReleaseEvent(root, event) {
  const path = releaseEventsPath(root)
  mkdirSync(dirname(path), { recursive: true })
  appendFileSync(path, `${JSON.stringify({ at: new Date().toISOString(), ...event })}\n`)
}

export function formatReleaseMessage({ segment, reason, before, after, dryRun }) {
  const prefix = dryRun ? '[release:dry-run]' : '[release]'
  return `${prefix} ${reason} → ${segment} ${formatSemver(before)} → ${formatSemver(after)}`
}
