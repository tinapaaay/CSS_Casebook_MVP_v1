window.CASEBOOK_CASES = {
  "001": {
    id: "001",
    fileCode: "FC-001",
    chapter: "CH09 Flexbox",
    topic: "Flexbox",
    level: "Beginner",
    duration: "5–10 min",
    title: "The Missing Center",
    objective:
      "Center the three cards horizontally and vertically—without changing the HTML or removing Flexbox.",
    incidentTitle: "The layout lost its center.",
    incident:
      "Three interface cards should sit in the middle of their container. They are centered from left to right, but remain pinned near the top.",
    evidence: [
      ["Expected", "Centered on both axes"],
      ["Observed", "Horizontal only"],
      ["Constraint", "Keep HTML and Flexbox"],
    ],
    selector: ".container",
    starterCSS: `.container {
  display: flex;
  height: 180px;
  justify-content: center;
  align-items: flex-start;
}`,
    originalCSS:
      "display:flex;height:180px;justify-content:center;align-items:flex-start",
    targetCSS:
      "display:flex;height:180px;justify-content:center;align-items:center",
    originalCaption: "Original — immutable starter layout",
    targetCaption: "Target — intended centered layout",
    previewLabel: "layout",
    previewHTML: `<div class="container"><article class="card"><span>01</span><strong>Profile</strong><small>Case subject</small></article><article class="card"><span>02</span><strong>Archive</strong><small>Filed notes</small></article><article class="card"><span>03</span><strong>Settings</strong><small>Preferences</small></article></div>`,
    previewBaseCSS: `* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 28px; color: #18221c; background: #ebe7dc; font-family: Arial, sans-serif; }
.container { width: min(100%, 510px); min-height: 180px; border: 1px dashed #738078; background: rgba(255, 253, 247, .9); }
.card { width: 112px; min-height: 92px; padding: 13px; border: 1px solid #5c6d62; background: #fdfbf4; box-shadow: 3px 3px 0 rgba(49, 91, 71, .14); }
.card span { color: #a44d2f; font: 700 9px/1 monospace; }
.card strong, .card small { display: block; }
.card strong { margin: 15px 0 4px; font: 700 18px/1 Georgia, serif; }
.card small { color: #657067; font-size: 10px; }`,
    hints: [
      [
        "Observation",
        "The cards are already centered horizontally. Which direction still needs adjustment?",
      ],
      [
        "Concept",
        "With flex-direction: row, justify-content controls the horizontal main axis, while align-items controls the vertical cross axis.",
      ],
      [
        "Targeted clue",
        "Inspect align-items. Which value centers flex items on the cross axis?",
      ],
    ],
    checkingTitle: "Inspecting the layout…",
    checkingText: " Comparing the rendered result with the case requirements.",
    successText: " All three cards meet the alignment requirements.",
    validator: "centered-cards",
    rootCause:
      "In a row-direction flex container, the cross axis is vertical. align-items: flex-start placed the cards at the top of that axis.",
    remember:
      "justify-content aligns on the main axis. align-items aligns on the cross axis.",
    recommendedCSS: `.container {
  display: flex;
  height: 180px;
  justify-content: center;
  align-items: center;
}`,
    question:
      "If flex-direction becomes column, which direction does justify-content control?",
    choices: [
      ["Horizontal", false],
      ["Vertical", true],
    ],
    correctFeedback: "Correct. In a column, the main axis runs vertically.",
    incorrectFeedback:
      "Not quite. justify-content follows the main axis, which becomes vertical in a column.",
    guideHref: "field-guide.html#lesson-7",
    guideLabel: "Review centering →",
    nextCase: "002",
    storageKey: "css-casebook-fc001",
  },
  "002": {
    id: "002",
    fileCode: "FC-002",
    chapter: "CH09 Flexbox",
    topic: "Flexbox",
    level: "Beginner",
    duration: "5–10 min",
    title: "The Reversed Navigation",
    objective:
      "Restore the navigation’s logical left-to-right order—without changing the HTML or removing Flexbox.",
    incidentTitle: "The menu reads backward.",
    incident:
      "The HTML contains Home, Cases, Field Guide and Contact in the correct order, but the rendered navigation displays them from last to first.",
    evidence: [
      ["Expected", "Home appears first"],
      ["Observed", "Contact appears first"],
      ["Constraint", "Keep HTML and Flexbox"],
    ],
    selector: ".nav-links",
    starterCSS: `.nav-links {
  display: flex;
  flex-direction: row-reverse;
  gap: 24px;
}`,
    originalCSS: "display:flex;flex-direction:row-reverse;gap:24px",
    targetCSS: "display:flex;flex-direction:row;gap:24px",
    originalCaption: "Original — reversed starter layout",
    targetCaption: "Target — logical HTML order",
    previewLabel: "navigation",
    previewHTML: `<nav class="nav-links" aria-label="Demonstration navigation"><a href="#">Home</a><a href="#">Cases</a><a href="#">Field Guide</a><a href="#">Contact</a></nav>`,
    previewBaseCSS: `* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 28px; color: #18221c; background: #ebe7dc; font-family: Arial, sans-serif; }
.nav-links { width: min(100%, 570px); min-height: 96px; align-items: center; padding: 20px; border: 1px dashed #738078; background: rgba(255, 253, 247, .9); }
.nav-links a { flex: 0 0 auto; padding: 10px 12px; color: #173d2c; border-bottom: 2px solid transparent; font-size: 12px; font-weight: 700; text-decoration: none; white-space: nowrap; }`,
    hints: [
      [
        "Observation",
        "Compare the first and last links. The links exist, but their direction appears reversed.",
      ],
      [
        "Concept",
        "flex-direction controls the main-axis direction and can reverse the visual order of flex items.",
      ],
      [
        "Targeted clue",
        "Inspect row-reverse. Which direction value preserves the same order as the HTML?",
      ],
    ],
    checkingTitle: "Inspecting the navigation…",
    checkingText: " Comparing the rendered order with the trusted HTML.",
    successText: " The navigation now follows the logical HTML order.",
    validator: "logical-navigation",
    rootCause:
      "flex-direction: row-reverse reversed the visual main-axis direction while leaving the HTML source unchanged.",
    remember:
      "Visual reordering does not necessarily change keyboard or screen-reader order. Keep the HTML logical and reverse layouts only deliberately.",
    recommendedCSS: `.nav-links {
  display: flex;
  flex-direction: row;
  gap: 24px;
}`,
    question:
      "If the navigation used column-reverse, where would the first HTML item appear?",
    choices: [
      ["At the bottom", true],
      ["At the top", false],
    ],
    correctFeedback:
      "Correct. Reversing a column places the first HTML item at the bottom.",
    incorrectFeedback:
      "Not quite. column-reverse reverses the vertical main-axis direction.",
    guideHref: "field-guide.html#lesson-2",
    guideLabel: "Review flex-direction →",
    nextCase: null,
    storageKey: "css-casebook-fc002",
  },
};
