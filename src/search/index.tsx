import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { RefreshIcon, SearchIcon } from "../icons";
import { useState } from "react";

export default function Search() {
  const [isSearching, setIsSearching] = useState(false);
  return (
    <Dialog open>
      <DialogContent className="outpost-search">
        <SearchHeader
          isSearching={isSearching}
          resetSession={() => setIsSearching(true)}
        />
        <SearchBody />
      </DialogContent>
    </Dialog>
  );
}

function SearchBody() {
  return <div className="body">SearchBody</div>;
}

function SearchHeader(props: {
  isSearching?: boolean;
  resetSession: () => void;
}) {
  return (
    <div className="header">
      {props?.isSearching ? (
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
