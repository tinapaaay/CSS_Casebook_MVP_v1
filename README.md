# CSS Casebook — First Playable MVP

A responsive multi-page product prototype for learning CSS through debugging investigations.

## Run locally

Open `index.html` directly in a browser. No build step or dependencies are required.

For a local server, run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Pages

- `index.html` — product home and featured investigation
- `cases.html` — all 16 curriculum collections and proposed cases
- `case.html?id=001` through `case.html?id=048` — three investigations for each of the 16 chapters
- `case-data.js` — case-specific content, preview markup, hints and validation type
- `case-engine.js` — shared editor, preview, hints, checking, reset and resolution behavior
- `field-guide.html` — three detailed lessons per chapter, chapter reviews, progress summaries and the Chapter 09 interactive Control Room

## Included behavior

- Live CSS editing and preview
- Original, Current, and Target comparison views
- Progressive three-step hint system
- Rendered-layout validation rather than string matching
- Specific unresolved feedback and a complete resolution report
- Local draft, hint, and completion persistence
- Reset confirmation, replay, keyboard support, responsive mobile tabs, and reduced-motion support
- Responsive navigation, collection filtering, and Field Guide search
- Flexbox controls for direction, wrapping, justification and alignment with synchronized generated CSS
- Sandboxed iframe previews that support complete multi-selector CSS without affecting the Casebook interface
- Three-question chapter reviews with answer explanations and saved completion state
- Five-question Flexbox review with answer explanations
- Unified local progress for lessons, reviews and all three cases in every chapter
- Chapter summaries that report lesson, review and case completion before closing
- Keyboard-accessible mobile workspace tabs with roving focus and arrow-key navigation
- Target preview QA completed across all 48 cases; each target renders visible content

## Progress and QA notes

Progress is intentionally local to the browser. Case completion uses keys such as `css-casebook-c001`; lesson and review completion use the corresponding chapter keys. Clearing site storage resets the learner state.

The project has no build step. Before handoff, run `node --check` on the JavaScript files and `git diff --check`. For visual QA, inspect Original, Current and Target views on the case pages and verify the mobile layout at phone and tablet widths.

All 16 chapters now contain three playable cases each. The cases share the reusable editor, rendered preview, progressive hints, validation and resolution flow while keeping chapter-specific objectives and CSS concepts.

## Design system

The visual design is documented in [`DESIGN.md`](DESIGN.md): "Casebook Shelf",
where the 16 chapters are clothbound books on a shelf and each chapter's cloth
color follows you onto its case and Field Guide pages. `shelf.css` applies those
tokens on top of the structural layout in `styles.css`, and `shelf.js` runs the
home page shelf. Case previews stay isolated in sandboxed iframes, so their CSS
exercises keep the typography and layout being investigated.

Read `DESIGN.md` before changing any color, font, radius or component, and update
it in the same change. Lint it with:

```bash
npx -y @google/design.md@0.4.0 lint --format json DESIGN.md
```

## Earlier fixes — 24 October 2026

The October edition corrects seven rejected recommended solutions (007, 010, 016,
022, 023, 029, 044), shows the preview when checking a fix on mobile, preserves
checkbox states, and includes the missing hero illustration as a local SVG.
Chapter completion is shown separately from case completion. Progress imports are
validated before replacement and failed writes restore previous records.

Run the dependency-free progress regression tests:

```bash
node --test tests/progress.cjs
```

For browser regression tests, install Playwright in your development environment,
start the local server, and run:

```bash
CASEBOOK_URL=http://127.0.0.1:8000 node tests/browser.cjs
```

Set `CHROME_PATH` to your Chrome executable if necessary. Browser tests cover all
48 starter/recommended solution pairs and the four routes at five viewport widths.
The site itself still requires no dependencies or build step.

## Development guide

See [Development and maintenance](docs/DEVELOPMENT.md) for setup, source files, implementation limits, editing instructions, verification, and deployment.
