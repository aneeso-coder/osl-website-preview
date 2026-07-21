# Obsidian Supported Living — website redesign

A self-contained static site. No framework, no build step, no external requests.
Upload the contents of this folder to the web root and it runs.

**Three HTTP requests per page** (HTML + one CSS + one JS). The current site loads 36
scripts for a brochure site.

```
redesign/
├── index.html                    ├── privacy-policy.html
├── our-support.html              ├── cookie-policy.html
├── property-solutions.html       ├── accessibility-statement.html
├── for-professionals.html        ├── safeguarding.html
├── about.html                    ├── complaints.html
├── careers.html                  ├── sitemap.xml
├── contact.html                  ├── robots.txt
├── easy-read.html                └── assets/
                                      ├── osl.css
                                      └── osl.js
```

---

## 1. Design plan

### The idea

Obsidian is volcanic glass. It is not neutral black — its thin edges are translucent
and sheen obsidian throws a plum and gold lustre. That single material fact drives
every decision below.

The existing magenta (`#CC319B`) is not thrown away — it is **cooled and deepened into
mulberry**. Brand recognition survives; the generic candy tone and the marginal 4.69:1
contrast do not.

The brief asked for a warm neutral. Warm here does **not** mean the cream-and-terracotta
palette that every care and wellness site currently reaches for. The warmth comes from
the plum itself: the neutrals are white and grey **biased toward the mulberry**, so they
read as chosen rather than inherited. There is nothing sage or teal anywhere — that is
the care-sector default and it says nothing.

### Colour — 6 named values

| Token | Light | Dark | Role |
|---|---|---|---|
| `--paper` | `#FBF8F9` | `#15111A` | Page ground — plum-biased white / obsidian |
| `--surface` | `#F2EAEE` | `#1F1926` | Cards and insets |
| `--ink` | `#1C1620` | `#F0E9ED` | Body text — **16.8:1** / **15.6:1** |
| `--ink-2` | `#4E4553` | `#B9AEBC` | Secondary text — **8.6:1** / **8.0:1** |
| `--mulberry` | `#7B2352` | `#D98FB8` | Identity and links — **9.0:1** / **7.6:1** |
| `--sheen` | `#E39B2E` | `#E39B2E` | Signal accent — obsidian's gold lustre |

**Every** text pair on the site was computed and verified, not eyeballed. The lowest
text ratio anywhere is 6.03:1 — comfortably past the 4.5:1 AA floor. The lowest
non-text ratio is 3.09:1, past the 3:1 floor. Nothing resembling the current
`#AAAAAA`-on-white (2.32:1) exists.

`--sheen` is only **2.21:1** on light paper. That is deliberate and it is governed: gold
is **never** text on a light ground. It is a *fill* carrying obsidian text (7.9:1), the
focus ring on dark grounds, and the eyebrow rule. Boldness is spent in exactly one
place — the referral CTA on the obsidian panel.

Obsidian bands re-scope the same six tokens rather than introducing new colours, so
every component works on a dark ground without a single component-level override.

### Typography — 3 roles

- **Display — Charter** → Iowan Old Style → Sitka Text → Cambria → Georgia.
  A warm transitional serif: sturdy, credible, not precious. It evolves the current
  Bitter slab rather than abandoning it. Every fallback in the chain is warm, so a
  substitution degrades quietly.
- **Body — Source Sans 3** → Segoe UI → Avenir Next → system-ui.
  Humanist, open apertures, built to stay legible for older carers and readers with
  visual impairments. Replaces Helvetica.
- **Utility — mono** (SF Mono / Consolas). Reserved for **regulatory identifiers only**:
  CQC IDs, company number, phone, postcode. It is the only mono on the site, and it
  gives a commissioner the texture of a record rather than of marketing copy.

Base **17px** (`html { font-size: 106.25% }`), scale ≈1.25, measure 65ch.

> **On webfonts:** no font is linked or embedded. A CDN link would be an external
> request (ruled out); embedding a face as a base64 data URI would add ~100KB+ per
> weight to every page for a site whose audience includes people on poor mobile
> connections. Font stacks with deliberately warm fallbacks were the better trade.
> If the client licenses Charter and Source Sans, self-host them in `/assets/` and add
> `@font-face` with `font-display: swap` — nothing else needs to change.

### Layout

