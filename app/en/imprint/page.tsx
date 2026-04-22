import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Imprint | AI Engineering Wiki',
  description: 'Legal notice and disclosure pursuant to § 5 ECG (Austrian E-Commerce Act) for AI Engineering.',
  alternates: {
    canonical: 'https://wiki.ai-engineering.at/en/imprint',
    languages: {
      'de-AT': 'https://wiki.ai-engineering.at/impressum',
      'en': 'https://wiki.ai-engineering.at/en/imprint',
    },
  },
}

export default function ImprintPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Imprint</h1>
        <p className="text-slate-400 mt-2">Last updated: 22 April 2026</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <h2 className="text-xl font-semibold text-white mt-8">Information pursuant to § 5 ECG (Austrian E-Commerce Act)</h2>
        <p className="text-gray-300 mt-2">
          Jörg Fuchs<br />
          AI Engineering — Sole Proprietor<br />
          Buchgrabenweg 8<br />
          7000 Eisenstadt, Austria
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Contact</h2>
        <p className="text-gray-300 mt-2">
          Email: <a href="mailto:kontakt@ai-engineering.at" className="text-blue-400 hover:underline">kontakt@ai-engineering.at</a><br />
          Phone: +43 676 9526099
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Business Activity</h2>
        <p className="text-gray-300 mt-2">
          Creation and distribution of digital educational products (AI stack playbooks, guides, online courses).
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Trade License</h2>
        <p className="text-gray-300 mt-2">
          Sole proprietor pursuant to the Austrian Trade Act (Gewerbeordnung)<br />
          Responsible authority: Bezirkshauptmannschaft Eisenstadt-Umgebung<br />
          Member of the Austrian Federal Economic Chamber (Wirtschaftskammer Österreich)
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">VAT</h2>
        <p className="text-gray-300 mt-2">
          Small business pursuant to § 6 para. 1 Z 27 UStG — no VAT charged.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Online Dispute Resolution</h2>
        <p className="text-gray-300 mt-2">
          The European Commission provides a platform for online dispute resolution (ODR):{' '}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            https://ec.europa.eu/consumers/odr/
          </a>
        </p>
        <p className="text-gray-300 mt-2">
          We are neither willing nor obligated to participate in dispute resolution procedures before a consumer arbitration board.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Liability</h2>
        <p className="text-gray-300 mt-2">
          The content of this website has been created with the greatest possible care. However, we do not guarantee the accuracy, completeness, or timeliness of the content.
        </p>
        <p className="text-gray-300 mt-2">
          As a service provider, we are responsible for our own content on these pages under the general laws pursuant to § 7 para. 1 ECG. According to §§ 8 to 10 ECG, however, we are not obligated to monitor transmitted or stored third-party information.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Copyright</h2>
        <p className="text-gray-300 mt-2">
          All content on this website (text, images, graphics, code samples) is protected by copyright. Use for private, non-commercial purposes is permitted. Commercial use or distribution requires written consent from the author.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-white/10 text-sm text-slate-500">
        <p>
          Related pages:{' '}
          <a href="/en/privacy" className="text-blue-400 hover:underline">Privacy Policy</a>
          {' · '}
          <a href="/en/terms" className="text-blue-400 hover:underline">Terms &amp; Conditions</a>
          {' · '}
          <a href="/impressum" className="text-blue-400 hover:underline">Deutsche Version</a>
        </p>
      </div>
    </div>
  )
}
