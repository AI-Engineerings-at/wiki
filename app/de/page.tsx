import { WikiLink as Link } from '../../components/WikiLink'
import { categories, getRecentArticles, getPopularArticles } from '../../lib/articles'

export const metadata = {
  title: 'AI Engineering Wiki — Kostenloses Wissen ueber lokale KI, DSGVO und Automatisierung',
  description:
    'Kostenloses Wissen ueber lokale KI, DSGVO-Compliance und Automatisierung. Fuer DACH-KMUs, die lokale AI-Systeme sauber einfuehren wollen.',
}

/**
 * /de route — redirects to the existing German root content.
 * The German wiki content lives at the root (/) by default.
 * This /de page provides a landing page for direct /de links and SEO.
 */
export default function DeHomePage() {
  const recentArticles = getRecentArticles(5)
  const popularArticles = getPopularArticles(5)

  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="text-center py-12">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
          AI Engineering
          <span className="text-[#4262FF]"> Wiki</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-2">
          Kostenloses Wissen ueber lokale KI, DSGVO und Automatisierung
        </p>
        <p className="text-slate-400 max-w-xl mx-auto mb-8">
          Fuer KMUs im DACH-Raum, die KI nutzen wollen ohne ihre Daten aus der Hand zu geben.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#4262FF] hover:bg-[#3550DD] text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 text-sm"
        >
          Zur Startseite
        </Link>
      </div>

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Alle Kategorien</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.href}
              className="block p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-blue-500/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                  {cat.label}
                </h3>
              </div>
              <p className="text-slate-400 text-sm">{cat.description}</p>
              <p className="text-xs text-slate-600 mt-3">{cat.articles.length} Artikel</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Wichtige Seiten</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickLink href="/lernpfad" title="Lernpfad" description="Strukturiert lernen in 8 Schritten" />
          <QuickLink href="/compliance/eu-ai-act" title="EU AI Act" description="Risikoklassen, Pflichten, Termine" />
          <QuickLink href="/tools/ollama-tutorial" title="Ollama Setup" description="Lokale LLMs in 5 Minuten" />
          <QuickLink href="/blog" title="Blog" description="Praxis-Artikel und Neuigkeiten" />
        </div>
      </section>

      {/* Recent Articles */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4">Neueste Artikel</h2>
        <div className="space-y-3">
          {recentArticles.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="block p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-slate-500 mb-1">{article.categoryLabel}</div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {article.title}
                  </h3>
                </div>
                <span className="text-xs text-slate-600 whitespace-nowrap ml-3">{article.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Note */}
      <div className="text-center text-xs text-slate-600 py-4">
        <p>
          Die deutsche Version ist die Hauptversion dieses Wikis. Alle Inhalte sind direkt unter{' '}
          <Link href="/" className="text-blue-400 hover:underline">wiki.ai-engineering.at</Link> erreichbar.
        </p>
      </div>
    </div>
  )
}

function QuickLink({
  href,
  title,
  description,
}: {
  href: string
  title: string
  description: string
}) {
  return (
    <Link
      href={href}
      className="block p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-all group"
    >
      <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-xs text-slate-500 mt-1">{description}</p>
    </Link>
  )
}
