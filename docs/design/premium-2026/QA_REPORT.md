# QA report: full-site redesign

12 November 2026. The user provisionally approved the homepage direction before internal-page implementation. All ten public routes now use the design system. This is a review build on redesign/premium-2026; production deployment requires separate explicit approval.

## Build, preservation and functional verification

- TypeScript, source SEO, production build/prerendering and built HTML SEO checks passed for all ten routes.
- Site-quality checks passed: ten route schema documents, 256 internal links and 101 local asset references. No URLs changed, so no new redirects were required.
- Browser smoke passed across ten routes: hydration, navigation, metadata changes, mobile menu, FAQs, gallery keyboard behavior and mocked enquiry success/failure paths.
- Analytics tests passed for consent, withdrawal, reacceptance and query redaction with Google endpoints mocked. No live GA4 account was configured or verified.
- Content comparison against the preserved homepage-checkpoint revision 6008c01 found no missing main-content paragraphs, headings, list items or definition-list values across ten routes. Source data changes add verified portrait dimensions, not revised organisational claims.
- Layout regression passed at 320, 390, 768, 1024 and 1440px, including increased text spacing at 390px. The homepage height budget was adjusted from 6500 to 6800px to accommodate 44px footer navigation targets; measured height at 390px was 6562px.
- Interactive-state checks passed: keyboard skip link; all three biographies with focus wrapping, Escape and restoration; gallery arrow keys and restoration; required form validation; disabled sending state; error and accepted-message states; and copying the existing donation account number to the browser clipboard.
- Contact requests were intercepted and mocked. No real enquiry was sent; actual inbox delivery and service activation remain unverified.

## Responsive screenshots and visual review

The complete rendered matrix covers ten routes at 320, 375, 390, 430, 768, 1024, 1440 and 1920px: 80 full-page screenshots, with no horizontal overflow, missing main H1, broken main images, empty/placeholder anchors or JavaScript page errors. Text-spacing checks also passed at 320px. Evidence is in `evidence/full-site`; CI uploads full-resolution screenshots as artifacts. Committed screenshots are review copies, scaled on larger viewports to keep repository size reasonable.

Review used eight-width first-view contact sheets for every page and detailed full-page mobile/tablet/desktop captures. It checked heading wraps, alignment, gutters, section rhythm, image context/crops, form order, navigation and footer. Review corrections include the initial homepage headline wrap and caption interaction, dark-surface focus, article contents navigation, full-image decoding/painting for capture, responsive photographic derivatives and matching preload hints. Gallery and report captures were repeated at all eight widths after strengthening the paint/decode wait. One intermediate run overlapped a rebuild and produced a temporary 404; that run was discarded and rerun against a stable build.

The About page has distinct narrative/principle/vision compositions; Projects uses a directory rather than repeated promotional cards; Gallery uses varied photo scale; the journal has one genuine feature; profiles use open portrait frames; Contact keeps direct access above the mobile enquiry flow; reports and privacy use restrained reading layouts. The repeated green/cream/citrus system is deliberate. There are no fabricated metrics, testimonials, partner logos or synthetic documentary images. The archive still centres on one outreach, limiting story variety.

## Accessibility

Thirty static axe scans covered all ten routes at 390, 768 and 1440px using WCAG 2/2.1/2.2 A/AA tags, with zero violations. Six additional interactive-state scans covered three biographies, gallery viewer, form failure and form success, also with zero violations. Existing keyboard/axe regression checks supplement these tests.

Primary action text contrast: 11.77:1 default and 7.97:1 hover/focus. Dark-surface focus indicators measure 9.25:1. Visible gallery captions label their buttons directly. Reduced-motion support suppresses entrances and smooth anchor scrolling; meaningful content is present in prerendered HTML.

These checks do not prove complete WCAG 2.2 AA conformance. A screen-reader session, native browser zoom review and physical-device testing remain outstanding. Narrow-layout reflow and increased text spacing were tested, rather than represented as a substitute for every assistive-technology scenario.

## Performance measurements

Lighthouse 13.6.0, default simulated mobile settings, Chromium, built/prerendered files served locally with gzip HTML/CSS/JS. Settings and timestamps are recorded in the evidence JSON. These are single-run lab observations on a shared execution host, not a statistical benchmark or real-user p75. Some first-sweep measurements overlapped other QA browsers; the three slowest LCP pages were repeated after those browsers closed.

The first internal draft measured gallery performance 89 and article performance 84. Image and preload inspection found large originals still competing with previews. Responsive AVIF/WebP, portrait derivatives, corrected responsive preloads and a compact favicon were implemented. Originals remain available, including full-resolution gallery viewing.

