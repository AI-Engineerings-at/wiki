/**
 * MDX-Artikel aus content/de|en lesen und zu HTML rendern — Server-seitig,
 * im Build (output: 'export'). Kein MDX-Compiler: die 377 Dateien sind
 * Markdown mit Frontmatter, 2 davon mit einem <Callout>-Tag; der Rest der
 * spitzen Klammern steht in Code-Zäunen. Dieselbe unified-Kette wie lib/blog.ts
 * (remark-parse, remark-gfm, remark-rehype, rehype-stringify) — keine neue
 * Abhängigkeit, und ein Markdown-Parser kennt keinen Syntaxfehler, an dem ein
 * Build über 377 Dateien scheitern könnte.
 *
 * Nachbearbeitung am HTML-String:
 *   - interne Links auf Routen abgebildet (/de/x -> /x, ./y.mdx -> Nachbar);
 *     Ziel ohne Route -> Link aufgelöst, Text bleibt (0 tote Links, NN3)
 *   - <table> in <div class="table-wrap"> (W7), <pre> mit Kopier-Knopf (W7)
 *   - h2/h3 bekommen ids für Anker
 *   - erste H1 entfernt (der Seitenkopf trägt den Titel)
 */

import fs from 'fs'
import path from 'path'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { getIndex, type IndexEntry } from './index'
import { TSX_META } from './generated/index'

const CONTENT_DIR = path.join(process.cwd(), 'content')

/**
 * Frontmatter lesen — bewusst NICHT mit gray-matter/js-yaml: 15 von 406
 * Frontmatter-Blöcken sind kein gültiges YAML (gemessen 2026-08-21 mit PyYAML,
 * z. B. papers/scaling-laws.mdx: `summary: "…" (Kaplan et al.) + …`), und ein
 * strenger Parser würde den Build an genau diesen 15 Seiten abbrechen.
 * Dieselbe Teilmenge wie scripts/build-index.js: `key: wert`, Anführungszeichen,
 * `[a, b]`-Listen, `- item`-Listen. Trennung am ersten `:`.
 */
function matter(raw: string): { data: Record<string, string | string[]>; content: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!m) return { data: {}, content: raw }
  const data: Record<string, string | string[]> = {}
  let listKey: string | null = null
  const unq = (v: string) => {
    v = v.trim()
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) return v.slice(1, -1)
    return v
  }
  for (const line of m[1].split('\n')) {
    const li = line.match(/^\s*-\s+(.*)$/)
    if (li && listKey) { (data[listKey] as string[]).push(unq(li[1])); continue }
    const kv = line.match(/^([\w-]+):\s*(.*)$/)
    if (!kv) continue
    const key = kv[1]
    const val = kv[2].trim()
    if (val === '') { data[key] = []; listKey = key; continue }
    listKey = null
    if (val.startsWith('[') && val.endsWith(']')) data[key] = val.slice(1, -1).split(',').map(unq).filter(Boolean)
    else data[key] = unq(val)
  }
  return { data, content: m[2] }
}

export type MdxArticle = IndexEntry & {
  body: string
  author: string
  /** Stand laut Frontmatter, menschenlesbar (z. B. „März 2026"), leer wenn unbekannt. */
  stand: string
}

let routeSet: Set<string> | null = null
function validRoutes(): Set<string> {
  if (routeSet) return routeSet
  routeSet = new Set<string>([...Object.keys(TSX_META), ...getIndex().map((e) => e.href)])
  return routeSet
}

export function mdxEntries(lang: 'de' | 'en'): IndexEntry[] {
  return getIndex().filter((e) => e.lang === lang && e.source === 'mdx')
}

export function mdxCategories(lang: 'de' | 'en'): { slug: string; label: string; count: number }[] {
  const seen = new Map<string, { slug: string; label: string; count: number }>()
  for (const e of mdxEntries(lang)) {
    const cur = seen.get(e.category)
    if (cur) cur.count++
    else seen.set(e.category, { slug: e.category, label: e.categoryLabel, count: 1 })
  }
  return [...seen.values()].sort((a, b) => a.slug.localeCompare(b.slug))
}

/** Kategorien ohne eigene TSX-Seite (die bekommen die dynamische Kategorie-Seite). */
export function mdxOnlyCategories(lang: 'de' | 'en'): { slug: string; label: string; count: number }[] {
  return mdxCategories(lang).filter((c) => !(((lang === 'en' ? '/en/' : '/') + c.slug) in TSX_META))
}

function monthLabel(date: string, lang: 'de' | 'en'): string {
  const m = date.match(/^(\d{4})-(\d{2})/)
  if (!m) return ''
  const de = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
  const en = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const idx = parseInt(m[2], 10) - 1
  const name = (lang === 'en' ? en : de)[idx]
  return name ? `${name} ${m[1]}` : m[1]
}

export function getMdxArticle(lang: 'de' | 'en', category: string, slug: string): MdxArticle | null {
  const href = (lang === 'en' ? '/en' : '') + `/${category}/${slug}`
  const entry = getIndex().find((e) => e.href === href && e.source === 'mdx')
  if (!entry) return null
  const file = path.join(CONTENT_DIR, lang, category, `${slug}.mdx`)
  if (!fs.existsSync(file)) return null
  const { data, content } = matter(fs.readFileSync(file, 'utf-8'))
  return {
    ...entry,
    body: content,
    author: String(data.author || ''),
    stand: monthLabel(entry.date, lang),
  }
}

