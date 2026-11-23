"""Rebuild everything generated from js/shop-data.js. Netlify runs this on every deploy (see netlify.toml)."""
import pathlib, runpy
T = pathlib.Path(__file__).resolve().parent
for script in ["build-catalog.py", "build-pages.py", "build-seo.py"]:
    runpy.run_path(str(T / script), run_name="__main__")
