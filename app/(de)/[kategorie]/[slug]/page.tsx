import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MdxArticleView } from '../../../../components/MdxArticleView'
import { getMdxArticle, mdxEntries, renderMdx } from '../../../../lib/content'
import { alternatesFor } from '../../../../lib/alternates'

/**
 * Dynamische Route für die MDX-Artikel unter content/de (E43).
 * Jede Kombination aus generateStaticParams wird im Export zu
 * out/<kategorie>/<slug>/index.html. Kollidiert ein Slug mit einer
 * app/(de)/<kategorie>/<slug>/page.tsx, gewinnt die TSX-Seite — der Index
 * (scripts/build-index.js) lässt diese Einträge weg.
 */

export const dynamicParams = false

type Props = { params: { kategorie: string; slug: string } }

export function generateStaticParams() {
  return mdxEntries('de').map((e) => {
    const [, kategorie, slug] = e.href.split('/')
    return { kategorie, slug }
  })
}

export function generateMetadata({ params }: Props): Metadata {
  const a = getMdxArticle('de', params.kategorie, params.slug)
  if (!a) return {}
  return {
    title: a.title,
    description: a.description,
    alternates: alternatesFor(a.href),
    openGraph: {
      title: a.title,
      description: a.description,
      type: 'article',
      // Hero-Motiv als OG-Bild (E44/W8b). Keine OG-Route im Repo (find app -name
      // 'opengraph-image*' -> 0 Treffer), also kein Format-Filter: WebP ist erlaubt.
      ...(a.image ? { images: [{ url: a.image, width: 1344, height: 768, type: 'image/webp' }] } : {}),
    },
  }
}

export default async function MdxPageDe({ params }: Props) {
  const a = getMdxArticle('de', params.kategorie, params.slug)
  if (!a) notFound()
  const { html } = await renderMdx(a)
  return <MdxArticleView article={a} html={html} />
}
