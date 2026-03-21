import { Metadata } from "next"
import PlantUMLDiagram from "../../../../components/PlantUMLDynamic"
import { RelatedArticles } from "../../../../components/RelatedArticles"

export const metadata: Metadata = {
  title: "Retrieval-Augmented Generation (RAG) Paper Explained | AI Engineering Wiki",
  description:
    "The RAG paper by Lewis et al. (2020) explained: How LLMs become better and more reliable through external knowledge sources.",
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
          Lewis et al., 2020 — How to connect LLMs with external knowledge to reduce
          hallucinations and provide up-to-date information.
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm text-white/40">
          <span>Reading time: 10 min</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Last updated: March 2026</span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        {/* Summary */}
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-5 my-6">
          <div className="font-bold text-white mb-2">At a Glance</div>
          <div className="text-white/70 text-sm leading-relaxed">
            <p>
              Retrieval-Augmented Generation (RAG) combines an LLM with an external
              knowledge source. Instead of relying solely on training data, the model
              first searches for relevant documents and uses them as context for its
              answer. This reduces hallucinations and enables up-to-date, source-based
              responses.
            </p>
          </div>
        </div>

        {/* The Problem */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            The Problem: LLMs and Their Static Knowledge
          </h2>
          <p className="text-white/70 leading-relaxed">
            LLMs have a fundamental problem: Their knowledge is frozen at training time.
            They cannot access current information, do not know internal company documents,
            and hallucinate plausible-sounding but incorrect answers when they do not know
            something.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            Before RAG, there were two approaches: Either retrain the model (expensive and
            slow) or pack everything into the prompt (limited by context window). Neither
            scales.
          </p>
        </section>

        {/* The RAG Architecture */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            The RAG Architecture
          </h2>
          <p className="text-white/70 leading-relaxed">
            The paper by Lewis et al. proposes an elegant solution: Combine a retriever
            (search component) with a generator (LLM) into an end-to-end system.
          </p>
          <p className="text-white/70 leading-relaxed mt-4">
            The process in three steps:
          </p>
          <ul className="text-white/70 mt-4 space-y-3">
            <li>
              <strong className="text-white">1. Retrieval:</strong> The user query is
              converted into a vector (embedding). This vector is compared against a
              database of document vectors. The most similar documents are returned.
            </li>
            <li>
              <strong className="text-white">2. Augmentation:</strong> The retrieved
              documents are passed to the LLM along with the original question as context.
            </li>
            <li>
              <strong className="text-white">3. Generation:</strong> The LLM generates
              an answer based on both the question AND the provided documents.
            </li>
          </ul>

          <PlantUMLDiagram diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam RectangleBorderColor #4262FF
skinparam RectangleBackgroundColor #1E293B

title RAG Pipeline

rectangle "User Question" as q #334155
rectangle "Embedding\\nModel" as emb #2D1B69
rectangle "Vector\\nDatabase" as vdb #1E3A5F
rectangle "Top-K\\nDocuments" as docs #1E3A5F
rectangle "Merge\\nContext" as ctx #334155
rectangle "LLM\\n(Generator)" as llm #7C3AED
rectangle "Answer with\\nSource Citations" as ans #065F46

q --> emb : 1. Embedding
emb --> vdb : 2. Similarity Search
vdb --> docs : 3. Relevant Documents
q --> ctx : Original Question
docs --> ctx : Context
ctx --> llm : 4. Augmented Prompt
llm --> ans : 5. Generation
@enduml`} caption="RAG Pipeline: Question is embedded, relevant documents retrieved, and passed to the LLM alongside the question" />
        </section>

        {/* Two Variants */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Two Variants: RAG-Sequence and RAG-Token
          </h2>
          <ul className="text-white/70 mt-4 space-y-3">
            <li>
              <strong className="text-white">RAG-Sequence:</strong> The model selects one
              document and generates the entire answer based on that single document.
              Good for tasks where a single source suffices.
            </li>
            <li>
              <strong className="text-white">RAG-Token:</strong> For each generated token,
              the model can draw on a different document. This enables answers that
              combine information from multiple sources.
            </li>
          </ul>

          <PlantUMLDiagram diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam RectangleBorderColor #4262FF
skinparam RectangleBackgroundColor #1E293B

title Dense Retrieval vs. Sparse Retrieval

rectangle "Search Query" as query #334155

package "Sparse Retrieval (BM25)" as sparse {
  rectangle "Keyword\\nMatching" as kw #7C3AED
  rectangle "TF-IDF /\\nBM25 Score" as tfidf #2D1B69
  rectangle "Exact Word\\nMatch" as exact #1E3A5F
}

package "Dense Retrieval (Vector)" as dense {
  rectangle "Semantic\\nEmbedding" as semb #7C3AED
  rectangle "Cosine\\nSimilarity" as cos #2D1B69
  rectangle "Meaning-Based\\nSearch" as meaning #1E3A5F
}

rectangle "Hybrid Search:\\nCombination of Both Approaches" as hybrid #065F46

query --> kw
kw --> tfidf
tfidf --> exact

query --> semb
semb --> cos
cos --> meaning

exact --> hybrid
meaning --> hybrid
@enduml`} caption="Dense vs. Sparse Retrieval: Modern RAG systems often use Hybrid Search combining both approaches" />
        </section>

        {/* Why RAG Matters */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Why RAG Matters
          </h2>
          <ul className="text-white/70 mt-4 space-y-3">
            <li>
              <strong className="text-white">Fewer hallucinations:</strong> The model can
              reference real documents instead of guessing. Answers are verifiable and
              source-based.
            </li>
            <li>
              <strong className="text-white">Current knowledge:</strong> The knowledge
              base can be updated at any time without retraining the model. New documents
              are immediately available.
            </li>
            <li>
              <strong className="text-white">Data privacy:</strong> Company documents
              stay in your own infrastructure. The LLM does not need to be trained on
              sensitive data — it only receives them at query time.
            </li>
            <li>
              <strong className="text-white">Cost efficiency:</strong> Instead of training
              a massive model with all knowledge, a smaller model plus good retriever
              is sufficient.
            </li>
          </ul>
        </section>

        {/* RAG in Practice Today */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            RAG in Practice Today
          </h2>
          <p className="text-white/70 leading-relaxed">
            The RAG pattern has become the standard architecture for enterprise AI.
            In practice, the following components are commonly used:
          </p>
          <ul className="text-white/70 mt-4 space-y-2">
            <li><strong className="text-white">Vector Databases:</strong> Chroma, Qdrant, Weaviate, pgvector</li>
            <li><strong className="text-white">Embedding Models:</strong> sentence-transformers, OpenAI Embeddings, Nomic</li>
            <li><strong className="text-white">Chunking Strategies:</strong> Semantic Chunking, Recursive Character Splitting</li>
            <li><strong className="text-white">Hybrid Search:</strong> Combination of vector search and classic keyword search (BM25)</li>
          </ul>
        </section>

        {/* Sources */}
        <section className="mt-12 pt-8 border-t border-slate-800">
          <h2 className="text-lg font-bold text-white mb-4">Sources</h2>
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
