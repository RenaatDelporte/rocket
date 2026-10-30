/* =====================================================================
   ROCKET – WEBSITE-CODE
   De inhoud staat in inhoud.js. Dit bestand hoef je niet aan te passen.

   Dit script werkt op twee manieren:
   - Op de website staat elke pagina al als gewone HTML klaar (gebouwd door
     scripts/bouw.mjs). Dan voegt dit script enkel de interactie toe:
     de wisselende header, de film, het formulier en het menu.
   - In een voorbeeldweergave zonder losse pagina's bouwt het script de
     pagina's zelf op, met adressen als #pilz.
   ===================================================================== */
var MODE, PREFIX;   /* "static" of "hash"; PREFIX = pad naar de hoofdmap */
if (MODE === undefined) MODE = "hash";
if (PREFIX === undefined) PREFIX = "";

var MARK_RED = "img/streepjes-rood.png", MARK_WHITE = "img/streepjes-wit.png", LOGO_WHITE = "img/logo-wit.png";
var FB = ["red", "black", "grey"];
var IN_PREVIEW = typeof window !== "undefined" && MODE === "hash" && (!!window.claude || window.self !== window.top);
var heroTimer = null;

function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }
function asset(p){ return /^(https?:|data:)/.test(p) ? p : PREFIX + p; }
function href(key){
  if (MODE === "hash") return "#" + key;
  if (key === "portfolio") return PREFIX || "./";
  if (key === "klanten") return (PREFIX || "./") + "#klanten";
  if (key === "visie" || key === "contact") return PREFIX + key + "/";
  if (key.indexOf("dienst-") === 0) return PREFIX + "diensten/" + key.slice(7) + "/";
  return PREFIX + "portfolio/" + key + "/";
}
function diensten(){ return typeof DIENSTEN !== "undefined" ? DIENSTEN : []; }
function vragen(){ return typeof VRAGEN !== "undefined" ? VRAGEN : []; }
function regio(){ return typeof REGIO !== "undefined" ? REGIO : "Oost-Vlaanderen"; }
/* de dienst waaronder een project valt (voor de link bij "Discipline") */
function dienstVan(c){ return diensten().filter(function(d){ return d.disciplines.indexOf(c.discipline) > -1; })[0]; }
/* projecten bij een dienst; zonder disciplines: de nieuwste */
function werkVan(d){ return d.disciplines.length ? CASES.filter(function(c){ return d.disciplines.indexOf(c.discipline) > -1; }) : CASES.slice(0, 6); }
function vimeoId(u){ var m = String(u || "").match(/vimeo\.com\/(?:video\/)?(\d+)/); return m ? m[1] : ""; }
function coverOf(c){ return c.beelden[0] || c.poster || ""; }
function candidates(c){ return c.beelden.concat(c.poster ? [c.poster] : []); }
function fbMark(i){ return FB[i % 3] === "grey" ? MARK_RED : MARK_WHITE; }
/* beeld met reserves: lukt het eerste niet, dan het volgende */
function nextSrc(img){ var alts = (img.dataset.alt || "").split("|").filter(Boolean); if (alts.length){ img.src = alts.shift(); img.dataset.alt = alts.join("|"); return true; } return false; }
function altAttr(list){ return list.length > 1 ? ' data-alt="' + esc(list.slice(1).map(asset).join("|")) + '"' : ""; }
function plain(html){ return String(html).replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim(); }

