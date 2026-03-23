'use client'

import { useState, useEffect, useCallback } from 'react'
import { WikiLink as Link } from '../../../components/WikiLink'

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

interface LearningPathState {
  completedStages: Record<string, string[]>
  quizResults: Record<string, boolean>
  feedback: Record<string, string>
  rating: Record<string, number>
  comments: { name: string; text: string; date: string }[]
  newsletterDismissed: boolean
}

/* ───────────────────────────── Intro Quiz Data ───────────────────────────── */

const introQuestions = [
  {
    id: 1,
    question: 'Which describes you best?',
    options: [
      { key: 'A', label: 'I run a company / I\'m in executive management' },
      { key: 'B', label: 'I\'m in IT / system administration' },
      { key: 'C', label: 'I\'m a developer / programmer' },
      { key: 'D', label: 'I\'m responsible for compliance / legal' },
      { key: 'E', label: 'I\'m completely new to AI' },
    ],
  },
  {
    id: 2,
    question: 'What do you want to achieve?',
    options: [
      { key: 'A', label: 'Understand what AI costs and what it can do' },
      { key: 'B', label: 'Set up and run AI systems' },
      { key: 'C', label: 'Build my own AI applications' },
      { key: 'D', label: 'Meet compliance requirements' },
      { key: 'E', label: 'Just get started and try things out' },
    ],
  },
  {
    id: 3,
    question: 'How technical are you?',
    options: [
      { key: 'A', label: 'Not technical — I want results, not details' },
      { key: 'B', label: 'Basic knowledge — I know my way around PCs' },
      { key: 'C', label: 'Advanced — Terminal, Docker are familiar to me' },
      { key: 'D', label: 'Expert — I develop software' },
    ],
  },
]

/* ───────────────────────────── Path & Stage Data ───────────────────────────── */

