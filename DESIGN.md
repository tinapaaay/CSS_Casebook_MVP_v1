---
version: alpha
name: Casebook Shelf
description: CSS Casebook — 48 debugging cases in 16 chapters, shown as a shelf of clothbound books. The chapter you are in is the color you are standing in.

colors:
  primary: "#1E1B2E"
  on-primary: "#F1ECE2"
  on-primary-muted: "#B9B4C9"
  neutral: "#ECE7DD"
  neutral-sunk: "#E2DCCF"
  surface: "#F7F4EE"
  muted: "#4A4659"
  rule: "#C9C1B2"
  error: "#9E2F24"
  success: "#2C6B45"
  chapter-01: "#E3B95B"
  chapter-02: "#C7D3B0"
  chapter-03: "#EDC2B3"
  chapter-04: "#B8CBE0"
  chapter-05: "#D3C0E4"
  chapter-06: "#F0C98E"
  chapter-07: "#A9D1C6"
  chapter-08: "#E6B9C4"
  chapter-09: "#2E3A6E"
  chapter-10: "#D9CFA8"
  chapter-11: "#BFD8A8"
  chapter-12: "#C2C6E6"
  chapter-13: "#E2C7A3"
  chapter-14: "#A7D3D6"
  chapter-15: "#7A2E3A"
  chapter-16: "#E89C7E"

typography:
  display:
    fontFamily: Bricolage Grotesque
    fontSize: 5.5rem
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: -0.045em
  headline-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 3rem
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: -0.035em
  headline-md:
    fontFamily: Bricolage Grotesque
    fontSize: 2rem
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: -0.025em
  headline-sm:
    fontFamily: Bricolage Grotesque
    fontSize: 1.375rem
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: -0.015em
  spine:
    fontFamily: Bricolage Grotesque
    fontSize: 1rem
    fontWeight: 800
    lineHeight: 1
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Instrument Sans
    fontSize: 1.1875rem
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Instrument Sans
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Instrument Sans
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Instrument Sans
    fontSize: 0.875rem
    fontWeight: 600
    lineHeight: 1.3
  code:
    fontFamily: Fragment Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.7

rounded:
  spine: 2px
  control: 6px
  panel: 10px
  full: 9999px

spacing:
  space-1: 4px
  space-2: 8px
  space-3: 12px
  space-4: 16px
  space-5: 24px
  space-6: 32px
  space-7: 48px
  space-8: 72px
  gutter: clamp(20px, 4vw, 56px)
  measure: 68ch

components:
  page:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
  page-sunk:
    backgroundColor: "{colors.neutral-sunk}"
    textColor: "{colors.primary}"
  text-muted:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.muted}"
    typography: "{typography.body-sm}"
  hero-title:
    textColor: "{colors.primary}"
    typography: "{typography.display}"
  page-title:
    textColor: "{colors.primary}"
    typography: "{typography.headline-lg}"
  section-title:
    textColor: "{colors.primary}"
    typography: "{typography.headline-md}"
  card-title:
    textColor: "{colors.primary}"
    typography: "{typography.headline-sm}"
  lead:
    textColor: "{colors.primary}"
    typography: "{typography.body-lg}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: 12px 18px
  button-primary-hover:
    backgroundColor: "{colors.chapter-09}"
    textColor: "{colors.on-primary}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: 11px 17px
  button-danger:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.control}"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.panel}"
    padding: 24px
  code-editor:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.code}"
    rounded: "{rounded.panel}"
  code-editor-gutter:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary-muted}"
  status-error:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.error}"
    typography: "{typography.label}"
  status-success:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.success}"
    typography: "{typography.label}"
  chip:
    backgroundColor: "{colors.neutral-sunk}"
    textColor: "{colors.primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
    padding: 4px 10px
  progress-track:
    backgroundColor: "{colors.rule}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    height: 6px
  shelf-plank:
    backgroundColor: "{colors.primary}"
    height: 12px
  spine-01:
    backgroundColor: "{colors.chapter-01}"
    textColor: "{colors.primary}"
    typography: "{typography.spine}"
    rounded: "{rounded.spine}"
  spine-02:
    backgroundColor: "{colors.chapter-02}"
    textColor: "{colors.primary}"
  spine-03:
    backgroundColor: "{colors.chapter-03}"
    textColor: "{colors.primary}"
  spine-04:
    backgroundColor: "{colors.chapter-04}"
    textColor: "{colors.primary}"
  spine-05:
    backgroundColor: "{colors.chapter-05}"
    textColor: "{colors.primary}"
  spine-06:
    backgroundColor: "{colors.chapter-06}"
    textColor: "{colors.primary}"
  spine-07:
    backgroundColor: "{colors.chapter-07}"
    textColor: "{colors.primary}"
  spine-08:
    backgroundColor: "{colors.chapter-08}"
    textColor: "{colors.primary}"
  spine-09:
    backgroundColor: "{colors.chapter-09}"
    textColor: "{colors.on-primary}"
  spine-10:
    backgroundColor: "{colors.chapter-10}"
    textColor: "{colors.primary}"
  spine-11:
    backgroundColor: "{colors.chapter-11}"
    textColor: "{colors.primary}"
  spine-12:
    backgroundColor: "{colors.chapter-12}"
    textColor: "{colors.primary}"
  spine-13:
    backgroundColor: "{colors.chapter-13}"
    textColor: "{colors.primary}"
  spine-14:
    backgroundColor: "{colors.chapter-14}"
    textColor: "{colors.primary}"
  spine-15:
    backgroundColor: "{colors.chapter-15}"
    textColor: "{colors.on-primary}"
  spine-16:
    backgroundColor: "{colors.chapter-16}"
    textColor: "{colors.primary}"
