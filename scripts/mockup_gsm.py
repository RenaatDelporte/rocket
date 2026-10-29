"""Gsm-mockup: python scripts/mockup_gsm.py gsm.jpg uit.jpg — telefoon op een zachte achtergrond (1800x1200)."""
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

S, W, H = 2, 1800, 1200
def main(src, out, bg=((206, 208, 207), (236, 236, 233))):
    g = np.linspace(0, 1, H*S)[:, None, None]
    grad = (np.array(bg[0])*(1-g) + np.array(bg[1])*g).repeat(W*S, axis=1)
    cv = Image.fromarray(grad.astype("uint8")).convert("RGBA")
    pw, ph = 430*S, 880*S                      # toestel
    x0, y0 = (W*S - pw)//2, (H*S - ph)//2 - 10*S
    sh = Image.new("L", cv.size, 0)
    ImageDraw.Draw(sh).rounded_rectangle([x0+30*S, y0+50*S, x0+pw+30*S, y0+ph+40*S], 70*S, fill=110)
    cv.paste(Image.new("RGBA", cv.size, (40, 40, 45, 255)), (0, 0), sh.filter(ImageFilter.GaussianBlur(40*S)))
    d = ImageDraw.Draw(cv)
    d.rounded_rectangle([x0, y0, x0+pw, y0+ph], 66*S, fill=(24, 25, 28, 255))
    d.rounded_rectangle([x0+3*S, y0+3*S, x0+pw-3*S, y0+ph-3*S], 63*S, outline=(70, 72, 76, 255), width=2*S)
    m = 16*S
    sw, shh = pw-2*m, ph-2*m
    shot = Image.open(src).convert("RGB")
    shot = shot.resize((sw, int(shot.height*sw/shot.width)), Image.LANCZOS).crop((0, 0, sw, shh))
    mask = Image.new("L", (sw, shh), 0); ImageDraw.Draw(mask).rounded_rectangle([0, 0, sw, shh], 50*S, fill=255)
    cv.paste(shot, (x0+m, y0+m), mask)
    d.rounded_rectangle([x0+pw//2-55*S, y0+m+10*S, x0+pw//2+55*S, y0+m+42*S], 16*S, fill=(10, 10, 12, 255))   # camera-eiland
    cv.convert("RGB").resize((W, H), Image.LANCZOS).save(out, quality=86, optimize=True, progressive=True)

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
