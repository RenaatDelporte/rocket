/* =====================================================================
   INHOUD VAN DE ROCKET-WEBSITE
   Alles wat je zelf aanpast staat in dit bestand: header, projecten,
   klanten en het contactformulier. Bewaar, en de site gaat vanzelf online.
   ===================================================================== */
/* ==================================================================
   HEADER
   HERO_VIDEO: link naar een .mp4 (bv. je showreel). Speelt stil en in een lus.
   Leeg = wisselende beelden van de projecten hieronder (HERO_MIX).
   ================================================================== */
const HERO_VIDEO = "";
const HERO_MIX = ["pilz", "i-mens", "solva", "garage-thomas-uyttendaele", "symobo", "restaurant-bachtekerke", "broodnodig"];
const HERO_SECONDS = 6;

/* ==================================================================
   CASES — nieuwe case = één blok bijplakken. Bovenaan = eerste tegel.

   {
     slug: "korte-naam",                // uniek, wordt de link (#korte-naam)
     klant: "Naam van de klant",        // onder de tegel, in hoofdletters
     project: "Naam van het project",   // onder de klantnaam
     discipline: "Video",               // Video, Print, Webdesign, Media, Fotografie
     tekst: ["Alinea 1.", "Alinea 2."], // <b>vet</b> mag
     beelden: ["img/projecten/naam-1.jpg"], // eerste beeld = tegel en coverfoto
     video: "https://vimeo.com/123456", // optioneel: de film speelt af op de projectpagina
     poster: "img/films/naam.jpg",      // optioneel: startbeeld van de film
     duur: "1:19",                      // optioneel: lengte van de film
     website: "https://klant.be",       // optioneel
     partner: "Atelier 46"              // optioneel
   },
   ================================================================== */
