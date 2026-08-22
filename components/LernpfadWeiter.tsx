'use client'

import { usePathname } from 'next/navigation'
import { einheitByPath, naechste, routeFor, getLernpfad } from '../lib/lernpfad'
import { getEntryByHref } from '../lib/index'

/**
 * „Weiter im Lernpfad: <nächste Einheit>" am Ende jedes Pfad-Artikels (W5).
 * Liest content/lernpfad.yaml (über den generierten Index). Auf Seiten, die
 * keine Einheit sind, rendert es nichts.
 */
export function LernpfadWeiter() {
  const pathname = usePathname() || '/'
  const hit = einheitByPath(pathname)
  if (!hit) return null
  const { einheit, lang } = hit
  const next = naechste(einheit)
  const en = lang === 'en'
  const total = getLernpfad().einheiten.length
  const pfadHref = en ? '/en/learning-path/' : '/lernpfad/'

  return (
    <aside className="mt-12 border border-blue-500/30 bg-blue-500/5 rounded-2xl p-6" aria-label={en ? 'Learning path' : 'Lernpfad'} data-lernpfad-weiter="1">
      <div className="text-xs text-blue-300 uppercase tracking-wide">
        {en ? 'Learning path' : 'Lernpfad'} · {en ? 'unit' : 'Einheit'} {einheit.position} {en ? 'of' : 'von'} {total}
      </div>
      <p className="mt-2 text-sm text-slate-300">{en ? einheit.lernziel_en : einheit.lernziel_de}</p>
      {next ? (
        (() => {
          const r = routeFor(next, lang)
          // Der Knopf zeigte bisher den Slug ("→ ki-unternehmen"). Der Titel steht
          // im Gesamtindex; fehlt er dort, bleibt der Zusatz weg statt Slug (NN3).
          const ziel = r.extern
            ? (en ? 'Continue in the Hub' : 'Weiter im Hub')
            : getEntryByHref(r.href)?.title || ''
          const label = en ? `Next in the learning path: unit ${next.position}` : `Weiter im Lernpfad: Einheit ${next.position}`
          return (
            <p className="mt-4">
              <a
                href={r.extern ? r.href : r.href.endsWith('/') ? r.href : r.href + '/'}
                className="btn-primary inline-block"
                {...(r.extern ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {ziel ? `${label} → ${ziel}` : label}
              </a>
              {r.nurDe && <span className="ml-3 text-xs text-slate-500">{en ? 'only available in German' : 'nur auf Deutsch'}</span>}
            </p>
          )
        })()
      ) : (
        <p className="mt-4 text-sm text-slate-400">{en ? 'This is the last unit.' : 'Das ist die letzte Einheit.'}</p>
      )}
      <p className="mt-3 text-xs">
        <a href={pfadHref} className="text-slate-500 hover:text-blue-400">{en ? 'Show the whole path' : 'Ganzen Pfad anzeigen'}</a>
      </p>
    </aside>
  )
}
