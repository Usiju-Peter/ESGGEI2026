# Site architecture

React 19, React Router and Vite remain. Ten individual HTML entrypoints build and prerender meaningful content before hydration. No URL migration or new redirects were required.

| Route | Purpose and composition |
| --- | --- |
| / | Mission hero → qualitative focus strip → introduction → programme rows → documented outreach → vision → published story → involvement |
| /about | In-page navigation → institutional narrative → real photograph → principles → mission/vision → objectives → leadership → partnership CTA |
| /projects | Documented outreach → anchored programme directory with activities, intended beneficiaries and desired outcomes → partnership CTA |
| /projects/guruku-gbayi-outreach | Date/location → preserved report → contextual documentary images → programme/contact links → sharing |
| /gallery | Featured outreach → complete editorial photo collection → keyboard-accessible full-image viewer |
| /blog | One published feature with category, date and reading time; no artificial collection or empty filters |
| /blog/from-purpose-to-action | Existing article → contents navigation → complete text/images → related programme/contact pathways → sharing |
| /team | Existing portraits, roles and short biographies → full biography dialogs → team contact CTA |
| /partner | Direct email/phone → labelled enquiry form → guidance/download → original donation details → social profiles → native FAQs |
| /privacy | Existing notice → hosting/form/optional analytics disclosures → consent preferences when configured → contact |

Primary navigation remains Home, About, Projects, Gallery, Blog, Team and Contact Us. Breadcrumbs, About anchors and programme anchors retain their destinations. All existing article dates, biographies, contact and donation information, organisation profile download, social links, sitemap, robots, canonical URLs and structured data remain.

Partner/donor journey: mission → documented work → programme context → enquiry or existing donation details. Volunteer journey: involvement → enquiry and availability; no placement is promised. Research/journalist journey: mission/leadership → outreach report and gallery → direct contact. Community visitor: programme information → contact.

Content remains source-managed in src/data.ts and src/blogData.ts. Route inventory is src/publicRoutes.json; new routes must also update HTML entrypoints, Vite inputs, metadata, breadcrumbs/structured data and sitemap tooling. There is one published article and one documented outreach, so pagination, search and category filters were not introduced.
