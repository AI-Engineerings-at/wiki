'use client'

import { WikiLink as Link } from './WikiLink'
import { usePathname } from 'next/navigation'
import { categories, getArticleByHref } from '../lib/articles'

export function Breadcrumbs() {
  const pathname = usePathname() || '/'

  if (pathname === '/') return null

  const segments = pathname.split('/').filter(Boolean)
  if (segments.length === 0) return null

  const crumbs: { label: string; href: string }[] = [{ label: 'Home', href: '/' }]

  const categorySlug = segments[0]
  const category = categories.find((c) => c.slug === categorySlug)

  if (category) {
    crumbs.push({ label: category.label, href: category.href })

    if (segments.length > 1) {
      const article = getArticleByHref(pathname)
      if (article) {
        crumbs.push({ label: article.title, href: pathname })
      }
    }
  } else {
    const labelMap: Record<string, string> = {
      blog: 'Blog',
      lernpfad: 'Lernpfad',
      support: 'Support',
    }
    crumbs.push({ label: labelMap[categorySlug] || categorySlug, href: `/${categorySlug}` })
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm">
      <ol className="flex items-center gap-2 text-slate-400">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1
          return (
            <li key={crumb.href} className="flex items-center gap-2">
              {i > 0 && <span className="text-slate-600">/</span>}
              {isLast ? (
                <span className="text-slate-300">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="hover:text-blue-400 transition-colors">
                  {crumb.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
