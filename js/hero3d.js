import * as THREE from "three";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const canvas = document.getElementById("hero3d");
const hero = canvas.parentElement;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

let renderer;
try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" }); }
catch (e) { canvas.remove(); throw e; }
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
scene.fog = new THREE.Fog(0x071f1a, 18, 38);

const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
camera.position.set(0, 0, 24);

scene.add(new THREE.AmbientLight(0xfff3d6, 0.5));
const key = new THREE.DirectionalLight(0xffe6b0, 2.2); key.position.set(-6, 8, 10); scene.add(key);
const rim = new THREE.PointLight(0xd4af5a, 60, 40); rim.position.set(6, -4, -6); scene.add(rim);
const fill = new THREE.PointLight(0xfff0c8, 40, 30); fill.position.set(0, 2, 9); scene.add(fill);

const world = new THREE.Group(); scene.add(world);
const centre = new THREE.Group(); world.add(centre);

/* ---------- Gold calligraphy (extruded from the logo outlines) ---------- */
const gold = new THREE.MeshStandardMaterial({ color: 0xf0cf7a, metalness: 0.9, roughness: 0.22, envMapIntensity: 1.8, emissive: 0x4a3510, emissiveIntensity: 0.35 });
const goldSide = new THREE.MeshStandardMaterial({ color: 0xb8902f, metalness: 0.9, roughness: 0.35, envMapIntensity: 1.5, emissive: 0x2a1e08, emissiveIntensity: 0.4 });

const LOGO = window.ALMOMIN_LOGO || null;   // set on the "your logo" page
const copper = new THREE.MeshStandardMaterial({ color: 0xe8a878, metalness: 0.9, roughness: 0.25, envMapIntensity: 1.6, emissive: 0x4a2410, emissiveIntensity: 0.3 });
function extrude(d, depth, bevel) {
  const data = new SVGLoader().parse(`<svg xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="${d}"/></svg>`);
  const shapes = data.paths.flatMap(p => SVGLoader.createShapes(p));
  return new THREE.ExtrudeGeometry(shapes, { depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel * .55, bevelSegments: 3, curveSegments: 6 });
}
if (LOGO) {
  fetch(LOGO.paths).then(r => r.json()).then(j => {
    const g = new THREE.Group();
    const main = new THREE.Mesh(extrude(j.main, 34, 5), [gold, goldSide]);
    const acc = new THREE.Mesh(extrude(j.accent, 40, 5), [copper, goldSide]);
    g.add(main, acc);
    const s = LOGO.height / j.h;
    g.scale.set(s, -s, s);
    g.position.set(-j.w * s / 2, j.h * s / 2, -0.2);
    centre.add(g);
    ready();
  });
} else fetch("assets/calligraphy-path.txt").then(r => r.text()).then(txt => {
  const [box, d] = txt.trim().split("|");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg"><path d="${d}"/></svg>`;
  const data = new SVGLoader().parse(svg);
  const shapes = data.paths.flatMap(p => SVGLoader.createShapes(p));
  const geo = new THREE.ExtrudeGeometry(shapes, { depth: 26, bevelEnabled: true, bevelThickness: 4, bevelSize: 2.2, bevelSegments: 3, curveSegments: 10 });
  geo.center();
  const mesh = new THREE.Mesh(geo, [gold, goldSide]);
  const s = 7.2 / 501;
  mesh.scale.set(s, -s, s);
  centre.add(mesh);
  ready();
});

/* ---------- 8-point star frame ---------- */
function starShape(r, ratio = 0.76) {
  const sh = new THREE.Shape();
  for (let i = 0; i <= 16; i++) {
    const a = Math.PI / 8 * i + Math.PI / 2, rr = i % 2 ? r * ratio : r;
    const x = Math.cos(a) * rr, y = Math.sin(a) * rr;
    i ? sh.lineTo(x, y) : sh.moveTo(x, y);
  }
  return sh;
}
const outer = starShape(5.4), hole = starShape(5.15);
outer.holes.push(hole);
const star = new THREE.Mesh(new THREE.ExtrudeGeometry(outer, { depth: 0.12, bevelEnabled: false }), gold);
star.position.z = -1.6; centre.add(star);
const star2 = star.clone(); star2.rotation.z = Math.PI / 8; star2.scale.setScalar(0.62); star2.position.z = -2.2; if (!LOGO) centre.add(star2);
if (LOGO) { star.scale.setScalar(1.12); star.position.z = -2.4; }

