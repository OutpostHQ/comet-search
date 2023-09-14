import { PaperPlaceIcon } from "../icons";

export function Footer(props: {
  isFirstQuestion: boolean;
  question: string;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  search: (input: string) => Promise<void>;
}) {
  return (
    !props?.isFirstQuestion && (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (props.question.trim()) {
            console.log(props.question);
            props.search(props.question);
          }
        }}
        className="footer"
      >
        <div className="search-container">
          <input
            value={props.question}
            onChange={(e) => {
              props.setQuestion(e.target.value);
            }}
            autoFocus
            placeholder="Ask a question..."
          />
          <button className="search">
            <PaperPlaceIcon className="icon" />
          </button>
        </div>
      </form>
    )
  );
}
