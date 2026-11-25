import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Worst AI Advice: The 48-Hour Tight Line Open.
// One line, at most 140 characters, of the worst advice an AI
// could give. The judge weighs, most of all, whether the line
// delivers bad advice that is specific enough to follow, then
// funniness, tightness, AI voice and concreteness.
// Why this one: deleting System32 is the canonical piece of
// catastrophic computer advice — specific, actionable, and
// instantly regrettable. The "Certainly!" opener and the tidy
// justification ("just leftover files Windows doesn't need")
// are exactly how a confident AI assistant would sell it,
// and the payoff ("free up gigabytes") is the bait that makes
// a reader wince and laugh at once.
const LINE =
  "Certainly! Delete the System32 folder to speed up your PC — it’s just leftover files Windows doesn’t need, and you’ll free up gigabytes.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read back and verify: the gate requires 1-140 characters of
// non-whitespace UTF-8 text, a single line, no trailing newline
// and nothing else attached.
if (LINE.length < 1 || LINE.length > 140 || LINE.trim().length === 0) {
  throw new Error(`line fails the gate: ${JSON.stringify(LINE)}`);
}
if (LINE.includes("\n")) {
  throw new Error("line must be a single line");
}
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error(
    `entry.txt mismatch: expected ${JSON.stringify(LINE)}, got ${JSON.stringify(written)}`,
  );
}
console.log(`wrote ${LINE.length} chars to /output/entry.txt: ${LINE}`);
