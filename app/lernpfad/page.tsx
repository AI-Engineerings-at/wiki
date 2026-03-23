'use client'

import { useState, useEffect, useCallback } from 'react'
import { WikiLink as Link } from '../../components/WikiLink'

/* ───────────────────────────── Types ───────────────────────────── */

type PathId = 'management' | 'it-admin' | 'developer' | 'compliance' | 'beginner'

interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation: string
}

interface StageData {
  title: string
  href: string
  description: string
  quiz: QuizQuestion
}

interface PathInfo {
  id: PathId
  icon: string
  title: string
  subtitle: string
  technical: string
  duration: string
  stages: StageData[]
  result: string
}

interface LernpfadState {
  completedStages: Record<string, string[]>   // pathId -> completed stage hrefs
  quizResults: Record<string, boolean>         // "pathId:stageIndex" -> passed
  feedback: Record<string, string>             // "pathId:stageIndex" -> "up" | "down"
  rating: Record<string, number>               // pathId -> 1-5
  comments: { name: string; text: string; date: string }[]
  newsletterDismissed: boolean
}

/* ───────────────────────────── Intro Quiz Data ───────────────────────────── */

const introQuestions = [
  {
    id: 1,
    question: 'Was beschreibt dich am besten?',
    options: [
      { key: 'A', label: 'Ich führe ein Unternehmen / bin in der Geschäftsleitung' },
      { key: 'B', label: 'Ich bin in der IT / Administration' },
      { key: 'C', label: 'Ich bin Entwickler / Programmierer' },
      { key: 'D', label: 'Ich bin für Compliance / Recht zuständig' },
      { key: 'E', label: 'Ich bin komplett neu bei KI' },
    ],
  },
  {
    id: 2,
    question: 'Was willst du erreichen?',
    options: [
      { key: 'A', label: 'Verstehen was KI kostet und was sie kann' },
      { key: 'B', label: 'KI-Systeme einrichten und betreiben' },
      { key: 'C', label: 'Eigene KI-Anwendungen bauen' },
      { key: 'D', label: 'Compliance-Anforderungen erfüllen' },
      { key: 'E', label: 'Einfach mal anfangen und ausprobieren' },
    ],
  },
  {
    id: 3,
    question: 'Wie technisch bist du?',
    options: [
      { key: 'A', label: 'Nicht technisch — ich will Ergebnisse, keine Details' },
      { key: 'B', label: 'Grundkenntnisse — ich kenne mich mit PCs aus' },
      { key: 'C', label: 'Fortgeschritten — Terminal, Docker sind mir bekannt' },
      { key: 'D', label: 'Experte — Ich entwickle Software' },
    ],
  },
]

/* ───────────────────────────── Path & Stage Data ───────────────────────────── */

