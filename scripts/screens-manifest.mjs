// Lists the app screenshots in public/screens/<locale>/<device>/ into
// lib/screens.generated.json, so the site picks them up without code changes.
import { existsSync, readdirSync, writeFileSync } from "node:fs";

const root = "public/screens";
const locales = ["nl", "fr", "en", "de", "es", "it"];
const devices = ["phone", "desktop"];
const isImage = (f) => /\.(webp|png|jpe?g|avif)$/i.test(f);

const manifest = {};
for (const locale of locales) {
  manifest[locale] = {};
  for (const device of devices) {
    const dir = `${root}/${locale}/${device}`;
    manifest[locale][device] = existsSync(dir)
      ? readdirSync(dir).filter(isImage).sort().map((f) => `/screens/${locale}/${device}/${f}`)
      : [];
  }
}
writeFileSync("lib/screens.generated.json", JSON.stringify(manifest, null, 2) + "\n");
const count = Object.values(manifest).flatMap((d) => Object.values(d)).flat().length;
console.log(`Listed ${count} screenshots.`);
