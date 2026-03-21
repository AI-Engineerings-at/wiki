import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Proxmox Setup | AI Engineering Wiki',
  description: 'Virtualization with Proxmox VE. VMs, containers, cluster.',
}

export default function ProxmoxSetupPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Proxmox Setup</h1>
        <p className="text-slate-400 mt-2">Tools · 6 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-slate-300">
          Proxmox VE is an open-source virtualization platform. Perfect for running your AI stack.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Why Proxmox?</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Open Source - free</li>
          <li>KVM + LXC virtualization</li>
          <li>Web-based management</li>
          <li>Cluster support</li>
          <li>Backup & snapshot features</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Installation</h2>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`# Download ISO from proxmox.com
# Boot from USB
# Follow installation wizard
# Access via https://your-ip:8006`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">AI Stack Resources</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 text-slate-400">VM</th>
              <th className="text-left py-2 text-slate-400">CPU</th>
              <th className="text-left py-2 text-slate-400">RAM</th>
              <th className="text-left py-2 text-slate-400">Disk</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            <tr className="border-b border-slate-800">
              <td className="py-2">Ollama (GPU)</td>
              <td className="py-2">8 cores</td>
              <td className="py-2">32GB</td>
              <td className="py-2">100GB</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2">n8n</td>
              <td className="py-2">4 cores</td>
              <td className="py-2">8GB</td>
              <td className="py-2">50GB</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2">PostgreSQL</td>
              <td className="py-2">4 cores</td>
              <td className="py-2">16GB</td>
              <td className="py-2">100GB</td>
            </tr>
            <tr>
              <td className="py-2">Monitoring</td>
              <td className="py-2">2 cores</td>
              <td className="py-2">4GB</td>
              <td className="py-2">50GB</td>
            </tr>
          </tbody>
        </table>

        <h2 className="text-xl font-semibold text-white mt-8">GPU Passthrough</h2>
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-sm text-slate-300">{`# /etc/modprobe.d/blacklist.conf
blacklist nvidia
blacklist nvidia_uvm

# /etc/modules
nvidia
nvidia_uvm

# In VM config:
hostpci0: 01:00,pcie=1`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Cluster Setup</h2>
        <ul className="list-disc list-inside text-slate-300 space-y-1">
          <li>Minimum 3 nodes for quorum</li>
          <li>Shared storage (NFS or Ceph)</li>
          <li>Network: 10Gbps recommended</li>
          <li>Use Proxmox VE Cluster</li>
        </ul>
      </div>
    </div>
  )
}
