'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SelfHostedVsCloudServices() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/en/grundlagen/lokal-vs-cloud')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <p className="text-slate-400">Redirecting...</p>
    </div>
  )
}