/* ---------- onderdelen ---------- */
function tile(c, i){
  var list = candidates(c);
  var img = list.length ? '<img src="' + esc(asset(list[0])) + '"' + altAttr(list) + ' alt="' + esc(c.klant + " – " + c.project) + '" loading="lazy" onload="this.parentNode.classList.add(\'loaded\')" onerror="nextSrc(this)||this.remove()">' : "";
  return '<a class="tile" href="' + esc(href(c.slug)) + '">' +
    '<div class="ph">' + img + '<div class="fb ' + FB[i % 3] + '"><img src="' + asset(fbMark(i)) + '" alt=""></div>' +
      (c.video ? '<span class="play" aria-hidden="true"></span>' : "") +
      (c.binnenkort ? '<span class="soon">Binnenkort</span>' : "") +
      (c.prijs ? '<span class="award"><i aria-hidden="true"></i>' + esc(c.prijsLabel || "Award") + '</span>' : "") + '</div>' +
    '<div class="cap"><div class="who"><h3>' + esc(c.klant) + '</h3><p>' + esc(c.project) + '</p></div><span class="cat label">' + esc(c.discipline) + '</span></div>' +
  '</a>';
}

function heroHTML(){
  if (HERO_VIDEO) return '<video src="' + esc(asset(HERO_VIDEO)) + '" autoplay muted loop playsinline oncanplay="this.parentNode.classList.add(\'has-video\')" onerror="this.remove()"></video>';
  return HERO_MIX.map(function(s){ return CASES.filter(function(c){ return c.slug === s; })[0]; })
    .filter(function(c){ return c && coverOf(c); })
    .map(function(c, k){
      var list = candidates(c);
      return '<a class="slide' + (k === 0 ? " on" : "") + '" href="' + esc(href(c.slug)) + '" data-slug="' + esc(c.slug) + '">' +
        '<img src="' + esc(asset(list[0])) + '"' + altAttr(list) + ' alt="' + esc(c.klant + " – " + c.project) + '"' + (k === 0 ? "" : ' loading="lazy"') + ' onerror="nextSrc(this)||heroDrop(this)">' +
        '<div class="cap-h"><div class="wrap">' +
          '<div><span class="label">' + esc(c.discipline) + '</span><span class="slide-t">' + esc(c.klant) + '</span><p>' + esc(c.project) + '</p></div>' +
          '<span class="more-btn">Bekijk project <span aria-hidden="true">→</span></span>' +
        '</div></div></a>';
    }).join("") + '<div class="ticks" role="group" aria-label="Kies een project"></div>';
}

function clientsBand(){
  function item(k){
    var n = k[0], img = k[1], url = k[2];
    var tag = url ? "a" : "span", attrs = url ? ' href="' + esc(url) + '" target="_blank" rel="noopener"' : "";
    return '<' + tag + ' class="cl"' + attrs + ' title="' + esc(n) + '"><img src="' + esc(asset(img)) + '" alt="' + esc(n) + '" onload="this.parentNode.classList.add(\'loaded\')" onerror="this.remove()"><span class="nm">' + esc(n) + '</span></' + tag + '>';
  }
  var set = KLANTEN.map(item).join("");
  return '<section class="clients-band" id="klanten" aria-labelledby="kl-title">' +
    '<div class="wrap"><h2 id="kl-title">Straffe merken waar wij voor mogen werken.</h2></div>' +
    '<div class="marquee"><div class="track"><div class="set">' + set + '</div><div class="set" aria-hidden="true">' + set.replace(/<a /g, '<a tabindex="-1" ').replace(/ alt="[^"]*"/g, ' alt=""') + '</div></div></div>' +
  '</section>';
}

/* ---------- pagina's ---------- */
function pageWerk(){
  return '<section class="hero" aria-label="Uitgelicht werk">' + heroHTML() + '<div class="panel"><img src="' + asset(LOGO_WHITE) + '" alt="Rocket" width="900" height="393"></div></section>' +
  '<section class="wrap intro">' +
    '<h1>Wij helpen lokale organisaties en ondernemers met bedrijfscommunicatie op maat.</h1>' +
    '<div class="intro-txt">' +
      '<p>Elk bedrijf is specifiek en uniek. Daarom schuiven we aan bij je marketingverantwoordelijke en zetten we het juiste team van experts in. Hieronder een greep uit het werk dat we samen met onze klanten maakten.</p>' +
      '<a class="btn line" href="' + href("visie") + '">Onze visie <span aria-hidden="true">→</span></a>' +
    '</div>' +
  '</section>' +
  '<section class="wrap" aria-labelledby="pf-title"><h2 id="pf-title" class="sr-only">Portfolio</h2><div class="tiles">' + CASES.map(tile).join("") + '</div></section>' +
  clientsBand() +
  ctaBand();
}

