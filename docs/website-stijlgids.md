# eezzyflow.com — stijlgids voor de website

Voor wie de website bouwt (een nieuwe Claude-sessie in een eigen repo). Alles
hieronder komt uit de app op app.eezzyflow.com, zodat site en app één merk
zijn. Bijgewerkt op 7 november 2026.

> In deze repo staat het merkpakket in `brand/merkpakket-champagne/` en de
> teksten van de app in `docs/bron-teksten/`. De paden hieronder verwijzen
> naar de app-repo.

Bronnen in de app-repo (`robins83/eezzyflow`), om na te kijken bij twijfel:

- `app/globals.css` — alle kleurtokens, schaduwen, `.tile`
- `lib/brand.ts` — merkkleuren, naam, slogan
- `docs/brand/merkpakket-champagne/` — logo's, iconen, favicons
- `components/landing/landing-page.tsx` + `messages/*.json` → `landing` — de
  bestaande landingspagina in de app: opbouw, teksten en toon. Goed
  vertrekpunt.

> De oude `docs/brand/brandsheet.md` (teal en koraal) is **verouderd**. Niet
> gebruiken.

---

## 1. Afspraken vooraf

- **Eigen repo, eigen deploy.** Geen code delen met de app; kopieer wat je
  nodig hebt. Een fout op de site mag de app nooit raken.
- **Stack:** Next.js (App Router) + Tailwind 4, zoals de app. Statisch waar
  het kan. Geen database, geen login op de site.
- **Talen:** dezelfde zes als de app: Nederlands (standaard), Frans, Engels,
  Duits, Spaans, Italiaans. Teksten in `messages/*.json` (next-intl), nooit
  hardgecodeerd. Belgisch Nederlands: "gsm", "je", geen "mobieltje".
- **Domeinen:** `eezzyflow.com` = website. `eezzyflow.be` stuurt door naar de
  website. `app.eezzyflow.com` = de app. Niets aan de DNS veranderen zonder
  Robin.
- **Privacy:** geen trackers, geen Google Analytics, geen cookiebanner nodig
  omdat er geen cookies zijn. Fonts zelf hosten (`next/font`), niet via
  Google laden. Hosting in de EU (Vercel, regio `fra1`).

## 2. Merk

| | |
|---|---|
| Naam | **eezzyflow**, altijd met kleine letters, ook aan het begin van een zin |
| Slogan | **Samen vlot. Voor wat écht telt.** |
| Kernzin | Twee huizen. Eén plek voor alles rond je kind. |
| Beschrijving | Verblijfskalender, kosten, berichten en documenten: rustig, veilig en in Europa gehost. |

### Woordmerk

"eezzy" in grafiet, "flow" in amber. Inter ExtraBold (800), letterafstand
licht negatief.

| | Op licht | Op donker |
|---|---|---|
| eezzy | `#202025` | `#FBF3E6` (ivoor) |
| flow | `#B0803C` (amber 700) | `#E9A65C` |

Gebruik bij voorkeur de bestanden uit `docs/brand/merkpakket-champagne/`:

- `logo/logo-licht.png` / `svg/logo-licht.svg` — voor lichte achtergronden
- `logo/logo-donker.png` / `svg/logo-donker.svg` — voor donkere
- `web/favicon-32.png`, `favicon-64.png`, `apple-touch-icon-180.png`,
  `icon-192.png`, `icon-512.png`
- `ios/AppIcon-1024.png` — app-icoon, voor store-afbeeldingen en mock-ups

De SVG's vragen Inter 800 als webfont; de PNG's zijn al gerasterd.

### Champagne

Het merkverloop. **Altijd als verloop, nooit plat** (plat wordt het beige).
Altijd licht linksboven, amber rechtsonder.

```css
--brand-champagne: linear-gradient(160deg, #FBF3E6 0%, #F4D9AC 55%, #E9A65C 100%);
--brand-spotlight: radial-gradient(circle at 30% 25%, #3E3E46 0%, #202025 60%, #121214 100%);
```

Spotlight is de donkere achtergrond van het app-icoon en het opstartscherm.

## 3. Kleuren

De website volgt het thema **Grafiet & Citrus**, het standaardthema van de
app (de app heeft ook Wijnrood & Zand; dat hoeft de site niet). Licht én
donker, via `prefers-color-scheme`.

Twee soorten kleuren, bewust gescheiden:

- **Vlakkleuren** (achtergronden, chips, knoppen) zijn de merkkleuren zelf.
- **Tekstkleuren** (`-text`) zijn donkerder of lichter, zodat kleine tekst
  WCAG AA haalt (4,5:1). Citrus `#F28C3B` als tekst op wit haalt maar 2,4:1:
  gebruik `--highlight-text` voor tekst.

