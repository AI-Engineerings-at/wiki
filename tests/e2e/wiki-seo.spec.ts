import { test, expect } from '@playwright/test'
import { getIndex } from '../../lib/index'

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

  test('sitemap covers every route and every blog post', async ({ page }) => {
    // App-Routen kommen aus dem Dateibaum; Blog-Routen aus demselben Index,
    // der Sprache und href fuer die Sitemap bestimmt.
    const fs = require('fs') as typeof import('fs')
    const path = require('path') as typeof import('path')

    const appDir = path.join(process.cwd(), 'app')
    const routes: string[] = []
    const walk = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) walk(full)
        else if (entry.name === 'page.tsx') {
          const rel = path.relative(appDir, path.dirname(full))
          // Route-Gruppen wie (de) sind Ordner, aber keine URL-Segmente.
          const segs = rel.split(path.sep).filter((s) => s && !/^\(.*\)$/.test(s))
          const route = segs.length === 0 ? '/' : '/' + segs.join('/')
          if (!route.includes('[')) routes.push(route)
        }
      }
    }
    walk(appDir)

    const blogSlugs = getIndex()
      .filter((entry) => entry.source === 'blog')
      .map((entry) => entry.href)

    const expected = [...routes, ...blogSlugs]

    await page.goto('/sitemap.xml')
    const xml = await page.content()
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])

    const missing = expected.filter(
      (r) => !locs.some((loc) => new URL(loc).pathname.replace(/\/$/, '') === (r === '/' ? '' : r))
    )
    expect(missing, `${missing.length} von ${expected.length} Routen fehlen in der Sitemap`).toEqual([])
  })
})
