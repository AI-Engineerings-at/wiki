/**
 * Central article registry for the wiki.
 * Used by Homepage (recent/popular), Sidebar, Breadcrumbs, Related Articles.
 */

export type Article = {
  title: string
  description: string
  href: string
  category: string
  categoryLabel: string
  date: string
  popular?: boolean
}

export type Category = {
  slug: string
  label: string
  description: string
  icon: string
  href: string
  articles: Article[]
}

const grundlagenArticles: Article[] = [
  { title: 'Was ist Agent Orchestration?', description: 'Einfuehrung in Agent Orchestration und Multi-Agent Systeme.', href: '/grundlagen/was-ist-agent-orchestration', category: 'grundlagen', categoryLabel: 'Grundlagen', date: '2026-03-01', popular: true },
  { title: 'Multi-Agent Systeme erklaert', description: 'Wie mehrere AI-Agenten zusammenarbeiten und warum das besser ist als ein einzelnes LLM.', href: '/grundlagen/multi-agent-systeme', category: 'grundlagen', categoryLabel: 'Grundlagen', date: '2026-03-01' },
  { title: 'Agent Rollen & Verantwortung', description: 'Developer, QA, Infra, Browser — welche Rollen braucht ein Agent-Team?', href: '/grundlagen/agent-rollen', category: 'grundlagen', categoryLabel: 'Grundlagen', date: '2026-03-01' },
  { title: 'Lokale AI vs. Cloud: Der TCO-Vergleich', description: 'Was kostet Self-Hosted AI wirklich? Hardware, Strom, Wartung vs. API-Kosten.', href: '/grundlagen/lokal-vs-cloud', category: 'grundlagen', categoryLabel: 'Grundlagen', date: '2026-03-01', popular: true },
  { title: 'Ollama vs Cloud LLM: Vergleich', description: 'Wann lokal, wann Cloud? Qualitaet, Kosten, Datenschutz.', href: '/grundlagen/ollama-vs-cloud', category: 'grundlagen', categoryLabel: 'Grundlagen', date: '2026-03-01' },
  { title: 'AI Agent Team aufbauen', description: 'Arten von Agenten, Team-Struktur, Tools-Integration.', href: '/grundlagen/ai-agent-team', category: 'grundlagen', categoryLabel: 'Grundlagen', date: '2026-03-01' },
  { title: 'Self-hosted vs Cloud Services', description: 'Welche Services selbst hosten, welche in die Cloud?', href: '/grundlagen/selfhosted-vs-cloud', category: 'grundlagen', categoryLabel: 'Grundlagen', date: '2026-03-01' },
  { title: '30-Tage Quickstart Guide', description: 'In 30 Tagen zum eigenen AI-Stack. Tag-fuer-Tag Anleitung.', href: '/grundlagen/30-tage-quickstart', category: 'grundlagen', categoryLabel: 'Grundlagen', date: '2026-03-01' },
  { title: 'AI im Unternehmen', description: 'Warum Unternehmen lokale AI einsetzen: Datenschutz, Kostenkontrolle, Souveraenitaet.', href: '/grundlagen/ki-unternehmen', category: 'grundlagen', categoryLabel: 'Grundlagen', date: '2026-03-01' },
  { title: 'Was ist ein LLM?', description: 'Was ist ein Large Language Model? Transformer, Tokens, Modellgroessen, VRAM und Halluzinationen erklaert.', href: '/grundlagen/was-ist-ein-llm', category: 'grundlagen', categoryLabel: 'Grundlagen', date: '2026-03-21', popular: true },
]

