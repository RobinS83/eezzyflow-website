// The static export writes Dutch under out/nl. Dutch is the default and lives
// at the root, so move out/nl.html to out/index.html and out/nl/* to out/*.
import { existsSync, readdirSync, renameSync, rmSync } from "node:fs";

const out = "out";
if (!existsSync(`${out}/nl.html`)) throw new Error("out/nl.html not found: did the build run?");
renameSync(`${out}/nl.html`, `${out}/index.html`);
if (existsSync(`${out}/nl`)) {
  for (const f of readdirSync(`${out}/nl`)) {
    if (f.endsWith(".html")) renameSync(`${out}/nl/${f}`, `${out}/${f}`);
  }
}
for (const p of [`${out}/nl.txt`, `${out}/nl`]) rmSync(p, { recursive: true, force: true });
console.log("Moved Dutch to the root of out/");
