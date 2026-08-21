import { WikiLink as Link } from './WikiLink'
import { getLernpfad, einheiten, routeFor, kopfzeile } from '../lib/lernpfad'
import { getEntryByHref } from '../lib/index'

/**
 * Pfadseite /lernpfad/ und /en/learning-path/ (W5): Kopfzeile, Abschnitte,
 * Einheiten-Karten (Minuten, Voraussetzungen, Nachfolger), letzte Einheit
 * -> Hub. Server-Komponente, damit die Seite `metadata` (Titel, canonical,
 * hreflang) tragen kann — vorher 'use client' ohne beides (Lücke L3).
 *
 * Quelle: content/lernpfad.yaml, 18 Einheiten · ~98 min, über den
 * generierten Index. Nichts hier ist abgeschrieben — Zahlen werden gezählt.
 */
export function LernpfadSeite({ lang }: { lang: 'de' | 'en' }) {
  const en = lang === 'en'
  const pfad = getLernpfad()
  const list = einheiten()
  const t = en
    ? { min: 'min', req: 'Requires', next: 'Leads to', ext: 'external', onlyDe: 'only available in German', unit: 'Unit', goal: 'Learning goal', intro: 'Five sections, read in order. Prerequisites are hints, not locks — every unit can be opened directly.' }
    : { min: 'min', req: 'Voraussetzung', next: 'Führt zu', ext: 'extern', onlyDe: 'nur auf Deutsch', unit: 'Einheit', goal: 'Lernziel', intro: 'Fünf Abschnitte, der Reihe nach lesbar. Voraussetzungen sind Hinweise, keine Sperren — jede Einheit ist direkt aufrufbar.' }

  return (
    <div className="max-w-4xl">
      <header className="mb-10">
        <p className="text-xs text-blue-300 uppercase tracking-wide" data-lernpfad-kopfzeile="1">{kopfzeile(lang)}</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold text-white leading-tight">{en ? pfad.titel_en : pfad.titel_de}</h1>
        <p className="mt-4 text-slate-400 max-w-2xl">{t.intro}</p>
      </header>

      {pfad.abschnitte.map((ab) => {
        const units = list.filter((e) => e.abschnitt === ab.id)
        const minutes = units.reduce((s, e) => s + e.minuten, 0)
        return (
          <section key={ab.id} className="mb-10" aria-labelledby={`abschnitt-${ab.id}`}>
            <h2 id={`abschnitt-${ab.id}`} className="text-xl font-bold text-white mb-4">
              {en ? ab.titel_en : ab.titel_de}
              <span className="ml-3 text-sm font-normal text-slate-500">
                {units.length} {units.length === 1 ? t.unit : en ? 'units' : 'Einheiten'} · {minutes} {t.min}
              </span>
            </h2>
            <ol className="space-y-3 list-none p-0">
              {units.map((e) => {
                const r = routeFor(e, lang)
                const entry = r.extern ? undefined : getEntryByHref(r.href)
                const title = r.extern ? (en ? 'Continue in the Hub' : 'Weiter im Hub') : entry?.title || e.slug
                const href = r.extern ? r.href : r.href + '/'
                return (
                  <li key={e.slug} className="bg-slate-900 border border-slate-800 rounded-xl p-5" data-lernpfad-einheit={e.slug}>
                    <div className="flex items-start gap-4">
                      <span className="w-9 h-9 shrink-0 rounded-full bg-blue-500/10 text-blue-400 font-bold flex items-center justify-center text-sm">{e.position}</span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-semibold text-white">
                          {r.extern ? (
                            <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">{title} ↗</a>
                          ) : (
                            <Link href={href} className="hover:text-blue-400">{title}</Link>
                          )}
                          <span className="ml-2 text-xs font-normal text-slate-500">~{e.minuten} {t.min}{r.extern ? ` · ${t.ext}` : ''}{r.nurDe ? ` · ${t.onlyDe}` : ''}</span>
                        </h3>
                        <p className="mt-1 text-sm text-slate-300"><span className="text-slate-500">{t.goal}:</span> {en ? e.lernziel_en : e.lernziel_de}</p>
                        {(e.voraussetzungen.length > 0 || e.nachfolger.length > 0) && (
                          <p className="mt-2 text-xs text-slate-500">
                            {e.voraussetzungen.length > 0 && <span>{t.req}: {e.voraussetzungen.join(', ')}</span>}
                            {e.voraussetzungen.length > 0 && e.nachfolger.length > 0 && <span> · </span>}
                            {e.nachfolger.length > 0 && <span>{t.next}: {e.nachfolger.join(', ')}</span>}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
          </section>
        )
      })}
    </div>
  )
}
