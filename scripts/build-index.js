#!/usr/bin/env node
/**
 * build-index.js — der Gesamtindex des Wikis, vor `next build` erzeugt.
 *
 * Warum: Sidebar, Suche, Sitemap, llms.txt und die Hero-Zahl der Startseite
 * kannten bis 2026-08-21 nur die 63 Einträge aus lib/articles.ts. Daneben
 * lagen 377 fertige MDX-Artikel unter content/de|en, die seit dem 22.03.
 * von keinem Code gelesen wurden (content/README.md). Dieser Index liest
 * beide Bestände plus den Blog und schreibt:
 *
 *   lib/generated/index.ts     — MDX-Artikel, Blog-Posts, EN-Titel der TSX-Seiten
 *                                (wird von lib/index.ts mit lib/articles.ts vereint)
 *   public/search-index.json   — Suchindex: Titel, Beschreibung, Tags, Wortliste
 *                                (TSX-Seiten, MDX, Blog; DE + EN)
 *
 * Kollision: trägt ein MDX-Slug denselben Pfad wie eine app/**\/page.tsx,
 * gewinnt die TSX-Seite — das MDX wird nicht geroutet, aber im Log genannt.
 *
 * Nur Node-Standardbibliothek.
 */

const fs = require('fs')
const path = require('path')

/**
 * Frontmatter-Parser (YAML-Teilmenge: `key: wert`, Anführungszeichen,
 * `[a, b]`-Listen, `- item`-Listen). Bewusst ohne gray-matter, damit das
 * Skript auch ohne node_modules läuft (Hausregel H1: kein npm auf dem Mac).
 */
function matter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!m) return { data: {}, content: raw }
  const data = {}
  let listKey = null
  const unq = (v) => {
    v = v.trim()
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) return v.slice(1, -1)
    return v
  }
  for (const line of m[1].split('\n')) {
    const li = line.match(/^\s*-\s+(.*)$/)
    if (li && listKey) { data[listKey].push(unq(li[1])); continue }
    const kv = line.match(/^([\w-]+):\s*(.*)$/)
    if (!kv) continue
    const key = kv[1]
    let val = kv[2].trim()
    if (val === '') { data[key] = []; listKey = key; continue }
    listKey = null
    if (val.startsWith('[') && val.endsWith(']')) {
      data[key] = val.slice(1, -1).split(',').map(unq).filter(Boolean)
    } else {
      data[key] = unq(val)
    }
  }
  return { data, content: m[2] }
}


/**
 * content/lernpfad.yaml lesen — die Struktur aus doc/LERNPFAD-STRUKTUR-2026-08-21
 * (W5). Genau die dort verwendete YAML-Teilmenge: Skalare oben, `abschnitte:`
 * und `einheiten:` als Listen von Maps, Listen in Flow-Schreibweise `[a, b]`.
 * Trennung am ERSTEN `: ` (KE-2026-08-10-J: ein `: ` im Fließtext würde sonst
 * den Kopf zerstören — hier steht keines, geprüft beim Bau).
 */
function parseLernpfad(raw) {
  const top = {}
  const lists = {}
  let curList = null
  let curItem = null
  const scalar = (v) => {
    v = v.trim()
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) return v.slice(1, -1)
    if (v.startsWith('[') && v.endsWith(']')) return v.slice(1, -1).split(',').map((x) => x.trim()).filter(Boolean)
    if (/^-?\d+$/.test(v)) return parseInt(v, 10)
    return v
  }
  const splitKv = (line) => {
    const i = line.indexOf(': ')
    if (i < 0) { if (line.endsWith(':')) return [line.slice(0, -1), '']; return null }
    return [line.slice(0, i), line.slice(i + 2)]
  }
  for (const rawLine of raw.split('\n')) {
    if (!rawLine.trim() || rawLine.trim().startsWith('#')) continue
    const indent = rawLine.length - rawLine.trimStart().length
    const line = rawLine.trim()
    if (indent === 0) {
      const kv = splitKv(line)
      if (!kv) continue
      if (kv[1] === '') { curList = kv[0]; lists[curList] = []; curItem = null }
      else { top[kv[0]] = scalar(kv[1]); curList = null }
      continue
    }
    if (!curList) continue
    if (line.startsWith('- ')) {
      curItem = {}
      lists[curList].push(curItem)
      const kv = splitKv(line.slice(2))
      if (kv) curItem[kv[0]] = scalar(kv[1])
      continue
    }
    const kv = splitKv(line)
    if (kv && curItem) curItem[kv[0]] = scalar(kv[1])
  }
  return { ...top, ...lists }
}

