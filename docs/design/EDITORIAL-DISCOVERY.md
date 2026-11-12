# ESGGEI editorial redesign discovery

Date: 12 November 2026. Discovery only; no production design changes in this document.

## Architecture and content inventory

React 19, Vite 6, React Router, TypeScript, Tailwind 4 and a shared CSS component system. Ten public routes are listed in src/publicRoutes.json. Vite builds individual entrypoints; scripts/prerender.mjs renders meaningful HTML and the client hydrates it. Keep this architecture: the current static publishing volume does not justify a framework migration. Preserve every canonical route, blog content, project date/location, biography, donation detail and contact destination. The current local branch includes a privacy-notice correction beyond main; preserve it.

Content is maintained in src/data.ts and src/blogData.ts, with HTML entrypoints and route-registry updates for publication. There is one published article and one documented outreach report. Filtering, pagination, counters, partner-logo strips and testimonials would add unsupported complexity or claims at this volume. Use a qualitative account of documented work rather than unverified impact totals in the data file.

Existing safeguards include consent-gated analytics, web-vitals instrumentation, semantic metadata, route-specific JSON-LD, sitemap/robots checks, real 404 validation, axe, browser interaction tests and five-width layout tests. The existing form sends through FormSubmit to its configured inbox; do not change the recipient without owner confirmation. No Google property access or real GA4 Measurement ID has been established.

## Current page audit and design opportunities

| Route | Preserve | Change for the new direction |
| --- | --- | --- |
| / | Mission language, genuine outreach, actual programme priorities, working CTAs | Create a distinct editorial composition with deliberate image scale, varied focus-area layout and the published story |
| /about | Mission, vision, history, values, leadership and anchor destinations | Strengthen narrative transitions and pair real photography with institutional copy |
| /projects | Completed outreach versus programme-priority distinction, dates and location | Introduce an editorial directory; no filters for three priorities |
| /projects/guruku-gbayi-outreach | All factual text, captions, date and original photos | Refine report masthead and imagery while retaining the common readable column |
| /gallery | Full collection, lightbox, captions, keyboard behaviour | Add editorial project context and deliberate image rhythm without losing browsing access |
| /blog | Existing article and publication date | Create an editorial lead rather than fabricate additional news cards |
| /blog/from-purpose-to-action | Full article, metadata, images and related destinations | Art-direct headline and image composition; preserve comfortable reading measure |
| /team | Names, roles, biographies and unchanged portraits | Establish consistent portrait composition and clearer institutional presentation |
| /partner | Direct contact, form states, donation details, FAQs, social links | Refine form grouping and visual emphasis; preserve working flows |
| /privacy | Accurate notice, consent preferences, contact route | Use the same type and surface tokens with restrained reading layout |

The prior visual audit and current source inspection establish these opportunities; they are not a user research or conversion study. Fresh screenshot collection must cover all ten routes on mobile, tablet and desktop before release.

## Live reference observations

Browser captures at 390 and 1440px were taken of Ecclesia, Charity: Water, Acumen and ESGGEI. Evidence is in the session's work/editorial-discovery directory, not in the public website.

- Ecclesia: a floating light navigation surface, prominent sans-serif heading (computed Space Grotesk), a split hero with large product imagery, strong coloured emphasis and distinct primary/secondary actions. Mobile stacks the hero with a substantial visual beneath the copy. These are composition references, not assets to reproduce. Further scroll/state inspection is required before describing its lower-page motion.
- Charity: Water: the captured mobile hero puts a specific mission and a clear giving action above human photography, using a saturated background and a contrasting button. ESGGEI can use that clarity without borrowing its identity, claims or donation model.
- Acumen: the captured desktop page uses oversized sans-serif branding, an ivory surface, restrained rules and high-contrast editorial photography. Borrow the principle of confident scale, not its wordmark or exact composition.

Sources: https://ecclesiaapp.com/index.html, https://www.charitywater.org/, https://acumen.org/.

## Palette exploration

A. Emerald/citrus: #103F35, #C9F36A, #F7F5ED, #F4A261, #17231E. Preferred: keeps recognizable green next to the existing green/gold logo and introduces an expressive accent. Citrus should carry dark text, not white text.

B. Forest/coral: #174B3B, #F17A60, #FFF7EC, #E9BD65, #192B25. Warmer editorial direction; coral is an accent rather than a guaranteed accessible text/background combination.

C. Midnight/electric: #172A40, #B5E66D, #F8F8F4, #4DA8B7, #1A1D26. Distinctive, but the greatest departure from existing green brand equity.

Choose A as the implementation starting point, subject to actual contrast tests on semantic tokens and real logo screenshots. Do not recolour the logo automatically.

## Typography exploration

Manrope display + DM Sans body is the proposed starting pair. Plus Jakarta Sans is an alternative unified family; Sora offers more geometric display shapes; Inter is a practical neutral option. Compare real text and mobile wrapping rather than declaring a family inherently premium. Obtain permitted font files and their licenses, self-host Latin subsets, use font-display: swap and avoid unnecessary weights. Record payload and loading effects.

## Original visual direction

Emerald editorial mastheads, citrus action surfaces, warm neutral reading areas and documentary image compositions. Vary the homepage's programme section from the project-story feature. Keep institutional evidence qualitative until verified figures are available. Use no copied church illustration, dashboard mock-up, partner logo, quotation or beneficiary story.

Motion should be progressive enhancement: content visible in static HTML, modest opacity/transform entrances, native navigation and accordion semantics, reduced-motion handling and no scroll hijacking. No new animation dependency is necessary unless measured implementation needs it.

## QA scope

Capture all ten routes at mobile/tablet/desktop; check all eight requested widths (320,375,390,430,768,1024,1440,1920), increased text spacing and zoom. Keep existing source/built SEO checks and interaction tests; add semantic-token contrast checks including hover/focus, content-preservation checks and reduced-motion verification. Measure lab performance before and after with the same configuration. Field p75 targets remain unconfirmed until sufficient real-user data exists. Aesthetic 9/10 is an ambition, not a test result.

The continuation brief supplies Phases 11–16. Implementation pauses at the explicit Phase 14.5 homepage approval checkpoint before extending the visual system to internal pages.