const paths: PathInfo[] = [
  {
    id: 'management',
    icon: '\u{1F3E2}',
    title: 'Geschäftsführung & Management',
    subtitle: 'Was KI für dein Unternehmen bedeutet — Kosten, Nutzen, Risiken, Pflichten',
    technical: 'Nein',
    duration: '~2h',
    result: 'Entscheidungen treffen',
    stages: [
      {
        title: 'KI im Unternehmen: Was bringt es wirklich?',
        href: '/grundlagen/ki-unternehmen',
        description: 'Chancen, Grenzen und konkrete Einsatzfelder — ohne Hype.',
        quiz: {
          question: 'Was ist der größte Vorteil von lokaler KI für ein KMU?',
          options: [
            'Sie ist immer besser als Cloud',
            'Firmendaten bleiben im Haus',
            'Sie ist kostenlos',
            'Sie braucht kein Internet',
          ],
          correct: 1,
          explanation: 'Lokale KI bedeutet volle Datenkontrolle — sensible Firmendaten verlassen nie das Unternehmensnetzwerk.',
        },
      },
      {
        title: 'Was kostet KI? Der ehrliche Vergleich',
        href: '/grundlagen/ai-kosten-vergleich',
        description: 'Cloud-APIs vs. lokale Hardware: Was rechnet sich wann?',
        quiz: {
          question: 'Ab wann rechnet sich lokale KI gegenüber Cloud-APIs?',
          options: [
            'Sofort',
            'Nach 1 Woche',
            'Bei 50-200 Millionen Tokens/Monat',
            'Nie',
          ],
          correct: 2,
          explanation: 'Lokale Hardware amortisiert sich bei hohem Token-Durchsatz (50-200M Tokens/Monat) — darunter ist Cloud oft günstiger.',
        },
      },
      {
        title: 'Lokal vs Cloud: Was ist sicherer?',
        href: '/grundlagen/lokal-vs-cloud',
        description: 'Datenschutz, Kontrolle, Abhängigkeit — die Fakten.',
        quiz: {
          question: 'Was passiert wenn du Kundendaten in ChatGPT eingibst?',
          options: [
            'Nichts',
            'Sie werden für Training verwendet und du haftest',
            'OpenAI löscht sie sofort',
            'DSGVO erlaubt das',
          ],
          correct: 1,
          explanation: 'Daten können für Modell-Training verwendet werden. Als Verantwortlicher haftest du für den Datentransfer an Dritte.',
        },
      },
      {
        title: 'EU AI Act: Was du als Chef wissen musst',
        href: '/compliance/eu-ai-act',
        description: 'Die wichtigsten Pflichten auf einen Blick.',
        quiz: {
          question: 'Seit wann gilt die KI-Kompetenz-Pflicht (Art. 4)?',
          options: [
            'Ab August 2026',
            'Seit Februar 2025',
            'Erst ab 2027',
            'Gar nicht in Österreich',
          ],
          correct: 1,
          explanation: 'Artikel 4 des EU AI Act (KI-Kompetenzpflicht) gilt seit dem 2. Februar 2025 für alle Unternehmen in der EU.',
        },
      },
      {
        title: 'Art. 4: Was du tun MUSST',
        href: '/compliance/ki-kompetenz-art4',
        description: 'KI-Kompetenzpflicht seit Februar 2025 — betrifft jedes Unternehmen.',
        quiz: {
          question: 'Was droht bei Nicht-Einhaltung des EU AI Act?',
          options: [
            'Nichts',
            'Verwarnung',
            'Bis zu 35 Mio EUR oder 7% Umsatz',
            'Nur für große Konzerne relevant',
          ],
          correct: 2,
          explanation: 'Der EU AI Act sieht Bußgelder von bis zu 35 Millionen Euro oder 7% des weltweiten Jahresumsatzes vor.',
        },
      },
      {
        title: 'KI-Förderungen und Anlaufstellen in Österreich',
        href: '/oesterreich',
        description: 'Welche Förderungen es gibt und wo du Hilfe bekommst.',
        quiz: {
          question: 'Welche Stelle ist in Österreich für KI-Regulierung zuständig?',
          options: [
            'WKO',
            'RTR KI-Servicestelle',
            'AMS',
            'Die EU direkt',
          ],
          correct: 1,
          explanation: 'Die RTR (Rundfunk und Telekom Regulierungs-GmbH) betreibt die KI-Servicestelle als zentrale Anlaufstelle für KI-Regulierung in Österreich.',
        },
      },
    ],
  },
  {
    id: 'it-admin',
    icon: '\u{1F6E0}\u{FE0F}',
    title: 'IT & Administration',
    subtitle: 'KI-Systeme einrichten, betreiben und absichern',
    technical: 'Mittel',
    duration: '~4h',
    result: 'Stack betreiben',
    stages: [
      {
        title: 'Ollama: Lokales LLM in 5 Minuten',
        href: '/tools/ollama-tutorial',
        description: 'Ein Befehl, ein Modell — los gehts.',
        quiz: {
          question: 'Welcher Befehl startet ein lokales LLM mit Ollama?',
          options: [
            'ollama start llama',
            'ollama run llama3.2',
            'docker run ollama',
            'pip install ollama',
          ],
          correct: 1,
          explanation: 'Mit "ollama run <modellname>" lädst du ein Modell herunter und startest es sofort — ein einziger Befehl genügt.',
        },
      },
      {
        title: 'Docker: Warum Container?',
        href: '/tools/docker-grundlagen',
        description: 'Was Docker ist und warum du es für KI brauchst.',
        quiz: {
          question: 'Was ist der Hauptvorteil von Docker-Containern für KI-Systeme?',
          options: [
            'Container machen KI schneller',
            'Isolierte, reproduzierbare Umgebungen für jeden Service',
            'Docker ist kostenlos',
            'Container ersetzen die GPU',
          ],
          correct: 1,
          explanation: 'Docker-Container isolieren Services voneinander und machen Deployments reproduzierbar — egal auf welchem Server.',
        },
      },
      {
        title: 'Den kompletten AI-Stack einrichten',
        href: '/tools/ai-stack-setup',
        description: 'Ollama + Open WebUI + n8n — alles zusammen.',
        quiz: {
          question: 'Welche Komponenten bilden einen typischen lokalen AI-Stack?',
          options: [
            'Nur Ollama reicht aus',
            'ChatGPT + Ollama + Docker',
            'Ollama (LLM) + Open WebUI (Interface) + n8n (Automation)',
            'TensorFlow + PyTorch + Jupyter',
          ],
          correct: 2,
          explanation: 'Ein praxistauglicher lokaler AI-Stack besteht typischerweise aus einem LLM-Runner (Ollama), einer Weboberfläche (Open WebUI) und Automation (n8n).',
        },
      },
      {
        title: 'Monitoring: Siehst du ob alles läuft?',
        href: '/tools/grafana-monitoring',
        description: 'Grafana-Dashboards für deinen AI-Stack.',
        quiz: {
          question: 'Was ist der Zweck von Grafana im AI-Stack?',
          options: [
            'KI-Modelle trainieren',
            'System-Metriken visualisieren und Alerts setzen',
            'Docker-Container erstellen',
            'Backups automatisieren',
          ],
          correct: 1,
          explanation: 'Grafana visualisiert Metriken (CPU, RAM, GPU, Response-Zeiten) und kann bei Problemen automatisch Alerts senden.',
        },
      },
      {
        title: 'Netzwerk absichern',
        href: '/security/firewall-setup',
        description: 'Firewall-Regeln für selbst gehostete KI-Systeme.',
        quiz: {
          question: 'Was ist die wichtigste Firewall-Regel für einen lokalen AI-Stack?',
          options: [
            'Alle Ports öffnen für maximale Performance',
            'Nur benötigte Ports freigeben und Zugriff auf LAN beschränken',
            'Firewall komplett deaktivieren',
            'Nur SSH-Port sperren',
          ],
          correct: 1,
          explanation: 'Minimale Angriffsfläche: Nur die tatsächlich benötigten Ports freigeben und den Zugriff auf das lokale Netzwerk beschränken.',
        },
      },
      {
        title: 'Backup: Wenn was schiefgeht',
        href: '/security/backup-strategie',
        description: 'Automatische Backups — damit nichts verloren geht.',
        quiz: {
          question: 'Welche Backup-Strategie ist für einen AI-Stack am wichtigsten?',
          options: [
            'Nur die Modelle sichern',
            'Konfigurationen, Volumes und Datenbanken regelmäßig sichern',
            'Einmal im Jahr reicht',
            'Cloud-Backup bei OpenAI',
          ],
          correct: 1,
          explanation: 'Docker-Volumes, Konfigurationsdateien und Datenbanken müssen regelmäßig und automatisiert gesichert werden — Modelle können neu heruntergeladen werden.',
        },
      },
      {
        title: 'Automatisierung mit n8n',
        href: '/tools/n8n-fuer-anfaenger',
        description: 'Workflows bauen ohne Programmieren.',
        quiz: {
          question: 'Was kann n8n in Kombination mit lokaler KI automatisieren?',
          options: [
            'Nur E-Mails versenden',
            'Dokumente verarbeiten, Zusammenfassungen erstellen, Daten klassifizieren',
            'Nur Datenbanken verwalten',
            'Nur Webseiten erstellen',
          ],
          correct: 1,
          explanation: 'n8n verbindet lokale LLMs mit Business-Tools und kann Dokumentenverarbeitung, Klassifizierung, Zusammenfassungen und mehr automatisieren.',
        },
      },
    ],
  },
  {
    id: 'developer',
    icon: '\u{1F4BB}',
    title: 'Entwickler',
    subtitle: 'KI-Anwendungen bauen: Agents, RAG, APIs',
    technical: 'Hoch',
    duration: '~6h',
    result: 'Apps bauen',
    stages: [
      {
        title: 'Wie LLMs funktionieren',
        href: '/grundlagen/was-ist-ein-llm',
        description: 'Token-Prediction, Attention, Context Window — die Grundlagen.',
        quiz: {
          question: 'Was macht ein LLM wenn es Text generiert?',
          options: [
            'Es sucht im Internet nach Antworten',
            'Es sagt das nächste wahrscheinlichste Token vorher',
            'Es versteht den Text wie ein Mensch',
            'Es kopiert aus einer Datenbank',
          ],
          correct: 1,
          explanation: 'LLMs sind autoregressive Modelle: Sie berechnen eine Wahrscheinlichkeitsverteilung über alle möglichen nächsten Tokens und samplen daraus.',
        },
      },
      {
        title: 'Welches Modell für welchen Zweck?',
        href: '/tools/model-selection',
        description: 'Qwen, Llama, Mistral — wann nimmst du was?',
        quiz: {
          question: 'Was bestimmt hauptsächlich welches LLM du wählen solltest?',
          options: [
            'Immer das größte Modell nehmen',
            'Use-Case, verfügbarer VRAM und benötigte Sprachen',
            'Nur der Preis zählt',
            'Immer das neueste Modell',
          ],
          correct: 1,
          explanation: 'Die Modellwahl hängt vom konkreten Use-Case ab (Coding, Chat, Analyse), vom verfügbaren VRAM der GPU und davon welche Sprachen gut unterstützt werden müssen.',
        },
      },
      {
        title: 'RAG: Eigene Daten + LLM',
        href: '/tools/rag-guide',
        description: 'Retrieval Augmented Generation — dein Wissen, dein Modell.',
        quiz: {
          question: 'Was ist der Zweck von RAG (Retrieval Augmented Generation)?',
          options: [
            'Das Modell neu trainieren',
            'Eigene Dokumente als Kontext an das LLM übergeben ohne Feintuning',
            'Die Antwortgeschwindigkeit erhöhen',
            'GPU-Speicher sparen',
          ],
          correct: 1,
          explanation: 'RAG holt relevante Dokument-Abschnitte aus einer Vektordatenbank und übergibt sie als Kontext an das LLM — ohne aufwendiges Feintuning.',
        },
      },
      {
        title: 'Agent Patterns',
        href: '/patterns/agent-orchestration-patterns',
        description: 'Sequential, Parallel, Hierarchical — die wichtigsten Muster.',
        quiz: {
          question: 'Was unterscheidet einen AI-Agent von einem einfachen LLM-Call?',
          options: [
            'Agents sind immer schneller',
            'Agents können Tools aufrufen, planen und iterativ arbeiten',
            'Agents brauchen kein LLM',
            'Agents funktionieren nur in der Cloud',
          ],
          correct: 1,
          explanation: 'Agents erweitern LLMs um Tool-Use, Planung und iterative Verarbeitung — sie können selbstständig Teilschritte ausführen und Ergebnisse bewerten.',
        },
      },
      {
        title: 'Memory & Context',
        href: '/patterns/memory-management',
        description: 'Wie Agents sich erinnern und Kontext verwalten.',
        quiz: {
          question: 'Warum brauchen AI-Agents ein Memory-System?',
          options: [
            'Damit sie schneller antworten',
            'Weil LLMs kein Langzeitgedächtnis haben und Context Windows begrenzt sind',
            'Für bessere Grammatik',
            'Memory ist optional und unwichtig',
          ],
          correct: 1,
          explanation: 'LLMs haben kein persistentes Gedächtnis — jeder Request startet bei Null. Memory-Systeme speichern wichtige Informationen über Sitzungen hinweg.',
        },
      },
      {
        title: 'MCP: Tools für LLMs',
        href: '/tools/mcp-server',
        description: 'Model Context Protocol — so gibst du LLMs Werkzeuge.',
        quiz: {
          question: 'Was ermöglicht das Model Context Protocol (MCP)?',
          options: [
            'Schnelleres Token-Generation',
            'LLMs können standardisiert auf externe Tools und Datenquellen zugreifen',
            'Modelle werden kleiner',
            'Nur Anthropic-Modelle unterstützen es',
          ],
          correct: 1,
          explanation: 'MCP ist ein offener Standard der es LLMs ermöglicht über eine einheitliche Schnittstelle auf Dateisysteme, APIs, Datenbanken und andere Tools zuzugreifen.',
        },
      },
      {
        title: 'Self-Improving Agents',
        href: '/patterns/self-improving-agents',
        description: 'Agents die aus Fehlern lernen und sich selbst verbessern.',
        quiz: {
          question: 'Wie verbessert sich ein Self-Improving Agent?',
          options: [
            'Er trainiert sein LLM neu',
            'Er speichert Fehler und Korrekturen und nutzt sie als Kontext für zukünftige Aufgaben',
            'Er lädt automatisch Updates herunter',
            'Er fragt den Benutzer nie um Hilfe',
          ],
          correct: 1,
          explanation: 'Self-Improving Agents speichern Fehler, Korrekturen und erfolgreiche Strategien und laden diese als zusätzlichen Kontext bei ähnlichen Aufgaben.',
        },
      },
      {
        title: 'n8n AI Workflows',
        href: '/tools/n8n-workflow-bundle',
        description: 'Fertige Workflow-Templates für typische AI-Aufgaben.',
        quiz: {
          question: 'Was ist der Vorteil von n8n gegenüber reinem Python-Code für AI-Workflows?',
          options: [
            'n8n ist immer schneller',
            'Visuelles Design, einfache Integration und keine Deployment-Komplexität',
            'n8n kann mehr als Python',
            'Python kann keine AI-Workflows',
          ],
          correct: 1,
          explanation: 'n8n bietet einen visuellen Workflow-Editor, hunderte vorgefertigte Integrationen und einfaches Deployment — ideal für Business-Automation ohne DevOps-Overhead.',
        },
      },
    ],
  },
  {
    id: 'compliance',
    icon: '\u{2696}\u{FE0F}',
    title: 'Compliance & Recht',
    subtitle: 'EU AI Act, DSGVO, Dokumentation — was Pflicht ist',
    technical: 'Nein',
    duration: '~3h',
    result: 'Compliance sichern',
    stages: [
      {
        title: 'EU AI Act Leitfaden',
        href: '/compliance/eu-ai-act',
        description: 'Der komplette Überblick — verständlich erklärt.',
        quiz: {
          question: 'In welche Kategorien teilt der EU AI Act KI-Systeme ein?',
          options: [
            'Gut und Schlecht',
            'Verboten, Hochrisiko, Begrenztes Risiko, Minimales Risiko',
            'Nur Hochrisiko und Niedrigrisiko',
            'Nach Unternehmensgröße',
          ],
          correct: 1,
          explanation: 'Der EU AI Act nutzt einen risikobasierten Ansatz mit vier Stufen: verbotene Praktiken, Hochrisiko-Systeme, Systeme mit begrenztem Risiko und minimales Risiko.',
        },
      },
      {
        title: 'Art. 4 KI-Kompetenz (gilt seit 02.2025!)',
        href: '/compliance/ki-kompetenz-art4',
        description: 'Was Artikel 4 konkret von dir verlangt.',
        quiz: {
          question: 'Wen betrifft die KI-Kompetenzpflicht nach Art. 4?',
          options: [
            'Nur IT-Unternehmen',
            'Alle Anbieter und Betreiber von KI-Systemen — also praktisch jedes Unternehmen',
            'Nur Unternehmen mit mehr als 250 Mitarbeitern',
            'Nur Unternehmen in Deutschland',
          ],
          correct: 1,
          explanation: 'Artikel 4 gilt für alle Anbieter und Betreiber von KI-Systemen — da quasi jedes Unternehmen KI-Tools nutzt, betrifft es praktisch alle.',
        },
      },
      {
        title: 'Compliance Checkliste',
        href: '/compliance/eu-ai-act-checkliste',
        description: 'Punkt für Punkt prüfen ob du alles erfüllst.',
        quiz: {
          question: 'Was ist der erste Schritt zur EU AI Act Compliance?',
          options: [
            'Sofort alle KI-Systeme abschalten',
            'Eine Bestandsaufnahme aller im Unternehmen genutzten KI-Systeme machen',
            'Einen Anwalt beauftragen',
            'Abwarten bis Strafen kommen',
          ],
          correct: 1,
          explanation: 'Ohne zu wissen welche KI-Systeme im Einsatz sind, kann keine Risikobewertung stattfinden. Die Bestandsaufnahme ist der notwendige erste Schritt.',
        },
      },
      {
        title: 'DSGVO für KI-Systeme',
        href: '/compliance/dsgvo-grundlagen',
        description: 'Datenschutz-Grundverordnung trifft auf KI.',
        quiz: {
          question: 'Welche DSGVO-Pflicht ist bei KI-Systemen besonders relevant?',
          options: [
            'Impressumspflicht',
            'Datenschutz-Folgenabschätzung bei automatisierter Verarbeitung personenbezogener Daten',
            'Newsletter-Abmeldung',
            'Cookie-Banner',
          ],
          correct: 1,
          explanation: 'Bei systematischer, automatisierter Verarbeitung personenbezogener Daten (typisch für KI) ist eine Datenschutz-Folgenabschätzung (DPIA) oft verpflichtend.',
        },
      },
      {
        title: 'Datenschutz-Folgenabschätzung',
        href: '/compliance/dpia',
        description: 'Wann du eine DPIA brauchst und wie du sie erstellst.',
        quiz: {
          question: 'Wann ist eine DPIA (Datenschutz-Folgenabschätzung) Pflicht?',
          options: [
            'Immer wenn man einen Computer benutzt',
            'Wenn eine Verarbeitung voraussichtlich ein hohes Risiko für Betroffene hat',
            'Nur bei Unternehmen über 500 Mitarbeiter',
            'Nie — sie ist freiwillig',
          ],
          correct: 1,
          explanation: 'Eine DPIA ist nach Art. 35 DSGVO Pflicht wenn eine Datenverarbeitung voraussichtlich ein hohes Risiko für die Rechte und Freiheiten natürlicher Personen birgt.',
        },
      },
      {
        title: 'Was VERBOTEN ist',
        href: '/compliance/verbotene-ai-praktiken',
        description: 'Social Scoring, Emotionserkennung am Arbeitsplatz und mehr.',
        quiz: {
          question: 'Welche KI-Praktik ist laut EU AI Act seit Februar 2025 verboten?',
          options: [
            'Chatbots auf Webseiten',
            'Social Scoring und biometrische Echtzeit-Identifizierung in der Öffentlichkeit',
            'Übersetzungssoftware',
            'Automatische E-Mail-Filter',
          ],
          correct: 1,
          explanation: 'Der EU AI Act verbietet unter anderem Social-Scoring-Systeme und die biometrische Echtzeit-Fernidentifizierung im öffentlichen Raum (mit eng definierten Ausnahmen).',
        },
      },
      {
        title: 'Agents rechtlich einordnen',
        href: '/compliance/ai-agent-legal-framework',
        description: 'Wer haftet wenn ein Agent Fehler macht?',
        quiz: {
          question: 'Wer haftet wenn ein AI-Agent einen Fehler macht der Schaden verursacht?',
          options: [
            'Der Agent selbst',
            'Der Betreiber/das Unternehmen das den Agent einsetzt',
            'Der LLM-Hersteller',
            'Niemand — KI-Fehler sind nicht haftbar',
          ],
          correct: 1,
          explanation: 'Nach geltendem Recht haftet der Betreiber. KI-Systeme haben keine Rechtspersönlichkeit — das einsetzende Unternehmen trägt die Verantwortung.',
        },
      },
      {
        title: 'Templates & Checklisten',
        href: '/downloads',
        description: 'Fertige Dokumente zum Herunterladen.',
        quiz: {
          question: 'Welches Dokument sollte jedes Unternehmen das KI einsetzt vorhalten?',
          options: [
            'Nur die AGB',
            'Ein KI-Verzeichnis mit Risikobewertung, Dokumentation der Schulungen und Verantwortlichkeiten',
            'Nur ein Cookie-Banner',
            'Ein LinkedIn-Profil',
          ],
          correct: 1,
          explanation: 'Der EU AI Act verlangt Dokumentation: welche KI-Systeme im Einsatz sind, ihre Risikoklasse, wer verantwortlich ist und dass Mitarbeiter geschult wurden.',
        },
      },
    ],
  },
  {
    id: 'beginner',
    icon: '\u{1F331}',
    title: 'Einsteiger',
    subtitle: 'Komplett neu? Hier startest du — Schritt für Schritt, kein Vorwissen nötig',
    technical: 'Nein',
    duration: '~4h',
    result: 'Grundlagen verstehen',
    stages: [
      {
        title: 'Was ist KI? Einfach erklärt',
        href: '/blog/2026-03-12-was-ist-ein-llm',
        description: 'Keine Fachbegriffe, keine Formeln — nur das Wesentliche.',
        quiz: {
          question: 'Was ist Künstliche Intelligenz im Kern?',
          options: [
            'Ein Roboter der denken kann wie ein Mensch',
            'Software die Muster in Daten erkennt und daraus Vorhersagen trifft',
            'Ein Supercomputer',
            'Das Internet',
          ],
          correct: 1,
          explanation: 'KI-Systeme wie LLMs erkennen Muster in riesigen Datenmengen und nutzen diese Muster um Vorhersagen zu treffen — z.B. welches Wort als nächstes kommt.',
        },
      },
      {
        title: 'Warum lokal?',
        href: '/blog/2026-03-12-warum-lokale-ki-statt-cloud',
        description: 'Warum deine Daten besser bei dir bleiben.',
        quiz: {
          question: 'Was ist ein wichtiger Grund für lokale KI statt Cloud?',
          options: [
            'Lokale KI ist immer schneller',
            'Deine Daten bleiben auf deinem Computer und werden nicht an Dritte gesendet',
            'Lokale KI ist immer kostenlos',
            'Cloud-KI funktioniert nicht',
          ],
          correct: 1,
          explanation: 'Bei lokaler KI verlassen deine Daten nie deinen Computer. Bei Cloud-KI werden sie an Server eines Drittanbieters gesendet — mit allen Datenschutz-Risiken.',
        },
      },
      {
        title: '10 Befehle — mehr brauchst du nicht',
        href: '/blog/2026-03-12-terminal-grundlagen-fuer-ai',
        description: 'Terminal-Grundlagen für absolute Anfänger.',
        quiz: {
          question: 'Was macht der Terminal-Befehl "cd"?',
          options: [
            'Dateien löschen',
            'In ein anderes Verzeichnis wechseln (Change Directory)',
            'Dateien kopieren',
            'Programme installieren',
          ],
          correct: 1,
          explanation: '"cd" steht für "Change Directory" und wechselt das aktuelle Verzeichnis — einer der grundlegendsten Terminal-Befehle.',
        },
      },
      {
        title: 'Dein erstes LLM installieren',
        href: '/blog/2026-03-12-ollama-installieren-schritt-fuer-schritt',
        description: 'Ollama installieren — Schritt für Schritt mit Screenshots.',
        quiz: {
          question: 'Was brauchst du mindestens um ein lokales LLM laufen zu lassen?',
          options: [
            'Einen Supercomputer',
            'Einen normalen PC mit mindestens 8 GB RAM',
            'Eine Internetverbindung die immer an ist',
            'Ein kostenpflichtiges Abo',
          ],
          correct: 1,
          explanation: 'Kleine Modelle (z.B. 3B Parameter) laufen bereits auf normalen PCs mit 8 GB RAM. Für größere Modelle brauchst du mehr RAM oder eine GPU.',
        },
      },
      {
        title: 'Dein erster Chatbot',
        href: '/blog/2026-03-12-open-webui-erster-chatbot',
        description: 'Open WebUI: ChatGPT-Oberfläche für dein lokales Modell.',
        quiz: {
          question: 'Was ist Open WebUI?',
          options: [
            'Ein kostenpflichtiger ChatGPT-Klon',
            'Eine kostenlose Weboberfläche die mit lokalen LLMs wie Ollama zusammenarbeitet',
            'Ein Texteditor',
            'Eine Programmiersprache',
          ],
          correct: 1,
          explanation: 'Open WebUI ist eine kostenlose, Open-Source-Weboberfläche die sich mit Ollama verbindet und eine ChatGPT-ähnliche Erfahrung für lokale Modelle bietet.',
        },
      },
      {
        title: 'Docker verstehen',
        href: '/blog/2026-03-12-docker-grundlagen-fuer-ai',
        description: 'Container, Images, Volumes — einfach erklärt.',
        quiz: {
          question: 'Was ist ein Docker-Container in einfachen Worten?',
          options: [
            'Eine Festplatte',
            'Eine isolierte Umgebung in der ein Programm mit allem was es braucht verpackt ist',
            'Ein Ordner auf deinem Computer',
            'Ein Cloud-Service',
          ],
          correct: 1,
          explanation: 'Ein Docker-Container ist wie eine Box die ein Programm mit allen Abhängigkeiten enthält — es läuft überall gleich, egal auf welchem Computer.',
        },
      },
      {
        title: '30-Tage Quickstart Plan',
        href: '/grundlagen/30-tage-quickstart',
        description: 'Dein Fahrplan für den ersten Monat mit lokaler KI.',
        quiz: {
          question: 'Was ist ein realistisches Ziel für den ersten Monat mit lokaler KI?',
          options: [
            'Ein eigenes KI-Startup gründen',
            'Ollama installiert, erste Chats geführt und einen einfachen Workflow gebaut',
            'GPT-4 nachbauen',
            'Alle Papers auf arXiv gelesen',
          ],
          correct: 1,
          explanation: 'Im ersten Monat geht es um die Grundlagen: lokales LLM zum Laufen bringen, damit experimentieren und einen ersten praktischen Workflow aufsetzen.',
        },
      },
    ],
  },
]

