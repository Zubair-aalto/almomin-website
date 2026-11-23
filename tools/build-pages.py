"""Build the SEO pages from js/shop-data.js and tools/content.py:
  /books/<id>/       one page per product
  /shop/<category>/  English category pages
  /fi/ and /fi/<kategoria>/  Finnish landing and category pages
  /guides/...  and /fi/oppaat/...  articles
  sitemap.xml
Run after changing products, prices or content:  python3 tools/build-pages.py
"""
import json, re, html, pathlib, shutil, sys
from urllib.parse import quote
from datetime import date

ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))
import content as C  # noqa: E402

SITE = "https://almomin.eu"
TODAY = date.today().isoformat()
V = "15"  # css cache version

shop = (ROOT / "js/shop-data.js").read_text()
DATA = json.loads(shop[shop.index("{"): shop.rindex("}") + 1])
cat_src = (ROOT / "netlify/functions/checkout/catalog.mjs").read_text()
JPG = {i["id"]: i["image"] for i in json.loads(cat_src[cat_src.index("["): cat_src.rindex("]") + 1])}
ITEMS = DATA["items"]
BY_ID = {i["id"]: i for i in ITEMS}

esc = lambda s: html.escape(str(s), quote=True)
def rich(s): return esc(s).replace("ﷺ", '<span class="saw">ﷺ</span>')
def money(n): return f"€{n:.2f}"
def frm(it):
    p = min(o["price"] for o in it["options"])
    return ("from " if len(it["options"]) > 1 else "") + money(p)
def frm_fi(it):
    p = min(o["price"] for o in it["options"])
    return ("alk. " if len(it["options"]) > 1 else "") + f"{p:.2f} €".replace(".", ",")
def ab(p): return "/" + p.lstrip("/")
def plain(s, n=158):
    s = re.sub(r"\s+", " ", s).strip()
    return s if len(s) <= n else s[:n - 1].rsplit(" ", 1)[0] + "…"
def ld(obj): return '<script type="application/ld+json">' + json.dumps(obj, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/") + "</script>"
def crumbs(pairs):
    return {"@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": i + 1, "name": n, "item": SITE + u} for i, (n, u) in enumerate(pairs)]}

CATS = C.CATS

def sku_of(pid):
    # Google allows at most 50 characters; keep it short and readable, e.g. AM-allah-made-the-world-around-me
    s = "AM-" + pid
    return s if len(s) <= 40 else s[:40].rstrip("-")  # id -> dict(en_slug, fi_slug, ...)

# ---------------------------------------------------------------- layout
def head(title, desc, path, lang="en", image=None, alt_en=None, alt_fi=None, extra=""):
    image = image or "/assets/og-image.jpg"
    hl = ""
    if alt_en and alt_fi:
        hl = (f'\n  <link rel="alternate" hreflang="en" href="{SITE}{alt_en}">'
              f'\n  <link rel="alternate" hreflang="fi" href="{SITE}{alt_fi}">'
              f'\n  <link rel="alternate" hreflang="x-default" href="{SITE}{alt_en}">')
    return f"""<!doctype html>
<html lang="{lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{esc(title)}</title>
  <meta name="description" content="{esc(desc)}">
  <meta name="theme-color" content="#0B2E27">
  <link rel="canonical" href="{SITE}{path}">{hl}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Almo’min">
  <meta property="og:url" content="{SITE}{path}">
  <meta property="og:title" content="{esc(title)}">
  <meta property="og:description" content="{esc(desc)}">
  <meta property="og:image" content="{SITE}{image}">
  <meta property="og:locale" content="{'fi_FI' if lang == 'fi' else 'en_GB'}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/assets/own/favicon.png" type="image/png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Manrope:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css?v=8">
  <link rel="stylesheet" href="/css/own-logo.css?v={V}">
  <link rel="stylesheet" href="/css/pages.css?v={V}">
  {extra}
</head>
<body class="pg">
  <a class="skip" href="#main">{'Siirry sisältöön' if lang == 'fi' else 'Skip to content'}</a>
"""

