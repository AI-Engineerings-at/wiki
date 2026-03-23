import { ArticleCard } from '../../components/ArticleCard'
import { getCategoryBySlug } from '../../lib/articles'

export const metadata = {
  title: 'Security | AI Engineering Wiki',
  description:
    'Security für lokale AI-Infrastruktur: API-Keys, Firewall, Netzwerk-Segmentation und Backup-Strategien (3-2-1).',
}

export default function SecurityPage() {
  const category = getCategoryBySlug('security')
  const articles = category?.articles ?? []

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Security</h1>
        <p className="text-slate-400 mt-2">
          Sicherheit für lokale AI-Infrastruktur — von API-Keys bis Backup.
        </p>
      </div>

      <figure className="my-6 -mx-4 md:-mx-0">
        <img src="/images/generated/hero-security-keys.png" alt="Security für AI-Infrastruktur" className="rounded-xl border border-white/10 w-full" />
      </figure>

      <div className="space-y-4">
        {articles.map((article) => (
          <ArticleCard key={article.href} article={article} />
        ))}
      </div>
    </div>
  )
}