const complianceArticles: Article[] = [
  { title: 'DSGVO Grundlagen', description: 'Was bedeutet DSGVO fuer AI-Anwendungen — Datenschutz, Einwilligung, Loeschfristen.', href: '/compliance/dsgvo-grundlagen', category: 'compliance', categoryLabel: 'Compliance', date: '2026-02-28', popular: true },
  { title: 'EU AI Act', description: 'Risikoklassen, Verbote, Transparenzpflichten fuer AI-Systeme in der EU.', href: '/compliance/eu-ai-act', category: 'compliance', categoryLabel: 'Compliance', date: '2026-02-28', popular: true },
  { title: 'KI-Kompetenz nach Art. 4', description: 'KI-Kompetenz Pflicht: Wer ist betroffen, was muss geschult werden, Deadline 02.08.2026.', href: '/compliance/ki-kompetenz-art4', category: 'compliance', categoryLabel: 'Compliance', date: '2026-03-21' },
  { title: 'EU AI Act Checkliste', description: '7-Schritte Leitfaden zur EU AI Act Bereitschaft. Risikoklassen, Termine, Pflichten.', href: '/compliance/eu-ai-act-checkliste', category: 'compliance', categoryLabel: 'Compliance', date: '2026-03-01' },
  { title: 'Verbotene AI-Praktiken', description: 'Article 5 - Was seit Feb 2025 verboten ist. Social Scoring, Emotion Recognition.', href: '/compliance/verbotene-ai-praktiken', category: 'compliance', categoryLabel: 'Compliance', date: '2026-03-01' },
  { title: 'Chatbot Transparenzpflichten', description: 'Kennzeichnungspflichten fuer Chatbots und KI-generierte Inhalte.', href: '/compliance/chatbot-transparenzpflichten', category: 'compliance', categoryLabel: 'Compliance', date: '2026-03-01' },
  { title: 'Datenschutz-Folgenabschaetzung (DPIA)', description: 'Wann ist eine DPIA Pflicht, wie fuehrt man sie durch, DPIA und EU AI Act.', href: '/compliance/dpia', category: 'compliance', categoryLabel: 'Compliance', date: '2026-03-21' },
  { title: 'Datenschutz Praxis', description: 'Praktische Umsetzung — TOM, AVV, Dokumentation, Betroffenenrechte.', href: '/compliance/datenschutz-praxis', category: 'compliance', categoryLabel: 'Compliance', date: '2026-02-28' },
  { title: 'AI Agent Legal Framework', description: 'Von der Risikobewertung bis zum Compliance-Paket: EU AI Act + DSGVO fuer AI-Agenten in KMUs.', href: '/compliance/ai-agent-legal-framework', category: 'compliance', categoryLabel: 'Compliance', date: '2026-03-21', popular: true },
]

const toolsArticles: Article[] = [
  { title: 'Docker Compose vs Docker Swarm', description: 'Welches fuer AI-Workloads? Vergleich, Use Cases, Entscheidungshilfe.', href: '/tools/docker-vs-swarm', category: 'tools', categoryLabel: 'Tools', date: '2026-03-01' },
  { title: 'Docker Grundlagen', description: 'Container vs VMs, Docker Compose, Docker Swarm, GPU-Zugriff — alles was du fuer AI-Workloads brauchst.', href: '/tools/docker-grundlagen', category: 'tools', categoryLabel: 'Tools', date: '2026-03-21', popular: true },
  { title: 'AI Stack Setup in 30 Minuten', description: 'Ollama + Open WebUI + Docker: Dein eigener ChatGPT-Klon in 30 Minuten, lokal auf deiner Hardware.', href: '/tools/ai-stack-setup', category: 'tools', categoryLabel: 'Tools', date: '2026-03-21', popular: true },
  { title: 'Ollama: Lokale LLMs einfach gemacht', description: 'Installation, Modelle, GPU-Setup, REST API, Open WebUI Integration.', href: '/tools/ollama-tutorial', category: 'tools', categoryLabel: 'Tools', date: '2026-03-01', popular: true },
  { title: 'RAG Complete Guide', description: 'Retrieval Augmented Generation: Vector Databases, Embeddings, Hybrid Search.', href: '/tools/rag-guide', category: 'tools', categoryLabel: 'Tools', date: '2026-03-01' },
  { title: 'n8n: Workflow-Automatisierung', description: 'Grundlagen, Nodes, Workflow-Beispiele, AI-Integration.', href: '/tools/n8n-fuer-anfaenger', category: 'tools', categoryLabel: 'Tools', date: '2026-03-01' },
  { title: 'Mattermost: Agent-Kommunikation', description: 'Polling, Webhooks, Nachrichten-Format, Team-Kommunikation.', href: '/tools/mattermost-agent', category: 'tools', categoryLabel: 'Tools', date: '2026-03-01' },
  { title: 'Grafana: Monitoring fuer Homelab', description: 'Prometheus, Dashboards, Alerting, Container-Metriken.', href: '/tools/grafana-monitoring', category: 'tools', categoryLabel: 'Tools', date: '2026-03-01' },
  { title: 'Proxmox: Homelab Virtualisierung', description: 'Installation, VMs, LXC, GPU-Passthrough, Backup-Strategie.', href: '/tools/proxmox-setup', category: 'tools', categoryLabel: 'Tools', date: '2026-03-01' },
  { title: 'Model Selection Guide', description: 'Waehle das richtige AI-Modell fuer deinen Anwendungsfall — von Llama bis Mistral.', href: '/tools/model-selection', category: 'tools', categoryLabel: 'Tools', date: '2026-03-01' },
  { title: 'MCP Server Setup', description: 'Model Context Protocol Server fuer AI-Integrationen aufsetzen.', href: '/tools/mcp-server', category: 'tools', categoryLabel: 'Tools', date: '2026-03-01' },
]

