(function () {
  const form = document.getElementById("cform");
  if (!form) return;
  const EMAIL = "almomin.eu@gmail.com";
  const WA = (window.ALMOMIN && window.ALMOMIN.whatsapp) || "358417225258";
  const status = document.getElementById("cf-status");
  const $ = id => document.getElementById(id);

  const setType = () => {
    const custom = form.type.value === "Custom order";
    form.classList.toggle("is-order", custom);
    $("cf-msg").placeholder = custom ? "Tell us about the order: occasion, delivery date, anything else" : "How can we help?";
  };
  form.addEventListener("change", e => { if (e.target.name === "type") setType(); });
  setType();

  const fields = [
    ["cf-name", v => v.trim().length > 1],
    ["cf-email", v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())],
    ["cf-msg", v => v.trim().length > 2]
  ];
  const check = id => {
    const [, ok] = fields.find(f => f[0] === id);
    const el = $(id), err = $(id + "-err"), valid = ok(el.value);
    el.setAttribute("aria-invalid", !valid);
    if (valid) el.removeAttribute("aria-describedby"); else el.setAttribute("aria-describedby", id + "-err");
    err.hidden = valid;
    return valid;
  };
  fields.forEach(([id]) => $(id).addEventListener("blur", () => { if ($(id).value) check(id); }));
  fields.forEach(([id]) => $(id).addEventListener("input", () => { if ($(id).getAttribute("aria-invalid") === "true") check(id); }));

  form.addEventListener("submit", e => {
    e.preventDefault();
    const via = (e.submitter && e.submitter.value) || "wa";
    const bad = fields.map(([id]) => check(id) ? null : id).filter(Boolean);
    if (bad.length) { $(bad[0]).focus(); status.textContent = "Please fix the highlighted fields."; status.classList.add("is-err"); return; }
    status.classList.remove("is-err");
    const f = form.elements, custom = f.type.value === "Custom order";
    const v = k => f[k].value.trim();
    const lines = [`Assalamu alaikum! ${custom ? "Custom order request" : "Question"} from the Almo’min website`, "", `Name: ${v("name")}`, `Email: ${v("email")}`];
    if (v("phone")) lines.push(`Phone: ${v("phone")}`);
    if (custom && v("city")) lines.push(`City: ${v("city")}`);
    if (custom && v("books")) lines.push(`Books: ${v("books")}`);
    lines.push("", v("message"));
    const body = lines.join("\n");
    let url;
    if (via === "mail") {
      const subject = `${custom ? "Custom order" : "Question"} from ${f.name.value.trim()}`;
      url = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status.textContent = "Opening your email app. Press send there to reach us.";
    } else {
      url = `https://wa.me/${WA}?text=${encodeURIComponent(body)}`;
      status.textContent = "Opening WhatsApp. Press send there to reach us.";
    }
    const w = window.open(url, "_blank", "noopener");
    if (!w && via === "mail") location.href = url;
  });
})();
