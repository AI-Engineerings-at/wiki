'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SearchBar } from './SearchBar'

const navDe = [
  { href: '/lernpfad', label: 'Lernpfad', icon: '🎯' },
  { href: '/grundlagen', label: 'Grundlagen', icon: '📖' },
  { href: '/tools', label: 'Tools', icon: '🛠️' },
  { href: '/patterns', label: 'Patterns', icon: '🧩' },
  { href: '/security', label: 'Security', icon: '🛡️' },
  { href: '/compliance', label: 'Compliance', icon: '⚖️' },
  { href: '/papers', label: 'Papers', icon: '📄' },
  { href: '/oesterreich', label: 'Österreich', icon: '🇦🇹' },
  { href: '/downloads', label: 'Downloads', icon: '📥' },
  { href: '/blog', label: 'Blog', icon: '📝' },
]

const navEn = [
  { href: '/en/learning-path', label: 'Learning Path', icon: '🎯' },
  { href: '/en/grundlagen', label: 'Basics', icon: '📖' },
  { href: '/en/tools', label: 'Tools', icon: '🛠️' },
  { href: '/en/patterns', label: 'Patterns', icon: '🧩' },
  { href: '/en/security', label: 'Security', icon: '🛡️' },
  { href: '/en/compliance', label: 'Compliance', icon: '⚖️' },
  { href: '/en/papers', label: 'Papers', icon: '📄' },
  { href: '/en/austria', label: 'Austria', icon: '🇦🇹' },
  { href: '/en/downloads', label: 'Downloads', icon: '📥' },
  { href: '/blog', label: 'Blog', icon: '📝' },
]

// DE→EN path mappings for routes that differ between languages
const deToEn: Record<string, string> = {
  '/lernpfad': '/en/learning-path',
  '/oesterreich': '/en/austria',
  '/tools/open-source-projekte': '/en/tools/open-source-projects',
  '/tools/ai-tools-datenbank': '/en/tools/ai-tools-database',
  '/tools/vergleich-alternativen': '/en/tools/comparison-alternatives',
  '/tools/cli-coding-agents-vergleich': '/en/tools/cli-coding-agents-comparison',
  '/tools/n8n-workflow-bundle': '/en/tools/n8n-workflow-bundle',
  '/patterns/ai-agent-digitaler-mitarbeiter': '/en/patterns/ai-agent-digital-employee',
  '/patterns/agent-skalierung': '/en/patterns/agent-skalierung',
}
const enToDe: Record<string, string> = Object.fromEntries(
  Object.entries(deToEn).map(([de, en]) => [en, de])
)

function getToggleHref(pathname: string, isEn: boolean): string {
  if (isEn) {
    // Check mapping first
    if (enToDe[pathname]) return enToDe[pathname]
    const dePath = pathname.replace(/^\/en\/?/, '/')
    return dePath === '' ? '/' : dePath
  }
  // Check mapping first
  if (deToEn[pathname]) return deToEn[pathname]
  return pathname === '/' ? '/en' : `/en${pathname}`
}

export function SiteHeader() {
  const pathname = usePathname() || '/'
  const isEn = pathname === '/en' || pathname.startsWith('/en/')
  const nav = isEn ? navEn : navDe
  const homeHref = isEn ? '/en' : '/'
  const toggleHref = getToggleHref(pathname, isEn)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href={homeHref} className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-8 bg-[#4262FF] rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">&gt;_&lt;</span>
          </div>
          <div>
            <span className="text-white font-bold text-base">AI Engineering</span>
            <span className="text-slate-500 text-xs block -mt-0.5">Wiki</span>
          </div>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:block flex-1 max-w-xs">
          <SearchBar />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-5" aria-label={isEn ? 'Main navigation' : 'Hauptnavigation'}>
          {nav.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive ? 'text-blue-400' : 'text-slate-300 hover:text-blue-400'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <div className="flex items-center border border-slate-700 rounded-full overflow-hidden text-sm font-medium">
            <Link
              href={isEn ? toggleHref : pathname}
              className={`px-3 py-1 transition-all ${!isEn ? 'bg-[#4262FF]/20 text-blue-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            >
              DE
            </Link>
            <Link
              href={isEn ? pathname : toggleHref}
              className={`px-3 py-1 transition-all ${isEn ? 'bg-[#4262FF]/20 text-blue-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            >
              EN
            </Link>
          </div>
          <Link
            href="https://www.ai-engineering.at"
            className="bg-[#4262FF] hover:bg-[#3550DD] text-white font-bold py-2 px-5 rounded-full transition-all hover:scale-105 text-sm"
          >
            Shop
          </Link>
        </nav>

        {/* Mobile: DE/EN + Hamburger */}
        <div className="flex xl:hidden items-center gap-3">
          <div className="flex items-center border border-slate-700 rounded-full overflow-hidden text-xs font-medium">
            <Link
              href={isEn ? toggleHref : pathname}
              className={`px-2 py-0.5 ${!isEn ? 'bg-[#4262FF]/20 text-blue-400' : 'text-slate-400'}`}
            >
              DE
            </Link>
            <Link
              href={isEn ? pathname : toggleHref}
              className={`px-2 py-0.5 ${isEn ? 'bg-[#4262FF]/20 text-blue-400' : 'text-slate-400'}`}
            >
              EN
            </Link>
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-3 min-w-[48px] min-h-[48px] flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
            type="button"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <SearchBar />
      </div>

      {/* Mobile Menu (Slide-down) */}
      {mobileOpen && (
        <nav
          className="xl:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-sm"
          aria-label="Mobile Navigation"
        >
          <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 gap-1">
            {nav.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#4262FF]/10 text-blue-400'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              )
            })}
          </div>
          <div className="px-4 pb-4">
            <Link
              href="https://www.ai-engineering.at"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center bg-[#4262FF] hover:bg-[#3550DD] text-white font-bold py-3 px-5 rounded-full transition-all text-sm"
            >
              Shop &rarr;
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
