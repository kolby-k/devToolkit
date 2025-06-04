import { useMemo, useState } from "react";
import styles from "../styles/JSONFormatter.module.css";
import BackButton from "../components/BackButton";

const jsonExample = `{
  "name": "John Doe",
  "age": 30,
  "email": "john.doe@example.com",
  "isMember": true,
  "favorites": {
    "color": "blue",
    "food": "pizza"
  },
  "hobbies": ["reading", "gaming", "coding"]
}`;

function JSONFormatterPage() {
  const [text, setText] = useState(jsonExample);
  const lines = useMemo(() => (!text ? 99 : text.split("\n").length), [text]);

  function formatJSON() {
    try {
      const isValid = JSON.parse(text);
      setText(() => JSON.stringify(isValid, null, 3));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div id="page" className={styles.page}>
      <div className={styles.top}>
        <BackButton />
        <h2>JSON Formatter</h2>
        <div className={styles.buttons}>
          <button id="primary-button" onClick={formatJSON}>
            Format JSON
          </button>
          <button id="warning-button" onClick={() => setText("")}>
            Clear
          </button>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.tool}>
          <pre className={styles.gutter}>
            {Array.from({ length: lines }, (_, i) => i + 1).join("\n")}
          </pre>
          <textarea
            name="json-formatter"
            className={styles.textArea}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default JSONFormatterPage;
