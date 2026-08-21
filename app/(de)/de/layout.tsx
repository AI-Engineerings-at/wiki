import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'AI Engineering Wiki — Kostenloses Wissen über lokale KI, DSGVO und Automatisierung',
    template: '%s | AI Engineering Wiki',
  },
  description:
    'Kostenloses Wissen über lokale KI, DSGVO-Compliance und Automatisierung. Für DACH-KMUs, die lokale AI-Systeme sauber einführen wollen.',
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
