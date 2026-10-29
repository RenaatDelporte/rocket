# Rocket – website

De website van Rocket (wearerocket.be).

## Hoe het werkt

- Alles staat in de map `site/`. Elke wijziging op `main` zet de site automatisch online (Actions → **Website publiceren**).
- **Inhoud aanpassen** doe je in `site/inhoud.js`: de header, de projecten, de klanten en het contactformulier. De rest van de site hoef je niet aan te raken.
- **Nieuw project toevoegen:** zet de foto's in `site/img/projecten/` (bv. `klantnaam-1.jpg`, `klantnaam-2.jpg`) en plak een nieuw blok bovenaan de lijst `CASES` in `inhoud.js`. Bovenaan = eerste tegel.
- **Film bij een project:** zet de Vimeo-link bij `video`. De film speelt dan af op de projectpagina.
- **Klantenlogo's** staan in `site/img/klanten/` en in de lijst `KLANTEN`.

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
