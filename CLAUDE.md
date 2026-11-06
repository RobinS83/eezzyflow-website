# eezzyflow-website — projectregels

De publieke website van eezzyflow op **eezzyflow.com**. De app zelf staat in
een andere repo (`robins83/eezzyflow`) en draait op **app.eezzyflow.com**.
Website en app blijven gescheiden: eigen code, eigen deploy. Een fout op de
website mag de app nooit raken.

## Eerst lezen

1. [docs/website-stijlgids.md](docs/website-stijlgids.md): kleuren,
   lettertype, vormen, paginaopbouw en toon. Alles komt uit de app; volg het
   zodat site en app één merk zijn.
2. [brand/merkpakket-champagne/LEESMIJ.md](brand/merkpakket-champagne/LEESMIJ.md):
   logo's, iconen en favicons. Waar de stijlgids `docs/brand/merkpakket-champagne/`
   noemt (het pad in de app-repo), staat het hier in `brand/merkpakket-champagne/`.
3. [docs/bron-teksten/](docs/bron-teksten/): de teksten van de landingspagina
   (`landing`) en de abonnementen (`pricing`) uit de app, in zes talen. Gebruik
   ze als vertrekpunt, zodat site en app hetzelfde zeggen.

## Taal

UI en gesprek in het Nederlands (Belgisch: "gsm", "je"). Code en commits in
het Engels. Zes talen: nl (standaard), fr, en, de, es, it. Geen
hardgecodeerde teksten: alles via `messages/*.json` (next-intl).

## Stack

Next.js (App Router) + Tailwind 4 + next-intl, zoals de app. Statisch waar
het kan. Geen database, geen login, geen API-sleutels op de site.

## Wat je nooit doet

- **Geen trackers**: geen Google Analytics, geen Meta-pixel, geen cookies, dus
  ook geen cookiebanner. Fonts zelf hosten via `next/font`.
- **Geen hexcodes in componenten.** Gebruik de tokens uit de stijlgids.
- **Geen informatie die alleen met kleur wordt overgebracht.**
- **Geen prijzen verzinnen.** Robin legt de bedragen vast. Tot dan: "Nu gratis
  tijdens de testfase".
- **Geen beloftes die de app niet waarmaakt.** Wat de app kan, staat in
  `docs/bron-teksten/nl.json` → `pricing.features`.
- **Niets aan de domeinen of DNS veranderen** zonder dat Robin erom vraagt.
  `eezzyflow.com` en `eezzyflow.be` staan bij GoDaddy.

## Links naar de app

- Aanmelden: `https://app.eezzyflow.com/aanmelden`
- Registreren: `https://app.eezzyflow.com/registreren`
- Privacy: `https://app.eezzyflow.com/privacy`
- Voorwaarden: `https://app.eezzyflow.com/voorwaarden`

De app zet de taal niet in de URL; ze volgt de browser en de keuze in de app.

Store-links (App Store, Google Play) bestaan nog niet: de app staat nog niet
in de stores. Zet ze in één bestand (`lib/links.ts`); tot ze er zijn, wijzen
de knoppen naar `https://app.eezzyflow.com`.

## Verifiëren, niet aannemen

Draai `npm run typecheck && npm run lint && npm run build` voordat je iets af
noemt. Maak screenshots van elke pagina in licht én donker, op gsm- en
computerbreedte. Beweer nooit dat iets werkt als je het niet gecontroleerd
hebt.

## Werken op main

Tot de site live is: rechtstreeks op `main` werken en pushen. Robin bekijkt
elke wijziging zelf.

## Hosting

Vercel, EU-regio (`fra1`), een eigen project naast dat van de app. Robin
koppelt `eezzyflow.com` zelf wanneer de site klaar is.
