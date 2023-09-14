import { Comet } from "outpostkit";
import "./css/App.css";
import Search from "./search";
import { useMemo } from "react";

export type CometModelConfig = {
  stream: boolean;
};

export type CometDesign = {
  theme: "light" | "dark";
};

function App() {
  const comet = useMemo(() => {
    return new Comet(
      import.meta.env.VITE_API_KEY,
      import.meta.env.VITE_COMET_ID
    );
  }, []);

  const cometConfig = useMemo(() => ({ stream: true } as CometModelConfig), []);

  return <Search cometConfig={cometConfig} comet={comet} />;
}

export default App;
