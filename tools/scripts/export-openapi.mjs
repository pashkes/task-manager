import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import process from 'node:process'

import { buildApp } from '../../dist/apps/api/src/main.js'

const app = buildApp()
await app.ready()

const doc = app.swagger()
const outPath = resolve(process.cwd(), 'contracts', 'openapi.json')
await writeFile(outPath, JSON.stringify(doc, null, 2), 'utf-8')

await app.close()
console.log('Wrote', outPath)