Plak dit in `app/globals.css` van de site:

```css
@import "tailwindcss";

/* Licht */
:root {
  --radius-card: 18px;
  --radius-item: 14px;
  --radius-control: 11px;
  --ease-natural: cubic-bezier(0.32, 0.72, 0, 1);

  --desk: #ececea;
  --paper: #f8f8f6;          /* paginaachtergrond */
  --surface: #ffffff;        /* kaarten */
  --line: #e3e3e1;
  --ink: #212126;            /* hoofdtekst */
  --sub: #5e5e66;            /* secundaire tekst */

  --primary: #4c4c55;        /* knoppen */
  --primary-text: #34343b;
  --on-primary: #ffffff;
  --primary-soft: #f0f0f1;
  --primary-chip: #dedee0;
  --primary-chip-text: #34343b;

  --highlight: #f28c3b;      /* citrus: stipjes, balken, accentvlakken */
  --highlight-text: #b25c14; /* citrus als tekst: 4,7:1 op wit */
  --highlight-soft: #feeedd;
  --highlight-chip: #ffc896;
  --highlight-chip-text: #874509;

  --success: #3baf7a;  --success-text: #1e7d53;  --success-soft: #e6f5ee;
  --warning: #e0a44e;  --warning-text: #a06a15;  --warning-soft: #fdf1e3;
  --error:   #d5615a;  --error-text:   #b8443c;  --error-soft:   #fbeae9;

  --hero: linear-gradient(135deg, #dedee0 0%, #efe0cc 55%, #f0b98c 100%);
  --hero-ink: #202025;
  --hero-sub: #34343b;
  --hero-cost: linear-gradient(135deg, #6a6a76, #34343b); /* donker CTA-vlak */
  --screen-header: #f0f0ee;

  --brand-wordmark: #202025;
  --brand-wordmark-accent: #b0803c;
  /* Accent van koppen en het "eyebrow"-woord: bij grafiet het citrus. */
  --landing-accent: var(--highlight-text);

  --tile-line: rgb(23 23 28 / 0.08);
  --tile-sheen: linear-gradient(180deg, rgb(255 255 255 / 0.9) 0%, rgb(23 23 28 / 0.014) 100%);
  --shadow-tile:
    0 1px 1.5px rgb(23 23 28 / 0.05), 0 4px 8px -3px rgb(23 23 28 / 0.07),
    0 14px 26px -12px rgb(23 23 28 / 0.14);
  --shadow-tile-lift:
    0 2px 3px rgb(23 23 28 / 0.06), 0 10px 18px -5px rgb(23 23 28 / 0.1),
    0 28px 44px -18px rgb(23 23 28 / 0.2);
  --shadow-tile-press: inset 0 1px 3px rgb(23 23 28 / 0.1);

  color-scheme: light;
}

/* Donker */
@media (prefers-color-scheme: dark) {
  :root {
    --desk: #0a0a0b;
    --paper: #121214;
    --surface: #18181b;
    --line: #38383e;
    --ink: #f1f1f3;
    --sub: #a2a2aa;

    --primary: #b9b9c4;
    --primary-text: #c9c9d4;
    --on-primary: #121214;
    --primary-soft: #33333c;
    --primary-chip: #33333c;
    --primary-chip-text: #c9c9d4;

    --highlight: #ffb273;
    --highlight-text: #ffb273;
    --highlight-soft: #4a2e12;
    --highlight-chip: #4a2e12;
    --highlight-chip-text: #ffb273;

    --success: #5fd3a0;  --success-text: #5fd3a0;  --success-soft: #1c3f33;
    --warning: #e0a44e;  --warning-text: #e0c285;  --warning-soft: #4a3a1e;
    --error:   #e8827b;  --error-text:   #e8827b;  --error-soft:   #4a2320;

    --hero: linear-gradient(160deg, #26262e, #121214);
    --hero-ink: #f1f1f3;
    --hero-sub: #a2a2aa;
    --hero-cost: linear-gradient(135deg, #33333c, #26262e);
    --screen-header: #18181b;

    --brand-wordmark: #fbf3e6;
    --brand-wordmark-accent: #e9a65c;

    --tile-line: rgb(255 255 255 / 0.09);
    --tile-sheen: linear-gradient(180deg, rgb(255 255 255 / 0.055) 0%, rgb(255 255 255 / 0) 42%);
    --shadow-tile:
      0 1px 2px rgb(0 0 0 / 0.55), 0 10px 24px -10px rgb(0 0 0 / 0.75),
      inset 0 1px 0 rgb(255 255 255 / 0.06);
    --shadow-tile-lift:
      0 2px 4px rgb(0 0 0 / 0.6), 0 18px 36px -12px rgb(0 0 0 / 0.85),
      inset 0 1px 0 rgb(255 255 255 / 0.09);
    --shadow-tile-press: inset 0 1px 4px rgb(0 0 0 / 0.6);

    color-scheme: dark;
  }
}

/* Tailwind-namen, zodat je bg-paper, text-ink, text-sub… kunt schrijven. */
@theme inline {
  --color-paper: var(--paper);
  --color-surface: var(--surface);
  --color-line: var(--line);
  --color-ink: var(--ink);
  --color-sub: var(--sub);
  --color-primary: var(--primary);
  --color-primary-text: var(--primary-text);
  --color-on-primary: var(--on-primary);
  --color-primary-soft: var(--primary-soft);
  --color-primary-chip: var(--primary-chip);
  --color-primary-chip-text: var(--primary-chip-text);
  --color-highlight: var(--highlight);
  --color-highlight-text: var(--highlight-text);
  --color-highlight-soft: var(--highlight-soft);
  --color-highlight-chip: var(--highlight-chip);
  --color-highlight-chip-text: var(--highlight-chip-text);
  --color-success-text: var(--success-text);
  --color-error-text: var(--error-text);
  --color-hero-ink: var(--hero-ink);
  --color-hero-sub: var(--hero-sub);
  --color-brand-wordmark: var(--brand-wordmark);
  --color-brand-wordmark-accent: var(--brand-wordmark-accent);
  --color-landing-accent: var(--landing-accent);
  --radius-card: var(--radius-card);
  --radius-item: var(--radius-item);
  --radius-control: var(--radius-control);
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
}

body {
  background: var(--paper);
  color: var(--ink);
}

/* De tegel: hét bouwblok van de app. Wit vlak, haarlijn, zachte schaduw. */
@layer components {
  .tile {
    background-color: var(--surface);
    background-image: var(--tile-sheen);
    border: 1px solid var(--tile-line);
    box-shadow: var(--shadow-tile);
  }
  .tile-lift { box-shadow: var(--shadow-tile-lift); }
  .tile-tap {
    transition:
      box-shadow 0.18s var(--ease-natural),
      transform 0.18s var(--ease-natural);
  }
  @media (hover: hover) {
    .tile-tap:hover { box-shadow: var(--shadow-tile-lift); transform: translateY(-1px); }
  }
  .tile-tap:active { box-shadow: var(--shadow-tile-press); transform: translateY(0.5px); }
}
```

