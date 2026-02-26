import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  'apps/api',
  'libs/shared',
  'libs/prisma',
  'libs/api-client',
])
