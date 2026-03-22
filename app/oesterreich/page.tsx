export const metadata = {
  title: 'KI in Österreich | AI Engineering Wiki',
  description:
    'Behörden, Förderungen, Community und Rechtslage: Alle relevanten österreichischen KI-Ressourcen auf einen Blick.',
}

export default function OesterreichPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-white">
          KI in Österreich — Behörden, Förderungen, Community
        </h1>
        <p className="text-slate-400 mt-2">
          Übersicht aller relevanten österreichischen KI-Ressourcen: Regulierung, Förderprogramme, Leitfäden und Community.
        </p>
      </div>

      {/* Behörden & Regulierung */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white border-b border-slate-800 pb-2">
          Behörden &amp; Regulierung
        </h2>
        <div className="space-y-3">
          <a
            href="https://www.rtr.at/rtr/service/ki-servicestelle/ki-servicestelle.de.html"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
          >
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
              RTR KI-Servicestelle
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              AI Act Chatbot, Dokumentation und zentrale Anlaufstelle für KI-Regulierung in Österreich.
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
              Datenschutzbehörde (DSB)
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Österreichische Datenschutzbehörde — zuständig für DSGVO-Durchsetzung und Beschwerden.
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
              KI-Monitor, AI Factory Austria und die nationale KI-Strategie der Bundesregierung.
            </p>
            <span className="text-xs text-slate-500 mt-2 inline-block">digitalaustria.gv.at</span>
          </a>
        </div>
      </section>

      {/* Förderungen */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white border-b border-slate-800 pb-2">
          Förderungen
        </h2>
        <div className="space-y-3">
          <a
            href="https://www.ffg.at/ai-tech-green-2025"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
          >
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
              FFG AI Ökosysteme
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Förderprogramm der Forschungsförderungsgesellschaft für AI-Technologie und Green-Transition.
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
              Austria Wirtschaftsservice — Förderung für AI-Adoption in Unternehmen und Wachstum.
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
              aws KI-Marktplatz
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Marktplatz der Austria Wirtschaftsservice für KI-Lösungen und KI-Dienstleister.
            </p>
            <span className="text-xs text-slate-500 mt-2 inline-block">aws.at</span>
          </a>
        </div>
      </section>

      {/* Leitfäden & Richtlinien */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white border-b border-slate-800 pb-2">
          Leitfäden &amp; Richtlinien
        </h2>
        <div className="space-y-3">
          <a
            href="https://www.wko.at/digitalisierung/ki-guidelines-fuer-kmu"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
          >
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
              WKO KI-Guidelines für KMU
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Praxisorientierte KI-Richtlinien der Wirtschaftskammer Österreich für kleine und mittlere Unternehmen.
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
              WKO AI-Toolbox (PDF)
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Toolbox der WKO mit praktischen KI-Werkzeugen und Anleitungen für Gründer und Unternehmen.
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
              WKO KI Österreich
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Übersichtsseite der WKO zu Künstlicher Intelligenz in Österreich — Trends, Angebote, Veranstaltungen.
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
              Live Code, keine Slides, Builder-to-Builder — die Wiener Community für AI-Praktiker und Entwickler.
            </p>
            <span className="text-xs text-slate-500 mt-2 inline-block">vienna.aitinkerers.org</span>
          </a>
        </div>
      </section>

      {/* EU AI Act & Recht */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white border-b border-slate-800 pb-2">
          EU AI Act &amp; Recht
        </h2>
        <div className="space-y-3">
          <a
            href="https://www.wko.at/digitalisierung/ai-act-eu"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
          >
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
              WKO AI Act Übersicht
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Praxisnahe Übersicht der Wirtschaftskammer Österreich zum EU AI Act — KMU-Perspektive, Pflichten und Fristen.
            </p>
            <span className="text-xs text-slate-500 mt-2 inline-block">wko.at</span>
          </a>
        </div>
      </section>

      {/* Internationale Referenzen */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white border-b border-slate-800 pb-2">
          Internationale Referenzen
        </h2>
        <div className="space-y-3">
          <a
            href="https://digital-strategy.ec.europa.eu/en/policies/ai-office"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
          >
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
              EU AI Office
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Zentrale Stelle der EU-Kommission für KI-Governance, Durchsetzung des AI Act und internationale Koordination.
            </p>
            <span className="text-xs text-slate-500 mt-2 inline-block">digital-strategy.ec.europa.eu</span>
          </a>
          <a
            href="https://oecd.ai/en/"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors group"
          >
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
              OECD.AI Policy Observatory
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Internationale KI-Policy-Datenbank mit Ländervergleichen, Trends und Empfehlungen der OECD.
            </p>
            <span className="text-xs text-slate-500 mt-2 inline-block">oecd.ai</span>
          </a>
        </div>
      </section>

      {/* Rechtslage Kurzübersicht */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white border-b border-slate-800 pb-2">
          Rechtslage Kurzübersicht
        </h2>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-blue-400 font-mono text-sm mt-0.5">Art. 4</span>
            <p className="text-slate-300 text-sm">
              <strong className="text-white">KI-Kompetenz:</strong> gilt seit 02.02.2025 — alle Anbieter und Betreiber
              müssen sicherstellen, dass Personal über ausreichende KI-Kompetenz verfügt.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-blue-400 font-mono text-sm mt-0.5">Enforcement</span>
            <p className="text-slate-300 text-sm">
              <strong className="text-white">Ab 08.2026:</strong> Durchsetzung der meisten EU AI Act Pflichten
              durch nationale Behörden.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-blue-400 font-mono text-sm mt-0.5">AI Officer</span>
            <p className="text-slate-300 text-sm">
              <strong className="text-white">Keine Pflicht</strong> zur Bestellung eines eigenen AI Officers —
              im Gegensatz zum Datenschutzbeauftragten gibt es keine gesetzliche Vorgabe.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-blue-400 font-mono text-sm mt-0.5">Zertifizierung</span>
            <p className="text-slate-300 text-sm">
              <strong className="text-white">Keine Einheitszertifizierung</strong> — es gibt derzeit kein einheitliches
              KI-Zertifikat oder Gütesiegel auf EU- oder nationaler Ebene.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
