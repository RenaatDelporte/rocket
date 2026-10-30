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
     slug: "korte-naam",                // uniek, wordt de link (wearerocket.be/portfolio/korte-naam/)
     klant: "Naam van de klant",        // onder de tegel, in hoofdletters
     project: "Naam van het project",   // onder de klantnaam
     discipline: "Video",               // Video, Print, Webdesign, Media, Fotografie
     tekst: ["Alinea 1.", "Alinea 2."], // <b>vet</b> mag
     beelden: ["img/projecten/naam-1.jpg"], // eerste beeld = tegel en coverfoto
     video: "https://vimeo.com/123456", // optioneel: de film speelt af op de projectpagina
     poster: "img/films/naam.jpg",      // optioneel: startbeeld van de film
     duur: "1:19",                      // optioneel: lengte van de film
     formaat: "4:3",                    // optioneel: beeldverhouding van de film als die niet 16:9 is (4:3, 1:1 of 9:16)
     datum: "2024-02-06",               // optioneel: publicatiedatum van de film (voor Google)
     binnenkort: true,                  // optioneel: toont "Binnenkort" op de tegel
     website: "https://klant.be",       // optioneel
     partner: "Atelier 46"              // optioneel
   },
   ================================================================== */
const CASES = [
  { slug:"ggz-ads", klant:"Netwerk Geestelijke Gezondheid", project:"Animatievideo", discipline:"Video",
    tekst:["Het Netwerk Geestelijke Gezondheid Aalst Dendermonde Sint-Niklaas (GGZ ADS) zet met de <b>Ronde Tafels Gedeelde Zorg</b> in op <b>zorgwekkende zorgmijders</b>. Dat zijn volwassenen met ernstige psychiatrische problemen, vaak in combinatie met dakloosheid, verslaving of financiële moeilijkheden, die hulp uit de weg gaan.",
           "Via de mobiele teams krijgen zij <b>aanklampende zorg</b>. Lokale partners zoals huisartsen, het OCMW of het CAW kunnen iemand anoniem signaleren. Om de twee weken zitten ze samen aan een <b>digitale ronde tafel</b> om de zorg samen op te nemen.",
           "Met Rocket maakten we een <b>animatievideo</b> die op een eenvoudige manier uitlegt hoe de ronde tafels werken, voor wie ze bedoeld zijn en in welke regio’s: Waasland, Dender, Regio Aalst en Dender Zuid."],
    beelden:["img/projecten/ggz-ads-7.jpg","img/projecten/ggz-ads-2.jpg","img/projecten/ggz-ads-3.jpg","img/projecten/ggz-ads-4.jpg","img/projecten/ggz-ads-5.jpg","img/projecten/ggz-ads-6.jpg"],
    video:"https://vimeo.com/1240892524", poster:"img/projecten/ggz-ads-1.jpg", website:"https://www.ggzads.be/zorgwekkende-zorgmijders-aanklampende-zorg-vanuit-de-mobiele-teams-ronde-tafels-gedeelde-zorg" },
  { slug:"de-boever-reining-horses", klant:"De Boever Reining Horses", project:"Sfeervideo", discipline:"Video",
    tekst:["De Boever Reining Horses is een kleinschalige <b>pensionstalling en reiningstal</b> in Vlierzele. Op de binnenpiste met westernbodem wordt er getraind, les gegeven en voorbereid op de shows.",
           "Met Rocket maakten we een <b>sfeervideo</b> die toont waar de stal voor staat: rust, vertrouwen en veel liefde voor paarden.",
           "Filmen met dieren is altijd een uitdaging. Paarden zijn <b>onvoorspelbaar</b> en trekken zich weinig aan van een draaiboek of een camera. Het vraagt geduld, flexibiliteit en vooral veel tijd om net dat ene moment te vangen."],
    beelden:["img/projecten/de-boever-reining-horses-1.jpg","img/projecten/de-boever-reining-horses-2.jpg","img/projecten/de-boever-reining-horses-3.jpg"],
    video:"https://vimeo.com/1240899134", poster:"img/projecten/de-boever-reining-horses-1.jpg", website:"https://dbstables.be/" },
  { slug:"cafe-parti", klant:"Café Parti", project:"Website", discipline:"Webdesign", partner:"Atelier 46",
    tekst:["Café Parti is een resto-café in Gent, vlakbij het Sint-Pietersstation. Je kan er terecht voor een ontspannen lunch of diner met <b>verse, huisbereide gerechten</b>, en in de tuin waan je je even op vakantie.",
           "Samen met Atelier 46 bouwden we een <b>overzichtelijke website</b> waar je meteen de weeklunch, de openingsuren en alle praktische info vindt."],
    beelden:["img/projecten/cafe-parti-1.jpg","img/projecten/cafe-parti-2.jpg"], website:"https://restocafeparti.be/" },
  { slug:"i-mens", klant:"i-mens", project:"Fotoshoot", discipline:"Fotografie", partner:"Atelier 46 & Kurt Stallaert",
    tekst:["In opdracht van <b>i-mens</b> &amp; Atelier 46 coördineerden wij, in samenwerking met <b>Kurt Stallaert</b>, een fotoshoot die de essentie van hun werk belicht.",
           "De focus lag op het vastleggen van <b>dagdagelijkse situaties</b>, waarbij i-mens medewerkers samen met patiënten in beeld zijn gebracht. Deze beelden dienen ter ondersteuning van de interne communicatie van i-mens."],
    beelden:["img/projecten/i-mens-1.jpg","img/projecten/i-mens-2.jpg","img/projecten/i-mens-3.jpg","img/projecten/i-mens-4.jpg"] },
  { slug:"pilz", klant:"Pilz", project:"Corporate film", discipline:"Video",
    tekst:["Pilz vroeg ons om hun waarden te vertalen in een corporate film. Deze film moest zowel dienen op beurzen om potentiële klanten te overtuigen als voor potentiële werknemers."],
    beelden:["img/projecten/pilz-1.jpg","img/projecten/pilz-2.jpg"], video:"https://vimeo.com/910566776", duur:"1:19", datum:"2024-02-06",
    poster:"img/films/pilz.jpg" },
  { slug:"broodnodig", klant:"De Boever Ramen & Deuren", project:"Wij hebben jou broodnodig", discipline:"Media & Print",
    tekst:["Bij De Boever Ramen & Deuren zijn ze constant op zoek naar nieuwe werkkrachten. Ze bij de ramen en deurenspecialist op zoek naar een unieke manier om hun vacatures in de kijker te zetten.",
           "We voorzagen <b>80.000 broodzakken</b> van de duidelijke boodschap ‘wij hebben jou broodnodig’ samen met een QR-code die naar de vacaturepagina ging. De zakken werden verspreid bij <b>80 bakkers</b>. Enkel de bakkers rond de vestiging van Middelkerke en Wetteren werden aangeschreven. We gingen niet verder dan een <b>straal van 20 km rond beide gemeenten</b>."],
    beelden:["img/projecten/broodnodig-1.jpg"] },
  { slug:"solva", klant:"Solva", project:"Lancering deelfietsennetwerk", discipline:"Video",
    tekst:["Aan het station van Aalst werd eind augustus het <b>deelfietsennetwerk gelanceerd</b> met een leuk event van Solva. Je kon er op een parcours de <b>nieuwe elektrische deelfietsen testen</b>, het tegen elkaar opnemen op fietsen op rollen of een leuke foto nemen aan de photobooth. <i>Stad Aalst</i> trakteerde alle aanwezigen op een gratis drankje.",
           "Met Rocket maakte we een <b>after-movie van het event</b>. Deze wordt verspreid op de sociale media van de betrokken partijen en fungeert ook als <b>lanceringsfilm</b> voor het fietsennetwerk."],
    beelden:["img/projecten/solva-1.jpg","img/projecten/solva-2.jpg","img/projecten/solva-3.jpg"],
    video:"https://vimeo.com/1009152089", duur:"1:32", datum:"2024-09-13",
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
  { slug:"jo-mode", klant:"Jo.mode", project:"Design", discipline:"Webdesign",
    tekst:["Jo.mode is een <b>multibrand modewinkel voor dames en heren</b> in Lochristi. Op meer dan 1000 m² vind je er meer dan <b>100 topmerken</b>, persoonlijk stijladvies en een eigen naaiatelier.",
           "Rocket tekende het <b>design van de website</b>: een rustige, verzorgde look die de merken, de persoonlijke service en het atelier in de kijker zet.",
           "Rocket stond enkel in voor het <b>design</b>. De ontwikkeling en de technische bouw van de website gebeurden door een andere partij."],
    beelden:["img/projecten/jo-mode-1.jpg"], website:"https://jomode.be/" },
  { slug:"symobo", klant:"Symobo", project:"Ondertiteling NL & FR", discipline:"Video",
    tekst:["Met Rocket ondertitelden we de video’s van Symobo. In totaal werden een 10-tal video’s voorzien van ondertitels en dat zowel in het Nederlands als Frans.",
           "Bij Symobo vertrekken ze niet vanuit standaardoplossingen. Wél vanuit uw wensen, doelstellingen en mogelijkheden. Op basis daarvan kiezen ze het beste prefab-bouwsysteem. Zo bouwen ze altijd snel, duurzaam en kostenefficiënt."],
    beelden:[], video:"https://vimeo.com/932423574", duur:"2:57", datum:"2024-04-09",
    poster:"img/films/symobo.jpg" },
  { slug:"de-boever-advertentie", klant:"De Boever Ramen & Deuren", project:"Printadvertentie", discipline:"Print",
    tekst:["Print advertentie voor De Boever Ramen & Deuren. De raamspecialist in Vlaanderen met ondertussen 4 vestigingen."],
    beelden:["img/projecten/de-boever-advertentie-1.jpg"] }
];

/* KLANTEN — naam, logo, website. Verschijnen in de band onder de projecten. */
const KLANTEN = [
  ["Bachtekerke","img/klanten/bachtekerke.png","https://bachtekerke.be/"],
  ["Bachtecafé","img/klanten/bachtecafe.svg",""],
  ["De Boever Ramen & Deuren","img/klanten/de-boever-ramen-deuren.png","https://tomdeboever.be/"],
  ["De Boever Reining Horses","img/klanten/de-boever-reining-horses.png","https://dbstables.be/"],
  ["i-mens","img/klanten/i-mens.png","https://www.i-mens.be/"],
  ["Netwerk Geestelijke Gezondheid","img/klanten/netwerk-geestelijke-gezondheid.png",""],
  ["Pilz","img/klanten/pilz.png","https://www.pilz.com/nl-BE"],
  ["Vishandel Boel","img/klanten/vishandel-boel.png","https://vishandelboel.be/"],
  ["Garage Thomas Uyttendaele","img/klanten/garage-thomas-uyttendaele.png","https://www.garageuyttendaelethomas.be/"],
  ["Hoeveslagerij Van Den Vreken","img/klanten/hoeveslagerij-van-den-vreken.png","https://vandenvreken.be/"],
  ["Vinois Brasserie","img/klanten/vinois.png",""],
  ["Van Hessen Belgium","img/klanten/van-hessen.png","https://www.vanhessen.com/fr/contact/"],
  ["Growthru","img/klanten/growthru.png",""],
  ["Baeyens","img/klanten/baeyens.png",""],
  ["Solva","img/klanten/solva.png","https://www.so-lva.be/"],
  ["DB-Decoteam.be","img/klanten/db-decoteam.png",""],
  ["Steven David","img/klanten/steven-david.png",""],
  ["Bonne Route","img/klanten/bonne-route.png","https://bonneroute.be/"],
  ["Šecuur","img/klanten/secuur.png",""],
  ["Café Parti","img/klanten/cafe-parti.png","https://restocafeparti.be/"],
  ["PJS Technics","img/klanten/pjs-technics.png",""],
  ["The Kitchen Expert","img/klanten/the-kitchen-expert.png",""],
  ["HP Cleaning & Zoon","img/klanten/hp-cleaning.png",""],
  ["Resurge","img/klanten/resurge.png",""],
  ["Rodeo Caravans","img/klanten/rodeo-caravans.png",""],
  ["Uyttendaele Stefaan BV","img/klanten/uyttendaele-stefaan.png",""],
  ["Volksbal Markt Lede","img/klanten/volksbal.png",""],
  ["WeConstruct","img/klanten/weconstruct.png",""]
];

/* ==================================================================
   OVER ROCKET — wat we doen, waar we actief zijn en veelgestelde vragen.
   Deze teksten staan op de pagina "Onze visie" en op een eigen pagina per dienst
   (wearerocket.be/diensten/<slug>/). Ze zijn belangrijk om gevonden te worden
   in Google en in AI-assistenten: noem je regio en je diensten gerust bij naam.
   Geen prijzen vermelden.
   ================================================================== */
const REGIO = "Oost-Vlaanderen";
const WERKGEBIED = "Rocket zit in <b>Lede</b> en werkt voor bedrijven en organisaties in heel <b>Oost-Vlaanderen</b>: van Aalst en de Denderstreek tot Gent en Wetteren. We komen graag bij je langs.";

/* DIENSTEN — disciplines: welke projecten (zie "discipline" bij CASES) op de pagina komen. Leeg = de nieuwste projecten. */
const DIENSTEN = [
  { slug:"marketingbegeleiding", naam:"Marketingbegeleiding",
    titel:"Marketingbegeleiding voor bedrijven in Oost-Vlaanderen",
    kort:"We schuiven aan naast je marketingverantwoordelijke en kijken samen waar het beter en efficiënter kan.",
    tekst:["Vaak loopt er al heel wat: een website, sociale media, advertenties, drukwerk. Maar hangt het ook samen, en haalt het wat het zou moeten halen? Daarom gaan we <b>langs bij bedrijven</b> en gaan we <b>naast de marketingverantwoordelijke</b> zitten.",
           "Samen bekijken we wat er loopt en waar je kan <b>bijsturen, verbeteren of efficiënter werken</b>. Moet er daarna iets gemaakt worden, een film, een website of een campagne, dan zetten we ons <b>team van experts</b> in.",
           "Rocket zit in Lede en begeleidt bedrijven en organisaties in heel <b>Oost-Vlaanderen</b>."],
    disciplines:[] },
  { slug:"video", naam:"Video & animatie",
    titel:"Bedrijfsfilm en animatievideo in Oost-Vlaanderen",
    kort:"Corporate films, sfeervideo's en animaties die je verhaal in een paar minuten duidelijk maken.",
    tekst:["Een goede film vertelt in een paar minuten wat je anders in tien pagina's uitlegt. We maken <b>bedrijfsfilms</b>, <b>sfeervideo's</b>, <b>animatievideo's</b> en films voor <b>lanceringen en rekrutering</b>.",
           "Van het eerste idee tot de laatste montage, met <b>ondertiteling in het Nederlands en het Frans</b> als je dat wil. Voor elke film kiezen we de mensen die passen bij het verhaal."],
    disciplines:["Video"] },
  { slug:"webdesign", naam:"Webdesign",
    titel:"Websites op maat voor bedrijven in Oost-Vlaanderen",
    kort:"Overzichtelijke websites die tonen wie je bent en bezoekers snel de weg wijzen.",
    tekst:["Je website werkt dag en nacht voor je. We bouwen <b>overzichtelijke websites</b> die tonen wie je bent en bezoekers snel naar de juiste info leiden: van een online etalage voor een juwelier tot één site voor een school met drie vestigingen.",
           "Restaurants, winkels, scholen en bedrijven: elke site is <b>op maat</b> en werkt vlot op gsm."],
    disciplines:["Webdesign"] },
  { slug:"print-en-media", naam:"Print & media",
    titel:"Print en media voor bedrijven in Oost-Vlaanderen",
    kort:"Branding, advertenties en campagnes die opvallen, ook offline.",
    tekst:["Print werkt, als je het slim inzet. Denk aan <b>80.000 broodzakken</b> bij 80 bakkers om nieuwe collega's te vinden, of een <b>nieuwe branding</b> voor een garage.",
           "We ontwerpen <b>advertenties, folders, brochures en huisstijlen</b> en zoeken mee naar de juiste media om je boodschap bij de juiste mensen te krijgen."],
    disciplines:["Print", "Media & Print"] },
  { slug:"fotografie", naam:"Fotografie",
    titel:"Bedrijfsfotografie in Oost-Vlaanderen",
    kort:"Echte beelden van je mensen, je werk en je producten.",
    tekst:["Stockfoto's vertellen niet jouw verhaal. We organiseren <b>fotoshoots</b> van je mensen, je werkplek en je producten, samen met de fotograaf die bij de opdracht past.",
           "Zo heb je beelden voor je website, sociale media, vacatures en interne communicatie."],
    disciplines:["Fotografie"] }
];

/* VEELGESTELDE VRAGEN — [vraag, antwoord]. Staan op de pagina "Onze visie". */
const VRAGEN = [
  ["Wat doet Rocket?", "Rocket is een marketing- en communicatiepartner uit Lede. We gaan langs bij bedrijven, schuiven aan bij de marketingverantwoordelijke en kijken samen waar het beter en efficiënter kan. Daarnaast maken we video's, websites, drukwerk en fotografie, met een team van experts."],
  ["In welke regio werken jullie?", "Vooral in Oost-Vlaanderen. Rocket zit in Lede en werkt voor klanten van Aalst en de Denderstreek tot Gent en Wetteren. We komen graag bij je langs."],
  ["Werken jullie samen met onze eigen marketingverantwoordelijke?", "Ja, dat is net de bedoeling. We gaan naast je marketingverantwoordelijke zitten, kijken mee naar wat er loopt en zoeken samen waar je kan bijsturen, verbeteren of efficiënter werken."],
  ["Wie voert de projecten uit?", "Rocket werkt met een team van experts. Per project kiezen we de mensen die het best passen bij de opdracht, van filmmakers en fotografen tot ontwerpers en webbouwers."],
  ["Kan ik ook voor één project bij jullie terecht?", "Zeker. Een bedrijfsfilm, een animatievideo, een website, een fotoshoot of een advertentie: je kan ook voor één concreet project bij ons aankloppen."],
  ["Hoe beginnen we eraan?", "Met een gesprek. Bel +32 473 22 18 29, mail naar renaat@wearerocket.be of vul het contactformulier in. Dan komen we langs voor een koffie, of thee. Of alletwee."]
];

/* Contactformulier: adres van je formulierdienst (bv. Formspree). Leeg = het bericht opent kant-en-klaar in het mailprogramma van de bezoeker. */
const FORM_ENDPOINT = "";
