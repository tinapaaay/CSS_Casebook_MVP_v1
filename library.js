const collections = [
  [
    "01",
    "CSS Fundamentals",
    "Syntax, sizing, combinators, display, spacing, cascade and specificity",
    [
      "The Selector That Wins",
      "The Sibling That Would Not Match",
      "The Box That Grew",
    ],
  ],
  [
    "02",
    "Lists, Links, Backgrounds & Borders",
    "Markers, link states, backgrounds, borders, gradients and contrast",
    ["The Cropped Hero", "The Missing Marker", "The Border That Disappeared"],
  ],
  [
    "03",
    "Design Fundamentals",
    "Hierarchy, composition, UX patterns, prototypes and testing",
    [
      "The Confusing Interface",
      "The Unclear Checkout",
      "The Hierarchy That Collapsed",
    ],
  ],
  [
    "04",
    "Relative & Absolute Units",
    "px, rem, em, percentages, viewport units and calc()",
    [
      "The Unpredictable Size",
      "The Overflowing Viewport",
      "The Formula That Broke",
    ],
  ],
  [
    "05",
    "Pseudo-classes & Pseudo-elements",
    "Interaction states, structural selectors and generated content",
    [
      "The Unresponsive Button",
      "The Miscounted Child",
      "The Content That Appeared Twice",
    ],
  ],
  [
    "06",
    "CSS Colors",
    "Color systems, formats, transparency, shadows and gradients",
    [
      "The Invisible Text",
      "The Shadow That Escaped",
      "The Transparent Overlay",
    ],
  ],
  [
    "07",
    "Styling Forms",
    "Labels, focus, checked, disabled and error states",
    [
      "The Broken Checkbox",
      "The Unclear Error State",
      "The Label That Lost Its Target",
    ],
  ],
  [
    "08",
    "Layouts & Effects",
    "Overflow, transforms, box model, resets, filters and visibility",
    [
      "The Overflowing Card",
      "The Unexpected Extra Width",
      "The Transforming Hit Area",
    ],
  ],
  [
    "09",
    "CSS Flexbox",
    "Main and cross axes, direction, wrapping and alignment",
    [
      "The Cards That Refuse to Wrap",
      "The Toolbar Won’t Share Space",
      "The Uneven Gaps",
    ],
  ],
  [
    "10",
    "CSS Typography",
    "Type anatomy, font stacks, web fonts, spacing and shadows",
    [
      "The Misaligned Heading",
      "The Missing Web Font",
      "The Line-height That Drifted",
    ],
  ],
  [
    "11",
    "CSS Accessibility",
    "Contrast, focus, hidden content and reduced motion",
    [
      "The Invisible Focus",
      "The Hidden-but-Readable Button",
      "The Contrast That Failed",
    ],
  ],
  [
    "12",
    "CSS Positioning",
    "Float, positioned elements, z-index and stacking contexts",
    [
      "The Stubborn Navbar",
      "The Badge in the Wrong Corner",
      "The Layer Behind the Modal",
    ],
  ],
  [
    "13",
    "Attribute Selectors",
    "Attribute operators, language selectors and data attributes",
    [
      "The Selector Mystery",
      "The Wrong Download Link",
      "The Language That Was Missed",
    ],
  ],
  [
    "14",
    "Responsive Web Design",
    "Fluid layouts, media queries, breakpoints and preferences",
    [
      "The Broken Mobile Layout",
      "The Desktop-only Button",
      "The Breakpoint That Came Too Early",
    ],
  ],
  [
    "15",
    "CSS Grid",
    "Tracks, gaps, placement, areas, auto-fit and minmax()",
    [
      "The Collapsed Gallery",
      "The Misplaced Sidebar",
      "The Track That Would Not Stretch",
    ],
  ],
  [
    "16",
    "CSS Animations",
    "Keyframes, timing, iterations, transforms and reduced motion",
    [
      "The Animation That Never Ends",
      "The Button That Moves Too Much",
      "The Motion That Ignored Preferences",
    ],
  ],
];

