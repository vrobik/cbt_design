/**
 * Google Analytics 4 cu consimțământ (GDPR).
 *
 * - GA4 NU se încarcă deloc până când vizitatorul apasă „Accept” în bannerul de cookie-uri.
 * - Alegerea se păstrează în localStorage și poate fi schimbată oricând din subsol
 *   („Setări cookie-uri”).
 * - Evenimente trimise:
 *     click_inscriere  la orice click pe un buton „Înscrie-te” (parametrul `locatie`)
 *     sign_up          când formularul de înscriere a fost trimis cu succes
 *     acord_imagine    când formularul de acord imagine a fost trimis
 *   În GA4, marchează `sign_up` (și opțional `click_inscriere`) ca „eveniment cheie”.
 *
 * Statisticile de bază (vizite, pagini, țări) le dă și Cloudflare Web Analytics,
 * care nu folosește cookie-uri și nu cere consimțământ.
 */

export const GA_ID: string | undefined = import.meta.env.PUBLIC_GA_ID || undefined;

const CHEIE = 'cbt-consimtamant';
export type Consimtamant = 'acceptat' | 'refuzat';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function citesteConsimtamant(): Consimtamant | null {
  try {
    const v = localStorage.getItem(CHEIE);
    return v === 'acceptat' || v === 'refuzat' ? v : null;
  } catch {
    return null;
  }
}

export function salveazaConsimtamant(v: Consimtamant) {
  try {
    localStorage.setItem(CHEIE, v);
  } catch {
    /* navigare privată: alegerea ține doar pe pagina curentă */
  }
  if (v === 'acceptat') {
    incarcaGA();
  } else {
    window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
    stergeCookieGA();
  }
}

let incarcat = false;

function incarcaGA() {
  if (!GA_ID || incarcat) return;
  incarcat = true;
  window.dataLayer = window.dataLayer || [];
  // gtag trebuie să pună în dataLayer obiectul `arguments`, nu un array.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  window.gtag('js', new Date());
  window.gtag('config', GA_ID);
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(s);
}

function stergeCookieGA() {
  const domenii = ['', location.hostname, `.${location.hostname.replace(/^www\./, '')}`];
  for (const c of document.cookie.split(';')) {
    const nume = c.split('=')[0]?.trim();
    if (!nume || !/^_ga/.test(nume)) continue;
    for (const d of domenii) {
      document.cookie = `${nume}=; Max-Age=0; path=/${d ? `; domain=${d}` : ''}`;
    }
  }
}

/** Trimite un eveniment către GA4 — doar dacă vizitatorul a acceptat. */
export function trimiteEveniment(nume: string, parametri: Record<string, string> = {}) {
  if (!GA_ID || citesteConsimtamant() !== 'acceptat') return;
  incarcaGA();
  window.gtag?.('event', nume, parametri);
}

/** Pornește la fiecare pagină (vezi BaseLayout). */
export function initAnalytics() {
  if (citesteConsimtamant() === 'acceptat') incarcaGA();

  // Orice element cu data-track="nume_eveniment" trimite evenimentul la click.
  document.addEventListener('click', (e) => {
    const el = (e.target as Element | null)?.closest<HTMLElement>('[data-track]');
    if (!el?.dataset.track) return;
    trimiteEveniment(el.dataset.track, {
      locatie: el.dataset.trackLocatie ?? 'necunoscut',
      pagina: location.pathname,
    });
  });

  // Pagina de mulțumire: evenimentul de conversie se trimite o singură dată.
  const conversie = document.body.dataset.conversie;
  if (conversie) {
    try {
      if (sessionStorage.getItem(`cbt-${conversie}`)) {
        sessionStorage.removeItem(`cbt-${conversie}`);
        trimiteEveniment(conversie, { method: 'formular_site' });
      }
    } catch {
      /* ignorăm */
    }
  }
}