function pageCase(c){
  var i = CASES.indexOf(c);
  var cover = c.beelden[0], rest = c.beelden.slice(1), top;
  if (c.video){
    var id = vimeoId(c.video), poster = c.poster || cover;
    var label = '<span class="pl" aria-hidden="true"></span><span class="label">Speel de film af' + (c.duur ? " · " + esc(c.duur) : "") + '</span>';
    var go = IN_PREVIEW || !id
      ? '<a class="go" href="' + esc(c.video) + '" target="_blank" rel="noopener">' + label + '</a>'
      : '<button class="go" type="button" data-vimeo="' + esc(id) + '" data-title="' + esc(c.klant + " – " + c.project) + '" aria-label="Speel de film ' + esc(c.klant + " – " + c.project) + ' af">' + label + '</button>';
    var plist = [c.poster, cover].filter(Boolean);
    var ratio = c.formaat === "4:3" ? " r43" : c.formaat === "1:1" ? " r11" : c.formaat === "9:16" ? " r916" : "";
    top = '<div class="player' + ratio + '">' + (plist.length ? '<img class="poster" src="' + esc(asset(plist[0])) + '"' + altAttr(plist) + ' alt="' + esc("Beeld uit de film " + c.klant + " – " + c.project) + '" onerror="nextSrc(this)||this.remove()">' : "") + go + '</div>' +
      '<p class="player-note">' + (IN_PREVIEW ? "In deze voorbeeldweergave opent de film op Vimeo. Op je website speelt hij hier af." : 'Speelt de film niet af? <a href="' + esc(c.video) + '" target="_blank" rel="noopener">Bekijk hem op Vimeo</a>.') + '</p>';
    rest = c.beelden.filter(function(b){ return b !== poster; });
  } else if (cover){
    top = '<div class="cover"><img class="main" src="' + esc(asset(cover)) + '"' + altAttr(c.beelden) + ' alt="' + esc(c.klant + " – " + c.project) + '" onload="this.parentNode.classList.add(\'loaded\')" onerror="nextSrc(this)||this.remove()"><div class="fb red"><img src="' + asset(MARK_WHITE) + '" alt=""></div></div>';
  } else {
    top = "";   /* nog geen beelden: geen leeg vlak bovenaan */
  }
  var dv = dienstVan(c);
  var facts = [["Klant", esc(c.klant)], ["Project", esc(c.project)], ["Discipline", dv ? '<a href="' + esc(href("dienst-" + dv.slug)) + '">' + esc(c.discipline) + '</a>' : esc(c.discipline)]];
  if (c.jaar) facts.push(["Jaar", esc(c.jaar)]);
  if (c.rol) facts.push(["Rol", esc(c.rol)]);
  if (c.prijs) facts.push(["Prijs", esc(c.prijs)]);
  if (c.partner) facts.push(["In samenwerking met", esc(c.partner)]);
  if (c.website) facts.push(["Website", '<a href="' + esc(c.website) + '" target="_blank" rel="noopener">' + esc(c.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "")) + '</a>']);
  var links = c.website ? '<a class="btn line" href="' + esc(c.website) + '" target="_blank" rel="noopener">Bekijk de website</a>' : "";
  var gallery = rest.length ? '<section class="wrap" aria-label="Beelden"><div class="gallery">' + rest.map(function(s, k){
      return '<figure class="' + (rest.length % 2 && k === 0 ? "wide" : "") + '"><img src="' + esc(asset(s)) + '" alt="' + esc(c.klant + " – " + c.project + ", beeld " + (k + 2)) + '" loading="lazy" onerror="this.parentNode.remove()"></figure>';
    }).join("") + '</div></section>' : "";
  var more = [1, 2, 3].map(function(n){ return CASES[(i + n) % CASES.length]; });
  return '<div class="wrap"><a class="back" href="' + href("portfolio") + '">← Alle projecten</a></div>' +
  '<header class="wrap p-head">' +
    '<span class="label">' + esc(c.discipline) + '</span>' +
    '<h1>' + esc(c.klant) + '</h1>' +
    '<p class="proj">' + esc(c.project) + '</p>' +
  '</header>' +
  (top ? '<div class="wrap">' + top + '</div>' : "") +
  '<section class="wrap p-body">' +
    '<dl class="facts">' + facts.map(function(f){ return '<div><dt>' + f[0] + '</dt><dd>' + f[1] + '</dd></div>'; }).join("") + '</dl>' +
    '<div class="p-text">' + c.tekst.map(function(t){ return '<p>' + t + '</p>'; }).join("") + (links ? '<div class="p-links">' + links + '</div>' : "") + '</div>' +
  '</section>' +
  gallery +
  '<section class="wrap more">' +
    '<div class="more-head"><h2>Meer werk</h2><a href="' + href("portfolio") + '">Alle projecten →</a></div>' +
    '<div class="tiles three">' + more.map(function(m){ return tile(m, CASES.indexOf(m)); }).join("") + '</div>' +
  '</section>';
}

