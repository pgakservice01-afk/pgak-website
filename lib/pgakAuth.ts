/**
 * Session handling for the camera wall.
 *
 * The cloud issues a 15-minute access token. A wall left on a screen in a room
 * would sign itself out four times an hour, so we also hold a refresh token and
 * renew quietly.
 *
 * TWO THINGS ABOUT THE REFRESH ENDPOINT DRIVE THIS FILE'S SHAPE:
 *
 *  1. It ROTATES. Every successful refresh returns a NEW refresh token and
 *     invalidates the one used. The server treats a re-used token as theft and
 *     revokes the entire family — signing the customer out for real.
 *  2. A wall page has a dozen tiles polling independently. When the access
 *     token expires they all get 401 within the same second.
 *
 * Put together: a naive "on 401, refresh" would fire twelve concurrent
 * refreshes, eleven of which present an already-rotated token, and the customer
 * is logged out by the security feature meant to protect them. So every refresh
 * goes through ONE in-flight promise that all callers await.
 *
 * Storage is sessionStorage, matching the sign-in page. It survives reloads and
 * keeps an unattended display running indefinitely, but never touches disk and
 * dies with the browser — so a stolen laptop does not carry a 90-day session.
 */

const API = process.env.NEXT_PUBLIC_PGAK_API || "";

const ACCESS_KEY = "pgak_token";
const REFRESH_KEY = "pgak_refresh";

function read(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    /* private mode / storage disabled — the session just won't survive a reload */
  }
}

export function getAccessToken(): string | null {
  return read(ACCESS_KEY);
}

export function clearSession() {
  try {
    sessionStorage.removeItem(ACCESS_KEY);
    sessionStorage.removeItem(REFRESH_KEY);
  } catch {
    /* nothing we can do, and nothing that should stop the redirect */
  }
}

/** Thrown when the session is genuinely over — caller must send the user to sign-in. */
export class SessionExpired extends Error {
  constructor() {
    super("Session expired");
    this.name = "SessionExpired";
  }
}

/**
 * Mint a refresh token once, using the access token we already have. Safe to
 * call on every mount: it no-ops when one is already held. Best-effort — an
 * older backend without the endpoint just means the wall behaves as it did
 * before, signing out when the access token lapses.
 */
export async function ensureRefreshToken(): Promise<void> {
  if (read(REFRESH_KEY)) return;
  const access = getAccessToken();
  if (!access || !API) return;
  try {
    const res = await fetch(`${API}/auth/refresh-token`, {
      method: "POST",
      headers: { Authorization: `Bearer ${access}` },
      cache: "no-store",
    });
    if (!res.ok) return;
    const data = (await res.json()) as { refresh_token?: string };
    if (data?.refresh_token) write(REFRESH_KEY, data.refresh_token);
  } catch {
    /* offline or endpoint absent — not fatal */
  }
}

// The single in-flight refresh. Every caller during a renewal awaits this same
// promise, so exactly one rotated token is ever presented to the server.
let inFlight: Promise<string> | null = null;

async function doRefresh(): Promise<string> {
  const refresh = read(REFRESH_KEY);
  if (!refresh || !API) throw new SessionExpired();

  const res = await fetch(`${API}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refresh }),
    cache: "no-store",
  });
  // The endpoint answers 401 for every failure mode on purpose, so the client
  // has one rule: refresh failed -> sign in again.
  if (!res.ok) throw new SessionExpired();

  const data = (await res.json()) as { access_token?: string; refresh_token?: string };
  if (!data?.access_token || !data?.refresh_token) throw new SessionExpired();

  write(ACCESS_KEY, data.access_token);
  // Storing the ROTATED token is mandatory. Keeping the old one would present a
  // spent token next time, which the server reads as reuse and answers by
  // revoking the family.
  write(REFRESH_KEY, data.refresh_token);
  return data.access_token;
}

export function refreshAccessToken(): Promise<string> {
  if (!inFlight) {
    inFlight = doRefresh().finally(() => {
      inFlight = null;
    });
  }
  return inFlight;
}

/**
 * fetch() with the access token attached, renewing once on 401.
 *
 * Retries the original request exactly once. A second 401 after a fresh token
 * is not a token problem — it means this user genuinely may not have that
 * camera — so it surfaces rather than looping.
 */
export async function authedFetch(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  const access = getAccessToken();
  if (!access) throw new SessionExpired();

  const call = (token: string) =>
    fetch(`${API}${path}`, {
      ...init,
      headers: { ...(init.headers || {}), Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

  let res = await call(access);
  if (res.status !== 401) return res;

  // 401 -> renew (shared with every other caller) and try the request again.
  const fresh = await refreshAccessToken();
  res = await call(fresh);
  if (res.status === 401) throw new SessionExpired();
  return res;
}
