export type CometModelConfig = {
  stream: boolean;
};
const cometConfig = { stream: true };

function App() {
  return (
    <SearchDialog>
      <SearchDialogTrigger>React component</SearchDialogTrigger>
      <SearchContent
        APIKey={import.meta.env.VITE_API_KEY}
        cometId={import.meta.env.VITE_COMET_ID}
        cometConfig={cometConfig}
      />
      <SearchDialogOverlay />
    </SearchDialog>
  );
}

export default App;
