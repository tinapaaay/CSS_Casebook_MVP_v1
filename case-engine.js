const caseId = new URLSearchParams(location.search).get("id") || "001";
const caseData = window.CASEBOOK_CASES?.[caseId];
const app = document.querySelector("#case-app");
const errorView = document.querySelector("#case-error");

if (!caseData) {
  errorView.hidden = false;
  document.title = "Case Not Found | CSS Casebook";
} else {
  app.hidden = false;
  initializeCase(caseData);
}

function initializeCase(data) {
  document.title = `Case ${data.id} — ${data.title} | CSS Casebook`;
  document.querySelector('meta[name="description"]').content = `CSS Casebook Case ${data.id}: ${data.title}.`;
  document.querySelector("#header-case-id").textContent = `Case ${data.id}`;
  document.querySelector("#header-chapter").textContent = `/ ${data.chapter}`;
  document.querySelector("#file-code").textContent = `Case file ${data.fileCode}`;
  document.querySelector("#case-title").textContent = data.title;
  document.querySelector("#case-tags").innerHTML = `<span>${data.topic}</span><span>${data.level}</span><span>${data.duration}</span>`;
  document.querySelector("#case-objective").textContent = data.objective;
  document.querySelector("#incident-title").textContent = data.incidentTitle;
  document.querySelector("#incident-text").textContent = data.incident;
  document.querySelector("#evidence-list").innerHTML = data.evidence.map(([term, detail]) => `<div><dt>${term}</dt><dd>${detail}</dd></div>`).join("");
  document.querySelector("#closed-label").textContent = `Case #${data.id} — Closed`;
  document.querySelector("#root-cause").textContent = data.rootCause;
  document.querySelector("#remember").textContent = data.remember;
  document.querySelector("#recommended-solution").textContent = data.recommendedCSS;
  document.querySelector("#concept-question").textContent = data.question;
  document.querySelector("#concept-choices").innerHTML = data.choices.map(([label, correct]) => `<button type="button" data-correct="${correct}">${label}</button>`).join("");
  const guideLink = document.querySelector("#guide-link");
  guideLink.href = data.guideHref;
  guideLink.textContent = data.guideLabel;

  const editor = document.querySelector("#css-editor");
  const demo = document.querySelector("#demo-root");
  const syntaxMessage = document.querySelector("#syntax-message");
  const draftStatus = document.querySelector("#draft-status");
  const validation = document.querySelector("#validation-message");
  const checkButton = document.querySelector("#check-button");
  const resolution = document.querySelector("#resolution");
  const hintList = document.querySelector("#hints");
  const hintButton = document.querySelector("#hint-button");
  const hideHintsButton = document.querySelector("#hide-hints");
  const resetDialog = document.querySelector("#reset-dialog");
  let saved = safeRead(data.storageKey);
  let hintCount = Math.min(saved.hintCount || 0, data.hints.length);
  let previewMode = "current";
  let checking = false;

  demo.className = data.previewClass;
  demo.innerHTML = data.previewHTML;
  document.querySelector("#preview-stage").setAttribute("aria-label", `Current ${data.previewLabel} preview`);
  editor.value = typeof saved.css === "string" ? saved.css : data.starterCSS;
  document.querySelector("#line-numbers").innerHTML = data.starterCSS.split("\n").map((_, index) => index + 1).join("<br>");
  renderHints();
  applyEditorCSS();

  function safeRead(key) {
    try { return JSON.parse(localStorage.getItem(key) || "{}"); }
    catch { return {}; }
  }

  function saveState(extra = {}) {
    const current = safeRead(data.storageKey);
    localStorage.setItem(data.storageKey, JSON.stringify({ css: editor.value, hintCount, completed: current.completed === true, ...extra }));
  }

  function parseRule(css) {
    if (!css.trim()) return { declarations: "", error: "The stylesheet is empty. The preview has no layout instructions." };
    try {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(css);
      const rule = [...sheet.cssRules].find(item => item instanceof CSSStyleRule && item.selectorText.split(",").some(selector => selector.trim() === data.selector));
      if (!rule) return { declarations: "", error: `Add a ${data.selector} rule so the evidence can be rendered.` };
      return { declarations: rule.style.cssText, error: "" };
    } catch {
      return { declarations: "", error: "There is a CSS syntax issue near your latest edit." };
    }
  }

  function applyEditorCSS() {
    const result = parseRule(editor.value);
    syntaxMessage.textContent = result.error;
    if (previewMode === "current") demo.style.cssText = result.declarations;
    return result;
  }

  function renderMode(mode) {
    previewMode = mode;
    document.querySelectorAll(".view-switcher button").forEach(button => button.classList.toggle("is-active", button.dataset.view === mode));
    const caption = document.querySelector("#preview-caption");
    const stage = document.querySelector("#preview-stage");
    stage.setAttribute("aria-label", `${mode[0].toUpperCase() + mode.slice(1)} ${data.previewLabel} preview`);
    if (mode === "original") { demo.style.cssText = data.originalCSS; caption.textContent = data.originalCaption; }
    else if (mode === "target") { demo.style.cssText = data.targetCSS; caption.textContent = data.targetCaption; }
    else { caption.textContent = "Current — your live result"; applyEditorCSS(); }
  }

  function renderHints() {
    hintList.innerHTML = data.hints.slice(0, hintCount).map(([title, text], index) => `<article class="hint"><strong>Hint ${index + 1} — ${title}</strong><p>${text}</p></article>`).join("");
    hintButton.textContent = hintCount < data.hints.length ? `Request hint ${hintCount + 1} →` : "All hints revealed";
    hintButton.disabled = hintCount >= data.hints.length;
    hideHintsButton.hidden = hintCount === 0;
    hintList.hidden = false;
  }

  function setFeedback(type, title, text) {
    validation.className = `validation-message ${type ? `is-${type}` : ""}`;
    validation.querySelector(".status-mark").textContent = type === "success" ? "✓" : type === "error" ? "!" : "…";
    validation.querySelector("p").innerHTML = `<strong>${title}</strong>${text}`;
  }

  function validateRenderedResult() {
    const style = getComputedStyle(demo);
    const items = [...demo.children];
    if (style.display !== "flex") return { ok: false, message: "The case requires Flexbox to remain in use." };
    if (data.validator === "centered-cards") {
      if (items.length !== 3) return { ok: false, message: "All three cards must remain visible." };
      const container = demo.getBoundingClientRect();
      const rects = items.map(item => item.getBoundingClientRect());
      const group = { left: Math.min(...rects.map(r => r.left)), right: Math.max(...rects.map(r => r.right)), top: Math.min(...rects.map(r => r.top)), bottom: Math.max(...rects.map(r => r.bottom)) };
      const horizontalDelta = Math.abs((group.left + group.right) / 2 - (container.left + container.right) / 2);
      const verticalDelta = Math.abs((group.top + group.bottom) / 2 - (container.top + container.bottom) / 2);
      const inside = rects.every(r => r.left >= container.left - 2 && r.right <= container.right + 2 && r.top >= container.top - 2 && r.bottom <= container.bottom + 2);
      const ordered = rects.every((r, i) => i === 0 || r.left >= rects[i - 1].left);
      if (!inside) return { ok: false, message: "One or more cards moved outside the container." };
      if (!ordered) return { ok: false, message: "The cards changed from their original horizontal order." };
      if (horizontalDelta > 7) return { ok: false, message: "The card group is not horizontally centered." };
      if (verticalDelta > 7) return { ok: false, message: "The cards are still near the top. Inspect cross-axis alignment." };
      return { ok: true };
    }
    if (data.validator === "logical-navigation") {
      if (items.length !== 4) return { ok: false, message: "All four navigation links must remain visible." };
      const rects = items.map(item => item.getBoundingClientRect());
      const horizontal = rects.every((rect, index) => index === 0 || Math.abs(rect.top - rects[0].top) < 7);
      if (!horizontal) return { ok: false, message: "The order may be correct, but the navigation is no longer horizontal." };
      const ordered = rects.every((rect, index) => index === 0 || rect.left > rects[index - 1].left);
      if (!ordered) return { ok: false, message: "The links are still displayed in reverse order. Inspect the main-axis direction." };
      return { ok: true };
    }
    return { ok: false, message: "This case does not have a registered validator." };
  }

  editor.addEventListener("input", () => {
    previewMode = "current";
    document.querySelectorAll(".view-switcher button").forEach(button => button.classList.toggle("is-active", button.dataset.view === "current"));
    document.querySelector("#preview-caption").textContent = "Current — your live result";
    draftStatus.textContent = editor.value === data.starterCSS ? "Starter file" : "Draft saved";
    applyEditorCSS();
    saveState();
  });

  editor.addEventListener("keydown", event => {
    if (event.key !== "Tab") return;
    event.preventDefault();
    const start = editor.selectionStart;
    editor.value = editor.value.slice(0, start) + "  " + editor.value.slice(editor.selectionEnd);
    editor.selectionStart = editor.selectionEnd = start + 2;
    editor.dispatchEvent(new Event("input"));
  });

  document.querySelectorAll(".view-switcher button").forEach(button => button.addEventListener("click", () => renderMode(button.dataset.view)));
  hintButton.addEventListener("click", () => { if (hintCount < data.hints.length) hintCount += 1; renderHints(); saveState(); });
  hideHintsButton.addEventListener("click", () => { hintList.hidden = !hintList.hidden; hideHintsButton.textContent = hintList.hidden ? "Show revealed hints" : "Hide hints"; });

  checkButton.addEventListener("click", () => {
    if (checking) return;
    checking = true;
    checkButton.disabled = true;
    renderMode("current");
    setFeedback("", data.checkingTitle, data.checkingText);
    setTimeout(() => {
      const parsed = applyEditorCSS();
      const result = parsed.error ? { ok: false, message: parsed.error } : validateRenderedResult();
      if (result.ok) {
        setFeedback("success", "Case resolved.", data.successText);
        document.querySelector("#submitted-solution").textContent = editor.value;
        resolution.hidden = false;
        saveState({ completed: true });
        resolution.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      } else setFeedback("error", "Case remains unresolved.", ` ${result.message} Your edits have been preserved.`);
      checking = false;
      checkButton.disabled = false;
    }, 650);
  });

  document.querySelector("#reset-button").addEventListener("click", () => editor.value === data.starterCSS ? resetCase() : resetDialog.showModal());
  resetDialog.addEventListener("close", () => { if (resetDialog.returnValue === "confirm") resetCase(); });

  function resetCase() {
    editor.value = data.starterCSS;
    draftStatus.textContent = "Starter file";
    resolution.hidden = true;
    renderMode("current");
    setFeedback("", "Awaiting inspection.", " Edit the CSS, then check your fix.");
    saveState();
  }

  document.querySelector("#replay-button").addEventListener("click", () => { resetCase(); document.querySelector("#case-title").scrollIntoView({ behavior: "smooth" }); });
  document.querySelectorAll("#concept-choices button").forEach(button => button.addEventListener("click", () => { document.querySelector("#concept-feedback").textContent = button.dataset.correct === "true" ? data.correctFeedback : data.incorrectFeedback; }));
  document.querySelectorAll(".mobile-tab").forEach(tab => tab.addEventListener("click", () => { document.querySelectorAll(".mobile-tab").forEach(item => { const selected = item === tab; item.classList.toggle("is-active", selected); item.setAttribute("aria-selected", selected); }); document.querySelectorAll(".mobile-panel").forEach(panel => panel.classList.toggle("is-active", panel.dataset.panel === tab.dataset.tab)); }));
}
