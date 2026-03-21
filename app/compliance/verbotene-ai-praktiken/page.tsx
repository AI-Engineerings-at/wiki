import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Verbotene AI-Praktiken nach EU AI Act | AI Engineering Wiki',
  description: 'Article 5 verbietet bestimmte KI-Praktiken. Social Scoring, Emotion Recognition, Biometrische Überwachung - was seit Feb 2025 verboten ist.',
}

export default function VerboteneAIPraktikenPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Verbotene AI-Praktiken</h1>
        <p className="text-slate-400 mt-2">Compliance · 4 min · Stand: Feb 2026</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mt-0 mb-2">Achtung: Seit 2. Februar 2025 in Kraft</h2>
          <p className="text-slate-300 mb-0">
            Article 5 des EU AI Act verbietet bestimmte KI-Praktiken absolut. 
            Keine Abwägung, keine Ausnahmen — absolute Verbote mit Strafen bis zu <strong>€35 Mio.</strong>
          </p>
        </div>

        <figure className="my-8">
          <img src="/images/infographics/verbotene-ai-praktiken.png" alt="Verbotene AI-Praktiken nach Art. 5 EU AI Act" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Art. 5 EU AI Act: Die 6 verbotenen KI-Praktiken auf einen Blick</figcaption>
        </figure>

        <h2>Die 6 verbotenen Praktiken</h2>

        <h3>1. Subversive Manipulation (Art. 5(1)(a))</h3>
        <p className="text-slate-300">
          <strong>Was verboten ist:</strong> KI-Systeme, die Menschen durch "subliminale Techniken" 
          oder bewusste Täuschung zu schädlichen Entscheidungen bringen.
        </p>
        <p className="text-slate-300">
          <strong>Beispiel:</strong> Ein KI-Tool, dasimpulsives Kaufverhalten durch versteckte 
          Trigger manipuliert.
        </p>

        <h3>2. Social Scoring (Art. 5(1)(b))</h3>
        <p className="text-slate-300">
          <strong>Was verboten ist:</strong> KI-Systeme, die Personen basierend auf ihrem 
          sozialen Verhalten oder nicht rechtlich begründeten Kriterien bewerten.
        </p>
        <p className="text-slate-300">
          <strong>Beispiel:</strong> Ein System, das Bonität basierend auf Social-Media-Aktivität bewertet.
        </p>

        <h3>3. Biometrische Kategorisierung (Art. 5(1)(c))</h3>
        <p className="text-slate-300">
          <strong>Was verboten ist:</strong> Nutzung biometrischer Daten zur Kategorisierung 
          von Personen in Echtzeit an öffentlichen Orten.
        </p>
        <p className="text-slate-300">
          <strong>Beispiel:</strong> Gesichtserkennung in Echtzeit auf öffentlichen Plätzen zur Erkennung von "auffälligem Verhalten".
        </p>

        <h3>4. Emotion Recognition im Arbeitskontext (Art. 5(1)(d))</h3>
        <p className="text-slate-300">
          <strong>Was verboten ist:</strong> KI-Systeme zur Erkennung von Emotionen am Arbeitsplatz 
          und in Bildungseinrichtungen.
        </p>
        <p className="text-slate-300">
          <strong>Beispiel:</strong> Webcam-Analyse während Bewerbungsgespräche zur Bewertung von "Vertrauen" oder "Nervosität".
        </p>

        <h3>5. Ungezielte Gesichtsdaten-Sammlung (Art. 5(1)(e))</h3>
        <p className="text-slate-300">
          <strong>Was verboten ist:</strong> Erstellen oder Erweitern von Datenbanken durch 
          ungezieltes Sammeln von Gesichtsbildern aus dem Internet.
        </p>
        <p className="text-slate-300">
          <strong>Beispiel:</strong> Scraping von Social-Media-Profilen zur Erstellung von Face-Recognition-Datenbanken.
        </p>

        <h3>6. Behördliche Social Scoring Systeme (Art. 5(1)(f))</h3>
        <p className="text-slate-300">
          <strong>Was verboten ist:</strong> KI-Systeme von Behörden, die Bürger basierend auf 
          sozialem Verhalten risiko-bewerten.
        </p>
        <p className="text-slate-300">
          <strong>Beispiel:</strong> Automatisierte Entscheidungen über Sozialleistungen basierend auf "Risiko-Scores".
        </p>

        <h2>Ausnahmen</h2>
        <p className="text-slate-300">
          Bestimmte biometrische Anwendungen sind erlaubt:
        </p>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Gesichtserkennung für Strafverfolgung (mit Genehmigung)</li>
          <li>Notfall-Suchen (Vermisste, Terrorismus)</li>
          <li>Medizinische Anwendungen</li>
          <li>Sicherheit kritischer Infrastruktur</li>
        </ul>

        <h2>Was Unternehmen jetzt tun müssen</h2>
        <ol className="list-decimal list-inside text-slate-300 space-y-2">
          <li>Alle KI-Systeme auf verbotene Praktiken prüfen</li>
          <li>Dokumentation vorhandener Systeme aktualisieren</li>
          <li>Verträge mit KI-Anbietern prüfen</li>
          <li>Interne Richtlinien für erlaubte KI-Nutzung erstellen</li>
        </ol>

        <h2>Prüfe dein System</h2>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Checkliste: Ist dein System verboten?

## Frage 1: Manipuliert das System Menschen?
→subliminale Techniken, versteckte Trigger
→ VERBOTEN wenn JA

## Frage 2: Bewertet das System Personen nach sozialem Verhalten?
→ Social Scoring, Bonität aus Social Media
→ VERBOTEN wenn JA

## Frage 3: Nutzt das System biometrische Daten in Echtzeit?
→ Gesichtserkennung auf öffentlichen Plätzen
→ VERBOTEN wenn JA (Ausnahmen s.o.)

## Frage 4: Erkennt das System Emotionen am Arbeitsplatz?
→ Webcam-Analyse, Stimmungsanalyse
→ VERBOTEN wenn JA

## Frage 5: Sammelt das System ungezielt Gesichtsbilder?
→ Scraping aus dem Internet
→ VERBOTEN wenn JA`}</code>
        </pre>

        <h2>Quellen</h2>
        <ul>
          <li><a href="https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R1689" target="_blank" className="text-blue-400 hover:underline">EU AI Act Originaltext (EUR-Lex)</a></li>
          <li><a href="https://www.eyreact.com/eu-ai-act-article-5-complete-guide-to-prohibited-ai-practices/" target="_blank" className="text-blue-400 hover:underline">EYreACT: Article 5 Guide</a></li>
          <li><a href="https://fpf.org/blog/red-lines-under-the-eu-ai-act-understanding-prohibited-ai-practices-and-their-interplay-with-the-gdpr-dsa/" target="_blank" className="text-blue-400 hover:underline">FPF: Red Lines under EU AI Act</a></li>
        </ul>
      </div>

      <div className="mt-12 pt-8 border-t border-white/10 text-center">
        <p className="text-sm text-slate-500">
          Alle Wiki-Artikel sind kostenlos. Wenn du fertige Templates und Bundles suchst:
        </p>
        <a
          href="https://www.ai-engineering.at"
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors mt-2 inline-block"
        >
          Produkte & Bundles ansehen →
        </a>
      </div>
    </div>
  )
}