# DESIGN: Clínica Dental Catiana Bauçà

**Aesthetic:** calm-horizon-clinic
**In one line:** the clinic already answers dental fear with a beach playing on the ceiling screen while it treats you — the site is built on that calm, a horizon you can rest on, in the clinic's own signage colours.
**Sector:** dental-clinic · **Languages:** ca (primary), es · **Chosen:** 2026-09-20, admin

## What this site must do
The clinic has **no website at all** — this is their first. It must: capture appointment requests (phone is the proven channel; a short form is secondary), state what is actually treated in words patients use, show that the place and the people are real, and answer the fear that the reviews say is the single reason people stay away. No booking vendor is integrated yet; the phone number is the primary action everywhere. `[CONFIRM: whether they want an email or a booking tool]`

## Visitor
- Who: a local adult in Inca or the surrounding villages, often someone who has avoided a dentist for years, or a parent booking for a child. Not a tourist.
- Should feel, in five seconds: that this is calm, that a named person will look after them, and that nothing will happen to them without being explained first.
- Should do: call. Success short of that is reading the treatments index and recognising the building.

## Palette
Sampled from the clinic's own fascia (`sources/images/places-01.jpg`), then enhanced for screen.

| Name | Hex | Role |
|---|---|---|
| Nit | #16294A | dominant / background — the fascia black, deepened to a navy that can carry a page |
| Verd | #9BD154 | accent, CTA only — sampled #84C048, brightened |
| Blau | #6FC0DC | secondary: hairlines, the horizon rule, small marks — sampled #489CB4 |
| Blanc | #FFFFFF | text on Nit |
| Nit fosc | #0E1B33 | inset panels, form fields |

Contrast: Blanc on Nit **14.5:1**; Verd on Nit 8.0:1; Blau on Nit 7.1:1; CTA Nit on Verd **8.0:1**.
**Never** white text on Verd (2.0:1) and never Blau as body text on Blanc.

## Typography
| Role | Typeface | Source | Weights |
|---|---|---|---|
| Display | Cabinet Grotesk | Fontshare | 800 |
| Text + section headings | Switzer | Fontshare | 400, 500, 600 |

**Evidence:** `identalinca.com` (Awwwards, same town) uses Neue Montreal, one family 100–700; `halodental.com` (SOTD) uses Nuckle, one family; `aventuradentalarts.com` (SOTD) uses Instrument Serif + Inter Tight. Two of three use a single clean grotesque and none pairs a serif with a sans. We stay in that category, with more character in the display so we do not read as a copy of the neighbour.

Scale: base 17px, ratio 1.25 — sm .85 / base / lg 1.33 / xl 1.85 / 2xl 2.6 / display clamp(2.6rem, 6.5vw, 5.6rem). Line-height 1.55 body, 1.02 display; measure ≤ 68ch.
Relationship: one family for everything except the display; contrast is **weight and size, not form** — the Swiss approach the references use.
Treatment by level: display Cabinet Grotesk 800, sentence case, tracking −0.02em, used **four times on the whole page**. Section headings Switzer 600 at `lg`, sentence case, no tracking, deliberately quiet. Sub-headings Switzer 500 at `base`. Labels Switzer 500 `sm` in Blau. **No ALL-CAPS anywhere.**
Where type is quiet: every section heading. The page's weight is carried by photographs and by the one large quote, not by headings.
Set as a design element: the hero headline overlaps the bottom edge of the hero photograph; nothing else breaks its box.

## Layout and spacing
- Grid: 12-col, left-aligned, wide gutters. The page is horizontal and low — sections are wider than they are tall wherever the content allows.
- Spacing: base unit 8px; generous vertical rhythm (96–128px between sections on desktop), tighter inside the treatments index.
- Hero: full-width panoramic crop, short in height, headline overlapping its lower edge.
- Radius / borders / shadows: 0 radius, no shadows. 1px Blau hairlines are the only rule.
- The Verd/Blau stripe from the fascia reappears exactly twice: under the logo, and in the address block at the foot.

## Section storyboard

### 1. Hero — l'horitzó
- Job: set the calm and name the town in five seconds; give the phone number immediately.
- Content: headline, one supporting line, phone CTA, the 4.8/68 rating as one quiet line.
- Media: `places-10` cropped panoramic (whitening under the blue lamp, beach on the ceiling screen).
- Device: the photo is a wide, short band on the Nit field; the headline **overlaps its lower edge**; a 1px Blau rule runs the full page width at that overlap — the horizon.
- Interaction / motion: the Blau rule draws left→right once on load (1.2s, ease-out). Reduced motion: already drawn. Nothing else animates anywhere on the page.
- Not generic because: the hero image is the clinic's own answer to fear, not a stock smile.

### 2. La por, primer
- Job: name the thing that keeps people away, in a patient's words, before selling anything.
- Content: one verbatim Spanish review: "Sin duda mi clínica dental de confianza. Superados mis miedos gracias a todo el personal." + attribution.
- Media: **none, deliberately** — the only section without an image.
- Device: the quote set at `2xl` across a single wide measure on Nit, with a Verd hairline above it. No card, no quote marks as ornament.
- Interaction: none.
- Not generic because: a dental site's second section is normally a three-card service grid.