/* ───────────────────────────── Placeholder Comments (S9: clearly marked as examples!) ───────────────────────────── */

const placeholderComments = [
  { name: 'M.K., Wien', text: 'Super erklärt, endlich verstehe ich den Unterschied zwischen Cloud und Lokal!', date: '2026-03-15' },
  { name: 'S.H., München', text: 'Der Compliance-Pfad hat mir 3 Tage Recherche gespart.', date: '2026-03-10' },
  { name: 'A.B., Zürich', text: 'Als Nicht-Techniker genau richtig. Kein Jargon, nur Klartext.', date: '2026-03-08' },
]

/* ───────────────────────────── Scoring ───────────────────────────── */

function recommendPath(answers: Record<number, string>): PathId {
  const scores: Record<PathId, number> = {
    management: 0,
    'it-admin': 0,
    developer: 0,
    compliance: 0,
    beginner: 0,
  }

  const q1 = answers[1]
  if (q1 === 'A') scores.management += 3
  if (q1 === 'B') scores['it-admin'] += 3
  if (q1 === 'C') scores.developer += 3
  if (q1 === 'D') scores.compliance += 3
  if (q1 === 'E') scores.beginner += 3

  const q2 = answers[2]
  if (q2 === 'A') { scores.management += 2; scores.beginner += 1 }
  if (q2 === 'B') { scores['it-admin'] += 2; scores.developer += 1 }
  if (q2 === 'C') { scores.developer += 2; scores['it-admin'] += 1 }
  if (q2 === 'D') { scores.compliance += 2; scores.management += 1 }
  if (q2 === 'E') { scores.beginner += 2 }

  const q3 = answers[3]
  if (q3 === 'A') { scores.management += 1; scores.compliance += 1; scores.beginner += 1 }
  if (q3 === 'B') { scores['it-admin'] += 1; scores.beginner += 1 }
  if (q3 === 'C') { scores['it-admin'] += 2; scores.developer += 1 }
  if (q3 === 'D') { scores.developer += 2 }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  return sorted[0][0] as PathId
}

