"""Haalt de beelden uit scripts/beelden.txt op en zet ze in webformaat in site/img/.
Foto's worden JPG van max. 1800 px, klantenlogo's PNG van max. 400 px (met transparantie).
Bestanden die al bestaan worden overgeslagen, dus dit mag bij elke publicatie lopen."""
import io, os, sys, urllib.request
from PIL import Image, ImageOps

def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (rocket-site build)"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()

ok = skip = fail = 0
for line in open("scripts/beelden.txt", encoding="utf-8"):
    line = line.strip()
    if not line or line.startswith("#"):
        continue
    target, *urls = line.split("\t")
    if os.path.exists(target):
        skip += 1
        continue
    for url in urls:
        try:
            im = ImageOps.exif_transpose(Image.open(io.BytesIO(fetch(url))))
            os.makedirs(os.path.dirname(target), exist_ok=True)
            if target.endswith(".png"):
                im = im.convert("RGBA")
                im.thumbnail((400, 400), Image.LANCZOS)
                im.save(target, "PNG", optimize=True)
            else:
                if im.mode in ("RGBA", "LA", "P"):
                    im = im.convert("RGBA")
                    bg = Image.new("RGB", im.size, (255, 255, 255))
                    bg.paste(im, mask=im.split()[-1])
                    im = bg
                im = im.convert("RGB")
                im.thumbnail((1800, 1800), Image.LANCZOS)
                im.save(target, "JPEG", quality=82, optimize=True, progressive=True)
            print(f"OK    {target}  ({im.size[0]}x{im.size[1]}, {os.path.getsize(target)//1024} KB)")
            ok += 1
            break
        except Exception as e:
            print(f"FOUT  {url}: {e}")
    else:
        fail += 1
print(f"\n{ok} opgehaald, {skip} stonden er al, {fail} niet gelukt")
