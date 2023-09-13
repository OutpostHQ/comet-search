import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { FormEvent, useCallback, useState } from "react";
import { Body } from "./body";
import { Footer } from "./footer";
import { Header } from "./header";

export default function Search() {
  const [isFirstQuestion, setIsFirstQuestion] = useState(false);

  const [mode, setMode] = useState<"search" | "ask">("search");

  const search = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFirstQuestion(false);
  }, []);

  return (
    <Dialog open>
      <DialogContent className="outpost-search">
        <Header
          mode={mode}
          setMode={setMode}
          search={search}
          isFirstQuestion={isFirstQuestion}
          resetSession={() => setIsFirstQuestion(true)}
        />
        <Body isFirstQuestion={isFirstQuestion} />
        <Footer isFirstQuestion={isFirstQuestion} />
      </DialogContent>
    </Dialog>
  );
}
