# Punerea online — pas cu pas

Ghid pentru persoana care pune site-ul online prima dată. Durează aproximativ 1–2 ore, o singură dată.
Toate conturile se fac **pe numele / emailul asociației CBT**, nu pe persoane (brief, secțiunea 0).

> Ordinea contează: GitHub → Cloudflare Pages (site pe `*.pages.dev`) → Google Sheet (formulare) → CMS → domeniu → analytics.
> Site-ul funcționează încă de la pasul 2; restul se adaugă treptat.

**Ai nevoie de:** un email al asociației (ex. `site@basarabenitm.ro` sau un Gmail CBT), acces la registrarul unde s-a cumpărat domeniul.

---

## Pasul 1 — GitHub (codul și conținutul)

1. Creează un cont GitHub cu emailul asociației (dacă nu există): <https://github.com/signup>.
2. Creează o **organizație** gratuită: <https://github.com/organizations/plan> → Free → nume, ex. `comunitatea-basarabenilor-tm`.
3. În organizație: **New repository** → nume `basarabenitm` → **Private** (recomandat) → fără README → Create.
4. Urcă proiectul (din folderul `site/`, care devine rădăcina depozitului):
   ```bash
   cd site
   git init -b main
   git add .
   git commit -m "Site CBT — versiunea inițială"
   git remote add origin https://github.com/ORGANIZATIA/basarabenitm.git
   git push -u origin main
   ```
5. În `public/admin/config.yml`, la `backend.repo`, pune numele real: `ORGANIZATIA/basarabenitm`. Commit + push.

> Dacă depozitul e **public** în loc de privat, totul merge la fel; doar codul e vizibil oricui (nu conține secrete).

## Pasul 2 — Cloudflare Pages (găzduirea)

1. Cont Cloudflare cu emailul asociației: <https://dash.cloudflare.com/sign-up> (planul Free).
2. **Workers & Pages → Create → Pages → Connect to Git** → autorizează GitHub (alege doar depozitul `basarabenitm`).
3. Setări build:
   | Câmp | Valoare |
   | --- | --- |
   | Production branch | `main` |
   | Framework preset | `Astro` |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | *(gol)* |
4. **Save and Deploy.** După ~1–2 minute site-ul e live la `https://basarabenitm.pages.dev` (sau numele ales).
5. Verifică: se deschid paginile, formularul afișează erorile de validare. Trimiterea formularului încă NU merge (vine la pasul 3).

> Versiunea de Node e luată automat din `.nvmrc` (24). Dacă build-ul se plânge de Node, adaugă variabila `NODE_VERSION` = `24` (pasul 2 → Settings → Variables).

## Pasul 3 — Google Sheet pentru formulare

Datele din formularul de înscriere și din acordurile de imagine ajung într-un **Google Sheet privat al asociației**.

1. Intră în contul **Google al CBT** → creează un Sheet nou: „CBT — Înscrieri site”.
2. **Extensii → Apps Script** → șterge tot ce e acolo → lipește conținutul fișierului `google-apps-script/Code.gs` → Salvează.
3. Generează o parolă lungă (ex. 40 de caractere aleatoare, dintr-un manager de parole). O vom numi **SECRET**.
4. În Apps Script: rotița ⚙ **Setările proiectului → Proprietăți script → Adaugă proprietate**:
   - `SECRET` = parola de la punctul 3
   - `NOTIFY_EMAIL` = (opțional) emailul care primește notificare la fiecare înscriere
5. Selectează funcția `test` sus și apasă **Rulează** → acceptă permisiunile (e scriptul vostru). În Sheet apare tab-ul „Înscrieri” cu un rând de test — îl poți șterge.
6. **Implementare → Implementare nouă** → tip **Aplicație web** → *Execută ca: Eu* → *Cine are acces: Oricine* → Implementează → copiază adresa care se termină în `/exec`.
7. În Cloudflare: proiectul Pages → **Settings → Variables and Secrets** → *Production* → adaugă:
   | Nume | Tip | Valoare |
   | --- | --- | --- |
   | `SHEETS_WEBHOOK_URL` | Text | adresa `/exec` |
   | `SHEETS_WEBHOOK_SECRET` | **Secret** | parola SECRET |
8. **Deployments → ultimul → Retry deployment** (variabilele se aplică la următorul deploy).
9. Test: completează formularul pe site → trebuie să ajungi pe pagina „Te-am adăugat pe listă!” și să apară un rând în Sheet.

> Dacă modifici vreodată `Code.gs`: **Implementare → Gestionează implementările → ✏ → Versiune nouă**. Adresa rămâne aceeași.

## Pasul 4 — Anti-spam (Cloudflare Turnstile)

1. Cloudflare → **Turnstile → Add widget** → nume „basarabenitm” → domenii: `basarabenitm.ro`, `basarabenitm.pages.dev` → Widget mode: **Managed** → Create.
2. Copiază cele două chei în **Settings → Variables and Secrets** (Production):
   | Nume | Tip | Valoare |
   | --- | --- | --- |
   | `PUBLIC_TURNSTILE_SITE_KEY` | Text | Site Key |
   | `TURNSTILE_SECRET_KEY` | **Secret** | Secret Key |
3. Retry deployment și testează din nou formularul.

## Pasul 5 — CMS-ul (editarea de către voluntari)

CMS-ul e la `/admin/`. Autentificarea se face cu GitHub, printr-o aplicație OAuth a organizației.

1. GitHub → organizația → **Settings → Developer settings → OAuth Apps → New OAuth App**:
   - Application name: `CBT — administrare site`
   - Homepage URL: `https://basarabenitm.ro`
   - **Authorization callback URL**: `https://basarabenitm.pages.dev/api/callback`
     *(după ce legi domeniul, la pasul 6, schimbă în `https://basarabenitm.ro/api/callback`)*
