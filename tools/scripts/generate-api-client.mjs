import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import process from 'node:process'

import openapiTS, { astToString, COMMENT_HEADER } from 'openapi-typescript'

const specPath = resolve(process.cwd(), 'contracts', 'openapi.json')
const spec = JSON.parse(await readFile(specPath, 'utf-8'))

const outDir = resolve(process.cwd(), 'libs', 'api-client', 'src', 'lib')
await mkdir(outDir, { recursive: true })

const nodes = await openapiTS(spec)
const types = COMMENT_HEADER + astToString(nodes)
await writeFile(resolve(outDir, 'types.ts'), types, 'utf-8')

console.log('Generated libs/api-client/src/lib/types.ts from', specPath)
