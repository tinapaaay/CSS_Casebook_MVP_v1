const caseId = new URLSearchParams(location.search).get("id") || "001";
const caseData = window.CASEBOOK_CASES?.[caseId];
const app = document.querySelector("#case-app");
const errorView = document.querySelector("#case-error");

if (!caseData) {
  errorView.hidden = false;
  document.title = "Case Not Found | CSS Casebook";
} else {
  app.hidden = false;
  const session = (() => {
    try {
      return JSON.parse(localStorage.getItem("css-casebook-session") || "{}");
    } catch {
      return {};
    }
  })();
  session.lastVisitedCase = caseId;
  localStorage.setItem("css-casebook-session", JSON.stringify(session));
  initializeCase(caseData);
}

function initializeCase(data) {
  populateCaseContent(data);
  const editor = document.querySelector("#css-editor");
  const previewFrame = document.querySelector("#case-preview");
  const syntaxMessage = document.querySelector("#syntax-message");
  const draftStatus = document.querySelector("#draft-status");
  const validation = document.querySelector("#validation-message");
  const checkButton = document.querySelector("#check-button");
  const resolution = document.querySelector("#resolution");
  const hintList = document.querySelector("#hints");
  const hintButton = document.querySelector("#hint-button");
  const hideHintsButton = document.querySelector("#hide-hints");
  const resetDialog = document.querySelector("#reset-dialog");
  let hintCount = Math.min(
    safeRead(data.storageKey).hintCount || 0,
    data.hints.length,
  );
  let previewMode = "current";
  let checking = false;

  const saved = safeRead(data.storageKey);
  editor.value = typeof saved.css === "string" ? saved.css : data.starterCSS;
  updateLineNumbers();
  renderHints();
  renderPreview(editor.value, "current");

  function safeRead(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || "{}");
    } catch {
      return {};
    }
  }

  function saveState(extra = {}) {
    const current = safeRead(data.storageKey);
    localStorage.setItem(
      data.storageKey,
      JSON.stringify({
        css: editor.value,
        hintCount,
        visited: current.visited === true || extra.visited === true,
        attempted: current.attempted === true || extra.attempted === true,
        completed: current.completed === true,
        ...extra,
      }),
    );
  }

  saveState({ visited: true });

  function buildPreviewDocument(css) {
    const safeCSS = css.replace(/<\/style/gi, "<\\/style");
    const safeBaseCSS = (data.previewBaseCSS || "").replace(
      /<\/style/gi,
      "<\\/style",
    );
    return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>${safeBaseCSS}</style><style id="learner-css">${safeCSS}</style></head><body>${data.previewHTML}</body></html>`;
  }

  function validateSyntax(css) {
    if (!css.trim()) return { error: "" };
    try {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(css);
      return { error: "" };
    } catch {
      return { error: "There is a CSS syntax issue near your latest edit." };
    }
  }

  function renderPreview(css, mode = "current") {
    const syntax = validateSyntax(css);
    syntaxMessage.textContent = mode === "current" ? syntax.error : "";
    previewFrame.title = `${capitalize(mode)} rendered ${data.previewLabel} preview`;
    previewFrame.srcdoc = buildPreviewDocument(css);
    return syntax;
  }

  function renderMode(mode) {
    previewMode = mode;
    document
      .querySelectorAll(".view-switcher button")
      .forEach((button) =>
        button.classList.toggle("is-active", button.dataset.view === mode),
      );
    const caption = document.querySelector("#preview-caption");
    if (mode === "original") {
      caption.textContent = data.originalCaption;
      renderPreview(data.starterCSS, mode);
    } else if (mode === "target") {
      caption.textContent = data.targetCaption;
      renderPreview(
        data.targetPreviewCSS ||
          `${data.starterCSS}\n${data.selector} { ${data.targetCSS} }`,
        mode,
      );
    } else {
      caption.textContent = "Current — your live result";
      renderPreview(editor.value, mode);
    }
  }

  function updateLineNumbers() {
    document.querySelector("#line-numbers").innerHTML = editor.value
      .split("\n")
      .map((_, index) => index + 1)
      .join("<br>");
  }

  function renderHints() {
    hintList.innerHTML = data.hints
      .slice(0, hintCount)
      .map(
        ([title, text], index) =>
          `<article class="hint"><strong>Hint ${index + 1} — ${title}</strong><p>${text}</p></article>`,
      )
      .join("");
    hintButton.textContent =
      hintCount < data.hints.length
        ? `Request hint ${hintCount + 1} →`
        : "All hints revealed";
    hintButton.disabled = hintCount >= data.hints.length;
    hideHintsButton.hidden = hintCount === 0;
    hintList.hidden = false;
  }

  function setFeedback(type, title, text) {
    validation.className = `validation-message ${type ? `is-${type}` : ""}`;
    validation.querySelector(".status-mark").textContent =
      type === "success" ? "✓" : type === "error" ? "!" : "…";
    validation.querySelector("p").innerHTML =
      `<strong>${title}</strong>${text}`;
  }

  function validateRenderedResult() {
    const doc = previewFrame.contentDocument;
    const statefulSelector = data.selector.includes(":focus");
    let root = doc?.querySelector(data.selector);
    if (!root && statefulSelector) {
      root = doc?.querySelector(data.selector.replaceAll(":focus", ""));
    }
    if (root && statefulSelector) root.focus();
    if (!doc || !root)
      return {
        ok: false,
        message: "The required preview element could not be rendered.",
      };
    const style = doc.defaultView.getComputedStyle(root);
    const bounds = root.getBoundingClientRect();
    const hasVisibleSurface =
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      style.opacity !== "0" &&
      bounds.width > 0 &&
      bounds.height > 0;
    if (!hasVisibleSurface)
      return {
        ok: false,
        message:
          "The target rule matches, but the required preview surface is hidden or has no usable size.",
      };
    if (!root.textContent.trim())
      return {
        ok: false,
        message:
          "The preview surface has no readable content. Keep the case evidence visible.",
      };
    const items = [...root.children];

    if (data.validator === "centered-cards") {
      if (style.display !== "flex")
        return {
          ok: false,
          message: "The case requires Flexbox to remain in use.",
        };
      if (items.length !== 3)
        return { ok: false, message: "All three cards must remain visible." };
      const container = root.getBoundingClientRect();
      const rects = items.map((item) => item.getBoundingClientRect());
      const group = {
        left: Math.min(...rects.map((rect) => rect.left)),
        right: Math.max(...rects.map((rect) => rect.right)),
        top: Math.min(...rects.map((rect) => rect.top)),
        bottom: Math.max(...rects.map((rect) => rect.bottom)),
      };
      const horizontalDelta = Math.abs(
        (group.left + group.right) / 2 - (container.left + container.right) / 2,
      );
      const verticalDelta = Math.abs(
        (group.top + group.bottom) / 2 - (container.top + container.bottom) / 2,
      );
      const inside = rects.every(
        (rect) =>
          rect.left >= container.left - 2 &&
          rect.right <= container.right + 2 &&
          rect.top >= container.top - 2 &&
          rect.bottom <= container.bottom + 2,
      );
      const ordered = rects.every(
        (rect, index) => index === 0 || rect.left >= rects[index - 1].left,
      );
      if (!inside)
        return {
          ok: false,
          message: "One or more cards moved outside the container.",
        };
      if (!ordered)
        return {
          ok: false,
          message: "The cards changed from their original horizontal order.",
        };
      if (horizontalDelta > 7)
        return {
          ok: false,
          message: "The card group is not horizontally centered.",
        };
      if (verticalDelta > 7)
        return {
          ok: false,
          message:
            "The cards are still near the top. Inspect cross-axis alignment.",
        };
      return { ok: true };
    }

    if (data.validator === "logical-navigation") {
      if (style.display !== "flex")
        return {
          ok: false,
          message: "The case requires Flexbox to remain in use.",
        };
      if (items.length !== 4)
        return {
          ok: false,
          message: "All four navigation links must remain visible.",
        };
      const rects = items.map((item) => item.getBoundingClientRect());
      const horizontal = rects.every(
        (rect, index) => index === 0 || Math.abs(rect.top - rects[0].top) < 7,
      );
      if (!horizontal)
        return {
          ok: false,
          message:
            "The order may be correct, but the navigation is no longer horizontal.",
        };
      const ordered = rects.every(
        (rect, index) => index === 0 || rect.left > rects[index - 1].left,
      );
      if (!ordered)
        return {
          ok: false,
          message:
            "The links are still displayed in reverse order. Inspect the main-axis direction.",
        };
      return { ok: true };
    }

    if (data.validator === "green-status") {
      const background = style.backgroundColor.replace(/\s/g, "");
      const approvedGreen =
        background === "rgb(49,93,76)" || background === "rgba(49,93,76,1)";
      const visible =
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        root.getBoundingClientRect().width > 0;
      if (!visible)
        return { ok: false, message: "The status badge is no longer visible." };
      if (!approvedGreen)
        return {
          ok: false,
          message:
            "The badge is still using the overridden color. Trace the competing background declarations.",
        };
      return { ok: true };
    }

    if (data.validator === "sibling-divider") {
      const dividers = [...root.querySelectorAll(".case-item + .case-item")];
      const valid =
        dividers.length === 2 &&
        dividers.every((item) => {
          const style = doc.defaultView.getComputedStyle(item);
          return (
            style.borderTopStyle !== "none" &&
            parseFloat(style.borderTopWidth) >= 1
          );
        });
      return valid
        ? { ok: true }
        : {
            ok: false,
            message: "The adjacent case items still need visible top borders.",
          };
    }

    if (data.validator === "contained-box") {
      const width = root.getBoundingClientRect().width;
      const style = doc.defaultView.getComputedStyle(root);
      return style.boxSizing === "border-box" && Math.abs(width - 320) <= 2
        ? { ok: true }
        : {
            ok: false,
            message: "The ticket still grows beyond its declared 320px width.",
          };
    }

    if (data.validator === "wrapped-row") {
      const items = [...root.children];
      const container = root.getBoundingClientRect();
      const inside = items.every((item) => {
        const rect = item.getBoundingClientRect();
        return (
          rect.left >= container.left - 2 && rect.right <= container.right + 2
        );
      });
      return doc.defaultView.getComputedStyle(root).flexWrap === "wrap" &&
        inside
        ? { ok: true }
        : {
            ok: false,
            message: "The cards still need to wrap inside the panel.",
          };
    }

    if (data.validator === "shared-toolbar") {
      const buttons = [...root.querySelectorAll("button")];
      const container = root.getBoundingClientRect();
      const inside = buttons.every((button) => {
        const rect = button.getBoundingClientRect();
        return (
          rect.left >= container.left - 2 && rect.right <= container.right + 2
        );
      });
      const flexible = buttons.every(
        (button) =>
          parseFloat(doc.defaultView.getComputedStyle(button).flexGrow) > 0,
      );
      return inside && flexible
        ? { ok: true }
        : {
            ok: false,
            message:
              "The controls still need to share the available toolbar width.",
          };
    }

    if (data.validator === "even-gaps") {
      const items = [...root.querySelectorAll(".filter")];
      const style = doc.defaultView.getComputedStyle(root);
      const gaps = items.slice(1).map((item, index) => {
        const previous = items[index].getBoundingClientRect();
        return item.getBoundingClientRect().left - previous.right;
      });
      const even =
        gaps.length === 2 && gaps.every((gap) => Math.abs(gap - 12) <= 2);
      const cleanMargins = items.every(
        (item) =>
          parseFloat(doc.defaultView.getComputedStyle(item).marginLeft) === 0,
      );
      return style.gap === "12px" && even && cleanMargins
        ? { ok: true }
        : {
            ok: false,
            message:
              "The filters still have uneven spacing. Use one 12px gap rule.",
      };
    }

    const boxIsUsable = (element) => {
      const rect = element?.getBoundingClientRect();
      const elementStyle = element && doc.defaultView.getComputedStyle(element);
      return Boolean(
        element &&
          rect?.width > 0 &&
          rect?.height > 0 &&
          elementStyle?.display !== "none" &&
          elementStyle?.visibility !== "hidden",
      );
    };
    const contained = (element, container, tolerance = 2) => {
      const rect = element.getBoundingClientRect();
      const parent = container.getBoundingClientRect();
      return (
        rect.left >= parent.left - tolerance &&
        rect.right <= parent.right + tolerance &&
        rect.top >= parent.top - tolerance &&
        rect.bottom <= parent.bottom + tolerance
      );
    };

    if (data.validator === "hero-cover") {
      if (style.backgroundSize !== "cover")
        return { ok: false, message: "The hero still leaves empty bands. Use a fill mode that covers the frame." };
      if (style.backgroundImage === "none" || style.backgroundRepeat !== "no-repeat")
        return { ok: false, message: "The hero lost its usable background treatment. Keep one non-repeating image surface." };
      if (!boxIsUsable(root.querySelector("h2")) || root.scrollWidth > root.clientWidth + 2)
        return { ok: false, message: "The hero content is not fully usable inside its frame." };
      return { ok: true };
    }

    if (data.validator === "list-marker") {
      const listItems = [...root.querySelectorAll("li")];
      if (style.listStyleType !== "circle")
        return { ok: false, message: "The list marker is still missing. Restore a visible circle marker." };
      if (listItems.length !== 3 || !listItems.every(boxIsUsable))
        return { ok: false, message: "All three list items must remain visible and usable." };
      if (root.scrollWidth > root.clientWidth + 2)
        return { ok: false, message: "The list marker or item text is pushing the list outside its container." };
      return { ok: true };
    }

    if (data.validator === "visible-border") {
      const borderColor = style.borderTopColor.replace(/\s/g, "");
      const approvedColor = ["rgb(115,128,120)", "rgba(115,128,120,1)"].includes(borderColor);
      if (parseFloat(style.borderTopWidth) < 1 || style.borderTopStyle !== "solid")
        return { ok: false, message: "The panel edge is not visible yet. It needs a solid border with measurable width." };
      if (!approvedColor)
        return { ok: false, message: "The border is visible but its color does not match the approved panel boundary." };
      if (!boxIsUsable(root.querySelector("h2")) || root.scrollWidth > root.clientWidth + 2)
        return { ok: false, message: "The bordered panel must remain readable and contained." };
      return { ok: true };
    }

    if (data.validator === "hierarchy-grid") {
      const blocks = [...root.children];
      if (style.display !== "grid")
        return { ok: false, message: "The interface regions are not forming the required two-dimensional grid." };
      if (blocks.length !== 3 || !blocks.every((block) => boxIsUsable(block) && contained(block, root)))
        return { ok: false, message: "All three dashboard regions must remain visible inside the grid." };
      if (Math.abs(blocks[0].getBoundingClientRect().top - blocks[1].getBoundingClientRect().top) > 8)
        return { ok: false, message: "The primary and supporting regions are not aligned into the intended row." };
      if (root.scrollWidth > root.clientWidth + 2)
        return { ok: false, message: "The grid alignment introduced horizontal overflow." };
      return { ok: true };
    }

    if (data.validator === "checkout-distribution") {
      const button = root.querySelector("button");
      const summary = root.querySelector(".checkout-bar > div, span");
      if (style.justifyContent !== "space-between")
        return { ok: false, message: "The checkout items are not distributed across the available row." };
      if (!boxIsUsable(summary) || !boxIsUsable(button))
        return { ok: false, message: "The order summary and Continue action must both remain visible and usable." };
      if (button.getBoundingClientRect().left - summary.getBoundingClientRect().right < 16)
        return { ok: false, message: "The checkout action is too close to the summary; preserve a clear separation." };
      if (root.scrollWidth > root.clientWidth + 2)
        return { ok: false, message: "The checkout row no longer fits its container." };
      return { ok: true };
    }

    if (data.validator === "meaningful-hierarchy") {
      const heading = root.matches("h2, h3") ? root : root.querySelector("h2, h3");
      const hierarchySurface = root.matches("h2, h3") ? root.parentElement : root;
      const paragraph = hierarchySurface?.querySelector("p");
      if (!heading || !paragraph)
        return { ok: false, message: "The hierarchy needs both a primary heading and supporting copy." };
      const headingStyle = doc.defaultView.getComputedStyle(heading);
      const paragraphStyle = doc.defaultView.getComputedStyle(paragraph);
      if (parseFloat(headingStyle.fontSize) < 24 || parseFloat(headingStyle.fontSize) - parseFloat(paragraphStyle.fontSize) < 4)
        return { ok: false, message: "The primary heading is not meaningfully larger than the supporting copy." };
      if (!boxIsUsable(heading) || !boxIsUsable(paragraph) || hierarchySurface.scrollWidth > hierarchySurface.clientWidth + 2)
        return { ok: false, message: "The hierarchy text must remain visible and contained." };
      return { ok: true };
    }

    if (data.validator === "contained-reading" || data.validator === "contained-formula") {
      const child = root.querySelector("p");
      const maximum = data.validator === "contained-reading" ? 900 : 720;
      if (parseFloat(style.maxWidth) < maximum)
        return { ok: false, message: `The reading surface needs its ${maximum}px maximum width guardrail.` };
      if (!boxIsUsable(child) || !contained(root, root.parentElement, 2))
        return { ok: false, message: "The content surface or its text is no longer contained and readable." };
      if (root.scrollWidth > root.clientWidth + 2)
        return { ok: false, message: "The sizing rule introduced horizontal overflow." };
      return { ok: true };
    }

    if (data.validator === "reachable-overflow") {
      if (style.overflow !== "auto")
        return { ok: false, message: "The narrow panel still hides overflow. Use a reachable scrolling path." };
      if (root.scrollHeight <= root.clientHeight && root.scrollWidth <= root.clientWidth)
        return { ok: false, message: "The panel does not expose the additional evidence through a reachable scrollable area." };
      if (!boxIsUsable(root.querySelector("strong")) || !root.textContent.trim())
        return { ok: false, message: "The viewport case must keep its heading and evidence visible." };
      return { ok: true };
    }

    if (data.validator === "computed-style") {
      const actual = style[data.expectedProperty];
      const expected = data.expectedValue;
      const normalize = (value) =>
        String(value).replace(/\s+/g, "").toLowerCase();
      const colorMap = {
        "#173d2c": "rgb(23,61,44)",
        "#fffefa": "rgb(255,254,250)",
        "#a44d2f": "rgb(164,77,47)",
        "#738078": "rgb(115,128,120)",
      };
      const expectedNormalized = colorMap[expected] || expected;
      let matches = normalize(actual) === normalize(expectedNormalized);
      if (data.expectedProperty === "transform")
        matches = expected === "none" ? actual === "none" : actual !== "none";
      if (data.expectedProperty === "boxShadow")
        matches = expected === "none" ? actual === "none" : actual !== "none";
      if (
        data.expectedProperty === "backgroundColor" &&
        expected.startsWith("rgba")
      )
        matches = normalize(actual).includes(normalize(expected));
      const missingRequirement = (data.requiredStyles || []).find(
        ([property, requiredValue]) =>
          normalize(style[property]) !== normalize(requiredValue),
      );
      if (matches && missingRequirement) {
        return {
          ok: false,
          message: `The rendered ${missingRequirement[0]} is still ${style[missingRequirement[0]] || "unset"}.`,
        };
      }
      return matches
        ? { ok: true }
        : {
            ok: false,
            message: `The rendered ${data.expectedProperty} is still ${actual || "unset"}.`,
          };
    }

    return {
      ok: false,
      message: "This case does not have a registered validator.",
    };
  }

  editor.addEventListener("input", () => {
    previewMode = "current";
    document
      .querySelectorAll(".view-switcher button")
      .forEach((button) =>
        button.classList.toggle("is-active", button.dataset.view === "current"),
      );
    document.querySelector("#preview-caption").textContent =
      "Current — your live result";
    draftStatus.textContent =
      editor.value === data.starterCSS ? "Starter file" : "Draft saved";
    updateLineNumbers();
    renderPreview(editor.value, "current");
    saveState({ attempted: true });
  });

  document
    .querySelectorAll(".view-switcher button")
    .forEach((button) =>
      button.addEventListener("click", () => renderMode(button.dataset.view)),
    );
  hintButton.addEventListener("click", () => {
    if (hintCount < data.hints.length) hintCount += 1;
    renderHints();
    saveState({ attempted: true });
  });
  hideHintsButton.addEventListener("click", () => {
    hintList.hidden = !hintList.hidden;
    hideHintsButton.textContent = hintList.hidden
      ? "Show revealed hints"
      : "Hide hints";
  });

  checkButton.addEventListener("click", () => {
    if (checking) return;
    checking = true;
    saveState({ attempted: true });
    checkButton.disabled = true;
    setFeedback("", data.checkingTitle, data.checkingText);
    const onLoad = () => {
      const syntax = validateSyntax(editor.value);
      const result = syntax.error
        ? { ok: false, message: syntax.error }
        : validateRenderedResult();
      if (result.ok) {
        setFeedback("success", "Case resolved.", data.successText);
        document.querySelector("#submitted-solution").textContent =
          editor.value;
        resolution.hidden = false;
        saveState({ completed: true });
        resolution.scrollIntoView({
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "start",
        });
      } else {
        setFeedback(
          "error",
          "Case remains unresolved.",
          ` ${result.message} Your edits have been preserved.`,
        );
      }
      checking = false;
      checkButton.disabled = false;
    };
    previewFrame.addEventListener("load", onLoad, { once: true });
    renderMode("current");
  });

  document
    .querySelector("#reset-button")
    .addEventListener("click", () =>
      editor.value === data.starterCSS ? resetCase() : resetDialog.showModal(),
    );
  resetDialog.addEventListener("close", () => {
    if (resetDialog.returnValue === "confirm") resetCase();
  });

  function resetCase() {
    editor.value = data.starterCSS;
    draftStatus.textContent = "Starter file";
    resolution.hidden = true;
    updateLineNumbers();
    renderMode("current");
    setFeedback(
      "",
      "Awaiting inspection.",
      " Edit the CSS, then check your fix.",
    );
    saveState();
  }

  document.querySelector("#replay-button").addEventListener("click", () => {
    resetCase();
    document
      .querySelector("#case-title")
      .scrollIntoView({ behavior: "smooth" });
  });
  document.querySelectorAll("#concept-choices button").forEach((button) =>
    button.addEventListener("click", () => {
      document.querySelector("#concept-feedback").textContent =
        button.dataset.correct === "true"
          ? data.correctFeedback
          : data.incorrectFeedback;
    }),
  );
  const mobileTabs = Array.from(document.querySelectorAll(".mobile-tab"));
  function selectMobileTab(tab, moveFocus = false) {
    mobileTabs.forEach((item) => {
      const selected = item === tab;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    document
      .querySelectorAll(".mobile-panel")
      .forEach((panel) =>
        panel.classList.toggle(
          "is-active",
          panel.dataset.panel === tab.dataset.tab,
        ),
      );
    if (moveFocus) tab.focus();
  }
  mobileTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectMobileTab(tab));
    tab.addEventListener("keydown", (event) => {
      if (
        ![
          "ArrowRight",
          "ArrowDown",
          "ArrowLeft",
          "ArrowUp",
          "Home",
          "End",
        ].includes(event.key)
      )
        return;
      event.preventDefault();
      const nextIndex =
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? mobileTabs.length - 1
            : event.key === "ArrowLeft" || event.key === "ArrowUp"
              ? (index - 1 + mobileTabs.length) % mobileTabs.length
              : (index + 1) % mobileTabs.length;
      selectMobileTab(mobileTabs[nextIndex], true);
    });
  });
  /* Keep the selected tab and panel relationship explicit after startup. */
  const activeMobileTab =
    mobileTabs.find((tab) => tab.classList.contains("is-active")) ||
    mobileTabs[0];
  if (activeMobileTab) selectMobileTab(activeMobileTab);
  /*
    The keyboard behavior above follows the WAI-ARIA tabs pattern: arrow keys
    move among tabs, while focus remains inside the tablist.
  */
}

function populateCaseContent(data) {
  document.title = `Case ${data.id} — ${data.title} | CSS Casebook`;
  document.querySelector('meta[name="description"]').content =
    `CSS Casebook Case ${data.id}: ${data.title}.`;
  document.querySelector("#header-case-id").textContent = `Case ${data.id}`;
  document.querySelector("#header-chapter").textContent = `/ ${data.chapter}`;
  document.querySelector("#file-code").textContent =
    `Case file ${data.fileCode}`;
  document.querySelector("#case-title").textContent = data.title;
  document.querySelector("#case-tags").innerHTML =
    `<span>${data.topic}</span><span>${data.level}</span><span>${data.duration}</span>${data.isTransferCase ? "<span>TRANSFER CHALLENGE</span>" : ""}`;
  document.querySelector("#case-objective").textContent = data.isTransferCase
    ? `${data.objective} ${data.transferPrompt}`
    : data.objective;
  const method = document.querySelector("#investigation-method");
  if (method) {
    const property = String(data.expectedProperty || "the relevant CSS rule")
      .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
    method.innerHTML = `<strong>Debug method</strong><span>1. Observe the failure</span><span>2. Inspect <code>${property}</code></span><span>3. Recheck the constraint after editing</span>`;
  }
  document.querySelector("#incident-title").textContent = data.incidentTitle;
  document.querySelector("#incident-text").textContent = data.incident;
  document.querySelector("#evidence-list").innerHTML = data.evidence
    .map(([term, detail]) => `<div><dt>${term}</dt><dd>${detail}</dd></div>`)
    .join("");
  document.querySelector("#closed-label").textContent =
    `Case #${data.id} — Closed`;
  document.querySelector("#root-cause").textContent = data.rootCause;
  document.querySelector("#remember").textContent = data.remember;
  document.querySelector("#recommended-solution").textContent =
    data.recommendedCSS;
  document.querySelector("#concept-question").textContent = data.question;
  document.querySelector("#concept-choices").innerHTML = data.choices
    .map(
      ([label, correct]) =>
        `<button type="button" data-correct="${correct}">${label}</button>`,
    )
    .join("");
  const guideLink = document.querySelector("#guide-link");
  guideLink.href = data.guideHref;
  guideLink.textContent = data.guideLabel;
  const chapterCode = data.chapter.slice(2, 4);
  const chapterAnchor =
    chapterCode === "09" ? "#flexbox" : `#chapter-${chapterCode}`;
  const allCases = Object.values(window.CASEBOOK_CASES || {});
  const curriculumOrder = window.CasebookProgress?.curriculumOrder || allCases.map((item) => item.id);
  const orderedCases = curriculumOrder.map((id) => allCases.find((item) => item.id === id)).filter(Boolean);
  const chapterCases = (window.CasebookProgress?.chapterCaseIds?.(chapterCode) || [])
    .map((id) => allCases.find((item) => item.id === id))
    .filter(Boolean);
  const position = chapterCases.findIndex((item) => item.id === data.id) + 1;
  const curriculumPosition = orderedCases.findIndex((item) => item.id === data.id);
  const previous = orderedCases[curriculumPosition - 1];
  const next = orderedCases[curriculumPosition + 1];
  const previousLink = document.querySelector("#previous-case-link");
  const topNextLink = document.querySelector("#top-next-case-link");
  const chapterLink = document.querySelector("#chapter-overview-link");
  document.querySelector("#case-position").textContent =
    `Case ${position} of ${chapterCases.length}`;
  chapterLink.href = `field-guide.html${chapterAnchor}`;
  if (previous) {
    previousLink.href = `case.html?id=${previous.id}`;
    previousLink.textContent = `← Case #${previous.id}`;
    previousLink.hidden = false;
  } else {
    previousLink.hidden = true;
  }
  if (next) {
    topNextLink.href = `case.html?id=${next.id}`;
    topNextLink.textContent = `Case #${next.id} →`;
    topNextLink.hidden = false;
  } else {
    topNextLink.hidden = true;
  }
  const nextCaseLink = document.querySelector("#next-case-link");
  if (next) {
    nextCaseLink.href = `case.html?id=${next.id}`;
    nextCaseLink.textContent = `Open Case #${next.id} →`;
    nextCaseLink.hidden = false;
  } else {
    nextCaseLink.hidden = true;
  }
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
