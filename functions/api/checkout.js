// POST /api/checkout: turns a basket into a Stripe Checkout page.
// Optional settings: SHIPPING_POSTI_EUR, SHIPPING_MATKAHUOLTO_EUR ("off" hides one), PICKUP_ENABLED ("false" hides pickup).
import { ITEMS } from "../../lib/catalog.js";
import { json } from "../../lib/server.js";

const DEFAULT_SHIPPING = { posti: "7.90", matkahuolto: "6.90" };   // keep in sync with the website text
const cents = eur => Math.round(Number(eur) * 100);

export function shippingOptions(env) {
  const out = [];
  const posti = env.SHIPPING_POSTI_EUR || DEFAULT_SHIPPING.posti;
  const mh = env.SHIPPING_MATKAHUOLTO_EUR || DEFAULT_SHIPPING.matkahuolto;
  if (mh !== "off") out.push({ name: "Matkahuolto", eur: mh });
  if (posti !== "off") out.push({ name: "Posti", eur: posti });
  if (env.PICKUP_ENABLED !== "false") out.push({ name: "Pickup in Espoo (free)", eur: 0 });
  return out;
}

export function buildSession(items, origin, shipping) {
  const byId = Object.fromEntries(ITEMS.map(i => [i.id, i]));
  if (!Array.isArray(items) || !items.length || items.length > 40) throw new Error("bad_basket");
  const p = new URLSearchParams();
  p.set("mode", "payment");
  p.set("locale", "auto");
  p.set("success_url", `${origin}/thanks.html?session_id={CHECKOUT_SESSION_ID}`);
  p.set("cancel_url", `${origin}/#collection`);
  p.set("shipping_address_collection[allowed_countries][0]", "FI");
  p.set("phone_number_collection[enabled]", "true");
  p.set("billing_address_collection", "auto");
  // Stock check: never sell more than the stock saved in the admin (no number = not tracked)
  const wanted = {};
  items.forEach(({ sku, qty }) => { wanted[sku] = (wanted[sku] || 0) + Math.floor(Number(qty)); });
  for (const [sku, q] of Object.entries(wanted)) {
    const [id, k] = String(sku).split("~"); const it = byId[id]; const o = it && it.options[Number(k) || 0];
    if (o && Number.isInteger(o.stock) && q > o.stock) {
      throw new Error((o.stock <= 0 ? "sold_out:" : "not_enough:") + it.title + (o.label ? ` (${o.label})` : ""));
    }
  }
  // What was bought, so the stock can be lowered after payment (see /api/stripe-webhook)
  const cart = Object.entries(wanted).map(([sku, q]) => `${sku}*${q}`).join(",");
  for (let c = 0; c * 480 < cart.length && c < 20; c++) p.set(`metadata[cart_${c}]`, cart.slice(c * 480, c * 480 + 480));
  items.forEach(({ sku, qty }, i) => {
    const [id, k] = String(sku).split("~");
    const it = byId[id]; const o = it && it.options[Number(k) || 0];
    const q = Math.floor(Number(qty));
    if (!it || !o || !(q >= 1 && q <= 20)) throw new Error("bad_item");
    const L = `line_items[${i}]`;
    p.set(`${L}[quantity]`, String(q));
    p.set(`${L}[price_data][currency]`, "eur");
    p.set(`${L}[price_data][unit_amount]`, String(cents(o.price)));
    p.set(`${L}[price_data][product_data][name]`, it.title + (o.label ? ` (${o.label})` : ""));
    if (it.image) p.set(`${L}[price_data][product_data][images][0]`, `${origin}/${it.image}`);
  });
  shipping.forEach((s, i) => {
    const S = `shipping_options[${i}][shipping_rate_data]`;
    p.set(`${S}[type]`, "fixed_amount");
    p.set(`${S}[display_name]`, s.name);
    p.set(`${S}[fixed_amount][amount]`, String(cents(s.eur)));
    p.set(`${S}[fixed_amount][currency]`, "eur");
  });
  return p;
}

export async function onRequestPost({ request, env }) {
  const shipping = shippingOptions(env);
  if (!env.STRIPE_SECRET_KEY || !shipping.some(s => s.eur > 0)) return json(503, { error: "not_configured" });
  let body;
  try { body = await request.json(); } catch { return json(400, { error: "bad_json" }); }
  const origin = new URL(request.url).origin;
  let params;
  try { params = buildSession(body.items, origin, shipping); } catch (e) { return json(400, { error: e.message }); }
  const r = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: params
  });
  const data = await r.json();
  if (!r.ok) { console.error("Stripe error", data?.error?.message); return json(502, { error: "stripe_error" }); }
  return json(200, { url: data.url });
}
