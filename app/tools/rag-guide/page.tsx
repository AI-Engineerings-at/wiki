import Callout from "../../../components/Callout"
import PlantUMLDiagram from "../../../components/PlantUMLDynamic"

export const metadata = {
  title: 'RAG Guide | AI Engineering Wiki',
  description:
    'RAG (Retrieval Augmented Generation) in der Praxis: Embeddings, Vector DBs (ChromaDB/Qdrant), Hybrid Search und wie du dein eigenes Wissen ins LLM bringst.',
}

const ragPipelineDiagram = `@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam rectangleBorderColor #334155
skinparam rectangleBackgroundColor #0F172A

rectangle "User Query" as query
rectangle "Query Embedding" as embed
rectangle "Retriever\\n(Vector DB + BM25)" as retriever
rectangle "Relevante Chunks\\n(Context)" as context
rectangle "LLM\\n(Ollama / OpenAI)" as llm
rectangle "Generierte Antwort" as answer

query -down-> embed : Text → Vektor
embed -down-> retriever : Ähnlichkeitssuche
retriever -down-> context : Top-K Ergebnisse
context -down-> llm : Query + Context
llm -down-> answer : Augmented Generation

@enduml`

export default function RagGuide() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">RAG Complete Guide</h1>
        <p className="text-gray-400 mt-2">Tools · 10 min</p>
        <div className="flex flex-wrap gap-2 mt-2 mb-4">
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">Stand: März 2026</span>
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">LangChain 0.3.x</span>
        </div>
      </div>

      <Callout type="summary" title="Überblick">
        RAG (Retrieval Augmented Generation) kombiniert Information Retrieval mit Textgenerierung:
        Dein LLM greift auf eigene Dokumente zu statt nur auf Trainingsdaten. Dieser Guide deckt
        die komplette Pipeline ab — von Embeddings über Vector DBs (ChromaDB, Qdrant) bis Hybrid Search
        und Query Transformations. Mit Code-Beispielen für Ollama + LangChain.
      </Callout>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-gray-300">
          RAG (Retrieval Augmented Generation) kombiniert Information Retrieval mit 
          Text Generation. Das LLM kann so auf dein eigenes Wissen zugreifen — 
          statt nur auf seine Trainingsdaten.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Warum RAG?</h2>
        
        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
          <li>LLMs wissen nicht alles — besonders nicht dein Wissen</li>
          <li>Trainings-Daten sind veraltet — RAG nutzt aktuelle Dokumente</li>
          <li>Kein Prompt-Engineering für jeden Use Case nötig</li>
          <li>Zitate und Quellen sind nachvollziehbar</li>
          <li>Datenschutz: Deine Dokumente verlassen nie deine Infrastruktur</li>
        </ul>

        <figure className="my-8">
          <img src="/images/diagrams/tools-rag-pipeline.png" alt="RAG Pipeline — Document Chunking, Embedding, Retrieval, Generation" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">RAG Pipeline: Von der Dokumentenverarbeitung bis zur Antwortgenerierung</figcaption>
        </figure>

        <PlantUMLDiagram diagram={ragPipelineDiagram} caption="RAG Pipeline: Query → Embedding → Retriever → Context → LLM → Antwort" />

        <h2 className="text-xl font-semibold text-white mt-8">RAG Workflow</h2>

        <h3 className="text-lg font-medium text-white mt-4">Phase 1: Offline (einmalig)</h3>
        <ol className="list-decimal list-inside text-gray-300 space-y-2 mt-2">
          <li><strong>Document Chunking:</strong> Dokumente in kleinere Teile splitten (256-512 Tokens)</li>
          <li><strong>Embedding:</strong> Chunks in numerische Vektoren umwandeln</li>
          <li><strong>Indexing:</strong> Vektoren in durchsuchbare Datenbank speichern</li>
        </ol>

        <h3 className="text-lg font-medium text-white mt-4">Phase 2: Online (bei jeder Query)</h3>
        <ol className="list-decimal list-inside text-gray-300 space-y-2 mt-2">
          <li><strong>Query Embedding:</strong> User-Frage in Vektor umwandeln</li>
          <li><strong>Retrieval:</strong> Ähnlichste Dokument-Chunks finden</li>
          <li><strong>Augmented Generation:</strong> LLM generiert Antwort basierend auf Query + Chunks</li>
        </ol>

        <h2 className="text-xl font-semibold text-white mt-8">Vector Databases</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Database</th>
                <th className="text-left py-2 text-gray-400">Typ</th>
                <th className="text-left py-2 text-gray-400">Vorteile</th>
                <th className="text-left py-2 text-gray-400">Nachteile</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2 text-white">ChromaDB</td>
                <td className="py-2">Open Source</td>
                <td className="py-2">Einfach, Python-nativ</td>
                <td className="py-2">Weniger Features</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 text-white">Weaviate</td>
                <td className="py-2">Open Source</td>
                <td className="py-2">Hybrid Search, GraphQL</td>
                <td className="py-2">Komplexer</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 text-white">Qdrant</td>
                <td className="py-2">Open Source</td>
                <td className="py-2">Schnell, Rust-basiert</td>
                <td className="py-2">Jünger, weniger Docs</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 text-white">Pinecone</td>
                <td className="py-2">Managed Cloud</td>
                <td className="py-2">Zero Ops, skalierbar</td>
                <td className="py-2">Kosten, nicht lokal</td>
              </tr>
              <tr>
                <td className="py-2 text-white">Neo4j</td>
                <td className="py-2">Graph + Vektor</td>
                <td className="py-2">Beziehungen wichtig</td>
                <td className="py-2">Ressourcen-intensiv</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Embedding Models</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Model</th>
                <th className="text-left py-2 text-gray-400">Dimensionen</th>
                <th className="text-left py-2 text-gray-400">Kosten</th>
                <th className="text-left py-2 text-gray-400">Lokal?</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">text-embedding-ada-002</td>
                <td className="py-2">1536</td>
                <td className="py-2">$0.0001/1K Tokens</td>
                <td className="py-2">Nein</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">text-embedding-3-large</td>
                <td className="py-2">3072</td>
                <td className="py-2">$0.00013/1K</td>
                <td className="py-2">Nein</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">all-MiniLM-L6-v2</td>
                <td className="py-2">384</td>
                <td className="py-2">Kostenlos</td>
                <td className="py-2">Ja</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">all-mpnet-base-v2</td>
                <td className="py-2">768</td>
                <td className="py-2">Kostenlos</td>
                <td className="py-2">Ja</td>
              </tr>
              <tr>
                <td className="py-2">mxbai-embed-large</td>
                <td className="py-2">1024</td>
                <td className="py-2">Kostenlos</td>
                <td className="py-2">Ja (Ollama)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Best Practices</h2>

        <ol className="list-decimal list-inside text-gray-300 space-y-3 mt-4">
          <li>
            <strong>Chunk Size: 256-512 Tokens</strong> — Balance zwischen Kontext und Präzision
          </li>
          <li>
            <strong>Overlap: 50-100 Tokens</strong> — Kontext geht nicht verloren an Chunk-Grenzen
          </li>
          <li>
            <strong>Hybrid Search:</strong> BM25 (Keyword) + Semantische Suche kombinieren
          </li>
          <li>
            <strong>Reranking:</strong> Cross-Encoder nach initial Retrieval für bessere Ergebnisse
          </li>
          <li>
            <strong>Metadata Filtering:</strong> Filter nach Datum, Autor, Kategorie ermöglichen
          </li>
        </ol>

        <h2 className="text-xl font-semibold text-white mt-8">Einfaches RAG Setup mit Ollama</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# 1. Ollama mit LangChain/LlamaIndex
