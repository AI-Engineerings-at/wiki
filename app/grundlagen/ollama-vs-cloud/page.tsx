'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function OllamaVsCloud() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/grundlagen/lokal-vs-cloud')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <p className="text-slate-400">Weiterleitung...</p>
    </div>
  )
}
