import styles from "../styles/JSONFormatter.module.css";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import TextArea from "../components/TextArea";
import useTextArea from "../hooks/useTextArea";

function JSONFormatterPage() {
  const { textAreaRef, text, setText, lines } = useTextArea();

  function formatJSON() {
    try {
      const isValid = JSON.parse(text);
      setText(() => JSON.stringify(isValid, null, 3));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div id="page">
      <div className={styles.top}>
        <BackButton />
        <h2>JSON Formatter</h2>
        <div className={styles.buttons}>
          <Button label="Format JSON" type="primary" handleClick={formatJSON} />
          <Button
            label="Clear"
            type="warning"
            handleClick={() => setText("")}
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <TextArea
          textAreaRef={textAreaRef}
          text={text}
          setText={(e) => setText(e.target.value)}
          lineCount={lines}
          styles={{ display: "flex", width: "97%", overflow: "hidden" }}
        />
      </div>
    </div>
  );
}

export default JSONFormatterPage;
