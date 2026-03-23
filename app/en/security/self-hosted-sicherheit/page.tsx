import { Metadata } from "next"
import Image from "next/image"
import Callout from "../../../../components/Callout"
import KeyTakeaway from "../../../../components/KeyTakeaway"
import ComparisonTable from "../../../../components/ComparisonTable"

import { RelatedArticles } from "../../../../components/RelatedArticles"

export const metadata: Metadata = {
  title: "Self-Hosted Security: The 6-Layer Model | AI Engineering Wiki",
  description:
    "6 security layers for self-hosted AI infrastructure: network, SSH, firewall, containers, application, monitoring. Practical hands-on guide.",
}

export default function SelfHostedSecurityPage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Security</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Self-Hosted Security: The 6-Layer Model
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          When you host AI services yourself, you are responsible for security.
          No cloud provider catches mistakes for you. Here are the 6 layers that
          protect your infrastructure.
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm text-white/40">
          <span>Reading time: 15 min</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Last updated: March 2026</span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="At a Glance">
          <p>
            Self-hosting means full control — but also full responsibility.
            Security is not a single feature but a layered model: 6 layers from
            physical infrastructure to monitoring. Each layer stops something
            different. None is sufficient on its own.
          </p>
        </Callout>

        {/* Section 1: The 6-Layer Model */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            The 6 Security Layers
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Each layer addresses a different attack surface. If Layer 1 fails,
            Layer 2 must hold. This is Defense in Depth.
          </p>

          <div className="my-6">
            <Image
              src="/images/diagrams/security-layers.png"
              alt="6-Layer Security Model"
              width={800}
              height={500}
              className="rounded-xl border border-white/10"
            />
            <p className="text-sm text-white/40 mt-2 text-center">
              Security in layers: Each level protects against different attack
              vectors.
            </p>
          </div>

          <ComparisonTable
            headers={["Layer", "Protects Against", "Tools"]}
            rows={[
              ["1. Network", "Unauthorized external access", "Firewall (UFW/iptables), VLAN, VPN"],
              ["2. SSH & Authentication", "Brute force, weak passwords", "SSH Key-Only, fail2ban, 2FA"],
              ["3. Host Operating System", "Outdated software, kernel exploits", "Unattended Upgrades, CIS Benchmark"],
              ["4. Containers & Services", "Privilege escalation, unsecured APIs", "Rootless containers, read-only FS, secrets"],
              ["5. Application", "Prompt injection, data leakage", "Input validation, output sanitizer, rate limits"],
              ["6. Monitoring & Response", "Undetected intrusions", "Loki, Grafana Alerts, audit logs"],
            ]}
          />
        </section>

        {/* Section 2: Layer 1 - Network */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Layer 1: Network Segmentation
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Your local AI stack should NOT be directly reachable from the
            internet. The most important rule: Default Deny — everything is
            blocked, you only open what is needed.
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6">
            <p className="text-white font-medium mb-3">UFW Basic Configuration</p>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`# Block everything (Default Deny)
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH (only from local network)
sudo ufw allow from 10.40.10.0/24 to any port 22

# Reverse Proxy (HTTPS)
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable
sudo ufw status verbose`}</code>
            </pre>
          </div>

          <Callout type="warning" title="Do NOT expose ports publicly">
            <p>
              Services like Ollama (11434), n8n (5678), Grafana (3000),
              PostgreSQL (5432) do NOT belong on the internet. If you need
              external access: VPN or reverse proxy with authentication (e.g.,
              Cloudflare Tunnel or Traefik with BasicAuth).
            </p>
          </Callout>
        </section>

        {/* Section 3: Layer 2 - SSH */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Layer 2: SSH &amp; Authentication
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            SSH is the main access point to your servers. Misconfigured, it
            becomes the biggest attack vector.
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6">
            <p className="text-white font-medium mb-3">Hardening SSH (/etc/ssh/sshd_config)</p>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`# Disable password login
PasswordAuthentication no

# Prohibit root login (or key-only)
PermitRootLogin prohibit-password

# Allow specific users only
AllowUsers joe admin

# Idle timeout (5 minutes)
ClientAliveInterval 300
ClientAliveCountMax 0

# Restart: sudo systemctl restart sshd`}</code>
            </pre>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6">
            <p className="text-white font-medium mb-3">Install fail2ban</p>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`# Installation
sudo apt install fail2ban

# Enable SSH jail
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# In jail.local:
# [sshd]
# enabled = true
# maxretry = 3
# bantime = 3600

sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Check status
sudo fail2ban-client status sshd`}</code>
            </pre>
          </div>

          <Callout type="info" title="Generate SSH Keys">
            <p>
              If you do not have SSH keys yet:{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                ssh-keygen -t ed25519 -C &quot;your@email.at&quot;
              </code>
              . Copy the public key to the server:{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                ssh-copy-id user@server
              </code>
              . Then disable password login.
            </p>
          </Callout>
        </section>

        {/* Section 4: Layer 3+4 - Host + Container */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Layer 3 &amp; 4: Host &amp; Container Security
          </h2>

          <h3 className="text-xl font-bold text-white mt-6 mb-3">
            Host System
          </h3>
          <ComparisonTable
            headers={["Measure", "Command / Configuration", "Why"]}
            rows={[
              ["Auto-Updates", "sudo apt install unattended-upgrades", "Automatically apply security patches"],
              ["Non-root User", "sudo adduser deploy && sudo usermod -aG docker deploy", "Minimal privileges, no permanent root"],
              ["Kernel Updates", "sudo apt upgrade linux-generic", "Close kernel exploits"],
              ["Unnecessary Services", "sudo systemctl disable bluetooth cups", "Reduce attack surface"],
            ]}
          />

          <h3 className="text-xl font-bold text-white mt-8 mb-3">
            Container Security
          </h3>
          <ComparisonTable
            headers={["Principle", "Implementation", "Example"]}
            rows={[
              ["Read-Only Root", "read_only: true in compose", "Prevents filesystem manipulation"],
              ["No Root in Container", "user: '1000:1000' in compose", "Container runs as normal user"],
              ["Secrets Management", "Docker Secrets or Vault", "No credentials in environment variables"],
              ["Resource Limits", "mem_limit: 4g, cpus: '2.0'", "Container cannot overwhelm the host"],
              ["Network Isolation", "Dedicated Docker networks per stack", "Services only see what they need"],
            ]}
          />

          <Callout type="warning" title="Swagger/Docs in Production">
            <p>
              Many frameworks (FastAPI, Express) serve API documentation at
              /docs or /swagger automatically. In production: disable with{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                docs_url=None
              </code>
              . Attackers use these endpoints to map your API structure.
            </p>
          </Callout>
        </section>

        {/* Section 5: Layer 5 - Application */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Layer 5: Application Security for AI
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            AI applications have unique security risks. LLMs can be manipulated
            (prompt injection) and leak sensitive data in their responses.
          </p>

          <ComparisonTable
            headers={["Risk", "Description", "Countermeasure"]}
            rows={[
              ["Prompt Injection", "User manipulates LLM instructions", "System prompt isolation, input validation"],
              ["Data Leakage", "LLM outputs environment variables or secrets", "Output Sanitizer (MANDATORY)"],
              ["Token Theft", "API keys intercepted", "Vault, token rotation, rate limiting"],
              ["Model Poisoning", "Manipulated models from insecure sources", "Only official sources (ollama.com, HuggingFace verified)"],
              ["Resource Exhaustion", "Excessively long prompts/contexts", "Max token limits, request timeouts"],
            ]}
          />

          <Callout type="warning" title="Output Sanitizer is Mandatory">
            <p>
              LLMs can be tricked into outputting environment variables, API
              keys, or system information. EVERY response must pass through a
              sanitizer that detects and removes patterns like API keys, IP
              addresses, and file paths. This is not a nice-to-have — it is
              mandatory for production.
            </p>
          </Callout>
        </section>

        {/* Section 6: Layer 6 - Monitoring */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Layer 6: Monitoring &amp; Incident Response
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Security without monitoring is blind. You need to know what happens
            on your systems — in real time.
          </p>

          <ComparisonTable
            headers={["What to Monitor", "Tool", "Alert Condition"]}
            rows={[
              ["SSH Login Attempts", "fail2ban + Grafana", "More than 5 failed logins/hour"],
              ["Container Health", "Docker Health Checks + Uptime Kuma", "Container unhealthy or stopped"],
              ["Disk Usage", "Prometheus Node Exporter", "Disk > 85% full"],
              ["API Errors", "Loki Log Queries", "HTTP 5xx rate > 1% of requests"],
              ["Unexpected Processes", "Audit Logs (auditd)", "New process from unknown user"],
            ]}
          />

          <Callout type="tip" title="Security Dashboard in Grafana">
            <p>
              Create a dedicated security dashboard with fail2ban bans, SSH
              logins, API error rates, and disk usage at a glance. You can see
              in 5 seconds if something is off. Our{" "}
              <a
                href="/en/tools/grafana-monitoring"
                className="text-blue-400 hover:underline"
              >
                Grafana Monitoring Guide
              </a>{" "}
              covers setting up security panels.
            </p>
          </Callout>
        </section>

        {/* Key Takeaway */}
        <KeyTakeaway
          points={[
            "Security is a layered model. 6 layers, each stops something different. None is sufficient alone.",
            "Default Deny at the firewall. Only open what is needed. AI ports do NOT belong on the internet.",
            "SSH Key-Only + fail2ban. No password login, automatic ban after 3 failed attempts.",
            "Output Sanitizer is mandatory for AI applications. LLMs will leak secrets and system info otherwise.",
            "Monitoring with alerting. Without monitoring, you will not know if someone is already inside.",
          ]}
        />

        {/* Sources */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Sources</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li>
              <a href="https://www.cisecurity.org/cis-benchmarks" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                CIS Benchmarks
              </a>{" "}
              — Industry standard for OS hardening
            </li>
            <li>
              <a href="https://docs.docker.com/engine/security/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Docker Security Documentation
              </a>{" "}
              — Container security best practices
            </li>
            <li>
              <a href="https://owasp.org/www-project-top-ten/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                OWASP Top 10
              </a>{" "}
              — Most common web application security risks
            </li>
            <li>
              <a href="https://github.com/fail2ban/fail2ban" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                fail2ban
              </a>{" "}
              — Brute force protection for SSH and other services
            </li>
          </ul>
        </section>

        <RelatedArticles />
      </div>
    </div>
  )
}
