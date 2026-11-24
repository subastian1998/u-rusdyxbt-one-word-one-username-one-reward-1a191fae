// One Word, One Username, One Reward — make.fun entry.
// The entry is the entrant's own make.fun handle, one word, nothing else.
// Gate (RULES.txt): /output/entry.txt must be UTF-8 text of 1 to 30
// characters, not only white space.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY = "dayak1998";

function validateEntry(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > 30) {
    throw new Error(`entry must be 1-30 characters, got ${chars.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (/\s/.test(text)) {
    throw new Error("entry must be a single word with no spaces");
  }
}

validateEntry(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
// Post-write byte check: what landed on disk must be exactly ENTRY.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("post-write check failed: file content differs from ENTRY");
}
console.log(`entry written: ${[...ENTRY].length} chars, valid`);
