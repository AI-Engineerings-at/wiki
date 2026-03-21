import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Self-hosted vs Cloud Services | AI Engineering Wiki',
  description: 'Weitergeleitet zu: Lokale AI vs. Cloud: Der TCO-Vergleich',
}

export default function SelfHostedVsCloudServices() {
  redirect('/grundlagen/lokal-vs-cloud')
}