/* ───────────────────────────── State Hook ───────────────────────────── */

const STORAGE_KEY = 'lernpfad-spiral-state'

function useLernpfadState() {
  const [state, setState] = useState<LernpfadState>({
    completedStages: {},
    quizResults: {},
    feedback: {},
    rating: {},
    comments: [],
    newsletterDismissed: false,
  })
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setState(JSON.parse(stored))
    } catch { /* ignore */ }
    setLoaded(true)
  }, [])

  const persist = useCallback((next: LernpfadState) => {
    setState(next)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch { /* ignore */ }
  }, [])

  const completeStage = useCallback((pathId: string, href: string) => {
    setState(prev => {
      const completed = { ...prev.completedStages }
      const list = completed[pathId] ? [...completed[pathId]] : []
      if (!list.includes(href)) list.push(href)
      completed[pathId] = list
      const next = { ...prev, completedStages: completed }
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch { /* ignore */ }
      return next
    })
  }, [])

  const setQuizResult = useCallback((key: string, passed: boolean) => {
    setState(prev => {
      const next = { ...prev, quizResults: { ...prev.quizResults, [key]: passed } }
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch { /* ignore */ }
      return next
    })
  }, [])

  const setFeedback = useCallback((key: string, value: string) => {
    setState(prev => {
      const next = { ...prev, feedback: { ...prev.feedback, [key]: value } }
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch { /* ignore */ }
      return next
    })
  }, [])

  const setRating = useCallback((pathId: string, value: number) => {
    setState(prev => {
      const next = { ...prev, rating: { ...prev.rating, [pathId]: value } }
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch { /* ignore */ }
      return next
    })
  }, [])

  const addComment = useCallback((name: string, text: string) => {
    setState(prev => {
      const comment = { name, text, date: new Date().toISOString().split('T')[0] }
      const next = { ...prev, comments: [comment, ...prev.comments].slice(0, 5) }
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch { /* ignore */ }
      return next
    })
  }, [])

  const dismissNewsletter = useCallback(() => {
    setState(prev => {
      const next = { ...prev, newsletterDismissed: true }
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch { /* ignore */ }
      return next
    })
  }, [])

  return { state, loaded, completeStage, setQuizResult, setFeedback, setRating, addComment, dismissNewsletter, persist }
}

