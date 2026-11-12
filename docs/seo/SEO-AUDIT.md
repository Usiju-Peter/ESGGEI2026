# ESGGEI SEO audit — 12 November 2026

Website: https://www.esggei.org.ng/
Repository: Usiju-Peter/ESGGEI2026
Branch: seo/comprehensive-audit-2026-11

## Architecture recommendation

Keep React 19 + Vite 6 + React Router 7 for the eight-page NGO site. A full Next.js migration would add risk and rewrite work without a demonstrated SEO advantage over the working static prerender pipeline. Reconsider when the site needs extensive CMS-driven publication, frequent dynamic pages, or full server rendering for user-specific content.

## Verified findings and fixes

1. All eight published routes previously returned HTTP 200 with an empty React root in raw HTML. The build now uses React streaming SSR to prerender each route into its static HTML entrypoint and hydrates on the client. On preview deployment dpl_Fxu5XFRzSHo13QTdTHJcbeFNhrKa, all eight routes returned HTTP 200, a prerendered root, a semantic main and one H1. Unknown routes returned HTTP 404.
2. The old sitemap contained only five URLs. It now includes all eight, and a prebuild generator checks article slugs so new articles cannot be silently skipped.
3. Five HTML entrypoints shared generic meta descriptions. Added distinct, page-specific descriptions for About, Projects, Gallery, Team, and Partner.
4. Client-side metadata now preserves the proper home title, normalizes canonical URLs, and always resets social imagery on navigation.
5. Sections previously lazy-mounted behind IntersectionObserver were missing from raw HTML. Now every content section is rendered immediately; nonessential motion effects remain inside the sections.
6. Removed homepage FAQPage structured data that was not verified against a visible FAQ. Removed redundant gzip/Brotli static output generation that could otherwise contain pre-prerender HTML.
7. Added source metadata/sitemap checks, built-HTML SSR checks, and a GitHub Actions pipeline for SEO checks, TypeScript and builds.

## Verification performed

- Vercel preview build at commit 268c4fb38392b24f712f2cad39bc510c65f9e2d5 completed successfully.
- Raw HTTP preview checks passed on the eight listed routes with meaningful HTML content and one H1.
- The nonexistent /does-not-exist route produced HTTP 404.
- robots.txt and sitemap.xml returned HTTP 200 on an earlier preview.
- A subsequent Vite config change removing unsupported FAQ markup and precompressed HTML requires revalidation on the latest preview.
- These tests do NOT guarantee browser hydration has no warnings, nor that Core Web Vitals meet targets.

## Outstanding checks and improvements

P0: Run real Chromium browser tests on mobile and desktop, including hydration warnings, navigation, forms, images and accessibility.

P1: Capture Google PageSpeed Insights/Lighthouse and real-user LCP, INP, CLS measurements; optimize bottlenecks found. No measurements were obtained in this session.

P1: Verify Google Search Console property ownership, coverage and indexing. Verification meta and a verification file exist, but authenticated property reports were not available.

P1: Configure GA4 if approved and an actual Measurement ID is provided. Do not fabricate an ID or send personal data unnecessarily.

P1: Confirm non-www to www canonical redirects and verify the sitemap is submitted. Review structured data in Google Rich Results Test.

P2: Conduct content strategy and internal link improvements based on genuine NGO programmes, dated project outcomes and subject matter expertise.

P2: Review image alt text and accessibility manually, and use Lighthouse CI or Playwright to automate regression checks.

## Commands for review

```bash
npm ci
npm run seo:check
npm run lint
npm run build
npm run seo:check-built
```

Production changes are deliberately NOT deployed or merged without browser QA. Technical SEO cannot guarantee Google rankings.