/** JSX-Reste entfernen: Block-Komponenten (Inhalt bleibt), Self-Closing-Tags, import/export außerhalb von Code-Zäunen. */
function stripJsx(body: string): string {
  const out: string[] = []
  let inFence = false
  let blockTag: string | null = null
  let firstH1Dropped = false
  for (const line of body.split('\n')) {
    if (line.trimStart().startsWith('```')) { inFence = !inFence; out.push(line); continue }
    if (inFence) { out.push(line); continue }
    if (!firstH1Dropped && /^#\s+\S/.test(line)) { firstH1Dropped = true; continue }
    const open = line.match(/^\s*<([A-Z]\w+)(\s[^>]*)?>\s*$/)
    if (open && !blockTag) { blockTag = open[1]; continue }
    if (blockTag && new RegExp(`^\\s*</${blockTag}>\\s*$`).test(line)) { blockTag = null; continue }
    if (/^\s*<[A-Z]\w+(\s[^>]*)?\s*\/>\s*$/.test(line)) continue
    const inline = line.match(/^\s*<([A-Z]\w+)(\s[^>]*)?>(.+?)<\/\1>\s*$/)
    if (inline) { out.push(inline[3].trim()); continue }
    if (/^\s*import\s+.+\s+from\s+['"]/.test(line) || /^\s*export\s+(default\s+|const\s+)/.test(line)) continue
    out.push(line)
  }
  return out.join('\n')
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;/g, '')
    .replace(/[äöüß]/g, (c) => ({ ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' }[c] || c))
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Interner Link -> Route oder null (kein Ziel). */
export function resolveInternalLink(raw: string, lang: 'de' | 'en', category: string): string | null {
  let p = raw.split('#')[0].split('?')[0]
  const hash = raw.includes('#') ? '#' + raw.split('#')[1] : ''
  if (!p) return raw // reiner Anker
  if (/^(https?:|mailto:|tel:)/.test(p)) return raw
  if (p.startsWith('./')) p = `/${category}/` + p.slice(2)
  if (p.startsWith('../')) p = '/' + p.replace(/^(\.\.\/)+/, '')
  if (p.startsWith('docs/')) p = '/' + p.slice(5)
  if (p.startsWith('/docs/')) p = p.slice(5)
  p = p.replace(/\.mdx?$/, '')
  if (p.startsWith('/de/')) p = p.slice(3)
  if (lang === 'en' && !p.startsWith('/en/') && p.startsWith('/')) {
    // EN-Artikel verlinkt ohne Präfix: erst EN-Route probieren, dann DE
    const en = '/en' + p
    if (validRoutes().has(en)) p = en
  }
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1)
  if (!p.startsWith('/')) return null
  if (validRoutes().has(p)) return p + '/' + hash
  // Datei unter public/ (Downloads, Bilder)
  if (/\.[a-z0-9]{2,5}$/i.test(p) && fs.existsSync(path.join(process.cwd(), 'public', p))) return p
  return null
}

export function postProcessHtml(html: string, lang: 'de' | 'en', category: string): { html: string; linksKept: number; linksDropped: string[] } {
  const dropped: string[] = []
  let kept = 0
  // Links
  html = html.replace(/<a href="([^"]*)">([\s\S]*?)<\/a>/g, (_m, href: string, inner: string) => {
    const target = resolveInternalLink(href, lang, category)
    if (target === null) { dropped.push(href); return inner }
    kept++
    if (/^https?:/.test(target)) return `<a href="${target}" target="_blank" rel="noopener noreferrer">${inner}</a>`
    return `<a href="${target}">${inner}</a>`
  })
  // Tabellen scrollbar
  html = html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>')
  // Code-Blöcke mit Kopier-Knopf (Klick-Logik: components/CopyDelegate.tsx)
  const label = lang === 'en' ? 'Copy' : 'Kopieren'
  html = html
    .replace(/<pre>/g, `<div class="code-wrap"><button type="button" class="copy-btn" data-copy="1" aria-label="${label}">${label}</button><pre>`)
    .replace(/<\/pre>/g, '</pre></div>')
  // Anker-ids
  html = html.replace(/<(h[23])>([\s\S]*?)<\/\1>/g, (_m, tag: string, inner: string) => `<${tag} id="${slugify(inner)}">${inner}</${tag}>`)
  return { html, linksKept: kept, linksDropped: dropped }
}

export async function renderMdx(article: MdxArticle): Promise<{ html: string; linksKept: number; linksDropped: string[] }> {
  const md = stripJsx(article.body)
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    // Kein rohes HTML: 2 MDX-Dateien tragen verschachtelte Code-Zäune, deren
    // JSX sonst als echte Elemente im DOM landen würde (<button onClick=…>).
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeStringify, { allowDangerousHtml: false })
    .process(md)
  return postProcessHtml(String(result), article.lang, article.category)
}
