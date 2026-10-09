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
