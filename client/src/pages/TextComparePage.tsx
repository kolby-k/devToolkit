import { useState } from "react";
import stringCompare, { type CompareResult } from "../utils/stringCompare";
import styles from "../styles/TextCompare.module.css";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import useTextArea from "../hooks/useTextArea";
import TextArea from "../components/TextArea";

function TextComparePage() {
  const [result, setResult] = useState<CompareResult>({ s1: [], s2: [] });
  const [showResult, setShowResult] = useState(false);

  const handleComparison = () => {
    if (!string1 || !string2) return;

    const results = stringCompare(string1, string2);
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
      </div>
      {showResult && (
        <div className={styles.results}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              rowGap: 10,
            }}
          >
            <h3>Text 1 Results</h3>
            <div className={styles.resultTextContainer}>
              {result.s1.map(({ word, isEqual }) => {
                const style = isEqual ? styles.isEqual : styles.s1NotEqual;
                return <p className={style}>{word} </p>;
              })}
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
            <h3>Text 2 Results</h3>
            <div className={styles.resultTextContainer}>
              {result.s2.map(({ word, isEqual }) => {
                const style = isEqual ? styles.isEqual : styles.s2NotEqual;
                return <p className={style}>{word} </p>;
              })}
            </div>
          </div>
        </div>
      )}
      <div className={styles.bottom}>
        <div
          style={{
            textAlign: "center",
            width: "45%",
          }}
        >
          <h3>Original Text 1</h3>
          <TextArea
            textAreaRef={string1Ref}
            text={string1}
            setText={(e) => setString1(e.target.value)}
            lineCount={lineCount1}
          />
        </div>
        <span
          style={{
            textAlign: "center",
            width: "45%",
          }}
        >
          <h3>Original Text 2</h3>
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
