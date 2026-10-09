# CSS Casebook Manual Smoke Test

Use this checklist before publishing a new CSS Casebook build. Record the browser, operating system, viewport, zoom level, and tester/date before starting.

## Test record

- Browser and version:
- Operating system:
- Device:
- Tester:
- Date:
- Build or commit:

## Expected result convention

Every checkbox includes the expected result. Mark a test only after observing the result in the browser. Record failures with the route, case ID, browser, and reproduction steps.

## Pre-test setup

- [ ] Start from the project served as a static site. Expected: Pages load without a server-side runtime or build step.
- [ ] Open the browser console before testing. Expected: No uncaught JavaScript errors appear during the smoke test.
- [ ] Confirm the repository contains the expected static files. Expected: `index.html`, `cases.html`, `field-guide.html`, `case.html`, `case-data.js`, `case-engine.js`, `field-guide.js`, `flexbox-lab.js`, `library.js`, `progress.js`, and `styles.css` are present.
- [ ] Record the current local progress state before testing. Expected: Existing progress is not deleted or renamed by setup.
- [ ] Prepare one clean browser profile or a separate test origin for fresh-state testing. Expected: Fresh-state tests do not overwrite the tester’s normal progress.
- [ ] Prepare a second browser profile or retained local-storage state for existing-progress testing. Expected: Existing-progress tests begin with known incomplete, attempted, completed, lesson, and review records.

## Fresh-state testing

- [ ] Open `index.html` with no Casebook storage keys. Expected: The home page loads, progress reports 0 of 48 cases complete, and the primary continuation action starts Case #001.
- [ ] Confirm the fresh home page has no false resume state. Expected: No old case, lesson, review, or course-complete message appears.
- [ ] Open `cases.html` with no Casebook storage keys. Expected: All 16 chapters and 48 playable cases are listed.
- [ ] Select `Not started` in the Case Library filter. Expected: All 48 cases remain visible and the result count reports 48 not-started cases across 16 chapters.
- [ ] Select `In progress` in the Case Library filter. Expected: A helpful zero-result message appears and no case cards are shown.
- [ ] Select `Completed` in the Case Library filter. Expected: A helpful zero-result message appears and no case cards are shown.
- [ ] Select `All 16 chapters`. Expected: The complete library returns without losing case links.
- [ ] Open `field-guide.html` with no guide progress. Expected: Chapter 01 renders first, all 16 chapter links are available, and no lessons are marked complete.
- [ ] Open `case.html?id=001` with no case progress. Expected: Case #001 loads with its starter CSS, unresolved status, and no revealed hints.

## Existing-progress testing

- [ ] Create one visited but unedited case by opening Case #040 and returning to the library. Expected: Case #040 is recorded as visited and appears in `In progress`.
- [ ] Edit Case #040 without solving it. Expected: The draft persists after reload and the case remains in `In progress`.
- [ ] Reveal one hint in Case #040, reload, and reopen it. Expected: The revealed hint remains visible and later hints remain unrevealed.
- [ ] Solve one case completely. Expected: It leaves `In progress`, appears in `Completed`, and increases the completed case count by one.
- [ ] Retain existing completed cases, lessons, and review scores while opening other routes. Expected: Navigation does not clear or rename existing progress records.
- [ ] Reload the home page after leaving an incomplete case. Expected: The home/header continuation link points to the last visited incomplete case.
- [ ] Complete the last incomplete case in a simulated 48 of 48 state. Expected: Continuation links point to the Case Library rather than Case #001.

## All page routes

- [ ] Open `index.html`. Expected: Home page renders, navigation links work, and the progress summary is visible.
- [ ] Open `cases.html`. Expected: Case Library renders with filters, progress tools, progress summary, and 16 chapter collections.
- [ ] Open `field-guide.html`. Expected: Field Guide renders with chapter navigation and the selected chapter content.
- [ ] Open `field-guide.html#chapter-01`. Expected: Chapter 01 is selected and the page scrolls to the chapter section.
- [ ] Open `field-guide.html#chapter-02-lesson-3`. Expected: Chapter 02 renders and scrolls to Lesson 03.
- [ ] Open `field-guide.html#flexbox`. Expected: Chapter 09 Flexbox renders with its lessons, lab, and review.
- [ ] Open `field-guide.html#flexbox-lesson-1`. Expected: Chapter 09 renders and scrolls to Lesson 01.
- [ ] Open `case.html?id=001`. Expected: Case #001 renders without a missing-data error.
- [ ] Open `case.html?id=048`. Expected: Case #048 renders without a missing-data error.
- [ ] Open an invalid case route such as `case.html?id=999`. Expected: A clear Case Not Found state appears without a JavaScript error.
- [ ] Use the header navigation from each page. Expected: Home, Case Library, and Field Guide links reach the correct routes and preserve progress.

