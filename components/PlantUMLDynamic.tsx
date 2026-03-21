import dynamic from "next/dynamic"

const PlantUMLDiagram = dynamic(() => import("./PlantUMLDiagram"), {
  ssr: false,
  loading: () => (
    <figure className="my-8">
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-8 flex items-center justify-center min-h-[200px]">
        <div className="text-white/30 text-sm">Diagramm wird geladen...</div>
      </div>
    </figure>
  ),
})

export default PlantUMLDiagram
