# Schermafbeeldingen van de app

Zet ze per taal en per toestel in een map. De site neemt alles in de map
vanzelf mee (`npm run build` maakt de lijst) en wisselt ze willekeurig af,
elk 7 seconden.

    public/screens/<taal>/phone/    iPhone, staand (bv. 1179 × 2556)
    public/screens/<taal>/desktop/  MacBook, liggend (bv. 2880 × 1864)

`<taal>` is nl, fr, en, de, es of it. Ontbreekt een taal of een toestel, dan
toont de site die van het Nederlands. Bestandsnamen maken niet uit; gebruik
.webp, .png of .jpg. Bij voorkeur .webp, zo klein mogelijk.

Bestandsnaam: `eezzyflow_<taal>_<gsm|desktop>_<NN-scherm>_<kleurthema>_<modus>`,
bv. `eezzyflow_nl_desktop_02-kalender_wijn_licht.webp`. Het schermdeel
(`01-home`, `02-kalender`, `03-kosten`, `04-lijstjes`, `05-berichten`) bepaalt
waar de muispijl op de MacBook klikt (`components/screen-cycle.tsx`).

Bron: de zip `eezzyflow-screenshots` (PNG, 1082 × 2202 en 2880 × 1800),
omgezet naar .webp (gsm 900 px breed, desktop 1800 px).

Geen echte namen of gegevens: alleen een testgezin.
