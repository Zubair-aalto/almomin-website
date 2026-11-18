/* Almo'min: product, category and guide pages. Shares the basket with the homepage (localStorage "almomin-bag"). */
(function () {
  const KEY = "almomin-bag";
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; } };
  const write = b => { try { localStorage.setItem(KEY, JSON.stringify(b)); } catch (e) {} };
  const paintCount = () => {
    const n = read().reduce((s, l) => s + (l.qty || 0), 0);
    document.querySelectorAll("[data-bag-count]").forEach(el => { el.textContent = n; el.hidden = n === 0; });
  };
  paintCount();

  const pp = document.querySelector(".pp");
  if (!pp) return;
  const id = pp.dataset.id, multi = pp.dataset.multi === "1";
  let opt = 0;

  // options
  const opts = pp.querySelector(".pp__opts");
  if (opts) {
    const btns = [...opts.querySelectorAll("button")];
    const set = k => {
      opt = k;
      btns.forEach((b, i) => { b.setAttribute("aria-checked", i === k); b.tabIndex = i === k ? 0 : -1; });
      document.getElementById("pp-price").textContent = "€" + (+btns[k].dataset.price).toFixed(2);
    };
    opts.addEventListener("click", e => { const b = e.target.closest("button"); if (b) set(+b.dataset.k); });
    opts.addEventListener("keydown", e => {
      if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].includes(e.key)) return;
      const k = (opt + (["ArrowRight", "ArrowDown"].includes(e.key) ? 1 : -1) + btns.length) % btns.length;
      set(k); btns[k].focus(); e.preventDefault();
    });
    set(0);
  }

  // add to basket
  const added = document.getElementById("pp-added");
  document.getElementById("pp-add").addEventListener("click", () => {
    const sku = multi ? `${id}~${opt}` : id, bag = read(), l = bag.find(x => x.sku === sku);
    if (l) l.qty = Math.min(20, l.qty + 1); else bag.push({ sku, qty: 1 });
    write(bag); paintCount();
    added.hidden = false; added.classList.remove("is-in"); void added.offsetWidth; added.classList.add("is-in");
  });

  // gallery
  const main = document.getElementById("pp-img"), thumbs = pp.querySelector(".pp__thumbs");
  if (thumbs) thumbs.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    main.src = b.dataset.src;
    thumbs.querySelectorAll("button").forEach(x => x.setAttribute("aria-current", x === b));
  });
})();
