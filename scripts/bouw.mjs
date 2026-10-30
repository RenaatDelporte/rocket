/* Bouwt de website in de map dist/:
   - één echte HTML-pagina per adres (home, visie, contact, elke dienst en elk project),
     zodat Google en AI-zoekmachines alle tekst meteen kunnen lezen;
   - titel, beschrijving, deelbeeld en gestructureerde gegevens (schema.org) per pagina;
   - sitemap.xml, robots.txt en llms.txt.
   Gebruik:  node scripts/bouw.mjs                (website → dist/)
             node scripts/bouw.mjs --voorbeeld X  (één voorbeeldpagina voor Claude → X)  */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = path.join(ROOT, "site");
const SITE_URL = "https://wearerocket.be";
const read = f => fs.readFileSync(path.join(SITE, f), "utf8");

/* inhoud + paginacode inladen zoals een browser dat zou doen */
const ctx = vm.createContext({ console });
vm.runInContext('var MODE = "static", PREFIX = "";', ctx);
vm.runInContext(read("inhoud.js"), ctx, { filename: "inhoud.js" });
vm.runInContext(read("app.js"), ctx, { filename: "app.js" });
const D = vm.runInContext("({ CASES, KLANTEN, HERO_MIX, DIENSTEN: diensten(), VRAGEN: vragen(), REGIO: regio() })", ctx);
const esc = ctx.esc, plain = ctx.plain;

const ORG = {
  "@type": "ProfessionalService",
  "@id": SITE_URL + "/#rocket",
  name: "Rocket",
  description: `Rocket uit Lede is een marketing- en communicatiepartner voor bedrijven en organisaties in ${D.REGIO}. Rocket schuift aan bij de marketingverantwoordelijke om bij te sturen, te verbeteren en efficiënter te werken, en maakt met een team van experts video's, websites, drukwerk en fotografie.`,
  slogan: "Let's fly together",
  url: SITE_URL + "/",
  logo: SITE_URL + "/img/logo-rood.png",
  image: SITE_URL + "/img/logo-rood.png",
  email: "renaat@wearerocket.be",
  telephone: "+32473221829",
  vatID: "BE0797956741",
  address: { "@type": "PostalAddress", streetAddress: "Molenhoek 168", postalCode: "9340", addressLocality: "Lede", addressCountry: "BE" },
  founder: { "@type": "Person", name: "Renaat Delporte" },
  areaServed: { "@type": "AdministrativeArea", name: D.REGIO, containedInPlace: { "@type": "Country", name: "België" } },
  knowsAbout: ["Marketingbegeleiding", "Marketingadvies", "Bedrijfscommunicatie", "Videoproductie", "Bedrijfsfilm", "Corporate film", "Animatievideo", "Webdesign", "Grafisch ontwerp", "Drukwerk", "Fotografie", "Social media"],
  hasOfferCatalog: { "@type": "OfferCatalog", name: "Diensten van Rocket", itemListElement: D.DIENSTEN.map(d => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: d.naam, url: `${SITE_URL}/diensten/${d.slug}/` } })) },
  sameAs: ["https://www.instagram.com/wearerocket.be/", "https://vimeo.com/user194300604", "https://www.linkedin.com/company/rocketbe/"]
};
const WEBSITE = { "@type": "WebSite", "@id": SITE_URL + "/#website", url: SITE_URL + "/", name: "Rocket", inLanguage: "nl-BE", publisher: { "@id": ORG["@id"] } };

function cut(s, n){ s = plain(s); return s.length <= n ? s : s.slice(0, s.lastIndexOf(" ", n - 1)) + "…"; }
function abs(p){ return /^https?:/.test(p) ? p : SITE_URL + "/" + p; }
function vimeoId(u){ return ctx.vimeoId(u); }