## Case route checklist

Open each route and verify the same core behavior: title, chapter label, objective, clues, editor, preview, actions, and navigation render without errors.

- [ ] `case.html?id=001` — The Selector That Wins. Expected: Case 001 loads under Chapter 01 and shows previous/next controls appropriate to the first curriculum case.
- [ ] `case.html?id=002` — The Sibling That Would Not Match. Expected: Case 002 loads under Chapter 01 and shows Case 001 as Previous and Case 003 as Next.
- [ ] `case.html?id=003` — The Box That Grew. Expected: Case 003 loads under Chapter 01 and is labeled Transfer Challenge.
- [ ] `case.html?id=004` — The Cards That Refuse to Wrap. Expected: Case 004 loads under Chapter 09 Flexbox and follows Case 003 in curriculum order.
- [ ] `case.html?id=005` — The Toolbar Won’t Share Space. Expected: Case 005 loads under Chapter 09 and navigates between Cases 004 and 006.
- [ ] `case.html?id=006` — The Uneven Gaps. Expected: Case 006 loads under Chapter 09 and is labeled Transfer Challenge.
- [ ] `case.html?id=007` — The Cropped Hero. Expected: Case 007 loads under Chapter 02 and follows Case 006 in curriculum order.
- [ ] `case.html?id=008` — The Missing Marker. Expected: Case 008 loads under Chapter 02 and navigates between Cases 007 and 009.
- [ ] `case.html?id=009` — The Border That Disappeared. Expected: Case 009 loads under Chapter 02 and is labeled Transfer Challenge.
- [ ] `case.html?id=010` — The Confusing Interface. Expected: Case 010 loads under Chapter 03 and follows Case 009 in curriculum order.
- [ ] `case.html?id=011` — The Unclear Checkout. Expected: Case 011 loads under Chapter 03 and navigates between Cases 010 and 012.
- [ ] `case.html?id=012` — The Hierarchy That Collapsed. Expected: Case 012 loads under Chapter 03 and is labeled Transfer Challenge.
- [ ] `case.html?id=013` — The Unpredictable Size. Expected: Case 013 loads under Chapter 04 and follows Case 012 in curriculum order.
- [ ] `case.html?id=014` — The Overflowing Viewport. Expected: Case 014 loads under Chapter 04 and navigates between Cases 013 and 015.
- [ ] `case.html?id=015` — The Formula That Broke. Expected: Case 015 loads under Chapter 04 and is labeled Transfer Challenge.
- [ ] `case.html?id=016` — The Unresponsive Button. Expected: Case 016 loads under Chapter 05 and follows Case 015 in curriculum order.
- [ ] `case.html?id=017` — The Miscounted Child. Expected: Case 017 loads under Chapter 05 and navigates between Cases 016 and 018.
- [ ] `case.html?id=018` — The Content That Appeared Twice. Expected: Case 018 loads under Chapter 05 and is labeled Transfer Challenge.
- [ ] `case.html?id=019` — The Invisible Text. Expected: Case 019 loads under Chapter 06 and follows Case 018 in curriculum order.
- [ ] `case.html?id=020` — The Shadow That Escaped. Expected: Case 020 loads under Chapter 06 and navigates between Cases 019 and 021.
- [ ] `case.html?id=021` — The Transparent Overlay. Expected: Case 021 loads under Chapter 06 and is labeled Transfer Challenge.
- [ ] `case.html?id=022` — The Broken Checkbox. Expected: Case 022 loads under Chapter 07 and follows Case 021 in curriculum order.
- [ ] `case.html?id=023` — The Unclear Error State. Expected: Case 023 loads under Chapter 07 and navigates between Cases 022 and 024.
- [ ] `case.html?id=024` — The Label That Lost Its Target. Expected: Case 024 loads under Chapter 07 and is labeled Transfer Challenge.
- [ ] `case.html?id=025` — The Overflowing Card. Expected: Case 025 loads under Chapter 08 and follows Case 024 in curriculum order.
- [ ] `case.html?id=026` — The Unexpected Extra Width. Expected: Case 026 loads under Chapter 08 and navigates between Cases 025 and 027.
- [ ] `case.html?id=027` — The Transforming Hit Area. Expected: Case 027 loads under Chapter 08 and is labeled Transfer Challenge.
- [ ] `case.html?id=028` — The Misaligned Heading. Expected: Case 028 loads under Chapter 10 and follows Case 027 in curriculum order.
- [ ] `case.html?id=029` — The Missing Web Font. Expected: Case 029 loads under Chapter 10 and navigates between Cases 028 and 030.
- [ ] `case.html?id=030` — The Line-height That Drifted. Expected: Case 030 loads under Chapter 10 and is labeled Transfer Challenge.
- [ ] `case.html?id=031` — The Invisible Focus. Expected: Case 031 loads under Chapter 11 and follows Case 030 in curriculum order.
- [ ] `case.html?id=032` — The Hidden-but-Readable Button. Expected: Case 032 loads under Chapter 11 and navigates between Cases 031 and 033.
- [ ] `case.html?id=033` — The Contrast That Failed. Expected: Case 033 loads under Chapter 11 and is labeled Transfer Challenge.
- [ ] `case.html?id=034` — The Stubborn Navbar. Expected: Case 034 loads under Chapter 12 and follows Case 033 in curriculum order.
- [ ] `case.html?id=035` — The Badge in the Wrong Corner. Expected: Case 035 loads under Chapter 12 and navigates between Cases 034 and 036.
- [ ] `case.html?id=036` — The Layer Behind the Modal. Expected: Case 036 loads under Chapter 12 and is labeled Transfer Challenge.
- [ ] `case.html?id=037` — The Selector Mystery. Expected: Case 037 loads under Chapter 13 and follows Case 036 in curriculum order.
- [ ] `case.html?id=038` — The Wrong Download Link. Expected: Case 038 loads under Chapter 13 and navigates between Cases 037 and 039.
- [ ] `case.html?id=039` — The Language That Was Missed. Expected: Case 039 loads under Chapter 13 and is labeled Transfer Challenge.
- [ ] `case.html?id=040` — The Broken Mobile Layout. Expected: Case 040 loads under Chapter 14 and follows Case 039 in curriculum order.
- [ ] `case.html?id=041` — The Desktop-only Button. Expected: Case 041 loads under Chapter 14 and navigates between Cases 040 and 042.
- [ ] `case.html?id=042` — The Breakpoint That Came Too Early. Expected: Case 042 loads under Chapter 14 and is labeled Transfer Challenge.
- [ ] `case.html?id=043` — The Collapsed Gallery. Expected: Case 043 loads under Chapter 15 and follows Case 042 in curriculum order.
- [ ] `case.html?id=044` — The Misplaced Sidebar. Expected: Case 044 loads under Chapter 15 and requires the intended grid track result plus `display: grid`.
- [ ] `case.html?id=045` — The Track That Would Not Stretch. Expected: Case 045 loads under Chapter 15, is labeled Transfer Challenge, and requires the intended placement plus `display: grid`.
- [ ] `case.html?id=046` — The Animation That Never Ends. Expected: Case 046 loads under Chapter 16 and follows Case 045 in curriculum order.
- [ ] `case.html?id=047` — The Button That Moves Too Much. Expected: Case 047 loads under Chapter 16 and navigates between Cases 046 and 048.
- [ ] `case.html?id=048` — The Motion That Ignored Preferences. Expected: Case 048 loads under Chapter 16, is labeled Transfer Challenge, and has no Next case.

