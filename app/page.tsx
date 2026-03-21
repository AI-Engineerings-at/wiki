import Link from 'next/link'
import { categories, getRecentArticles, getPopularArticles } from '../lib/articles'
import { SearchBar } from '../components/SearchBar'

export const metadata = {
  title: 'AI Engineering Wiki — Kostenloses Wissen ueber lokale KI, DSGVO und Automatisierung',
  description:
    'Kostenloses Wissen ueber lokale KI, DSGVO-Compliance und Automatisierung. Fuer DACH-KMUs, die lokale AI-Systeme sauber einfuehren wollen.',
}

export default function Home() {
  const recentArticles = getRecentArticles(5)
  const popularArticles = getPopularArticles(5)

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          AI Engineering
          <span className="text-[#4262FF]"> Wiki</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-2">
          Kostenloses Wissen ueber lokale KI, DSGVO und Automatisierung
        </p>
        <p className="text-slate-500 max-w-2xl mx-auto mb-8">
          Fuer DACH-KMUs, die lokale AI-Systeme DSGVO-konform einfuehren, dokumentieren
          und auditierbar betreiben wollen. Aus echtem Betrieb in Oesterreich.
        </p>

        {/* Search */}
        <div className="max-w-xl mx-auto">
          <SearchBar />
        </div>
      </section>

      {/* Category Cards */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Kategorien</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.slug}
              icon={cat.icon}
              title={cat.label}
              description={cat.description}
              href={cat.href}
              count={cat.articles.length}
            />
          ))}
          <CategoryCard
            icon={'\u{1F4DD}'}
            title="Tutorials"
            description="Step-by-Step Anleitungen fuer lokale KI-Setups"
            href="/lernpfad"
            count={0}
          />
        </div>
      </section>

      {/* Recent + Popular side by side */}
      <div className="grid lg:grid-cols-2 gap-8">
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

        {/* Popular Articles */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Beliebteste Artikel</h2>
          <div className="space-y-3">
            {popularArticles.map((article) => (
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
                  <span className="text-xs text-slate-600 whitespace-nowrap ml-3">{article.categoryLabel}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* EU AI Act Banner */}
      <section className="bg-slate-900 border border-blue-500/20 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">
          EU AI Act Deadline: 2. August 2026
        </h2>
        <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
          Wenn du lokale AI-Systeme sauber einfuehren willst:
          Compliance-Templates, Audit-Trail-Loesungen und dokumentierte
          Praxis-Setups fuer den echten Betrieb.
        </p>
        <a
          href="https://buy.stripe.com/bJe7sLb7N92ha9MejWfQI02"
          className="btn-primary"
        >
          Zum Compliance-Kit (EUR 79)
        </a>
      </section>

      {/* Kurse Coming Soon Banner */}
      <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 text-xs font-bold px-3 py-1 rounded-full mb-3">
          Coming Soon
        </div>
        <h3 className="text-lg font-bold text-white mb-2">
          Online-Kurse fuer lokale KI
        </h3>
        <p className="text-slate-400 text-sm max-w-lg mx-auto mb-4">
          Strukturierte Lernpfade zu DSGVO, EU AI Act, Ollama und lokaler Automatisierung.
          Von Grundlagen bis Zertifizierung.
        </p>
        <a
          href="https://kurse.ai-engineering.at"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          kurse.ai-engineering.at &rarr;
        </a>
      </section>

      {/* Bottom note */}
      <div className="text-center text-xs text-slate-600 py-4">
        <p>
          Open Knowledge von AI Engineering — aus dem echten Betrieb, fuer Teams
          die lokale AI unter eigener Kontrolle betreiben wollen.
        </p>
      </div>
    </div>
  )
}

function CategoryCard({
  icon,
  title,
  description,
  href,
  count,
}: {
  icon: string
  title: string
  description: string
  href: string
  count: number
}) {
  return (
    <Link
      href={href}
      className="block p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-blue-500/50 transition-all group"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
      </div>
      <p className="text-slate-400 text-sm">{description}</p>
      <p className="text-xs text-slate-600 mt-3">
        {count > 0 ? `${count} Artikel` : 'Coming soon'}
      </p>
    </Link>
  )
}