/* ---------- Ring of books (whole range, each one clickable) ---------- */
const SHOP = window.SHOP || { items: [] };
const isSmall = innerWidth < 900;
const singles = SHOP.items.filter(i => i.cat !== "bundles" && /\.jpe?g$/.test(i.cover)).map(i => ({ cover: i.cover, id: i.id }));
const prophets = SHOP.items.filter(i => i.id.startsWith("bundle-") && i.id !== "bundle-complete")
  .flatMap(b => (b.includes || []).map(x => ({ cover: x.cover, id: b.id })));
// interleave: two from the wider range, then one prophet story
const mix = []; let si = 0, pi = 0;
while (mix.length < (isSmall ? 14 : 24) && (si < singles.length || pi < prophets.length)) {
  if (si < singles.length) mix.push(singles[si++]);
  if (si < singles.length && mix.length % 3 === 1) mix.push(singles[si++]);
  if (pi < prophets.length && mix.length < (isSmall ? 14 : 24)) { mix.push(prophets[pi]); pi += 3; }
}
const ring = new THREE.Group(); world.add(ring);
const loader = new THREE.TextureLoader();
const pages = new THREE.MeshStandardMaterial({ color: 0xf1e8d2, roughness: 0.9 });
// Back cover: emerald with the gold Almo'min emblem
const backCanvas = document.createElement("canvas"); backCanvas.width = 330; backCanvas.height = 450;
const bctx = backCanvas.getContext("2d");
bctx.fillStyle = "#0B2E27"; bctx.fillRect(0, 0, 330, 450);
bctx.strokeStyle = "rgba(212,175,90,.6)"; bctx.lineWidth = 2; bctx.strokeRect(14, 14, 302, 422);
let started = false;
const backTex = new THREE.CanvasTexture(backCanvas); backTex.colorSpace = THREE.SRGBColorSpace;
const emb = new Image(); emb.onload = () => { bctx.drawImage(emb, 95, 120, 140, 182); backTex.needsUpdate = true; }; emb.src = (LOGO && LOGO.back) || "assets/emblem-gold.svg";
const backMat = new THREE.MeshStandardMaterial({ map: backTex, roughness: 0.6 });
const spineMat = new THREE.MeshStandardMaterial({ color: 0x0b2e27, roughness: 0.55 });
const W = 1.6, D = 0.09;
const R = isSmall ? 6.4 : 8.6;
const books = [];

mix.forEach((b, i) => {
  const front = new THREE.MeshStandardMaterial({ roughness: 0.42, metalness: 0.0 });
  const book = new THREE.Mesh(new THREE.BoxGeometry(W, W, D), [pages, spineMat, pages, pages, front, backMat]);
  book.scale.y = 1.35;
  loader.load(b.cover, t => {
    t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
    front.map = t; front.needsUpdate = true;
    book.scale.y = Math.min(1.45, Math.max(0.7, t.image.height / t.image.width)); // keep each book's real shape
    if (reduce && started) renderer.render(scene, camera);
  });
  const a = i / mix.length * Math.PI * 2;
  const holder = new THREE.Group();
  holder.position.set(Math.sin(a) * R, Math.sin(a * 2) * 0.6, Math.cos(a) * R);
  holder.rotation.y = a;                 // cover faces outward
  book.rotation.z = (i % 2 ? 1 : -1) * 0.06;
  book.userData = { phase: Math.random() * Math.PI * 2, id: b.id, lift: 0 };
  holder.add(book); ring.add(holder); books.push(book);
});
ring.rotation.x = 0.22;

