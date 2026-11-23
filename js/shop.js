(function () {
  const SHOP = window.SHOP, C = window.ALMOMIN || {};
  if (!SHOP) return;
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const rich = s => esc(s).replace(/ﷺ/g, '<span class="saw">ﷺ</span>');
  const money = n => "€" + n.toFixed(2);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const byId = Object.fromEntries(SHOP.items.map(it => [it.id, it]));
  const catLabel = id => (SHOP.categories.find(c => c.id === id) || {}).label || "";
  const fromPrice = it => Math.min(...it.options.map(o => o.price));
  const WA = n => "https://wa.me/" + (C.whatsapp || "") + "?text=" + encodeURIComponent(n);

  /* ---------- SKUs: "id" or "id~optionIndex" ---------- */
  const skuOf = (it, k) => it.options.length > 1 ? `${it.id}~${k}` : it.id;
  const parse = sku => { const [id, k] = sku.split("~"); const it = byId[id]; if (!it) return null; const o = it.options[+k || 0]; return o ? { it, o } : null; };
  const nameOf = sku => { const p = parse(sku); return p ? p.it.title + (p.o.label ? ` (${p.o.label})` : "") : sku; };

  /* ---------- Basket state (saved in this browser) ---------- */
  let bag = [];
  try { bag = JSON.parse(localStorage.getItem("almomin-bag") || "[]").filter(l => parse(l.sku)); } catch (e) { bag = []; }
  const save = () => { try { localStorage.setItem("almomin-bag", JSON.stringify(bag)); } catch (e) {} };
  const count = () => bag.reduce((s, l) => s + l.qty, 0);
  const subtotal = () => bag.reduce((s, l) => s + parse(l.sku).o.price * l.qty, 0);
  const add = (sku, qty = 1) => {
    const l = bag.find(x => x.sku === sku);
    if (l) l.qty = Math.min(20, l.qty + qty); else bag.push({ sku, qty });
    save(); renderBag(); toast(nameOf(sku));
  };

  /* ---------- Collection grid ---------- */
  const grid = $("shopGrid"), chips = $("shopChips");
  const GROUPS = SHOP.groups || {}, shownGroups = new Set();
  const groupCard = g => `
    <li data-cat="bundles">
      <a class="pc pc--bundle pc--group" href="${g.url}">
        <span class="pc__stage"><img src="${g.cover}" alt="${esc(g.title)}" loading="lazy"></span>
        <span class="pc__meta">
          <span class="pc__cat">Prophet stories</span>
          <span class="pc__title">${esc(g.title)}: ${esc(g.sub)}</span>
          <span class="pc__price">${esc(g.price)}</span>
          <span class="pc__more">Explore each book →</span>
        </span>
      </a>
    </li>`;
  const listed = SHOP.items.filter(it => !it.group || (!shownGroups.has(it.group) && shownGroups.add(it.group)));
  grid.innerHTML = listed.map(it => it.group && GROUPS[it.group] ? groupCard(GROUPS[it.group]) : `
    <li data-cat="${it.cat}">
      <a class="pc${it.cat === "bundles" ? " pc--bundle" : ""}" href="/books/${it.id}/" data-open="${it.id}">
        <span class="pc__stage"><img src="${it.cover}" alt="${esc(it.title)}" loading="lazy">${it.isNew ? '<span class="pc__new">New</span>' : ""}</span>
        <span class="pc__meta">
          <span class="pc__cat">${esc(catLabel(it.cat))}</span>
          <span class="pc__title">${rich(it.title)}</span>
          <span class="pc__price">${it.options.length > 1 ? "from " : ""}${money(fromPrice(it))}</span>
        </span>
      </a>
    </li>`).join("");

  const opts = [{ id: "all", label: `All ${listed.length}` }, ...SHOP.categories];
  chips.innerHTML = opts.map((o, i) => `<button class="chip" role="tab" type="button" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-f="${o.id}">${esc(o.label)}</button>`).join("");
  const select = btn => {
    chips.querySelectorAll(".chip").forEach(c => { c.setAttribute("aria-selected", c === btn); c.tabIndex = c === btn ? 0 : -1; });
    const f = btn.dataset.f;
    grid.querySelectorAll("li").forEach(li => li.hidden = !(f === "all" || li.dataset.cat === f));
  };
  chips.addEventListener("click", e => { const b = e.target.closest(".chip"); if (b) select(b); });
  document.addEventListener("click", e => {
    const f = e.target.closest("[data-filter]"); if (!f) return;
    const chip = chips.querySelector(`[data-f="${f.dataset.filter}"]`); if (chip) select(chip);
  });
  chips.addEventListener("keydown", e => {
    if (!["ArrowRight", "ArrowLeft"].includes(e.key)) return;
    const all = [...chips.querySelectorAll(".chip")]; let i = all.indexOf(document.activeElement);
    i = (i + (e.key === "ArrowRight" ? 1 : -1) + all.length) % all.length; all[i].focus(); select(all[i]); e.preventDefault();
  });

  if (!reduce) grid.addEventListener("pointermove", e => {
    const card = e.target.closest(".pc"); if (!card || e.pointerType !== "mouse") return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--tx", ((e.clientY - r.top) / r.height - .5) * -8 + "deg");
    card.style.setProperty("--ty", ((e.clientX - r.left) / r.width - .5) * 10 + "deg");
  });
  grid.addEventListener("pointerout", e => { const c = e.target.closest(".pc"); if (c && !c.contains(e.relatedTarget)) { c.style.removeProperty("--tx"); c.style.removeProperty("--ty"); } });

  /* ---------- Product dialog ---------- */
  const pd = $("pd");
  let cur = null, opt = 0;
  const paint = () => {
    const o = cur.options[opt];
    $("pd-price").textContent = money(o.price);
    $("pd-wa").href = WA(`Assalamu alaikum! I have a question about “${cur.title}”${o.label ? ` (${o.label})` : ""}, ${money(o.price)}.`);
    $("pd-opts").querySelectorAll("button").forEach((b, i) => { b.setAttribute("aria-checked", i === opt); b.tabIndex = i === opt ? 0 : -1; });
  };
  const openProduct = id => {
    cur = byId[id]; opt = 0; if (!cur) return;
    gal = cur.gallery && cur.gallery.length ? cur.gallery : [cur.cover];
    $("pd-thumbs").innerHTML = gal.length < 2 ? "" : gal.map((src, i) => `<li><button type="button" data-g="${i}" aria-label="Photo ${i + 1} of ${gal.length}"><img src="${src}" alt="" loading="lazy"></button></li>`).join("");
    showPhoto(0);
    $("pd").classList.toggle("pd--bundle", cur.cat === "bundles");
    $("pd-cat").textContent = catLabel(cur.cat) + (cur.isNew ? " · New" : "");
    $("pd-title").innerHTML = rich(cur.title);
    $("pd-desc").innerHTML = rich(cur.desc);
    $("pd-specs").textContent = cur.specs || "";
    $("pd-page").href = `/books/${cur.id}/`;
    $("pd-explore").hidden = !cur.explore;
    const op = $("pd-opts");
    op.hidden = cur.options.length < 2;
    op.innerHTML = cur.options.length < 2 ? "" : cur.options.map((o, k) => `<button type="button" role="radio" data-k="${k}">${esc(o.label)} <span>${money(o.price)}</span></button>`).join("");
    const inc = $("pd-inc");
    inc.hidden = !cur.includes;
    $("pd-inc-list").innerHTML = (cur.includes || []).map(b => `<li><img src="${b.cover}" alt="" loading="lazy"><span>${rich(b.title)}</span></li>`).join("");
    paint();
    pd.showModal();
    pd.scrollTop = 0;
  };
  /* ---------- Photo gallery + full-screen viewer ---------- */
  let gal = [], gi = 0;
  const showPhoto = (i, dir = 0) => {
    const prevSrc = gal[gi];
    gi = (i + gal.length) % gal.length;
    const img = $("pd-img");
    // 3D page turn: the old photo turns away like a page, revealing the new one
    if (dir && !reduce && pd.open && prevSrc && prevSrc !== gal[gi]) {
      const page = document.createElement("img");
      page.src = prevSrc; page.alt = ""; page.className = "gal__page " + (dir > 0 ? "is-fwd" : "is-back");
      img.parentNode.appendChild(page);
      page.addEventListener("animationend", () => page.remove());
      setTimeout(() => page.remove(), 1200);
    }
    img.classList.remove("is-in"); img.src = gal[gi];
    img.alt = `${cur.title}, photo ${gi + 1} of ${gal.length}`;
    requestAnimationFrame(() => img.classList.add("is-in"));
    const many = gal.length > 1;
    $("pd-prev").hidden = $("pd-next").hidden = !many;
    $("pd-count").textContent = many ? `${gi + 1} / ${gal.length}` : "";
    $("pd-thumbs").querySelectorAll("button").forEach((b, k) => b.setAttribute("aria-current", k === gi));
    const act = $("pd-thumbs").querySelector(`[data-g="${gi}"]`); if (act) act.scrollIntoView({ block: "nearest", inline: "nearest" });
    if (lb.open) paintLb();
    [gal[gi + 1], gal[gi - 1]].forEach(src => { if (src) { const p = new Image(); p.src = src; } }); // preload neighbours
  };
  $("pd-prev").addEventListener("click", () => showPhoto(gi - 1, -1));
  $("pd-next").addEventListener("click", () => showPhoto(gi + 1, 1));
  $("pd-thumbs").addEventListener("click", e => { const b = e.target.closest("[data-g]"); if (b) showPhoto(+b.dataset.g, +b.dataset.g > gi ? 1 : -1); });
  pd.addEventListener("keydown", e => {
    if (lb.open || e.target.closest("#pd-opts")) return;
    if (e.key === "ArrowRight") { showPhoto(gi + 1, 1); e.preventDefault(); }
    if (e.key === "ArrowLeft") { showPhoto(gi - 1, -1); e.preventDefault(); }
  });
  // swipe on touch screens
  let sx = null;
  $("pd-zoom").addEventListener("touchstart", e => { sx = e.touches[0].clientX; }, { passive: true });
  $("pd-zoom").addEventListener("touchend", e => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; sx = null; if (Math.abs(dx) > 40) { swiped = true; showPhoto(gi + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1); } }, { passive: true });
  let swiped = false;
  const lb = $("lb");
  const paintLb = () => { $("lb-img").src = gal[gi]; $("lb-img").alt = $("pd-img").alt; $("lb-count").textContent = gal.length > 1 ? `${gi + 1} / ${gal.length}` : ""; $("lb-prev").hidden = $("lb-next").hidden = gal.length < 2; };
  $("pd-zoom").addEventListener("click", () => { if (swiped) { swiped = false; return; } paintLb(); lb.showModal(); });
  $("lb-x").addEventListener("click", () => lb.close());
  $("lb-prev").addEventListener("click", () => showPhoto(gi - 1));
  $("lb-next").addEventListener("click", () => showPhoto(gi + 1));
  lb.addEventListener("click", e => { if (e.target === lb) lb.close(); });
  lb.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") { showPhoto(gi + 1); e.preventDefault(); }
    if (e.key === "ArrowLeft") { showPhoto(gi - 1); e.preventDefault(); }
  });

  $("pd-opts").addEventListener("click", e => { const b = e.target.closest("button"); if (b) { opt = +b.dataset.k; paint(); } });
  $("pd-opts").addEventListener("keydown", e => {
    if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].includes(e.key)) return;
    const n = cur.options.length; opt = (opt + (["ArrowRight", "ArrowDown"].includes(e.key) ? 1 : -1) + n) % n; paint();
    $("pd-opts").querySelectorAll("button")[opt].focus(); e.preventDefault();
  });
  $("pd-add").addEventListener("click", () => { add(skuOf(cur, opt)); pd.close(); });
  pd.addEventListener("click", e => { if (e.target === pd) pd.close(); });

  document.addEventListener("click", e => {
    const o = e.target.closest("[data-open]");
    if (o) {
      if (o.tagName === "A" && (e.metaKey || e.ctrlKey || e.shiftKey || e.button)) return; // let new-tab clicks open the product page
      e.preventDefault(); openProduct(o.dataset.open); return;
    }
    const a = e.target.closest("[data-add]"); if (a) { add(a.dataset.add); }
  });

  /* ---------- Basket dialog ---------- */
  const bagDlg = $("bag");
  const renderBag = () => {
    const n = count();
    $("bagCount").textContent = n; $("bagCount").hidden = n === 0;
    $("bagEmpty").hidden = n > 0; $("bagFoot").hidden = n === 0;
    $("bagList").innerHTML = bag.map((l, i) => {
      const { it, o } = parse(l.sku);
      return `<li>
        <img src="${it.cover}" alt="">
        <div class="bag__info"><p class="bag__name">${rich(it.title)}${o.label ? ` <small>${esc(o.label)}</small>` : ""}</p>
          <div class="qty" role="group" aria-label="Quantity">
            <button type="button" data-q="${i}" data-d="-1" aria-label="One fewer">−</button><span aria-live="polite">${l.qty}</span><button type="button" data-q="${i}" data-d="1" aria-label="One more">+</button>
          </div></div>
        <div class="bag__right"><b>${money(o.price * l.qty)}</b><button type="button" class="bag__rm" data-rm="${i}">Remove</button></div>
      </li>`;
    }).join("");
    $("bagSubtotal").textContent = money(subtotal());
    $("bagWa").href = WA("Assalamu alaikum! I’d like to order:\n" + bag.map(l => `• ${l.qty} × ${nameOf(l.sku)} (${money(parse(l.sku).o.price * l.qty)})`).join("\n") + `\nSubtotal: ${money(subtotal())}`);
    $("bagMsg").textContent = "";
  };
  $("bagList").addEventListener("click", e => {
    const q = e.target.closest("[data-q]"), r = e.target.closest("[data-rm]");
    if (q) { const l = bag[+q.dataset.q]; l.qty = Math.max(1, Math.min(20, l.qty + +q.dataset.d)); }
    if (r) bag.splice(+r.dataset.rm, 1);
    if (q || r) { save(); renderBag(); }
  });
  $("bagBtn").addEventListener("click", () => { renderBag(); bagDlg.showModal(); });
  bagDlg.addEventListener("click", e => { if (e.target === bagDlg || e.target.closest("[data-close-bag]")) bagDlg.close(); });

  /* ---------- Checkout ---------- */
  $("bagCheckout").addEventListener("click", async () => {
    const btn = $("bagCheckout"), msg = $("bagMsg");
    btn.disabled = true; btn.textContent = "Opening secure checkout…"; msg.textContent = "";
    try {
      const r = await fetch("/.netlify/functions/checkout", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: bag.map(l => ({ sku: l.sku, qty: l.qty })) })
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok && data.url) { location.href = data.url; return; }
      throw new Error(data.error || "unavailable");
    } catch (err) {
      msg.textContent = "Online payment isn’t available right now. You can send this order on WhatsApp instead and pay by MobilePay or card.";
      msg.classList.add("is-err");
    }
    btn.disabled = false; btn.textContent = "Checkout securely";
  });

  /* ---------- Toast ---------- */
  const t = document.createElement("div");
  t.className = "toast"; t.setAttribute("role", "status");
  document.body.appendChild(t);
  let tt;
  const toast = name => {
    t.innerHTML = `<span><b>Added:</b> ${rich(name)}</span><button type="button" class="toast__btn">View basket</button>`;
    t.classList.add("is-on"); clearTimeout(tt); tt = setTimeout(() => t.classList.remove("is-on"), 3800);
    t.querySelector("button").onclick = () => { t.classList.remove("is-on"); renderBag(); bagDlg.showModal(); };
    $("bagBtn").classList.remove("is-bump"); void $("bagBtn").offsetWidth; $("bagBtn").classList.add("is-bump");
  };

  renderBag();
  if (location.hash === "#bag") { bagDlg.showModal(); history.replaceState(null, "", location.pathname + location.search); }
  window.AlmominShop = { open: openProduct, add };
})();