/* ───────────────────────────── Sub-Components ───────────────────────────── */

function IntroQuizCard({
  question,
  options,
  selected,
  onSelect,
}: {
  question: string
  options: { key: string; label: string }[]
  selected: string | undefined
  onSelect: (key: string) => void
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white">{question}</h3>
      <div className="space-y-2">
        {options.map(opt => (
          <button
            key={opt.key}
            onClick={() => onSelect(opt.key)}
            className={`w-full text-left px-4 py-3 rounded-lg border transition-all text-sm ${
              selected === opt.key
                ? 'border-[#4262FF] bg-[#4262FF]/10 text-white'
                : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600 hover:bg-slate-800'
            }`}
          >
            <span className={`inline-block w-6 font-mono font-bold ${selected === opt.key ? 'text-[#4262FF]' : 'text-slate-500'}`}>
              {opt.key})
            </span>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function MiniQuizWidget({
  quiz,
  quizKey,
  passed,
  onPass,
}: {
  quiz: QuizQuestion
  quizKey: string
  passed: boolean
  onPass: (key: string) => void
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  if (passed) {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 flex items-center gap-2">
        <span className="text-emerald-400 text-lg">&#10003;</span>
        <span className="text-sm text-emerald-300">Quiz bestanden</span>
      </div>
    )
  }

  const handleSubmit = () => {
    if (selected === null) return
    setShowResult(true)
    if (selected === quiz.correct) {
      onPass(quizKey)
    }
  }

  const handleRetry = () => {
    setSelected(null)
    setShowResult(false)
  }

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 space-y-3">
      <p className="text-sm font-semibold text-white flex items-center gap-2">
        <span className="text-[#4262FF]">&#9881;</span> Mini-Quiz
      </p>
      <p className="text-sm text-slate-300">{quiz.question}</p>
      <div className="space-y-2">
        {quiz.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => { if (!showResult) setSelected(i) }}
            disabled={showResult}
            className={`w-full text-left px-3 py-2 rounded-lg border text-sm transition-all ${
              showResult && i === quiz.correct
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                : showResult && i === selected && i !== quiz.correct
                  ? 'border-red-500 bg-red-500/10 text-red-300'
                  : selected === i
                    ? 'border-[#4262FF] bg-[#4262FF]/10 text-white'
                    : 'border-slate-600 bg-slate-800/50 text-slate-400 hover:border-slate-500'
            }`}
          >
            <span className="font-mono mr-2 text-slate-500">{String.fromCharCode(65 + i)})</span>
            {opt}
          </button>
        ))}
      </div>

      {showResult && selected !== quiz.correct && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
          <p className="text-sm text-red-300 mb-1">Leider falsch.</p>
          <p className="text-xs text-slate-400">{quiz.explanation}</p>
          <button
            onClick={handleRetry}
            className="mt-2 text-xs text-[#4262FF] hover:underline"
          >
            Nochmal versuchen
          </button>
        </div>
      )}

      {showResult && selected === quiz.correct && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
          <p className="text-sm text-emerald-300 mb-1">Richtig!</p>
          <p className="text-xs text-slate-400">{quiz.explanation}</p>
        </div>
      )}

      {!showResult && (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="bg-[#4262FF] hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Antwort prüfen
        </button>
      )}
    </div>
  )
}

