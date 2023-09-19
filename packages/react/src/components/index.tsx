import React from "react";

import {
  Dialog,
  DialogContent,
  DialogContentProps,
  DialogOverlay,
  DialogOverlayProps,
  DialogProps,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Body } from "./body";
import { Footer } from "./footer";
import { Header } from "./header";
import { Comet } from "outpostkit";
import { useComet } from "../hooks/use-comet";

import "@searchjs/css";

function SearchContent(
  props: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cometConfig: Record<string, any>;
    APIKey: string;
    cometId: string;
  } & DialogContentProps
) {
  const { cometConfig, APIKey, cometId, className = "", ...restProps } = props;
  const comet = useMemo(() => {
    return new Comet(APIKey, cometId);
  }, [APIKey, cometId]);

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
  } = useComet(comet, setQuestion, cometConfig);

  // move to the bottom when a new message arrives (stream or entire message),
  // or  the user asks a new question (polyfill for the native css overflow-anchor property)

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scroll({ behavior: "instant", top: 10000000000 });
    }
  }, [question, sessionMessages, messageStream]);

  const switchMode = useCallback(() => {
    resetSession();
  }, [resetSession]);

  return (
    <DialogContent
      className={"outpost-search light" + className}
      {...restProps}
    >
      <Header
        question={question}
        setQuestion={setQuestion}
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
  );
}

function SearchDialogOverlay(props: DialogOverlayProps) {
  return <DialogOverlay className="outpost-search-overlay" {...props} />;
}

function SearchDialog(props: DialogProps) {
  return <Dialog {...props} />;
}

export {
  SearchDialog,
  DialogTrigger as SearchDialogTrigger,
  SearchDialogOverlay,
  SearchContent,
};
