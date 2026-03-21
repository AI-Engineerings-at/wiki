import { Metadata } from "next"
import Callout from "../../../components/Callout"
import PlantUMLDiagram from "../../../components/PlantUMLDynamic"
import { RelatedArticles } from "../../../components/RelatedArticles"

export const metadata: Metadata = {
  title: "Attention Is All You Need — Transformer erklärt | AI Engineering Wiki",
  description:
    "Das Transformer-Paper von Vaswani et al. (2017) verständlich erklärt: Self-Attention, Multi-Head Attention und warum dieses Paper die gesamte AI-Landschaft verändert hat.",
}

export default function AttentionPaperPage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Papers</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Attention Is All You Need
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          Vaswani et al., 2017 — Das Paper, das die Transformer-Architektur eingeführt
          und damit die gesamte moderne AI ermöglicht hat.
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
            &quot;Attention Is All You Need&quot; hat 2017 die Transformer-Architektur vorgestellt —
            ein Modell, das komplett auf Attention-Mechanismen basiert und auf Recurrence
            (RNNs) und Convolutions verzichtet. Es wurde ursprünglich für maschinelle
            Übersetzung entwickelt, ist aber heute die Grundlage für GPT, BERT, LLaMA
            und praktisch jedes moderne LLM.
          </p>
        </Callout>

        {/* Das Problem vor Transformern */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Das Problem vor Transformern
          </h2>
          <p className="text-white/70 leading-relaxed">
            Vor 2017 dominierten Recurrent Neural Networks (RNNs) und LSTMs die
            Sprachverarbeitung. Diese Modelle verarbeiten Text sequenziell — Wort für Wort,
            von links nach rechts. Das hatte zwei gravierende Nachteile:
          </p>
          <ul className="text-white/70 mt-4 space-y-2">
            <li>
              <strong className="text-white">Langsames Training:</strong> Weil jedes Wort
              auf das vorherige warten muss, lässt sich die Berechnung nicht parallelisieren.
              Mehr GPUs helfen kaum.
            </li>
            <li>
              <strong className="text-white">Vergesslichkeit:</strong> Bei langen Texten
              &quot;vergisst&quot; das Modell den Anfang. Informationen über 100+ Tokens hinweg
              gehen verloren (das sogenannte Vanishing Gradient Problem).
            </li>
          </ul>
        </section>

        {/* Die Kernidee: Self-Attention */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Die Kernidee: Self-Attention
          </h2>
          <p className="text-white/70 leading-relaxed">
            Der Transformer löst beide Probleme mit einem einzigen Mechanismus:
            Self-Attention. Statt Text sequenziell zu verarbeiten, schaut jedes Wort
            gleichzeitig auf alle anderen Wörter im Satz und berechnet, wie relevant
            jedes andere Wort für das aktuelle ist.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            Technisch passiert das über drei Vektoren pro Wort: Query (Q), Key (K) und
            Value (V). Die Attention-Formel berechnet eine gewichtete Summe:
          </p>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mt-4 font-mono text-sm text-white/80">
            Attention(Q, K, V) = softmax(QK&#x1D40; / √d_k) · V
          </div>
          <p className="text-white/70 leading-relaxed mt-4">
            Das &quot;√d_k&quot; ist ein Skalierungsfaktor, der verhindert, dass die Dot-Products
            bei großen Dimensionen zu groß werden. Softmax wandelt die Scores in
            Wahrscheinlichkeiten um.
          </p>

          <PlantUMLDiagram diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam RectangleBorderColor #4262FF
skinparam RectangleBackgroundColor #1E293B
skinparam ActivityBackgroundColor #1E293B
skinparam ActivityBorderColor #4262FF

title Self-Attention Mechanismus

rectangle "Eingabe-Token" as input #334155
rectangle "Query (Q)" as q #1E3A5F
rectangle "Key (K)" as k #1E3A5F
rectangle "Value (V)" as v #1E3A5F
rectangle "Lineare\\nProjektion" as proj1 #334155
rectangle "Lineare\\nProjektion" as proj2 #334155
rectangle "Lineare\\nProjektion" as proj3 #334155
rectangle "QK^T / √d_k" as dot #2D1B69
rectangle "Softmax" as soft #2D1B69
rectangle "Gewichtete\\nSumme" as weighted #2D1B69
rectangle "Attention Output" as output #065F46

input --> proj1
input --> proj2
input --> proj3
proj1 --> q
proj2 --> k
proj3 --> v
q --> dot
k --> dot
dot --> soft
soft --> weighted
v --> weighted
weighted --> output
@enduml`} caption="Self-Attention: Jedes Token erzeugt Q, K, V — die Attention-Gewichte bestimmen, welche Tokens relevant sind" />
        </section>

        {/* Multi-Head Attention */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Multi-Head Attention
          </h2>
          <p className="text-white/70 leading-relaxed">
            Eine einzelne Attention-Berechnung erfasst nur eine Art von Beziehung.
            Der Transformer verwendet daher Multi-Head Attention: Die Q/K/V-Vektoren
            werden in mehrere &quot;Heads&quot; aufgeteilt, jeder Head lernt eine andere Art von
            Beziehung (z.B. syntaktische Nähe, semantische Ähnlichkeit, Koreferenz).
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            Im Original-Paper werden 8 Heads verwendet. Die Ergebnisse aller Heads
            werden konkateniert und durch eine lineare Projektion zusammengeführt.
          </p>
        </section>

        {/* Encoder-Decoder Architektur */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Encoder-Decoder Architektur
          </h2>
          <p className="text-white/70 leading-relaxed">
            Der Original-Transformer besteht aus zwei Teilen:
          </p>
          <ul className="text-white/70 mt-4 space-y-2">
            <li>
              <strong className="text-white">Encoder:</strong> Verarbeitet den Input-Text
              und erstellt eine kontextreiche Repräsentation. Besteht aus 6 identischen
              Schichten mit Self-Attention und Feed-Forward-Netzwerk.
            </li>
            <li>
              <strong className="text-white">Decoder:</strong> Generiert den Output-Text
              Wort für Wort. Zusätzlich zur Self-Attention hat er Cross-Attention zum
              Encoder-Output. Ebenfalls 6 Schichten.
            </li>
          </ul>
          <p className="text-white/70 leading-relaxed mt-4">
            Moderne LLMs wie GPT verwenden nur den Decoder-Teil (autoregressive Modelle),
            während BERT nur den Encoder-Teil verwendet. Das zeigt, wie flexibel die
            Architektur ist.
          </p>

          <PlantUMLDiagram diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam RectangleBorderColor #4262FF
skinparam RectangleBackgroundColor #1E293B
skinparam PackageBorderColor #4262FF
skinparam PackageBackgroundColor #0F172A

title Transformer Encoder-Decoder Architektur

package "Encoder (6x)" as enc {
  rectangle "Input Embedding\\n+ Positional Encoding" as ie #334155
  rectangle "Multi-Head\\nSelf-Attention" as mhsa #2D1B69
  rectangle "Add & Norm" as an1 #334155
  rectangle "Feed-Forward\\nNetzwerk" as ff1 #1E3A5F
  rectangle "Add & Norm" as an2 #334155
}

package "Decoder (6x)" as dec {
  rectangle "Output Embedding\\n+ Positional Encoding" as oe #334155
  rectangle "Maskierte Multi-Head\\nSelf-Attention" as mmhsa #2D1B69
  rectangle "Add & Norm" as an3 #334155
  rectangle "Multi-Head\\nCross-Attention" as mhca #7C3AED
  rectangle "Add & Norm" as an4 #334155
  rectangle "Feed-Forward\\nNetzwerk" as ff2 #1E3A5F
  rectangle "Add & Norm" as an5 #334155
}

rectangle "Lineare Schicht\\n+ Softmax" as linear #065F46
rectangle "Ausgabe-\\nWahrscheinlichkeiten" as outp #065F46

ie --> mhsa
mhsa --> an1
an1 --> ff1
ff1 --> an2

oe --> mmhsa
mmhsa --> an3
an3 --> mhca
an2 ..> mhca : Encoder Output
mhca --> an4
an4 --> ff2
ff2 --> an5
an5 --> linear
linear --> outp
@enduml`} caption="Transformer-Architektur: Encoder verarbeitet den Input, Decoder generiert den Output mit Cross-Attention zum Encoder" />
        </section>

        {/* Positional Encoding */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Positional Encoding
          </h2>
          <p className="text-white/70 leading-relaxed">
            Da der Transformer keine sequenzielle Verarbeitung hat, weiß er ohne Hilfe
            nicht, welches Wort an welcher Position steht. Positional Encoding löst das:
            Jedem Token wird ein Positionsvektor hinzugefügt, der auf Sinus- und
            Cosinus-Funktionen basiert.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            Moderne Varianten wie RoPE (Rotary Position Embedding) haben diesen
            Mechanismus weiterentwickelt und ermöglichen deutlich längere Kontextfenster.
          </p>
        </section>

        {/* Warum war es revolutionär */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Warum war das Paper revolutionär?
          </h2>
          <p className="text-white/70 leading-relaxed">
            Drei Gründe, warum &quot;Attention Is All You Need&quot; alles verändert hat:
          </p>
          <ul className="text-white/70 mt-4 space-y-3">
            <li>
              <strong className="text-white">Parallelisierung:</strong> Alle Attention-Berechnungen
              können gleichzeitig auf GPUs laufen. Das Training wurde um Größenordnungen schneller.
              Erst dadurch wurden Modelle mit Milliarden von Parametern praktikabel.
            </li>
            <li>
              <strong className="text-white">Lange Kontexte:</strong> Self-Attention verbindet
              jedes Token direkt mit jedem anderen. Es gibt keinen Informationsverlust über
              Distanz — das Modell kann Zusammenhänge über Tausende von Tokens erkennen.
            </li>
            <li>
              <strong className="text-white">Universelle Architektur:</strong> Transformer
              funktionieren nicht nur für Text. Dieselbe Architektur wird heute für Bilder
              (Vision Transformer), Audio (Whisper), Code (Codex) und multimodale Modelle
              eingesetzt.
            </li>
          </ul>
        </section>

        {/* Einfluss auf heutige Modelle */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Einfluss auf heutige Modelle
          </h2>
          <p className="text-white/70 leading-relaxed">
            Praktisch jedes relevante AI-Modell basiert auf dem Transformer:
          </p>
          <ul className="text-white/70 mt-4 space-y-2">
            <li><strong className="text-white">GPT-Serie (OpenAI):</strong> Decoder-only Transformer</li>
            <li><strong className="text-white">BERT (Google):</strong> Encoder-only Transformer</li>
            <li><strong className="text-white">LLaMA (Meta):</strong> Decoder-only mit Verbesserungen wie RMSNorm und SwiGLU</li>
            <li><strong className="text-white">Claude (Anthropic):</strong> Transformer-basiert mit Constitutional AI</li>
            <li><strong className="text-white">Mistral, Qwen, Gemma:</strong> Alle Transformer-Varianten</li>
          </ul>
        </section>

        {/* Quellen */}
        <section className="mt-12 pt-8 border-t border-slate-800">
          <h2 className="text-lg font-bold text-white mb-4">Quellen</h2>
          <ul className="text-white/70 space-y-2 text-sm">
            <li>
              Vaswani, A. et al. (2017). &quot;Attention Is All You Need.&quot;{" "}
              <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                arXiv:1706.03762
              </a>
            </li>
          </ul>
        </section>

        <RelatedArticles />
      </div>
    </div>
  )
}
