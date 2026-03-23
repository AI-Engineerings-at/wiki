import { test, expect } from '@playwright/test'

test.describe('Wiki i18n — Language Parity', () => {
  test('DE homepage has EN link', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    const enLink = page.locator('a:has-text("EN")').first()
    await expect(enLink).toBeVisible()
    const href = await enLink.getAttribute('href')
    expect(href).toMatch(/\/en/)
  })

  test('EN homepage has DE link', async ({ page }) => {
    await page.goto('/en/', { waitUntil: 'domcontentloaded' })
    const deLink = page.locator('a:has-text("DE")').first()
    await expect(deLink).toBeVisible()
  })

  test('DE homepage has correct h1', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('AI Engineering')
  })

  test('EN homepage has correct h1', async ({ page }) => {
    await page.goto('/en/')
    await expect(page.locator('h1')).toContainText('AI Engineering')
  })
})
