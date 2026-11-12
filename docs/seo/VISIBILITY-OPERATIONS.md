# Visibility implementation and remaining work

Prepared 12 November 2026. This document distinguishes implemented work, account tasks and evidence requirements. React + Vite remains the architecture.

## Implemented in this release

- A crawlable outreach report at `/projects/guruku-gbayi-outreach`, linked from Home, Projects, Gallery and Partner.
- A website privacy notice at `/privacy`, linked from the footer, contact form and optional analytics notice.
- A downloadable plain-text organisation overview at `/esggei-organisation-profile.txt`.
- Partnership/volunteering guidance and visible FAQs using existing programme information. No promised vacancies, response deadline or application availability.
- Consistent NGO identity, WebSite and breadcrumb JSON-LD on all pages; client navigation updates the graph rather than retaining the previous page's schema.
- Visible breadcrumbs matching the structured data, including Projects/Blog hierarchy.
- One public route registry shared by sitemap generation, prerendering, browser checks and accessibility scans. Both new pages are built and listed in the sitemap.
- Checks for broken internal links, fragment targets, local assets and route-specific structured data.
- Mobile menu expanded state, Escape dismissal and focus return; reduced-motion handling.
- International telephone links, an optional phone field, a clear contact-form privacy explanation, announced errors, focused success feedback, and rejection of ambiguous service responses.
- Mocked contact success/failure tests that send no email, alongside existing analytics consent tests.
- Weekly production Lighthouse audit (Monday 07:00 UTC / 08:00 Nigeria time), retaining reports. This is lab monitoring, not field CWV data.
- Production Node fallback now responds HTTP 404 for unknown pages instead of serving the homepage with HTTP 200.

## Content evidence and limits

The outreach date (27 June 2026) and location come from `featuredProject` in `src/data.ts`. Activities come from the existing homepage narrative and gallery captions. Existing published photographs are reused; no new beneficiary identities, quotes, partner names, attendance counts, outcomes, medical claims or impact totals are introduced. Original programme records and image permissions remain the organisation's responsibility. The new overview summarizes existing website content and is not a registration certificate or audited annual report.

No registration number, charity accreditation, donor testimonial, office eligibility, financial disclosure or safeguarding policy was invented. Existing social URLs are retained from the website; availability and account control need owner confirmation. No new testimonials or review markup were added.

## Release status and blocker

PR #3 was merged after its successful CI and preview checks. Vercel `esggei2026` rejected its main-branch deployment with `build-rate-limit`. The duplicate `esggei` project does not serve the public domain. Do not move domains, buy a plan or change protection settings to get around the limit. Once builds are available, deploy the tested main commit to `esggei2026`, then check all ten routes, sitemap, verification assets, HTTP 404 and form/consent behavior on production. A successful Git merge alone is not evidence of a live release.

## Owner/account tasks still required

| Task | What is needed | Completion evidence |
| --- | --- | --- |
| Confirm Search Console results | Owner reports GSC setup complete; agent has no authenticated access | Verified property, sitemap Success and URL Inspection result |
| Configure GA4 (optional for indexing) | Real web-stream G- ID | Consent and page-view events received in the correct stream |
| Confirm contact delivery | Intended inbox and FormSubmit activation | Owner confirms receipt of an explicitly agreed test enquiry |
| Resolve inbox mismatch | Public email is `esgeei@gmail.com`; fallback form endpoint uses `usijup3@gmail.com` | Confirm recipient before changing it; do not silently redirect enquiries |
| Bing Webmaster Tools | Owner sign-in; import verified GSC property where offered or obtain actual verification token | Ownership and sitemap accepted |
| IndexNow | Supported-engine account/verification workflow if chosen | Valid ownership key hosted and accepted submission; not Google indexing |
| Google Business Profile/Bing Places | Eligible real-world operation and owner account | Eligibility checked, accurate profile verified; no virtual/fake office |
| NGO directories | Confirm registration/status, authorised details and official directory destination | Accurate approved listing published |
| Partner backlinks | Genuine relationship and a named contact | Partner voluntarily publishes a relevant link |
| Press and social promotion | Approved story/materials, real account access and explicit sending/publishing instruction | Actual publication URL |
| Additional reports | Original records, dates, outcomes, permissions and reviewer | Reviewed content with sources |
| Annual/financial report | Approved organisation records | Published accurate accessible report |
| Registration/governance/safeguarding pages | Real documents and authorised owner statements | Approved policy or record, never generated commitments |
| Field CWV | Active consent-based telemetry and enough real traffic | Samples and mobile/desktop p75 by metric; report missing data |
| Accessibility | Manual assistive-technology review in addition to automated scans | Screen-reader review and findings resolved; no blanket compliance claim |
| Hosting/domain renewals | Account owner billing and renewal preferences | Owner confirms renewal settings; no purchases made |

## Monthly review

Use `monthly-review.csv` as an empty tracking template. Record Search Console clicks, impressions, CTR, branded queries, indexing reasons and useful enquiries. Keep zero separate from unavailable data. Annotate technical changes and new reports. Inspect pages with impressions but weak CTR before changing titles. Keep publication dates truthful. Record 28-day CWV sample sizes and p75 only after sufficient data exists.

## Prepared promotion materials (drafts, not sent)

### Partner website request

Subject: Link to ESGGEI's community work

Hello [confirmed partner contact],
If it fits your organisation's resources or collaboration page, please consider linking to EarthSprings Global Grace Empowerment Initiative: https://www.esggei.org.ng/. Our Guruku Gbayi outreach page provides context and photographs: https://www.esggei.org.ng/projects/guruku-gbayi-outreach. Please describe any relationship only as agreed between our organisations.

### Social update

Explore ESGGEI's Integrated Agriculture & Medical Outreach in Guruku Gbayi Community, Karu LGA, Nasarawa State. Read about the gathering and view photographs from the outreach: https://www.esggei.org.ng/projects/guruku-gbayi-outreach

### Directory description

EarthSprings Global Grace Empowerment Initiative (ESGGEI) works on community empowerment through education, sustainable agriculture, literacy, gender advocacy and social support in Nigeria. Programme information, leadership biographies and partnership contact details are available at https://www.esggei.org.ng/.

Before using any draft, confirm that the page is live, the destination and account are genuine, and the organisation approves the publication. Do not claim government endorsement, tax status or measured impact without records.

## Validation evidence

Local TypeScript, source SEO/sitemap checks, production build and ten-route prerender checks passed. The site-quality check validated 10 route schemas, 299 internal links and 111 local asset references. Axe completed 20 scans (10 routes at mobile and desktop widths) with zero detected A/AA violations; 14 incomplete checks remain human-review items. Chromium checks passed all routes with no observed hydration or runtime errors, plus mobile navigation, route-schema updates, mocked contact success/failure/ambiguous responses, FAQ keyboard activation, gallery focus wrapping/Escape/restoration and HTTP 404. Analytics consent/withdrawal/redaction checks passed with Google requests mocked. These tests do not confirm actual email delivery, Google indexing, GA4 delivery or full assistive-technology conformance.

## Design follow-up
See [the site design refinement](../design/SITE-REFINEMENT.md) for the layout changes, retained content and measured before/after comparison. The earlier build-rate blocker described above is historical: commit `18d1565` was subsequently deployed and checked on the public domain.