function dienstenGrid(skip){
  return '<div class="diensten">' + diensten().filter(function(d){ return d.slug !== skip; }).map(function(d){
    return '<a class="dienst" href="' + esc(href("dienst-" + d.slug)) + '"><h3>' + esc(d.naam) + '</h3><p>' + esc(d.kort) + '</p><span class="lees">Meer over ' + esc(d.naam.toLowerCase()) + ' <span aria-hidden="true">→</span></span></a>';
  }).join("") + '</div>';
}
function faqHTML(){
  var v = vragen(); if (!v.length) return "";
  return '<section class="wrap blok" aria-labelledby="faq-title"><span class="label">Veelgestelde vragen</span><h2 id="faq-title">Goed om te weten</h2>' +
    '<div class="faq">' + v.map(function(q){ return '<details><summary>' + esc(q[0]) + '</summary><p>' + esc(q[1]) + '</p></details>'; }).join("") + '</div></section>';
}
function ctaBand(){
  return '<section class="cta-band"><div class="wrap">' +
    '<h2>Bel ons gerust voor een project of een koffie, of thee. Of alletwee.</h2>' +
    '<a class="btn" href="' + href("contact") + '">Neem contact op</a>' +
  '</div></section>';
}

function pageVisie(){
  return '<header class="wrap page-head"><span class="label">Onze visie</span><h1>Bedrijfscommunicatie op maat</h1></header>' +
  '<section class="wrap visie">' +
    '<div>' +
      '<p class="lede" style="margin-bottom:24px">Wij zijn ervan overtuigd dat <b>elk bedrijf specifiek en uniek</b> is. Daarom hanteren wij voor elk product, merk of dienst een <b>op maat gemaakte aanpak</b>.</p>' +
      '<p>In de eerste fase luisteren wij aandachtig naar je smaak, voorkeuren en wensen. Zodra wij een goed begrip hebben van de communicatieoplossing die bij jou past, gaan wij direct aan de slag. Wij <b>selecteren de experts</b> die het beste passen bij je <b>specifieke behoeften</b> en zorgen voor een <b>optimale uitvoering</b> van je project.</p>' +
      '<p>Wij houden ervan om even aan tafel te schuiven om te luisteren. Want de basis van Rocket en van al onze realisaties zijn <b>mensen en hun verhaal</b>. Daarom, bel ons gerust voor een project of een koffie, of thee. Of alletwee.</p>' +
    '</div>' +
    '<div class="statement"><img src="' + asset(MARK_WHITE) + '" alt=""></div>' +
  '</section>' +
  '<section class="wrap blok aanpak" aria-labelledby="aanpak-title">' +
    '<div><span class="label">Zo werken we</span><h2 id="aanpak-title">Naast je marketingverantwoordelijke</h2></div>' +
    '<div>' +
      '<p>We gaan vooral <b>langs bij bedrijven</b>. Daar gaan we <b>naast de marketingverantwoordelijke</b> zitten en kijken we samen waar we kunnen <b>bijsturen, verbeteren en efficiënter werken</b>.</p>' +
      '<p>Rocket werkt met een <b>team van experts</b>. Voor elke opdracht zetten we de mensen in die het best passen: van filmmakers en fotografen tot ontwerpers en webbouwers.</p>' +
    '</div>' +
  '</section>' +
  '<section class="wrap blok" aria-labelledby="wat-title"><span class="label">Wat we doen</span><h2 id="wat-title">Marketing en communicatie, van advies tot uitvoering</h2>' + dienstenGrid() + '</section>' +
  '<section class="wrap blok gebied" aria-labelledby="gebied-title">' +
    '<div><span class="label">Waar we actief zijn</span><h2 id="gebied-title">In heel ' + esc(regio()) + '</h2></div>' +
    '<p class="lede">' + (typeof WERKGEBIED !== "undefined" ? WERKGEBIED : "") + '</p>' +
  '</section>' +
  faqHTML() +
  '<section class="wrap blok"><p><a class="btn" href="' + href("portfolio") + '">Bekijk het portfolio</a></p></section>' +
  ctaBand();
}