## Preview modes, editing, and validation

Run these tests on at least Cases #001, #007, #044, and #048.

- [ ] Open the Original preview. Expected: The uncorrected case surface is shown and the mode control is selected.
- [ ] Open the Current preview before editing. Expected: The current surface matches the starter CSS and the mode control is selected.
- [ ] Open the Target preview. Expected: The approved target surface is shown and the green approved badge or other target-specific styling remains correct.
- [ ] Return to Current after viewing Target. Expected: The learner’s current result returns without changing the editor contents.
- [ ] Edit CSS with a valid declaration. Expected: The Current preview updates and draft status changes from Starter file to Draft saved.
- [ ] Enter malformed CSS and check the fix. Expected: A clear syntax or validation failure appears, the case remains unresolved, and the draft is preserved.
- [ ] Enter a superficially matching but incomplete Grid fix in Case #044 or #045. Expected: The validator rejects it when the required Grid display condition is missing.
- [ ] Enter the approved solution and check the fix. Expected: Success feedback appears, the resolution section opens, and the case is marked complete.
- [ ] Reload an unresolved case after editing. Expected: The draft CSS persists.
- [ ] Reload a completed case. Expected: Completion remains recorded and the resolution remains available according to the case design.

## Hints, reset, and replay

- [ ] Request the first hint. Expected: Hint 1 appears and the request button advances to the next hint.
- [ ] Reload after revealing one or more hints. Expected: Revealed hints persist for that case.
- [ ] Request all available hints. Expected: The button becomes disabled and reports that all hints are revealed.
- [ ] Confirm a generic final hint. Expected: It is diagnostic and does not reveal the exact target property/value prematurely.
- [ ] Reset an edited unresolved case. Expected: The editor returns to starter CSS, the draft is cleared, visited state remains, and the case is not incorrectly marked complete.
- [ ] Use Replay from a resolved case. Expected: The case returns to its playable surface without changing unrelated case progress.

