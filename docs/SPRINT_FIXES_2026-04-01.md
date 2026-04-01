# Sprint Fixes 2026-04-01

## Summary

Fixed 5 critical website bugs affecting SEO, navigation, discoverability and content syndication.

## Fix 1: Homepage 404-Content / noindex

**Problem:** The static export's `404/index.html` contained `<meta name="robots" content="noindex"/>` and rendered the `not-found.tsx` component. When Cloudflare Pages served this as a fallback, the homepage appeared as a 404 with noindex.

**Root Cause:** Next.js Static Export generates `404.html` from the `not-found.tsx` component and automatically adds `noindex`. The actual `index.html` was correct after a clean build, but stale builds or CF Pages fallback behavior caused the wrong content to be served.

**Fix:** Fresh build confirms `out/index.html` renders the real homepage without `noindex`. No source code changes needed for this specific issue — the build was stale.

**Files:** No changes (build artifact issue).

**Verification:** Run `npx next build` and check `out/index.html` does NOT contain `noindex` and DOES contain "Direkt einsteigen" (homepage section).

## Fix 2: Language Switcher _not-found Links

**Problem:** The DE/EN language switcher in the header rendered links to `/_not-found/` and `/en/_not-found/` on the 404 page, creating broken navigation loops.

**Root Cause:** The `SiteHeader` component used `usePathname()` which returns `/_not-found` on 404 pages. The language switcher used this raw pathname for DE (current language) links and derived toggle links from it.

**Fix:**
1. Added pathname normalization in `SiteHeader` that replaces `_not-found` paths with `/` or `/en`
2. Added defensive check in `getToggleHref()` for `_not-found` paths

**Files:**
- `components/SiteHeader.tsx` — pathname normalization + getToggleHref guard

**Verification:** Check `out/404/index.html` — DE link should be `href="/"`, EN link should be `href="/en/"`.

## Fix 3: Blog Posts in Sitemap

**Problem:** 27+ blog posts were missing from the sitemap, reducing search engine discoverability.

**Fix:** Added all 29 blog posts (27 .md + 2 .mdx) to `public/sitemap.xml` with `lastmod` dates and priority 0.6.

**Files:**
- `public/sitemap.xml` — added 29 blog post URLs + `/de` route + `/compliance/self-assessment` + missing articles

**Verification:** Count `<url>` entries in sitemap.xml — should be ~100 (was 64).

## Fix 4: /de Route

**Problem:** The `/de` route returned a 404, making 189 German MDX articles under `content/de/` unreachable from a `/de` URL prefix. The `/en` route existed but `/de` did not.

**Fix:** Created `/de` route with layout and landing page that links to all existing German categories (which live at the root `/`). The page serves as an entry point for `/de` links and SEO.

**Files:**
- `app/de/layout.tsx` — DE layout with metadata and lang="de"
- `app/de/page.tsx` — Landing page with categories, recent articles, quick links

**Note:** The 189 MDX files under `content/de/` are not yet dynamically routed through `/de/[category]/[slug]`. The current implementation provides a landing page at `/de` that redirects users to the existing German root routes. Full dynamic routing of `content/de/` MDX files would require a catch-all route (`[...slug]/page.tsx`) with `generateStaticParams`.

**Verification:** Check `out/de/index.html` exists and contains "Alle Kategorien".

## Fix 5: RSS Feed

**Problem:** The HTML header referenced `/feed.xml` but the file did not exist, resulting in a 404 for RSS readers.

**Fix:**
1. Created `public/feed.xml` with RSS 2.0 format containing the 20 most recent blog posts
2. Added `<link rel="alternate" type="application/rss+xml">` to the root layout metadata

**Files:**
- `public/feed.xml` — RSS 2.0 feed with 20 blog posts
- `app/layout.tsx` — added alternates.types for RSS autodiscovery

**Verification:**
- Check `out/feed.xml` exists and is valid XML
- Check `out/index.html` contains `<link rel="alternate" type="application/rss+xml"`

## Build Verification

```bash
cd wiki && npx next build
```

Build must complete without errors. After build:
- `out/index.html` — no `noindex`, no `_not-found` references
- `out/404/index.html` — DE link = `/`, EN link = `/en/`
- `out/de/index.html` — exists with landing page content
- `out/feed.xml` — exists with RSS content
- `out/sitemap.xml` — contains blog post URLs

## Files Changed

| File | Change |
|------|--------|
| `components/SiteHeader.tsx` | Pathname normalization for _not-found, getToggleHref guard |
| `app/layout.tsx` | Added RSS feed alternate link |
| `app/de/layout.tsx` | New: /de route layout |
| `app/de/page.tsx` | New: /de landing page |
| `public/sitemap.xml` | Added 29 blog posts + new routes |
| `public/feed.xml` | New: RSS 2.0 feed with 20 posts |