A light paper page interrupted by full-bleed **obsidian ledger bands** that carry the
evidence a commissioner needs: registration facts, the leadership trio, the referral
steps. The hero is asymmetric — Charter headline left, a faceted obsidian panel right
holding the dual CTA and the honest CQC line.

**The one aesthetic risk:** conchoidal fracture — obsidian's signature break — as a
structural motif. A clipped facet corner on dark panels, and a single diagonal sheen
line across them and across every photo placeholder. It is kept to a whisper: a care
site must not read as a gimmick.

**Structural honesty:** numbered markers (01/02/03) appear on the referral process
**and nowhere else**, because that is the only place where sequence is real information
the reader needs. They are not used as decoration.

---

## 2. Page inventory

| Page | Purpose | Status |
|---|---|---|
| `index.html` | Hero, three audience paths, who we support, the three leaders, RICH, property teaser, news, contact | Built — needs news + photos |
| `our-support.html` | **Hub** — cards to the four service pages + property + easy read, plus CQC registration scope | Built |
| `supported-living.html` | **NEW.** Tenancy separate from support, hours, person-centred in practice (638 words) | Built — needs photo |
| `learning-disabilities-autism.html` | **NEW.** Communication-first, autism-informed, epilepsy, who leads it (716 words) | Built — needs photo |
| `mental-health.html` | **NEW.** Dr Powar's clinical background, recovery-focused, tenancy security (614 words) | Built — needs photo |
| `positive-behaviour-support.html` | **NEW.** Behaviour as communication, restrictive practice position, training (683 words) | Built — needs photo |
| `property-solutions.html` | Tenancy separation, Beacon CIC, Real Tenancy Test + REACH, delivered work | Built — needs photos + specs |
| `for-professionals.html` | **NEW.** Referral route, who we can/can't support, assessment, contacts | Built — **6 blockers** |
| `about.html` | Story, full team bios, RICH, quality & regulation, news | Built — needs story + photos |
| `careers.html` | Why work here, training, vacancies, pay, testimonials, application form | Built — **5 blockers** |
| `contact.html` | Form with consent + "I am a…", NAP, map, hours | Built — needs hours |
| `easy-read.html` | **NEW.** Plain language + symbols | Built — needs co-production |
| `privacy-policy.html` | UK GDPR notice | **Scaffold only** |
| `cookie-policy.html` | Cookie/PECR notice | **Scaffold only** |
| `accessibility-statement.html` | WCAG statement | **Scaffold only** |
| `safeguarding.html` | Safeguarding routes | **Scaffold only** |
| `complaints.html` | Complaints procedure | **Scaffold only** |

**Primary nav (5):** Home · Our Support · About Us · Careers · Contact.
Contact is a top-level link and is never inside a dropdown. Property Solutions sits in
the Our Support submenu; For Professionals is promoted to the persistent header CTA
("Make a referral") alongside click-to-call, on every page, because it is the highest
commercial priority.

### What was fixed from the current site

Alt text on every image · one h1 per page with no skipped levels · WCAG 2.2 AA contrast
throughout · visible focus states · full keyboard operation · reduced-motion respected ·
17px body minimum · `LocalBusiness`+`MedicalBusiness`+`Organization` JSON-LD with full NAP
on all 13 pages · unique title + description + canonical per page · Nottinghamshire in the
h1, titles and copy · footer copyright 2026 · CQC **location** record linked (never a rating
implied) · dead social placeholders removed entirely · consent checkbox on both forms ·
sitemap.xml + robots.txt · sentence case throughout (no more "REGulatory information").

---

## 3. What we need from you — content

### 🔴 Launch blockers

**The five legal pages are scaffolds and must not go live as they are.** Each carries the
correct section structure with `[TO BE COMPLETED]` in every section. They were left empty
on purpose: **a CQC-registered provider must not publish policy commitments it has not
written and approved.** Nothing was generated to fill the space.