## Previous, Next, and chapter mapping

- [ ] Navigate from Case #003 to Next. Expected: Case #007 opens, not Case #004.
- [ ] Navigate from Case #006 to Next. Expected: Case #007 opens.
- [ ] Navigate from Case #027 to Next. Expected: Case #028 opens.
- [ ] Navigate from Case #028 to Previous. Expected: Case #027 opens.
- [ ] Navigate from Case #009 to Next. Expected: Case #010 opens.
- [ ] Navigate from Case #010 to Previous. Expected: Case #009 opens.
- [ ] Open Chapter 02 in the Field Guide after completing Case #007 or #008. Expected: Its case summary counts Cases #007–#009 only.
- [ ] Open Chapter 09 in the Field Guide. Expected: Its case summary counts Cases #004–#006 only.
- [ ] Confirm each chapter has exactly three mapped cases. Expected: The 16 chapter registry groups all 48 cases exactly once.

## Lesson completion and Field Guide reviews

- [ ] Mark each of three lessons complete in a chapter. Expected: The chapter summary updates from 0/3 to 3/3 lessons.
- [ ] Reload the Field Guide after marking a lesson complete. Expected: The lesson remains complete.
- [ ] Submit an incomplete review. Expected: The review explains that all questions must be answered and does not complete the chapter.
- [ ] Submit a failing review score. Expected: The review remains pending and the chapter does not close.
- [ ] Submit a passing review score for a standard chapter. Expected: At least 2/3 is required and the review becomes complete only at or above that threshold.
- [ ] Submit the Flexbox review. Expected: At least 4/5 is required before the review becomes complete.
- [ ] Reset review answers. Expected: Current answers clear while best/latest score history remains available.
- [ ] Reload after a passing review. Expected: Passing state and best score persist.
- [ ] Confirm a chapter with incomplete lessons, review, or cases. Expected: The chapter summary remains In Progress.
- [ ] Complete all lessons, review, and mapped cases in a chapter. Expected: The chapter summary reports complete.

## Resume and recommended-next behavior

- [ ] Open an incomplete case, then visit another page without completing it. Expected: Home and header continuation links offer Resume last activity for that incomplete case.
- [ ] Complete the current case. Expected: The continuation link changes to the recommended next incomplete case in curriculum order.
- [ ] Complete several non-sequential cases. Expected: Recommended next follows curriculum order, not numeric sorting or last completed ID.
- [ ] Set all 48 cases complete in a test profile. Expected: Home and header continuation links offer the Case Library, not Case #001.
- [ ] Open the Case Library after 48/48 completion. Expected: The library remains available for review and no next case is offered.

## Progress export, import, and reset

- [ ] Export progress from the Case Library. Expected: A JSON file downloads without changing current progress.
- [ ] Inspect the exported file. Expected: It contains a version, export timestamp, and only `css-casebook-` records.
- [ ] Import a valid exported file in a separate test profile. Expected: The selected progress restores the cases, lessons, reviews, and resume state represented by the file.
- [ ] Cancel the import file picker. Expected: Current progress remains unchanged.
- [ ] Attempt to import malformed JSON. Expected: An error is shown and existing progress is not erased.
- [ ] Attempt to import a JSON file with an invalid schema. Expected: An error is shown and existing progress is not erased.
- [ ] Reset all progress after confirming the warning. Expected: Case, lesson, review, and resume progress clear for the current device and the home page returns to its fresh state.
- [ ] Cancel the Reset all progress confirmation. Expected: No progress is deleted.

