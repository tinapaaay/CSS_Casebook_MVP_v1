const chapters = [
  {
    number: "01",
    title: "CSS Fundamentals",
    deck: "Build a reliable CSS mental model: selectors, sizing, spacing, display, combinators and the cascade.",
    objectives: [
      "Read a CSS rule from selector to value.",
      "Choose the right selector relationship.",
      "Explain why a declaration wins.",
    ],
    before: "Know basic HTML elements and attributes.",
    lessons: [
      [
        "CSS rules and the viewport",
        "CSS controls presentation while HTML supplies structure and content. The viewport meta element tells mobile browsers to size the page to the device width.",
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
        "If spacing appears from nowhere, check browser defaults before adding another rule.",
      ],
      [
        "Sizing, display and spacing",
        "Block elements start on a new line; inline elements stay in text flow; inline-block sits inline while accepting width and height. Margin creates space outside the border, while padding creates space inside it.",
        ".box {\n  display: inline-block;\n  margin: 10px;\n  padding: 12px;\n}",
        "Margin separates siblings. Padding protects the content from its border.",
      ],
      [
        "Combinators and the cascade",
        "A space selects descendants, > selects direct children, + selects the immediately following sibling, and ~ selects later matching siblings. When rules conflict, compare importance and origin, then specificity, then source order.",
        ".card h2 + p { margin-top: 0; }\n.profile .status { color: seagreen; }",
        "Do not reach for !important before inspecting the selector that wins.",
      ],
    ],
  },
  {
    number: "02",
    title: "Lists, Links, Backgrounds and Borders",
    deck: "Style common interface surfaces without losing interaction states, image intent or readable contrast.",
    objectives: [
      "Control list markers and link states.",
      "Choose cover or contain intentionally.",
      "Build clear borders, gradients and contrast.",
    ],
    before: "Know selectors, color values and basic spacing.",
    lessons: [
      [
        "Lists and link states",
        "Use list-style properties for markers and spacing. Links have distinct states: :link, :visited, :hover, :focus and :active. A focus style must remain visible for keyboard users.",
        "ul { list-style-position: outside; }\na:hover { text-decoration: underline; }\na:focus { outline: 2px solid currentColor; }",
        "Hover is not a substitute for focus.",
      ],
      [
        "Background images",
        "background-size: cover fills the box and may crop the image. contain keeps the whole image visible and may leave empty space. Pair either choice with a deliberate position and repeat value.",
        ".hero {\n  background-size: cover;\n  background-position: center;\n  background-repeat: no-repeat;\n}",
        "Cover fills. Contain preserves the whole image.",
      ],
      [
        "Borders, gradients and contrast",
        "Border shorthand follows width, style and color. Linear gradients travel along a direction; radial gradients radiate from a center. Check normal text at 4.5:1 contrast and large text at 3:1.",
        ".card { border: 1px solid #738078; border-radius: 12px; }\n.banner { background-image: linear-gradient(to right, navy, skyblue); }",
        "A decorative gradient still needs readable text on top.",
      ],
    ],
  },
  {
    number: "03",
    title: "Design Fundamentals",
    deck: "Turn CSS decisions into interfaces with hierarchy, balance, white space and user-centered intent.",
    objectives: [
      "Recognize hierarchy, contrast and balance.",
      "Connect interface patterns to user needs.",
      "Use prototypes and testing to reduce guesswork.",
    ],
    before: "Know basic layout and typography properties.",
    lessons: [
      [
        "Hierarchy and composition",
        "Hierarchy answers what users should notice first. Composition describes how all visual elements work together. Alignment makes relationships predictable; white space gives those relationships room to breathe.",
        "Design check: What should be noticed first? What should be grouped? What can be removed?",
        "Hierarchy is attention order, not just bigger text.",
      ],
      [
        "UI, UX and requirements",
        "UI is the visible interactive interface. UX is the overall experience. A design brief records goals, constraints and requirements so a polished screen still solves the right problem.",
        "Requirement: A learner can reach the next case without losing their progress.",
        "A beautiful interface that misses a user requirement is still a failed design.",
      ],
      [
        "Patterns and research",
        "Cards should stay focused, breadcrumbs show location, progress indicators show position in a flow, and progressive disclosure reveals complexity when it is needed. Use user research, testing and A/B comparisons to validate assumptions.",
        "Test one task: Can a first-time user find the next action without explanation?",
        "Prefer evidence from user behavior over personal preference.",
      ],
    ],
  },
  {
    number: "04",
    title: "Relative and Absolute Units",
    deck: "Choose units that respond to the right reference: the viewport, the root, the parent or the current font context.",
    objectives: [
      "Distinguish absolute and relative units.",
      "Predict em versus rem sizing.",
      "Use percentages and calc without overflow.",
    ],
    before: "Know width, height and font-size.",
    lessons: [
      [
        "Absolute units",
        "px is the screen unit you will use most often. Physical units such as in, cm, mm, pt and pc are more common in print-oriented CSS and are still defined through CSS reference pixels.",
        ".print-label { font-size: 12pt; }\n.screen-control { min-height: 44px; }",
        "Use px when a screen measurement needs a predictable reference.",
      ],
      [
        "Relative units",
        "Percentages usually refer to a parent dimension. em depends on the local font-size context and can compound. rem refers to the root html font size. vh and vw refer to viewport height and width.",
        "html { font-size: 16px; }\n.card p { font-size: 1.25em; }\n.title { font-size: 2rem; }",
        "em is contextual; rem is root-relative.",
      ],
      [
        "calc and fluid sizing",
        "calc() combines values and units. Keep spaces around + and - so the expression parses reliably. Combine a fluid value with min-width or max-width when the design needs guardrails.",
        ".main { width: calc(100% - 40px); max-width: 900px; }",
        "A formula is useful only when its smallest and largest results are still usable.",
      ],
    ],
  },
  {
    number: "05",
    title: "Pseudo-classes and Pseudo-elements",
    deck: "Style states, structural positions and generated parts without changing the HTML for every visual detail.",
    objectives: [
      "Separate state selectors from generated content.",
      "Use structural and functional pseudo-classes.",
      "Avoid confusing child position with element type.",
    ],
    before: "Know class selectors and basic form controls.",
    lessons: [
      [
        "Interaction and input states",
        "Pseudo-classes describe conditions: hover, focus, focus-within, checked, valid, invalid, disabled and required. They let CSS respond to user action and form state.",
        ".form-group:focus-within { border-color: royalblue; }\ninput:invalid { border-color: crimson; }",
        "Focus-within matches the group when the group or one of its descendants has focus.",
      ],
      [
        "Structural selectors",
        "first-child and nth-child count all siblings. first-of-type and nth-of-type count only siblings of the same element type. :target matches the element named by the URL fragment.",
        "li:nth-child(odd) { background: #f5f5f5; }\np:first-of-type { margin-top: 0; }",
        "Ask whether you mean the nth child or the nth element of this type.",
      ],
      [
        "Functional selectors and pseudo-elements",
        ":is() groups selectors, :where() groups with zero specificity, :has() reacts to related content, and :not() excludes a match. ::before and ::after create generated parts and need content when used visibly.",
        ".required::after { content: ' *'; }\narticle:has(h2) { border: 1px solid; }",
        ":hover is a state. ::before is a generated part.",
      ],
    ],
  },
  {
    number: "06",
    title: "CSS Colors",
    deck: "Use color systems, transparency, shadows and gradients to create hierarchy without sacrificing readability.",
    objectives: [
      "Choose a useful color format.",
      "Layer shadows and gradients intentionally.",
      "Preserve contrast when colors change.",
    ],
    before: "Know background, border and color properties.",
    lessons: [
      [
        "Color systems",
        "Named colors are quick but limited. Hex expresses RGB in base 16; rgb and rgba separate channels and transparency; HSL expresses hue, saturation and lightness for easier adjustments.",
        ".badge { background: hsl(160 40% 28%); color: rgb(255 255 255); }",
        "Use a format that makes the next change easy to reason about.",
      ],
      [
        "Shadows",
        "Remember box-shadow as X, Y, blur, spread, color. Positive X moves right and positive Y moves down. Multiple shadows are comma-separated and layered front to back; inset puts the shadow inside.",
        "box-shadow: 0 4px 12px 0 rgba(0, 0, 0, .2);\nbox-shadow: inset 0 0 8px #999;",
        "Blur softens. Spread expands or contracts.",
      ],
      [
        "Gradients and transparency",
        "Linear gradients move along a line; radial gradients radiate from a point. Transparent colors reveal layers beneath, so inspect the final combined contrast rather than one color in isolation.",
        "background: linear-gradient(to right, #173d2c, #9fc5ad);",
        "A transparent overlay changes the color users actually perceive.",
      ],
    ],
  },
  {
    number: "07",
    title: "Styling Forms",
    deck: "Make controls readable, focusable and state-aware while respecting native behavior where it helps users.",
    objectives: [
      "Style focus without hiding it.",
      "Rebuild states after removing native appearance.",
      "Test special controls across browsers.",
    ],
    before: "Know labels, inputs and basic pseudo-classes.",
    lessons: [
      [
        "Accessible input styling",
        "Use readable text, enough contrast and a clearly visible focus indicator. Never remove an outline without replacing it with an equally obvious state.",
        "input:focus { outline: 3px solid royalblue; outline-offset: 2px; }",
        "A focus state is part of the interface, not decoration.",
      ],
      [
        "appearance none",
        "appearance: none removes much of the browser's native control styling; it does not create a custom control for you. Recreate checked, disabled, focus and error states deliberately.",
        "input[type='checkbox'] { appearance: none; }\ninput:checked { background: seagreen; }",
        "If you remove the native state, you own every replacement state.",
      ],
      [
        "Special inputs and labels",
        "datetime-local and color controls rely on browser-specific UI. Test them in multiple browsers. A visible placeholder is not a replacement for a properly associated label.",
        "<label for='start-date'>Start date</label>\n<input id='start-date' type='datetime-local'>",
        "Labels explain controls and expand their usable click target.",
      ],
    ],
  },
  {
    number: "08",
    title: "Layouts and Effects",
    deck: "Control overflow, transforms, box sizing, resets, visibility and filters without creating hidden layout problems.",
    objectives: [
      "Diagnose overflow in both axes.",
      "Predict the box model.",
      "Use effects without breaking access or interaction.",
    ],
    before: "Know width, padding, border and display.",
    lessons: [
      [
        "Overflow",
        "overflow controls content larger than its box. Use hidden to clip, auto to add scrolling when needed, or two values for x and y. Check whether the content should wrap, shrink or scroll before clipping it.",
        ".panel { overflow-x: auto; overflow-y: hidden; }",
        "Hiding overflow can hide the symptom while trapping real content.",
      ],
      [
        "Transforms and filters",
        "Transforms move, resize, rotate or skew the visual box without changing normal flow. Filters change appearance, such as grayscale or blur. Visually moving content off-screen does not necessarily hide it from assistive technology.",
        ".card:hover { transform: translateY(-4px) scale(1.02); }\nimg { filter: grayscale(100%); }",
        "Visual movement and semantic visibility are different concerns.",
      ],
      [
        "Box model, resets and visibility",
        "The box model runs content, padding, border, margin from inside to outside. border-box includes padding and border in the declared size. Reset or normalize defaults when predictable starting styles matter.",
        "*, *::before, *::after { box-sizing: border-box; }",
        "Margin is outside; it can collapse vertically with adjacent margins.",
      ],
    ],
  },
  {
    number: "09",
    title: "CSS Flexbox",
    deck: "Understand one-dimensional layout through axes, direction, wrapping and alignment, then apply the model in a live control room.",
    objectives: [
      "Identify main and cross axes.",
      "Control direction, wrapping and distribution.",
      "Diagnose an alignment or sizing failure.",
    ],
    before: "Know basic declarations, selectors, width and height.",
    lessons: [
      [
        "Main and cross axes",
        "A flex container has a main axis and a perpendicular cross axis. flex-direction chooses the main axis; the cross axis runs across it.",
        ".container { display: flex; }",
        "The main axis is not always horizontal.",
      ],
      [
        "Direction and wrapping",
        "row and row-reverse create a horizontal main axis; column and column-reverse create a vertical one. nowrap keeps one line; wrap permits additional lines; wrap-reverse reverses cross-axis stacking.",
        "flex-flow: row wrap;",
        "Changing direction changes what justify-content means.",
      ],
      [
        "Distribution and centering",
        "justify-content follows the main axis. align-items works on the cross axis. To center a row in both directions, the container needs available space plus center on both properties.",
        ".container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}",
        "JUSTIFY follows MAIN. ALIGN-ITEMS crosses it.",
      ],
    ],
    lab: true,
  },
  {
    number: "10",
    title: "CSS Typography",
    deck: "Choose type families, spacing and effects that support hierarchy, readability and graceful fallback.",
    objectives: [
      "Use type vocabulary accurately.",
      "Build resilient font stacks.",
      "Control line height, shadows and loading.",
    ],
    before: "Know color, spacing and basic text properties.",
    lessons: [
      [
        "Type anatomy",
        "A typeface is a design family; a font is a specific variation or file. Baseline, cap height, x-height, ascenders and descenders describe how letterforms occupy space.",
        "Typography checklist: family, size, weight, line-height, width and contrast.",
        "Kerning is pair spacing; tracking is spacing across a range; leading is line spacing.",
      ],
      [
        "Families and fallbacks",
        "font-family lists preferences in order and should end with a generic family. Serif, sans-serif and monospace communicate different visual structures.",
        "body { font-family: 'Roboto', Arial, sans-serif; }",
        "A fallback is part of the design, not an afterthought.",
      ],
      [
        "Web fonts and text shadows",
        "@font-face registers a hosted font; WOFF2 is a common preferred format. font-display: swap helps text appear while the font loads. Text shadows use offset-x, offset-y, blur and color; they have no spread value.",
        "@font-face { font-family: 'SiteFont'; src: url('fonts/site.woff2') format('woff2'); font-display: swap; }",
        "Keep type readable before and after the custom font loads.",
      ],
    ],
  },
  {
    number: "11",
    title: "CSS Accessibility",
    deck: "Keep meaningful structure, contrast, focus, hiding behavior and motion preferences aligned with assistive technology.",
    objectives: [
      "Separate visual hiding from semantic hiding.",
      "Preserve contrast and focus.",
      "Respect reduced-motion preferences.",
    ],
    before: "Know pseudo-classes, media queries and basic HTML semantics.",
    lessons: [
      [
        "Contrast and the accessibility tree",
        "The accessibility tree exposes meaningful structure and controls to assistive technology. Do not communicate meaning through color alone. Normal text needs 4.5:1 contrast and large text 3:1 under WCAG AA targets.",
        "Pair a status color with a word, icon or shape that carries the same meaning.",
        "If color disappears, the message should still survive.",
      ],
      [
        "Hiding content",
        "display: none and the hidden attribute usually remove content from layout and the accessibility tree. visibility: hidden preserves space but normally hides content from assistive technology. aria-hidden hides from assistive technology but not necessarily visually and must not be applied to focusable controls.",
        ".sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }",
        "Visual hiding and semantic hiding are different jobs.",
      ],
      [
        "Motion and labels",
        "Use prefers-reduced-motion to remove unnecessary animation. A placeholder cannot replace a visible, associated label. Essential information should never depend only on animation.",
        "@media (prefers-reduced-motion: reduce) { .card { animation: none; } }",
        "Reduce motion; do not reduce meaning.",
      ],
    ],
  },
  {
    number: "12",
    title: "CSS Positioning",
    deck: "Place elements intentionally with flow, offsets, stacking contexts, floats and sticky behavior.",
    objectives: [
      "Distinguish all five position values.",
      "Anchor absolute elements correctly.",
      "Reason about stacking contexts.",
    ],
    before: "Know normal flow and basic layout.",
    lessons: [
      [
        "Floats and flow-root",
        "float moves an element to a side so inline content can wrap around it. Modern layout usually prefers Flexbox or Grid. display: flow-root contains floats inside their parent.",
        ".container { display: flow-root; }\n.photo { float: left; margin-right: 1rem; }",
        "Choose floats for text wrapping, not as a default page layout system.",
      ],
      [
        "The five position values",
        "static is normal flow. relative keeps its space but accepts visual offsets. absolute leaves flow and uses the nearest positioned ancestor. fixed uses the viewport. sticky stays in flow until it reaches its inset threshold.",
        ".card { position: relative; }\n.card .badge { position: absolute; top: 8px; right: 8px; }",
        "Absolute positioning needs a containing block you can name.",
      ],
      [
        "Stacking and z-index",
        "z-index influences stacking for positioned elements and some layout items. A large z-index cannot escape an ancestor stacking context, so inspect the context hierarchy when a layer appears behind another.",
        ".modal { position: fixed; inset: 0; z-index: 100; }",
        "Z-index is a comparison inside stacking contexts, not a universal score.",
      ],
    ],
  },
  {
    number: "13",
    title: "CSS Attribute Selectors",
    deck: "Match links, language tags, data attributes and semantic states directly from HTML attributes.",
    objectives: [
      "Choose the correct attribute operator.",
      "Distinguish exact, word and substring matches.",
      "Use data and language attributes intentionally.",
    ],
    before: "Know element, class and ID selectors.",
    lessons: [
      [
        "Matching operators",
        "[attr] matches presence; [attr='value'] matches exact text; ~= matches a complete space-separated word; ^= starts with; $= ends with; *= matches a substring; |= matches an exact language token or its hyphenated form.",
        "a[href^='https://'] { color: seagreen; }\na[href$='.pdf'] { color: darkred; }",
        "~= is a whole word. *= is any substring.",
      ],
      [
        "Language and data attributes",
        "lang communicates content language. data-* stores application-specific values that CSS can match for styling or state cues. Keep behavior in JavaScript when the attribute changes behavior rather than appearance.",
        "[lang|='en'] { font-style: italic; }\n[data-state='current'] { font-weight: 700; }",
        "Attributes can describe state; they do not replace semantic HTML.",
      ],
      [
        "Attribute selectors in practice",
        "Combine attributes with classes and pseudo-classes to target a precise set without adding extra classes everywhere. Keep selectors understandable so future content still matches intentionally.",
        "button[aria-pressed='true'] { background: seagreen; }",
        "Start with the attribute relationship, then add a class only when the visual role needs it.",
      ],
    ],
  },
  {
    number: "14",
    title: "Responsive Web Design",
    deck: "Let content adapt to available space through fluid sizing, media queries, breakpoints and user preferences.",
    objectives: [
      "Build fluid foundations.",
      "Use content-driven breakpoints.",
      "Respect orientation and preference features.",
    ],
    before: "Know units, media queries and basic layout.",
    lessons: [
      [
        "Responsive foundations",
        "Responsive design adapts to available space and capabilities. Use flexible layouts, flexible images and content-driven rules instead of targeting a list of device names.",
        "img { max-width: 100%; height: auto; }\n.container { width: min(90%, 70rem); margin-inline: auto; }",
        "Make the content fluid before adding a breakpoint.",
      ],
      [
        "Media queries",
        "Media queries can test width, orientation, aspect ratio, resolution, hover, color scheme and reduced motion. A mobile-first min-width query adds capability as space grows.",
        "@media (min-width: 768px) { .cards { grid-template-columns: repeat(2, 1fr); } }",
        "A breakpoint should mark a layout change, not a device label.",
      ],
      [
        "Preferences and testing",
        "Use prefers-color-scheme and prefers-reduced-motion when the interface can adapt. Test narrow, wide, zoomed and touch contexts; inspect where text wraps and controls remain reachable.",
        "@media (prefers-color-scheme: dark) { body { background: #17221c; } }",
        "Responsive means usable at the edges, not just attractive at one width.",
      ],
    ],
  },
  {
    number: "15",
    title: "CSS Grid",
    deck: "Use a two-dimensional layout model for tracks, gaps, areas, placement and responsive galleries.",
    objectives: [
      "Define rows and columns.",
      "Place items with lines and areas.",
      "Build responsive tracks with minmax and auto-fit.",
    ],
    before: "Know Flexbox and basic sizing.",
    lessons: [
      [
        "Grid tracks and gaps",
        "Grid defines columns and rows together. gap adds space between tracks. grid-template-columns establishes the column structure; auto rows can use minmax for a lower bound and flexible growth.",
        ".layout { display: grid; grid-template-columns: 240px 1fr; gap: 24px; }",
        "Grid is two-dimensional; Flexbox is primarily one-dimensional.",
      ],
      [
        "Placement and areas",
        "grid-column and grid-row use start/end grid lines. 1 / -1 spans all explicit columns. Named grid areas make page regions easier to read and rearrange.",
        ".banner { grid-column: 1 / -1; }\n.layout { grid-template-areas: 'header header' 'sidebar main'; }",
        "Place the layout first; let content fill its named area.",
      ],
      [
        "Responsive galleries",
        "auto-fit and minmax let the browser choose how many tracks fit. Use min() inside a minimum when a card must not exceed the small viewport.",
        ".gallery { grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); }",
        "The minimum track size is the key to preventing narrow overflow.",
      ],
    ],
  },
  {
    number: "16",
    title: "CSS Animations",
    deck: "Define motion in stages, tune timing and repetition, and give users control over nonessential movement.",
    objectives: [
      "Connect keyframes to an element.",
      "Read animation shorthand.",
      "Respect reduced-motion preferences.",
    ],
    before: "Know transforms, transitions and media queries.",
    lessons: [
      [
        "Keyframes and properties",
        "@keyframes defines stages. animation-name connects the element to them; duration controls length; timing-function controls pacing. Delay, iteration count, direction, fill mode and play state refine behavior.",
        "@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }",
        "A keyframe name is only a definition until an animation uses it.",
      ],
      [
        "Transitions versus animations",
        "Transitions interpolate between state changes such as :hover. Keyframe animations can run independently and contain multiple stages. Prefer opacity and transform for smooth movement.",
        ".button { transition: transform 200ms ease; }\n.button:hover { transform: translateY(-2px); }",
        "Transitions respond to a change; animations can have their own timeline.",
      ],
      [
        "Accessible motion",
        "Respect prefers-reduced-motion and keep essential information available without animation. Disable nonessential animation and transitions for users who request less motion.",
        "@media (prefers-reduced-motion: reduce) {\n  .card { animation: none; }\n  .button { transition: none; }\n}",
        "Reduced motion is a user preference, not a design failure.",
      ],
    ],
  },
];

