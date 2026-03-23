import { test, expect } from '@playwright/test'

const pagesToCheck = ['/', '/en/', '/tools/', '/compliance/']

test.describe('Wiki DSGVO/Privacy', () => {
  for (const route of pagesToCheck) {
    test(`${route} makes no requests to Google Fonts`, async ({ page }) => {
      const blockedRequests: string[] = []
      page.on('request', (req) => {
        const url = req.url()
        if (url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com')) {
          blockedRequests.push(url)
        }
      })

      await page.goto(route, { waitUntil: 'networkidle' })
      expect(blockedRequests, `${route} loads Google Fonts: ${blockedRequests.join(', ')}`).toHaveLength(0)
    })

    test(`${route} makes no requests to tracking services`, async ({ page }) => {
      const trackers: string[] = []
      const blocked = ['google-analytics.com', 'googletagmanager.com', 'facebook.net', 'fb.com/tr', 'doubleclick.net']

      page.on('request', (req) => {
        const url = req.url()
        if (blocked.some(b => url.includes(b))) {
          trackers.push(url)
        }
      })

      await page.goto(route, { waitUntil: 'networkidle' })
      expect(trackers, `${route} has trackers: ${trackers.join(', ')}`).toHaveLength(0)
    })
  }

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
