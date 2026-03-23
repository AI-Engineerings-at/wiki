import { test, expect } from '@playwright/test'

const samplePages = [
  '/', '/en/', '/grundlagen/', '/tools/', '/compliance/',
  '/patterns/', '/security/', '/papers/', '/blog/',
  '/grundlagen/was-ist-ein-llm/', '/compliance/eu-ai-act/',
  '/tools/ollama-tutorial/', '/papers/attention-is-all-you-need/',
]

test.describe('Wiki SEO', () => {
  for (const route of samplePages) {
    test(`${route} has title and meta description`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'domcontentloaded' })

      // Must have <title> that's not empty or default
      const title = await page.title()
      expect(title.length, `${route} has empty title`).toBeGreaterThan(10)
      expect(title).not.toBe('Next.js')

      // Must have meta description
      const desc = page.locator('meta[name="description"]')
      const descContent = await desc.getAttribute('content')
      expect(descContent, `${route} missing meta description`).toBeTruthy()
      expect(descContent!.length).toBeGreaterThanOrEqual(30)
    })
  }

  test('sitemap.xml exists and has entries', async ({ page }) => {
    const response = await page.goto('/sitemap.xml')
    expect(response?.status()).toBe(200)
    const content = await page.content()
    expect(content).toContain('<url>')
  })
})
