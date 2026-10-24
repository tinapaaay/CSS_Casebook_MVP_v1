const curriculum = window.CSSCasebookCurriculum;
const collections = curriculum.chapters.map((chapter) => [
  chapter.number,
  chapter.title,
  chapter.description,
  chapter.caseIds.map((id) => window.CASEBOOK_CASES[id]?.title || `Case #${id}`),
]);
const playableCases = Object.fromEntries(
  curriculum.chapters.flatMap((chapter) =>
    chapter.caseIds.map((id) => [window.CASEBOOK_CASES[id]?.title || `Case #${id}`, id]),
  ),
);
curriculum.validate(window.CASEBOOK_CASES);

const library = document.querySelector("#case-library");
const guideNav = document.querySelector("#guide-nav");
const guideSearch = document.querySelector("#guide-search");

function renderLibrary(filter = "all") {
  if (!library) return;
  const caseState = (caseId) => {
    if (!caseId) return "unavailable";
    const state = window.CasebookProgress?.readCase(caseId) || {};
    if (state.completed === true) return "completed";
    if (state.attempted === true || state.visited === true) return "in-progress";
    return "not-started";
  };
  const visibleCollections = collections
    .map(([number, title, description, cases]) => [
      number,
      title,
      description,
      cases.filter((name) => {
        const caseId = playableCases[name];
        return filter === "all" || caseState(caseId) === filter;
      }),
    ])
    .filter((item) => item[3].length > 0);
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
      const chapterState = window.CasebookProgress.getChapterState(number);
      const chapter = curriculum.get(number);
      return `<article class="collection-card ${available ? "is-available" : ""}">
      <header><span>${number}</span><small>${available ? `${chapterState.casesCompleted}/3 cases resolved` : "Planned"}</small></header>
      <h2>${title}</h2><p>${description}</p>
      <ul>${cases
        .map((name) => {
          const caseId = playableCases[name];
          if (caseId)
            return `<li class="${caseState(caseId) === "completed" ? "is-complete" : ""}"><a href="case.html?id=${caseId}">Case #${caseId} · ${name}</a>${caseState(caseId) === "completed" ? "<small>✓ Complete</small>" : caseState(caseId) === "in-progress" ? "<small>In progress</small>" : ""}</li>`;
          return "";
        })
        .join("")}</ul>
      <p class="chapter-progress">${chapterState.complete ? "✓ Chapter complete" : `${chapterState.lessonsCompleted}/3 lessons · Review ${chapterState.reviewCompleted ? "passed" : "pending"}`}</p>
      <a class="collection-link" href="${chapter.destination}">Open chapter guide →</a>
    </article>`;
    })
    .join("") || `<div class="library-empty"><h2>No cases here yet.</h2><p>${filter === "completed" ? "Resolved investigations will appear here once you check a successful fix." : filter === "in-progress" ? "Open any case to start an investigation. Your unfinished cases will appear here." : "You have visited every investigation. Continue a case or revisit a resolved one."}</p><a class="secondary-button button-link" href="case.html?id=${window.CasebookProgress.getState().nextId || "001"}">Open an investigation →</a></div>`;
  const resultStatus = document.querySelector("#library-results");
  if (resultStatus) {
    const caseCount = visibleCollections.reduce(
      (total, item) =>
        total + item[3].filter((name) => playableCases[name]).length,
      0,
    );
    const filterLabel =
      filter === "all"
        ? "playable"
        : filter === "in-progress"
          ? "in-progress"
          : filter === "completed"
            ? "completed"
            : "not-started";
    resultStatus.textContent = `${caseCount} ${filterLabel} case${caseCount === 1 ? "" : "s"} across ${visibleCollections.length} chapter${visibleCollections.length === 1 ? "" : "s"}.`;
  }
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
}

renderLibrary();
renderGuideNav();
document
  .querySelector("#collection-filter")
  ?.addEventListener("change", (event) => renderLibrary(event.target.value));
guideSearch?.addEventListener("input", (event) =>
  renderGuideNav(event.target.value),
);

const progressFile = document.querySelector("#progress-file");
document.querySelector("#export-progress")?.addEventListener("click", () =>
  window.CasebookProgress?.exportProgress(),
);
document.querySelector("#import-progress")?.addEventListener("click", () =>
  progressFile?.click(),
);
progressFile?.addEventListener("change", async () => {
  const file = progressFile.files?.[0];
  if (!file) return;
  try {
    window.CasebookProgress?.importProgress(JSON.parse(await file.text()));
    renderLibrary(document.querySelector("#collection-filter")?.value || "all");
  } catch (error) {
    window.alert(error.message || "Could not import progress.");
  }
  progressFile.value = "";
});
document.querySelector("#reset-progress")?.addEventListener("click", () => {
  if (!window.confirm("Reset all local case, lesson, review and resume progress?")) return;
  window.CasebookProgress?.resetProgress();
  renderLibrary("all");
  const filter = document.querySelector("#collection-filter");
  if (filter) filter.value = "all";
});
