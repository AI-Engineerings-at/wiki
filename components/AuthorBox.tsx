'use client'

import { usePathname } from 'next/navigation'

export function AuthorBox() {
  const pathname = usePathname() || '/'
  const isEn = pathname === '/en' || pathname.startsWith('/en/')

  return (
    <aside className="border border-slate-800 rounded-xl bg-slate-900/50 p-6 mt-12" aria-label={isEn ? 'About the author' : 'Ueber den Autor'}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-[#31F1A8] rounded-full flex items-center justify-center shrink-0">
          <span className="text-black font-black text-lg">JF</span>
        </div>
        <div>
          <p className="text-white font-bold text-sm">Joerg Fuchs</p>
          <p className="text-slate-500 text-xs mb-2">
            {isEn ? 'AI Engineer · Mechatronics · Austria' : 'AI Engineer · Mechatroniker · Oesterreich'}
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            {isEn
              ? 'I run 9 nodes, 3 GPUs, 37 workflows in production. 13 Anthropic certifications, NVIDIA Developer. Everything in this wiki comes from real operations — not theory.'
              : 'Ich betreibe 9 Nodes, 3 GPUs, 37 Workflows in Produktion. 13 Anthropic-Zertifizierungen, NVIDIA Developer. Alles in diesem Wiki kommt aus echtem Betrieb — nicht aus der Theorie.'}
          </p>
          <div className="flex gap-3 mt-3 text-xs">
            <a href="https://www.ai-engineering.at/ueber" className="text-[#31F1A8] hover:underline">
              {isEn ? 'About me' : 'Ueber mich'}
            </a>
            <a href="https://hub.ai-engineering.at" className="text-[#31F1A8] hover:underline">
              Hub
            </a>
            <span className="text-slate-600 ml-auto">
              {isEn ? 'Last reviewed: April 2026' : 'Zuletzt geprueft: April 2026'}
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}
