import Link from 'next/link'
import { Metadata } from 'next'
import {
  getAllBlogSlugs,
  getBlogPostBySlug,
  renderMarkdown,
} from '../../../lib/blog'

interface BlogPostPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getBlogPostBySlug(params.slug)
  return {
    title: `${post.title} | AI Engineering Blog`,
    description: post.summary,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug)
  const html = await renderMarkdown(post.content)

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Back link */}
      <Link
        href="/blog"
        className="text-sm text-gray-500 hover:text-blue-400 transition-colors"
      >
        &larr; Alle Artikel
      </Link>

      {/* Header */}
      <header>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
          <time dateTime={post.date}>{post.date}</time>
          {post.author && <span>von {post.author}</span>}
        </div>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-slate-800 text-blue-400 px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <article
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-2xl p-6 mt-12">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">
              Lokaler AI-Stack aufbauen?
            </h3>
            <p className="text-slate-300">
              Unser Playbook zeigt Schritt für Schritt, wie du LLMs, Automation
              und Monitoring auf eigener Hardware betreibst — DSGVO-konform.
            </p>
          </div>
          <div className="shrink-0">
            <a
              href="https://www.ai-engineering.at"
              className="inline-block bg-[#4262FF] hover:bg-[#3550DD] text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
            >
              Produkte ansehen
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
