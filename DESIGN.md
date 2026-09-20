# DESIGN: Clínica Dental Catiana Bauçà

**Aesthetic:** warm-clinical-editorial
**In one line:** the dentist herself, cut out and standing on a block of the clinic's own cyan, against warm paper — the site answers fear by putting a person in front of you before it says anything about teeth.
**Sector:** dental-clinic · **Languages:** ca (primary), es · **Chosen:** 2026-09-20, admin

> **Reconciled 2026-09-20 from the Claude Design handoff** (`design/handoff/`). The moodboard
> direction (`calm-horizon-clinic` — navy field, Cabinet Grotesk, a drawn horizon rule) was
> provisional and is **superseded**. What follows is what was actually designed. The brief-side
> sections — what the site must do, visitor, voice, do/don't — carried over unchanged, which is
> the test that the two agree.

## What this site must do
The clinic has **no website at all** — this is their first. It must: capture appointment requests (phone is the proven channel), state what is actually treated in words patients use, show that the place and the people are real, and answer the fear that the reviews say is the single reason people stay away. No booking vendor is integrated; the phone number is the primary action everywhere.

## Visitor
- Who: a local adult in Inca or the surrounding villages, often someone who has avoided a dentist for years, or a parent booking for a child. Not a tourist.
- Should feel, in five seconds: that this is calm, that a named person will look after them, and that nothing will happen to them without being explained first.
- Should do: call. Success short of that is reading the treatments index and recognising the building.

## Palette
The clinic's own cyan, read off the fascia, the window monogram and the staff scrubs, on warm paper rather than clinical white.

| Name | Hex | Role |
|---|---|---|
| Paper | #FBFAF8 | page background |
| Ink | #12181C | headings, primary text |
| Cyan | #0A9DC7 | the brand mark: CTA fill, hero panel, rules, the star |
| Cyan pregon | #0A7285 | cyan as **text** — links, row numbers (the design's #0A7FA0 failed AA at 4.42:1) |
| Nit teal | #04252F | the one dark section, and text on Cyan |
| Text | #414B50 | body |
| Text secundari | #5A6368 | supporting lines, nav |
| Text subtil | #6A7378 | labels, captions, footnotes (the design's #8A9296 failed AA at 3.04:1) |
| Vora | #E6E2DC | hairlines, card borders |
| Blanc | #FFFFFF | review cards, lifted off the paper |

On Nit teal: #EAF6F9 headings (14.5:1), #B9D6DE body (10.5:1), #9FC4CF supporting (8.6:1).
Contrast: Ink on Paper **17.2:1**; body 8.6:1; subtle labels 4.6:1; CTA Nit-on-Cyan **5.1:1**.
**Never** white text on Cyan (2.4:1) — the CTA is dark teal on cyan, always.

## Typography
| Role | Typeface | Source | Weights |
|---|---|---|---|
| Everything | Archivo | **Self-hosted** (`@fontsource-variable/archivo`, wght axis) | 400–700 variable |
| Quotes only | Instrument Serif | **Self-hosted** (`@fontsource/instrument-serif`) | 400 |

Fonts are **not** loaded from Google's CDN: the stylesheet link blocked first paint and sent every visitor's IP to Google, which an EU health-sector site does not need.

Scale is fluid, driven off the viewport in the hero (`clamp(34px, min(5.6vw, 9.4svh), 80px)`) so the hero fits one screen on desktop (see Layout for what happens below 1100px); section heads `clamp(30px, 3.6vw, 50px)`; body 17px; small print 11.5–15.5px.
Relationship: **one grotesque does all the work**; the serif appears only where a patient speaks, so a quote is visually a different kind of thing from the clinic's own voice. That is the whole type idea, and it is the only place the two faces meet.
Treatment by level: display and section heads at 600, tracking −0.03em, sentence case. Treatment names at 500. Labels 11.5–12px, uppercase, tracking 0.12–0.16em — **uppercase is confined to these labels** and appears nowhere else.
Where type is quiet: the treatments index — 8 rows of one heading and one line, no ornament at all.
Set as a design element: the name band, `CATIANA BAUÇÀ` sized to the exact page width (`calc((min(100vw,1280px) - 56px) / 8)`) so the type *is* the rule between two sections.

## Layout and spacing
- Container 1280px, 28px gutters. Every section is `auto-fit, minmax(…, 1fr)` — the page reflows to one column with no breakpoint logic.
- The hero fills one screen **on desktop**: `min-height: calc(100svh - var(--header-h))`, with `--header-h` at the measured 73px. Below 1100px it sizes to its content instead — the stacked composition plus a three-row fact bar cannot fit a phone screen, and forcing it only produced dead space. On a phone the portrait clears the fold and the fact bar begins just under it.
- Radius: 999px on buttons, 14–20px on panels and images. Shadow appears exactly once, under the rating card.
- Vertical rhythm: 96–110px between sections on desktop.

## Section storyboard