| Route | Final sweep performance | LCP | CLS | TBT |
| --- | --- | --- | --- | --- |
| / | 92 | 2.75s | 0.000 | 238ms |
| /about | 100 | 0.76s | 0.000 | 2ms |
| /projects | 99 | 2.26s | 0.000 | 8ms |
| /projects/guruku-gbayi-outreach | 99 | 0.76s | 0.000 | 148ms |
| /gallery | 91 | 2.92s | 0.000 | 227ms |
| /blog | 98 | 2.28s | 0.000 | 8ms |
| /blog/from-purpose-to-action | 97 | 2.51s | 0.000 | 16ms |
| /team | 98 | 2.25s | 0.000 | 112ms |
| /partner | 100 | 0.76s | 0.000 | 86ms |
| /privacy | 100 | 0.77s | 0.000 | 6ms |

Every route scored 100 for accessibility, best practices and SEO in this sweep.

| Repeat without other QA browsers | Performance | LCP | CLS | TBT |
| --- | --- | --- | --- | --- |
| / | 96 | 2.60s | 0.000 | 79ms |
| /gallery | 96 | 2.84s | 0.000 | 15ms |
| /blog/from-purpose-to-action | 99 | 2.26s | 0.000 | 30ms |

Homepage and gallery lab LCP remain above the 2.5s target in the repeat (approximately 2.60s and 2.84s). The article repeat was 2.26s. No field INP or p75 CWV result is available; TBT is not INP. Real-user targets are not claimed achieved. Compared with the previous compact gallery, the richer typography/composition still has a measured loading cost. Further deployed-network profiling is warranted rather than treating a 90+ score as proof of good field CWV.

Pull-request Lighthouse now measures the built revision using the committed compressed-server runner. The weekly scheduled audit continues to measure production. A successful measurement workflow means reports were produced, not that every aspirational performance target was certified.

## Critical design review

These are provisional reviewer judgements, not objective measurements or an independent design award. The homepage direction has user approval; the complete site awaits review.

| Category | Provisional judgement | Reason / remaining constraint |
| --- | --- | --- |
| Visual sophistication | 8.5/10 | Cohesive art direction; archive breadth limits storytelling variety |
| Brand distinctiveness | 8.5/10 | Original editorial system and recognisable logo; no custom commissioned visual library |
| Typography | 9/10 | Consistent fluid hierarchy, deliberate wrapping and comfortable article measures |
| Colour harmony | 9/10 | Controlled emerald/citrus/cream surfaces and measured contrast |
| Layout composition | 8.5/10 | Distinct page types; long institutional content still produces substantial mobile pages |
| Motion | 8.5/10 | Intentional, restrained and reduced-motion aware; no unnecessary elaborate effects |
| Mobile experience | 9/10 | Eight-width reflow, spacing, menu and target checks; physical devices still need review |
| Navigation/usability | 9/10 | Clear native links, anchors, contents navigation, dialogs and contact states |
| Content clarity | 8.5/10 | Clear programme priorities versus documented work; existing long prose retained |
| Institutional credibility | 8/10 | Genuine work, team and contact details; more verified outcomes/reports would strengthen it |

The 9+/10 aspiration has not been declared objectively achieved. Future refinements should be driven by owner feedback, approved organisational evidence and actual visitors, not invented content or decorative complexity.

## Browser and release limits

Chromium was exercised. Firefox and WebKit downloads were attempted. Firefox could not open its profile folder in this runtime, including a retry with a workspace profile. WebKit could not launch because the host lacks libgtk-4, libgraphene, libharfbuzz-icu, libmanette, libhyphen and libGLESv2. The scoped package installer was unavailable. These are recorded limits; Safari/Firefox compatibility is not claimed verified.

No credentials were added or changed. The public Google verification token, original contact recipient, donation values, social profiles and content records are retained. A dedicated historical repository secret scan was not performed. Search Console account status, GA4 property configuration, live inbox delivery and real-user CWV require separate account/service evidence.

Reference analysis uses actual desktop/mobile captures of Ecclesia, Charity:Water and Acumen. Lower-page reference motion was not exhaustively audited; no proprietary reference asset or exact layout was copied. Mobbin research was unavailable because it required a paid plan.

Before production: review the complete preview, accept or refine the remaining design/performance limits, obtain explicit deployment approval, deploy the approved revision, and repeat hosted smoke/SEO/image checks. Production is unchanged at the time of this report.
