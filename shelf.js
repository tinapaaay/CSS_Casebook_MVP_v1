// Home page shelf: choosing a spine opens that chapter's book below the shelf.
(function () {
  const curriculum = window.CSSCasebookCurriculum;
  const progress = window.CasebookProgress;
  const shelf = document.querySelector("#shelf");
  const book = document.querySelector("#open-book");
  if (!curriculum || !shelf || !book) return;

  const escapeHtml = (value) =>
    String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

  function caseStatus(id) {
    const state = progress?.readCase(id) || {};
    if (state.completed === true) return ["is-complete", "Fixed"];
    if (state.attempted === true || state.visited === true) return ["is-started", "Started"];
    return ["", ""];
  }

  function openChapter(number) {
    const chapter = curriculum.get(number);
    if (!chapter) return;
    shelf.querySelectorAll(".spine").forEach((spine) =>
      spine.setAttribute("aria-pressed", String(spine.dataset.chapter === chapter.number)),
    );
    const cases = chapter.caseIds
      .map((id) => {
        const data = window.CASEBOOK_CASES?.[id];
        const [statusClass, statusLabel] = caseStatus(id);
        return `<li class="${statusClass}"><a href="case.html?id=${id}"><span class="case-no">${id}</span>${escapeHtml(data?.title || `Case ${id}`)}</a>${statusLabel ? `<small>${statusLabel}</small>` : ""}</li>`;
      })
      .join("");
    book.dataset.chapter = chapter.number;
    book.innerHTML = `<div class="open-book-cover"><span class="book-no">${chapter.number}</span><h2>${escapeHtml(chapter.title)}</h2><p>${escapeHtml(chapter.description)}.</p></div><div class="open-book-pages"><ol class="case-list">${cases}</ol><a class="text-link" href="${chapter.destination}">Read the chapter guide</a></div>`;
  }

  shelf.querySelectorAll(".spine").forEach((spine) => {
    const chapter = curriculum.get(spine.dataset.chapter);
    const state = progress?.getChapterState?.(spine.dataset.chapter);
    if (state?.casesCompleted === 3) spine.classList.add("is-complete");
    if (chapter) spine.setAttribute("aria-label", `Chapter ${chapter.number}: ${chapter.title}${state?.casesCompleted === 3 ? ", all cases fixed" : ""}`);
    spine.addEventListener("click", () => openChapter(spine.dataset.chapter));
  });

  const current = progress?.getState?.();
  const startId = current?.resumeId || current?.nextId || "001";
  const startChapter =
    curriculum.chapters.find((chapter) => chapter.caseIds.includes(startId))?.number || "01";
  openChapter(startChapter);
})();
