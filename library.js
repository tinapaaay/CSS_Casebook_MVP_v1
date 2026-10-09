const collections = [
  ["01", "CSS Fundamentals", "Syntax, sizing, combinators, display, spacing, cascade and specificity", ["Overridden Style", "The Sibling That Would Not Match"]],
  ["02", "Lists, Links, Backgrounds & Borders", "Markers, link states, backgrounds, borders, gradients and contrast", ["The Cropped Hero", "The Missing Marker"]],
  ["03", "Design Fundamentals", "Hierarchy, composition, UX patterns, prototypes and testing", ["The Confusing Interface", "The Unclear Checkout"]],
  ["04", "Relative & Absolute Units", "px, rem, em, percentages, viewport units and calc()", ["The Unpredictable Size", "The Overflowing Viewport"]],
  ["05", "Pseudo-classes & Pseudo-elements", "Interaction states, structural selectors and generated content", ["The Unresponsive Button", "The Miscounted Child"]],
  ["06", "CSS Colors", "Color systems, formats, transparency, shadows and gradients", ["The Invisible Text", "The Shadow That Escaped"]],
  ["07", "Styling Forms", "Labels, focus, checked, disabled and error states", ["The Broken Checkbox", "The Unclear Error State"]],
  ["08", "Layouts & Effects", "Overflow, transforms, box model, resets, filters and visibility", ["The Overflowing Card", "The Unexpected Extra Width"]],
  ["09", "CSS Flexbox", "Main and cross axes, direction, wrapping and alignment", ["The Missing Center", "The Reversed Navigation", "The Uneven Gaps"]],
  ["10", "CSS Typography", "Type anatomy, font stacks, web fonts, spacing and shadows", ["The Misaligned Heading", "The Missing Web Font"]],
  ["11", "CSS Accessibility", "Contrast, focus, hidden content and reduced motion", ["The Invisible Focus", "The Hidden-but-Readable Button"]],
  ["12", "CSS Positioning", "Float, positioned elements, z-index and stacking contexts", ["The Stubborn Navbar", "The Badge in the Wrong Corner"]],
  ["13", "Attribute Selectors", "Attribute operators, language selectors and data attributes", ["The Selector Mystery", "The Wrong Download Link"]],
  ["14", "Responsive Web Design", "Fluid layouts, media queries, breakpoints and preferences", ["The Broken Mobile Layout", "The Desktop-only Button"]],
  ["15", "CSS Grid", "Tracks, gaps, placement, areas, auto-fit and minmax()", ["The Collapsed Gallery", "The Misplaced Sidebar"]],
  ["16", "CSS Animations", "Keyframes, timing, iterations, transforms and reduced motion", ["The Animation That Never Ends", "The Button That Moves Too Much"]]
];

const library = document.querySelector("#case-library");
const guideNav = document.querySelector("#guide-nav");
const guideSearch = document.querySelector("#guide-search");

function renderLibrary(filter = "all") {
  if (!library) return;
  library.innerHTML = collections.filter(item => filter === "all" || (filter === "available" ? item[0] === "09" : item[0] !== "09")).map(([number, title, description, cases]) => {
    const available = number === "09";
    return `<article class="collection-card ${available ? "is-available" : ""}">
      <header><span>${number}</span><small>${available ? "2 playable" : "Planned"}</small></header>
      <h2>${title}</h2><p>${description}</p>
      <ul>${cases.map((name, index) => {
        if (available && index === 0) return `<li><a href="case.html?id=001">Case #001 · ${name}</a></li>`;
        if (available && index === 1) return `<li><a href="case.html?id=002">Case #002 · ${name}</a></li>`;
        return `<li><span>${name}</span><small>Coming soon</small></li>`;
      }).join("")}</ul>
      ${available ? `<a class="collection-link" href="field-guide.html#flexbox">Read Flexbox guide →</a>` : ""}
    </article>`;
  }).join("");
}

function renderGuideNav(query = "") {
  if (!guideNav) return;
  const q = query.trim().toLowerCase();
  guideNav.innerHTML = collections.filter(item => `${item[0]} ${item[1]} ${item[2]}`.toLowerCase().includes(q)).map(([number, title]) => number === "09" ? `<a class="is-current" href="#flexbox"><span>${number}</span>${title}<small>Available</small></a>` : `<span class="guide-nav-item is-disabled"><span>${number}</span>${title}<small>Planned</small></span>`).join("");
}

renderLibrary();
renderGuideNav();
document.querySelector("#collection-filter")?.addEventListener("change", event => renderLibrary(event.target.value));
guideSearch?.addEventListener("input", event => renderGuideNav(event.target.value));
