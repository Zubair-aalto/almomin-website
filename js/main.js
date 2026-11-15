(function () {
  const C = window.ALMOMIN;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const rich = s => esc(s).replace(/ﷺ/g, '<span class="saw">ﷺ</span>');
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const waHref = msg => "https://wa.me/" + (C.whatsapp || "") + "?text=" + encodeURIComponent(msg);
  const byBundle = id => C.books.filter(b => b.bundle === id);

  /* ---------- Bundles ---------- */
  const list = $("#bundleList");
  list.innerHTML = C.bundles.map(b => {
    const books = byBundle(b.id);
    const n = books.length, mid = (n - 1) / 2;
    const fan = books.map((bk, i) => {
      const off = i - mid;
      const t = `translateX(${off * 54}px) translateZ(${-Math.abs(off) * 30}px) rotateY(${off * -9}deg) rotateZ(${off * 6}deg)`;
      const style = `transform:${t}; z-index:${10 - Math.round(Math.abs(off))}`;
      return bk.cover
        ? `<img src="${bk.cover}" alt="" loading="lazy" style="${style}" data-t="${t}" data-i="${off}">`
        : `<div class="ph" style="${style}" data-t="${t}" data-i="${off}">Cover<br>coming</div>`;
    }).join("");
    const items = books.map(bk => `<li class="${bk.pending ? "is-pending" : ""}">${rich(bk.title)}${bk.pending ? " *" : ""}</li>`).join("");
    return `
      <article class="bundle reveal" id="bundle-${b.id}">
        <div class="bundle__stage">
          <span class="bundle__no">BUNDLE ${b.no}</span>
          <span class="bundle__urdu" lang="ur" dir="rtl">${b.urdu}</span>
          <div class="fan">${fan}</div>
        </div>
        <div class="bundle__body">
          <div class="bundle__top">
            <h3 class="bundle__title">${esc(b.title)}</h3>
            <p class="bundle__price">${C.currency}${b.price}<small>${n} books</small></p>
          </div>
          <p class="bundle__blurb">${rich(b.blurb)}</p>
          <ul class="bundle__list" aria-label="Books in this bundle">${items}</ul>
          <button class="btn btn--line" type="button" data-add="bundle-${b.id}">Add to basket · ${C.currency}${b.price}</button>
        </div>
      </article>`;
  }).join("");

  const total = C.bundles.reduce((s, b) => s + b.price, 0);
  $("#setTotal").textContent = C.currency + total;

  // Fan opens a little wider on hover
  if (!reduce) list.querySelectorAll(".bundle").forEach(card => {
    const items = card.querySelectorAll(".fan > *");
    card.addEventListener("pointerenter", () => items.forEach(el => {
      const o = +el.dataset.i;
      el.style.transform = `translateX(${o * 62}px) translateY(${-Math.abs(o) * 2 - 10}px) translateZ(${-Math.abs(o) * 24}px) rotateY(${o * -6}deg) rotateZ(${o * 8}deg)`;
    }));
    card.addEventListener("pointerleave", () => items.forEach(el => el.style.transform = el.dataset.t));
  });

  /* ---------- WhatsApp links ---------- */
  document.querySelectorAll(".js-wa").forEach(a => {
    a.href = waHref(a.dataset.msg || "Assalamu alaikum!");
    a.target = "_blank"; a.rel = "noopener";
  });
  if (!C.whatsapp) console.info("[Almo’min] Add your WhatsApp number in js/catalog.js → whatsapp");

  /* ---------- Nav + reveal ---------- */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", scrollY > 40);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { threshold: .12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  $("#yr").textContent = new Date().getFullYear();
})();
