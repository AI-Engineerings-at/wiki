/**
 * Lesezeit — EINE Funktion, EIN Wert (W6).
 *
 * Bis 2026-08-22 rechneten drei Stellen unterschiedlich: components/ReadingTime.tsx
 * zaehlte nach der Hydration die Woerter im DOM und teilte durch 200,
 * components/MdxArticleView.tsx nahm `words` aus dem Index mal 1,5, und
 * components/BlogPostPage.tsx hatte eine dritte Formel. Auf
 * /vergleiche/agent-frameworks/ stand deshalb oben rechts "~1 min" und in der
 * Metazeile "~2 min" — dieselbe Seite, zwei Zahlen.
 *
 * Grundlage ist jetzt immer die Wortzahl aus dem Index (scripts/build-index.js,
 * `wordList`) und dieser eine Faktor: 200 Woerter je Minute, mal 1,5 fuer
 * Code-Bloecke, Tabellen und Diagramme, aufgerundet, mindestens 1.
 *
 * `0` heisst: keine Wortzahl bekannt — dann wird keine Lesezeit angezeigt,
 * statt eine zu erfinden (NN3).
 */
export function lesezeitMinuten(words: number): number {
  if (!words || words <= 0) return 0
  return Math.max(1, Math.ceil((words / 200) * 1.5))
}
