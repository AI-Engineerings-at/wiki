'use client'

import { usePathname } from 'next/navigation'

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

function getConfig(pathname: string): CtaConfig {
  const isEn = pathname === '/en' || pathname.startsWith('/en/')
  const localPath = isEn ? pathname.replace(/^\/en(\/|$)/, '/') : pathname

  const isTools = localPath === '/tools' || localPath.startsWith('/tools/')
  const isCompliance = localPath === '/compliance' || localPath.startsWith('/compliance/')

  const playbookHref = 'https://buy.stripe.com/8x28wP7VBbapbdQgs4fQI00'
  const n8nHref = 'https://buy.stripe.com/8x2fZh7VB2DT2Hk1xafQI01'
  const dsgvoHref = 'https://buy.stripe.com/bJe7sLb7N92ha9MejWfQI02'
  const productsHref = 'https://www.ai-engineering.at/products'

  const base: Pick<
    CtaConfig,
    'secondaryHref' | 'secondaryLabel' | 'trustTitle' | 'trustItems' | 'legalNote'
  > = isEn
    ? {
        secondaryHref: productsHref,
        secondaryLabel: 'View all products',
        trustTitle: 'Why AI Engineering',
        trustItems: [
          'Local and self-hosted by default',
          'Documented and auditable',
          'Built from our own runtime',
          'Made in Austria',
        ],
        legalNote: 'Not legal advice.',
      }
    : {
        secondaryHref: productsHref,
        secondaryLabel: 'Alle Produkte ansehen',
        trustTitle: 'Warum AI Engineering',
        trustItems: [
          'Lokal und self-hosted gedacht',
          'Dokumentiert und auditierbar',
          'Aus eigener Runtime entwickelt',
          'Made in Austria',
        ],
        legalNote: 'Kein Ersatz für Rechtsberatung.',
      }

  if (isTools) {
    return {
      ...base,
      headline: isEn
        ? 'Next step: ship workflows that stay operable'
        : 'Naechster Schritt: Workflows sauber in Betrieb bringen',
      body: isEn
        ? 'Use proven n8n patterns, templates and integrations for workflows that stay local, documented, and auditable.'
        : 'Nutze bewaehrte n8n-Patterns, Templates und Integrationen für Workflows, die lokal, dokumentiert und auditierbar bleiben.',
      primaryHref: n8nHref,
      primaryLabel: isEn ? 'View n8n Bundle' : 'n8n Bundle ansehen',
    }
  }

  if (isCompliance) {
    return {
      ...base,
      headline: isEn
        ? 'Next step: operationalize compliance'
        : 'Naechster Schritt: Compliance in den Betrieb bringen',
      body: isEn
        ? 'Use ready-to-run GDPR templates, checklists and practical guidance for AI systems that need documentation and auditability.'
        : 'Nutze fertige DSGVO-Templates, Checklisten und Praxis-Guides für AI-Systeme, die dokumentiert und auditierbar sein muessen.',
      primaryHref: dsgvoHref,
      primaryLabel: isEn ? 'View GDPR Bundle' : 'DSGVO Bundle ansehen',
    }
  }

  return {
    ...base,
    headline: isEn
      ? 'Next step: move from knowledge to implementation'
      : 'Naechster Schritt: vom Wissen in die Umsetzung',
    body: isEn
      ? 'If you want more than theory: setups, workflows and templates from real operations for teams that want local, documented AI systems.'
      : 'Wenn du mehr willst als Theorie: Setups, Workflows und Vorlagen aus dem echten Betrieb für Teams, die lokale und dokumentierte AI-Systeme wollen.',
    primaryHref: playbookHref,
    primaryLabel: isEn ? 'View AI-Stack Playbook - EUR 49' : 'AI-Stack Playbook ansehen - EUR 49',
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
