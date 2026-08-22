import { WikiLink as Link } from './WikiLink'
import type { IndexEntry } from '../lib/index-types'

/** Artikelliste einer Kategorie — aus dem Gesamtindex, nicht aus einer Hand-Liste. */
export function CategoryList({ entries, lang }: { entries: IndexEntry[]; lang: 'de' | 'en' }) {
  const en = lang === 'en'
  return (
    <ul className="grid sm:grid-cols-2 gap-4 list-none p-0">
      {entries.map((e) => (
        <li key={e.href}>
          <Link
            href={e.href}
            className="block h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-colors group"
          >
            {e.image && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={e.image}
                alt=""
                width={1344}
                height={768}
                loading="lazy"
                decoding="async"
                data-thumb="1"
                className="w-full aspect-[16/9] object-cover border-b border-slate-800"
              />
            )}
            <div className="p-4">
            <h2 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{e.title}</h2>
            {e.description && <p className="text-xs text-slate-400 mt-1 line-clamp-3">{e.description}</p>}
            <span className="text-[11px] text-slate-600 mt-2 block">
              {e.date || (en ? 'no date' : 'ohne Datum')}
              {e.source === 'mdx' && (en ? ' · generated, not reviewed' : ' · generiert, nicht geprüft')}
            </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
