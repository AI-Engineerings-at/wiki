import Callout from "../../../components/Callout"
import PlantUMLDiagram from "../../../components/PlantUMLDynamic"

export const metadata = {
  title: 'API Keys sicher speichern | AI Engineering Wiki',
  description:
    'Best Practices für Secrets: API-Keys nie committen, Env Vars, Vault/Secrets Manager, Rotation und Audit. Fokus: lokaler AI-Stack.',
}

export default function ApiKeysSicher() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">API-Keys sicher speichern</h1>
        <p className="text-gray-400 mt-2">Security · 5 min</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <Callout type="summary" title="Auf einen Blick">
          <p>
            API-Keys gehoeren in einen Vault oder Environment Variables — niemals
            in Code oder Git. Regelmaessig rotieren (alle 3-6 Monate), minimale
            Rechte pro Key, bei Leak sofort revoken.
          </p>
        </Callout>

        <p className="text-lg text-gray-300">
          API-Keys sind das Gold deiner Infrastruktur. Ein geleakter Key kann zu
          unbefugtem Zugriff, Kosten oder Datenverlust führen. Hier ist, wie wir es machen.
        </p>

        <Callout type="warning" title="Niemals committen">
          <p>
            API-Keys, Tokens und Passwoerter haben in Git nichts verloren. Ein
            einziger Commit mit einem Key im Code reicht — selbst nach dem Loeschen
            bleibt er in der Git-History.
          </p>
        </Callout>

        <PlantUMLDiagram
          diagram={`@startuml
skinparam backgroundColor transparent
skinparam defaultFontColor #E2E8F0
skinparam ArrowColor #4262FF
skinparam activityBorderColor #334155
skinparam activityBackgroundColor #0F172A

title API Key Management Flow

start
:Neuen API Key erstellen;
if (Speicherort?) then (Production)
  :In Vault verschlüsselt\\nspeichern (vault.py);
else (Development)
  :In .env Datei\\nspeichern (lokal);
endif
:.gitignore prüfen\\n(.env, .vault.key);
:Minimale Rechte\\nvergeben;
:Rotation-Timer setzen\\n(alle 3-6 Monate);
repeat
  :Key verwenden;
  :Nutzung monitoren;
  if (Leak erkannt?) then (ja)
    #FF6347:SOFORT revoken!;
    :Neuen Key erstellen;
  else (nein)
  endif
  if (Rotation fällig?) then (ja)
    :Key rotieren;
    :Alten Key revoken;
  else (nein)
  endif
repeat while (Key aktiv?)
stop
@enduml`}
          caption="API Key Lifecycle: Erstellen, sicher speichern, regelmäßig rotieren, bei Leak sofort revoken"
        />

        <h2 className="text-xl font-semibold text-white mt-8">Was ist ein Vault?</h2>

        <p className="text-gray-300 mt-2">
          Ein Vault ist ein sicherer Speicher für Credentials. Bei uns nutzen wir ein 
          Python-Skript, das Keys aus einer verschlüsselten Datei liest:
        </p>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# vault.py
import os
import json
import base64
from cryptography.fernet import Fernet

VAULT_FILE = "vault.json.enc"
KEY_FILE = ".vault.key"

def get_key():
    """Lade oder erstelle Vault-Key"""
    if os.path.exists(KEY_FILE):
        with open(KEY_FILE, 'rb') as f:
            return f.read()
    key = Fernet.generate_key()
    with open(KEY_FILE, 'wb') as f:
        f.write(key)
    return key

def decrypt(filepath):
    """Entschlüssle Vault-Datei"""
    key = get_key()
    f = Fernet(key)
    with open(filepath, 'rb') as data:
        encrypted = data.read()
    return json.loads(f.decrypt(encrypted))

def get(service, key):
    """Hole einen Key aus dem Vault"""
    decrypted = decrypt(VAULT_FILE)
    return decrypted[service][key]

# Verwendung
api_key = vault.get("stripe", "secret_key")
print(f"Stripe Key: {api_key[:8]}...")  # sk_live_xxxx → sk_live_x...`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Umgebungsvariablen</h2>

        <p className="text-gray-300">
          Die sicherste Methode: Keys als Environment Variables:
        </p>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# .env Datei (NIEMALS committen!)
STRIPE_SECRET_KEY=sk_live_xxxxx
GRAFANA_API_KEY=eyJxxxxx
OLLAMA_API_KEY=

