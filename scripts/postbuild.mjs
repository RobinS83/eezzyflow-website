// The static export writes Dutch to out/nl.html. Dutch is the default and
// lives at "/", so move it to out/index.html and drop the /nl copy.
import { existsSync, renameSync, rmSync } from "node:fs";

const out = "out";
if (!existsSync(`${out}/nl.html`)) throw new Error("out/nl.html not found: did the build run?");
renameSync(`${out}/nl.html`, `${out}/index.html`);
for (const p of [`${out}/nl.txt`, `${out}/nl`]) rmSync(p, { recursive: true, force: true });
console.log("Moved Dutch to out/index.html");
