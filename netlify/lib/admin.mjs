// Shared helpers for the Almo'min admin functions.
// Settings (Netlify → Site configuration → Environment variables; never in code):
//   ADMIN_PASSWORD     the password for almomin.eu/admin (at least 12 characters)
//   STRIPE_SECRET_KEY  already set for checkout; also used to read orders
//   GITHUB_TOKEN       fine-grained token with "Contents: read and write" on the website repository only
//   GITHUB_REPO        optional, defaults to Zubair-aalto/almomin-website
import crypto from "node:crypto";

export const env = k => (globalThis.Netlify?.env?.get?.(k)) ?? (globalThis.process?.env?.[k]);
export const json = (status, body) => new Response(JSON.stringify(body), {
  status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });

const SESSION_HOURS = 12;
const secret = () => crypto.createHash("sha256").update("almomin-admin:" + (env("ADMIN_PASSWORD") || "")).digest();
const sign = s => crypto.createHmac("sha256", secret()).update(s).digest("base64url");

export function passwordOk(pw) {
  const real = env("ADMIN_PASSWORD") || "";
  if (real.length < 12) return false;              // refuse to work with no or a weak password
  const a = crypto.createHash("sha256").update(String(pw || "")).digest();
  const b = crypto.createHash("sha256").update(real).digest();
  return crypto.timingSafeEqual(a, b);
}
export function makeToken() {
  const exp = String(Date.now() + SESSION_HOURS * 3600e3);
  return `${exp}.${sign(exp)}`;
}
// Returns null when the request carries a valid admin token, otherwise an error Response
export function requireAdmin(req) {
  if ((env("ADMIN_PASSWORD") || "").length < 12) return json(503, { error: "admin_not_configured" });
  const t = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const [exp, sig] = t.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return json(401, { error: "login_required" });
  const good = sign(exp);
  if (sig.length !== good.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(good))) return json(401, { error: "login_required" });
  return null;
}

export async function stripe(path, { method = "GET", form } = {}) {
  const key = env("STRIPE_SECRET_KEY");
  if (!key) throw Object.assign(new Error("stripe_not_configured"), { status: 503 });
  const r = await fetch("https://api.stripe.com/v1/" + path, {
    method, headers: { Authorization: `Bearer ${key}`, ...(form ? { "Content-Type": "application/x-www-form-urlencoded" } : {}) },
    body: form ? form.toString() : undefined });
  const data = await r.json();
  if (!r.ok) throw Object.assign(new Error(data?.error?.message || "stripe_error"), { status: r.status === 403 ? 403 : 502, stripe: data?.error });
  return data;
}

export async function github(path, { method = "GET", body } = {}) {
  const token = env("GITHUB_TOKEN");
  if (!token) throw Object.assign(new Error("github_not_configured"), { status: 503 });
  const repo = env("GITHUB_REPO") || "Zubair-aalto/almomin-website";
  const r = await fetch(`https://api.github.com/repos/${repo}/${path}`, {
    method, headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "User-Agent": "almomin-admin" },
    body: body ? JSON.stringify(body) : undefined });
  const data = r.status === 204 ? {} : await r.json();
  if (!r.ok) throw Object.assign(new Error(data?.message || "github_error"), { status: r.status === 409 || r.status === 422 ? 409 : 502 });
  return data;
}
export const fail = e => json(e.status || 500, { error: e.message || "error" });
