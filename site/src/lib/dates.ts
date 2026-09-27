/**
 * Datele din CMS sunt zile calendaristice („2026-03-14”), iar ora e un câmp separat
 * („18:00”), în ora Timișoarei. Le citim mereu cu getterii UTC ca să nu depindem
 * de fusul orar al serverului care face build-ul.
 */

const TZ = 'Europe/Bucharest';

const LUNI_SCURT = ['IAN', 'FEB', 'MAR', 'APR', 'MAI', 'IUN', 'IUL', 'AUG', 'SEP', 'OCT', 'NOI', 'DEC'];
const LUNI = [
  'ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie',
  'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie',
];

const pad = (n: number) => String(n).padStart(2, '0');

/** „14 MAR 2026” — pentru chip-urile galbene mono. */
export function dataScurta(d: Date): string {
  return `${pad(d.getUTCDate())} ${LUNI_SCURT[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** „14 martie 2026” — pentru text. */
export function dataLunga(d: Date): string {
  return `${d.getUTCDate()} ${LUNI[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** „2026-03-14” */
export function dataIso(d: Date): string {
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}

/** Decalajul orei României la acea dată și oră: „+02:00” iarna, „+03:00” vara. */
function offsetBucuresti(zi: string, ora: string): string {
  const aprox = new Date(`${zi}T${ora}:00Z`);
  const parte = new Intl.DateTimeFormat('en-US', { timeZone: TZ, timeZoneName: 'longOffset' })
    .formatToParts(aprox)
    .find((p) => p.type === 'timeZoneName')?.value;
  const m = parte?.match(/GMT([+-]\d{2}):?(\d{2})?/);
  return m ? `${m[1]}:${m[2] ?? '00'}` : '+02:00';
}

/** ISO 8601 complet cu fus orar, pentru schema.org: „2026-03-14T18:00:00+02:00”. */
export function dataOraIso(d: Date, ora?: string): string {
  const zi = dataIso(d);
  if (!ora) return zi;
  const [h, min] = ora.split(':');
  const hhmm = `${pad(Number(h))}:${min}`;
  return `${zi}T${hhmm}:00${offsetBucuresti(zi, hhmm)}`;
}

/** Ziua de azi în Timișoara, ca „YYYY-MM-DD”. */
export function aziIso(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(new Date());
}

/**
 * Un eveniment e „viitor” până la sfârșitul zilei în care se termină.
 * Build-ul zilnic automat (vezi .github/workflows) mută evenimentele trecute la locul lor.
 */
export function esteViitor(data: Date, dataSfarsit?: Date): boolean {
  return dataIso(dataSfarsit ?? data) >= aziIso();
}
