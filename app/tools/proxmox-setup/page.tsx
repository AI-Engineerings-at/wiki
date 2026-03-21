import Callout from "../../../components/Callout"

export const metadata = {
  title: 'Proxmox Setup | AI Engineering Wiki',
  description:
    'Proxmox VE im Homelab: Installation, VMs/LXC, GPU-Passthrough für Ollama, Backups und CLI-Befehle. Basis für deinen lokalen AI-Stack.',
}

export default function ProxmoxSetup() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Proxmox: Homelab Virtualisierung</h1>
        <p className="text-gray-400 mt-2">Tools · 7 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            Proxmox VE ist eine Open-Source Virtualisierungsplattform für dein
            Homelab. KVM-VMs und LXC-Container auf eigener Hardware, Web-Interface,
            Cluster-faehig. GPU-Passthrough für Ollama moeglich. Keine Lizenzkosten.
          </p>
        </Callout>

        <p className="text-lg text-gray-300">
          Proxmox VE ist eine Open-Source Virtualisierungsplattform. Du kannst VMs und Container auf deiner Hardware betreiben — ideal für einen Homelab-Server.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Warum Proxmox?</h2>

        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
          <li>• <strong>Open Source</strong> — keine Lizenzkosten</li>
          <li>• <strong>Web-Interface</strong> — alles im Browser</li>
          <li>• <strong>KVM + LXC</strong> — VMs und Container</li>
          <li>• <strong>Cluster-Fähigkeit</strong> — mehrere Hosts</li>
          <li>• <strong>Snapshots</strong> — einfaches Backup</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Installation</h2>

        <ol className="list-decimal list-inside text-gray-300 space-y-2 mt-4">
          <li>• <strong>ISO herunterladen</strong> von proxmox.com</li>
          <li>• <strong>USB bootbar machen</strong> (Rufus, Etcher)</li>
          <li>• <strong>Von USB booten</strong>, Installation starten</li>
          <li>• <strong>Festplatte wählen</strong> (wird komplett überschrieben)</li>
          <li>• <strong>IP-Adresse vergeben</strong>, Web-Interface aufrufen</li>
        </ol>

        <p className="text-gray-300 mt-4">
          Nach der Installation erreichst du das Web-Interface unter <code>https://deine-ip:8006</code>. 
          Der Standard-User ist "root" mit deinem Linux-root-Passwort.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8">Begriffe</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Begriff</th>
                <th className="text-left py-2 text-gray-400">Erklärung</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">PVE</td>
                <td className="py-2">Proxmox Virtual Environment</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">VM</td>
                <td className="py-2">Virtuelle Maschine — vollständiges OS</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">LXC</td>
                <td className="py-2">Linux Container — leichtgewichtig</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Cluster</td>
                <td className="py-2">Gruppe von PVE-Hosts</td>
              </tr>
              <tr>
                <td className="py-2">Storage</td>
                <td className="py-2">Festplatten-Logik (LVM, ZFS)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Unser Setup</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Hardware
- CPU: Intel Xeon 6-Core
- RAM: 32GB ECC
- SSD: 500GB (OS)
- HDD: 4TB (Data)

# VMs
- pve (Management)
- docker-swarm1 (8GB RAM, 4 CPU)
- docker-swarm2 (8GB RAM, 4 CPU)  
- docker-swarm3 (16GB RAM, 4 CPU, GPU)