### 1. Hero — la doctora
- Job: put a person in front of the visitor, name the town, and give the phone number, in one screen.
- Content: eyebrow, *"Venir al dentista sense por."*, one supporting paragraph, phone CTA + secondary CTA, rating card. **No fact bar** — the design put address/hours/phone here; owner's call, it is redundant with "Demana hora" and removing it gave the hero back the room to fit a phone screen.
- Media: `catiana-hero.png` — a **Magnific cutout** of the dentist on a transparent background.
- Device: she stands on a cyan gradient panel and **overflows its top edge** (`height:112%, bottom:0`); the 4,8★ card overlaps its left edge. Two planes and a person breaking out of one of them.
- Motion (signature): the cyan panel wipes up from its base, she rises into it, the rating card settles last. ~1.1s, `power3.out`.

### 2. Name band
- Job: separate hero from body without a rule, and say the name once at full size.
- Content: five category labels over a hairline, then the name at page width.
- Device: the type is measured to the container, not chosen — see Typography.
- Motion: a small horizontal drift on scroll (`ScrollTrigger` scrub), so the band reads as a plane moving at a different speed.

### 3. La clínica
- Job: say what kind of place it is before saying what it does.
- Content: two paragraphs on the arcade, the ground floor, the fact that visits start with an explanation.
- Media: `arcade.jpg`, and the verbatim review that names the fear.
- Device: the review sits in the right column in Instrument Serif behind a 2px cyan bar — a patient's voice, typographically separated from the clinic's.

### 4. Tractaments
- Job: say what is actually treated, in words a patient would use.
- Content: 8 numbered rows, name + one plain line.
- Media: none, deliberately.
- Device: a numbered index with hairlines, **not cards** — the competitor in the same town uses cards.
- Motion: rows fade in once, staggered 0.05s. Hover tints the row.

### 5. Tecnologia — "Veure-ho abans de decidir"
- Job: the real differentiator — you are shown your own mouth before anything is done.
- Content: three items: 3D scanner, GBT cleaning, whitening.
- Media: `scan-3d`, `catiana-gbt`, `whitening`.
- Device: the page's **one dark section**, Nit teal, full bleed. The only inversion on the page, so it lands as a chapter break. Tiles are **4:5 portrait**, not the design's 4:3 — no landscape crop of these sources could hold the whole subject, and the GBT frame in particular held either the dentist or the machine but never both.
- Motion: the three images scale 1.06 → 1 on scroll-scrub — depth, not a reveal.

### 6. Ressenyes
- Job: let patients say the thing the clinic cannot say about itself.
- Content: three verbatim Spanish reviews, in Spanish in **both** language versions.
- Device: white cards lifted off the paper; Instrument Serif; the 4,8/68 average as one quiet line beneath.

### 7. Contacte
- Job: convert. Phone first.
- Content: two paragraphs, phone CTA, directions CTA, address/hours table.
- Media: `storefront-day.jpg` with a caption on finding the door.

## Media plan
7 of the returned set used. Sources are the Google Business photos, two of them reworked with Magnific.

| File | Section | Origin |
|---|---|---|
| catiana-hero.png | 1 Hero | **Magnific cutout** of `places-04`, transparent background |
| arcade.jpg | 3 La clínica | `places-07` |
| scan-3d.png | 5 Tecnologia | **Magnific enhance** of `places-02` |
| catiana-gbt.jpg | 5 Tecnologia | `places-05` |
| whitening.jpg | 5 Tecnologia | `places-10` |
| storefront-day.jpg | 7 Contacte | `places-01` |
| logo-cb.png | header, footer | the CB monogram |