const paths: PathInfo[] = [
  {
    id: 'management',
    icon: '\u{1F3E2}',
    title: 'Executive & Management',
    subtitle: 'What AI means for your business — costs, benefits, risks, obligations',
    technical: 'No',
    duration: '~2h',
    result: 'Make decisions',
    stages: [
      {
        title: 'AI in Business: What Does It Actually Deliver?',
        href: '/en/grundlagen/ki-unternehmen',
        description: 'Opportunities, limits, and real use cases — no hype.',
        quiz: {
          question: 'What is the biggest advantage of local AI for an SME?',
          options: [
            'It is always better than cloud',
            'Company data stays in-house',
            'It is free',
            'It does not need internet',
          ],
          correct: 1,
          explanation: 'Local AI means full data control — sensitive company data never leaves the corporate network.',
        },
      },
      {
        title: 'What Does AI Cost? The Honest Comparison',
        href: '/en/grundlagen/ai-kosten-vergleich',
        description: 'Cloud APIs vs. local hardware: what pays off when?',
        quiz: {
          question: 'When does local AI become cheaper than cloud APIs?',
          options: [
            'Immediately',
            'After 1 week',
            'At 50-200 million tokens/month',
            'Never',
          ],
          correct: 2,
          explanation: 'Local hardware pays off at high token throughput (50-200M tokens/month) — below that, cloud is often cheaper.',
        },
      },
      {
        title: 'Local vs Cloud: What Is More Secure?',
        href: '/en/grundlagen/lokal-vs-cloud',
        description: 'Data protection, control, dependency — the facts.',
        quiz: {
          question: 'What happens when you enter customer data into ChatGPT?',
          options: [
            'Nothing',
            'It can be used for training and you are liable',
            'OpenAI deletes it immediately',
            'GDPR allows this',
          ],
          correct: 1,
          explanation: 'Data can be used for model training. As the data controller, you are liable for the data transfer to third parties.',
        },
      },
      {
        title: 'EU AI Act: What You Need to Know as a Leader',
        href: '/en/compliance/eu-ai-act',
        description: 'The key obligations at a glance.',
        quiz: {
          question: 'Since when does the AI competence obligation (Art. 4) apply?',
          options: [
            'From August 2026',
            'Since February 2025',
            'Not until 2027',
            'Not in Austria',
          ],
          correct: 1,
          explanation: 'Article 4 of the EU AI Act (AI competence obligation) has been in effect since February 2, 2025 for all companies in the EU.',
        },
      },
      {
        title: 'Art. 4: What You MUST Do',
        href: '/en/compliance/ki-kompetenz-art4',
        description: 'AI competence obligation since February 2025 — applies to every company.',
        quiz: {
          question: 'What are the penalties for non-compliance with the EU AI Act?',
          options: [
            'Nothing',
            'A warning',
            'Up to EUR 35 million or 7% of turnover',
            'Only relevant for large corporations',
          ],
          correct: 2,
          explanation: 'The EU AI Act provides for fines of up to 35 million euros or 7% of global annual turnover.',
        },
      },
      {
        title: 'AI Funding and Resources in Austria',
        href: '/en/austria',
        description: 'Available grants and where to get help.',
        quiz: {
          question: 'Which authority is responsible for AI regulation in Austria?',
          options: [
            'WKO (Chamber of Commerce)',
            'RTR AI Service Center',
            'AMS (Employment Service)',
            'The EU directly',
          ],
          correct: 1,
          explanation: 'The RTR (Austrian Regulatory Authority for Broadcasting and Telecommunications) operates the AI Service Center as the central contact point for AI regulation in Austria.',
        },
      },
    ],
  },
  {
    id: 'it-admin',
    icon: '\u{1F6E0}\u{FE0F}',
    title: 'IT & Administration',
    subtitle: 'Set up, run, and secure AI systems',
    technical: 'Medium',
    duration: '~4h',
    result: 'Run the stack',
    stages: [
      {
        title: 'Ollama: Local LLM in 5 Minutes',
        href: '/en/tools/ollama-tutorial',
        description: 'One command, one model — let\'s go.',
        quiz: {
          question: 'Which command starts a local LLM with Ollama?',
          options: [
            'ollama start llama',
            'ollama run llama3.2',
            'docker run ollama',
            'pip install ollama',
          ],
          correct: 1,
          explanation: 'With "ollama run <modelname>" you download a model and start it immediately — a single command is all it takes.',
        },
      },
      {
        title: 'Docker: Why Containers?',
        href: '/en/tools/docker-grundlagen',
        description: 'What Docker is and why you need it for AI.',
        quiz: {
          question: 'What is the main advantage of Docker containers for AI systems?',
          options: [
            'Containers make AI faster',
            'Isolated, reproducible environments for each service',
            'Docker is free',
            'Containers replace the GPU',
          ],
          correct: 1,
          explanation: 'Docker containers isolate services from each other and make deployments reproducible — regardless of the server.',
        },
      },
      {
        title: 'Set Up the Complete AI Stack',
        href: '/en/tools/ai-stack-setup',
        description: 'Ollama + Open WebUI + n8n — all together.',
        quiz: {
          question: 'Which components form a typical local AI stack?',
          options: [
            'Just Ollama is enough',
            'ChatGPT + Ollama + Docker',
            'Ollama (LLM) + Open WebUI (interface) + n8n (automation)',
            'TensorFlow + PyTorch + Jupyter',
          ],
          correct: 2,
          explanation: 'A practical local AI stack typically consists of an LLM runner (Ollama), a web interface (Open WebUI), and automation (n8n).',
        },
      },
      {
        title: 'Monitoring: Can You See If Everything Is Running?',
        href: '/en/tools/grafana-monitoring',
        description: 'Grafana dashboards for your AI stack.',
        quiz: {
          question: 'What is the purpose of Grafana in the AI stack?',
          options: [
            'Training AI models',
            'Visualizing system metrics and setting alerts',
            'Creating Docker containers',
            'Automating backups',
          ],
          correct: 1,
          explanation: 'Grafana visualizes metrics (CPU, RAM, GPU, response times) and can automatically send alerts when problems occur.',
        },
      },
      {
        title: 'Secure the Network',
        href: '/en/security/firewall-setup',
        description: 'Firewall rules for self-hosted AI systems.',
        quiz: {
          question: 'What is the most important firewall rule for a local AI stack?',
          options: [
            'Open all ports for maximum performance',
            'Only open required ports and restrict access to LAN',
            'Disable the firewall completely',
            'Only block the SSH port',
          ],
          correct: 1,
          explanation: 'Minimal attack surface: only open the actually required ports and restrict access to the local network.',
        },
      },
      {
        title: 'Backup: When Things Go Wrong',
        href: '/en/security/backup-strategie',
        description: 'Automatic backups — so nothing gets lost.',
        quiz: {
          question: 'Which backup strategy is most important for an AI stack?',
          options: [
            'Only back up the models',
            'Regularly back up configurations, volumes, and databases',
            'Once a year is enough',
            'Cloud backup at OpenAI',
          ],
          correct: 1,
          explanation: 'Docker volumes, configuration files, and databases must be backed up regularly and automatically — models can be re-downloaded.',
        },
      },
      {
        title: 'Automation with n8n',
        href: '/en/tools/n8n-fuer-anfaenger',
        description: 'Build workflows without coding.',
        quiz: {
          question: 'What can n8n automate in combination with local AI?',
          options: [
            'Only sending emails',
            'Processing documents, creating summaries, classifying data',
            'Only managing databases',
            'Only creating websites',
          ],
          correct: 1,
          explanation: 'n8n connects local LLMs with business tools and can automate document processing, classification, summaries, and more.',
        },
      },
    ],
  },
  {
    id: 'developer',
    icon: '\u{1F4BB}',
    title: 'Developer',
    subtitle: 'Build AI applications: Agents, RAG, APIs',
    technical: 'High',
    duration: '~6h',
    result: 'Build apps',
    stages: [
      {
        title: 'How LLMs Work',
        href: '/en/grundlagen/was-ist-ein-llm',
        description: 'Token prediction, attention, context window — the fundamentals.',
        quiz: {
          question: 'What does an LLM do when it generates text?',
          options: [
            'It searches the internet for answers',
            'It predicts the next most probable token',
            'It understands text like a human',
            'It copies from a database',
          ],
          correct: 1,
          explanation: 'LLMs are autoregressive models: they compute a probability distribution over all possible next tokens and sample from it.',
        },
      },
      {
        title: 'Which Model for Which Purpose?',
        href: '/en/tools/model-selection',
        description: 'Qwen, Llama, Mistral — when do you use what?',
        quiz: {
          question: 'What primarily determines which LLM you should choose?',
          options: [
            'Always take the largest model',
            'Use case, available VRAM, and required languages',
            'Only the price matters',
            'Always the newest model',
          ],
          correct: 1,
          explanation: 'Model selection depends on the specific use case (coding, chat, analysis), the available GPU VRAM, and which languages need to be well supported.',
        },
      },
      {
        title: 'RAG: Your Data + LLM',
        href: '/en/tools/rag-guide',
        description: 'Retrieval Augmented Generation — your knowledge, your model.',
        quiz: {
          question: 'What is the purpose of RAG (Retrieval Augmented Generation)?',
          options: [
            'Retraining the model',
            'Providing your own documents as context to the LLM without fine-tuning',
            'Increasing response speed',
            'Saving GPU memory',
          ],
          correct: 1,
          explanation: 'RAG retrieves relevant document sections from a vector database and passes them as context to the LLM — without expensive fine-tuning.',
        },
      },
      {
        title: 'Agent Patterns',
        href: '/en/patterns/agent-orchestration-patterns',
        description: 'Sequential, parallel, hierarchical — the key patterns.',
        quiz: {
          question: 'What distinguishes an AI agent from a simple LLM call?',
          options: [
            'Agents are always faster',
            'Agents can call tools, plan, and work iteratively',
            'Agents don\'t need an LLM',
            'Agents only work in the cloud',
          ],
          correct: 1,
          explanation: 'Agents extend LLMs with tool use, planning, and iterative processing — they can independently execute sub-steps and evaluate results.',
        },
      },
      {
        title: 'Memory & Context',
        href: '/en/patterns/memory-management',
        description: 'How agents remember and manage context.',
        quiz: {
          question: 'Why do AI agents need a memory system?',
          options: [
            'So they answer faster',
            'Because LLMs have no long-term memory and context windows are limited',
            'For better grammar',
            'Memory is optional and unimportant',
          ],
          correct: 1,
          explanation: 'LLMs have no persistent memory — each request starts from scratch. Memory systems store important information across sessions.',
        },
      },
      {
        title: 'MCP: Tools for LLMs',
        href: '/en/tools/mcp-server',
        description: 'Model Context Protocol — giving LLMs real tools.',
        quiz: {
          question: 'What does the Model Context Protocol (MCP) enable?',
          options: [
            'Faster token generation',
            'LLMs can access external tools and data sources in a standardized way',
            'Models become smaller',
            'Only Anthropic models support it',
          ],
          correct: 1,
          explanation: 'MCP is an open standard that enables LLMs to access file systems, APIs, databases, and other tools through a unified interface.',
        },
      },
      {
        title: 'Self-Improving Agents',
        href: '/en/patterns/self-improving-agents',
        description: 'Agents that learn from mistakes and improve themselves.',
        quiz: {
          question: 'How does a self-improving agent get better?',
          options: [
            'It retrains its LLM',
            'It stores errors and corrections and uses them as context for future tasks',
            'It automatically downloads updates',
            'It never asks the user for help',
          ],
          correct: 1,
          explanation: 'Self-improving agents store errors, corrections, and successful strategies and load them as additional context for similar tasks.',
        },
      },
      {
        title: 'n8n AI Workflows',
        href: '/en/tools/n8n-workflow-bundle',
        description: 'Ready-made workflow templates for typical AI tasks.',
        quiz: {
          question: 'What is the advantage of n8n over pure Python code for AI workflows?',
          options: [
            'n8n is always faster',
            'Visual design, easy integration, and no deployment complexity',
            'n8n can do more than Python',
            'Python can\'t do AI workflows',
          ],
          correct: 1,
          explanation: 'n8n offers a visual workflow editor, hundreds of pre-built integrations, and easy deployment — ideal for business automation without DevOps overhead.',
        },
      },
    ],
  },
  {
    id: 'compliance',
    icon: '\u{2696}\u{FE0F}',
    title: 'Compliance & Legal',
    subtitle: 'EU AI Act, GDPR, documentation — what is mandatory',
    technical: 'No',
    duration: '~3h',
    result: 'Ensure compliance',
    stages: [
      {
        title: 'EU AI Act Guide',
        href: '/en/compliance/eu-ai-act',
        description: 'The complete overview — explained clearly.',
        quiz: {
          question: 'Into which categories does the EU AI Act classify AI systems?',
          options: [
            'Good and Bad',
            'Prohibited, High-Risk, Limited Risk, Minimal Risk',
            'Only High-Risk and Low-Risk',
            'By company size',
          ],
          correct: 1,
          explanation: 'The EU AI Act uses a risk-based approach with four tiers: prohibited practices, high-risk systems, limited risk systems, and minimal risk.',
        },
      },
      {
        title: 'Art. 4 AI Competence (effective since 02/2025!)',
        href: '/en/compliance/ki-kompetenz-art4',
        description: 'What Article 4 specifically requires from you.',
        quiz: {
          question: 'Who does the AI competence obligation under Art. 4 affect?',
          options: [
            'Only IT companies',
            'All providers and operators of AI systems — practically every company',
            'Only companies with more than 250 employees',
            'Only companies in Germany',
          ],
          correct: 1,
          explanation: 'Article 4 applies to all providers and operators of AI systems — since virtually every company uses AI tools, it affects practically everyone.',
        },
      },
      {
        title: 'Compliance Checklist',
        href: '/en/compliance/eu-ai-act-checkliste',
        description: 'Check point by point whether you meet all requirements.',
        quiz: {
          question: 'What is the first step toward EU AI Act compliance?',
          options: [
            'Shut down all AI systems immediately',
            'Conduct an inventory of all AI systems used in the company',
            'Hire a lawyer',
            'Wait until penalties come',
          ],
          correct: 1,
          explanation: 'Without knowing which AI systems are in use, no risk assessment can take place. The inventory is the necessary first step.',
        },
      },
      {
        title: 'GDPR for AI Systems',
        href: '/en/compliance/dsgvo-grundlagen',
        description: 'Data protection regulation meets AI.',
        quiz: {
          question: 'Which GDPR obligation is particularly relevant for AI systems?',
          options: [
            'Legal notice requirement',
            'Data Protection Impact Assessment for automated processing of personal data',
            'Newsletter unsubscribe',
            'Cookie banner',
          ],
          correct: 1,
          explanation: 'For systematic, automated processing of personal data (typical for AI), a Data Protection Impact Assessment (DPIA) is often mandatory.',
        },
      },
      {
        title: 'Data Protection Impact Assessment',
        href: '/en/compliance/dpia',
        description: 'When you need a DPIA and how to create one.',
        quiz: {
          question: 'When is a DPIA (Data Protection Impact Assessment) mandatory?',
          options: [
            'Whenever you use a computer',
            'When processing is likely to result in a high risk to data subjects',
            'Only for companies with more than 500 employees',
            'Never — it is voluntary',
          ],
          correct: 1,
          explanation: 'A DPIA is mandatory under Art. 35 GDPR when data processing is likely to result in a high risk to the rights and freedoms of natural persons.',
        },
      },
      {
        title: 'What Is PROHIBITED',
        href: '/en/compliance/verbotene-ai-praktiken',
        description: 'Social scoring, workplace emotion recognition, and more.',
        quiz: {
          question: 'Which AI practice has been prohibited under the EU AI Act since February 2025?',
          options: [
            'Chatbots on websites',
            'Social scoring and real-time biometric identification in public spaces',
            'Translation software',
            'Automatic email filters',
          ],
          correct: 1,
          explanation: 'The EU AI Act prohibits, among other things, social scoring systems and real-time remote biometric identification in public spaces (with narrowly defined exceptions).',
        },
      },
      {
        title: 'Legal Framework for Agents',
        href: '/en/compliance/ai-agent-legal-framework',
        description: 'Who is liable when an agent makes mistakes?',
        quiz: {
          question: 'Who is liable when an AI agent makes a mistake that causes damage?',
          options: [
            'The agent itself',
            'The operator/company that deploys the agent',
            'The LLM manufacturer',
            'Nobody — AI errors are not liable',
          ],
          correct: 1,
          explanation: 'Under current law, the operator is liable. AI systems have no legal personality — the deploying company bears the responsibility.',
        },
      },
      {
        title: 'Templates & Checklists',
        href: '/en/downloads',
        description: 'Ready-to-use documents for download.',
        quiz: {
          question: 'Which document should every company using AI maintain?',
          options: [
            'Only the Terms of Service',
            'An AI registry with risk assessment, training documentation, and responsibilities',
            'Only a cookie banner',
            'A LinkedIn profile',
          ],
          correct: 1,
          explanation: 'The EU AI Act requires documentation: which AI systems are in use, their risk class, who is responsible, and that employees have been trained.',
        },
      },
    ],
  },
  {
    id: 'beginner',
    icon: '\u{1F331}',
    title: 'Beginner',
    subtitle: 'Completely new? Start here — step by step, no prior knowledge needed',
    technical: 'No',
    duration: '~4h',
    result: 'Understand the basics',
    stages: [
      {
        title: 'What Is AI? Simply Explained',
        href: '/blog/2026-03-12-was-ist-ein-llm',
        description: 'No jargon, no formulas — just the essentials.',
        quiz: {
          question: 'What is Artificial Intelligence at its core?',
          options: [
            'A robot that can think like a human',
            'Software that recognizes patterns in data and makes predictions',
            'A supercomputer',
            'The internet',
          ],
          correct: 1,
          explanation: 'AI systems like LLMs recognize patterns in massive amounts of data and use these patterns to make predictions — e.g., which word comes next.',
        },
      },
      {
        title: 'Why Local?',
        href: '/blog/2026-03-12-warum-lokale-ki-statt-cloud',
        description: 'Why your data is better off staying with you.',
        quiz: {
          question: 'What is an important reason for local AI instead of cloud?',
          options: [
            'Local AI is always faster',
            'Your data stays on your computer and is not sent to third parties',
            'Local AI is always free',
            'Cloud AI does not work',
          ],
          correct: 1,
          explanation: 'With local AI, your data never leaves your computer. With cloud AI, it is sent to a third-party provider\'s servers — with all the associated data protection risks.',
        },
      },
      {
        title: '10 Commands — That\'s All You Need',
        href: '/blog/2026-03-12-terminal-grundlagen-fuer-ai',
        description: 'Terminal basics for absolute beginners.',
        quiz: {
          question: 'What does the terminal command "cd" do?',
          options: [
            'Delete files',
            'Change to a different directory (Change Directory)',
            'Copy files',
            'Install programs',
          ],
          correct: 1,
          explanation: '"cd" stands for "Change Directory" and switches the current directory — one of the most fundamental terminal commands.',
        },
      },
      {
        title: 'Install Your First LLM',
        href: '/blog/2026-03-12-ollama-installieren-schritt-fuer-schritt',
        description: 'Install Ollama — step by step with screenshots.',
        quiz: {
          question: 'What do you need at minimum to run a local LLM?',
          options: [
            'A supercomputer',
            'A regular PC with at least 8 GB RAM',
            'An internet connection that is always on',
            'A paid subscription',
          ],
          correct: 1,
          explanation: 'Small models (e.g., 3B parameters) already run on regular PCs with 8 GB RAM. For larger models, you need more RAM or a GPU.',
        },
      },
      {
        title: 'Your First Chatbot',
        href: '/blog/2026-03-12-open-webui-erster-chatbot',
        description: 'Open WebUI: ChatGPT-like interface for your local model.',
        quiz: {
          question: 'What is Open WebUI?',
          options: [
            'A paid ChatGPT clone',
            'A free web interface that works with local LLMs like Ollama',
            'A text editor',
            'A programming language',
          ],
          correct: 1,
          explanation: 'Open WebUI is a free, open-source web interface that connects to Ollama and provides a ChatGPT-like experience for local models.',
        },
      },
      {
        title: 'Understanding Docker',
        href: '/blog/2026-03-12-docker-grundlagen-fuer-ai',
        description: 'Containers, images, volumes — simply explained.',
        quiz: {
          question: 'What is a Docker container in simple terms?',
          options: [
            'A hard drive',
            'An isolated environment where a program is packaged with everything it needs',
            'A folder on your computer',
            'A cloud service',
          ],
          correct: 1,
          explanation: 'A Docker container is like a box that contains a program with all its dependencies — it runs the same everywhere, regardless of which computer.',
        },
      },
      {
        title: '30-Day Quickstart Plan',
        href: '/en/grundlagen/30-tage-quickstart',
        description: 'Your roadmap for the first month with local AI.',
        quiz: {
          question: 'What is a realistic goal for the first month with local AI?',
          options: [
            'Found your own AI startup',
            'Ollama installed, first chats done, and a simple workflow built',
            'Rebuild GPT-4',
            'Read all papers on arXiv',
          ],
          correct: 1,
          explanation: 'The first month is about the basics: get a local LLM running, experiment with it, and set up a first practical workflow.',
        },
      },
    ],
  },
]