/* ---------- vaste delen van elke pagina ---------- */
function shell({ mode, P, page, title, desc, canonical, ogImage, ogType, jsonld, main, mainClass, preview }){
  const L = mode === "hash"
    ? { home: "#portfolio", contact: "#contact", visie: "#visie", dienst: s => "#dienst-" + s }
    : { home: P || "./", contact: P + "contact/", visie: P + "visie/", dienst: s => P + "diensten/" + s + "/" };
  const A = p => (mode === "hash" ? "" : P) + p;
  const head = preview
    ? `<title>Rocket website</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="${esc(desc)}">`
    : `<!doctype html>
<html lang="nl-BE">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#cc3333">
<meta property="og:site_name" content="Rocket">
<meta property="og:locale" content="nl_BE">
<meta property="og:type" content="${ogType}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${A("favicon.ico")}" sizes="48x48">
<link rel="icon" type="image/png" sizes="32x32" href="${A("img/favicon-32.png")}">
<link rel="icon" type="image/png" sizes="192x192" href="${A("img/icon-192.png")}">
<link rel="apple-touch-icon" href="${A("img/apple-touch-icon.png")}">
<link rel="manifest" href="${A("site.webmanifest")}">
<link rel="alternate" type="text/plain" title="Samenvatting voor AI-assistenten" href="${SITE_URL}/llms.txt">
<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": jsonld }).replace(/</g, "\\u003c")}</script>`;
  return `${head}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800;900&family=Lato:ital,wght@0,400;0,700;1,400&display=swap">
<link rel="stylesheet" href="${A("stijl.css")}">
${preview ? "" : "</head>\n"}${preview ? "" : `<body data-page="${page}" data-prefix="${P}">\n`}
<a class="sr-only" href="#view">Naar de inhoud</a>
<header class="site" id="hdr">
  <div class="wrap bar">
    <ul class="nav-side nav-left"><li><a href="${L.home}" data-nav="portfolio">Portfolio</a></li></ul>
    <a class="brand" href="${L.home}" aria-label="Rocket, naar home"><img src="${A("img/logo-rood.png")}" alt="Rocket" width="560" height="245"></a>
    <ul class="nav-side nav-right"><li><a href="${L.contact}" data-nav="contact">Contact</a></li></ul>
    <button class="burger" id="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mm"><span></span><span></span><span></span></button>
  </div>
</header>
<div class="mobile-menu" id="mm" hidden>
  <div class="mm-top"><img src="${A("img/logo-wit.png")}" alt="Rocket" width="900" height="393"><button class="mm-close" id="mm-close" type="button" aria-label="Sluit menu">×</button></div>
  <ul><li><a href="${L.home}" data-nav="portfolio">Portfolio</a></li><li><a href="${L.contact}" data-nav="contact">Contact</a></li></ul>
  <div class="mm-foot"><img src="${A("img/streepjes-wit.png")}" alt="" width="400" height="131"><span>renaat@wearerocket.be</span><span>+32 473 22 18 29</span></div>
</div>
<main id="view"${mainClass ? ` class="${mainClass}"` : ""}>${main}</main>
<footer>
  <div class="wrap foot">
    <div><img src="${A("img/logo-wit.png")}" alt="Rocket" width="900" height="393"><p>Wij helpen lokale ondernemers in ${esc(D.REGIO)} met bedrijfscommunicatie op maat.</p></div>
    <div><h2 class="foot-h">Wat we doen</h2><ul>
${D.DIENSTEN.map(d => `      <li><a href="${L.dienst(d.slug)}">${esc(d.naam)}</a></li>`).join("\n")}
      <li><a href="${L.visie}">Onze visie</a></li></ul></div>
    <div><h2 class="foot-h">Contact</h2><address><ul>
      <li>Renaat Delporte</li><li>Molenhoek 168, 9340 Lede</li>
      <li><a href="mailto:renaat@wearerocket.be">renaat@wearerocket.be</a></li>
      <li><a href="tel:+32473221829">+32 473 22 18 29</a></li></ul></address></div>
    <div><h2 class="foot-h">Volg ons</h2><ul>
      <li><a href="https://www.instagram.com/wearerocket.be/" target="_blank" rel="noopener">Instagram</a></li>
      <li><a href="https://vimeo.com/user194300604" target="_blank" rel="noopener">Vimeo</a></li>
      <li><a href="https://www.linkedin.com/company/rocketbe/" target="_blank" rel="noopener">LinkedIn</a></li></ul></div>
  </div>
  <div class="legal"><div class="wrap">© <span id="yr">${new Date().getFullYear()}</span> Rocket · Ond. nr. BE 0797.956.741</div></div>
</footer>
<script src="${A("inhoud.js")}"></script>
<script src="${A("app.js")}"></script>
${preview ? "" : "</body>\n</html>\n"}`;
}

