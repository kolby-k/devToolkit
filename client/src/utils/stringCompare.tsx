/**
 * Diff two strings while *preserving layout tokens* (spaces + new‑lines).
 *
 *  – All chunks are returned in order so you can render them 1‑for‑1.
 *  – Only “word” tokens participate in the equality test; whitespace
 *    tokens are marked `isEqual = true` so they never highlight.
 */
/* ---------------------------------------------------------
   Types
--------------------------------------------------------- */

export type TokenType = "word" | "ws" | "nl";

export interface DiffToken {
  value: string;
  type: TokenType;
  isEqual: boolean;
  rightStripe?: "s1" | "s2";
}
export interface CompareResult {
  s1: DiffToken[];
  s2: DiffToken[];
}

export interface CompareOptions {
  caseSensitive?: boolean;
  ignorePunctuation?: boolean;
  ignoreLineBreaks?: boolean;
}

/* ---------------------------------------------------------
   Internals
--------------------------------------------------------- */

const SPLIT_RX = /(\r?\n|[ \t]+)/; // keep WS + newlines
const STRIP_RX = /[^\p{L}\p{N}'-]/gu; // “punctuation”

/** Normalise one word according to the chosen options. */
function preprocess(word: string, opts: Required<CompareOptions>): string {
  let out = word;
  if (opts.ignorePunctuation) out = out.replace(STRIP_RX, "");
  if (!opts.caseSensitive) out = out.toLowerCase();
  return out;
}

/* ---------------------------------------------------------
   Tokenise – keep new‑lines as "nl"; we’ll deal with them later
--------------------------------------------------------- */
function tokenize(str: string): DiffToken[] {
  return str
    .split(SPLIT_RX)
    .filter(Boolean)
    .map<DiffToken>((chunk) => {
      if (chunk === "\r\n" || chunk === "\n") {
        return { value: chunk, type: "nl", isEqual: true };
      }
      if (/^[ \t]+$/.test(chunk)) {
        return { value: chunk, type: "ws", isEqual: true };
      }
      return { value: chunk, type: "word", isEqual: false };
    });
}

/* ---------------------------------------------------------
   Skip ONE stray newline (+ any indent spaces) on a side.
   Returns the new index after the skipped run.
--------------------------------------------------------- */
function skipNlAndIndent(tokens: DiffToken[], idx: number): number {
  if (tokens[idx]?.type !== "nl") return idx; // nothing to skip

  tokens[idx++].isEqual = true; // mark newline equal

  /* swallow indent that belongs to that newline */
  while (tokens[idx]?.type === "ws") {
    tokens[idx++].isEqual = true;
  }
  return idx;
}

function stripeFirstUnmatchedNL(
  tokens: DiffToken[],
  side: "s1" | "s2"
): DiffToken[] {
  const out: DiffToken[] = [];

  for (const t of tokens) {
    if (t.type === "nl" && !t.isEqual) {
      const prev = out[out.length - 1];
      if (prev && !prev.rightStripe) {
        prev.rightStripe = side;
        continue; // drop *this* newline
      }
    }
    out.push(t);
  }
  return out;
}

/* ---------------------------------------------------------
   Public API
--------------------------------------------------------- */
export default function stringCompare(
  s1: string,
  s2: string,
  options: CompareOptions
): CompareResult {
  /* ------------ options with defaults --------------------------- */
  const opts: Required<CompareOptions> = {
    caseSensitive: false,
    ignorePunctuation: true,
    ignoreLineBreaks: false,
    ...options,
  };

  /* ------------ tokenise with knowledge of ignoreLineBreaks ----- */
  const tok1 = tokenize(s1);
  const tok2 = tokenize(s2);

  let i = 0;
  let j = 0;

  while (i < tok1.length || j < tok2.length) {
    let a = tok1[i];
    let b = tok2[j];

    /* --- if skipping breaks, fast‑forward past any residual "nl" -- */
    if (opts.ignoreLineBreaks) {
      while (a?.type === "nl") {
        a.isEqual = true;
        a = tok1[++i];
      }
      while (b?.type === "nl") {
        b.isEqual = true;
        b = tok2[++j];
      }
    }

    while (i < tok1.length || j < tok2.length) {
      let a = tok1[i];
      let b = tok2[j];

      console.log("a", a);
      console.log("b", b);

      /* ---------- 1. ignore stray newline on the LEFT ---------------- */
      if (opts.ignoreLineBreaks && a?.type === "nl" && b?.type !== "nl") {
        i = skipNlAndIndent(tok1, i);
        continue; // try the same 'b' against new 'a'
      }

      /* ---------- 2. ignore stray newline on the RIGHT --------------- */
      if (opts.ignoreLineBreaks && b?.type === "nl" && a?.type !== "nl") {
        j = skipNlAndIndent(tok2, j);
        continue; // try the same 'a' against new 'b'
      }

      /* ------------------ end‑of‑stream padding ------------------- */
      if (!a || !b) {
        if (a) a.isEqual = false;
        if (b) b.isEqual = false;
        i++;
        j++;
        continue;
      }

      /* ------------------ word‑vs‑word comparison ------------------ */
      if (a.type === "word" && b.type === "word") {
        const equal = preprocess(a.value, opts) === preprocess(b.value, opts);
        a.isEqual = b.isEqual = equal;
      } else if (a.type === b.type) {
        /* both whitespace or both (non‑ignored) newlines */
        a.isEqual = b.isEqual = true;
      } else {
        a.isEqual = b.isEqual = false;
      }

      i++;
      j++;
    }
  }
  /* ----- if we’re skipping breaks, we’re done -------------------- */
  if (opts.ignoreLineBreaks) {
    return { s1: tok1, s2: tok2 };
  }

  /* ----- otherwise add the stripe information ------------------- */
  return {
    s1: stripeFirstUnmatchedNL(tok1, "s1"),
    s2: stripeFirstUnmatchedNL(tok2, "s2"),
  };
}
