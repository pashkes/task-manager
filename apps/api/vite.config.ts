import path from 'path'
import { defineConfig } from 'vitest/config'

const root = path.resolve(__dirname, '../..')
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/*.integration.test.ts'],
  },
  resolve: {
    alias: {
      '@task/shared': path.join(root, 'libs/shared/src/index.ts'),
      '@task/prisma': path.join(root, 'libs/prisma/src/index.ts'),
      '@task/api-client': path.join(root, 'libs/api-client/src/index.ts'),
    },
  },
})