/* ───────────────────────────── Placeholder Comments (clearly marked as examples, NOT real reviews!) ───────────────────────────── */

const placeholderComments = [
  { name: 'M.K., Vienna', text: 'Excellently explained, I finally understand the difference between cloud and local!', date: '2026-03-15' },
  { name: 'S.H., Munich', text: 'The compliance path saved me 3 days of research.', date: '2026-03-10' },
  { name: 'A.B., Zurich', text: 'As a non-techie, this was perfect. No jargon, just clear explanations.', date: '2026-03-08' },
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

const STORAGE_KEY = 'learning-path-spiral-state'

function useLearningPathState() {
  const [state, setState] = useState<LearningPathState>({
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

  return { state, loaded, completeStage, setQuizResult, setFeedback, setRating, addComment, dismissNewsletter }
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
        <span className="text-sm text-emerald-300">Quiz passed</span>
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
        <span className="text-[#4262FF]">&#9881;</span> Mini Quiz
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
          <p className="text-sm text-red-300 mb-1">Incorrect.</p>
          <p className="text-xs text-slate-400">{quiz.explanation}</p>
          <button
            onClick={handleRetry}
            className="mt-2 text-xs text-[#4262FF] hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      {showResult && selected === quiz.correct && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
          <p className="text-sm text-emerald-300 mb-1">Correct!</p>
          <p className="text-xs text-slate-400">{quiz.explanation}</p>
        </div>
      )}

      {!showResult && (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="bg-[#4262FF] hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Check answer
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
        <p className="text-xs text-slate-500">Thanks for your feedback! {currentFeedback === 'up' ? '\u{1F44D}' : '\u{1F44E}'}</p>
      </div>
    )
  }

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center space-y-2">
      <p className="text-sm text-slate-300">Was this section helpful?</p>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => onFeedback(feedbackKey, 'up')}
          className="px-4 py-2 bg-slate-700 hover:bg-emerald-500/20 hover:border-emerald-500/50 border border-slate-600 rounded-lg text-lg transition-colors"
        >
          {'\u{1F44D}'} Yes
        </button>
        <button
          onClick={() => onFeedback(feedbackKey, 'down')}
          className="px-4 py-2 bg-slate-700 hover:bg-red-500/20 hover:border-red-500/50 border border-slate-600 rounded-lg text-lg transition-colors"
        >
          {'\u{1F44E}'} No
        </button>
      </div>
      <p className="text-xs text-slate-600">Your feedback helps us improve the learning path</p>
    </div>
  )
}

