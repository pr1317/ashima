/* Step one of signing an editor in.

   Decap CMS opens this in a popup. It sends the editor to GitHub to approve
   access, and GitHub sends them back to callback.mjs with a short-lived code.

   This is here rather than using Netlify Identity because Identity is closed
   to new sites, and rather than using the shared OAuth client Netlify used to
   run because that is one more third party in the path of something that can
   write to the repository. The whole exchange is two small functions and the
   only secret involved is this site's own GitHub OAuth app.

   Needs two environment variables set on the Netlify project:
     GITHUB_OAUTH_ID      the OAuth app's Client ID
     GITHUB_OAUTH_SECRET  the OAuth app's Client Secret
*/
import crypto from 'node:crypto';

export default async (req) => {
  const clientId = process.env.GITHUB_OAUTH_ID;
  if (!clientId) {
    return new Response(
      'The site is missing GITHUB_OAUTH_ID. Whoever set the site up needs to add it '
      + 'to the Netlify environment variables.',
      { status: 500, headers: { 'content-type': 'text/plain; charset=utf-8' } },
    );
  }

  const url = new URL(req.url);
  const origin = `${url.protocol}//${url.host}`;

  /* A random value echoed back by GitHub and checked in the callback. Without
     it, someone could hand an editor a link that completes the sign-in with
     an attacker's code. It travels in a cookie the browser only sends back to
     this site. */
  const state = crypto.randomBytes(16).toString('hex');

  const authorize = new URL('https://github.com/login/oauth/authorize');
  authorize.searchParams.set('client_id', clientId);
  authorize.searchParams.set('redirect_uri', `${origin}/api/callback`);
  // `repo` is what Decap needs to read and commit content. GitHub has no
  // narrower scope that still allows writing to a private repository.
  authorize.searchParams.set('scope', url.searchParams.get('scope') || 'repo,user');
  authorize.searchParams.set('state', state);

  return new Response(null, {
    status: 302,
    headers: {
      location: authorize.toString(),
      'set-cookie':
        `cms_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`,
      'cache-control': 'no-store',
    },
  });
};

export const config = { path: '/api/auth' };
