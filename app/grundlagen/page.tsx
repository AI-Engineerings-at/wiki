import { ArticleCard } from '../../components/ArticleCard'
import { getCategoryBySlug } from '../../lib/articles'

export const metadata = {
  title: 'Grundlagen | AI Engineering Wiki',
  description:
    'Die Basis: Was ist KI, warum lokal statt Cloud, was kostet es wirklich — und wie baust du dein erstes System auf.',
}

export default function GrundlagenPage() {
  const category = getCategoryBySlug('grundlagen')
  const articles = category?.articles ?? []

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Grundlagen</h1>
        <p className="text-slate-400 mt-2">
          Was KI kann, was sie kostet, und wie du sie sinnvoll einsetzt — verständlich erklärt.
        </p>
      </div>

      <figure className="my-6 -mx-4 md:-mx-0">
        <img src="/images/generated/hero-was-ist-llm.png" alt="KI Grundlagen — LLMs, Agents, lokale Systeme" className="rounded-xl border border-white/10 w-full" />
      </figure>

      <div className="space-y-4">
        {articles.map((article) => (
          <ArticleCard key={article.href} article={article} />
        ))}
      </div>
    </div>
  )
}
