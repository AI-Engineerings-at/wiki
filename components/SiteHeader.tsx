'use client'

import { useState } from 'react'
import { WikiLink as Link } from './WikiLink'
import { usePathname } from 'next/navigation'
import { SearchBar } from './SearchBar'
import { isEnglishPath, switchLanguageHref } from '../lib/alternates'

// Zwei Listen, absichtlich getrennt.
//
// Joe, 2026-08-21: "wieso 2 Menüs ... die Leiste oben ist schon sehr voll".
// Gemessen waren es 13 Einträge plus Suche im Kopf, 9 davon eine Zeile
// tiefer in der Seitenleiste wiederholt. Vorher speiste EINE Liste beide
// Menüs — wer den Kopf kürzte, kürzte das Mobilmenü mit.
//
// Desktop: nur der Weg durch die Seite (Lernpfad, Blog, Hub). Die acht
// Kategorien stehen dort in der Seitenleiste und werden nicht wiederholt.
// Mobil: die Seitenleiste ist eingeklappt, also trägt das Menü die
// Kategorien — sonst wären sie unter xl gar nicht erreichbar.
const navMobileDe = [
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
  { href: 'https://hub.ai-engineering.at', label: 'Hub', icon: '🔌' },
]

const navMobileEn = [
  { href: '/en/learning-path', label: 'Learning Path', icon: '🎯' },
  { href: '/en/grundlagen', label: 'Basics', icon: '📖' },
  { href: '/en/tools', label: 'Tools', icon: '🛠️' },
  { href: '/en/patterns', label: 'Patterns', icon: '🧩' },
  { href: '/en/security', label: 'Security', icon: '🛡️' },
  { href: '/en/compliance', label: 'Compliance', icon: '⚖️' },
  { href: '/en/papers', label: 'Papers', icon: '📄' },
  { href: '/en/austria', label: 'Austria', icon: '🇦🇹' },
  { href: '/en/downloads', label: 'Downloads', icon: '📥' },
  { href: '/en/blog', label: 'Blog', icon: '📝' },
  { href: 'https://hub.ai-engineering.at/en', label: 'Hub', icon: '🔌' },
]

const navDesktopDe = [
  { href: '/lernpfad', label: 'Lernpfad', icon: '🎯' },
  { href: '/blog', label: 'Blog', icon: '📝' },
  { href: 'https://hub.ai-engineering.at', label: 'Hub', icon: '🔌' },
]

const navDesktopEn = [
  { href: '/en/learning-path', label: 'Learning Path', icon: '🎯' },
  { href: '/en/blog', label: 'Blog', icon: '📝' },
  { href: 'https://hub.ai-engineering.at/en', label: 'Hub', icon: '🔌' },
]

function getToggleHref(pathname: string, isEn: boolean): string | null {
  // Handle _not-found pages — redirect to home instead of broken paths
  if (pathname.includes('_not-found') || pathname.includes('/_not-found')) {
    return isEn ? '/' : '/en'
  }
  // Paartabelle statt Pfad-Umschreiben: der Umschalter zeigt nur auf Seiten,
  // die es gibt — sonst `null`, und der Knopf ist sichtbar deaktiviert
  // (vorher: Sprung auf die Startseite, 30 von 30 Blog-Seiten, Fund 15).
  // Die alte Tabelle stand hier lokal, war richtig befüllt und wurde nie
  // getroffen — sie führte Pfade ohne Schrägstrich, `usePathname()` liefert
  // bei `trailingSlash: true` aber `/en/austria/`.
  return switchLanguageHref(pathname)
}

/** DE/EN-Umschalter: aktive Sprache markiert, fehlendes Pendant sichtbar deaktiviert. */
function LangToggle({ pathname, isEn, toggleHref, size }: { pathname: string; isEn: boolean; toggleHref: string | null; size: 'sm' | 'xs' }) {
  const pad = size === 'sm' ? 'px-3 py-1' : 'px-2 py-0.5'
  const active = 'bg-[#4262FF]/20 text-blue-400'
  const idle = 'text-slate-400 hover:text-white hover:bg-slate-800'
  const off = 'text-slate-600 cursor-not-allowed'
  const missingTitle = isEn ? 'Only available in English' : 'Nur auf Deutsch verfügbar'
  const renderOther = (label: string) =>
    toggleHref ? (
      <Link href={toggleHref} className={`${pad} transition-all ${idle}`}>{label}</Link>
    ) : (
      <span className={`${pad} ${off}`} title={missingTitle} aria-disabled="true" data-lang-missing="1">{label}</span>
    )
  return (
    <div className={`flex items-center border border-slate-700 rounded-full overflow-hidden font-medium ${size === 'sm' ? 'text-sm' : 'text-xs'}`}>
      {isEn ? renderOther('DE') : <Link href={pathname} className={`${pad} ${active}`} aria-current="true">DE</Link>}
      {isEn ? <Link href={pathname} className={`${pad} ${active}`} aria-current="true">EN</Link> : renderOther('EN')}
    </div>
  )
}

export function SiteHeader() {
  const rawPathname = usePathname() || '/'
  // Normalize _not-found paths to home — fixes language switcher on 404 pages
  const pathname = rawPathname.includes('_not-found')
    ? (rawPathname.startsWith('/en') ? '/en' : '/')
    : rawPathname
  const isEn = isEnglishPath(pathname)
  const nav = isEn ? navMobileEn : navMobileDe
  const navDesktop = isEn ? navDesktopEn : navDesktopDe
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
          {navDesktop.map((item) => {
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
          <LangToggle pathname={pathname} isEn={isEn} toggleHref={toggleHref} size="sm" />
        </nav>

        {/* Mobile: DE/EN + Hamburger */}
        <div className="flex xl:hidden items-center gap-3">
          <LangToggle pathname={pathname} isEn={isEn} toggleHref={toggleHref} size="xs" />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            onTouchEnd={(e) => { e.preventDefault(); setMobileOpen(!mobileOpen); }}
            className="p-3 min-w-[48px] min-h-[48px] flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label={mobileOpen ? (isEn ? 'Close menu' : 'Menü schließen') : (isEn ? 'Open menu' : 'Menü öffnen')}
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
          aria-label={isEn ? 'Mobile navigation' : 'Mobile Navigation'}
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
        </nav>
      )}
    </header>
  )
}