const ROOT = path.resolve(__dirname, '..')
const CONTENT = path.join(ROOT, 'content')
const APP = path.join(ROOT, 'app')
const OUT_TS = path.join(ROOT, 'lib', 'generated', 'index.ts')
const OUT_SEARCH = path.join(ROOT, 'public', 'search-index.json')

// Kategorie-Beschriftung je Ordnername. EN-Ordner sind teils englisch,
// teils deutsch benannt (content/en/kategorien neben content/en/categories).
const LABELS = {
  de: {
    'ai-tools': 'AI-Tools', architektur: 'Architektur', compliance: 'Compliance', ethik: 'Ethik',
    grundlagen: 'Grundlagen', kategorien: 'Kategorien', konzepte: 'Konzepte', mlops: 'MLOps',
    papers: 'Papers', patterns: 'Patterns', sicherheit: 'Sicherheit', skills: 'Skills',
    tools: 'Tools', tutorials: 'Tutorials', vergleiche: 'Vergleiche', security: 'Security',
    oesterreich: 'Österreich', downloads: 'Downloads',
  },
  en: {
    'ai-tools': 'AI Tools', architecture: 'Architecture', categories: 'Categories', comparisons: 'Comparisons',
    compliance: 'Compliance', concepts: 'Concepts', ethics: 'Ethics', grundlagen: 'Basics',
    kategorien: 'Categories (DE)', mlops: 'MLOps', papers: 'Papers', patterns: 'Patterns',
    security: 'Security', skills: 'Skills', tools: 'Tools', tutorials: 'Tutorials',
    austria: 'Austria', downloads: 'Downloads',
  },
}

function walk(dir, filter, acc = []) {
  if (!fs.existsSync(dir)) return acc
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'node_modules') continue
    const full = path.join(dir, e.name)
    if (e.isDirectory()) walk(full, filter, acc)
    else if (filter(full)) acc.push(full)
  }
  return acc
}

/** Alle statischen Routen aus app/**\/page.tsx (Route-Gruppen entfernt). */
function tsxRoutes() {
  const routes = new Map()
  for (const f of walk(APP, (p) => path.basename(p) === 'page.tsx')) {
    const rel = path.relative(APP, path.dirname(f))
    const segs = rel.split(path.sep).filter((s) => s && !/^\(.*\)$/.test(s))
    const route = segs.length === 0 ? '/' : '/' + segs.join('/')
    if (!route.includes('[')) routes.set(route, f)
  }
  return routes
}

/** Sichtbarer Text einer page.tsx — grob: Importe, metadata, JSX-Tags, Ausdrücke weg. */
function tsxText(src) {
  let t = src.replace(/^import[^\n]*\n/gm, '')
  t = t.replace(/export const metadata[\s\S]*?\n}\n/, '')
  t = t.replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
  t = t.replace(/`[\s\S]*?`/g, ' ')
  t = t.replace(/<[^>]+>/g, ' ')
  t = t.replace(/\{[^{}]*\}/g, ' ')
  t = t.replace(/&[a-z]+;/g, ' ')
  return t
}

