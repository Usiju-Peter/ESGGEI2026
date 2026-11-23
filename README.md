# ESGGEI website

React 19 + Vite + TypeScript + React Router, with static HTML prerendering for ten public routes. Source content: `src/data.ts`, `src/blogData.ts`; route inventory: `src/publicRoutes.json`.

## Local development

Use Node 24 and npm. Run `npm ci`, then `npm run dev` (port 3000). `npm run build` creates the static site in `dist/` (including `dist/404.html`, served by Vercel for unknown URLs) and the optional Node server in `build/`, so the server bundle is never published. `npm run preview` previews the static output. `NODE_ENV=production npm start` runs the built Node server.

No API key is needed to render the website. Optional browser configuration is documented in `.env.example`: `VITE_GA4_MEASUREMENT_ID` enables consent-gated analytics after rebuilding; `VITE_CONTACT_FORM_ENDPOINT` selects an activated FormSubmit endpoint. Confirm ownership and activation before changing the existing recipient. Never put secrets in VITE-prefixed variables or commit .env.local.

## Validation

Run `npm run lint`, `npm run seo:check`, `npm run build`, `npm run seo:check-built`, and `node scripts/site-quality.mjs`.

Install test Chromium with `npx playwright install chromium`. Run `node scripts/browser-smoke.mjs`, `node scripts/analytics-check.mjs`, `node scripts/design-regression.mjs`, and `node scripts/accessibility.mjs`.

After building, run `npm run seo:check-brand` to verify all ten routes with JavaScript disabled and enabled, visible prerendered content, unique and stable metadata, organisation/site identity, and client navigation. It also captures the homepage at eight widths in ignored `audit-results/brand-seo/`; `BRAND_SEO_OUTPUT` overrides that directory. The same check runs in CI.

`node scripts/premium-check.mjs` captures the homepage at eight widths. `node scripts/redesign-check.mjs` captures all ten pages at all eight widths (80 screenshots), checks image loading/reflow and runs 30 representative axe scans. `node scripts/interaction-check.mjs` verifies modal/keyboard and mocked form states. Set `PREMIUM_OUTPUT` to choose the report/screenshot directory; the default is ignored `audit-results/premium`. Use `REDESIGN_OUTPUT` for the full-site screenshot directory.

For reproducible mobile lab measurements, install Lighthouse 13.6.0 temporarily without saving dependencies, set `CHROME_PATH` to the Playwright Chromium executable, and run `node scripts/lighthouse-measure.mjs`. `LIGHTHOUSE_BIN` selects an alternate installation, `LIGHTHOUSE_ROUTES` limits comma-separated routes, and `LIGHTHOUSE_BASE_URL` measures an existing hosted site. Default output is `audit-results/lighthouse`; local measurement serves gzip-compressed built files on loopback. Scores are measurements, not automatic certification.

Mocked form/analytics tests do not confirm actual delivery. Automated checks do not establish complete WCAG compliance or field CWV.

## Architecture and assets

`src/components` contains shared navigation, forms/CTA primitives, documentary images and dialogs. `src/pages` owns each public page; `src/styles/premium-system.css` defines common brand foundations and `premium-pages.css` defines internal compositions. Existing semantic primitives live in `src/design-system.css`; homepage composition remains in its own stylesheet.

`predev` and `prebuild` run `scripts/generate-responsive-images.mjs` with Sharp. Gallery AVIF/WebP and portrait WebP derivatives are generated into ignored `public/images/*/previews` directories. Keep originals and regenerate previews after changing photos. Do not hand-edit generated files. The build produces the responsive assets automatically, including on Vercel.

## Publishing and maintenance

Vite entrypoints, metadata, prerendering and sitemap checks must all include a new route. `vercel.json` sets clean URLs, security headers (including a Content Security Policy that allows only this site, FormSubmit and Google Analytics) and caching; widen the policy before adding any other third-party script, font, image host or form endpoint. Preserve article dates and records; verify programme facts and image permissions before publication. Keep social destinations real and review contact delivery with the owner.

`src/lib/siteMetadata.ts` is the shared source for built and client-side page metadata. Change page titles, descriptions and social images there; page components call `useSEO` with their canonical route. Article metadata is derived from `src/blogData.ts`. HTML entrypoints remain templates with fallback head tags, which Vite replaces using the shared values. Prerendering waits for React and disables splitting large resolved Suspense boundaries into hidden streaming segments, so the static content is visible without JavaScript. Keep the built-HTML and browser checks when changing this pipeline.

Production is Vercel project `esggei2026`, serving www.esggei.org.ng. The other linked project does not serve the public domain. The approved redesign was merged as PR #7 (`ac19833`) and deployed on 12 November 2026. Later changes still require explicit approval before production deployment. See `docs/design/premium-2026/` for historical design documentation, and [the 16 November brand-search audit](docs/seo/BRAND-SEARCH-AUDIT-2026-11-16.md) for current SEO findings and external-account follow-up.
