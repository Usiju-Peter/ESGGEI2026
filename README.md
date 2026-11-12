# ESGGEI website

React 19 + Vite + TypeScript + React Router, with static HTML prerendering for ten public routes. Source content: `src/data.ts`, `src/blogData.ts`; route inventory: `src/publicRoutes.json`.

## Local development

Use Node 24 and npm. Run `npm ci`, then `npm run dev` (port 3000). `npm run build` creates the static site and Node server in `dist/`. `npm run preview` previews the static output. `NODE_ENV=production npm start` runs the built Node server.

No API key is needed to render the website. Optional browser configuration is documented in `.env.example`: `VITE_GA4_MEASUREMENT_ID` enables consent-gated analytics after rebuilding; `VITE_CONTACT_FORM_ENDPOINT` selects an activated FormSubmit endpoint. Confirm ownership and activation before changing the existing recipient. Never put secrets in VITE-prefixed variables or commit .env.local.

## Validation

Run `npm run lint`, `npm run seo:check`, `npm run build`, `npm run seo:check-built`, and `node scripts/site-quality.mjs`.

Install test Chromium with `npx playwright install chromium`. Run `node scripts/browser-smoke.mjs`, `node scripts/analytics-check.mjs`, `node scripts/design-regression.mjs`, and `node scripts/accessibility.mjs`.

Homepage checkpoint: `node scripts/premium-check.mjs` captures all eight requested widths and runs representative axe checks. Set `PREMIUM_OUTPUT` to choose the report/screenshot directory; the default is ignored `audit-results/premium`.

Mocked form/analytics tests do not confirm actual delivery. Automated checks do not establish complete WCAG compliance or field CWV.

## Publishing and maintenance

Vite entrypoints, metadata, prerendering and sitemap checks must all include a new route. Preserve article dates and records; verify programme facts and image permissions before publication. Keep social destinations real and review contact delivery with the owner.

Production is Vercel project `esggei2026`, serving www.esggei.org.ng. The other linked project does not serve the public domain. Do not publish a redesign before explicit approval. The current redesign must stop for homepage approval before internal-page propagation, then obtain separate production approval. See `docs/design/premium-2026/` for checkpoint documentation and known limitations.