const playableCases = {
  "The Selector That Wins": "001",
  "The Sibling That Would Not Match": "002",
  "The Box That Grew": "003",
  "The Cards That Refuse to Wrap": "004",
  "The Toolbar Won’t Share Space": "005",
  "The Uneven Gaps": "006",
  "The Cropped Hero": "007",
  "The Missing Marker": "008",
  "The Border That Disappeared": "009",
  "The Confusing Interface": "010",
  "The Unclear Checkout": "011",
  "The Hierarchy That Collapsed": "012",
  "The Unpredictable Size": "013",
  "The Overflowing Viewport": "014",
  "The Formula That Broke": "015",
  "The Unresponsive Button": "016",
  "The Miscounted Child": "017",
  "The Content That Appeared Twice": "018",
  "The Invisible Text": "019",
  "The Shadow That Escaped": "020",
  "The Transparent Overlay": "021",
  "The Broken Checkbox": "022",
  "The Unclear Error State": "023",
  "The Label That Lost Its Target": "024",
  "The Overflowing Card": "025",
  "The Unexpected Extra Width": "026",
  "The Transforming Hit Area": "027",
  "The Misaligned Heading": "028",
  "The Missing Web Font": "029",
  "The Line-height That Drifted": "030",
  "The Invisible Focus": "031",
  "The Hidden-but-Readable Button": "032",
  "The Contrast That Failed": "033",
  "The Stubborn Navbar": "034",
  "The Badge in the Wrong Corner": "035",
  "The Layer Behind the Modal": "036",
  "The Selector Mystery": "037",
  "The Wrong Download Link": "038",
  "The Language That Was Missed": "039",
  "The Broken Mobile Layout": "040",
  "The Desktop-only Button": "041",
  "The Breakpoint That Came Too Early": "042",
  "The Collapsed Gallery": "043",
  "The Misplaced Sidebar": "044",
  "The Track That Would Not Stretch": "045",
  "The Animation That Never Ends": "046",
  "The Button That Moves Too Much": "047",
  "The Motion That Ignored Preferences": "048",
};

const library = document.querySelector("#case-library");
const guideNav = document.querySelector("#guide-nav");
const guideSearch = document.querySelector("#guide-search");

function renderLibrary(filter = "all") {
  if (!library) return;
  const visibleCollections = collections.filter((item) => {
    const hasPlayable = item[3].some((name) => playableCases[name]);
    return (
      filter === "all" || (filter === "available" ? hasPlayable : !hasPlayable)
    );
  });
  library.innerHTML = visibleCollections
    .map(([number, title, description, cases]) => {
      const playableCount = cases.filter((name) => playableCases[name]).length;
      const completedCount = cases.filter((name) => {
        const caseId = playableCases[name];
        return (
          caseId && window.CasebookProgress?.readCase(caseId).completed === true
        );
      }).length;
      const available = playableCount > 0;
      return `<article class="collection-card ${available ? "is-available" : ""}">
      <header><span>${number}</span><small>${available ? `${completedCount}/${playableCount} complete` : "Planned"}</small></header>
      <h2>${title}</h2><p>${description}</p>
      <ul>${cases
        .map((name) => {
          const caseId = playableCases[name];
          if (caseId)
            return `<li class="${window.CasebookProgress?.readCase(caseId).completed === true ? "is-complete" : ""}"><a href="case.html?id=${caseId}">Case #${caseId} · ${name}</a>${window.CasebookProgress?.readCase(caseId).completed === true ? "<small>✓ Complete</small>" : ""}</li>`;
          return `<li><span>${name}</span><small>Coming soon</small></li>`;
        })
        .join("")}</ul>
      ${number === "09" ? `<a class="collection-link" href="field-guide.html#flexbox">Read Flexbox guide →</a>` : ""}
    </article>`;
    })
    .join("");
}

function renderGuideNav(query = "") {
  if (!guideNav) return;
  const q = query.trim().toLowerCase();
  guideNav.innerHTML = collections
    .filter((item) =>
      `${item[0]} ${item[1]} ${item[2]}`.toLowerCase().includes(q),
    )
    .map(([number, title, description, cases]) => {
      const playableCount = cases.filter((name) => playableCases[name]).length;
      const guideHash = number === "09" ? "flexbox" : `chapter-${number}`;
      return `<a class="guide-nav-item" href="field-guide.html#${guideHash}"><span>${number}</span>${title}<small>${playableCount} cases · Guide</small></a>`;
    })
    .join("");
  const resultStatus = document.querySelector("#library-results");
  if (resultStatus) {
    const caseCount = visibleCollections.reduce(
      (total, item) =>
        total + item[3].filter((name) => playableCases[name]).length,
      0,
    );
    resultStatus.textContent = `${caseCount} playable case${caseCount === 1 ? "" : "s"} across ${visibleCollections.length} chapter${visibleCollections.length === 1 ? "" : "s"}.`;
  }
}

renderLibrary();
renderGuideNav();
document
  .querySelector("#collection-filter")
  ?.addEventListener("change", (event) => renderLibrary(event.target.value));
guideSearch?.addEventListener("input", (event) =>
  renderGuideNav(event.target.value),
);
