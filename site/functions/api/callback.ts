/**
 * GET /api/callback — GitHub revine aici cu un cod; îl schimbăm pe un token
 * și îl trimitem ferestrei CMS. Adresa trebuie să fie „Authorization callback URL”
 * în GitHub OAuth App: https://basarabenitm.ro/api/callback
 */
import { type OAuthEnv, raspunsPopup } from '../_shared/oauth';

export const onRequestGet: PagesFunction<OAuthEnv> = async ({ request, env }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const csrf = request.headers.get('Cookie')?.match(/\bcms-csrf=([0-9a-f]{32})\b/)?.[1];

  if (!code || !state) {
    return raspunsPopup({ error: 'GitHub nu a trimis codul de autorizare.', errorCode: 'AUTH_CODE_REQUEST_FAILED' });
  }
  if (!csrf || csrf !== state) {
    return raspunsPopup({ error: 'Sesiune expirată sau invalidă. Încearcă din nou.', errorCode: 'CSRF_DETECTED' });
  }
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return raspunsPopup({ error: 'OAuth nu este configurat.', errorCode: 'MISCONFIGURED_CLIENT' });
  }

  let token: string | undefined;
  let error: string | undefined;
  try {
    const r = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'User-Agent': 'basarabenitm-cms' },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: `${url.origin}/api/callback`,
      }),
    });
    const rez = (await r.json()) as { access_token?: string; error?: string; error_description?: string };
    token = rez.access_token;
    error = rez.error_description ?? rez.error;
  } catch {
    error = 'Nu am putut contacta GitHub.';
  }

  if (!token) {
    return raspunsPopup({ error: error ?? 'Tokenul nu a fost primit.', errorCode: 'TOKEN_REQUEST_FAILED' });
  }
  return raspunsPopup({ token });
};
