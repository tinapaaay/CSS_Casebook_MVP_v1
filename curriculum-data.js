(function () {
  const chapters = [
    ["01", "CSS Fundamentals", "Syntax, sizing, combinators, display, spacing, cascade and specificity", ["001", "002", "003"], "chapter-01", ["01-1", "01-2", "01-3"], "field-guide.html#chapter-01", 2],
    ["02", "Lists, Links, Backgrounds & Borders", "Markers, link states, backgrounds, borders, gradients and contrast", ["007", "008", "009"], "chapter-02", ["02-1", "02-2", "02-3"], "field-guide.html#chapter-02", 2],
    ["03", "Design Fundamentals", "Hierarchy, composition, UX patterns, prototypes and testing", ["010", "011", "012"], "chapter-03", ["03-1", "03-2", "03-3"], "field-guide.html#chapter-03", 2],
    ["04", "Relative & Absolute Units", "px, rem, em, percentages, viewport units and calc()", ["013", "014", "015"], "chapter-04", ["04-1", "04-2", "04-3"], "field-guide.html#chapter-04", 2],
    ["05", "Pseudo-classes & Pseudo-elements", "Interaction states, structural selectors and generated content", ["016", "017", "018"], "chapter-05", ["05-1", "05-2", "05-3"], "field-guide.html#chapter-05", 2],
    ["06", "CSS Colors", "Color systems, formats, transparency, shadows and gradients", ["019", "020", "021"], "chapter-06", ["06-1", "06-2", "06-3"], "field-guide.html#chapter-06", 2],
    ["07", "Styling Forms", "Labels, focus, checked, disabled and error states", ["022", "023", "024"], "chapter-07", ["07-1", "07-2", "07-3"], "field-guide.html#chapter-07", 2],
    ["08", "Layouts & Effects", "Overflow, transforms, box model, resets, filters and visibility", ["025", "026", "027"], "chapter-08", ["08-1", "08-2", "08-3"], "field-guide.html#chapter-08", 2],
    ["09", "CSS Flexbox", "Main and cross axes, direction, wrapping and alignment", ["004", "005", "006"], "flexbox", ["09-1", "09-2", "09-3"], "field-guide.html#flexbox", 4],
    ["10", "CSS Typography", "Type anatomy, font stacks, web fonts, spacing and shadows", ["028", "029", "030"], "chapter-10", ["10-1", "10-2", "10-3"], "field-guide.html#chapter-10", 2],
    ["11", "CSS Accessibility", "Contrast, focus, hidden content and reduced motion", ["031", "032", "033"], "chapter-11", ["11-1", "11-2", "11-3"], "field-guide.html#chapter-11", 2],
    ["12", "CSS Positioning", "Float, positioned elements, z-index and stacking contexts", ["034", "035", "036"], "chapter-12", ["12-1", "12-2", "12-3"], "field-guide.html#chapter-12", 2],
    ["13", "Attribute Selectors", "Attribute operators, language selectors and data attributes", ["037", "038", "039"], "chapter-13", ["13-1", "13-2", "13-3"], "field-guide.html#chapter-13", 2],
    ["14", "Responsive Web Design", "Fluid layouts, media queries, breakpoints and preferences", ["040", "041", "042"], "chapter-14", ["14-1", "14-2", "14-3"], "field-guide.html#chapter-14", 2],
    ["15", "CSS Grid", "Tracks, gaps, placement, areas, auto-fit and minmax()", ["043", "044", "045"], "chapter-15", ["15-1", "15-2", "15-3"], "field-guide.html#chapter-15", 2],
    ["16", "CSS Animations", "Keyframes, timing, iterations, transforms and reduced motion", ["046", "047", "048"], "chapter-16", ["16-1", "16-2", "16-3"], "field-guide.html#chapter-16", 2],
  ].map(([number, title, description, caseIds, hash, lessonIds, destination, reviewPassingScore]) => ({
    number,
    title,
    description,
    caseIds,
    hash,
    lessonIds,
    destination,
    reviewPassingScore,
  }));

  function validate(caseMap = window.CASEBOOK_CASES || {}) {
    const errors = [];
    const allIds = chapters.flatMap((chapter) => chapter.caseIds);
    const duplicates = allIds.filter((id, index) => allIds.indexOf(id) !== index);
    const represented = new Set(allIds);
    if (duplicates.length) errors.push(`Duplicate case IDs: ${[...new Set(duplicates)].join(", ")}`);
    chapters.forEach((chapter) => {
      if (chapter.caseIds.length !== 3) errors.push(`Chapter ${chapter.number} must have exactly three cases.`);
      chapter.caseIds.forEach((id) => {
        if (!caseMap[id]) errors.push(`Missing case ${id} referenced by Chapter ${chapter.number}.`);
      });
    });
    Object.keys(caseMap).forEach((id) => {
      if (!represented.has(id)) errors.push(`Case ${id} is not represented in the curriculum.`);
    });
    if (errors.length) console.error("CSS Casebook curriculum consistency errors", errors);
    return errors;
  }

  window.CSSCasebookCurriculum = {
    chapters,
    chapterCaseRegistry: Object.fromEntries(chapters.map((chapter) => [chapter.number, chapter.caseIds])),
    curriculumOrder: chapters.flatMap((chapter) => chapter.caseIds),
    validate,
    get(number) {
      return chapters.find((chapter) => chapter.number === String(number).padStart(2, "0"));
    },
  };
})();
