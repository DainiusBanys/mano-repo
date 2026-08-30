# Etsy Velocity AI — Roadmap

## Pagrindinis tikslas

**Etsy Velocity AI turi padėti aptikti Etsy nišas, kurių paklausa realiai auga, dar prieš joms tampant akivaizdžiai perpildytoms.**

Scraperis nėra galutinis produktas. Jis yra matavimo priemonė.

Sistema turi padėti atsakyti į praktinį klausimą:

> **Kurioje Etsy produkto nišoje dabar matomas pakankamai platus, tvarus ir patikimas augimo signalas, kad būtų verta ją toliau tirti arba kurti produktą?**

Pagrindiniai signalai:

* review velocity;
* momentum / tęstinumas;
* nepriklausomų shopų breadth;
* konkurencijos lygis;
* duomenų patikimumas / confidence.

---

## MVP sėkmės kriterijus

MVP laikomas vertingu tada, kai sistema gali ne tik parodyti, kad vienas listingas gavo daugiau reviews, bet paaiškinti nišos signalą, pvz.:

> 12 nepriklausomų shopų stebimi kelis matavimo intervalus. 9 rodo teigiamą review growth. Median velocity išlieka teigiamas, augimas nėra sukeltas vieno outlier listing'o, konkurencija nėra ekstremali, o duomenų confidence yra pakankamas.

Galutinis tikslas nėra „gražus score“, o **geresnis sprendimas, kurią nišą verta tirti toliau**.

---

# Etapai

## 1. Patikimi matavimai

### Tikslas

Įrodyti, kad galime patikimai sekti tą patį Etsy listingą laike ir į DB neįrašyti klaidingų review reikšmių.

### Reikalavimai

* DISCOVER surenka pradinį listingų rinkinį.
* RECHECK pakartotinai tikrina tą patį rinkinį.
* Listing review count nesumaišomas su shop total.
* Nepatikimas review matavimas nėra išsaugomas.
* `velocity.db` lieka lokali ir nėra commitinama į GitHub.

### Definition of Done

* Diagnostiniai listingai su savo reviews grąžina tikrą listing count.
* Listingai be savo review bloko nepriima shop total kaip listing reviews.
* `0 / unknown` RECHECK metu nėra įrašomas kaip validus matavimas.
* Clean DISCOVER gali būti naudojamas kaip naujos patikimos istorijos baseline.

### Dabartinė būsena

**Beveik baigta.**

Patvirtinta diagnostika:

* listingai be savo reviews → `0 / ignored`;
* listingai su savo reviews → tikras listing review count;
* page-wide fallback pašalintas;
* JSON-LD priimamas tik esant listing'o `#reviews` blokui;
* testai praeina.

**Artimiausias veiksmas:** paleisti naują clean DISCOVER ir jo `scan_id` laikyti patikimos istorijos pradžia.

---

## 2. Patikimas Velocity signalas

### Tikslas

Įrodyti, kad review augimas matuojamas nuosekliai per kelis intervalus, o ne remiasi vienu atsitiktiniu pokyčiu.

### Reikalavimai

* Po clean DISCOVER atliekami keli RECHECK tam pačiam rinkiniui.
* Turime bent 3–4 švarius matavimo taškus tam pačiam `niche + listing` rinkiniui.
* Identifikuojami neigiami arba neįmanomi šuoliai kaip duomenų anomalijos.
* Vertiname ne tik `growth`, bet ir jo tęstinumą.

### Definition of Done

* Galime parodyti listingus, kurie auga per kelis intervalus iš eilės.
* Galime atskirti vienkartinį šuolį nuo tęstinio momentum.
* Velocity nėra priklausomas nuo senų, prieš extractor pataisą surinktų užterštų matavimų.
* Turime aiškų patikimos istorijos pradžios tašką.

---

## 3. Nišos signalas

### Tikslas

Atskirti „vienas geras listingas“ nuo „auga pati niša“.

### Reikalavimai

* Analizė agreguojama niche lygiu.
* Skaičiuojamas nepriklausomų shopų breadth.
* Naudojamos medianos ir outlier apsauga.
* Vienos parduotuvės keli listingai negali dirbtinai sukurti plataus rinkos signalo.

### Definition of Done

Kiekvienai nišai galime paaiškinamai parodyti bent:

* stebimų listingų skaičių;
* nepriklausomų shopų skaičių;
* teigiamą velocity turinčių shopų dalį;
* median review velocity;
* momentum / acceleration, kai istorijos pakanka;
* pagrindines anomalijas arba duomenų apribojimus.

---

## 4. Opportunity Score validacija

### Tikslas

Patikrinti, ar Opportunity Score iš tikro padeda iškelti perspektyvesnes nišas, o ne tik gražiai perrikiuoja dabartinius duomenis.

### Pagrindinis testas

> **Ar nišos, kurias sistema šiandien įvertino aukštai, po 1–3 savaičių iš tikro dažniau išlaiko arba didina momentum nei žemai įvertintos nišos?**

### Definition of Done

* Išsaugome ankstesnius nišų score snapshotus.
* Vėliau palyginame juos su realiai stebėtu augimu.
* Aukštesnis score turi turėti bent matomą ryšį su geresniu vėlesniu momentum.
* Jei ryšio nėra, koreguojame formulę remdamiesi duomenimis, ne intuicija.

**Svarbu:** scoring svorių neoptimizuojame tol, kol nepatikrinome duomenų ir signalų kokybės.

---

## 5. Naudingas MVP

### Tikslas

Streamlit aplikacija turi padėti priimti sprendimą, o ne tik rodyti techninius skaičius.

### Norimas rezultatas

Nišų lentelėje turėtų būti aiškiai matoma:

| Rodiklis      | Paskirtis                       |
| ------------- | ------------------------------- |
| Niche         | ką vertiname                    |
| Velocity      | dabartinis review augimo tempas |
| Momentum      | ar tempas stiprėja / silpnėja   |
| Shops growing | kiek nepriklausomų shopų auga   |
| Competition   | konkurencijos kontekstas        |
| Opportunity   | signalo stiprumas               |
| Confidence    | kiek galima pasitikėti score    |

### Definition of Done

* Top nišos pateikiamos aiškia tvarka.
* Vartotojas gali suprasti **kodėl** niša gavo aukštą įvertinimą.
* Opportunity ir Confidence rodomi atskirai.
* Galima pereiti nuo niche signalo prie pagrindinių jį sudarančių listingų / shopų.

---

## 6. Automatizavimas ir mastelis

### Tikslas

Tik įrodžius MVP vertę, mažinti rankinį darbą ir plėsti rinkos aprėptį.

### Galimi darbai vėliau

* automatinis DISCOVER / RECHECK grafikas;
* didesnis keyword skaičius;
* ilgesnė istorija;
* ataskaitos / alertai;
* keyword kandidatų generavimas;
* papildomi duomenų šaltiniai;
* pažangesnis scoringas;
* AI interpretacija ir rekomendacijų generavimas.

### Definition of Done

Automatizavimas pradedamas tik tada, kai turime įrodymų, kad dabartinis signalas yra pakankamai patikimas ir naudingas.

---

# Confidence principas

**Signal strength ir Confidence nėra tas pats.**

Pavyzdys:

* Opportunity: `87`, Confidence: `Low` — stiprus signalas iš per mažai duomenų.
* Opportunity: `74`, Confidence: `High` — kiek silpnesnis, bet daug patikimesnis signalas.

Confidence ateityje turėtų remtis bent:

* matavimo taškų skaičiumi;
* stebėjimo laikotarpiu;
* nepriklausomų shopų skaičiumi;
* duomenų coverage;
* anomalijų kiekiu;
* signalo stabilumu per kelis intervalus.

---

# Sąmoningai nedarome dabar

Kol neįrodytas signalas, prioritetas **nėra**:

* gražesnis Streamlit UI;
* Postgres migracija;
* didelis keyword mastelis;
* sudėtingi ML modeliai;
* papildomos bibliotekos be aiškios naudos;
* AI dizainų generavimo plėtra;
* scoring svorių mikrotuningas be validacijos.

Pirmiausia:

**Find opportunity → prove opportunity.**

Tik po to:

**Create / automate around opportunity.**

---

# Projekto darbo taisyklė

Prieš atliekant naują pakeitimą reikia atsakyti:

> **Kuriam roadmapo etapui šitas pakeitimas reikalingas ir kokį Definition of Done jis priartina?**

Jei aiškaus atsakymo nėra, pakeitimas greičiausiai nėra dabartinis prioritetas.

Vienu metu pasirenkamas **vienas svarbiausias kitas žingsnis**.