const lessonExtensions = {
  "01": [
    [
      "Open DevTools and identify the viewport meta tag, the author stylesheet and one browser-default rule before changing any CSS.",
      "A missing viewport setting can look like a layout bug on mobile; verify the document setup first.",
      "Can you name which rule supplies the unexpected spacing?",
    ],
    [
      "Build two inline-block badges and compare margin outside the border with padding inside it in the box model panel.",
      "Width and height do not behave the same way on inline elements as they do on block or inline-block elements.",
      "Can you point to the space that belongs to the element versus its neighbor?",
    ],
    [
      "Write one selector using >, one using + and one using ~, then inspect which elements each actually matches.",
      "Specificity does not automatically mean intent; a selector that is too broad can win while styling the wrong relationship.",
      "Can you explain why the winning declaration beats the losing one?",
    ],
  ],
  "02": [
    [
      "Style a link through :link, :hover and :focus, then navigate to it with a keyboard instead of a mouse.",
      "A hover-only treatment disappears for keyboard and touch users; focus needs its own visible state.",
      "Can you find the focus rule without inspecting the pointer state?",
    ],
    [
      "Toggle a hero between contain and cover at two aspect ratios and record what is preserved versus what is cropped.",
      "Choosing cover only because it fills the box can crop the subject; pair it with a deliberate position.",
      "Which part of the image is allowed to disappear?",
    ],
    [
      "Build a card with border shorthand and a gradient, then check the text against both the light and dark ends of the gradient.",
      "A border without a style remains invisible, and a decorative gradient can create a contrast failure.",
      "Can you state the border shorthand order from memory?",
    ],
  ],
  "03": [
    [
      "Reduce a dashboard to three regions and rank them: first glance, supporting evidence and next action.",
      "Hierarchy is not the same as making everything larger; too many competing signals remove the first step.",
      "What should a new user notice before reading every detail?",
    ],
    [
      "Turn a vague screen request into one requirement with a user, task and success condition.",
      "A polished interface can still fail if it solves a visual preference instead of the actual user requirement.",
      "Can you test the requirement without asking the user what they think?",
    ],
    [
      "Choose one task and observe whether a first-time user finds the next action without explanation.",
      "Personal preference is not research; record behavior, hesitation and errors instead of defending a favorite pattern.",
      "What evidence would change your design decision?",
    ],
  ],
  "04": [
    [
      "Measure a fixed control in px and compare it with a content surface capped by max-width.",
      "Physical units rarely mean a literal physical measurement on screens; use the CSS reference model.",
      "Which dimension must stay predictable here?",
    ],
    [
      "Set a parent font size, then compare 1em, 1rem, 100% and 50vw while changing the viewport.",
      "Nested em values compound through ancestors; rem stays tied to the root size.",
      "What reference does each unit use in this example?",
    ],
    [
      "Resize a calc() surface from 320px to a wide desktop and write down its smallest and largest usable result.",
      "A formula can be mathematically valid and still create unreadable line lengths or overflow.",
      "What guardrail keeps the formula usable at both extremes?",
    ],
  ],
  "05": [
    [
      "Tab through a form and compare :focus, :focus-within, :invalid and :disabled states without changing the HTML.",
      "A state selector describes a condition; it does not create a semantic label or error message.",
      "Which element receives focus, and which parent reacts to focus-within?",
    ],
    [
      "Create a mixed list with headings and rows, then compare nth-child(2) with nth-of-type(2).",
      "The two selectors count different sibling sets, so a visually similar result can target a different element.",
      "What exactly is being counted?",
    ],
    [
      "Add a required marker with ::after and inspect the generated content while keeping the source label unchanged.",
      "Generated content should not carry essential information alone because it can be hidden or unavailable in some contexts.",
      "What remains if the pseudo-element is removed?",
    ],
  ],
  "06": [
    [
      "Convert one color between hex, rgb and HSL, then change only lightness to preserve the hue.",
      "A format that is easy to write is not always the format that is easiest to tune.",
      "Which channel would you change to make the color lighter?",
    ],
    [
      "Layer two box-shadows and change X, Y, blur and spread one at a time while watching the card edge.",
      "Large blur and dark color can flatten a page hierarchy instead of creating quiet separation.",
      "Which component controls direction and which softens the edge?",
    ],
    [
      "Place a translucent panel over a gradient and inspect the final perceived color, not just the declared overlay.",
      "Transparency changes the combined result; test the text against what users actually see.",
      "Which layer is contributing to the final contrast?",
    ],
  ],
  "07": [
    [
      "Style a button's focus state, then reach it with Tab and verify the ring remains visible on both light and dark surfaces.",
      "Removing outline without replacing it creates a navigation failure, not a visual improvement.",
      "Can you locate focus with your eyes alone?",
    ],
    [
      "Set appearance: none on a checkbox and list the checked, unchecked, disabled and focus states you must rebuild.",
      "Native styling contains behavior cues you may not notice until you remove it.",
      "Which state is still missing from your custom control?",
    ],
    [
      "Associate a visible label with a datetime-local control and test clicking the label as well as the input.",
      "A placeholder disappears and cannot replace the persistent explanation supplied by a label.",
      "Does the label enlarge the usable target and name the control?",
    ],
  ],
  "08": [
    [
      "Make one child wider than its card and decide whether it should wrap, scroll or clip before writing overflow.",
      "Hidden overflow can conceal meaningful content and create a false sense that the bug is fixed.",
      "Is the overflowing content decorative or essential?",
    ],
    [
      "Give a card width, padding and border, then toggle content-box and border-box while measuring the outer edge.",
      "The declared width is not always the rendered width; include padding and border in your reasoning.",
      "Which box is the design specification describing?",
    ],
    [
      "Apply translateY on hover and compare it with margin-top; observe whether neighboring content moves.",
      "A transform changes pixels while normal flow stays put; that can affect hit testing and overlap decisions.",
      "Did the layout move, or only the painted surface?",
    ],
  ],
  "09": [
    [
      "Draw the main and cross axes for row, row-reverse, column and column-reverse before changing alignment values.",
      "Assuming the main axis is horizontal produces correct-looking answers only for one direction.",
      "Which axis does justify-content follow in this direction?",
    ],
    [
      "Shrink a flex container until items need a second line, then compare nowrap, wrap and wrap-reverse.",
      "Wrapping changes the cross-axis arrangement and available space; it is not simply a smaller row.",
      "Where does the next line begin?",
    ],
    [
      "Center a row with justify-content and align-items, then remove the container height and see why vertical centering changes.",
      "Alignment needs available space; a container with no extra space cannot visibly distribute it.",
      "Where is the free space being distributed?",
    ],
  ],
  10: [
    [
      "Create a heading with the same size as its label, then change only weight and compare the reading order.",
      "Weight is one hierarchy signal; relying on weight alone can fail when the typeface has a narrow range.",
      "Which signal makes the title lead first?",
    ],
    [
      "Break the first font in a stack deliberately and verify that the fallback keeps the same role and readable metrics.",
      "A fallback with a different category can change wrapping and hierarchy even when the text still loads.",
      "Does the fallback preserve the intended voice?",
    ],
    [
      "Compare line-height and letter-spacing on a paragraph, then load a fallback family and check wrapping again.",
      "Line-height is vertical rhythm; tracking changes horizontal spacing and neither should be tuned in isolation.",
      "Which property controls the space between lines?",
    ],
  ],
  11: [
    [
      "Navigate a link and button with Tab only, then check whether the focus indicator survives every reset rule.",
      "A visible focus ring is part of the interaction contract, not optional decoration.",
      "Can a keyboard user always identify the active control?",
    ],
    [
      "Compare hidden, display:none, visibility:hidden and an sr-only pattern with both sighted and assistive-technology intent in mind.",
      "Visual hiding and semantic hiding solve different problems; aria-hidden must not hide a focusable control.",
      "Should this content disappear visually, semantically, or both?",
    ],
    [
      "Enable reduced motion in the browser and verify that the message, status and action remain available without animation.",
      "Removing motion must not remove the information the motion used to communicate.",
      "What meaning remains when the animation is disabled?",
    ],
  ],
  12: [
    [
      "Place a float beside text and contain it with flow-root, then compare the same composition using Grid or Flexbox.",
      "Floats are useful for text wrapping but become fragile when treated as a general page-layout system.",
      "Which layout model best matches the relationship?",
    ],
    [
      "Test static, relative, absolute, fixed and sticky on the same badge and record whether space is preserved.",
      "Position values differ in both flow participation and containing block, not only in where the pixels appear.",
      "Who owns the coordinate system?",
    ],
    [
      "Create two positioned layers inside separate ancestors and change z-index values while inspecting stacking contexts.",
      "A huge z-index cannot escape an ancestor stacking context with a lower place in the overall stack.",
      "Which context is being compared?",
    ],
  ],
  13: [
    [
      "Match links by presence, exact value, word, prefix, suffix and substring using a small set of test anchors.",
      "Substring matching is broad; it can style unintended values when the attribute contract is not precise.",
      "Which operator expresses the exact relationship you need?",
    ],
    [
      "Use lang and data-state attributes to style a note and current navigation item, then change the attribute values.",
      "Attributes can describe state for styling, but they should not replace semantic structure or behavior.",
      "Is the attribute describing appearance, meaning or behavior?",
    ],
    [
      "Combine an attribute selector with a class and pseudo-class, then remove one condition and inspect the match set.",
      "A selector that is technically precise can still be too difficult for the next author to maintain.",
      "Can you explain every part of the selector in plain language?",
    ],
  ],
  14: [
    [
      "Start with a fluid image and container, then test at a narrow width before adding any media query.",
      "A breakpoint cannot rescue a foundation that already overflows because of fixed dimensions.",
      "What can flex or shrink before a breakpoint is needed?",
    ],
    [
      "Resize until the content—not a device name—requires a layout change, then add a min-width query at that point.",
      "Breakpoints should mark a content failure or opportunity, not imitate a catalog of phones.",
      "What visibly changes at this threshold?",
    ],
    [
      "Test narrow, wide, zoomed, touch, dark-mode and reduced-motion contexts and record the first failure in each.",
      "Responsive behavior includes capability and preference, not only viewport width.",
      "Which user condition changes the interface here?",
    ],
  ],
  15: [
    [
      "Define two columns and two rows, then add gap and inspect the grid lines before placing any item.",
      "Grid tracks and gaps are separate decisions; confusing gap with track size makes measurements drift.",
      "Which lines bound the item?",
    ],
    [
      "Place a banner with line numbers, then rewrite the same layout using named grid areas and compare readability.",
      "Placement is clearer when the layout structure is named before individual items receive overrides.",
      "Can you describe the layout without looking at the item content?",
    ],
    [
      "Resize an auto-fit gallery and lower the minmax minimum until the cards become too narrow to read.",
      "A responsive gallery still needs a minimum that protects content and prevents horizontal overflow.",
      "What is the smallest usable track?",
    ],
  ],
  16: [
    [
      "Define keyframes, connect them with animation-name and change duration, iteration and fill mode one at a time.",
      "A keyframe definition does nothing until an element uses it, and an animation can end in an unexpected state without fill mode.",
      "Which declaration connects the timeline to the element?",
    ],
    [
      "Build the same hover response once with transition and once with keyframes, then compare what starts the motion.",
      "Transitions need a state change; animations can run on their own timeline.",
      "What event or timeline starts this movement?",
    ],
    [
      "Turn on prefers-reduced-motion and confirm that essential information, focus and action labels remain without movement.",
      "Reduced motion should remove nonessential movement, not remove status, feedback or meaning.",
      "What does the user still need to understand without animation?",
    ],
  ],
};

