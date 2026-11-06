// Builds messages/<locale>.json from the app's texts (docs/bron-teksten) plus
// the site's own texts (scripts/site-texts.json). Run: npm run sync-texts
import { readFileSync, writeFileSync } from "node:fs";

const locales = ["nl", "fr", "en", "de", "es", "it"];
const site = JSON.parse(readFileSync("scripts/site-texts.json", "utf8"));

for (const locale of locales) {
  const source = JSON.parse(readFileSync(`docs/bron-teksten/${locale}.json`, "utf8"));
  if (!site[locale]) throw new Error(`Missing site texts for ${locale}`);
  const messages = { ...source, site: site[locale] };
  writeFileSync(`messages/${locale}.json`, JSON.stringify(messages, null, 2) + "\n");
}
console.log(`Wrote ${locales.length} message files.`);