def header(lang="en", other=None):
    if lang == "fi":
        links = [(CATS[c]["fi_nav"], f"/fi/{CATS[c]['fi_slug']}/") for c in C.ORDER] + [("Opas", "/fi/oppaat/islamilaiset-lastenkirjat/")]
        home, sw, swl, bag = "/fi/", (other or "/"), "English", "Ostoskori"
    else:
        links = [(CATS[c]["en_nav"], f"/shop/{CATS[c]['en_slug']}/") for c in C.ORDER] + [("Guides", "/guides/")]
        home, sw, swl, bag = "/", (other or "/fi/"), "Suomeksi", "Basket"
    nav = "".join(f'<a href="{u}">{esc(n)}</a>' for n, u in links)
    return f"""  <header class="pg__top">
    <div class="wrap pg__bar">
      <a href="{home}" class="pg__logo" aria-label="Almo’min {'etusivu' if lang == 'fi' else 'home'}"><span class="own-lock"><img src="/assets/own/mark-gold.png" alt="" width="34" height="42"><img src="/assets/own/word-gold.png" alt="Almo’min" width="104" height="16"></span></a>
      <nav class="pg__nav" aria-label="{'Kategoriat' if lang == 'fi' else 'Categories'}">{nav}</nav>
      <div class="pg__tools">
        <a class="pg__lang" href="{sw}" hreflang="{'en' if lang == 'fi' else 'fi'}">{swl}</a>
        <a class="pg__bag" href="/#bag" aria-label="{bag}"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 7h12l-1 13H7L6 7Z M9 7a3 3 0 0 1 6 0" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg><span class="pg__count" data-bag-count hidden>0</span></a>
      </div>
    </div>
  </header>
"""

def footer(lang="en"):
    if lang == "fi":
        cats = "".join(f'<a href="/fi/{CATS[c]["fi_slug"]}/">{esc(CATS[c]["fi_h1"])}</a>' for c in C.ORDER)
        return f"""  <footer class="foot pg__foot">
    <div class="wrap">
      <div class="foot__cols">
        <div><h4>Kauppa</h4>{cats}<a href="/fi/oppaat/islamilaiset-lastenkirjat/">Opas: islamilaiset lastenkirjat</a></div>
        <div><h4>Yhteystiedot</h4><a href="https://wa.me/358417225258">WhatsApp · +358 41 722 5258</a><a href="mailto:almomin.eu@gmail.com">almomin.eu@gmail.com</a><a href="https://www.instagram.com/almomin.eu" rel="noopener">Instagram · @almomin.eu</a></div>
        <div><h4>Yritys</h4><address>Decent Enterprises Oy<br>Kilonrinne 10 B<br>02610 Espoo</address><span>Y-tunnus 2800683-4</span><a href="/terms.html">Toimitusehdot (englanniksi)</a><a href="/privacy.html">Tietosuoja (englanniksi)</a></div>
      </div>
      <p class="foot__legal">© 2026 Almo’min on Decent Enterprises Oy:n aputoiminimi · Toimitus koko Suomeen · <a href="/">In English</a></p>
    </div>
  </footer>
  <script src="/js/page.js?v={V}" defer></script>
</body>
</html>
"""
    cats = "".join(f'<a href="/shop/{CATS[c]["en_slug"]}/">{esc(CATS[c]["en_h1"])}</a>' for c in C.ORDER)
    guides = "".join(f'<a href="/guides/{g["slug"]}/">{esc(g["short"])}</a>' for g in C.GUIDES_EN)
    return f"""  <footer class="foot pg__foot">
    <div class="wrap">
      <div class="foot__cols">
        <div><h4>Shop</h4>{cats}<a href="/#collection">All products</a></div>
        <div><h4>Guides</h4>{guides}<a href="/fi/">Suomeksi</a></div>
        <div><h4>Contact</h4><a href="https://wa.me/358417225258">WhatsApp · +358 41 722 5258</a><a href="mailto:almomin.eu@gmail.com">almomin.eu@gmail.com</a><a href="https://www.instagram.com/almomin.eu" rel="noopener">Instagram · @almomin.eu</a></div>
        <div><h4>Company</h4><address>Decent Enterprises Oy<br>Kilonrinne 10 B<br>02610 Espoo, Finland</address><span>Y-tunnus 2800683-4</span><a href="/terms.html">Terms of sale</a><a href="/privacy.html">Privacy policy</a></div>
      </div>
      <p class="foot__legal">© 2026 Almo’min is a trading name of Decent Enterprises Oy · Delivery across Finland · Free pickup in Espoo</p>
    </div>
  </footer>
  <script src="/js/page.js?v={V}" defer></script>
</body>
</html>
"""