function pageDienst(d){
  var werk = werkVan(d);
  return '<div class="wrap"><a class="back" href="' + href("visie") + '">← Wat we doen</a></div>' +
  '<header class="wrap page-head"><span class="label">' + esc(d.naam) + '</span><h1>' + esc(d.titel) + '</h1><p class="lede">' + esc(d.kort) + '</p></header>' +
  '<section class="wrap dienst-tekst">' + d.tekst.map(function(t){ return '<p>' + t + '</p>'; }).join("") +
    '<p><a class="btn" href="' + href("contact") + '">Neem contact op</a></p></section>' +
  (werk.length ? '<section class="wrap more" aria-labelledby="dw-title"><div class="more-head"><h2 id="dw-title">' + (d.disciplines.length ? "Projecten" : "Uit ons portfolio") + '</h2><a href="' + href("portfolio") + '">Alle projecten →</a></div>' +
    '<div class="tiles three">' + werk.map(function(c){ return tile(c, CASES.indexOf(c)); }).join("") + '</div></section>' : "") +
  '<section class="wrap blok" aria-labelledby="ook-title"><span class="label">Wat we nog doen</span><h2 id="ook-title">Ook bij Rocket</h2>' + dienstenGrid(d.slug) + '</section>' +
  ctaBand();
}