# LXC Container
- monitoring (Prometheus, Grafana)
- vault (Credentials)`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">GPU-Passthrough</h2>

        <p className="text-gray-300">
          Wichtig für Ollama: Die GPU muss an eine VM durchgereicht werden:
        </p>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# /etc/modprobe.d/blacklist.conf
blacklist nvidia
blacklist nvidia_uvm
blacklist nvidia_modeset

# /etc/modprobe.d/vfio.conf
options vfio-pci ids=10de:2204,10de:1aef

# /etc/kernel/kernel.conf - IOMMU aktivieren
GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on iommu=pt"`}</code>
        </pre>

        <p className="text-gray-300 mt-3">
          Nach dem Konfigurieren im Web-Interface:
        </p>
        <ol className="list-decimal list-inside text-gray-300 space-y-2 mt-2">
          <li>• <strong>Hardware → PCI Device</strong> → GPU auswählen</li>
          <li>• <strong>"Alle Funktionen" und "Primary GPU"</strong> aktivieren</li>
          <li>• <strong>VM neu starten</strong></li>
          <li>• <strong>Mit lspci | grep -i nvidia verifizieren</strong></li>
        </ol>

        <h2 className="text-xl font-semibold text-white mt-8">Backup-Strategie</h2>

        <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
          <li>• <strong>Proxmox Backup Server (PBS)</strong> — spezialisiert</li>
          <li>• <strong>Snapshots vor Änderungen</strong></li>
          <li>• <strong>Wöchentliche Full-Backups</strong></li>
          <li>• <strong>Monatliche Offsite-Backups</strong></li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-8">Nützliche CLI-Befehle</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# VM starten
qm start 100

# VM stoppen (graceful)
qm stop 100

# VM stoppen (hard)
qm stop 100 --forceStop true

# VM-Status
qm status 100

# Console öffnen
qm terminal 100
# Beenden: Strg + Q

# Snapshot erstellen
qm snapshot 100 backup-2026-03-01

# Snapshot wiederherstellen
qm rollback 100 backup-2026-03-01

# Alle Snapshots anzeigen
qm listsnapshot 100

# Container starten
pct start 101

# Container Status
pct status 101

# Ressourcen anzeigen
pvesm status

# VM Liste
qm list

# Container Liste
pct list`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Storage Konfiguration</h2>

        <p className="text-gray-300 mb-4">
          So richtest du zusätzlichen Storage ein:
        </p>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# LVM Thin Pool erstellen
lvcreate -L 2T -n data-thinpool vg00
lvconvert --type thin-pool vg00/data-thinpool

# Im Web-Interface:
# Datacenter → Storage → Hinzufügen → LVM-Thin

# Oder für ZFS:
# Datacenter → Storage → Hinzufügen → ZFS`}</code>
        </pre>
        <h2 className="text-xl font-semibold text-white mt-8">Networking</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# Bridge erstellen (vmbr1)
# Im Web-Interface: Node → Network → Create → Linux Bridge
# bridge-ports: eno1 (deine Netzwerkkarte)
# bridge-vids: 10;20;30

# VLANs:
# vmbr0.10 → VLAN 10 (Management)
# vmbr0.20 → VLAN 20 (Docker)
# vmbr0.30 → VLAN 30 (Gäste)`}</code>
        </pre>

        <Callout type="warning" title="GPU-Passthrough">
          <p>
            Für GPU-Passthrough muss IOMMU im BIOS aktiviert sein und die
            GPU-Treiber auf dem Host geblockt werden. Ohne vfio-pci Konfiguration
            kann die GPU nicht an eine VM durchgereicht werden. Teste immer mit
            lspci | grep -i nvidia in der VM.
          </p>
        </Callout>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Zusammenfassung</h3>
          <p className="text-gray-300">
            Proxmox ist die Basis für unseren Homelab. VMs isolieren Services,
            LXC-Container sind leichtgewichtig für simple Aufgaben.
          </p>
        </div>

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://www.proxmox.com/en/proxmox-virtual-environment/overview" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Proxmox VE — Offizielle Website</a></li>
            <li><a href="https://pve.proxmox.com/wiki/Main_Page" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Proxmox VE Wiki</a> — Dokumentation und Anleitungen</li>
            <li><a href="https://pve.proxmox.com/wiki/PCI_Passthrough" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Proxmox Wiki: PCI Passthrough</a> — GPU-Passthrough Anleitung</li>
            <li><a href="https://www.proxmox.com/en/proxmox-backup-server/overview" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Proxmox Backup Server</a> — Dedizierte Backup-Loesung</li>
          </ul>
        </section>
      </div>
    </div>
  )
}