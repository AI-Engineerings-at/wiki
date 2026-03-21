'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SearchBar } from '../components/SearchBar'

export default function NotFound() {
  const pathname = usePathname()
  const isEN = pathname?.startsWith('/en')

  const t = isEN
    ? {
        title: 'Page not found',
        subtitle: 'The page you are looking for does not exist or has been moved.',
        searchHint: 'Try searching for what you need:',
        categories: 'Browse by category',
        backHome: 'Back to homepage',
        basics: 'Basics',
        compliance: 'Compliance',
        tools: 'Tools',
        patterns: 'Patterns',
        security: 'Security',
        papers: 'Papers',
      }
    : {
        title: 'Seite nicht gefunden',
        subtitle: 'Die Seite, die du suchst, existiert nicht oder wurde verschoben.',
        searchHint: 'Versuche danach zu suchen:',
        categories: 'Nach Kategorie durchsuchen',
        backHome: 'Zur\u00fcck zur Startseite',
        basics: 'Grundlagen',
        compliance: 'Compliance',
        tools: 'Tools',
        patterns: 'Patterns',
        security: 'Security',
        papers: 'Papers',
      }

  const prefix = isEN ? '/en' : ''

  const categoryLinks = [
    { href: `${prefix}/grundlagen`, label: t.basics, icon: '\uD83D\uDD27' },
    { href: `${prefix}/compliance`, label: t.compliance, icon: '\uD83D\uDEE1' },
    { href: `${prefix}/tools`, label: t.tools, icon: '\u2699\uFE0F' },
    { href: `${prefix}/patterns`, label: t.patterns, icon: '\uD83D\uDD04' },
    { href: `${prefix}/security`, label: t.security, icon: '\uD83D\uDD12' },
    { href: `${prefix}/papers`, label: t.papers, icon: '\uD83D\uDCC4' },
  ]

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
      {/* 404 Number */}
      <div className="relative mb-8">
        <div className="text-[8rem] md:text-[12rem] font-black text-slate-900 leading-none select-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#4262FF] to-blue-400">
            404
          </div>
        </div>
      </div>

      {/* Title & Subtitle */}
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 text-center">
        {t.title}
      </h1>
      <p className="text-slate-400 text-center max-w-md mb-8">
        {t.subtitle}
      </p>

      {/* Search */}
      <div className="w-full max-w-md mb-10">
        <p className="text-sm text-slate-500 mb-3 text-center">{t.searchHint}</p>
        <SearchBar />
      </div>

      {/* Category Quick Links */}
      <div className="w-full max-w-2xl mb-10">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 text-center">
          {t.categories}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {categoryLinks.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="flex items-center gap-2 p-3 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-all group"
            >
              <span className="text-lg">{cat.icon}</span>
              <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Back Home Button */}
      <Link
        href={prefix || '/'}
        className="inline-block bg-[#4262FF] hover:bg-[#3550DD] text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 text-sm"
      >
        {t.backHome}
      </Link>
    </div>
  )
}
