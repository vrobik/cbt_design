# Handoff: Site Comunitatea Basarabenilor din Timișoara (CBT)

## Overview
Website public pentru **Comunitatea Basarabenilor din Timișoara (CBT)** — asociație non-profit care adună basarabenii stabiliți în Timișoara. Prototip navigabil cu 6 pagini + 2 pagini de detaliu, formular de înscriere cu GDPR, cookie banner, comutator RO/RU (vizual), press kit descărcabil. Mobile-first, bilingv-ready (RO acum, RU planificat pentru Home + About).

Domeniu țintă: `basarabenitm.ro`.

## About the Design Files
Fișierele din pachet sunt **referințe de design create în HTML** — un prototip care arată aspectul și comportamentul dorit, **nu cod de producție de copiat direct**. Sarcina este să **recreezi aceste design-uri în mediul codebase-ului țintă** (recomandat: WordPress cu temă proprie sau Next.js/React), folosind pattern-urile și bibliotecile lui. Dacă nu există încă un mediu, alege framework-ul potrivit (vezi brief: SEO, bilingv, ușor de întreținut de un non-tehnic → **WordPress** e o alegere bună).

Designul este construit peste **CBT Design System** (proiect separat): componente React (`Button`, `Card`, `EventCard`, `Testimonial`, `StatsBand`, `Input`, `Checkbox`, `CookieBanner`, `Logo`, `PixelDivider`) + tokens CSS. Toate valorile de mai jos sunt luate din acel sistem.

## Fidelity
**High-fidelity (hifi).** Culori, tipografie, spațiere și interacțiuni finale. Recreează UI-ul pixel-perfect folosind sistemul de design CBT existent (tokens + componente).

## Screens / Views

Aplicație single-page cu rutare pe stare (`page`). În producție → rute reale (`/`, `/despre`, `/proiecte`, `/evenimente`, `/evenimente/:slug`, `/noutati`, `/noutati/:slug`, `/contact`).

### Chrome global (toate paginile)
- **Nav sticky sus**: logo color (stânga, 36px înălțime), 6 linkuri (Acasă, Cine suntem, Proiecte, Evenimente, Noutăți, Contact), comutator RO/RU (pill cu border), buton primar „Înscrie-te".
  - Link activ: culoare albastru `#2F448A`, weight 700, pătrat galben 10×3px dedesubt (marker mozaic).
  - Sub 820px: linkurile + butonul se ascund, apare **hamburger** (44×44px, 3 linii). Tap → panou vertical cu linkurile stivuite (padding 13px, border-bottom `#F2F2F0`) + buton „Înscrie-te în comunitate" full-width. Navigarea închide meniul.
  - Padding fluid: `clamp(12px,3vw,16px) clamp(16px,4vw,32px)`, container max 1140px centrat.
- **Bandă RU**: când e selectat RU, apare o bandă info (fundal `#EAEDF5`) cu text „Versiunea în limba rusă este în pregătire." Conținutul rămâne RO (fără traducere automată).
- **Footer** (fundal negru `#101010`): grilă 4 coloane (logo alb + descriere; Navigație; Legal; Urmărește-ne cu iconițe `f`/`◎` în pătrate bordurate 40px). Bară jos: „© 2026 CBT…" + „basarabenitm.ro" (mono).
- **Cookie banner** flotant jos (component `CookieBanner`): text scurt + Accept / Refuz egal ponderați. Dispare la alegere.

### 1. Acasă
Secțiuni în ordine:
- **Hero** (fundal negru, padding `clamp(56px,10vw,96px) clamp(20px,5vw,32px)`): marker mozaic 3 pătrate (albastru/galben/roșu, 16px), H1 „Acasă, la 700 km de casă." (fs-display, weight 900, tracking -0.03em), paragraf gri deschis, 2 butoane (primar galben „Înscrie-te în comunitate" + secundar outline alb „Scrie-ne"). Colț dreapta: mozaic decorativ 6×4 pătrate 26px (ascuns pe mobil).
- **Beneficii** (fundal alb): eyebrow mono, H2 „Ce primești ca membru", grilă 3 carduri (1 real „Comunitate" + 2 rezervate cu border dashed — beneficiile nu sunt încă definite). Fiecare card: pătrat mozaic colorat ca „icon" (48px), H3, paragraf.
- **Stats** (fundal gri `#F2F2F0`): `StatsBand` — bandă neagră, cifre galbene JetBrains Mono. Valori: 248 membri activi / 36 evenimente organizate / 7 ani de comunitate.
- **Evenimente** (fundal alb): eyebrow „Evenimente · 2026", H2 „Ce urmează", 3 `EventCard` (chip dată galben mono peste gradient brand). Click → detaliu.
- **Testimoniale** (fundal gri): header cu H2 „Ce spun membrii" + carusel cu 2 săgeți chevron SVG (cercuri 40px, border `#C9C9C9`). Desktop 2 pe rând, mobil 1; săgeata se estompează (opacity .35) la capăt. 4 testimoniale.
- **CTA final** (fundal albastru `#2F448A`): H2 „Gata să faci parte?", text alb-85%, buton galben „Înscrie-te în comunitate".

