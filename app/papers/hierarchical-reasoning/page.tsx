import { Metadata } from "next"
import Callout from "../../../components/Callout"
import PlantUMLDiagram from "../../../components/PlantUMLDynamic"
import { RelatedArticles } from "../../../components/RelatedArticles"

export const metadata: Metadata = {
  title: "Hierarchical Reasoning Model (2025) — Rekurrente AI ohne Chain-of-Thought | AI Engineering Wiki",
  description:
    "Das Hierarchical Reasoning Model (HRM) löst komplexe Aufgaben wie Sudoku, Labyrinth und ARC mit nur 27M Parametern und 1000 Trainingsbeispielen — ohne Chain-of-Thought.",
}

export default function HierarchicalReasoningPage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Papers</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Hierarchical Reasoning Model
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          Wang et al., 2025 — Eine rekurrente Architektur mit nur 27 Millionen Parametern,
          die ohne Chain-of-Thought komplexe Planungs- und Denkaufgaben löst.
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm text-white/40">
          <span>Lesezeit: 8 min</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Zuletzt aktualisiert: März 2026</span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            Das Hierarchical Reasoning Model (HRM) zeigt, dass gutes Schlussfolgern keine
            riesigen Modelle braucht. Mit nur 27 Millionen Parametern und gerade einmal 1000
            Trainingsbeispielen meistert es Sudoku, Labyrinth-Navigation und ARC-Rätsel —
            ohne den üblichen Chain-of-Thought-Ansatz. Stattdessen nutzt es zwei rekurrente
            Module: eines für abstrakte Planung, eines für konkrete Ausführung.
          </p>
        </Callout>

        {/* Das Problem */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Das Problem: Schlussfolgern kostet Ressourcen
          </h2>
          <p className="text-white/70 leading-relaxed">
            Moderne große Sprachmodelle (LLMs) lösen schwierige Denkaufgaben typischerweise
            durch Chain-of-Thought (CoT): Das Modell schreibt seinen Denkprozess explizit
            als Text auf, Schritt für Schritt. Das funktioniert — ist aber teuer. Mehr
            Tokens, mehr Rechenzeit, mehr Kosten.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            Hinzu kommt: Je komplexer die Aufgabe, desto mehr Parameter braucht das Modell
            typischerweise. GPT-4 hat schätzungsweise 1,8 Billionen Parameter. Für viele
            Unternehmen ist das keine realistische Option — weder kostenmäßig noch
            datenschutzrechtlich, wenn Daten das Haus nicht verlassen sollen.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            Das HRM-Paper stellt eine grundsätzlich andere Frage: Muss Schlussfolgern
            wirklich so groß und so explizit sein?
          </p>
        </section>

        {/* Die Lösung */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Der Ansatz: Hierarchische rekurrente Verarbeitung
          </h2>
          <p className="text-white/70 leading-relaxed">
            Die Kernidee des HRM ist einfach aber wirkungsvoll: Schlussfolgern geschieht
            auf zwei Ebenen gleichzeitig — ähnlich wie Menschen sowohl strategisch planen
            als auch konkrete Handlungen ausführen, ohne jeden Gedanken laut auszusprechen.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            Das Modell ist rekurrent aufgebaut: Es verarbeitet die gleiche Eingabe mehrmals
            in mehreren &quot;Denkrunden&quot; (Recurrent Steps), bevor es eine Antwort ausgibt.
            Dieser interne Verarbeitungsraum ersetzt den expliziten Gedankentext bei CoT.
          </p>
          <ul className="text-white/70 mt-4 space-y-2">
            <li>
              <strong className="text-white">Kein Chain-of-Thought erforderlich:</strong>{" "}
              Das Denken passiert intern in den Aktivierungen des Netzwerks, nicht als
              sichtbarer Text.
            </li>
            <li>
              <strong className="text-white">Nur 1000 Trainingsbeispiele:</strong>{" "}
              Statt Millionen von Beispielen reicht ein winziger Datensatz — ein
              außergewöhnliches Ergebnis.
            </li>
            <li>
              <strong className="text-white">27 Millionen Parameter:</strong>{" "}
              Klein genug, um lokal auf Consumer-Hardware zu laufen.
            </li>
          </ul>
        </section>

        {/* Architektur */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Die Architektur: Zwei Module, zwei Ebenen
          </h2>
          <p className="text-white/70 leading-relaxed">
            Das HRM besteht aus zwei rekurrenten Modulen, die hierarchisch zusammenarbeiten:
          </p>
          <ul className="text-white/70 mt-4 space-y-3">
            <li>
              <strong className="text-white">Hochrangiges Modul (High-Level):</strong>{" "}
              Zuständig für abstrakte, strategische Planung. Es verarbeitet die Aufgabe auf
              einer übergeordneten Ebene und gibt Richtung und Strategie vor. Dieses Modul
              läuft langsamer — wenige Iterationen pro Aufgabe.
            </li>
            <li>
              <strong className="text-white">Niedrigrangiges Modul (Low-Level):</strong>{" "}
              Übernimmt die detaillierte, konkrete Berechnung. Es führt die vom High-Level-Modul
              vorgegebene Strategie in kleinen Schritten aus. Dieses Modul läuft schneller
              und iteriert häufiger.
            </li>
          </ul>
          <p className="text-white/70 leading-relaxed mt-4">
            Beide Module tauschen Zustandsinformationen aus — das High-Level-Modul kann
            seinen Zustand anpassen, wenn das Low-Level-Modul auf Hindernisse stößt. So
            entsteht eine dynamische Schleife zwischen Planung und Ausführung.
          </p>

          <PlantUMLDiagram diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam RectangleBorderColor #4262FF
skinparam RectangleBackgroundColor #1E293B
skinparam PackageBorderColor #4262FF
skinparam PackageBackgroundColor #0F172A

title HRM — Hierarchische Zwei-Modul Architektur

rectangle "Eingabe\\n(Aufgabe)" as input #334155

package "High-Level Modul\\n(Abstrakte Planung)" as hl {
  rectangle "Strategischer\\nZustand H_t" as hstate #2D1B69
  rectangle "Richtung &\\nStrategie" as strategy #2D1B69
}

package "Low-Level Modul\\n(Detaillierte Berechnung)" as ll {
  rectangle "Detaillierter\\nZustand L_t" as lstate #1E3A5F
  rectangle "Konkrete\\nAusfuehrung" as exec #1E3A5F
}

rectangle "Ausgabe\\n(Loesung)" as output #065F46

input --> hstate
hstate --> strategy
strategy --> lstate : Richtungsvorgabe
lstate --> exec
exec --> hstate : Feedback (Zustandsupdate)
exec --> output

note right of hl
  Wenige Iterationen
  Langsame Zyklen
  Globale Strategie
end note

note right of ll
  Viele Iterationen
  Schnelle Zyklen
  Lokale Details
end note
@enduml`} caption="HRM Architektur: Das High-Level-Modul plant abstrakt, das Low-Level-Modul führt konkret aus — beide kommunizieren über Zustandsvektoren" />
        </section>

        {/* Ergebnisse */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ergebnisse: Klein schlägt Groß
          </h2>
          <p className="text-white/70 leading-relaxed">
            Die Autoren testen HRM auf drei verschiedenen Aufgabentypen, die unterschiedliche
            Arten des Schlussfolgerns erfordern:
          </p>
          <ul className="text-white/70 mt-4 space-y-3">
            <li>
              <strong className="text-white">Sudoku:</strong>{" "}
              Das Modell löst Sudoku-Rätsel zuverlässig. Sudoku erfordert systematische
              Elimination und Backtracking — klassische Stärken hierarchischer Planung.
            </li>
            <li>
              <strong className="text-white">Labyrinth-Navigation:</strong>{" "}
              HRM findet Wege durch komplexe Labyrinthe. Das High-Level-Modul plant die
              Gesamtroute, das Low-Level-Modul navigiert die einzelnen Schritte.
            </li>
            <li>
              <strong className="text-white">ARC (Abstraction and Reasoning Corpus):</strong>{" "}
              ARC gilt als besonders schwieriger Benchmark für abstrakte Musterkennung.
              HRM erreicht hier beachtliche Ergebnisse — und das ohne jegliches
              Chain-of-Thought.
            </li>
          </ul>
          <p className="text-white/70 leading-relaxed mt-4">
            Das Besondere: Diese Ergebnisse werden mit nur 27 Millionen Parametern und
            1000 Trainingsbeispielen erzielt — ein Bruchteil dessen, was vergleichbare
            Ansätze benötigen.
          </p>
        </section>

        {/* Relevanz für Unternehmen */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Was bedeutet das für mein Unternehmen?
          </h2>
          <p className="text-white/70 leading-relaxed">
            Das HRM-Paper ist besonders für KMUs interessant, die AI lokal betreiben
            wollen oder müssen — etwa aus Datenschutzgründen (DSGVO) oder wegen begrenzter
            Budgets. Drei konkrete Implikationen:
          </p>
          <ul className="text-white/70 mt-4 space-y-3">
            <li>
              <strong className="text-white">Lokale Ausführung wird realistischer:</strong>{" "}
              Ein 27M-Parameter-Modell läuft auf jedem modernen Laptop oder kleinen Server.
              Keine Cloud-Abhängigkeit, keine Datenweitergabe an externe Anbieter.
            </li>
            <li>
              <strong className="text-white">Spezialisierte kleine Modelle:</strong>{" "}
              Die Forschung zeigt, dass für klar definierte Aufgaben (Planung, Routing,
              Puzzles, strukturierte Entscheidungen) kleine, spezialisierte Modelle
              überraschend gut abschneiden können — und deutlich günstiger sind.
            </li>
            <li>
              <strong className="text-white">Fine-Tuning mit wenigen Daten:</strong>{" "}
              1000 Trainingsbeispiele sind für viele Unternehmen realistisch. Das bedeutet:
              Eigene Daten könnten reichen, um ein spezialisiertes Modell zu trainieren,
              ohne massive Datenmengen sammeln zu müssen.
            </li>
          </ul>
          <p className="text-white/70 leading-relaxed mt-4">
            <strong className="text-white">Wichtige Einschränkung:</strong> HRM ist kein
            Universalmodell. Es ist für strukturierte Denkaufgaben optimiert, nicht für
            freie Textgenerierung oder Konversation. Der Einsatz macht Sinn, wo klare
            Regeln und strukturierte Probleme dominieren — zum Beispiel in Planungssystemen,
            Prozessoptimierung oder Entscheidungsunterstützung.
          </p>
        </section>

        {/* Einordnung */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Einordnung: Warum ist das Paper relevant?
          </h2>
          <p className="text-white/70 leading-relaxed">
            Das HRM-Paper erschien im Juni 2025 und steht in einer wachsenden Forschungsrichtung,
            die hinterfragt ob große Modelle wirklich für alles notwendig sind. Während die
            Industrie auf immer größere Modelle setzt, zeigt diese Forschung: Architektur
            kann Größe ersetzen.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            Die Idee, Denken in zwei Ebenen aufzuteilen — strategisch und taktisch — ist
            dabei nicht neu. Sie findet sich in der klassischen KI-Planung (STRIPS, HTN),
            in der Kognitionswissenschaft (System 1 und System 2 nach Kahneman) und in der
            Robotik. Das HRM überträgt dieses Prinzip erfolgreich in ein neuronales Netzwerk.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            Für Praktiker bedeutet das: Die Suche nach dem richtigen Modell sollte nicht
            nur bei Größe und Benchmark-Scores ansetzen, sondern bei der Architektur.
            Ein gut konstruiertes kleines Modell kann für spezifische Aufgaben besser,
            schneller und günstiger sein als ein generalistisches Großmodell.
          </p>
        </section>

        {/* Quellen */}
        <section className="mt-12 pt-8 border-t border-slate-800">
          <h2 className="text-lg font-bold text-white mb-4">Quellen</h2>
          <ul className="text-white/70 space-y-2 text-sm">
            <li>
              Wang, G., Li, J., Sun, Y., Chen, X., Liu, C., Wu, Y., Lu, M., Song, S.,
              Abbasi Yadkori, Y. (2025). &quot;Hierarchical Reasoning Model.&quot;{" "}
              <a
                href="https://arxiv.org/abs/2506.21734"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                arXiv:2506.21734
              </a>
              {" "}(eingereicht 2025-06-26, überarbeitet 2025-08-04)
            </li>
          </ul>
        </section>

        <RelatedArticles />
      </div>
    </div>
  )
}
