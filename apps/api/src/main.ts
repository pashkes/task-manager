import cookie from '@fastify/cookie'
import jwt from '@fastify/jwt'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { Type } from '@sinclair/typebox'
import Fastify from 'fastify'
import path from 'path'
import { fileURLToPath } from 'url'

export function buildApp() {
  const app = Fastify({ logger: true })

  app.register(cookie)
  app.register(jwt, {
    secret: process.env.JWT_SECRET ?? 'dev-secret',
    cookie: { cookieName: 'session', signed: false },
  })

  app.register(swagger, {
    openapi: {
      info: { title: 'Task Manager API', version: '0.0.0' },
    },
  })
  app.register(swaggerUi, { routePrefix: '/docs' })

  app.get(
    '/health',
    {
      schema: {
        response: { 200: Type.Object({ ok: Type.Boolean() }) },
      },
    },
    async () => ({ ok: true }),
  )

  // Scaffold: tasks endpoint (not implemented)
  app.get(
    '/api/tasks',
    {
      schema: {
        response: {
          501: Type.Object({ message: Type.String() }),
        },
      },
    },
    async (_req, reply) => reply.code(501).send({ message: 'Not implemented' }),
  )

  return app
}

async function main() {
  const app = buildApp()
  const port = Number(process.env.PORT ?? 3001)
  await app.listen({ port, host: '0.0.0.0' })
}

// Only start server when this file is the Node entry (e.g. nx serve or node main.js); avoid when imported by tests.
const isTestEnv =
  typeof (import.meta as { vitest?: boolean }).vitest !== 'undefined' &&
  (import.meta as { vitest?: boolean }).vitest
const currentFile = fileURLToPath(import.meta.url)
const runAsEntryByArgv =
  typeof process.argv[1] === 'string' &&
  path.resolve(process.cwd(), process.argv[1]) === path.resolve(currentFile)
const runAsEntryByNx =
  typeof process.env.NX_FILE_TO_RUN === 'string' &&
  path.resolve(process.env.NX_FILE_TO_RUN) === path.resolve(currentFile)
const isEntry = !isTestEnv && (runAsEntryByArgv || runAsEntryByNx)
if (isEntry) {
  main().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