const chapterReviews = {
  "01": [
    [
      "Which selector targets a direct child?",
      ["A space descendant selector", ">", "+ immediate sibling"],
      1,
      "The > combinator matches only direct children.",
    ],
    [
      "Which property adds space inside a border?",
      ["margin", "padding", "outline"],
      1,
      "Padding protects content inside the border.",
    ],
    [
      "What should you compare when rules conflict?",
      [
        "Only the last line",
        "Specificity and source order",
        "Only the class name",
      ],
      1,
      "After importance and origin, compare specificity and then source order.",
    ],
  ],
  "02": [
    [
      "Which background size fills the box?",
      ["contain", "cover", "repeat"],
      1,
      "cover fills the box and may crop the image.",
    ],
    [
      "Which state must complement hover?",
      ["focus", "visited only", "loading"],
      0,
      "Keyboard users need a visible focus state.",
    ],
    [
      "What completes a visible border?",
      ["width only", "style", "radius only"],
      1,
      "A border needs width, style and color.",
    ],
  ],
  "03": [
    [
      "What does hierarchy establish?",
      ["Attention order", "Only font size", "HTML validity"],
      0,
      "Hierarchy tells users what to notice first.",
    ],
    [
      "What should a design requirement include?",
      [
        "A user task and success condition",
        "Only a color",
        "A favorite pattern",
      ],
      0,
      "Requirements connect the interface to a user outcome.",
    ],
    [
      "What is stronger than personal preference?",
      ["Observed behavior", "More decoration", "A longer title"],
      0,
      "Research and testing provide evidence for design decisions.",
    ],
  ],
  "04": [
    [
      "What does rem reference?",
      ["The root font size", "The nearest parent", "The viewport height"],
      0,
      "rem is relative to the root html font size.",
    ],
    [
      "What does em depend on?",
      ["Local font context", "Only the viewport", "The border width"],
      0,
      "em can compound through local font-size contexts.",
    ],
    [
      "Why use max-width with calc()?",
      [
        "To add a usable guardrail",
        "To disable fluid sizing",
        "To change HTML",
      ],
      0,
      "A fluid formula still needs usable limits.",
    ],
  ],
  "05": [
    [
      "What does :focus describe?",
      ["An interaction state", "Generated content", "A file type"],
      0,
      ":focus matches a focused element.",
    ],
    [
      "What does :nth-of-type count?",
      ["Matching element types", "All attributes", "Only classes"],
      0,
      "It counts siblings of the same element type.",
    ],
    [
      "What do ::before and ::after create?",
      ["Generated parts", "New semantic controls", "A new document"],
      0,
      "Pseudo-elements create visual generated content.",
    ],
  ],
  "06": [
    [
      "What does alpha control?",
      ["Transparency", "Font weight", "Grid tracks"],
      0,
      "Alpha controls how much of a layer shows through.",
    ],
    [
      "Which box-shadow value moves down?",
      ["Positive Y", "Negative X", "Blur only"],
      0,
      "Positive Y moves the shadow downward.",
    ],
    [
      "What should contrast testing inspect?",
      [
        "The final color pair",
        "The hex string alone",
        "Only the gradient angle",
      ],
      0,
      "Users perceive the combined foreground and background.",
    ],
  ],
  "07": [
    [
      "What should replace a removed outline?",
      ["An equally visible focus state", "Nothing", "A placeholder"],
      0,
      "Removing native focus requires an obvious replacement.",
    ],
    [
      "What does appearance:none do?",
      ["Removes native styling", "Creates every state", "Adds a label"],
      0,
      "It removes browser styling but does not build the control.",
    ],
    [
      "What should name an input?",
      ["A visible associated label", "Only a placeholder", "A border"],
      0,
      "Labels provide persistent context and a larger target.",
    ],
  ],
  "08": [
    [
      "What should happen before hiding overflow?",
      [
        "Decide whether content is essential",
        "Always clip it",
        "Remove the parent",
      ],
      0,
      "Clipping meaningful content can hide the actual solution.",
    ],
    [
      "What does border-box include?",
      ["Content, padding and border", "Only content", "Only margin"],
      0,
      "border-box keeps padding and border inside the declared size.",
    ],
    [
      "Do transforms change normal flow?",
      ["No", "Always", "Only with filters"],
      0,
      "Transforms move painted pixels without rewriting flow.",
    ],
  ],
  10: [
    [
      "What does line-height control?",
      ["Vertical rhythm", "File loading", "Selector specificity"],
      0,
      "Line-height controls distance between lines.",
    ],
    [
      "What should a font stack include last?",
      ["A generic family", "A color", "A media query"],
      0,
      "A generic fallback keeps the role predictable.",
    ],
    [
      "What does font-display:swap support?",
      [
        "Readable text while a font loads",
        "Grid placement",
        "Focus management",
      ],
      0,
      "swap allows fallback text to appear during loading.",
    ],
  ],
  11: [
    [
      "What does display:none usually do?",
      [
        "Remove layout and accessibility exposure",
        "Only change color",
        "Add focus",
      ],
      0,
      "display:none normally removes the content from layout and the accessibility tree.",
    ],
    [
      "What must survive color removal?",
      ["Meaning", "Only decoration", "The gradient"],
      0,
      "Meaning should not depend on color alone.",
    ],
    [
      "What does reduced motion remove?",
      ["Nonessential movement", "Essential labels", "Keyboard access"],
      0,
      "Respect the preference without reducing meaning.",
    ],
  ],
  12: [
    [
      "Which position stays in normal flow with offsets?",
      ["relative", "absolute", "fixed"],
      0,
      "relative keeps its space while accepting offsets.",
    ],
    [
      "What does absolute positioning need?",
      ["A containing block", "A new HTML file", "A flex direction"],
      0,
      "The nearest positioned ancestor supplies the containing block.",
    ],
    [
      "What limits z-index?",
      ["Stacking contexts", "Font family", "Line-height"],
      0,
      "z-index comparisons happen inside stacking contexts.",
    ],
  ],
  13: [
    [
      "What does ^= match?",
      ["The beginning of a value", "The end", "A whole word"],
      0,
      "^= matches an attribute value prefix.",
    ],
    [
      "What does $= help identify?",
      ["File endings", "Parent elements", "Focus state"],
      0,
      "$= matches the end of an attribute value.",
    ],
    [
      "What does lang communicate?",
      ["Content language", "Animation speed", "Grid size"],
      0,
      "lang describes the language variant of content.",
    ],
  ],
  14: [
    [
      "What should come before a breakpoint?",
      ["A fluid foundation", "A device list", "A fixed width"],
      0,
      "Make the content fluid before adding breakpoint rules.",
    ],
    [
      "What should choose a breakpoint?",
      ["A content change", "A phone brand", "A random round number"],
      0,
      "Breakpoints should respond to the layout's needs.",
    ],
    [
      "Which preference can CSS respect?",
      ["prefers-reduced-motion", "prefers-more-clicks", "prefers-fixed-width"],
      0,
      "The reduced-motion preference should disable nonessential movement.",
    ],
  ],
  15: [
    [
      "What is Grid primarily?",
      ["Two-dimensional", "Only inline", "Only typographic"],
      0,
      "Grid controls rows and columns together.",
    ],
    [
      "What does gap add?",
      ["Space between tracks", "Space outside every card", "A new selector"],
      0,
      "gap creates consistent space between grid tracks.",
    ],
    [
      "What does 1 / -1 span?",
      ["First grid line to last", "Only the first cell", "The viewport"],
      0,
      "1 / -1 spans the explicit grid width.",
    ],
  ],
  16: [
    [
      "What connects keyframes to an element?",
      ["animation-name", "font-family", "grid-area"],
      0,
      "animation-name connects the element to a keyframe definition.",
    ],
    [
      "What starts a transition?",
      ["A state change", "A grid line", "A label"],
      0,
      "Transitions interpolate when a property changes.",
    ],
    [
      "What should reduced motion preserve?",
      ["Meaning and controls", "Infinite movement", "Only decoration"],
      0,
      "Disable nonessential motion while preserving meaning and access.",
    ],
  ],
};

