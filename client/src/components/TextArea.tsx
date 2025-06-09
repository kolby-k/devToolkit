type Props = {
  textAreaRef: React.RefObject<HTMLTextAreaElement | null>;
  text: string;
  setText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  lineCount: number;
  styles?: React.CSSProperties;
};

export default function TextArea({
  textAreaRef,
  text,
  setText,
  lineCount,
  styles = {},
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        overflow: "hidden",
        marginTop: "20px",
        justifyContent: "center",
        ...styles,
      }}
    >
      <pre id="gutter">
        {Array.from({ length: lineCount }, (_, i) => (
          <span key={i}>
            {i + 1}
            {i + 1 < lineCount ? "\n" : ""}
          </span>
        ))}
      </pre>
      <textarea
        ref={textAreaRef}
        name="character-counter"
        value={text}
        onChange={setText}
      />
    </div>
  );
}
