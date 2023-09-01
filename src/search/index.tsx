import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { RefreshIcon, SearchIcon } from "../icons";
import { useState } from "react";

export default function Search() {
  const [isFirstSearch, setIsFirstSearch] = useState(false);
  return (
    <Dialog open>
      <DialogContent className="outpost-search">
        <SearchHeader
          isFirstSearch={isFirstSearch}
          resetSession={() => setIsFirstSearch(true)}
        />
        <SearchBody />
        <SearchFooter isFirstSearch={isFirstSearch} />
      </DialogContent>
    </Dialog>
  );
}

function SearchFooter(props: { isFirstSearch: boolean }) {
  return (
    !props?.isFirstSearch && (
      <div className="footer">
        <input placeholder="Ask a question..." />
      </div>
    )
  );
}

function SearchBody() {
  return (
    <div className="body">
      <div className="messages">messages will go here</div>
    </div>
  );
}

function SearchHeader(props: {
  isFirstSearch?: boolean;
  resetSession: () => void;
}) {
  return (
    <div className="header">
      {props?.isFirstSearch ? (
        <>
          <SearchIcon className="icon" />
          <input autoFocus />
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
