# Wijzigingen voor de website

De website (`robins83/eezzyflow-website`, eezzyflow.com) toont dezelfde
teksten als de app: `landing`, `pricing` en `legal` in `messages/*.json`.
Verandert er in de app iets aan functies, prijzen, privacy of voorwaarden,
noteer het hier, nieuwste bovenaan. De website-sessie leest dit bestand en
zet de site gelijk.

Per notitie: datum, wat er veranderde, welke sleutels in `messages/`, en of
het al op de website staat.

## 9 november 2026 — kaart Gezinskluis op de landingspagina

- Robin zei ja: een vijfde functiekaart "Gezinskluis" op de landingspagina
  van de app. Sleutels `landing.features.vaultTitle`, `vaultBody`,
  `vaultChip1`, `vaultChip2`, in alle zes talen.
- Voor de website: dezelfde kaart naast de vier bestaande. Nog niet op de
  website.

## 9 november 2026 — recepten-assistent en receptenboek

- **Nieuw bij Plus en Gezin:** "Wat kan ik maken?". Een foto van je koelkast
  of een paar ingrediënten, en de app stelt drie recepten voor; wat je mist
  gaat met één tik op de boodschappenlijst. Na het eten geeft iedereen
  punten, ook de kinderen; het receptenboek van je huis zet wat goed viel
  bovenaan. De foto wordt niet bewaard.
- Sleutels: `pricing.features.recipeHelp` (prijspagina, Plus), in de app
  `meals.help.*`, `meals.rate.*`, `meals.avoid.*`.
- Privacy: nieuw stuk in de DPIA (5.7). In de privacyverklaring noemt
  `legal.privacy.sections.where.paras2.1` nu ook "foto van je koelkast"
  bij wat Anthropic te zien krijgt (alle talen). Website gelijkzetten.
- Voor de website: `pricing.features.recipeHelp` bij Plus zetten, zodra
  Robin het in de app nakeek. Nog niet op de website.

## 8 november 2026 — overdracht, schermen en kluis beveiligd

- **Samenvatting voor de website-sessie:** alles wat nog niet op de site
  staat, met kant-en-klare teksten, staat in
  [`website-update-2026-11-08.md`](website-update-2026-11-08.md).
- **Overzichtelijker schermen:** tabbladen met tellers, afgevinkt ingeklapt,
  snelle acties bovenaan. Geen tekst te veranderen, wel de schermafbeeldingen
  van Lijstjes, Documenten en de kindversie.
- **Kluis bestand tegen een gehackte server:** ondertekende sleutels en
  wijzigingen, en een kluiscode om te vergelijken. Past bij "zelfs wij kunnen
  het niet lezen".
- Voorstel voor nieuwe sleutels `landing.features.vault*`: nog niet in de app;
  eerst Robins akkoord. Nog niet op de website.

## 8 november 2026 — gezinskluis

- **Nieuw bij Plus en Gezin:** de gezinskluis. Wachtwoorden van het
  schoolplatform, de sportclub of de verzekering, versleuteld op je eigen
  toestel en gedeeld met de andere ouder met gezag. eezzyflow kan ze niet
  lezen. Eigen kluiswachtwoord, los van het aanmelden, en een herstelcode
  (één code, zoals bij 1Password); wie beide kwijt is, verliest zijn toegang definitief.
- **Drie soorten** (dezelfde dag): de gezinskluis van de ouders, een eigen
  kluis die niemand anders ziet, en een kluis per kind met een eigen account.
  Het kind zet er zijn wachtwoorden in (Snapchat, schoolmail); de ouders
  kunnen er altijd bij en krijgen een melding als er iets bijkomt. Een broer
  of zus ziet ze nooit.
- **Importeren en exporteren** (dezelfde dag): wachtwoorden overzetten uit
  1Password, Bitwarden, Google, Apple, LastPass, Firefox, Dashlane of Proton
  Pass, en terug. Het bestand wordt op je toestel gelezen; eezzyflow ziet
  niets.
- Sleutels: `pricing.features.vault` (prijspagina, Plus), plus in de app
  `vault.*`, `documents.vault*` en `upgrade.features.vault`.
- Voor de website: `pricing.features.vault` bij Plus zetten. Noemt de site
  privacy of veiligheid, dan past "zelfs wij kunnen het niet lezen" daar
  ook. Nog niet op de website.

## 8 november 2026 — kindversie uitgebreid

- **Meenemen naar het andere huis:** een vaste lijst per kind (zwemgerief,
  turnzak, gsm-lader). Ouders met gezag en het kind vinken af wat in de tas
  zit; na de wissel alles terug uit. Plus en Gezin (het kind altijd).
- **Foto's delen:** een kind met een eigen account deelt een foto met zijn
  ouders. Alleen de ouders met gezag zien ze. Gratis, zoals het kindaccount.
- **Meldingen naar het kind:** als beide ouders over zijn vraag beslisten
  (alleen de uitkomst), en de dag voor een wissel ("morgen ga je naar
  papa").
- Sleutels: `lists.pack.*`, `childAccount.photos.*`, `childAccount.notify.*`,
  `childAccount.push.answered*`, `reminders.kidHandover*`. Niets in `landing`
  of `pricing`.
- Voor de website: noemt de site het kindaccount, dan kunnen deze drie erbij.

## 8 november 2026 — herstelcodes bij twee-stapsverificatie

- Wie twee-stapsverificatie aanzet, krijgt tien herstelcodes. Telefoon
  kwijt? Aanmelden met wachtwoord en één code; daarna zet je
  twee-stapsverificatie opnieuw aan.
- Sleutels: `auth.mfa.recovery.*` en `auth.mfa.errors.recovery*`. Niets in
  `landing`, `pricing` of `legal`.
- Voor de website: alleen als de site twee-stapsverificatie noemt, kan ze
  er "met herstelcodes" bij zetten. Anders niets te doen.

## 8 november 2026 — links naar de website

- De app houdt haar eigen landingspagina (`/` zonder account), voor wie de
  app downloadt. Even weggehaald en dezelfde dag teruggezet, op advies en
  met akkoord van Robin. De website linkt rechtstreeks naar `/aanmelden` en
  `/registreren` en komt die pagina dus niet tegen.
- Op de publieke pagina's (privacy, voorwaarden, hulp, abonnement) wijzen de
  terugknop en een knop "Website" naar `https://eezzyflow.com` voor wie niet
  aangemeld is. Aangemelde gebruikers gaan terug naar Home.
- Nieuwe link "Over eezzyflow" in Instellingen, en `eezzyflow.com` onderaan
  de mails.
- Voor de website: niets te doen aan de teksten. Zorg dat
  `https://eezzyflow.com` werkt zodra het domein gekoppeld is; tot dan komen
  deze links op de parkeerpagina van GoDaddy uit.
