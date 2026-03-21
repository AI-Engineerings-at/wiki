export default function KeyTakeaway({ points }: { points: string[] }) {
  return (
    <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-6 my-8">
      <h3 className="text-white font-bold text-lg mb-4">Das Wichtigste</h3>
      <ul className="space-y-2">
        {points.map((p, i) => (
          <li key={i} className="flex items-start gap-2 text-white/80 text-sm">
            <span className="text-green-400 mt-0.5">{"\u2713"}</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
