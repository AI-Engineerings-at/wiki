import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Ollama vs Cloud LLM | AI Engineering Wiki',
  description: 'Weitergeleitet zu: Lokale AI vs. Cloud: Der TCO-Vergleich',
}

export default function OllamaVsCloud() {
  redirect('/grundlagen/lokal-vs-cloud')
}
