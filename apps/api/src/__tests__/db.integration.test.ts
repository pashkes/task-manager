import { prisma } from '@task/prisma'
import { execa } from 'execa'
import { GenericContainer } from 'testcontainers'
import { describe, expect, it } from 'vitest'

describe('db integration (scaffold)', () => {
  it('connects to postgres via testcontainers (scaffold)', async () => {
    const pg = await new GenericContainer('postgres:16')
      .withEnvironment({
        POSTGRES_USER: 'postgres',
        POSTGRES_PASSWORD: 'postgres',
        POSTGRES_DB: 'taskflow_test',
      })
      .withExposedPorts(5432)
      .start()

    const host = pg.getHost()
    const port = pg.getMappedPort(5432)
    process.env.DATABASE_URL = `postgres://postgres:postgres@${host}:${port}/taskflow_test`

    // run prisma generate + migrate deploy (no migrations yet; ok)
    await execa('npx', ['nx', 'run', 'prisma:generate'], { stdio: 'inherit' })

    // connect using prisma client
    await prisma.$connect()
    const result = await prisma.$queryRaw`SELECT 1 as one`
    expect(Array.isArray(result)).toBe(true)
    await prisma.$disconnect()

    await pg.stop()
  }, 120_000)
})
