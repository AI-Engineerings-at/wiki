import { test, expect } from '@playwright/test'

test.describe('Wiki i18n — Language Parity', () => {
  test('DE homepage has correct h1', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('AI Engineering')
  })

  test('EN homepage has correct h1', async ({ page }) => {
    await page.goto('/en/')
    await expect(page.locator('h1')).toContainText('AI Engineering')
  })

  test('DE and EN homepages both load', async ({ page }) => {
    const deResp = await page.goto('/', { waitUntil: 'domcontentloaded' })
    expect(deResp?.status()).toBe(200)

    const enResp = await page.goto('/en/', { waitUntil: 'domcontentloaded' })
    expect(enResp?.status()).toBe(200)
  })
})
