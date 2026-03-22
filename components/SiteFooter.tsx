'use client'

import Link from 'next/link'
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
              {products.items.map((item) => (
                <li key={item.href}>
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
