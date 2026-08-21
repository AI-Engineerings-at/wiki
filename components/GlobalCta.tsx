'use client'

import { usePathname } from 'next/navigation'
import { isEnglishPath } from '../lib/alternates'

/**
 * Überleitung am Ende jeder Seite: Wiki -> Lernpfad -> Hub.
 *
 * Vorher zeigten alle drei Varianten (allgemein, Tools, Compliance) auf die
 * Produktseite von ai-engineering.at — dort verkauft noch Stripe, obwohl der
 * Verkauf deaktiviert ist (E35). Ein Wiki-Artikel, der auf eine tote Kasse
 * zeigt, ist schlimmer als einer ohne Weiterführung.
 *
 * Jetzt eine Überleitung statt drei Verkaufstexte: der Lernpfad bringt die
 * Inhalte in Reihenfolge, der Hub führt die geprüften Bausteine. Keine
 * Preise, keine Produktnamen.
 */

type CtaConfig = {
  headline: string
  body: string
  primaryHref: string
  primaryLabel: string
  secondaryHref: string
  secondaryLabel: string
  trustTitle: string
  trustItems: string[]
  legalNote: string
}

const HUB_HREF = 'https://hub.ai-engineering.at/'

function getConfig(pathname: string): CtaConfig {
  const isEn = isEnglishPath(pathname)

  if (isEn) {
    return {
      headline: 'Continue the learning path',
      body:
        'The learning path puts these articles in order, and the Hub carries the ' +
        'building blocks we have checked in our own operations.',
      primaryHref: '/en/learning-path/',
      primaryLabel: 'Open the learning path',
      secondaryHref: HUB_HREF,
      secondaryLabel: 'Open the Hub',
      trustTitle: 'Why AI Engineering',
      trustItems: [
        'Local and self-hosted',
        'Documented and verifiable',
        'From our own operations',
        'Made in Austria',
      ],
      legalNote: 'Not legal advice.',
    }
  }

  return {
    headline: 'Weiter im Lernpfad',
    body:
      'Der Lernpfad bringt diese Artikel in eine Reihenfolge, und der Hub führt ' +
      'die Bausteine, die wir im eigenen Betrieb geprüft haben.',
    primaryHref: '/lernpfad/',
    primaryLabel: 'Zum Lernpfad',
    secondaryHref: HUB_HREF,
    secondaryLabel: 'Zum Hub',
    trustTitle: 'Warum AI Engineering',
    trustItems: [
      'Lokal und selbst gehostet',
      'Dokumentiert und prüfbar',
      'Aus eigenem Betrieb',
      'Made in Austria',
    ],
    legalNote: 'Kein Ersatz für Rechtsberatung.',
  }
}

export function GlobalCta() {
  const pathname = usePathname() || '/'
  const config = getConfig(pathname)

  return (
    <section className="mt-16 bg-slate-900/50 border border-slate-800 rounded-3xl p-8">
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-white">{config.headline}</h2>
          <p className="text-slate-300 mt-3 max-w-2xl">{config.body}</p>

          <div className="flex flex-wrap gap-3 mt-6">
            <a href={config.primaryHref} className="btn-primary">
              {config.primaryLabel}
            </a>
            <a href={config.secondaryHref} className="btn-secondary">
              {config.secondaryLabel}
            </a>
          </div>
        </div>

        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6">
          <div className="text-sm text-slate-400">{config.trustTitle}</div>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {config.trustItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="mt-6 text-xs text-slate-500">{config.legalNote}</div>
        </div>
      </div>
    </section>
  )
}
