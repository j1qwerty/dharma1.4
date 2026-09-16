#!/usr/bin/env node
// pnpm format            -> prettier --write src (src + all subfolders, recursively)
// pnpm format <folder>   -> prettier --write <folder>  (e.g. pnpm format src/components)
import { spawnSync } from 'node:child_process'

const args = process.argv.slice(2)
const targets = args.length > 0 ? args : ['src']

const result = spawnSync('npx', ['prettier', '--write', ...targets], {
  stdio: 'inherit',
  shell: true,
})

process.exit(result.status ?? 0)
