import { test, expect } from '@playwright/test'

const deRoutes = [
  '/',
  '/grundlagen/', '/grundlagen/was-ist-agent-orchestration/', '/grundlagen/multi-agent-systeme/',
  '/grundlagen/agent-rollen/', '/grundlagen/lokal-vs-cloud/', '/grundlagen/ollama-vs-cloud/',
  '/grundlagen/ai-agent-team/', '/grundlagen/selfhosted-vs-cloud/', '/grundlagen/30-tage-quickstart/',
  '/grundlagen/ki-unternehmen/', '/grundlagen/was-ist-ein-llm/',
  '/compliance/', '/compliance/dsgvo-grundlagen/', '/compliance/eu-ai-act/',
  '/compliance/ki-kompetenz-art4/', '/compliance/eu-ai-act-checkliste/',
  '/compliance/verbotene-ai-praktiken/', '/compliance/chatbot-transparenzpflichten/',
  '/compliance/dpia/', '/compliance/datenschutz-praxis/',
  '/compliance/ai-agent-legal-framework/', '/compliance/self-assessment/',
  '/tools/', '/tools/docker-vs-swarm/', '/tools/docker-grundlagen/',
  '/tools/ai-stack-setup/', '/tools/ollama-tutorial/', '/tools/rag-guide/',
  '/tools/n8n-fuer-anfaenger/', '/tools/mattermost-agent/', '/tools/grafana-monitoring/',
  '/tools/proxmox-setup/', '/tools/model-selection/', '/tools/mcp-server/',
  '/tools/open-source-projekte/', '/tools/ai-os-setup/', '/tools/n8n-workflow-bundle/',
  '/tools/ai-tools-datenbank/', '/tools/vergleich-alternativen/',
  '/tools/cli-coding-agents-vergleich/',
  '/patterns/', '/patterns/agent-orchestration-patterns/', '/patterns/memory-management/',
  '/patterns/task-delegation/', '/patterns/safety-hooks/', '/patterns/heartbeat-monitoring/',
  '/patterns/ai-agent-digitaler-mitarbeiter/', '/patterns/self-improving-agents/',
  '/patterns/agent-skalierung/', '/patterns/evals-guardrails/', '/patterns/human-in-the-loop/',
  '/security/', '/security/self-hosted-sicherheit/', '/security/verschluesselung/',
  '/security/api-keys-sicher/', '/security/firewall-setup/', '/security/backup-strategie/',
  '/papers/', '/papers/attention-is-all-you-need/', '/papers/rag-paper/',
  '/papers/lora-paper/', '/papers/react-paper/', '/papers/constitutional-ai/',
  '/papers/hierarchical-reasoning/',
  '/oesterreich/', '/downloads/', '/blog/', '/lernpfad/',
]

const enRoutes = [
  '/en/',
  '/en/grundlagen/', '/en/grundlagen/was-ist-agent-orchestration/', '/en/grundlagen/multi-agent-systeme/',
  '/en/grundlagen/agent-rollen/', '/en/grundlagen/lokal-vs-cloud/', '/en/grundlagen/ollama-vs-cloud/',
  '/en/grundlagen/ai-agent-team/', '/en/grundlagen/selfhosted-vs-cloud/', '/en/grundlagen/30-tage-quickstart/',
  '/en/grundlagen/ki-unternehmen/', '/en/grundlagen/was-ist-ein-llm/',
  '/en/compliance/', '/en/compliance/dsgvo-grundlagen/', '/en/compliance/eu-ai-act/',
  '/en/compliance/ki-kompetenz-art4/', '/en/compliance/eu-ai-act-checkliste/',
  '/en/compliance/verbotene-ai-praktiken/', '/en/compliance/chatbot-transparenzpflichten/',
  '/en/compliance/dpia/', '/en/compliance/datenschutz-praxis/',
  '/en/compliance/ai-agent-legal-framework/', '/en/compliance/self-assessment/',
  '/en/tools/', '/en/tools/docker-vs-swarm/', '/en/tools/docker-grundlagen/',
  '/en/tools/ai-stack-setup/', '/en/tools/ollama-tutorial/', '/en/tools/rag-guide/',
  '/en/tools/n8n-fuer-anfaenger/', '/en/tools/mattermost-agent/', '/en/tools/grafana-monitoring/',
  '/en/tools/proxmox-setup/', '/en/tools/model-selection/', '/en/tools/mcp-server/',
  '/en/tools/open-source-projects/', '/en/tools/ai-os-setup/', '/en/tools/n8n-workflow-bundle/',
  '/en/tools/ai-tools-database/', '/en/tools/comparison-alternatives/',
  '/en/tools/cli-coding-agents-comparison/',
  '/en/patterns/', '/en/patterns/agent-orchestration-patterns/', '/en/patterns/memory-management/',
  '/en/patterns/task-delegation/', '/en/patterns/safety-hooks/', '/en/patterns/heartbeat-monitoring/',
  '/en/patterns/ai-agent-digital-employee/', '/en/patterns/self-improving-agents/',
  '/en/patterns/agent-skalierung/', '/en/patterns/evals-guardrails/', '/en/patterns/human-in-the-loop/',
  '/en/security/', '/en/security/self-hosted-sicherheit/', '/en/security/verschluesselung/',
  '/en/security/api-keys-sicher/', '/en/security/firewall-setup/', '/en/security/backup-strategie/',
  '/en/papers/', '/en/papers/attention-is-all-you-need/', '/en/papers/rag-paper/',
  '/en/papers/lora-paper/', '/en/papers/react-paper/', '/en/papers/constitutional-ai/',
  '/en/papers/hierarchical-reasoning/',
  '/en/austria/', '/en/downloads/', '/en/learning-path/', '/en/support/',
]

const allRoutes = [...deRoutes, ...enRoutes]

test.describe('Wiki Pages — HTTP Status & Content', () => {
  for (const route of allRoutes) {
    test(`${route} returns 200 with h1`, async ({ page }) => {
      const response = await page.goto(route, { waitUntil: 'domcontentloaded' })
      expect(response?.status(), `${route} returned ${response?.status()}`).toBe(200)
      const h1 = page.locator('h1').first()
      await expect(h1).toBeVisible({ timeout: 5000 })
    })
  }
})
