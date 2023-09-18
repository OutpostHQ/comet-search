/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Comet } from "outpostkit";
import { promptComet } from "./utils";
import { CometState } from ".";

function createHeader(
  comet: Comet,
  cometConfig: Record<string, any>,
  cometState: CometState
) {
  const header = document.createElement("div");
  header.classList.add("header");

  const title = document.createElement("h2");
  title.innerText = "Outpost.Ai";
  title.style.display = "none";
  title.classList.add("title");

  const form = document.createElement("form");
  form.classList.add("form");

  const input = document.createElement("input");
  input.classList.add("input");
  input.placeholder = "Search...";
  input.focus();

  const controls = document.createElement("div");
  controls.classList.add("controls");

  const mode = document.createElement("div");
  mode.classList.add("mode");

  const ask = document.createElement("button");
  ask.innerText = "Ask";
  ask.classList.add("active");

  const search = document.createElement("button");
  search.innerText = "Search";

  const refresh = document.createElement("button");
  refresh.appendChild(RefreshIcon());
  refresh.style.display = "none";
  refresh.classList.add("refresh");
  refresh.addEventListener("click", cometState.messages.reset);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!input.value.trim()) return;

    cometState.isFirstMessage = false;
    refresh.style.display = "block";

    form.style.display = "none";
    title.style.display = "block";
    cometState.display.toggleFooter();

    promptComet(comet, cometConfig, cometState, input.value);
  });

  form.appendChild(SearchIcon());
  form.appendChild(input);

  controls.appendChild(refresh);
  // controls.appendChild(mode);

  mode.appendChild(ask);
  mode.appendChild(search);

  header.appendChild(title);
  header.appendChild(form);
  header.appendChild(controls);

  return header;
}

function createBodyMessages() {
  const messages = document.createElement("div");
  messages.classList.add("messages");
  return messages;
}

function createBody() {
  const body = document.createElement("div");
  body.classList.add("body");
  return body;
}

function createFooter(
  comet: Comet,
  cometConfig: Record<string, any>,

  cometState: CometState
) {
  const footerForm = document.createElement("form");

  const searchContainer = document.createElement("div");
  const input = document.createElement("input");
  input.placeholder = "Search...";

  input.focus();
  const button = document.createElement("button");

  searchContainer.classList.add("search-container");
  button.classList.add("search");

  footerForm.classList.add("footer");

  footerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!input.value.trim()) return;

    promptComet(comet, cometConfig, cometState, input.value);

    input.value = "";
  });

  footerForm.appendChild(searchContainer);
  searchContainer.appendChild(input);
  searchContainer.appendChild(button);
  button.appendChild(PaperPlaneIcon());
  return footerForm;
}

function createSVGElem(
  elementType: string,
  attributes: Record<string, unknown> = {}
) {
  const element: SVGElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    elementType
  );
  Object.entries(attributes).map((a) =>
    element.setAttribute(a[0], a[1] as string)
  );

  return element;
}

function SearchIcon() {
  const icon = createSVGElem("svg", {
    class: "icon firstSearch",
    height: "20",
    width: "20",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    stroke: "currentColor",
    fill: "none",
  });

  const child1 = createSVGElem("path", {
    stroke: "inherit",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "1",
    d: "M14.861 24.222a8.861 8.861 0 1 0 0-17.722 8.861 8.861 0 0 0 0 17.722ZM21.127 21.627 26 26.5",
  });

  icon.appendChild(child1);
  return icon;
}

function RefreshIcon() {
  const icon = createSVGElem("svg", {
    class: "icon",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    height: "100%",
    viewBox: "0 0 32 32",
    color: "currentColor",
  });

  const child1 = createSVGElem("path", {
    stroke: "currentColor",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    d: "M10.49 12.464h-6v-6",
  });

  const child2 = createSVGElem("path", {
    stroke: "currentColor",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    d: "M8.732 23.778a11 11 0 1 0 0-15.556L4.49 12.464",
  });

  icon.appendChild(child1);
  icon.appendChild(child2);

  return icon;
}

function PaperPlaneIcon() {
  const icon = createSVGElem("svg", {
    class: "icon",
    height: "100%",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    stroke: "currentColor",
    fill: "none",
  });

  const child1 = createSVGElem("path", {
    stroke: "currentColor",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    d: "M9.02 16h7.486",
  });

  const child2 = createSVGElem("path", {
    stroke: "currentColor",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    d: "M26.817 15.943 5.183 28l3.743-12L5.183 4l21.634 11.943Z",
  });

  icon.appendChild(child1);
  icon.appendChild(child2);
  return icon;
}

function createLoadingIcon() {
  const icon = createSVGElem("svg", {
    class: "loading-icon",
    color: "currentColor",
    viewBox: "0 0 120 30",
    height: "100%",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "#fff",
  });

  const circle1 = createSVGElem("circle", {
    fill: "currentColor",
    cx: "15",
    cy: "15",
    r: "15",
  });

  const circle1Animate1 = createSVGElem("animate", {
    attributeName: "r",
    from: "15",
    to: "15",
    begin: "0s",
    dur: "0.8s",
    values: "15;9;15",
    calcMode: "linear",
    repeatCount: "indefinite",
  });
  const circle1Animate2 = createSVGElem("animate", {
    attributeName: "fillOpacity",
    from: "1",
    to: "1",
    begin: "0s",
    dur: "0.8s",
    values: "1;.5;1",
    calcMode: "linear",
    repeatCount: "indefinite",
  });

  circle1.appendChild(circle1Animate1);
  circle1.appendChild(circle1Animate2);

  const circle2 = createSVGElem("circle", {
    fill: "currentColor",
    cx: "60",
    cy: "15",
    r: "9",
    fillOpacity: "0.3",
  });

  const circle2Animate1 = createSVGElem("animate", {
    attributeName: "r",
    from: "9",
    to: "9",
    begin: "0s",
    dur: "0.8s",
    values: "9;15;9",
    calcMode: "linear",
    repeatCount: "indefinite",
  });
  const circle2Animate2 = createSVGElem("animate", {
    attributeName: "fillOpacity",
    from: "0.5",
    to: "0.5",
    begin: "0s",
    dur: "0.8s",
    values: "0.5;1;0.5",
    calcMode: "linear",
    repeatCount: "indefinite",
  });

  circle2.appendChild(circle2Animate1);
  circle2.appendChild(circle2Animate2);

  const circle3 = createSVGElem("circle", {
    fill: "currentColor",
    cx: "105",
    cy: "15",
    r: "15",
  });

  const circle3Animate1 = createSVGElem("animate", {
    attributeName: "r",
    from: "15",
    to: "15",
    begin: "0s",
    dur: "0.8s",
    values: "15;9;15",
    calcMode: "linear",
    repeatCount: "indefinite",
  });
  const circle3Animate2 = createSVGElem("animate", {
    attributeName: "fillOpacity",
    from: "1",
    to: "1",
    begin: "0s",
    dur: "0.8s",
    values: "1;.5;1",
    calcMode: "linear",
    repeatCount: "indefinite",
  });

  circle3.appendChild(circle3Animate1);
  circle3.appendChild(circle3Animate2);

  icon.appendChild(circle1);
  icon.appendChild(circle2);
  icon.appendChild(circle3);

  return icon;
}

export {
  createHeader,
  createBody,
  createFooter,
  createBodyMessages,
  createLoadingIcon,
};
