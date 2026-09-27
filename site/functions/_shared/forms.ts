/**
 * Cod comun pentru formularele trimise către Google Sheet-ul CBT.
 *
 * Variabile de mediu (Cloudflare → Pages → Settings → Variables and Secrets):
 *   SHEETS_WEBHOOK_URL     adresa Web App a scriptului Google Apps Script (vezi docs/)
 *   SHEETS_WEBHOOK_SECRET  parola comună dintre site și script (secret)
 *   TURNSTILE_SECRET_KEY   cheia secretă Cloudflare Turnstile (secret, opțional dar recomandat)
 */

export interface Env {
  SHEETS_WEBHOOK_URL?: string;
  SHEETS_WEBHOOK_SECRET?: string;
  TURNSTILE_SECRET_KEY?: string;
}

export type Campuri = Record<string, string | string[]>;

/** Citește formularul (FormData clasic sau JSON). Câmpurile repetate devin liste. */
export async function citesteFormular(request: Request): Promise<Campuri> {
  const tip = request.headers.get('Content-Type') ?? '';
  if (tip.includes('application/json')) {
    return (await request.json()) as Campuri;
  }
  const fd = await request.formData();
  const out: Campuri = {};
  for (const [k, v] of fd.entries()) {
    if (typeof v !== 'string') continue;
    const existent = out[k];
    if (existent === undefined) out[k] = v;
    else out[k] = Array.isArray(existent) ? [...existent, v] : [existent, v];
  }
  return out;
}

export const text = (v: string | string[] | undefined, max = 200): string =>
  (Array.isArray(v) ? v.join(', ') : (v ?? '')).trim().slice(0, max);

export const lista = (v: string | string[] | undefined): string[] =>
  (Array.isArray(v) ? v : v ? [v] : []).map((s) => s.trim()).filter(Boolean);

export const emailValid = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) && v.length <= 254;

/** Cererea vine chiar de pe site-ul nostru? (protecție simplă împotriva trimiterilor din alte site-uri) */
export function origineValida(request: Request): boolean {
  const origin = request.headers.get('Origin');
  if (!origin) return true; // unele browsere nu trimit Origin la formulare clasice
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

export async function verificaTurnstile(env: Env, token: string, ip: string | null): Promise<boolean> {
  if (!env.TURNSTILE_SECRET_KEY) return true; // Turnstile neconfigurat (ex. local)
  if (!token) return false;
  const body = new FormData();
  body.append('secret', env.TURNSTILE_SECRET_KEY);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);
  const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  const rez = (await r.json()) as { success?: boolean };
  return rez.success === true;
}

/** Trimite rândul către Google Apps Script, care îl adaugă în Sheet. */
export async function trimiteLaSheet(env: Env, tip: string, date: Record<string, string>): Promise<void> {
  if (!env.SHEETS_WEBHOOK_URL || !env.SHEETS_WEBHOOK_SECRET) {
    throw new Error('SHEETS_WEBHOOK_URL / SHEETS_WEBHOOK_SECRET nu sunt configurate');
  }
  const r = await fetch(env.SHEETS_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: env.SHEETS_WEBHOOK_SECRET, tip, date }),
    redirect: 'follow',
  });
  const rez = (await r.json().catch(() => ({}))) as { ok?: boolean; eroare?: string };
  if (!r.ok || !rez.ok) throw new Error(`Google Sheet a răspuns cu eroare: ${rez.eroare ?? r.status}`);
}

const vreaJson = (request: Request) => (request.headers.get('Accept') ?? '').includes('application/json');

/** Succes: JSON pentru formularele cu JavaScript, redirect pentru cele clasice. */
export function succes(request: Request, redirect: string): Response {
  if (vreaJson(request)) return Response.json({ ok: true });
  return Response.redirect(new URL(redirect, request.url).href, 303);
}

export function eroare(request: Request, mesaj: string, status = 400): Response {
  if (vreaJson(request)) return Response.json({ ok: false, eroare: mesaj }, { status });
  const html = `<!doctype html><html lang="ro"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Formularul nu a fost trimis</title>
<body style="font-family:system-ui,sans-serif;max-width:560px;margin:64px auto;padding:0 20px;line-height:1.6;color:#2A2A2A">
<h1 style="font-size:1.6rem">Formularul nu a fost trimis</h1><p>${mesaj.replace(/</g, '&lt;')}</p>
<p><a href="javascript:history.back()" style="color:#2F448A;font-weight:600">← Înapoi la formular</a></p></body></html>`;
  return new Response(html, { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

export function acumRo(): string {
  return new Intl.DateTimeFormat('ro-RO', {
    timeZone: 'Europe/Bucharest',
    dateStyle: 'short',
    timeStyle: 'medium',
  }).format(new Date());
}
