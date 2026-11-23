"""Rebuild the Google product data (JSON-LD) in index.html from js/shop-data.js.
Run after changing products or prices:  python3 tools/build-seo.py"""
import json, re, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
SITE = "https://almomin.eu/"
shop = (root / "js/shop-data.js").read_text()
data = json.loads(shop[shop.index("{"): shop.rindex("}") + 1])
cat = (root / "lib/catalog.js").read_text()
images = {i["id"]: i["image"] for i in json.loads(cat[cat.index("["): cat.rindex("]") + 1])}
cats = {c["id"]: c["label"] for c in data["categories"]}

def offer(price, ITEM_ID):
    return {"@type": "Offer", "price": f"{price:.2f}", "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock", "itemCondition": "https://schema.org/NewCondition",
            "url": SITE + "books/" + ITEM_ID + "/", "seller": {"@id": SITE + "#store"}}

products = []
for i, it in enumerate([x for x in data["items"] if not x.get("hidden")], 1):
    prices = sorted(o["price"] for o in it["options"])
    p = {"@type": "Product", "name": it["title"], "url": SITE + "books/" + it["id"] + "/", "category": cats.get(it["cat"], ""),
         "description": re.sub(r"\s+", " ", it.get("desc", ""))[:500],
         "image": SITE + images.get(it["id"], it["cover"]),
         "brand": {"@type": "Brand", "name": "Almo’min"}}
    if len(prices) > 1:
        p["offers"] = {"@type": "AggregateOffer", "lowPrice": f"{prices[0]:.2f}", "highPrice": f"{prices[-1]:.2f}",
                       "priceCurrency": "EUR", "offerCount": len(prices), "availability": "https://schema.org/InStock"}
    else:
        p["offers"] = offer(prices[0], it["id"])
    products.append({"@type": "ListItem", "position": i, "item": p})

graph = {"@context": "https://schema.org", "@graph": [
  {"@type": "OnlineStore", "@id": SITE + "#store", "name": "Almo’min", "alternateName": "المؤمن",
   "url": SITE, "logo": SITE + "assets/own/full-gold.png", "image": SITE + "assets/og-image.jpg",
   "description": "Islamic books for children: Quran stories, prophet story bundles, baby board books, activity books and cards. Delivery across Finland.",
   "email": "almomin.eu@gmail.com", "telephone": "+358 41 722 5258",
   "legalName": "Decent Enterprises Oy", "vatID": "FI28006834", "taxID": "2800683-4",
   "address": {"@type": "PostalAddress", "streetAddress": "Kilonrinne 10 B", "postalCode": "02610",
               "addressLocality": "Espoo", "addressCountry": "FI"},
   "areaServed": "FI", "sameAs": ["https://www.instagram.com/almomin.eu"],
   "hasMerchantReturnPolicy": {"@type": "MerchantReturnPolicy", "applicableCountry": "FI",
       "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow", "merchantReturnDays": 14,
       "returnMethod": "https://schema.org/ReturnByMail", "returnFees": "https://schema.org/ReturnFeesCustomerResponsibility",
       "merchantReturnLink": SITE + "terms.html"}},
  {"@type": "WebSite", "@id": SITE + "#site", "url": SITE, "name": "Almo’min", "inLanguage": "en", "publisher": {"@id": SITE + "#store"}},
  {"@type": "ItemList", "name": "Almo’min collection", "numberOfItems": len(products), "itemListElement": products}]}

block = '<script type="application/ld+json">\n' + json.dumps(graph, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/") + "\n  </script>"
html = (root / "index.html").read_text()
html = re.sub(r"<!-- seo:start -->.*?<!-- seo:end -->", lambda m: "<!-- seo:start -->\n  " + block + "\n  <!-- seo:end -->", html, flags=re.S)
(root / "index.html").write_text(html)
print(f"{len(products)} products written")
