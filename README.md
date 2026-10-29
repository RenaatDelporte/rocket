# Rocket – website

De website van Rocket (wearerocket.be).

## Hoe het werkt

- De bronbestanden staan in de map `site/`. Elke wijziging op `main` zet de site automatisch online (Actions → **Website publiceren**).
- **Inhoud aanpassen** doe je in `site/inhoud.js`: de header, de projecten, de klanten en het contactformulier. De rest van de site hoef je niet aan te raken.
- **Nieuw project toevoegen:** zet de foto's in `site/img/projecten/` (bv. `klantnaam-1.jpg`, `klantnaam-2.jpg`) en plak een nieuw blok bovenaan de lijst `CASES` in `inhoud.js`. Bovenaan = eerste tegel.
  Elk project krijgt automatisch een eigen pagina: `wearerocket.be/portfolio/<slug>/`.
- **Film bij een project:** zet de Vimeo-link bij `video`. De film speelt dan af op de projectpagina. Met `duur` ("1:19") en `datum` ("2024-02-06") weten zoekmachines ook hoe lang de film is en wanneer hij verscheen.
- **Klantenlogo's** staan in `site/img/klanten/` en in de lijst `KLANTEN`.
- **Screenshot van een website:** zet een regel in `scripts/schermen.txt` (naam, tab, adres). Bij de volgende publicatie maakt GitHub een computer- en gsm-screenshot in `site/img/schermen/`.

## Wat er bij het publiceren gebeurt

`scripts/bouw.mjs` maakt van `site/` een echte website in de map `dist/` (die map staat niet in de repository):

- een aparte HTML-pagina per project, voor *Onze visie* en voor *Contact*, met de tekst al in de pagina (goed voor Google en AI-zoekmachines);
- per pagina een eigen titel, beschrijving, canonieke link en deelbeeld (Open Graph) voor sociale media;
- gestructureerde gegevens (JSON-LD): Rocket als bedrijf met adres en contactgegevens, elk project als creatief werk of video, en broodkruimels;
- `sitemap.xml`, `robots.txt`, `llms.txt` (een samenvatting voor AI-assistenten) en een `404.html`.

Lokaal testen: `node scripts/bouw.mjs` en open `dist/index.html` via een kleine webserver (bv. `npx serve dist`).

## Beelden van de oude website

`scripts/beelden.txt` somt de beelden op die nog van de oude WordPress-site (en Vimeo) komen.
Bij elke publicatie haalt `scripts/beelden_ophalen.py` wat nog ontbreekt op, zet het in webformaat en bewaart het in de repository.
Zo blijft alles werken, ook als de oude site verdwijnt.

## Hosting

- **Nu:** GitHub Pages (Settings → Pages → Source: *GitHub Actions*).
- **Domein wearerocket.be koppelen:**
  1. Settings → Pages → Custom domain: `wearerocket.be` → Save.
  2. Bij de domeinbeheerder, in de DNS van wearerocket.be:
     - `wearerocket.be`: vervang de A-records door `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (en verwijder eventuele AAAA-records).
     - `www.wearerocket.be`: CNAME naar `renaatdelporte.github.io`.
     - Laat de MX- en TXT-records staan: die zijn voor je e-mail.
  3. Zodra GitHub het domein herkent: vink *Enforce HTTPS* aan.
- Zeg het oude hostingpakket pas op als je zeker bent dat je e-mail daar niet op draait.
- **Na de verhuis:** voeg de site toe in [Google Search Console](https://search.google.com/search-console) en dien `https://wearerocket.be/sitemap.xml` in.