/* ---------- voorbeeldpagina voor Claude (bouwt zichzelf op met #adressen) ---------- */
const vi = process.argv.indexOf("--voorbeeld");
if (vi > -1){
  const out = process.argv[vi + 1];
  fs.writeFileSync(out, shell({ mode: "hash", P: "", preview: true, desc: ORG.description, main: "" }));
  console.log("voorbeeld →", out);
  process.exit(0);
}

/* ---------- de website ---------- */
const DIST = path.join(ROOT, "dist");
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });
for (const f of ["stijl.css", "app.js", "inhoud.js", "favicon.ico", ".nojekyll"]) if (fs.existsSync(path.join(SITE, f))) fs.copyFileSync(path.join(SITE, f), path.join(DIST, f));
fs.cpSync(path.join(SITE, "img"), path.join(DIST, "img"), { recursive: true });

const today = new Date().toISOString().slice(0, 10);
const pages = [];
function render(fn, P, ...args){ ctx.PREFIX = P; return fn(...args); }
function write(rel, html){ const f = path.join(DIST, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); }
function crumbs(list){ return { "@type": "BreadcrumbList", itemListElement: list.map(([name, url], i) => ({ "@type": "ListItem", position: i + 1, name, item: url })) }; }

/* home */
{
  const desc = `Rocket uit Lede helpt bedrijven en organisaties in ${D.REGIO} met marketing en communicatie op maat: marketingbegeleiding, video, websites, print en fotografie. Bekijk ons portfolio.`;
  const first = D.CASES.find(c => c.beelden[0] || c.poster);
  write("index.html", shell({
    mode: "static", P: "", page: "portfolio",
    title: `Rocket – Marketing en bedrijfscommunicatie op maat in ${D.REGIO}`,
    desc, canonical: SITE_URL + "/", ogType: "website",
    ogImage: abs(first.beelden[0] || first.poster),
    jsonld: [ORG, WEBSITE, { "@type": "CollectionPage", "@id": SITE_URL + "/#portfolio", url: SITE_URL + "/", name: "Portfolio van Rocket", isPartOf: { "@id": WEBSITE["@id"] }, about: { "@id": ORG["@id"] },
      hasPart: D.CASES.map(c => ({ "@type": "CreativeWork", name: `${c.klant} – ${c.project}`, url: `${SITE_URL}/portfolio/${c.slug}/` })) }],
    main: render(ctx.pageWerk, ""), mainClass: "ends-band"
  }));
  pages.push(["/", 1.0]);
}

/* visie en contact */
for (const [key, fn, title, desc] of [
  ["visie", ctx.pageVisie, `Onze visie en aanpak – marketingpartner in ${D.REGIO} | Rocket`, `Rocket schuift aan naast je marketingverantwoordelijke om bij te sturen, te verbeteren en efficiënter te werken, met een team van experts. Actief in heel ${D.REGIO}.`],
  ["contact", ctx.pageContact, "Contact – Rocket", `Neem contact op met Rocket in Lede: bel +32 473 22 18 29 of mail renaat@wearerocket.be. We komen graag langs, overal in ${D.REGIO}.`]
]){
  write(`${key}/index.html`, shell({
    mode: "static", P: "../", page: key, title, desc, canonical: `${SITE_URL}/${key}/`, ogType: "website", ogImage: abs("img/logo-rood.png"),
    jsonld: [ORG, WEBSITE, { "@type": key === "contact" ? "ContactPage" : "AboutPage", url: `${SITE_URL}/${key}/`, name: title, isPartOf: { "@id": WEBSITE["@id"] }, about: { "@id": ORG["@id"] } },
      ...(key === "visie" && D.VRAGEN.length ? [{ "@type": "FAQPage", "@id": `${SITE_URL}/visie/#vragen`, url: `${SITE_URL}/visie/`, inLanguage: "nl-BE",
        mainEntity: D.VRAGEN.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }] : []),
      crumbs([["Rocket", SITE_URL + "/"], [key === "visie" ? "Onze visie" : "Contact", `${SITE_URL}/${key}/`]])],
    main: render(fn, "../"), mainClass: key === "visie" ? "ends-band" : ""
  }));
  pages.push([`/${key}/`, 0.6]);
}

