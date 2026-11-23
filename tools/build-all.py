"""Rebuild everything generated from js/shop-data.js, then copy the public website into dist/.
Cloudflare Pages runs this on every deploy: build command `python3 tools/build-all.py`, output directory `dist`.
The /functions folder (checkout, admin, Stripe webhook) is deployed by Cloudflare separately."""
import pathlib, runpy, shutil
ROOT = pathlib.Path(__file__).resolve().parent.parent
T = ROOT / "tools"
for script in ["build-catalog.py", "build-pages.py", "build-seo.py"]:
    runpy.run_path(str(T / script), run_name="__main__")

PUBLIC = ["index.html", "thanks.html", "terms.html", "privacy.html", "robots.txt", "sitemap.xml", "_headers",
          "css", "js", "assets", "books", "shop", "fi", "guides", "admin"]
dist = ROOT / "dist"
if dist.exists(): shutil.rmtree(dist)
dist.mkdir()
for name in PUBLIC:
    src = ROOT / name
    if src.is_dir(): shutil.copytree(src, dist / name)
    elif src.exists(): shutil.copy2(src, dist / name)
n = sum(1 for p in dist.rglob("*") if p.is_file())
print(f"dist: {n} files ready to publish")