2. **Register application** → copiază *Client ID* → **Generate a new client secret** → copiază secretul.
3. Cloudflare → Variables and Secrets (Production):
   | Nume | Tip | Valoare |
   | --- | --- | --- |
   | `GITHUB_CLIENT_ID` | Text | Client ID |
   | `GITHUB_CLIENT_SECRET` | **Secret** | Client secret |
4. Retry deployment → deschide `https://basarabenitm.pages.dev/admin/` → **Sign In with GitHub** → autorizează.
5. **Editorii:** GitHub → organizația → **Teams → New team** „Editori site” → adaugă membrii (au nevoie de un cont GitHub gratuit) → **Repositories → Add** `basarabenitm` cu rolul **Write**.
   Ghidul pentru ei: [`2-GHID-EDITORI.md`](2-GHID-EDITORI.md).

> Loginul funcționează doar pe adresa trecută la „callback URL”. Pe adresele de preview (`xxxx.basarabenitm.pages.dev`) nu — e normal.

## Pasul 6 — Domeniul basarabenitm.ro

1. Cloudflare → **Add a domain** → `basarabenitm.ro` → planul **Free** → Cloudflare îți dă 2 nameservere.
2. La registrarul domeniului (unde a fost cumpărat), înlocuiește nameserverele cu cele de la Cloudflare. Propagarea durează de la câteva minute la 24 de ore.
3. Proiectul Pages → **Custom domains → Set up a custom domain** → `basarabenitm.ro` → Activate. Repetă pentru `www.basarabenitm.ro`.
4. Redirecționare `www` → fără `www`: domeniul `basarabenitm.ro` în Cloudflare → **Rules → Redirect Rules → Create rule** → template „Redirect from WWW to root”.
5. SSL (https) se activează automat. Verifică **SSL/TLS → Edge Certificates → Always Use HTTPS = On**.
6. Actualizează *Authorization callback URL* din OAuth App (pasul 5.1) la `https://basarabenitm.ro/api/callback`.
7. În Turnstile, domeniul e deja adăugat (pasul 4).

## Pasul 7 — Rebuild automat zilnic

Site-ul e static, așa că un eveniment trece la „Au avut loc” doar la următorul build. Un build automat în fiecare noapte rezolvă asta.

1. Cloudflare → proiectul → **Settings → Builds → Deploy hooks → Add deploy hook** → nume „zilnic”, branch `main` → copiază adresa.
2. GitHub → depozitul → **Settings → Secrets and variables → Actions → New repository secret** → `CLOUDFLARE_DEPLOY_HOOK` = adresa.
3. GitHub → **Actions → Rebuild zilnic → Run workflow** (test manual). În Cloudflare trebuie să apară un deploy nou.

> GitHub oprește workflow-urile programate după 60 de zile fără niciun commit în depozit. Cât timp se publică conținut din CMS, nu e o problemă; dacă apare un email de la GitHub despre asta, apasă „Enable workflow”.

## Pasul 8 — Statistici

Detalii în [`3-ANALYTICS-SI-SEO.md`](3-ANALYTICS-SI-SEO.md). Pe scurt:

1. **Cloudflare Web Analytics** (fără cookie-uri): proiectul Pages → **Metrics → Web Analytics → Enable**.
2. **Google Analytics 4**: creează proprietatea → copiază *Measurement ID* (`G-…`) → Cloudflare Variables: `PUBLIC_GA_ID` (Text) → Retry deployment. Bannerul de cookie-uri apare automat doar când GA e configurat.
3. **Google Search Console**: adaugă domeniul, trimite `https://basarabenitm.ro/sitemap-index.xml`.

## Rezumat variabile Cloudflare

| Nume | Tip | Obligatoriu | Pentru ce |
| --- | --- | --- | --- |
| `SHEETS_WEBHOOK_URL` | Text | da | adresa scriptului Google (formulare) |
| `SHEETS_WEBHOOK_SECRET` | Secret | da | parola comună site ↔ script |
| `GITHUB_CLIENT_ID` | Text | da (CMS) | login CMS |
| `GITHUB_CLIENT_SECRET` | Secret | da (CMS) | login CMS |
| `PUBLIC_TURNSTILE_SITE_KEY` | Text | recomandat | anti-spam (în pagină) |
| `TURNSTILE_SECRET_KEY` | Secret | recomandat | anti-spam (verificare pe server) |
| `PUBLIC_GA_ID` | Text | opțional | Google Analytics 4 |
| `NODE_VERSION` | Text | doar dacă e nevoie | versiunea Node la build |

## Înainte de lansare — listă de verificare

- [ ] Conținutul demo (evenimente, noutăți, proiecte din prototip) înlocuit cu cel real sau șters.
- [ ] Cifrele de pe prima pagină (**Setări site → Contact, rețele sociale, cifre**) verificate.
- [ ] Linkurile Facebook / Instagram / grup Facebook reale (acum sunt adrese generice).
- [ ] Emailul de contact real (acum `contact@basarabenitm.ro`; creați adresa sau schimbați-o).
- [ ] Politica de confidențialitate: completate câmpurile `[de completat]` (sediu, CIF etc.) și ștearsă nota de la început.
- [ ] Testimoniale reale, cu acordul primit prin `/acord-imagine/` și bifa „Acord semnat”. Cele 4 din prototip sunt demo și NU apar pe site-ul publicat.
- [ ] Beneficiile membrilor (sau lăsați casetele „rezervat”).
- [ ] Formularul de înscriere testat → rând în Sheet.
- [ ] Login în CMS testat de cel puțin 2 persoane din CBT.
- [ ] Google Business Profile completat (categorie „Organizație comunitară”, link către site).
- [ ] Sitemap trimis în Search Console.
