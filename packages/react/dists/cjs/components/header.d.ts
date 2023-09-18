import React from "react";
export declare function Header(props: {
    question: string;
    isFirstQuestion?: boolean;
    search: (input: string) => Promise<void>;
    resetSession: () => void;
    switchMode: () => void;
    setQuestion: React.Dispatch<React.SetStateAction<string>>;
}): React.JSX.Element;
