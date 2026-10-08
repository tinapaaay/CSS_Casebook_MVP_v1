const controls = document.querySelector("#flex-controls");
const preview = document.querySelector("#lab-preview");
const generated = document.querySelector("#generated-css");
const explanation = document.querySelector("#lab-explanation");
const mainLabel = document.querySelector("#lab-main-axis");
const crossLabel = document.querySelector("#lab-cross-axis");

const defaults = { direction: "row", wrap: "nowrap", justify: "flex-start", align: "stretch" };

function updateLab() {
  if (!controls) return;
  const data = Object.fromEntries(new FormData(controls));
  preview.style.flexDirection = data.direction;
  preview.style.flexWrap = data.wrap;
  preview.style.justifyContent = data.justify;
  preview.style.alignItems = data.align;

  const vertical = data.direction.startsWith("column");
  const reversed = data.direction.endsWith("reverse");
  mainLabel.textContent = vertical ? `Main axis ${reversed ? "↑" : "↓"}` : `Main axis ${reversed ? "←" : "→"}`;
  crossLabel.textContent = vertical ? "Cross axis →" : "Cross axis ↓";
  mainLabel.classList.toggle("is-vertical", vertical);
  crossLabel.classList.toggle("is-horizontal", vertical);

  generated.textContent = `.container {\n  display: flex;\n  flex-direction: ${data.direction};\n  flex-wrap: ${data.wrap};\n  justify-content: ${data.justify};\n  align-items: ${data.align};\n}`;
  explanation.textContent = `${data.justify} positions items on the ${vertical ? "vertical" : "horizontal"} main axis. ${data.align} controls the ${vertical ? "horizontal" : "vertical"} cross axis.`;
}

controls?.addEventListener("change", updateLab);
document.querySelector("#lab-reset")?.addEventListener("click", () => {
  Object.entries(defaults).forEach(([name, value]) => { controls.elements[name].value = value; });
  updateLab();
});
updateLab();
