import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'AI Engineering Wiki — Kostenloses Wissen ueber lokale KI, DSGVO und Automatisierung',
    template: '%s | AI Engineering Wiki',
  },
  description:
    'Kostenloses Wissen ueber lokale KI, DSGVO-Compliance und Automatisierung. Fuer DACH-KMUs, die lokale AI-Systeme sauber einfuehren wollen.',
  openGraph: {
    locale: 'de_AT',
  },
}

export default function DeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div lang="de">{children}</div>
}
