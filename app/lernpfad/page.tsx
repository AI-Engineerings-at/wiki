import Link from 'next/link'

export const metadata = {
  title: 'Lernpfad: Von 0 bis Production | AI Engineering Wiki',
  description:
    'Der strukturierte Einstieg in lokale AI-Systeme — von den Grundlagen bis zum produktiven Multi-Agent-Stack. 8 Stufen, kein Vorwissen nötig.',
}

const steps = [
  {
    level: 0,
    title: 'Was ist ein Large Language Model?',
    description:
      'LLMs sind keine Suchmaschinen und keine denkenden Systeme. Verstehe Token-Prediction, Halluzinierung und warum Modelle manchmal lügen — bevor du anfängst.',
    href: '/blog/2026-03-12-was-ist-ein-llm',
    readTime: '~8 Min',
    available: true,
  },
  {
    level: 1,
    title: 'Warum lokal statt Cloud?',
    description:
      'DSGVO, EU AI Act, Datensouveränität: Was auf dem Spiel steht, wenn Unternehmensdaten in Cloud-Modelle fließen — und was das konkret für dich bedeutet.',
    href: '/blog/2026-03-12-warum-lokale-ki-statt-cloud',
    readTime: '~7 Min',
    available: true,
  },
  {
    level: 2,
    title: 'Terminal-Grundlagen für AI',
    description:
      '10 Befehle — das ist alles was zwischen dir und deinem ersten lokalen LLM steht. cd, curl, docker ps, ssh, grep und mehr.',
    href: '/blog/2026-03-12-terminal-grundlagen-für-ai',
    readTime: '~6 Min',
    available: true,
  },
  {
    level: 3,
    title: 'Ollama installieren',
    description:
      'In 5 Minuten läuft dein erstes lokales Modell. Eine Installation, ein Befehl — und du chattest mit Qwen oder Llama komplett offline.',
    href: '/blog/2026-03-12-ollama-installieren-schritt-für-schritt',
    readTime: '~8 Min',
    available: true,
  },
  {
    level: 4,
    title: 'Erster Chatbot mit Open WebUI',
    description:
      'Vom Terminal-Chat zum Browser-Interface. Open WebUI gibt dir ein ChatGPT-ähnliches Interface für deine lokalen Modelle — als Docker-Container.',
    href: '/blog/2026-03-12-open-webui-erster-chatbot',
    readTime: '~10 Min',
    available: true,
  },
  {
    level: 5,
    title: 'Docker Basics für AI',
    description:
      'Ohne Docker läuft kein moderner AI-Stack. Container, Volumes, Compose — die Konzepte die du wirklich brauchst, ohne dich in Details zu verlieren.',
    href: '/blog/2026-03-12-docker-grundlagen-für-ai',
    readTime: '~12 Min',
    available: true,
  },
  {
    level: 6,
    title: 'Agent Stack aufbauen',
    description:
      'Mehrere Agenten, die zusammenarbeiten. Ein Manager-Agent delegiert Tasks an Spezialisten. Das ist der Kern von modernem AI Engineering.',
    href: '/grundlagen/ai-agent-team',
    readTime: '~25 Min',
    available: true,
  },
  {
    level: 7,
    title: 'n8n Automatisierung',
    description:
      'AI ohne Automatisierung ist nur ein Chatbot. n8n verbindet deinen Stack mit E-Mails, Webhooks und APIs — damit laufen echte Workflows ohne manuelle Eingriffe.',
    href: '/tools/n8n-für-anfaenger',
    readTime: '~20 Min',
    available: true,
  },
  {
    level: 8,
    title: 'Production Ready → Playbook',
    description:
      'Monitoring, Security, Backup. Der vollständige Stack mit getesteten Docker Compose Files, Grafana Dashboards, n8n Vorlagen und DSGVO-Checklisten.',
    href: 'https://www.ai-engineering.at/products',
    readTime: 'EUR 49',
    available: true,
    isCta: true,
  },
]

export default function LernpfadPage() {
  return (
    <div className="space-y-12 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <p className="text-sm text-[#4262FF] font-semibold uppercase tracking-wide mb-2">
          Lernpfad
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Von 0 bis Production
        </h1>
        <p className="text-lg text-slate-400 mt-3">
          Der strukturierte Einstieg in lokale AI-Systeme — von den Grundlagen
          bis zum produktiven Multi-Agent-Stack. Kein Vorwissen nötig.
        </p>
      </div>

      {/* Target audience */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">
          Für wen ist dieser Pfad?
        </h2>
        <ul className="space-y-2 text-slate-300 text-sm">
          <li className="flex gap-2">
            <span className="text-[#4262FF] shrink-0">→</span>
            Entwickler und IT-Profis, die AI <strong className="text-white">verstehen</strong> wollen — nicht nur nutzen
          </li>
          <li className="flex gap-2">
            <span className="text-[#4262FF] shrink-0">→</span>
            Unternehmen, die wegen <strong className="text-white">DSGVO und EU AI Act</strong> keine Cloud-Lösungen einsetzen können
          </li>
          <li className="flex gap-2">
            <span className="text-[#4262FF] shrink-0">→</span>
            Einsteiger ohne AI-Vorkenntnisse, die <strong className="text-white">strukturiert lernen</strong> möchten
          </li>
        </ul>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.level} className="relative">
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="absolute left-5 top-full w-px h-4 bg-slate-800 z-10" />
            )}

            {step.isCta ? (
              <a
                href={step.href}
                target={step.href.startsWith('http') ? '_blank' : undefined}
                rel={step.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="block p-5 bg-gradient-to-r from-[#4262FF]/10 to-blue-600/5 border border-[#4262FF]/40 rounded-xl hover:border-[#4262FF] transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-[#4262FF] flex items-center justify-center text-white font-bold text-sm">
                    {step.level}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-semibold text-white group-hover:text-[#4262FF] transition-colors">
                        {step.title}
                      </h3>
                      <span className="text-xs bg-[#4262FF] text-white px-2 py-0.5 rounded font-medium">
                        {step.readTime}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mt-1">{step.description}</p>
                  </div>
                </div>
              </a>
            ) : (
              <Link
                href={step.href}
                className="block p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-[#4262FF]/50 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-slate-800 group-hover:bg-slate-700 flex items-center justify-center text-slate-300 font-bold text-sm transition-colors">
                    {step.level}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-semibold text-white group-hover:text-[#4262FF] transition-colors">
                        {step.title}
                      </h3>
                      <span className="text-xs text-slate-500">{step.readTime}</span>
                    </div>
                    <p className="text-slate-400 text-sm mt-1">{step.description}</p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 text-center">
        <h2 className="text-xl font-bold text-white mb-2">
          Bereit den kompletten Stack aufzubauen?
        </h2>
        <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
          Das P1 Playbook gibt dir getestete Configs, Grafana Dashboards,
          n8n Templates und DSGVO-Checklisten für deinen lokalen AI-Stack.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://www.ai-engineering.at/products"
            className="bg-[#4262FF] hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Playbook P1 kaufen — EUR 49
          </a>
          <a
            href="https://www.ai-engineering.at/contact"
            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Kostenloses Gespräch
          </a>
        </div>
      </div>
    </div>
  )
}