const patternsArticles: Article[] = [
  { title: 'Agent Orchestration Patterns', description: 'Uebersicht ueber bewaehrte Orchestration-Patterns fuer Multi-Agent Systeme.', href: '/patterns/agent-orchestration-patterns', category: 'patterns', categoryLabel: 'Patterns', date: '2026-02-28' },
  { title: 'Memory Management Pattern', description: 'Wie AI-Agenten persistentes Wissen speichern und abrufen — CLAUDE.md, Topic Files, Knowledge Graphs.', href: '/patterns/memory-management', category: 'patterns', categoryLabel: 'Patterns', date: '2026-03-01' },
  { title: 'Task Delegation Pattern', description: 'Orchestrator verteilt Tasks an spezialisierte Agenten — Routing, Prioritaeten, Deadlines.', href: '/patterns/task-delegation', category: 'patterns', categoryLabel: 'Patterns', date: '2026-03-01' },
  { title: 'Safety Hooks Pattern', description: 'Guardrails, Output-Validierung und Memory-Capture als automatische Sicherheitsschicht.', href: '/patterns/safety-hooks', category: 'patterns', categoryLabel: 'Patterns', date: '2026-03-01' },
  { title: 'Heartbeat & Monitoring Pattern', description: 'Wie du erkennst, ob Agenten laufen — Health Checks, Status-Updates, Alerting.', href: '/patterns/heartbeat-monitoring', category: 'patterns', categoryLabel: 'Patterns', date: '2026-03-01' },
  { title: 'AI Agent als digitaler Mitarbeiter', description: 'Agent-Onboarding: Credential-Isolation, Network Policy, Skill-System und EU AI Act Kennzeichnung.', href: '/patterns/ai-agent-digitaler-mitarbeiter', category: 'patterns', categoryLabel: 'Patterns', date: '2026-03-21', popular: true },
  { title: 'Self-Improving Agents', description: '3-Tier Memory, corrections.md, Pre-Action Gates und Self-Eskalation — das NemoClaw Pattern.', href: '/patterns/self-improving-agents', category: 'patterns', categoryLabel: 'Patterns', date: '2026-03-21' },
]

const securityArticles: Article[] = [
  { title: 'Self-Hosted Sicherheit', description: '6-Layer Security Modell: Netzwerk, SSH, Firewall, Container, Anwendung, Monitoring fuer lokale AI.', href: '/security/self-hosted-sicherheit', category: 'security', categoryLabel: 'Security', date: '2026-03-21', popular: true },
  { title: 'Verschluesselung', description: 'Encryption At Rest, In Transit, In Use — LUKS, TLS, Confidential Computing fuer Self-Hosted AI.', href: '/security/verschluesselung', category: 'security', categoryLabel: 'Security', date: '2026-03-21' },
  { title: 'API Keys sicher speichern', description: 'Vault, Environment Variables, Secrets Management fuer AI-Stack.', href: '/security/api-keys-sicher', category: 'security', categoryLabel: 'Security', date: '2026-02-28' },
  { title: 'Firewall Setup', description: 'UFW, fail2ban, Netzwerk-Segmentation fuer lokale AI-Infrastruktur.', href: '/security/firewall-setup', category: 'security', categoryLabel: 'Security', date: '2026-02-28' },
  { title: 'Backup Strategie', description: '3-2-1 Regel, automatisierte Backups fuer Ollama, n8n, PostgreSQL.', href: '/security/backup-strategie', category: 'security', categoryLabel: 'Security', date: '2026-02-28' },
]

