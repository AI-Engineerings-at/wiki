import { Metadata } from "next"
import Callout from "../../../components/Callout"
import { RelatedArticles } from "../../../components/RelatedArticles"

export const metadata: Metadata = {
  title: "Retrieval-Augmented Generation (RAG) Paper erklärt | AI Engineering Wiki",
  description:
    "Das RAG-Paper von Lewis et al. (2020) verständlich erklärt: Wie LLMs durch externe Wissensquellen besser und zuverlässiger werden.",
}

export default function RAGPaperPage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Papers</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Retrieval-Augmented Generation (RAG)
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          Lewis et al., 2020 — Wie man LLMs mit externem Wissen verbindet, um
          Halluzinationen zu reduzieren und aktuelle Informationen zu liefern.
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
            Retrieval-Augmented Generation (RAG) kombiniert ein LLM mit einer externen
            Wissensquelle. Statt sich nur auf das Training zu verlassen, sucht das Modell
            zuerst relevante Dokumente und nutzt diese als Kontext für die Antwort.
            Das reduziert Halluzinationen und ermöglicht aktuelle, quellenbasierte Antworten.
          </p>
        </Callout>

        {/* Das Problem */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Das Problem: LLMs und ihr statisches Wissen
          </h2>
          <p className="text-white/70 leading-relaxed">
            LLMs haben ein fundamentales Problem: Ihr Wissen ist auf den Trainings-Zeitpunkt
            eingefroren. Sie können nicht auf aktuelle Informationen zugreifen, kennen keine
            internen Firmendokumente und halluzinieren plausibel klingende aber falsche
            Antworten, wenn sie etwas nicht wissen.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            Vor RAG gab es zwei Ansätze: Entweder das Modell neu trainieren (teuer und
            langsam) oder alles in den Prompt packen (begrenzt durch das Kontextfenster).
            Beides skaliert nicht.
          </p>
        </section>

        {/* Die RAG-Architektur */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Die RAG-Architektur
          </h2>
          <p className="text-white/70 leading-relaxed">
            Das Paper von Lewis et al. schlägt eine elegante Lösung vor: Man kombiniert
            einen Retriever (Suchkomponente) mit einem Generator (LLM) zu einem
            End-to-End-System.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            Der Ablauf in drei Schritten:
          </p>
          <ul className="text-white/70 mt-4 space-y-3">
            <li>
              <strong className="text-white">1. Retrieval:</strong> Die Nutzerfrage wird
              in einen Vektor umgewandelt (Embedding). Dieser Vektor wird gegen eine
              Datenbank von Dokument-Vektoren verglichen. Die ähnlichsten Dokumente
              werden zurückgegeben.
            </li>
            <li>
              <strong className="text-white">2. Augmentation:</strong> Die gefundenen
              Dokumente werden zusammen mit der ursprünglichen Frage als Kontext an
              das LLM übergeben.
            </li>
            <li>
              <strong className="text-white">3. Generation:</strong> Das LLM generiert
              eine Antwort basierend auf der Frage UND den bereitgestellten Dokumenten.
            </li>
          </ul>
        </section>

        {/* Zwei Varianten */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Zwei Varianten: RAG-Sequence und RAG-Token
          </h2>
          <p className="text-white/70 leading-relaxed">
            Das Paper beschreibt zwei Varianten des Modells:
          </p>
          <ul className="text-white/70 mt-4 space-y-3">
            <li>
              <strong className="text-white">RAG-Sequence:</strong> Das Modell wählt ein
              Dokument und generiert die gesamte Antwort basierend auf diesem einen
              Dokument. Gut für Aufgaben, bei denen eine einzelne Quelle ausreicht.
            </li>
            <li>
              <strong className="text-white">RAG-Token:</strong> Bei jedem generierten
              Token kann das Modell auf ein anderes Dokument zurückgreifen. Das ermöglicht
              Antworten, die Informationen aus mehreren Quellen kombinieren.
            </li>
          </ul>
        </section>

        {/* Warum RAG wichtig ist */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Warum RAG so wichtig ist
          </h2>
          <ul className="text-white/70 mt-4 space-y-3">
            <li>
              <strong className="text-white">Weniger Halluzinationen:</strong> Das Modell
              kann auf echte Dokumente verweisen statt zu raten. Antworten sind
              nachprüfbar und quellenbasiert.
            </li>
            <li>
              <strong className="text-white">Aktuelles Wissen:</strong> Die Wissensbasis
              kann jederzeit aktualisiert werden, ohne das Modell neu zu trainieren.
              Neue Dokumente sind sofort verfügbar.
            </li>
            <li>
              <strong className="text-white">Datenschutz:</strong> Firmendokumente bleiben
              in der eigenen Infrastruktur. Das LLM muss nicht mit sensiblen Daten
              trainiert werden — es bekommt sie nur im Moment der Anfrage.
            </li>
            <li>
              <strong className="text-white">Kosteneffizienz:</strong> Statt ein riesiges
              Modell mit allem Wissen zu trainieren, reicht ein kleineres Modell plus
              guter Retriever.
            </li>
          </ul>
        </section>

        {/* RAG in der Praxis */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            RAG in der Praxis heute
          </h2>
          <p className="text-white/70 leading-relaxed">
            Das RAG-Pattern hat sich als Standard-Architektur für Enterprise-AI etabliert.
            In der Praxis kommen heute folgende Komponenten zum Einsatz:
          </p>
          <ul className="text-white/70 mt-4 space-y-2">
            <li><strong className="text-white">Vector Databases:</strong> Chroma, Qdrant, Weaviate, pgvector</li>
            <li><strong className="text-white">Embedding-Modelle:</strong> sentence-transformers, OpenAI Embeddings, Nomic</li>
            <li><strong className="text-white">Chunking-Strategien:</strong> Semantic Chunking, Recursive Character Splitting</li>
            <li><strong className="text-white">Hybrid Search:</strong> Kombination aus Vektor-Suche und klassischer Keyword-Suche (BM25)</li>
          </ul>
          <Callout type="tip" title="Praktischer Einstieg">
            <p>
              Für einen praktischen Einstieg in RAG mit konkretem Setup-Guide, siehe
              unseren Artikel{" "}
              <a href="/tools/rag-guide" className="text-blue-400 hover:underline">RAG Complete Guide</a>.
            </p>
          </Callout>
        </section>

        {/* Quellen */}
        <section className="mt-12 pt-8 border-t border-slate-800">
          <h2 className="text-lg font-bold text-white mb-4">Quellen</h2>
          <ul className="text-white/70 space-y-2 text-sm">
            <li>
              Lewis, P. et al. (2020). &quot;Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks.&quot;{" "}
              <a href="https://arxiv.org/abs/2005.11401" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                arXiv:2005.11401
              </a>
            </li>
          </ul>
        </section>

        <RelatedArticles />
      </div>
    </div>
  )
}
