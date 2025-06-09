import { useEffect, useRef, useState } from "react";

export default function useTextArea(minLines = 99) {
  const [text, setText] = useState("");
  const [lines, setLines] = useState(minLines);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const ta = textAreaRef.current;
    if (!ta) return;

    /* ---------- autosize ----------- */
    ta.style.height = "auto"; // reset
    ta.style.height = ta.scrollHeight + "px";

    /* ---------- count visible lines ----------- */
    const computed = getComputedStyle(ta);
    // `line-height` may be "normal" → fall back to font‑size * 1.2
    const lh =
      parseFloat(computed.lineHeight) || parseFloat(computed.fontSize) * 1.2;

    const visualLines = Math.ceil(ta.scrollHeight / lh);
    setLines(Math.max(minLines, visualLines));
  }, [text, minLines]);

  return { textAreaRef, text, setText, lines };
}
