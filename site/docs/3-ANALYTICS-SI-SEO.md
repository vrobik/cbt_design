# Analytics și SEO

## Ce măsurăm și cum

| Instrument | Ce arată | Cookie-uri / consimțământ |
| --- | --- | --- |
| **Cloudflare Web Analytics** | vizite, pagini, țări, surse, viteza paginilor | fără cookie-uri → numără **toți** vizitatorii |
| **Google Analytics 4** | tot ce e mai sus + conversii, parcursul vizitatorilor | cookie-uri → doar după **„Accept”** în banner |
| **Google Search Console** | ce caută oamenii în Google, poziții, erori de indexare | — |

De ce ambele: în UE, 40–60% dintre vizitatori refuză cookie-urile, deci GA4 vede doar o parte. Cloudflare dă cifrele totale; GA4 dă conversiile.

## Google Analytics 4 — configurare

1. <https://analytics.google.com> (cont Google CBT) → **Admin → Create → Property** → „basarabenitm.ro”, fus orar România, moneda RON.
2. **Data streams → Web** → `https://basarabenitm.ro` → lasă **Enhanced measurement** activ (măsoară automat descărcările din press kit, click-urile externe, scroll-ul).
3. Copiază **Measurement ID** (`G-XXXXXXXXXX`) → Cloudflare → Variables → `PUBLIC_GA_ID` → Retry deployment.
4. **Admin → Data retention** → 14 luni.
5. **Conversii (evenimente cheie):** după prima înscriere de test, în **Admin → Events** marchează ca *key event*:
   - `sign_up` — înscriere trimisă cu succes (**conversia principală**, cerută în brief)
   - `click_inscriere` — click pe orice buton „Înscrie-te” (opțional)
   - `acord_imagine` — acord de imagine trimis (opțional)

### Evenimentele trimise de site

| Eveniment | Când | Parametri |
| --- | --- | --- |
| `click_inscriere` | click pe butoanele „Înscrie-te” | `locatie`: `nav`, `nav_mobil`, `hero`, `cta_final`, `eveniment`, `formular`; `pagina` |
| `sign_up` | pe pagina de mulțumire, după o înscriere reușită | `method: formular_site` |
| `acord_imagine` | după trimiterea acordului de imagine | `method: formular_site` |
| `file_download` | automat (Enhanced measurement) | numele fișierului |

Ca să vezi pe ce buton se apasă cel mai des: **Explore → Free form** → dimensiune `locatie` (înregistreaz-o întâi în **Admin → Custom definitions → Create custom dimension**, scope Event, parametrul `locatie`).

### Consimțământ (GDPR)

- GA4 nu se încarcă deloc înainte de „Accept”.
- La „Refuz”, cookie-urile `_ga*` se șterg.
- Alegerea se poate schimba oricând din subsol → „Setări cookie-uri”.
- Dacă `PUBLIC_GA_ID` nu e setat, nu apare nici bannerul (site-ul nu mai folosește cookie-uri).

## Cloudflare Web Analytics

Proiectul Pages → **Metrics → Web Analytics → Enable**. Nimic de configurat în cod.

## SEO — ce face site-ul automat

- `<title>` și meta description unice pe fiecare pagină (editabile din CMS: „Titlu/Descriere pentru Google”).
- URL-uri curate: `/evenimente/seara-de-colinde-basarabene/`.
- **Schema.org:** `Event` pe fiecare eveniment (dată cu fus orar, loc, adresă, organizator, gratuit), `NewsArticle` pe noutăți, `NGO` pe prima pagină.
- **Open Graph** pe fiecare pagină (imagine 1200×630 generată automat din poza evenimentului sau logo-ul CBT).
- `sitemap-index.xml` și `robots.txt` generate la fiecare build. Paginile de mulțumire și `/admin/` sunt excluse.
- `hreflang` RO ↔ RU — activ automat doar pentru paginile marcate „tradus”. Până atunci `/ru/` are `noindex`.
- Canonical, favicon, manifest, pagină 404 personalizată.
- Imagini optimizate (WebP, dimensiuni responsive, lazy-loading), fonturi găzduite local, fără JavaScript inutil.

### Verificare după lansare

- <https://search.google.com/test/rich-results> → testează o pagină de eveniment (trebuie să apară „Event”).
- <https://developers.facebook.com/tools/debug/> → cum arată linkul pe Facebook (butonul „Scrape again” reîmprospătează după modificări).
- <https://pagespeed.web.dev/> → viteza pe mobil.

## Google Search Console

1. <https://search.google.com/search-console> → **Domain** → `basarabenitm.ro`.
2. Verificare prin DNS: copiază înregistrarea TXT → Cloudflare → DNS → Add record (TXT, `@`).
3. **Sitemaps** → `sitemap-index.xml` → Submit.

## Google Business Profile

<https://business.google.com> → organizația CBT → categorie **„Organizație comunitară”** → site `https://basarabenitm.ro` → poze, program, descriere. (Nu ține de cod, dar ajută mult la căutările locale.)