def card(it, lang="en"):
    cat = CATS[it["cat"]]["fi_nav" if lang == "fi" else "en_nav"]
    price = frm_fi(it) if lang == "fi" else frm(it)
    b = " pc--bundle" if it["cat"] == "bundles" else ""
    return f"""<li><a class="pc{b}" href="/books/{it['id']}/">
  <span class="pc__stage"><img src="{ab(it['cover'])}" alt="{esc(it['title'])}" loading="lazy" width="300" height="300"></span>
  <span class="pc__meta"><span class="pc__cat">{esc(cat)}</span><span class="pc__title">{rich(it['title'])}</span><span class="pc__price">{price}</span></span>
</a></li>"""

GROUPS = DATA.get("groups", {})
def group_card(gid, lang="en"):
    g = GROUPS[gid]
    sub = "10 profeettakirjaa yksittäin" if lang == "fi" else g["sub"]
    price = "6,95 € / kirja" if lang == "fi" else g["price"]
    cat = "Profeettatarinat" if lang == "fi" else "Prophet stories"
    return f"""<li><a class="pc pc--bundle pc--group" href="{g['url']}">
  <span class="pc__stage"><img src="{ab(g['cover'])}" alt="{esc(g['title'])}" loading="lazy" width="300" height="300"></span>
  <span class="pc__meta"><span class="pc__cat">{esc(cat)}</span><span class="pc__title">{esc(g['title'])}: {esc(sub)}</span><span class="pc__price">{price}</span><span class="pc__more">{'Tutustu kirjoihin' if lang == 'fi' else 'Explore each book'} →</span></span>
</a></li>"""

def grid(items, lang="en", grouped=False):
    out, seen = [], set()
    for i in items:
        g = i.get("group")
        if grouped and g:
            if g not in seen:
                seen.add(g); out.append(group_card(g, lang))
            continue
        out.append(card(i, lang))
    return '<ul class="shop__grid pg__grid">' + "".join(out) + "</ul>"

def write(path, text):
    p = ROOT / path.lstrip("/")
    if path.endswith("/"): p = p / "index.html"
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(text)
    PAGES.append(path)

PAGES = []

# clean previously generated folders
for d in ["books", "shop", "guides", "fi"]:
    if (ROOT / d).exists(): shutil.rmtree(ROOT / d)

# ---------------------------------------------------------------- product pages
SHIP_EN = """<ul class="pp__perks">
  <li><b>Delivery across Finland</b> Matkahuolto €6.90 · Posti €7.90</li>
  <li><b>Free pickup in Espoo</b> We agree a time with you</li>
  <li><b>Pay securely</b> Card, MobilePay, Apple Pay, Google Pay</li>
  <li><b>Sent in 1–3 working days</b> 14-day returns · <a href="/terms.html">Terms</a></li>
</ul>"""

