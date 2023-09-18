import React from "react";
import { Ref, forwardRef } from "react";
import { MarkdownParser } from "./markdown-parser";
import { Messages } from "../hooks/use-comet";
import { LoadingDots } from "./icons";

type Props = {
  isFirstQuestion: boolean;
  messages: Messages | null;
  errorMessage: string | null;
  messageStream: string | null;
  isLoading: boolean;
};

export const Body = forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
  return (
    <div className="body" ref={ref}>
      <div className="messages">
        {props.messages !== null &&
          props.messages.map((i, index) =>
            i.from === "USER" ? (
              <SearchQuestion key={`${index}/USER`} text={i.text} />
            ) : (
              <SearchReply
                key={`${i?.conversationId}/COMET/${index}`}
                text={i.text}
                error={i.error}
              />
            )
          )}

        {props?.messageStream && (
          <SearcbReplyStream stream={props?.messageStream} />
        )}

        {props?.isLoading && !props?.messageStream && (
          <LoadingDots className="loading-icon" />
        )}
      </div>
    </div>
  );
});

export function SearchQuestion(props: { text: string; key: string }) {
  return (
    <p className="user" key={props.key}>
      {props.text}
    </p>
  );
}

export function SearchReply(props: {
  text: string;
  key: string;
  error: boolean | undefined;
}) {
  return (
    <div className={`comet ${props.error === true && "error"}`} key={props.key}>
      <MarkdownParser answer={props.text || ""} />
    </div>
  );
}

export function SearcbReplyStream(props: { stream: string | undefined }) {
  return (
    <div className="comet stream">
      <MarkdownParser answer={props?.stream || ""} />
    </div>
  );
}

export function SearchReplyError(props: { errorMessage: string }) {
  return <div className="comet error">{props?.errorMessage}</div>;
}
