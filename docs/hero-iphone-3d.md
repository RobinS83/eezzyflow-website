# De 3D-iPhone in de hero

Bovenaan de startpagina staat een MacBook met een bordeaux iPhone ervoor. De
MacBook staat stil. De iPhone landt bij het laden, zweeft zachtjes en kantelt
mee met de muis. Op beide toestellen loopt de app, en ze tonen altijd
hetzelfde scherm.

Alles is gewone CSS en een paar kleine React-componenten. Er is geen
3D-bibliotheek, geen video en geen WebGL. Daardoor blijft de pagina licht.

## Wat de bezoeker ziet

| Moment | Wat er gebeurt | Hoe lang |
| --- | --- | --- |
| Pagina laadt | De iPhone komt van onderen, kantelt van 30° naar rechtop en wordt van 88% naar 100% groot | 1,4 s, start na 0,35 s |
| Daarna, altijd | De iPhone zweeft 10 px op en neer, zonder te draaien | 8 s per golf |
| Muis beweegt (computer) | De iPhone draait naar de muis toe: tot 8° links/rechts en 5° voor/achter | volgt binnen 0,7 s |
| Scrollen | De iPhone schuift 60 px omhoog en wordt 12% kleiner terwijl de hero wegschuift | met het scrollen mee |
| Elke 7 seconden | Een ander scherm van de app, op MacBook en iPhone tegelijk | 0,7 s overvloei |
| Vlak voor de wissel | Om de beurt klikt een muisaanwijzer op de MacBook, of verschijnt een gloeiende tik op de tabbalk van de iPhone | 1,6 s vooraf |

Op een gsm of tablet (aanraakscherm) kantelt de iPhone niet mee: er is geen
muis. Landen, zweven en de schermwissel werken wel.

## Waar het staat

| Bestand | Rol |
| --- | --- |
| `components/landing/hero.tsx` | Zet MacBook en iPhone op hun plaats en stapelt de lagen voor de beweging |
| `components/landing/phone-mockup.tsx` | De iPhone zelf: schaduw, dikte, scherm en frame |
| `components/tilt-3d.tsx` | Laat de iPhone naar de muis kantelen |
| `components/screen-cycle.tsx` | Wisselt de schermen en tekent de muisaanwijzer en de tik |
| `components/motion.tsx` | Meet hoe ver de hero weggescrold is (`--hero-p`) |
| `app/globals.css` | Alle animaties en de 3D-opbouw (zoek op `3D phone` en `phone's body`) |
| `assets/iphone-frame-burgundy.webp` | Het frame van de iPhone (980 × 2000 px) |
| `public/screens/<taal>/phone/` | De schermafbeeldingen voor de iPhone |

## Hoe de lagen in elkaar zitten

Elke beweging heeft een eigen laag. Zo zitten de bewegingen elkaar niet in de
weg: een laag die zweeft, hoeft niets te weten van een laag die kantelt.

```
.tilt-stage .hero-out-phone   perspectief (1400px) + wegschuiven bij scrollen
└─ .phone-land                landen bij het laden (één keer)
   └─ Tilt3D (.tilt-body)     kantelen naar de muis
      └─ .tilt-idle           zweven, altijd
         └─ PhoneMockup       de iPhone zelf
```

`perspective: 1400px` op de buitenste laag zorgt dat de draaiing echt diepte
krijgt. Een kleiner getal geeft een sterker, vervormder effect.

## Waarom de iPhone dik lijkt

Een plat plaatje dat draait, ziet eruit als karton. Daarom heeft de iPhone een
lichaam achter het frame (`phone-mockup.tsx`):

1. **Schaduw op de tafel**: een vage ovale vlek, 30 px naar achter
   (`.phone-floor`).
2. **Twaalf lagen**: elk 1 px verder naar achter (`translateZ(-1px)` tot
   `-12px`), in de randkleur van de iPhone (`.phone-body`). Draait de iPhone,
   dan schuiven ze uit elkaar en zie je de zijkant.
3. **Het scherm**: de schermafbeeldingen van de app, precies in het venster
   van het frame (links 5,2%, boven 2,25%, breedte 89,6%, hoogte 95,5%).
