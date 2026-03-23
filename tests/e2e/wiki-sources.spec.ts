import { test, expect } from '@playwright/test'

const paperPages = [
  '/papers/attention-is-all-you-need/',
  '/papers/rag-paper/',
  '/papers/lora-paper/',
  '/papers/react-paper/',
  '/papers/constitutional-ai/',
]

const compliancePages = [
  '/compliance/eu-ai-act/',
  '/compliance/dsgvo-grundlagen/',
  '/compliance/ki-kompetenz-art4/',
]

test.describe('Wiki Sources', () => {
  for (const route of paperPages) {
    test(`${route} has external source links`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'domcontentloaded' })
      const externalLinks = page.locator('a[href^="http"]:not([href*="ai-engineering"])')
      const count = await externalLinks.count()
      expect(count, `${route} has no external source links`).toBeGreaterThan(0)
    })
  }

  for (const route of compliancePages) {
    test(`${route} links to official legal sources`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'domcontentloaded' })
      const content = await page.content()
      const hasLegalSource = content.includes('eur-lex.europa.eu') ||
        content.includes('ris.bka.gv.at') ||
        content.includes('dsb.gv.at') ||
        content.includes('rtr.at')
      expect(hasLegalSource, `${route} missing link to official legal source`).toBeTruthy()
    })
  }
})
