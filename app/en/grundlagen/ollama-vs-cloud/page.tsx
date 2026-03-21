import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Ollama vs Cloud LLM | AI Engineering Wiki',
  description: 'Redirected to: Local AI vs Cloud: TCO Comparison',
}

export default function OllamaVsCloud() {
  redirect('/en/grundlagen/lokal-vs-cloud')
}
