# ESGGEI design refinement

Baseline: production commit `18d1565`, reviewed 12 November 2026. Architecture: React + Vite, with the same ten prerendered routes and canonical URLs.

## Design decisions

- Keep the forest/cream identity and Georgia/system-sans pairing. Use regular body text, readable supporting labels and named heading styles. Remove the dormant, unreferenced Inter/Playfair font stylesheet rather than introduce an unnecessary font download.
- Define shared layout, typography, spacing, border, radius, button, card and form styles in `src/design-system.css`. Mobile section padding is 48px; desktop is 72px. These are design choices, not WCAG requirements.
- Replace full-viewport inner-page photographic heroes with compact introductions. Keep documentary photographs next to the activity they describe.
- Move documented project evidence directly after the homepage introduction. Consolidate repeated mission explanations and replace the nonfunctional “View All Projects” toggle with a real programme-page link.
- Use icons for programme priorities instead of implying that medical outreach photographs document education or agriculture activities. Keep actual outreach photographs on the report, gallery and project feature.
- Remove stock-photo closing banners, decorative glows, heavy shadows and large hover transforms. Shared calls to action use readable text on forest green.
- Make direct email and telephone contact available near the top; show the mobile enquiry form before the longer partnership guidance. Preserve form endpoint, recipient, donation bank/name/number and social-profile destinations.
- Share native biography buttons/cards/dialogs between About and Team. Preserve focus containment, Escape dismissal, scroll locking and focus return. Keep roles in readable sentence-case text.
- Serve unchanged existing portraits from local public assets instead of depending on the external image host.
- Use narrower reading columns for articles and privacy content. Align the outreach report headings, metadata, prose and photographs in one shared reading column, with a regression check for desktop alignment. Retain the complete blog article text, dates, original photo descriptions and SEO metadata. Add captions to documentary article photos.
- Keep the gallery lightbox and its keyboard interactions; add a visible description and use smaller responsive thumbnails.
- Compact the footer into grouped mobile columns, retain all social destinations, and make the navigation state visible on desktop and mobile.

## Measured before/after

Measurements at 390×844. Heights are rounded CSS pixels. Baseline and new measurements use the same browser environment; this is a layout comparison, not a real-user conversion study.

| Measurement | Before | After |
| --- | ---: | ---: |
| Home document height | 9,252 | 5,364 |
| About document height | 9,344 | 5,768 |
| Projects document height | 9,070 | 4,557 |
| Contact document height | 6,264 | 3,870 |
| Shared mobile footer | 1,250 | 643 |
| Typical inner-page introduction height | 717 | 223 |
| Direct contact email position | approximately 1,451 (heading) | approximately 422 (link) |
| Primary action hover text contrast | 3.08:1 | 9.67:1 |

The email measurements refer to different elements (heading versus link), so they establish the direction and scale of the improvement rather than a precise percentage.

## Verification

- TypeScript, source sitemap/SEO checks, production build and all ten prerendered HTML checks pass.
- Site quality checks retain ten route-specific schema graphs and validate internal links, fragments and local assets.
- `scripts/design-regression.mjs` checks every route at 320, 390, 768, 1024 and 1440px, with no horizontal overflow; compact introductions; mobile footer height; and early contact access. It checks default/hover/focus text contrast and increased text spacing at 390px. Optional screenshots and JSON measurements are saved to the configured audit output directory.
- Existing Chromium route/hydration/navigation/404, contact success/error/ambiguous-response, gallery keyboard, FAQ and biography dialog tests are retained. Contact tests mock delivery and send no email.
- Existing consent-gated analytics tests are retained; they mock Google requests and do not establish delivery to GA4.
- Automated axe checks cover all ten routes at mobile and desktop widths. Automated scans and keyboard checks do not establish full assistive-technology conformance.
- Mobile and desktop screenshots reviewed, including the homepage, projects, contact page, reading pages and portraits.

CI now runs the layout/state regression checks alongside the existing SEO, accessibility and analytics checks. A production build must be verified on the actual domain after release. The audit is independent of Mobbin references, whose connection required a paid plan; no competitor comparison or user research is claimed.
