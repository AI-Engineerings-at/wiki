import Link from 'next/link'

export const metadata = {
  title: 'Lernpfad: Von 0 bis Production | AI Engineering Wiki',
  description:
    'Der strukturierte Einstieg in lokale AI-Systeme — von den Grundlagen bis zum produktiven Multi-Agent-Stack. 8 Stufen, kein Vorwissen nötig.',
}

const phases = [
  {
    phase: 1,
    label: 'Verstehen',
    icon: '🧠',
    color: 'blue',
    estimatedTime: '~2 Stunden',
    steps: [
      {
        level: 0,
        title: 'Was ist ein Large Language Model?',
        description:
          'LLMs sind keine Suchmaschinen und keine denkenden Systeme. Verstehe Token-Prediction, Halluzinierung und warum Modelle manchmal lügen — bevor du anfängst.',
        href: '/blog/2026-03-12-was-ist-ein-llm',
        readTime: '~8 Min',
        icon: '📖',
      },
      {
        level: 1,
        title: 'Warum lokal statt Cloud?',
        description:
          'DSGVO, EU AI Act, Datensouveränität: Was auf dem Spiel steht, wenn Unternehmensdaten in Cloud-Modelle fließen — und was das konkret für dich bedeutet.',
        href: '/blog/2026-03-12-warum-lokale-ki-statt-cloud',
        readTime: '~7 Min',
        icon: '🔒',
      },
    ],
  },
  {
    phase: 2,
    label: 'Einrichten',
    icon: '🛠️',
    color: 'green',
    estimatedTime: '~3 Stunden',
    steps: [
      {
        level: 2,
        title: 'Terminal-Grundlagen für AI',
        description:
          '10 Befehle — das ist alles was zwischen dir und deinem ersten lokalen LLM steht. cd, curl, docker ps, ssh, grep und mehr.',
        href: '/blog/2026-03-12-terminal-grundlagen-für-ai',
        readTime: '~6 Min',
        icon: '💻',
      },
      {
        level: 3,
        title: 'Ollama installieren',
        description:
          'In 5 Minuten läuft dein erstes lokales Modell. Eine Installation, ein Befehl — und du chattest mit Qwen oder Llama komplett offline.',
        href: '/blog/2026-03-12-ollama-installieren-schritt-für-schritt',
        readTime: '~8 Min',
        icon: '🦙',
      },
      {
        level: 4,
        title: 'Erster Chatbot mit Open WebUI',
        description:
          'Vom Terminal-Chat zum Browser-Interface. Open WebUI gibt dir ein ChatGPT-ähnliches Interface für deine lokalen Modelle — als Docker-Container.',
        href: '/blog/2026-03-12-open-webui-erster-chatbot',
        readTime: '~10 Min',
        icon: '💬',
      },
    ],
  },
  {
    phase: 3,
    label: 'Aufbauen',
    icon: '🏗️',
    color: 'purple',
    estimatedTime: '~5 Stunden',
    steps: [
      {
        level: 5,
        title: 'Docker Basics für AI',
        description:
          'Ohne Docker läuft kein moderner AI-Stack. Container, Volumes, Compose — die Konzepte die du wirklich brauchst, ohne dich in Details zu verlieren.',
        href: '/blog/2026-03-12-docker-grundlagen-für-ai',
        readTime: '~12 Min',
        icon: '🐳',
      },
      {
        level: 6,
        title: 'Agent Stack aufbauen',
        description:
          'Mehrere Agenten, die zusammenarbeiten. Ein Manager-Agent delegiert Tasks an Spezialisten. Das ist der Kern von modernem AI Engineering.',
        href: '/grundlagen/ai-agent-team',
        readTime: '~25 Min',
        icon: '🤖',
      },
    ],
  },
  {
    phase: 4,
    label: 'Produktiv gehen',
    icon: '🚀',
    color: 'orange',
    estimatedTime: '~4 Stunden + laufend',
    steps: [
      {
        level: 7,
        title: 'n8n Automatisierung',
        description:
          'AI ohne Automatisierung ist nur ein Chatbot. n8n verbindet deinen Stack mit E-Mails, Webhooks und APIs — damit laufen echte Workflows ohne manuelle Eingriffe.',
        href: '/tools/n8n-für-anfaenger',
        readTime: '~20 Min',
        icon: '⚡',
      },
      {
        level: 8,
        title: 'Production Ready → Playbook',
        description:
          'Monitoring, Security, Backup. Der vollständige Stack mit getesteten Docker Compose Files, Grafana Dashboards, n8n Vorlagen und DSGVO-Checklisten.',
        href: 'https://www.ai-engineering.at/products',
        readTime: 'EUR 49',
        icon: '📦',
        isCta: true,
      },
    ],
  },
]

