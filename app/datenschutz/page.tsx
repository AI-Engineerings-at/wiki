import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | AI Engineering Wiki',
  description: 'Datenschutzerklärung und Informationen zum Umgang mit personenbezogenen Daten auf wiki.ai-engineering.at.',
  alternates: {
    canonical: 'https://wiki.ai-engineering.at/datenschutz',
    languages: {
      'de-AT': 'https://wiki.ai-engineering.at/datenschutz',
      'en': 'https://wiki.ai-engineering.at/en/privacy',
    },
  },
}

export default function DatenschutzPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Datenschutzerklärung</h1>
        <p className="text-slate-400 mt-2">Stand: 22. April 2026</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <h2 className="text-xl font-semibold text-white mt-8">1. Verantwortlicher</h2>
        <p className="text-gray-300 mt-2">
          Jörg Fuchs<br />
          AI Engineering — Einzelunternehmer<br />
          Buchgrabenweg 8<br />
          7000 Eisenstadt, Österreich<br />
          E-Mail: <a href="mailto:kontakt@ai-engineering.at" className="text-blue-400 hover:underline">kontakt@ai-engineering.at</a>
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">2. Überblick der Datenverarbeitung</h2>
        <p className="text-gray-300 mt-2">
          Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Die Verarbeitung personenbezogener Daten erfolgt regelmäßig nur nach Einwilligung des Nutzers oder wenn die Verarbeitung durch gesetzliche Vorschriften gestattet ist.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">3. Rechtsgrundlagen</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
          <li><strong className="text-white">Einwilligung (Art. 6 Abs. 1 lit. a DSGVO):</strong> Sofern Sie uns eine Einwilligung zur Verarbeitung erteilt haben (z. B. Newsletter).</li>
          <li><strong className="text-white">Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO):</strong> Zur Abwicklung Ihres Kaufs (E-Book-Download, Zahlungsabwicklung).</li>
          <li><strong className="text-white">Gesetzliche Verpflichtung (Art. 6 Abs. 1 lit. c DSGVO):</strong> Aufbewahrung von Rechnungsdaten gemäß österreichischem Steuerrecht (7 Jahre).</li>
          <li><strong className="text-white">Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO):</strong> Sicherstellung der IT-Sicherheit und des Betriebs unserer Website.</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">4. Erhobene Daten</h2>
        <h3 className="text-lg font-semibold text-slate-200 mt-4">a) Beim Besuch der Website</h3>
        <p className="text-gray-300 mt-2">
          Beim Aufrufen unserer Website werden automatisch folgende Daten erfasst: IP-Adresse, Datum und Uhrzeit des Zugriffs, verwendeter Browser und Betriebssystem, Referrer-URL. Diese Daten werden in Server-Logfiles gespeichert und nach spätestens 90 Tagen gelöscht.
        </p>

        <h3 className="text-lg font-semibold text-slate-200 mt-4">b) Beim Kauf eines Produkts</h3>
        <p className="text-gray-300 mt-2">
          Für die Kaufabwicklung werden folgende Daten verarbeitet: Name, E-Mail-Adresse und Zahlungsinformationen. Die Zahlungsabwicklung erfolgt über <strong className="text-white">Stripe, Inc.</strong> — Ihre Zahlungsdaten (Kreditkartennummer etc.) werden ausschließlich von Stripe verarbeitet und nie auf unseren Servern gespeichert.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">5. Drittanbieter und Auftragsverarbeiter</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
          <li>
            <strong className="text-white">Stripe, Inc.</strong> (South San Francisco, USA) — Zahlungsabwicklung. Stripe ist PCI-DSS-zertifiziert. Datenschutzrichtlinie:{' '}
            <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">stripe.com/privacy</a>
          </li>
          <li>
            <strong className="text-white">Cloudflare, Inc.</strong> (San Francisco, USA) — Website-Hosting (Cloudflare Pages). Datenschutzrichtlinie:{' '}
            <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">cloudflare.com/privacypolicy</a>
          </li>
          <li>
            <strong className="text-white">Rapidmail GmbH</strong> (Freiburg, Deutschland) — Newsletter-Versand. Ihre E-Mail-Adresse wird nur bei aktiver Newsletter-Anmeldung an Rapidmail übermittelt. Rechtsgrundlage: Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Datenschutzrichtlinie:{' '}
            <a href="https://www.rapidmail.de/datenschutz" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">rapidmail.de/datenschutz</a>
          </li>
        </ul>
        <p className="text-gray-300 mt-3">
          Für die Übermittlung von Daten in die USA stützen wir uns auf das EU-US Data Privacy Framework bzw. Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO).
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">6. Cookies und Webanalyse</h2>
        <p className="text-gray-300 mt-2">
          Diese Website verwendet ausschließlich technisch notwendige Cookies, die für den Betrieb der Website erforderlich sind. Es werden keine Tracking- oder Analyse-Cookies eingesetzt. Eine gesonderte Einwilligung ist daher nicht erforderlich.
        </p>
        <p className="text-gray-300 mt-2">
          Für die anonyme Webseitenanalyse setzen wir <strong className="text-white">Plausible Analytics</strong> ein (selbst gehostet). Plausible verwendet keine Cookies, erhebt keine personenbezogenen Daten und ist DSGVO-konform ohne Einwilligungsbanner einsetzbar. Es werden keine Daten an Dritte übermittelt.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">7. Newsletter</h2>
        <p className="text-gray-300 mt-2">
          Sie können sich freiwillig für unseren Newsletter anmelden. Dabei wird ausschließlich Ihre E-Mail-Adresse erhoben. Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Der Versand erfolgt über Rapidmail (siehe Abschnitt 5). Sie können sich jederzeit über den Abmeldelink in jeder Newsletter-E-Mail abmelden. Nach Abmeldung wird Ihre E-Mail-Adresse umgehend aus dem Verteiler gelöscht.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">8. Speicherdauer</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
          <li>Server-Logfiles: maximal 90 Tage</li>
          <li>Rechnungsdaten: 7 Jahre (gesetzliche Aufbewahrungspflicht, BAO)</li>
          <li>E-Mail-Adresse (bei Kauf): So lange für den Support erforderlich, maximal 3 Jahre nach Kauf</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">9. Ihre Rechte</h2>
        <p className="text-gray-300 mt-2">Sie haben jederzeit das Recht auf:</p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
          <li><strong className="text-white">Auskunft</strong> über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
          <li><strong className="text-white">Berichtigung</strong> unrichtiger Daten (Art. 16 DSGVO)</li>
          <li><strong className="text-white">Löschung</strong> Ihrer Daten (Art. 17 DSGVO)</li>
          <li><strong className="text-white">Einschränkung</strong> der Verarbeitung (Art. 18 DSGVO)</li>
          <li><strong className="text-white">Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
          <li><strong className="text-white">Widerspruch</strong> gegen die Verarbeitung (Art. 21 DSGVO)</li>
        </ul>
        <p className="text-gray-300 mt-3">
          Richten Sie Ihre Anfrage an: <a href="mailto:kontakt@ai-engineering.at" className="text-blue-400 hover:underline">kontakt@ai-engineering.at</a>
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">10. Widerrufsrecht bei digitalen Inhalten</h2>
        <p className="text-gray-300 mt-2">
          Sie haben das Recht, Ihren Kauf innerhalb von 14 Tagen ohne Angabe von Gründen zu widerrufen (§ 11 FAGG).
        </p>
        <p className="text-gray-300 mt-2">
          <strong className="text-white">Ausnahme:</strong> Wenn Sie beim Kauf dem sofortigen Download ausdrücklich zugestimmt und dabei bestätigt haben, dass Sie auf Ihr Widerrufsrecht verzichten, erlischt das Widerrufsrecht mit Bereitstellung des Downloads (§ 18 Abs. 1 Z 11 FAGG).
        </p>
        <p className="text-gray-300 mt-2">
          Zur Ausübung des Widerrufsrechts senden Sie eine eindeutige Erklärung (z. B. per E-Mail) an:{' '}
          <a href="mailto:kontakt@ai-engineering.at" className="text-blue-400 hover:underline">kontakt@ai-engineering.at</a>
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">11. Beschwerderecht</h2>
        <p className="text-gray-300 mt-2">
          Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer Daten gegen die DSGVO verstößt, können Sie sich bei der zuständigen Aufsichtsbehörde beschweren:
        </p>
        <p className="text-gray-300 mt-2">
          Österreichische Datenschutzbehörde<br />
          Barichgasse 40-42, 1030 Wien<br />
          Telefon: +43 1 52 152-0<br />
          E-Mail: dsb@dsb.gv.at<br />
          Website: <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">www.dsb.gv.at</a>
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-white/10 text-sm text-slate-500">
        <p>
          Verwandte Seiten:{' '}
          <a href="/impressum" className="text-blue-400 hover:underline">Impressum</a>
          {' · '}
          <a href="/agb" className="text-blue-400 hover:underline">AGB</a>
        </p>
      </div>
    </div>
  )
}
