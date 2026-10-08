const STARTER_CSS = `.container {
  display: flex;
  height: 180px;
  justify-content: center;
  align-items: flex-start;
}`;

const hints = [
  ["Observation", "The cards are already centered horizontally. Which direction still needs adjustment?"],
  ["Concept", "With flex-direction: row, justify-content controls the horizontal main axis, while align-items controls the vertical cross axis."],
  ["Targeted clue", "Inspect align-items. Which value centers flex items on the cross axis?"]
];

const editor = document.querySelector("#css-editor");
const demo = document.querySelector("#demo-container");
const syntaxMessage = document.querySelector("#syntax-message");
const draftStatus = document.querySelector("#draft-status");
const validation = document.querySelector("#validation-message");
const checkButton = document.querySelector("#check-button");
const resolution = document.querySelector("#resolution");
const hintList = document.querySelector("#hints");
const hintButton = document.querySelector("#hint-button");
const hideHintsButton = document.querySelector("#hide-hints");
const resetDialog = document.querySelector("#reset-dialog");

const saved = JSON.parse(localStorage.getItem("css-casebook-fc001") || "{}");
let hintCount = Math.min(saved.hintCount || 0, hints.length);
let previewMode = "current";
let checking = false;

editor.value = typeof saved.css === "string" ? saved.css : STARTER_CSS;
renderHints();
applyEditorCSS();
if (saved.completed) document.body.dataset.completed = "true";

function saveState(extra = {}) {
  localStorage.setItem("css-casebook-fc001", JSON.stringify({
    css: editor.value,
    hintCount,
    completed: saved.completed || document.body.dataset.completed === "true",
    ...extra
  }));
}

function parseContainerRule(css) {
  if (!css.trim()) return { declarations: "", error: "The stylesheet is empty. The preview has no layout instructions." };
  try {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(css);
    const rule = [...sheet.cssRules].find(item => item instanceof CSSStyleRule && item.selectorText.split(",").some(selector => selector.trim() === ".container"));
    if (!rule) return { declarations: "", error: "Add a .container rule so the evidence can be rendered." };
    return { declarations: rule.style.cssText, error: "" };
  } catch (error) {
    return { declarations: "", error: "There is a CSS syntax issue near your latest edit." };
  }
}

function renderMode(mode) {
  previewMode = mode;
  document.querySelectorAll(".view-switcher button").forEach(button => button.classList.toggle("is-active", button.dataset.view === mode));
  const caption = document.querySelector("#preview-caption");
  const stage = document.querySelector("#preview-stage");
  stage.setAttribute("aria-label", `${mode[0].toUpperCase() + mode.slice(1)} layout preview`);
  if (mode === "original") {
    demo.style.cssText = "display:flex;height:180px;justify-content:center;align-items:flex-start";
    caption.textContent = "Original — immutable starter layout";
  } else if (mode === "target") {
    demo.style.cssText = "display:flex;height:180px;justify-content:center;align-items:center";
    caption.textContent = "Target — intended layout";
  } else {
    caption.textContent = "Current — your live result";
    applyEditorCSS();
  }
}

function applyEditorCSS() {
  const result = parseContainerRule(editor.value);
  syntaxMessage.textContent = result.error;
  if (previewMode === "current") demo.style.cssText = result.declarations;
  return result;
}

editor.addEventListener("input", () => {
  previewMode = "current";
  document.querySelectorAll(".view-switcher button").forEach(button => button.classList.toggle("is-active", button.dataset.view === "current"));
  document.querySelector("#preview-caption").textContent = "Current — your live result";
  draftStatus.textContent = editor.value === STARTER_CSS ? "Starter file" : "Draft saved";
  applyEditorCSS();
  saveState();
});

editor.addEventListener("keydown", event => {
  if (event.key === "Tab") {
    event.preventDefault();
    const start = editor.selectionStart;
    editor.value = editor.value.slice(0, start) + "  " + editor.value.slice(editor.selectionEnd);
    editor.selectionStart = editor.selectionEnd = start + 2;
    editor.dispatchEvent(new Event("input"));
  }
});

document.querySelectorAll(".view-switcher button").forEach(button => button.addEventListener("click", () => renderMode(button.dataset.view)));

function renderHints() {
  hintList.innerHTML = hints.slice(0, hintCount).map(([title, text], index) => `<article class="hint"><strong>Hint ${index + 1} — ${title}</strong><p>${text}</p></article>`).join("");
  hintButton.textContent = hintCount < hints.length ? `Request hint ${hintCount + 1} →` : "All hints revealed";
  hintButton.disabled = hintCount >= hints.length;
  hideHintsButton.hidden = hintCount === 0;
  hintList.hidden = false;
}

