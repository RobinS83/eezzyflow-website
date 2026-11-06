# eezzyflow merkpakket "Champagne" — assets voor VS Code

Merk definitief gekozen (optie F): grafiet basis + champagne-verloop.

## Kleuren
- Grafiet 900: `#202025` (basis / "eezzy" / icoon-bg) · Grafiet 600: `#3E3E46`
- Champagne-verloop (160°): `#FBF3E6` → `#F4D9AC` (55%) → `#E9A65C`
- Amber 700: `#B0803C` ("flow" op licht, tekst op tint)
- Spotlight (icoon-bg): radial 30%/25%: `#3E3E46` → `#202025` (60%) → `#121214`
- Glyph: verlaagde "e", Inter ExtraBold (800)

## Mappen
### ios/
- `AppIcon-1024.png` — Xcode single-size app icon (standaard)
- `AppIcon-dark-1024.png` / `AppIcon-tinted-1024.png` — iOS 18 dark & tinted varianten
- `AppIcon-{40…192}.png` — losse maten voor oudere asset-catalogi

### android/
- `playstore-512.png` — Play Store listing
- `adaptive-foreground-432.png` + `adaptive-background-432.png` — adaptive icon (fg glyph in safe zone, bg Spotlight)
- `mipmap-*/ic_launcher.png` — legacy launcher-iconen per density (48–192)

### web/ (PWA / Capacitor)
- `apple-touch-icon-180.png`, `icon-192.png`, `icon-512.png` (manifest), `favicon-32.png`, `favicon-64.png`

### logo/
- `logo-licht.png` — grafiet wordmark + champagne "flow", voor lichte achtergronden
- `logo-donker.png` — ivoor wordmark, voor donkere achtergronden

### svg/ (bron, oneindig schaalbaar)
- `app-icon.svg`, `logo-licht.svg`, `logo-donker.svg` — vereisen Inter (800) als geïnstalleerd/webfont; PNG's zijn al gerasterd met Inter

### extra/
- `AppIcon-champagne-invers-1024.png` — inverse variant, enkel marketing (niet als OS-icoon)

## Capacitor-integratie (Next.js/Capacitor project)
1. Kopieer deze map naar `resources/` in je projectroot.
2. `npm install -D @capacitor/assets`
3. Zet `resources/icon-only.png` = `ios/AppIcon-1024.png`, dan: `npx capacitor-assets generate`
   (of gebruik de losse maten hierboven handmatig in Xcode / Android Studio).
4. Web: verwijs in `manifest.json` naar `web/icon-192.png` en `web/icon-512.png`; favicon uit `web/`.

## Regels
- Champagne altijd als verloop, nooit plat (wordt beige).
- Verloop altijd licht linksboven → amber rechtsonder.
- In de app volgen knoppen/accenten het gekozen thema (Wijnrood & Zand of Grafiet & Citrus); het merk verschijnt enkel in logo, icoon en splash.
- Splash: Spotlight-achtergrond, icoon gecentreerd op ~40% hoogte, wordmark eronder.

Bron-specificatie: `eezzyflow Merkpakket Champagne.dc.html` in het designproject.
