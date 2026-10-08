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
- `case-001.html` — fully playable Flexbox investigation
- `field-guide.html` — seven complete Flexbox lessons and interactive Control Room

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

The remaining cases and Field Guide chapters are deliberately marked as planned. Their case-specific bugs, trusted HTML, hints, validation rules, and resolution content should be designed before implementation.
