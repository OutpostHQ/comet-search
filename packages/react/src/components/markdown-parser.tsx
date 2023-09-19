import React from "react";

/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export function MarkdownParser({ answer }: { answer: string }) {
  return (
    <ReactMarkdown
      children={String(answer).replace(/\n$/, "")}
      components={{
        code({ inline, className, children, style, ...props }) {
          return !inline ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              PreTag="div"
              style={{}}
              useInlineStyles
              language="javascript"
              {...props}
            />
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
      }}
    />
  );
}
