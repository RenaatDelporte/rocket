"""Mockup in de stijl van de andere website-tegels: laptop in het midden, twee zwevende schermen.
python mockup.py computer.jpg links.jpg rechts.jpg uit.jpg"""
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

S = 2                      # supersampling
W, H = 1800, 1200
def P(pts): return [(x*S, y*S) for x, y in pts]

def coeffs(dst, src):
    """perspectief-coëfficiënten: punt in uitvoer (dst) -> punt in bron (src)"""
    A, B = [], []
    for (x, y), (u, v) in zip(dst, src):
        A.append([x, y, 1, 0, 0, 0, -u*x, -u*y]); B.append(u)
        A.append([0, 0, 0, x, y, 1, -v*x, -v*y]); B.append(v)
    return np.linalg.solve(np.array(A, float), np.array(B, float)).tolist()

def paste_quad(canvas, img, quad):
    quad = P(quad)
    w, h = img.size
    pad = 6   # randpixels herhalen, zodat de rand van het scherm geen donkere stipjes krijgt
    img = Image.fromarray(np.pad(np.asarray(img.convert("RGB")), ((pad, pad), (pad, pad), (0, 0)), mode="edge"))
    c = coeffs(quad, [(pad, pad), (w+pad, pad), (w+pad, h+pad), (pad, h+pad)])
    warped = img.convert("RGBA").transform(canvas.size, Image.PERSPECTIVE, c, Image.BICUBIC)
    mask = Image.new("L", canvas.size, 0); ImageDraw.Draw(mask).polygon(quad, fill=255)
    canvas.paste(warped, (0, 0), mask)

def lerp_quad(q, u, v):
    (x0,y0),(x1,y1),(x2,y2),(x3,y3) = q
    top = (x0+(x1-x0)*u, y0+(y1-y0)*u); bot = (x3+(x2-x3)*u, y3+(y2-y3)*u)
    return (top[0]+(bot[0]-top[0])*v, top[1]+(bot[1]-top[1])*v)

def inner(q, l, t, r, b):
    return [lerp_quad(q, l, t), lerp_quad(q, 1-r, t), lerp_quad(q, 1-r, 1-b), lerp_quad(q, l, 1-b)]

def shadow(canvas, box, blur, alpha):
    sh = Image.new("L", canvas.size, 0)
    ImageDraw.Draw(sh).ellipse([v*S for v in box], fill=alpha)
    sh = sh.filter(ImageFilter.GaussianBlur(blur*S))
    dark = Image.new("RGBA", canvas.size, (40, 40, 45, 255))
    canvas.paste(dark, (0, 0), sh)

def fit(img, ratio):
    """snijd bij tot verhouding breedte/hoogte, bovenaan houden"""
    w, h = img.size
    if w / h > ratio: nw = int(h*ratio); return img.crop(((w-nw)//2, 0, (w-nw)//2+nw, h))
    return img.crop((0, 0, w, int(w/ratio)))

def main(computer, links, rechts, uit, bg=((206, 208, 207), (236, 236, 233))):
    cv = Image.new("RGBA", (W*S, H*S))
    g = np.linspace(0, 1, H*S)[:, None]
    top, bot = np.array(bg[0]), np.array(bg[1])
    grad = (top[None, None, :]*(1-g[..., None]) + bot[None, None, :]*g[..., None]).repeat(W*S, axis=1)
    cv = Image.fromarray(grad.astype("uint8")).convert("RGBA")

    # schaduwen
    shadow(cv, (230, 880, 760, 915), 14, 120)
    shadow(cv, (1310, 838, 1615, 862), 12, 100)
    shadow(cv, (800, 878, 1640, 918), 10, 150)

    # zwevend scherm links
    ql = [(170, 425), (748, 486), (770, 862), (193, 872)]
    d = ImageDraw.Draw(cv)
    d.polygon(P([(160, 424), (170, 425), (193, 872), (183, 872)]), fill=(228, 228, 226, 255))   # dikte
    paste_quad(cv, fit(Image.open(links), 16/10.5), ql)
    # zwevend scherm rechts
    qr = [(1270, 506), (1612, 525), (1618, 815), (1305, 828)]
    d.polygon(P([(1263, 506), (1270, 506), (1305, 828), (1298, 828)]), fill=(228, 228, 226, 255))
    paste_quad(cv, fit(Image.open(rechts), 16/12), qr)

    # laptop: onderkant
    d = ImageDraw.Draw(cv)
    base = [(812, 848), (1268, 856), (1612, 886), (848, 893)]
    d.polygon(P([(848, 893), (1612, 886), (1610, 896), (850, 903)]), fill=(150, 152, 156, 255))   # voorkant
    d.polygon(P(base), fill=(214, 216, 219, 255))
    kb = [lerp_quad(base, .16, .12), lerp_quad(base, .86, .12), lerp_quad(base, .86, .52), lerp_quad(base, .16, .52)]
    d.polygon(P(kb), fill=(52, 54, 58, 255))
    # toetsen
    for row in range(5):
        for col in range(14):
            u0, u1 = .16+.70*col/14+.004, .16+.70*(col+1)/14-.004
            v0, v1 = .12+.40*row/5+.012, .12+.40*(row+1)/5-.012
            k = [lerp_quad(base, u0, v0), lerp_quad(base, u1, v0), lerp_quad(base, u1, v1), lerp_quad(base, u0, v1)]
            d.polygon(P(k), fill=(30, 31, 34, 255))
    tp = [lerp_quad(base, .40, .62), lerp_quad(base, .60, .62), lerp_quad(base, .60, .93), lerp_quad(base, .40, .93)]
    d.polygon(P(tp), fill=(200, 202, 206, 255))
    d.ellipse(P([(850, 886), (858, 893)]), fill=(120, 122, 126, 255))

    # laptop: scherm
    lid = [(796, 444), (1238, 470), (1262, 853), (822, 846)]
    d.polygon(P(lid), fill=(26, 27, 30, 255))
    rim = inner(lid, .002, .003, .002, .003)
    d.line(P(rim + [rim[0]]), fill=(70, 72, 76, 255), width=2*S)
    scr = inner(lid, .028, .055, .025, .045)
    paste_quad(cv, fit(Image.open(computer), 16/10), scr)
    cam = lerp_quad(lid, .5, .025)
    d = ImageDraw.Draw(cv); d.ellipse(P([(cam[0]-2.5, cam[1]-2.5), (cam[0]+2.5, cam[1]+2.5)]), fill=(60, 62, 66, 255))
    # scharnier
    d.polygon(P([(822, 846), (1262, 853), (1268, 858), (812, 851)]), fill=(120, 122, 126, 255))

    cv = cv.convert("RGB").resize((W, H), Image.LANCZOS)
    cv.save(uit, quality=86, optimize=True, progressive=True)

if __name__ == "__main__":
    main(*sys.argv[1:5])
