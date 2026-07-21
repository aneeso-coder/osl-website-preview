# News post — content model & template

**Who this is for:** whoever builds the WordPress theme, and whoever writes the posts afterwards.

The point of this document is that **a news post is a filled-in form, not a blank page**. Every post has
the same fields in the same order. The person adding a post picks a type, fills the fields, and the
theme does the rest — layout, schema, the homepage card, the SEO tags. Nobody has to remember to "make
it look right", because they can't get it wrong.

The five posts already live on `latest-news.html` are built to this model — use them as the reference
implementation.

---

## 1. The content model

Nine fields. **Four are required, five are optional.** Anything marked *optional* must degrade
cleanly when it's left empty — that's the whole design.

| # | Field | Required | WordPress mapping | Rules |
|---|---|---|---|---|
| 1 | **Headline** | ● Required | Post title | 45–70 characters. A statement, not a label. "Dawn Newby shortlisted at the Proud to Care Awards" — not "Awards News". |
| 2 | **Date** | ● Required | Post date | Real date of the event. Drives ordering everywhere. |
| 3 | **Category** | ● Required | Category (one only) | Pick **one** from the fixed list in §2. Not free text. |
| 4 | **Standfirst** | ● Required | Excerpt | 15–30 words, one sentence. The card text *and* the meta description. See §4 — this field does the most work on the site. |
| 5 | **Featured image** | ○ Optional | Featured image | If used, §3 applies in full. If omitted, the post renders as text-only. |
| 6 | **Image alt text** | ● If image | Alt text field | Required whenever an image exists. §3. |
| 7 | **Image caption** | ○ Optional | Caption | Adds meaning; not a repeat of the alt. §3. |
| 8 | **Body** | ● Required | Post content | 150–250 words. Blocks allowed: paragraph, bulleted list, pull quote. Nothing else. |
| 9 | **Related link** | ○ Optional | Custom field | One internal link, e.g. "Read more on our Property Solutions page". |

> **Why one category and not tags:** tags multiply and rot. Someone adds "training", someone else adds
> "Training" and "staff training", and within a year the archive is meaningless. A single required
> category from a closed list stays clean without anyone policing it.

---

## 2. The category list (closed — do not add without a decision)

| Category | Use it for | Real example |
|---|---|---|
| **Our people** | Staff recognition, awards, appointments | Dawn's Proud to Care shortlisting |
| **Our team** | Culture, survey results, how we work | The staff survey feedback |
| **Training** | Training capability and delivery | In-house training announcement |
| **Property** | Homes, refurbishments, availability | The accessible bungalow |
| **Service news** | Registration, quality, service changes | *(a future CQC inspection outcome)* |

Five is deliberate. If a sixth is genuinely needed, that's a decision — not something to add on the fly
while writing a post.

---

## 3. Images — the rules that protect SEO and accessibility

**An image is optional. Alt text is not.** If the post has an image, it has alt text — the theme should
refuse to publish otherwise. This is the single defect that ran through the entire old site: every
content image had empty alt.

### Alt text vs caption — they are different jobs

They must never be the same string:

- **Alt** = *what is in the photograph*, for someone who cannot see it. Describe the content. Don't
  start with "Image of…". 1–2 sentences.
- **Caption** = *what it means*, for everyone. It's editorial and it appears on screen.

Worked example from the bungalow post:

> **Alt:** "The wet room in the refurbished Nottinghamshire bungalow: a ceiling-mounted rainfall shower,
> wipe-clean white wall panels and a level floor that runs into the shower area with no step."
>
> **Caption:** "The bespoke wet room in the refurbished bungalow — a level floor, with no step into the shower."

### Technical

| Rule | Value | Why |
|---|---|---|
| Filename | `descriptive-words-like-this.jpg` | Never `IMG_4821.jpg`. Filenames are a real ranking signal — the old site used `pic1.jpg` for everything. |
| Aspect ratio | Theme crops to **4:3** | Uniform cards. Don't hand-crop; upload the full frame. |
| Min width | 1200px | Retina + crop headroom. |
| Loading | `loading="lazy"` + `width`/`height` | Prevents layout shift; helps Core Web Vitals. |
| Consent | **Required before upload** | Any photo of a person we support needs documented consent. See §7. |

---

## 4. The standfirst does four jobs — write it once, carefully

This is the field people will be tempted to skip. It's the most valuable one on the page, because the
theme reuses it in four places:

1. The **homepage card** text
2. The **news index** card text
3. The **`<meta name="description">`** for the post — what Google shows in results
4. The **`og:description`** — what shows when the post is shared on Facebook/WhatsApp

So: **15–30 words, one sentence, plain English, no clickbait.** It has to make sense standing alone,
with no headline above it.

