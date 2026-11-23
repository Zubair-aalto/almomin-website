// Cloudflare Worker for almomin.eu.
// Requests to /api/* run the handlers below; everything else is the static website from dist/ (see wrangler.jsonc).
import * as checkout from "./api/checkout.js";
import * as webhook from "./api/stripe-webhook.js";
import * as login from "./api/admin/login.js";
import * as orders from "./api/admin/orders.js";
import * as orderUpdate from "./api/admin/order-update.js";
import * as products from "./api/admin/products.js";
import * as save from "./api/admin/save.js";
import { json } from "../lib/server.js";

const ROUTES = {
  "/api/checkout": checkout,
  "/api/stripe-webhook": webhook,
  "/api/admin/login": login,
  "/api/admin/orders": orders,
  "/api/admin/order-update": orderUpdate,
  "/api/admin/products": products,
  "/api/admin/save": save,
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    // www.almomin.eu → almomin.eu (one address for Google and customers)
    if (url.hostname === "www.almomin.eu") { url.hostname = "almomin.eu"; return Response.redirect(url.toString(), 301); }
    if (url.pathname.startsWith("/api/")) {
      const mod = ROUTES[url.pathname.replace(/\/$/, "")];
      if (!mod) return json(404, { error: "not_found" });
      const handler = request.method === "GET" ? mod.onRequestGet : request.method === "POST" ? mod.onRequestPost : null;
      if (!handler) return json(405, { error: "method_not_allowed" });
      try { return await handler({ request, env, ctx }); }
      catch (e) { console.error(url.pathname, e); return json(500, { error: "server_error" }); }
    }
    return env.ASSETS.fetch(request);
  }
};
