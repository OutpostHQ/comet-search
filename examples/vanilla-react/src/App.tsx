import {
  SearchContent,
  SearchDialog,
  SearchDialogOverlay,
  SearchDialogTrigger,
} from "@searchjs/react";

export default function App() {
  return (
    <SearchDialog>
      <SearchDialogTrigger>Clickme</SearchDialogTrigger>
      <SearchContent
        cometId={"cometId"}
        APIKey={"APIKEY"}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cometConfig={{ stream: true } as any}
      />
      <SearchDialogOverlay />
    </SearchDialog>
  );
}
