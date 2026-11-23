// POST /api/stripe-webhook: Stripe calls this after every paid order; it lowers the stock in js/shop-data.js
// (one GitHub commit) and Cloudflare rebuilds the site so customers see the new numbers.
// Setup: Stripe → Developers → Webhooks → endpoint https://almomin.eu/api/stripe-webhook, event checkout.session.completed;
// its signing secret (whsec_…) goes in Cloudflare as STRIPE_WEBHOOK_SECRET.
import { json, stripe, github, hmac, same, readShopData, b64FromText } from "../../lib/server.js";

async function verified(body, header, secret) {
  const parts = String(header || "").split(",").map(x => x.trim());
  const t = Number((parts.find(x => x.startsWith("t=")) || "").slice(2));
  if (!t || Math.abs(Date.now() / 1000 - t) > 600) return false;
  const want = await hmac(secret, `${t}.${body}`);
  return parts.filter(x => x.startsWith("v1=")).some(x => same(x.slice(3), want));
}

async function lowerStock(env, cart, orderId) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const { text, a, b, data, sha } = await readShopData(env);
    const byId = Object.fromEntries(data.items.map(i => [i.id, i]));
    let changed = false;
    for (const [sku, q] of cart) {
      const [id, k] = sku.split("~"); const o = byId[id]?.options[Number(k) || 0];
      if (o && Number.isInteger(o.stock)) { o.stock = Math.max(0, o.stock - q); changed = true; }
    }
    if (!changed) return false;
    const out = text.slice(0, a) + JSON.stringify(data, null, 1) + text.slice(b);
    try {
      await github(env, "contents/js/shop-data.js", { method: "PUT", body: { message: `Stock: order ${orderId.slice(-8)}`, content: b64FromText(out), sha, branch: "main" } });
      return true;
    } catch (e) { if (e.status !== 409) throw e; }   // changed meanwhile: read again and retry
  }
  throw new Error("stock_update_conflict");
}

export async function onRequestPost({ request, env }) {
  if (!env.STRIPE_WEBHOOK_SECRET) return json(503, { error: "webhook_not_configured" });
  const body = await request.text();
  if (!(await verified(body, request.headers.get("stripe-signature"), env.STRIPE_WEBHOOK_SECRET))) return json(400, { error: "bad_signature" });
  const event = JSON.parse(body);
  if (!["checkout.session.completed", "checkout.session.async_payment_succeeded"].includes(event.type)) return json(200, { ignored: event.type });
  try {
    const s = await stripe(env, "checkout/sessions/" + event.data.object.id);   // fresh copy, so a retried event isn't counted twice
    if (s.payment_status !== "paid" || s.metadata?.stock_done === "1") return json(200, { skipped: true });
    const raw = Object.keys(s.metadata || {}).filter(k => /^cart_\d+$/.test(k)).sort((x, y) => +x.slice(5) - +y.slice(5)).map(k => s.metadata[k]).join("");
    const cart = raw.split(",").filter(Boolean).map(x => { const i = x.lastIndexOf("*"); return [x.slice(0, i), Math.max(0, parseInt(x.slice(i + 1), 10) || 0)]; });
    if (cart.length) await lowerStock(env, cart, s.id);
    const f = new URLSearchParams(); f.set("metadata[stock_done]", "1");
    await stripe(env, "checkout/sessions/" + s.id, { method: "POST", form: f });
    return json(200, { ok: true });
  } catch (e) {
    console.error("stock update failed", e.message);
    return json(500, { error: e.message });   // Stripe retries later
  }
}