---

# Casebook Shelf

## Overview

CSS Casebook teaches CSS through 48 small debugging cases, grouped into 16 chapters. The whole site is built on one physical idea: **a shelf of clothbound books.** Each chapter is a book with its own cloth color. The home page *is* the shelf, so the curriculum explains itself without a paragraph. Pull a book (hover or focus a spine) and it widens. Open it and you see its three cases.

The color then follows you. On a case page or a Field Guide chapter, the chapter's cloth color is the band at the top of the page. You always know which book you are in without reading a label.

Everything else stays quiet: warm wall paper, one deep ink, plain sans text. The 16 spines are the only loud thing on the site, and they are loud together, as a set.

What this system gives up: decoration everywhere else. There are no illustrations, gradients, icon grids, eyebrow labels or section numbers. Words are cut to what someone needs to act.

## Colors

The palette is one ink, one wall, and sixteen book cloths.

- **Bookcloth ink (`primary`, #1E1B2E):** a blue-black aubergine, the color of the ink stamped on cloth spines. It is all text, the primary button, the code editor background and the shelf plank. There is no separate brand accent. If something needs emphasis, it gets weight, size or space, not a new color.
- **Wall (`neutral`, #ECE7DD)** is the page. **Sunk (`neutral-sunk`)** is one step darker, for grouped areas like the progress tools. **Surface (`surface`, #F7F4EE)** is the lightest, reserved for things you read closely or type into: panels, inputs and previews.
- **Muted (`muted`, #4A4659)** is for secondary text. At 7.4:1 on the wall it is readable at small sizes. **Rule (`rule`)** is for hairlines and the progress track only, never text.
- **Chapter cloths (`chapter-01`…`chapter-16`)** are muted buckram tones, like the cloth on library bindings. Fourteen are light, with ink text (7.6:1 to 10.9:1). Two are dark, with paper text: **Flexbox (09)** in navy and **Grid (15)** in oxblood. They are the two big layout chapters, and they anchor the shelf visually.
- **Error (`error`, brick #9E2F24)** and **success (`success`, bottle green #2C6B45)** come from the same cloth family, not stock red and green. They appear only in validation messages and in completion marks.

The one-accent rule: chapter colors belong to chapters. Never use a chapter color as decoration somewhere it doesn't mean "this chapter." The single exception is `button-primary-hover`, which borrows the Flexbox navy so the hover reads as a change of state rather than a new color.

## Typography

Two typefaces that differ by kind, plus one for code.

- **Bricolage Grotesque** (800 only) is the voice. Its letters squeeze and get quirky at large sizes, which suits stamped spine titles. Use it for the hero, page titles, section titles, chapter names and spines. Display sizes get negative tracking (−0.045em at 88px) because the default spacing was drawn for small text and looks loose when big.
- **Instrument Sans** (400 and 600) does the work: body text, labels, buttons and navigation. Labels are 600 in sentence case. **No uppercase labels anywhere.**
- **Fragment Mono** is for code only: the editor, solutions and inline `code`. It is never used for labels or metadata.

The scale steps by roughly 1.333 (a perfect fourth) from body to the headlines. The display size is hand-set well above that, so the jump from title to body feels like a jump. Line height shrinks as size grows: 0.9 for display, 1.6 for body. Reading text is capped at `measure` (68ch).

## Layout

- **Flush left, always.** Nothing is centered except a single-line empty state. On the home page, the headline sits left and the shelf sits right, at the same baseline as the plank.
- **The shelf** is a flex row of 16 spines standing on a 12px ink plank. The spines vary in height in a fixed pattern (like real books) and are never in a uniform grid. Below 760px, the books **lie down into a stack**: each spine becomes a horizontal bar with its title reading left to right. The metaphor holds, and no text is ever rotated on a phone.
- **The case library** is that same stack at full width: one row per chapter, colored on the left like a spine, with the three cases listed to the right.
- **Chapter band:** case and guide pages open with a full-bleed band in the chapter color, holding the chapter name and page title. Everything below the band is on the wall color.
- Spacing is on a 4px base. Related things sit close (`space-2`/`space-3`), and sections are separated by `space-8`. Vary it on purpose: the shelf gets air, and the case workspace is dense.

## Elevation & Depth

Flat. Depth comes from the color steps (sunk, wall, surface) and 1px `rule` lines, never from shadows. The only exception is the reset dialog, which is truly above the page and gets one shadow tinted with ink: `0 24px 60px rgba(30, 27, 46, 0.25)`.

The shelf plank is the only "physical" detail. It's a flat ink bar, not a 3D wood shelf.

## Shapes

Radius is set by what an element is:

- `spine` 2px: books have almost square corners.
- `control` 6px: buttons, inputs and selects.
- `panel` 10px: the editor, the preview and other reading panels.
- `full`: only chips and the progress track.

A card never gets a pill radius, and a button never gets a panel radius.

## Components

- **Spine (`spine-01`…`spine-16`):** chapter number and title, written bottom to top (vertical text, like a real spine) on wide screens. On hover or focus it widens to about 2.4× and the chapter's case count appears. It's a link to the chapter. A completed chapter shows a small ✓ at the foot of the spine, never a different color.
- **Open book:** the panel under the shelf that shows the selected chapter: title, one-line description, its three cases with their status, and a link to the Field Guide chapter. Choosing another spine swaps its content without moving the page.
- **Buttons:** one `button-primary` per view, and its label says what happens ("Start case 001", "Check fix"). Other actions are `button-secondary` or a plain underlined text link. No "→" on buttons.
- **Code editor (`code-editor`):** the ink panel. Line numbers use `on-primary-muted`.
- **Validation:** `status-error` and `status-success` are text in brick or green on the surface color, starting with a plain statement ("Not fixed yet", "Fixed"). There are no colored banners.
- **Chip:** small tags like difficulty and time, on `neutral-sunk`.
- **Progress track:** a 6px `rule` track with an ink fill.

## Do's and Don'ts

- Do let the chapter color mean "this chapter." Don't use a chapter color as decoration, and don't add an accent color for the site itself.
- Do keep the shelf the only loud element on any page. Don't add illustrations, gradients or a second hero gesture.
- Don't put a label above a heading. If a heading needs a label to make sense, rewrite the heading.
- Don't number things unless they are a real sequence. Case numbers (001–048) are real; "01 Incident report / 02 Evidence" is not.
- Do write one sentence where there were three. Don't explain what a button does next to the button.
- Do use Bricolage Grotesque only at 800 and only at headline-sm size or larger. Don't set body text in it.
- Don't use uppercase, tracked-out labels, middle-dot meta strings ("A · B · C") or arrows on button text.
- Do rotate spine text only on the wide shelf. Below 760px, books lie flat and text reads left to right.
- Don't add shadows to cards, panels or buttons. Group with spacing, the sunk color or a 1px rule.
- Do give every motion a `prefers-reduced-motion` fallback. The spine widening is the only ambient motion, and it is instant when reduced motion is on.
- Do add a new chapter by adding one `chapter-NN` color that keeps its text at 7:1 or better, plus its `spine-NN` component.
