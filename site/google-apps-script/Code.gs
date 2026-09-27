/**
 * CBT — primește formularele de pe basarabenitm.ro și le scrie în acest Google Sheet.
 *
 * Instalare (o singură dată, din contul Google al ASOCIAȚIEI):
 *   1. Creează un Google Sheet nou, ex. „CBT — Înscrieri site”.
 *   2. Extensii → Apps Script → șterge tot și lipește acest fișier → Salvează.
 *   3. Setările proiectului (rotița) → Proprietăți script → Adaugă:
 *        SECRET        = aceeași parolă ca SHEETS_WEBHOOK_SECRET din Cloudflare
 *        NOTIFY_EMAIL  = (opțional) adresa care primește un email la fiecare înscriere
 *   4. Implementare → Implementare nouă → tip „Aplicație web”
 *        Execută ca: Eu  ·  Cine are acces: Oricine
 *      → copiază adresa „/exec” în Cloudflare ca SHEETS_WEBHOOK_URL.
 *   5. (Opțional) rulează o dată funcția `test` din editor ca să autorizezi scriptul.
 *
 * Tab-urile „Înscrieri” și „Acorduri imagine” se creează automat la primul formular.
 * Pagina e protejată de parola SECRET: fără ea nimeni nu poate scrie în Sheet.
 */

const TABURI = {
  inscriere: {
    nume: 'Înscrieri',
    coloane: [
      ['data', 'Data și ora'],
      ['nume', 'Nume'],
      ['email', 'Email'],
      ['oras', 'Oraș de origine'],
      ['consimtamant', 'Consimțământ GDPR'],
      ['pagina', 'Pagina'],
    ],
  },
  'acord-imagine': {
    nume: 'Acorduri imagine',
    coloane: [
      ['data', 'Data și ora'],
      ['nume', 'Nume'],
      ['email', 'Email'],
      ['telefon', 'Telefon'],
      ['minor', 'Minor (dacă e cazul)'],
      ['context', 'Eveniment / material'],
      ['utilizari', 'Utilizări acceptate'],
      ['declaratie', 'Declarație'],
    ],
  },
};

function doPost(e) {
  try {
    const cerere = JSON.parse(e.postData.contents);
    const secret = PropertiesService.getScriptProperties().getProperty('SECRET');
    if (!secret || cerere.secret !== secret) return raspuns({ ok: false, eroare: 'neautorizat' });

    const tab = TABURI[cerere.tip];
    if (!tab) return raspuns({ ok: false, eroare: 'tip necunoscut' });

    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      const foaie = obtineFoaie(tab);
      const rand = tab.coloane.map(([cheie]) => curata(cerere.date[cheie]));
      foaie.appendRow(rand);
    } finally {
      lock.releaseLock();
    }

    notifica(tab.nume, cerere.date);
    return raspuns({ ok: true });
  } catch (err) {
    console.error(err);
    return raspuns({ ok: false, eroare: String(err) });
  }
}

function obtineFoaie(tab) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let foaie = ss.getSheetByName(tab.nume);
  if (!foaie) {
    foaie = ss.insertSheet(tab.nume);
    foaie.appendRow(tab.coloane.map(([, titlu]) => titlu));
    foaie.getRange(1, 1, 1, tab.coloane.length).setFontWeight('bold').setBackground('#F9F04D');
    foaie.setFrozenRows(1);
  }
  return foaie;
}

/** Împiedică interpretarea textului ca formulă (=, +, -, @) — protecție „CSV injection”. */
function curata(v) {
  const s = v == null ? '' : String(v);
  return /^[=+\-@\t\r]/.test(s) ? "'" + s : s;
}

function notifica(tab, date) {
  const adresa = PropertiesService.getScriptProperties().getProperty('NOTIFY_EMAIL');
  if (!adresa) return;
  const linii = Object.keys(date).map((k) => k + ': ' + date[k]).join('\n');
  MailApp.sendEmail(adresa, 'basarabenitm.ro — rând nou în „' + tab + '”', linii + '\n\n' + SpreadsheetApp.getActiveSpreadsheet().getUrl());
}

function raspuns(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Rulează manual din editor ca să verifici că totul merge (adaugă un rând de test). */
function test() {
  const secret = PropertiesService.getScriptProperties().getProperty('SECRET');
  const r = doPost({
    postData: {
      contents: JSON.stringify({
        secret: secret,
        tip: 'inscriere',
        date: { data: new Date().toLocaleString('ro-RO'), nume: 'Test', email: 'test@exemplu.ro', oras: 'Chișinău', consimtamant: 'DA', pagina: '/test' },
      }),
    },
  });
  console.log(r.getContent());
}
