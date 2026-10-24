(function () {
  const curriculum = window.CSSCasebookCurriculum;
  const totalCases = curriculum.curriculumOrder.length;
  const chapterCaseRegistry = curriculum.chapterCaseRegistry;
  const curriculumOrder = curriculum.curriculumOrder;

  function readStorage(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "{}");
      return value && typeof value === "object" && !Array.isArray(value) ? value : {};
    } catch {
      return {};
    }
  }

  function readCase(id) {
    return readStorage(`css-casebook-c${String(id).padStart(3, "0")}`);
  }

  function chapterCaseIds(number) {
    return chapterCaseRegistry[String(number).padStart(2, "0")] || [];
  }

  function readLesson(number, index) {
    return localStorage.getItem(`css-casebook-lesson-${number}-${index}`) === "complete";
  }

  function readReview(number) {
    const state = readStorage(`css-casebook-review-${number}`);
    if (state.completed === true || state.reviewCompleted === true) return state;
    return number === "09" ? readStorage("css-casebook-ch09") : state;
  }

  function getChapterState(number) {
    const chapterNumber = String(number).padStart(2, "0");
    const lessonsCompleted = [1, 2, 3].filter((index) => readLesson(chapterNumber, index)).length;
    const casesCompleted = chapterCaseIds(chapterNumber).filter((id) => readCase(id).completed === true).length;
    const review = readReview(chapterNumber);
    const reviewCompleted = chapterNumber === "09" ? review.reviewCompleted === true : review.completed === true;
    return {
      lessonsCompleted,
      lessonsTotal: 3,
      casesCompleted,
      casesTotal: 3,
      reviewCompleted,
      complete: lessonsCompleted === 3 && casesCompleted === 3 && reviewCompleted,
    };
  }

  function getState() {
    const completed = [];
    curriculumOrder.forEach((id) => {
      if (readCase(id).completed === true) completed.push(Number(id));
    });
    const nextId = curriculumOrder.find((id) => !completed.includes(Number(id))) || null;
    const lastVisited = readStorage("css-casebook-session").lastVisitedCase || null;
    const lastVisitedIncomplete = lastVisited && curriculumOrder.includes(String(lastVisited).padStart(3, "0")) && !completed.includes(Number(lastVisited)) ? String(lastVisited).padStart(3, "0") : null;
    return {
      completed,
      chaptersCompleted: curriculum.chapters.filter((chapter) => getChapterState(chapter.number).complete).length,
      chaptersTotal: curriculum.chapters.length,
      next: nextId ? Number(nextId) : null,
      nextId,
      resumeId: lastVisitedIncomplete,
      allComplete: completed.length === totalCases,
      total: totalCases,
      percent: Math.round((completed.length / totalCases) * 100),
    };
  }

  function render() {
    const state = getState();
    document.querySelectorAll("[data-progress-count]").forEach((node) => {
      node.textContent = `${state.completed.length} of ${state.total} cases complete`;
    });
    document.querySelectorAll("[data-chapter-progress]").forEach((node) => {
      node.textContent = `${state.chaptersCompleted} of ${state.chaptersTotal} chapters complete`;
    });
    document.querySelectorAll("[data-progress-percent]").forEach((node) => {
      node.textContent = `${state.percent}%`;
    });
    document.querySelectorAll("[data-progress-bar]").forEach((node) => {
      node.style.setProperty("--progress", `${state.percent}%`);
      node.setAttribute("aria-valuenow", String(state.percent));
    });
    document.querySelectorAll("[data-continue-link]").forEach((link) => {
      if (state.allComplete) {
        link.href = "cases.html";
        link.textContent = "All cases resolved · Review library →";
        return;
      }
      const target = state.resumeId || state.nextId || "001";
      link.href = `case.html?id=${target}`;
      link.textContent = state.resumeId
        ? `Resume Case #${target} →`
        : state.completed.length
          ? `Recommended Case #${target} →`
          : "Start the first case →";
    });
    const resume = document.querySelector("#resume-card");
    if (resume) {
      resume.hidden = false;
      if (state.allComplete) {
        resume.innerHTML = `<p class="eyebrow">All investigations resolved</p><strong>All ${state.total} cases resolved ✓</strong><p>${state.chaptersCompleted} of ${state.chaptersTotal} chapters complete. Finish lessons and reviews in the Field Guide to complete each chapter.</p><a class="secondary-button button-link" href="cases.html">Review the Case Library →</a>`;
        return;
      }
      const target = state.resumeId || state.nextId || "001";
      const title = state.resumeId ? `Resume Case #${target}` : state.completed.length ? `Case #${target} is recommended` : "Begin with Case #001";
      const description = state.resumeId ? `${state.completed.length} of ${state.total} cases complete. Pick up where you left off.` : state.completed.length ? `${state.completed.length} of ${state.total} cases complete. Continue through the curriculum.` : "Solve the first investigation to start building your case history.";
      const label = state.resumeId ? "Resume investigation →" : state.completed.length ? "Open recommended case →" : "Open Case 001 →";
      resume.innerHTML = `<p class="eyebrow">Your local progress</p><strong>${title}</strong><p>${description}</p><p class="chapter-progress">${state.chaptersCompleted} of ${state.chaptersTotal} chapters complete · Lessons, review &amp; cases</p><a class="secondary-button button-link" href="case.html?id=${target}">${label}</a>`;
    }
  }

  function scopedStorage() {
    const storage = {};
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (key?.startsWith("css-casebook-")) storage[key] = localStorage.getItem(key);
    }
    return storage;
  }

  function notifyProgressChange() {
    window.dispatchEvent(new CustomEvent("casebook:progress-updated"));
    render();
  }

  function exportProgress() {
    const payload = JSON.stringify(
      { version: 1, exportedAt: new Date().toISOString(), storage: scopedStorage() },
      null,
      2,
    );
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([payload], { type: "application/json" }));
    link.download = `css-casebook-progress-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function validateImport(payload) {
    if (!payload || payload.version !== 1 || !payload.storage ||
        typeof payload.storage !== "object" || Array.isArray(payload.storage)) {
      throw new Error("This is not a version 1 CSS Casebook progress file.");
    }
    const entries = Object.entries(payload.storage);
    if (entries.length > 200 || JSON.stringify(payload).length > 5_000_000) {
      throw new Error("This progress file is too large. Choose a Casebook export under 5 MB.");
    }
    entries.forEach(([key, value]) => {
      if (typeof value !== "string") throw new Error(`Invalid progress value for ${key}.`);
      const summary = /^css-casebook-ch(\d{2})-status$/.exec(key);
      if (summary) {
        if (!curriculum.get(summary[1]) || !["completed", "in-progress"].includes(value)) throw new Error("Invalid chapter summary.");
        return;
      }
      const lesson = /^css-casebook-lesson-(\d{2})-([1-3])$/.exec(key);
      if (lesson) {
        if (!curriculum.get(lesson[1]) || !["complete", "in-progress"].includes(value)) throw new Error("Invalid lesson progress.");
        return;
      }
      const caseMatch = /^css-casebook-c(\d{3})$/.exec(key);
      const reviewMatch = /^css-casebook-review-(\d{2})$/.exec(key);
      if (!(caseMatch && curriculumOrder.includes(caseMatch[1])) &&
          !(reviewMatch && curriculum.get(reviewMatch[1])) &&
          key !== "css-casebook-session" && key !== "css-casebook-ch09") {
        throw new Error(`Unrecognized progress record: ${key}.`);
      }
      let state;
      try { state = JSON.parse(value); } catch { throw new Error(`Unreadable progress record: ${key}.`); }
      if (!state || typeof state !== "object" || Array.isArray(state)) throw new Error(`Invalid progress record: ${key}.`);
      for (const field of ["completed", "visited", "attempted", "reviewCompleted"]) {
        if (field in state && typeof state[field] !== "boolean") throw new Error(`Invalid ${field} state in ${key}.`);
      }
      if (caseMatch) {
        if ("css" in state && typeof state.css !== "string") throw new Error("Saved CSS must be text.");
        if ("hintCount" in state && (!Number.isInteger(state.hintCount) || state.hintCount < 0 || state.hintCount > 3)) {
          throw new Error("Hint counts must be between zero and three.");
        }
      }
      if ("lastVisitedCase" in state && !curriculumOrder.includes(String(state.lastVisitedCase).padStart(3, "0"))) {
        throw new Error("The resume case is not in this curriculum.");
      }
    });
    return entries;
  }

  function importProgress(payload) {
    const entries = validateImport(payload);
    const previous = scopedStorage();
    try {
      // Write first: a quota failure must not delete existing progress.
      entries.forEach(([key, value]) => localStorage.setItem(key, value));
      Object.keys(previous).filter((key) => !(key in payload.storage))
        .forEach((key) => localStorage.removeItem(key));
    } catch (error) {
      entries.forEach(([key]) => {
        if (!(key in previous)) localStorage.removeItem(key);
      });
      Object.entries(previous).forEach(([key, value]) => localStorage.setItem(key, value));
      throw new Error("Could not save the import. Your previous progress has been restored.");
    }
    notifyProgressChange();
  }

  function resetProgress() {
    Object.keys(localStorage)
      .filter((key) => key.startsWith("css-casebook-"))
      .forEach((key) => localStorage.removeItem(key));
    notifyProgressChange();
  }

  window.CasebookProgress = {
    getState,
    readCase,
    render,
    chapterCaseRegistry,
    curriculumOrder,
    chapterCaseIds,
    readLesson,
    readReview,
    getChapterState,
    exportProgress,
    importProgress,
    validateImport,
    resetProgress,
  };
  render();
})();
