// Shared helpers for the Cloudflare Worker in /server (checkout, admin, Stripe webhook).
// Secrets live in Cloudflare → Workers & Pages → almomin → Settings → Variables and Secrets (never in code):
//   STRIPE_SECRET_KEY      Stripe key used for checkout and to read orders
//   ADMIN_PASSWORD         password for almomin.eu/admin (at least 12 characters)
//   GITHUB_TOKEN           fine-grained token, "Contents: read and write" on the website repository only
//   STRIPE_WEBHOOK_SECRET  signing secret (whsec_…) of the Stripe webhook that lowers stock
//   GITHUB_REPO            optional, defaults to Zubair-aalto/almomin-website
// Only Web APIs are used (fetch, crypto.subtle, TextEncoder), so no Node compatibility flag is needed.

export const json = (status, body) => new Response(JSON.stringify(body), {
  status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });

const enc = new TextEncoder();
export const b64FromBytes = bytes => { let s = ""; for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000)); return btoa(s); };
export const b64FromText = text => b64FromBytes(enc.encode(text));
export const textFromB64 = b64 => new TextDecoder().decode(Uint8Array.from(atob(String(b64).replace(/\s/g, "")), c => c.charCodeAt(0)));
const hex = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
const b64url = buf => b64FromBytes(new Uint8Array(buf)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
export async function hmac(keyText, msg, out = "hex") {
  const key = await crypto.subtle.importKey("raw", enc.encode(keyText), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(msg));
  return out === "hex" ? hex(sig) : b64url(sig);
}
export const sha256 = async t => hex(await crypto.subtle.digest("SHA-256", enc.encode(String(t))));
export function same(a, b) {                       // constant-time string comparison
  a = String(a); b = String(b); if (a.length !== b.length) return false;
  let d = 0; for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i); return d === 0;
}

/* ---------- Admin login (signed token, valid 12 hours) ---------- */
const HOURS = 12;
const secretOf = env => "almomin-admin:" + (env.ADMIN_PASSWORD || "");
export const adminConfigured = env => (env.ADMIN_PASSWORD || "").length >= 12;
export async function passwordOk(env, pw) {
  if (!adminConfigured(env)) return false;
  return same(await sha256(pw || ""), await sha256(env.ADMIN_PASSWORD));
}
export async function makeToken(env) {
  const exp = String(Date.now() + HOURS * 3600e3);
  return `${exp}.${await hmac(secretOf(env), exp, "b64url")}`;
}
// Returns null when the request has a valid admin token, otherwise an error Response
export async function requireAdmin(request, env) {
  if (!adminConfigured(env)) return json(503, { error: "admin_not_configured" });
  const t = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const [exp, sig] = t.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return json(401, { error: "login_required" });
  return same(sig, await hmac(secretOf(env), exp, "b64url")) ? null : json(401, { error: "login_required" });
}

/* ---------- Stripe and GitHub ---------- */
const err = (message, status) => Object.assign(new Error(message), { status });
export async function stripe(env, path, { method = "GET", form } = {}) {
  if (!env.STRIPE_SECRET_KEY) throw err("stripe_not_configured", 503);
  const r = await fetch("https://api.stripe.com/v1/" + path, {
    method, headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`, ...(form ? { "Content-Type": "application/x-www-form-urlencoded" } : {}) },
    body: form ? form.toString() : undefined });
  const data = await r.json();
  if (!r.ok) throw err(data?.error?.message || "stripe_error", r.status === 403 ? 403 : 502);
  return data;
}
export async function github(env, path, { method = "GET", body } = {}) {
  if (!env.GITHUB_TOKEN) throw err("github_not_configured", 503);
  const repo = env.GITHUB_REPO || "Zubair-aalto/almomin-website";
  const r = await fetch(`https://api.github.com/repos/${repo}/${path}`, {
    method, headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "User-Agent": "almomin-admin" },
    body: body ? JSON.stringify(body) : undefined });
  const data = r.status === 204 ? {} : await r.json();
  if (!r.ok) throw err(data?.message || "github_error", r.status === 409 || r.status === 422 ? 409 : 502);
  return data;
}
export const fail = e => json(e.status || 500, { error: e.message || "error" });

/* ---------- Product data (js/shop-data.js) in GitHub ---------- */
export async function readShopData(env) {
  const f = await github(env, "contents/js/shop-data.js?ref=main");
  const text = textFromB64(f.content);
  const a = text.indexOf("{"), b = text.lastIndexOf("}") + 1;
  return { text, a, b, data: JSON.parse(text.slice(a, b)), sha: f.sha };
}
