import { Metadata } from 'next'
import { BlogPostPage } from '../../../../components/BlogPostPage'
import { getAllBlogPosts, getBlogPostBySlug } from '../../../../lib/blog'
import { alternatesFor } from '../../../../lib/alternates'

interface Props {
  params: { slug: string }
}

export const dynamicParams = false

/** Nur deutsche Posts (Frontmatter lang != en); die englischen liegen unter /en/blog/. */
export function generateStaticParams() {
  return getAllBlogPosts('de').map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getBlogPostBySlug(params.slug)
  return {
    title: `${post.title} | AI Engineering Blog`,
    description: post.summary,
    // canonical immer; hreflang nur bei Pendant (Paartabelle aus dem Index)
    alternates: alternatesFor(`/blog/${params.slug}`),
  }
}

export default function Page({ params }: Props) {
  return <BlogPostPage slug={params.slug} lang="de" />
}
