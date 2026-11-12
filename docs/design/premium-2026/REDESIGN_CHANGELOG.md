# Redesign changelog

Status: homepage approval checkpoint, not a completed site-wide redesign.

Dedicated branch redesign/premium-2026 starts from the existing committed privacy-notice correction (128992f); the untracked discovery document was preserved. No production branch edits or deployment are authorized by this checkpoint.

Rebuilt homepage composition with scoped emerald/citrus tokens, variable Manrope/DM Sans fonts, editorial programme rows, photographic outreach feature, vision block, original published story and involvement pathways. Scoped header/footer appearance only on home. Removed repeated mission-card/FAQ composition from the homepage; institutional details and enquiry questions remain on their existing pages. Preserved actual programme wording, dates, locations and destinations. No new beneficiaries, outcome counts or organisations.

Added premium-check.mjs for eight-width screenshots, reflow, image completion, mobile menu and axe checks. No runtime package was added. Lighthouse is installed only in the session's intermediate tools directory for controlled measurements. Font files and their OFL notices are site assets. The earlier general design regression test remains unchanged and passes. The new homepage check is included in the existing pull-request QA workflow.

No Next.js migration, new CMS, new contact recipient, production credential change or external account publication.
