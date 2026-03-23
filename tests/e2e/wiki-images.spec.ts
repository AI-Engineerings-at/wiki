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
        // Skip data URIs, tracking pixels, and lazy-loaded images not yet in viewport
        if (src?.startsWith('data:') || src?.includes('tracking')) continue
        if (naturalWidth === 0) {
          // Scroll image into view and retry (lazy loading)
          await img.scrollIntoViewIfNeeded()
          await img.evaluate((el: HTMLImageElement) => new Promise(r => {
            if (el.complete && el.naturalWidth > 0) return r(true)
            el.onload = () => r(true)
            el.onerror = () => r(false)
            setTimeout(() => r(false), 5000)
          }))
          const retryWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth)
          expect(retryWidth, `Image ${src} on ${route} failed to load`).toBeGreaterThan(0)
        }
      }
    })
  }
})
