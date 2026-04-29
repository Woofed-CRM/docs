---
sidebar_label: "Einführung"
title: "API-Einführung"
sidebar_position: 1
---

# Woofed CRM API

Willkommen bei der **Woofed CRM REST API**. Die API stellt dieselben Bausteine bereit, die Sie auch im Produkt selbst verwenden — Kontakte, Deals, Deal-Events, Produkte, Benutzer und Zuweisungen — damit Sie Woofed CRM in jedes System integrieren können, das HTTP spricht.

## Was ist die Woofed CRM API?

Die Woofed CRM API ist eine **HTTP/JSON-API im REST-Stil**. Jede Ressource hat eine stabile URL, jede Aktion erfolgt über ein Standard-HTTP-Verb (`GET`, `POST`, `PUT`, `DELETE`), und jeder Payload — eingehend wie ausgehend — ist **JSON**.

Wer schon mit den APIs von Stripe, Twilio oder GitHub gearbeitet hat, fühlt sich sofort heimisch: Die Konventionen sind dieselben.

## Was Sie damit tun können

- **Kontaktstamm synchronisieren** zwischen Woofed CRM und Ihrer Website, Landingpage, Werbeplattformen oder Marketing-Automation-Tools.
- **Deals automatisch erstellen und aktualisieren**, wenn ein Lead in einem anderen System konvertiert (Typeform, Checkout, Telefonat, etc.).
- **Notizen, Aktivitäten und Nachrichten** in den Deal-Verlauf einspielen (inkl. zeitgesteuerter WhatsApp-Nachrichten via Evolution API und Chatwoot-Konversationen).
- **Ihren Produktkatalog verwalten** und Produkte an Deals hängen, um den Deal-Wert automatisch zu berechnen.
- **Deals programmatisch zuweisen** — perfekt für Round-Robin-Lead-Verteilung, automatische SDR-Zuweisung oder Rebalancing beim Offboarding.
- **Jede Ressource durchsuchen** mit reichhaltigen Ransack-Stil-Prädikaten (`*_eq`, `*_cont`, `*_gteq`, …) — Dashboards, Exporte und Audits ohne UI-Scraping.

## Häufige Use Cases

| Szenario | Was Sie aufrufen |
| --- | --- |
| Neuer Lead von Ihrer Website | `POST /contacts` gefolgt von `POST /deals` |
| Nächtliche CRM-↔-ERP-Synchronisation | `POST /contacts/upsert`, `POST /deals/upsert` |
| Eigene "Meine Deals heute"-Sicht | `POST /deals/.../events` + `POST /contacts/search` |
| Follow-up per WhatsApp planen | `POST /deals/{id}/events` mit `kind: evolution_api_message` |
| Round-Robin-Verteilung | `POST /deal_assignees` |

## Konzepte, die Sie kennen sollten

Auch wenn diese Dokumentation kein API-Tiefenwissen voraussetzt, tauchen drei Begriffe überall auf:

- **REST** — jede Entität (Kontakt, Deal, …) liegt unter einer vorhersehbaren URL, und das HTTP-Verb sagt dem Server, was zu tun ist.
- **JSON** — sowohl Request-Bodies als auch Responses sind reines JSON. Senden Sie immer den Header `Content-Type: application/json`, wenn Sie einen Body haben.
- **Bearer-Token-Authentifizierung** — jeder Aufruf trägt ein JWT im `Authorization`-Header. Keine API-Keys, keine signierten URLs, kein OAuth-Tanz: nur ein Token.

Falls einer dieser Begriffe neu ist, führt Sie der [Erste Schritte](./getting-started)-Leitfaden Schritt für Schritt durch den ersten Aufruf.

## Wie dieser Abschnitt aufgebaut ist

1. [**Erste Schritte**](./getting-started) — Basis-URL, Ihr erster Request und der Aufbau einer Antwort.
2. [**Authentifizierung**](./authentication) — wie Sie den Bearer-Token senden, plus Sicherheits-Best-Practices.
3. [**Token abrufen**](./GeToken) — wie Sie Ihren JWT aus dem Admin-Panel holen.
4. [**API-Struktur**](./api-structure) — Request-/Response-Format, Statuscodes, Fehlerbehandlung und Suchprädikate.
5. [**Endpoints**](./endpoints/contacts) — eine Seite je Ressource, jeder Parameter dokumentiert, alle Beispiele kopier- und einsetzbar.

:::tip Postman-Collection
Die vollständige Postman-Collection, die als Quelle der Wahrheit für diese Dokumentation dient, finden Sie hier:
[Woofed CRM API — Postman-Workspace](https://www.postman.com/dark-shuttle-5185/workspace/woofed-crm-api/collection/905262-e0bb0d71-a634-4fa2-8b03-4ae4c6dde690)
:::
