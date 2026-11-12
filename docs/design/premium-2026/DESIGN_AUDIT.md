# Design audit


React 19, Vite 6, React Router, TypeScript, Tailwind 4 and a shared CSS component system. Ten public routes are listed in src/publicRoutes.json. Vite builds individual entrypoints; scripts/prerender.mjs renders meaningful HTML and the client hydrates it. Keep this architecture: the current static publishing volume does not justify a framework migration. Preserve every canonical route, blog content, project date/location, biography, donation detail and contact destination. The current local branch includes a privacy-notice correction beyond main; preserve it.

Content is maintained in src/data.ts and src/blogData.ts, with HTML entrypoints and route-registry updates for publication. There is one published article and one documented outreach report. Filtering, pagination, counters, partner-logo strips and testimonials would add unsupported complexity or claims at this volume. Use a qualitative account of documented work rather than unverified impact totals in the data file.

Existing safeguards include consent-gated analytics, web-vitals instrumentation, semantic metadata, route-specific JSON-LD, sitemap/robots checks, real 404 validation, axe, browser interaction tests and five-width layout tests. The existing form sends through FormSubmit to its configured inbox; do not change the recipient without owner confirmation. No Google property access or real GA4 Measurement ID has been established.


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

Strengths: prerendered content, real documentary photographs, preserved routes and accessible native interactions. Current production uses a functional compact layout but lacks the expressive editorial rhythm requested for the new brief. Existing synthetic/automated results do not establish field CWV or full WCAG conformance.

## Implementation response

After provisional homepage approval, all ten routes received the shared premium system and considered page compositions. The implementation preserves the strengths listed above and addresses typography, spacing, navigation consistency, repeated card treatment, gallery context and reading hierarchy. Responsive photo derivatives address measured image payload costs. The associated QA report records actual checks, screenshot review, lab results and remaining limits. Account-side Search Console/GA4 verification and field CWV are separate from this design work and have not been claimed complete.
