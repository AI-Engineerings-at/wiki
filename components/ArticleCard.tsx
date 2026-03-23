import { WikiLink as Link } from './WikiLink'
import Image from 'next/image'
import type { Article } from '../lib/articles'

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={article.href}
      className="flex items-start gap-4 p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
    >
      {article.thumbnail ? (
        <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-800">
          <Image
            src={article.thumbnail}
            alt={article.title}
            width={64}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-16 h-12 rounded-lg shrink-0 bg-slate-800 flex items-center justify-center text-2xl">
          {getCategoryEmoji(article.category)}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h2 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
          {article.title}
        </h2>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{article.description}</p>
        <span className="text-xs text-slate-600 mt-1 block">{article.date}</span>
      </div>
    </Link>
  )
}

function getCategoryEmoji(category: string): string {
  const map: Record<string, string> = {
    grundlagen: '\u{1F527}',
    compliance: '\u{1F6E1}',
    tools: '\u2699\uFE0F',
    patterns: '\u{1F504}',
    security: '\u{1F512}',
    papers: '\u{1F4C4}',
    oesterreich: '\u{1F1E6}\u{1F1F9}',
    downloads: '\u{1F4E5}',
  }
  return map[category] || '\u{1F4DD}'
}
