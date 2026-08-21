import type { Metadata, Viewport } from 'next'

/**
 * Wurzel-Layout des englischen Zweigs.
 *
 * Gegenstück zu app/(de)/layout.tsx: eigenes Dokument-Element mit der
 * Sprache en. app/en/ braucht keine Route-Gruppe, es hat schon ein eigenes
 * Präfix. Vorher lief dieser Zweig unter dem deutschen Wurzel-Layout und
 * erbte dessen Sprachattribut.
 */

import { SiteHeader } from '../../components/SiteHeader'
import { SiteFooter } from '../../components/SiteFooter'
import { ClientLayout } from '../../components/ClientLayout'
import '../globals.css'

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AI Engineering",
  "url": "https://ai-engineering.at",
  "logo": "https://wiki.ai-engineering.at/android-chrome-512x512.png",
  "description": "Sovereign AI Platform for DACH SMEs — local AI systems, GDPR-compliant, auditable, production-ready.",
  "email": "info@ai-engineering.at",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "AT"
  },
  "sameAs": [
    "https://www.ai-engineering.at",
    "https://wiki.ai-engineering.at"
  ]
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "AI Engineering Wiki",
  "url": "https://wiki.ai-engineering.at",
  "description": "Deutschsprachige Wissensbasis für AI Engineering, Sovereign AI und EU AI Act Compliance. 100+ kostenlose Artikel.",
  "inLanguage": ["de", "en"],
  "publisher": {
    "@type": "Organization",
    "name": "AI Engineering",
    "url": "https://ai-engineering.at"
  }
}

/**
 * theme-color #020617 (W1): ohne ihn bleibt der Tab-Streifen in Safari/Chrome
 * hell — und das dunkle Favicon stand in einem weißen Quadrat (Joes Augen §1).
 * Gemessen vorher: 0 von 182 Seiten mit <meta name="theme-color">.
 */
export const viewport: Viewport = {
  themeColor: '#020617',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  title: {
    default: 'AI Engineering Wiki — Agentic Engineering Knowledge Base',
    template: '%s | AI Engineering Wiki',
  },
  description:
    'The knowledge base for Agentic Engineering, Agent Orchestration, Multi-Agent Systems and GDPR-compliant AI stacks.',
  metadataBase: new URL('https://wiki.ai-engineering.at'),
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    siteName: 'AI Engineering Wiki',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'AI Engineering Wiki' }],
  },
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
}

export default function EnRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-[#4262FF] focus:text-white focus:px-4 focus:py-2 focus:rounded">
          Skip to content
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