function metaField(src, key) {
  const m = src.match(new RegExp("^\\s*" + key + ":\\s*(['\"])([\\s\\S]*?)\\1\\s*,?\\s*$", 'm'))
  return m ? m[2].replace(/\\'/g, "'") : ''
}

/** Wortliste für den Suchindex: eindeutig, ≥ 4 Zeichen, max. 400 Wörter. */
function wordList(text, max = 300) {
  const seen = new Set()
  const out = []
  for (const w of text.toLowerCase().match(/[a-zäöüß0-9][a-zäöüß0-9.\-]{3,}/g) || []) {
    const v = w.replace(/[.\-]+$/, '')
    if (v.length < 4 || seen.has(v)) continue
    seen.add(v)
    out.push(v)
    if (out.length >= max) break
  }
  return out.join(' ')
}

function firstParagraph(body) {
  const lines = body.split('\n')
  let inFence = false
  for (const raw of lines) {
    const l = raw.trim()
    if (l.startsWith('```')) { inFence = !inFence; continue }
    if (inFence || !l || l.startsWith('#') || l.startsWith('<') || l.startsWith('|') || l.startsWith('import ')) continue
    return l.replace(/^>\s*/, '').replace(/[*_`]/g, '').slice(0, 220)
  }
  return ''
}

function countWords(body) {
  return (body.match(/\S+/g) || []).length
}

function main() {
  const routes = tsxRoutes()

  // ---- MDX -----------------------------------------------------------------
  const mdx = []
  const collisions = []
  for (const lang of ['de', 'en']) {
    const base = path.join(CONTENT, lang)
    for (const f of walk(base, (p) => p.endsWith('.mdx'))) {
      const rel = path.relative(base, f).split(path.sep)
      if (rel.length !== 2) continue // nur <kategorie>/<slug>.mdx
      const [category, file] = rel
      const slug = file.replace(/\.mdx$/, '')
      const href = (lang === 'en' ? '/en' : '') + '/' + category + '/' + slug
      const raw = fs.readFileSync(f, 'utf-8')
      const { data, content } = matter(raw)
      const title = String(data.title || slug)
      const entry = {
        title,
        description: String(data.summary || data.description || firstParagraph(content)),
        href,
        lang,
        category,
        categoryLabel: (LABELS[lang] || {})[category] || category,
        date: String(data.date || ''),
        source: 'mdx',
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        words: countWords(content),
        image: data.image ? String(data.image) : '',
        file: path.relative(ROOT, f),
      }
      if (routes.has(href)) { collisions.push(href); continue }
      mdx.push(entry)
    }
  }

  // ---- Blog ----------------------------------------------------------------
  const blog = []
  const blogDir = path.join(CONTENT, 'blog')
  for (const f of fs.readdirSync(blogDir).filter((n) => /\.mdx?$/.test(n))) {
    const slug = f.replace(/\.mdx?$/, '')
    const { data, content } = matter(fs.readFileSync(path.join(blogDir, f), 'utf-8'))
    const lang = data.lang === 'en' ? 'en' : 'de'
    blog.push({
      title: String(data.title || slug),
      description: String(data.summary || data.description || ''),
      href: (lang === 'en' ? '/en' : '') + '/blog/' + slug,
      lang,
      category: 'blog',
      categoryLabel: 'Blog',
      date: String(data.date || ''),
      source: 'blog',
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      words: countWords(content),
      image: '',
      file: path.relative(ROOT, path.join(blogDir, f)),
    })
  }

  // ---- TSX: Titel/Beschreibung/Text je Route (für EN-Sidebar und Suche) -----
  const tsx = []
  for (const [route, file] of routes) {
    const src = fs.readFileSync(file, 'utf-8')
    const segs = route.split('/').filter(Boolean)
    const lang = segs[0] === 'en' ? 'en' : 'de'
    const cat = lang === 'en' ? segs[1] || '' : segs[0] || ''
    tsx.push({
      href: route,
      lang,
      category: cat,
      title: metaField(src, 'title'),
      description: metaField(src, 'description'),
      words: wordList(tsxText(src)),
    })
  }

  // ---- Sprachpaare: Blog (Frontmatter `pendant`) und MDX (gleicher Slug in der
  //      gespiegelten Kategorie) — nur Paare, deren beide Seiten existieren. -----
  const blogPairs = []
  for (const b of blog) {
    if (b.lang !== 'de') continue
    const { data } = matter(fs.readFileSync(path.join(ROOT, b.file), 'utf-8'))
    if (!data.pendant) continue
    const en = blog.find((x) => x.lang === 'en' && x.href === '/en/blog/' + data.pendant)
    if (en) blogPairs.push([b.href, en.href])
  }
  blogPairs.push(['/blog', '/en/blog'])
  const CAT_DE_EN = { architektur: 'architecture', kategorien: 'categories', konzepte: 'concepts', ethik: 'ethics',
    sicherheit: 'security', vergleiche: 'comparisons' }
  const mdxHrefs = new Set(mdx.map((e) => e.href))
  const mdxPairs = []
  for (const e of mdx) {
    if (e.lang !== 'de') continue
    const [, cat, slug] = e.href.split('/')
    for (const enCat of [CAT_DE_EN[cat] || cat, cat]) {
      const en = '/en/' + enCat + '/' + slug
      if (mdxHrefs.has(en)) { mdxPairs.push([e.href, en]); break }
    }
  }
  // Kategorie-Seiten ohne TSX-Pendant
  const tsxRouteSet = new Set(routes.keys())
  const mdxCatPairs = []
  for (const cat of new Set(mdx.filter((e) => e.lang === 'de').map((e) => e.category))) {
    if (tsxRouteSet.has('/' + cat)) continue
    const enCat = CAT_DE_EN[cat] || cat
    if (mdx.some((e) => e.lang === 'en' && e.category === enCat) && !tsxRouteSet.has('/en/' + enCat)) mdxCatPairs.push(['/' + cat, '/en/' + enCat])
  }

  // ---- Lernpfad --------------------------------------------------------------
  const lernpfadFile = path.join(CONTENT, 'lernpfad.yaml')
  const lernpfad = fs.existsSync(lernpfadFile) ? parseLernpfad(fs.readFileSync(lernpfadFile, 'utf-8')) : null
  if (lernpfad) {
    const n = (lernpfad.einheiten || []).length
    if (n !== lernpfad.einheiten_gesamt) {
      console.error(`FEHLER lernpfad.yaml: ${n} Einheiten gelesen, einheiten_gesamt sagt ${lernpfad.einheiten_gesamt}`)
      process.exit(1)
    }
    for (const e of lernpfad.einheiten) {
      const ok = /^https?:/.test(e.route_de) || routes.has(e.route_de)
      if (!ok) { console.error(`FEHLER lernpfad.yaml: Einheit ${e.slug} -> ${e.route_de} hat keine app/**/page.tsx`); process.exit(1) }
    }
  }

  // ---- Ausgabe: lib/generated/index.ts -------------------------------------
  const strip = (e) => ({ ...e })
  const ts = [
    '// GENERIERT von scripts/build-index.js — nicht von Hand bearbeiten, nicht committen.',
    `// Stand: ${new Date().toISOString()} · MDX ${mdx.length} (Kollisionen ${collisions.length}) · Blog ${blog.length} · TSX ${tsx.length}`,
    '',
    "import type { IndexEntry, Lernpfad } from '../index-types'",
    '',
    `export const MDX_ENTRIES: IndexEntry[] = ${JSON.stringify(mdx.map(strip), null, 1)}`,
    '',
    `export const BLOG_ENTRIES: IndexEntry[] = ${JSON.stringify(blog.map(strip), null, 1)}`,
    '',
    '/** Titel/Beschreibung der TSX-Seiten aus deren metadata (EN-Sidebar, Suche). */',
    `export const TSX_META: Record<string, { title: string; description: string }> = ${JSON.stringify(
      Object.fromEntries(tsx.map((t) => [t.href, { title: t.title, description: t.description }])), null, 1)}`,
    '',
    `export const MDX_COLLISIONS: string[] = ${JSON.stringify(collisions)}`,
    '',
    '/** DE<->EN-Paare jenseits der TSX-Paartabelle: Blog (Frontmatter pendant), MDX (gleicher Slug), MDX-Kategorien. */',
    `export const EXTRA_PAIRS: ReadonlyArray<readonly [string, string]> = ${JSON.stringify([...blogPairs, ...mdxPairs, ...mdxCatPairs])}`,
    '',
    '/** content/lernpfad.yaml — 18 Einheiten, ~98 min (doc/LERNPFAD-STRUKTUR-2026-08-21). */',
    `export const LERNPFAD: Lernpfad = ${JSON.stringify(lernpfad, null, 1)}`,
    '',
  ].join('\n')
  fs.mkdirSync(path.dirname(OUT_TS), { recursive: true })
  fs.writeFileSync(OUT_TS, ts, 'utf-8')

  // ---- Ausgabe: public/llms.txt (Index für Agenten, aus demselben Gesamtindex) --
  // Vorher: handgepflegt, 88 Links, „100+ articles" im Text — seit 2026-05-07
  // eingefroren. Jetzt je Sprache und Kategorie jeder Eintrag mit Route.
  const llmsLines = [
    '# AI Engineering Wiki',
    `# Generated: ${new Date().toISOString().slice(0, 10)} — from the full index (scripts/build-index.js)`,
    '',
    '> German-language knowledge base for AI Engineering, Sovereign AI and EU AI Act compliance,',
    '> with an English section. Free and open. Maintained by AI Engineering (Eisenstadt, AT).',
    '',
    '## About',
    `This wiki has ${tsx.filter((t) => t.title).length} hand-written pages (DE + EN), ${mdx.length} generated articles ` +
      `(March 2026, not editorially reviewed, labelled as such on every page; DE ${mdx.filter((e) => e.lang === 'de').length} / EN ${mdx.filter((e) => e.lang === 'en').length}) ` +
      `and ${blog.length} blog posts. Counted at build time from app/ and content/.`,
    '',
    `Full text of the generated articles: ${'https://wiki.ai-engineering.at'}/llms-full.txt · Machine-readable: /md/index.json · Search index: /search-index.json`,
    '',
  ]
  const clean = (x) => String(x || '').replace(/\s+/g, ' ').replace(/[\[\]]/g, '').trim()
  for (const lang of ['de', 'en']) {
    llmsLines.push(`## ${lang === 'de' ? 'Deutsch' : 'English'} — hand-written pages`)
    for (const t of tsx.filter((x) => x.lang === lang && x.title).sort((a, b) => a.href.localeCompare(b.href))) {
      llmsLines.push(`- [${clean(t.title)}](${t.href}/)${t.description ? ': ' + clean(t.description) : ''}`)
    }
    llmsLines.push('')
    const cats = [...new Set(mdx.filter((e) => e.lang === lang).map((e) => e.category))].sort()
    for (const cat of cats) {
      const list = mdx.filter((e) => e.lang === lang && e.category === cat).sort((a, b) => a.title.localeCompare(b.title))
      llmsLines.push(`## ${lang === 'de' ? 'Deutsch' : 'English'} — ${list[0].categoryLabel} (generated, ${list.length})`)
      for (const e of list) llmsLines.push(`- [${clean(e.title)}](${e.href}/)${e.description ? ': ' + clean(e.description).slice(0, 160) : ''}`)
      llmsLines.push('')
    }
    llmsLines.push(`## ${lang === 'de' ? 'Deutsch' : 'English'} — Blog (${blog.filter((b) => b.lang === lang).length})`)
    for (const b of blog.filter((x) => x.lang === lang).sort((a, b2) => b2.date.localeCompare(a.date))) {
      llmsLines.push(`- [${clean(b.title)}](${b.href}/)${b.description ? ': ' + clean(b.description).slice(0, 160) : ''}`)
    }
    llmsLines.push('')
  }
  fs.writeFileSync(path.join(ROOT, 'public', 'llms.txt'), llmsLines.join('\n'), 'utf-8')

  // ---- Ausgabe: lib/generated/routes.json (alle Routen, für andere Skripte) ----
  const allRoutes = [...routes.keys(), ...mdx.map((e) => e.href), ...blog.map((b) => b.href),
    ...[...new Set(mdx.filter((e) => e.lang === 'de').map((e) => '/' + e.category))].filter((r) => !routes.has(r)),
    ...[...new Set(mdx.filter((e) => e.lang === 'en').map((e) => '/en/' + e.category))].filter((r) => !routes.has(r))]
  fs.writeFileSync(path.join(ROOT, 'lib', 'generated', 'routes.json'), JSON.stringify(allRoutes.sort(), null, 1), 'utf-8')

  // ---- Ausgabe: lib/generated/stats.json (Soll-Zahlen für scripts/ci/render-gate.py) --
  const stats = {
    generated: new Date().toISOString(),
    mdx: mdx.length, mdx_de: mdx.filter((e) => e.lang === 'de').length, mdx_en: mdx.filter((e) => e.lang === 'en').length,
    mdx_collisions: collisions.length,
    mdx_categories_de: [...new Set(mdx.filter((e) => e.lang === 'de').map((e) => e.category))].filter((c) => !routes.has('/' + c)).length,
    mdx_categories_en: [...new Set(mdx.filter((e) => e.lang === 'en').map((e) => e.category))].filter((c) => !routes.has('/en/' + c)).length,
    blog: blog.length, blog_en: blog.filter((b) => b.lang === 'en').length,
    tsx: tsx.length, tsx_en: tsx.filter((t) => t.lang === 'en').length,
    routes_total: allRoutes.length,
    lernpfad_einheiten: lernpfad ? lernpfad.einheiten.length : 0,
    lernpfad_minuten: lernpfad ? lernpfad.einheiten.reduce((a, e) => a + e.minuten, 0) : 0,
    // Artikel-Einheiten mit Seite: DE-Routen (ohne extern) + vorhandene EN-Routen
    lernpfad_weiter_soll: lernpfad ? lernpfad.einheiten.filter((e) => !/^https?:/.test(e.route_de)).length
      + lernpfad.einheiten.filter((e) => e.route_en && !/^https?:/.test(e.route_en)).length : 0,
    search_entries: 0,
    llms_links: llmsLines.filter((l) => l.startsWith('- [')).length,
  }

  // ---- Ausgabe: public/search-index.json -----------------------------------
  const search = []
  for (const t of tsx) {
    if (!t.title) continue
    search.push({ t: t.title, d: t.description, h: t.href, l: t.lang, c: t.category, g: '', w: t.words })
  }
  for (const e of mdx) {
    const body = fs.readFileSync(path.join(ROOT, e.file), 'utf-8')
    search.push({ t: e.title, d: e.description, h: e.href, l: e.lang, c: e.category, g: e.tags.join(' '), w: wordList(body) })
  }
  for (const e of blog) {
    const body = fs.readFileSync(path.join(ROOT, e.file), 'utf-8')
    search.push({ t: e.title, d: e.description, h: e.href, l: e.lang, c: 'blog', g: e.tags.join(' '), w: wordList(body) })
  }
  fs.writeFileSync(OUT_SEARCH, JSON.stringify({ generated: new Date().toISOString(), count: search.length, entries: search }), 'utf-8')
  stats.search_entries = search.length
  fs.writeFileSync(path.join(ROOT, 'lib', 'generated', 'stats.json'), JSON.stringify(stats, null, 1), 'utf-8')

  console.log(`Gesamtindex: MDX ${mdx.length} geroutet (de ${mdx.filter((e) => e.lang === 'de').length}, en ${mdx.filter((e) => e.lang === 'en').length}), ` +
    `${collisions.length} Kollisionen (TSX gewinnt): ${collisions.join(', ') || '—'}`)
  console.log(`Blog: ${blog.length} (en ${blog.filter((b) => b.lang === 'en').length}) · TSX-Routen: ${tsx.length} (${tsx.filter((t) => t.title).length} mit title)`)
  console.log(`Sprachpaare zusätzlich: Blog ${blogPairs.length} · MDX ${mdxPairs.length} von ${mdx.filter((e) => e.lang === 'de').length} DE-MDX · MDX-Kategorien ${mdxCatPairs.length}`)
  if (lernpfad) console.log(`Lernpfad: ${lernpfad.einheiten.length} Einheiten · ${lernpfad.minuten_gesamt} min · ${lernpfad.abschnitte.length} Abschnitte`)
  console.log(`llms.txt: ${llmsLines.filter((l) => l.startsWith('- [')).length} Links · routes.json: ${allRoutes.length} Routen`)
  console.log(`Suchindex: ${search.length} Einträge -> ${path.relative(ROOT, OUT_SEARCH)} (${(fs.statSync(OUT_SEARCH).size / 1024).toFixed(0)} KB)`)
}

main()
