"use client"
import { useEffect, useRef, useState } from "react"

declare global {
  interface Window {
    mermaid: {
      initialize: (config: Record<string, unknown>) => void
      run: (opts: { nodes: HTMLElement[] }) => Promise<void>
    }
  }
}

function loadMermaidScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && window.mermaid) {
      resolve()
      return
    }
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"
    script.onload = () => {
      window.mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          primaryColor: "#31F1A8",
          primaryTextColor: "#fff",
          lineColor: "#6FA7B2",
          background: "#0B0C0F",
        },
      })
      resolve()
    }
    script.onerror = reject
    document.head.appendChild(script)
  })
}

export default function MermaidDiagram({ chart, caption }: { chart: string; caption?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    let cancelled = false
    loadMermaidScript().then(() => {
      if (cancelled || !ref.current) return
      ref.current.textContent = chart
      ref.current.removeAttribute("data-processed")
      window.mermaid.run({ nodes: [ref.current] }).then(() => {
        if (!cancelled) setRendered(true)
      })
    })
    return () => { cancelled = true }
  }, [chart])

  return (
    <figure className="my-8">
      <div
        ref={ref}
        className="mermaid bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 overflow-x-auto"
      >
        {chart}
      </div>
      {caption && (
        <figcaption className="text-center text-white/40 text-sm mt-2">{caption}</figcaption>
      )}
    </figure>
  )
}
