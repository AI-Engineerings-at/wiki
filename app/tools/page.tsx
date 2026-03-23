import { ArticleCard } from '../../components/ArticleCard'
import { getCategoryBySlug } from '../../lib/articles'

export const metadata = {
  title: 'Tools & Infrastruktur | AI Engineering Wiki',
  description:
    'Die Werkzeuge die du brauchst: KI installieren, automatisieren, überwachen. Schritt-für-Schritt Anleitungen.',
}

export default function ToolsPage() {
  const category = getCategoryBySlug('tools')
  const articles = category?.articles ?? []

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Tools & Infrastruktur</h1>
        <p className="text-slate-400 mt-2">
          Die Werkzeuge die du brauchst — mit Anleitungen die auch ohne IT-Studium funktionieren.
        </p>
      </div>

      <figure className="my-6 -mx-4 md:-mx-0">
        <img src="/images/generated/hero-n8n-automation-v2.png" alt="Tools und Frameworks für den lokalen AI-Stack" className="rounded-xl border border-white/10 w-full" />
      </figure>

      <div className="space-y-4">
        {articles.map((article) => (
          <ArticleCard key={article.href} article={article} />
        ))}
      </div>
    </div>
  )
}