### 2. Cine suntem
Pagină simplă max 900px: eyebrow, H1, 2 paragrafe, marker mozaic 3 pătrate, paragraf istorie, placeholder foto (gradient albastru, 280px, radius lg), 3 coloane (Apartenență/Sprijin/Identitate) cu pătrat mozaic colorat.

### 3. Proiecte
Max 1140px: eyebrow „Ce facem", H1 „Proiectele noastre", marker mozaic 4 pătrate. Grilă carduri proiect (chip dată mono: gri pentru TRECUT, albastru pentru VIITOR; H3; paragraf). **Paginare „Arată mai multe proiecte"** — afișează 3, +3 pe click, dispare la capăt (6 total).

### 4. Evenimente
Max 1140px: eyebrow, H1 „Ce se întâmplă la CBT", marker mozaic. Grilă `EventCard`. **Paginare „Arată mai multe evenimente"** (3 → 6). Fiecare card clicabil → detaliu.

### 5. Detaliu eveniment
Max 760px: link „← Înapoi la evenimente", placeholder imagine (gradient brand după accent, 300px, chip dată galben + label foto), eyebrow „Eveniment", H1 titlu, rând de chips (dată / oră / locație — pill gri), descriere (fs-body-lg), corp text, casetă „Detalii practice" (fundal `#EAEDF5`, radius lg) cu Data&ora / Locație / Acces, buton „Înscrie-te în comunitate".

### 6. Noutăți & Presă
Max 1140px: eyebrow, H1 „Ce mai e nou", marker mozaic. Grilă carduri articol (dată mono, H3, excerpt) clicabile → detaliu. **Paginare „Arată mai multe"** (3 → 6). Dedesubt: **Press kit** (panou gri, radius lg) — 3 rânduri descărcabile (pachet logo, poze arhivă, comunicat PDF) cu iconiță/logo + nume + dimensiune mono + buton secundar „Descarcă".

### 7. Detaliu noutate (fără imagine)
Max 720px, identic structural cu detaliul de eveniment dar **fără imagine**: eyebrow cu data, H1, marker mozaic 3 pătrate, excerpt (fs-body-lg), corp text, linie separator cu link către press kit.

### 8. Contact / Înscriere
Max 560px. Formular 3 câmpuri (`Input`): Nume și prenume (obligatoriu), Email (obligatoriu, validare `@`+`.`), Orașul de origine (opțional). `Checkbox` GDPR cu link Politica de Confidențialitate. Notă despre stocare (Google Sheet privat). Buton primar full-width „Înscrie-te în comunitate".
- **Validare**: nume gol → eroare sub câmp; email invalid → eroare; GDPR nebifat → eroare roșie.
- **Stare thank-you**: înlocuiește formularul — marker mozaic, H2 „Te-am adăugat pe listă! 🎉", text cu pasul următor concret (grup Facebook), buton dark „Deschide grupul de Facebook".

## Interactions & Behavior
- Navigare: click nav/carduri/butoane schimbă `page`, scroll la top.
- Carduri eveniment/noutate: întreg cardul clicabil (`cursor:pointer`) → pagina de detaliu (index în `detailIndex`).
- Paginare: `showMore*` crește contorul cu 3; butonul dispare când s-a atins totalul.
- Carusel testimoniale: `testiPrev`/`testiNext` mută fereastra glisantă; săgeți dezactivate vizual la capete; per-page = 2 desktop / 1 mobil.
- RO/RU: setează `lang`; RU afișează banda info, nu traduce.
- Cookie: Accept/Refuz ascund banner-ul.
- Formular: validare la submit, apoi stare `sent`.
- Motion: `~0.15–0.2s cubic-bezier(0.4,0,0.2,1)`; hover carduri = lift 2px + umbră spre albastru; respectă `prefers-reduced-motion`.
- Responsive: breakpoint la **820px** (nav). Grile `repeat(auto-fit, minmax(...))` se pliază la 1 coloană. Touch targets ≥44px.

