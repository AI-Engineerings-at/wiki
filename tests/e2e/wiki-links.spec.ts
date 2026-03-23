import { test, expect } from '@playwright/test'

const hubPages = [
  '/', '/en/', '/grundlagen/', '/tools/', '/patterns/',
  '/security/', '/compliance/', '/papers/',
]

test.describe('Wiki Links — No Broken Internal Links', () => {
  for (const hub of hubPages) {
    test(`internal links on ${hub} are valid`, async ({ page }) => {
      await page.goto(hub, { waitUntil: 'domcontentloaded' })
      const links = page.locator('a[href^="/"]')
      const count = await links.count()
      const hrefs = new Set<string>()

      for (let i = 0; i < count; i++) {
        const href = await links.nth(i).getAttribute('href')
        if (href) hrefs.add(href)
      }

      const broken: string[] = []
      for (const href of Array.from(hrefs)) {
        const resp = await page.request.get(href)
        if (resp.status() !== 200) {
          broken.push(`${href} → ${resp.status()}`)
        }
      }

      expect(broken, `Broken links on ${hub}: ${broken.join(', ')}`).toHaveLength(0)
    })
  }
})