pip install langchain langchain-community llama-index

# 2. Einfaches RAG mit LangChain
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_ollama import ChatOllama
from langchain.chains import RetrievalQA

# Dokumente laden
loader = TextLoader("meine_dokumente.txt")
docs = loader.load()

# Chunking
text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
chunks = text_splitter.split_documents(docs)

# Embedding + Vector Store
embeddings = OllamaEmbeddings(model="nomic-embed-text")
vectorstore = Chroma.from_documents(chunks, embeddings)

# QA Chain
llm = ChatOllama(model="llama3.2")
qa = RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", 
                                   retriever=vectorstore.as_retriever())

# Query
result = qa.run("Was steht in meinen Dokumenten?")
print(result)`}</code>
        </pre>

        <p className="text-gray-300 mt-3">
          Erwartete Ausgabe:
        </p>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Beispielausgabe:
# "In Ihren Dokumenten geht es um die Projektplanung für Q1 2026.
# Die Hauptpunkte sind: Budgetfreigabe, Team-Ressourcen und 
# Meilenstein-Definitionen."`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Hybrid RAG: BM25 + Vektor</h2>

        <p className="text-gray-300">
          Für beste Ergebnisse kombinieren wir keyword-basierte Suche (BM25) mit 
          semantischer Suche:
        </p>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Hybrid Search mit LangChain
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor
from langchain_community.retrievers import BM25Retriever

