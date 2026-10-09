const defaults = {
  direction: "row",
  wrap: "nowrap",
  justify: "flex-start",
  align: "stretch",
};

function initializeFlexboxLab() {
const controls = document.querySelector("#flex-controls");
const preview = document.querySelector("#lab-preview");
const generated = document.querySelector("#generated-css");
const explanation = document.querySelector("#lab-explanation");
const mainLabel = document.querySelector("#lab-main-axis");
const crossLabel = document.querySelector("#lab-cross-axis");
if (!controls || controls.dataset.initialized === "true") return;
controls.dataset.initialized = "true";

function updateLab() {
  if (!controls) return;
  const data = Object.fromEntries(new FormData(controls));
  preview.style.flexDirection = data.direction;
  preview.style.flexWrap = data.wrap;
  preview.style.justifyContent = data.justify;
  preview.style.alignItems = data.align;

  const vertical = data.direction.startsWith("column");
  const reversed = data.direction.endsWith("reverse");
  mainLabel.textContent = vertical
    ? `Main axis ${reversed ? "↑" : "↓"}`
    : `Main axis ${reversed ? "←" : "→"}`;
  crossLabel.textContent = vertical ? "Cross axis →" : "Cross axis ↓";
  mainLabel.classList.toggle("is-vertical", vertical);
  crossLabel.classList.toggle("is-horizontal", vertical);

  generated.textContent = `.container {\n  display: flex;\n  flex-direction: ${data.direction};\n  flex-wrap: ${data.wrap};\n  justify-content: ${data.justify};\n  align-items: ${data.align};\n}`;
  explanation.textContent = `${data.justify} positions items on the ${vertical ? "vertical" : "horizontal"} main axis. ${data.align} controls the ${vertical ? "horizontal" : "vertical"} cross axis.`;
}

controls?.addEventListener("change", updateLab);
document.querySelector("#lab-reset")?.addEventListener("click", () => {
  Object.entries(defaults).forEach(([name, value]) => {
    controls.elements[name].value = value;
  });
  updateLab();
});
updateLab();
}

window.initializeFlexboxLab = initializeFlexboxLab;
initializeFlexboxLab();

const answers = {
  q1: [
    "b",
    "display: flex creates the flex container and makes its direct children flex items.",
  ],
  q2: [
    "a",
    "In a row, the cross axis is vertical, so align-items controls vertical alignment.",
  ],
  q3: [
    "b",
    "A column turns the main axis vertical; justify-content then moves items vertically.",
  ],
  q4: [
    "a",
    "flex-wrap: wrap permits additional flex lines when the items need more space.",
  ],
  q5: ["b", "flex-flow combines flex-direction and flex-wrap in that order."],
};

function readCaseCompletion() {
  try {
    return (
      JSON.parse(localStorage.getItem("css-casebook-fx001") || "{}")
        .completed === true
    );
  } catch {
    return false;
  }
}

function readReviewCompletion() {
  try {
    return (
      JSON.parse(localStorage.getItem("css-casebook-ch09") || "{}")
        .reviewCompleted === true
    );
  } catch {
    return false;
  }
}

function updateChapterProgress() {
  const reviewDone = readReviewCompletion();
  const caseDone = readCaseCompletion();
  const completed = reviewDone && caseDone;
  const stamp = document.querySelector("#summary-stamp");
  const status = document.querySelector("#chapter-status-text");
  const reviewProgress = document.querySelector("#review-progress");
  const caseProgress = document.querySelector("#case-progress");
  if (!stamp) return;
  stamp.textContent = completed ? "Chapter closed" : "In progress";
  stamp.classList.toggle("is-complete", completed);
  status.textContent = completed
    ? "Chapter 09 is complete. You finished the reference lessons, review and first investigation."
    : "Complete the review and resolve Case #004 to close this chapter.";
  reviewProgress.textContent = `${reviewDone ? "✓" : "○"} Five-question review ${reviewDone ? "completed" : "pending"}`;
  caseProgress.textContent = `${caseDone ? "✓" : "○"} Case #004 ${caseDone ? "resolved" : "pending"}`;
  localStorage.setItem(
    "css-casebook-ch09-status",
    completed ? "completed" : "in-progress",
  );
}

document.addEventListener("submit", (event) => {
  const review = event.target.closest("#flexbox-review");
  if (!review) return;
  event.preventDefault();
  const formData = new FormData(review);
  const unanswered = Object.keys(answers).filter((name) => !formData.get(name));
  const reviewStatus = document.querySelector("#review-status");
  if (unanswered.length) {
    reviewStatus.textContent = `Answer ${unanswered.length} remaining question${unanswered.length === 1 ? "" : "s"} before checking.`;
    review.querySelector(`[name="${unanswered[0]}"]`)?.focus();
    return;
  }
  let score = 0;
  Object.entries(answers).forEach(([name, [correct, explanation]], index) => {
    const fieldset = review.querySelector(`[data-question="${index + 1}"]`);
    const chosen = formData.get(name);
    const isCorrect = chosen === correct;
    if (isCorrect) score += 1;
    fieldset.classList.toggle("is-correct", isCorrect);
    fieldset.classList.toggle("is-incorrect", !isCorrect);
    const note = fieldset.querySelector(".answer-explanation");
    note.hidden = false;
    note.innerHTML = `<strong>${isCorrect ? "Correct." : "Review this one."}</strong> ${explanation}`;
  });
  reviewStatus.innerHTML = `<strong>Review complete: ${score}/5.</strong> Read the explanations above, then retry anytime if you want a higher score.`;
  localStorage.setItem(
    "css-casebook-ch09",
    JSON.stringify({
      reviewCompleted: true,
      score,
      completedAt: new Date().toISOString(),
    }),
  );
  updateChapterProgress();
});

document.addEventListener("click", (event) => {
  if (!event.target.closest("#review-reset")) return;
  const review = document.querySelector("#flexbox-review");
  if (!review) return;
  review.reset();
  review
    .querySelectorAll("fieldset")
    .forEach((fieldset) =>
      fieldset.classList.remove("is-correct", "is-incorrect"),
    );
  review.querySelectorAll(".answer-explanation").forEach((note) => {
    note.hidden = true;
    note.textContent = "";
  });
  document.querySelector("#review-status").textContent =
    "Answers cleared. Your recorded completion remains saved.";
});

updateChapterProgress();
