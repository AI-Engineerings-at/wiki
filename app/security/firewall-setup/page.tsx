import Callout from "../../../components/Callout"
import PlantUMLDiagram from "../../../components/PlantUMLDynamic"

export const metadata = {
  title: 'Firewall Setup | AI Engineering Wiki',
  description:
    'Firewall-Setup für lokale AI-Infrastruktur: UFW, fail2ban, Netzwerk-Segmentation und Ports für Ollama, n8n, Grafana und Team-Chat.',
}

export default function FirewallSetup() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Firewall & Netzwerksegmentierung</h1>
        <p className="text-gray-400 mt-2">Security · 6 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            Nur nötige Ports öffnen, Services segmentieren, SSH nur mit Key-Auth.
            UFW als Firewall, Fail2ban gegen Brute-Force, Traefik als Reverse Proxy.
            Interne Services (Prometheus, Docker API) niemals direkt von außen
            erreichbar machen.
          </p>
        </Callout>

        <figure className="my-8">
          <img src="/images/diagrams/security-netzwerk.png" alt="Netzwerk-Segmentation für lokale AI-Infrastruktur" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Netzwerk-Segmentation: DMZ, internes Netz, AI-Stack isoliert</figcaption>
        </figure>

        <p className="text-lg text-gray-300">
          Netzwerksicherheit ist die erste Verteidigungslinie. Ohne Firewall und
          Segmentierung ist ein kompromittierter Service der Einstieg für alles andere.
        </p>

        <PlantUMLDiagram
          diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam rectangleBorderColor #334155
skinparam rectangleBackgroundColor #0F172A

title Netzwerk-Sicherheitsschichten

rectangle "Internet" as inet #8B0000

rectangle "Äußere Verteidigung" as outer #1E3A5F {
  rectangle "UFW Firewall\\n(Port-Filterung)" as ufw #0F172A
  rectangle "Fail2ban\\n(Brute-Force-Schutz)" as f2b #0F172A
}

rectangle "Reverse Proxy" as proxy #4a4a00 {
  rectangle "Traefik\\n(TLS, Routing, Rate Limiting)" as traefik #0F172A
}

rectangle "Internes Netzwerk" as internal #22543d {
  rectangle "Public Network" as pub #0F172A
  rectangle "Internal Network\\n(kein Internet-Zugang)" as priv #0F172A
}

rectangle "Services" as services #1E3A5F {
  rectangle "Ollama\\n(nur intern)" as oll #0F172A
  rectangle "Grafana\\n(via Traefik)" as graf #0F172A
  rectangle "PostgreSQL\\n(nur intern)" as pg #0F172A
  rectangle "Prometheus\\n(nur intern)" as prom #0F172A
}

inet --> outer : nur Port 80, 443
outer --> proxy
proxy --> pub
pub --> services
priv --> services
@enduml`}
          caption="Sicherheitsschichten: Internet → Firewall → Reverse Proxy → Netzwerksegmentierung → Services"
        />

        <h2 className="text-xl font-semibold text-white mt-8">Grundprinzipien</h2>

        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
          <li><strong>Minimal:</strong> Nur nötige Ports öffnen</li>
          <li><strong>Segmentierung:</strong> Services trennen</li>
          <li><strong>Auth:</strong> Kein Zugang ohne Login</li>
          <li><strong>Logging:</strong> Alles protokollieren</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Port-Bereiche</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Bereich</th>
                <th className="text-left py-2 text-gray-400">Ports</th>
                <th className="text-left py-2 text-gray-400">Nutzung</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">SSH</td>
                <td className="py-2">22</td>
                <td className="py-2">Nur intern</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">HTTP/S</td>
                <td className="py-2">80, 443</td>
                <td className="py-2">Öffentlich</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Docker</td>
                <td className="py-2">2375, 2376</td>
                <td className="py-2">Nur intern</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Swarm</td>
                <td className="py-2">2377, 7946</td>
                <td className="py-2">Cluster</td>
              </tr>
              <tr>
                <td className="py-2">Prometheus</td>
                <td className="py-2">9090</td>
                <td className="py-2">Nur intern</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Docker Network</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Eigenes Netzwerk erstellen
docker network create --driver overlay ai-network

# Service in Netzwerk
services:
  ollama:
    networks:
      - ai-network

# Nur interne Services
networks:
  internal:
    driver: overlay
    internal: true

# Mehrere Netzwerke
services:
  nginx:
    networks:
      - public    # Internet
      - internal  # Backend
  database:
    networks:
      - internal  # Nur Backend`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">UFW Regeln (Ubuntu)</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# UFW aktivieren
