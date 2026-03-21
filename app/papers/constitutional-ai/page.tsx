import { Metadata } from "next"
import Callout from "../../../components/Callout"
import PlantUMLDiagram from "../../../components/PlantUMLDynamic"
import { RelatedArticles } from "../../../components/RelatedArticles"

export const metadata: Metadata = {
  title: "Constitutional AI erklärt | AI Engineering Wiki",
  description:
    "Das Constitutional AI Paper von Bai et al. (2022, Anthropic) verständlich erklärt: Wie man AI-Systeme durch Prinzipien statt durch menschliches Feedback aligned.",
}

export default function ConstitutionalAIPaperPage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Papers</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Constitutional AI: Harmlessness from AI Feedback
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          Bai et al., 2022 (Anthropic) — Wie man AI-Systeme sicher und hilfreich macht,
          indem man ihnen Prinzipien statt nur menschliches Feedback gibt.
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
            Constitutional AI (CAI) ist Anthropics Ansatz für AI Safety. Statt sich
            ausschließlich auf menschliches Feedback (RLHF) zu verlassen, bekommt das
            Modell eine &quot;Verfassung&quot; — ein Set von Prinzipien wie &quot;Sei hilfreich,
            harmlos und ehrlich&quot;. Das Modell lernt dann selbst, seine Antworten an
            diesen Prinzipien auszurichten. Das reduziert den Bedarf an menschlicher
            Annotation und macht den Alignment-Prozess transparenter.
          </p>
        </Callout>

        {/* Das Problem mit RLHF */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Das Problem: RLHF allein reicht nicht
          </h2>
          <p className="text-white/70 leading-relaxed">
            Reinforcement Learning from Human Feedback (RLHF) war der erste erfolgreiche
            Ansatz, um LLMs &quot;aligned&quot; zu machen — also hilfreich und ungefährlich.
            Menschliche Annotatoren bewerten Modell-Outputs, und das Modell wird darauf
            trainiert, bessere Bewertungen zu bekommen.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            Aber RLHF hat Schwächen:
          </p>
          <ul className="text-white/70 mt-4 space-y-2">
            <li>
              <strong className="text-white">Skalierung:</strong> Menschliche Annotation
              ist teuer und langsam. Jede neue Fähigkeit braucht tausende bewertete
              Beispiele.
            </li>
            <li>
              <strong className="text-white">Inkonsistenz:</strong> Verschiedene
              Annotatoren bewerten unterschiedlich. Es gibt keinen einheitlichen Standard
              für &quot;hilfreich&quot; oder &quot;harmlos&quot;.
            </li>
            <li>
              <strong className="text-white">Opazität:</strong> Es ist unklar, welche
              Regeln das Modell tatsächlich gelernt hat. Die Kriterien stecken implizit
              in den Bewertungsdaten.
            </li>
          </ul>

          <PlantUMLDiagram diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam RectangleBorderColor #4262FF
skinparam RectangleBackgroundColor #1E293B
skinparam PackageBorderColor #4262FF
skinparam PackageBackgroundColor #0F172A

title RLHF vs. Constitutional AI

package "RLHF (traditionell)" as rlhf {
  rectangle "Modell generiert\\nAntworten" as r1 #2D1B69
  rectangle "Menschen bewerten\\nAntworten" as r2 #7C3AED
  rectangle "Reward Model\\nlernt Bewertungen" as r3 #2D1B69
  rectangle "RL-Training" as r4 #334155
  r1 --> r2 : Antwort-Paare
  r2 --> r3 : Menschliches Feedback
  r3 --> r4
}

package "Constitutional AI" as cai {
  rectangle "Modell generiert\\nAntworten" as c1 #2D1B69
  rectangle "Modell kritisiert\\neigene Antworten" as c2 #065F46
  rectangle "Modell überarbeitet\\nbasierend auf Prinzipien" as c3 #065F46
  rectangle "AI bewertet\\nAntwort-Paare" as c4 #065F46
  rectangle "RLAIF-Training" as c5 #334155
  c1 --> c2 : Verfassungs-Prinzipien
  c2 --> c3 : Self-Critique
  c3 --> c4 : AI Feedback
  c4 --> c5
}
@enduml`} caption="RLHF braucht teure menschliche Bewertungen — CAI nutzt die eigenen Prinzipien des Modells für Feedback" />
        </section>

        {/* Die CAI-Methode */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Die CAI-Methode: Prinzipien statt nur Feedback
          </h2>
          <p className="text-white/70 leading-relaxed">
            Constitutional AI löst diese Probleme in zwei Phasen:
          </p>

          <h3 className="text-xl font-bold text-white mt-6 mb-3">
            Phase 1: Supervised Self-Critique (SL-CAI)
          </h3>
          <ul className="text-white/70 mt-2 space-y-3">
            <li>
              <strong className="text-white">Schritt 1:</strong> Das Modell generiert
              eine Antwort auf eine potenziell problematische Frage.
            </li>
            <li>
              <strong className="text-white">Schritt 2:</strong> Das Modell wird gebeten,
              seine eigene Antwort anhand der Verfassungs-Prinzipien zu kritisieren
              (Self-Critique). Z.B.: &quot;Identifiziere, ob diese Antwort jemandem schaden
              könnte.&quot;
            </li>
            <li>
              <strong className="text-white">Schritt 3:</strong> Das Modell überarbeitet
              seine Antwort basierend auf der Kritik (Revision).
            </li>
            <li>
              <strong className="text-white">Schritt 4:</strong> Die überarbeitete
              Antwort wird als Trainingsdatenpunkt verwendet.
            </li>
          </ul>

          <h3 className="text-xl font-bold text-white mt-6 mb-3">
            Phase 2: RL from AI Feedback (RLAIF)
          </h3>
          <p className="text-white/70 leading-relaxed">
            In der zweiten Phase wird ein Reward Model trainiert — aber statt mit
            menschlichen Bewertungen wird es mit AI-generierten Bewertungen trainiert.
            Das Modell vergleicht Antwort-Paare und wählt die bessere basierend auf den
            Verfassungs-Prinzipien. Dieses AI-Feedback-Modell wird dann für RLHF verwendet.
          </p>

          <PlantUMLDiagram diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam ActivityBackgroundColor #1E293B
skinparam ActivityBorderColor #4262FF

title CAI Feedback Loop: Generieren → Kritisieren → Überarbeiten

start
:📝 **Generieren**
Modell erzeugt Antwort
auf problematische Frage;

:🔍 **Kritisieren (Self-Critique)**
Modell prüft eigene Antwort
anhand der Verfassungs-Prinzipien;

if (Verstößt gegen Prinzipien?) then (Ja)
  :✏️ **Überarbeiten (Revision)**
  Modell verbessert die Antwort
  basierend auf der Kritik;
  :📊 **Trainingsdaten**
  Überarbeitete Antwort wird
  als Trainingsbeispiel genutzt;
else (Nein)
  :✅ **Antwort OK**
  Wird direkt als
  Trainingsbeispiel genutzt;
endif

:🔄 **Nächste Runde**
Prozess wiederholt sich
für weitere Beispiele;
stop
@enduml`} caption="Der CAI Feedback Loop: Das Modell kritisiert und überarbeitet sich selbst anhand expliziter Prinzipien" />
        </section>

        {/* Die Verfassung */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Was steht in der Verfassung?
          </h2>
          <p className="text-white/70 leading-relaxed">
            Die &quot;Verfassung&quot; besteht aus expliziten Prinzipien, die dem Modell als
            Leitlinien dienen. Beispiele aus dem Paper:
          </p>
          <ul className="text-white/70 mt-4 space-y-2">
            <li>&quot;Wähle die Antwort, die am wenigsten wahrscheinlich als schädlich oder unethisch angesehen wird.&quot;</li>
            <li>&quot;Wähle die Antwort, die am weisesten, ethischsten und moralischsten erscheint.&quot;</li>
            <li>&quot;Wähle die Antwort, die keine Diskriminierung unterstützt.&quot;</li>
            <li>&quot;Wähle die Antwort, die am besten die Werte eines guten AI-Assistenten widerspiegelt.&quot;</li>
          </ul>
          <p className="text-white/70 leading-relaxed mt-4">
            Der entscheidende Vorteil: Diese Prinzipien sind explizit, nachvollziehbar
            und veränderbar. Man kann sie anpassen, erweitern oder für verschiedene
            Einsatzbereiche spezialisieren.
          </p>
        </section>

        {/* Warum CAI wichtig ist */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Warum Constitutional AI wichtig ist
          </h2>
          <ul className="text-white/70 mt-4 space-y-3">
            <li>
              <strong className="text-white">Transparenz:</strong> Die Regeln sind
              explizit formuliert und können überprüft werden. Es ist klar, warum
              das Modell bestimmte Antworten bevorzugt.
            </li>
            <li>
              <strong className="text-white">Skalierbarkeit:</strong> AI-Feedback ist
              billiger und schneller als menschliches Feedback. Das Modell kann sich
              selbst auf Millionen von Beispielen trainieren.
            </li>
            <li>
              <strong className="text-white">Weniger evasiv:</strong> Modelle mit CAI
              sind typischerweise hilfreicher als rein RLHF-trainierte Modelle, weil sie
              nicht lernen, auf alles mit &quot;Das kann ich nicht beantworten&quot; zu reagieren.
            </li>
            <li>
              <strong className="text-white">Iterierbar:</strong> Die Verfassung kann
              aktualisiert werden, ohne das gesamte Training zu wiederholen. Neue
              Prinzipien können getestet und evaluiert werden.
            </li>
          </ul>
        </section>

        {/* Relevanz für die Praxis */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Relevanz für die Praxis
          </h2>
          <p className="text-white/70 leading-relaxed">
            Das CAI-Konzept beeinflusst nicht nur Anthropics Claude, sondern die gesamte
            AI-Safety-Diskussion:
          </p>
          <ul className="text-white/70 mt-4 space-y-2">
            <li>
              <strong className="text-white">System Prompts:</strong> Die Idee, einem Modell
              explizite Regeln zu geben, findet sich in jedem System Prompt wieder.
              CLAUDE.md-Dateien sind im Grunde eine lokale &quot;Verfassung&quot;.
            </li>
            <li>
              <strong className="text-white">EU AI Act:</strong> Die Transparenz- und
              Dokumentationspflichten des EU AI Act passen gut zum CAI-Ansatz —
              explizite Regeln statt Black-Box-Verhalten.
            </li>
            <li>
              <strong className="text-white">Self-Improving Agents:</strong> Das Prinzip
              der Selbstkritik findet sich in modernen Agent-Patterns wie
              Self-Reflection und Self-Improving Agents wieder.
            </li>
          </ul>
        </section>

        {/* Quellen */}
        <section className="mt-12 pt-8 border-t border-slate-800">
          <h2 className="text-lg font-bold text-white mb-4">Quellen</h2>
          <ul className="text-white/70 space-y-2 text-sm">
            <li>
              Bai, Y. et al. (2022). &quot;Constitutional AI: Harmlessness from AI Feedback.&quot;{" "}
              <a href="https://arxiv.org/abs/2212.08073" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                arXiv:2212.08073
              </a>
            </li>
          </ul>
        </section>

        <RelatedArticles />
      </div>
    </div>
  )
}
