import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI im Unternehmen | AI Engineering Wiki',
  description: 'Warum Unternehmen lokale AI einsetzen: Datenschutz (DSGVO), Kostenkontrolle und technische Souveränität.',
}

export default function KIUnternehmenPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">AI im Unternehmen</h1>
        <p className="text-gray-400 mt-2">
          Warum Unternehmen lokale AI einsetzen.
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        <figure className="my-8">
          <img src="/images/infographics/ki-unternehmen-4-saeulen.png" alt="KI im Unternehmen — Die 4 Saeulen: Datensouveraenitaet, Kosten, Latenz, Anpassung" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Die 4 Saeulen lokaler KI im Unternehmen: Datensouveraenitaet, Kosten, Latenz und Anpassung</figcaption>
        </figure>

        <h2>Der Paradigmenwechsel</h2>
        <p>
          Cloud-AI ist schnell gestartet, aber nicht immer die beste Default-Option. Lokale AI gibt dir mehr Datensouveränität,
          planbare Kosten und Kontrolle über Betrieb und Zugriff.
        </p>

        <h2>Vorteile lokaler AI</h2>

        <h3>1. Datensouveränität</h3>
        <p>
          Deine Daten verlassen nie dein Netzwerk. Weniger Compliance-Risiko,
          weniger DSGVO-Komplexität. Du kontrollierst, wer Zugriff hat und was mit den Daten passiert.
        </p>

        <h3>2. Kosten</h3>
        <p>
          Keine Pay-per-Token-Gebühren. Nach dem initialen Setup sind die
          laufenden Kosten vorhersagbar und oft 70-90% niedriger als
          Cloud-Alternativen.
        </p>

        <h3>3. Latenz</h3>
        <p>
          Lokale Modelle antworten in Millisekunden. Keine Netzwerk-Abhängigkeit,
          keine Ausfallzeiten wegen Internet-Problemen.
        </p>

        <h3>4. Anpassung</h3>
        <p>
          Du kannst Modelle feintunen, eigene Embeddings erstellen, RAG
          implementieren — alles ohne externe Abhängigkeiten.
        </p>

        <h2>Typische Anwendungsfälle</h2>
        <ul>
          <li><strong>Kundensupport:</strong> Automatisierte Antworten auf Deutsch</li>
          <li><strong>Dokumentenverarbeitung:</strong> Vertragsanalyse, Rechnungs-Parsing</li>
          <li><strong>Interne Suche:</strong> Wissensdatenbank durchsuchen</li>
          <li><strong>Code-Assistenz:</strong> Eigenes Coding-Modell fürs Team</li>
        </ul>

        <h2>Anforderungen</h2>
        <ul>
          <li>Mindestens 16GB RAM (besser 32GB+)</li>
          <li>Moderne CPU oder GPU für schnelle Inference</li>
          <li>Grundverständnis von Docker / Linux</li>
          <li>IT-Ressourcen für Wartung</li>
        </ul>

        <h2>Kostenvergleich (Beispiel)</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2">Szenario</th>
              <th className="py-2">Cloud (GPT-4)</th>
              <th className="py-2">Lokal (Llama 3)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-800">
              <td className="py-2">10.000 Anfragen/Monat</td>
              <td className="py-2">~200 EUR</td>
              <td className="py-2">~20 EUR (Strom)</td>
            </tr>
            <tr className="border-b border-gray-800">
              <td className="py-2">100.000 Anfragen/Monat</td>
              <td className="py-2">~2.000 EUR</td>
              <td className="py-2">~50 EUR</td>
            </tr>
            <tr>
              <td className="py-2">Setup-Kosten</td>
              <td className="py-2">0 EUR</td>
              <td className="py-2">~2.000 EUR</td>
            </tr>
          </tbody>
        </table>

        <h2>Fazit</h2>
        <p>
          Lokale AI ist nicht für jedes Team sinnvoll. Wenn du Datenschutz ernst nimmst, Kosten kontrollieren willst und Betrieb stemmen kannst,
          ist lokal oft die bessere Wahl. Der Break-Even liegt häufig bei etwa 20.000-50.000 API-Calls pro Monat.
        </p>

        <h2>Quellen</h2>
        <ul>
          <li><a href="https://localaimaster.com/local-vs-cloud-llm" target="_blank" className="text-brand-blue hover:underline">LocalAI Master Cost Comparison</a></li>
          <li><a href="https://www.enterprise-ai-rescue.com/local-vs-cloud-llm" target="_blank" className="text-brand-blue hover:underline">Enterprise AI Rescue</a></li>
        </ul>
      </div>
    </div>
  )
}
