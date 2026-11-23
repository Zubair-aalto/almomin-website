"""Write lib/catalog.js from js/shop-data.js: the prices the checkout charges.
Hidden products are left out, so they can't be bought."""
import json, pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
s = (ROOT / "js/shop-data.js").read_text()
d = json.loads(s[s.index("{"): s.rindex("}") + 1])

def image(it):
    # Stripe shows a JPG next to each line; use the cover if it is one, otherwise a JPG of a book inside it
    c = it.get("cover", "")
    if c.endswith(".jpg"): return c
    for b in it.get("includes") or []:
        if b.get("cover", "").endswith(".jpg"): return b["cover"]
    j = f"assets/shop/{it['id']}.jpg"
    return j if (ROOT / j).exists() else c

out = [{"id": it["id"], "title": it["title"], "image": image(it), "options": it["options"]} for it in d["items"] if not it.get("hidden")]
(ROOT / "lib/catalog.js").write_text(
    "// Generated from js/shop-data.js by tools/build-catalog.py. Prices and stock here are what the checkout allows.\nexport const ITEMS = "
    + json.dumps(out, ensure_ascii=False, indent=1) + ";\n")
print(f"catalog: {len(out)} products")
