import { Metadata } from "next"
import Image from "next/image"
import Callout from "../../../components/Callout"
import KeyTakeaway from "../../../components/KeyTakeaway"
import ComparisonTable from "../../../components/ComparisonTable"

import { RelatedArticles } from "../../../components/RelatedArticles"

export const metadata: Metadata = {
  title: "Self-Hosted Sicherheit: Das 6-Layer Modell | AI Engineering Wiki",
  description:
    "6 Sicherheitsebenen für selbst gehostete AI-Infrastruktur: Netzwerk, SSH, Firewall, Container, Anwendung, Monitoring. Praxisnahe Anleitung.",
}

export default function SelfHostedSicherheitPage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Security</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Self-Hosted Sicherheit: Das 6-Layer Modell
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          Wenn du AI-Services selbst hostest, bist du für die Sicherheit
          verantwortlich. Kein Cloud-Anbieter fängt Fehler für dich ab. Hier
          sind die 6 Schichten, die deine Infrastruktur schuetzen.
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm text-white/40">
          <span>Lesezeit: 15 min</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Zuletzt aktualisiert: März 2026</span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            Self-Hosting bedeutet volle Kontrolle — aber auch volle
            Verantwortung. Sicherheit ist kein einzelnes Feature sondern ein
            Schichtenmodell: 6 Layer von der physischen Infrastruktur bis zum
            Monitoring. Jede Schicht hält etwas anderes auf. Keine alleine
            reicht.
          </p>
        </Callout>

        {/* Section 1: Das 6-Layer Modell */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Die 6 Sicherheitsschichten
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Jede Schicht adressiert eine andere Angriffsfläche. Wenn Layer 1
            versagt, muss Layer 2 greifen. Das ist Defense in Depth.
          </p>

          <div className="my-6">
            <Image
              src="/images/diagrams/security-layers.png"
              alt="6-Layer Security Modell"
              width={800}
              height={500}
              className="rounded-xl border border-white/10"
            />
            <p className="text-sm text-white/40 mt-2 text-center">
              Sicherheit in Schichten: Jede Ebene schuetzt gegen andere
              Angriffsvektoren.
            </p>
          </div>

          <ComparisonTable
            headers={["Layer", "Schuetzt gegen", "Werkzeuge"]}
            rows={[
              ["1. Netzwerk", "Unbefugter Zugriff von aussen", "Firewall (UFW/iptables), VLAN, VPN"],
              ["2. SSH & Authentifizierung", "Brute Force, schwache Passwörter", "SSH Key-Only, fail2ban, 2FA"],
              ["3. Host-Betriebssystem", "Veraltete Software, Kernel-Exploits", "Unattended Upgrades, CIS Benchmark"],
              ["4. Container & Services", "Privilege Escalation, ungesicherte APIs", "Rootless Container, Read-Only FS, Secrets"],
              ["5. Anwendung", "Prompt Injection, Data Leakage", "Input Validation, Output Sanitizer, Rate Limits"],
              ["6. Monitoring & Response", "Unbemerkte Einbrüche", "Loki, Grafana Alerts, Audit Logs"],
            ]}
          />
        </section>

        {/* Section 2: Layer 1 - Netzwerk */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Layer 1: Netzwerk-Segmentierung
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Dein lokaler AI-Stack sollte NICHT direkt aus dem Internet
            erreichbar sein. Die wichtigste Regel: Default Deny — alles ist
            gesperrt, du öffnest gezielt was nötig ist.
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6">
            <p className="text-white font-medium mb-3">UFW Grundkonfiguration</p>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`# Alles sperren (Default Deny)
sudo ufw default deny incoming
sudo ufw default allow outgoing

# SSH erlauben (nur aus lokalem Netz)
sudo ufw allow from 10.40.10.0/24 to any port 22

# Reverse Proxy (HTTPS)
sudo ufw allow 443/tcp

# Firewall aktivieren
sudo ufw enable
sudo ufw status verbose`}</code>
            </pre>
          </div>

          <Callout type="warning" title="Ports NICHT öffentlich freigeben">
            <p>
              Services wie Ollama (11434), n8n (5678), Grafana (3000),
              PostgreSQL (5432) gehören NICHT ins Internet. Wenn du externen
              Zugriff brauchst: VPN oder Reverse Proxy mit Authentifizierung
              (z.B. Cloudflare Tunnel oder Traefik mit BasicAuth).
            </p>
          </Callout>

          <Callout type="tip" title="VLAN für Isolation">
            <p>
              Wenn dein Router VLANs unterstützt, trenne dein AI-Lab vom
              restlichen Netzwerk. AI-Server in VLAN 10, IoT in VLAN 20,
              reguläre Geräte in VLAN 1. So kann ein kompromittiertes
              IoT-Gerät nicht auf deine AI-Infrastruktur zugreifen.
            </p>
          </Callout>
        </section>

        {/* Section 3: Layer 2 - SSH */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Layer 2: SSH &amp; Authentifizierung
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            SSH ist der Hauptzugang zu deinen Servern. Falsch konfiguriert
            ist es das größte Einfallstor.
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6">
            <p className="text-white font-medium mb-3">SSH härten (/etc/ssh/sshd_config)</p>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`# Passwort-Login deaktivieren
PasswordAuthentication no

# Root-Login verbieten (oder nur mit Key)
PermitRootLogin prohibit-password

# Nur bestimmte User erlauben
AllowUsers joe admin

# Leerlauf-Timeout (5 Minuten)
ClientAliveInterval 300
ClientAliveCountMax 0

# Neustart: sudo systemctl restart sshd`}</code>
            </pre>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6">
            <p className="text-white font-medium mb-3">fail2ban installieren</p>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`# Installation
sudo apt install fail2ban

# SSH Jail aktivieren
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# In jail.local:
# [sshd]
# enabled = true
# maxretry = 3
# bantime = 3600

sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Status prüfen
sudo fail2ban-client status sshd`}</code>
            </pre>
          </div>

          <Callout type="info" title="SSH Keys generieren">
            <p>
              Wenn du noch keine SSH Keys hast:{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                ssh-keygen -t ed25519 -C &quot;dein@email.at&quot;
              </code>
              . Den Public Key auf den Server kopieren:{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                ssh-copy-id user@server
              </code>
              . Danach Passwort-Login deaktivieren.
            </p>
          </Callout>
        </section>

        {/* Section 4: Layer 3+4 - Host + Container */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Layer 3 &amp; 4: Host &amp; Container absichern
          </h2>

          <h3 className="text-xl font-bold text-white mt-6 mb-3">
            Host-System
          </h3>
          <ComparisonTable
            headers={["Massnahme", "Befehl / Konfiguration", "Warum"]}
            rows={[
              ["Auto-Updates", "sudo apt install unattended-upgrades", "Sicherheits-Patches automatisch einspielen"],
              ["Nicht-root User", "sudo adduser deploy && sudo usermod -aG docker deploy", "Minimale Rechte, kein permanenter root"],
              ["Kernel-Updates", "sudo apt upgrade linux-generic", "Kernel-Exploits schliessen"],
              ["Unnötige Services", "sudo systemctl disable bluetooth cups", "Angriffsfläche reduzieren"],
            ]}
          />

          <h3 className="text-xl font-bold text-white mt-8 mb-3">
            Container-Sicherheit
          </h3>
          <ComparisonTable
            headers={["Prinzip", "Umsetzung", "Beispiel"]}
            rows={[
              ["Read-Only Root", "read_only: true in compose", "Verhindert Dateisystem-Manipulation"],
              ["Kein Root im Container", "user: '1000:1000' in compose", "Container läuft als normaler User"],
              ["Secrets Management", "Docker Secrets oder Vault", "Keine Credentials in Umgebungsvariablen"],
              ["Resource Limits", "mem_limit: 4g, cpus: '2.0'", "Container kann nicht den Host überlasten"],
              ["Network Isolation", "Eigene Docker-Netzwerke pro Stack", "Services sehen nur was sie müssen"],
            ]}
          />

          <Callout type="warning" title="Swagger/Docs in Produktion">
            <p>
              Viele Frameworks (FastAPI, Express) liefern automatisch API-
              Dokumentation unter /docs oder /swagger. In Produktion: deaktivieren
              mit{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                docs_url=None
              </code>
              . Angreifer nutzen diese Endpunkte um deine API-Struktur zu
              verstehen.
            </p>
          </Callout>
        </section>

        {/* Section 5: Layer 5 - Anwendung */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Layer 5: Anwendungssicherheit für AI
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            AI-Anwendungen haben eigene Sicherheitsrisiken. LLMs können
            manipuliert werden (Prompt Injection) und sensible Daten in ihren
            Antworten leaken.
          </p>

          <ComparisonTable
            headers={["Risiko", "Beschreibung", "Gegenmassnahme"]}
            rows={[
              ["Prompt Injection", "Nutzer manipuliert LLM-Anweisungen", "System Prompt Isolation, Input Validation"],
              ["Data Leakage", "LLM gibt Environment Variables oder Secrets aus", "Output Sanitizer (PFLICHT)"],
              ["Token Theft", "API Keys werden abgefangen", "Vault, Token Rotation, Rate Limiting"],
              ["Model Poisoning", "Manipulierte Modelle von unsicheren Quellen", "Nur offizielle Quellen (ollama.com, HuggingFace verified)"],
              ["Resource Exhaustion", "Überlange Prompts/Kontexte", "Max Token Limits, Request Timeouts"],
            ]}
          />

          <Callout type="warning" title="Output Sanitizer ist Pflicht">
            <p>
              LLMs können dazu gebracht werden, Umgebungsvariablen, API Keys
              oder System-Informationen auszugeben. JEDE Antwort muss durch
              einen Sanitizer laufen, der Patterns wie API Keys, IP-Adressen,
              und Dateipfade erkennt und entfernt. Das ist keine
              Nice-to-have-Funktion, sondern absolute Pflicht für
              Produktion.
            </p>
          </Callout>
        </section>

        {/* Section 6: Layer 6 - Monitoring */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Layer 6: Monitoring &amp; Incident Response
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Sicherheit ohne Monitoring ist blind. Du musst wissen was auf
            deinen Systemen passiert — in Echtzeit.
          </p>

          <ComparisonTable
            headers={["Was überwachen", "Tool", "Alert-Bedingung"]}
            rows={[
              ["SSH Login-Versuche", "fail2ban + Grafana", "Mehr als 5 fehlgeschlagene Logins/Stunde"],
              ["Container Health", "Docker Health Checks + Uptime Kuma", "Container unhealthy oder gestoppt"],
              ["Disk-Auslastung", "Prometheus Node Exporter", "Disk > 85% voll"],
              ["API-Fehler", "Loki Log Queries", "HTTP 5xx Rate > 1% der Requests"],
              ["Unerwartete Prozesse", "Audit Logs (auditd)", "Neuer Prozess von unbekanntem User"],
            ]}
          />

          <Callout type="tip" title="Security-Dashboard in Grafana">
            <p>
              Erstelle ein dediziertes Security-Dashboard mit fail2ban-Bans,
              SSH-Logins, API-Fehlerraten und Disk-Nutzung auf einen Blick. So
              siehst du in 5 Sekunden ob etwas nicht stimmt. Unser{" "}
              <a
                href="https://www.ai-engineering.at"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Grafana Homelab Dashboard Pack
              </a>{" "}
              enthält vorgefertigte Security-Panels.
            </p>
          </Callout>
        </section>

        {/* Key Takeaway */}
        <KeyTakeaway
          points={[
            "Sicherheit ist ein Schichtenmodell. 6 Layer, jede hält etwas anderes auf. Keine alleine reicht.",
            "Default Deny bei der Firewall. Nur öffnen was gebraucht wird. AI-Ports NICHT ins Internet.",
            "SSH Key-Only + fail2ban. Kein Passwort-Login, automatische Sperre nach 3 Fehlversuchen.",
            "Output Sanitizer ist Pflicht für AI-Anwendungen. LLMs leaken sonst Secrets und System-Infos.",
            "Monitoring mit Alerting. Ohne Monitoring weisst du nicht, ob jemand schon drin ist.",
          ]}
        />

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li>
              <a href="https://www.cisecurity.org/cis-benchmarks" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                CIS Benchmarks
              </a>{" "}
              — Industriestandard für Betriebssystem-Härtung
            </li>
            <li>
              <a href="https://docs.docker.com/engine/security/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Docker Security Documentation
              </a>{" "}
              — Container-Sicherheit Best Practices
            </li>
            <li>
              <a href="https://owasp.org/www-project-top-ten/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                OWASP Top 10
              </a>{" "}
              — Die häufigsten Sicherheitsrisiken in Webanwendungen
            </li>
            <li>
              <a href="https://www.fail2ban.org/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                fail2ban
              </a>{" "}
              — Brute-Force-Schutz für SSH und andere Services
            </li>
          </ul>
        </section>

        <RelatedArticles />
      </div>
    </div>
  )
}
