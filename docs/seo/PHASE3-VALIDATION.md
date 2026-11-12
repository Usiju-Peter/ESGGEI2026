# Measurement and accessibility follow-up — 12 November 2026

Reviewed merged PRs #1 and #2 and all existing `docs/seo/` documents. React + Vite, prerendering, React Router and the eight public routes are preserved.

## Public and account evidence

- Live sitemap fetched successfully and lists all eight canonical URLs.
- `https://esggei.org.ng/` responds with HTTP 308 to `https://www.esggei.org.ng/`.
- Google verification assets are already in the repository. Their presence does not establish verified ownership.
- Adzviser workspace discovery returned an empty list. This environment has no configured Google credentials. No Search Console submission, URL Inspection result, GA4 property creation or production measurement ID is claimed.
- A public PageSpeed Insights API request returned HTTP 429 `RESOURCE_EXHAUSTED` (daily quota). No CrUX percentile, field pass/fail or INP value could be established from that response.

## Implemented

- Consent-gated `web-vitals` collection of document LCP (ms), INP (ms), CLS (unitless), rating, delta and metric ID through GA4 `web_vitals` events. Observers start once after opt-in, and callbacks recheck consent. This measures document lifecycles, not separate SPA soft-navigation vitals. The route identifies the document's initial path.
- Analytics withdrawal sets GA's measurement disable flag and updates analytics consent. No Google script is requested before acceptance. Explicit page views remove query strings and fragments; default referrer is reduced to its origin. Advertising storage, user data and personalization are denied.
- Measured text contrast failures on inner pages are corrected with darker text or reduced transparency, preserving the brand palette for decoration.
- About and Team biography dialogs have accessible names, initial focus, Tab containment, Escape dismissal, scroll locking and focus restoration. Gallery lightbox contains Tab navigation.
- Programme headings now say “Programme Priorities” and “Programme Area” rather than implying scheduled upcoming events without published schedules. This uses existing programme content and adds no new impact claims.
- Mobile (390×844) and desktop (1440×900) axe WCAG A/AA audits cover all eight pages. CI retains full JSON including issues needing manual review, and blocks on detected violations. Automated checks do not establish full WCAG conformance.

## Account completion checklist

1. In Search Console select domain `esggei.org.ng` or URL-prefix `https://www.esggei.org.ng/`. Confirm ownership using the correct account's token/DNS record; do not replace existing verification assets blindly.
2. Submit `https://www.esggei.org.ng/sitemap.xml` once. Inspect home, projects and article URLs. Record Google-selected canonical, last crawl and any exclusion reason before deciding whether an indexing request is warranted. Google decides indexing; submission is not a guarantee.
3. Select/create the organisation's GA4 property and HTTPS www web stream. Confirm the owner's desired timezone and data-retention settings. Add its real `G-…` ID as `VITE_GA4_MEASUREMENT_ID` in the correct Vercel project, then rebuild.
4. Disable Enhanced Measurement's automatic history/page-change page views because React already sends manual route page views. Disable unnecessary automatic form tracking; never send form contents. Verify one page view per navigation and consent withdrawal in Tag Assistant/DebugView with the real stream.
5. Register event-scoped dimensions `metric_name`, `metric_rating`, `page_path` and custom metric `metric_value` (standard unit). Keep metric IDs out of registered dimensions because of cardinality. Separate metrics by name: LCP/INP are milliseconds, CLS is unitless. For accurate p75 from event rows, export to BigQuery and retain the last event per metric ID before aggregation. Do not average these metrics to report a CWV pass.
6. Once real traffic accumulates, compare mobile/desktop p75 against LCP ≤2500 ms, INP ≤200 ms and CLS ≤0.1 over a rolling 28 days. Consent-only telemetry is a sample and can differ from CrUX. Report sample counts and missing metrics; no interaction can mean no INP.

## Content follow-up

Existing programme descriptions support clarifying navigation and labels. The repository does not independently establish future programme dates or new beneficiary outcomes. Before new outreach reports are published, obtain a dated programme record, location, approved outcomes, image permissions and responsible reviewer. Once Search Console is available, use actual query/page impressions and CTR to prioritize briefs in `CONTENT-STRATEGY.md`; keyword demand remains unverified.

## Validation results

- `npm ci` succeeded using a workspace-local npm cache; default home cache was not writable.
- TypeScript (`npm run lint`), source sitemap/SEO checks, production build and built-HTML checks passed.
- Chromium smoke checks passed all eight routes with no reported hydration or uncaught runtime errors, plus navigation and HTTP 404 checks.
- Final axe run: 16 scans (8 routes × 2 viewports), zero detected A/AA violations. Biography keyboard focus, Tab containment, Escape and focus return passed on About and Team at both widths. The retained JSON also contains incomplete checks requiring human review.
- Mocked Google requests: no analytics request before consent, one script load after acceptance, sanitized page-view URL, disabled tracking after withdrawal, and reacceptance passed. This does not establish delivery to a real GA4 property.
- Vercel API confirmed `www.esggei.org.ng` belongs to `esggei2026` (`prj_Y6gXCmvMYIIh0dz6Q6XgIIT1FABH`), not `esggei`. The project environment-variable list was empty. Configure the actual Measurement ID on `esggei2026`. Vercel's domain verification is separate from Google Search Console ownership.
- The public Google verification HTML path redirects with HTTP 308 to the extensionless path, which returns the expected verification text with HTTP 200. Confirm Google's ownership check in the authenticated account.
