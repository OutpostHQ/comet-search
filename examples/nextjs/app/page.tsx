"use client";

import {
  SearchContent,
  SearchDialog,
  SearchDialogOverlay,
  SearchDialogTrigger,
} from "@searchjs/react";

export default function Home() {
  return (
    <main>
      <SearchDialog>
        <SearchDialogTrigger>React component</SearchDialogTrigger>
        <SearchContent
          cometConfig={{
            stream: true,
          }}
          APIKey={process.env.NEXT_PUBLIC_COMET_API_KEY}
          cometId={process.env.NEXT_PUBLIC_COMET_ID}
        />
        <SearchDialogOverlay />
      </SearchDialog>
    </main>
  );
}
