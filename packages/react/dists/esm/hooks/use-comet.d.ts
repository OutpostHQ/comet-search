import React from "react";
import { Comet } from "outpostkit";
export type Messages = {
    from: "COMET" | "USER";
    text: string;
    conversationId?: string;
    sessionId?: string;
    error?: true;
}[];
export declare function useComet(comet: Comet, setQuestion: React.Dispatch<React.SetStateAction<string>>, cometConfig: Record<string, string>): {
    currentSessionId: string;
    resetSession: () => void;
    errorMessage: string;
    promptComet: (input: string) => Promise<void>;
    isFirstQuestion: boolean;
    sessionMessages: Messages;
    messageStream: string;
    isLoading: boolean;
};