function MilestoneCard({ percent, pathName, pathId, state, onRating, onAddComment, onDismissNewsletter }: {
  percent: number
  pathName: string
  pathId: string
  state: LearningPathState
  onRating: (pathId: string, value: number) => void
  onAddComment: (name: string, text: string) => void
  onDismissNewsletter: () => void
}) {
  const [commentName, setCommentName] = useState('')
  const [commentText, setCommentText] = useState('')
  const [commentSubmitted, setCommentSubmitted] = useState(false)

  const shareTextTwitter = `I'm learning local AI on wiki.ai-engineering.at — ${percent}% through the ${pathName}! #AIEngineering #LocalAI`
  const shareTextLinkedIn = `I'm working through the ${pathName} learning path on wiki.ai-engineering.at. ${percent}% done! Local AI is the future for privacy-conscious businesses.`

  if (percent === 25) {
    return (
      <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-xl p-5 text-center space-y-2">
        <div className="text-2xl">{'\u{1F680}'}</div>
        <h4 className="text-lg font-bold text-white">Great start!</h4>
        <p className="text-sm text-slate-400">You now understand the basics. Keep going!</p>
      </div>
    )
  }

  if (percent === 50) {
    return (
      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-5 text-center space-y-3">
        <div className="text-2xl">{'\u{1F3AF}'}</div>
        <h4 className="text-lg font-bold text-white">Halfway there!</h4>
        <p className="text-sm text-slate-400">Share your progress:</p>
        <div className="flex justify-center gap-3">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTextTwitter)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm text-white transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            Share on X
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://wiki.ai-engineering.at/en/learning-path')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm text-white transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>
            Share on LinkedIn
          </a>
        </div>
        <a
          href="https://github.com/AI-Engineerings-at/wiki"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-400 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          Star on GitHub
        </a>
      </div>
    )
  }

  if (percent === 75) {
    return (
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-5 space-y-4">
        <div className="text-center">
          <div className="text-2xl">{'\u{1F4AC}'}</div>
          <h4 className="text-lg font-bold text-white mt-1">Almost there!</h4>
          <p className="text-sm text-slate-400">Leave a comment for other learners:</p>
        </div>
        {!commentSubmitted ? (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Your name (optional)"
              value={commentName}
              onChange={e => setCommentName(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4262FF]"
            />
            <textarea
              placeholder="What did you like about the learning path? What can we improve?"
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              rows={3}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4262FF] resize-none"
            />
            <button
              onClick={() => {
                if (commentText.trim()) {
                  onAddComment(commentName.trim() || 'Anonymous', commentText.trim())
                  setCommentSubmitted(true)
                }
              }}
              disabled={!commentText.trim()}
              className="bg-[#4262FF] hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Submit comment
            </button>
          </div>
        ) : (
          <p className="text-sm text-emerald-400 text-center">Thanks for your comment!</p>
        )}
      </div>
    )
  }

  if (percent === 100) {
    const currentRating = state.rating[pathId] || 0

    return (
      <div className="text-center p-6 bg-slate-900 rounded-xl border border-green-500/20 space-y-5">
        <div className="text-4xl">{'\u{1F389}'}</div>
        <h3 className="text-xl font-bold text-white mb-2">All stages completed!</h3>
        <p className="text-slate-400 mb-4">You have the fundamentals for your local AI stack down.</p>

        {/* Star Rating */}
        <div className="space-y-2 pt-2">
          <p className="text-sm text-slate-300">Rate this learning path:</p>
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
            <p className="text-xs text-slate-500">Thanks for your rating!</p>
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
          Star on GitHub {'\u{2B50}'}
        </a>

        <p className="text-slate-500 text-sm">Continue reading:</p>
        <div className="flex flex-wrap justify-center gap-3 mt-3">
          <a href="/en/patterns/agent-orchestration-patterns" className="text-blue-400 hover:text-blue-300 text-sm">Agent Orchestration</a>
          <a href="/en/security/self-hosted-sicherheit" className="text-blue-400 hover:text-blue-300 text-sm">Security Hardening</a>
          <a href="/en/compliance/eu-ai-act" className="text-blue-400 hover:text-blue-300 text-sm">EU AI Act</a>
        </div>
        <p className="mt-4 italic text-slate-700 text-xs">
          For implementation support, find <a href="https://www.ai-engineering.at" className="underline" target="_blank" rel="noopener noreferrer">resources</a> at ai-engineering.at.
        </p>
      </div>
    )
  }

  return null
}