/* ---------- Click / hover on books ---------- */
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
let hovered = null, downAt = null;
const pick = e => {
  const r = canvas.getBoundingClientRect();
  ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  ray.setFromCamera(ndc, camera);
  const hit = ray.intersectObjects(books, false)[0];
  // only books facing the viewer (front half of the ring) count
  return hit && hit.face && hit.object.localToWorld(new THREE.Vector3()).z > -2 ? hit.object : null;
};
canvas.addEventListener("pointermove", e => {
  if (e.pointerType !== "mouse") return;
  hovered = pick(e); canvas.style.cursor = hovered ? "pointer" : "";
});
canvas.addEventListener("pointerleave", () => { hovered = null; canvas.style.cursor = ""; });
canvas.addEventListener("pointerdown", e => { downAt = [e.clientX, e.clientY]; });
canvas.addEventListener("pointerup", e => {
  if (!downAt || Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]) > 8) return; // ignore scrolls / drags
  const b = pick(e);
  if (b && window.AlmominShop) window.AlmominShop.open(b.userData.id);
});

/* ---------- Gold dust ---------- */
const N = isSmall ? 260 : 600;
const pos = new Float32Array(N * 3);
for (let i = 0; i < N; i++) {
  const r = 4 + Math.random() * 14, a = Math.random() * Math.PI * 2;
  pos.set([Math.cos(a) * r, (Math.random() - .5) * 14, Math.sin(a) * r - 4], i * 3);
}
const dustGeo = new THREE.BufferGeometry(); dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0xe9cf8a, size: 0.05, transparent: true, opacity: 0.75, depthWrite: false }));
world.add(dust);

/* ---------- Layout, input, loop ---------- */
function layout() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h; camera.updateProjectionMatrix();
  if (w >= 900) { world.position.set(6.2, 0.2, 0); world.scale.setScalar(0.95); camera.position.z = 24; }
  else { world.position.set(0, 0.3, 0); world.scale.setScalar(w < 520 ? 1.0 : 1.05); camera.position.z = w < 520 ? 19.5 : 22; }
}
addEventListener("resize", () => { layout(); if (reduce && started) renderer.render(scene, camera); }); layout();

const target = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
addEventListener("pointermove", e => { target.x = e.clientX / innerWidth - .5; target.y = e.clientY / innerHeight - .5; }, { passive: true });

let visible = true;
new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(hero);

const clock = new THREE.Clock();
let ringAngle = 0, speed = 0.12, last = 0;
function ready() { if (started) return; started = true; canvas.classList.add("is-ready"); reduce ? renderer.render(scene, camera) : loop(); }
function loop() {
  requestAnimationFrame(loop);
  if (!visible) return;
  const t = clock.getElapsedTime();
  const sp = Math.min(scrollY / innerHeight, 1.2);
  cur.x += (target.x - cur.x) * 0.05; cur.y += (target.y - cur.y) * 0.05;

  const dt = Math.min(t - last, 0.05); last = t;
  speed += ((hovered ? 0.015 : 0.12) - speed) * 0.06;
  ringAngle += dt * speed;
  ring.rotation.y = ringAngle + sp * 1.6;
  books.forEach(b => {
    b.userData.lift += ((b === hovered ? 1 : 0) - b.userData.lift) * 0.12;
    const L = b.userData.lift;
    b.position.y = Math.sin(t * 0.9 + b.userData.phase) * 0.18 + L * 0.35;
    b.position.z = L * 0.9;
    b.scale.x = b.scale.z = 1 + L * 0.12;
  });
  centre.rotation.y = Math.sin(t * 0.4) * 0.25 + cur.x * 0.6;
  centre.rotation.x = cur.y * 0.3;
  centre.position.y = Math.sin(t * 0.7) * 0.15;
  star.rotation.z = t * 0.05; star2.rotation.z = Math.PI / 8 - t * 0.08;
  dust.rotation.y = t * 0.02;
  world.rotation.x = cur.y * 0.12 + sp * 0.25;
  world.rotation.y = cur.x * 0.15;
  camera.position.y = -sp * 3;
  camera.lookAt(world.position.x * 0.35, world.position.y * 0.5 - sp * 2, 0);
  renderer.render(scene, camera);
}
// If the calligraphy fails to load, still start the scene
setTimeout(ready, 2500);
