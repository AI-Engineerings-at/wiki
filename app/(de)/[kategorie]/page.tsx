import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CategoryList } from '../../../components/CategoryList'
import { mdxEntries, mdxOnlyCategories } from '../../../lib/content'
import { alternatesFor } from '../../../lib/alternates'

/**
 * Kategorie-Seite für die MDX-Kategorien ohne eigene TSX-Seite
 * (ai-tools, architektur, ethik, kategorien, konzepte, mlops, sicherheit,
 * skills, tutorials, vergleiche — 10 von 15 DE-Kategorien hatten bis
 * 2026-08-21 keine einzige sichtbare Seite). Liste aus dem Gesamtindex.
 */

export const dynamicParams = false

type Props = { params: { kategorie: string } }

export function generateStaticParams() {
  return mdxOnlyCategories('de').map((c) => ({ kategorie: c.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const cat = mdxOnlyCategories('de').find((c) => c.slug === params.kategorie)
  if (!cat) return {}
  return {
    title: cat.label,
    description: `${cat.count} Artikel zu ${cat.label} — generiert im März 2026, redaktionell nicht geprüft.`,
    alternates: alternatesFor('/' + cat.slug),
  }
}

export default function CategoryPageDe({ params }: Props) {
  const cat = mdxOnlyCategories('de').find((c) => c.slug === params.kategorie)
  if (!cat) notFound()
  const entries = mdxEntries('de')
    .filter((e) => e.category === cat.slug)
    .sort((a, b) => a.title.localeCompare(b.title))
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white">{cat.label}</h1>
        <p className="mt-3 text-slate-400">
          {entries.length} Artikel in dieser Kategorie — generiert im März 2026, redaktionell nicht geprüft.
          Jeder Artikel trägt diese Kennzeichnung im Kopf.
        </p>
      </header>
      <CategoryList entries={entries} lang="de" />
    </div>
  )
}