| # | Page | Needed |
|---|---|---|
| 1 | `privacy-policy.html` | 15 sections. Special category data (health/disability) must be identified explicitly; the Article 9 condition needs professional review — consent is rarely the right basis for care records. ICO registration number required. **Also needs an easy read version — that is an obligation, not a nicety.** |
| 2 | `safeguarding.html` | 14 sections. **Nottinghamshire County Council / Nottingham City Council safeguarding numbers must be confirmed directly with the councils.** None was guessed — publishing a stale safeguarding number is a genuine safety risk. An out-of-hours route is required and does not exist yet. |
| 3 | `complaints.html` | 11 sections + timescales. Timescales are commitments; none invented. Note the CQC does **not** investigate individual complaints — the page must say so, or it sets people up to be let down. Needs an easy read version. |
| 4 | `cookie-policy.html` | 11 sections. As built the site sets **no cookies** and makes **no third-party requests**; it stores one item, `osl-theme`, remembering your light/dark choice. Add any analytics or embed and a consent banner becomes mandatory under PECR. |
| 5 | `accessibility-statement.html` | 11 sections. **Do not claim a WCAG conformance level until an independent audit confirms it.** The page lists what this build already does, for you to verify and then describe accurately. |

### 🟠 High commercial value — `for-professionals.html`

| # | Needed | Why it matters |
|---|---|---|
| 6 | **Exclusion criteria** — what OSL *cannot* support | Left blank rather than guessed. This is one of the highest-value items on the whole site: commissioners rate providers who are clear about what they decline. |
| 7 | Referral information checklist + an **IG-approved secure route** | Do not publish a route that has not been information-governance approved. |
| 8 | Assessment / proposal / transition detail **and timescales** | A published timescale is a commitment. None invented. |
| 9 | **Downloadable referral form** (accessible PDF or Word) | Deliberately not linked — a broken download on the top commercial page is worse than none. Must be tagged and accessible: an inaccessible PDF from a disability provider is indefensible. |
| 10 | **A form handler.** Both forms `action="#"` | Contact and application forms post nowhere. Needs a backend or a form service, plus spam protection **that is not an inaccessible CAPTCHA**, and the privacy policy completed first — you are collecting personal data. |

### 🟡 Content gaps

| # | Page | Needed |
|---|---|---|
| 11 | `careers.html` | **Pay rates** (hourly, sleep-in, waking night, enhancements, mileage, pension, leave) — the single highest-impact change on the page; care candidates filter on pay first. Plus **real vacancies** (none invented), **staff testimonials** (real, consented, attributable), and the full induction/training offer beyond the four verified courses. |
| 12 | `contact.html` | **Opening hours**, and whether an out-of-hours route exists. Omitted from the JSON-LD too — wrong hours in schema misleads someone in a crisis. |
| 13 | `about.html` | **The founding story** (200–300 words). The facts are in; the narrative must come from the founders. Biggest trust gap on the page. |
| 14 | `index.html`, `about.html` | **2–3 news items.** Strong candidates already verified: Dawn's Proud to Care shortlisting (Nov 2025); the new bungalow; the Beacon partnership. If a news index is built, its h1 must be "Latest News" — never the newest article's title. |
| 15 | `property-solutions.html` | Property specs commissioners read as evidence: door widths, turning circles, hoist provision, wet room spec, parking, EPC, availability. Confirm what may be published without identifying a tenant. |
| 16 | `easy-read.html` | **Must be co-produced and tested with people who have a learning disability**, ideally led by someone with lived experience of learning disability. Licence a recognised symbol set (Widgit / Photosymbols) instead of the custom symbols drawn here, so symbols match what people already know. Add a printable PDF. |
| 17 | JSON-LD | **Confirm the geo coordinates.** Currently town-level for Kimberley NG16 2JW (52.9990, −1.2497) and marked in `build`-time comments. Verify against the building. |

---

## 4. Photography shot list

**Recommendation: commission a professional shoot.** Imagery is the current site's weakest
element and it is actively costing credibility — a blurry, angled phone snapshot of a
laminated "Going on a Car Ride" card is the homepage's main content image; team photos are
casual snapshots against a wooden door; the Services page uses obvious generic stock, which
readers recognise instantly and discount everything around.

**Every photo of a person supported requires documented written consent** — recorded and
retained before publication, with a clear route to withdraw it. This applies to staff
photographs too.

Each placeholder in the HTML carries an `<!-- PHOTO TO SHOOT: … -->` comment and an
`aria-label` holding the **exact alt text** — when the real photograph lands, swap the
`<svg>` for an `<img>` and carry that text across verbatim. Use descriptive filenames
(`bungalow-kimberley-level-access.jpg`), not `pic1.jpg`. Add `loading="lazy"` below the fold.

13 placeholders across 6 pages:

**Priority 1 — the shots that change everything**
1. **A person unlocking their own front door with their own key** (`our-support`). The most
   important image on the site: it says *tenancy, not placement* in one frame.
