'use client'

import { WikiLink as Link } from './WikiLink'
import { usePathname } from 'next/navigation'
import { getEntryByHref, getSidebar } from '../lib/index'
import { isEnglishPath, normalizePath } from '../lib/alternates'
import { ReadingTime } from './ReadingTime'

export function Breadcrumbs() {
  const pathname = normalizePath(usePathname() || '/')
  const isEn = isEnglishPath(pathname)
  const lang = isEn ? 'en' : 'de'

  if (pathname === '/' || pathname === '/en') return null

  const segments = pathname.split('/').filter(Boolean)
  const rest = isEn ? segments.slice(1) : segments
  if (rest.length === 0) return null

  const crumbs: { label: string; href: string }[] = [{ label: 'Home', href: isEn ? '/en' : '/' }]
  const prefix = isEn ? '/en' : ''
  const catSlug = rest[0]
  const category = getSidebar(lang).find((c) => c.slug === catSlug)
  const entry = getEntryByHref(pathname)

  if (category && category.href) {
    crumbs.push({ label: category.label, href: category.href })
    if (rest.length > 1 && entry) {
      crumbs.push({ label: entry.title, href: pathname })
    }
  } else {
    const labelMap: Record<string, string> = isEn
      ? { blog: 'Blog', 'learning-path': 'Learning Path', support: 'Support', imprint: 'Imprint', privacy: 'Privacy', terms: 'Terms', austria: 'Austria', downloads: 'Downloads' }
      : { blog: 'Blog', lernpfad: 'Lernpfad', support: 'Support', impressum: 'Impressum', datenschutz: 'Datenschutz', agb: 'AGB', de: 'Start' }
    crumbs.push({ label: labelMap[catSlug] || catSlug, href: `${prefix}/${catSlug}` })
    if (rest.length > 1 && entry) {
      crumbs.push({ label: entry.title, href: pathname })
    }
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm flex items-center justify-between">
      <ol className="flex items-center gap-2 text-slate-400 flex-wrap">
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
      <ReadingTime words={entry?.words ?? 0} />
    </nav>
  )
}
