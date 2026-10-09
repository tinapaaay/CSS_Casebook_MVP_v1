window.CASEBOOK_CASES = {
  "001": {
    id: "001",
    fileCode: "FC-001",
    chapter: "CH09 Flexbox",
    topic: "Flexbox",
    level: "Beginner",
    duration: "5–10 min",
    title: "The Missing Center",
    objective: "Center the three cards horizontally and vertically—without changing the HTML or removing Flexbox.",
    incidentTitle: "The layout lost its center.",
    incident: "Three interface cards should sit in the middle of their container. They are centered from left to right, but remain pinned near the top.",
    evidence: [["Expected", "Centered on both axes"], ["Observed", "Horizontal only"], ["Constraint", "Keep HTML and Flexbox"]],
    selector: ".container",
    starterCSS: `.container {
  display: flex;
  height: 180px;
  justify-content: center;
  align-items: flex-start;
}`,
    originalCSS: "display:flex;height:180px;justify-content:center;align-items:flex-start",
    targetCSS: "display:flex;height:180px;justify-content:center;align-items:center",
    originalCaption: "Original — immutable starter layout",
    targetCaption: "Target — intended centered layout",
    previewLabel: "layout",
    previewClass: "demo-container",
    previewHTML: `<article class="demo-card"><span>01</span><strong>Profile</strong><small>Case subject</small></article><article class="demo-card"><span>02</span><strong>Archive</strong><small>Filed notes</small></article><article class="demo-card"><span>03</span><strong>Settings</strong><small>Preferences</small></article>`,
    hints: [
      ["Observation", "The cards are already centered horizontally. Which direction still needs adjustment?"],
      ["Concept", "With flex-direction: row, justify-content controls the horizontal main axis, while align-items controls the vertical cross axis."],
      ["Targeted clue", "Inspect align-items. Which value centers flex items on the cross axis?"]
    ],
    checkingTitle: "Inspecting the layout…",
    checkingText: " Comparing the rendered result with the case requirements.",
    successText: " All three cards meet the alignment requirements.",
    validator: "centered-cards",
    rootCause: "In a row-direction flex container, the cross axis is vertical. align-items: flex-start placed the cards at the top of that axis.",
    remember: "justify-content aligns on the main axis. align-items aligns on the cross axis.",
    recommendedCSS: `.container {
  display: flex;
  height: 180px;
  justify-content: center;
  align-items: center;
}`,
    question: "If flex-direction becomes column, which direction does justify-content control?",
    choices: [["Horizontal", false], ["Vertical", true]],
    correctFeedback: "Correct. In a column, the main axis runs vertically.",
    incorrectFeedback: "Not quite. justify-content follows the main axis, which becomes vertical in a column.",
    guideHref: "field-guide.html#lesson-7",
    guideLabel: "Review centering →",
    storageKey: "css-casebook-fc001"
  },
  "002": {
    id: "002",
    fileCode: "FC-002",
    chapter: "CH09 Flexbox",
    topic: "Flexbox",
    level: "Beginner",
    duration: "5–10 min",
    title: "The Reversed Navigation",
    objective: "Restore the navigation’s logical left-to-right order—without changing the HTML or removing Flexbox.",
    incidentTitle: "The menu reads backward.",
    incident: "The HTML contains Home, Cases, Field Guide and Contact in the correct order, but the rendered navigation displays them from last to first.",
    evidence: [["Expected", "Home appears first"], ["Observed", "Contact appears first"], ["Constraint", "Keep HTML and Flexbox"]],
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
    previewClass: "nav-demo-container",
    previewHTML: `<a class="demo-nav-link" href="#">Home</a><a class="demo-nav-link" href="#">Cases</a><a class="demo-nav-link" href="#">Field Guide</a><a class="demo-nav-link" href="#">Contact</a>`,
    hints: [
      ["Observation", "Compare the first and last links. The links exist, but their direction appears reversed."],
      ["Concept", "flex-direction controls the main-axis direction and can reverse the visual order of flex items."],
      ["Targeted clue", "Inspect row-reverse. Which direction value preserves the same order as the HTML?"]
    ],
    checkingTitle: "Inspecting the navigation…",
    checkingText: " Comparing the rendered order with the trusted HTML.",
    successText: " The navigation now follows the logical HTML order.",
    validator: "logical-navigation",
    rootCause: "flex-direction: row-reverse reversed the visual main-axis direction while leaving the HTML source unchanged.",
    remember: "Visual reordering does not necessarily change keyboard or screen-reader order. Keep the HTML logical and reverse layouts only deliberately.",
    recommendedCSS: `.nav-links {
  display: flex;
  flex-direction: row;
  gap: 24px;
}`,
    question: "If the navigation used column-reverse, where would the first HTML item appear?",
    choices: [["At the bottom", true], ["At the top", false]],
    correctFeedback: "Correct. Reversing a column places the first HTML item at the bottom.",
    incorrectFeedback: "Not quite. column-reverse reverses the vertical main-axis direction.",
    guideHref: "field-guide.html#lesson-2",
    guideLabel: "Review flex-direction →",
    storageKey: "css-casebook-fc002"
  }
};
