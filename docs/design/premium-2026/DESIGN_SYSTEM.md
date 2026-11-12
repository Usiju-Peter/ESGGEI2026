# ESGGEI design system

The user provisionally approved the homepage direction on 12 November 2026, subject to later changes. The system now covers all ten public routes. Production publication is a separate approval.

## Foundations

`src/styles/premium-system.css` owns the self-hosted fonts, brand tokens, masthead, footer and focus treatment. `src/design-system.css` provides semantic layout, reading, form, dialog and navigation primitives. `src/styles/premium-pages.css` composes the internal pages. `src/pages/premium-home.css` contains homepage composition only. `src/index.css` supplies Tailwind and base rules. Layered focus rules deliberately sit in `@layer base` so they override the existing important base focus declaration correctly.

| Token | Value | Use |
| --- | --- | --- |
| --p-emerald | #103F35 | Brand, headings, primary action, dark surface |
| --p-citrus | #C9F36A | Involvement surfaces, vision accent, inverse focus |
| --p-cream | #F7F5ED | Main reading surface |
| --p-soft | #E9EFDF | Programme, approach and support surfaces |
| --p-ink | #17231E | Body copy |
| --p-muted | #4B6057 | Secondary text |
| --p-line | #CED8CE | Rules and borders |
| --p-hover | #245A49 | Primary hover |
| --p-focus | #865017 | Focus outline on light surfaces |
| --p-success | #1F613F | Accepted-message state border |
| --p-warning | #805100 | Reserved semantic warning |
| --p-error | #9D2E27 | Form failure text and border |
| --p-orange | #F4A261 | Reserved accent; not required on every page |

Manrope variable headings and DM Sans variable body use self-hosted Latin WOFF2 files, `font-display: swap` and preload hints in all ten HTML entrypoints. Combined font payload: 61,464 bytes; OFL notices accompany the files. Homepage H1: 44–68px desktop, 37–55px narrow layouts. Internal page mastheads: 40–80px; reports/articles: 35–58px. Section titles: 29–48px; card/profile titles: 21–30px. Body 16px; long articles 17–18px with 1.8 line height. Supporting captions 12–13px. Reading columns remain approximately 72–78ch.

Container maximum 1320px, responsive 20–64px gutters; header shell maximum 1360px. Sections generally 56–112px. Layout changes at 767px/768px and 1099px/1100px, with the existing contact split beginning at 1024px. Minimum action height 50px; text links, menu controls, footer navigation and modal controls have at least 44px target height. Inline text links retain their normal reading flow.

## Components and compositions

PageHero provides an editorial label, large title and supporting introduction. ActionLink supplies primary, secondary, light and text variants. CallToAction uses citrus with a dark actionable link. ProjectFeature presents a real report with documentary imagery. TeamGrid provides consistent portrait frames, existing short biographies on the Team page and accessible biography dialogs. ArticleShare uses native external sharing/email links without third-party scripts. DocumentaryImage supplies responsive AVIF/WebP sources while preserving originals. Native details/summary controls remain for FAQs. Existing mobile navigation, breadcrumbs, contact validation, consent and privacy controls remain functional.

About uses a two-part narrative, panoramic photograph, numbered principles, dark mission/vision spread and open leadership portraits. Projects uses a real outreach feature plus a ruled directory of three priorities. Gallery uses a sequential editorial grid and lightbox with captions. Blog features its one genuine article. Articles use a comfortable reading column, a contents list where appropriate and native sharing. Contact provides direct email/telephone access before the form, followed by partnership guidance, donation information and FAQs. Privacy uses restrained reading typography.

## Images, motion and accessibility

`generate-responsive-images.mjs` creates gallery AVIF derivatives at 480/768/1200px and WebP at 480/960px, plus WebP portraits. Generated directories are ignored; predev/prebuild regenerate them from retained originals. No synthetic documentary image or external stock asset was introduced. Full-resolution gallery originals remain in the lightbox.

Motion: 180ms action feedback, 200ms programme feedback, 300ms image zoom, 480ms selected homepage reveals, 600ms internal introduction, 650ms homepage entrance and 220ms mobile menu. Content is present in prerendered HTML and remains visible without JavaScript. Reduced-motion preferences disable animation and smooth anchor scrolling. There is no parallax, scroll hijacking or perpetual movement.

Focus is a 3px outline with 5px offset: brown on light surfaces and citrus on dark sections/footer. Forms have visible labels, required/optional distinctions and announced states. Dialogs support focus wrapping, Escape, scroll locking and focus restoration. Page content uses one main H1 and semantic headings. Automated checks supplement keyboard and screenshot review; they do not establish complete WCAG conformance.
