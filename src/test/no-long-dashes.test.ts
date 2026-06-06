import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOTS = ["src", "index.html"];
const LONG_DASH_RE = /[\u2014\u2013\u2212\u2012]/; // — – − ‒
const ALLOWED_EXT = /\.(tsx?|jsx?|html|css|md|json)$/;
const SKIP_DIRS = new Set(["node_modules", "dist", ".git"]);

function walk(p: string, out: string[] = []): string[] {
  const st = statSync(p);
  if (st.isFile()) {
    if (ALLOWED_EXT.test(p)) out.push(p);
    return out;
  }
  for (const entry of readdirSync(p)) {
    if (SKIP_DIRS.has(entry)) continue;
    walk(join(p, entry), out);
  }
  return out;
}

describe("no long dashes in source", () => {
  it("source files use only '-' (no — – − ‒)", () => {
    const offenders: string[] = [];
    for (const root of ROOTS) {
      try {
        for (const file of walk(root)) {
          // skip this test file itself
          if (file.endsWith("no-long-dashes.test.ts")) continue;
          const content = readFileSync(file, "utf-8");
          const lines = content.split("\n");
          lines.forEach((line, i) => {
            if (LONG_DASH_RE.test(line)) {
              offenders.push(`${relative(process.cwd(), file)}:${i + 1}: ${line.trim().slice(0, 120)}`);
            }
          });
        }
      } catch {
        /* root missing - ignore */
      }
    }
    expect(offenders, `Found long dashes:\n${offenders.join("\n")}`).toEqual([]);
  });
});
