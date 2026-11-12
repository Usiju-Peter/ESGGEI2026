# Google Search Console and GA4 integration status (12 November 2026)

## Search Console
The live website already contains a Google site-verification meta tag and a verification HTML file, and the production sitemap is publicly accessible at `https://www.esggei.org.ng/sitemap.xml`. This **does not prove** that an authenticated account has verified ownership or submitted the sitemap. Search Console property and indexing reports require authorization.

Once connected to the correct property:
1. Confirm domain property `esggei.org.ng` or URL-prefix property `https://www.esggei.org.ng/`.
2. Verify both homepage and canonical article URLs using URL Inspection.
3. Submit `https://www.esggei.org.ng/sitemap.xml` in Sitemaps, and inspect coverage reasons.
4. Compare branded and non-branded query clicks/impressions/CTR, and investigate genuine indexation problems.
5. Avoid repeated requests to index unchanged pages.

## GA4
The application now supports `VITE_GA4_MEASUREMENT_ID`. No real measurement ID was supplied, and no ID was fabricated. When a valid G- ID is configured:
- An opt-in banner is displayed (initially hidden until client mount).
- No Google Analytics script is loaded before a visitor explicitly accepts.
- Upon acceptance, one page-view event is sent for the current route and route changes. The visitor can decline.
- Do not capture form values or beneficiary personal information.
- Test consent and page_view behavior in Google Tag Assistant/DebugView before considering measurement complete.

Configure `VITE_GA4_MEASUREMENT_ID` in the project's Vercel settings, then rebuild. Consult qualified legal/privacy counsel about the site's notice and consent obligations for the actual audiences/jurisdictions.

## Public baseline (Lighthouse, 12 November 2026)
The first successful GitHub Actions Lighthouse run #43225219045 measured:
- Mobile simulated performance: 99/100; LCP 2120 ms, FCP 964 ms, CLS 0, TBT 19.5 ms.
- Desktop simulated performance: 100/100; accessibility 96, best practices 100, SEO 100; LCP 618 ms, FCP 323 ms, CLS 0.
These are lab results, not field Core Web Vitals or INP measurements. Future runs may vary by network and configuration. See the workflow artifact for full audit JSON.

## Follow-up
See [phase 3 validation and account completion steps](PHASE3-VALIDATION.md) for full-site accessibility results, consent-gated real-user instrumentation, current access limitations and the confirmed Vercel project.
