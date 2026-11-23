// POST /api/admin/login
import { json, passwordOk, makeToken, adminConfigured } from "../../../lib/server.js";
export async function onRequestPost({ request, env }) {
  if (!adminConfigured(env)) return json(503, { error: "admin_not_configured" });
  const { password } = await request.json().catch(() => ({}));
  await new Promise(r => setTimeout(r, 600));       // slows down password guessing
  if (!(await passwordOk(env, password))) return json(401, { error: "wrong_password" });
  return json(200, { token: await makeToken(env) });
}
