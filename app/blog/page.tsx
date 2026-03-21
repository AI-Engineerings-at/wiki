import Link from 'next/link'
import { getAllBlogPosts } from '../../lib/blog'

export const metadata = {
  title: 'Blog | AI Engineering Wiki',
  description:
    'Artikel zu lokalem AI-Stack, Automation, DSGVO-Compliance und Agent Orchestration.',
}

export default function BlogIndex() {
  const posts = getAllBlogPosts()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Blog</h1>
        <p className="text-gray-400 mt-2">
          Praxis-Artikel aus unserem Alltag mit lokalem AI-Stack, Automation und
          DSGVO-Compliance.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500">Noch keine Blog-Artikel vorhanden.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-6 bg-gray-900 border border-gray-700 rounded-lg hover:border-[#4262FF] transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-white group-hover:text-[#4262FF] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">{post.summary}</p>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
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
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs text-gray-600 whitespace-nowrap">
                    {post.date}
                  </span>
                  {post.author && (
                    <p className="text-xs text-gray-600 mt-1">{post.author}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
