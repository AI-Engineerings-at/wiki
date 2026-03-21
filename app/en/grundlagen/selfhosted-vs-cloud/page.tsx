import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Self-hosted vs Cloud Services | AI Engineering Wiki',
  description: 'Redirected to: Local AI vs Cloud: TCO Comparison',
}

export default function SelfHostedVsCloudServices() {
  redirect('/en/grundlagen/lokal-vs-cloud')
}
