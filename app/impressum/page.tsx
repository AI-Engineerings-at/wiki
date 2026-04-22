import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum | AI Engineering Wiki',
  description: 'Impressum und rechtliche Angaben gemäß § 5 ECG für AI Engineering.',
  alternates: {
    canonical: 'https://wiki.ai-engineering.at/impressum',
    languages: {
      'de-AT': 'https://wiki.ai-engineering.at/impressum',
      'en': 'https://wiki.ai-engineering.at/en/imprint',
    },
  },
}

export default function ImpressumPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Impressum</h1>
        <p className="text-slate-400 mt-2">Stand: 22. April 2026</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <h2 className="text-xl font-semibold text-white mt-8">Angaben gemäß § 5 ECG</h2>
        <p className="text-gray-300 mt-2">
          Jörg Fuchs<br />
          AI Engineering — Einzelunternehmer<br />
          Buchgrabenweg 8<br />
          7000 Eisenstadt, Österreich
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Kontakt</h2>
        <p className="text-gray-300 mt-2">
          E-Mail: <a href="mailto:kontakt@ai-engineering.at" className="text-blue-400 hover:underline">kontakt@ai-engineering.at</a><br />
          Telefon: +43 676 9526099
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Unternehmensgegenstand</h2>
        <p className="text-gray-300 mt-2">
          Erstellung und Vertrieb digitaler Bildungsprodukte (AI-Stack Playbooks, Anleitungen, Online-Kurse).
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Gewerbeberechtigung</h2>
        <p className="text-gray-300 mt-2">
          Einzelunternehmer gemäß Gewerbeordnung<br />
          Zuständige Behörde: Bezirkshauptmannschaft Eisenstadt-Umgebung<br />
          Mitglied der Wirtschaftskammer Österreich
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Umsatzsteuer</h2>
        <p className="text-gray-300 mt-2">
          Kleinunternehmer gemäß § 6 Abs. 1 Z 27 UStG — keine Umsatzsteuer ausgewiesen.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Streitschlichtung</h2>
        <p className="text-gray-300 mt-2">
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            https://ec.europa.eu/consumers/odr/
          </a>
        </p>
        <p className="text-gray-300 mt-2">
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Haftung</h2>
        <p className="text-gray-300 mt-2">
          Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte wird jedoch keine Gewähr übernommen.
        </p>
        <p className="text-gray-300 mt-2">
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 ECG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 ECG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Urheberrecht</h2>
        <p className="text-gray-300 mt-2">
          Alle Inhalte dieser Website (Texte, Bilder, Grafiken, Code-Beispiele) sind urheberrechtlich geschützt. Die Nutzung für private, nicht-kommerzielle Zwecke ist gestattet. Für kommerzielle Nutzung oder Verbreitung ist die schriftliche Zustimmung des Urhebers erforderlich.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-white/10 text-sm text-slate-500">
        <p>
          Verwandte Seiten:{' '}
          <a href="/datenschutz" className="text-blue-400 hover:underline">Datenschutz</a>
          {' · '}
          <a href="/agb" className="text-blue-400 hover:underline">AGB</a>
          {' · '}
          <a href="https://www.ai-engineering.at/impressum" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            Impressum auf ai-engineering.at
          </a>
        </p>
      </div>
    </div>
  )
}
