import { Metadata } from 'next'

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

        <h2 className="text-xl font-semibold text-white mt-8">Lösungsansätze</h2>

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

        <h2 className="text-xl font-semibold text-white mt-8">Praxis-Tipp</h2>
        <p>
          Beginne mit CLAUDE.md. Das reicht für 90% der Projekte. Erst wenn du
          wirklich eine Wissensbasis aufbaust, die größer als 50K Tokens ist,
          brauchst du Vektordatenbanken.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Quellen</h2>
        <ul>
          <li><a href="https://docs.anthropic.com/en/docs/claude-code/memory" target="_blank" className="text-brand-blue hover:underline">Anthropic Memory Docs</a></li>
          <li><a href="https://github.com/anthropics/claude-code" target="_blank" className="text-brand-blue hover:underline">CLAUDE.md Specification</a></li>
        </ul>
      </div>
    </div>
  )
}