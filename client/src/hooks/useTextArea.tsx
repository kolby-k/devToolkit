import { useEffect, useMemo, useRef, useState } from "react";

function useTextArea() {
  const [text, setText] = useState("");

  const lines = useMemo(() => Math.max(99, text.split("\n").length), [text]);

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  // --- ① autosize whenever `text` changes -----------------------------
  useEffect(() => {
    const ta = textAreaRef.current;
    if (!ta) return;

    ta.style.height = "auto"; // shrink back first (handles deletes)
    ta.style.height = ta.scrollHeight + "px"; // then grow to fit content
  }, [text]);

  return { textAreaRef, text, setText, lines };
}

export default useTextArea;
