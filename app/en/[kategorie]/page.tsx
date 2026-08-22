import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CategoryList } from '../../../components/CategoryList'
import { mdxEntries, mdxOnlyCategories } from '../../../lib/content'
import { alternatesFor } from '../../../lib/alternates'

/** EN-Gegenstück zu app/(de)/[kategorie]/page.tsx — Kategorien ohne TSX-Seite. */

export const dynamicParams = false

type Props = { params: { kategorie: string } }

export function generateStaticParams() {
  return mdxOnlyCategories('en').map((c) => ({ kategorie: c.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const cat = mdxOnlyCategories('en').find((c) => c.slug === params.kategorie)
  if (!cat) return {}
  return {
    title: cat.label,
    description: `${cat.count} articles on ${cat.label} — generated in March 2026, not editorially reviewed.`,
    alternates: alternatesFor('/en/' + cat.slug),
  }
}

export default function CategoryPageEn({ params }: Props) {
  const cat = mdxOnlyCategories('en').find((c) => c.slug === params.kategorie)
  if (!cat) notFound()
  const entries = mdxEntries('en')
    .filter((e) => e.category === cat.slug)
    .sort((a, b) => a.title.localeCompare(b.title))
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white">{cat.label}</h1>
        <p className="mt-3 text-slate-400">
          {entries.length} articles in this category — generated in March 2026, not editorially reviewed.
          Every article carries this label in its header.
        </p>
      </header>
      <CategoryList entries={entries} lang="en" />
    </div>
  )
}