const guideNav = document.querySelector("#guide-nav");
const guideSearch = document.querySelector("#guide-search");
const article = document.querySelector("#guide-article");

function escapeHTML(value) {
  return String(value).replace(
    /[&<>\"]/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char],
  );
}

function chapterId(number) {
  return number === "09" ? "flexbox" : `chapter-${number}`;
}

function renderNav(query = "") {
  const needle = query.trim().toLowerCase();
  guideNav.innerHTML = chapters
    .filter((chapter) =>
      `${chapter.number} ${chapter.title} ${chapter.deck}`
        .toLowerCase()
        .includes(needle),
    )
    .map(
      (chapter) =>
        `<a href="#${chapterId(chapter.number)}"><span>${chapter.number}</span>${chapter.title}<small>${chapter.lessons.length} lessons</small></a>`,
    )
    .join("");
}

function renderLesson(lesson, index, chapterNumber) {
  const [title, body, code, memory] = lesson;
  const extension = lessonExtensions[chapterNumber]?.[index] || [
    "Try the idea in a small isolated example before applying it to a larger interface.",
    "Watch for a rule that solves the symptom while creating a new layout or access problem.",
    "Can you explain the result before changing another declaration?",
  ];
  const sectionId = `${chapterId(chapterNumber)}-lesson-${index + 1}`;
  return `<section id="${sectionId}"><div class="lesson-heading"><p class="lesson-number">Lesson ${String(index + 1).padStart(2, "0")}</p><button class="lesson-complete-toggle" type="button" data-lesson-id="${chapterNumber}-${index + 1}" aria-pressed="false">Mark lesson complete</button></div><h2>${title}</h2><p>${body}</p>${code ? `<pre>${escapeHTML(code)}</pre>` : ""}<div class="lesson-practice"><div><strong>Try it</strong><p>${extension[0]}</p></div><div><strong>Watch for</strong><p>${extension[1]}</p></div><div><strong>Check yourself</strong><p>${extension[2]}</p></div></div><p class="memory-note"><strong>Remember:</strong> ${memory}</p></section>`;
}

function lessonProgressKey(lessonId) {
  return `css-casebook-lesson-${lessonId}`;
}

function readLessonCompletion(lessonId) {
  return localStorage.getItem(lessonProgressKey(lessonId)) === "complete";
}

function chapterCaseId(number) {
  const chapterNumber = Number(number);
  const caseNumber = chapterNumber === 9 ? 4 : (chapterNumber - 1) * 3 + 1;
  return String(caseNumber).padStart(3, "0");
}

function chapterCaseIds(number) {
  if (window.CasebookProgress?.chapterCaseIds) return window.CasebookProgress.chapterCaseIds(number);
  const first = Number(chapterCaseId(number));
  return [0, 1, 2].map((offset) => String(first + offset).padStart(3, "0"));
}

function readChapterCaseCount(number) {
  if (window.CasebookProgress?.getChapterState) return window.CasebookProgress.getChapterState(number).casesCompleted;
  return chapterCaseIds(number).filter((caseId) => {
    try {
      return JSON.parse(localStorage.getItem(`css-casebook-c${caseId}`) || "{}").completed === true;
    } catch {
      return false;
    }
  }).length;
}

function updateChapterSummary(chapter) {
  if (chapter.lab) return;
  const progress = window.CasebookProgress?.getChapterState?.(chapter.number) || {};
  const lessonsDone = progress.lessonsCompleted === chapter.lessons.length || chapter.lessons.every((_, index) => readLessonCompletion(`${chapter.number}-${index + 1}`));
  const reviewDone = progress.reviewCompleted ?? (readChapterReview(chapter.number)?.completed === true);
  const completedCases = progress.casesCompleted ?? readChapterCaseCount(chapter.number);
  const caseTotal = progress.casesTotal || chapterCaseIds(chapter.number).length;
  const caseDone = completedCases === caseTotal;
  const complete = lessonsDone && reviewDone && caseDone;
  const stamp = document.querySelector("#summary-stamp");
  const status = document.querySelector("#chapter-status-text");
  const reviewProgress = document.querySelector("#review-progress");
  const caseProgress = document.querySelector("#case-progress");
  if (stamp) {
    stamp.textContent = complete ? "Chapter closed" : "In progress";
    stamp.classList.toggle("is-complete", complete);
  }
  if (status)
    status.textContent = complete
      ? `Chapter ${chapter.number} is complete. Lessons, review and all three chapter cases are finished.`
      : `Finish the lessons, chapter review and all three chapter cases to close this chapter.`;
  if (reviewProgress)
    reviewProgress.textContent = `${reviewDone ? "✓" : "→"} Chapter review ${reviewDone ? "completed" : "pending"}`;
  if (caseProgress)
    caseProgress.textContent = `${caseDone ? "✓" : "→"} Cases ${completedCases}/${caseTotal} complete`;
  localStorage.setItem(
    `css-casebook-ch${chapter.number}-status`,
    complete ? "completed" : "in-progress",
  );
}

function updateLessonSummary(chapter) {
  const completed = chapter.lessons.filter((_, index) =>
    readLessonCompletion(`${chapter.number}-${index + 1}`),
  ).length;
  const status = document.querySelector("#lessons-status");
  if (status)
    status.textContent = `${completed === chapter.lessons.length ? "✓" : "→"} ${completed}/${chapter.lessons.length} lessons marked complete`;
  updateChapterSummary(chapter);
  window.updateFlexboxChapterProgress?.();
}

function initializeLessonProgress(chapter) {
  document.querySelectorAll(".lesson-complete-toggle").forEach((button) => {
    const lessonId = button.dataset.lessonId;
    const completed = readLessonCompletion(lessonId);
    button.setAttribute("aria-pressed", String(completed));
    button.classList.toggle("is-complete", completed);
    button.textContent = completed
      ? "Lesson complete ✓"
      : "Mark lesson complete";
    button.addEventListener("click", () => {
      const next = button.getAttribute("aria-pressed") !== "true";
      localStorage.setItem(
        lessonProgressKey(lessonId),
        next ? "complete" : "in-progress",
      );
      button.setAttribute("aria-pressed", String(next));
      button.classList.toggle("is-complete", next);
      button.textContent = next ? "Lesson complete ✓" : "Mark lesson complete";
      updateLessonSummary(chapter);
    });
  });
  updateLessonSummary(chapter);
}

function renderFlexboxLab() {
  return `<section class="control-room" id="control-room"><p class="lesson-number">Interactive lab</p><h2>Flexbox Control Room</h2><p>Change one control at a time and watch the axes, item order and generated CSS update together.</p><div class="lab-layout"><form class="lab-controls" id="flex-controls"><label>Direction<select name="direction"><option>row</option><option>row-reverse</option><option>column</option><option>column-reverse</option></select></label><label>Wrapping<select name="wrap"><option>nowrap</option><option>wrap</option><option>wrap-reverse</option></select></label><label>Justify content<select name="justify"><option>flex-start</option><option>center</option><option>flex-end</option><option>space-between</option><option>space-around</option><option>space-evenly</option></select></label><label>Align items<select name="align"><option>stretch</option><option>flex-start</option><option>center</option><option>flex-end</option></select></label><button class="secondary-button" id="lab-reset" type="button">Reset controls</button></form><div class="lab-output"><div class="lab-preview" id="lab-preview" aria-label="Live Flexbox preview"><span class="lab-axis lab-main-axis" id="lab-main-axis">Main axis →</span><span class="lab-axis lab-cross-axis" id="lab-cross-axis">Cross axis ↓</span><div class="lab-item">1</div><div class="lab-item">2</div><div class="lab-item">3</div><div class="lab-item">4</div><div class="lab-item">5</div></div><p class="lab-explanation" id="lab-explanation" aria-live="polite"></p><pre id="generated-css"></pre></div></div></section>`;
}

function renderReview() {
  return `<section class="chapter-review" id="chapter-review"><p class="lesson-number">Chapter review</p><h2>Close the Flexbox file</h2><p>Answer five questions to check whether the axis model is ready for the investigation cases.</p><form id="flexbox-review"><fieldset data-question="1"><legend><span>01</span> Which property establishes a flex formatting context?</legend><label><input type="radio" name="q1" value="a"> <code>position: flex</code></label><label><input type="radio" name="q1" value="b"> <code>display: flex</code></label><label><input type="radio" name="q1" value="c"> <code>layout: flex</code></label><p class="answer-explanation" hidden></p></fieldset><fieldset data-question="2"><legend><span>02</span> With <code>flex-direction: row</code>, which property controls vertical alignment?</legend><label><input type="radio" name="q2" value="a"> <code>align-items</code></label><label><input type="radio" name="q2" value="b"> <code>justify-content</code></label><label><input type="radio" name="q2" value="c"> <code>flex-wrap</code></label><p class="answer-explanation" hidden></p></fieldset><fieldset data-question="3"><legend><span>03</span> What changes when <code>flex-direction</code> becomes <code>column</code>?</legend><label><input type="radio" name="q3" value="a"> Flexbox becomes two-dimensional</label><label><input type="radio" name="q3" value="b"> The main axis becomes vertical</label><label><input type="radio" name="q3" value="c"> The cross axis disappears</label><p class="answer-explanation" hidden></p></fieldset><fieldset data-question="4"><legend><span>04</span> Which value allows items to move onto another flex line?</legend><label><input type="radio" name="q4" value="a"> <code>flex-wrap: wrap</code></label><label><input type="radio" name="q4" value="b"> <code>flex-flow: nowrap</code></label><label><input type="radio" name="q4" value="c"> <code>align-items: stretch</code></label><p class="answer-explanation" hidden></p></fieldset><fieldset data-question="5"><legend><span>05</span> Which shorthand combines direction and wrapping?</legend><label><input type="radio" name="q5" value="a"> <code>flex: row wrap</code></label><label><input type="radio" name="q5" value="b"> <code>flex-flow: row wrap</code></label><label><input type="radio" name="q5" value="c"> <code>flex-direction: row wrap</code></label><p class="answer-explanation" hidden></p></fieldset><div class="review-actions"><button class="primary-button" type="submit">Check review →</button><button class="secondary-button" id="review-reset" type="button">Reset answers</button></div><p class="review-status" id="review-status" role="status" aria-live="polite">Answer all five questions to complete the review.</p></form></section>`;
}

function chapterReviewKey(number) {
  return `css-casebook-review-${number}`;
}

function readChapterReview(number) {
  try {
    return JSON.parse(localStorage.getItem(chapterReviewKey(number)) || "null");
  } catch {
    return null;
  }
}

function renderChapterReview(chapter) {
  const questions = chapterReviews[chapter.number] || [];
  return `<section class="chapter-review" id="chapter-review"><p class="lesson-number">Chapter review</p><h2>Check the model before the cases</h2><p>Answer these three questions to confirm the chapter's core ideas and get a short explanation for each answer.</p><form id="chapter-review-form">${questions.map(([question, options], questionIndex) => `<fieldset data-question="${questionIndex + 1}"><legend><span>${String(questionIndex + 1).padStart(2, "0")}</span> ${escapeHTML(question)}</legend>${options.map((option, optionIndex) => `<label><input type="radio" name="q${questionIndex + 1}" value="${optionIndex}"> ${escapeHTML(option)}</label>`).join("")}<p class="answer-explanation" hidden></p></fieldset>`).join("")}<div class="review-actions"><button class="primary-button" type="submit">Check review →</button><button class="secondary-button" id="chapter-review-reset" type="button">Reset answers</button></div><p class="review-status" id="chapter-review-status" role="status" aria-live="polite">Answer all three questions to complete the review.</p></form></section>`;
}

function updateChapterReviewSummary(chapter, state) {
  const progress = document.querySelector("#review-progress");
  if (!progress) return;
  progress.textContent = state?.completed
    ? `✓ Review completed · ${state.score}/${chapterReviews[chapter.number].length}`
    : "→ Chapter review pending";
}

function initializeChapterReview(chapter) {
  if (chapter.lab) return;
  const form = document.querySelector("#chapter-review-form");
  if (!form || form.dataset.initialized === "true") return;
  form.dataset.initialized = "true";
  const questions = chapterReviews[chapter.number] || [];
  const status = document.querySelector("#chapter-review-status");
  const stored = readChapterReview(chapter.number);
  updateChapterReviewSummary(chapter, stored);
  if (stored?.completed && status)
    status.textContent = `Review completed: ${stored.score}/${questions.length}. Retake it any time to improve your understanding.`;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let firstMissing;
    let score = 0;
    questions.forEach(
      ([question, options, correctIndex, explanation], questionIndex) => {
        const fieldset = form.querySelector(
          `[data-question="${questionIndex + 1}"]`,
        );
        const selected = form.querySelector(
          `input[name="q${questionIndex + 1}"]:checked`,
        );
        const explanationNode = fieldset.querySelector(".answer-explanation");
        fieldset.classList.remove("is-correct", "is-incorrect");
        explanationNode.hidden = true;
        if (!selected) {
          firstMissing ||= fieldset;
          return;
        }
        const correct = Number(selected.value) === correctIndex;
        if (correct) score += 1;
        fieldset.classList.add(correct ? "is-correct" : "is-incorrect");
        explanationNode.textContent = explanation;
        explanationNode.hidden = false;
      },
    );
    if (firstMissing) {
      status.textContent =
        "Answer all three questions before checking the review.";
      firstMissing.querySelector("input")?.focus();
      return;
    }
    const state = {
      completed: true,
      score,
      completedAt: new Date().toISOString(),
    };
    localStorage.setItem(
      chapterReviewKey(chapter.number),
      JSON.stringify(state),
    );
    updateChapterReviewSummary(chapter, state);
    updateChapterSummary(chapter);
    status.textContent = `Review complete: ${score}/${questions.length}. Read the explanations, then continue to the cases.`;
  });

  document
    .querySelector("#chapter-review-reset")
    ?.addEventListener("click", () => {
      form.reset();
      form.querySelectorAll("fieldset").forEach((fieldset) => {
        fieldset.classList.remove("is-correct", "is-incorrect");
        const explanation = fieldset.querySelector(".answer-explanation");
        explanation.hidden = true;
        explanation.textContent = "";
      });
      localStorage.removeItem(chapterReviewKey(chapter.number));
      updateChapterReviewSummary(chapter, null);
      updateChapterSummary(chapter);
      status.textContent = "Answer all three questions to complete the review.";
    });
}

