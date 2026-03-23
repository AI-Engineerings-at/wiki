import { test, expect } from '@playwright/test'

test.describe('Wiki i18n — Language Parity', () => {
  test('language switcher DE→EN works', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    // Click the EN link in the language toggle (header nav area)
    await page.locator('header a[href="/en"]').first().click()
    await expect(page).toHaveURL(/\/en/)
  })

  test('language switcher EN→DE works', async ({ page }) => {
    await page.goto('/en/', { waitUntil: 'domcontentloaded' })
    // Click the DE link in the language toggle (header nav area)
    await page.locator('header a[href="/"]').first().click()
    await expect(page).not.toHaveURL(/\/en/)
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
