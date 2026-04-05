'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export function ReadingTime() {
  const [minutes, setMinutes] = useState<number | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Count words in the main article content
    const main = document.querySelector('main')
    if (!main) return
    const text = main.textContent || ''
    const words = text.trim().split(/\s+/).length
    const readTime = Math.max(1, Math.round(words / 200)) // 200 words per minute
    setMinutes(readTime)
  }, [pathname])

  if (minutes === null) return null

  return (
    <span className="text-xs text-slate-500">
      ~{minutes} min
    </span>
  )
}
