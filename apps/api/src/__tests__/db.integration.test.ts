import pg from 'pg'
import { GenericContainer } from 'testcontainers'
import { describe, expect, it } from 'vitest'

describe('db integration (scaffold)', () => {
  it('connects to postgres via testcontainers (scaffold)', async () => {
    const container = await new GenericContainer('postgres:16')
      .withEnvironment({
        POSTGRES_USER: 'postgres',
        POSTGRES_PASSWORD: 'postgres',
        POSTGRES_DB: 'taskflow_test',
      })
      .withExposedPorts(5432)
      .start()

    const host = container.getHost()
    const port = container.getMappedPort(5432)
    const connectionString = `postgres://postgres:postgres@${host}:${port}/taskflow_test`

    const pool = new pg.Pool({ connectionString })
    try {
      const result = await pool.query<{ one: number }>('SELECT 1 as one')
      expect(Array.isArray(result.rows)).toBe(true)
      expect(result.rows[0]?.one).toBe(1)
    } finally {
      await pool.end()
    }

    await container.stop()
  }, 120_000)
})
