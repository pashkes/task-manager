import { expect, test } from '@playwright/test'

test('landing loads', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Task Manager')).toBeVisible()
})
