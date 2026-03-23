import { WikiLink as Link } from '../../components/WikiLink'
import Image from 'next/image'
import { categories, getRecentArticles, getPopularArticles, getEnHref } from '../../lib/articles'
import { SearchBar } from '../../components/SearchBar'

export const metadata = {
  title: 'AI Engineering Wiki — Free Knowledge on Local AI, GDPR & Automation',
  description:
    'Free knowledge on local AI, GDPR compliance and automation. For SMEs building self-hosted AI systems with proper documentation and audit trails.',
}

export default function HomePage() {
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
            Free knowledge on local AI, GDPR and automation
          </p>
          <p className="text-slate-400 max-w-2xl mx-auto mb-10">
            For SMEs that want to deploy, document and audit local AI systems
            in full GDPR compliance. From real-world operations in Austria.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto">
            <SearchBar />
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-10 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">106+</div>
              <div className="text-slate-400">Articles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">DE + EN</div>
              <div className="text-slate-400">Bilingual</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-slate-400">Free</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">Real</div>
              <div className="text-slate-400">Verified sources</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access — Key Topics */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-2">Jump right in</h2>
        <p className="text-slate-400 text-sm mb-6">The most important topics at a glance</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickLink
            href="/en/compliance/eu-ai-act"
            icon="⚖️"
            title="EU AI Act"
            subtitle="In force since Aug 2024 — Art. 4 applies since Feb 2025"
          />
          <QuickLink
            href="/en/compliance/dsgvo-grundlagen"
            icon="🛡️"
            title="GDPR for AI"
            subtitle="Legal bases, Art. 30, DPIA"
          />
          <QuickLink
            href="/en/tools/ollama-tutorial"
            icon="🦙"
            title="Ollama Setup"
            subtitle="Local LLMs in 5 minutes"
          />
          <QuickLink
            href="/en/grundlagen/was-ist-ein-llm"
            icon="🧠"
            title="What is an LLM?"
            subtitle="Transformers, tokens, hallucinations"
          />
        </div>
      </section>

      {/* Category Cards */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">All Categories</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.slug}
              icon={cat.icon}
              title={categoryLabelsEN[cat.slug] || cat.label}
              description={categoryDescriptionsEN[cat.slug] || cat.description}
              href={`/en${cat.href}`}
              count={cat.articles.length}
            />
          ))}
        </div>
      </section>

      {/* Tools & Frameworks Library */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-2">Tools & Frameworks</h2>
        <p className="text-slate-400 text-sm mb-6">Guides and comparisons for the local AI stack</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <ToolLink href="/en/tools/ollama-tutorial" label="Ollama" tag="LLM Runtime" />
          <ToolLink href="/en/tools/n8n-fuer-anfaenger" label="n8n" tag="Workflow Automation" />
          <ToolLink href="/en/tools/grafana-monitoring" label="Grafana" tag="Monitoring" />
          <ToolLink href="/en/tools/docker-vs-swarm" label="Docker & Swarm" tag="Container" />
          <ToolLink href="/en/tools/proxmox-setup" label="Proxmox" tag="Virtualisation" />
          <ToolLink href="/en/tools/mattermost-agent" label="Team-Chat" tag="Agent Bridge" />
          <ToolLink href="/en/tools/mcp-server" label="MCP Server" tag="Tool Integration" />
          <ToolLink href="/en/tools/model-selection" label="Model Selection" tag="LLM Guide" />
          <ToolLink href="/en/tools/rag-guide" label="RAG Pipeline" tag="Retrieval" />
        </div>
      </section>

      {/* Compliance & Legal */}
      <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">⚖️</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Compliance & Legal</h2>
            <p className="text-slate-400 text-sm">EU AI Act, GDPR, risk classes — everything you need to know</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <ComplianceLink href="/en/compliance/eu-ai-act" label="EU AI Act Guide" hot />
          <ComplianceLink href="/en/compliance/eu-ai-act-checkliste" label="Compliance Checklist" />
          <ComplianceLink href="/en/compliance/dsgvo-grundlagen" label="GDPR Fundamentals" />
          <ComplianceLink href="/en/compliance/dpia" label="DPIA for AI Systems" />
          <ComplianceLink href="/en/compliance/verbotene-ai-praktiken" label="Prohibited AI Practices" />
          <ComplianceLink href="/en/compliance/ki-kompetenz-art4" label="Art. 4 AI Competence" hot />
          <ComplianceLink href="/en/compliance/chatbot-transparenzpflichten" label="Chatbot Transparency" />
          <ComplianceLink href="/en/compliance/ai-agent-legal-framework" label="Agent Legal Framework" />
          <ComplianceLink href="/en/compliance/datenschutz-praxis" label="Data Protection Practice" />
        </div>
      </section>

      {/* Patterns & Architecture */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-2">Patterns & Architecture</h2>
        <p className="text-slate-400 text-sm mb-6">Proven patterns for AI agent systems in production</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <ToolLink href="/en/patterns/agent-orchestration-patterns" label="Agent Orchestration" tag="Pattern" />
          <ToolLink href="/en/patterns/safety-hooks" label="Safety Hooks" tag="Security" />
          <ToolLink href="/en/patterns/heartbeat-monitoring" label="Heartbeat Monitoring" tag="Ops" />
          <ToolLink href="/en/patterns/memory-management" label="Memory Management" tag="Context" />
          <ToolLink href="/en/patterns/task-delegation" label="Task Delegation" tag="Workflow" />
          <ToolLink href="/en/patterns/self-improving-agents" label="Self-Improving Agents" tag="NemoClaw" />
          <ToolLink href="/en/patterns/ai-agent-digital-employee" label="Agent as Employee" tag="Concept" />
        </div>
      </section>

      {/* Recent + Popular side by side */}
      <div className="grid lg:grid-cols-2 gap-8">
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Recent Articles</h2>
          <div className="space-y-3">
            {recentArticles.map((article) => (
              <Link
                key={article.href}
                href={getEnHref(article.href)}
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
          <h2 className="text-xl font-bold text-white mb-4">Most Popular</h2>
          <div className="space-y-3">
            {popularArticles.map((article) => (
              <Link
                key={article.href}
                href={getEnHref(article.href)}
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

      {/* Useful Links */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Useful Links</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ExternalLink
            href="https://ollama.com/library"
            title="Ollama Model Library"
            description="All available local models"
          />
          <ExternalLink
            href="https://artificialanalysis.ai/"
            title="Artificial Analysis"
            description="LLM benchmarks & price comparison"
          />
          <ExternalLink
            href="https://eur-lex.europa.eu/eli/reg/2024/1689/oj"
            title="EU AI Act Full Text"
            description="Official Regulation (EU) 2024/1689"
          />
          <ExternalLink
            href="https://dsb.gv.at/"
            title="Data Protection Authority AT"
            description="Austrian supervisory authority"
          />
          <ExternalLink
            href="https://docs.n8n.io/"
            title="n8n Documentation"
            description="Workflow Automation Docs"
          />
          <ExternalLink
            href="https://huggingface.co/models"
            title="Hugging Face Models"
            description="Open-source model hub"
          />
          <ExternalLink
            href="https://arxiv.org/list/cs.AI/recent"
            title="arXiv AI Papers"
            description="Latest research"
          />
          <ExternalLink
            href="https://www.ai-engineering.at"
            title="AI Engineering Shop"
            description="Products & Bundles"
          />
          <ExternalLink
            href="https://www.wko.at/oe/gruendung/ai-toolbox.pdf"
            title="WKO AI Toolbox"
            description="AI guides by the Austrian Chamber of Commerce"
          />
          <ExternalLink
            href="https://www.rtr.at/rtr/service/ki-servicestelle/projekte-initiativen/Projekte_-_Initiativen.de.html"
            title="RTR AI Service Point"
            description="Austrian AI service centre"
          />
          <ExternalLink
            href="https://www.ffg.at/"
            title="FFG Funding"
            description="Research funding for AI projects"
          />
        </div>
      </section>

      {/* EU AI Act Deadline Banner */}
      <section className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <div className="text-xs font-bold text-red-400 mb-2">ATTENTION</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              EU AI Act — Art. 4 AI Literacy applies since 2 Feb 2025
            </h2>
            <p className="text-slate-400 text-sm">
              The AI literacy obligation is already in force. Enforcement with penalties
              starts from August 2026. Our compliance templates help you with documentation.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/en/compliance/eu-ai-act"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Read the guide &rarr;
            </Link>
            <Link
              href="/en/compliance/eu-ai-act-checkliste"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              View checklist &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Learning Path CTA */}
      <section className="text-center py-8">
        <h2 className="text-2xl font-bold text-white mb-3">
          Want to learn step by step?
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto mb-6">
          The 30-day learning path takes you from your first local LLM
          to a complete AI stack with monitoring and compliance.
        </p>
        <Link
          href="/en/learning-path"
          className="inline-block bg-[#4262FF] hover:bg-[#3550DD] text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 text-sm"
        >
          Start learning path
        </Link>
      </section>

      {/* Bottom note */}
      <div className="text-center text-xs text-slate-600 py-4">
        <p>
          Open knowledge by AI Engineering — from real-world operations, for teams
          that want to run local AI under their own control.
        </p>
      </div>
    </div>
  )
}

/* EN translations for category labels */
const categoryLabelsEN: Record<string, string> = {
  grundlagen: 'Basics',
  compliance: 'Compliance',
  tools: 'Tools',
  patterns: 'Patterns',
  security: 'Security',
  papers: 'Papers',
}

const categoryDescriptionsEN: Record<string, string> = {
  grundlagen: 'What is AI, LLMs, local vs cloud, agent teams',
  compliance: 'GDPR, EU AI Act, Art. 4, transparency obligations',
  tools: 'Ollama, n8n, Docker, Grafana, Proxmox, RAG',
  patterns: 'Agent Orchestration, RAG, Memory, Workflows',
  security: 'Data security, firewall, backup, API keys',
  papers: 'Transformer, RAG, LoRA, ReAct, Constitutional AI',
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
      <p className="text-xs text-slate-600 mt-3">{count} articles</p>
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
          HOT
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