function pageContact(){
  var picks = ["Marketingbegeleiding", "Video", "Print", "Webdesign", "Media & social", "Fotografie", "Iets anders"].map(function(v, k){
    return '<input type="checkbox" id="p' + k + '" name="dienst" value="' + esc(v) + '"><label for="p' + k + '">' + esc(v) + '</label>';
  }).join("");
  return '<header class="wrap page-head"><span class="label">Contact</span><h1>Let\'s talk!</h1></header>' +
  '<section class="wrap contact">' +
    '<div>' +
      '<p class="lede">Wij houden ervan om even aan tafel te schuiven om te luisteren. Bel ons gerust voor een project of een koffie, of thee. Of alletwee. We komen ook graag bij je langs, overal in ' + esc(regio()) + '.</p>' +
      '<div class="person">' +
        '<strong>Renaat Delporte</strong>' +
        '<span>Rocket HQ, Molenhoek 168, 9340 Lede</span>' +
        '<a href="mailto:renaat@wearerocket.be">renaat@wearerocket.be</a>' +
        '<a href="tel:+32473221829">+32 473 22 18 29</a>' +
      '</div>' +
    '</div>' +
    '<div id="form-wrap">' +
      '<form class="cf" id="cf" novalidate>' +
        '<div class="field"><label for="onderwerp">Waarvoor neem je contact op?</label>' +
          '<select id="onderwerp" name="onderwerp"><option>Offerte</option><option>Algemene info</option><option>Afspraak</option></select></div>' +
        '<div class="row">' +
          '<div class="field" id="f-naam"><label for="naam">Naam</label><input id="naam" name="naam" autocomplete="name"><span class="msg" aria-live="polite"></span></div>' +
          '<div class="field"><label for="bedrijf">Bedrijf <span class="opt">(optioneel)</span></label><input id="bedrijf" name="bedrijf" autocomplete="organization"></div>' +
        '</div>' +
        '<div class="row">' +
          '<div class="field" id="f-email"><label for="email">E-mail</label><input id="email" name="email" type="email" autocomplete="email"><span class="msg" aria-live="polite"></span></div>' +
          '<div class="field"><label for="tel">Telefoon <span class="opt">(optioneel)</span></label><input id="tel" name="tel" type="tel" autocomplete="tel"></div>' +
        '</div>' +
        '<fieldset class="field"><legend>Waarmee kunnen we helpen?</legend><div class="picks">' + picks + '</div></fieldset>' +
        '<div class="field" id="f-timing"><label for="timing">Wanneer wil je starten?</label>' +
          '<select id="timing" name="timing"><option>Zo snel mogelijk</option><option>Binnen 1 à 3 maanden</option><option>Later dit jaar</option><option>Eerst even kennismaken</option></select></div>' +
        '<div class="field" id="f-bericht"><label for="bericht" id="l-bericht">Vertel kort over je project</label><textarea id="bericht" name="bericht"></textarea><span class="msg" aria-live="polite"></span></div>' +
        '<div class="submit-row"><small>We antwoorden binnen 2 werkdagen.</small><button class="btn" type="submit">Verstuur bericht</button></div>' +
      '</form>' +
    '</div>' +
  '</section>';
}

/* ---------- interactie in de browser ---------- */
function $(s){ return document.querySelector(s); }

function heroDrop(img){ var s = img.closest(".slide"); if (s){ s.remove(); heroStart(); } }
function heroStart(){
  clearTimeout(heroTimer);
  var hero = $(".hero"); if (!hero || HERO_VIDEO) return;
  var slides = [].slice.call(hero.querySelectorAll(".slide"));
  hero.classList.toggle("has-slides", slides.length > 0);
  var ticks = hero.querySelector(".ticks");
  if (!slides.length){ if (ticks) ticks.remove(); return; }
  ticks.style.setProperty("--dur", HERO_SECONDS + "s");
  ticks.innerHTML = slides.length > 1 ? slides.map(function(s, k){ return '<button type="button" aria-label="Project ' + (k + 1) + '"><span></span></button>'; }).join("") : "";
  var n = Math.max(0, slides.findIndex(function(s){ return s.classList.contains("on"); }));
  function show(k){
    clearTimeout(heroTimer); n = (k + slides.length) % slides.length;
    slides.forEach(function(s, j){ s.classList.toggle("on", j === n); });
    [].forEach.call(ticks.children, function(b, j){ b.classList.toggle("done", j < n); b.classList.remove("on"); void b.offsetWidth; b.classList.toggle("on", j === n); });
    if (slides.length > 1) heroTimer = setTimeout(function(){ show(n + 1); }, HERO_SECONDS * 1000);
  }
  ticks.onclick = function(e){ var b = e.target.closest("button"); if (b) show([].indexOf.call(ticks.children, b)); };
  show(n);
}