const CASES = [
  { slug:"i-mens", klant:"i-mens", project:"Fotoshoot", discipline:"Fotografie", partner:"Atelier 46 & Kurt Stallaert",
    tekst:["In opdracht van <b>i-mens</b> &amp; Atelier 46 coördineerden wij, in samenwerking met <b>Kurt Stallaert</b>, een fotoshoot die de essentie van hun werk belicht.",
           "De focus lag op het vastleggen van <b>dagdagelijkse situaties</b>, waarbij i-mens medewerkers samen met patiënten in beeld zijn gebracht. Deze beelden dienen ter ondersteuning van de interne communicatie van i-mens."],
    beelden:["img/projecten/i-mens-1.jpg","img/projecten/i-mens-2.jpg","img/projecten/i-mens-3.jpg","img/projecten/i-mens-4.jpg"] },
  { slug:"pilz", klant:"Pilz", project:"Corporate film", discipline:"Video",
    tekst:["Pilz vroeg ons om hun waarden te vertalen in een corporate film. Deze film moest zowel dienen op beurzen om potentiële klanten te overtuigen als voor potentiële werknemers."],
    beelden:["img/projecten/pilz-1.jpg","img/projecten/pilz-2.jpg"], video:"https://vimeo.com/910566776", duur:"1:19",
    poster:"img/films/pilz.jpg" },
  { slug:"broodnodig", klant:"De Boever Ramen & Deuren", project:"Wij hebben jou broodnodig", discipline:"Media & Print",
    tekst:["Bij De Boever Ramen & Deuren zijn ze constant op zoek naar nieuwe werkkrachten. Ze bij de ramen en deurenspecialist op zoek naar een unieke manier om hun vacatures in de kijker te zetten.",
           "We voorzagen <b>80.000 broodzakken</b> van de duidelijke boodschap ‘wij hebben jou broodnodig’ samen met een QR-code die naar de vacaturepagina ging. De zakken werden verspreid bij <b>80 bakkers</b>. Enkel de bakkers rond de vestiging van Middelkerke en Wetteren werden aangeschreven. We gingen niet verder dan een <b>straal van 20 km rond beide gemeenten</b>."],
    beelden:["img/projecten/broodnodig-1.jpg"] },
  { slug:"solva", klant:"Solva", project:"Lancering deelfietsennetwerk", discipline:"Video",
    tekst:["Aan het station van Aalst werd eind augustus het <b>deelfietsennetwerk gelanceerd</b> met een leuk event van Solva. Je kon er op een parcours de <b>nieuwe elektrische deelfietsen testen</b>, het tegen elkaar opnemen op fietsen op rollen of een leuke foto nemen aan de photobooth. <i>Stad Aalst</i> trakteerde alle aanwezigen op een gratis drankje.",
           "Met Rocket maakte we een <b>after-movie van het event</b>. Deze wordt verspreid op de sociale media van de betrokken partijen en fungeert ook als <b>lanceringsfilm</b> voor het fietsennetwerk."],
    beelden:["img/projecten/solva-1.jpg","img/projecten/solva-2.jpg","img/projecten/solva-3.jpg"],
    video:"https://vimeo.com/1009152089", duur:"1:32",
    poster:"img/films/solva.jpg" },
  { slug:"garage-thomas-uyttendaele", klant:"Garage Thomas Uyttendaele", project:"Nieuwe branding", discipline:"Print",
    tekst:["Garage Thomas Uyttendaele is een garage voor nieuwe en recente tweedehandswagens. Je kan er terecht voor de aankoop van een wagen en voor het onderhoud van jouw wagen.",
           "Voor Thomas mochten we zijn volledige branding vernieuwen. Van lichtbakken tot winddoorlatende banners tot wagenbestickering."],
    beelden:["img/projecten/garage-thomas-uyttendaele-2.jpg","img/projecten/garage-thomas-uyttendaele-1.jpg","img/projecten/garage-thomas-uyttendaele-3.jpg","img/projecten/garage-thomas-uyttendaele-4.jpg"] },
  { slug:"restaurant-bachtekerke", klant:"Restaurant Bachtekerke", project:"Website", discipline:"Webdesign",
    tekst:["Tussen het dorpsplein van Bachte en de oevers van de Oude Leie ontdek je een oase van rust. Het idyllische Bachtekerke combineert deze unieke en sfeervolle locatie met een heerlijke keuken.",
           "<b>Chef Pieter De Troyer</b> en z’n team staan voor jou klaar om al jouw zintuigen te verwennen."],
    beelden:["img/projecten/restaurant-bachtekerke-1.jpg"], website:"https://bachtekerke.be/" },
  { slug:"de-boever-outdoor-living", klant:"De Boever Outdoor Living", project:"Want meer beleven da’s buiten leven", discipline:"Print",
    tekst:["Bij De Boever Outdoor Living lanceerde we begin dit jaar ‘Want meer beleven da’s buiten leven’. Alles draait bij hen om buitenbeleving.",
           "We mochten voor hen deze advertentie maken. Deze werd ingezet als onderdeel van een awareness campagne."],
    beelden:["img/projecten/de-boever-outdoor-living-1.jpg"] },
  { slug:"vbs-de-vlinderboom", klant:"VBS De Vlinderboom", project:"Eén website voor 3 vestigingen", discipline:"Webdesign", partner:"Atelier 46",
    tekst:["Voor de vrije basisschool in Zele – De Vlinderboom – mochten we samen met Valérie van Atelier 46 een nieuwe website ontwikkelen.",
           "De uitdaging was om de 3 vestigingen samen te krijgen op één overzichtelijke website."],
    beelden:["img/projecten/vbs-de-vlinderboom-1.jpg"] },
  { slug:"caenepeel", klant:"Caenepeel – De Juwelenfabrikant", project:"Online etalage", discipline:"Webdesign",
    tekst:["De juwelenzaak Caenepeel is een groothandel en tevens fabrikant in gouden juwelen, uurwerken en parels.",
           "De website van Christophe moest vooral functioneel zijn. We bouwden een online etalage met al zijn kunstwerken. Want ieder juweel dat Christophe maakt is uniek!"],
    beelden:["img/projecten/caenepeel-1.jpg"] },
  { slug:"jo-mode", klant:"Jo.mode", project:"Webdevelopment", discipline:"Webdesign",
    tekst:["Webdevelopment voor Jo.mode in Lochristi. Jo.mode is een kledingwinkel waar meer dan 100 topmerken samenkomen."],
    beelden:["img/projecten/jo-mode-1.jpg"], website:"https://jomode.be/" },
  { slug:"symobo", klant:"Symobo", project:"Ondertiteling NL & FR", discipline:"Video",
    tekst:["Met Rocket ondertitelden we de video’s van Symobo. In totaal werden een 10-tal video’s voorzien van ondertitels en dat zowel in het Nederlands als Frans.",
           "Bij Symobo vertrekken ze niet vanuit standaardoplossingen. Wél vanuit uw wensen, doelstellingen en mogelijkheden. Op basis daarvan kiezen ze het beste prefab-bouwsysteem. Zo bouwen ze altijd snel, duurzaam en kostenefficiënt."],
    beelden:[], video:"https://vimeo.com/932423574", duur:"2:57",
    poster:"img/films/symobo.jpg" },
  { slug:"de-boever-advertentie", klant:"De Boever Ramen & Deuren", project:"Printadvertentie", discipline:"Print",
    tekst:["Print advertentie voor De Boever Ramen & Deuren. De raamspecialist in Vlaanderen met ondertussen 4 vestigingen."],
    beelden:["img/projecten/de-boever-advertentie-1.jpg"] }
];

/* KLANTEN — naam, logo, website. Verschijnen in de band onder de projecten. */
const KLANTEN = [
  ["Bachtekerke","img/klanten/bachtekerke.png","https://bachtekerke.be/"],
  ["De Boever Ramen & Deuren","img/klanten/de-boever-ramen-deuren.png","https://tomdeboever.be/"],
  ["i-mens","img/klanten/i-mens.png","https://www.i-mens.be/"],
  ["Pilz","img/klanten/pilz.png","https://www.pilz.com/nl-BE"],
  ["Vishandel Boel","img/klanten/vishandel-boel.png","https://vishandelboel.be/"],
  ["Garage Thomas Uyttendaele","img/klanten/garage-thomas-uyttendaele.png","https://www.garageuyttendaelethomas.be/"],
  ["Hoeveslagerij Van Den Vreken","img/klanten/hoeveslagerij-van-den-vreken.png","https://vandenvreken.be/"],
  ["Van Hessen Belgium","img/klanten/van-hessen.png","https://www.vanhessen.com/fr/contact/"],
  ["Growthru","img/klanten/growthru.png",""],
  ["Baeyens","img/klanten/baeyens.png",""],
  ["Solva","img/klanten/solva.png","https://www.so-lva.be/"],
  ["DB-Decoteam.be","img/klanten/db-decoteam.png",""],
  ["Steven David","img/klanten/steven-david.png",""],
  ["Bonne Route","img/klanten/bonne-route.png","https://bonneroute.be/"],
  ["Šecuur","img/klanten/secuur.png",""]
];

/* Contactformulier: adres van je formulierdienst (bv. Formspree). Leeg = niets wordt verzonden. */
const FORM_ENDPOINT = "";
