(function () {
  const totalCases = 48;

  function readCase(id) {
    try {
      return JSON.parse(
        localStorage.getItem(`css-casebook-c${String(id).padStart(3, "0")}`) ||
          "{}",
      );
    } catch {
      return {};
    }
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

  window.CasebookProgress = { getState, readCase, render };
  render();
})();
