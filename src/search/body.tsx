import { Ref, forwardRef } from "react";
import { MarkdownParser } from "./markdown-parser";
import { Messages } from "./use-comet";
import { LoadingDots } from "../icons";

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

export function SearchReplyssd(props: {
  text: string;
  conversationId: string | undefined | null;
}) {
  // const [isCopied, setIsCopied] = useState(false)

  // const [vote, setVote] = useState<true | false | null>(null)
  // const [hasVoted, setHasVoted] = useState(false)
  // const [open, setOpen] = useState(false)
  // // const [comet] = useStore((store) => [store.comet, store.config])
  // const [feedbackString, setFeedbackString] = useState("")
  // useEffect(() => {
  //   setTimeout(() => {
  //     if (isCopied) {
  //       setIsCopied(false)
  //     }
  //   }, 2000)
  // }, [isCopied])

  // const takeFeedback = useCallback(
  //   async (body: { vote?: boolean; feedback?: string }) => {
  //     try {
  //       const res = await comet?.takeConversationFeedback({
  //         conversationId: props?.conversationId as string,
  //         ...body,
  //       })
  //       if (body.vote === true || body.vote === false) {
  //         setVote(body.vote)
  //       }
  //       setHasVoted(true)
  //       setOpen(false)
  //       // toast({ title: "Feedback submitted" })
  //     } catch (e: any) {
  //       // toast({
  //       //   title: "There was an error while submitting your feedback",
  //       //   description: `${e?.message}`,
  //       // })
  //     }
  //   },

  //   [props?.conversationId,]
  // )

  return (
    <div className=" group bg-subdued">
      <div className="relative mx-auto w-full max-w-[700px] ">
        <div className="flex gap-4  py-5">
          {/* <Aperture className="h-5 w-5 shrink-0 text-icon-soft" /> */}
          <div className="w-[calc(100%-20px-16px)]  space-y-4 text-bodyLg">
            <MarkdownParser answer={props?.text} />
          </div>
        </div>
        <div className="absolute -right-24 top-5 z-[10000] flex gap-3 opacity-0 group-hover:opacity-100">
          {/* <button
              onClick={() => {
                setIsCopied(true)
                navigator.clipboard.writeText(props?.text)
              }}
            >
              {isCopied ? (
                <CheckIcon className="h-5 w-5 text-icon-soft" />
              ) : (
                <Copy className="h-5 w-5 text-icon-soft" />
              )}
            </button> */}
          {/* <button
              className="disabled:opacity-50"
              onClick={() => {
                if (hasVoted) return
                takeFeedback({ vote: true })
              }}
              disabled={hasVoted}
            >
              <ThumbsUp
                className={`h-5 w-5  ${
                  hasVoted && vote === true
                    ? "fill-black stroke-transparent"
                    : "text-icon-soft"
                }`}
              />
            </button> */}
          {/* <button
              className="disabled:opacity-50"
              onClick={() => {
                if (hasVoted) return
                takeFeedback({ vote: false })
              }}
              disabled={hasVoted}
            >
              <ThumbsDown
                className={`h-5 w-5  ${
                  hasVoted && vote === false
                    ? "fill-black stroke-transparent"
                    : "text-icon-soft"
                }`}
              />
            </button> */}
          {/* <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button disabled={hasVoted} className="disabled:opacity-50">
                  <HelpCircle className="h-5 w-5 text-icon-soft " />
                </button>
              </DialogTrigger>
              <DialogContent showClose={false}>
                <div className="p-5">
                  <Text variant="displaySmall" weight="semibold">
                    Feedback
                  </Text>
                  <Input
                    value={feedbackString}
                    onChange={(e) => {
                      setFeedbackString(e.target.value)
                    }}
                    className="mt-2"
                    placeholder="Add any suggestions you might have!"
                  />
                </div>
                <div className="flex justify-end border-t px-5 py-3">
                  <Button
                    onClick={() => {
                      feedbackString.trim() !== ""
                        ? takeFeedback({ feedback: feedbackString })
                        : null
                    }}
                  >
                    Send feedback
                  </Button>
                </div>
              </DialogContent>
            </Dialog> */}
        </div>
      </div>
    </div>
  );
}
