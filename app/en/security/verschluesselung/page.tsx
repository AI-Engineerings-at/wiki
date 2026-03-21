import { Metadata } from "next"
import Image from "next/image"
import Callout from "../../../../components/Callout"
import KeyTakeaway from "../../../../components/KeyTakeaway"
import ComparisonTable from "../../../../components/ComparisonTable"

import { RelatedArticles } from "../../../../components/RelatedArticles"

export const metadata: Metadata = {
  title: "Encryption: At Rest, In Transit, In Use | AI Engineering Wiki",
  description:
    "Encryption for self-hosted AI: Protect data on disk, on the network, and during processing. LUKS, TLS, Confidential Computing explained.",
}

export default function EncryptionPage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-sm text-blue-400 font-medium mb-2">Security</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Encryption: At Rest, In Transit, In Use
        </h1>
        <p className="text-lg text-white/60 mt-3 max-w-2xl">
          Data must be protected in three states: stored, transmitted, and during
          processing. Here is what that means in practice.
        </p>
        <div className="flex items-center gap-4 mt-4 text-sm text-white/40">
          <span>Reading time: 12 min</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Last updated: March 2026</span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="At a Glance">
          <p>
            Encryption protects data in three phases: <strong>At Rest</strong>{" "}
            (on disk/SSD), <strong>In Transit</strong> (on the network),{" "}
            <strong>In Use</strong> (during processing in RAM). For a self-hosted
            AI stack, the first two are mandatory, the third is a bonus for
            high-security scenarios.
          </p>
        </Callout>

        {/* Section 1: Overview */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            The Three Encryption Layers
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            If you encrypt data on disk but send it unencrypted over the
            network, you have a gap. Encryption must cover all three states.
          </p>

          <div className="my-6">
            <Image
              src="/images/infographics/security-encryption.png"
              alt="Three Encryption Layers: At Rest, In Transit, In Use"
              width={800}
              height={450}
              className="rounded-xl border border-white/10"
            />
            <p className="text-sm text-white/40 mt-2 text-center">
              Data passes through three states — each needs its own protection.
            </p>
          </div>

          <ComparisonTable
            headers={["Phase", "What", "Threat", "Protection"]}
            rows={[
              ["At Rest", "Data on disk/SSD", "Hardware theft, filesystem access", "LUKS, dm-crypt, Veracrypt"],
              ["In Transit", "Data on the network", "Man-in-the-Middle, eavesdropping", "TLS 1.3, WireGuard VPN, SSH Tunnel"],
              ["In Use", "Data in RAM during processing", "Memory dumps, cold boot attacks", "Confidential Computing, Intel SGX, AMD SEV"],
            ]}
          />
        </section>

        {/* Section 2: At Rest */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Encryption At Rest: Disk Encryption
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            At-rest encryption protects your data when someone physically
            accesses the disk — theft, disposal, repair. Without encryption,
            anyone can plug the drive into another machine and read everything.
          </p>

          <h3 className="text-xl font-bold text-white mt-6 mb-3">
            LUKS (Linux Unified Key Setup)
          </h3>
          <p className="text-white/70 leading-relaxed mb-4">
            LUKS is the standard for disk encryption on Linux. Most Linux
            distributions offer LUKS encryption during installation.
          </p>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 my-6">
            <p className="text-white font-medium mb-3">Encrypt an existing partition</p>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-green-400">{`# CAUTION: Create backup FIRST!

# Encrypt partition (all data will be erased!)
sudo cryptsetup luksFormat /dev/sdb1

# Open partition
sudo cryptsetup luksOpen /dev/sdb1 encrypted-data

# Create filesystem
sudo mkfs.ext4 /dev/mapper/encrypted-data

# Mount
sudo mount /dev/mapper/encrypted-data /mnt/secure-data`}</code>
            </pre>
          </div>

          <Callout type="warning" title="Performance Impact">
            <p>
              LUKS encryption on modern CPUs with AES-NI support has only about
              1-3% performance overhead for sequential reads/writes. For random
              I/O (databases), overhead can be 5-10%. For AI workloads where the
              GPU is the bottleneck, you will not notice the difference.
            </p>
          </Callout>

          <ComparisonTable
            headers={["What to Encrypt", "Priority", "Reason"]}
            rows={[
              ["Backup Volumes", "MANDATORY", "Backups contain everything — databases, configs, secrets"],
              ["Database Volumes", "HIGH", "Customer data, credentials, AI training data"],
              ["System Partition", "MEDIUM", "Protects configs and logs if stolen"],
              ["Swap Partition", "HIGH", "RAM contents written to disk (secrets!)"],
              ["Model Storage", "LOW", "Models are public, but your fine-tunes are not"],
            ]}
          />
        </section>

        {/* Section 3: In Transit */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Encryption In Transit: Network Encryption
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Every connection between your services and to the internet must be
            encrypted. Even on your local network — networks get compromised,
            and ARP spoofing on a LAN is trivial.
          </p>

          <ComparisonTable
            headers={["Connection Type", "Encryption", "Configuration"]}
            rows={[
              ["Web Traffic (external)", "TLS 1.3 (HTTPS)", "Let's Encrypt or Cloudflare (automatic)"],
              ["Remote Access", "WireGuard VPN", "Peer-to-peer, <1ms overhead, UDP-based"],
              ["Server-to-Server", "SSH Tunnel", "ssh -L 5432:localhost:5432 user@db-server"],
              ["Internal API Calls", "mTLS or SSH Tunnel", "Service mesh or manual tunnels"],
              ["Docker Swarm Overlay", "IPSec (automatic)", "docker network create --opt encrypted"],
            ]}
          />

          <Callout type="info" title="Encrypt Ollama API">
            <p>
              Ollama listens on{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                http://localhost:11434
              </code>{" "}
              by default — unencrypted. When other machines on the network access
              it, all prompt traffic flows in plaintext. Solution: reverse proxy
              with TLS in front, or SSH tunnel.
            </p>
          </Callout>

          <Callout type="tip" title="WireGuard over OpenVPN">
            <p>
              WireGuard is faster, simpler, and more secure than OpenVPN. The
              configuration fits in 10 lines. On Linux:{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/90">
                sudo apt install wireguard
              </code>
              . Netbird (netbird.io) offers a managed WireGuard solution for
              zero-trust networks.
            </p>
          </Callout>
        </section>

        {/* Section 4: In Use */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Encryption In Use: RAM Protection
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            While an LLM processes your data, it sits unencrypted in RAM. An
            attacker with root access can read memory and extract prompts,
            responses, and model weights.
          </p>

          <ComparisonTable
            headers={["Technology", "Availability", "Protection", "Overhead"]}
            rows={[
              ["Intel SGX", "Xeon (server CPUs)", "Enclaves in RAM", "5-30%"],
              ["AMD SEV-SNP", "EPYC (server CPUs)", "Encrypted VM memory", "~2%"],
              ["ARM CCA", "ARMv9+", "Realms (isolated regions)", "Low"],
              ["Software Solutions", "Everywhere", "Memory scrubbing, ASLR", "Minimal"],
            ]}
          />

          <Callout type="info" title="Irrelevant for most homelabs">
            <p>
              Confidential Computing (Intel SGX, AMD SEV) is primarily relevant
              for cloud scenarios where you do not trust the hoster. In your own
              homelab, you control the hardware. The practical measures: encrypt
              swap (prevents plaintext RAM paging), enable screen lock (prevents
              physical access), and do not leave unnecessary root sessions open.
            </p>
          </Callout>
        </section>

        {/* Section 5: Checklist */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Encryption Checklist for Self-Hosted AI
          </h2>

          <ComparisonTable
            headers={["Measure", "Priority", "Status Check"]}
            rows={[
              ["LUKS on backup volumes", "MANDATORY", "lsblk -o NAME,TYPE,FSTYPE | grep crypt"],
              ["Swap encrypted", "MANDATORY", "swapon --show + /etc/crypttab"],
              ["TLS for all web services", "MANDATORY", "curl -vI https://your-service.local"],
              ["SSH Key-Only (no password)", "MANDATORY", "grep PasswordAuth /etc/ssh/sshd_config"],
              ["WireGuard for remote access", "HIGH", "wg show"],
              ["Docker overlay encrypted", "HIGH", "docker network inspect --format '{{.Options}}'"],
              ["Ollama behind reverse proxy", "HIGH", "curl -I https://ollama.local"],
              ["Database connections TLS", "MEDIUM", "psql 'sslmode=require'"],
            ]}
          />
        </section>

        {/* Section 6: GDPR */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Encryption and GDPR
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            The GDPR requires &quot;appropriate technical measures&quot; to
            protect personal data (Art. 32). Encryption is explicitly mentioned
            as an example. Without encryption, you risk significantly higher
            penalties in case of a data breach.
          </p>

          <Callout type="warning" title="Encryption reduces notification obligation">
            <p>
              GDPR Art. 34: If personal data was encrypted and the key was not
              compromised, the obligation to notify affected individuals in case
              of a data breach is waived. This is a strong incentive to deploy
              encryption everywhere.
            </p>
          </Callout>

          <Callout type="tip" title="Learn more">
            <p>
              More about data protection for AI applications in our{" "}
              <a
                href="/en/compliance/dsgvo-grundlagen"
                className="text-blue-400 hover:underline"
              >
                GDPR Basics
              </a>{" "}
              article and the{" "}
              <a
                href="https://www.ai-engineering.at"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                GDPR Compliance Bundle
              </a>
              .
            </p>
          </Callout>
        </section>

        {/* Key Takeaway */}
        <KeyTakeaway
          points={[
            "Three encryption phases: At Rest (disk), In Transit (network), In Use (RAM). The first two are mandatory.",
            "LUKS for disks, TLS 1.3 for web traffic, WireGuard for remote access. All standard tools, no specialist knowledge needed.",
            "Encrypt the swap partition! Otherwise RAM contents (prompts, API keys) end up in plaintext on disk.",
            "GDPR Art. 32 explicitly mentions encryption. Encrypted data reduces notification obligations for breaches (Art. 34).",
            "Ollama API runs unencrypted — put a reverse proxy with TLS or SSH tunnel in front.",
          ]}
        />

        {/* Sources */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Sources</h2>
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
              — Modern VPN Protocol
            </li>
            <li>
              <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                GDPR Art. 32, 34
              </a>{" "}
              — Security of processing, notification of data breaches
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
