// Saves product changes: writes js/shop-data.js and any new photos to GitHub in one commit.
// Netlify then rebuilds the site (product pages, prices, checkout) automatically.
import { json, requireAdmin, github, fail } from "../../lib/admin.mjs";

const FILE = "js/shop-data.js";
const HEADER = "/* Almo’min shop catalogue. Prices in EUR; options[].price is what customers pay.\n   Edited from almomin.eu/admin or by hand. The checkout prices are generated from this file on every deploy. */\n";
const ID = /^[a-z0-9][a-z0-9-]{1,80}$/;
const PHOTO = /^assets\/shop\/(gallery\/)?[a-z0-9][a-z0-9-]{1,90}\.(webp|jpg)$/;

function check(data) {
  if (!data || !Array.isArray(data.items) || !Array.isArray(data.categories)) throw Object.assign(new Error("bad_data"), { status: 400 });
  const cats = new Set(data.categories.map(c => c.id)), ids = new Set();
  for (const it of data.items) {
    if (!ID.test(it.id) || ids.has(it.id)) throw Object.assign(new Error("bad_id: " + it.id), { status: 400 });
    ids.add(it.id);
    if (!it.title || typeof it.title !== "string" || !cats.has(it.cat)) throw Object.assign(new Error("bad_item: " + it.id), { status: 400 });
    if (!Array.isArray(it.options) || !it.options.length || it.options.some(o => !(o.price > 0 && o.price < 1000))) throw Object.assign(new Error("bad_price: " + it.id), { status: 400 });
    if (it.options.some(o => "stock" in o && !(Number.isInteger(o.stock) && o.stock >= 0 && o.stock < 10000))) throw Object.assign(new Error("bad_stock: " + it.id), { status: 400 });
  }
}

export default async (req) => {
  if (req.method !== "POST") return json(405, { error: "method_not_allowed" });
  const denied = requireAdmin(req); if (denied) return denied;
  try {
    const { data, base, photos = [], message } = await req.json();
    check(data);
    if (photos.length > 30) return json(400, { error: "too_many_photos" });
    for (const p of photos) if (!PHOTO.test(p.path) || typeof p.base64 !== "string" || p.base64.length > 4_000_000) return json(400, { error: "bad_photo: " + p.path });

    const ref = await github("git/ref/heads/main");
    const headSha = ref.object.sha;
    const current = await github(`contents/${FILE}?ref=${headSha}`);
    if (base && current.sha !== base) return json(409, { error: "changed_elsewhere" });  // someone saved in the meantime

    const head = await github(`git/commits/${headSha}`);
    const tree = [];
    for (const p of photos) {
      const blob = await github("git/blobs", { method: "POST", body: { content: p.base64, encoding: "base64" } });
      tree.push({ path: p.path, mode: "100644", type: "blob", sha: blob.sha });
    }
    const text = HEADER + "window.SHOP = " + JSON.stringify(data, null, 1) + ";\n";
    const blob = await github("git/blobs", { method: "POST", body: { content: Buffer.from(text).toString("base64"), encoding: "base64" } });
    tree.push({ path: FILE, mode: "100644", type: "blob", sha: blob.sha });
    const newTree = await github("git/trees", { method: "POST", body: { base_tree: head.tree.sha, tree } });
    const commit = await github("git/commits", { method: "POST", body: {
      message: String(message || "Update products from admin").slice(0, 200), tree: newTree.sha, parents: [headSha] } });
    await github("git/refs/heads/main", { method: "PATCH", body: { sha: commit.sha } });
    const saved = await github(`contents/${FILE}?ref=${commit.sha}`);
    return json(200, { ok: true, commit: commit.sha.slice(0, 7), base: saved.sha });
  } catch (e) { return fail(e); }
};
