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
        <SiteHeader />

        <ClientLayout>{children}</ClientLayout>

        <SiteFooter />
      </body>
    </html>
  )
}
