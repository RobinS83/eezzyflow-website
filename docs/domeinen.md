# Domeinen: eezzyflow.com en eezzyflow.be

Doel: wie `eezzyflow.com`, `www.eezzyflow.com`, `eezzyflow.be` of
`www.eezzyflow.be` intikt, komt op **https://eezzyflow.com**. De app blijft
op `app.eezzyflow.com` (Vercel) en daar verandert niets aan.

De doorverwijzingen staan al in `netlify.toml`. Ze werken pas wanneer de
domeinen aan de Netlify-site gekoppeld zijn. Doe dat pas wanneer de site live
mag (bij de start van de reclame).

## 1. In Netlify

1. Site → **Domain management** → **Add a domain**: `eezzyflow.com`. Zet het
   als **primary domain**.
2. Voeg ook `eezzyflow.be` toe als **domain alias** (Netlify voegt de
   `www`-varianten zelf toe). Netlify maakt voor elk domein een gratis
   HTTPS-certificaat.

## 2. Bij GoDaddy (DNS blijft bij GoDaddy)

Laat de nameservers bij GoDaddy staan. Verhuis ze **niet** naar Netlify: dan
moet je het record van `app.eezzyflow.com` (naar Vercel) en de mailrecords
(DKIM, SPF…) opnieuw aanmaken, en gaat de app even offline als je er één
vergeet.

Pas alleen deze records aan, voor **eezzyflow.com** én **eezzyflow.be**:

| Type | Naam | Waarde |
|---|---|---|
| A | `@` | `75.2.60.5` (Netlify) |
| CNAME | `www` | `<sitenaam>.netlify.app` |

Verwijder bij `@` eventuele oude A-records of GoDaddy-"doorsturen"
(forwarding), anders wint die het soms.

**Niet aankomen:** het record `app` (CNAME naar Vercel) en alle mailrecords
(MX, TXT, DKIM-CNAME's).

Kijk het actuele IP-adres van Netlify voor de zekerheid na in hun
documentatie ("External DNS for a custom domain") voor je het invult.

## 3. Controleren

```bash
curl -sI https://eezzyflow.be | grep -i location
curl -sI https://www.eezzyflow.com | grep -i location
curl -sI https://app.eezzyflow.com | head -1
```

De eerste twee geven `location: https://eezzyflow.com/`, de derde nog
steeds `200` of een redirect naar `/aanmelden` van de app.
