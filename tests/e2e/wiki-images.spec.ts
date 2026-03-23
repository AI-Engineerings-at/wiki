import { test, expect } from '@playwright/test'

const pagesToCheck = ['/', '/en/', '/blog/', '/tools/', '/compliance/', '/grundlagen/']

test.describe('Wiki Images — Load Check', () => {
  for (const route of pagesToCheck) {
    test(`images on ${route} load without errors`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'networkidle' })
      const images = page.locator('img')
      const count = await images.count()

      for (let i = 0; i < count; i++) {
        const img = images.nth(i)
        const src = await img.getAttribute('src')
        const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth)
        if (src?.startsWith('data:') || src?.includes('tracking')) continue
        expect(naturalWidth, `Image ${src} on ${route} failed to load`).toBeGreaterThan(0)
      }
    })
  }
})
