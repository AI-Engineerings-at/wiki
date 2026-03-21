# Deployment — AI Engineering Wiki

## Auto-Deploy (GitHub Actions)

Jeder Push auf den `main` Branch triggert automatisch einen Deploy nach Cloudflare Pages.

**Workflow:** `.github/workflows/deploy.yml`

**Ablauf:**
1. Repository wird ausgecheckt
2. Node.js 20 wird eingerichtet
3. Dependencies werden mit `npm ci` installiert
4. Static Export wird mit `npm run build` erstellt (Output: `out/`)
5. Der `out/` Ordner wird via Wrangler nach Cloudflare Pages deployed

## Erforderliche GitHub Secrets

Diese Secrets muessen manuell im GitHub Repository gesetzt werden unter:
**Settings > Secrets and variables > Actions > New repository secret**

| Secret | Beschreibung |
|--------|-------------|
| `CLOUDFLARE_API_TOKEN` | API Token aus dem Cloudflare Dashboard (Edit Cloudflare Pages permissions) |
| `CLOUDFLARE_ACCOUNT_ID` | Account ID, sichtbar im Cloudflare Dashboard unter der Domain-Uebersicht |

## Lokales Deployment

```bash
# Build erstellen
npm run build

# Manuell nach Cloudflare Pages deployen
npx wrangler pages deploy out --project-name ai-engineering-wiki
```

Hinweis: Fuer lokales Deployment muss `wrangler` authentifiziert sein (`npx wrangler login`).
