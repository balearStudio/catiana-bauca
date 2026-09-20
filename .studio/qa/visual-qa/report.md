# visual-qa — Clínica Dental Catiana Bauçà

**2026-09-20.** The `ewf:visual-qa` subagent's Write was blocked by the harness, so the
findings below are **transcribed verbatim from its reply**, unsoftened, with a resolution
log appended. Screenshots and crops it produced are on disk in
`.studio/qa/visual-qa/{ca,es,ca-motion,es-scrolled,crops}/` and `probe-es.json`.

**Verdict as delivered: BLOCK.**

---

## Findings as reported

### BLOCK

**B1. Four factual claims shipped unverified, unmarked, on a health-sector site.** None is
in `brief.md`, none in `DESIGN.md`'s `[CONFIRM]` list, none in `requests.md`.

| # | Shipped | Brief line it runs against |
|---|---|---|
| a | "Ho agafem **nosaltres mateixos** al telèfon, no hi ha centraleta" / "Lo cogemos **nosotras mismas**…" | §8: "**Team unknown.** At least two other people appear in the photos; no names, roles or count." The site asserts who answers and — in Spanish — that they are all women. Catalan `nosaltres mateixos` is masculine, Spanish `nosotras mismas` feminine: the two versions contradict each other. |
| b | "sense derivar-te a tercers tret que calgui" | §2 lists services and says nothing about referral policy |
| c | "**En cinc minuts** veus la teva boca a la pantalla" | §2 describes 3D scanning; no duration anywhere. An invented specific. |
| d | "**Una sola sessió** a la clínica" | §2 says only "whitening". `[CONFIRM]` 5 cut the same claim in negative form; this is it in positive form, and it survived. |

### REVISE

- **R2. `catiana-gbt.webp` decapitates the dentist.** Source `places-05.jpg` is a sharp
  portrait of Dra. Bauçà smiling to camera; the shipped 900×675 crop starts below her chin.
  Alt text called it "Màquina de neteja GBT" — she is described as absent from her own
  photograph. This inverts the site's thesis, and it is the only other photo of her.
- **R3. `whitening.webp` crops out the beach screen** that brief §6 names as the reason
  `places-10` is one of the three best photos; it survives as a ~200×40px sliver.
- **R4. Hero misses "fits one screen":** bottom 1167 vs 844 at mobile (**+323**), 1010 vs 667
  at 375×667 (**+343**). `calc(100svh - 63px)` uses 63 against a **73px** header — that is
  the flat +10 at tablet and desktop.
- **R5. Tablet hero is 42% padding:** 236px dead above the eyebrow, 240px below the fact
  bar, of 1131px, and it still overflows by 10.
- **R6. Rating card hides the portrait's feet:** card y 574.5–667.5 over portrait y
  181.5–685.5, leaving one sandal in an 18px strip.
- **R7. All four section links `vis:false` at 834 and 390** with no menu, on a 7,201px page;
  ~320px of header sits empty at tablet.
- **R8. JSON-LD `sameAs` publishes the dentist's personal Facebook**, which brief §6
  explicitly calls personal, not the clinic's; not in `requests.md`.

### Low

- **L9.** Quote elisions marked three different ways vs brief §5.
- **L10.** Review attributions ragged (y 423/394/423).
- **L11.** Hreflang duplicated in the hydrated DOM (6 vs the 3 in `dist`).
- **L12.** Lighthouse performance failing ids listed for the record, not as findings.
- **L13.** `audit.json`'s i18n warning on `home.facts.0.value` is a false positive — a street
  address is correctly identical in both languages.

### Measured clean

0 dead links, 0 placeholders, `contrast: []` at all three breakpoints in **both** languages
(it ran the missing `/es/` probe itself), no overflow, nothing invisible under reduced
motion, tap targets clean, a11y 100/100, Lighthouse 91/90. Signature motion present and
reduced motion genuinely honoured. Two apparent fails were chased down and shown to be
capture artifacts, not defects.

It also judged the page section by section and said it reads as one thing rather than a
good hero followed by filler, and that `/es/` is written natively rather than translated —
while naming **Ressenyes** as the most generic section on the page.

### Stale entries it flagged in `requests.md`

1. Row 3 said the footer legal links "exist and currently go nowhere". They no longer exist.
   The launch-blocking need for the pages is unchanged; the description was wrong.
2. The Magnific to-do called `places-05` "out of focus and badly framed". The source is
   sharp and well framed — the *crop* was the problem.

---

## Resolution

Every measurable claim was re-verified independently before acting. All of them held,
including the 73px header, the +323px mobile overflow, the rating-card overlap, the nav
hidden at 834, and hreflang 6-in-DOM vs 3-in-`dist`.

| # | Action |
|---|---|
| B1a | Rewritten in both languages to claim nothing about who answers: "Demanar hora és una telefonada…" / "Pedir hora es una llamada…". The gender contradiction goes with it. Added to `requests.md` as a question. |
| B1b | Referral clause cut from `treatments.intro` in both languages. |
| B1c | "En cinc minuts" / "En cinco minutos" cut. |
| B1d | "Una sola sessió" / "Una sola sesión" cut. |
| R2 | Crop moved from `top: 0.46` to `0.21`; she is in frame and smiling to camera. Alt text now names her in both languages. |
| R3 | Crop moved from `top: 0.175` to `0.05`; the ceiling screen and the lamp are both in frame. Alt text now names the beach on the screen. |
| R4 | `--header-h` corrected 63 → **73px**, measured. Desktop hero now ends at exactly 900 of 900. Below 1100px the hero sizes to content; the portrait clears the fold at 807 of 844 and the fact bar begins just under it. |
| R5 | Same change: tablet hero is 729px with no dead space, down from 1131 with 476 empty. |
| R6 | Card raised to `bottom: 64px`; it clears the feet and still overlaps the panel edge as `DESIGN.md` specifies. |
| R7 | Nav breakpoint moved 900px → 760px, with tighter gaps below 1100px. All four links visible at 834. |
| R8 | `sameAs` removed entirely, with the reason recorded in `business.ts`. Added to `requests.md` as item 11. |
| L9 | One convention now: `…` marks every cut, in both languages. |
| L10 | Cards are flex columns with `margin-top: auto` on the attribution. |
| L11 | Fixed in `lib/seo.ts`: SSR tags now carry `data-seo-managed`, which is the marker `Seo.tsx` clears before appending. DOM is 3, matching `dist`. **This is a `site-template` bug and needs porting upstream.** |
| L12 | Noted, not chased. Performance 92. |
| L13 | Dismissed with reason, as it recommended. |
| Stale 1–2 | `requests.md` corrected. |

One finding surfaced by the probe during the fix round and also resolved: the hero cutout
was served at 704px into a 225px box on mobile. Now has a 480w variant and `srcset`, with
the preload carrying `imagesrcset`.

**After the fixes:** `audit` 0 fail; `probe` clean at mobile/tablet/desktop in **both**
languages; reduced-motion `invisibleBeforeScroll: 0`; Lighthouse **92 / 100 / 100 / 100**;
page transfer 590KB.

**Not resolved, by choice:** the "three white testimonial cards" observation about
**Ressenyes**. It is a fair call and it is the most generic section on the page, but
reworking it is a design decision for the owner, not a QA fix. Raised rather than actioned.
