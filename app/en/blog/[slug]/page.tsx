import { Metadata } from 'next'
import { BlogPostPage } from '../../../../components/BlogPostPage'
import { getAllBlogPosts, getBlogPostBySlug } from '../../../../lib/blog'
import { alternatesFor } from '../../../../lib/alternates'

interface Props {
  params: { slug: string }
}

export const dynamicParams = false

/** Nur englische Posts (Frontmatter lang: en) — vorher lagen sie unter /blog/ mit lang="de". */
export function generateStaticParams() {
  return getAllBlogPosts('en').map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getBlogPostBySlug(params.slug)
  return {
    title: `${post.title} | AI Engineering Blog`,
    description: post.summary,
    alternates: alternatesFor(`/en/blog/${params.slug}`),
  }
}

export default function Page({ params }: Props) {
  return <BlogPostPage slug={params.slug} lang="en" />
}
