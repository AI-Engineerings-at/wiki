'use client'

import { usePathname } from 'next/navigation'
import { Sidebar } from './Sidebar'
import { Breadcrumbs } from './Breadcrumbs'
import { RelatedArticles } from './RelatedArticles'
import { ArticleFeedback } from './ArticleFeedback'
import { AuthorBox } from './AuthorBox'
import { GlobalCta } from './GlobalCta'
import { CopyDelegate } from './CopyDelegate'
import { LernpfadWeiter } from './LernpfadWeiter'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/'
  const isEn = pathname === '/en' || pathname.startsWith('/en/')
  const isHomepage = pathname === '/' || pathname === '/en' || pathname === '/en/'

  // Artikel-Komponenten ab Tiefe 2 (Kategorie/Slug), nicht im Blog.
  const segments = pathname.split('/').filter(Boolean)
  const enSegments = isEn ? segments.slice(1) : segments
  const isArticlePage = enSegments.length >= 2 && enSegments[0] !== 'blog'

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-8 w-full flex gap-8">
      <Sidebar />
      <CopyDelegate />

      <div className="flex-1 min-w-0">
        {!isHomepage && <Breadcrumbs />}

        {children}

        {isArticlePage && <LernpfadWeiter />}
        {isArticlePage && <AuthorBox />}
        {isArticlePage && <RelatedArticles />}
        {isArticlePage && <ArticleFeedback />}

        <GlobalCta />
      </div>
    </div>
  )
}
