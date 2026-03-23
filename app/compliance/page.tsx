import { ArticleCard } from '../../components/ArticleCard'
import { getCategoryBySlug } from '../../lib/articles'

export const metadata = {
  title: 'Compliance | AI Engineering Wiki',
  description:
    'Was du als Unternehmen tun musst wenn du KI einsetzt: DSGVO, EU AI Act, Pflichten und Checklisten — verständlich erklärt.',
}

export default function CompliancePage() {
  const category = getCategoryBySlug('compliance')
  const articles = category?.articles ?? []

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Compliance</h1>
        <p className="text-slate-400 mt-2">
          Was du rechtlich beachten musst wenn du KI im Unternehmen einsetzt — ohne Juristendeutsch.
        </p>
      </div>

      <figure className="my-6 -mx-4 md:-mx-0">
        <img src="/images/generated/hero-eu-ai-act.png" alt="EU AI Act und DSGVO Compliance" className="rounded-xl border border-white/10 w-full" />
      </figure>

      <div className="space-y-4">
        {articles.map((article) => (
          <ArticleCard key={article.href} article={article} />
        ))}
      </div>
    </div>
  )
}
