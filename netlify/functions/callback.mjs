/* Step two of signing an editor in.

   GitHub sends the editor back here with a code. This trades that code for an
   access token and hands it to the CMS window that opened the popup.

   The handover is a postMessage exchange Decap defines: the popup announces
   itself, the CMS answers, and only then is the token sent — addressed to the
   exact origin the CMS replied from, never to "*". The token is a repository
   write credential, so it must not be put anywhere it could be read later:
   not in the URL, not in a cookie, and not in this page's markup beyond the
   moment it is passed on.
*/

const page = (script) =>
  new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8">`
    + `<title>Signing in…</title></head><body>`
    + `<p style="font:16px/1.6 system-ui,sans-serif;color:#2b3a33;text-align:center;margin-top:18vh">`
    + `Signing you in…</p><script>${script}</script></body></html>`,
    { status: 200, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } },
  );

/* Decap listens for `authorization:github:success:<json>` and
   `authorization:github:error:<json>`. The popup first says "authorizing",
   waits for the CMS to answer, and replies to that answer's origin. */
const handover = (payload, ok) => `
  (function () {
    var message = ${JSON.stringify(`authorization:github:${ok ? 'success' : 'error'}:`)} +
      ${JSON.stringify(JSON.stringify(payload))};
    function receive(e) {
      if (!e.origin || e.origin !== window.location.origin) return;
      window.removeEventListener('message', receive, false);
      window.opener.postMessage(message, e.origin);
      window.setTimeout(function () { window.close(); }, 400);
    }
    if (!window.opener) {
      document.body.innerHTML =
        '<p style="font:16px/1.6 system-ui,sans-serif;text-align:center;margin-top:18vh">' +
        'Open the editor at /admin and sign in from there.</p>';
      return;
    }
    window.addEventListener('message', receive, false);
    window.opener.postMessage('authorizing:github', window.location.origin);
  })();
`;

const readCookie = (header, name) => {
  for (const part of (header || '').split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return v.join('=');
  }
  return null;
};

export default async (req) => {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const expected = readCookie(req.headers.get('cookie'), 'cms_oauth_state');

  // Clear the state cookie however this ends; it is good for one attempt.
  const spent = 'cms_oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0';

  const fail = (message) => {
    const res = page(handover({ message }, false));
    res.headers.append('set-cookie', spent);
    return res;
  };

  if (url.searchParams.get('error')) {
    return fail(url.searchParams.get('error_description') || 'GitHub refused the sign-in.');
  }
  if (!code) return fail('GitHub did not send a sign-in code. Try again from /admin.');
  if (!state || !expected || state !== expected) {
    return fail('The sign-in could not be verified. Start again from /admin, in the same browser.');
  }

  const id = process.env.GITHUB_OAUTH_ID;
  const secret = process.env.GITHUB_OAUTH_SECRET;
  if (!id || !secret) return fail('The site is missing its GitHub OAuth settings.');

  let token;
  try {
    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { accept: 'application/json', 'content-type': 'application/json' },
      body: JSON.stringify({
        client_id: id,
        client_secret: secret,
        code,
        redirect_uri: `${url.protocol}//${url.host}/api/callback`,
      }),
    });
    const body = await res.json();
    if (body.error) return fail(body.error_description || body.error);
    token = body.access_token;
  } catch {
    return fail('Could not reach GitHub to complete the sign-in. Try again in a moment.');
  }

  if (!token) return fail('GitHub did not return an access token.');

  const res = page(handover({ token, provider: 'github' }, true));
  res.headers.append('set-cookie', spent);
  return res;
};

export const config = { path: '/api/callback' };
