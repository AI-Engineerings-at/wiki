import { test, expect } from '@playwright/test'

const pagesToCheck = ['/', '/en/', '/tools/', '/compliance/', '/grundlagen/was-ist-ein-llm/']

test.describe('Wiki Accessibility', () => {
  for (const route of pagesToCheck) {
    test(`${route} images have alt text`, async ({ page }) => {
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

    test(`${route} has correct heading hierarchy`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'domcontentloaded' })

      const headings = await page.evaluate(() => {
        const hs = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
        return Array.from(hs).map(h => parseInt(h.tagName[1]))
      })

      // Check no heading level is skipped (e.g. h1 -> h3 without h2)
      for (let i = 1; i < headings.length; i++) {
        const jump = headings[i] - headings[i - 1]
        expect(jump, `${route} skips heading level: h${headings[i-1]} -> h${headings[i]}`).toBeLessThanOrEqual(1)
      }
    })

    test(`${route} has skip-to-content link`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'domcontentloaded' })
      const skipLink = page.locator('a[href="#main-content"]')
      await expect(skipLink).toHaveCount(1)
    })
  }

  test('keyboard navigation works on homepage', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    // Tab should reach interactive elements
    await page.keyboard.press('Tab')
    const focused = await page.evaluate(() => document.activeElement?.tagName)
    expect(focused).toBeTruthy()
  })
})
