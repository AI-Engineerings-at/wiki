'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { isEnglishPath } from '../lib/alternates'

/**
 * Suche über den Gesamtindex (W6): TSX-Seiten, MDX-Artikel und Blog, DE + EN —
 * Titel, Beschreibung, Tags und eine Wortliste des Volltexts. Der Index
 * (public/search-index.json, scripts/build-index.js) wird beim ersten
 * Tippen geholt, nicht mit jeder Seite ausgeliefert.
 *
 * Vorher: 63 Einträge, nur DE, nur Titel + Beschreibung — „Omnibus" fand die
 * Art-4-Seite nicht, obwohl sie einen ganzen Abschnitt dazu hat.
 */

type Hit = { t: string; d: string; h: string; l: 'de' | 'en'; c: string; g: string; w: string }
type Index = { count: number; entries: Hit[] }

let indexPromise: Promise<Index> | null = null
function loadIndex(): Promise<Index> {
  if (!indexPromise) {
    indexPromise = fetch('/search-index.json')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .catch((err) => { indexPromise = null; throw err })
  }
  return indexPromise
}

function score(hit: Hit, q: string, lang: string): number {
  const t = hit.t.toLowerCase()
  const d = hit.d.toLowerCase()
  let s = 0
  if (t.includes(q)) s += 10
  if (d.includes(q)) s += 5
  if (hit.g.toLowerCase().includes(q)) s += 4
  if (hit.w.includes(q)) s += 2
  if (hit.c.toLowerCase().includes(q)) s += 1
  if (s > 0 && hit.l === lang) s += 3
  return s
}

export function SearchBar({ className = '' }: { className?: string }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Hit[]>([])
  const [total, setTotal] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [failed, setFailed] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const isEn = isEnglishPath(usePathname() || '/')
  const lang = isEn ? 'en' : 'de'
  const t = isEn
    ? { ph: 'Search articles...', aria: 'Search the wiki', none: 'No articles found for', fail: 'Search index not available', of: 'of' }
    : { ph: 'Artikel suchen...', aria: 'Wiki durchsuchen', none: 'Keine Artikel gefunden für', fail: 'Suchindex nicht erreichbar', of: 'von' }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function handleSearch(value: string) {
    setQuery(value)
    if (value.length < 2) { setResults([]); setIsOpen(false); return }
    const q = value.toLowerCase()
    try {
      const idx = await loadIndex()
      setTotal(idx.count)
      const hits = idx.entries
        .map((h) => ({ h, s: score(h, q, lang) }))
        .filter((x) => x.s > 0)
        .sort((a, b) => b.s - a.s)
        .slice(0, 8)
        .map((x) => x.h)
      setResults(hits)
      setFailed(false)
    } catch {
      setResults([])
      setFailed(true)
    }
    setIsOpen(true)
  }

  function handleSelect(href: string) {
    setIsOpen(false)
    setQuery('')
    router.push(href.endsWith('/') ? href : href + '/')
  }

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          aria-label={t.aria}
          placeholder={t.ph}
          className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-slate-900 border border-slate-700 rounded-xl shadow-2xl shadow-black/50 z-50 overflow-hidden">
          {results.map((hit) => (
            <button
              key={hit.h}
              onClick={() => handleSelect(hit.h)}
              className="w-full text-left px-4 py-3 hover:bg-slate-800 transition-colors border-b border-slate-800 last:border-0"
            >
              <div className="text-sm text-white font-medium">
                {hit.t}
                {hit.l !== lang && <span className="ml-2 text-[10px] uppercase text-slate-500 border border-slate-700 rounded px-1">{hit.l}</span>}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {hit.c} &middot; {hit.d.slice(0, 70)}{hit.d.length > 70 ? '…' : ''}
              </div>
            </button>
          ))}
          {total !== null && (
            <div className="px-4 py-1.5 text-[10px] text-slate-600 border-t border-slate-800">{results.length} {t.of} {total}</div>
          )}
        </div>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-slate-900 border border-slate-700 rounded-xl shadow-2xl shadow-black/50 z-50 p-4 text-center text-sm text-slate-500">
          {failed ? t.fail : <>{t.none} &ldquo;{query}&rdquo;</>}
        </div>
      )}
    </div>
  )
}