**Requested from the client** (the design's own production note, kept out of the site and copied to `.studio/requests.md`): a half-day photo shoot; the logo as vector; the doctor's bio and years in practice; an email address; written consent for the identifiable patients; confirmation of the opening hours.

## Imagery
Real photographs only, no stock, no illustration. Phone-snapshot quality is accepted and not disguised. The one produced asset is the hero cutout, and it is produced *because* no portrait exists.

## Motion
The moodboard direction banned scroll motion; this design does not, and the owner asked for movement. The rule that survives is **one signature moment, everything else subordinate**.
- Signature: the hero panel wipe + the doctor rising into it, on load.
- Supporting: name-band drift, treatment rows staggering in once, the dark section's images scrubbing 1.06 → 1, review cards staggering in, the header condensing past the hero.
- Durations 200 / 400 / 1100ms; one easing family (`power3.out`, `none` for scrubs).
- **Reduced motion: every element renders in its final state and nothing moves.** "From" states are set in JS, never CSS, so the prerendered HTML is visible without JavaScript.

## Voice
Warm, plain, personal, first person plural, Mallorcan Catalan forms (*feim*, *ensenyam*, *concertam*). **Professional, not chatty**: the register is a clinic talking to a patient, not a blog. Owner's revisions, 2026-09-20, removed conversational asides ("no és una franquícia ni un centre de pas", "amb l'escàner a la mà", "ningú es queda amb dubtes ni signa res sense entendre-ho") and the small-clinic framing ("clínica petita") in favour of **tracte proper i personal** — the personal relationship is the selling point, not the size of the premises. Catalan is primary; Spanish is **written natively, not translated**. Patient quotes stay **verbatim in Spanish** in both versions and are never re-voiced.

## Do
- Use her name; patients do.
- Keep Cyan for the primary action and the brand mark only.
- Say what a treatment is in normal words next to its clinical name.
- Mark anything unconfirmed `[CONFIRM: …]` rather than dropping the section.

## Don't
- White text on Cyan; #8A9296 or #0A9DC7 as text.
- Cards for the treatments (the competitor in the same town uses them).
- Stock smiles, tooth icons, white/blue gradients, "el teu somriure" headlines.
- Invent her years of practice, her qualifications, prices, or team names.
- Uppercase anywhere except the 11.5–12px labels.

## Settled — raised in review, decided, do not re-raise

Judgements the owner has already made. A critic or QA pass that reports these again is
costing a review cycle on a closed question; note them as settled and move on.

- **The Ressenyes section is three white cards, and stays that way.** `visual-qa` called it
  the most generic section on the page and that reading is fair in the abstract. Owner's
  call, 2026-09-20: the reviews are the most valuable material this business has — there is
  no team page, no bio, no prices, no press and no professional photography — so the section
  earns its place by what it carries, not by how its container looks. Restraint here is the
  point: the quotes are verbatim, in Spanish, in the serif that is reserved for patients.

## Banned for this client
- Global: the anti-generic and substance checklists (`guidelines/aesthetics.md`) and banned phrases (`guidelines/copy.md`).
- Competitor: `identalinca.com` — Neue Montreal, black on white, card grid, inline line-illustrations.

## Registry entry
Archivo · Instrument Serif · #FBFAF8 · #0A9DC7 · warm-clinical-editorial · cutout-portrait-on-colour-block-with-overlapping-card · panel-wipe-and-portrait-rise · dental-clinic

**Registry override, admin, 2026-09-20.** The check flagged four collisions against the returned
design and the owner chose it anyway, with reasons:
- `palette-near-identical` vs `panespatagonia` #FBF6EF, `finaivicenc` #FCF7ED, `balearstudio` #FFFFFF
  — all three are *near-white page backgrounds*. The check compares raw RGB distance, so every warm
  off-white collides with every other warm off-white regardless of what the page actually looks like.
  This is a **defect in `registry.mjs`**, not a real repetition: the dominant *impression* here is the
  cyan block and the dark teal section, not the paper. Fix logged in `BUILD.md`.
- `typeface-reuse` vs `darrodtennis-test` Archivo — real, and accepted: `darrodtennis-test` is a
  disposable test repo, not a delivered client site.

## `[CONFIRM]` — carried into the build
Checked line by line against `.studio/brief.md`. What the design asserted and the brief does not support:
1. **WhatsApp CTA on `wa.me/34871025168`** — 871 is a Balearic landline; nothing in the research says the clinic has WhatsApp. Shipped instead as a **directions link to Google Maps**, which is verifiable. One content key (`hero.ctaSecondary`) switches it back if they confirm.
2. **"Urgències — Truca i mirem d'encabir-te"** — an invented policy. The hero fact bar's third cell is the phone number instead.
3. **"Endodòncia"** as treatment 02 — not on the clinic's window lettering, which the brief took as the service list. Kept (a clinic doing *conservadora* and implants does root canals) but flagged.
4. **"zona blava al carrer i aparcament públic a dos minuts"** — unverified. Cut; the caption keeps only "sota els porxos, a peu pla".
5. **"Sense fèrules per fer a casa durant setmanes"** — an unverified claim about what they *don't* offer. Cut.
6. **Email `[pendent]`** — row removed rather than shipping a placeholder.
7. **Hours "Dilluns a dijous, 10:00–19:00"** — Google says this, directories say a split shift. Shipped as Google's, still unconfirmed.
8. **"porta anys atenent famílies d'Inca"** — kept. Reviews carry "llevo más de 6 años siendo clienta" and "hace muchos años que voy", so "anys" is evidenced; no specific number is claimed.
9. **Legal notice and privacy policy** — the design's footer linked both to `#inici`. Spanish law requires them on a business site and neither exists, so the links were removed rather than shipped dead. **Blocking before launch**, not before preview.

### Found at QA, after the build
The `visual-qa` pass found four more claims the build had missed — all of them from the
returned design except the first, which was written during the build itself. Full report and
resolution log in `.studio/qa/visual-qa/report.md`.
10. **"Ho agafem nosaltres mateixos al telèfon, no hi ha centraleta"** — asserted who answers and that there is no switchboard, against brief §8's "team unknown"; the Spanish version additionally said they are all women, contradicting the Catalan. Cut in both languages.
11. **"sense derivar-te a tercers"** — an operational claim with no source. Cut.
12. **"En cinc minuts veus la teva boca"** — an invented duration. Cut.
13. **"Una sola sessió"** — the same claim `[CONFIRM]` 5 cut in negative form, surviving in positive form. Cut.
14. **`sameAs` in the structured data** pointed at the dentist's personal Facebook profile, which brief §6 names as personal. Removed; a consent question, not a markup one.
