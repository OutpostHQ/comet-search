import { PaperPlaceIcon } from "../icons";

export function Footer(props: { isFirstQuestion: boolean }) {
  return (
    !props?.isFirstQuestion && (
      <div className="footer">
        <div className="search-container">
          <input autoFocus placeholder="Ask a question..." />
          <button className="search">
            <PaperPlaceIcon className="icon" />
          </button>
        </div>
      </div>
    )
  );
}
