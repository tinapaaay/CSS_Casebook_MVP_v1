# Development and maintenance

## Run locally

From the repository root, run `python3 -m http.server 8000`, then open [localhost:8000](http://localhost:8000). Python 3 is only a development-server option; VS Code Live Server also works. Stop the server with Ctrl+C. No package installation or build is required to serve this checkout.

## Implementation and boundaries

Four HTML routes share curriculum data, a reusable case engine, and local progress helpers. Case editing runs in isolated iframe previews; checking compares rendered layout. Drafts, hints, lesson/review state, and completion persist in browser storage. There is no server account or cross-device sync.

## Make changes

Edit exercises in `case-data.js`, curriculum in `curriculum-data.js`, editor/check behavior in `case-engine.js`, progress import/export in `progress.js`, guide behavior in `field-guide.js`, Flexbox controls in `flexbox-lab.js`, and the home shelf in `shelf.js`.

### Changing the design

[`DESIGN.md`](../DESIGN.md) is the source of truth for colors, type, radii and components. `shelf.css` implements it as CSS custom properties and loads after `styles.css`, which still provides structural layout. When a change adds or alters a color, type level, shape or component, update `DESIGN.md` in the same change and lint it:

```bash
npx -y @google/design.md@0.4.0 lint --format json DESIGN.md
```

Aim for 0 errors and 0 warnings.

`shelf.css` currently uses `!important` in its type reset layer to beat fonts and uppercase that `styles.css` hard-codes. [ADR-0001](adr/0001-theme-stylesheet-layering.md) and [issue #1](https://github.com/tinapaaay/CSS_Casebook_MVP_v1/issues/1) describe the plan to remove that. Until then, if `styles.css` wins somewhere, override it in `shelf.css` rather than editing the old rule's font or color.

### Adding a chapter

A new chapter needs all four of these, or the shelf and colors break:

1. An entry in `curriculum-data.js` with three case IDs, and those cases in `case-data.js`.
2. A `chapter-NN` color and a `spine-NN` component in `DESIGN.md`. Choose a color that keeps its text at 7:1 or better; the lint checks this.
3. A `[data-chapter="NN"] { --tint: …; }` rule in `shelf.css` (add `--on-tint` for a dark color).
4. A spine `<button>` in the `#shelf` group in `index.html`, plus a height in the `.spine:nth-child()` pattern in `shelf.css`.

## Source map

- [`DESIGN.md`](../DESIGN.md) — design system
- [`TESTING.md`](../TESTING.md) — manual QA checklist
- [`docs/adr/`](adr/) — architecture decisions
- [`case-data.js`](../case-data.js)
- [`case-engine.js`](../case-engine.js)
- [`case.html`](../case.html)
- [`cases.html`](../cases.html)
- [`curriculum-data.js`](../curriculum-data.js)
- [`field-guide.html`](../field-guide.html)
- [`field-guide.js`](../field-guide.js)
- [`flexbox-lab.js`](../flexbox-lab.js)
- [`hero.svg`](../hero.svg) — image used inside a case preview
- [`index.html`](../index.html)
- [`library.js`](../library.js)
- [`progress.js`](../progress.js)
- [`shelf.css`](../shelf.css) — theme from [`DESIGN.md`](../DESIGN.md)
- [`shelf.js`](../shelf.js) — home page shelf
- [`styles.css`](../styles.css)

## Verification

Run `node --test tests/progress.cjs` for the dependency-free progress suite, and lint `DESIGN.md` after any design change. The [README](../README.md) and [TESTING.md](../TESTING.md) explain optional Playwright browser regressions.

Run `tests/browser.cjs` in a browser window that has focus. Cases 016 and 031 check `:focus` outlines, and they fail in a background or unfocused window even when the fix is correct.

1. On the home page, choose a few spines and confirm each opens its chapter. Open the Cases page, apply filters, and launch a case. Change CSS, compare Original/Current/Target, use hints, check, and reset.
2. Refresh a draft/completed case, finish a lesson/review, and inspect progress. Test imports only after exporting a backup.
3. Check the Flexbox Control Room and keyboard/mobile workspace tabs. Follow existing TESTING.md for full coverage.
4. Inspect the browser console and Network panel for missing assets or script errors; check keyboard access, phone width, and 200% zoom.

## Deployment

The site is published with GitHub Pages from the root of the `main` branch: <https://tinapaaay.github.io/CSS_Casebook_MVP_v1/>. Merging to `main` triggers a rebuild, usually live within a couple of minutes. There is no build step, application server or environment configuration.

Scripts and stylesheets are linked with `?v=N` query strings. When you change one, bump its number in every HTML page that links it so returning visitors don't get a cached old copy.

Paths are relative and the site lives under `/CSS_Casebook_MVP_v1/`, so never start a link or asset path with `/`. After publishing, open the live URL and check the home page, one case and the Field Guide.

## Keep documentation current

Update the README and this guide when entry points, dependencies, behavior, or deployment steps change. Record commands actually run and distinguish them from pending manual checks.
