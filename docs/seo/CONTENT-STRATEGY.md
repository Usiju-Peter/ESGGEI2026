# ESGGEI Organic Search Growth Strategy
Prepared 12 November 2026. This is a content and measurement roadmap, not invented search-volume research.

## Positioning and audiences
EarthSprings Global Grace Empowerment Initiative (ESGGEI) works with underserved communities on education, sustainable agriculture, literacy, gender equity and social support in Nigeria. The website should help potential partners, donors, volunteers, communities and researchers quickly understand verified programmes and contact the organization.

## Existing landing pages and keyword hypotheses

| Target page | Primary search-intent hypothesis | Supporting variations | Primary visitor action |
| --- | --- | --- | --- |
| / | ESGGEI / EarthSprings Global Grace Empowerment Initiative | EarthSprings NGO Nigeria, ESGGEI Abuja | Explore projects |
| /about | ESGGEI mission and vision | about EarthSprings NGO, Nigerian community development charity | Understand the organisation |
| /projects | community empowerment programmes Nigeria | education support, sustainable farming, women empowerment projects | Explore the work |
| /gallery | ESGGEI outreach photos | NGO community outreach photos Nigeria | Review real programme evidence |
| /team | ESGGEI leadership team | EarthSprings NGO team | Build trust |
| /partner | partner with NGO in Nigeria | collaborate with community NGO, support education outreach | Contact/partner |
| /blog | ESGGEI community stories | Nigeria community development stories | Read authentic reporting |
| /blog/from-purpose-to-action | story behind EarthSprings | why ESGGEI was founded | Understand mission |

**Important:** These are unverified search-term hypotheses, not claims of search demand or ranking. Prioritize/adjust using Search Console queries, impressions, CTR and conversions once account access is connected.

## Content clusters and briefs

All new content must be grounded in interviews, dates, named places, original photographs, programme documents, and approved impact figures. Never invent people, outcomes, quotations or beneficiaries.

| Cluster | Proposed useful article | Original evidence required | Relevant internal links |
| --- | --- | --- | --- |
| Education | How community education support is planned | Programme process, staff interview, actual examples | /projects, /partner |
| Education | What a back-to-school outreach needs | Verified materials checklist and real project notes | /projects, /gallery |
| Agriculture | Practical sustainable farming training for community groups | Qualified trainer input, region-specific practices | /projects, /partner |
| Agriculture | Lessons learned from a real agricultural workshop | Date, venue, trainer, participant-approved photos | /gallery, /projects |
| Women's livelihoods | Approaches to community-led skills empowerment | Programme leader explanation and outcomes | /projects, /partner |
| Inclusion | Designing outreach for underserved communities | Accessible implementation examples and source checks | /about, /projects |
| Project reporting | Recap of each completed outreach | Date, location, objectives, approved photos, what changed | /projects, /gallery |
| Partnerships | What ESGGEI looks for in a community partner | Verified eligibility and partnership process | /partner, /about |
| Governance | How the organisation measures programme progress | Actual evaluation framework and publicly approved metrics | /about, /team |
| Volunteering | What volunteers should expect at an outreach | Real roles, safeguarding process, registration instructions | /partner, /gallery |
| Transparency | A readable annual programmes update | Approved annual report, figures and financial disclosures | /about, /projects |
| Community stories | An interview with a project participant (with consent) | Written informed consent, non-exploitative storytelling | /gallery, /projects |

## Publication checklist
- Research user need first; avoid keyword stuffing and duplicate thin pages.
- Confirm claims with programme owners and primary records.
- Include a clear byline/publisher, meaningful date, substantial unique text, descriptive headings, original or licensed images, appropriate alt text.
- Link from the related programme page and back to relevant project/partnership pages with human-readable anchor text.
- Add article to `src/blogData.ts` and a route-specific static HTML entrypoint until the project has an automated article route generator.
- Run `npm run seo:check`, `npm run build`, `npm run seo:check-built`, browser tests and inspect the built sitemap.
- Do not change a publication date merely to imply freshness.
- Review content quarterly for accuracy, especially contact and eligibility details.

## Measurement plan
With properly authorized Search Console access, record monthly branded/non-branded queries, clicks, impressions, average position, CTR, indexing coverage and sitemap health. Annotate publication and technical changes. With a legitimate GA4 property and consent, track landing-page sessions, engaged sessions, referrals and contact-form completions (not the submitted personal data). A useful target is improving qualified partnership enquiries, not just traffic.

## Trust and safeguarding
- Show only verifiable impact outcomes. Report context and limitations, not just achievements.
- Obtain specific consent before publishing identifiable beneficiaries, especially minors or vulnerable people.
- Confirm current programme availability before offering applications or donations.
- Avoid false testimonials, fake ratings or unsupported FAQ rich-result markup.
- Keep social media links restricted to verified ESGGEI profiles.

## Implemented visibility follow-up
The Guruku Gbayi outreach report, partnership FAQs and downloadable organisation overview now reuse existing website evidence. See [visibility operations and remaining account tasks](VISIBILITY-OPERATIONS.md) for the evidence trail, release status, monthly review template and unsent promotion drafts.
