function createSearchHeader() {
  const header = document.createElement("div");
  const form = document.createElement("form");
  const input = document.createElement("input");
  const controls = document.createElement("div");
  const mode = document.createElement("div");
  const ask = document.createElement("button");
  const search = document.createElement("button");
  const refresh = document.createElement("button");

  header.classList.add("header");
  form.classList.add("form");
  input.classList.add("input");
  controls.classList.add("controls");
  mode.classList.add("mode");
  refresh.classList.add("refresh");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  ask.innerText = "Ask";
  search.innerText = "Search";
  ask.classList.add("active");

  refresh.appendChild(RefrechIcon());

  header.appendChild(SearchIcon());
  header.appendChild(form);
  header.appendChild(controls);
  controls.appendChild(refresh);
  controls.appendChild(mode);

  mode.appendChild(ask);
  mode.appendChild(search);
  form.appendChild(input);

  return header;
}

function createSearchBody() {
  const body = document.createElement("div");
  const messages = document.createElement("div");
  const user = document.createElement("div");
  const comet = document.createElement("div");
  const cometContainer = document.createElement("div");

  body.classList.add("body");
  messages.classList.add("messages");
  user.classList.add("user");

  cometContainer.classList.add("comet");

  body.appendChild(messages);

  body.appendChild(messages);
  messages.appendChild(cometContainer);
  cometContainer.appendChild(comet);

  return body;
}

function createSearchFooter() {
  const footer = document.createElement("form");
  const searchContainer = document.createElement("div");
  const input = document.createElement("input");
  const button = document.createElement("button");

  searchContainer.classList.add("search-container");
  button.classList.add("search");

  footer.classList.add("footer");

  footer.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  footer.appendChild(searchContainer);
  searchContainer.appendChild(input);
  searchContainer.appendChild(button);
  button.appendChild(PaperPlaneIcon());
  return footer;
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
    class: "icon",
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

function RefrechIcon() {
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

const header = createSearchHeader();
const body = createSearchBody();
const footer = createSearchFooter();

export { header, body, footer };