4. **Het frame**: de foto van de bordeaux iPhone, bovenop.

De randkleur komt uit twee tokens. Voor de bordeaux iPhone zijn dat:

```css
.phone-burgundy {
  --phone-edge-1: #6b3a44;
  --phone-edge-2: #3a1f25;
}
```

Wil je de iPhone dikker of dunner: verander het aantal lagen (`length: 12`)
in `phone-mockup.tsx`.

## Het kantelen naar de muis

`Tilt3D` luistert naar de muis over de hele pagina. Bij elke beweging rekent
het uit waar de muis staat ten opzichte van het midden van de iPhone, en zet
het twee CSS-variabelen:

```ts
el.style.setProperty("--tilt-y", `${(x * 8).toFixed(2)}deg`);  // links/rechts
el.style.setProperty("--tilt-x", `${(-y * 5).toFixed(2)}deg`); // voor/achter
```

De CSS maakt er een draaiing van, met een zachte vertraging van 0,7 s, zodat de
iPhone de muis rustig volgt in plaats van te schokken:

```css
.tilt-body {
  transform: rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
  transition: transform 0.7s var(--ease-natural);
}
```

De berekening loopt via `requestAnimationFrame`: hooguit één keer per beeld,
zodat het vlot blijft. Sterker of zwakker kantelen: verander `8` en `5`.

## Bewuste keuzes

- **De iPhone staat rechtop als de muis stilstaat.** Een gedraaide iPhone
  toont de tekst op het scherm wazig. Daarom zweeft hij in rust alleen op en
  neer en draait hij pas als de muis beweegt, en dan maar een paar graden.
- **De MacBook beweegt niet.** Twee bewegende toestellen naast elkaar waren
  onrustig, vooral op een gsm.
- **Eén klok voor beide toestellen.** `screen-cycle.tsx` heeft één gedeelde
  klok en één willekeurige volgorde. Zo tonen MacBook en iPhone altijd hetzelfde
  scherm in dezelfde kleuren (grafiet of wijn, licht of donker).
- **Alleen de twee nodige beelden laden.** Van alle schermen staan er telkens
  maar twee in de pagina: het huidige en het volgende.
- **Schermen per taal.** De iPhone toont de schermen van de taal van de
  pagina. Ontbreekt een taal, dan nemen we die van het Nederlands
  (`lib/screens.ts`).

## Toegankelijkheid

- Staat bij de bezoeker "minder beweging" aan (`prefers-reduced-motion`), dan
  landt, zweeft en kantelt de iPhone niet, en blijft het eerste scherm gewoon
  staan.
- De iPhone heeft één beschrijving voor schermlezers (`site.phone.label` in
  `messages/*.json`). De schermafbeeldingen, het frame en de lagen zijn
  verborgen voor schermlezers: ze zijn decoratie.
- De muisaanwijzer en de tik reageren niet op klikken (`pointer-events-none`),
  zodat ze nooit een knop blokkeren.

## Snel aanpassen

| Wat | Waar | Nu |
| --- | --- | --- |
| Hoe lang een scherm blijft | `SHOW_MS` in `screen-cycle.tsx` | 7000 ms |
| Hoe sterk de iPhone kantelt | `x * 8` en `-y * 5` in `tilt-3d.tsx` | 8° en 5° |
| Hoe traag hij de muis volgt | `transition` op `.tilt-body` in `globals.css` | 0,7 s |
| Hoe hoog hij zweeft | `@keyframes phone-sway` in `globals.css` | 10 px, 8 s |
| Het landen | `@keyframes phone-land` in `globals.css` | 30°, 120 px, 1,4 s |
| Dikte | `length: 12` in `phone-mockup.tsx` | 12 px |
| Diepte van het perspectief | `.tilt-stage` in `globals.css` | 1400px |
| Grootte en plaats | klassen op `.tilt-stage` in `hero.tsx` | 36% breed op gsm, 29% vanaf tablet |
| Kleur van de iPhone | `variant` op `PhoneMockup` in `hero.tsx` | `burgundy` (ook `blue`, `orange`) |
