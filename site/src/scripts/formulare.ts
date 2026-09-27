/**
 * Funcții comune pentru formularele de pe site (înscriere, acord imagine).
 * Datele ajung la o funcție Cloudflare (functions/api/*), care le scrie
 * în Google Sheet-ul privat al CBT.
 */

export const TURNSTILE_KEY: string | undefined = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || undefined;

export const emailValid = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export async function trimite(
  endpoint: string,
  form: HTMLFormElement,
  extra: Record<string, string> = {},
): Promise<{ ok: true } | { ok: false; eroare: string }> {
  const date = new FormData(form);
  for (const [k, v] of Object.entries(extra)) date.set(k, v);
  try {
    const r = await fetch(endpoint, {
      method: 'POST',
      body: date,
      headers: { Accept: 'application/json' },
    });
    const json = (await r.json().catch(() => ({}))) as { ok?: boolean; eroare?: string };
    if (r.ok && json.ok) return { ok: true };
    return { ok: false, eroare: json.eroare ?? 'Nu am putut trimite formularul.' };
  } catch {
    return { ok: false, eroare: 'Nu există conexiune la internet. Încearcă din nou.' };
  }
}

/** Marchează conversia, ca pagina de mulțumire să trimită evenimentul GA o singură dată. */
export function marcheazaConversie(eveniment: string) {
  try {
    sessionStorage.setItem(`cbt-${eveniment}`, '1');
  } catch {
    /* ignorăm */
  }
}

type Turnstile = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

let incarcare: Promise<Turnstile> | null = null;

/** Încarcă Cloudflare Turnstile (anti-spam, fără cookie-uri de tracking). */
export function incarcaTurnstile(): Promise<Turnstile> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  incarcare ??= new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true;
    s.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error('turnstile')));
    s.onerror = () => reject(new Error('turnstile'));
    document.head.appendChild(s);
  });
  return incarcare;
}