/* diensten */
for (const d of D.DIENSTEN){
  const url = `${SITE_URL}/diensten/${d.slug}/`;
  const werk = ctx.werkVan(d);
  const img = werk.map(c => c.beelden[0] || c.poster).find(Boolean);
  write(`diensten/${d.slug}/index.html`, shell({
    mode: "static", P: "../../", page: "dienst",
    title: `${d.titel} | Rocket`, desc: cut(d.kort + " " + d.tekst[0], 158), canonical: url, ogType: "website", ogImage: abs(img || "img/logo-rood.png"),
    jsonld: [ORG, WEBSITE, { "@type": "Service", "@id": url + "#dienst", name: d.naam, serviceType: d.naam, description: plain(d.kort + " " + d.tekst.join(" ")), url,
        provider: { "@id": ORG["@id"] }, areaServed: ORG.areaServed,
        ...(d.disciplines.length ? { subjectOf: werk.map(c => ({ "@type": "CreativeWork", name: `${c.klant} – ${c.project}`, url: `${SITE_URL}/portfolio/${c.slug}/` })) } : {}) },
      crumbs([["Rocket", SITE_URL + "/"], ["Wat we doen", SITE_URL + "/visie/"], [d.naam, url]])],
    main: render(ctx.pageDienst, "../../", d), mainClass: "ends-band"
  }));
  pages.push([`/diensten/${d.slug}/`, 0.8]);
}

/* projecten */
for (const c of D.CASES){
  const url = `${SITE_URL}/portfolio/${c.slug}/`;
  const desc = cut(c.tekst[0], 155);
  const img = c.poster || c.beelden[0];
  const work = {
    "@type": c.video ? "VideoObject" : "CreativeWork",
    "@id": url + "#werk",
    name: `${c.klant} – ${c.project}`,
    description: plain(c.tekst.join(" ")),
    url, inLanguage: "nl-BE",
    /* project van vóór Rocket (veld "bureau"): gemaakt door dat bureau, met Renaat in de vermelde rol */
    ...(c.bureau
      ? { creator: { "@type": "Organization", name: c.bureau }, contributor: { "@type": "Person", name: "Renaat Delporte", jobTitle: c.rol || undefined, worksFor: { "@id": ORG["@id"] } } }
      : { creator: { "@id": ORG["@id"] }, ...(c.partner ? { contributor: { "@type": "Organization", name: c.partner } } : {}) }),
    ...(c.jaar ? { dateCreated: String(c.jaar) } : {}),
    about: { "@type": "Organization", name: c.klant, ...(c.website ? { url: c.website } : {}) },
    genre: c.discipline,
    ...(img ? { image: c.beelden.concat(c.poster ? [c.poster] : []).map(abs) } : {})
  };
  if (c.video){
    const id = vimeoId(c.video);
    Object.assign(work, { thumbnailUrl: abs(img), contentUrl: c.video, ...(id ? { embedUrl: `https://player.vimeo.com/video/${id}` } : {}), ...(c.datum ? { uploadDate: c.datum } : {}) });
    if (c.duur){ const [m, s] = c.duur.split(":").map(Number); work.duration = `PT${m}M${s}S`; }
  }
  write(`portfolio/${c.slug}/index.html`, shell({
    mode: "static", P: "../../", page: "case",
    title: `${c.klant} – ${c.project} | Rocket`, desc, canonical: url, ogType: c.video ? "video.other" : "article", ogImage: abs(img || "img/logo-rood.png"),
    jsonld: [ORG, WEBSITE, work, crumbs([["Rocket", SITE_URL + "/"], ["Portfolio", SITE_URL + "/"], [`${c.klant} – ${c.project}`, url]])],
    main: render(ctx.pageCase, "../../", c)
  }));
  pages.push([`/portfolio/${c.slug}/`, 0.8]);
}

