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
      const chapterState = window.CasebookProgress.getChapterState(number);
      const chapter = curriculum.get(number);
      return `<article class="book" data-chapter="${number}" id="chapter-${number}">
      <a class="book-spine" href="${chapter.destination}" aria-label="Chapter ${number} guide: ${title}">
        <span class="book-no">${number}</span>
        <h2>${title}</h2>
        <small>${chapterState.casesCompleted} of 3 fixed${chapterState.complete ? ", chapter finished" : ""}</small>
      </a>
      <ol class="case-list">${cases
        .map((name) => {
          const caseId = playableCases[name];
          if (!caseId) return "";
          const state = caseState(caseId);
          return `<li class="${state === "completed" ? "is-complete" : state === "in-progress" ? "is-started" : ""}"><a href="case.html?id=${caseId}"><span class="case-no">${caseId}</span>${name}</a>${state === "completed" ? "<small>Fixed</small>" : state === "in-progress" ? "<small>Started</small>" : ""}</li>`;
        })
        .join("")}</ol>
    </article>`;
    })
    .join("") || `<div class="library-empty"><h2>${filter === "completed" ? "No fixed cases yet" : filter === "in-progress" ? "No started cases" : "You've opened every case"}</h2><a class="primary-button button-link" href="case.html?id=${window.CasebookProgress.getState().nextId || "001"}">Open case ${window.CasebookProgress.getState().nextId || "001"}</a></div>`;
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
      return `<a class="guide-nav-item" data-chapter="${number}" href="field-guide.html#${guideHash}"><span>${number}</span>${title}</a>`;
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
