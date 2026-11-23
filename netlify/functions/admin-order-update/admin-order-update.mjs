// Saves an order's status, tracking number and note on the Stripe Checkout Session (metadata).
import { json, requireAdmin, stripe, fail } from "../../lib/admin.mjs";
const STATUSES = ["new", "packed", "shipped", "collected", "cancelled"];
export default async (req) => {
  if (req.method !== "POST") return json(405, { error: "method_not_allowed" });
  const denied = requireAdmin(req); if (denied) return denied;
  const { id, status, tracking = "", note = "" } = await req.json().catch(() => ({}));
  if (!/^cs_(live|test)_[A-Za-z0-9]+$/.test(id || "") || !STATUSES.includes(status)) return json(400, { error: "bad_request" });
  try {
    const f = new URLSearchParams();
    f.set("metadata[fulfil_status]", status);
    f.set("metadata[tracking]", String(tracking).slice(0, 200));
    f.set("metadata[note]", String(note).slice(0, 480));
    f.set("metadata[updated]", new Date().toISOString());
    await stripe("checkout/sessions/" + id, { method: "POST", form: f });
    return json(200, { ok: true });
  } catch (e) { return fail(e); }
};