function renderChapter(number) {
  const chapter =
    chapters.find((item) => item.number === number) || chapters[0];
  const id = chapterId(chapter.number);
  const jumpLinks = chapter.lessons
    .map(
      (lesson, index) =>
        `<a href="#${id}-lesson-${index + 1}">L${String(index + 1).padStart(2, "0")} ${lesson[0]}</a>`,
    )
    .join("");
  const labLink = chapter.lab
    ? `<a href="#control-room">Interactive lab</a>`
    : "";
  const next = chapters[Number(chapter.number) % chapters.length];
  article.id = id;
  article.innerHTML = `<p class="eyebrow">Chapter ${chapter.number} · ${chapter.title}</p><h1>${chapter.title} field guide</h1><p class="guide-deck">${chapter.deck}</p><div class="chapter-brief"><div><p class="lesson-number">Learning objectives</p><ul>${chapter.objectives.map((item) => `<li>${item}</li>`).join("")}</ul></div><div><p class="lesson-number">Before you begin</p><p>${chapter.before}</p><p><strong>Estimated chapter time:</strong> ${chapter.lessons.length * 8}–${chapter.lessons.length * 12} minutes</p></div></div><nav class="lesson-jump" aria-label="${chapter.title} lessons">${jumpLinks}${labLink}</nav>${chapter.lessons.map((lesson, index) => renderLesson(lesson, index, chapter.number)).join("")}${chapter.lab ? renderFlexboxLab() + renderReview() : renderChapterReview(chapter)}<section class="chapter-summary" id="chapter-summary"><div class="summary-stamp" id="summary-stamp">Reference ready</div><div><p class="lesson-number">Chapter ${chapter.number} summary</p><h2>Use the model in a case</h2><p id="chapter-status-text">Review the lessons, complete the practice prompts, then test the idea against a focused debugging investigation in the Case Library.</p><ul><li id="lessons-status">✓ ${chapter.lessons.length} detailed lessons available</li><li id="review-progress">→ Chapter review pending</li><li id="case-progress">→ Practice with the chapter cases</li></ul><p class="next-chapter"><strong>Next suggested chapter:</strong> CH${next.number} ${next.title}</p></div></section><footer class="guide-case-link"><div><p class="eyebrow">Related investigation</p><h2>Continue in the Case Library</h2><p>Apply this chapter's ideas to a concrete CSS failure.</p></div><a class="primary-button button-link" href="cases.html">Browse cases →</a></footer>`;
  document.title = `Chapter ${chapter.number} ${chapter.title} | CSS Casebook`;
  renderNav(guideSearch.value);
  initializeLessonProgress(chapter);
  initializeChapterReview(chapter);
  updateChapterSummary(chapter);
  window.initializeFlexboxLab?.();
}

renderNav();
guideSearch.addEventListener("input", (event) => renderNav(event.target.value));
window.addEventListener("hashchange", () => {
  const hash = location.hash.replace("#", "");
  const lessonMatch = hash.match(
    /^(flexbox|chapter-[0-9]{2})-lesson-([0-9]+)$/,
  );
  if (lessonMatch) {
    const number =
      lessonMatch[1] === "flexbox"
        ? "09"
        : lessonMatch[1].replace("chapter-", "");
    renderChapter(number);
    requestAnimationFrame(() =>
      document
        .getElementById(hash)
        ?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
    return;
  }
  const number = hash === "flexbox" ? "09" : hash.replace("chapter-", "");
  renderChapter(/^[0-9]{2}$/.test(number) ? number : "01");
});
renderChapter(
  location.hash
    ? location.hash === "#flexbox"
      ? "09"
      : location.hash.replace("#chapter-", "")
    : "01",
);