export const categories: Category[] = [
  {
    slug: 'grundlagen',
    label: 'Grundlagen',
    description: 'Was ist KI, LLMs, Lokal vs Cloud, Agent-Teams',
    icon: '\u{1F527}',
    href: '/grundlagen',
    articles: grundlagenArticles,
  },
  {
    slug: 'compliance',
    label: 'Compliance',
    description: 'DSGVO, EU AI Act, Art. 4, Transparenzpflichten',
    icon: '\u{1F6E1}',
    href: '/compliance',
    articles: complianceArticles,
  },
  {
    slug: 'tools',
    label: 'Tools',
    description: 'Ollama, n8n, Docker, Grafana, Proxmox, RAG',
    icon: '\u{2699}',
    href: '/tools',
    articles: toolsArticles,
  },
  {
    slug: 'patterns',
    label: 'Patterns',
    description: 'Agent Orchestration, RAG, Memory, Workflows',
    icon: '\u{1F504}',
    href: '/patterns',
    articles: patternsArticles,
  },
  {
    slug: 'security',
    label: 'Security',
    description: 'Datensicherheit, Firewall, Backup, API Keys',
    icon: '\u{1F512}',
    href: '/security',
    articles: securityArticles,
  },
]

export function getAllArticles(): Article[] {
  return categories.flatMap((c) => c.articles)
}

export function getRecentArticles(count: number = 5): Article[] {
  return getAllArticles()
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, count)
}

