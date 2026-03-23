import { WikiLink as Link } from '../components/WikiLink'
import Image from 'next/image'
import { categories, getRecentArticles, getPopularArticles } from '../lib/articles'
import { SearchBar } from '../components/SearchBar'

export const metadata = {
  title: 'AI Engineering Wiki — Kostenloses Wissen über lokale KI, DSGVO und Automatisierung',
  description:
    'Kostenloses Wissen über lokale KI, DSGVO-Compliance und Automatisierung. Für DACH-KMUs, die lokale AI-Systeme sauber einführen wollen.',
}

export default function Home() {
  const recentArticles = getRecentArticles(5)
  const popularArticles = getPopularArticles(5)

  return (
    <div className="space-y-16">
      {/* Hero Section — Eagle Background */}
      <section className="relative -mx-4 md:-mx-8 -mt-4 overflow-hidden rounded-b-3xl">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-eagle.png"
            alt=""
            fill
            sizes="100vw"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/80 to-slate-950" />
        </div>
        <div className="relative text-center py-20 md:py-32 px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            AI Engineering
            <span className="text-[#4262FF]"> Wiki</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto mb-2">
            KI verstehen, einsetzen und kontrollieren — ohne Informatik-Studium
          </p>
          <p className="text-slate-400 max-w-2xl mx-auto mb-10">
            Für KMUs im DACH-Raum, die KI nutzen wollen ohne ihre Daten aus der Hand zu geben.
            Verständlich erklärt, aus der Praxis in Österreich. Komplett kostenlos.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto">
            <SearchBar />
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-10 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">106+</div>
              <div className="text-slate-400">Artikel</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">DE + EN</div>
              <div className="text-slate-400">Bilingual</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-slate-400">Kostenlos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">Quellen</div>
              <div className="text-slate-400">Jeder Artikel mit Quellenangaben</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access — Wichtigste Themen */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-2">Direkt einsteigen</h2>
        <p className="text-slate-400 text-sm mb-6">Die wichtigsten Themen auf einen Blick</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickLink
            href="/compliance/eu-ai-act"
            icon="⚖️"
            title="EU AI Act"
            subtitle="Was du als Unternehmen wissen musst — jetzt"
          />
          <QuickLink
            href="/compliance/dsgvo-grundlagen"
            icon="🛡️"
            title="DSGVO für AI"
            subtitle="Wann du haftest und wie du dich schützt"
          />
          <QuickLink
            href="/tools/ollama-tutorial"
            icon="🦙"
            title="Ollama Setup"
            subtitle="Lokale LLMs in 5 Minuten"
          />
          <QuickLink
            href="/grundlagen/was-ist-ein-llm"
            icon="🧠"
            title="Was ist ein LLM?"
            subtitle="Einfach erklärt — ohne Fachjargon"
          />
        </div>
      </section>

      {/* Category Cards */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Alle Kategorien</h2>
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
        </div>
      </section>

      {/* Tools & Frameworks Library */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-2">Tools & Frameworks</h2>
        <p className="text-slate-400 text-sm mb-6">Anleitungen und Vergleiche für den lokalen AI-Stack</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <ToolLink href="/tools/ollama-tutorial" label="Ollama" tag="LLM Runtime" />
          <ToolLink href="/tools/n8n-fuer-anfaenger" label="n8n" tag="Workflow Automation" />
          <ToolLink href="/tools/grafana-monitoring" label="Grafana" tag="Monitoring" />
          <ToolLink href="/tools/docker-vs-swarm" label="Docker & Swarm" tag="Container" />
          <ToolLink href="/tools/proxmox-setup" label="Proxmox" tag="Virtualisierung" />
          <ToolLink href="/tools/mattermost-agent" label="Team-Chat" tag="Agent Bridge" />
          <ToolLink href="/tools/mcp-server" label="MCP Server" tag="Tool Integration" />
          <ToolLink href="/tools/model-selection" label="Modell-Auswahl" tag="LLM Guide" />
          <ToolLink href="/tools/rag-guide" label="RAG Pipeline" tag="Retrieval" />
        </div>
      </section>

      {/* Compliance & Legal */}
      <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">⚖️</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Compliance & Recht</h2>
            <p className="text-slate-400 text-sm">Was du rechtlich beachten musst wenn du KI im Unternehmen einsetzt</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <ComplianceLink href="/compliance/eu-ai-act" label="EU AI Act Leitfaden" hot />
          <ComplianceLink href="/compliance/eu-ai-act-checkliste" label="Compliance Checkliste" />
          <ComplianceLink href="/compliance/dsgvo-grundlagen" label="DSGVO Grundlagen" />
          <ComplianceLink href="/compliance/dpia" label="DPIA für KI-Systeme" />
          <ComplianceLink href="/compliance/verbotene-ai-praktiken" label="Verbotene AI-Praktiken" />
          <ComplianceLink href="/compliance/ki-kompetenz-art4" label="Art. 4 KI-Kompetenz" hot />
          <ComplianceLink href="/compliance/chatbot-transparenzpflichten" label="Chatbot Transparenz" />
          <ComplianceLink href="/compliance/ai-agent-legal-framework" label="Agent Legal Framework" />
          <ComplianceLink href="/compliance/datenschutz-praxis" label="Datenschutz Praxis" />
        </div>
      </section>

      {/* Patterns & Architecture */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-2">Patterns & Architektur</h2>
        <p className="text-slate-400 text-sm mb-6">Erprobte Rezepte für KI-Systeme die zuverlässig laufen — nicht nur im Labor</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <ToolLink href="/patterns/agent-orchestration-patterns" label="Agent Orchestration" tag="Pattern" />
          <ToolLink href="/patterns/safety-hooks" label="Safety Hooks" tag="Security" />
          <ToolLink href="/patterns/heartbeat-monitoring" label="Heartbeat Monitoring" tag="Ops" />
          <ToolLink href="/patterns/memory-management" label="Memory Management" tag="Context" />
          <ToolLink href="/patterns/task-delegation" label="Task Delegation" tag="Workflow" />
          <ToolLink href="/patterns/self-improving-agents" label="Self-Improving Agents" tag="NemoClaw" />
          <ToolLink href="/patterns/ai-agent-digitaler-mitarbeiter" label="Agent als Mitarbeiter" tag="Konzept" />
        </div>
      </section>

      {/* Recent + Popular side by side */}
      <div className="grid lg:grid-cols-2 gap-8">
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
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Nützliche Links */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Nützliche Links</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ExternalLink
            href="https://ollama.com/library"
            title="Ollama Model Library"
            description="Alle verfügbaren lokalen Modelle"
          />
          <ExternalLink
            href="https://artificialanalysis.ai/"
            title="Artificial Analysis"
            description="LLM Benchmarks & Preisvergleich"
          />
          <ExternalLink
            href="https://eur-lex.europa.eu/eli/reg/2024/1689/oj"
            title="EU AI Act Volltext"
            description="Offizielle Verordnung (EU) 2024/1689"
          />
          <ExternalLink
            href="https://dsb.gv.at/"
            title="Datenschutzbehörde AT"
            description="Österreichische Aufsichtsbehörde"
          />
          <ExternalLink
            href="https://docs.n8n.io/"
            title="n8n Dokumentation"
            description="Workflow Automation Docs"
          />
          <ExternalLink
            href="https://huggingface.co/models"
            title="Hugging Face Models"
            description="Open-Source Model Hub"
          />
          <ExternalLink
            href="https://arxiv.org/list/cs.AI/recent"
            title="arXiv AI Papers"
            description="Aktuelle Forschung"
          />
          <ExternalLink
            href="https://www.ai-engineering.at"
            title="AI Engineering Shop"
            description="Produkte & Bundles"
          />
          <ExternalLink
            href="https://www.wko.at/oe/gruendung/ai-toolbox.pdf"
            title="WKO AI-Toolbox"
            description="AI-Leitfäden der Wirtschaftskammer AT"
          />
          <ExternalLink
            href="https://www.rtr.at/rtr/service/ki-servicestelle/projekte-initiativen/Projekte_-_Initiativen.de.html"
            title="RTR KI-Servicestelle"
            description="Österreichische KI-Servicestelle"
          />
          <ExternalLink
            href="https://www.ffg.at/"
            title="FFG Förderungen"
            description="Forschungsförderung für AI-Projekte"
          />
          <ExternalLink
            href="https://www.nist.gov/itl/ai-risk-management-framework"
            title="NIST AI RMF"
            description="US-Rahmenwerk für KI-Risikomanagement"
          />
          <ExternalLink
            href="https://oecd.ai/en/"
            title="OECD.AI"
            description="Internationale KI-Policy-Datenbank"
          />
          <ExternalLink
            href="https://digital-strategy.ec.europa.eu/en/policies/ai-office"
            title="EU AI Office"
            description="Zentrale EU-Stelle für KI-Governance"
          />
          <ExternalLink
            href="https://github.com/n8n-io/self-hosted-ai-starter-kit"
            title="n8n AI Starter Kit"
            description="Offizielles Starter Kit für lokale AI"
          />
          <ExternalLink
            href="https://www.datacamp.com/de/tutorial/local-ai"
            title="DataCamp Local AI"
            description="Tutorial: Lokale KI mit Docker, n8n und Ollama"
          />
        </div>
      </section>

      {/* EU AI Act Deadline Banner — dezent, nicht als erstes */}
      <section className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <div className="text-xs font-bold text-red-400 mb-2">ACHTUNG</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              EU AI Act — Art. 4 KI-Kompetenz gilt seit 02.02.2025
            </h2>
            <p className="text-slate-400 text-sm">
              Die Pflicht zur KI-Kompetenz ist bereits in Kraft. Enforcement mit Strafen
              startet ab August 2026. Unsere Compliance-Templates helfen dir bei der Dokumentation.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/compliance/eu-ai-act"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Leitfaden lesen &rarr;
            </Link>
            <Link
              href="/compliance/eu-ai-act-checkliste"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Checkliste ansehen &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Lernpfad CTA */}
      <section className="text-center py-8">
        <h2 className="text-2xl font-bold text-white mb-3">
          Strukturiert lernen?
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto mb-6">
          In 8 Schritten von &quot;Was ist KI eigentlich?&quot; bis zu einem laufenden System
          das Emails beantwortet, Berichte schreibt und deine Daten schützt.
        </p>
        <Link
          href="/lernpfad"
          className="inline-block bg-[#4262FF] hover:bg-[#3550DD] text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 text-sm"
        >
          Lernpfad starten
        </Link>
      </section>

      {/* Bottom note */}
      <div className="text-center text-xs text-slate-600 py-4">
        <p>
          Open Knowledge von AI Engineering — aus der Praxis, für Teams
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
      <p className="text-xs text-slate-600 mt-3">{count} Artikel</p>
    </Link>
  )
}

function QuickLink({
  href,
  icon,
  title,
  subtitle,
}: {
  href: string
  icon: string
  title: string
  subtitle: string
}) {
  return (
    <Link
      href={href}
      className="flex items-start gap-3 p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-all group"
    >
      <span className="text-2xl mt-0.5">{icon}</span>
      <div>
        <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
      </div>
    </Link>
  )
}

function ToolLink({
  href,
  label,
  tag,
}: {
  href: string
  label: string
  tag: string
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between p-3 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-blue-500/50 transition-all group"
    >
      <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
        {label}
      </span>
      <span className="text-xs text-slate-600 bg-slate-800 px-2 py-0.5 rounded">{tag}</span>
    </Link>
  )
}

function ComplianceLink({
  href,
  label,
  hot,
}: {
  href: string
  label: string
  hot?: boolean
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between p-3 bg-slate-950/50 border border-slate-700 rounded-lg hover:border-blue-500/50 transition-all group"
    >
      <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
        {label}
      </span>
      {hot && (
        <span className="text-xs text-red-400 bg-red-500/10 px-2 py-0.5 rounded font-bold">
          AKTUELL
        </span>
      )}
    </Link>
  )
}

function ExternalLink({
  href,
  title,
  description,
}: {
  href: string
  title: string
  description: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 bg-slate-900/30 border border-slate-800 rounded-xl hover:border-slate-600 transition-all group"
    >
      <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors mb-1">
        {title} ↗
      </h3>
      <p className="text-xs text-slate-500">{description}</p>
    </a>
  )
}
