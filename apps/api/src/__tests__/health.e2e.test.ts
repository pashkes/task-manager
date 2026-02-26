import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { buildApp } from '../main'

describe('GET /health', () => {
  it('returns ok and db status', async () => {
    const app = buildApp()
    await app.ready()

    const res = await request(app.server).get('/health')
    if (res.status === 200) {
      expect(res.body).toEqual({ ok: true, db: 'ok' })
    } else {
      expect(res.status).toBe(503)
      expect(res.body).toEqual({ ok: false, db: 'error' })
    }

    await app.close()
  })
})