function FeedbackWidget({
  feedbackKey,
  currentFeedback,
  onFeedback,
}: {
  feedbackKey: string
  currentFeedback: string | undefined
  onFeedback: (key: string, value: string) => void
}) {
  if (currentFeedback) {
    return (
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3 text-center">
        <p className="text-xs text-slate-500">Danke für dein Feedback! {currentFeedback === 'up' ? '\u{1F44D}' : '\u{1F44E}'}</p>
      </div>
    )
  }

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center space-y-2">
      <p className="text-sm text-slate-300">War dieser Abschnitt hilfreich?</p>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => onFeedback(feedbackKey, 'up')}
          className="px-4 py-2 bg-slate-700 hover:bg-emerald-500/20 hover:border-emerald-500/50 border border-slate-600 rounded-lg text-lg transition-colors"
        >
          {'\u{1F44D}'} Ja
        </button>
        <button
          onClick={() => onFeedback(feedbackKey, 'down')}
          className="px-4 py-2 bg-slate-700 hover:bg-red-500/20 hover:border-red-500/50 border border-slate-600 rounded-lg text-lg transition-colors"
        >
          {'\u{1F44E}'} Nein
        </button>
      </div>
      <p className="text-xs text-slate-600">Dein Feedback hilft uns den Lernpfad zu verbessern</p>
    </div>
  )
}

function MilestoneCard({ percent, pathName, pathId, state, onRating, onAddComment, onDismissNewsletter }: {
  percent: number
  pathName: string
  pathId: string
  state: LernpfadState
  onRating: (pathId: string, value: number) => void
  onAddComment: (name: string, text: string) => void
  onDismissNewsletter: () => void
}) {
  const [commentName, setCommentName] = useState('')
  const [commentText, setCommentText] = useState('')
  const [commentSubmitted, setCommentSubmitted] = useState(false)

  const shareTextTwitter = `Ich lerne gerade lokale KI auf wiki.ai-engineering.at — ${percent}% im ${pathName}! #AIEngineering #LocalAI`
  const shareTextLinkedIn = `Ich arbeite mich gerade durch den ${pathName}-Lernpfad auf wiki.ai-engineering.at. ${percent}% geschafft! Lokale KI ist die Zukunft für Datenschutz-bewusste Unternehmen.`

  if (percent === 25) {
    return (
      <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-xl p-5 text-center space-y-2">
        <div className="text-2xl">{'\u{1F680}'}</div>
        <h4 className="text-lg font-bold text-white">Guter Start!</h4>
        <p className="text-sm text-slate-400">Du verstehst jetzt die Grundlagen. Weiter so!</p>
      </div>
    )
  }

  if (percent === 50) {
    return (
      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-5 text-center space-y-3">
        <div className="text-2xl">{'\u{1F3AF}'}</div>
        <h4 className="text-lg font-bold text-white">Halbzeit!</h4>
        <p className="text-sm text-slate-400">Teile deinen Fortschritt:</p>
        <div className="flex justify-center gap-3">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTextTwitter)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm text-white transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            Auf X teilen
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://wiki.ai-engineering.at/lernpfad')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm text-white transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>
            Auf LinkedIn teilen
          </a>
        </div>
        <a
          href="https://github.com/AI-Engineerings-at/wiki"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-400 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          Wiki auf GitHub
        </a>
      </div>
    )
  }

  if (percent === 75) {
    return (
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-5 space-y-4">
        <div className="text-center">
          <div className="text-2xl">{'\u{1F4AC}'}</div>
          <h4 className="text-lg font-bold text-white mt-1">Fast geschafft!</h4>
          <p className="text-sm text-slate-400">Hinterlasse einen Kommentar für andere Lerner:</p>
        </div>
        {!commentSubmitted ? (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Dein Name (optional)"
              value={commentName}
              onChange={e => setCommentName(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4262FF]"
            />
            <textarea
              placeholder="Was hat dir am Lernpfad gefallen? Was können wir verbessern?"
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              rows={3}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4262FF] resize-none"
            />
            <button
              onClick={() => {
                if (commentText.trim()) {
                  onAddComment(commentName.trim() || 'Anonym', commentText.trim())
                  setCommentSubmitted(true)
                }
              }}
              disabled={!commentText.trim()}
              className="bg-[#4262FF] hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Kommentar senden
            </button>
          </div>
        ) : (
          <p className="text-sm text-emerald-400 text-center">Danke für deinen Kommentar!</p>
        )}
      </div>
    )
  }

  if (percent === 100) {
    const currentRating = state.rating[pathId] || 0

    return (
      <div className="text-center p-6 bg-slate-900 rounded-xl border border-green-500/20 space-y-5">
        <div className="text-4xl">{'\u{1F389}'}</div>
        <h3 className="text-xl font-bold text-white mb-2">Alle Stages abgeschlossen!</h3>
        <p className="text-slate-400 mb-4">Du hast die Grundlagen fuer deinen lokalen AI-Stack drauf.</p>

        {/* Star Rating */}
        <div className="space-y-2 pt-2">
          <p className="text-sm text-slate-300">Bewerte diesen Lernpfad:</p>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                onClick={() => onRating(pathId, star)}
                className={`text-2xl transition-colors ${
                  star <= currentRating ? 'text-amber-400' : 'text-slate-600 hover:text-amber-400/50'
                }`}
              >
                {'\u{2605}'}
              </button>
            ))}
          </div>
          {currentRating > 0 && (
            <p className="text-xs text-slate-500">Danke fuer deine Bewertung!</p>
          )}
        </div>

        {/* GitHub Star */}
        <a
          href="https://github.com/AI-Engineerings-at/wiki"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm text-white transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          Wiki auf GitHub {'\u{2B50}'}
        </a>

        <p className="text-slate-500 text-sm">Weiterlesen:</p>
        <div className="flex flex-wrap justify-center gap-3 mt-3">
          <a href="/patterns/agent-orchestration-patterns" className="text-blue-400 hover:text-blue-300 text-sm">Agent Orchestration</a>
          <a href="/security/self-hosted-sicherheit" className="text-blue-400 hover:text-blue-300 text-sm">Security Hardening</a>
          <a href="/compliance/eu-ai-act" className="text-blue-400 hover:text-blue-300 text-sm">EU AI Act</a>
        </div>
        <p className="mt-4 italic text-slate-700 text-xs">
          Fuer die Umsetzung gibt es <a href="https://www.ai-engineering.at" className="underline" target="_blank" rel="noopener noreferrer">Ressourcen</a> auf ai-engineering.at.
        </p>
      </div>
    )
  }

  return null
}

function CommentSection({ comments, state }: {
  comments: { name: string; text: string; date: string }[]
  state: LernpfadState
}) {
  const userComments = state.comments || []
  const allComments = [...userComments, ...comments].slice(0, 5)

  if (allComments.length === 0) return null

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-slate-300">Was andere Lerner sagen:</p>
      <p className="text-xs text-slate-600 italic">
        Hinweis: Die folgenden Kommentare ohne Datum sind Beispiele zur Veranschaulichung, keine echten Nutzerbewertungen.
      </p>
      {allComments.map((c, i) => (
        <div key={i} className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3">
          <p className="text-sm text-slate-300 italic">&quot;{c.text}&quot;</p>
          <p className="text-xs text-slate-500 mt-1">— {c.name}{c.date && !c.date.startsWith('2026-03-0') && !c.date.startsWith('2026-03-1') ? '' : ''}</p>
        </div>
      ))}
    </div>
  )
}

/* ───────────────────────────── Stage Timeline Component ───────────────────────────── */

