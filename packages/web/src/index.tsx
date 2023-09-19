import React from "react";

import {
  SearchContent,
  SearchDialog,
  SearchDialogOverlay,
  SearchDialogTrigger,
} from "@searchjs/react";

import { createRoot, type Root } from "react-dom/client";

let root: Root;

function searchjs(
  cometId: string,
  APIKEY: string,
  container: HTMLElement | string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: Record<string, any>
): void {
  const elem = document.createElement("div");
  document.body.appendChild(elem);

  if (!root) root = createRoot(elem);
  root.render(
    <SearchDialog>
      <SearchDialogTrigger>One</SearchDialogTrigger>
      <SearchContent
        cometId={cometId}
        APIKey={APIKEY}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cometConfig={options as any}
      />
      <SearchDialogOverlay />
    </SearchDialog>
  );
}

export { searchjs };
