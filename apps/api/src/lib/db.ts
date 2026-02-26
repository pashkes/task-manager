import pg from 'pg'

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
})

export async function query<T extends pg.QueryResultRow = pg.QueryResultRow>(
  text: string,
  values?: unknown[],
): Promise<pg.QueryResult<T>> {
  return pool.query<T>(text, values)
}

export async function healthCheck(): Promise<boolean> {
  try {
    const { rows } = await pool.query<{ one: number }>('SELECT 1 as one')
    return Array.isArray(rows) && rows.length > 0
  } catch {
    return false
  }
}

export { pool }
