import pathlib, subprocess
from PIL import Image, ImageDraw, ImageFilter
R = pathlib.Path(__file__).resolve().parent; ROOT = R.parent; SH = ROOT/"assets/shop"
A = (ROOT/"assets").as_uri()
CH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
HEAD = '<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Manrope:wght@500;700;800&display=swap" rel="stylesheet">'
CSS = """*{margin:0}body{background:transparent;width:1080px;text-align:center;font-family:Manrope,sans-serif;color:#F3ECDC}
.d{font:600 108px/1.02 'Cormorant Garamond',serif}.i{font-style:italic;font-weight:500;color:#F6E7B4}
.k{font:800 30px Manrope;letter-spacing:7px;color:#D4AF5A}.s{font:500 42px/1.35 Manrope;color:#E6DCC4}
.n{display:inline-block;width:120px;height:120px;border-radius:50%;background:#D4AF5A;color:#0B2E27;font:600 84px/120px 'Cormorant Garamond',serif}"""
def t(name, body, h):
    f = R/"txt"/f"{name}.html"
    f.write_text(f'<!doctype html><html><head><meta charset="utf-8">{HEAD}<style>{CSS}body{{height:{h}px}}</style></head><body>{body}</body></html>')
    subprocess.run([CH,"--headless","--disable-gpu","--hide-scrollbars","--default-background-color=00000000","--allow-file-access-from-files",
        "--virtual-time-budget=6000",f"--screenshot={R/'txt'/(name+'.png')}",f"--window-size=1080,{h}",f.as_uri()],stderr=subprocess.DEVNULL)
BOOKS = [
 ("my-emotions-connect-me-to-allah.jpg", "My Emotions Connect Me to Allah", "12 feelings, each paired<br>with a name of Allah"),
 ("what-i-say-to-feel-okay.jpg", "What I Say to Feel Okay", "8 short duas for<br>hard moments"),
 ("gift-of-salah-a-lift-the-flap-book.jpg", "Gift of Salah", "Lift-the-flap book about<br>the 5 daily prayers"),
 ("its-sadaqah-faceless-islamic-picture-book-for-kids.jpg", "It’s Sadaqah!", "Even a smile is charity"),
 ("prophet-muhammad.jpg", "Prophet Muhammad ﷺ", "A first Seerah to love<br>and follow the Sunnah"),
]
t("hook", '<p class="k">SAVE THIS FOR LATER</p><p class="d" style="margin-top:26px">5 Islamic books<br><span class="i">every Muslim child</span><br>should have</p>', 640)
for k, (_, title, why) in enumerate(BOOKS):
    t(f"b{k}", f'<p class="n">{k+1}</p><p class="d" style="font-size:76px;margin-top:26px;padding:0 60px">{title}</p><p class="s" style="margin-top:22px">{why}</p>', 520)
t("cta", f'<img src="{A}/emblem-gold.svg" style="width:330px"><p class="s" style="margin-top:44px">Which one does your child<br>need first? Tell us in the comments</p><p class="d" style="color:#D4AF5A;font-size:104px;margin-top:40px">almomin.eu</p><p class="s" style="margin-top:20px;font-size:36px">Delivery across Finland · Pickup in Espoo</p>', 1180)

W, H, FPS = 1080, 1920, 30
def L(n): x = Image.open(R/"txt"/f"{n}.png").convert("RGBA"); return x.crop(x.getbbox())
def ease(t): t = max(0,min(1,t)); return 1-(1-t)**3
def back(t): t=max(0,min(1,t)); c=1.7; return 1+(c+1)*(t-1)**3+c*(t-1)**2
def radial(c1, c2):
    g = Image.new("RGB",(W,H),c2); m = Image.new("L",(W,H),0); ImageDraw.Draw(m).ellipse((-300,-100,W+300,H*0.8),fill=255)
    return Image.composite(Image.new("RGB",(W,H),c1), g, m.filter(ImageFilter.GaussianBlur(260)))
BG = radial((22,78,64),(7,31,26))
def card(n, w):
    x = Image.open(SH/n).convert("RGB"); x = x.resize((w, round(x.height*w/x.width)), Image.LANCZOS)
    pad = 50; c = Image.new("RGBA",(x.width+2*pad,x.height+2*pad),(0,0,0,0)); s = Image.new("RGBA",c.size,(0,0,0,0))
    ImageDraw.Draw(s).rectangle((pad+10,pad+30,pad+x.width+10,pad+x.height+30),fill=(0,0,0,120)); c.alpha_composite(s.filter(ImageFilter.GaussianBlur(22)))
    b = Image.new("RGB",(x.width+12,x.height+12),(243,236,220)); b.paste(x,(6,6)); c.paste(b,(pad-6,pad-6)); return c
def paste(bg, img, cx, y, a=1, scale=1, rot=0):
    x = img if scale == 1 else img.resize((max(1,int(img.width*scale)),max(1,int(img.height*scale))), Image.LANCZOS)
    if rot: x = x.rotate(rot, Image.BICUBIC, expand=True)
    if a < 1: x = x.copy(); x.putalpha(x.split()[3].point(lambda v: int(v*a)))
    bg.alpha_composite(x, (int(cx-x.width/2), int(y-x.height/2)))
TX = {n: L(n) for n in ["hook","cta"] + [f"b{k}" for k in range(5)]}
COV = [card(b[0], 620) for b in BOOKS]
SMALL = [card(b[0], 230) for b in BOOKS]
def s_hook(t):
    f = BG.convert("RGBA")
    for k, c in enumerate(SMALL):   # covers float in behind the title
        a = ease((t-0.1*k)/0.5)
        x = [170, 910, 150, 930, 540][k]; y = [330, 330, 1480, 1480, 1640][k]
        paste(f, c, x, y + 60*(1-a), a*0.9, 1, [-10,10,8,-8,0][k])
    paste(f, TX["hook"], W/2, 900 - 40*(1-ease(t/0.6)), ease(t/0.5)); return f
def s_book(k):
    def f_(t):
        f = BG.convert("RGBA")
        paste(f, COV[k], W/2, 700, ease(t/0.2), 0.7+0.3*back(t/0.4), (-3 if k%2 else 3)*(1-ease(t/0.6)))
        paste(f, TX[f"b{k}"], W/2, 1360 + 40*(1-ease((t-0.15)/0.4)), ease((t-0.15)/0.35)); return f
    return f_
def s_cta(t):
    f = BG.convert("RGBA"); paste(f, TX["cta"], W/2, 900, ease(t/0.6), 0.94+0.06*ease(t/1.2)); return f
SC = [(s_hook, 2.6)] + [(s_book(k), 2.7) for k in range(5)] + [(s_cta, 4.0)]
starts, acc = [], 0
for _, d in SC: starts.append(acc); acc += d
XF = 0.2; N = int(acc*FPS)
for n in range(N):
    t = n/FPS; k = max(i for i,s in enumerate(starts) if s <= t); fn, d = SC[k]; img = fn(t-starts[k])
    if k+1 < len(SC) and t > starts[k]+d-XF:
        img = Image.blend(img, SC[k+1][0](max(0,t-starts[k+1])), ease((t-(starts[k]+d-XF))/XF))
    img.convert("RGB").save(R/"frames"/f"f{n:04d}.jpg", quality=90)
print(N, acc)
