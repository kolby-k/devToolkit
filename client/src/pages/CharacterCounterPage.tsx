import { useMemo } from "react";
import BackButton from "../components/BackButton";
import styles from "../styles/CharacterCounter.module.css";
import StatWidget from "../components/StatWidget";
import TextArea from "../components/TextArea";
import useTextArea from "../hooks/useTextarea";

interface Stats {
  characterCount: number;
  wordCount: number;
  longestWord: string;
  mostCommonWord: string;
}

function CharacterCounterPage() {
  const { textAreaRef, text, setText, lines } = useTextArea();

  const stats = useMemo(() => calculateCharacterStats(text), [text]);
  return (
    <div id="page">
      <div className={styles.top}>
        <BackButton />
        <h2>Character Counter</h2>
        <div className={styles.statsContainer}>
          <StatWidget
            value={stats.characterCount}
            label="Number of Characters"
          />
          <StatWidget value={stats.wordCount} label="Number of Words" />
          <StatWidget value={stats.longestWord} label="Longest Word" />
          <StatWidget value={stats.mostCommonWord} label={`Most Common Word`} />
        </div>
      </div>
      <div className={styles.bottom}>
        <TextArea
          textAreaRef={textAreaRef}
          text={text}
          setText={(e) => setText(e.target.value)}
          lineCount={lines}
        />
      </div>
    </div>
  );
}

export default CharacterCounterPage;

function calculateCharacterStats(text: string): Stats {
  const trimmed = text.trim();

  if (!trimmed) {
    return {
      characterCount: 0,
      wordCount: 0,
      longestWord: "-",
      mostCommonWord: "-",
    };
  }

  // Split on any run of whitespace; filters out empty strings.
  const words = trimmed.split(/\s+/);

  const characterCount = trimmed.length;
  const wordCount = words.length;

  // Longest word
  const longestWord = words.reduce(
    (longest, w) => (w.length > longest.length ? w : longest),
    ""
  );

  const freq: Record<string, number> = {};
  for (const w of words) {
    const key = w.toLowerCase();

    freq[key] = (freq[key] || 0) + 1;
  }

  // Find the highest‑frequency entry
  let mostCommonWord = "-";
  if (Object.keys(freq).length) {
    const [word, count] = Object.entries(freq).sort((a, b) => b[1] - a[1])[0]; // top hit

    if (count >= 2) {
      mostCommonWord = `${word} (x ${count})`;
    }
  }

  return { characterCount, wordCount, longestWord, mostCommonWord };
}
