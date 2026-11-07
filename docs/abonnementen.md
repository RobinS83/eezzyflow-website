# Abonnementen: wat er op de site moet staan

Robin, 7 november 2026. Zo staat het nu ook in de app (app-repo
`robins83/eezzyflow`, commit `c4503ad`, `app/[locale]/(public)/abonnement/page.tsx`).
De site moet hetzelfde zeggen.

## In één zin

**Plus en Gezin geven precies hetzelfde. Het enige verschil is wie betaalt.**

| | Prijs | Voor wie |
|---|---|---|
| **Gratis** | € 0 | De basis, voor iedereen |
| **Plus** | € 4,99 per maand, per ouder | Alles, voor één ouder. Ieder betaalt voor zichzelf. |
| **Gezin** ★ | € 7,99 per maand, voor het gezin | Alles, voor beide ouders. Eén betaalt. |

**Gezin is het aanbevolen abonnement** en krijgt het label "Aanbevolen". Het
is goedkoper dan twee keer Plus (€ 7,99 tegenover € 9,98), en de prijs verdelen
de ouders gewoon als kost in de app.

## Wat er in elk abonnement staat

Sleutels zijn die uit `messages/*.json` → `pricing.features` in de app-repo;
daar staan ze in zes talen. Haal de nieuwe teksten daar op.

**Gratis:** `calendar`, `oneChild`, `messages`, `basicCosts`.

**Plus** (de volledige lijst; wat Plus geeft, geeft Gezin ook):
`everythingFree`, `unlimitedChildren`, `fullCosts`, `documents`,
`calendarSync`, `photoImport`, `receipts`, `lists`, `reportPdf`,
`ownChildPhoto`, `viewers`, `reminders`, `aiRewrite`, `judgmentImport`,
`yearOverview`, **`history`** (nieuw), **`multiplePartners`** (nieuwe tekst),
`childAccounts`.

**Gezin** (alleen wat het verschil is):
`plusForBoth`, **`onePays`**, **`cheaperThanTwice`**, **`splitCost`** (alle drie
nieuw).

**Weg:** `prioritySupport` ("Voorrang bij vragen"). Robin vindt dat
discriminerend: iedereen krijgt dezelfde hulp. Niet meer tonen, ook niet in
de FAQ of elders.

## Nieuwe teksten (Nederlands; de andere talen staan in de app-repo)

| Sleutel | Tekst |
|---|---|
| `pricing.sameFeatures` | Plus en Gezin geven precies hetzelfde. Het enige verschil is wie betaalt. |
| `pricing.recommended` | Aanbevolen |
| `features.history` | Historiek: alles wat er gebeurde op een rij, ook als pdf |
| `features.multiplePartners` | Ons huis: wie bij je woont, met wie wat ziet (ook voor een samengesteld gezin) |
| `features.onePays` | Eén van jullie betaalt, jullie hebben allebei alles |
| `features.cheaperThanTwice` | Goedkoper dan twee keer Plus |
| `features.splitCost` | Samen betalen? Zet het abonnement als kost in de app en verdeel het zoals jullie andere kosten |
| `faq.a3` | Ja, met Gezin. Dat kan of jullie nu samenwonen of niet: één abonnement, en jullie hebben allebei alles. Eén van jullie betaalt; zet het abonnement als kost in de app, dan komt het vanzelf in jullie saldo, net als de andere kosten. |

`pricing.forYou` ("Past bij jou") bestaat niet meer in de app; de app raadt nu
altijd Gezin aan.

## Hoe twee ouders samen in de app komen

Voor een "Hoe werkt het"-blok of de FAQ. Er is nooit één gedeeld account:

1. Eén ouder maakt een account en voegt de kinderen toe.
2. Die ouder nodigt de andere ouder uit (Gezin › Andere ouder uitnodigen) en
   kiest voor welke kinderen.
3. De andere ouder downloadt de app, maakt een account met hetzelfde
   e-mailadres en aanvaardt de uitnodiging in de app.
4. Vanaf dan delen ze kalender, kosten, berichten en documenten van die
   kinderen. Wat van één ouder is (eigen adres, eigen huis), blijft privé.

Het abonnement staat los van die koppeling: met Gezin heeft de andere ouder
alles zonder zelf te betalen.

## Wat de site daarvoor moet aanpassen

1. `lib/plans.ts`: Plus krijgt `history` en `multiplePartners` erbij; Gezin
   wordt `["plusForBoth", "onePays", "cheaperThanTwice", "splitCost"]`;
   `prioritySupport` weg.
2. De zin `sameFeatures` boven de drie abonnementen.
3. Gezin blijft `featured`, met het label "Aanbevolen".
4. Teksten opnieuw ophalen uit de app (`docs/bron-teksten/` bijwerken en
   `npm run sync-texts`), zodat alle zes talen kloppen.
