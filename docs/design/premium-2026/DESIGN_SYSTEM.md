# Design system: homepage checkpoint

Implementation: src/pages/premium-home.css, scoped beneath .premium-site and .premium-home. Internal pages retain their previous system until homepage approval.

Tokens: emerald #103F35; citrus #C9F36A; cream #F7F5ED; ink #17231E; muted #4B6057; line #CED8CE; orange #F4A261 (reserved, not used indiscriminately). Primary action white on emerald; hover white on #245A49. Secondary action emerald on cream; hover #E6EDDC. Focus #865017, 3px outline with 5px offset. Existing success/error/consent states remain in the preserved internal pages; they have not been restyled at this checkpoint.

Manrope variable 400–800 for headings; DM Sans variable 400–800 for body. WOFF2 Latin payload totals 61,464 bytes, font-display swap; licenses are in public/fonts/premium. Display heading fluid 44–68px on desktop and 37–55px on small screens. Section headings 32–55px, body 16px, lead 19–23px, supporting metadata 12–14px. These sizes are design choices, not WCAG requirements.

Container maximum 1320px; gutters 20–64px. Section spacing 56–112px. Split hero, three-part institutional introduction, ruled programme list, asymmetric story feature, dark vision statement, journal split and citrus involvement section provide distinct compositions without repeated rounded cards. Responsive changes at 767px and 1099px. Header uses existing 1100px navigation breakpoint.

Primary/secondary actions have minimum 50px height; icon programme links minimum 44×44px. Existing navigation, footer and form/link destinations remain. Rounded editorial image corner is specific to the hero; documentary captions identify context. No fabricated image, outcome or testimonial.

Motion: 180ms button feedback; 200ms programme-link feedback; 300ms image zoom; 480ms one-time intersection reveal; 650ms hero entrance; 220ms mobile menu opening. Reveal content is visible by default, including without JavaScript. MatchMedia reduced-motion prevents JS reveal; CSS disables animation/transitions for reduced-motion. No scroll hijacking, counters or perpetual motion.

Future component extraction across internal pages is gated by homepage approval. Current reusable checkpoint pieces are Action, programme-row mapping, native editorial links and the shared homepage token scope. Existing form/dialog/accordion primitives remain in use outside the new homepage.
