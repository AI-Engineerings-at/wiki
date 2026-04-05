'use client'

import { WikiLink as Link } from './WikiLink'
import { usePathname } from 'next/navigation'

export function SiteFooter() {
  const pathname = usePathname() || '/'
  const isEn = pathname === '/en' || pathname.startsWith('/en/')

  const products = isEn
    ? {
        title: 'Products',
        items: [
          { label: 'All Products', href: 'https://www.ai-engineering.at/products' },
          { label: 'AI-Stack Playbook', href: 'https://www.ai-engineering.at/products' },
          { label: 'n8n Bundle', href: 'https://www.ai-engineering.at/products' },
          { label: 'GDPR Bundle', href: 'https://www.ai-engineering.at/products' },
        ],
      }
    : {
        title: 'Produkte',
        items: [
          { label: 'Alle Produkte', href: 'https://www.ai-engineering.at/products' },
          { label: 'AI-Stack Playbook', href: 'https://www.ai-engineering.at/products' },
          { label: 'n8n Bundle', href: 'https://www.ai-engineering.at/products' },
          { label: 'DSGVO Bundle', href: 'https://www.ai-engineering.at/products' },
        ],
      }

  const resources = isEn
    ? {
        title: 'Resources',
        items: [
          { label: 'Basics', href: '/en/grundlagen' },
          { label: 'Tools', href: '/en/tools' },
          { label: 'Patterns', href: '/en/patterns' },
          { label: 'Compliance', href: '/en/compliance' },
        ],
      }
    : {
        title: 'Ressourcen',
        items: [
          { label: 'Grundlagen', href: '/grundlagen' },
          { label: 'Tools', href: '/tools' },
          { label: 'Patterns', href: '/patterns' },
          { label: 'Compliance', href: '/compliance' },
        ],
      }

  const legal = isEn
    ? { title: 'Legal' }
    : { title: 'Rechtliches' }

  const description = isEn
    ? 'Local AI systems for DACH SMBs. GDPR-compliant, documented, auditable, and grounded in real operations.'
    : 'Lokale AI-Systeme für DACH-KMUs. DSGVO-konform, dokumentiert, auditierbar und aus der Praxis.'

  const copyright = isEn
    ? '© 2026 AI Engineering - All rights reserved | Made in Austria'
    : '© 2026 AI Engineering - Alle Rechte vorbehalten | Made in Austria'

  return (
    <footer className="border-t border-slate-800 mt-16 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <nav aria-label="Footer Navigation" className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-8 bg-[#31F1A8] rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">&gt;_&lt;</span>
              </div>
              <span className="text-white font-bold">AI Engineering</span>
            </div>
            <p className="text-slate-400 text-sm">{description}</p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">{products.title}</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {products.items.map((item, index) => (
                <li key={`${item.href}-${index}`}>
                  <Link href={item.href} className="hover:text-[#31F1A8]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">{resources.title}</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {resources.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[#31F1A8]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div aria-label={isEn ? 'Legal' : 'Rechtliches'}>
            <h4 className="text-white font-bold mb-4">{legal.title}</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="https://www.ai-engineering.at/impressum" className="hover:text-[#31F1A8]">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="https://www.ai-engineering.at/datenschutz" className="hover:text-[#31F1A8]">
                  {isEn ? 'Privacy' : 'Datenschutz'}
                </Link>
              </li>
              <li>
                <Link href="https://www.ai-engineering.at/agb" className="hover:text-[#31F1A8]">
                  {isEn ? 'Terms' : 'AGB'}
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-500 space-y-3">
          <div className="flex justify-center gap-4 mb-3">
            <a href="https://github.com/AI-Engineerings-at" target="_blank" rel="noopener noreferrer" className="hover:text-[#31F1A8] transition-colors" title="GitHub">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/joerg-fuchs-ai" target="_blank" rel="noopener noreferrer" className="hover:text-[#31F1A8] transition-colors" title="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://hub.ai-engineering.at" target="_blank" rel="noopener noreferrer" className="hover:text-[#31F1A8] transition-colors text-xs border border-slate-700 rounded px-2 py-0.5">
              Hub
            </a>
          </div>
          <p className="text-slate-400 font-medium border border-slate-700 rounded-lg px-4 py-2 inline-block">
            {isEn
              ? 'This wiki is for informational purposes only and does not constitute legal advice.'
              : 'Dieses Wiki dient ausschließlich der Information und ersetzt keine Rechtsberatung.'}
          </p>
          <p>{copyright}</p>
          <p>
            {isEn
              ? 'No VAT charged (Austrian small business regulation, §6 Abs. 1 Z 27 UStG)'
              : 'Keine Umsatzsteuer gemäß § 6 Abs. 1 Z 27 UStG'}
          </p>
        </div>
      </div>
    </footer>
  )
}
