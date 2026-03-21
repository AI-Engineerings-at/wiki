import type { Metadata } from 'next'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { ClientLayout } from '../components/ClientLayout'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'AI Engineering Wiki — Kostenloses Wissen über lokale KI, DSGVO und Automatisierung',
    template: '%s | AI Engineering Wiki',
  },
  description:
    'Kostenloses Wissen über lokale KI, DSGVO-Compliance und Automatisierung. Für DACH-KMUs, die lokale AI-Systeme sauber einführen wollen.',
  metadataBase: new URL('https://wiki.ai-engineering.at'),
  openGraph: {
    siteName: 'AI Engineering Wiki',
    locale: 'de_AT',
    type: 'website',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'AI Engineering Wiki' }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className="min-h-screen flex flex-col">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-[#4262FF] focus:text-white focus:px-4 focus:py-2 focus:rounded">
          Zum Inhalt springen
        </a>
        <SiteHeader />

        <main id="main-content">
          <ClientLayout>{children}</ClientLayout>
        </main>

        <SiteFooter />
      </body>
    </html>
  )
}