**Regels:**

- Geen hexcodes in componenten: altijd de tokens.
- Citrus spaarzaam: stipjes, één accentwoord, kleine balken. Nooit grote
  vlakken citrus, nooit als knopkleur.
- Nooit een verloop onder lopende tekst. De hero mag `--hero` hebben, met
  `--hero-ink` erop.
- Nooit informatie alleen met kleur. `primary` en `sub` liggen in donker maar
  1,3:1 uit elkaar: een actieve toestand krijgt ook een vorm (onderlijn,
  vulling, vet).

## 4. Typografie

- **Inter** (variabel), via `next/font/google` met `variable: "--font-inter"`,
  `subsets: ["latin"]`, `display: "swap"`. Next host het zelf; er gaat geen
  verzoek naar Google.
- Kopteksten strak: negatieve letterafstand, korte regelhoogte.

| Rol | Tailwind (zoals op de landingspagina in de app) |
|---|---|
| Hero-titel | `text-[clamp(28px,4vw,44px)] leading-[1.1] font-extrabold tracking-[-0.03em]` |
| Sectietitel | `text-[clamp(24px,3vw,32px)] leading-[1.2] font-bold tracking-[-0.02em]` |
| Kaarttitel | `text-xl leading-[1.2] font-bold tracking-[-0.02em]` of `text-[15.5px] font-bold` |
| Eyebrow (boven een titel) | `text-xs font-bold tracking-[0.08em] uppercase text-landing-accent` |
| Lopende tekst | `text-[15px] leading-relaxed text-ink`; secundair `text-sub` |
| Klein | `text-[13px] text-sub` |

## 5. Vormen en ruimte

| | |
|---|---|
| Kaart | `rounded-[18px]` (`--radius-card`), klasse `.tile` |
| Kleinere tegel / lijstregel | `rounded-[14px]` (`--radius-item`) |
| Knop, invoerveld | `rounded-[11px]` (`--radius-control`) |
| Grote CTA-blokken | `rounded-[32px]` met `bg-(image:--hero-cost)` en `text-on-primary` (donker: `text-ink`) |
| Pil | `rounded-full` |
| Zijmarge op gsm | 18px (`px-[18px]`) |
| Raak-doel | minstens 44 × 44 px |
| Beweging | `--ease-natural`, 180 ms. Respecteer `prefers-reduced-motion`. |

