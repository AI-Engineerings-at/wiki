/**
 * Gesamtindex: TSX-Registry (lib/articles.ts) + MDX-Artikel + Blog — eine Liste.
 *
 * Bis 2026-08-21 kannten Sidebar, Suche, Sitemap und Startseite nur die
 * 63 Einträge der Registry; 377 MDX-Artikel unter content/de|en hatten keine
 * Route (E43). Hier werden beide Bestände vereint; die MDX- und Blog-Daten
 * stammen aus lib/generated/index.ts (scripts/build-index.js, vor jedem Build).
 *
 * Rein, ohne fs — auch in Client-Komponenten importierbar.
 */

import { categories, type Article } from './articles'
import { languagePairs } from './alternates'
import { MDX_ENTRIES, BLOG_ENTRIES, TSX_META } from './generated/index'
import type { IndexEntry } from './index-types'

export type { IndexEntry } from './index-types'

const deToEn = new Map(languagePairs.map(([de, en]) => [de, en]))

function fromRegistry(a: Article): IndexEntry {
  return {
    title: a.title,
    description: a.description,
    href: a.href,
    lang: 'de',
    category: a.category,
    categoryLabel: a.categoryLabel,
    date: a.date,
    source: 'tsx',
    tags: [],
    words: TSX_META[a.href]?.words ?? 0,
    image: a.image || a.thumbnail || '',
    file: '',
  }
}

/** EN-Zwilling einer Registry-Seite — nur, wenn die EN-Route existiert. */
function enTwin(a: Article, enLabel: string): IndexEntry | null {
  const enHref = deToEn.get(a.href)
  if (!enHref || !enHref.startsWith('/en/')) return null
  const meta = TSX_META[enHref]
  return {
    ...fromRegistry(a),
    title: meta?.title || a.title,
    description: meta?.description || a.description,
    words: meta?.words ?? 0,
    href: enHref,
    lang: 'en',
    categoryLabel: enLabel,
  }
}

const EN_CATEGORY_LABEL: Record<string, string> = {
  grundlagen: 'Basics',
  compliance: 'Compliance',
  tools: 'Tools',
  patterns: 'Patterns',
  security: 'Security',
  papers: 'Papers',
  oesterreich: 'Austria',
  downloads: 'Downloads',
}

let cache: IndexEntry[] | null = null

/** Alle Einträge (DE + EN, TSX + MDX + Blog). Nenner für jede Zahl im Wiki. */
export function getIndex(): IndexEntry[] {
  if (cache) return cache
  const tsx: IndexEntry[] = []
  for (const cat of categories) {
    for (const a of cat.articles) {
      tsx.push(fromRegistry(a))
      const en = enTwin(a, EN_CATEGORY_LABEL[cat.slug] || cat.label)
      if (en) tsx.push(en)
    }
  }
  cache = [...tsx, ...MDX_ENTRIES, ...BLOG_ENTRIES]
  return cache
}

export function getArticles(lang: 'de' | 'en'): IndexEntry[] {
  return getIndex().filter((e) => e.lang === lang && e.source !== 'blog')
}

/** Zahl der Artikel je Sprache (ohne Blog) — die Hero-Zahl der Startseite. */
export function articleCount(lang: 'de' | 'en'): number {
  return getArticles(lang).length
}

export function recentArticles(lang: 'de' | 'en', count = 5): IndexEntry[] {
  return getArticles(lang)
    .filter((e) => e.date)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, count)
}

export function getEntryByHref(href: string): IndexEntry | undefined {
  const h = href.length > 1 && href.endsWith('/') ? href.slice(0, -1) : href
  return getIndex().find((e) => e.href === h)
}

/**
 * Zahl der Artikel einer Kategorie — dieselbe Quelle wie die Seitenleiste (W6).
 *
 * Bis 2026-08-22 zaehlten die Kategorie-Karten der Startseite `cat.articles.length`
 * aus der 63er-Registry (lib/articles.ts), die Seitenleiste daneben den Gesamtindex:
 * 5 von 8 Karten wichen ab (Karte "Grundlagen 10" neben Leiste "18").
 * Beide rechnen jetzt hier.
 */
export function kategorieAnzahl(lang: 'de' | 'en', slug: string): number {
  const c = getSidebar(lang).find((x) => x.slug === slug)
  return c ? c.articles.length : 0
}

export type SidebarCategory = {
  slug: string
  label: string
  href: string | null
  icon: string
  articles: { title: string; href: string; source: IndexEntry['source'] }[]
}

const ICONS: Record<string, string> = {
  grundlagen: '\u{1F527}', compliance: '\u{1F6E1}', tools: '\u{2699}', patterns: '\u{1F504}',
  security: '\u{1F512}', papers: '\u{1F4C4}', oesterreich: '\u{1F1E6}\u{1F1F9}', austria: '\u{1F1E6}\u{1F1F9}',
  downloads: '\u{1F4E5}', 'ai-tools': '\u{1F916}', architektur: '\u{1F3D7}', architecture: '\u{1F3D7}',
  ethik: '\u{2696}', ethics: '\u{2696}', kategorien: '\u{1F5C2}', categories: '\u{1F5C2}',
  konzepte: '\u{1F4A1}', concepts: '\u{1F4A1}', mlops: '\u{1F501}', sicherheit: '\u{1F510}',
  skills: '\u{1F9E9}', tutorials: '\u{1F393}', vergleiche: '\u{2696}', comparisons: '\u{2696}',
}

/** Kategorien mit Artikeln je Sprache — Registry-Reihenfolge zuerst, dann MDX-Kategorien alphabetisch. */
export function getSidebar(lang: 'de' | 'en'): SidebarCategory[] {
  const entries = getArticles(lang)
  const byCat = new Map<string, IndexEntry[]>()
  for (const e of entries) {
    // EN-Kategorie-Slug: /en/<kat>/... ; DE: /<kat>/...
    const segs = e.href.split('/').filter(Boolean)
    const slug = lang === 'en' ? segs[1] : segs[0]
    if (!slug) continue
    if (!byCat.has(slug)) byCat.set(slug, [])
    byCat.get(slug)!.push(e)
  }
  const order: string[] = []
  for (const c of categories) {
    const enHref = deToEn.get(c.href)
    const slug = lang === 'en' ? (enHref ? enHref.split('/')[2] : c.slug) : c.slug
    if (byCat.has(slug) && !order.includes(slug)) order.push(slug)
  }
  for (const slug of Array.from(byCat.keys()).sort()) if (!order.includes(slug)) order.push(slug)

  return order.map((slug) => {
    const list = byCat.get(slug)!
    const catHrefDe = '/' + slug
    const catHref = lang === 'en' ? deToEn.get('/' + (slug === 'austria' ? 'oesterreich' : slug)) || '/en/' + slug : catHrefDe
    const registryCat = categories.find((c) => (lang === 'en' ? deToEn.get(c.href) === catHref : c.href === catHref))
    const label = registryCat
      ? lang === 'en' ? EN_CATEGORY_LABEL[registryCat.slug] || registryCat.label : registryCat.label
      : list[0].categoryLabel
    return {
      slug,
      label,
      href: catHref,
      icon: ICONS[slug] || '\u{1F4DD}',
      articles: list
        .slice()
        .sort((a, b) => (a.source === b.source ? a.title.localeCompare(b.title) : a.source === 'tsx' ? -1 : 1))
        .map((e) => ({ title: e.title, href: e.href, source: e.source })),
    }
  })
}
