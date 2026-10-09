(function () {
  const totalCases = 48;
  const chapterCaseRegistry = {
    "01": ["001", "002", "003"],
    "02": ["007", "008", "009"],
    "03": ["010", "011", "012"],
    "04": ["013", "014", "015"],
    "05": ["016", "017", "018"],
    "06": ["019", "020", "021"],
    "07": ["022", "023", "024"],
    "08": ["025", "026", "027"],
    "09": ["004", "005", "006"],
    "10": ["028", "029", "030"],
    "11": ["031", "032", "033"],
    "12": ["034", "035", "036"],
    "13": ["037", "038", "039"],
    "14": ["040", "041", "042"],
    "15": ["043", "044", "045"],
    "16": ["046", "047", "048"],
  };
  const curriculumOrder = Object.keys(chapterCaseRegistry)
    .sort((left, right) => Number(left) - Number(right))
    .flatMap((chapter) => chapterCaseRegistry[chapter]);

  function readStorage(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || "{}");
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
    if (state.completed === true) return state;
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
    const lastVisitedIncomplete = lastVisited && !completed.includes(Number(lastVisited)) ? String(lastVisited).padStart(3, "0") : null;
    return {
      completed,
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
        resume.innerHTML = `<p class="eyebrow">Course complete</p><strong>All ${state.total} cases resolved ✓</strong><p>You have completed the full case sequence. Revisit any case or review the Field Guide.</p><a class="secondary-button button-link" href="cases.html">Review the Case Library →</a>`;
        return;
      }
      const target = state.resumeId || state.nextId || "001";
      const title = state.resumeId ? `Resume Case #${target}` : state.completed.length ? `Case #${target} is recommended` : "Begin with Case #001";
      const description = state.resumeId ? `${state.completed.length} of ${state.total} cases complete. Pick up where you left off.` : state.completed.length ? `${state.completed.length} of ${state.total} cases complete. Continue through the curriculum.` : "Solve the first investigation to start building your case history.";
      const label = state.resumeId ? "Resume investigation →" : state.completed.length ? "Open recommended case →" : "Open Case 001 →";
      resume.innerHTML = `<p class="eyebrow">Your local progress</p><strong>${title}</strong><p>${description}</p><a class="secondary-button button-link" href="case.html?id=${target}">${label}</a>`;
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

  function importProgress(payload) {
    if (!payload || payload.version !== 1 || !payload.storage || typeof payload.storage !== "object") {
      throw new Error("This is not a CSS Casebook progress file.");
    }
    Object.keys(localStorage)
      .filter((key) => key.startsWith("css-casebook-"))
      .forEach((key) => localStorage.removeItem(key));
    Object.entries(payload.storage).forEach(([key, value]) => {
      if (key.startsWith("css-casebook-") && typeof value === "string") localStorage.setItem(key, value);
    });
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
    resetProgress,
  };
  render();
})();
