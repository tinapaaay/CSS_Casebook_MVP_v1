# ADR-0001: How the theme stylesheet overrides the legacy stylesheet

**Status:** Proposed
**Date:** 2026-11-28
**Deciders:** Project owner

## Context

The "Casebook Shelf" redesign (branch `redesign/the-shelf`, see [`DESIGN.md`](../../DESIGN.md)) replaced the neumorphic theme. To ship quickly, it added a new theme file on top of the old one instead of rewriting it:

- `styles.css` (2,056 lines) still provides structural layout: the case workspace grid, the editor, the Field Guide and the mobile tabs. It was written for two earlier looks and hard-codes them: 58 `font`/`font-family` declarations (DM Sans, JetBrains Mono, Fraunces), 22 `text-transform: uppercase`, 17 `letter-spacing`, 43 hex colors and 15 `rgba()` values.
- `shelf.css` (about 960 lines) loads after it and applies the DESIGN.md tokens. Because many legacy rules use class selectors and `font:` shorthands, `shelf.css` needs a **type reset layer**: 17 `!important` declarations that force every element back onto the DESIGN.md fonts, case and tracking.
- After the redesign, **44 of the 131 class selectors in `styles.css` (34%) match nothing** in any page or script (`hero-lead`, `featured-file`, `method-grid`, `collection-card`, `section-kicker`, …).

Forces at play:

- **No build step, deployed on GitHub Pages.** Whatever we choose has to be plain CSS that browsers load directly.
- **DESIGN.md is the source of truth.** Tokens must live in one place, and a future agent or contributor should be able to change a component without fighting hidden rules.
- **Case previews run in sandboxed iframes** with their own CSS. None of these options affect them.
- **The browser tests** (`tests/browser.cjs`) check all 48 cases and five viewport widths. They are the safety net for any restructuring.
- **The owner is learning CSS.** The cascade should be readable, not a contest of specificity and `!important`.

The problem with the current state isn't that it's broken. It's that every future style change has to answer "is `styles.css` going to beat me here?" That question is invisible until something looks wrong, so it costs time on every edit.

## Decision

Adopt **Option C: CSS cascade layers** now, and use it as the path to **Option B** (one stylesheet) over time.

1. Load the legacy file into a named, low-priority layer from a single entry stylesheet:
   ```css
   /* casebook.css: the only stylesheet each page links */
   @import url("styles.css") layer(legacy);
   @import url("shelf.css");
   ```
   Rules outside any layer always beat rules inside one, whatever their specificity. So every rule in `shelf.css` beats `styles.css` without `!important`.
2. Delete the 17 `!important` declarations from the type reset layer, but keep the reset rules themselves. They still matter, because they override the legacy fonts.
3. Delete the 44 dead selectors from `styles.css`.
4. From then on, whenever a component is touched, move its structural rules out of the `legacy` layer into `shelf.css`. Once `styles.css` is empty, delete it. That completes Option B.

## Options considered

### Option A: Keep the override file with `!important` (current state)

| Dimension | Assessment |
|-----------|------------|
| Complexity | Low today, grows with every edit |
| Cost | Zero now; a hidden cost on every future change |
| Scalability | Poor: each new legacy conflict needs another override |
| Team familiarity | High: it's what's there |

**Pros:** Already shipped and verified (46 of 48 case checks; the other two can't run in the preview pane and behave the same on `main`; no sideways scroll at five widths). No risk.
**Cons:** Two files describe one design. `!important` can only be beaten by another `!important`, so overrides escalate. A third of `styles.css` is dead weight that readers still have to read past. It teaches the wrong habit to someone learning CSS.

### Option B: Rewrite into one token-based stylesheet now

| Dimension | Assessment |
|-----------|------------|
| Complexity | High: about 3,000 lines of CSS to merge and re-verify in one change |
| Cost | Days of work; touches every page at once |
| Scalability | Best: one file, one cascade, tokens everywhere |
| Team familiarity | Medium |

**Pros:** The cleanest end state. Every value comes from DESIGN.md, with no overrides and no dead code.
**Cons:** A big-bang change with a large surface for layout regressions (case workspace, mobile tabs, Flexbox lab). The redesign was just verified, and this would put all of that verification at risk for no visible user benefit.

### Option C: Cascade layers (`@import … layer(legacy)`)

| Dimension | Assessment |
|-----------|------------|
| Complexity | Low: one new entry file plus link changes on four pages |
| Cost | About an hour, plus a test run |
| Scalability | Good: migration happens a piece at a time, inside a rule that always holds |
| Team familiarity | New concept, but a standard one (cascade layers have been in all major browsers since 2022) |

**Pros:** Ends the specificity contest at once. "Theme always beats legacy" becomes a rule of the cascade instead of something enforced by `!important`. It allows incremental deletion of `styles.css` with no big-bang rewrite. Plain CSS, no build step.
**Cons:** `@import` adds one sequential stylesheet request before render; on GitHub Pages over HTTP/2 that's a few milliseconds. Browsers older than about 2022 ignore the layered import and lose the layout entirely, so they would get unstyled structure. An unlayered rule in `shelf.css` can't be beaten by anything in the legacy layer, which is the point, but it means a legacy rule can't "win back" a property without being moved out of the layer.

## Trade-off analysis

The real choice is between **paying the cleanup cost once (B)** and **paying a small tax on every edit forever (A)**. C sits between them. It removes the tax immediately (no more `!important` and no specificity surprises) and turns B into small, safe steps that each pass the browser tests.

A stays tempting because it works today. But the 17 `!important` rules and the 34% dead code are exactly the kind of hidden rules DESIGN.md exists to prevent. The next person to add a component, human or agent, will lose time to them.

The one real risk in C is browser support for `@import … layer()`. The audience is people learning CSS in current browsers, and the site already depends on `:has()` and `color-mix`-era features, so this doesn't narrow support in practice.

## Consequences

**Easier**
- Styling a component: write it in `shelf.css` and it wins. Specificity only matters within one file.
- Reading the CSS: dead selectors are gone, and the `legacy` layer clearly marks what's left to migrate.
- Explaining the cascade to a learner: "layers decide first, then specificity, then order."

**Harder**
- Each page links one entry file (`casebook.css`) instead of two, so the cache-busting `?v=` query moves to the entry file and its imports.
- A rule that must override the theme can't stay in `styles.css`. It has to move into `shelf.css`.

**To revisit**
- When `styles.css` reaches zero rules, drop the `legacy` layer and the `@import`, and consider renaming `shelf.css` to `casebook.css`.
- If the site ever adds a build step, inline the imports at build time to remove the extra request.

## Action items

1. [ ] Create `casebook.css` with the two `@import` lines; link it from `index.html`, `cases.html`, `case.html` and `field-guide.html` in place of the two current links.
2. [ ] Remove the 17 `!important` declarations from the type reset layer in `shelf.css`, then confirm the fonts and case are unchanged on all four pages.
3. [ ] Delete the 44 unused selectors from `styles.css` (list in this ADR's context section; re-check with a grep across `*.html` and `*.js` first).
4. [ ] Run `node --test tests/progress.cjs` and `tests/browser.cjs` (needs Playwright), and screenshot all four pages at 1440px and 390px.
5. [ ] Add a line to DESIGN.md's Do's and Don'ts: "Don't use `!important` in `shelf.css`; if `styles.css` wins, move the rule out of the legacy layer."
6. [ ] Follow-up, ongoing: move the case workspace, Field Guide and lab rules out of `styles.css` as each is edited, until it can be deleted.
