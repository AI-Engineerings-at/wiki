import { ArticleCard } from '../../components/ArticleCard'
import { getCategoryBySlug } from '../../lib/articles'

export const metadata = {
  title: 'Patterns | AI Engineering Wiki',
  description:
    'Erprobte Agent-Orchestration Patterns aus der Praxis: Memory Management, Task Delegation, Safety Hooks und Monitoring.',
}

export default function PatternsPage() {
  const category = getCategoryBySlug('patterns')
  const articles = category?.articles ?? []

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Patterns</h1>
        <p className="text-slate-400 mt-2">
          Erprobte Orchestration-Patterns für Multi-Agent Systeme in der Praxis.
        </p>
      </div>

      <figure className="my-6 -mx-4 md:-mx-0">
        <img src="/images/generated/hero-agent-orchestration.png" alt="Agent Orchestration Patterns" className="rounded-xl border border-white/10 w-full" />
      </figure>

      <div className="space-y-4">
        {articles.map((article) => (
          <ArticleCard key={article.href} article={article} />
        ))}
      </div>
    </div>
  )
}