# .env.example (Diesen committen)
STRIPE_SECRET_KEY=
GRAFANA_API_KEY=`}</code>
        </pre>

        <p className="text-gray-300 mt-4">
          In Python mit python-dotenv:
        </p>
        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# config.py
from dotenv import load_dotenv
import os

load_dotenv()

STRIPE_KEY = os.getenv("STRIPE_SECRET_KEY")
GRAFANA_KEY = os.getenv("GRAFANA_API_KEY")

# Error wenn Key fehlt
if not STRIPE_KEY:
    raise ValueError("STRIPE_SECRET_KEY nicht gesetzt")`}</code>
        </pre>

        <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4 mt-4">
          <p className="text-yellow-300 text-sm">
            <strong>Wichtig:</strong> .env in .gitignore eintragen!
          </p>
        </div>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-2 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# .gitignore
.env
.env.local
vault.json.enc
.vault.key
*.pem
*.key`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Unser System</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Service</th>
                <th className="text-left py-2 text-gray-400">Storage</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">Stripe</td>
                <td className="py-2">.env</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Grafana</td>
                <td className="py-2">Vault</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">n8n</td>
                <td className="py-2">n8n Credentials</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Mattermost</td>
                <td className="py-2">Vault</td>
              </tr>
              <tr>
                <td className="py-2">Ollama</td>
                <td className="py-2">Keine (lokal)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-white mt-8">Praktische Regeln</h2>

        <ol className="list-decimal list-inside text-gray-300 space-y-2 mt-4">
          <li>• <strong>NIEMALS Keys in Git committen</strong></li>
          <li>• <strong>Keys regelmäßig rotieren</strong> (alle 3-6 Monate)</li>
          <li>• <strong>Minimale Rechte</strong> — nur was nötig ist</li>
          <li>• <strong>Bei Leak</strong>: Sofort revoken und neuen Key erstellen</li>
          <li>• <strong>Monitoring</strong>: Ungewohnte Nutzung erkennen</li>
        </ol>

        <h2 className="text-xl font-semibold text-white mt-8">Key Rotation Script</h2>

        <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-4 overflow-x-auto">
          <code className="text-sm text-gray-300">{`# rotate_keys.py - Keys automatisch rotieren
import os
import subprocess
from datetime import datetime, timedelta

def rotate_stripe_key():
    """Neuen Stripe Key erstellen und alten revoke"""
    # 1. API Call zu Stripe
    result = subprocess.run([
        "stripe", "api_key", "create", 
        "--description", f"Rotated {datetime.now()}"
    ], capture_output=True, text=True)
    
    new_key = result.stdout.strip()
    
    # 2. .env updaten
    with open(".env", "r") as f:
        content = f.read()
    
    content = content.replace(
        "STRIPE_SECRET_KEY=sk_live_xxx",
        f"STRIPE_SECRET_KEY={new_key}"
    )
    
    with open(".env", "w") as f:
        f.write(content)
    
    # 3. Alten Key revoke
    subprocess.run(["stripe", "api_keys", "delete", "old_key_id"])
    
    print(f"✓ Key rotiert: {new_key[:12]}...")

# Cron: 0 0 1 */6 * → alle 6 Monate`}</code>
        </pre>

        <h2 className="text-xl font-semibold text-white mt-8">Checkliste</h2>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <ul className="text-gray-300 space-y-2">
            <li>[ ] .env in .gitignore?</li>
            <li>[ ] Keys in Vault oder .env?</li>
            <li>[ ] Keine Keys in Code?</li>
            <li>[ ] Regelmäßige Rotation?</li>
            <li>[ ] Minimale Rechte pro Key?</li>
          </ul>
        </div>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-8">
          <h3 className="font-semibold text-white mb-2">Zusammenfassung</h3>
          <p className="text-gray-300">
            API-Keys sind kritisch. Mit Vault und Environment Variables bleibst du sicher.
            Einmal leaken ist schwer rückgängig zu machen.
          </p>
        </div>

        {/* Quellen */}
        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quellen</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="https://owasp.org/www-community/vulnerabilities/Use_of_hard-coded_password" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">OWASP: Use of Hard-coded Credentials</a></li>
            <li><a href="https://docs.github.com/en/code-security/how-tos/secure-your-secrets" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GitHub: Secret Scanning</a> — Automatische Erkennung geleakter Secrets</li>
            <li><a href="https://github.com/pyca/cryptography" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GitHub: pyca/cryptography</a> — Python Fernet Encryption</li>
            <li><a href="https://12factor.net/config" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">The Twelve-Factor App: Config</a> — Environment Variables Best Practice</li>
          </ul>
        </section>
      </div>
    </div>
  )
}