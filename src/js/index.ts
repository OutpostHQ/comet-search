import { Remarkable } from "remarkable";

import {
  createLoadingIcon,
  createBody,
  createBodyMessages,
  createFooter,
  createHeader,
} from "./elements";
import { Comet } from "outpostkit";
import { CometMessage } from "./utils";
import Prism from "prismjs";

const test = {
  API_KEY: "",
  COMET_ID: "",
};

export type CometState = {
  mode: "chat" | "search";
  display: {
    toggleFooter: () => void;
    showLoading: () => void;
    hideLoading: () => void;
  };
  isFirstMessage: boolean;
  loading: boolean;
  error: {
    message: null | string;
    showError: (message: string) => void;
  };
  disabled: boolean;
  messages: {
    elem: HTMLElement;
    add: (message: CometMessage) => void;
    reset: () => void;
  };
  stream: {
    elem: HTMLElement;
    message: string | null;
    update: (message: string) => void;
    deleteElem: () => void;
  };
  currentSession: null | string;
};

export function createOutpostComponent(
  apiKey = test.API_KEY || "",
  cometId = test.COMET_ID || "",
  useCometConfig?: Record<string, string>
) {
  const comet = new Comet(apiKey, cometId);

  const cometConfig = { stream: true, ...useCometConfig };

  const messagesElem = createBodyMessages();

  const streamElem = document.createElement("div");
  const loadingIcon = createLoadingIcon();

  const remarkable = new Remarkable({
    highlight: (str, lang) => {
      if (lang && Prism.languages[lang]) {
        return Prism.highlight(str, Prism.languages[lang], lang);
      }
      return "";
    },
  });

  streamElem.classList.add("comet");
  streamElem.classList.add("stream");

  const cometState: CometState = {
    isFirstMessage: true,
    display: {
      toggleFooter: () => {
        if (cometState.isFirstMessage === true) {
          footer.style.display = "none";
        } else {
          footer.style.display = "block";
        }
      },
      showLoading: () => {
        messagesElem.appendChild(loadingIcon);
      },
      hideLoading: () => {
        messagesElem.removeChild(loadingIcon);
      },
    },
    mode: "search",
    loading: false,
    error: {
      message: null,
      showError: (message: string) => {
        const errorElem = document.createElement("div");
        errorElem.classList.add("error");
        errorElem.classList.add("comet");

        errorElem.innerText = message;
        cometState.messages.elem.appendChild(errorElem);
        body.scrollTo({ top: 1000000, behavior: "smooth" });
      },
    },
    disabled: false,
    messages: {
      elem: messagesElem,
      add: (message: CometMessage) => {
        const elem = document.createElement("div");
        if (message.from == "USER") {
          elem.classList.add("user");
          elem.innerText = message.text;
        } else {
          elem.classList.add("comet");
          elem.innerHTML = remarkable.render(message.text);
        }
        cometState?.messages.elem.appendChild(elem);
        body.scrollTo({ top: 100000000, behavior: "smooth" });
      },
      reset: () => {
        cometState.messages.elem.innerHTML = "";
        cometState.isFirstMessage = true;
      },
    },
    stream: {
      message: null,
      elem: streamElem,
      update: (message) => {
        if (cometState.stream.message === null) {
          cometState.stream.message = message;
        } else {
          cometState.stream.message += message;
        }
        cometState.messages.elem.appendChild(cometState.stream.elem);
        cometState.stream.elem.innerHTML = "";
        cometState.stream.elem.innerHTML = remarkable.render(
          cometState.stream.message
        );
        body.scrollTo({ top: 100000000, behavior: "smooth" });
      },
      deleteElem: () => {
        cometState.messages.elem.removeChild(cometState.stream.elem);
      },
    },
    currentSession: null,
  };

  const header = createHeader(comet, cometConfig, cometState);
  const body = createBody();
  body.appendChild(messagesElem);

  const footer = createFooter(comet, cometConfig, cometState);
  if (cometState.isFirstMessage) {
    footer.style.display = "none";
  } else {
    footer.style.display = "block";
  }

  let root = document.getElementById("html-root");

  if (!root) {
    root = document.createElement("button");
    root.innerText = "Vanilla js component";
    document.getElementsByTagName("body")[0].appendChild(root);
  }

  const searchComponent = document.createElement("div");
  const searchOverlay = document.createElement("div");

  searchOverlay.classList.add("outpost-search-overlay");
  searchOverlay.addEventListener("click", () => {
    searchComponent.style.display = "none";
    searchOverlay.style.display = "none";
  });

  searchComponent?.classList.add("outpost-search");

  searchComponent?.appendChild(header);
  searchComponent?.appendChild(body);
  searchComponent?.appendChild(footer);

  searchComponent.style.display = "none";
  searchOverlay.style.display = "none";

  root?.addEventListener("click", () => {
    if (searchComponent.style.display === "none") {
      searchComponent.style.display = "grid";
      searchOverlay.style.display = "block";
    } else {
      searchComponent.style.display = "none";
      searchOverlay.style.display = "none";
    }
  });

  document.getElementsByTagName("body")[0].appendChild(searchOverlay);
  document.getElementsByTagName("body")[0].appendChild(searchComponent);
}

createOutpostComponent();
