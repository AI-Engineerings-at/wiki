"use client"
import { useEffect, useRef, useState } from "react"

interface PlantUMLDiagramProps {
  diagram: string
  caption?: string
  darkBg?: boolean
}

export default function PlantUMLDiagram({ diagram, caption, darkBg = false }: PlantUMLDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDiagram = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://kroki.io/plantuml/svg", {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: diagram,
        })
        if (!response.ok) throw new Error(`Kroki error: ${response.status}`)
        const svg = await response.text()

        if (containerRef.current) {
          // Parse SVG safely via DOMParser — only accepts valid SVG from Kroki
          const parser = new DOMParser()
          const doc = parser.parseFromString(svg, "image/svg+xml")
          const svgEl = doc.querySelector("svg")
          if (svgEl) {
            svgEl.style.maxWidth = "100%"
            svgEl.style.height = "auto"
            // Clear container and append parsed SVG node (safe DOM manipulation)
            while (containerRef.current.firstChild) {
              containerRef.current.removeChild(containerRef.current.firstChild)
            }
            containerRef.current.appendChild(document.importNode(svgEl, true))
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Diagram loading failed")
      } finally {
        setLoading(false)
      }
    }
    fetchDiagram()
  }, [diagram])

  if (error) {
    return (
      <figure className="my-8">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">
          Diagramm konnte nicht geladen werden: {error}
        </div>
      </figure>
    )
  }

  return (
    <figure className="my-8">
      {/* Der Lade-Hinweis steht BEWUSST ausserhalb des ref-Containers:
          der Container wird unten per DOM-API geleert und befuellt (removeChild/appendChild).
          Rendert React ein Kind in denselben Container, versucht es beim Zustandswechsel,
          ein bereits entferntes Element zu loeschen -> NotFoundError: removeChild ->
          Fehlerseite "Etwas ist schiefgelaufen" (gemessen 2026-08-21: 44 von 182 Seiten,
          alle mit PlantUMLDiagram, online identisch). React darf in diesem Container
          keine Kinder besitzen. */}
      {loading && (
        <div className="text-white/30 text-sm text-center py-4">Diagramm wird geladen...</div>
      )}
      <div
        ref={containerRef}
        className={`border border-white/[0.06] rounded-xl p-6 overflow-x-auto flex justify-center min-h-[200px] ${
          darkBg ? "bg-[#0B0C0F]" : "bg-transparent"
        }`}
      />
      {caption && (
        <figcaption className="text-center text-white/40 text-sm mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
