'use client'

import { usePathname } from 'next/navigation'
import { Sidebar } from './Sidebar'
import { Breadcrumbs } from './Breadcrumbs'
import { RelatedArticles } from './RelatedArticles'
import { ArticleFeedback } from './ArticleFeedback'
import { EditOnGithub } from './EditOnGithub'
import { GlobalCta } from './GlobalCta'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/'
  const isHomepage = pathname === '/'
  const isEn = pathname === '/en' || pathname.startsWith('/en/')

  // Only show article-level components on article pages (depth >= 2, e.g. /grundlagen/was-ist-agent-orchestration)
  const segments = pathname.split('/').filter(Boolean)
  const isArticlePage = segments.length >= 2 && !isEn && !pathname.startsWith('/blog/')

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-8 w-full flex gap-8">
      <Sidebar />

      <div className="flex-1 min-w-0">
        {!isHomepage && <Breadcrumbs />}

        {children}

        {isArticlePage && <RelatedArticles />}
        {isArticlePage && <ArticleFeedback />}
        {isArticlePage && <EditOnGithub />}

        <GlobalCta />
      </div>
    </div>
  )
}
