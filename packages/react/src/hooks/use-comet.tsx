import React, { useCallback, useState } from "react";

import { Comet } from "outpostkit";

export type Messages = {
  from: "COMET" | "USER";
  text: string;
  conversationId?: string;
  sessionId?: string;
  error?: true;
}[];

export function useComet(
  comet: Comet,
  setQuestion: React.Dispatch<React.SetStateAction<string>>,
  cometConfig: Record<string, string>
) {
  const [currentSessionId, setCurrentSessionId] = React.useState<string | null>(
    null
  );

  const [sessionMessages, setSessionMessages] = React.useState<Messages | null>(
    null
  );

  const [isLoading, setIsLoading] = useState(false);

  const [messageStream, setMessageStream] = useState<string | null>(null);
  const resetSession = useCallback(() => {
    setCurrentSessionId(null);
    setSessionMessages(null);
    setIsFirstQuestion(true);
    setIsLoading(false);
    setErrorMessage(null);
  }, []);

  // errors
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // check if the session just started
  const [isFirstQuestion, setIsFirstQuestion] = React.useState(true);

  // ask the question
  const promptComet = useCallback(
    async (input: string) => {
      setErrorMessage(null);
      setQuestion("");

      // if the mode is search, the session should reset on every question
      resetSession();
      setSessionMessages(null);
      setIsFirstQuestion(true);

      setIsLoading(true);

      setSessionMessages((prev) => [
        ...(prev === null ? [] : prev),
        {
          from: "USER",
          text: input,
          ...(currentSessionId && { sessionId: currentSessionId }),
        },
      ]);

      try {
        const res = await comet.prompt(
          {
            input,
            stream: true,
            ...(currentSessionId && { sessionId: currentSessionId }),
            ...cometConfig,
          },
          (text: string) => {
            setMessageStream((prev) => (prev !== null ? prev + text : text));
          },
          {
            useNativeFetch: true,
          }
        );

        setCurrentSessionId(res?.sessionId ? res?.sessionId : null);

        setSessionMessages((prev) => {
          setMessageStream(null);
          return [
            ...(prev === null ? [] : prev),

            {
              conversationId: res.conversationId,
              from: "COMET",
              sessionId: res.sessionId,
              text: res.generations[0],
            },
          ];
        });

        setIsLoading(false);
      } catch (e: unknown) {
        setErrorMessage(e as string);
        setIsLoading(false);

        setSessionMessages((prev) => {
          setMessageStream(null);
          return [
            ...(prev === null ? [] : prev),

            {
              from: "COMET",
              text: (e as string) || "",
              error: true,
            },
          ];
        });
      }
    },
    [comet, currentSessionId, resetSession, setQuestion, cometConfig]
  );

  return {
    currentSessionId,
    resetSession,
    errorMessage,
    promptComet,
    isFirstQuestion,
    sessionMessages,
    messageStream,
    isLoading,
  };
}
