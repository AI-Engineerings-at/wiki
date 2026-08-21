#!/usr/bin/env node
/**
 * Statischer Prüfer für interne Links — ohne Build, ohne Abhängigkeiten.
 *
 * Warum: der BFS-Crawl über das gebaute Wiki (Staging) fand am 21.08.2026
 * 54 von 220 Pfaden nicht-200. Ein Crawl braucht einen Build; dieser Prüfer
 * findet dieselben Ursachen am Quelltext und läuft in Sekunden.
 *
 * Er ersetzt den Crawl NICHT: er sieht nur, was im Quelltext als Link steht,
 * nicht was Next daraus baut. Grün heißt „keine toten Links in den Quellen",
 * nicht „das gebaute Wiki ist fehlerfrei".
 *
 * Quellen:  app/**, components/**, lib/**, content/blog/**
 * Ziele:    Routen aus app/**\/page.tsx · Blog-Slugs aus content/blog/*.md(x)
 *           · Dateien unter public/
 *
 * Exit 0 = keine toten Links · Exit 1 = mindestens einer.
 * Nur Node-Standardbibliothek (fs, path).
 */

const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')

// --- Sammeln -----------------------------------------------------------------

function walk(dir, filter, acc = []) {
  if (!fs.existsSync(dir)) return acc
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '__pycache__') continue
    if (entry.name.startsWith('.')) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, filter, acc)
    else if (filter(full)) acc.push(full)
  }
  return acc
}

/** Alle Routen aus dem app-Baum. `app/page.tsx` -> `/`. */
function collectRoutes() {
  const routes = new Set()
  const dynamic = []
  for (const file of walk(path.join(ROOT, 'app'), (f) => path.basename(f) === 'page.tsx')) {
    const rel = path.relative(path.join(ROOT, 'app'), path.dirname(file))
    // Route-Gruppen wie (de) sind Ordner, aber keine URL-Segmente.
    const segs = rel.split(path.sep).filter((s) => s && !/^\(.*\)$/.test(s))
    const route = segs.length === 0 ? '/' : '/' + segs.join('/')
    if (route.includes('[')) {
      // /blog/[slug] -> ^/blog/[^/]+$
      const pattern = '^' + route.replace(/\[[^\]]+\]/g, '[^/]+') + '$'
      dynamic.push(new RegExp(pattern))
    } else {
      routes.add(route)
    }
  }
  return { routes, dynamic }
}

/** Blog-Slugs -> konkrete Routen, damit /blog/[slug] nicht alles durchwinkt. */
function collectBlogRoutes() {
  const dir = path.join(ROOT, 'content', 'blog')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((f) => '/blog/' + f.replace(/\.mdx?$/, ''))
}

/** Jede Datei unter public/ ist unter ihrem Pfad erreichbar. */
function collectPublicFiles() {
  const dir = path.join(ROOT, 'public')
  return walk(dir, () => true).map(
    (f) => '/' + path.relative(dir, f).split(path.sep).join('/')
  )
}

// --- Links aus den Quellen ---------------------------------------------------

// Nicht prüfbar / nicht unsere Routen.
const IGNORE_PREFIX = ['/_next/', '/md/', '/api/']

function isCandidate(value) {
  if (!value.startsWith('/')) return false
  if (value.startsWith('//')) return false
  if (/[${}<>\s\\*]/.test(value)) return false // Template-Literale, JSX-Ausdrücke
  if (IGNORE_PREFIX.some((p) => value.startsWith(p))) return false
  return true
}

function extractFromCode(text, topSegments) {
  const found = []

  // 1. Echte Verweise: href="/x" · href='/x' · href={'/x'} · href: '/x' · src=…
  const attr = /\b(?:href|src)\s*[=:]\s*\{?\s*(['"])(\/[^'"\n]*)\1/g
  let m
  while ((m = attr.exec(text)) !== null) found.push(m[2])

  // 2. Pfade in Datentabellen (relatedArticlesMap, Kachel-Tupel, Paartabelle).
  //    Sie werden später zu Links, stehen aber nicht an einem href-Attribut.
  //    Aufgenommen wird ein String nur, wenn sein ERSTES Segment ein echtes
  //    Top-Level-Segment der Seite ist. Das trennt Seitenpfade sauber von
  //    Dateipfaden aus Code-Beispielen (/etc/ssl/…, /home/user/…, /mnt/nas/…)
  //    und von Slash-Kommandos (/approve, /bye), die keine Links sind.
  const lit = /(['"])(\/[^'"\n]*)\1/g
  while ((m = lit.exec(text)) !== null) {
    const value = m[2]
    const seg = value.split('/')[1] || ''
    if (topSegments.has(seg)) found.push(value)
  }

  return found
}

function extractFromMarkdown(text) {
  const found = []
  const re = /\]\((\/[^)\s]*)\)/g
  let m
  while ((m = re.exec(text)) !== null) found.push(m[1])
  return found
}

// --- Prüfen ------------------------------------------------------------------

function normalize(p) {
  let v = p.split('#')[0].split('?')[0]
  try {
    v = decodeURIComponent(v)
  } catch {
    /* kaputtes Encoding: roh weiterprüfen */
  }
  if (v.length > 1 && v.endsWith('/')) v = v.slice(0, -1)
  return v === '' ? '/' : v
}

function main() {
  const { routes, dynamic } = collectRoutes()
  const blogRoutes = collectBlogRoutes()
  const publicFiles = collectPublicFiles()

  const targets = new Set([...routes, ...blogRoutes, ...publicFiles].map(normalize))

  // Erstes Pfadsegment aller echten Ziele — der Filter für Datentabellen.
  const topSegments = new Set(
    [...targets].map((t) => t.split('/')[1] || '').filter(Boolean)
  )

  const sourceFiles = [
    ...walk(path.join(ROOT, 'app'), (f) => /\.(tsx?|jsx?)$/.test(f)),
    ...walk(path.join(ROOT, 'components'), (f) => /\.(tsx?|jsx?)$/.test(f)),
    ...walk(path.join(ROOT, 'lib'), (f) => /\.(tsx?|jsx?)$/.test(f)),
    ...walk(path.join(ROOT, 'content', 'blog'), (f) => /\.mdx?$/.test(f)),
  ]

  const dead = []
  let checked = 0

  for (const file of sourceFiles) {
    const text = fs.readFileSync(file, 'utf-8')
    const isMd = /\.mdx?$/.test(file)
    const links = isMd
      ? [...extractFromMarkdown(text), ...extractFromCode(text, topSegments)]
      : extractFromCode(text, topSegments)

    for (const raw of links) {
      if (!isCandidate(raw)) continue
      checked++
      const target = normalize(raw)
      if (targets.has(target)) continue
      if (dynamic.some((re) => re.test(target))) continue
      dead.push({ file: path.relative(ROOT, file), link: raw })
    }
  }

  const uniqueDead = [...new Set(dead.map((d) => d.link))].sort()

  for (const d of dead.sort((a, b) => a.file.localeCompare(b.file))) {
    console.log(`TOT  ${d.link}   <- ${d.file}`)
  }

  console.log('')
  console.log(
    `Ziele: ${targets.size} (${routes.size} statische Routen laut app/**/page.tsx, ` +
      `${dynamic.length} dynamische, ${blogRoutes.length} Blog-Slugs, ` +
      `${publicFiles.length} Dateien unter public/)`
  )
  console.log(
    `${dead.length} tot von ${checked} geprüft (${uniqueDead.length} verschiedene Ziele) ` +
      `aus ${sourceFiles.length} Quelldateien`
  )

  process.exit(dead.length === 0 ? 0 : 1)
}

main()
