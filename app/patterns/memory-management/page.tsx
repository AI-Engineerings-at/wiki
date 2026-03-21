import { Metadata } from 'next'
import Callout from "../../../components/Callout"
import PlantUMLDiagram from "../../../components/PlantUMLDynamic"

export const metadata: Metadata = {
  title: 'Memory Management Pattern | AI Engineering Wiki',
  description: 'Wie AI-Agenten persistentes Wissen speichern und abrufen — CLAUDE.md, Topic Files, Knowledge Graphs.',
}

export default function MemoryManagementPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Memory Management Pattern</h1>
        <p className="text-gray-400 mt-2">
          Wie AI-Agenten persistentes Wissen speichern und abrufen.
        </p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            AI-Agenten vergessen alles zwischen Sessions. Memory Management löst
            das durch 3 Stufen: CLAUDE.md (einfach, 0ms Latenz), Topic Files
            (mittlere Komplexität, ~50K Tokens), Knowledge Graphs mit
            Vektordatenbanken (unbegrenzt, ~200ms Latenz). Für 90% der Projekte
            reicht CLAUDE.md. Erst bei großen Wissensbasen brauchst du ChromaDB
            oder pgvector.
          </p>
        </Callout>

        <figure className="my-8">
          <img src="/images/diagrams/patterns-memory-3tier.png" alt="Memory Management 3-Tier Modell — Session, Project, Knowledge" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">3-Tier Memory: Session Memory, Project Memory und Knowledge Graph</figcaption>
        </figure>

        <h2 className="text-xl font-semibold text-white mt-8">Das Problem</h2>
        <p>
          Jeder API-Call ist eine leere Session. Dein Agent weiß nicht, was gestern
          passiert ist. Memory Management löst dieses Problem durch strukturierte
          Persistenz.
        </p>

        <figure className="my-8">
          <img src="/images/diagrams/patterns-memory-flow.png" alt="Memory Flow — Wie Daten zwischen Sessions persistiert werden" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Memory Flow: So wird Wissen zwischen Sessions gespeichert und abgerufen</figcaption>
        </figure>

        <PlantUMLDiagram
          diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam rectangleBorderColor #334155
skinparam rectangleBackgroundColor #0F172A

title Memory Tiers: 3-Stufen-Modell

rectangle "HOT Memory" as hot #8B0000 {
  rectangle "CLAUDE.md / memory.md\\n~8K Tokens, 0ms Latenz\\nImmer geladen" as hot_desc #0F172A
}

rectangle "WARM Memory" as warm #4a4a00 {
  rectangle "Topic Files (docs/)\\n~50K Tokens, ~50ms Latenz\\nBei Kontext-Match geladen" as warm_desc #0F172A
}

rectangle "COLD Memory" as cold #1E3A5F {
  rectangle "Knowledge Graph / Vektordatenbank\\nUnbegrenzt, ~200ms Latenz\\nNur auf explizite Query" as cold_desc #0F172A
}

