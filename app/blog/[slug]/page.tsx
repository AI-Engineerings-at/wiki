import { WikiLink as Link } from '../../../components/WikiLink'
import Image from 'next/image'
import { Metadata } from 'next'
import {
  getAllBlogSlugs,
  getAllBlogPosts,
  getBlogPostBySlug,
  renderMarkdown,
} from '../../../lib/blog'

interface BlogPostPageProps {
  params: { slug: string }
}

// Duplicated from app/blog/page.tsx so hero images work on detail pages
const blogImages: Record<string, string> = {
  '2026-03-08-31-docker-services-monitoring': '/images/blog/31-docker-services-monitoring.png',
  '2026-03-08-36-n8n-workflows': '/images/blog/36-n8n-workflows.png',
  '2026-03-09-49-custom-skills': '/images/blog/49-custom-skills.png',
  '2026-03-09-agent-team-architecture': '/images/blog/agent-team-architecture.png',
  '2026-03-07-content-pipeline-launch': '/images/blog/content-pipeline-launch.png',
  '2026-03-08-content-pipeline-rss-to-social': '/images/blog/content-pipeline-launch.png',
  '2026-03-08-dsgvo-konformer-ai-stack': '/images/blog/dsgvo-konformer-ai-stack.png',
  '2026-03-08-eu-ai-act-was-unternehmen-tun-muessen': '/images/blog/eu-ai-act-was-unternehmen-tun-muessen.png',
  '2026-03-11-eu-ai-act-5-pflichten-die-jetzt-schon-gelten': '/images/blog/eu-ai-act-was-unternehmen-tun-muessen.png',
  '2026-03-08-ollama-self-hosted-gotchas': '/images/blog/ollama-self-hosted-gotchas.png',
  '2026-03-08-prompt-injection-self-hosted-ai': '/images/blog/prompt-injection-self-hosted-ai.png',
  '2026-03-09-skill-creation-best-practices': '/images/blog/skill-creation-best-practices.png',
  '2026-03-12-docker-grundlagen-fuer-ai': '/images/generated/hero-ai-docker.png',
  '2026-03-12-docker-basics-for-ai': '/images/generated/hero-ai-docker.png',
  '2026-03-12-install-ollama-step-by-step': '/images/generated/hero-ai-infrastructure.png',
  '2026-03-12-ollama-installieren-schritt-fuer-schritt': '/images/generated/hero-ai-infrastructure.png',
  '2026-03-12-open-webui-erster-chatbot': '/images/generated/hero-ai-agents.png',
  '2026-03-12-open-webui-first-chatbot': '/images/generated/hero-ai-agents.png',
  '2026-03-12-terminal-basics-for-ai-developers': '/images/generated/hero-ai-terminal.png',
  '2026-03-12-terminal-grundlagen-fuer-ai': '/images/generated/hero-ai-terminal.png',
  '2026-03-12-warum-lokale-ki-statt-cloud': '/images/generated/hero-ai-cloud-vs-local.png',
  '2026-03-12-why-local-ai-instead-of-cloud': '/images/generated/hero-ai-cloud-vs-local.png',
  '2026-03-12-was-ist-ein-llm': '/images/generated/hero-ai-neural-network.png',
  '2026-03-12-what-is-a-large-language-model': '/images/generated/hero-ai-neural-network.png',
  '2026-03-12-karpathy-autoresearch-lokale-ai-forschung': '/images/generated/hero-ai-data-flow.png',
  '2026-03-12-karpathy-autoresearch-local-ai-research': '/images/generated/hero-ai-data-flow.png',
}

const tagColors: Record<string, string> = {
  'eu-ai-act': 'bg-red-500/10 text-red-400 border-red-500/20',
  'dsgvo': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'compliance': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'ollama': 'bg-green-500/10 text-green-400 border-green-500/20',
  'docker': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'n8n': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'security': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'agents': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  'local-first': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
}

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

