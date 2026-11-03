# Development and maintenance

## Run locally

From the repository root, run `python3 -m http.server 5500`, then open [localhost:5500](http://localhost:5500). Python 3 is only a development-server option; VS Code Live Server also works. Stop the server with Ctrl+C. No package installation or build is required to serve this checkout.

## Implementation and boundaries

Four HTML routes share curriculum data, a reusable case engine, and local progress helpers. Case editing runs in isolated iframe previews; checking compares rendered layout. Drafts, hints, lesson/review state, and completion persist in browser storage. There is no server account or cross-device sync.

## Make changes

Edit exercises in `case-data.js`, curriculum in `curriculum-data.js`, editor/check behavior in `case-engine.js`, progress import/export in `progress.js`, guide behavior in `field-guide.js`, and Flexbox controls in `flexbox-lab.js`.

## Source map

- [`TESTING.md`](../TESTING.md)
- [`case-data.js`](../case-data.js)
- [`case-engine.js`](../case-engine.js)
- [`case.html`](../case.html)
- [`cases.html`](../cases.html)
- [`curriculum-data.js`](../curriculum-data.js)
- [`field-guide.html`](../field-guide.html)
- [`field-guide.js`](../field-guide.js)
- [`flexbox-lab.js`](../flexbox-lab.js)
- [`hero.svg`](../hero.svg)
- [`index.html`](../index.html)
- [`library.js`](../library.js)
- [`neumorphism.css`](../neumorphism.css)
- [`progress.js`](../progress.js)
- [`styles.css`](../styles.css)

## Verification

Run `node --test tests/progress.cjs` for the dependency-free progress suite. The [README](../README.md) and [TESTING.md](../TESTING.md) explain optional Playwright browser regressions.

1. Open the library, apply filters, and launch a case. Change CSS, compare Original/Current/Target, use hints, check, and reset.
2. Refresh a draft/completed case, finish a lesson/review, and inspect progress. Test imports only after exporting a backup.
3. Check the Flexbox Control Room and keyboard/mobile workspace tabs. Follow existing TESTING.md for full coverage.
4. Inspect the browser console and Network panel for missing assets or script errors; check keyboard access, phone width, and 200% zoom.

## Deployment

Serve the tracked HTML, CSS, JavaScript, and required assets from a static host, preserving relative paths and filename case. There is no application server or environment-variable configuration in this checkout. Verify the actual deployment URL, external resources, and the checks below after publishing. A repository existing on GitHub does not by itself prove Pages is enabled.

## Keep documentation current

Update the README and this guide when entry points, dependencies, behavior, or deployment steps change. Record commands actually run and distinguish them from pending manual checks.
