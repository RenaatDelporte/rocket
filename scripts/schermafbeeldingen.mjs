/* Neemt schermafbeeldingen van de websites in scripts/schermen.txt:
   computer (bovenaan), gsm (bovenaan) en de volledige pagina op computerformaat.
   node scripts/schermafbeeldingen.mjs --nodig  → stopt met code 0 als er nog iets ontbreekt, anders 1 */
import fs from "node:fs";

const list = fs.readFileSync("scripts/schermen.txt", "utf8").split("\n")
  .map(l => l.trim()).filter(l => l && !l.startsWith("#")).map(l => l.split("\t"));
const out = n => [`site/img/schermen/${n}-computer.jpg`, `site/img/schermen/${n}-gsm.jpg`, `site/img/schermen/${n}-pagina.jpg`];
const todo = list.filter(([n]) => out(n).some(f => !fs.existsSync(f)));

if (process.argv.includes("--nodig")) process.exit(todo.length ? 0 : 1);
if (!todo.length){ console.log("Alle schermafbeeldingen bestaan al."); process.exit(0); }

const { chromium } = await import("playwright");
fs.mkdirSync("site/img/schermen", { recursive: true });
const browser = await chromium.launch();
const hide = '[id*="cookie" i],[class*="cookie" i],[id*="consent" i],[class*="consent" i],[class*="cky-" i],#CybotCookiebotDialog{display:none!important}';
for (const [name, url] of todo){
  const [computer, gsm, pagina] = out(name);
  for (const [file, opts, full] of [
    [computer, { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 }],
    [gsm, { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }],
    [pagina, { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }, true]
  ]){
    if (fs.existsSync(file)) continue;
    const ctx = await browser.newContext({ ...opts, locale: "nl-BE" });
    const page = await ctx.newPage();
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
      await page.addStyleTag({ content: hide });
      await page.waitForTimeout(2500);
      if (full){ await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600){ window.scrollTo(0, y); await new Promise(r => setTimeout(r, 150)); } window.scrollTo(0, 0); }); await page.waitForTimeout(1000); }
      await page.screenshot({ path: file, type: "jpeg", quality: 85, fullPage: !!full });
      console.log("OK  ", file);
    } catch (e) { console.log("FOUT", url, e.message); }
    await ctx.close();
  }
}
await browser.close();
