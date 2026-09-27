# Mentenanță, backup, costuri

## Ce trebuie întreținut

Aproape nimic. Site-ul e static: nu are server, bază de date, pluginuri sau parole de admin care să fie sparte. Nu există „update-uri de securitate” lunare ca la WordPress.

| Ce | Cât de des | Cine |
| --- | --- | --- |
| Conținut nou (evenimente, noutăți) | la nevoie | editorii, din CMS |
| Reînnoirea domeniului | anual | CBT (la registrar) |
| Verificare că formularul ajunge în Sheet | lunar, 1 minut | oricine din CBT |
| Actualizare dependențe (`npm update`) | o dată pe an, opțional | un developer |

## Backup

- **Conținutul și codul** sunt în Git (GitHub): fiecare modificare, cu autor și dată, se poate recupera oricând. GitHub este backup-ul.
- **Copie suplimentară (recomandat, anual):** GitHub → depozitul → **Code → Download ZIP**, păstrat în Google Drive-ul CBT.
- **Înscrierile** sunt în Google Sheet: istoric de versiuni automat (**Fișier → Istoricul versiunilor**). Opțional: **Fișier → Descarcă → .xlsx** o dată pe lună.
- **Site-ul publicat:** Cloudflare păstrează toate deploy-urile; oricare poate fi repus cu un click (**Deployments → … → Rollback**).

## Costuri anuale (suportate de CBT)

| Ce | Cost |
| --- | --- |
| Domeniul `.ro` | ~50–60 lei/an |
| Cloudflare Pages, Turnstile, Web Analytics | 0 lei (plan Free) |
| GitHub (organizație Free, depozit privat) | 0 lei |
| Google Sheet / Apps Script / Analytics | 0 lei |

Limitele planurilor gratuite (500 build-uri/lună la Cloudflare, 100.000 cereri/zi la funcții) sunt de sute de ori peste ce are nevoie o comunitate.

## Când ceva nu merge

| Problemă | Ce verifici |
| --- | --- |
| Am salvat în CMS, dar nu apare pe site | Cloudflare → Deployments: build-ul e „Failed”? Deschide log-ul; de obicei e un câmp completat greșit (ex. ora „18.00” în loc de „18:00”). Site-ul vechi rămâne online până se repară. |
| Formularul dă eroare | Cloudflare → proiectul → **Functions → Real-time logs**. Verifică variabilele `SHEETS_*` și că implementarea Apps Script e „Oricine”. |
| Nu mă pot loga în CMS | Callback URL din OAuth App = domeniul pe care ești? Contul GitHub e în echipa „Editori site” cu drept Write? |
| Evenimentul trecut apare încă la „Urmează” | GitHub → Actions → „Rebuild zilnic” rulează? Secretul `CLOUDFLARE_DEPLOY_HOOK` e setat? |

## Predarea către CBT (brief, secțiunea 0 și 7)

- [ ] Organizația GitHub, contul Cloudflare, contul Google și domeniul sunt pe emailul **asociației**.
- [ ] Cel puțin **2 persoane din CBT** sunt *Owner* în organizația GitHub și *Administrator* în Cloudflare.
- [ ] Parolele / secretele (SECRET-ul scriptului, client secret GitHub) sunt salvate în managerul de parole al CBT.
- [ ] Persoana desemnată de CBT a parcurs [`2-GHID-EDITORI.md`](2-GHID-EDITORI.md) (aprox. 30 min, în loc de trainingul de 1 oră pentru WordPress).
- [ ] Developerul voluntar poate fi scos oricând din organizație fără ca site-ul să fie afectat.

## Pentru un developer care preia proiectul

Vezi [`../README.md`](../README.md). Pe scurt: Astro 7 + Svelte 5, conținut în `src/content/`, CMS în `public/admin/`, funcții în `functions/`. Orice developer web se descurcă în câteva ore.
