import { test, expect } from '@playwright/test'

const pagesToCheck = ['/', '/en/', '/tools/', '/compliance/', '/grundlagen/was-ist-ein-llm/']

test.describe('Wiki Accessibility', () => {
  for (const route of pagesToCheck) {
    test(`${route} images have alt attribute`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'domcontentloaded' })
      const images = page.locator('img')
      const count = await images.count()

      for (let i = 0; i < count; i++) {
        const alt = await images.nth(i).getAttribute('alt')
        const src = await images.nth(i).getAttribute('src')
        // alt can be "" for decorative images, but must exist as attribute
        expect(alt, `Image ${src} on ${route} missing alt attribute`).not.toBeNull()
      }
    })

    test(`${route} has skip-to-content link`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'domcontentloaded' })
      const skipLink = page.locator('a[href="#main-content"]')
      await expect(skipLink).toHaveCount(1)
    })
  }
})
