# Design direction


Browser captures at 390 and 1440px were taken of Ecclesia, Charity: Water, Acumen and ESGGEI. Evidence is in the session's work/editorial-discovery directory, not in the public website.

- Ecclesia: a floating light navigation surface, prominent sans-serif heading (computed Space Grotesk), a split hero with large product imagery, strong coloured emphasis and distinct primary/secondary actions. Mobile stacks the hero with a substantial visual beneath the copy. These are composition references, not assets to reproduce. Further scroll/state inspection is required before describing its lower-page motion.
- Charity: Water: the captured mobile hero puts a specific mission and a clear giving action above human photography, using a saturated background and a contrasting button. ESGGEI can use that clarity without borrowing its identity, claims or donation model.
- Acumen: the captured desktop page uses oversized sans-serif branding, an ivory surface, restrained rules and high-contrast editorial photography. Borrow the principle of confident scale, not its wordmark or exact composition.

Sources: https://ecclesiaapp.com/index.html, https://www.charitywater.org/, https://acumen.org/.


A. Emerald/citrus: #103F35, #C9F36A, #F7F5ED, #F4A261, #17231E. Preferred: keeps recognizable green next to the existing green/gold logo and introduces an expressive accent. Citrus should carry dark text, not white text.

B. Forest/coral: #174B3B, #F17A60, #FFF7EC, #E9BD65, #192B25. Warmer editorial direction; coral is an accent rather than a guaranteed accessible text/background combination.

C. Midnight/electric: #172A40, #B5E66D, #F8F8F4, #4DA8B7, #1A1D26. Distinctive, but the greatest departure from existing green brand equity.

Choose A as the implementation starting point, subject to actual contrast tests on semantic tokens and real logo screenshots. Do not recolour the logo automatically.


Manrope display + DM Sans body is the proposed starting pair. Plus Jakarta Sans is an alternative unified family; Sora offers more geometric display shapes; Inter is a practical neutral option. Compare real text and mobile wrapping rather than declaring a family inherently premium. Obtain permitted font files and their licenses, self-host Latin subsets, use font-display: swap and avoid unnecessary weights. Record payload and loading effects.


Emerald editorial mastheads, citrus action surfaces, warm neutral reading areas and documentary image compositions. Vary the homepage's programme section from the project-story feature. Keep institutional evidence qualitative until verified figures are available. Use no copied church illustration, dashboard mock-up, partner logo, quotation or beneficiary story.

Motion should be progressive enhancement: content visible in static HTML, modest opacity/transform entrances, native navigation and accordion semantics, reduced-motion handling and no scroll hijacking. No new animation dependency is necessary unless measured implementation needs it.

Chosen checkpoint direction: A, emerald and citrus. Manrope headings and DM Sans body use self-hosted Latin variable WOFF2 files with OFL licenses. The logo remains unchanged. Photographs are existing ESGGEI assets. No copied reference assets, invented statistics, testimonials or affiliations.
