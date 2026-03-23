import { ArticleCard } from '../../components/ArticleCard'
import { getCategoryBySlug } from '../../lib/articles'

export const metadata = {
  title: 'AI Papers | AI Engineering Wiki',
  description:
    'Die wichtigsten Papers zu LLMs, RAG, Agents und AI Safety — auf Deutsch zusammengefasst und verständlich erklärt.',
}

export default function PapersPage() {
  const category = getCategoryBySlug('papers')
  const articles = category?.articles ?? []

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">AI Papers — Wichtige Forschung verständlich erklärt</h1>
        <p className="text-slate-400 mt-2">
          Die wichtigsten Papers zu LLMs, RAG, Agents und AI Safety — auf Deutsch zusammengefasst.
        </p>
      </div>

      <figure className="my-6 -mx-4 md:-mx-0">
        <img src="/images/generated/hero-papers-research-v2.png" alt="AI Research Papers" className="rounded-xl border border-white/10 w-full" />
      </figure>

      <div className="space-y-4">
        {articles.map((article) => (
          <ArticleCard key={article.href} article={article} />
        ))}
      </div>
    </div>
  )
}