## State Management
- `page` — pagina curentă (`acasa|cine|proiecte|evenimente|noutati|contact|eveniment|noutate`).
- `detailIndex` — indexul evenimentului/noutății deschise.
- `lang` — `ro|ru`.
- `menuOpen`, `isMobile` (din resize listener, prag 820px).
- `eventsShown`, `newsShown`, `projectsShown` — contoare paginare (start 3, pas 3).
- `testiIndex` — poziția caruselului.
- `cookieDismissed`.
- Formular: `nume`, `email`, `oras`, `gdpr`, `err`, `sent`.
- Datele (evenimente, noutăți, proiecte, testimoniale) sunt array-uri statice în componentă — în producție vin din CMS.

## Design Tokens
**Culori (roluri fixe):**
- Albastru `#2F448A` — primar: linkuri, titluri accent, fundaluri secțiune, buton terțiar (dark).
- Galben `#F9F04D` — ACȚIUNE doar: unicul CTA principal. Text negru pe galben.
- Roșu `#CF242A` — erori, accente rare mozaic. Niciodată CTA sau fundal text lung.
- Negru `#101010` — wordmark, footer, stats band, contururi.
- Neutre: gri `#2A2A2A → #F2F2F0`; tentă albastră info `#EAEDF5`.
- Contrast: pe galben → negru; pe albastru/negru → alb sau galben; roșu doar mesaje scurte.
- Variabile CSS: `--cbt-albastru`, `--cbt-albastru-inchis`, `--cbt-albastru-10`, `--cbt-galben`, `--cbt-rosu`, `--cbt-rosu-inchis`, `--cbt-negru`, `--cbt-alb`, `--cbt-gri-10/30/60/90`.

**Tipografie:**
- **Onest** (display + body) — comisionată de Republica Moldova; acoperă diacritice RO + chirilic (RU fără al doilea font). Weights 300–900; headings 800–900, tracking -0.02 to -0.03em; body 400 / line-height 1.6.
- **JetBrains Mono** — doar cifre, date, eyebrows, label-uri mici. Niciodată text curent.
- Scală `clamp()` mobile-first, ratio ~1.25. Variabile: `--fs-display`, `--fs-h1`, `--fs-h2`, `--fs-h3`, `--fs-body-lg`, `--fs-body`, `--fs-small`, `--fs-label`; `--font-text`, `--font-mono`.

**Spațiere:** bază 8px (`--sp-1`=4 → `--sp-8`=96). Padding secțiune 64px mobil / 96px desktop. Container max 1140px.

**Radius:** `sm` 6px (inputs, chips), `md` 12px (carduri), `lg` 20px (panouri, stats, footer), **pill** 999px (butoane).

**Umbre:** card soft `0 2px 12px rgba(16,16,16,.07)`; hover `0 6px 24px rgba(47,68,138,.16)`; glow galben pe butonul primar; pop pentru elemente flotante (cookie).

**Focus:** contur 3px albastru, offset 2px (cerință de accesibilitate).

## Assets
- `assets/logo-color.png`, `logo-white.png`, `mark-color.png`, `mark-white.png` — logo CBT oficial (mozaic tricolor + wordmark negru). **Nu redesena** — folosește PNG-urile (sau SVG-urile oficiale în producție).
- Fonturi din Google Fonts (Onest + JetBrains Mono). Pentru hosting GDPR-strict → self-host `.woff2`.
- **Fără set de iconițe** — brandul e icon-light: pătratul mozaic ține locul iconițelor pe carduri; social doar în footer ca text. Dacă e nevoie de iconițe → Lucide (monoline 2px), doar unde e documentat.
- Placeholder-uri: pozele (hero, echipă, evenimente) sunt gradient-uri brand — se înlocuiesc cu foto reale (conținut CBT).

## Files
- `CBT Site.dc.html` — prototipul complet (template + logică). Referința principală.
- `assets/` — logo-urile CBT.
- Sistemul de design sursă (proiect separat): componente `.jsx` în `components/`, tokens în `tokens/*.css`, UI kit în `ui_kits/website/`.

## De rezolvat înainte de lansare (din brief)
- Beneficiile membrilor sunt nedefinite (3–4 carduri rezervate).
- Testimoniale reale (nume + foto) și unde se stochează datele formularului (Sheet / CRM / plugin).
- Schema markup `Event` pe paginile de eveniment (SEO).
- Traducerea RU (umană) pentru Home + About.
- Pagina 404 cu textul din brand: „Pagina asta s-a rătăcit — ca un basarabean fără GPS în Timișoara."
