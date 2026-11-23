// GET /api/admin/products: latest saved product data straight from GitHub.
import { json, requireAdmin, readShopData, fail } from "../../../lib/server.js";
export async function onRequestGet({ request, env }) {
  const denied = await requireAdmin(request, env); if (denied) return denied;
  try { const { data, sha } = await readShopData(env); return json(200, { data, base: sha }); }
  catch (e) { return fail(e); }
}
