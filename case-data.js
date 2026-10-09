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
    nextCase: "003",
    storageKey: "css-casebook-fc002",
  },
  "003": {
    id: "003",
    fileCode: "CF-003",
    chapter: "CH01 CSS Fundamentals",
    topic: "Cascade",
    level: "Beginner",
    duration: "5–10 min",
    title: "Overridden Style",
    objective:
      "Restore the approved status color by diagnosing which CSS rule wins—without changing the trusted HTML.",
    incidentTitle: "The approved badge turned red.",
    incident:
      "A profile card contains an Approved status badge. The general badge rule sets the correct forest green, but another declaration overrides it inside the card.",
    evidence: [
      ["Expected", "Green Approved badge"],
      ["Observed", "Red Approved badge"],
      ["Constraint", "Do not edit the HTML"],
    ],
    selector: ".status-badge",
    starterCSS: `.status-badge {
  background: #315d4c;
  color: white;
}

.profile-card .status-badge {
  background: #a44d2f;
}`,
    targetCSS: "background:#315d4c;color:white",
    targetPreviewCSS: `.status-badge {
  background: #315d4c;
  color: white;
}

.profile-card .status-badge {
  background: #315d4c;
}`,
    originalCaption: "Original — overridden badge color",
    targetCaption: "Target — approved forest badge",
    previewLabel: "status card",
    previewHTML: `<article class="profile-card"><div class="avatar" aria-hidden="true">CE</div><div><p class="name">Christine Espiritu</p><p class="role">Frontend investigator</p></div><span class="status-badge">Approved</span></article>`,
    previewBaseCSS: `* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 28px; color: #18221c; background: #ebe7dc; font-family: Arial, sans-serif; }
.profile-card { width: min(100%, 520px); display: grid; grid-template-columns: auto 1fr auto; gap: 16px; align-items: center; padding: 24px; border: 1px solid #738078; border-radius: 8px; background: #fffefa; box-shadow: 4px 4px 0 rgba(49, 93, 76, .12); }
.avatar { display: grid; place-items: center; width: 52px; height: 52px; border-radius: 50%; color: white; background: #173d2c; font-weight: 700; }
.name { margin: 0 0 5px; font-weight: 700; }
.role { margin: 0; color: #657067; font-size: 12px; }
.status-badge { padding: 8px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; }`,
    hints: [
      [
        "Observation",
        "The badge has two background declarations. Which one appears later and targets it more specifically?",
      ],
      [
        "Concept",
        "When declarations conflict, the cascade compares importance, origin, specificity and then source order.",
      ],
      [
        "Targeted clue",
        "Inspect .profile-card .status-badge. Its selector is more specific than .status-badge.",
      ],
    ],
    checkingTitle: "Tracing the cascade…",
    checkingText:
      " Comparing the badge’s computed color with the approved design.",
    successText: " The Approved badge now uses the required forest green.",
    validator: "green-status",
    rootCause:
      "The descendant selector .profile-card .status-badge has greater specificity than .status-badge, so its red background declaration won the cascade.",
    remember:
      "When two declarations target the same property, compare specificity before assuming the nearest-looking rule should win.",
    recommendedCSS: `.status-badge {
  background: #315d4c;
  color: white;
}

.profile-card .status-badge {
  background: #315d4c;
}`,
    question: "Which selector is more specific?",
    choices: [
      [".status-badge", false],
      [".profile-card .status-badge", true],
    ],
    correctFeedback:
      "Correct. Two class selectors are more specific than one class selector.",
    incorrectFeedback: "Not quite. Count the class selectors in each selector.",
    guideHref: "cases.html",
    guideLabel: "Back to Case Library →",
    nextCase: null,
    storageKey: "css-casebook-cf003",
  },
};
