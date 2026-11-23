// POST /api/admin/save: writes js/shop-data.js and new photos to GitHub in one commit; Cloudflare then rebuilds the site.
import { json, requireAdmin, github, fail, b64FromText } from "../../../lib/server.js";
const FILE = "js/shop-data.js";
const HEADER = "/* Almo’min shop catalogue. Prices in EUR; options[].price is what customers pay; options[].stock is the quantity in stock (none = not tracked).\n   Edited from almomin.eu/admin or by hand. Checkout prices and product pages are generated from this file on every deploy. */\n";
const ID = /^[a-z0-9][a-z0-9-]{1,80}$/;
const PHOTO = /^assets\/shop\/(gallery\/)?[a-z0-9][a-z0-9-]{1,90}\.(webp|jpg)$/;
const bad = m => Object.assign(new Error(m), { status: 400 });
function check(data) {
  if (!data || !Array.isArray(data.items) || !Array.isArray(data.categories)) throw bad("bad_data");
  const cats = new Set(data.categories.map(c => c.id)), ids = new Set();
  for (const it of data.items) {
    if (!ID.test(it.id) || ids.has(it.id)) throw bad("bad_id: " + it.id);
    ids.add(it.id);
    if (!it.title || typeof it.title !== "string" || !cats.has(it.cat)) throw bad("bad_item: " + it.id);
    if (!Array.isArray(it.options) || !it.options.length || it.options.some(o => !(o.price > 0 && o.price < 1000))) throw bad("bad_price: " + it.id);
    if (it.options.some(o => "stock" in o && !(Number.isInteger(o.stock) && o.stock >= 0 && o.stock < 10000))) throw bad("bad_stock: " + it.id);
  }
}
export async function onRequestPost({ request, env }) {
  const denied = await requireAdmin(request, env); if (denied) return denied;
  try {
    const { data, base, photos = [], message } = await request.json();
    check(data);
    if (photos.length > 30) return json(400, { error: "too_many_photos" });
    for (const p of photos) if (!PHOTO.test(p.path) || typeof p.base64 !== "string" || p.base64.length > 4_000_000) return json(400, { error: "bad_photo: " + p.path });
    const ref = await github(env, "git/ref/heads/main");
    const headSha = ref.object.sha;
    const current = await github(env, `contents/${FILE}?ref=${headSha}`);
    if (base && current.sha !== base) return json(409, { error: "changed_elsewhere" });
    const head = await github(env, `git/commits/${headSha}`);
    const tree = [];
    for (const p of photos) {
      const blob = await github(env, "git/blobs", { method: "POST", body: { content: p.base64, encoding: "base64" } });
      tree.push({ path: p.path, mode: "100644", type: "blob", sha: blob.sha });
    }
    const text = HEADER + "window.SHOP = " + JSON.stringify(data, null, 1) + ";\n";
    const blob = await github(env, "git/blobs", { method: "POST", body: { content: b64FromText(text), encoding: "base64" } });
    tree.push({ path: FILE, mode: "100644", type: "blob", sha: blob.sha });
    const newTree = await github(env, "git/trees", { method: "POST", body: { base_tree: head.tree.sha, tree } });
    const commit = await github(env, "git/commits", { method: "POST", body: { message: String(message || "Update products from admin").slice(0, 200), tree: newTree.sha, parents: [headSha] } });
    await github(env, "git/refs/heads/main", { method: "PATCH", body: { sha: commit.sha } });
    const saved = await github(env, `contents/${FILE}?ref=${commit.sha}`);
    return json(200, { ok: true, commit: commit.sha.slice(0, 7), base: saved.sha });
  } catch (e) { return fail(e); }
}
