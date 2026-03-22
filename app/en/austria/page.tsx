export const metadata = {
  title: 'AI in Austria | AI Engineering Wiki',
  description:
    'Authorities, funding, community and legal overview: All relevant Austrian AI resources at a glance.',
}

export default function AustriaPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-white">
          AI in Austria — Authorities, Funding, Community
        </h1>
        <p className="text-slate-400 mt-2">
          Overview of all relevant Austrian AI resources: regulation, funding programs, guidelines and community.
        </p>
      </div>

      {/* Authorities & Regulation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white border-b border-slate-800 pb-2">
          Authorities &amp; Regulation
        </h2>
        <div className="space-y-3">
          <a
            href="https://www.rtr.at/rtr/service/ki-servicestelle/ki-servicestelle.de.html"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
          >
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
              RTR AI Service Center
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              AI Act chatbot, documentation and central contact point for AI regulation in Austria.
            </p>
            <span className="text-xs text-slate-500 mt-2 inline-block">rtr.at</span>
          </a>
          <a
            href="https://dsb.gv.at/"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
          >
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
              Data Protection Authority (DSB)
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Austrian Data Protection Authority — responsible for GDPR enforcement and complaints.
            </p>
            <span className="text-xs text-slate-500 mt-2 inline-block">dsb.gv.at</span>
          </a>
          <a
            href="https://www.digitalaustria.gv.at/themen/kuenstliche-intelligenz.html"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
          >
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
              Digital Austria
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              AI Monitor, AI Factory Austria and the national AI strategy of the federal government.
            </p>
            <span className="text-xs text-slate-500 mt-2 inline-block">digitalaustria.gv.at</span>
          </a>
        </div>
      </section>

      {/* Funding */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white border-b border-slate-800 pb-2">
          Funding
        </h2>
        <div className="space-y-3">
          <a
            href="https://www.ffg.at/ai-tech-green-2025"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
          >
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
              FFG AI Ecosystems
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Funding program by the Austrian Research Promotion Agency for AI technology and green transition.
            </p>
            <span className="text-xs text-slate-500 mt-2 inline-block">ffg.at</span>
          </a>
          <a
            href="https://www.aws.at/en/aws-digitalisierung/ai-unternehmen-wachstum/ai-adoption/"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
          >
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
              aws AI-Adoption
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Austria Wirtschaftsservice — funding for AI adoption in enterprises and growth.
            </p>
            <span className="text-xs text-slate-500 mt-2 inline-block">aws.at</span>
          </a>
          <a
            href="https://www.aws.at/aws-ki-marktplatz/"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
          >
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
              aws AI Marketplace
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Austria Wirtschaftsservice marketplace for AI solutions and AI service providers.
            </p>
            <span className="text-xs text-slate-500 mt-2 inline-block">aws.at</span>
          </a>
        </div>
      </section>

      {/* Guidelines */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white border-b border-slate-800 pb-2">
          Guidelines &amp; Policies
        </h2>
        <div className="space-y-3">
          <a
            href="https://www.wko.at/digitalisierung/ki-guidelines-fuer-kmu"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
          >
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
              WKO AI Guidelines for SMEs
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Practice-oriented AI guidelines by the Austrian Economic Chamber for small and medium enterprises.
            </p>
            <span className="text-xs text-slate-500 mt-2 inline-block">wko.at</span>
          </a>
          <a
            href="https://www.wko.at/oe/gruendung/ai-toolbox.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
          >
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
              WKO AI Toolbox (PDF)
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              WKO toolbox with practical AI tools and guides for founders and businesses.
            </p>
            <span className="text-xs text-slate-500 mt-2 inline-block">wko.at</span>
          </a>
          <a
            href="https://www.wko.at/digitalisierung/ki-oesterreich"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
          >
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
              WKO AI Austria
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              WKO overview page on Artificial Intelligence in Austria — trends, offerings, events.
            </p>
            <span className="text-xs text-slate-500 mt-2 inline-block">wko.at</span>
          </a>
        </div>
      </section>

      {/* Community */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white border-b border-slate-800 pb-2">
          Community
        </h2>
        <div className="space-y-3">
          <a
            href="https://vienna.aitinkerers.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
          >
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
              AI Tinkerers Vienna
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Live code, no slides, builder-to-builder — Vienna&apos;s community for AI practitioners and developers.
            </p>
            <span className="text-xs text-slate-500 mt-2 inline-block">vienna.aitinkerers.org</span>
          </a>
        </div>
      </section>

      {/* Legal Overview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white border-b border-slate-800 pb-2">
          Legal Overview
        </h2>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-blue-400 font-mono text-sm mt-0.5">Art. 4</span>
            <p className="text-slate-300 text-sm">
              <strong className="text-white">AI Competence:</strong> effective since 02.02.2025 — all providers and
              deployers must ensure that personnel have sufficient AI competence.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-blue-400 font-mono text-sm mt-0.5">Enforcement</span>
            <p className="text-slate-300 text-sm">
              <strong className="text-white">From 08.2026:</strong> enforcement of most EU AI Act obligations
              by national authorities.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-blue-400 font-mono text-sm mt-0.5">AI Officer</span>
            <p className="text-slate-300 text-sm">
              <strong className="text-white">No obligation</strong> to appoint a dedicated AI Officer —
              unlike the Data Protection Officer, there is no legal requirement.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-blue-400 font-mono text-sm mt-0.5">Certification</span>
            <p className="text-slate-300 text-sm">
              <strong className="text-white">No unified certification</strong> — there is currently no standardized
              AI certificate or quality seal at EU or national level.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
