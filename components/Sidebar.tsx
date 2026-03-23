'use client'

import { WikiLink as Link } from './WikiLink'
import { usePathname } from 'next/navigation'
import { categories, getEnHref } from '../lib/articles'
import { useState, useEffect } from 'react'

export function Sidebar() {
  const pathname = usePathname() || '/'
  const isEn = pathname.startsWith('/en/')
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  // Set initial open category after hydration to avoid server/client mismatch
  useEffect(() => {
    const seg = pathname.split('/').filter(Boolean)[0]
    setOpenCategory(seg || null)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <nav className="sticky top-24 space-y-1 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
        <Link
          href="/"
          className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            pathname === '/'
              ? 'bg-blue-500/10 text-blue-400'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          Home
        </Link>

        {categories.map((cat) => {
          const isOpen = openCategory === cat.slug
          const isCategoryActive = pathname === cat.href || pathname.startsWith(cat.href + '/')

          return (
            <div key={cat.slug}>
              <button
                onClick={() => setOpenCategory(isOpen ? null : cat.slug)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isCategoryActive
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>
                  {cat.icon} {cat.label}
                </span>
                <span className="text-xs text-slate-500">{cat.articles.length}</span>
              </button>

              {isOpen && (
                <div className="ml-4 mt-1 space-y-0.5 border-l border-slate-800 pl-3">
                  <Link
                    href={isEn ? getEnHref(cat.href) : cat.href}
                    className={`block px-2 py-1.5 text-xs rounded transition-colors ${
                      pathname === (isEn ? getEnHref(cat.href) : cat.href)
                        ? 'text-blue-400'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    Alle {cat.label}
                  </Link>
                  {cat.articles.map((article) => (
                    <Link
                      key={article.href}
                      href={isEn ? getEnHref(article.href) : article.href}
                      className={`block px-2 py-1.5 text-xs rounded transition-colors ${
                        pathname === (isEn ? getEnHref(article.href) : article.href)
                          ? 'text-blue-400 bg-blue-500/5'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {article.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}

        <Link
          href="/blog"
          className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            pathname.startsWith('/blog')
              ? 'bg-blue-500/10 text-blue-400'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          Blog
        </Link>

        <Link
          href="/lernpfad"
          className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            pathname === '/lernpfad'
              ? 'bg-blue-500/10 text-blue-400'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          Lernpfad
        </Link>
      </nav>
    </aside>
  )
}
