"use client";

import {
  SearchContent,
  SearchDialog,
  SearchDialogOverlay,
  SearchDialogTrigger,
} from "@searchjs/react";

import "@searchjs/css/tokens.css";
import "@searchjs/css/search.css";
import "@searchjs/css/markdown.css";

export default function Home() {
  return (
    <main>
      <SearchDialog>
        <SearchDialogTrigger>React component</SearchDialogTrigger>
        <SearchContent
          cometConfig={{
            stream: false,
            useCustomFetch: true,
          }}
          APIKey={process.env.NEXT_PUBLIC_COMET_API_KEY}
          cometId={process.env.NEXT_PUBLIC_COMET_ID}
        />
        <SearchDialogOverlay />
      </SearchDialog>
    </main>
  );
}
