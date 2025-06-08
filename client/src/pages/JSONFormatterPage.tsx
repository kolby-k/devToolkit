import { useMemo, useState } from "react";
import styles from "../styles/JSONFormatter.module.css";
import BackButton from "../components/BackButton";
import Button from "../components/Button";

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
  const lines = useMemo(
    () => (text.split("\n").length < 99 ? 99 : text.split("\n").length),
    [text]
  );

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