def product_page(it):
    cat = CATS[it["cat"]]
    gal = it.get("gallery") or [it["cover"]]
    prices = [o["price"] for o in it["options"]]
    title = it["title"]
    t = f"{title} | {cat['en_suffix']} | Almo’min"
    if len(t) > 70: t = f"{title} | Almo’min"
    desc = plain(f"{it['desc']} {money(min(prices))}. Delivery across Finland.")
    opts = ""
    if len(it["options"]) > 1:
        opts = '<div class="pd__opts pp__opts" role="radiogroup" aria-label="Choose an option">' + "".join(
            f'<button type="button" role="radio" aria-checked="{str(k == 0).lower()}" data-k="{k}" data-price="{o["price"]}">{esc(o["label"])} <span>{money(o["price"])}</span></button>'
            for k, o in enumerate(it["options"])) + "</div>"
    inc = ""
    if it.get("includes"):
        inc = '<div class="pp__inc"><h2>In this bundle</h2><ul>' + "".join(
            f'<li><img src="{ab(b["cover"])}" alt="" loading="lazy" width="60" height="60"><span>{rich(b["title"])}</span></li>' for b in it["includes"]) + "</ul></div>"
    thumbs = "" if len(gal) < 2 else '<ul class="gal__thumbs pp__thumbs" aria-label="Product photos">' + "".join(
        f'<li><button type="button" data-src="{ab(s)}" aria-label="Photo {i + 1} of {len(gal)}" aria-current="{str(i == 0).lower()}"><img src="{ab(s)}" alt="" loading="lazy" width="80" height="80"></button></li>' for i, s in enumerate(gal)) + "</ul>"
    explore = ""
    if it.get("explore"):
        explore = '<a class="btn btn--line pp__explore" href="/shop/our-prophets-our-heroes/">Explore each book separately →</a>'
    elif it.get("group"):
        explore = '<a class="pp__series" href="/shop/our-prophets-our-heroes/">See all 10 books in this series, and the sets of 5 and 10 →</a>'
    same = (lambda i: i.get("group") == it.get("group")) if it.get("group") else (lambda i: not i.get("group"))
    related = [i for i in ITEMS if i["cat"] == it["cat"] and i["id"] != it["id"] and same(i)][:4]
    if len(related) < 4: related += [i for i in ITEMS if i["cat"] == "bundles" and i not in related and i["id"] != it["id"]][:4 - len(related)]
    img_abs = SITE + ab(JPG.get(it["id"], it["cover"]))
    offers = ({"@type": "AggregateOffer", "lowPrice": f"{min(prices):.2f}", "highPrice": f"{max(prices):.2f}", "offerCount": len(prices), "priceCurrency": "EUR", "availability": "https://schema.org/InStock"}
              if len(prices) > 1 else
              {"@type": "Offer", "price": f"{prices[0]:.2f}", "priceCurrency": "EUR", "availability": "https://schema.org/InStock",
               "itemCondition": "https://schema.org/NewCondition", "url": f"{SITE}/books/{it['id']}/",
               "shippingDetails": {"@type": "OfferShippingDetails", "shippingRate": {"@type": "MonetaryAmount", "value": "6.90", "currency": "EUR"},
                                   "shippingDestination": {"@type": "DefinedRegion", "addressCountry": "FI"},
                                   "deliveryTime": {"@type": "ShippingDeliveryTime", "handlingTime": {"@type": "QuantitativeValue", "minValue": 1, "maxValue": 3, "unitCode": "DAY"},
                                                    "transitTime": {"@type": "QuantitativeValue", "minValue": 1, "maxValue": 3, "unitCode": "DAY"}}},
               "hasMerchantReturnPolicy": {"@type": "MerchantReturnPolicy", "applicableCountry": "FI", "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                                           "merchantReturnDays": 14, "returnMethod": "https://schema.org/ReturnByMail", "returnFees": "https://schema.org/ReturnFeesCustomerResponsibility"},
               "seller": {"@type": "Organization", "name": "Almo’min"}})
    data = [{"@context": "https://schema.org", "@type": "Product", "name": title, "description": re.sub(r"\s+", " ", it["desc"]),
             "image": [SITE + ab(s) for s in gal[:6]] if gal else [img_abs], "sku": sku_of(it["id"]), "category": cat["en_h1"],
             "brand": {"@type": "Brand", "name": "Almo’min"}, "offers": offers},
            {"@context": "https://schema.org", **crumbs([("Home", "/"), (cat["en_h1"], f"/shop/{cat['en_slug']}/"), (title, f"/books/{it['id']}/")])}]
    body = f"""{head(t, desc, f"/books/{it['id']}/", image=ab(JPG.get(it['id'], it['cover'])), extra=ld(data))}{header()}
  <main id="main" class="wrap pg__main">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/shop/{cat['en_slug']}/">{esc(cat['en_h1'])}</a><span>›</span><span aria-current="page">{rich(title)}</span></nav>
    <article class="pp" data-id="{it['id']}" data-multi="{1 if len(it['options']) > 1 else 0}">
      <div class="pp__media">
        <div class="pp__main"><img id="pp-img" src="{ab(gal[0])}" alt="{esc(title)}" width="800" height="800" fetchpriority="high"></div>
        {thumbs}
      </div>
      <div class="pp__info">
        <p class="eyebrow">{esc(cat['en_nav'])}{' · New' if it.get('isNew') else ''}</p>
        <h1 class="pp__title">{rich(title)}</h1>
        <p class="pp__price" id="pp-price">{money(prices[0])}</p>
        <p class="pp__desc">{rich(it['desc'])}</p>
        {f'<p class="pp__specs">{esc(it["specs"])}</p>' if it.get('specs') else ''}
        {opts}
        <div class="pp__buy">
          <button class="btn btn--gold" type="button" id="pp-add">Add to basket</button>
          <a class="btn btn--line" href="https://wa.me/358417225258?text={quote('Assalamu alaikum! I have a question about “' + title + '”.')}" target="_blank" rel="noopener">Ask on WhatsApp</a>
        </div>
        {explore}
        <p class="pp__added" id="pp-added" role="status" hidden>Added to your basket. <a href="/#bag">View basket and check out →</a></p>
        {SHIP_EN}
        {inc}
      </div>
    </article>
    <section class="pg__related"><h2 class="pg__h2">You may also like</h2>{grid(related)}</section>
  </main>
{footer()}"""
    write(f"/books/{it['id']}/", body)

for it in ITEMS: product_page(it)

# ---------------------------------------------------------------- category pages (EN + FI)
def faq_html(faqs):
    return '<div class="pg__faq">' + "".join(f"<details><summary>{esc(q)}</summary><p>{a}</p></details>" for q, a in faqs) + "</div>"
def faq_ld(faqs):
    return {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": re.sub("<[^>]+>", "", a)}} for q, a in faqs]}
def itemlist(items):
    return {"@context": "https://schema.org", "@type": "ItemList", "itemListElement": [
        {"@type": "ListItem", "position": i + 1, "url": f"{SITE}/books/{it['id']}/", "name": it["title"]} for i, it in enumerate(items)]}

for cid in C.ORDER:
    c = CATS[cid]; items = [i for i in ITEMS if i["cat"] == cid]
    en, fi = f"/shop/{c['en_slug']}/", f"/fi/{c['fi_slug']}/"
    others = "".join(f'<a class="chip" href="/shop/{CATS[o]["en_slug"]}/">{esc(CATS[o]["en_h1"])}</a>' for o in C.ORDER if o != cid)
    write(en, f"""{head(c['en_title'], c['en_desc'], en, alt_en=en, alt_fi=fi, extra=ld([itemlist(items), {"@context": "https://schema.org", **crumbs([("Home", "/"), (c['en_h1'], en)])}, faq_ld(c['en_faq'])]))}{header(other=fi)}
  <main id="main" class="wrap pg__main">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><span aria-current="page">{esc(c['en_h1'])}</span></nav>
    <header class="pg__head"><p class="eyebrow">Islamic books for children · Finland</p><h1 class="h1">{esc(c['en_h1'])}</h1><div class="pg__intro">{c['en_intro']}</div></header>
    {grid(items, grouped=True)}
    <section class="pg__more"><h2 class="pg__h2">Questions parents ask</h2>{faq_html(c['en_faq'])}</section>
    <nav class="pg__chips" aria-label="Other categories">{others}</nav>
  </main>
{footer()}""")
    othersfi = "".join(f'<a class="chip" href="/fi/{CATS[o]["fi_slug"]}/">{esc(CATS[o]["fi_h1"])}</a>' for o in C.ORDER if o != cid)
    write(fi, f"""{head(c['fi_title'], c['fi_desc'], fi, lang="fi", alt_en=en, alt_fi=fi, extra=ld([itemlist(items), {"@context": "https://schema.org", **crumbs([("Etusivu", "/fi/"), (c['fi_h1'], fi)])}, faq_ld(c['fi_faq'])]))}{header("fi", other=en)}
  <main id="main" class="wrap pg__main">
    <nav class="crumbs" aria-label="Murupolku"><a href="/fi/">Etusivu</a><span>›</span><span aria-current="page">{esc(c['fi_h1'])}</span></nav>
    <header class="pg__head"><p class="eyebrow">Islamilaiset lastenkirjat · Suomi</p><h1 class="h1">{esc(c['fi_h1'])}</h1><div class="pg__intro">{c['fi_intro']}</div></header>
    {grid(items, "fi", grouped=True)}
    <p class="pg__note">Kirjat ovat englanninkielisiä, osa kaksikielisiä (arabia–englanti). Tuotesivut ovat englanniksi.</p>
    <section class="pg__more"><h2 class="pg__h2">Usein kysyttyä</h2>{faq_html(c['fi_faq'])}</section>
    <nav class="pg__chips" aria-label="Muut kategoriat">{othersfi}</nav>
  </main>
{footer("fi")}""")

# ---------------------------------------------------------------- series page: Our Prophets: Our Heroes
H = C.HEROES
sets = [BY_ID[i] for i in H["sets"]]
singles = [i for i in ITEMS if i.get("group") == "heroes"]
hp = "/shop/our-prophets-our-heroes/"
write(hp, f"""{head(H['title'], H['desc'], hp, image="/assets/shop/prophet-set-1.webp", extra=ld([itemlist(sets + singles), {"@context": "https://schema.org", **crumbs([("Home", "/"), (CATS['bundles']['en_h1'], "/shop/prophet-stories/"), ("Our Prophets: Our Heroes", hp)])}]))}{header()}
  <main id="main" class="wrap pg__main">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/shop/prophet-stories/">{esc(CATS['bundles']['en_h1'])}</a><span>›</span><span aria-current="page">Our Prophets: Our Heroes</span></nav>
    <header class="pg__head"><p class="eyebrow">Prophet stories · 10 books</p><h1 class="h1">{esc(H['h1'])}</h1><div class="pg__intro">{H['intro']}</div>
      <div class="pg__cta"><a class="btn btn--gold" href="#singles">Explore each book separately</a><a class="btn btn--line" href="#sets">Save with a set</a></div></header>
    <section id="sets" class="pg__sec"><h2 class="pg__h2">Buy as a set</h2>{grid(sets)}</section>
    <section id="singles" class="pg__more"><h2 class="pg__h2">Each book separately · €6.95</h2><p class="pg__lede pg__lede--s">{H['singles_note']}</p>{grid(singles)}</section>
    <nav class="pg__chips" aria-label="More"><a class="chip" href="/shop/prophet-stories/">All prophet stories</a><a class="chip" href="/guides/prophet-stories-for-kids-in-order/">Reading guide: prophets in order</a></nav>
  </main>
{footer()}""")

# ---------------------------------------------------------------- Finnish landing
F = C.FI_HOME
tiles = "".join(f"""<a class="pg__tile" href="/fi/{CATS[c]['fi_slug']}/"><img src="{ab(CATS[c]['tile'])}" alt="" loading="lazy" width="240" height="240"><span><b>{esc(CATS[c]['fi_h1'])}</b><small>{esc(CATS[c]['fi_tile'])}</small></span></a>""" for c in C.ORDER)
featured = [BY_ID[i] for i in F["featured"]]
store_ld = {"@context": "https://schema.org", "@type": "OnlineStore", "name": "Almo’min", "url": SITE + "/fi/", "logo": SITE + "/assets/own/full-gold.png",
            "description": F["desc"], "email": "almomin.eu@gmail.com", "telephone": "+358 41 722 5258", "areaServed": "FI",
            "address": {"@type": "PostalAddress", "streetAddress": "Kilonrinne 10 B", "postalCode": "02610", "addressLocality": "Espoo", "addressCountry": "FI"}}
write("/fi/", f"""{head(F['title'], F['desc'], "/fi/", lang="fi", alt_en="/", alt_fi="/fi/", extra=ld([store_ld, faq_ld(F['faq'])]))}{header("fi", other="/")}
  <main id="main">
    <section class="pg__hero"><div class="wrap pg__hero-in">
      <div><p class="eyebrow eyebrow--gold">Islamilaiset lastenkirjat</p><h1 class="display pg__display">{F['h1']}</h1><p class="pg__lede">{F['lede']}</p>
      <div class="pg__cta"><a class="btn btn--gold" href="/fi/{CATS['bundles']['fi_slug']}/">Profeettatarinat</a><a class="btn btn--line pg__btn-dark" href="/#collection">Kaikki tuotteet</a></div></div>
      <img class="pg__hero-img" src="/assets/shop/bundle-complete.webp" alt="Profeettatarinoiden kirjasarja viuhkana" width="640" height="450" fetchpriority="high">
    </div></section>
    <div class="wrap pg__main">
      <section><h2 class="pg__h2">Valitse kategoria</h2><div class="pg__tiles">{tiles}</div></section>
      <section class="pg__more"><h2 class="pg__h2">Suosittuja</h2>{grid(featured, "fi")}</section>
      <section class="pg__more pg__cols">{F['body']}</section>
      <section class="pg__more"><h2 class="pg__h2">Usein kysyttyä</h2>{faq_html(F['faq'])}</section>
    </div>
  </main>
{footer("fi")}""")

# ---------------------------------------------------------------- guides
def article(g, lang="en"):
    path = (f"/fi/oppaat/{g['slug']}/" if lang == "fi" else f"/guides/{g['slug']}/")
    def prod_block(m):
        ids = [x.strip() for x in m.group(1).split(",")]
        return grid([BY_ID[i] for i in ids if i in BY_ID], lang)
    body = re.sub(r"\[\[products:([^\]]+)\]\]", prod_block, g["body"])
    art = {"@context": "https://schema.org", "@type": "Article", "headline": g["h1"], "description": g["desc"], "inLanguage": lang,
           "datePublished": "2026-11-18", "dateModified": TODAY, "image": SITE + "/assets/og-image.jpg",
           "author": {"@type": "Organization", "name": "Almo’min", "url": SITE},
           "publisher": {"@type": "Organization", "name": "Almo’min", "logo": {"@type": "ImageObject", "url": SITE + "/assets/own/full-gold.png"}}}
    home = ("Etusivu", "/fi/") if lang == "fi" else ("Home", "/")
    mid = ("Oppaat", path) if lang == "fi" else ("Guides", "/guides/")
    cr = crumbs([home, mid, (g["short"], path)]) if lang == "en" else crumbs([home, (g["short"], path)])
    crumb_html = (f'<a href="{home[1]}">{home[0]}</a><span>›</span>' + (f'<a href="/guides/">Guides</a><span>›</span>' if lang == "en" else "") + f'<span aria-current="page">{esc(g["short"])}</span>')
    write(path, f"""{head(g['title'], g['desc'], path, lang=lang, extra=ld([art, {"@context": "https://schema.org", **cr}]))}{header(lang, other=('/' if lang == 'fi' else '/fi/oppaat/islamilaiset-lastenkirjat/'))}
  <main id="main" class="wrap pg__main">
    <nav class="crumbs" aria-label="Breadcrumb">{crumb_html}</nav>
    <article class="pg__article">
      <header><p class="eyebrow">{'Opas' if lang == 'fi' else 'Guide'} · {'Päivitetty' if lang == 'fi' else 'Updated'} {date.today().strftime('%-d.%-m.%Y') if lang == 'fi' else date.today().strftime('%-d %B %Y')}</p><h1 class="h1">{esc(g['h1'])}</h1><p class="pg__lede">{g['lede']}</p></header>
      {body}
    </article>
  </main>
{footer(lang)}""")

for g in C.GUIDES_EN: article(g)
for g in C.GUIDES_FI: article(g, "fi")
idx = "".join(f'<li><a class="pg__guide" href="/guides/{g["slug"]}/"><b>{esc(g["h1"])}</b><span>{esc(g["desc"])}</span></a></li>' for g in C.GUIDES_EN)
write("/guides/", f"""{head("Guides for Muslim Parents | Islamic Children's Books | Almo’min", "Reading guides for Muslim parents: the best Islamic books for babies, prophet stories in order, and Ramadan and Eid books and activities for kids.", "/guides/")}{header()}
  <main id="main" class="wrap pg__main">
    <header class="pg__head"><p class="eyebrow">Guides</p><h1 class="h1">Guides for Muslim parents</h1><p class="pg__lede">Practical ideas for building a home library that helps children love Allah, the Quran and the prophets.</p></header>
    <ul class="pg__guides">{idx}<li><a class="pg__guide" href="/fi/oppaat/islamilaiset-lastenkirjat/" hreflang="fi"><b>Suomeksi: Islamilaiset lastenkirjat – opas vanhemmille</b><span>Opas suomeksi.</span></a></li></ul>
  </main>
{footer()}""")

# ---------------------------------------------------------------- sitemap
urls = [("/", "1.0"), ("/terms.html", "0.3"), ("/privacy.html", "0.3")] + [(p, "0.9" if p.startswith(("/shop/", "/fi/")) and p.count("/") <= 3 else "0.7") for p in PAGES]
sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
sm += [f"  <url><loc>{SITE}{u}</loc><lastmod>{TODAY}</lastmod><priority>{p}</priority></url>" for u, p in urls]
sm.append("</urlset>")
(ROOT / "sitemap.xml").write_text("\n".join(sm) + "\n")
print(f"{len(PAGES)} pages written, sitemap has {len(urls)} URLs")
