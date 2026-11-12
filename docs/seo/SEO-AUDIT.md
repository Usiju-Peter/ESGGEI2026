# ESGGEI SEO audit and implementation plan

Audit date: 2026-11-12. Target site: https://www.esggei.org.ng/. Repository: `Usiju-Peter/ESGGEI2026`.

## Verified from repository

- React 19, React Router 7, Vite 6, Express 4, and distinct Vite HTML entrypoints for eight public routes.
- Existing page-specific title, description, canonical, Open Graph and social cards.
- Existing robots.txt permits crawling and references the sitemap.
- Existing site-wide NGO and page-level structured data. Review for duplication and ensure FAQ markup corresponds to visible content.
- Existing Google Search Console verification token; analytics snippet remains a commented placeholder.
- Sitemap contained five routes, omitting `/gallery`, `/blog` and `/blog/from-purpose-to-action`. Fixed on this branch.
- Production Express fallback sends `index.html` for any unmatched route. Confirm how Vercel actually serves static page entrypoints; do not assume a deep URL is prerendered just because a corresponding HTML file exists.
- `public/_redirects` also contains a catch-all rewrite; confirm hosting precedence before altering redirects.
- The blog content is maintained in `src/blogData.ts`; ensure sitemap and metadata update when articles are added.
- Homepage preloads the logo and AVIF hero; verify competing high-priority preloads against actual LCP element.

## Prioritized next actions

1. **P0:** Verify each deployed route's raw HTTP response, response code, canonical and visible indexable content without JavaScript. Fix routing or implement pre-rendering/SSR where necessary.
2. **P0:** Confirm unknown URLs return a real HTTP 404 rather than an indexable duplicate home page.
3. **P1:** Test web performance on mobile and desktop using Lighthouse/PageSpeed Insights and real-user Core Web Vitals. Measure LCP, INP and CLS rather than assuming a score.
4. **P1:** Validate NGO/WebSite/WebPage/BlogPosting/Breadcrumb schemas against page contents and Google's supported rich-result types; remove unsupported or fabricated claims.
5. **P1:** Configure accurate GA4 measurement with user approval and privacy considerations, and check Google Search Console indexing, coverage and submitted sitemap.
6. **P1:** Check all navigation, image paths, internal links, heading hierarchy, text contrast, form labels, focus visibility and mobile layouts.
7. **P2:** Prepare an editorial plan for education, agriculture, livelihoods, gender advocacy, and local community work based on real first-hand project information, avoiding thin automated copy.
8. **P2:** Add comprehensive CI checks for production builds, crawls, accessibility, structured data, link integrity and performance budgets.

## Verification

Run `npm run seo:check` to validate the public route sitemap, static HTML metadata and social tags. This script checks source files, **not** actual live server behavior.

Run `npm run lint` and `npm run build` after changes. These have not been executed in this connector-only session.

Do not claim Google indexing, performance scores, or ranking changes without measured evidence. Do not merge or deploy unchecked changes automatically.
