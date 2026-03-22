import Link from 'next/link'
import Image from 'next/image'
import { getAllBlogPosts } from '../../lib/blog'

export const metadata = {
  title: 'Blog | AI Engineering Wiki',
  description:
    'Praxis-Artikel zu lokalem AI-Stack, Automation, DSGVO-Compliance und Agent Orchestration.',
}

// Map blog slugs to available images
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
}

const tagColors: Record<string, string> = {
  'eu-ai-act': 'bg-red-500/10 text-red-400',
  'dsgvo': 'bg-purple-500/10 text-purple-400',
  'compliance': 'bg-orange-500/10 text-orange-400',
  'ollama': 'bg-green-500/10 text-green-400',
  'docker': 'bg-blue-500/10 text-blue-400',
  'n8n': 'bg-cyan-500/10 text-cyan-400',
  'security': 'bg-yellow-500/10 text-yellow-400',
  'agents': 'bg-indigo-500/10 text-indigo-400',
  'local-first': 'bg-emerald-500/10 text-emerald-400',
}

export default function BlogIndex() {
  const posts = getAllBlogPosts()
  const featured = posts[0]
  const rest = posts.slice(1)

  // Group by category
  const compliancePosts = posts.filter(p => p.tags.some(t => ['eu-ai-act', 'dsgvo', 'compliance'].includes(t)))
  const techPosts = posts.filter(p => p.tags.some(t => ['docker', 'ollama', 'n8n', 'grafana'].includes(t)))

  return (
    <div className="space-y-12">
      {/* Hero */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Blog</h1>
        <p className="text-slate-400 max-w-2xl">
          Praxis-Artikel aus echtem Betrieb — lokaler AI-Stack, DSGVO-Compliance,
          Agent Orchestration und Automatisierung. Keine Theorie, nur was funktioniert.
        </p>
        <div className="flex gap-4 mt-4 text-sm text-slate-500">
          <span>{posts.length} Artikel</span>
          <span>DE + EN</span>
        </div>
      </div>

      {/* Featured Post */}
      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="block group"
        >
          <div className="relative overflow-hidden rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all">
            {blogImages[featured.slug] && (
              <div className="relative aspect-[21/9] overflow-hidden">
                <Image
                  src={blogImages[featured.slug]}
                  alt={featured.title}
                  fill
                  sizes="100vw"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
              </div>
            )}
            <div className={`${blogImages[featured.slug] ? 'absolute bottom-0 left-0 right-0' : ''} p-8`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                  NEUESTER ARTIKEL
                </span>
                <span className="text-xs text-slate-500">{featured.date}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                {featured.title}
              </h2>
              <p className="text-slate-400 text-sm max-w-2xl">{featured.summary}</p>
            </div>
          </div>
        </Link>
      )}

      {/* Quick Filter Tags */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-slate-500 py-1">Themen:</span>
        {['eu-ai-act', 'dsgvo', 'ollama', 'docker', 'n8n', 'security', 'agents', 'local-first'].map(tag => (
          <span
            key={tag}
            className={`text-xs px-3 py-1 rounded-full ${tagColors[tag] || 'bg-slate-800 text-slate-400'}`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* All Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block group"
          >
            <article className="h-full flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all">
              {/* Image */}
              {blogImages[post.slug] ? (
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={blogImages[post.slug]}
                    alt={post.title}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <span className="text-4xl opacity-20">
                    {post.tags.includes('eu-ai-act') || post.tags.includes('dsgvo') ? '⚖️' :
                     post.tags.includes('ollama') ? '🦙' :
                     post.tags.includes('docker') ? '🐳' :
                     post.tags.includes('n8n') ? '⚡' :
                     post.tags.includes('security') ? '🛡️' :
                     post.tags.includes('agents') ? '🤖' : '📝'}
                  </span>
                </div>
              )}

              {/* Content */}
              <div className="flex-1 p-5 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-slate-500">{post.date}</span>
                  {post.tags[0] && (
                    <span className={`text-xs px-2 py-0.5 rounded ${tagColors[post.tags[0]] || 'bg-slate-800 text-slate-400'}`}>
                      {post.tags[0]}
                    </span>
                  )}
                </div>
                <h2 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-slate-400 line-clamp-2 flex-1">{post.summary}</p>
                <div className="mt-4 text-xs text-blue-400 font-medium">
                  Weiterlesen &rarr;
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}