/* app-icoon voor gsm (startscherm) */
fs.writeFileSync(path.join(DIST, "site.webmanifest"), JSON.stringify({
  name: "Rocket", short_name: "Rocket", start_url: "./", display: "browser", background_color: "#ffffff", theme_color: "#cc3333",
  icons: [{ src: "img/icon-192.png", sizes: "192x192", type: "image/png" }, { src: "img/icon-512.png", sizes: "512x512", type: "image/png" }]
}, null, 2));

/* 404 */
fs.writeFileSync(path.join(DIST, "404.html"), `<!doctype html><html lang="nl-BE"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Pagina niet gevonden – Rocket</title><link rel="icon" href="/favicon.ico" sizes="48x48"><link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32.png"><meta name="robots" content="noindex">
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;font-family:Lato,Arial,sans-serif;background:#cc3333;color:#fff;text-align:center;padding:24px}h1{font-family:Montserrat,Arial Black,sans-serif;font-size:clamp(2rem,6vw,3.4rem);margin:0 0 12px}a{color:#fff;font-weight:700}</style></head>
<body><div><h1>Deze pagina bestaat niet (meer).</h1><p><a id="home" href="/">Naar het portfolio van Rocket</a></p></div>
<script>if(location.pathname.indexOf("/rocket/")===0)document.getElementById("home").href="/rocket/";</script></body></html>
`);

/* sitemap, robots, llms.txt */
fs.writeFileSync(path.join(DIST, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(([p, prio]) => `  <url><loc>${SITE_URL}${p}</loc><lastmod>${today}</lastmod><priority>${prio.toFixed(1)}</priority></url>`).join("\n")}
</urlset>
`);
fs.writeFileSync(path.join(DIST, "robots.txt"), `# Iedereen welkom, ook zoekmachines en AI-assistenten
User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`);
const group = {};
for (const c of D.CASES) (group[c.discipline] = group[c.discipline] || []).push(c);
fs.writeFileSync(path.join(DIST, "llms.txt"), `# Rocket

> ${plain(ORG.description)}

- Website: ${SITE_URL}/
- Contactpersoon: Renaat Delporte
- E-mail: renaat@wearerocket.be
- Telefoon: +32 473 22 18 29
- Adres: Molenhoek 168, 9340 Lede, België
- Ondernemingsnummer: BE 0797.956.741
- Werkgebied: ${plain(vm.runInContext('typeof WERKGEBIED !== "undefined" ? WERKGEBIED : ""', ctx) || D.REGIO)}
- Werkwijze: Rocket gaat langs bij bedrijven, zit naast de marketingverantwoordelijke en kijkt waar het beter en efficiënter kan. Voor de uitvoering werkt Rocket met een team van experts. Zie ${SITE_URL}/visie/
- Prijzen: op aanvraag.

## Diensten
${D.DIENSTEN.map(d => `- [${d.naam}](${SITE_URL}/diensten/${d.slug}/): ${plain(d.kort)}`).join("\n")}

## Veelgestelde vragen
${D.VRAGEN.map(([q, a]) => `### ${q}\n${a}`).join("\n\n")}

## Portfolio
${Object.entries(group).map(([d, list]) => `\n### ${d}\n` + list.map(c => `- [${c.klant} – ${c.project}](${SITE_URL}/portfolio/${c.slug}/): ${cut(c.tekst[0], 200)}`).join("\n")).join("\n")}

## Klanten
${D.KLANTEN.map(k => k[0]).join(", ")}

## Contact
- [Contactpagina](${SITE_URL}/contact/)
`);

console.log(`Klaar: ${pages.length} pagina's in dist/`);
