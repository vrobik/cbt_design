# basarabenitm.ro — site-ul Comunității Basarabenilor din Timișoara

Site static, rapid, fără WordPress, pe care oricine din CBT îl poate actualiza dintr-un panou de editare.

| | |
| --- | --- |
| **Generator** | [Astro 7](https://astro.build) (HTML static) + [Svelte 5](https://svelte.dev) pentru formulare și bannerul de cookie-uri |
| **Editare conținut** | [Sveltia CMS](https://sveltiacms.app) la `/admin/`, cu login GitHub |
| **Găzduire** | Cloudflare Pages (gratuit) + Pages Functions pentru formulare și login CMS |
| **Formulare** | → Google Sheet privat al CBT (prin Google Apps Script) |
| **Anti-spam** | Cloudflare Turnstile + câmp capcană |
| **Statistici** | Google Analytics 4 (cu consimțământ) + Cloudflare Web Analytics (fără cookie-uri) |
| **Design** | CBT Design System — tokenii din `src/styles/tokens/` sunt copiați neschimbați |

## Documentație

1. [**Punerea online, pas cu pas**](docs/1-SETUP-PAS-CU-PAS.md) — GitHub, Cloudflare, Google Sheet, CMS, domeniu
2. [**Ghid pentru editori**](docs/2-GHID-EDITORI.md) — pentru voluntarii care adaugă conținut
3. [**Analytics și SEO**](docs/3-ANALYTICS-SI-SEO.md) — GA4, conversii, Search Console
4. [**Mentenanță, backup, costuri**](docs/4-MENTENANTA.md) — și ce faci când ceva nu merge

## Pornire locală

Necesită Node.js 22.12+ (recomandat 24, vezi `.nvmrc`).

```bash
npm install
npm run dev          # http://localhost:4321 — ciornele și testimonialele demo sunt vizibile
npm run build        # generează site-ul în dist/
npm run preview      # servește dist/
npm run check        # verificare TypeScript + scheme de conținut
npm run dev:functii  # build + Cloudflare Functions local (formulare, login CMS) pe :8788
```

Pentru `dev:functii`, copiază `.dev.vars.example` în `.dev.vars` și completează.
Variabilele publice (`PUBLIC_GA_ID`, `PUBLIC_TURNSTILE_SITE_KEY`) se pun în `.env` (vezi `.env.example`).

**CMS local, fără login:** `npm run dev` → deschide `http://localhost:4321/admin/` în Chrome/Edge → **Work with Local Repository** → alege folderul proiectului. Modificările se scriu direct în fișiere.

## Structura

```
src/
  content/                 ← TOT conținutul editabil (îl scrie CMS-ul)
    evenimente/*.md          un fișier = un eveniment = o pagină /evenimente/<slug>/
    noutati/*.md             articole și comunicate de presă
    proiecte/*.md
    testimoniale/*.md        apar pe site doar cu „acordSemnat: true”
    acasa/{ro,ru}.yaml       textele primei pagini
    despre/{ro,ru}.md        „Cine suntem”
    legal/*.md               politica de confidențialitate și de cookie-uri
    setari/general.yaml      email, rețele sociale, cifre, „pasul următor”
    setari/traduceri.yaml    ce pagini RU sunt gata
    presa/kit.yaml           fișierele din press kit
  content.config.ts        ← schema (validare) pentru tot ce e mai sus
  assets/uploads/          ← pozele urcate din CMS (optimizate automat la build)
  components/              ← componentele design system (Button, Card, EventCard…)
    forms/                   formularele Svelte (înscriere, acord imagine)
    pages/                   Acasă și Cine suntem (comune RO/RU)
  layouts/BaseLayout.astro ← <head> SEO, Open Graph, hreflang, JSON-LD, nav, footer
  lib/                     ← date (fus orar), interogări conținut, schema.org
  scripts/                 ← analytics (GA4 + consimțământ), utilitare formulare
  i18n/ui.ts               ← textele fixe ale interfeței RO/RU
  pages/                   ← rutele site-ului
functions/api/             ← Cloudflare Pages Functions
  inscriere.ts               POST formular înscriere → Google Sheet
  acord-imagine.ts           POST acord imagine → Google Sheet
  auth.ts, callback.ts       login GitHub pentru CMS (OAuth)
public/
  admin/                   ← Sveltia CMS (index.html + config.yml)
  presa/                   ← fișierele descărcabile din press kit
  _headers, _redirects     ← configurare Cloudflare Pages
google-apps-script/Code.gs ← scriptul care scrie în Google Sheet
.github/workflows/         ← rebuild zilnic (mută evenimentele trecute)
scripts/genereaza-iconite.mjs ← favicon + imaginea Open Graph din logo
```

## Rute

| URL | Pagina |
| --- | --- |
| `/` | Acasă |
| `/despre/` | Cine suntem |
| `/proiecte/` | Proiecte (trecute și viitoare) |
| `/evenimente/`, `/evenimente/<slug>/`, `/evenimente/<slug>.ics` | Evenimente, pagina evenimentului, fișier calendar |
| `/noutati/`, `/noutati/<slug>/` | Noutăți, comunicate, press kit |
| `/contact/` | Formular de înscriere + „Scrie-ne” |
| `/multumim/` | Pagina de mulțumire (conversia GA4 `sign_up`) |
| `/acord-imagine/` | Formular de acord pentru utilizarea imaginii |
| `/politica-de-confidentialitate/`, `/politica-cookie/` | Legal |
| `/ru/`, `/ru/despre/` | Versiunea rusă (până la traducere: conținut RO + `noindex`) |
| `/admin/` | CMS |

Adrese scurte (în `public/_redirects`): `/inscriere`, `/devino-membru`, `/cine-suntem`, `/presa`, `/acord`.

## Adăugarea unui câmp nou

Un câmp trebuie declarat în **două locuri**:

1. `src/content.config.ts` — schema (tipul, dacă e obligatoriu);
2. `public/admin/config.yml` — cum apare în CMS.

Apoi îl folosești în componenta/pagina respectivă. `npm run check` prinde nepotrivirile de tip.
Câmpurile opționale se declară cu `opt(...)` în schemă, ca valorile goale scrise de CMS (`""`, `null`) să fie acceptate.

## Decizii

- **Static + Functions, nu SSR:** paginile sunt HTML gata făcut (rapid, fără server de întreținut). Doar formularele și loginul CMS rulează ca funcții.
- **Login CMS în același site** (`functions/api/auth.ts`), nu un Worker separat: un singur proiect de administrat.
- **Evenimentele viitor/trecut** se calculează la build, în ora României. Build-ul automat zilnic le mută la „Au avut loc”.
- **Testimonialele** apar doar cu `acordSemnat: true` (cerință GDPR din brief). În `npm run dev` se văd toate.
- **RU:** interfața și conținutul trec în rusă doar când CBT bifează traducerea ca gata. Până atunci `/ru/` arată conținutul românesc cu banda „în pregătire”, e `noindex` și lipsește din sitemap și hreflang.
- **Fonturi găzduite local** (`@fontsource`): nicio cerere către Google Fonts (GDPR).
- **Pozele din CMS** ajung în `src/assets/uploads/` (nu în `public/`), ca Astro să le optimizeze. CMS-ul le convertește deja în WebP ≤ 2400 px înainte de urcare.

## Conținut demo

Evenimentele, noutățile, proiectele și testimonialele din `src/content/` sunt preluate din prototipul de design și trebuie înlocuite cu conținut real înainte de lansare (vezi lista din [docs/1-SETUP-PAS-CU-PAS.md](docs/1-SETUP-PAS-CU-PAS.md#înainte-de-lansare--listă-de-verificare)).
