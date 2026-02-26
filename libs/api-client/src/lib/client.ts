// Generated (scaffold). Regenerate via: npm run openapi
import type { paths } from './types'

export type ApiPaths = paths

export function createApiClient(baseUrl: string) {
  return async function request(path: string, init?: RequestInit) {
    const res = await fetch(baseUrl + path, { credentials: 'include', ...init })
    return res
  }
}
