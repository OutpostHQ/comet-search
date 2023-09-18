import React from "react";
export declare function Footer(props: {
    isFirstQuestion: boolean;
    question: string;
    setQuestion: React.Dispatch<React.SetStateAction<string>>;
    search: (input: string) => Promise<void>;
}): React.JSX.Element;