hot -[#4262FF]-> warm : Demotion\\n(30 Tage ungenutzt)
warm -[#4262FF]-> cold : Demotion\\n(90 Tage ungenutzt)
cold -[#22c55e]-> warm : Promotion\\n(wieder relevant)
warm -[#22c55e]-> hot : Promotion\\n(3x in 7 Tagen)
@enduml`}
          caption="Memory Tiers: HOT (immer geladen), WARM (bei Bedarf), COLD (auf Anfrage) mit automatischer Promotion/Demotion"
        />

        <h2 className="text-xl font-semibold text-white mt-8">Das Drei-Stufen-Memory-System in der Praxis</h2>
        <p>
          Ein produktives Memory-System löst das Vergessens-Problem mit drei Stufen, die
          zusammenspielen: Kernwissen (immer geladen), Tagesprotokolle (Session-Historie)
          und optionale Vector Memory (semantische Suche).
        </p>

        <h3 className="text-lg font-semibold text-white mt-6">Stufe 1: MEMORY.md — Das Kerngehirn</h3>
        <p>
          Die wichtigste Datei im System. Stell sie dir als das essentielle Briefing vor, das bei
          jedem einzelnen Start geladen wird. Was kommt hinein? Aktive Projekte und deren Status,
          wichtige Entscheidungen, aktuelle Business-Prioritäten, Links zu wichtigen Ressourcen.
        </p>
        <p className="mt-2">
          Eine gute Faustregel: Wenn du ein neues Teammitglied in sechzig Sekunden briefen müsstest,
          was würdest du ihm sagen? Das gehört in MEMORY.md. Wichtige Regel: Unter zweihundert
          Zeilen halten — eine aufgeblähte Memory-Datei verschwendet Tokens und verwässert die
          wichtigen Informationen.
        </p>

        <h3 className="text-lg font-semibold text-white mt-6">Stufe 2: Tagesprotokolle — Die Aktivitätsaufzeichnung</h3>
        <p>
          Während MEMORY.md das "was jetzt wichtig ist" speichert, speichern Tagesprotokolle das
          "was an jedem Tag passiert ist". Ein Arbeitstagebuch, das sich von selbst schreibt:
          Erledigte Aufgaben, getroffene Entscheidungen, erstellte Inhalte.
        </p>
        <p className="mt-2">
          Tagesprotokolle ermöglichen eine durchsuchbare Historie ("Woran habe ich letzten Dienstag
          gearbeitet?"), füttern Weekly-Review-Skills und sorgen für Kontinuität — die nächste
          Session kann genau dort weitermachen, wo die letzte aufgehört hat.
        </p>

        <h3 className="text-lg font-semibold text-white mt-6">Stufe 3: Vector Memory — Semantische Suche</h3>
        <p>
          Optional, aber leistungsfähig. Vector Memory ermöglicht semantische Suche über
          angesammeltes Wissen — basierend auf Bedeutung, nicht nur auf Schlüsselwörtern. Du kannst
          fragen "Was war unser Ansatz für Kunden-Onboarding?" und das System findet relevante
          Informationen, selbst wenn die genauen Worte nicht übereinstimmen.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Context-Dateien: Permanentes Grundwissen</h2>
        <p>
          Memory speichert, was im Laufe der Zeit passiert. Context-Dateien speichern die permanenten
          Grundlagen — die Dinge am Business, die sich nicht von Tag zu Tag ändern:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
          <li><strong>my-business.md</strong> — Firmenprofil, Mission, Zielkunden, Umsatzmodell</li>
          <li><strong>my-voice.md</strong> — Kommunikationsstil, Ton, Beispiel-Inhalte</li>
          <li><strong>my-products.md</strong> — Produktkatalog, Preise, Features, Differenzierung</li>
        </ul>
        <p className="mt-2">
          Die Voice-Datei löst die grösste Beschwerde über AI-generierten Content: dass er generisch
          und roboterhaft klingt. Je mehr Details du hineinsteckst — einschliesslich Beispielen deines
          tatsächlichen Schreibstils — desto authentischer wird der Output.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Technische Implementierungen</h2>

        <h3 className="text-lg font-semibold text-white mt-6">1. CLAUDE.md / PROJECT.md</h3>
        <p>
          Die einfachste Methode: Eine Markdown-Datei im Projektwurzelverzeichnis,
          die alle wichtigen Infos enthält. Wird bei jedem Run automatisch geladen.
        </p>
        <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto">
{`# Project Context
- Stack: Ollama + n8n + PostgreSQL
- Zielgruppe: KMUs in Österreich
- aktuelle Tasks: ...

# Entscheidungen
- Docker Compose für Deployment
- PostgreSQL für Datenhaltung

# Wichtige Files
- /src/api - REST Endpoints
- /tests - pytest Suite`}
        </pre>

        <h3 className="text-lg font-semibold text-white mt-6">2. Topic Files</h3>
        <p>
          Für komplexere Projekte: Mehrere Markdown-Dateien in einem /docs Verzeichnis.
          Jede Datei behandelt ein Thema (Architektur, API, Deployment, etc.).
        </p>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`/docs/
├── ARCHITEKTUR.md    # System-Übersicht
├── API.md            # Endpoints, Auth
├── DEPLOYMENT.md     # CI/CD, Server
└── ENTSCHEIDUNGEN.md # Projekt-Geschichten`}</code>
        </pre>

        <h3 className="text-lg font-semibold text-white mt-6">3. Knowledge Graphs</h3>
        <p>
          Für Wissensbasen mit Millionen von Tokens: Vector-Datenbanken wie
          pgvector oder ChromaDB. Speichere Dokumente, Code, Logs als Embeddings
          und finde sie mit natürlicher Sprache.
        </p>

        <h3 className="text-lg font-semibold text-white mt-6">4. Session Memory (Kurzzeit)</h3>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Python: Session Memory mit SQLite
import sqlite3

def save_session(agent_id, messages):
    conn = sqlite3.connect('memory.db')
    conn.execute(
        "INSERT INTO sessions VALUES (?, ?, datetime('now'))",
        (agent_id, json.dumps(messages))
    )
    conn.commit()

def load_session(agent_id):
    # Lade letzte 10 Nachrichten
    return conn.execute(
        "SELECT messages FROM sessions WHERE agent_id=? ORDER BY created DESC LIMIT 1",
        (agent_id,)
    ).fetchone()`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Wann was verwenden?</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2">Methode</th>
              <th className="py-2">Tokens</th>
              <th className="py-2">Latenz</th>
              <th className="py-2">Komplexität</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-800">
              <td className="py-2">CLAUDE.md</td>
              <td className="py-2">~8K</td>
              <td className="py-2">0ms</td>
              <td className="py-2">Minimal</td>
            </tr>
            <tr className="border-b border-gray-800">
              <td className="py-2">Topic Files</td>
              <td className="py-2">~50K</td>
              <td className="py-2">~50ms</td>
              <td className="py-2">Niedrig</td>
            </tr>
            <tr className="border-b border-gray-800">
              <td className="py-2">Knowledge Graph</td>
              <td className="py-2">Unlimited</td>
              <td className="py-2">~200ms</td>
              <td className="py-2">Hoch</td>
            </tr>
            <tr>
              <td className="py-2">Session Memory</td>
              <td className="py-2">~32K</td>
              <td className="py-2">~10ms</td>
              <td className="py-2">Mittel</td>
            </tr>
          </tbody>
        </table>

        <h2 className="text-xl font-semibold text-white mt-8">Beispiel: ChromaDB für Vektorspeicher</h2>
        <p className="text-gray-300">
          Wenn dein Wissen über 50K Tokens hinausgeht, speichere Dokumente
          als Embeddings und suche per Ähnlichkeit:
        </p>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# ChromaDB: Vektorspeicher für Agent-Memory
import chromadb

# Client erstellen (persistent)
client = chromadb.PersistentClient(path="./chroma_data")

# Collection anlegen
collection = client.get_or_create_collection(
    name="agent_knowledge",
    metadata={"hnsw:space": "cosine"}
)

# Dokumente speichern
collection.add(
    documents=[
        "PostgreSQL läuft auf Port 5432 im Docker Swarm",
        "Ollama braucht GPU-Node docker-swarm3",
        "Backup läuft täglich um 02:00 via Restic",
    ],
    ids=["doc1", "doc2", "doc3"],
    metadatas=[
        {"category": "infra"},
        {"category": "ai"},
        {"category": "ops"},
    ]
)

# Ähnlichkeitssuche
results = collection.query(
    query_texts=["Wo läuft die Datenbank?"],
    n_results=2
)
print(results["documents"])
# → [["PostgreSQL läuft auf Port 5432 im Docker Swarm", ...]]`}</code>
        </pre>

        <Callout type="tip" title="Praxis-Tipp">
          <p>
            Beginne mit CLAUDE.md. Das reicht für 90% der Projekte. Erst wenn du
            wirklich eine Wissensbasis aufbaust, die größer als 50K Tokens ist,
            brauchst du Vektordatenbanken wie ChromaDB oder pgvector.
          </p>
        </Callout>

        <h2 className="text-xl font-semibold text-white mt-8">Memory sauber halten</h2>
        <p className="text-gray-300">
          Memory-Pflege ist wie einen aufgeräumten Schreibtisch zu halten. Ohne regelmässiges
          Aufräumen werden wichtige Dinge unter Stapeln veralteter Informationen begraben.
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
          <li>Die Zweihundert-Zeilen-Regel für MEMORY.md ist die wichtigste — ältere Einträge ins Tagesprotokolle-Archiv verschieben</li>
          <li>MEMORY.md fokussiert auf aktuelle Prioritäten, aktive Projekte und essentielle Referenzinformationen halten</li>
          <li>Tagesprotokolle werden automatisch nach Datum organisiert — einmal im Monat ältere Protokolle archivieren</li>
          <li>Keine Secrets, Credentials oder API Keys in Memory-Dateien speichern</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Der echte Nutzen: Kontinuität</h2>
        <p className="text-gray-300">
          So sieht Memory Management in der Praxis aus: Montag erzählst du dem System von einem
          neuen Kundenprojekt — die Details werden im Tagesprotokoll gespeichert und das Projekt
          als aktiv in MEMORY.md markiert. Dienstag bittest du um ein Angebot — das System kennt
          die Details bereits und schreibt in deiner Markenstimme. Mittwoch kommt Kundenfeedback,
          Donnerstag kannst du nach dem Projektstatus fragen und bekommst eine komplette
          Zusammenfassung über alle Tage hinweg.
        </p>
        <p className="text-gray-300 mt-2">
          Kontinuität, Kontext und Erinnerung — die drei Dinge, die eine AI vom Tool zum
          verlässlichen Teammitglied machen.
        </p>

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://docs.anthropic.com/en/docs/claude-code/memory" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Anthropic: Claude Code Memory</a> — Offizielle Dokumentation zu CLAUDE.md</li>
            <li><a href="https://github.com/anthropics/claude-code" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Claude Code Repository</a> — CLAUDE.md Spezifikation und Beispiele</li>
            <li><a href="https://docs.trychroma.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">ChromaDB Dokumentation</a> — Open-Source Vektordatenbank</li>
            <li><a href="https://github.com/pgvector/pgvector" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">pgvector</a> — Vektor-Extension für PostgreSQL</li>
          </ul>
        </section>
      </div>
    </div>
  )
}