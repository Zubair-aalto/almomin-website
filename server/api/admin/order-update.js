// POST /api/admin/order-update: saves status, tracking number and note on the Stripe order (metadata).
import { json, requireAdmin, stripe, fail } from "../../../lib/server.js";
const STATUSES = ["new", "packed", "shipped", "collected", "cancelled"];
export async function onRequestPost({ request, env }) {
  const denied = await requireAdmin(request, env); if (denied) return denied;
  const { id, status, tracking = "", note = "" } = await request.json().catch(() => ({}));
  if (!/^cs_(live|test)_[A-Za-z0-9]+$/.test(id || "") || !STATUSES.includes(status)) return json(400, { error: "bad_request" });
  try {
    const f = new URLSearchParams();
    f.set("metadata[fulfil_status]", status);
    f.set("metadata[tracking]", String(tracking).slice(0, 200));
    f.set("metadata[note]", String(note).slice(0, 480));
    f.set("metadata[updated]", new Date().toISOString());
    await stripe(env, "checkout/sessions/" + id, { method: "POST", form: f });
    return json(200, { ok: true });
  } catch (e) { return fail(e); }
}