const phaseColorMap: Record<string, { bg: string; border: string; text: string; barBg: string }> = {
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', barBg: 'bg-blue-500' },
  green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', barBg: 'bg-green-500' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', barBg: 'bg-purple-500' },
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', barBg: 'bg-orange-500' },
}

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

      {/* Was du lernst — Überblick */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">
          Was du lernst
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="flex items-start gap-2">
            <span className="text-green-400 shrink-0 mt-0.5">✓</span>
            <span className="text-slate-300 text-sm">Wie LLMs funktionieren — Token-Prediction, Halluzinationen, Grenzen</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400 shrink-0 mt-0.5">✓</span>
            <span className="text-slate-300 text-sm">Warum lokale AI der DSGVO-konforme Weg ist</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400 shrink-0 mt-0.5">✓</span>
            <span className="text-slate-300 text-sm">Terminal, Docker und die Tools die du wirklich brauchst</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400 shrink-0 mt-0.5">✓</span>
            <span className="text-slate-300 text-sm">Ollama installieren und dein erstes lokales LLM starten</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400 shrink-0 mt-0.5">✓</span>
            <span className="text-slate-300 text-sm">Ein Multi-Agent-System mit Orchestration aufbauen</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400 shrink-0 mt-0.5">✓</span>
            <span className="text-slate-300 text-sm">Automatisierung mit n8n — echte Workflows statt nur Chatbot</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400 shrink-0 mt-0.5">✓</span>
            <span className="text-slate-300 text-sm">Production-Ready: Monitoring, Security, Backup</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400 shrink-0 mt-0.5">✓</span>
            <span className="text-slate-300 text-sm">EU AI Act und Compliance-Basics für den Betrieb</span>
          </div>
        </div>
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

      {/* Phases */}
      <div className="space-y-10">
        {phases.map((phase) => {
          const colors = phaseColorMap[phase.color]
          return (
            <div key={phase.phase} className="space-y-4">
              {/* Phase Header with Progress */}
              <div className={`${colors.bg} ${colors.border} border rounded-xl p-4`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{phase.icon}</span>
                    <div>
                      <p className={`text-xs font-bold ${colors.text} uppercase tracking-wider`}>
                        Phase {phase.phase} von 4
                      </p>
                      <h2 className="text-lg font-bold text-white">{phase.label}</h2>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400">Geschätzte Zeit</span>
                    <p className={`text-sm font-semibold ${colors.text}`}>{phase.estimatedTime}</p>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className={`${colors.barBg} h-2 rounded-full transition-all`}
                    style={{ width: `${(phase.phase / 4) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1 text-right">
                  {phase.phase === 4 ? 'Ziel erreicht' : `${phase.phase}/4 Phasen`}
                </p>
              </div>

              {/* Steps in this phase */}
              {phase.steps.map((step, index) => (
                <div key={step.level} className="relative">
                  {/* Connector line */}
                  {index < phase.steps.length - 1 && (
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
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-[#4262FF] flex items-center justify-center text-lg">
                          {step.icon}
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
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-slate-800 group-hover:bg-slate-700 flex items-center justify-center text-lg transition-colors">
                          {step.icon}
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
          )
        })}
      </div>

      {/* Weiterführende Ressourcen — Österreichische Quellen */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">
          Weiterführende Ressourcen
        </h2>
        <p className="text-slate-400 text-sm mb-4">
          Offizielle österreichische und EU-Quellen für AI, Compliance und Förderungen.
        </p>
        <div className="space-y-3">
          <a
            href="https://www.wko.at/oe/gruendung/ai-toolbox.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors group"
          >
            <span className="text-lg shrink-0 mt-0.5">🇦🇹</span>
            <div>
              <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                WKO AI-Toolbox ↗
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Praktische AI-Tools und Leitfäden der Wirtschaftskammer Österreich für KMUs
              </p>
            </div>
          </a>
          <a
            href="https://www.wko.at/oe/oesterreich/wkoe-gewerbe-und-handwerk-nuetzliche-ki-helfer"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors group"
          >
            <span className="text-lg shrink-0 mt-0.5">🇦🇹</span>
            <div>
              <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                WKO KI-Handbuch Gewerbe & Handwerk ↗
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Nützliche KI-Helfer für Gewerbe und Handwerk — Branchenspezifische Empfehlungen
              </p>
            </div>
          </a>
          <a
            href="https://www.ffg.at/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors group"
          >
            <span className="text-lg shrink-0 mt-0.5">🇦🇹</span>
            <div>
              <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                FFG — Österreichische Forschungsförderungsgesellschaft ↗
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Förderungen für AI-Projekte und Digitalisierung in österreichischen Unternehmen
              </p>
            </div>
          </a>
          <a
            href="https://www.rtr.at/rtr/service/ki-servicestelle/projekte-initiativen/Projekte_-_Initiativen.de.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors group"
          >
            <span className="text-lg shrink-0 mt-0.5">🇦🇹</span>
            <div>
              <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                RTR KI-Servicestelle ↗
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Die österreichische KI-Servicestelle der Rundfunk und Telekom Regulierungs-GmbH — Projekte und Initiativen
              </p>
            </div>
          </a>
          <a
            href="https://caralegal.eu/blog/ki-richtlinie-guide-und-vorlage/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors group"
          >
            <span className="text-lg shrink-0 mt-0.5">📋</span>
            <div>
              <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                caralegal KI-Richtlinie Guide & Vorlage ↗
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Praktischer Guide mit Vorlage für unternehmenseigene KI-Richtlinien
              </p>
            </div>
          </a>
        </div>
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
