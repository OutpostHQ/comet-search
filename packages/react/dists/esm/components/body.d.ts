import React from "react";
import { Messages } from "../hooks/use-comet";
type Props = {
    isFirstQuestion: boolean;
    messages: Messages | null;
    errorMessage: string | null;
    messageStream: string | null;
    isLoading: boolean;
};
export declare const Body: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLDivElement>>;
export declare function SearchQuestion(props: {
    text: string;
    key: string;
}): React.JSX.Element;
export declare function SearchReply(props: {
    text: string;
    key: string;
    error: boolean | undefined;
}): React.JSX.Element;
export declare function SearcbReplyStream(props: {
    stream: string | undefined;
}): React.JSX.Element;
export declare function SearchReplyError(props: {
    errorMessage: string;
}): React.JSX.Element;
export {};