# BM25 Retriever (Keyword)
bm25_retriever = BM25Retriever.from_documents(chunks)

# Vector Retriever (Semantic)
vector_retriever = vectorstore.as_retriever(search_kwargs={"k": 5})

# Beide kombinieren
from langchain.retrievers import EnsembleRetriever
ensemble = EnsembleRetriever(
    retrievers=[bm25_retriever, vector_retriever],
    weights=[0.5, 0.5]
)

# Fusion Retrieval (neuere Alternative)
# Alle Ergebnisse mischen und nach Score neu sortieren`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Fortgeschritten: Query Transformations</h2>

        <p className="text-gray-300 mb-4">
          Du kannst die Query vor dem Retrieval verbessern:
        </p>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Multi-Query Retrieval
from langchain.retrievers.multi_query import MultiQueryRetriever

# Generiert mehrere Varianten der User-Query
# und führt alle Retrievals zusammen
retriever = MultiQueryRetriever.from_llm(
    retriever=vector_retriever,
    llm=llm
)

# Step-back Prompting
from langchain.prompts import PromptTemplate
step_back_prompt = PromptTemplate.from_template("""
Du bist ein hilfreicher Assistent. 
Frage allgemeiner formuliert: {question}
""")

# HyDE (Hypothetical Document Embeddings)
# LLM generiert hypothetische Antwort → embedden → Retrieval`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Unser Hybrid RAG Stack</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <h3 className="font-semibold text-white mb-3">Wir nutzen:</h3>
          <ul className="text-gray-300 text-sm space-y-2">
            <li>• <strong>ChromaDB</strong> — Vector Store (einfach, Python-nativ)</li>
            <li>• <strong>Neo4j</strong> — Knowledge Graph für Beziehungen</li>
            <li>• <strong>BM25</strong> — Keyword-Suche via Whoosh</li>
            <li>• <strong>nomic-embed-text</strong> — Lokales Embedding Model</li>
            <li>• <strong>LlamaIndex</strong> — RAG Framework</li>
            <li>• <strong>Ollama</strong> — Lokales LLM für Generation</li>
          </ul>
        </div>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Zusammenfassung</h3>
          <p className="text-gray-300">
            RAG ist der Schlüssel zu lokalen AI-Systemen, die auf dein Wissen zugreifen können.
            Mit ChromaDB + Ollama hast du ein einfaches Setup. Für Produktion empfehlen wir
            Hybrid Search (BM25 + Vektor) + Reranking für beste Ergebnisse.
          </p>
        </div>

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://python.langchain.com/docs/tutorials/rag/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">LangChain RAG Tutorial</a> — Offizielle LangChain-Dokumentation zu RAG</li>
            <li><a href="https://docs.llamaindex.ai/en/stable/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">LlamaIndex Docs</a> — RAG Framework Dokumentation</li>
            <li><a href="https://docs.trychroma.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">ChromaDB Docs</a> — AI-native Embedding-Datenbank</li>
            <li><a href="https://qdrant.tech/documentation/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Qdrant Documentation</a> — High-Performance Vector Search</li>
            <li><a href="https://github.com/ollama/ollama" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Ollama</a> — Lokale LLM Runtime</li>
          </ul>
        </section>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-slate-500">
            Alle Wiki-Artikel sind kostenlos. Wenn du fertige Templates und Bundles suchst:
          </p>
          <a href="https://www.ai-engineering.at" className="text-sm text-blue-400 hover:text-blue-300 transition-colors mt-2 inline-block">
            Produkte &amp; Bundles ansehen →
          </a>
        </div>
      </div>
    </div>
  )
}