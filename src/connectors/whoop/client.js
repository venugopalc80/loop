const API_BASE = 'https://api.prod.whoop.com/developer';
const AUTH_BASE = 'https://api.prod.whoop.com/oauth/oauth2';

export const WHOOP_SCOPES = [
  'read:recovery', 'read:cycles', 'read:workout', 'read:sleep', 'read:profile', 'read:body_measurement', 'offline'
];

export function createWhoopAuthorizationUrl({ clientId, redirectUri, state, scopes=WHOOP_SCOPES }) {
  const url = new URL(AUTH_BASE + '/auth');
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('scope', scopes.join(' '));
  url.searchParams.set('state', state);
  return url.toString();
}

export async function exchangeWhoopCode({ clientId, clientSecret, code, redirectUri, fetchImpl=fetch }) {
  const body = new URLSearchParams({ grant_type:'authorization_code', code, client_id:clientId, client_secret:clientSecret, redirect_uri:redirectUri });
  const response = await fetchImpl(AUTH_BASE + '/token', { method:'POST', headers:{'content-type':'application/x-www-form-urlencoded'}, body });
  if (!response.ok) throw new Error('WHOOP token exchange failed: ' + response.status);
  return response.json();
}

export async function refreshWhoopToken({ clientId, clientSecret, refreshToken, fetchImpl=fetch }) {
  const body = new URLSearchParams({ grant_type:'refresh_token', refresh_token:refreshToken, client_id:clientId, client_secret:clientSecret, scope:'offline' });
  const response = await fetchImpl(AUTH_BASE + '/token', { method:'POST', headers:{'content-type':'application/x-www-form-urlencoded'}, body });
  if (!response.ok) throw new Error('WHOOP token refresh failed: ' + response.status);
  return response.json();
}

export async function whoopRequest(path, accessToken, params={}, fetchImpl=fetch) {
  const url = new URL(API_BASE + path);
  Object.entries(params).forEach(([key,value]) => { if (value != null) url.searchParams.set(key, value); });
  const response = await fetchImpl(url, { headers:{ Authorization:'Bearer ' + accessToken, Accept:'application/json' } });
  if (!response.ok) throw new Error('WHOOP API request failed: ' + response.status);
  return response.json();
}

export async function getWhoopPage(path, accessToken, params={}, fetchImpl=fetch) {
  return whoopRequest(path, accessToken, { limit:25, ...params }, fetchImpl);
}

export const whoopEndpoints = Object.freeze({
  profile:'/v2/user/profile/basic',
  body:'/v2/user/measurement/body',
  cycles:'/v2/cycle',
  recovery:'/v2/recovery',
  sleep:'/v2/activity/sleep',
  workouts:'/v2/activity/workout'
});