function CommentSection({ comments, state }: {
  comments: { name: string; text: string; date: string }[]
  state: LearningPathState
}) {
  const userComments = state.comments || []
  const allComments = [...userComments, ...comments].slice(0, 5)

  if (allComments.length === 0) return null

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-slate-300">What other learners say:</p>
      <p className="text-xs text-slate-600 italic">
        Note: The following comments without dates are examples for illustration purposes, not real user reviews.
      </p>
      {allComments.map((c, i) => (
        <div key={i} className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3">
          <p className="text-sm text-slate-300 italic">&quot;{c.text}&quot;</p>
          <p className="text-xs text-slate-500 mt-1">— {c.name}</p>
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
  state: LearningPathState
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

  const milestones = [25, 50, 75, 100]
  const passedMilestones = milestones.filter(m => progressPercent >= m)
  const currentStageIndex = path.stages.findIndex(s => !completedList.includes(s.href))

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">Progress</span>
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
        <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-slate-800" />

        <div className="space-y-0">
          {path.stages.map((stage, index) => {
            const isCompleted = completedList.includes(stage.href)
            const quizKey = `${path.id}:${index}`
            const quizPassed = state.quizResults[quizKey] === true
            const isCurrent = index === currentStageIndex
            const isLocked = !isCompleted && !isCurrent
            const stageNumber = index + 1

            const showFeedback = (index + 1) % 2 === 0 && isCompleted
            const stagesForMilestone = (percent: number) => Math.ceil((percent / 100) * totalStages)
            const milestoneAfterThis = milestones.find(m => stagesForMilestone(m) === index + 1 && passedMilestones.includes(m))

            return (
              <div key={stage.href}>
                <div className={`relative pl-10 py-3 ${isLocked ? 'opacity-50' : ''}`}>
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
                            {isCompleted && <span className="text-xs text-emerald-400">completed</span>}
                            {isCurrent && <span className="text-xs text-[#4262FF] font-medium">current</span>}
                            {isLocked && <span className="text-xs text-slate-600">locked</span>}
                          </div>
                          <h4 className={`text-sm font-semibold mt-1 ${isCompleted ? 'text-slate-400' : 'text-white'}`}>
                            {stage.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-0.5">{stage.description}</p>
                        </div>
                      </div>

                      {isCurrent && (
                        <div className="mt-4 space-y-4">
                          <Link
                            href={stage.href}
                            className="flex items-center gap-2 bg-[#4262FF]/10 border border-[#4262FF]/30 rounded-lg px-4 py-3 text-sm text-[#4262FF] hover:bg-[#4262FF]/20 transition-colors"
                          >
                            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            Read article: {stage.title}
                          </Link>

                          <MiniQuizWidget
                            quiz={stage.quiz}
                            quizKey={quizKey}
                            passed={quizPassed}
                            onPass={onQuizPass}
                          />

                          {quizPassed && !isCompleted && (
                            <button
                              onClick={() => onCompleteStage(path.id, stage.href)}
                              className="w-full bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 text-sm font-medium px-4 py-3 rounded-lg transition-colors"
                            >
                              Complete stage &#10003;
                            </button>
                          )}
                        </div>
                      )}

                      {isCompleted && (
                        <div className="mt-2">
                          <Link
                            href={stage.href}
                            className="text-xs text-slate-500 hover:text-[#4262FF] transition-colors"
                          >
                            Read article again &rarr;
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {showFeedback && (
                  <div className="pl-10 py-2">
                    <FeedbackWidget
                      feedbackKey={`${path.id}:feedback:${index}`}
                      currentFeedback={state.feedback[`${path.id}:feedback:${index}`]}
                      onFeedback={onFeedback}
                    />
                  </div>
                )}

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
                Recommended
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

export default function LearningPathPage() {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [currentQ, setCurrentQ] = useState(0)
  const [recommended, setRecommended] = useState<PathId | null>(null)
  const [selectedPath, setSelectedPath] = useState<PathId | null>(null)
  const [showAllPaths, setShowAllPaths] = useState(false)

  const {
    state, loaded,
    completeStage, setQuizResult, setFeedback, setRating, addComment, dismissNewsletter,
  } = useLearningPathState()

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
        <div className="text-slate-500 text-sm">Loading learning path...</div>
      </div>
    )
  }

  return (
    <div className="space-y-10 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <p className="text-sm text-[#4262FF] font-semibold uppercase tracking-wide mb-2">
          Learning Path
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Your Path into Local AI
        </h1>
        <p className="text-lg text-slate-400 mt-3 max-w-xl mx-auto">
          {!recommended
            ? '3 questions — then we show you exactly the articles YOU need. No guessing, no wandering around.'
            : 'Work through your personal learning path stage by stage. Read the article, pass the quiz, move forward.'}
        </p>
      </div>

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
            Question {currentQ + 1} of {introQuestions.length}
          </p>
          <IntroQuizCard
            question={introQuestions[currentQ].question}
            options={introQuestions[currentQ].options}
            selected={answers[introQuestions[currentQ].id]}
            onSelect={key => handleIntroSelect(introQuestions[currentQ].id, key)}
          />
        </div>
      )}

      {recommended && (
        <>
          <div className="bg-gradient-to-r from-[#4262FF]/10 to-blue-600/5 border border-[#4262FF]/40 rounded-xl p-5 text-center">
            <p className="text-sm text-[#4262FF] font-semibold mb-1">Your recommended path</p>
            <p className="text-xl font-bold text-white">
              {paths.find(p => p.id === recommended)?.icon} {paths.find(p => p.id === recommended)?.title}
            </p>
            <button
              onClick={resetQuiz}
              className="text-xs text-slate-500 hover:text-slate-400 mt-2 underline"
            >
              Retake quiz
            </button>
          </div>

          <div>
            <button
              onClick={() => setShowAllPaths(!showAllPaths)}
              className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors mb-3"
            >
              <span className={`transition-transform text-xs ${showAllPaths ? 'rotate-180' : ''}`}>&#9660;</span>
              {showAllPaths ? 'Hide paths' : 'Show all 5 paths'}
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
              <h2 className="text-sm font-semibold text-white">All 5 Paths at a Glance</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-slate-400 uppercase tracking-wide">
                    <th className="p-2 pl-4 font-medium"></th>
                    <th className="p-2 font-medium">{'\u{1F3E2}'} Exec.</th>
                    <th className="p-2 font-medium">{'\u{1F6E0}\u{FE0F}'} IT</th>
                    <th className="p-2 font-medium">{'\u{1F4BB}'} Dev</th>
                    <th className="p-2 font-medium">{'\u{2696}\u{FE0F}'} Compl.</th>
                    <th className="p-2 pr-4 font-medium">{'\u{1F331}'} Begin.</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-t border-slate-800">
                    <td className="p-2 pl-4 text-slate-400 font-medium">Technical?</td>
                    <td className="p-2">No</td>
                    <td className="p-2">Medium</td>
                    <td className="p-2">High</td>
                    <td className="p-2">No</td>
                    <td className="p-2 pr-4">No</td>
                  </tr>
                  <tr className="border-t border-slate-800">
                    <td className="p-2 pl-4 text-slate-400 font-medium">Duration</td>
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
                    <td className="p-2 pl-4 text-slate-400 font-medium">Outcome</td>
                    <td className="p-2">Decisions</td>
                    <td className="p-2">Run stack</td>
                    <td className="p-2">Build apps</td>
                    <td className="p-2">Compliance</td>
                    <td className="p-2 pr-4">Basics</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {activePath && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl">{activePath.icon}</span>
                <div>
                  <h2 className="text-lg font-bold text-white">{activePath.title}</h2>
                  <p className="text-xs text-slate-500">{activePath.duration} &middot; {activePath.stages.length} Stages &middot; Technical: {activePath.technical}</p>
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
        <h2 className="text-2xl font-bold text-white mb-3">What next?</h2>
        <p className="text-slate-400 max-w-lg mx-auto mb-6">
          You have the foundation. Now dive deeper — Patterns, Security, Compliance.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/en/patterns/" className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">Explore Patterns</a>
          <a href="/en/security/" className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">Deepen Security</a>
        </div>
        <p className="mt-6 italic text-slate-700 text-xs">
          For implementation support, find <a href="https://www.ai-engineering.at" className="underline" target="_blank" rel="noopener noreferrer">resources</a> at ai-engineering.at.
        </p>
      </section>
    </div>
  )
}
