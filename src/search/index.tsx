import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { useCallback, useEffect, useRef, useState } from "react";
import { Body } from "./body";
import { Footer } from "./footer";
import { Header } from "./header";
import { Comet } from "outpostkit";
import { useComet } from "./use-comet";
import { CometModelConfig } from "../App";

export default function Search(props: {
  comet: Comet;
  cometConfig: CometModelConfig;
}) {
  const [mode, setMode] = useState<"search" | "ask">("ask");
  const [question, setQuestion] = useState("");
  const bodyRef = useRef<null | HTMLDivElement>(null);
  const {
    promptComet,
    errorMessage,
    isFirstQuestion,
    sessionMessages,
    resetSession,
    messageStream,
    isLoading,
  } = useComet(props?.comet, mode, setQuestion, props?.cometConfig);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scroll({ behavior: "instant", top: 10000000000 });
    }
  }, [question, sessionMessages, messageStream]);

  const switchMode = useCallback(() => {
    setMode((prev) => (prev == "ask" ? "search" : "ask"));
    resetSession();
  }, [resetSession]);

  return (
    <Dialog open>
      <DialogContent className="outpost-search">
        <Header
          question={question}
          setQuestion={setQuestion}
          mode={mode}
          switchMode={switchMode}
          isFirstQuestion={isFirstQuestion}
          resetSession={resetSession}
          search={promptComet}
        />
        <Body
          isLoading={isLoading}
          ref={bodyRef}
          errorMessage={errorMessage}
          messages={sessionMessages}
          isFirstQuestion={isFirstQuestion}
          messageStream={messageStream}
        />
        <Footer
          question={question}
          setQuestion={setQuestion}
          isFirstQuestion={isFirstQuestion}
          search={promptComet}
        />
      </DialogContent>
    </Dialog>
  );
}