function bindForm(){
  var form = $("#cf"); if (!form) return;
  function setErr(id, msg){ var f = $(id); f.classList.toggle("err", !!msg); f.querySelector(".msg").textContent = msg || ""; }
  var LABELS = { "Offerte": "Vertel kort over je project", "Algemene info": "Wat wil je graag weten?", "Afspraak": "Waarover wil je praten, en wanneer past het jou?" };
  var subj = $("#onderwerp");
  function onSubject(){ var v = subj.value; $("#l-bericht").textContent = LABELS[v] || LABELS.Offerte; $("#f-timing").hidden = v !== "Offerte"; }
  subj.addEventListener("change", onSubject); onSubject();
  form.addEventListener("submit", async function(e){
    e.preventDefault();
    var d = new FormData(form);
    var naam = (d.get("naam") || "").trim(), email = (d.get("email") || "").trim(), bericht = (d.get("bericht") || "").trim();
    var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setErr("#f-naam", naam ? "" : "Vul je naam in.");
    setErr("#f-email", ok ? "" : "Vul een geldig e-mailadres in, bv. naam@bedrijf.be.");
    setErr("#f-bericht", bericht ? "" : "Vertel ons kort waar het over gaat.");
    if (!naam || !ok || !bericht){ var bad = form.querySelector(".err input, .err textarea"); if (bad) bad.focus(); return; }
    var sent = false;
    d.set("_subject", "Website Rocket: " + (d.get("onderwerp") || "bericht") + " van " + naam);
    if (d.get("onderwerp") !== "Offerte") d.delete("timing");
    if (FORM_ENDPOINT){
      try { var r = await fetch(FORM_ENDPOINT, { method: "POST", body: d, headers: { Accept: "application/json" } }); sent = r.ok; } catch (err) {}
      if (!sent){ setErr("#f-bericht", "Versturen lukte niet. Mail ons gerust rechtstreeks op renaat@wearerocket.be."); return; }
    }
    if (!sent){
      /* nog geen formulierdienst gekoppeld: het bericht klaarzetten in het mailprogramma van de bezoeker */
      var lines = ["Onderwerp: " + (d.get("onderwerp") || ""), "Naam: " + naam];
      if ((d.get("bedrijf") || "").trim()) lines.push("Bedrijf: " + d.get("bedrijf").trim());
      lines.push("E-mail: " + email);
      if ((d.get("tel") || "").trim()) lines.push("Telefoon: " + d.get("tel").trim());
      var picks = d.getAll("dienst"); if (picks.length) lines.push("Waarmee kunnen we helpen: " + picks.join(", "));
      if (d.get("timing")) lines.push("Starten: " + d.get("timing"));
      lines.push("", bericht);
      location.href = "mailto:renaat@wearerocket.be?subject=" + encodeURIComponent(d.get("_subject")) + "&body=" + encodeURIComponent(lines.join("\n"));
      $("#form-wrap").innerHTML = '<div class="done" role="status"><img src="' + asset(MARK_RED) + '" alt="">' +
        '<h2>Bijna klaar, ' + esc(naam.split(" ")[0]) + '!</h2>' +
        '<p>Je mailprogramma opent met je bericht. Druk daar nog op verzenden.</p>' +
        '<p class="note">Opent er niets? Mail ons op <a href="mailto:renaat@wearerocket.be">renaat@wearerocket.be</a> of bel <a href="tel:+32473221829">+32 473 22 18 29</a>.</p></div>';
      return;
    }
    $("#form-wrap").innerHTML = '<div class="done" role="status"><img src="' + asset(MARK_RED) + '" alt="">' +
      '<h2>Bedankt, ' + esc(naam.split(" ")[0]) + '!</h2>' +
      '<p>We nemen binnen 2 werkdagen contact met je op via ' + esc(email) + '. De koffie staat klaar.</p></div>';
  });
}