export function getPopularArticles(count: number = 5): Article[] {
  return getAllArticles()
    .filter((a) => a.popular)
    .slice(0, count)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getArticleByHref(href: string): Article | undefined {
  return getAllArticles().find((a) => a.href === href)
}

/**
 * Hardcoded related articles map.
 * Key = article href, Value = array of related article hrefs.
 */
export const relatedArticlesMap: Record<string, string[]> = {
  // Grundlagen
  '/grundlagen/was-ist-agent-orchestration': ['/grundlagen/multi-agent-systeme', '/patterns/agent-orchestration-patterns', '/grundlagen/ai-agent-team'],
  '/grundlagen/multi-agent-systeme': ['/grundlagen/was-ist-agent-orchestration', '/grundlagen/agent-rollen', '/patterns/task-delegation'],
  '/grundlagen/agent-rollen': ['/grundlagen/multi-agent-systeme', '/grundlagen/ai-agent-team', '/patterns/safety-hooks'],
  '/grundlagen/lokal-vs-cloud': ['/grundlagen/ollama-vs-cloud', '/grundlagen/selfhosted-vs-cloud', '/tools/ollama-tutorial'],
  '/grundlagen/ollama-vs-cloud': ['/grundlagen/lokal-vs-cloud', '/tools/ollama-tutorial', '/tools/model-selection'],
  '/grundlagen/ai-agent-team': ['/grundlagen/agent-rollen', '/grundlagen/was-ist-agent-orchestration', '/patterns/task-delegation'],
  '/grundlagen/selfhosted-vs-cloud': ['/grundlagen/lokal-vs-cloud', '/tools/docker-vs-swarm', '/security/backup-strategie'],
  '/grundlagen/30-tage-quickstart': ['/tools/ollama-tutorial', '/tools/docker-vs-swarm', '/tools/n8n-fuer-anfaenger'],
  '/grundlagen/ki-unternehmen': ['/compliance/dsgvo-grundlagen', '/grundlagen/lokal-vs-cloud', '/compliance/eu-ai-act'],
  '/grundlagen/was-ist-ein-llm': ['/grundlagen/lokal-vs-cloud', '/tools/ollama-tutorial', '/tools/rag-guide'],
  // Compliance
  '/compliance/dsgvo-grundlagen': ['/compliance/datenschutz-praxis', '/compliance/dpia', '/compliance/eu-ai-act'],
  '/compliance/eu-ai-act': ['/compliance/eu-ai-act-checkliste', '/compliance/verbotene-ai-praktiken', '/compliance/ki-kompetenz-art4'],
  '/compliance/ki-kompetenz-art4': ['/compliance/eu-ai-act', '/compliance/eu-ai-act-checkliste', '/grundlagen/ki-unternehmen'],
  '/compliance/eu-ai-act-checkliste': ['/compliance/eu-ai-act', '/compliance/ki-kompetenz-art4', '/compliance/verbotene-ai-praktiken'],
  '/compliance/verbotene-ai-praktiken': ['/compliance/eu-ai-act', '/compliance/chatbot-transparenzpflichten', '/compliance/eu-ai-act-checkliste'],
  '/compliance/chatbot-transparenzpflichten': ['/compliance/verbotene-ai-praktiken', '/compliance/eu-ai-act', '/compliance/dsgvo-grundlagen'],
  '/compliance/dpia': ['/compliance/dsgvo-grundlagen', '/compliance/datenschutz-praxis', '/compliance/eu-ai-act'],
  '/compliance/datenschutz-praxis': ['/compliance/dsgvo-grundlagen', '/compliance/dpia', '/security/api-keys-sicher'],
  // Tools
  '/tools/docker-vs-swarm': ['/tools/proxmox-setup', '/tools/grafana-monitoring', '/grundlagen/selfhosted-vs-cloud'],
  '/tools/ollama-tutorial': ['/tools/model-selection', '/tools/rag-guide', '/grundlagen/ollama-vs-cloud'],
  '/tools/rag-guide': ['/tools/ollama-tutorial', '/tools/model-selection', '/patterns/memory-management'],
  '/tools/n8n-fuer-anfaenger': ['/tools/mattermost-agent', '/tools/grafana-monitoring', '/grundlagen/30-tage-quickstart'],
  '/tools/mattermost-agent': ['/tools/n8n-fuer-anfaenger', '/patterns/heartbeat-monitoring', '/patterns/task-delegation'],
  '/tools/grafana-monitoring': ['/tools/docker-vs-swarm', '/patterns/heartbeat-monitoring', '/tools/proxmox-setup'],
  '/tools/proxmox-setup': ['/tools/docker-vs-swarm', '/security/backup-strategie', '/tools/grafana-monitoring'],
  '/tools/model-selection': ['/tools/ollama-tutorial', '/tools/rag-guide', '/grundlagen/ollama-vs-cloud'],
  '/tools/mcp-server': ['/tools/n8n-fuer-anfaenger', '/tools/ollama-tutorial', '/patterns/agent-orchestration-patterns'],
  // Patterns
  '/patterns/agent-orchestration-patterns': ['/grundlagen/was-ist-agent-orchestration', '/patterns/task-delegation', '/patterns/safety-hooks'],
  '/patterns/memory-management': ['/tools/rag-guide', '/patterns/agent-orchestration-patterns', '/patterns/safety-hooks'],
  '/patterns/task-delegation': ['/patterns/agent-orchestration-patterns', '/grundlagen/agent-rollen', '/grundlagen/ai-agent-team'],
  '/patterns/safety-hooks': ['/patterns/agent-orchestration-patterns', '/security/api-keys-sicher', '/patterns/heartbeat-monitoring'],
  '/patterns/heartbeat-monitoring': ['/tools/grafana-monitoring', '/patterns/safety-hooks', '/tools/mattermost-agent'],
  // Security
  '/security/self-hosted-sicherheit': ['/security/verschluesselung', '/security/firewall-setup', '/security/api-keys-sicher'],
  '/security/verschluesselung': ['/security/self-hosted-sicherheit', '/compliance/dsgvo-grundlagen', '/security/backup-strategie'],
  '/security/api-keys-sicher': ['/security/firewall-setup', '/compliance/datenschutz-praxis', '/patterns/safety-hooks'],
  '/security/firewall-setup': ['/security/self-hosted-sicherheit', '/security/api-keys-sicher', '/security/backup-strategie'],
  '/security/backup-strategie': ['/security/firewall-setup', '/tools/proxmox-setup', '/grundlagen/selfhosted-vs-cloud'],
  // Tools (new)
  '/tools/docker-grundlagen': ['/tools/docker-vs-swarm', '/tools/ai-stack-setup', '/tools/proxmox-setup'],
  '/tools/ai-stack-setup': ['/tools/ollama-tutorial', '/tools/docker-grundlagen', '/grundlagen/was-ist-ein-llm'],
  // Patterns (new)
  '/patterns/ai-agent-digitaler-mitarbeiter': ['/patterns/safety-hooks', '/patterns/heartbeat-monitoring', '/compliance/ai-agent-legal-framework'],
  '/patterns/self-improving-agents': ['/patterns/memory-management', '/patterns/safety-hooks', '/patterns/ai-agent-digitaler-mitarbeiter'],
  // Compliance (new)
  '/compliance/ai-agent-legal-framework': ['/compliance/eu-ai-act', '/compliance/dpia', '/patterns/ai-agent-digitaler-mitarbeiter'],
}

export function getRelatedArticles(href: string): Article[] {
  const relatedHrefs = relatedArticlesMap[href] || []
  return relatedHrefs
    .map((h) => getArticleByHref(h))
    .filter((a): a is Article => a !== undefined)
}
