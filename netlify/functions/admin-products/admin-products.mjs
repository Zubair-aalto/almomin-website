// Returns the latest saved product data straight from GitHub (newer than the live site while a deploy runs).
import { json, requireAdmin, github, fail } from "../../lib/admin.mjs";
export default async (req) => {
  const denied = requireAdmin(req); if (denied) return denied;
  try {
    const f = await github("contents/js/shop-data.js?ref=main");
    const text = Buffer.from(f.content, "base64").toString("utf8");
    const data = JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1));
    return json(200, { data, base: f.sha });
  } catch (e) { return fail(e); }
};