> ✅ "Our Registered Manager named a finalist in the Long Service Recognition category, after 25 years in social care."
>
> ❌ "Read about our exciting news!" *(says nothing; wastes the meta description)*

---

## 5. The highlight rule — what reaches the homepage

**The homepage shows the three most recent posts, newest first. Automatically. Nobody chooses.**

That's the whole rule, and the reason is that any manual "featured" flag becomes stale — someone sets
it, nobody unsets it, and eighteen months later the homepage is still promoting last year's award.
Date ordering can't rot.

Each homepage card renders exactly four things, and nothing else:

```
┌─────────────────────────────┐
│ NOVEMBER 2025               │  ← Date
│                             │
│ Dawn Newby shortlisted at   │  ← Headline
│ the Proud to Care Awards    │
│                             │
│ Our Registered Manager      │  ← Standfirst
│ named a finalist in the     │
│ Long Service Recognition    │
│ category, after 25 years…   │
│                             │
│ Read more →                 │  ← Link (whole card is clickable)
└─────────────────────────────┘
```

Note what is **not** on the card: the image. Cards are text-only by design, so a post without a photo
sits beside a post with one and the row still looks deliberate. This is what makes the image genuinely
optional rather than optional-in-theory.

**If there are fewer than three posts,** the row shows however many exist — it must not render empty
cards or placeholder boxes.

---

## 6. Structure of a single post (what the theme outputs)

Heading levels are load-bearing. **One `h1` per page, `h2` → `h3`, never skip a level.** The old site
jumped `h1` → `h4` on six of nine pages.

**On the news index (`latest-news.html`):**
- `h1` = **"Latest News"** — always. Never the newest post's headline. *(This was a real defect on the old site.)*
- each post headline = `h2`

**On a single post page:**
- `h1` = the post headline
- any subheadings in the body = `h2`

```html
<article>
  <p class="eyebrow">
    <time datetime="2025-11">November 2025</time> · Our people   <!-- date + category -->
  </p>
  <h2>Dawn Newby shortlisted at the 2025 Proud to Care Awards</h2>

  <!-- optional: whole figure omitted if no image -->
  <figure class="frame">
    <img src="descriptive-filename.jpg" width="1200" height="700"
         loading="lazy" decoding="async"
         alt="[required — describes the photograph]">
    <figcaption>[optional — what it means]</figcaption>
  </figure>

  <p>Body paragraph…</p>
  <blockquote class="pull">Optional pull quote.</blockquote>
  <p>Body paragraph…</p>

  <p><a href="property-solutions.html">Optional related link</a></p>
</article>
```

---

## 7. Rules for whoever writes the posts

1. **Never invent a quote.** If someone said it, quote it exactly. If they didn't, don't.
2. **Every photo of a person we support needs documented consent** — recorded before publication, and
   withdrawable. If consent isn't documented, don't publish the photo. The post works without it.
3. **Never imply a CQC rating.** Until inspection, we are registered, not rated. This applies in news
   posts as much as anywhere else.
4. **Real dates only.** If the date is uncertain, find out — don't approximate.
5. **Plain English.** Same tone as the rest of the site. No "we are delighted to announce".
6. **Name people who are recognised** (with their agreement) — "Ngwarai", "Dawn Newby". Named people are
   what make news read as real.

---

## 8. SEO the theme handles automatically

The writer should never have to think about any of this — that's the point of the model.

| Output | Built from |
|---|---|
| `<title>` | Headline + " | Obsidian Supported Living" |
| `<meta name="description">` | Standfirst (§4) |
| `<link rel="canonical">` | Post URL — **non-www**, matching the rest of the site |
| `og:title` / `og:description` / `og:url` | Headline / standfirst / URL |
| `og:image` | Featured image if present; site default if not |
| **`BlogPosting` JSON-LD** | headline, datePublished, image, articleSection (= category), author + publisher (= the Organization node already on every page) |
| Sitemap entry | Automatic on publish |
| Breadcrumb | Home → Latest News → *post* |

**`BlogPosting`, not `NewsArticle`.** `NewsArticle` is for news organisations and invites scrutiny we
don't need; `BlogPosting` is the honest fit for an organisation publishing its own updates.

---

## 9. Checklist before publishing

- [ ] Headline is a statement, 45–70 characters
- [ ] Date is the real date
- [ ] One category, from the list of five
- [ ] Standfirst: one sentence, 15–30 words, makes sense alone
- [ ] Image (if any): descriptive filename, ≥1200px wide
- [ ] **Alt text written** — describes the photo, not "image of"
- [ ] Caption (if used) says something different from the alt
- [ ] Consent documented for anyone pictured
- [ ] Body 150–250 words; no invented quotes
- [ ] No CQC rating implied
