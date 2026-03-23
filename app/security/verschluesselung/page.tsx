import { Metadata } from "next"
import Image from "next/image"
import Callout from "../../../components/Callout"
import KeyTakeaway from "../../../components/KeyTakeaway"
import ComparisonTable from "../../../components/ComparisonTable"

import { RelatedArticles } from "../../../components/RelatedArticles"

export const metadata: Metadata = {
  title: "Verschlüsselung: At Rest, In Transit, In Use | AI Engineering Wiki",
  description:
    "Verschlüsselung für Self-Hosted AI: Daten auf der Festplatte, im Netzwerk und während der Verarbeitung schützen. LUKS, TLS, Confidential Computing erklärt.",
}

export default function VerschlüsselungPage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Security</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Verschlüsselung: At Rest, In Transit, In Use
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          Daten müssen in drei Zuständen geschützt werden: gespeichert,
          übertragen und während der Verarbeitung. Hier ist was das
          praktisch bedeutet.
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm text-white/40">
          <span>Lesezeit: 12 min</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Zuletzt aktualisiert: März 2026</span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            Verschlüsselung schützt Daten in drei Phasen: <strong>At Rest</strong>{" "}
            (auf Festplatte/SSD), <strong>In Transit</strong> (im Netzwerk),{" "}
            <strong>In Use</strong> (während der Verarbeitung im RAM). Für einen
            self-hosted AI-Stack sind die ersten beiden Pflicht, die dritte ist
            ein Bonus für Hochsicherheits-Szenarien.
          </p>
        </Callout>

        <figure className="my-8">
          <img src="/images/infographics/security-encryption.png" alt="Verschlüsselung — At Rest, In Transit, End-to-End" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Verschlüsselung: Data at Rest, Data in Transit, End-to-End</figcaption>
        </figure>

        {/* Section 1: Überblick */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Die drei Verschlüsselungs-Schichten
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Wenn du Daten nur auf der Festplatte verschlüsselst aber
            unverschlüsselt übers Netzwerk schickst, hast du eine Lücke.
            Verschlüsselung muss alle drei Zustände abdecken.
          </p>

          <div className="my-6">
            <Image
              src="/images/infographics/security-encryption.png"
              alt="Drei Verschlüsselungs-Schichten: At Rest, In Transit, In Use"
              width={800}
              height={450}
              className="rounded-xl border border-white/10"
            />
            <p className="text-sm text-white/40 mt-2 text-center">
              Daten durchlaufen drei Zustände — jeder braucht eigenen Schutz.
            </p>
          </div>

          <ComparisonTable
            headers={["Phase", "Was", "Bedrohung", "Schutz"]}
            rows={[
              ["At Rest", "Daten auf Festplatte/SSD", "Diebstahl der Hardware, Zugriff auf Dateisystem", "LUKS, dm-crypt, Veracrypt"],
              ["In Transit", "Daten im Netzwerk", "Man-in-the-Middle, Abhören", "TLS 1.3, WireGuard VPN, SSH Tunnel"],
              ["In Use", "Daten im RAM während Verarbeitung", "Memory Dumps, Cold Boot Attacks", "Confidential Computing, Intel SGX, AMD SEV"],
            ]}
          />
        </section>

        {/* Section 2: At Rest */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Encryption At Rest: Festplatten-Verschlüsselung
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            At-Rest-Verschlüsselung schützt deine Daten wenn jemand physisch
            an die Festplatte kommt — Einbruch, Entsorgung, Reparatur. Ohne
            Verschlüsselung kann jeder die Platte in einen anderen Rechner
            stecken und alles lesen.
          </p>

          <h3 className="text-xl font-bold text-white mt-6 mb-3">
            LUKS (Linux Unified Key Setup)
          </h3>
          <p className="text-white/70 leading-relaxed mb-4">
            LUKS ist der Standard für Festplatten-Verschlüsselung unter Linux.
            Die meisten Linux-Distributionen bieten LUKS-Verschlüsselung
            während der Installation an.
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6">
            <p className="text-white font-medium mb-3">Existierende Partition verschlüsseln</p>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`# ACHTUNG: Backup VORHER erstellen!

# Partition verschlüsseln (alle Daten werden gelöscht!)
sudo cryptsetup luksFormat /dev/sdb1

# Partition öffnen
sudo cryptsetup luksOpen /dev/sdb1 encrypted-data

# Dateisystem erstellen
sudo mkfs.ext4 /dev/mapper/encrypted-data

# Mounten
sudo mount /dev/mapper/encrypted-data /mnt/secure-data`}</code>
            </pre>
          </div>

          <Callout type="warning" title="Performance-Impact">
            <p>
              LUKS-Verschlüsselung hat auf modernen CPUs mit AES-NI
              Unterstützung nur ca. 1-3% Performance-Overhead bei
              sequentiellem Lesen/Schreiben. Bei zufälligem I/O (Datenbanken)
              kann der Overhead 5-10% betragen. Für AI-Workloads wo die GPU
              der Bottleneck ist, spürst du den Unterschied nicht.
            </p>
          </Callout>

          <ComparisonTable
            headers={["Was verschlüsseln", "Priorität", "Begründung"]}
            rows={[
              ["Backup-Volumes", "PFLICHT", "Backups enthalten alles — Datenbanken, Configs, Secrets"],
              ["Datenbank-Volumes", "HOCH", "Kundendaten, Credentials, AI-Trainingsdaten"],
              ["System-Partition", "MITTEL", "Schützt Configs und Logs bei Diebstahl"],
              ["Swap-Partition", "HOCH", "RAM-Inhalte werden auf Disk geschrieben (Secrets!)"],
              ["Modell-Storage", "NIEDRIG", "Modelle sind öffentlich, aber deine Fine-Tunes nicht"],
            ]}
          />
        </section>

        {/* Section 3: In Transit */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Encryption In Transit: Netzwerk-Verschlüsselung
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Jede Verbindung zwischen deinen Services und zum Internet muss
            verschlüsselt sein. Auch in deinem lokalen Netzwerk — Netzwerke
            werden kompromittiert, und ARP Spoofing im LAN ist trivial.
          </p>

          <ComparisonTable
            headers={["Verbindungstyp", "Verschlüsselung", "Konfiguration"]}
            rows={[
              ["Web-Traffic (extern)", "TLS 1.3 (HTTPS)", "Let's Encrypt oder Cloudflare (automatisch)"],
              ["Remote-Zugriff", "WireGuard VPN", "Peer-to-Peer, <1ms Overhead, UDP-basiert"],
              ["Server-to-Server", "SSH Tunnel", "ssh -L 5432:localhost:5432 user@db-server"],
              ["API-Aufrufe (intern)", "mTLS oder SSH Tunnel", "Service Mesh oder manuelle Tunnel"],
              ["Docker Swarm Overlay", "IPSec (automatisch)", "docker network create --opt encrypted"],
            ]}
          />

          <Callout type="info" title="Ollama API verschlüsseln">
            <p>
              Ollama lauscht standardmäßig auf{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                http://localhost:11434
              </code>{" "}
              — unverschlüsselt. Wenn andere Rechner im Netzwerk darauf
              zugreifen, läuft der gesamte Prompt-Traffic im Klartext. Lösung:
              Reverse Proxy mit TLS davor oder SSH Tunnel.
            </p>
          </Callout>

          <Callout type="tip" title="WireGuard statt OpenVPN">
            <p>
              WireGuard ist schneller, einfacher und sicherer als OpenVPN. Die
              Konfiguration passt in 10 Zeilen. Unter Linux:{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                sudo apt install wireguard
              </code>
              . Netbird (netbird.io) bietet eine verwaltete WireGuard-Lösung
              für Zero-Trust Netzwerke.
            </p>
          </Callout>
        </section>

        {/* Section 4: In Use */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Encryption In Use: RAM-Schutz
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Während ein LLM deine Daten verarbeitet, liegen sie unverschlüsselt
            im RAM. Ein Angreifer mit Root-Zugriff kann den Speicher auslesen
            und Prompts, Antworten und Modell-Gewichte extrahieren.
          </p>

          <ComparisonTable
            headers={["Technologie", "Verfügbarkeit", "Schutz", "Overhead"]}
            rows={[
              ["Intel SGX", "Xeon (Server-CPUs)", "Enclaves im RAM", "5-30%"],
              ["AMD SEV-SNP", "EPYC (Server-CPUs)", "Verschlüsselter VM-Speicher", "~2%"],
              ["ARM CCA", "ARMv9+", "Realms (isolierte Bereiche)", "Gering"],
              ["Software-Lösungen", "Überall", "Memory Scrubbing, ASLR", "Minimal"],
            ]}
          />

          <Callout type="info" title="Für die meisten Homelabs irrelevant">
            <p>
              Confidential Computing (Intel SGX, AMD SEV) ist primär für
              Cloud-Szenarien relevant, wo du dem Hoster nicht vertraust. In
              deinem eigenen Homelab kontrollierst du die Hardware selbst. Die
              praktischeren Maßnahmen: Swap verschlüsseln (verhindert RAM-
              Auslagerung im Klartext), Bildschirmsperre aktivieren (verhindert
              physischen Zugriff), und keine unnötigen Root-Sessions offen
              lassen.
            </p>
          </Callout>
        </section>

        {/* Section 5: Checkliste */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Verschlüsselungs-Checkliste für Self-Hosted AI
          </h2>

          <ComparisonTable
            headers={["Maßnahme", "Priorität", "Status-Check"]}
            rows={[
              ["LUKS auf Backup-Volumes", "PFLICHT", "lsblk -o NAME,TYPE,FSTYPE | grep crypt"],
              ["Swap verschlüsselt", "PFLICHT", "swapon --show + /etc/crypttab"],
              ["TLS für alle Web-Services", "PFLICHT", "curl -vI https://dein-service.local"],
              ["SSH Key-Only (kein Passwort)", "PFLICHT", "grep PasswordAuth /etc/ssh/sshd_config"],
              ["WireGuard für Remote-Zugriff", "HOCH", "wg show"],
              ["Docker Overlay verschlüsselt", "HOCH", "docker network inspect --format '{{.Options}}'"],
              ["Ollama hinter Reverse Proxy", "HOCH", "curl -I https://ollama.local"],
              ["Datenbank-Verbindungen TLS", "MITTEL", "psql 'sslmode=require'"],
            ]}
          />
        </section>

        {/* Section 6: DSGVO */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Verschlüsselung und DSGVO
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Die DSGVO verlangt &quot;angemessene technische Maßnahmen&quot; zum
            Schutz personenbezogener Daten (Art. 32). Verschlüsselung wird
            explizit als Beispiel genannt. Ohne Verschlüsselung riskierst du
            bei einem Data Breach deutlich höhere Strafen.
          </p>

          <Callout type="warning" title="Verschlüsselung reduziert Meldepflicht">
            <p>
              Art. 34 DSGVO: Wenn personenbezogene Daten verschlüsselt waren
              und der Key nicht kompromittiert wurde, entfällt die Pflicht zur
              Benachrichtigung der Betroffenen bei einem Data Breach. Das ist ein
              starker Anreiz, Verschlüsselung überall einzusetzen.
            </p>
          </Callout>

          <Callout type="tip" title="Weiter vertiefen">
            <p>
              Mehr zum Thema Datenschutz für AI-Anwendungen findest du in
              unserem{" "}
              <a
                href="/compliance/dsgvo-grundlagen"
                className="text-blue-400 hover:underline"
              >
                DSGVO Grundlagen
              </a>{" "}
              Artikel und im{" "}
              <a
                href="/compliance/datenschutz-praxis"
                className="text-blue-400 hover:underline"
              >
                Datenschutz Praxis
              </a>{" "}
              Artikel.
            </p>
          </Callout>
        </section>

        <figure className="my-8">
          <img src="/images/diagrams/datenschutz-verschluesselung.png" alt="Verschlüsselung im Überblick" className="rounded-xl border border-white/10 w-full" />
          <figcaption className="text-center text-white/40 text-sm mt-2">Verschlüsselung im Überblick</figcaption>
        </figure>

        {/* Key Takeaway */}
        <KeyTakeaway
          points={[
            "Drei Verschlüsselungs-Phasen: At Rest (Festplatte), In Transit (Netzwerk), In Use (RAM). Die ersten zwei sind Pflicht.",
            "LUKS für Festplatten, TLS 1.3 für Web-Traffic, WireGuard für Remote-Zugriff. Alles Standard-Tools, kein Spezialwissen nötig.",
            "Swap-Partition verschlüsseln! Sonst landen RAM-Inhalte (Prompts, API Keys) im Klartext auf der Platte.",
            "DSGVO Art. 32 nennt Verschlüsselung explizit. Verschlüsselte Daten reduzieren Meldepflicht bei Breaches (Art. 34).",
            "Ollama-API läuft unverschlüsselt — Reverse Proxy mit TLS oder SSH Tunnel davorsetzen.",
          ]}
        />

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li>
              <a href="https://gitlab.com/cryptsetup/cryptsetup" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                LUKS / cryptsetup
              </a>{" "}
              — Linux Disk Encryption Standard
            </li>
            <li>
              <a href="https://www.wireguard.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                WireGuard
              </a>{" "}
              — Modernes VPN-Protokoll
            </li>
            <li>
              <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                DSGVO Art. 32, 34
              </a>{" "}
              — Sicherheit der Verarbeitung, Benachrichtigung bei Datenschutzverletzungen
            </li>
            <li>
              <a href="https://confidentialcomputing.io/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Confidential Computing Consortium
              </a>{" "}
              — Encryption In Use Standards
            </li>
          </ul>
        </section>

        <RelatedArticles />
      </div>
    </div>
  )
}