2. **Two consistent leadership headshots** (`about`) — Dawn and Bal. Same lighting,
   background, crop. This trio is OSL's single strongest trust asset and it currently looks
   like a snapshot against a door.
3. **The new 3-bed wheelchair-accessible bungalow** (`index`, `property`) — exterior with
   level access, plus an interior showing corridor width and turning space. The flagship
   property has no proper photography at all.

**Priority 2 — real evidence, reshot properly**

> **Update — before/after now live.** The old site had **five "before" photographs**
> (`kitchen pre.jpg`, `lounge pre.jpg`, `lounge 2 pre.jpg`, `bedroom pre.jpg`,
> `bedroom 2 pre.jpg`). They were referenced in the page source but never rendered into
> the DOM, so the live site never showed them — the transformation was asserted, never
> seen. All five are now paired with their "after" frame in an accessible comparison
> slider on `property-solutions.html`, plus three unpaired "after" shots (wet room,
> kitchen archway, hallway). Thirteen photographs total, all with descriptive filenames
> and real alt text.
>
> **Pairings** (inferred from window geometry and the view through them — worth a sanity
> check by someone who knows the property):
>
> | Before | After | Room |
> |---|---|---|
> | `kitchen pre` | `PHOTO-2024-05-22-07-36-03` | Kitchen |
> | `lounge pre` | `PHOTO-2024-05-22-07-36-04 (3)` | Lounge, bay window |
> | `lounge 2 pre` | `PHOTO-2024-05-22-07-36-04 (4)` | Second reception |
> | `bedroom pre` | `PHOTO-2024-05-22-07-36-04` | Bedroom 1 |
> | `bedroom 2 pre` | `PHOTO-2024-05-22-07-36-03 (2)` | Bedroom 2 |
>
> **Two caveats carried into the page's own "Content gap" note:**
>
> - **Framing is not matched.** Before shots are landscape (1400×1050); three of the five
>   afters are portrait (1200×1600), shot from different positions. All ten are normalised
>   into one 4:3 frame via `object-fit: cover`. The centre crop happens to work well — it
>   lands on the window/units in every case — but a locked-off camera position would make
>   these far stronger.
> - **The photos evidence build quality, not accessibility.** None shows door widths,
>   turning circles, level entry, hoist provision, grab rails or worktop heights. The wet
>   room's level floor is the only accessibility feature visible anywhere on the site.

**How the comparison slider works:** each pair is a real `<input type="range">` overlaying
two stacked images; the "after" is revealed by `clip-path` driven by a `--pos` custom
property. Keyboard (arrow keys), touch and pointer support are the platform's. Both
photographs carry full alt text and the caption states what changed in words, so a screen
reader user gets the transformation without touching the control. `aria-valuetext`
announces position as language ("Showing the refurbished room"), not a bare number.
Without JS the seam sits at the CSS default of 50% and both images stay readable.

4. **Reshoot the refurbishment with the accessibility specification in frame** (`property`) —
   the existing photos are good enough to keep meanwhile. Show what makes the property
   *suitable*, not merely *smart*: door widths against a measure, turning space, level thresholds.
5. **The bespoke wet room, reshot** (`property`) — straight on, tripod, no people. Show the
   level access and turning circle clearly. The current frame is mostly blank wall panel and
   a towel rail; it undersells the work.

**Priority 3 — warmth and recruitment**
6. **A real support moment** (`index`) — cooking together in a real kitchen, natural light,
   unposed. Replaces the communication-card photo.
7. **A calm one-to-one** (`our-support`) — a conversation over tea. No clinical framing, no stock.
8. **Training in progress** (`our-support`, `careers`) — personal safety interventions, CPR, or
   moving and handling. Real capability evidence *and* a genuine recruitment asset.
9. **The team at Bridge House** (`about`) — professionally shot group photograph.

---

## 5. Accessibility notes for the developer

- Heading order is enforced: exactly one `h1`, then `h2` → `h3`, no skips, on all 13 pages.
- The skip link is the first focusable element on every page.
- Both themes honour `prefers-color-scheme`, and `:root[data-theme]` overrides it in **both**
  directions so the toggle always wins. Choice persists in `localStorage`.
- The nav submenu and mobile menu are keyboard operable with correct `aria-expanded` /
  `aria-controls`, and Escape closes the submenu. Without JS the nav stays visible and every
  submenu destination remains reachable from the footer.
