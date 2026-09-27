/**
 * GET /api/auth — primul pas al autentificării în CMS: redirect către GitHub.
 * CMS-ul deschide această adresă într-o fereastră pop-up (vezi public/admin/index.html).
 */
import { type OAuthEnv, raspunsPopup, scope } from '../_shared/oauth';

export const onRequestGet: PagesFunction<OAuthEnv> = async ({ request, env }) => {
  const url = new URL(request.url);
  const provider = url.searchParams.get('provider') ?? 'github';
  if (provider !== 'github') {
    return raspunsPopup({ error: 'Doar GitHub este configurat.', errorCode: 'UNSUPPORTED_BACKEND' });
  }
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return raspunsPopup({
      error: 'GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET nu sunt setate în Cloudflare.',
      errorCode: 'MISCONFIGURED_CLIENT',
    });
  }

  const csrf = crypto.randomUUID().replaceAll('-', '');
  const params = new URLSearchParams({
    client_id: env.GITHUB_CLIENT_ID,
    redirect_uri: `${url.origin}/api/callback`,
    scope: scope(url.searchParams.get('scope')),
    state: csrf,
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: `https://github.com/login/oauth/authorize?${params}`,
      'Set-Cookie': `cms-csrf=${csrf}; HttpOnly; Path=/api/; Max-Age=600; SameSite=Lax; Secure`,
      'Cache-Control': 'no-store',
    },
  });
};
