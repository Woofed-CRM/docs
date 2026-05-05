---
sidebar_label: "Authentifizierung"
title: "Authentifizierung"
sidebar_position: 3
---

# Authentifizierung

Die Woofed CRM API authentifiziert jeden Request mit einem **JWT-Bearer-Token**. Es gibt nur einen Tokentyp — keine separaten "publishable"- oder "secret"-Keys, kein OAuth-Flow.

## So funktioniert's

1. Sie holen sich einen JWT-Token aus dem Admin-Panel — siehe Leitfaden [**Token abrufen**](./GeToken).
2. Sie tragen diesen Token im `Authorization`-Header jedes API-Requests ein:

```http
Authorization: Bearer IHR_TOKEN_HIER
```

3. Der Token identifiziert **den Benutzer**, in dessen Namen der Aufruf erfolgt — alle Berechtigungen, Audit-Logs und Eigentumsregeln verhalten sich also genau so, als hätte dieser Benutzer die Aktion in der UI ausgeführt.

:::caution Der Token ist eine Zugangsdaten
Ein Woofed-CRM-Token kann alle Daten lesen und ändern, die der zugehörige Benutzer sehen darf. Behandeln Sie ihn wie ein Passwort.
:::

## Token mitsenden

Der Header ist unabhängig von Sprache oder HTTP-Client immer gleich.

### curl

```bash
curl -X GET "https://app.woofedcrm.com/api/v1/accounts/1/contacts/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer IHR_TOKEN_HIER"
```

### JavaScript / fetch

```javascript
const res = await fetch(
  "https://app.woofedcrm.com/api/v1/accounts/1/contacts/1",
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.WOOFED_TOKEN}`,
    },
  }
);
```

### Node.js / axios

```javascript
import axios from "axios";

const woofed = axios.create({
  baseURL: "https://app.woofedcrm.com/api/v1/accounts/1",
  headers: {
    Authorization: `Bearer ${process.env.WOOFED_TOKEN}`,
    "Content-Type": "application/json",
  },
});

const { data } = await woofed.get("/contacts/1");
```

### Python / requests

```python
import os
import requests

headers = {
    "Authorization": f"Bearer {os.environ['WOOFED_TOKEN']}",
    "Content-Type": "application/json",
}

r = requests.get(
    "https://app.woofedcrm.com/api/v1/accounts/1/contacts/1",
    headers=headers,
)
r.raise_for_status()
print(r.json())
```

### Ruby / Net::HTTP

```ruby
require "net/http"
require "json"

uri = URI("https://app.woofedcrm.com/api/v1/accounts/1/contacts/1")
req = Net::HTTP::Get.new(uri)
req["Authorization"] = "Bearer #{ENV['WOOFED_TOKEN']}"
req["Content-Type"]  = "application/json"

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
puts JSON.parse(res.body)
```

## Häufige Authentifizierungsfehler

| Status | Bedeutung | Was prüfen |
| --- | --- | --- |
| `401 Unauthorized` | Token fehlt, ist falsch formatiert oder abgelaufen | Header lautet exakt `Authorization: Bearer <token>` (Leerzeichen nicht vergessen, keine Anführungszeichen um den Token, keine Whitespaces vor/nach). |
| `403 Forbidden` | Token gültig, aber Benutzer hat keinen Zugriff auf die Ressource | Der Token-Inhaber gehört zum richtigen Account und hat die nötigen Rechte. |
| `404 Not Found` | Falsche `account_id` in der URL oder Datensatz existiert nicht in diesem Account | Der Token gehört zu einem Benutzer aus demselben Account, der in der URL erscheint. |

## Sicherheits-Best-Practices

Diese Regeln schützen vor den häufigsten Token-Leaks.

- **Niemals einen Token in clientseitigem Code einbetten.** Browser, Mobile Apps und jeder Code, der zum Endgerät ausgeliefert wird, müssen **Ihr eigenes Backend** ansprechen, das dann mit serverseitig gehaltenem Token Woofed CRM aufruft.
- **Niemals Tokens in Git committen.** Verwenden Sie Umgebungsvariablen (`.env`-Dateien außerhalb der Versionskontrolle, Secret Manager, CI/CD-Secrets, …).
- **Pro Integration einen Token.** Wird ein Token geleakt, rotieren Sie nur diese eine Integration, ohne die anderen zu stören.
- **Token beim Offboarding rotieren.** Ein Token, der an einen Mitarbeitenden gebunden ist, sollte beim Ausscheiden neu erstellt werden.
- **Immer HTTPS.** Die API akzeptiert nur TLS-Verbindungen — erzwingen Sie HTTPS aber auch in jedem Service, der die Aufrufe durchreicht.
- **Nur Server-zu-Server.** Senden Sie den Token nicht an Dritte (Chatbots, No-Code-Plattformen, …), denen Sie nicht vollständig vertrauen.

:::tip Token speichern
Übliche Muster:
- **Backend-Anwendung** — eine Umgebungsvariable `WOOFED_TOKEN`, von Ihrer Runtime injiziert (Heroku, Render, Fly, Kubernetes-Secret, …).
- **n8n / Make / Zapier** — im "Credentials"-Speicher der Plattform ablegen, niemals als Klartext in einem Step.
- **Lokales Skript** — eine `.env`-Datei in `.gitignore` und mit einer Library wie `dotenv` laden.
:::

## Nächster Schritt

Sie sind bereit, jeden Endpoint aufzurufen. Lesen Sie weiter unter [**API-Struktur**](./api-structure) für Antwortformate und Fehlerbehandlung — oder springen Sie direkt zur [**Endpoint-Referenz**](./endpoints/contacts).