- Decorative SVGs are `aria-hidden`; meaningful SVGs carry `role="img"` + `aria-label`. The
  easy read symbols repeat their adjacent sentence, so they are hidden to avoid double
  announcement.
- Form fields use real `<label for>` — never placeholder-as-label. Hints are wired with
  `aria-describedby`. Both forms carry an explicit GDPR consent checkbox linking to the
  privacy policy.
- No motion beyond a 120ms hover transition; all of it drops under `prefers-reduced-motion`.
- Layout reflows to 400% zoom with no horizontal scroll (verified).

**Before launch:** run an independent audit with real screen reader users, then write
`accessibility-statement.html` from the findings. Everything above is verified by hand and
by an automated pass — that is not the same as an audit, and this is a disability provider.
The bar is exemplary, not adequate.

---

## 6. Verification performed

Every page was checked mechanically, not by eye:

- **Contrast:** 31 token pairs computed against WCAG relative luminance. All pass. Lowest
  text 6.03:1; lowest non-text 3.09:1.
- **Structure:** one h1/page, no skipped levels, `<main>` + skip link present, no `<img>`
  without alt, no unlabelled non-decorative `<svg>`.
- **SEO:** unique title/description/canonical per page, descriptions ≤165 chars, JSON-LD
  parses as valid JSON, carries all NAP tokens, and asserts no rating.
- **Prohibitions:** zero social links, zero CDN/external subresources, zero references to
  the CQC *provider* record, zero stale 2023 strings, footer 2026 on every page.
- **Rules:** ≤5 primary nav items, Contact never in a dropdown, contact form has consent
  checkbox + privacy link + "I am a…" selector, every field labelled.
- **Runtime:** rendered light/dark at 1280px and mobile, no console errors, no layout
  overflow, 3 requests/page, all interactive ARIA states verified.

Two real defects were caught this way and fixed: HTML entities were leaking into the
JSON-LD (`&amp;` reaching crawlers literally, since `<script>` content is not
entity-decoded), and the RICH grid auto-fitted a third column at wide viewports, orphaning
the fourth value on its own row.

---

## 7. Honest limitations

- **Fonts** are system stacks, not the licensed faces — see the note in §1.
- **The forms do not submit.** Wiring them without a completed privacy policy would mean
  collecting personal data with no lawful basis published.
- **No map is embedded** — every third-party map embed loads external scripts and sets
  cookies, which would force a cookie banner and break the zero-external-request property.
  A static map image with alt text plus the current link-out is the recommended fix.
- **No news/blog templating.** Only 2–3 items are anticipated; a CMS would be
  over-engineering. If it grows past ~10, revisit.
- **Nothing was invented.** No testimonials, no vacancies, no pay rates, no case studies,
  no timescales, no exclusion criteria, no ratings, no opening hours, no policy commitments.
  Where the brief asked for a section and the facts did not exist, the section is structured
  and clearly marked rather than filled with plausible fiction. For a regulated care
  provider that is the only defensible choice — and a marked gap is cheap to fix, while a
  published invention is not.


### Why the service pages were split (July 2026)

The submenu previously listed four items that were **anchor links into one 847-word page**
(`our-support.html#mental-health` etc.), each section only 124–234 words. That cost four
distinct commercial searches — "mental health supported living Nottingham", "learning
disability support Nottinghamshire", "autism support Nottingham", "positive behaviour support
Nottingham" — because one URL cannot rank for four intents.

Each is now a real page with its own URL, title, meta description, canonical and `WebPage`
schema, at 614–716 words. Nothing was invented: every claim traces to the CQC register,
Companies House, or the team profiles on the current site. The mental health page in
particular leads with Dr Powar's verified clinical background (consultant psychiatrist since
2011; low secure, forensic, acute/crisis, Care and Treatment Reviews) — a page no local
competitor can write.

`our-support.html` is now a hub rather than a wall of sections.

---

## 8. Deployment & hosting notes (for whoever puts this live)

### 8.1 Brand assets — the logo system

Two treatments were chosen (options **A** and **E** from the colourways proposal); together
they cover every use. **Never redraw the mark — only these files/colours are used.**