function getRelatedPosts(currentSlug: string, currentTags: string[], limit = 3) {
  const allPosts = getAllBlogPosts()
  return allPosts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => ({
      ...p,
      relevance: p.tags.filter((t) => currentTags.includes(t)).length,
    }))
    .sort((a, b) => b.relevance - a.relevance || new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
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
  const readingTime = estimateReadingTime(post.content)
  const relatedPosts = getRelatedPosts(post.slug, post.tags)
  const heroImage = blogImages[post.slug]

  const shareUrl = `https://wiki.ai-engineering.at/blog/${post.slug}`
  const shareTitle = encodeURIComponent(post.title)
  const twitterShareUrl = `https://x.com/intent/tweet?text=${shareTitle}&url=${encodeURIComponent(shareUrl)}`
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link href="/blog" className="hover:text-blue-400 transition-colors">
          Blog
        </Link>
        <span className="text-slate-700">/</span>
        <span className="text-slate-400 truncate max-w-[300px]">{post.title}</span>
      </nav>

      {/* Hero Image */}
      {heroImage && (
        <div className="relative aspect-[21/9] overflow-hidden rounded-2xl mb-8 border border-slate-800">
          <Image
            src={heroImage}
            alt={post.title}
            fill
            sizes="100vw"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        </div>
      )}

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight">
          {post.title}
        </h1>

        {post.summary && (
          <p className="mt-4 text-lg text-slate-400 leading-relaxed max-w-2xl">
            {post.summary}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-slate-500">
          <time dateTime={post.date} className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            {post.date}
          </time>
          {post.author && (
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              {post.author}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {readingTime} Min. Lesezeit
          </span>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs font-medium px-3 py-1 rounded-full border ${tagColors[tag] || 'bg-slate-800 text-slate-400 border-slate-700'}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Divider */}
      <div className="border-t border-slate-800 mb-10" />

      {/* Content — rendered from local markdown files (trusted content, not user input) */}
      <article
        className="prose prose-lg prose-invert max-w-none
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-slate-300 prose-p:leading-relaxed
          prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-white prose-strong:font-semibold
          prose-code:text-emerald-400 prose-code:bg-slate-800/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 prose-pre:rounded-xl
          prose-blockquote:border-blue-500/50 prose-blockquote:bg-blue-500/5 prose-blockquote:rounded-r-lg prose-blockquote:py-1
          prose-li:text-slate-300
          prose-img:rounded-xl prose-img:border prose-img:border-slate-800"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* Share */}
      <div className="border-t border-slate-800 mt-12 pt-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-sm font-medium text-slate-400">Artikel teilen</span>
          <div className="flex items-center gap-3">
            <a
              href={twitterShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 border border-slate-700 px-4 py-2 rounded-lg transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              X / Twitter
            </a>
            <a
              href={linkedInShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 border border-slate-700 px-4 py-2 rounded-lg transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Wiki-internal links */}
      <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-slate-600">
        <p>Weiterfuehrende Artikel:{' '}
          <a href="/grundlagen/was-ist-ein-llm" className="text-blue-400 hover:text-blue-300">Was ist ein LLM?</a>
          {' · '}
          <a href="/tools/ai-tools-datenbank" className="text-blue-400 hover:text-blue-300">AI Tools Datenbank</a>
          {' · '}
          <a href="/lernpfad" className="text-blue-400 hover:text-blue-300">Lernpfad</a>
        </p>
        <p className="mt-2 italic text-slate-700">
          Fuer die Umsetzung gibt es <a href="https://www.ai-engineering.at" className="underline" target="_blank" rel="noopener noreferrer">Ressourcen</a> auf ai-engineering.at.
        </p>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold text-white mb-6">Verwandte Artikel</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="group block"
              >
                <article className="h-full flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all">
                  {blogImages[related.slug] ? (
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={blogImages[related.slug]}
                        alt={related.title}
                        width={800}
                        height={450}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900" />
                  )}
                  <div className="flex-1 p-4 flex flex-col">
                    <span className="text-xs text-slate-500 mb-1.5">{related.date}</span>
                    <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                      {related.title}
                    </h3>
                    <div className="flex flex-wrap gap-1 mt-auto">
                      {related.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className={`text-[10px] px-2 py-0.5 rounded-full ${tagColors[tag] || 'bg-slate-800 text-slate-400'}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back to blog */}
      <div className="mt-12 pt-8 border-t border-slate-800 text-center">
        <Link
          href="/blog"
          className="text-sm text-slate-500 hover:text-blue-400 transition-colors"
        >
          &larr; Alle Artikel anzeigen
        </Link>
      </div>
    </div>
  )
}
