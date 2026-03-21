import { Metadata } from "next"
import Callout from "../../../components/Callout"
import PlantUMLDiagram from "../../../components/PlantUMLDynamic"
import { RelatedArticles } from "../../../components/RelatedArticles"

export const metadata: Metadata = {
  title: "LoRA: Low-Rank Adaptation erklärt | AI Engineering Wiki",
  description:
    "Das LoRA-Paper von Hu et al. (2021) verständlich erklärt: Parameter-effizientes Fine-Tuning großer Sprachmodelle ohne alle Gewichte neu zu trainieren.",
}

export default function LoRAPaperPage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Papers</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          LoRA: Low-Rank Adaptation of Large Language Models
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          Hu et al., 2021 — Wie man große Modelle mit einem Bruchteil der Parameter
          effizient auf neue Aufgaben anpassen kann.
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm text-white/40">
          <span>Lesezeit: 10 min</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Zuletzt aktualisiert: März 2026</span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            LoRA (Low-Rank Adaptation) ermöglicht es, große Sprachmodelle auf spezifische
            Aufgaben anzupassen, ohne alle Modell-Parameter zu verändern. Statt die
            gesamten Gewichtsmatrizen zu aktualisieren, fügt LoRA kleine, trainierbare
            Matrizen hinzu. Das reduziert den Speicherbedarf und die Trainingszeit drastisch.
          </p>
        </Callout>

        {/* Das Problem */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Das Problem: Fine-Tuning ist teuer
          </h2>
          <p className="text-white/70 leading-relaxed">
            Ein vortrainiertes LLM auf eine spezifische Aufgabe anzupassen (Fine-Tuning)
            bedeutet normalerweise, alle Parameter des Modells zu aktualisieren. Bei einem
            Modell mit 7 Milliarden Parametern heißt das: 7 Milliarden Werte müssen
            gespeichert, berechnet und optimiert werden.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            Das erfordert enorme GPU-Ressourcen. Volles Fine-Tuning eines 70B-Modells
            braucht mehrere High-End-GPUs mit zusammen über 100 GB VRAM. Für die meisten
            Unternehmen und Entwickler ist das nicht praktikabel.
          </p>
        </section>

        {/* Die LoRA-Idee */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Die LoRA-Idee: Niedrig-Rang-Zerlegung
          </h2>
          <p className="text-white/70 leading-relaxed">
            Die zentrale Erkenntnis von LoRA: Die Änderungen, die beim Fine-Tuning an
            den Gewichtsmatrizen vorgenommen werden, haben einen niedrigen Rang
            (low rank). Das heißt, die eigentliche Anpassung lässt sich durch viel
            kleinere Matrizen darstellen.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            Statt eine große Gewichtsmatrix W direkt zu ändern, fügt LoRA zwei kleine
            Matrizen A und B hinzu:
          </p>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mt-4 font-mono text-sm text-white/80">
            W&apos; = W + BA
            <br />
            <br />
            W: Original-Matrix (eingefroren, wird nicht trainiert)
            <br />
            B: Kleine Matrix (d × r), trainierbar
            <br />
            A: Kleine Matrix (r × d), trainierbar
            <br />
            r: Rang (typisch 4-64, sehr viel kleiner als d)
          </div>
          <p className="text-white/70 leading-relaxed mt-4">
            Die Original-Gewichte W bleiben eingefroren. Nur die kleinen Matrizen A und B
            werden trainiert. Bei Rang r=16 und Dimension d=4096 trainiert man statt
            16,7 Millionen nur 131.072 Parameter pro Schicht — eine Reduktion um den
            Faktor 128.
          </p>

          <PlantUMLDiagram diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam RectangleBorderColor #4262FF
skinparam RectangleBackgroundColor #1E293B

title LoRA Architektur

rectangle "Eingabe x" as input #334155

package "Original-Pfad (eingefroren)" as orig {
  rectangle "W\\n(d × d)\\n❄️ Eingefroren" as W #2D1B69
}

package "LoRA-Pfad (trainierbar)" as lora {
  rectangle "A\\n(r × d)\\n🔥 Trainierbar" as A #065F46
  rectangle "B\\n(d × r)\\n🔥 Trainierbar" as B #065F46
}

rectangle "h = Wx + BAx" as output #334155

input --> W : Wx
input --> A : Ax
A --> B : BAx
W --> output
B --> output : + (Addition)
@enduml`} caption="LoRA Architektur: Die originalen Gewichte W bleiben eingefroren, nur die kleinen Matrizen A und B werden trainiert" />
        </section>

        {/* Wie LoRA funktioniert */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Wie LoRA technisch funktioniert
          </h2>
          <p className="text-white/70 leading-relaxed">
            LoRA wird typischerweise auf die Attention-Matrizen (Q, K, V, O) des
            Transformers angewendet. Der Ablauf:
          </p>
          <ul className="text-white/70 mt-4 space-y-3">
            <li>
              <strong className="text-white">1. Einfrieren:</strong> Alle originalen
              Modell-Parameter werden eingefroren (requires_grad=False). Sie ändern sich
              während des Trainings nicht.
            </li>
            <li>
              <strong className="text-white">2. LoRA-Module einfügen:</strong> Neben jede
              ausgewählte Gewichtsmatrix werden die kleinen Matrizen A und B eingefügt.
              A wird zufällig initialisiert, B mit Nullen (damit der Start-Zustand
              identisch zum Original ist).
            </li>
            <li>
              <strong className="text-white">3. Training:</strong> Nur die LoRA-Matrizen
              werden trainiert. Das braucht einen Bruchteil des Speichers und der
              Rechenzeit.
            </li>
            <li>
              <strong className="text-white">4. Merging:</strong> Nach dem Training können
              die LoRA-Matrizen in die Original-Gewichte gemerged werden (W + BA). Das
              Ergebnis ist ein normales Modell ohne zusätzliche Latenz.
            </li>
          </ul>
        </section>

        {/* Vorteile */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Vorteile von LoRA
          </h2>
          <ul className="text-white/70 mt-4 space-y-3">
            <li>
              <strong className="text-white">Speicher-Effizienz:</strong> Statt das
              gesamte Modell zu duplizieren, speichert man nur die kleinen LoRA-Adapter.
              Ein LoRA-Adapter für ein 7B-Modell ist oft nur 10-50 MB groß.
            </li>
            <li>
              <strong className="text-white">Schnelles Training:</strong> Weniger
              trainierbare Parameter bedeuten schnellere Trainingsschritte und weniger
              GPU-Speicherbedarf.
            </li>
            <li>
              <strong className="text-white">Kein Qualitätsverlust:</strong> Bei richtig
              gewähltem Rang erreicht LoRA vergleichbare Ergebnisse wie volles Fine-Tuning.
            </li>
            <li>
              <strong className="text-white">Adapter-Wechsel:</strong> Mehrere LoRA-Adapter
              können für unterschiedliche Aufgaben trainiert und zur Laufzeit getauscht
              werden — auf demselben Basis-Modell.
            </li>
          </ul>

          <PlantUMLDiagram diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam RectangleBorderColor #4262FF
skinparam RectangleBackgroundColor #1E293B

title Fine-Tuning Vergleich: Parameter & Speicherbedarf

rectangle "Full Fine-Tuning" as full #7C3AED {
  rectangle "7B Parameter trainiert" as fp #2D1B69
  rectangle "~28 GB VRAM" as fm #2D1B69
  rectangle "Volle Modellkopie\\npro Aufgabe" as fc #2D1B69
}

rectangle "LoRA (r=16)" as lora #065F46 {
  rectangle "~4M Parameter trainiert" as lp #065F46
  rectangle "~16 GB VRAM" as lm #065F46
  rectangle "Adapter: ~10-50 MB\\npro Aufgabe" as lc #065F46
}

rectangle "QLoRA (r=16, 4-bit)" as qlora #1E3A5F {
  rectangle "~4M Parameter trainiert" as qp #1E3A5F
  rectangle "~6 GB VRAM" as qm #1E3A5F
  rectangle "Basis-Modell in 4-bit\\n+ 16-bit Adapter" as qc #1E3A5F
}
@enduml`} caption="Vergleich der Fine-Tuning-Methoden: QLoRA ermöglicht Training auf Consumer-Hardware" />
        </section>

        {/* LoRA-Varianten */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Weiterentwicklungen: QLoRA und DoRA
          </h2>
          <p className="text-white/70 leading-relaxed">
            LoRA hat mehrere wichtige Nachfolger inspiriert:
          </p>
          <ul className="text-white/70 mt-4 space-y-3">
            <li>
              <strong className="text-white">QLoRA (2023):</strong> Kombiniert LoRA mit
              4-Bit-Quantisierung. Das Basis-Modell wird in 4-Bit geladen, die
              LoRA-Matrizen in 16-Bit trainiert. Damit kann ein 70B-Modell auf einer
              einzigen GPU fine-getuned werden.
            </li>
            <li>
              <strong className="text-white">DoRA (2024):</strong> Decomposed LoRA zerlegt
              die Gewichte in Magnitude und Richtung und wendet LoRA nur auf die Richtung an.
              Das verbessert die Trainingsqualität.
            </li>
          </ul>
        </section>

        {/* Quellen */}
        <section className="mt-12 pt-8 border-t border-slate-800">
          <h2 className="text-lg font-bold text-white mb-4">Quellen</h2>
          <ul className="text-white/70 space-y-2 text-sm">
            <li>
              Hu, E. J. et al. (2021). &quot;LoRA: Low-Rank Adaptation of Large Language Models.&quot;{" "}
              <a href="https://arxiv.org/abs/2106.09685" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                arXiv:2106.09685
              </a>
            </li>
          </ul>
        </section>

        <RelatedArticles />
      </div>
    </div>
  )
}
