import React from "react";
import { RefreshIcon, SearchIcon } from "../icons";

export function Header(props: {
  mode: "search" | "ask";
  isFirstQuestion?: boolean;
  setMode: React.Dispatch<React.SetStateAction<"search" | "ask">>;
  search: React.FormEventHandler<HTMLFormElement>;
  resetSession: () => void;
}) {
  return (
    <div className="header">
      {props?.isFirstQuestion ? (
        <>
          <SearchIcon className="icon" />
          <form onSubmit={props.search}>
            <input placeholder="Search..." autoFocus />
          </form>
        </>
      ) : (
        <>
          <h3 className="title">Outpost.Ai</h3>
        </>
      )}
      <div className="controls">
        {!props?.isFirstQuestion && (
          <button className="refresh" onClick={props.resetSession}>
            <RefreshIcon className="icon" />
          </button>
        )}
        <div className="mode">
          <button
            onClick={() => {
              props?.setMode("search");
            }}
            className={`${props?.mode == "search" && "active"}`}
          >
            Search
          </button>
          <button
            onClick={() => {
              props?.setMode("ask");
            }}
            className={`${props?.mode == "ask" && "active"}`}
          >
            ask
          </button>
        </div>
      </div>
    </div>
  );
}
