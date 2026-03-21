
import Callout from "../../../components/Callout"
import ComparisonTable from "../../../components/ComparisonTable"

export const metadata = {
  title: 'Lokal vs Cloud: TCO Vergleich | AI Engineering Wiki',
  description:
    'TCO-Vergleich für AI-Workloads: Cloud API vs lokaler AI-Stack (Ollama, n8n, Monitoring). Kosten, Risiken, DSGVO und Betrieb in der Praxis.',
}

export default function LokalVsCloud() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Lokale AI vs. Cloud: Der TCO-Vergleich</h1>
        <p className="text-gray-400 mt-2">Grundlagen · 8 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-gray-300">
          Cloud AI wirkt günstig — kein Hardware-Kauf, keine Wartung, einfach loslegen.
          Aber die versteckten Kosten summieren sich. Hier ist unser Vergleich, basierend auf echter Nutzung.
        </p>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-4">
          <p className="text-blue-300 text-sm">
            <strong>Hinweis:</strong> Dies ist unser Vergleich für den Use Case "laufend 
            AI-Agent für Business-Automation". Für einmalige Analysen oder Prototypen 
            kann Cloud günstiger sein.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Die Szenarien</h2>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="bg-gray-900 border border-blue-700 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-3">Cloud-Nutzung</h3>
            <p className="text-gray-300 text-sm">
              Täglich 100 API-Calls an OpenAI/Gemini/Claude für Workflow-Automation, 
              Support-Chatbot und Content-Generierung.
            </p>
          </div>
          <div className="bg-gray-900 border border-green-700 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-3">Lokaler Stack</h3>
            <p className="text-gray-300 text-sm">
              Ollama auf eigener Hardware (RTX 3090), n8n für Automation, 
              self-hosted Monitoring. Alles läuft 24/7.
            </p>
          </div>
        </div>

        <figure className="my-8">
          <img src="/images/infographics/lokal-vs-cloud-vergleich.png" alt="Lokale AI vs Cloud — Vergleich der Vor- und Nachteile" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Lokal vs Cloud: Kosten, Datenschutz und Kontrolle im direkten Vergleich</figcaption>
        </figure>

        <figure className="my-8">
          <img src="/images/infographics/lokal-vs-cloud-tco-vergleich.png" alt="Lokal vs Cloud TCO Vergleich — Gesamtkosten über 24 Monate" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">TCO Vergleich: Lokale AI vs Cloud über 24 Monate — wann sich lokal rechnet</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">Kostenvergleich (pro Monat)</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Kostenpunkt</th>
                <th className="text-right py-2 text-gray-400">Cloud</th>
                <th className="text-right py-2 text-gray-400">Lokal</th>
                <th className="text-right py-2 text-gray-400">Differenz</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">API-Kosten</td>
                <td className="text-right py-2 text-red-400">€150-300</td>
                <td className="text-right py-2">€0</td>
                <td className="text-right py-2 text-red-400">-€150-300</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Hardware/Amortisation</td>
                <td className="text-right py-2">€0</td>
                <td className="text-right py-2">€25-50</td>
                <td className="text-right py-2 text-green-400">+€25-50</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Strom (geschätzt)</td>
                <td className="text-right py-2">€0</td>
                <td className="text-right py-2">€20-40</td>
                <td className="text-right py-2 text-green-400">+€20-40</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Hosting/Server</td>
                <td className="text-right py-2">€0</td>
                <td className="text-right py-2">€10-20</td>
                <td className="text-right py-2 text-green-400">+€10-20</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Monitoring/Tools</td>
                <td className="text-right py-2">€20-50</td>
                <td className="text-right py-2">€0*</td>
                <td className="text-right py-2 text-green-400">-€20-50</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">DSGVO-Compliance</td>
                <td className="text-right py-2 text-red-400">€50-200</td>
                <td className="text-right py-2">€0</td>
                <td className="text-right py-2 text-green-400">-€50-200</td>
              </tr>
              <tr className="border-t-2 border-gray-600">
                <td className="py-2 font-semibold text-white">Summe/Monat</td>
                <td className="text-right py-2 font-semibold text-red-400">€220-550</td>
                <td className="text-right py-2 font-semibold text-green-400">€55-110</td>
                <td className="text-right py-2 font-semibold text-green-400">-€165-440</td>
              </tr>
            </tbody>
          </table>
          <p className="text-gray-500 text-xs mt-2">*Grafana + Prometheus sind Open Source, kostenlos</p>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Die versteckten Cloud-Kosten</h2>
        
        <ul className="list-disc list-inside text-gray-300 space-y-3 mt-4">
          <li>
            <strong>API-Kosten eskalieren</strong> — Je mehr Workflows du automatisierst, 
            desto mehr Calls. Oft 2-3x höher als initial geplant.
          </li>
          <li>
            <strong>DSGVO-Risiko</strong> — Daten gehen in die USA. Art. 44 ff. DSGVO 
            erfordert zusätzliche Maßnahmen (SCCs, TIAs). Rechtsberatung: €1.000+.
          </li>
          <li>
            <strong>Vendor Lock-in</strong> — Deine Prompts, Workflows, Daten sind beim 
            Anbieter. Umsteigen ist teuer und zeitaufwendig.
          </li>
          <li>
            <strong>Rate Limits</strong> — Cloud-Anbieter drosseln bei viel Nutzung. 
            Business-Pläne kosten wieder extra.
          </li>
          <li>
            <strong>Datenschutz-Vorfälle</strong> — Jeder Datenleck ist dein Problem. 
            Lokale Systeme = weniger Risiko.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Wann Cloud günstiger ist</h2>
        
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Use Case</th>
                <th className="text-left py-2 text-gray-400">Empfehlung</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">Prototyp (wenige Calls/Monat)</td>
                <td className="py-2 text-green-400">Cloud — kein Setup nötig</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Einmalige Analysen</td>
                <td className="py-2 text-green-400">Cloud — pay-as-you-go</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Kein Budget für Hardware</td>
                <td className="py-2 text-green-400">Cloud starten, später umsteigen</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Wenige interne Tools</td>
                <td className="py-2 text-green-400">Cloud — Overscale für little use</td>
              </tr>
              <tr>
                <td className="py-2 text-white font-semibold">Laufende Automation (unser Use Case)</td>
                <td className="py-2 text-green-400 font-semibold">Lokal — ab 6 Monaten günstiger</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Break-Even Analyse (ehrlich)</h2>

        <p className="text-gray-300">
          Wann lohnt sich der Umstieg auf lokal? Das hängt stark von deiner Nutzung ab.
        </p>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <pre className="text-gray-300">
{`TCO Faustregel (Consumer Hardware, Österreich):

Hardware (einmalig):
  RTX 3090 gebraucht:     ~EUR 900
  System (CPU, RAM, NVMe): EUR 500-800

Laufende Kosten (50% Last, 24/7):
  Strom:                   ~EUR 49/Monat → ~EUR 588/Jahr

Gesamt Jahr 1:            ~EUR 2.000-2.300
Gesamt ab Jahr 2:         ~EUR 588/Jahr

Break-Even vs. Cloud API:
  Laut DevTk.AI/Prem AI: erst ab 50M-200M Tokens/Monat
  Unter 2M Tokens/Tag: API ist günstiger
  Hidden Cost Faktor: TCO wird 3-5x unterschätzt (AISuperior)
  Engineering-Anteil: 45-55% des TCO (AISuperior)

Cloud API Preise (März 2026, pro 1M Tokens):
  GPT-4o:           $2.50 Input / $10.00 Output
  Claude Sonnet 4.5: $3.00 Input / $15.00 Output
  Gemini 2.5 Pro:   $1.25 Input / $10.00 Output
  GPT-4o-mini:      $0.15 Input / $0.60 Output`}
          </pre>
        </div>

        <Callout type="info" title="Break-Even ist nutzungsabhängig">
          <p>
            Der Break-Even für Self-Hosting liegt bei 50-200 Millionen Tokens pro Monat.
            Unter 2M Tokens/Tag ist die Cloud API günstiger. Der finanzielle Vorteil von
            lokal wird oft überschätzt — der echte Vorteil liegt bei Datenschutz (DSGVO),
            Verfügbarkeit (offline) und Unabhängigkeit von Anbietern.
          </p>
        </Callout>

        <h2 className="text-xl font-semibold text-white mt-8">Hardware-Kosten (ehrlich)</h2>

        <ComparisonTable
          headers={["GPU", "VRAM", "Preis (EUR)", "Was läuft darauf", "Einschränkung"]}
          rows={[
            ["RTX 3060 12GB", "12 GB", "~350", "7B Modelle (Mistral 7B, Llama 3.2 8B)", "NUR kleine Modelle, für 14B+ zu wenig VRAM"],
            ["RTX 4070 Ti Super", "16 GB", "~800", "Bis 14B komfortabel (Qwen 2.5 14B)", "32B nur stark quantisiert, 70B unmöglich"],
            ["RTX 3090 (gebraucht)", "24 GB", "750-1.123", "Bis 34B quantisiert (Q4_K_M)", "70B passt NICHT (braucht ~40 GB VRAM)"],
            ["RTX 4090", "24 GB", "1.800-2.000", "Bis 34B komfortabel", "Gleiche 24 GB VRAM-Grenze wie RTX 3090"],
          ]}
        />

        <h2 className="text-xl font-semibold text-white mt-8">Inference Speed (RTX 3090, echte Messwerte)</h2>

        <ComparisonTable
          headers={["Modell", "Parameter", "tok/s (RTX 3090)", "Quelle"]}
          rows={[
            ["8B Modelle (allgemein)", "8B", "~112", "CoreLab"],
            ["GLM 7.8B", "7.8B", "90.1", "LocalAIMaster"],
            ["DeepSeek-R1 14B", "14B", "56.6", "LocalAIMaster"],
            ["Qwen3 14B", "14B", "43.2", "LocalAIMaster"],
            ["RTX 3090 Durchschnitt", "—", "~42", "LocalAIMaster"],
          ]}
        />

        <h2 className="text-xl font-semibold text-white mt-8">Stromkosten (ehrlich)</h2>

        <p className="text-gray-300 mt-2 mb-4">
          &quot;Kostenlos nach Anschaffung&quot; ist falsch. GPUs brauchen Strom, und der kostet
          in Österreich EUR 0,34/kWh (Privat, inkl. Steuern, Stand 2026). Hier die echten Zahlen bei 24/7 Betrieb:
        </p>

        <ComparisonTable
          headers={["Szenario (RTX 3090)", "Watt", "kWh/Monat", "EUR/Monat (AT)", "EUR/Jahr"]}
          rows={[
            ["GPU Volllast (350W TDP)", "350", "252", "EUR 85,68", "EUR 1.028"],
            ["System gesamt (~450W)", "450", "324", "EUR 110,16", "EUR 1.322"],
            ["GPU Idle (~18W)", "18", "13", "EUR 4,42", "EUR 53"],
            ["Realistisch (50% Last, 24/7)", "~200", "144", "EUR 48,96", "EUR 588"],
          ]}
        />

        <Callout type="warning" title="Stromkosten nicht vergessen">
          <p>
            Bei realistischem Betrieb (50% Last, 24/7) einer RTX 3090 zahlst du ca. EUR 49/Monat
            Strom in Österreich. Das sind ~EUR 588/Jahr. Peak-Verbrauch kann bis 560W gehen
            (60% über TDP). Strompreis AT Privat: EUR 0,34/kWh (EU-Durchschnitt: EUR 0,258).
          </p>
        </Callout>

        <h2 className="text-xl font-semibold text-white mt-8">Die Qualitätslücke (ehrlich)</h2>

        <p className="text-gray-300 mt-2 mb-4">
          Lokale Modelle sind gut — aber nicht so gut wie die besten Cloud-Modelle.
          Hier der ehrliche Vergleich:
        </p>

        <ComparisonTable
          headers={["Task", "GPT-4o (Cloud)", "Llama 3.3 70B (Lokal)"]}
          rows={[
            ["Reasoning / Logik", "69%", "44%"],
            ["Klassifikation", "73%", "70%"],
            ["Code Generation", "Sehr gut", "~85-90% der Cloud-Qualität"],
            ["Einfache Extraktion", "Exzellent", "~95% gleichwertig"],
          ]}
        />

        <Callout type="warning" title="Die Qualitätslücke ist REAL">
          <p>
            Vor allem bei komplexem Reasoning (logische Schlüsse, mehrstufige Analyse,
            juristische Argumentation) liegt Cloud deutlich vorne. Wer behauptet lokale
            Modelle seien &quot;fast gleichwertig&quot; verschweigt diesen Unterschied.
          </p>
        </Callout>

        <Callout type="tip" title="Wo lokal trotzdem reicht">
          <p>
            Für 80% der alltäglichen Tasks (Daten-Extraktion, Klassifikation,
            einfache Q&amp;A, Zusammenfassungen) sind lokale Modelle ausreichend.
            Für komplexes Reasoning: Cloud-API als Backup.
          </p>
        </Callout>

        <h2 className="text-xl font-semibold text-white mt-8">Unsere Empfehlung</h2>

        <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 mt-4">
          <h3 className="font-semibold text-white mb-2">Hybrid-Ansatz (unser Setup)</h3>
          <ul className="text-gray-300 space-y-2">
            <li><strong>Lokal:</strong> Ollama für regelmäßige Tasks (Extraktion, Klassifikation, einfache Q&amp;A)</li>
            <li><strong>Cloud:</strong> GPT-4o / Claude für komplexe Reasoning-Tasks (wenige Calls/Monat)</li>
            <li><strong>Kosten:</strong> ~EUR 49/Monat Strom (AT, 50% Last) + EUR 20-40/Monat Cloud-API</li>
            <li><strong>Ergebnis:</strong> Guter Kompromiss aus Kosten, Qualität und Datenschutz</li>
          </ul>
        </div>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Fazit</h3>
          <p className="text-gray-300">
            Lokal ist nach 6-12 Monaten günstiger — BEI regelmäßiger Nutzung. Bei
            geringer Nutzung ist Cloud finanziell besser. Die Qualität ist für 80% der
            Tasks ausreichend, für komplexes Reasoning braucht man Cloud-APIs als
            Ergänzung. Der EHRLICHSTE Ansatz ist Hybrid: lokal wo es reicht, Cloud wo
            es zählt. Dazu kommen die DSGVO-Vorteile (kein Drittlandtransfer) und die
            Unabhängigkeit von Cloud-Anbietern.
          </p>
        </div>

        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://www.globalpetrolprices.com/Austria/electricity_prices/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GlobalPetrolPrices: Austria Electricity 2026</a> — Strompreis AT Privat EUR 0,34/kWh</li>
            <li><a href="https://bestvaluegpu.com/en-eu/history/new-and-used-rtx-3090-price-history-and-specs/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">BestValueGPU: RTX 3090 Preisentwicklung</a> — Gebrauchtpreise EUR 750-1.123</li>
            <li><a href="https://www.xda-developers.com/used-rtx-3090-still-best-for-local-ai-in-value/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">XDA Developers: RTX 3090 Value King 2026</a> — RTX 3090 als bestes Preis-Leistungs-Verhältnis</li>
            <li><a href="https://devtk.ai/en/blog/self-hosting-llm-vs-api-cost-2026/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">DevTk.AI: Self-Hosting vs API Cost 2026</a> — Break-Even bei 50M-200M Tokens/Monat</li>
            <li><a href="https://blog.premai.io/self-hosted-llm-guide-setup-tools-cost-comparison-2026/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Prem AI: Self-Hosted LLM Guide 2026</a> — Unter 2M Tokens/Tag ist API günstiger</li>
            <li><a href="https://aisuperior.com/open-source-llm-deployment-cost/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">AISuperior: LLM Deployment Cost</a> — Hidden Cost Faktor 3-5x, Engineering 45-55%</li>
            <li><a href="https://openai.com/api/pricing/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">OpenAI Pricing</a> — GPT-4o $2.50/$10 pro 1M Tokens</li>
            <li><a href="https://platform.claude.com/docs/en/about-claude/pricing" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Anthropic Pricing</a> — Claude Sonnet $3/$15 pro 1M Tokens</li>
            <li><a href="https://ai.google.dev/gemini-api/docs/pricing" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Google Gemini Pricing</a> — Gemini 2.5 Pro $1.25/$10 pro 1M Tokens</li>
            <li><a href="https://localaimaster.com/blog/best-gpus-for-ai-2025" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">LocalAIMaster: Best GPUs for AI</a> — Inference Speed RTX 3090 (tok/s)</li>
            <li><a href="https://corelab.tech/llmgpu/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">CoreLab: LLM GPU Benchmarks</a> — 8B ~112 tok/s auf RTX 3090</li>
            <li><a href="https://intuitionlabs.ai/articles/local-llm-deployment-24gb-gpu-optimization" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">IntuitionLabs: 24GB GPU Optimization</a> — Max ~34B auf 24 GB VRAM</li>
            <li><a href="https://www.notebookcheck.net/The-NVIDIA-GeForce-RTX-3090-may-have-a-350-W-TDP-but-it-can-consume-nearly-60-more.494757.0.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">NotebookCheck: RTX 3090 Power</a> — TDP 350W, Peak bis 560W</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
