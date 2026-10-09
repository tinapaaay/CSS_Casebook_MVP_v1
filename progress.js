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
    for (let id = 1; id <= totalCases; id += 1) {
      if (readCase(id).completed === true) completed.push(id);
    }
    const next =
      Array.from({ length: totalCases }, (_, index) => index + 1).find(
        (id) => !completed.includes(id),
      ) || 1;
    return {
      completed,
      next,
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
      link.href = `case.html?id=${String(state.next).padStart(3, "0")}`;
      link.textContent = state.completed.length
        ? `Continue Case #${String(state.next).padStart(3, "0")} →`
        : "Start the first case →";
    });
    const resume = document.querySelector("#resume-card");
    if (resume) {
      resume.hidden = false;
      resume.innerHTML = `<p class="eyebrow">Your local progress</p><strong>${state.completed.length ? `Case #${String(state.next).padStart(3, "0")} is next` : "Begin with Case #001"}</strong><p>${state.completed.length ? `${state.completed.length} of ${state.total} cases complete. Pick up where you left off.` : "Solve the first investigation to start building your case history."}</p><a class="secondary-button button-link" href="case.html?id=${String(state.next).padStart(3, "0")}">${state.completed.length ? "Resume investigation →" : "Open Case 001 →"}</a>`;
    }
  }

  window.CasebookProgress = { getState, readCase, render, chapterCaseRegistry, chapterCaseIds, readLesson, readReview, getChapterState };
  render();
})();
