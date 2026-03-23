import { test, expect } from '@playwright/test'

test.describe('Wiki DSGVO/Privacy', () => {
  test('external links have rel noopener', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    const externalLinks = page.locator('a[target="_blank"]')
    const count = await externalLinks.count()

    for (let i = 0; i < count; i++) {
      const rel = await externalLinks.nth(i).getAttribute('rel')
      const href = await externalLinks.nth(i).getAttribute('href')
      expect(rel, `External link ${href} missing rel="noopener"`).toContain('noopener')
    }
  })

  test('footer has Impressum and Datenschutz links', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    const impressum = page.locator('footer a:has-text("Impressum")')
    const datenschutz = page.locator('footer a:has-text("Datenschutz")')
    await expect(impressum).toHaveCount(1)
    await expect(datenschutz).toHaveCount(1)
  })
})
