'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getAllArticles, type Article } from '../lib/articles'

export function SearchBar({ className = '' }: { className?: string }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Article[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSearch(value: string) {
    setQuery(value)
    if (value.length < 2) {
      setResults([])
      setIsOpen(false)
      return
    }
    const lower = value.toLowerCase()
    const allArticles = getAllArticles()
    const matches = allArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(lower) ||
        a.description.toLowerCase().includes(lower) ||
        a.categoryLabel.toLowerCase().includes(lower)
    )
    setResults(matches.slice(0, 8))
    setIsOpen(true)
  }

  function handleSelect(href: string) {
    setIsOpen(false)
    setQuery('')
    router.push(href)
  }

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          aria-label="Wiki durchsuchen"
          placeholder="Artikel suchen..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-slate-900 border border-slate-700 rounded-xl shadow-2xl shadow-black/50 z-50 overflow-hidden">
          {results.map((article) => (
            <button
              key={article.href}
              onClick={() => handleSelect(article.href)}
              className="w-full text-left px-4 py-3 hover:bg-slate-800 transition-colors border-b border-slate-800 last:border-0"
            >
              <div className="text-sm text-white font-medium">{article.title}</div>
              <div className="text-xs text-slate-500 mt-0.5">
                {article.categoryLabel} &middot; {article.description.slice(0, 60)}...
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-slate-900 border border-slate-700 rounded-xl shadow-2xl shadow-black/50 z-50 p-4 text-center text-sm text-slate-500">
          Keine Artikel gefunden für &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  )
}
