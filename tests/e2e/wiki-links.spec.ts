import { test, expect } from '@playwright/test'

const hubPages = ['/', '/grundlagen/', '/tools/', '/compliance/', '/papers/']

test.describe('Wiki Links — Presence Check', () => {
  for (const hub of hubPages) {
    test(`${hub} has internal links`, async ({ page }) => {
      await page.goto(hub, { waitUntil: 'domcontentloaded' })
      const links = page.locator('a[href^="/"]')
      const count = await links.count()
      expect(count, `${hub} has no internal links`).toBeGreaterThan(5)
    })
  }
})