## 6. Bouwstenen

- **Knop, hoofdactie:** `bg-primary text-on-primary rounded-[11px] h-11 px-6 font-semibold`. Hover iets donkerder; focus met een zichtbare ring.
- **Knop, tweede actie:** omlijnd: `border border-line bg-surface text-ink`.
- **Pil in de hero:** `rounded-full bg-white/70 px-3 py-1 text-[13px]` met een citrus stipje (`size-2 rounded-full bg-highlight`) ervoor.
- **Functiekaart:** `.tile rounded-[18px] p-5` met een icoon (lucide-react, 20–22 px, `aria-hidden`), titel en twee regels uitleg.
- **Telefoon-mock-up:** de app toont er een op de landingspagina (`w-[300px] rounded-t-[38px] bg-ink`), met een echt Home-scherm erin. Liever een echte schermafbeelding van de app (licht én donker) dan een verzonnen ontwerp.
- **Iconen:** lucide-react, lijndikte standaard. Geen emoji als icoon.

## 7. Paginaopbouw (voorstel)

1. **Kop:** woordmerk links; rechts Functies · Hoe het werkt · Prijzen ·
   Vragen; knop **Aanmelden** (naar `https://app.eezzyflow.com/aanmelden`).
   Op gsm een menuknop.
2. **Hero** op `--hero`: pil "Voor elk gezin, hoe het ook georganiseerd is",
   titel "Samen regelen. Eén flow.", korte inleiding, twee store-knoppen
   (App Store, Google Play) en een telefoon met de app.
3. **Voor wie:** apart wonen (co-ouderschap), samen onder één dak,
   samengesteld gezin. Elk een tegel.
4. **Functies:** kalender met wissels, kosten met saldo, berichten die
   niemand kan wijzigen, documenten, lijstjes en weekmenu, meekijkers.
5. **Hoe het werkt:** drie stappen: download, maak je gezin aan, nodig de
   andere ouder uit.
6. **Veilig en privé:** gehost in Europa, geen reclame, geen verkoop van
   gegevens, twee-stapsverificatie, de andere ouder ziet nooit je eigen adres
   of saldo als je dat niet wilt.
7. **Prijzen:** Gratis, Plus, Gezin. Namen en wat erin zit staan in de app
   onder `messages/nl.json` → `pricing`. **Geen bedragen verzinnen**: Robin
   legt de prijzen vast. Zolang er geen prijs is: "Nu gratis tijdens de
   testfase".
8. **Vragen** (FAQ): overnemen uit `pricing.faq` en `landing` in de app.
9. **Slot-CTA** op `--hero-cost`: "Begin vandaag" + store-knoppen.
10. **Voet:** Privacy · Voorwaarden · Contact · taalkeuze. De teksten van
    privacy en voorwaarden staan in de app op `/privacy` en `/voorwaarden`;
    link daarheen tot de site ze zelf heeft.

## 8. Store-knoppen

De app staat nog niet in de stores. Bouw de knoppen wel, met de officiële
badges van Apple en Google (hun regels: niet hertekenen, niet herkleuren),
en zet de links in één bestand (`lib/links.ts`) zodat ze later één keer
ingevuld worden. Tot dan wijst een knop naar `https://app.eezzyflow.com`.

## 9. Toon

Uit de app, en dat geldt voor de site net zo:

- **Rustig en menselijk.** Geen uitroeptekens, geen marketingschreeuw, geen
  "revolutionair". Korte zinnen.
- **Neutraal tussen ouders.** Nooit "je ex" in koppen; "de andere ouder".
  Geen kant kiezen, geen conflict aanwakkeren. Nooit roze/blauw voor
  vader/moeder.
- **Eerlijk.** Alleen beloven wat de app vandaag doet.
- **Je**, niet u (in het Frans: vous; Duits: du; Spaans: tú; Italiaans: tu,
  zoals in de app).

## 10. Toegankelijkheid en kwaliteit

- WCAG 2.2 AA: contrast, zichtbare focus, labels, alt-teksten, toetsenbord.
- Licht én donker: screenshots van elke pagina in beide, vóór je iets af
  noemt.
- Snel: statisch genereren, afbeeldingen via `next/image`, geen zware
  scripts. Doel: Lighthouse 95+ op gsm.
- SEO: per taal een eigen URL (`/fr`, `/en`…), `hreflang`, Open Graph-
  afbeelding met het woordmerk op champagne.
- Controles vóór elke push: `npm run typecheck && npm run lint && npm run build`.
