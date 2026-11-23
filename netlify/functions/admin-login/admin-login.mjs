import { json, passwordOk, makeToken, env } from "../../lib/admin.mjs";
export default async (req) => {
  if (req.method !== "POST") return json(405, { error: "method_not_allowed" });
  if ((env("ADMIN_PASSWORD") || "").length < 12) return json(503, { error: "admin_not_configured" });
  const { password } = await req.json().catch(() => ({}));
  await new Promise(r => setTimeout(r, 600));       // slows down password guessing
  if (!passwordOk(password)) return json(401, { error: "wrong_password" });
  return json(200, { token: makeToken() });
};
