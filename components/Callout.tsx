"use client"

import React from "react"

type CalloutType = "info" | "tip" | "warning" | "summary"

const styles: Record<CalloutType, { bg: string; border: string; icon: string; title: string }> = {
  info: { bg: "bg-blue-500/10", border: "border-blue-500/30", icon: "\u2139\uFE0F", title: "Info" },
  tip: { bg: "bg-green-500/10", border: "border-green-500/30", icon: "\uD83D\uDCA1", title: "Tipp" },
  warning: { bg: "bg-orange-500/10", border: "border-orange-500/30", icon: "\u26A0\uFE0F", title: "Wichtig" },
  summary: { bg: "bg-purple-500/10", border: "border-purple-500/30", icon: "\uD83D\uDCCB", title: "Zusammenfassung" },
}

export default function Callout({
  type = "info",
  title,
  children,
}: {
  type?: CalloutType
  title?: string
  children: React.ReactNode
}) {
  const s = styles[type]
  return (
    <div className={`${s.bg} border ${s.border} rounded-xl p-5 my-6`}>
      <div className="font-bold text-white mb-2">
        {s.icon} {title || s.title}
      </div>
      <div className="text-white/70 text-sm leading-relaxed">{children}</div>
    </div>
  )
}