hintButton.addEventListener("click", () => { if (hintCount < hints.length) hintCount += 1; renderHints(); saveState(); });
hideHintsButton.addEventListener("click", () => {
  const willHide = !hintList.hidden;
  hintList.hidden = willHide;
  hideHintsButton.textContent = willHide ? "Show revealed hints" : "Hide hints";
});

function setFeedback(type, title, text) {
  validation.className = `validation-message ${type ? `is-${type}` : ""}`;
  validation.querySelector(".status-mark").textContent = type === "success" ? "✓" : type === "error" ? "!" : "…";
  validation.querySelector("p").innerHTML = `<strong>${title}</strong>${text}`;
}

function inspectLayout() {
  const containerRect = demo.getBoundingClientRect();
  const cards = [...demo.children];
  if (cards.length !== 3 || getComputedStyle(demo).display !== "flex") return { ok: false, message: "Keep all three cards in a Flexbox container." };
  const rects = cards.map(card => card.getBoundingClientRect());
  const group = { left: Math.min(...rects.map(r => r.left)), right: Math.max(...rects.map(r => r.right)), top: Math.min(...rects.map(r => r.top)), bottom: Math.max(...rects.map(r => r.bottom)) };
  const horizontalDelta = Math.abs((group.left + group.right) / 2 - (containerRect.left + containerRect.right) / 2);
  const verticalDelta = Math.abs((group.top + group.bottom) / 2 - (containerRect.top + containerRect.bottom) / 2);
  const inside = rects.every(r => r.left >= containerRect.left - 2 && r.right <= containerRect.right + 2 && r.top >= containerRect.top - 2 && r.bottom <= containerRect.bottom + 2);
  const ordered = rects.every((r, i) => i === 0 || r.left >= rects[i - 1].left);
  if (!inside) return { ok: false, message: "One or more cards moved outside the container. Keep the full group inside the evidence area." };
  if (!ordered) return { ok: false, message: "The cards changed from their original horizontal order." };
  if (horizontalDelta > 7 && verticalDelta > 7) return { ok: false, message: "The card group is not centered on either axis yet." };
  if (horizontalDelta > 7) return { ok: false, message: "The cards are vertically centered, but their horizontal alignment still misses the center." };
  if (verticalDelta > 7) return { ok: false, message: "The cards are still near the top of the container. Inspect the property controlling cross-axis alignment." };
  return { ok: true };
}

checkButton.addEventListener("click", () => {
  if (checking) return;
  checking = true;
  checkButton.disabled = true;
  renderMode("current");
  setFeedback("", "Inspecting the layout…", " Comparing the rendered result with the case requirements.");
  window.setTimeout(() => {
    const parsed = applyEditorCSS();
    const result = parsed.error ? { ok: false, message: parsed.error } : inspectLayout();
    if (result.ok) {
      setFeedback("success", "Case resolved.", " All three cards meet the alignment requirements. Your resolution report is now open.");
      document.body.dataset.completed = "true";
      document.querySelector("#submitted-solution").textContent = editor.value;
      resolution.hidden = false;
      saveState({ completed: true });
      resolution.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    } else {
      setFeedback("error", "Case remains unresolved.", ` ${result.message} Your edits have been preserved.`);
    }
    checking = false;
    checkButton.disabled = false;
  }, 650);
});

document.querySelector("#reset-button").addEventListener("click", () => {
  if (editor.value === STARTER_CSS) resetCase(); else resetDialog.showModal();
});
resetDialog.addEventListener("close", () => { if (resetDialog.returnValue === "confirm") resetCase(); });

function resetCase() {
  editor.value = STARTER_CSS;
  draftStatus.textContent = "Starter file";
  resolution.hidden = true;
  renderMode("current");
  setFeedback("", "Awaiting inspection.", " Edit the CSS, then check your fix.");
  saveState();
}

document.querySelector("#replay-button").addEventListener("click", () => { resetCase(); document.querySelector("#case-title").scrollIntoView({ behavior: "smooth" }); });

document.querySelectorAll("[data-answer]").forEach(button => button.addEventListener("click", () => {
  const correct = button.dataset.answer === "correct";
  document.querySelector("#concept-feedback").textContent = correct ? "Correct. In a column, the main axis runs vertically." : "Not quite. justify-content follows the main axis, which becomes vertical in a column.";
}));

document.querySelectorAll(".mobile-tab").forEach(tab => tab.addEventListener("click", () => {
  document.querySelectorAll(".mobile-tab").forEach(item => { item.classList.toggle("is-active", item === tab); item.setAttribute("aria-selected", item === tab); });
  document.querySelectorAll(".mobile-panel").forEach(panel => panel.classList.toggle("is-active", panel.dataset.panel === tab.dataset.tab));
}));
