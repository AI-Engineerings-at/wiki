'use client'

import { WikiLink as Link } from './WikiLink'
import { usePathname } from 'next/navigation'
import { getSidebar } from '../lib/index'
import { isEnglishPath, normalizePath } from '../lib/alternates'
import { useState, useEffect } from 'react'

/**
 * Seitenleiste aus dem Gesamtindex (lib/index.ts): Registry-Kategorien zuerst,
 * dann die MDX-Kategorien — je Sprache die eigene Liste. Vorher kannte sie nur
 * die 63 Registry-Artikel und sprach auf 74 von 74 EN-Seiten Deutsch (W3).
 */
export function Sidebar() {
  const pathname = usePathname() || '/'
  const isEn = isEnglishPath(pathname)
  const lang = isEn ? 'en' : 'de'
  const current = normalizePath(pathname)
  const cats = getSidebar(lang)
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  // Set initial open category after hydration to avoid server/client mismatch
  useEffect(() => {
    const segs = pathname.split('/').filter(Boolean)
    const seg = isEn ? segs[1] : segs[0]
    setOpenCategory(seg || null)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const t = isEn
    ? { home: 'Home', all: 'All', blog: 'Blog', path: 'Learning Path', generated: 'generated, not reviewed' }
    : { home: 'Home', all: 'Alle', blog: 'Blog', path: 'Lernpfad', generated: 'generiert, nicht geprüft' }
  const homeHref = isEn ? '/en' : '/'
  const blogHref = isEn ? '/en/blog' : '/blog'
  const pathHref = isEn ? '/en/learning-path' : '/lernpfad'

  const itemClass = (active: boolean) =>
    `block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      active ? 'bg-blue-500/10 text-blue-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'
    }`

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <nav className="sticky top-24 space-y-1 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4" aria-label={isEn ? 'Articles' : 'Artikel'}>
        <Link href={homeHref} className={itemClass(current === homeHref)}>
          {t.home}
        </Link>

        {cats.map((cat) => {
          const isOpen = openCategory === cat.slug
          const isCategoryActive = !!cat.href && (current === cat.href || current.startsWith(cat.href + '/'))

          return (
            <div key={cat.slug}>
              <button
                onClick={() => setOpenCategory(isOpen ? null : cat.slug)}
                className={`w-full flex items-center justify-between ${itemClass(isCategoryActive)}`}
                aria-expanded={isOpen}
              >
                <span>
                  {cat.icon} {cat.label}
                </span>
                <span className="text-xs text-slate-500" data-sidebar-kategorie={cat.slug} data-anzahl={cat.articles.length}>{cat.articles.length}</span>
              </button>

              {isOpen && (
                <div className="ml-4 mt-1 space-y-0.5 border-l border-slate-800 pl-3">
                  {cat.href && (
                    <Link
                      href={cat.href}
                      className={`block px-2 py-1.5 text-xs rounded transition-colors ${
                        current === cat.href ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {t.all} {cat.label}
                    </Link>
                  )}
                  {cat.articles.map((article) => (
                    <Link
                      key={article.href}
                      href={article.href}
                      title={article.source === 'mdx' ? t.generated : undefined}
                      className={`block px-2 py-1.5 text-xs rounded transition-colors ${
                        current === article.href ? 'text-blue-400 bg-blue-500/5' : 'text-slate-500 hover:text-slate-300'
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

        <Link href={blogHref} className={itemClass(current.startsWith(blogHref))}>
          {t.blog}
        </Link>

        <Link href={pathHref} className={itemClass(current === pathHref)}>
          {t.path}
        </Link>
      </nav>
    </aside>
  )
}
