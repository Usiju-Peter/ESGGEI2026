# QA report: homepage approval checkpoint

Date: 12 November 2026. This is a tested homepage draft, not the completed site-wide redesign. Production is unchanged. Internal-page redesign and final production readiness are pending the Phase 14.5 homepage approval.

## Verification performed

- TypeScript: `npm run lint` passed.
- Source SEO: `npm run seo:check` passed for ten routes.
- Production build and prerendering: `npm run build` passed; `npm run seo:check-built` passed for ten routes.
- `node scripts/site-quality.mjs` passed: ten structured-data documents, 248 internal links and 100 asset references.
- `node scripts/browser-smoke.mjs` passed: ten routes, hydration, navigation, not-found state, mobile navigation, project FAQ and gallery keyboard/lightbox interactions. Contact submission success/error paths use mocked responses; no real message was sent and inbox delivery remains unverified.
- `node scripts/analytics-check.mjs` passed using mocked Google endpoints: consent gating, withdrawal and redaction. No live GA4 account/property configuration was changed or verified.
- `node scripts/design-regression.mjs` passed ten routes at 390, 768, 1024 and 1440px, increased text spacing at 390px and primary-action default/hover/focus contrast. Measured contrast: 11.77:1 default, 7.97:1 hover/focus.
- `node scripts/accessibility.mjs` passed twenty axe scans (ten routes at 390 and 1440px), with no reported violations. Additional homepage axe scans at 390, 768 and 1440px found no violations using WCAG 2/2.1/2.2 A/AA tags. Automated results are not proof of complete WCAG compliance.
- `node scripts/premium-check.mjs` checks the homepage at all eight requested widths, image loading, overflow, one main H1, JavaScript page errors, menu/Escape behavior and accessibility. Reduced-motion screenshots are stable. A follow-up check verifies reduced-motion animation suppression and normal-motion content/focus visibility.

## Actual screenshot review and iteration

Full-page Chromium screenshots were captured and visually inspected at 320, 375, 390, 430, 768, 1024, 1440 and 1920px. Review copies are in [screenshots](screenshots), with machine measurements in [evidence](evidence). No horizontal overflow, broken main images or JavaScript page errors occurred at these widths.

Initial critique found an awkward desktop headline wrap, a missing decorative glyph and a caption arrow that suggested interaction without a destination. Corrections: reduced the desktop headline maximum to 68px; replaced the unsupported glyph; turned the photo caption into a working gallery link. A final focus-state review changed dark-surface outlines to citrus. The rendered contrast check measured 9.25:1 for vision and footer links, exceeding the 3:1 indicator target. Final screenshots were captured after these corrections and reviewed again. Mobile uses stacked actions at narrow widths, smaller editorial headings, a two-column focus strip and a vertical involvement list. Tablet retains the split hero; its narrower headline column intentionally wraps to three lines. Desktop uses a two-line headline and larger photographic composition.

Anti-generic review: programme rows use rules and text instead of repeated rounded cards; about, outreach, vision, journal and involvement sections have distinct structures. The palette stays coherent across light, pale-green, emerald and citrus surfaces. Only existing documentary photographs are used. There are no fabricated counters, testimonials or partner logos. Remaining editorial limitation: outreach and journal photography comes from the same documented event; future approved photography would broaden the story.

## Performance measurements

Lighthouse 13.6.0 default mobile simulation, local built/prerendered pages, the same Chromium installation and machine. Baseline is the preserved pre-redesign commit 128992f; draft includes font preloads. Each configuration is a single run, not a statistical benchmark. Exact settings and measurement timestamps are recorded in `evidence/lighthouse-summary.json`.

| Delivery | Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Uncompressed local static server | Baseline | 87 | 100 | 100 | 100 | 4.12s | 0 | 4.5ms |
| Uncompressed local static server | Initial draft | 84 | 100 | 100 | 100 | 4.61s | 0.00069 | 7ms |
| Identical gzip HTML/CSS/JS delivery | Baseline | 100 | 100 | 100 | 100 | 1.92s | 0 | 47ms |
| Identical gzip HTML/CSS/JS delivery | Draft with font preloads | 97 | 100 | 100 | 100 | 2.55s | 0 | 102.5ms |

The draft adds 61,464 bytes of self-hosted WOFF2 fonts and a small amount of CSS/JS. The compressed comparison still shows a cost relative to baseline. Lab LCP is about 47ms above the 2.5s target; further deployed-network measurement and optimization remain required before production. TBT is not INP. No real-user p75 LCP/INP/CLS result is available, and the field Core Web Vitals targets are not claimed achieved. No runtime dependency was added for the new design or motion.

## Preservation and limits

The hosted preview returned HTTP 200 for all ten routes with their main headings, no horizontal overflow at 1440px and no JavaScript page errors. The new visual scope was present on home only.

All ten URLs, reports, article records, contact details, footer social destinations, consent controls and form integration are retained. No production credentials, domain settings, contact recipient or donation details were changed. The existing committed privacy correction is preserved in the branch base.

Browser automation used Chromium only; Safari/Firefox and physical-device testing remain outstanding. Screen-reader testing, a full manual keyboard audit, browser zoom review and end-to-end inbox delivery need additional validation. Reference analysis is based on rendered first-view desktop/mobile captures of Ecclesia, Charity:Water and Acumen; no claim is made to have exhaustively inspected their lower-page animations. Mobbin research was unavailable because the connection required a paid plan; no proprietary reference assets were copied.

The internal pages intentionally keep the previous visual system at this checkpoint. All-page screenshots at all eight widths, page-specific redesign, final consistency review, broader browser testing and final production QA are next-stage tasks after homepage approval. Design 9/10+ is an aspiration requiring human review, not a measured result. Search Console account state and GA4 account access were not independently verified in this redesign task.
