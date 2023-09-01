import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { RefreshIcon, SearchIcon } from "../icons";
import { useCallback, useState } from "react";
import { MarkdownParser } from "./markdown-parser";
import { markdown } from "./markdown";

export default function Search() {
  const [isFirstSearch, setIsFirstSearch] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const search = useCallback((e: any) => {
    e.preventDefault();
    setIsFirstSearch(false);
  }, []);

  return (
    <Dialog open>
      <DialogContent className="outpost-search">
        <SearchHeader
          search={search}
          isFirstSearch={isFirstSearch}
          resetSession={() => setIsFirstSearch(true)}
        />
        <SearchBody isFirstSearch={isFirstSearch} />
        <SearchFooter isFirstSearch={isFirstSearch} />
      </DialogContent>
    </Dialog>
  );
}

function SearchFooter(props: { isFirstSearch: boolean }) {
  return (
    !props?.isFirstSearch && (
      <div className="footer">
        <input autoFocus placeholder="Ask a question..." />
      </div>
    )
  );
}

function SearchBody(props: { isFirstSearch: boolean }) {
  return (
    <div className="body">
      {!props?.isFirstSearch && (
        <div className="messages">
          <p className="user">What is use callback is react?</p>
          <p className="agent">
            <MarkdownParser answer={markdown} />
          </p>
        </div>
      )}
    </div>
  );
}

function SearchHeader(props: {
  isFirstSearch?: boolean;
  resetSession: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  search: any;
}) {
  return (
    <div className="header">
      {props?.isFirstSearch ? (
        <>
          <SearchIcon className="icon" />
          <form onSubmit={props.search}>
            <input autoFocus />
          </form>
        </>
      ) : (
        <>
          <h3 className="title">Outpost.ai</h3>
          <button className="refresh" onClick={props.resetSession}>
            <RefreshIcon />
          </button>
        </>
      )}
    </div>
  );
}
