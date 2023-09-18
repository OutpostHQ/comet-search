import React from "react";
import { RefreshIcon, SearchIcon } from "../icons";

export function Header(props: {
  question: string;
  isFirstQuestion?: boolean;
  search: (input: string) => Promise<void>;
  resetSession: () => void;
  switchMode: () => void;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="header">
      {props.isFirstQuestion ? (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (props.question.trim()) {
                console.log(props.question);
                props.search(props.question);
              }
            }}
          >
            <SearchIcon className="icon" />
            <input
              onChange={(e) => {
                props.setQuestion(e.target.value);
              }}
              value={props.question}
              placeholder="Search..."
              autoFocus
            />
          </form>
        </>
      ) : (
        <h3 className="title">Outpost.Ai</h3>
      )}
      <div className="controls">
        {!props.isFirstQuestion && (
          <button className="refresh" onClick={props.resetSession}>
            <RefreshIcon className="icon" />
          </button>
        )}
        {/* <div className="mode">
          <button
            onClick={props.switchMode}
            className={`${props?.mode == "search" && "active"}`}
          >
            Search
          </button>
          <button
            onClick={props.switchMode}
            className={`${props?.mode == "ask" && "active"}`}
          >
            ask
          </button>
        </div> */}
      </div>
    </div>
  );
}