ufw enable
ufw default deny incoming
ufw default allow outgoing

# SSH einschränken - nur internes Netzwerk
ufw allow from 10.0.0.0/8 to any port 22
ufw allow from 192.168.1.0/24 to any port 22

# HTTP/S öffnen
ufw allow 80/tcp
ufw allow 443/tcp

# Docker Swarm
ufw allow 2377/tcp
ufw allow 7946/tcp
ufw allow 7946/udp

# Logging
ufw logging low
ufw status verbose

# Alle Regeln anzeigen
ufw status numbered`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Traefik als Reverse Proxy</h2>

        <p className="text-gray-300">
          Alle Services hinter Traefik verstecken:
        </p>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# docker-compose.yml für Traefik
services:
  traefik:
    image: traefik:v3.0
    ports:
      - "80:80"
      - "443:443"
      - "8080:8080"  # Dashboard
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./traefik.yml:/etc/traefik/traefik.yml:ro
      - ./certs:/certs
    networks:
      - internal

  whoami:
    image: traefik/whoami
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.whoami.rule=Host(\`whoami.local\`)"
      - "traefik.http.routers.whoami.entrypoints=websecure"
      - "traefik.http.routers.whoami.tls=true"
    networks:
      - internal`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Best Practices</h2>

        <ol className="list-decimal list-inside text-gray-300 space-y-2 mt-4">
          <li>Alle Services hinter Reverse Proxy (Traefik, Nginx)</li>
          <li>• <strong>Interne Services NICHT direkt</strong> von außen erreichbar</li>
          <li>• <strong>SSH nur mit Key</strong>, kein Password</li>
          <li>• <strong>Fail2ban für brute-force Schutz</strong></li>
          <li>• <strong>Regelmäßig Ports scannen</strong></li>
        </ol>

        <h2 className="text-xl font-semibold text-white mt-8">Fail2ban Konfiguration</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# /etc/fail2ban/jail.local
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true
port = 22
filter = sshd
logpath = /var/log/auth.log

[nginx-http-auth]
enabled = true
port = http,https
filter = nginx-http-auth
logpath = /var/log/nginx/error.log

# Fail2ban neustarten
sudo fail2ban-client reload

# Status prüfen
sudo fail2ban-client status`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Port-Scan regelmäßig</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# nmap Installation
sudo apt install nmap

# Offene Ports scannen
nmap -sT -p- 192.168.1.100

# Nur wichtige Ports
nmap -sT -p 22,80,443,3000,8080,9090 192.168.1.100

# Von außen testen (online tools)
# https://www.shodan.io/
# https://www.grc.com/`}</code>
        </pre>

        <Callout type="warning" title="Docker und UFW">
          <p>
            Docker manipuliert iptables direkt und umgeht UFW-Regeln. Ports die
            in docker-compose.yml mit ports: exponiert werden, sind trotz UFW
            von außen erreichbar. Lösung: Ports nur auf 127.0.0.1 binden
            (z.B. 127.0.0.1:9090:9090) oder Docker-interne Netzwerke nutzen.
          </p>
        </Callout>

        <figure className="my-8">
          <img src="/images/diagrams/security-layers.png" alt="Security Layers — Mehrschichtige Absicherung" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Defense in Depth: Firewall, Fail2ban, Docker Network, Application Security</figcaption>
        </figure>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Zusammenfassung</h3>
          <p className="text-gray-300">
            Firewall ist Pflicht. So wenig wie möglich öffnen, alles andere
            über VPN oder Proxy.
          </p>
        </div>

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://help.ubuntu.com/community/UFW" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Ubuntu Wiki: UFW</a> — Uncomplicated Firewall Dokumentation</li>
            <li><a href="https://github.com/fail2ban/fail2ban" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GitHub: fail2ban</a> — Brute-Force-Schutz</li>
            <li><a href="https://doc.traefik.io/traefik/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Traefik Dokumentation</a> — Reverse Proxy und TLS</li>
            <li><a href="https://docs.docker.com/engine/network/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Docker Docs: Networking</a> — Overlay Networks und Segmentierung</li>
          </ul>
        </section>
      </div>
    </div>
  )
}