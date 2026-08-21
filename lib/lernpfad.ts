/**
 * Lernpfad (W5): Zugriff auf content/lernpfad.yaml über den generierten Index.
 * 18 Einheiten · ~98 min, Struktur aus doc/LERNPFAD-STRUKTUR-2026-08-21
 * (Didaktiker, TASK-2026-01505). Rein, ohne fs — auch im Client nutzbar.
 */

import { LERNPFAD } from './generated/index'
import { normalizePath } from './alternates'
import type { Lernpfad, LernpfadEinheit } from './index-types'

export type { Lernpfad, LernpfadEinheit } from './index-types'

export function getLernpfad(): Lernpfad {
  return LERNPFAD
}

export function einheiten(): LernpfadEinheit[] {
  return [...LERNPFAD.einheiten].sort((a, b) => a.position - b.position)
}

export function einheitBySlug(slug: string): LernpfadEinheit | undefined {
  return LERNPFAD.einheiten.find((e) => e.slug === slug)
}

/** Die Einheit, deren DE- oder EN-Route dem Pfad entspricht. */
export function einheitByPath(pathname: string): { einheit: LernpfadEinheit; lang: 'de' | 'en' } | null {
  const p = normalizePath(pathname)
  for (const e of LERNPFAD.einheiten) {
    if (e.route_de === p) return { einheit: e, lang: 'de' }
    if (e.route_en && e.route_en === p) return { einheit: e, lang: 'en' }
  }
  return null
}

/** Nächste Einheit nach Position (nicht der Nachfolger-Graph — der Pfad ist linear lesbar). */
export function naechste(e: LernpfadEinheit): LernpfadEinheit | undefined {
  return einheiten().find((x) => x.position === e.position + 1)
}

export function routeFor(e: LernpfadEinheit, lang: 'de' | 'en'): { href: string; nurDe: boolean; extern: boolean } {
  const extern = /^https?:/.test(e.route_de)
  if (lang === 'en') {
    if (e.route_en) return { href: e.route_en, nurDe: false, extern }
    return { href: e.route_de, nurDe: true, extern }
  }
  return { href: e.route_de, nurDe: false, extern }
}

/** Kopfzeile „N Artikel · ~M min" — aus den Einheiten gezählt, nicht abgeschrieben. */
export function kopfzeile(lang: 'de' | 'en'): string {
  const artikel = LERNPFAD.einheiten.filter((e) => !/^https?:/.test(e.route_de)).length
  const minuten = LERNPFAD.einheiten.reduce((s, e) => s + e.minuten, 0)
  return lang === 'en'
    ? `${LERNPFAD.einheiten.length} units · ${artikel} articles · ~${minuten} min`
    : `${LERNPFAD.einheiten.length} Einheiten · ${artikel} Artikel · ~${minuten} min`
}
