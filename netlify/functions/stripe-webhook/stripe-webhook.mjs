// Stripe calls this after every paid order; it lowers the stock in js/shop-data.js (one GitHub commit),
// and Netlify then rebuilds the site so customers see the new numbers.
// Setup: Stripe → Developers → Webhooks → endpoint https://almomin.eu/.netlify/functions/stripe-webhook,
// event "checkout.session.completed"; put its signing secret (whsec_…) in Netlify as STRIPE_WEBHOOK_SECRET.
import crypto from "node:crypto";
import { env, json, stripe, github } from "../../lib/admin.mjs";

function verified(body, header, secret) {
  const parts = Object.fromEntries(String(header || "").split(",").map(kv => kv.split("=")).map(([k, ...v]) => [k, v.join("=")]));
  const t = Number(parts.t);
  if (!t || Math.abs(Date.now() / 1000 - t) > 600) return false;
  const want = crypto.createHmac("sha256", secret).update(`${t}.${body}`).digest("hex");
  return String(header).split(",").filter(x => x.startsWith("v1=")).some(x => {
    const got = x.slice(3); return got.length === want.length && crypto.timingSafeEqual(Buffer.from(got), Buffer.from(want));
  });
}

async function lowerStock(cart, orderId) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const f = await github("contents/js/shop-data.js?ref=main");
    const text = Buffer.from(f.content, "base64").toString("utf8");
    const a = text.indexOf("{"), b = text.lastIndexOf("}") + 1;
    const data = JSON.parse(text.slice(a, b));
    const byId = Object.fromEntries(data.items.map(i => [i.id, i]));
    let changed = false;
    for (const [sku, q] of cart) {
      const [id, k] = sku.split("~"); const o = byId[id]?.options[Number(k) || 0];
      if (o && Number.isInteger(o.stock)) { o.stock = Math.max(0, o.stock - q); changed = true; }
    }
    if (!changed) return false;
    const out = text.slice(0, a) + JSON.stringify(data, null, 1) + text.slice(b);
    try {
      await github("contents/js/shop-data.js", { method: "PUT", body: {
        message: `Stock: order ${orderId.slice(-8)}`, content: Buffer.from(out).toString("base64"), sha: f.sha, branch: "main" } });
      return true;
    } catch (e) { if (e.status !== 409) throw e; }   // file changed meanwhile: read again and retry
  }
  throw new Error("stock_update_conflict");
}

export default async (req) => {
  if (req.method !== "POST") return json(405, { error: "method_not_allowed" });
  const secret = env("STRIPE_WEBHOOK_SECRET");
  if (!secret) return json(503, { error: "webhook_not_configured" });
  const body = await req.text();
  if (!verified(body, req.headers.get("stripe-signature"), secret)) return json(400, { error: "bad_signature" });
  const event = JSON.parse(body);
  if (!["checkout.session.completed", "checkout.session.async_payment_succeeded"].includes(event.type)) return json(200, { ignored: event.type });
  try {
    const s = await stripe("checkout/sessions/" + event.data.object.id);   // fresh copy, so a retried event is not counted twice
    if (s.payment_status !== "paid" || s.metadata?.stock_done === "1") return json(200, { skipped: true });
    const raw = Object.keys(s.metadata || {}).filter(k => /^cart_\d+$/.test(k)).sort((x, y) => +x.slice(5) - +y.slice(5)).map(k => s.metadata[k]).join("");
    const cart = raw.split(",").filter(Boolean).map(x => { const i = x.lastIndexOf("*"); return [x.slice(0, i), Math.max(0, parseInt(x.slice(i + 1), 10) || 0)]; });
    if (cart.length) await lowerStock(cart, s.id);
    const f = new URLSearchParams(); f.set("metadata[stock_done]", "1");
    await stripe("checkout/sessions/" + s.id, { method: "POST", form: f });
    return json(200, { ok: true });
  } catch (e) {
    console.error("stock update failed", e.message);
    return json(500, { error: e.message });   // Stripe will retry later
  }
};
