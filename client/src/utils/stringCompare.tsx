/**
 * Compares two strings word by word and returns match information for each.
 *
 * Both input strings are normalized by trimming, collapsing whitespace, stripping
 * most punctuation (except apostrophes and hyphens), and then split into word arrays.
 * Each word is compared (case-insensitively) against the corresponding word
 * in the other string, up to the length of the shorter list.
 *
 * @param s1 - The first input string to compare.
 * @param s2 - The second input string to compare.
 * @returns An object with two arrays, `s1` and `s2`, each containing
 *          `{ word: string; isEqual: boolean }` entries indicating
 *          whether that word matched the word at the same position
 *          in the other string.
 *
 * @example
 * ```ts
 * const stringOne = "hello there sir, how are you?";
 * const stringTwo = "Hello there dude how are you? there";
 * const result = stringCompare(stringOne, stringTwo);
 * console.log(result);
 * // {
 * //   s1: [
 * //     { word: "hello", isEqual: true },
 * //     { word: "there", isEqual: true },
 * //     { word: "sir",   isEqual: false },
 * //     // ...
 * //   ],
 * //   s2: [
 * //     { word: "Hello", isEqual: true },
 * //     { word: "there", isEqual: true },
 * //     { word: "dude",  isEqual: false },
 * //     // ...
 * //   ]
 * // }
 * ```
 */

type WordMatch = { word: string; isEqual: boolean };
export interface CompareResult {
  s1: WordMatch[];
  s2: WordMatch[];
}

function stringCompare(s1: string, s2: string): CompareResult {
  // 1. Helper: normalise a string into an array of words
  const tokenize = (str: string) => str.trim().split(/\s+/); // collapse whitespace
  //   .map(
  //     (w) => w.replace(/[^\p{L}\p{N}'-]/gu, "") // strip punctuation except apostrophes/hyphens
  //   );

  const w1 = tokenize(s1);
  const w2 = tokenize(s2);

  // 2. Pre‑fill the result objects
  const res1: WordMatch[] = w1.map((word) => ({ word, isEqual: false }));
  const res2: WordMatch[] = w2.map((word) => ({ word, isEqual: false }));

  // 3. Compare up to the shorter word list
  const len = Math.min(w1.length, w2.length);
  for (let i = 0; i < len; i++) {
    const equal = w1[i].toLowerCase() === w2[i].toLowerCase(); // case‑insensitive
    res1[i].isEqual = equal;
    res2[i].isEqual = equal;
  }

  return { s1: res1, s2: res2 };
}

export default stringCompare;
