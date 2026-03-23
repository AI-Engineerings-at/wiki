import { test, expect } from '@playwright/test'

test.describe('Wiki i18n — Language Parity', () => {
  test('language switcher DE→EN works', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await page.click('a:has-text("EN")')
    await expect(page).toHaveURL(/\/en/)
  })

  test('language switcher EN→DE works', async ({ page }) => {
    await page.goto('/en/', { waitUntil: 'domcontentloaded' })
    await page.click('a:has-text("DE")')
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