function StageTimeline({
  path,
  state,
  onCompleteStage,
  onQuizPass,
  onFeedback,
  onRating,
  onAddComment,
  onDismissNewsletter,
}: {
  path: PathInfo
  state: LernpfadState
  onCompleteStage: (pathId: string, href: string) => void
  onQuizPass: (key: string) => void
  onFeedback: (key: string, value: string) => void
  onRating: (pathId: string, value: number) => void
  onAddComment: (name: string, text: string) => void
  onDismissNewsletter: () => void
}) {
  const completedList = state.completedStages[path.id] || []
  const completedCount = completedList.length
  const totalStages = path.stages.length
  const progressPercent = totalStages > 0 ? Math.round((completedCount / totalStages) * 100) : 0

  // Determine milestone thresholds
  const milestones = [25, 50, 75, 100]
  const passedMilestones = milestones.filter(m => progressPercent >= m)

  // Find the current stage (first non-completed)
  const currentStageIndex = path.stages.findIndex(s => !completedList.includes(s.href))

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">Fortschritt</span>
          <span className="text-sm font-semibold text-white">{completedCount}/{totalStages} Stages</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#4262FF] to-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between">
          {milestones.map(m => (
            <span key={m} className={`text-xs ${progressPercent >= m ? 'text-[#4262FF]' : 'text-slate-600'}`}>
              {m}%
            </span>
          ))}
        </div>
      </div>

      {/* Stage Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-slate-800" />

        <div className="space-y-0">
          {path.stages.map((stage, index) => {
            const isCompleted = completedList.includes(stage.href)
            const quizKey = `${path.id}:${index}`
            const quizPassed = state.quizResults[quizKey] === true
            const isCurrent = index === currentStageIndex
            const isLocked = !isCompleted && !isCurrent
            const stageNumber = index + 1

            // Check if we should show feedback after this stage (every 2nd stage)
            const showFeedback = (index + 1) % 2 === 0 && isCompleted

            // Check if milestone should appear after this stage
            const stagesForMilestone = (percent: number) => Math.ceil((percent / 100) * totalStages)
            const milestoneAfterThis = milestones.find(m => stagesForMilestone(m) === index + 1 && passedMilestones.includes(m))

            return (
              <div key={stage.href}>
                {/* Stage */}
                <div className={`relative pl-10 py-3 ${isLocked ? 'opacity-50' : ''}`}>
                  {/* Node */}
                  <div className={`absolute left-[7px] w-[17px] h-[17px] rounded-full border-2 flex items-center justify-center z-10 ${
                    isCompleted
                      ? 'bg-[#4262FF] border-[#4262FF]'
                      : isCurrent
                        ? 'bg-slate-900 border-[#4262FF] ring-2 ring-[#4262FF]/30'
                        : 'bg-slate-900 border-slate-700'
                  }`}>
                    {isCompleted && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {isLocked && (
                      <span className="text-[8px] text-slate-600">{'\u{1F512}'}</span>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`rounded-xl border transition-all ${
                    isCurrent
                      ? 'border-[#4262FF]/50 bg-slate-900'
                      : isCompleted
                        ? 'border-slate-800 bg-slate-900/50'
                        : 'border-slate-800/50 bg-slate-900/30'
                  }`}>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-600 font-mono">Stage {stageNumber}</span>
                            {isCompleted && <span className="text-xs text-emerald-400">abgeschlossen</span>}
                            {isCurrent && <span className="text-xs text-[#4262FF] font-medium">aktuell</span>}
                            {isLocked && <span className="text-xs text-slate-600">gesperrt</span>}
                          </div>
                          <h4 className={`text-sm font-semibold mt-1 ${isCompleted ? 'text-slate-400' : 'text-white'}`}>
                            {stage.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-0.5">{stage.description}</p>
                        </div>
                      </div>

                      {/* Expanded content for current stage */}
                      {isCurrent && (
                        <div className="mt-4 space-y-4">
                          {/* Article Link */}
                          <Link
                            href={stage.href}
                            className="flex items-center gap-2 bg-[#4262FF]/10 border border-[#4262FF]/30 rounded-lg px-4 py-3 text-sm text-[#4262FF] hover:bg-[#4262FF]/20 transition-colors"
                          >
                            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            Artikel lesen: {stage.title}
                          </Link>

                          {/* Mini Quiz */}
                          <MiniQuizWidget
                            quiz={stage.quiz}
                            quizKey={quizKey}
                            passed={quizPassed}
                            onPass={onQuizPass}
                          />

                          {/* Complete Stage Button */}
                          {quizPassed && !isCompleted && (
                            <button
                              onClick={() => onCompleteStage(path.id, stage.href)}
                              className="w-full bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 text-sm font-medium px-4 py-3 rounded-lg transition-colors"
                            >
                              Stage abschließen &#10003;
                            </button>
                          )}
                        </div>
                      )}

                      {/* Collapsed completed stage - show article link */}
                      {isCompleted && (
                        <div className="mt-2">
                          <Link
                            href={stage.href}
                            className="text-xs text-slate-500 hover:text-[#4262FF] transition-colors"
                          >
                            Artikel nochmal lesen &rarr;
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Feedback widget after every 2nd completed stage */}
                {showFeedback && (
                  <div className="pl-10 py-2">
                    <FeedbackWidget
                      feedbackKey={`${path.id}:feedback:${index}`}
                      currentFeedback={state.feedback[`${path.id}:feedback:${index}`]}
                      onFeedback={onFeedback}
                    />
                  </div>
                )}

                {/* Milestone */}
                {milestoneAfterThis && (
                  <div className="pl-10 py-2">
                    <MilestoneCard
                      percent={milestoneAfterThis}
                      pathName={path.title}
                      pathId={path.id}
                      state={state}
                      onRating={onRating}
                      onAddComment={onAddComment}
                      onDismissNewsletter={onDismissNewsletter}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Comments Section */}
      {completedCount >= Math.ceil(totalStages * 0.75) && (
        <CommentSection comments={placeholderComments} state={state} />
      )}
    </div>
  )
}

/* ───────────────────────────── Path Selector Card ───────────────────────────── */

function PathSelectorCard({
  path,
  isRecommended,
  isSelected,
  onSelect,
  completedCount,
}: {
  path: PathInfo
  isRecommended: boolean
  isSelected: boolean
  onSelect: () => void
  completedCount: number
}) {
  const percent = path.stages.length > 0 ? Math.round((completedCount / path.stages.length) * 100) : 0

  return (
    <button
      onClick={onSelect}
      className={`w-full text-left rounded-xl border transition-all p-4 ${
        isSelected
          ? 'border-[#4262FF] bg-[#4262FF]/5 ring-1 ring-[#4262FF]/30'
          : isRecommended
            ? 'border-[#4262FF]/50 bg-slate-900 hover:bg-slate-800/80'
            : 'border-slate-800 bg-slate-900 hover:bg-slate-800/80'
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-xl shrink-0 mt-0.5">{path.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-white">{path.title}</h3>
            {isRecommended && (
              <span className="text-[10px] bg-[#4262FF] text-white px-1.5 py-0.5 rounded font-medium">
                Empfohlen
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{path.subtitle}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-slate-600">{path.duration}</span>
            <span className="text-xs text-slate-700">&middot;</span>
            <span className="text-xs text-slate-600">{path.stages.length} Stages</span>
            {completedCount > 0 && (
              <>
                <span className="text-xs text-slate-700">&middot;</span>
                <span className="text-xs text-[#4262FF]">{percent}%</span>
              </>
            )}
          </div>
          {completedCount > 0 && (
            <div className="mt-1.5 h-1 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#4262FF] rounded-full transition-all"
                style={{ width: `${percent}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </button>
  )
}

/* ───────────────────────────── Main Page ───────────────────────────── */

export default function LernpfadPage() {
  // Intro quiz state
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [currentQ, setCurrentQ] = useState(0)
  const [recommended, setRecommended] = useState<PathId | null>(null)

  // Path selection
  const [selectedPath, setSelectedPath] = useState<PathId | null>(null)
  const [showAllPaths, setShowAllPaths] = useState(false)

  // Spiral state
  const {
    state, loaded,
    completeStage, setQuizResult, setFeedback, setRating, addComment, dismissNewsletter,
  } = useLernpfadState()

  const handleIntroSelect = (qId: number, key: string) => {
    const next = { ...answers, [qId]: key }
    setAnswers(next)
    setTimeout(() => {
      if (currentQ < introQuestions.length - 1) {
        setCurrentQ(currentQ + 1)
      } else {
        const rec = recommendPath(next)
        setRecommended(rec)
        setSelectedPath(rec)
      }
    }, 300)
  }

  const resetQuiz = () => {
    setAnswers({})
    setCurrentQ(0)
    setRecommended(null)
    setSelectedPath(null)
  }

  const activePath = selectedPath ? paths.find(p => p.id === selectedPath) : null

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-500 text-sm">Lade Lernpfad...</div>
      </div>
    )
  }

  return (
    <div className="space-y-10 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <p className="text-sm text-[#4262FF] font-semibold uppercase tracking-wide mb-2">
          Lernpfad
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Dein Weg in die lokale KI
        </h1>
        <p className="text-lg text-slate-400 mt-3 max-w-xl mx-auto">
          {!recommended
            ? '3 Fragen — dann zeigen wir dir genau die Artikel die DU brauchst. Kein Raten, kein Umherirren.'
            : 'Arbeite dich Stage für Stage durch deinen persönlichen Lernpfad. Artikel lesen, Quiz bestehen, weiterkommen.'}
        </p>
      </div>

      <figure className="my-8">
        <img src="/images/generated/hero-lernpfad-v2.png" alt="Dein KI-Lernpfad" className="rounded-xl border border-white/10 w-full" />
        <figcaption className="text-center text-white/40 text-sm mt-2">Dein KI-Lernpfad</figcaption>
      </figure>

      {/* Intro Quiz */}
      {!recommended && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            {introQuestions.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i < currentQ
                    ? 'bg-[#4262FF]'
                    : i === currentQ
                      ? 'bg-[#4262FF]/50'
                      : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-slate-500">
            Frage {currentQ + 1} von {introQuestions.length}
          </p>
          <IntroQuizCard
            question={introQuestions[currentQ].question}
            options={introQuestions[currentQ].options}
            selected={answers[introQuestions[currentQ].id]}
            onSelect={key => handleIntroSelect(introQuestions[currentQ].id, key)}
          />
        </div>
      )}

      {/* After quiz: recommendation + path selector + stage timeline */}
      {recommended && (
        <>
          {/* Recommendation Banner */}
          <div className="bg-gradient-to-r from-[#4262FF]/10 to-blue-600/5 border border-[#4262FF]/40 rounded-xl p-5 text-center">
            <p className="text-sm text-[#4262FF] font-semibold mb-1">Dein empfohlener Pfad</p>
            <p className="text-xl font-bold text-white">
              {paths.find(p => p.id === recommended)?.icon} {paths.find(p => p.id === recommended)?.title}
            </p>
            <button
              onClick={resetQuiz}
              className="text-xs text-slate-500 hover:text-slate-400 mt-2 underline"
            >
              Quiz wiederholen
            </button>
          </div>

          {/* Path Selector */}
          <div>
            <button
              onClick={() => setShowAllPaths(!showAllPaths)}
              className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors mb-3"
            >
              <span className={`transition-transform text-xs ${showAllPaths ? 'rotate-180' : ''}`}>&#9660;</span>
              {showAllPaths ? 'Pfade ausblenden' : 'Alle 5 Pfade anzeigen'}
            </button>

            {showAllPaths && (
              <div className="grid gap-2">
                {paths.map(p => (
                  <PathSelectorCard
                    key={p.id}
                    path={p}
                    isRecommended={p.id === recommended}
                    isSelected={p.id === selectedPath}
                    onSelect={() => setSelectedPath(p.id)}
                    completedCount={(state.completedStages[p.id] || []).length}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Comparison Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800">
              <h2 className="text-sm font-semibold text-white">Alle 5 Pfade im Vergleich</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-slate-400 uppercase tracking-wide">
                    <th className="p-2 pl-4 font-medium"></th>
                    <th className="p-2 font-medium">{'\u{1F3E2}'} GF</th>
                    <th className="p-2 font-medium">{'\u{1F6E0}\u{FE0F}'} IT</th>
                    <th className="p-2 font-medium">{'\u{1F4BB}'} Dev</th>
                    <th className="p-2 font-medium">{'\u{2696}\u{FE0F}'} Compl.</th>
                    <th className="p-2 pr-4 font-medium">{'\u{1F331}'} Einst.</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-t border-slate-800">
                    <td className="p-2 pl-4 text-slate-400 font-medium">Technisch?</td>
                    <td className="p-2">Nein</td>
                    <td className="p-2">Mittel</td>
                    <td className="p-2">Hoch</td>
                    <td className="p-2">Nein</td>
                    <td className="p-2 pr-4">Nein</td>
                  </tr>
                  <tr className="border-t border-slate-800">
                    <td className="p-2 pl-4 text-slate-400 font-medium">Dauer</td>
                    <td className="p-2">~2h</td>
                    <td className="p-2">~4h</td>
                    <td className="p-2">~6h</td>
                    <td className="p-2">~3h</td>
                    <td className="p-2 pr-4">~4h</td>
                  </tr>
                  <tr className="border-t border-slate-800">
                    <td className="p-2 pl-4 text-slate-400 font-medium">Stages</td>
                    <td className="p-2">6</td>
                    <td className="p-2">7</td>
                    <td className="p-2">8</td>
                    <td className="p-2">8</td>
                    <td className="p-2 pr-4">7</td>
                  </tr>
                  <tr className="border-t border-slate-800">
                    <td className="p-2 pl-4 text-slate-400 font-medium">Ergebnis</td>
                    <td className="p-2">Entscheidungen</td>
                    <td className="p-2">Stack betreiben</td>
                    <td className="p-2">Apps bauen</td>
                    <td className="p-2">Compliance</td>
                    <td className="p-2 pr-4">Grundlagen</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Active Path: Stage Timeline */}
          {activePath && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl">{activePath.icon}</span>
                <div>
                  <h2 className="text-lg font-bold text-white">{activePath.title}</h2>
                  <p className="text-xs text-slate-500">{activePath.duration} &middot; {activePath.stages.length} Stages &middot; Technisch: {activePath.technical}</p>
                </div>
              </div>

              <StageTimeline
                path={activePath}
                state={state}
                onCompleteStage={completeStage}
                onQuizPass={(key) => setQuizResult(key, true)}
                onFeedback={setFeedback}
                onRating={setRating}
                onAddComment={addComment}
                onDismissNewsletter={dismissNewsletter}
              />
            </div>
          )}
        </>
      )}

      {/* Next steps */}
      <section className="text-center py-8">
        <h2 className="text-2xl font-bold text-white mb-3">Und jetzt?</h2>
        <p className="text-slate-400 max-w-lg mx-auto mb-6">
          Du hast das Fundament. Jetzt geht es an die Vertiefung — Patterns, Security, Compliance.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/patterns/" className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">Patterns entdecken</a>
          <a href="/security/" className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">Security vertiefen</a>
        </div>
        <p className="mt-6 italic text-slate-700 text-xs">
          Fuer die Umsetzung gibt es <a href="https://www.ai-engineering.at" className="underline" target="_blank" rel="noopener noreferrer">Ressourcen</a> auf ai-engineering.at.
        </p>
      </section>
    </div>
  )
}
