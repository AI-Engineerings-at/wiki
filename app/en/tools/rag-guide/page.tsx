import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RAG Guide | AI Engineering Wiki',
  description: 'Retrieval-Augmented Generation with ChromaDB, Qdrant, Neo4j.',
}

export default function RAGGuidePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">RAG Guide</h1>
        <p className="text-slate-400 mt-2">Tools · 8 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-slate-300">
          RAG (Retrieval-Augmented Generation) combines the power of LLMs with your own documents. 
          The AI can answer questions about your data - without training.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">How RAG Works</h2>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`1. User asks question
2. Question → Embedding Model
3. Embedding → Vector Database
4. Find similar documents
5. Documents + Question → LLM
6. LLM generates answer`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Components</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li><strong>Document Loader:</strong> PDF, Markdown, HTML, Text</li>
          <li><strong>Text Splitter:</strong> Split into chunks</li>
          <li><strong>Embedding Model:</strong> Convert to vectors</li>
          <li><strong>Vector Database:</strong> Store and search</li>
          <li><strong>LLM:</strong> Generate answer from context</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Popular Tools</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 text-slate-400">Tool</th>
              <th className="text-left py-2 text-slate-400">Type</th>
              <th className="text-left py-2 text-slate-400">Best For</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            <tr className="border-b border-slate-800">
              <td className="py-2">ChromaDB</td>
              <td className="py-2">Vector DB</td>
              <td className="py-2">Simple setups</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2">Qdrant</td>
              <td className="py-2">Vector DB</td>
              <td className="py-2">Production</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2">Neo4j</td>
              <td className="py-2">Graph DB</td>
              <td className="py-2">Knowledge Graphs</td>
            </tr>
            <tr>
              <td className="py-2">pgvector</td>
              <td className="py-2">Vector DB</td>
              <td className="py-2">PostgreSQL users</td>
            </tr>
          </tbody>
        </table>

        <h2 className="text-xl font-semibold text-white mt-8">Basic RAG Pipeline</h2>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`# 1. Load and split documents
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

loader = TextLoader("my-docs.txt")
docs = loader.load()
splitter = RecursiveCharacterTextSplitter()
chunks = splitter.split_documents(docs)

# 2. Create embeddings and store
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import Chroma

embeddings = OllamaEmbeddings(model="nomic-embed-text")
db = Chroma.from_documents(chunks, embeddings)

# 3. Query
query = "What is our return policy?"
docs = db.similarity_search(query)

# 4. Get answer from LLM
from langchain_community.chat_models import ChatOllama
llm = ChatOllama(model="llama3:8b")
result = llm.invoke(f"Answer based on: {docs}")`}</code>
        </pre>
      </div>
    </div>
  )
}