| Asset | File(s) | Where it is used |
|---|---|---|
| **Lockup A** — mono mulberry, transparent | `assets/img/obsidian-icon.png` (light) · `obsidian-icon-dark.png` (dark) | Site header, sitewide. Theme-swapped by CSS (`.brand__mark--light/--dark`). |
| **Full lockup** — icon + wordmark | `assets/img/obsidian-logo-full.png` | Letters, documents, email signatures. |
| **Favicon / badge E** — mulberry box | `favicon.ico` (root) · `assets/img/favicon-16/32/180/192/512.png` · `site.webmanifest` | Browser tab, phone home screen, social avatars. |
| **Social share card** | `assets/img/obsidian-social-share.jpg` (1200×630) | `og:image` / Twitter card on every content page. |

> **These were recoloured from the website raster.** For print, signage and large format,
> recolour the **original vector artwork** to mulberry `#7B2352` (identical look, crisp at any
> size). The 16px favicon is inherently soft — the one place a true vector would sharpen it.

**Favicon.** The browser-tab icon (16/32px) is a bold **"O" monogram** on the mulberry badge —
the full hands mark turns to an illegible blob at 16px, so the tab uses a simplified glyph while
the larger app icons (180/192/512px, for phone home screens) keep the hands badge. This is
standard practice. Favicon links use **relative paths** (`favicon.ico`, not `/favicon.ico`) so
they resolve whether the site is opened locally, in a subfolder, or at the hosted root. If a
*new* favicon seems missing it is browser caching — hard-refresh (Ctrl/Cmd+Shift+R); in-app
preview panes often don't render tab icons at all, so confirm in a real browser tab.

### 8.2 Error, maintenance & 404 pages — server wiring

The three status pages exist (`404.html`, `maintenance.html`, `error.html`) and are **fully
self-contained** (inline CSS, logo embedded as base64) so they render even when the server
cannot serve other assets — which is exactly when they are needed. They will **not fire
automatically** until the host is told to use them:

**Apache / GoDaddy (cPanel) — add to `.htaccess` at the web root:**

```apache
ErrorDocument 404 /404.html
ErrorDocument 500 /error.html
ErrorDocument 503 /maintenance.html
```

**To switch the whole site into maintenance mode** (planned downtime), add this above the
rules in `.htaccess`, replacing the IP with your own so you can still see the live site:

```apache
RewriteEngine On
RewriteCond %{REMOTE_ADDR} !^123\.123\.123\.123
RewriteCond %{REQUEST_URI} !^/maintenance\.html$
RewriteCond %{REQUEST_URI} !^/assets/
RewriteRule ^ /maintenance.html [R=503,L]
```

Remove that block to bring the site back. Serving maintenance as **HTTP 503** (not 200) is
correct — it tells Google the outage is temporary so rankings are not affected.

**On WordPress:** the theme's `404.php` replaces `404.html` (port the markup into it).
Maintenance mode is usually handled by a plugin or `wp-maintenance-mode`; feed it the same
`maintenance.html` content. A 500 handler lives in host config as above.

### 8.3 Cache-busting (so updates actually reach returning visitors)

CSS and JS are linked with a version query — `assets/osl.css?v=1`, `assets/osl.js?v=1`.
Browsers cache these files hard; without the `?v=` a returning visitor can keep seeing the
**old** stylesheet after you deploy a change.

**The rule: every time you edit `osl.css` or `osl.js`, bump the number** on every page
(`?v=1` → `?v=2`). That changes the URL, so the browser is forced to fetch the new file,
while still caching aggressively between releases. A find-and-replace across the HTML does it;
in WordPress this is automatic if you enqueue the stylesheet with a version string
(`wp_enqueue_style( 'osl', ..., '2' )`).

Recommended host cache headers: HTML `Cache-Control: no-cache` (always revalidate — pages
change), and long-lived caching for versioned assets and images
(`Cache-Control: public, max-age=31536000, immutable`). The `?v=` bump is what safely lets
the assets be cached for a year.

### 8.4 Template partials & the uniformity rule (for the WordPress build)

The static pages are deliberately built so the repeated furniture is **byte-identical** on
every page. When this becomes a WordPress theme, each of these is **one partial / template
part** — never edited per page:

| Partial | What it is | Per-page variables (the ONLY things that change) |
|---|---|---|
| `header.php` | The masthead: utility bar (call / referral / Easy Read), logo, primary nav | `aria-current="page"` on the active nav item |
| `footer.php` | The three-column footer + legal line | none (identical everywhere) |
| `<head>` partial | charset, viewport, theme-color, favicon set, manifest, theme-init script, versioned CSS/JS, OG/Twitter card | `<title>`, `meta description`, `canonical`, `og:url`, `og:title`, page `WebPage` JSON-LD node |

**The uniformity rule:** if you change the header, footer, or head block, it must change on
**every** page at once. In static HTML that means a find-and-replace across all files; in
WordPress it happens automatically because they're one partial. A divergence audit (compare
the header/footer of every page — they should hash identically) is worth running before any
hand-off. Two small drifts were found and fixed on 2026-07-16 (a missing Easy Read link on
one page; a missing footer legal link on two) — exactly the kind of rot this rule prevents.

**Reusable content components** — these become WordPress **blocks / block patterns**, so an
editor inserts them by choosing a pattern and filling fields, never by copying markup:

| Component | Class | Use |
|---|---|---|
| Linked card | `.card.card--link` | Audience routes, news teasers (whole card is one link — the `card--link` class removes the inner underline; **must** be on the pattern) |
| Ledger | `.ledger` | Key/value contact and fact lists (auto-stacks in narrow columns) |
| Facet panel | `.facet` | Obsidian side-panel for contacts / highlights |
| Figure | `.frame` | A captioned photo in a 4:3 frame |
| Before / after | `.ba__stage` | The drag-to-compare slider (property page) |
| Easy-read row | `.easy-row` | Symbol + plain-text row (easy-read page) |
| Pull quote | `.pull` | Testimonials, staff-survey quotes |
| Callout / note | `.note` | Flagged content-gap or "for the team to confirm" boxes (remove these before launch) |

**Emails in content:** always output the visible address with `<wbr>` hints
(`referrals@<wbr>obsidiansupportedliving<wbr>.co.uk`) so it wraps at natural points, never
mid-word, on narrow screens — while `mailto:` hrefs and schema keep the plain address. A
theme helper/shortcode (`[osl_email type="referrals"]`) should emit this automatically so
editors never hand-type it.

**Any two-column layout uses `minmax(0, 1fr)`, not `1fr`.** A bare `1fr` track cannot shrink
below its content, so a long word or email forces horizontal overflow. Keep this in every grid
the theme generates.

### 8.5 Count-flexible sections — team, services, news (added 2026-07-20)

Three sections are the ones the owner will most often add to or trim. They are now built so
**any number of items lays out correctly** — no orphaned half-row when a count is odd. Each
maps to a WordPress loop, so "add one" is a form entry, never a markup edit.

**Team (`about.html` → `.team` / `.team-member`).** Each person is one full-width row — photo
beside bio — stacked vertically. 1, 2, 3, 4, 5 people all read evenly; a new person is just
another row, and the long bios get full width (better than the old cramped two-column layout,
which stranded a third person alone). In WordPress this is a **"Team Member" custom post type**:
fields = name, role, photo + alt text, and repeatable "qualifications / background" lists; the
About page loops over them and emits one `.team-member` each. To add a fourth leader, the owner
clicks *Add Team Member*, fills the form, publishes — the layout takes care of itself.

**Services (`our-support.html` → one `.grid.grid--3`).** All service cards now live in a single
auto-flow grid: 6 cards → a clean 3 + 3 at desktop, 2 + 2 + 2 at tablet, stacked on mobile. Add
or remove a service and the grid re-flows with no orphan. In WordPress each card is a **pattern**
(or a "Service" CPT loop): heading, one-line summary, link. Note that a new service usually also
means a new **page** and a **nav submenu** entry — the submenu is deliberately curated, so that
one link is the only manual step.

**News (`latest-news.html` + homepage teaser).** Already count-flexible and native: articles
stack full-width (any number), and the homepage teaser is an auto-fit grid. In WordPress these
are ordinary **posts** — the news index and the homepage "Latest news" row update automatically
when a post is published. Post fields: title, date, category, excerpt (reused as the teaser and
meta description), featured image + **required alt text**. Nothing on the homepage is hand-edited
to publish news.

**The underlying rule:** a section that grows uses either a stacked row (`.team`) or an auto-flow
grid (`.grid--3`), never a fixed `.grid--2` — because a fixed two-column grid strands the last
item whenever the count is odd. `.grid--2` is reserved for content that is genuinely a fixed pair
(e.g. a text column beside a single figure).
