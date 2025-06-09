import { type DiffToken } from "../utils/stringCompare";

function Token({ t, side }: { t: DiffToken; side: "s1" | "s2" }) {
  if (t.type === "nl") {
    /* equal newline ⇒ blank line */
    return <span className={t.isEqual ? "nl-token" : "nl-token-not-equal"} />;
  }

  let className = "token";
  if (t.type === "word" && !t.isEqual) {
    className =
      side === "s1" ? "s1-word-token-not-equal" : "s2-word-token-not-equal";
  }

  if (t.rightStripe) {
    className +=
      " " + (t.rightStripe === "s1" ? "s1-right-stripe" : "s2-right-stripe");
  }

  return <span className={className}>{t.value}</span>;
}

export default Token;
