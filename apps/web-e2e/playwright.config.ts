import { defineConfig, devices } from '@playwright/test'

const baseURL = process.env.E2E_BASE_URL ?? 'http://localhost:3000'
const workspaceRoot = process.cwd()

export default defineConfig({
  testDir: './src',
  use: { baseURL },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    // Build writes to apps/web/.next; Nx "web:start" expects dist/apps/web. Run next start from apps/web.
    command: 'npx nx run web:build && (cd apps/web && npx next start --port 3000)',
    url: baseURL,
    cwd: workspaceRoot,
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
})
