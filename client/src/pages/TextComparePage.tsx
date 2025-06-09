import { useState } from "react";
import stringCompare, {
  type CompareOptions,
  type CompareResult,
} from "../utils/stringCompare";
import styles from "../styles/TextCompare.module.css";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import useTextArea from "../hooks/useTextArea";
import TextArea from "../components/TextArea";
import Token from "../components/Token";

function TextComparePage() {
  const [result, setResult] = useState<CompareResult>({ s1: [], s2: [] });
  const [showResult, setShowResult] = useState(false);
  const [options, setOptions] = useState<CompareOptions>({
    ignorePunctuation: false,
    caseSensitive: true,
    ignoreLineBreaks: false,
  });

  // key first, value second keeps the JSX readable
  const handleChange = <K extends keyof CompareOptions>(
    key: K,
    value: CompareOptions[K]
  ) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const handleComparison = () => {
    if (!string1 || !string2) return;

    const results = stringCompare(string1, string2, options);
    setResult(results);
    setShowResult(true);
  };
  const {
    textAreaRef: string1Ref,
    text: string1,
    setText: setString1,
    lines: lineCount1,
  } = useTextArea();
  const {
    textAreaRef: string2Ref,
    text: string2,
    setText: setString2,
    lines: lineCount2,
  } = useTextArea();

  return (
    <div id="page">
      <BackButton />
      <div className={styles.top}>
        <h2>Text Compare</h2>
        <Button
          label="Compare Strings"
          type="primary"
          handleClick={handleComparison}
        />
        <div className={styles.options}>
          <h4>Options</h4>
          <span className={styles.optionItems}>
            <div className="input checkbox">
              <p>Ignore Punctuation</p>
              <input
                type="checkbox"
                checked={options.ignorePunctuation}
                onChange={(e) =>
                  handleChange("ignorePunctuation", e.target.checked)
                }
              />
            </div>
            <div className="input checkbox">
              <p>Case Sensitive</p>
              <input
                type="checkbox"
                checked={options.caseSensitive}
                onChange={(e) =>
                  handleChange("caseSensitive", e.target.checked)
                }
              />
            </div>

            <div className="input checkbox">
              <p>Ignore Linebreaks</p>
              <input
                type="checkbox"
                checked={options.ignoreLineBreaks}
                onChange={(e) =>
                  handleChange("ignoreLineBreaks", e.target.checked)
                }
              />
            </div>
          </span>
        </div>
      </div>
      {showResult && (
        <>
          <h2 style={{ textDecoration: "underline" }}>Results</h2>
          <div className={styles.results}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                rowGap: 10,
              }}
            >
              <h3>Text 1</h3>
              <div className={styles.resultTextContainer}>
                {result.s1.map((t, i) => (
                  <Token key={i} t={t} side="s1" />
                ))}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                rowGap: 10,
              }}
            >
              <h3>Text 2</h3>
              <div className={styles.resultTextContainer}>
                {result.s2.map((t, i) => (
                  <Token key={i} t={t} side="s2" />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      <h2 style={{ textDecoration: "underline" }}>Original Text</h2>
      <div className={styles.bottom}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            width: "45vw",
          }}
        >
          <h3>Text 1</h3>
          <TextArea
            textAreaRef={string1Ref}
            text={string1}
            setText={(e) => setString1(e.target.value)}
            lineCount={lineCount1}
          />
        </div>
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            width: "45vw",
          }}
        >
          <h3>Text 2</h3>
          <TextArea
            textAreaRef={string2Ref}
            text={string2}
            setText={(e) => setString2(e.target.value)}
            lineCount={lineCount2}
          />
        </span>
      </div>
    </div>
  );
}

export default TextComparePage;
