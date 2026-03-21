import { Metadata } from "next"
import Callout from "../../../components/Callout"
import KeyTakeaway from "../../../components/KeyTakeaway"
import ComparisonTable from "../../../components/ComparisonTable"
import PlantUMLDiagram from "../../../components/PlantUMLDynamic"
import { RelatedArticles } from "../../../components/RelatedArticles"

export const metadata: Metadata = {
  title: "Was ist ein LLM? Large Language Models erklärt | AI Engineering Wiki",
  description:
    "Was ist ein Large Language Model (LLM)? Wie funktionieren Transformer, Tokens und Inferenz? Modellgroessen, VRAM-Anforderungen und praktische Tipps.",
}

export default function WasIstEinLLMPage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Grundlagen</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Was ist ein Large Language Model (LLM)?
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          Wie Sprachmodelle funktionieren, warum sie manchmal halluzinieren und was du
          brauchst um sie lokal zu betreiben.
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm text-white/40">
          <span>Lesezeit: 12 min</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Zuletzt aktualisiert: Maerz 2026</span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        {/* Summary Callout */}
        <Callout type="summary" title="Auf einen Blick">
          <p>
            Ein Large Language Model (LLM) ist ein neuronales Netz, das auf riesigen
            Textmengen trainiert wurde und Sprache versteht, generiert und übersetzt.
            LLMs sagen Wort für Wort vorher, welches Token als naechstes kommen
            sollte. Sie koennen lokal auf eigener Hardware laufen — ohne Cloud, ohne
            Abhaengigkeit.
          </p>
        </Callout>

        {/* Section 1: Was ist ein LLM */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Was genau ist ein LLM?
          </h2>
          <p className="text-white/70 leading-relaxed">
            Ein Large Language Model ist eine Form von kuenstlicher Intelligenz, die
            auf der Transformer-Architektur basiert. Das Modell wurde mit Milliarden
            von Texten aus dem Internet trainiert — Buecher, Wikipedia, Foren,
            wissenschaftliche Arbeiten — und hat dabei statistische Muster in Sprache
            gelernt.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            Der Kern: Ein LLM berechnet für jedes moegliche naechste Wort eine
            Wahrscheinlichkeit und waehlt dann das wahrscheinlichste. Das klingt
            simpel, aber bei 70 Milliarden Parametern und 128.000 Tokens Kontext
            entstehen erstaunlich gute Ergebnisse.
          </p>
        </section>

        {/* Section 2: Transformer Architecture */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Die Transformer-Architektur (vereinfacht)
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Seit dem Paper &quot;Attention is All You Need&quot; (2017) basieren alle
            modernen LLMs auf Transformern. Die Kernidee: Jedes Wort im Text &quot;schaut&quot;
            auf alle anderen Woerter gleichzeitig und lernt, welche Zusammenhaenge
            wichtig sind.
          </p>

          <PlantUMLDiagram
            diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor white
skinparam ArrowColor #31F1A8
skinparam roundCorner 15
skinparam rectangleBackgroundColor #1a1a2e
skinparam rectangleBorderColor #31F1A8

title Transformer Architektur (vereinfacht)

rectangle "Input Text" as input
rectangle "Tokenizer" as tok
rectangle "Embedding" as emb
rectangle "Self-Attention\\n(Kontext verstehen)" as att #0E2A36
rectangle "Feed-Forward\\n(Verarbeitung)" as ff #0E2A36
rectangle "Output\\n(nächstes Token)" as out

input --> tok
tok --> emb
emb --> att
att --> ff
ff --> out
@enduml`}
            caption="Vereinfachter Aufbau eines Transformer-basierten LLMs"
          />

          <Callout type="info" title="Was ist Self-Attention?">
            <p>
              Self-Attention ist der Mechanismus, mit dem das Modell versteht, welche
              Woerter in einem Satz zusammengehoeren. Wenn du schreibst &quot;Der Hund
              jagte die Katze, weil er hungrig war&quot; — Attention hilft dem Modell zu
              verstehen, dass &quot;er&quot; sich auf &quot;Hund&quot; bezieht, nicht auf &quot;Katze&quot;.
            </p>
          </Callout>
        </section>

        {/* Section 3: Tokens */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Tokens: Wie LLMs Text verarbeiten
          </h2>
          <p className="text-white/70 leading-relaxed">
            LLMs lesen keine Woerter — sie lesen Tokens. Ein Token ist ein
            Textfragment, oft ein Wort oder Wort-Teil. &quot;Datenschutzgrundverordnung&quot;
            wird zum Beispiel in 3-4 Tokens zerlegt. Englische Texte brauchen weniger
            Tokens als deutsche, weil die meisten Modelle auf englischen Daten
            trainiert wurden.
          </p>

          <PlantUMLDiagram
            diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor white
skinparam ArrowColor #31F1A8
skinparam roundCorner 15
skinparam rectangleBackgroundColor #1a1a2e
skinparam rectangleBorderColor #31F1A8

title Token Prediction

rectangle "Die Hauptstadt\\nvon Österreich ist" as input
rectangle "LLM\\n(70B Parameter)" as llm #0E2A36
rectangle "Wien (94%)" as out1 #22c55e
rectangle "Linz (3%)" as out2 #1a1a2e
rectangle "Graz (2%)" as out3 #1a1a2e

input --> llm
llm --> out1
llm --> out2
llm --> out3
@enduml`}
            caption="Token-Prediction: Das Modell erzeugt Text Token für Token"
          />

          <Callout type="tip" title="Faustregel für Tokens">
            <p>
              1 Token ist ungefaehr 3/4 eines englischen Wortes. Für Deutsch rechne
              mit 1 Token pro halbes Wort. Ein typischer Absatz (100 Woerter) sind ca.
              130-150 Tokens. Context Window von 128K = ca. 200 Seiten Text.
            </p>
          </Callout>
        </section>

        {/* Section 4: LLM vs Suchmaschine */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            LLM vs. Suchmaschine
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Ein haeufiges Missverstaendnis: LLMs sind keine Suchmaschinen. Sie
            &quot;wissen&quot; nichts — sie berechnen, welche Antwort statistisch am
            wahrscheinlichsten ist.
          </p>

          <ComparisonTable
            headers={["Eigenschaft", "Suchmaschine (Google)", "LLM (ChatGPT, Llama)"]}
            rows={[
              [
                "Datenquelle",
                "Live-Index des Internets",
                "Trainings-Daten (Stichtag)",
              ],
              [
                "Aktualitaet",
                "Echtzeit",
                "Wissen endet am Trainings-Cutoff",
              ],
              [
                "Antwortformat",
                "Links zu Webseiten",
                "Fliesstext, Code, Tabellen",
              ],
              [
                "Genauigkeit",
                "Quelle pruefbar",
                "Kann halluzinieren (erfundene Fakten)",
              ],
              [
                "Personalisierung",
                "Basierend auf Suchhistorie",
                "Basierend auf Konversation",
              ],
              [
                "Kosten",
                "Kostenlos (mit Werbung)",
                "API-Kosten oder lokale Hardware",
              ],
            ]}
          />
        </section>

        {/* Section 5: Halluzinationen */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Halluzinationen: Wenn LLMs luegen
          </h2>
          <p className="text-white/70 leading-relaxed">
            LLMs koennen Fakten erfinden, die überzeugend klingen aber falsch sind.
            Das passiert, weil sie nicht &quot;wissen&quot; — sie berechnen statistische
            Wahrscheinlichkeiten. Wenn keine gute Antwort in den Trainingsdaten war,
            generieren sie trotzdem etwas Plausibles.
          </p>

          <Callout type="warning" title="Halluzinations-Risiko">
            <p>
              LLMs erfinden Zitate, Gesetze, URLs und Statistiken. Besonders
              gefaehrlich bei: juristischen Texten, medizinischen Ratschlaegen,
              historischen Fakten und technischen Spezifikationen. IMMER die Ausgabe
              verifizieren, bevor du sie weiterverwendest.
            </p>
          </Callout>

          <Callout type="tip" title="Halluzinationen reduzieren">
            <p>
              <strong>RAG (Retrieval Augmented Generation)</strong> ist die beste
              Methode: Statt das Modell &quot;raten&quot; zu lassen, fuetterst du es mit echten
              Dokumenten als Kontext. Das Modell antwortet dann basierend auf deinen
              Daten statt auf seinen Trainingsdaten. Mehr dazu im{" "}
              <a
                href="/tools/rag-guide"
                className="text-blue-400 hover:underline"
              >
                RAG Complete Guide
              </a>
              .
            </p>
          </Callout>
        </section>

        {/* Section 6: Modellgroessen */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Modellgroessen: Von 7B bis 70B
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            &quot;B&quot; steht für Milliarden Parameter. Mehr Parameter bedeutet mehr
            &quot;Wissen&quot; und bessere Qualität — aber auch mehr VRAM und langsamere
            Antworten. Die Kunst liegt im richtigen Trade-off.
          </p>

          <ComparisonTable
            headers={[
              "Groesse",
              "VRAM (Q4)",
              "Speed (RTX 3090)",
              "Qualität",
              "Beispiel-Modelle",
            ]}
            rows={[
              [
                "7-8B",
                "~5 GB",
                "~112 tok/s",
                "Gut für einfache Tasks",
                "Llama 3.3 8B, Mistral 7B, Qwen 2.5 7B",
              ],
              [
                "13-14B",
                "~10 GB",
                "43-57 tok/s",
                "Solide Allrounder",
                "Qwen3 14B, DeepSeek R1 14B",
              ],
              [
                "24-32B",
                "~16-20 GB",
                "~20-30 tok/s",
                "Nahe Cloud-Qualität",
                "Mistral Small 3.1 24B, Qwen 2.5 32B",
              ],
              [
                "70B",
                "~40 GB",
                "Passt NICHT auf 24 GB GPU",
                "Beste lokale Qualität",
                "Llama 3.3 70B, Qwen 2.5 72B",
              ],
            ]}
          />

          <Callout type="warning" title="70B braucht mehr als 24 GB VRAM">
            <p>
              Ein 70B Modell in Q4_K_M Quantisierung braucht ca. 40 GB VRAM.
              Das passt NICHT auf eine einzelne RTX 3090 oder RTX 4090 (jeweils 24 GB).
              Für 70B brauchst du 48 GB+ (z.B. 2x RTX 3090 oder eine RTX 6000 Ada).
              Mit 24 GB VRAM ist bei ca. 34B Modellen Schluss.
            </p>
          </Callout>

          <Callout type="tip" title="Hardware-Empfehlung">
            <p>
              <strong>RTX 4060 (8 GB VRAM):</strong> 7B Modelle problemlos.{" "}
              <strong>RTX 4070 Ti Super (16 GB):</strong> Bis 14B komfortabel.{" "}
              <strong>RTX 3090/4090 (24 GB):</strong> Bis 32-34B quantisiert.{" "}
              Die RTX 3090 gebraucht (EUR 750-1.123) bleibt der Value King für lokale AI.
            </p>
          </Callout>
        </section>

        {/* Section 7: Quantisierung */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Quantisierung: Grosse Modelle auf kleiner Hardware
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Quantisierung reduziert die Praezision der Modell-Gewichte von 32-Bit
            Gleitkommazahlen auf 4 oder 8 Bit. Das halbiert den VRAM-Bedarf bei
            minimalen Qualitätsverlusten.
          </p>

          <ComparisonTable
            headers={["Format", "Groesse vs. Original", "Qualität", "Empfehlung"]}
            rows={[
              ["FP16 / BF16", "50%", "100% (verlustfrei)", "Wenn VRAM kein Problem"],
              ["Q5_K_M", "~35%", "~99%", "Hoechste Qualität bei Kompression"],
              [
                "Q4_K_M",
                "~25%",
                "~95%",
                "Bester Trade-off (Standard)",
              ],
              [
                "Q3_K_M",
                "~20%",
                "~85%",
                "Nur wenn VRAM extrem knapp",
              ],
            ]}
          />

          <Callout type="info">
            <p>
              Bei Ollama sind die meisten Modelle standardmaessig in Q4_K_M
              quantisiert. Du musst nichts extra konfigurieren — einfach{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                ollama run llama3.3
              </code>{" "}
              und los.
            </p>
          </Callout>
        </section>

        {/* Section 8: Lokal vs Cloud */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Lokal vs. Cloud: Wo soll das LLM laufen?
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Die Kernfrage für jedes Unternehmen: Eigene Hardware oder Cloud-API?
            Beides hat seinen Platz.
          </p>

          <ComparisonTable
            headers={["Kriterium", "Cloud-API", "Lokal (Self-hosted)"]}
            rows={[
              ["Qualität", "Beste verfügbare Modelle", "Für einfache Tasks ~95% gleichwertig, bei Reasoning 20-25% schlechter"],
              ["Datenschutz", "Daten gehen an Dritte (USA)", "Daten bleiben bei dir (DSGVO)"],
              ["Kosten pro Monat", "EUR 50-500+ (nutzungsabhaengig)", "~EUR 49 Strom (AT, 50% Last) + EUR 750-2.000 Hardware einmalig"],
              ["Hardware noetig", "Nein", "GPU ab EUR 350, RTX 3090 gebraucht ab EUR 750"],
              ["Verfuegbarkeit", "Internet noetig", "Laeuft offline"],
              ["Wartung", "Keine", "Updates, Monitoring (~1h/Monat)"],
            ]}
          />

          <h3 className="text-xl font-bold text-white mt-8 mb-4">
            Ehrlicher Benchmark: Cloud vs. Lokal
          </h3>
          <p className="text-white/70 leading-relaxed mb-4">
            Die Qualitätsluecke zwischen Cloud-Modellen und lokalen Modellen ist real.
            Hier sind ehrliche Vergleichswerte (Stand Maerz 2026):
          </p>

          <ComparisonTable
            headers={["Benchmark", "GPT-4o (Cloud)", "Llama 3.3 70B (Lokal)", "Quelle"]}
            rows={[
              ["MMLU (Wissen)", "85.9%", "86.0%", "Vellum"],
              ["HumanEval (Code)", "84%", "88.4%", "Vellum / Bind AI"],
              ["IFEval (Anweisungen)", "84.6", "92.1", "Vellum"],
              ["MATH (Mathematik)", "—", "77%", "Vellum"],
            ]}
          />

          <Callout type="info" title="Benchmarks richtig lesen">
            <p>
              Llama 3.3 70B übertrifft GPT-4o in einigen Benchmarks (MMLU, HumanEval, IFEval).
              Aber: 70B passt NICHT auf eine einzelne 24 GB GPU. Für lokale Nutzung sind
              8B-34B Modelle realistisch — und dort ist die Luecke zu Cloud-Modellen groesser,
              besonders bei komplexem Reasoning.
            </p>
          </Callout>

          <Callout type="warning" title="Die Qualitätsluecke ist REAL">
            <p>
              Vor allem bei komplexem Reasoning (logische Schluesse, mehrstufige Analyse,
              juristische Argumentation) liegt Cloud deutlich vorne. Lokale Modelle sind
              dort nicht &quot;fast so gut&quot; — sie sind messbar schlechter. Das zu
              verschweigen waere unehrlich.
            </p>
          </Callout>

          <Callout type="tip" title="Wo lokal trotzdem reicht">
            <p>
              Für 80% der alltaeglichen Tasks (Daten-Extraktion, Klassifikation,
              einfache Q&amp;A, Zusammenfassungen) sind lokale Modelle ausreichend.
              Für komplexes Reasoning: Cloud-API als Backup nutzen. Der ehrlichste
              Ansatz ist Hybrid — lokal wo es reicht, Cloud wo es zaehlt.
            </p>
          </Callout>

          <Callout type="tip" title="Unsere Empfehlung">
            <p>
              Starte lokal mit Ollama + einem 7B oder 14B Modell. Für Aufgaben
              wo die Qualität kritisch ist (z.B. Vertraege, komplexe Analysen),
              nutze eine Cloud-API als Backup. Das spart Geld und haelt deine
              Daten unter Kontrolle. Mehr dazu:{" "}
              <a
                href="/grundlagen/lokal-vs-cloud"
                className="text-blue-400 hover:underline"
              >
                Lokal vs. Cloud: Der TCO-Vergleich
              </a>
            </p>
          </Callout>
        </section>

        {/* Section 9: Praxis-Einstieg */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            In 5 Minuten loslegen
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Du brauchst kein ML-Studium um ein LLM lokal zu betreiben. Mit Ollama
            geht das in 3 Schritten:
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6 space-y-4">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">
                1
              </span>
              <div>
                <p className="text-white font-medium">Ollama installieren</p>
                <p className="text-white/50 text-sm mt-1">
                  Download von{" "}
                  <a
                    href="https://ollama.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    ollama.com
                  </a>{" "}
                  — gibt es für Windows, Mac und Linux.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">
                2
              </span>
              <div>
                <p className="text-white font-medium">Modell starten</p>
                <pre className="bg-black/30 rounded-lg p-3 mt-2 overflow-x-auto">
                  <code className="text-sm text-green-400">
                    ollama run llama3.3
                  </code>
                </pre>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">
                3
              </span>
              <div>
                <p className="text-white font-medium">Fragen stellen</p>
                <p className="text-white/50 text-sm mt-1">
                  Das Modell laeuft auf deiner GPU. Keine Cloud, keine API-Keys,
                  keine Kosten. Die REST-API ist unter{" "}
                  <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                    http://localhost:11434
                  </code>{" "}
                  erreichbar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Takeaway */}
        <KeyTakeaway
          points={[
            "LLMs sagen das naechste Token vorher — sie 'wissen' nichts, sie berechnen Wahrscheinlichkeiten.",
            "Mehr Parameter = bessere Qualität, aber mehr VRAM und langsamer. Q4_K_M Quantisierung ist der beste Trade-off.",
            "LLMs halluzinieren. Kritische Ausgaben immer verifizieren, RAG reduziert das Risiko deutlich.",
            "Lokale LLMs auf eigener Hardware (Ollama) sind DSGVO-konform. RTX 3090 bei 50% Last: ca. EUR 49/Monat Strom (AT: EUR 0,34/kWh).",
            "Für den Einstieg: Ollama installieren, llama3.3 starten, laeuft in 5 Minuten.",
          ]}
        />

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://vellum.ai/blog/llama-3-3-70b-vs-gpt-4o" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Vellum: Llama 3.3 70B vs GPT-4o</a> — MMLU, HumanEval, IFEval, MATH Benchmark-Zahlen</li>
            <li><a href="https://blog.getbind.co/2024/12/13/llama-3-3-70b-vs-gpt-4o-which-is-better-for-coding/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Bind AI: Llama 3.3 70B vs GPT-4o Coding</a> — HumanEval Vergleich</li>
            <li><a href="https://intuitionlabs.ai/articles/local-llm-deployment-24gb-gpu-optimization" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">IntuitionLabs: 24GB GPU Optimization</a> — VRAM-Limit 24 GB, max ~34B quantisiert</li>
            <li><a href="https://localaimaster.com/blog/best-gpus-for-ai-2025" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">LocalAIMaster: Best GPUs for AI</a> — Inference Speed RTX 3090 (tok/s)</li>
            <li><a href="https://corelab.tech/llmgpu/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">CoreLab: LLM GPU Benchmarks</a> — 8B Modelle ~112 tok/s auf RTX 3090</li>
            <li><a href="https://www.globalpetrolprices.com/Austria/electricity_prices/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GlobalPetrolPrices: Austria Electricity Prices</a> — Strompreis AT Privat EUR 0,34/kWh (2026)</li>
            <li><a href="https://bestvaluegpu.com/en-eu/history/new-and-used-rtx-3090-price-history-and-specs/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">BestValueGPU: RTX 3090 Preisentwicklung</a> — Gebrauchtpreise EUR 750-1.123</li>
          </ul>
        </section>

        {/* Verwandte Artikel */}
        <RelatedArticles />
      </div>
    </div>
  )
}
