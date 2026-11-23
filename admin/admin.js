/* Almo'min admin: orders and customers (from Stripe) and product editing (saved to GitHub, published by Netlify). */
(function () {
  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const eur = cents => "€" + (cents / 100).toFixed(2);
  const money = n => "€" + Number(n).toFixed(2);
  const date = ts => new Date(ts * 1000).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  const STATUS = { new: "New", packed: "Packed", shipped: "Shipped", collected: "Collected", cancelled: "Cancelled" };
  const ERR = {
    admin_not_configured: "The admin password isn’t set up yet (ADMIN_PASSWORD in Netlify, at least 12 characters).",
    login_required: "Your login has expired. Please log in again.",
    wrong_password: "Wrong password.",
    stripe_not_configured: "Stripe key is missing in Netlify.",
    github_not_configured: "Saving needs the GITHUB_TOKEN setting in Netlify (see the setup steps).",
    changed_elsewhere: "The products were changed somewhere else meanwhile. Reload the page and make your change again."
  };
  const errText = e => ERR[e] || (/permission|not have the required/i.test(e) ? "Stripe key needs more permissions: " + e : e) || "Something went wrong.";

  /* ---------------- API ---------------- */
  let token = sessionStorage.getItem("am-admin") || "";
  async function api(name, body) {
    const r = await fetch("/.netlify/functions/" + name, {
      method: body ? "POST" : "GET",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
      body: body ? JSON.stringify(body) : undefined
    });
    const data = await r.json().catch(() => ({ error: "Server error (" + r.status + ")" }));
    if (r.status === 401 && name !== "admin-login") { logout(); throw new Error(errText("login_required")); }
    if (!r.ok) throw new Error(errText(data.error));
    return data;
  }

  /* ---------------- Login ---------------- */
  const show = loggedIn => { $("login").hidden = loggedIn; $("app").hidden = !loggedIn; if (!loggedIn) $("pw").focus(); };
  function logout() { token = ""; sessionStorage.removeItem("am-admin"); show(false); }
  $("logout").onclick = logout;
  $("loginForm").onsubmit = async e => {
    e.preventDefault(); $("loginMsg").textContent = "Checking…";
    try {
      const d = await api("admin-login", { password: $("pw").value });
      token = d.token; sessionStorage.setItem("am-admin", token); $("pw").value = ""; $("loginMsg").textContent = "";
      start();
    } catch (err) { $("loginMsg").textContent = err.message; }
  };

  /* ---------------- Tabs ---------------- */
  document.querySelectorAll("[data-tab]").forEach(b => b.onclick = () => openTab(b.dataset.tab));
  function openTab(t) {
    document.querySelectorAll("[data-tab]").forEach(b => b.setAttribute("aria-selected", b.dataset.tab === t));
    ["orders", "customers", "products"].forEach(p => $("pane-" + p).hidden = p !== t);
    if (t === "products" && !products) loadProducts();
  }

  /* ---------------- Orders ---------------- */
  let orders = [];
  async function loadOrders() {
    $("orderMsg").textContent = "Loading orders from Stripe…";
    try { orders = (await api("admin-orders")).orders; $("orderMsg").textContent = ""; }
    catch (e) { $("orderMsg").textContent = e.message; orders = []; }
    renderStats(); renderOrders(); renderCustomers();
  }
  function renderStats() {
    const now = new Date(), m0 = new Date(now.getFullYear(), now.getMonth(), 1) / 1000;
    const live = orders.filter(o => o.status !== "cancelled");
    const month = live.filter(o => o.created >= m0);
    const todo = orders.filter(o => o.status === "new" || o.status === "packed");
    $("stats").innerHTML = [
      ["To pack & send", todo.length, todo.length ? "orders waiting" : "all done"],
      ["This month", eur(month.reduce((s, o) => s + o.total, 0)), month.length + " orders"],
      ["All time", eur(live.reduce((s, o) => s + o.total, 0)), live.length + " orders"],
      ["Customers", new Set(live.map(o => o.customer.email)).size, "different emails"]
    ].map(([h, v, s]) => `<div class="stat"><p>${h}</p><b>${v}</b><small>${s}</small></div>`).join("");
  }
  const addr = a => a ? [a.line1, a.line2, [a.postal_code, a.city].filter(Boolean).join(" "), a.country].filter(Boolean).join(", ") : "";
  function renderOrders() {
    const q = $("orderSearch").value.trim().toLowerCase(), f = $("orderFilter").value;
    const list = orders.filter(o => (f === "all" || (f === "open" ? (o.status === "new" || o.status === "packed") : o.status === f))
      && (!q || JSON.stringify([o.customer, o.shipping, o.items.map(i => i.name)]).toLowerCase().includes(q)));
    $("orders").innerHTML = list.length ? list.map(o => `
      <article class="order order--${o.status}" data-id="${o.id}">
        <header class="order__head">
          <div><b>${esc(o.customer.name || o.shipping?.name || "Customer")}</b><small>${date(o.created)} · #${o.id.slice(-8)}</small></div>
          <span class="pill pill--${o.status}">${STATUS[o.status] || o.status}</span>
          <b class="order__total">${eur(o.total)}</b>
        </header>
        <div class="order__body">
          <ul class="order__items">${o.items.map(i => `<li><span>${i.qty} ×</span> ${esc(i.name)} <em>${eur(i.amount)}</em></li>`).join("")}
            <li class="order__ship"><span></span> ${esc(o.delivery.name || "Delivery")} <em>${eur(o.delivery.amount)}</em></li></ul>
          <div class="order__who">
            <p><b>Send to</b><br>${esc(o.shipping?.name || o.customer.name)}<br>${esc(addr(o.shipping?.address))}</p>
            <p><b>Contact</b><br>${o.customer.email ? `<a href="mailto:${esc(o.customer.email)}">${esc(o.customer.email)}</a>` : ""}${o.customer.phone ? `<br><a href="tel:${esc(o.customer.phone)}">${esc(o.customer.phone)}</a> · <a href="https://wa.me/${esc(o.customer.phone.replace(/\D/g, ""))}" target="_blank" rel="noopener">WhatsApp</a>` : ""}</p>
          </div>
          <form class="order__form">
            <label>Status<select name="status">${Object.entries(STATUS).map(([k, v]) => `<option value="${k}"${k === o.status ? " selected" : ""}>${v}</option>`).join("")}</select></label>
            <label>Tracking number<input name="tracking" value="${esc(o.tracking)}" placeholder="e.g. JJFI6…"></label>
            <label class="wide">Note (only you see this)<input name="note" value="${esc(o.note)}" maxlength="480"></label>
            <button class="btn btn--gold btn--sm" type="submit">Save</button>
            <a class="link" href="https://dashboard.stripe.com/${o.id.startsWith("cs_test") ? "test/" : ""}payments/${o.paymentIntent || ""}" target="_blank" rel="noopener">Open in Stripe (refunds) →</a>
            <span class="order__saved" role="status"></span>
          </form>
        </div>
      </article>`).join("") : `<p class="empty">${orders.length ? "No orders match." : "No paid orders yet."}</p>`;
  }
  $("orders").addEventListener("submit", async e => {
    e.preventDefault();
    const form = e.target, card = form.closest(".order"), o = orders.find(x => x.id === card.dataset.id), out = form.querySelector(".order__saved");
    const v = Object.fromEntries(new FormData(form));
    out.textContent = "Saving…";
    try {
      await api("admin-order-update", { id: o.id, ...v });
      Object.assign(o, v); out.textContent = "Saved ✓";
      setTimeout(() => { renderStats(); renderOrders(); renderCustomers(); }, 700);
    } catch (err) { out.textContent = err.message; }
  });
  $("orderSearch").oninput = renderOrders; $("orderFilter").onchange = renderOrders; $("orderReload").onclick = loadOrders;

  const csv = (rows, name) => {
    const text = rows.map(r => r.map(c => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob(["﻿" + text], { type: "text/csv" })); a.download = name; a.click();
  };
  $("orderCsv").onclick = () => csv([["Date", "Order", "Status", "Name", "Email", "Phone", "Address", "Delivery", "Items", "Total €", "Tracking", "Note"],
    ...orders.map(o => [new Date(o.created * 1000).toISOString().slice(0, 16).replace("T", " "), o.id.slice(-8), STATUS[o.status], o.shipping?.name || o.customer.name, o.customer.email, o.customer.phone,
      addr(o.shipping?.address), o.delivery.name, o.items.map(i => `${i.qty}× ${i.name}`).join("; "), (o.total / 100).toFixed(2), o.tracking, o.note])], "almomin-orders.csv");

  /* ---------------- Customers ---------------- */
  let customers = [];
  function renderCustomers() {
    const by = {};
    orders.filter(o => o.status !== "cancelled").forEach(o => {
      const k = (o.customer.email || o.customer.name || o.id).toLowerCase();
      const c = by[k] ||= { name: "", email: o.customer.email, phone: "", city: "", n: 0, spent: 0, last: 0 };
      c.n++; c.spent += o.total;
      if (o.created > c.last) { c.last = o.created; c.name = o.customer.name || o.shipping?.name || c.name; c.phone = o.customer.phone || c.phone; c.city = o.shipping?.address?.city || c.city; }
    });
    customers = Object.values(by).sort((a, b) => b.last - a.last);
    const q = $("custSearch").value.trim().toLowerCase();
    const list = customers.filter(c => !q || JSON.stringify(c).toLowerCase().includes(q));
    $("custTable").tBodies[0].innerHTML = list.length ? list.map(c => `
      <tr data-email="${esc(c.email)}"><td><b>${esc(c.name)}</b>${c.n > 1 ? ' <span class="pill pill--packed">Returning</span>' : ""}</td>
      <td>${esc(c.email)}<br><small>${esc(c.phone)}</small></td><td>${esc(c.city)}</td><td class="num">${c.n}</td><td class="num">${eur(c.spent)}</td><td>${date(c.last).split(",")[0]}</td></tr>`).join("")
      : `<tr><td colspan="6" class="empty">No customers yet.</td></tr>`;
  }
  $("custSearch").oninput = renderCustomers;
  $("custTable").onclick = e => {
    const tr = e.target.closest("tr[data-email]"); if (!tr) return;
    $("orderSearch").value = tr.dataset.email; $("orderFilter").value = "all"; openTab("orders"); renderOrders();
  };
  $("custCsv").onclick = () => csv([["Name", "Email", "Phone", "City", "Orders", "Spent €", "Last order"],
    ...customers.map(c => [c.name, c.email, c.phone, c.city, c.n, (c.spent / 100).toFixed(2), new Date(c.last * 1000).toISOString().slice(0, 10)])], "almomin-customers.csv");

  /* ---------------- Products ---------------- */
  let products = null, base = "", editing = null, draft = null;
  async function loadProducts() {
    $("prodMsg").textContent = "Loading products…";
    try {
      const d = await api("admin-products"); products = d.data; base = d.base; $("prodMsg").textContent = "";
      $("prodCat").innerHTML = `<option value="">All categories</option>` + products.categories.map(c => `<option value="${c.id}">${esc(c.label)}</option>`).join("");
      $("edCat").innerHTML = products.categories.map(c => `<option value="${c.id}">${esc(c.label)}</option>`).join("");
      renderProducts();
    } catch (e) { $("prodMsg").textContent = e.message; }
  }
  const priceText = it => it.options.length > 1 ? "from " + money(Math.min(...it.options.map(o => o.price))) : money(it.options[0].price);
  const catName = id => (products.categories.find(c => c.id === id) || {}).label || id;
  function renderProducts() {
    const q = $("prodSearch").value.trim().toLowerCase(), c = $("prodCat").value;
    $("plist").innerHTML = products.items.filter(it => (!c || it.cat === c) && (!q || (it.title + " " + it.desc).toLowerCase().includes(q))).map(it => `
      <button type="button" class="prod${it.hidden ? " prod--hidden" : ""}" data-id="${it.id}">
        <img src="/${esc(it.cover)}" alt="" loading="lazy">
        <span class="prod__t">${esc(it.title)}</span>
        <span class="prod__m">${esc(catName(it.cat))}${it.hidden ? ' · <b>Hidden</b>' : ""}${it.isNew ? " · New" : ""}</span>
        <span class="prod__p">${priceText(it)}</span>
      </button>`).join("");
  }
  $("prodSearch").oninput = renderProducts; $("prodCat").onchange = renderProducts;
  $("plist").onclick = e => { const b = e.target.closest(".prod"); if (b) openEditor(products.items.find(i => i.id === b.dataset.id)); };
  $("prodNew").onclick = () => openEditor(null);

  // Editor
  const ed = $("ed"), F = $("edForm");
  function openEditor(it) {
    editing = it;
    draft = it ? JSON.parse(JSON.stringify(it)) : { id: "", title: "", cat: products.categories[1]?.id || products.categories[0].id, isNew: true, desc: "", specs: "", cover: "", options: [{ label: null, price: 9.95 }], gallery: [] };
    draft.photos = (draft.gallery && draft.gallery.length ? draft.gallery : (draft.cover ? [draft.cover] : [])).map(p => ({ path: p }));
    $("edTitle").textContent = it ? "Edit product" : "New product";
    F.title.value = draft.title; F.cat.value = draft.cat; F.isNew.checked = !!draft.isNew; F.hidden.checked = !!draft.hidden;
    F.desc.value = draft.desc || ""; F.specs.value = draft.specs || "";
    $("edDelete").hidden = !it; $("edMsg").textContent = "";
    if (draft.includes) $("edMsg").textContent = "This is a bundle: the list of books inside it stays as it is.";
    renderOpts(); renderPhotos(); ed.showModal();
  }
  function renderOpts() {
    const many = draft.options.length > 1;
    $("edOpts").innerHTML = draft.options.map((o, k) => `<div class="opt" data-k="${k}">
      ${many ? `<input class="opt__l" value="${esc(o.label || "")}" placeholder="Option name" aria-label="Option name" required>` : ""}
      <input class="opt__p" type="number" min="0.5" max="999" step="0.01" value="${o.price}" aria-label="Price in euros" required>
      ${many ? `<button type="button" class="link opt__x" aria-label="Remove option">Remove</button>` : ""}</div>`).join("");
  }
  const readOpts = () => [...$("edOpts").children].map(r => ({ label: r.querySelector(".opt__l")?.value.trim() || null, price: Math.round(Number(r.querySelector(".opt__p").value) * 100) / 100 }));
  $("edAddOpt").onclick = () => { draft.options = readOpts(); if (draft.options.length === 1) draft.options[0].label = draft.options[0].label || "Standard"; draft.options.push({ label: "", price: draft.options[0].price }); renderOpts(); };
  $("edOpts").onclick = e => { if (!e.target.closest(".opt__x")) return; draft.options = readOpts(); draft.options.splice(+e.target.closest(".opt").dataset.k, 1); if (draft.options.length === 1) draft.options[0].label = null; renderOpts(); };

  function renderPhotos() {
    $("edPhotos").innerHTML = draft.photos.map((p, i) => `<li data-i="${i}"><img src="${p.preview || "/" + p.path}" alt="">
      ${i === 0 ? '<span class="cover">Cover</span>' : ""}
      <div><button type="button" data-mv="-1" aria-label="Move left"${i === 0 ? " disabled" : ""}>←</button><button type="button" data-mv="1" aria-label="Move right"${i === draft.photos.length - 1 ? " disabled" : ""}>→</button><button type="button" data-rm aria-label="Remove photo">×</button></div></li>`).join("")
      || '<li class="empty">No photos yet.</li>';
  }
  $("edPhotos").onclick = e => {
    const li = e.target.closest("li[data-i]"); if (!li) return; const i = +li.dataset.i;
    if (e.target.closest("[data-rm]")) draft.photos.splice(i, 1);
    const mv = e.target.closest("[data-mv]");
    if (mv) { const j = i + +mv.dataset.mv; [draft.photos[i], draft.photos[j]] = [draft.photos[j], draft.photos[i]]; }
    renderPhotos();
  };
  // Photos are resized in the browser (max 1800 px, WebP) so uploads stay small
  const loadImg = src => new Promise((ok, no) => { const im = new Image(); im.onload = () => ok(im); im.onerror = no; im.src = src; });
  async function encode(img, max, type, q) {
    const s = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
    const c = document.createElement("canvas"); c.width = Math.round(img.naturalWidth * s); c.height = Math.round(img.naturalHeight * s);
    const g = c.getContext("2d"); if (type === "image/jpeg") { g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height); }
    g.drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL(type, q);
  }
  $("edFile").onchange = async e => {
    const files = [...e.target.files]; e.target.value = "";
    $("edMsg").textContent = "Preparing photos…";
    for (const f of files) {
      try {
        const url = URL.createObjectURL(f); const img = await loadImg(url);
        const data = await encode(img, 1800, "image/webp", 0.86);
        draft.photos.push({ preview: data, data }); URL.revokeObjectURL(url);
      } catch { $("edMsg").textContent = "Couldn’t read " + f.name; }
    }
    if ($("edMsg").textContent === "Preparing photos…") $("edMsg").textContent = "";
    renderPhotos();
  };

  const slug = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "product";
  $("edCancel").onclick = () => ed.close();
  $("edDelete").onclick = async () => {
    if (!confirm(`Delete “${editing.title}” from the shop? Tip: choose “Hidden” instead if it’s only out of stock.`)) return;
    const data = JSON.parse(JSON.stringify(products)); data.items = data.items.filter(i => i.id !== editing.id);
    await save(data, [], `Delete product: ${editing.title}`);
  };
  F.onsubmit = async e => {
    e.preventDefault();
    const opts = readOpts();
    if (opts.some(o => !(o.price > 0))) return ($("edMsg").textContent = "Please enter a price.");
    if (opts.length > 1 && opts.some(o => !o.label)) return ($("edMsg").textContent = "Please name every option.");
    if (!draft.photos.length) return ($("edMsg").textContent = "Please add at least one photo.");
    const it = { ...draft }; delete it.photos;
    it.title = F.title.value.trim(); it.cat = F.cat.value; it.isNew = F.isNew.checked; it.desc = F.desc.value.trim(); it.specs = F.specs.value.trim(); it.options = opts;
    if (F.hidden.checked) it.hidden = true; else delete it.hidden;
    if (!editing) { let id = slug(it.title), n = 2; while (products.items.some(i => i.id === id)) id = slug(it.title) + "-" + n++; it.id = id; }
    // upload new photos; keep existing ones by path
    const stamp = Date.now().toString(36), uploads = [];
    it.gallery = draft.photos.map((p, i) => {
      if (!p.data) return p.path;
      const path = `assets/shop/gallery/${it.id}-${stamp}-${i + 1}.webp`;
      uploads.push({ path, base64: p.data.split(",")[1] }); return path;
    });
    // cover: a JPG of the first photo (used on cards, in Google and at checkout) when the first photo changed
    const first = draft.photos[0];
    const oldFirst = editing ? (editing.gallery && editing.gallery[0]) || editing.cover : "";
    if (first.data || first.path !== oldFirst) {
      $("edMsg").textContent = "Preparing cover…";
      const img = await loadImg(first.data || "/" + first.path);
      const jpg = await encode(img, 900, "image/jpeg", 0.86);
      it.cover = `assets/shop/${it.id}-${stamp}.jpg`; uploads.push({ path: it.cover, base64: jpg.split(",")[1] });
    }
    const data = JSON.parse(JSON.stringify(products));
    const k = data.items.findIndex(i => i.id === it.id);
    if (k >= 0) data.items[k] = it; else data.items.push(it);
    await save(data, uploads, `${editing ? "Update" : "Add"} product: ${it.title}`);
  };
  async function save(data, photos, message) {
    $("edSave").disabled = true; $("edMsg").textContent = "Saving & publishing…";
    try {
      const size = photos.reduce((s, p) => s + p.base64.length, 0);
      if (size > 5_000_000) throw new Error("Too many large photos at once. Please save a few at a time.");
      const r = await api("admin-save", { data, base, photos, message });
      products = data; base = r.base; renderProducts(); ed.close();
      $("prodMsg").textContent = "Saved ✓ The website updates in about 1–2 minutes.";
    } catch (e) { $("edMsg").textContent = e.message; }
    $("edSave").disabled = false;
  }

  /* ---------------- Start ---------------- */
  function start() { show(true); openTab("orders"); loadOrders(); }
  if (token) start(); else show(false);
})();
