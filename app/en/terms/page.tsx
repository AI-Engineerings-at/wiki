import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions | AI Engineering Wiki',
  description: 'General Terms and Conditions for the purchase of digital products at AI Engineering.',
  alternates: {
    canonical: 'https://wiki.ai-engineering.at/en/terms',
    languages: {
      'de-AT': 'https://wiki.ai-engineering.at/agb',
      'en': 'https://wiki.ai-engineering.at/en/terms',
    },
  },
}

export default function TermsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">General Terms and Conditions</h1>
        <p className="text-slate-400 mt-2">Last updated: 22 April 2026</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <h2 className="text-xl font-semibold text-white mt-8">1. Contracting Party</h2>
        <p className="text-gray-300 mt-2">
          Jörg Fuchs<br />
          AI Engineering — Sole Proprietor<br />
          Buchgrabenweg 8, 7000 Eisenstadt, Austria<br />
          Email: <a href="mailto:kontakt@ai-engineering.at" className="text-blue-400 hover:underline">kontakt@ai-engineering.at</a>
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">2. Subject of Contract</h2>
        <p className="text-gray-300 mt-2">
          The subject of the purchase contract are the following digital products (all prices pursuant to the small business scheme under § 6 para. 1 Z 27 UStG — no VAT charged):
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1 mt-3">
          <li><strong className="text-white">The Local AI Stack — Playbook</strong> (ebook/PDF) — EUR 49</li>
          <li><strong className="text-white">n8n AI Workflow Bundle</strong> (JSON workflows + documentation) — EUR 29</li>
          <li><strong className="text-white">Grafana Dashboard Pack</strong> (dashboard configurations + setup guide) — EUR 39</li>
          <li><strong className="text-white">GDPR Compliance Kit</strong> (templates, checklists, policies) — EUR 79</li>
          <li><strong className="text-white">AI Agent Team Blueprint</strong> (architecture templates + guides) — EUR 19</li>
          <li><strong className="text-white">AI Engineering Complete Bundle</strong> (all individual products as a package) — EUR 149</li>
          <li><strong className="text-white">AI OS Template Pro</strong> (complete template for business automation) — EUR 249</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">3. Conclusion of Contract</h2>
        <p className="text-gray-300 mt-2">
          By clicking the purchase button and completing the payment process via one of our sales platforms (Stripe or Gumroad), a binding purchase contract is concluded. Immediately after purchase, you will receive a confirmation email with the download link to the product.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">4. Payment</h2>
        <p className="text-gray-300 mt-2">
          Payment is processed via <strong className="text-white">Stripe, Inc.</strong> (PCI-DSS Level 1 certified) or <strong className="text-white">Gumroad, Inc.</strong> Accepted payment methods: credit card, debit card, PayPal (depending on platform). AI Engineering never stores card data at any point.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">5. Delivery of Digital Content</h2>
        <p className="text-gray-300 mt-2">
          Access to the product (download link) is transmitted by email immediately after successful payment. No physical delivery takes place.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">6. Right of Withdrawal</h2>
        <p className="text-gray-300 mt-2">
          Pursuant to § 18 para. 1 Z 11 FAGG (Austrian Distance and Off-Premises Contracts Act), the right of withdrawal for digital content (not on a physical medium) expires when performance of the contract has begun after the consumer has expressly consented to the trader commencing performance before the expiry of the withdrawal period, and the consumer has confirmed that they thereby waive their right of withdrawal.
        </p>
        <p className="text-gray-300 mt-3 p-4 border border-orange-500/30 rounded-lg bg-orange-500/5">
          <strong className="text-blue-400">Notice:</strong> By completing the purchase, you expressly consent that AI Engineering begins providing the digital content before the expiry of the 14-day withdrawal period, and you confirm that you thereby waive your right of withdrawal.
        </p>
        <p className="text-gray-300 mt-3">
          A withdrawal after the download has been provided is therefore excluded.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">7. Updates and Rights of Use</h2>
        <p className="text-gray-300 mt-2">
          All future major updates of the product are provided free of charge. The product may only be used for personal purposes. Any passing on, reproduction or commercial use is prohibited without explicit written consent.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">8. Warranty</h2>
        <p className="text-gray-300 mt-2">
          Statutory warranty rights under Austrian law (ABGB — Austrian Civil Code) apply. For digital content, we guarantee that it is free from defects at the time of delivery and meets the agreed specifications.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">9. Limitation of Liability</h2>
        <p className="text-gray-300 mt-2">
          The information contained in the playbook serves exclusively for education and information. AI Engineering assumes no liability for any damages arising from the implementation of the described techniques. Use of the described technologies is at your own responsibility.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">10. Applicable Law and Place of Jurisdiction</h2>
        <p className="text-gray-300 mt-2">
          Austrian law applies, excluding the UN Convention on Contracts for the International Sale of Goods. Place of jurisdiction is Eisenstadt, Austria.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">11. Privacy</h2>
        <p className="text-gray-300 mt-2">
          Information on the processing of personal data can be found in our{' '}
          <a href="/en/privacy" className="text-blue-400 hover:underline">Privacy Policy</a>.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-white/10 text-sm text-slate-500">
        <p>
          Related pages:{' '}
          <a href="/en/imprint" className="text-blue-400 hover:underline">Imprint</a>
          {' · '}
          <a href="/en/privacy" className="text-blue-400 hover:underline">Privacy Policy</a>
          {' · '}
          <a href="/agb" className="text-blue-400 hover:underline">Deutsche Version</a>
        </p>
      </div>
    </div>
  )
}
