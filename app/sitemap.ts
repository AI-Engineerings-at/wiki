import fs from 'fs'
import path from 'path'
import type { MetadataRoute } from 'next'
import { languagePairs } from '../lib/alternates'

/**
 * Sitemap aus dem Routenbaum, nicht aus einer gepflegten Liste.
 *
 * Vorher lag `public/sitemap.xml` statisch im Repo: 107 <loc>, davon 104
 * mit `lastmod` 2026-04-01, und 76 von 154 App-Routen fehlten ganz —
 * darunter 70 der 74 EN-Routen (Stufe 1 §6). Eine Liste, die von Hand
 * gepflegt wird, driftet gegen den Baum, den sie beschreibt.
 *
 * Diese Datei zaehlt beim Build ab, was es wirklich gibt:
 *   - jede `app/**\/page.tsx` ohne dynamisches Segment
 *   - jeden Blog-Slug aus `content/blog/*.md|mdx` fuer `/blog/[slug]`
 *
 * `lastmod` kommt aus der Änderungszeit der Quelldatei (`mtime`), nicht
 * aus einem eingetragenen Datum — damit es nicht wieder einfriert.
 */

const BASE_URL = 'https://wiki.ai-engineering.at'
const APP_DIR = path.join(process.cwd(), 'app')
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

type Entry = { route: string; source: string }

function collectPageFiles(dir: string, acc: Entry[] = []): Entry[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      collectPageFiles(full, acc)
    } else if (entry.name === 'page.tsx') {
      const rel = path.relative(APP_DIR, path.dirname(full))
      // Route-Gruppen wie (de) sind Ordner, aber keine URL-Segmente.
      const segs = rel.split(path.sep).filter((s) => s && !/^\(.*\)$/.test(s))
      const route = segs.length === 0 ? '/' : '/' + segs.join('/')
      // Dynamische Segmente werden unten durch ihre konkreten Slugs ersetzt.
      if (!route.includes('[')) acc.push({ route, source: full })
    }
  }
  return acc
}

function blogEntries(): Entry[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((f) => ({
      route: '/blog/' + f.replace(/\.mdx?$/, ''),
      source: path.join(BLOG_DIR, f),
    }))
}

/** Startseiten und Kategorie-Einstiege bekommen mehr Gewicht als Unterseiten. */
function priorityFor(route: string): number {
  const depth = route === '/' ? 0 : route.split('/').filter(Boolean).length
  if (route === '/' || route === '/en') return 1.0
  if (depth <= 1) return 0.8
  if (route.startsWith('/blog/')) return 0.5
  return 0.6
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = [...collectPageFiles(APP_DIR), ...blogEntries()].sort((a, b) =>
    a.route.localeCompare(b.route)
  )

  // Sprachalternativen aus derselben Paartabelle wie Umschalter und hreflang.
  const deToEn = new Map(languagePairs.map(([de, en]) => [de, en]))
  const enToDe = new Map(languagePairs.map(([de, en]) => [en, de]))

  const absolute = (p: string) => `${BASE_URL}${p === '/' ? '' : p}/`

  return entries.map(({ route, source }) => {
    // Genau eine der beiden Richtungen trifft zu, oder keine.
    const dePath = enToDe.has(route) ? enToDe.get(route)! : route
    const enPath = deToEn.has(route) ? deToEn.get(route)! : enToDe.has(route) ? route : null

    return {
      url: absolute(route),
      lastModified: fs.statSync(source).mtime,
      changeFrequency: 'monthly' as const,
      priority: priorityFor(route),
      ...(enPath
        ? {
            alternates: {
              languages: { de: absolute(dePath), en: absolute(enPath) },
            },
          }
        : {}),
    }
  })
}
