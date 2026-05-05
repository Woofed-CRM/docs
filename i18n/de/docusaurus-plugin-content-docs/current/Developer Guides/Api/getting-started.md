---
sidebar_label: "Erste Schritte"
title: "Erste Schritte"
sidebar_position: 2
---

# Erste Schritte

Diese Seite bringt Sie in unter fünf Minuten von Null zum ersten erfolgreichen API-Aufruf.

## 1. Basis-URL

Alle Anfragen gehen an die Woofed CRM Cloud (oder an Ihre selbst gehostete Instanz):

```
https://app.woofedcrm.com
```

Bei einer **selbst gehosteten** Installation ersetzen Sie diesen Host durch Ihre eigene Domain (z. B. `https://crm.ihrunternehmen.com`). Die Pfadstruktur (`/api/v1/accounts/{account_id}/...`) ist in beiden Fällen identisch.

## 2. Account-ID

Jeder Endpoint ist auf einen Account beschränkt, daher enthält die URL immer Ihre Account-ID:

```
/api/v1/accounts/{account_id}/<resource>
```

Sie finden Ihre `account_id` in der URL des Woofed-CRM-Dashboards, direkt nach `/app/`. In den meisten Installationen ist der erste Account `1`.

## 3. Authentifizierung in einer Zeile

Jeder Request muss einen Bearer-Token im `Authorization`-Header tragen:

```http
Authorization: Bearer IHR_TOKEN_HIER
```

Falls Sie noch keinen Token haben, folgen Sie zuerst dem kurzen Leitfaden [**Token abrufen**](./GeToken). Die Sicherheitsdetails finden Sie unter [**Authentifizierung**](./authentication).

## 4. Ihr erster Request

Holen wir uns einen einzelnen Kontakt (vorausgesetzt, in Account `1` existiert ein Kontakt mit der ID `1`):

```bash
curl -X GET "https://app.woofedcrm.com/api/v1/accounts/1/contacts/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer IHR_TOKEN_HIER"
```

Derselbe Aufruf in JavaScript:

```javascript
const res = await fetch(
  "https://app.woofedcrm.com/api/v1/accounts/1/contacts/1",
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer IHR_TOKEN_HIER",
    },
  }
);

const contact = await res.json();
console.log(contact);
```

Eine erfolgreiche Antwort ist reines JSON, das den Kontakt beschreibt:

```json
{
  "id": 1,
  "full_name": "Tim Maia",
  "phone": "+5541996910256",
  "email": "tim@maia.com",
  "custom_attributes": {
    "city": "RJ"
  },
  "label_list": ["label1", "label2"],
  "created_at": "2025-01-12T18:21:03Z",
  "updated_at": "2025-01-12T18:21:03Z"
}
```

Fertig — Sie sprechen mit Woofed CRM.

## 5. Empfohlene Tools

Während der Entwicklung sparen folgende Tools viel Zeit:

- **[Postman](https://www.postman.com/)** — die [offizielle Woofed-CRM-Postman-Collection](https://www.postman.com/dark-shuttle-5185/workspace/woofed-crm-api/collection/905262-e0bb0d71-a634-4fa2-8b03-4ae4c6dde690) bringt alle Endpoints vorkonfiguriert mit. Setzen Sie einfach die Collection-Variablen `endpoint`, `account_id` und `token`.
- **`curl`** — perfekt für Skripte, Debugging und zum Einfügen in diese Doku.
- **HTTPie** — freundlichere Syntax als curl: `http GET https://app.woofedcrm.com/... "Authorization: Bearer …"`.
- **Browser DevTools** — der **Network**-Tab zeigt genau, was Ihr Frontend sendet, wenn Sie aus einer SPA integrieren.

## 6. Aufbau einer Antwort

Die meisten Antworten folgen derselben Grundstruktur:

```json
{
  "id": 42,
  "name": "Lead site: Rubel",
  "status": "open",
  "stage_id": 1,
  "contact_id": 1,
  "custom_attributes": { "source": "Website" },
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

Das Wichtigste:

- **`id`** — jeder Datensatz hat eine numerische, accountbezogene ID. Über sie sprechen Sie den Datensatz in Folgeaufrufen an (`GET /deals/42`, `PUT /deals/42`, …).
- **Zeitstempel** — `created_at` und `updated_at` sind ISO 8601 in UTC.
- **`custom_attributes`** — ein freies JSON-Objekt. Verwenden Sie es für Felder, die es nicht als native Spalten gibt (`source`, `cpf`, `priority`, …).
- **HTTP-Statuscode** — `2xx` für Erfolg, `4xx` für Client-Fehler, `5xx` für Server-Fehler. Komplette Liste unter [API-Struktur → Statuscodes](./api-structure#statuscodes).

## Wie geht es weiter?

Sie haben jetzt alles, um jeden Aufruf in dieser Doku zum Laufen zu bringen. Weiter mit:

- [**Authentifizierung**](./authentication) für Sicherheits-Best-Practices.
- [**API-Struktur**](./api-structure) für Statuscodes, Fehlerbehandlung und Suchsyntax.
- [**Endpoints**](./endpoints/contacts) für die vollständige Referenz.
