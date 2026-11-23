// Lists paid orders from Stripe (Checkout Sessions), newest first.
import { json, requireAdmin, stripe, fail } from "../../lib/admin.mjs";

const pick = s => {
  const ship = s.collected_information?.shipping_details || s.shipping_details || null;
  const rate = s.shipping_cost?.shipping_rate;
  return {
    id: s.id, created: s.created, total: s.amount_total, subtotal: s.amount_subtotal, currency: s.currency,
    paid: s.payment_status, paymentIntent: typeof s.payment_intent === "string" ? s.payment_intent : s.payment_intent?.id,
    customer: { name: s.customer_details?.name || ship?.name || "", email: s.customer_details?.email || "", phone: s.customer_details?.phone || "" },
    shipping: ship ? { name: ship.name, address: ship.address } : null,
    delivery: { name: typeof rate === "object" && rate ? rate.display_name : "", amount: s.shipping_cost?.amount_total ?? 0 },
    items: (s.line_items?.data || []).map(l => ({ name: l.description, qty: l.quantity, amount: l.amount_total })),
    status: s.metadata?.fulfil_status || "new", tracking: s.metadata?.tracking || "", note: s.metadata?.note || ""
  };
};

export default async (req) => {
  const denied = requireAdmin(req); if (denied) return denied;
  try {
    const orders = []; let after = "";
    for (let page = 0; page < 5; page++) {          // up to 500 most recent orders
      const q = new URLSearchParams({ limit: "100", status: "complete" });
      q.append("expand[]", "data.line_items"); q.append("expand[]", "data.shipping_cost.shipping_rate");
      if (after) q.set("starting_after", after);
      const res = await stripe("checkout/sessions?" + q);
      res.data.filter(s => s.payment_status === "paid" || s.payment_status === "no_payment_required").forEach(s => orders.push(pick(s)));
      if (!res.has_more || !res.data.length) break;
      after = res.data[res.data.length - 1].id;
    }
    return json(200, { orders });
  } catch (e) { return fail(e); }
};
