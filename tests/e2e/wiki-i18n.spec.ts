import { test, expect } from '@playwright/test'

test.describe('Wiki i18n', () => {
  test('DE homepage loads with correct h1', async ({ page }) => {
    const resp = await page.goto('/', { waitUntil: 'domcontentloaded' })
    expect(resp?.status()).toBe(200)
    await expect(page.locator('h1')).toContainText('AI Engineering')
  })

  test('EN homepage loads with correct h1', async ({ page }) => {
    const resp = await page.goto('/en/', { waitUntil: 'domcontentloaded' })
    expect(resp?.status()).toBe(200)
    await expect(page.locator('h1')).toContainText('AI Engineering')
  })
})
