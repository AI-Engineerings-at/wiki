'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SearchBar } from './SearchBar'

const navDe = [
  { href: '/lernpfad', label: 'Lernpfad' },
  { href: '/grundlagen', label: 'Grundlagen' },
  { href: '/tools', label: 'Tools' },
  { href: '/patterns', label: 'Patterns' },
  { href: '/security', label: 'Security' },
  { href: '/compliance', label: 'Compliance' },
  { href: '/papers', label: 'Papers' },
  { href: '/downloads', label: 'Downloads' },
  { href: '/oesterreich', label: 'Österreich' },
  { href: '/blog', label: 'Blog' },
]

const navEn = [
  { href: '/en/learning-path', label: 'Learning Path' },
  { href: '/en/grundlagen', label: 'Basics' },
  { href: '/en/tools', label: 'Tools' },
  { href: '/en/patterns', label: 'Patterns' },
  { href: '/en/security', label: 'Security' },
  { href: '/en/compliance', label: 'Compliance' },
  { href: '/en/papers', label: 'Papers' },
  { href: '/en/downloads', label: 'Downloads' },
  { href: '/en/austria', label: 'Austria' },
  { href: '/blog', label: 'Blog' },
]

function getToggleHref(pathname: string, isEn: boolean): string {
  if (isEn) {
    // EN → DE: remove /en prefix
    const dePath = pathname.replace(/^\/en\/?/, '/')
    return dePath === '' ? '/' : dePath
  }
  // DE → EN: add /en prefix
  return pathname === '/' ? '/en' : `/en${pathname}`
}

export function SiteHeader() {
  const pathname = usePathname() || '/'
  const isEn = pathname === '/en' || pathname.startsWith('/en/')
  const nav = isEn ? navEn : navDe
  const homeHref = isEn ? '/en' : '/'
  const shopLabel = 'Shop'
  const toggleHref = getToggleHref(pathname, isEn)

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">
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

        <nav className="hidden lg:flex items-center gap-6">
          {nav.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-blue-400'
                    : 'text-slate-300 hover:text-blue-400'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <div className="flex items-center border border-slate-700 rounded-full overflow-hidden text-sm font-medium">
            <Link
              href={isEn ? toggleHref : pathname}
              className={`px-3 py-1 transition-all ${
                !isEn ? 'bg-[#4262FF]/20 text-blue-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              DE
            </Link>
            <Link
              href={isEn ? pathname : toggleHref}
              className={`px-3 py-1 transition-all ${
                isEn ? 'bg-[#4262FF]/20 text-blue-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              EN
            </Link>
          </div>
          <Link
            href="https://www.ai-engineering.at"
            className="bg-[#4262FF] hover:bg-[#3550DD] text-white font-bold py-2 px-5 rounded-full transition-all hover:scale-105 text-sm"
          >
            {shopLabel}
          </Link>
        </nav>

        {/* Mobile Nav */}
        <nav className="flex lg:hidden items-center gap-3 text-sm">
          <Link href={nav[1].href} className="text-slate-400 hover:text-white">
            {nav[1].label}
          </Link>
          <Link href={nav[5].href} className="text-slate-400 hover:text-white">
            {nav[5].label}
          </Link>
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
          <Link href="https://www.ai-engineering.at" className="text-blue-400 font-bold">
            {shopLabel} &rarr;
          </Link>
        </nav>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <SearchBar />
      </div>
    </header>
  )
}