### 3. Tractaments
- Job: say what is actually treated, in words a patient would use.
- Content: the terms from the clinic's own window — conservadora, odontopediatria, periodòncia, ortodòncia, estètica, cirurgia i implants, pròtesi, ATM — each with one plain-language line.
- Media: `places-03` (the etched window) alongside, as evidence these are their own words.
- Device: a quiet index, like a book's table of contents: term left, plain line right, 1px Blau rule between rows. **Not cards** — specifically because `identalinca.com` down the street uses cards.
- Interaction: rows are links; hover moves the Blau rule to full opacity. No lift, no shadow.

### 4. T'ho ensenyam
- Job: show the real differentiator — you see your own mouth before anything is done.
- Content: three lines on the 3D scan and the treatment plan.
- Media: `places-02` (hygienist showing a reclined patient the scan on screen), large.
- Device: the photo runs to the page edge on one side; the three lines sit in the opposite column, vertically centred against it.
- Interaction: none.

### 5. L'equip
- Job: make the people real; the reviews credit "todo el personal", not only the dentist.
- Content: names and one line each. `[CONFIRM: names, roles, who does what]`
- Media: `places-04`, `places-05`, `places-08`.
- Device: portraits **overlapped at different depths** on the Nit field, not a row of equal boxes — taken from the Gonin Hetzel reference. Phone-snapshot quality is accepted, not disguised: no heavy grading.
- Interaction: none.

### 6. Com reconèixer-la
- Job: get someone to the door. It is a ground-floor unit under an arcade and easy to walk past.
- Content: address, one line on what to look for.
- Media: `places-07` (the arcade) and `places-01` (the fascia), side by side.
- Device: not "where we are" but **what you will see when you get there** — the two photos paired, and the address set in the same style as the fascia lettering, with the Verd/Blau stripe beneath it.
- Interaction: none.

### 7. Demana hora
- Job: convert. Phone first.
- Content: hours, phone, `[CONFIRM: email]`.
- Device: the week as seven columns; open blocks fill Verd, closed ones stay empty — Mon–Thu fill, Fri–Sun do not. Readable at a glance instead of as a list. Phone large and clickable beneath.
- Interaction: none. `[CONFIRM: split shift or continuous]`

## Media plan
**8 of 10 catalogued assets used.**

| File | Section | Treatment | Caveat |
|---|---|---|---|
| places-10 | 1 Hero | Panoramic crop, keep the ceiling screen visible | Identifiable patient — consent required |
| places-03 | 3 Tractaments | Straight, slight crop to the lettering | — |
| places-02 | 4 T'ho ensenyam | Large, edge-bleed one side | Identifiable patient — consent required |
| places-04 | 5 L'equip | Square crop, overlapped | The dentist; confirm she is happy with it |
| places-05 | 5 L'equip | Square crop, overlapped | Staff member unnamed |
| places-08 | 5 L'equip | Square crop, overlapped | Staff member unnamed |
| places-07 | 6 Com reconèixer-la | Wide, shows the arcade | — |
| places-01 | 6 Com reconèixer-la | Wide, the fascia | Source of the palette |

Not used: `places-06` (594px crop, too small; duplicates what 05 shows) and `places-09` (a patient's own review photo, not clinic-owned, consent unresolved).

**Requested from client:** a half-day photo shoot (the single biggest upgrade available — everything here is a phone snapshot); the logo as vector artwork; team names and roles; written consent for the three photos with identifiable patients; an email address; confirmation of the opening hours.

## Imagery
Real photographs only, no stock, no illustration. Phone-snapshot quality is accepted and never disguised with heavy grading or filters — a light, consistent exposure lift and nothing else. Wide crops, generous air. People appear in four of the eight images used.

## Signature motion
- Moment: the Blau horizon rule drawing left→right across the hero on load.
- Why it fits: the horizon is the whole idea — the calm the clinic already sells with a beach on the ceiling.
- Durations/easing: fast 200ms, base 400ms, slow 1200ms; ease `power2.out`. One easing family.
- Reduced-motion fallback: the rule is already drawn; nothing moves.
- Everything else: restrained. Only user-triggered motion (menu, form feedback, the treatments-row hover). **No scroll reveals anywhere.**

## Voice
Warm, plain, personal, first person plural (Mallorcan Catalan forms: *feim*, *ensenyam*). The clinic's own signage is Catalan; every retrievable review is in Spanish, so Catalan is primary and Spanish is written natively rather than translated. Patient quotes stay **verbatim in Spanish**, always, and are never re-voiced as brand copy.

## Do
- Use her name; patients do.
- Keep Verd for the primary action only.
- Say what a treatment is in normal words next to its clinical name.
- Mark anything unconfirmed `[CONFIRM: …]` rather than dropping the section.

## Don't
- White text on Verd; Blau as body text.
- Cards for the treatments (the competitor in the same town uses them).
- Stock smiles, tooth icons, white/blue gradients, "el teu somriure" headlines.
- Invent her years of practice, her qualifications, prices, or team names.
- Add scroll-reveal animation to sections.

## Banned for this client
- Global: the anti-generic and substance checklists (`guidelines/aesthetics.md`) and banned phrases (`guidelines/copy.md`).
- Registry: typefaces Roboto, Space Grotesk, Brillante, Grift, Schibsted Grotesk, Archivo; dominants near #FBF6EF, #FFFFFF, #FCF7ED, #013333, #14170F, #B4472B. No override needed — the chosen palette and faces cleared.
- Competitor: `identalinca.com` — Neue Montreal, black on white, card grid, inline line-illustrations. Do not approach any of these.

## Registry entry
Cabinet Grotesk · Switzer · #16294A · #9BD154 · calm-horizon-clinic · panoramic-horizon-band-with-overlapping-headline · horizon-rule-draws-on-load · dental-clinic