## Keyboard-only operation

- [ ] Navigate the home page using only Tab, Shift+Tab, Enter, and Space. Expected: Every link and action is reachable, focus is visible, and activation works.
- [ ] Navigate the Case Library filter using the keyboard. Expected: The filter can be opened and changed without a mouse.
- [ ] Focus a case editor and press Tab. Expected: Normal keyboard navigation moves focus out of the editor instead of inserting hidden focus-trapping behavior.
- [ ] Use Shift+Tab from the case editor. Expected: Focus moves to the previous focusable control.
- [ ] Request hints using the keyboard. Expected: Hint state updates and the status is announced without losing focus unexpectedly.
- [ ] Check and reset a case using the keyboard. Expected: Both actions are reachable, operable, and provide visible/announced feedback.
- [ ] Operate a chapter review using the keyboard. Expected: Radio choices, Check review, and Reset answers work without a mouse.
- [ ] Operate Export, Import, and Reset all progress using the keyboard. Expected: Each action is reachable and its dialog/file interaction is understandable.

## Mobile tabs

- [ ] Set the viewport to a narrow mobile width and open a case. Expected: Editor, Preview, and Clues appear as keyboard-accessible mobile tabs.
- [ ] Activate each mobile tab. Expected: Only the selected panel is visible and the selected tab exposes the correct selected state.
- [ ] Use ArrowRight and ArrowDown on the mobile tab list. Expected: Focus moves to the next tab and wraps when appropriate.
- [ ] Use ArrowLeft and ArrowUp on the mobile tab list. Expected: Focus moves to the previous tab and wraps when appropriate.
- [ ] Press Home and End in the mobile tab list. Expected: Focus moves to the first or last tab.
- [ ] Reload after selecting a mobile tab. Expected: The page remains usable and the default active panel is valid.

## 320px mobile viewport

- [ ] Set the viewport to exactly 320px wide and open `index.html`. Expected: No horizontal page overflow, clipped controls, or unreadable text appears.
- [ ] Set the viewport to exactly 320px wide and open `cases.html`. Expected: Filters, progress tools, case links, and collection cards remain usable without horizontal overflow.
- [ ] Set the viewport to exactly 320px wide and open `field-guide.html`. Expected: Chapter navigation, lessons, review controls, and summaries remain readable and usable.
- [ ] Set the viewport to exactly 320px wide and open Cases #001, #044, and #048. Expected: Editor, preview, clues, tabs, actions, and feedback fit the viewport without clipping.
- [ ] Set the viewport to exactly 320px wide and open the Flexbox guide. Expected: The lab controls and preview remain usable without forcing page-level horizontal scrolling.

## 200 percent zoom

- [ ] Set browser zoom to 200 percent on `index.html`. Expected: Content remains readable and primary actions remain reachable.
- [ ] Set browser zoom to 200 percent on `cases.html`. Expected: Filters, progress tools, case links, and status messages remain usable.
- [ ] Set browser zoom to 200 percent on `field-guide.html`. Expected: Lessons, review choices, and summaries reflow without overlap.
- [ ] Set browser zoom to 200 percent on a case page. Expected: Editor, preview, clues, tabs, validation feedback, and action buttons remain reachable without content being clipped.

## Reduced-motion behavior

- [ ] Enable the operating-system or browser `prefers-reduced-motion: reduce` setting. Expected: Case resolution scrolling uses an immediate or reduced-motion behavior.
- [ ] Open Case #048 with reduced motion enabled. Expected: The reduced-motion case remains readable and its target behavior can be validated without relying on decorative animation.
- [ ] Navigate between cases and Field Guide sections with reduced motion enabled. Expected: No essential content disappears and transitions do not create distracting motion.
- [ ] Disable reduced motion and repeat one navigation action. Expected: Normal motion may return without changing progress or validation results.

## Smoke-test completion

- [ ] Review the browser console after the full checklist. Expected: No new uncaught errors, failed route loads, or accessibility-breaking warnings were introduced.
- [ ] Confirm progress after the full checklist. Expected: The test profile contains only the progress intentionally created during testing.
- [ ] Record each failure separately. Expected: Every defect includes route, case ID if relevant, browser/device, steps, expected result, actual result, and severity.
- [ ] Confirm no website code was changed as part of documentation-only QA. Expected: This checklist update modifies only `TESTING.md`.
