'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getRelatedArticles } from '../lib/articles'

export function RelatedArticles() {
  const pathname = usePathname() || '/'
  const related = getRelatedArticles(pathname)

  if (related.length === 0) return null

  return (
    <section className="mt-12 pt-8 border-t border-slate-800">
      <h2 className="text-lg font-bold text-white mb-4">Verwandte Artikel</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {related.map((article) => (
          <Link
            key={article.href}
            href={article.href}
            className="block p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
          >
            <div className="text-xs text-slate-500 mb-1">{article.categoryLabel}</div>
            <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
              {article.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">{article.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
