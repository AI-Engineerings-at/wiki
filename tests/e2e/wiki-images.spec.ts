import { test, expect } from '@playwright/test'

const pagesToCheck = ['/', '/tools/', '/compliance/', '/grundlagen/']

test.describe('Wiki Images — Presence Check', () => {
  for (const route of pagesToCheck) {
    test(`${route} has images with src`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'domcontentloaded' })
      const images = page.locator('img[src]')
      const count = await images.count()
      expect(count, `${route} has no images`).toBeGreaterThan(0)
    })
  }
})