function afterRender(navKey){
  var view = $("#view");
  [].forEach.call(document.querySelectorAll("[data-nav]"), function(a){ if (a.dataset.nav === navKey) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
  view.classList.toggle("ends-band", !!(view.lastElementChild && view.lastElementChild.classList.contains("cta-band")));
  bindForm();
  heroStart();
}

/* voorbeeldweergave: pagina's opbouwen op basis van #adres */
var PAGES = { portfolio: [pageWerk, "Portfolio"], werk: [pageWerk, "Portfolio"], visie: [pageVisie, "Visie"], contact: [pageContact, "Contact"] };
function route(){
  clearTimeout(heroTimer);
  var view = $("#view");
  var h = decodeURIComponent(location.hash.slice(1)) || "portfolio";
  var c = CASES.filter(function(x){ return x.slug === h; })[0];
  var navKey = "portfolio", title;
  var d = h.indexOf("dienst-") === 0 && diensten().filter(function(x){ return "dienst-" + x.slug === h; })[0];
  if (c){ view.innerHTML = pageCase(c); title = c.klant + " – " + c.project; }
  else if (d){ view.innerHTML = pageDienst(d); title = d.naam; navKey = "visie"; }
  else if (PAGES[h]){ view.innerHTML = PAGES[h][0](); navKey = h === "werk" ? "portfolio" : h; title = PAGES[h][1]; }
  else { view.innerHTML = pageWerk(); }
  document.title = title ? title + " · Rocket" : "Rocket · Let's fly together";
  afterRender(navKey);
  closeMenu();
  if (h === "klanten"){ var k = $("#klanten"); if (k){ k.scrollIntoView(); return; } }
  window.scrollTo(0, 0);
}

function closeMenu(){ var mm = $("#mm"), burger = $("#burger"); if (!mm || mm.hidden) return; mm.hidden = true; burger.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; }

function init(){
  var page = document.body.dataset.page;
  if (page){ MODE = "static"; PREFIX = document.body.dataset.prefix || ""; }

  /* film starten */
  document.addEventListener("click", function(e){
    var b = e.target.closest && e.target.closest("button.go[data-vimeo]"); if (!b) return;
    var f = document.createElement("iframe");
    f.src = "https://player.vimeo.com/video/" + b.dataset.vimeo + "?autoplay=1&dnt=1&title=0&byline=0&portrait=0&color=cc3333";
    f.allow = "autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"; f.allowFullscreen = true;
    f.referrerPolicy = "strict-origin-when-cross-origin"; f.title = b.dataset.title || "Film";
    b.closest(".player").appendChild(f); b.remove();
  });

  /* mobiel menu */
  var mm = $("#mm"), burger = $("#burger");
  burger.addEventListener("click", function(){ mm.hidden = false; burger.setAttribute("aria-expanded", "true"); document.body.style.overflow = "hidden"; $("#mm-close").focus(); });
  $("#mm-close").addEventListener("click", function(){ closeMenu(); burger.focus(); });
  mm.addEventListener("click", function(e){ if (e.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", function(e){ if (e.key === "Escape") closeMenu(); });

  var hdr = $("#hdr");
  window.addEventListener("scroll", function(){ hdr.classList.toggle("scrolled", window.scrollY > 4); }, { passive: true });
  var yr = $("#yr"); if (yr) yr.textContent = new Date().getFullYear();

  if (MODE === "static"){
    /* oude adressen zoals wearerocket.be/#pilz doorsturen naar de echte pagina */
    var h = decodeURIComponent(location.hash.slice(1));
    if (page === "portfolio" && h && h !== "klanten" && (PAGES[h] || CASES.some(function(c){ return c.slug === h; }))){
      if (h !== "portfolio" && h !== "werk"){ location.replace(href(h)); return; }
    }
    afterRender(page === "case" ? "portfolio" : page);
  } else {
    window.addEventListener("hashchange", route);
    route();
  }
}

if (typeof document !== "undefined"){
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
}
