import { CodeBlock } from '../../../../components/CodeBlock'
import { Metadata } from 'next'
import { alternatesFor } from '../../../../lib/alternates'
import { ArticleHero } from '../../../../components/ArticleHero'

export const metadata: Metadata = {
  openGraph: {
    type: 'article',
    images: [{ url: '/images/hero-2026-08/en/security/firewall-setup.webp', width: 1344, height: 768, type: 'image/webp' }],
  },
  alternates: alternatesFor('/en/security/firewall-setup'),
  title: 'Firewall Setup',
  description: 'UFW, fail2ban, network segmentation for local AI infrastructure.',
}

export default function FirewallSetupPage() {
  return (
    <div className="space-y-8">
      <ArticleHero src="/images/hero-2026-08/en/security/firewall-setup.webp" alt={'Firewall Setup'} />
      <div>
        <h1 className="text-3xl font-bold text-white">Firewall Setup</h1>
        <p className="text-slate-400 mt-2">Security · 5 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-slate-300">
          A firewall is your first line of defense. Heres how to secure your AI stack.
        </p>

        <figure className="my-8">
          <img src="/images/diagrams/security-netzwerk.png" alt="UFW Basics — illustration from the German article" className="rounded-xl border border-white/10 w-full" loading="lazy" />
        </figure>
        <h2 className="text-xl font-semibold text-white mt-8">UFW Basics</h2>
        <CodeBlock lang="en">
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`# Install UFW
sudo apt install ufw

# Enable
sudo ufw enable

# Default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH (rate limited)
sudo ufw limit 22/tcp

# Allow HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Check status
sudo ufw status verbose`}</code>
        </pre>
        </CodeBlock>

        <h2 className="text-xl font-semibold text-white mt-8">Docker + UFW</h2>
        <CodeBlock lang="en">
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`# Edit /etc/docker/daemon.json
{
  "iptables": false
}

# Then UFW will manage Docker containers`}</code>
        </pre>
        </CodeBlock>

        <h2 className="text-xl font-semibold text-white mt-8">Fail2Ban</h2>
        <CodeBlock lang="en">
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`# Install
sudo apt install fail2ban

# Copy config
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# Edit /etc/fail2ban/jail.local
[sshd]
enabled = true
port = ssh
filter = sshd
maxretry = 3
bantime = 1h

# Restart
sudo systemctl restart fail2ban`}</code>
        </pre>
        </CodeBlock>

        <h2 className="text-xl font-semibold text-white mt-8">Network Segmentation</h2>
        <div className="table-wrap">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 text-slate-400">Zone</th>
              <th className="text-left py-2 text-slate-400">Services</th>
              <th className="text-left py-2 text-slate-400">Access</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            <tr className="border-b border-slate-800">
              <td className="py-2">DMZ</td>
              <td className="py-2">Traefik</td>
              <td className="py-2">Public</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2">Internal</td>
              <td className="py-2">n8n, Ollama</td>
              <td className="py-2">VPN only</td>
            </tr>
            <tr>
              <td className="py-2">Database</td>
              <td className="py-2">PostgreSQL</td>
              <td className="py-2">Internal only</td>
            </tr>
          </tbody>
        </table>
        </div>

        <figure className="my-8">
          <img src="/images/diagrams/security-layers.png" alt="Checklist — illustration from the German article" className="rounded-xl border border-white/10 w-full" loading="lazy" />
        </figure>
        <h2 className="text-xl font-semibold text-white mt-8">Checklist</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>UFW enabled and configured</li>
          <li>SSH rate-limited</li>
          <li>Fail2Ban installed</li>
          <li>Unnecessary ports closed</li>
          <li>Docker network isolated</li>
        </ul>
      </div>
    </div>
  )
}
