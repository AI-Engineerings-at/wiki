import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | AI Engineering Wiki',
  description: 'Privacy policy and information on the processing of personal data on wiki.ai-engineering.at.',
  alternates: {
    canonical: 'https://wiki.ai-engineering.at/en/privacy',
    languages: {
      'de-AT': 'https://wiki.ai-engineering.at/datenschutz',
      'en': 'https://wiki.ai-engineering.at/en/privacy',
    },
  },
}

export default function PrivacyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
        <p className="text-slate-400 mt-2">Last updated: 22 April 2026</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <h2 className="text-xl font-semibold text-white mt-8">1. Controller</h2>
        <p className="text-gray-300 mt-2">
          Jörg Fuchs<br />
          AI Engineering — Sole Proprietor<br />
          Buchgrabenweg 8<br />
          7000 Eisenstadt, Austria<br />
          Email: <a href="mailto:kontakt@ai-engineering.at" className="text-blue-400 hover:underline">kontakt@ai-engineering.at</a>
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">2. Overview of Data Processing</h2>
        <p className="text-gray-300 mt-2">
          We process personal data only to the extent necessary to provide a functional website as well as our content and services. Personal data is generally only processed with the user's consent or where processing is permitted by law.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">3. Legal Bases</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
          <li><strong className="text-white">Consent (Art. 6(1)(a) GDPR):</strong> When you have given us consent to process your data (e.g. newsletter).</li>
          <li><strong className="text-white">Contract performance (Art. 6(1)(b) GDPR):</strong> For processing your purchase (ebook download, payment processing).</li>
          <li><strong className="text-white">Legal obligation (Art. 6(1)(c) GDPR):</strong> Retention of invoice data pursuant to Austrian tax law (7 years).</li>
          <li><strong className="text-white">Legitimate interests (Art. 6(1)(f) GDPR):</strong> Ensuring IT security and operation of our website.</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">4. Data Collected</h2>
        <h3 className="text-lg font-semibold text-slate-200 mt-4">a) When visiting the website</h3>
        <p className="text-gray-300 mt-2">
          When you access our website, the following data is automatically collected: IP address, date and time of access, browser and operating system used, referrer URL. This data is stored in server log files and deleted after 90 days at the latest.
        </p>

        <h3 className="text-lg font-semibold text-slate-200 mt-4">b) When purchasing a product</h3>
        <p className="text-gray-300 mt-2">
          For processing your purchase, we process: name, email address and payment information. Payment is handled by <strong className="text-white">Stripe, Inc.</strong> — your payment data (credit card numbers etc.) is exclusively processed by Stripe and never stored on our servers.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">5. Third Parties and Processors</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
          <li>
            <strong className="text-white">Stripe, Inc.</strong> (South San Francisco, USA) — payment processing. Stripe is PCI-DSS certified. Privacy policy:{' '}
            <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">stripe.com/privacy</a>
          </li>
          <li>
            <strong className="text-white">Cloudflare, Inc.</strong> (San Francisco, USA) — website hosting (Cloudflare Pages). Privacy policy:{' '}
            <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">cloudflare.com/privacypolicy</a>
          </li>
          <li>
            <strong className="text-white">Rapidmail GmbH</strong> (Freiburg, Germany) — newsletter delivery. Your email address is only transmitted to Rapidmail upon active newsletter subscription. Legal basis: consent (Art. 6(1)(a) GDPR). Privacy policy:{' '}
            <a href="https://www.rapidmail.de/datenschutz" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">rapidmail.de/datenschutz</a>
          </li>
        </ul>
        <p className="text-gray-300 mt-3">
          For data transfers to the USA, we rely on the EU-US Data Privacy Framework and/or Standard Contractual Clauses (Art. 46(2)(c) GDPR).
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">6. Cookies and Web Analytics</h2>
        <p className="text-gray-300 mt-2">
          This website uses only technically necessary cookies required for its operation. No tracking or analytics cookies are used. A separate consent is therefore not required.
        </p>
        <p className="text-gray-300 mt-2">
          For anonymous website analytics we use <strong className="text-white">Plausible Analytics</strong> (self-hosted). Plausible does not use cookies, does not collect personal data, and is GDPR-compliant without consent banners. No data is transmitted to third parties.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">7. Newsletter</h2>
        <p className="text-gray-300 mt-2">
          You may voluntarily subscribe to our newsletter. Only your email address is collected. Legal basis is your consent (Art. 6(1)(a) GDPR). Delivery is via Rapidmail (see section 5). You can unsubscribe at any time via the unsubscribe link in every newsletter email. After unsubscribing, your email address will be removed from the distribution list immediately.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">8. Retention Periods</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
          <li>Server log files: 90 days maximum</li>
          <li>Invoice data: 7 years (statutory retention obligation, Austrian Federal Fiscal Code — BAO)</li>
          <li>Email address (on purchase): as long as required for support, maximum 3 years after purchase</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">9. Your Rights</h2>
        <p className="text-gray-300 mt-2">You have the right to:</p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
          <li><strong className="text-white">Access</strong> to your stored data (Art. 15 GDPR)</li>
          <li><strong className="text-white">Rectification</strong> of inaccurate data (Art. 16 GDPR)</li>
          <li><strong className="text-white">Erasure</strong> of your data (Art. 17 GDPR)</li>
          <li><strong className="text-white">Restriction</strong> of processing (Art. 18 GDPR)</li>
          <li><strong className="text-white">Data portability</strong> (Art. 20 GDPR)</li>
          <li><strong className="text-white">Objection</strong> to processing (Art. 21 GDPR)</li>
        </ul>
        <p className="text-gray-300 mt-3">
          Send your request to: <a href="mailto:kontakt@ai-engineering.at" className="text-blue-400 hover:underline">kontakt@ai-engineering.at</a>
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">10. Right of Withdrawal for Digital Content</h2>
        <p className="text-gray-300 mt-2">
          You have the right to withdraw your purchase within 14 days without giving any reason (§ 11 FAGG — Austrian Distance and Off-Premises Contracts Act).
        </p>
        <p className="text-gray-300 mt-2">
          <strong className="text-white">Exception:</strong> If at the time of purchase you expressly consented to the immediate download and confirmed that you thereby waive your right of withdrawal, the right of withdrawal expires upon provision of the download (§ 18 para. 1 Z 11 FAGG).
        </p>
        <p className="text-gray-300 mt-2">
          To exercise your right of withdrawal, send a clear declaration (e.g. by email) to:{' '}
          <a href="mailto:kontakt@ai-engineering.at" className="text-blue-400 hover:underline">kontakt@ai-engineering.at</a>
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">11. Right to Lodge a Complaint</h2>
        <p className="text-gray-300 mt-2">
          If you believe that the processing of your data violates the GDPR, you may lodge a complaint with the competent supervisory authority:
        </p>
        <p className="text-gray-300 mt-2">
          Austrian Data Protection Authority (Datenschutzbehörde)<br />
          Barichgasse 40-42, 1030 Vienna, Austria<br />
          Phone: +43 1 52 152-0<br />
          Email: dsb@dsb.gv.at<br />
          Website: <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">www.dsb.gv.at</a>
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-white/10 text-sm text-slate-500">
        <p>
          Related pages:{' '}
          <a href="/en/imprint" className="text-blue-400 hover:underline">Imprint</a>
          {' · '}
          <a href="/en/terms" className="text-blue-400 hover:underline">Terms &amp; Conditions</a>
          {' · '}
          <a href="/datenschutz" className="text-blue-400 hover:underline">Deutsche Version</a>
        </p>
      </div>
    </div>
  )
}
