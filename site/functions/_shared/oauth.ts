/**
 * Autentificare GitHub pentru CMS (Sveltia CMS, la /admin/).
 * Implementează același protocol ca „Sveltia CMS Authenticator” / Decap CMS,
 * dar rulează direct în site, ca să nu fie nevoie de un Worker separat.
 *
 * Variabile de mediu (Cloudflare → Pages → Settings → Variables and Secrets):
 *   GITHUB_CLIENT_ID      din GitHub OAuth App
 *   GITHUB_CLIENT_SECRET  din GitHub OAuth App (secret)
 */

export interface OAuthEnv {
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
}

// Scope-urile pe care CMS-ul le poate cere. „repo” e necesar dacă depozitul e privat.
const PERMISE = ['repo', 'public_repo', 'user', 'read:user', 'user:email'];
const IMPLICIT = 'repo,user';

export function scope(cerut: string | null): string {
  const s = (cerut ?? '').split(/[\s,]+/).filter(Boolean);
  return s.length && s.every((x) => PERMISE.includes(x)) ? s.join(',') : IMPLICIT;
}

const js = (v: unknown) => JSON.stringify(v ?? null).replaceAll('<', '\\u003c');

/**
 * Pagina din fereastra pop-up care trimite rezultatul înapoi către CMS.
 * Tokenul pleacă DOAR către o fereastră de pe același domeniu (fereastra /admin/ a site-ului).
 */
export function raspunsPopup(rez: { token?: string; error?: string; errorCode?: string }): Response {
  const stare = rez.token ? 'success' : 'error';
  const continut = rez.token
    ? { provider: 'github', token: rez.token }
    : { provider: 'github', error: rez.error, errorCode: rez.errorCode };
  const mesaj = `authorization:github:${stare}:${JSON.stringify(continut)}`;
  const html = `<!doctype html><html lang="ro"><meta charset="utf-8"><title>Autentificare CMS</title><body><script>
(() => {
  const mesaj = ${js(mesaj)};
  const areToken = ${js(!!rez.token)};
  window.addEventListener('message', ({ data, origin }) => {
    if (data !== 'authorizing:github') return;
    if (areToken && origin !== window.location.origin) return;
    window.opener?.postMessage(mesaj, origin);
  });
  window.opener?.postMessage('authorizing:github', '*');
})();
</script><p style="font-family:system-ui,sans-serif">Se finalizează autentificarea… Fereastra se poate închide.</p></body></html>`;
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Set-Cookie': 'cms-csrf=; HttpOnly; Max-Age=0; Path=/api/; SameSite=Lax; Secure',
      'Cache-Control': 'no-store',
    },
  });
}
