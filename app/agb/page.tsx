import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AGB | AI Engineering Wiki',
  description: 'Allgemeine Geschäftsbedingungen für den Kauf digitaler Produkte bei AI Engineering.',
  alternates: {
    canonical: 'https://wiki.ai-engineering.at/agb',
    languages: {
      'de-AT': 'https://wiki.ai-engineering.at/agb',
      'en': 'https://wiki.ai-engineering.at/en/terms',
    },
  },
}

export default function AGBPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Allgemeine Geschäftsbedingungen</h1>
        <p className="text-slate-400 mt-2">Stand: 22. April 2026</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <h2 className="text-xl font-semibold text-white mt-8">1. Vertragspartner</h2>
        <p className="text-gray-300 mt-2">
          Jörg Fuchs<br />
          AI Engineering — Einzelunternehmer<br />
          Buchgrabenweg 8, 7000 Eisenstadt, Österreich<br />
          E-Mail: <a href="mailto:kontakt@ai-engineering.at" className="text-blue-400 hover:underline">kontakt@ai-engineering.at</a>
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">2. Vertragsgegenstand</h2>
        <p className="text-gray-300 mt-2">
          Gegenstand des Kaufvertrages sind die folgenden digitalen Produkte (alle Preise im Sinne der Kleinunternehmerregelung gem. § 6 Abs. 1 Z 27 UStG — keine gesonderte Umsatzsteuer ausgewiesen):
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1 mt-3">
          <li><strong className="text-white">Der Lokale AI-Stack — Playbook</strong> (E-Book/PDF) — EUR 49</li>
          <li><strong className="text-white">n8n AI Workflow Bundle</strong> (JSON-Workflows + Dokumentation) — EUR 29</li>
          <li><strong className="text-white">Grafana Dashboard Pack</strong> (Dashboard-Konfigurationen + Setup-Guide) — EUR 39</li>
          <li><strong className="text-white">DSGVO Compliance Kit</strong> (Vorlagen, Checklisten, Richtlinien) — EUR 79</li>
          <li><strong className="text-white">AI Agent Team Blueprint</strong> (Architektur-Templates + Guides) — EUR 19</li>
          <li><strong className="text-white">AI Engineering Komplett-Bundle</strong> (alle Einzelprodukte als Gesamtpaket) — EUR 149</li>
          <li><strong className="text-white">AI OS Template Pro</strong> (Komplettvorlage für Business-Automatisierung) — EUR 249</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">3. Vertragsschluss</h2>
        <p className="text-gray-300 mt-2">
          Durch Klick auf den Kaufbutton und Abschluss des Bezahlvorgangs über eine unserer Verkaufsplattformen (Stripe oder Gumroad) kommt ein verbindlicher Kaufvertrag zustande. Sie erhalten unmittelbar nach dem Kauf eine Bestätigungs-E-Mail mit dem Download-Link zum Produkt.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">4. Zahlung</h2>
        <p className="text-gray-300 mt-2">
          Die Zahlung erfolgt über <strong className="text-white">Stripe, Inc.</strong> (PCI-DSS Level 1 zertifiziert) oder <strong className="text-white">Gumroad, Inc.</strong> Akzeptierte Zahlungsmittel: Kreditkarte, Debitkarte, PayPal (je nach Plattform). Kartendaten werden von AI Engineering zu keinem Zeitpunkt gespeichert.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">5. Lieferung digitaler Inhalte</h2>
        <p className="text-gray-300 mt-2">
          Der Zugang zum Produkt (Download-Link) wird unmittelbar nach erfolgreicher Zahlung per E-Mail übermittelt. Eine physische Lieferung findet nicht statt.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">6. Widerrufsrecht und Widerrufsbelehrung</h2>
        <p className="text-gray-300 mt-2">
          Gemäß § 18 Abs. 1 Z 11 FAGG (Fern- und Auswärtsgeschäfte-Gesetz) erlischt das Widerrufsrecht bei digitalen Inhalten (nicht auf einem körperlichen Datenträger), wenn die Ausführung des Vertrages begonnen hat, nachdem der Verbraucher ausdrücklich zugestimmt hat, dass der Unternehmer vor Ablauf der Widerrufsfrist mit der Ausführung beginnt, und der Verbraucher bestätigt hat, dass er damit sein Widerrufsrecht verliert.
        </p>
        <p className="text-gray-300 mt-3 p-4 border border-orange-500/30 rounded-lg bg-orange-500/5">
          <strong className="text-blue-400">Hinweis:</strong> Mit dem Abschluss des Kaufvorgangs stimmen Sie ausdrücklich zu, dass AI Engineering vor Ablauf der 14-tägigen Widerrufsfrist mit der Zurverfügungstellung des digitalen Inhalts beginnt, und bestätigen, dass Sie damit Ihr Widerrufsrecht verlieren.
        </p>
        <p className="text-gray-300 mt-3">
          Ein Widerruf nach erfolgtem Download ist daher ausgeschlossen.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">7. Updates und Nutzungsrechte</h2>
        <p className="text-gray-300 mt-2">
          Alle zukünftigen Major-Updates zum Produkt werden kostenfrei bereitgestellt. Das Produkt darf ausschließlich für den persönlichen Gebrauch genutzt werden. Eine Weitergabe, Vervielfältigung oder kommerzielle Nutzung ist ohne ausdrückliche schriftliche Genehmigung untersagt.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">8. Gewährleistung</h2>
        <p className="text-gray-300 mt-2">
          Es gelten die gesetzlichen Gewährleistungsrechte nach österreichischem Recht (ABGB). Für digitale Inhalte haften wir dafür, dass diese zum Zeitpunkt der Lieferung frei von Mängeln sind und den vereinbarten Spezifikationen entsprechen.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">9. Haftungsbeschränkung</h2>
        <p className="text-gray-300 mt-2">
          Die im Playbook enthaltenen Informationen dienen ausschließlich der Bildung und Information. AI Engineering übernimmt keine Haftung für etwaige Schäden, die durch die Umsetzung der beschriebenen Techniken entstehen können. Die Verwendung der beschriebenen Technologien erfolgt auf eigene Verantwortung.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">10. Anwendbares Recht und Gerichtsstand</h2>
        <p className="text-gray-300 mt-2">
          Es gilt österreichisches Recht unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist Eisenstadt, Österreich.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">11. Datenschutz</h2>
        <p className="text-gray-300 mt-2">
          Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer{' '}
          <a href="/datenschutz" className="text-blue-400 hover:underline">Datenschutzerklärung</a>.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-white/10 text-sm text-slate-500">
        <p>
          Verwandte Seiten:{' '}
          <a href="/impressum" className="text-blue-400 hover:underline">Impressum</a>
          {' · '}
          <a href="/datenschutz" className="text-blue-400 hover:underline">Datenschutz</a>
        </p>
      </div>
    </div>
  )
}
