# eezzyflow-website

De website van **eezzyflow**: *Samen vlot. Voor wat écht telt.*

Komt op [eezzyflow.com](https://eezzyflow.com). De app zelf draait op
[app.eezzyflow.com](https://app.eezzyflow.com) en staat in een eigen repo.

## Wat hier staat

| Map | Inhoud |
|---|---|
| `CLAUDE.md` | Projectregels |
| `docs/website-stijlgids.md` | Kleuren, lettertype, vormen, opbouw en toon, uit de app |
| `docs/bron-teksten/` | Teksten van de landingspagina en de abonnementen, in zes talen |
| `brand/merkpakket-champagne/` | Logo's, app-iconen en favicons |

| `app/`, `components/`, `lib/`, `i18n/` | De site (Next.js App Router, Tailwind 4, next-intl) |
| `messages/` | Teksten per taal, gemaakt door `npm run sync-texts` |
| `scripts/site-texts.json` | Teksten die alleen op de site staan, in zes talen |
| `lib/links.ts` | Alle links naar de app en (later) de stores |
| `lib/plans.ts` | Welke functies bij Gratis, Plus en Gezin horen |

## Werken

```bash
npm install
npm run dev
```

Na een wijziging in `docs/bron-teksten/` of `scripts/site-texts.json`:
`npm run sync-texts`. Voor je pusht:
`npm run typecheck && npm run lint && npm run build`.

De build is een statische export in `out/` (Netlify, zie `netlify.toml`).
Bekijk ze lokaal met `npx serve out`.
