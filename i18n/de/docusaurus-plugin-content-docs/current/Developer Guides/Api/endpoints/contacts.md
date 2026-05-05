---
sidebar_label: "Kontakte"
title: "Kontakte"
sidebar_position: 1
---

# Kontakte

Ein **Kontakt** ist eine Person in Woofed CRM. Kontakte können mit Deals verknüpft werden, beliebige Custom Attributes (Stadt, CPF, Quelle, …) tragen und mit Labels versehen werden.

## Ressourcenstruktur

| Attribut | Typ | Pflicht | Beispiel | Hinweise |
| --- | --- | --- | --- | --- |
| `full_name` | string | Nein | `John Doe` | Vollständiger Name. |
| `phone` | string | Nein | `+5511999999999` | E.164-Format empfohlen. |
| `email` | string | Nein | `john.doe@example.com` | Muss bei Angabe ein gültiges E-Mail-Format sein. |
| `label_list` | string \| array | Nein | `["customer","vip"]` | Tags. Komma-getrennter String oder Array. |
| `custom_attributes` | object | Nein | `{ "city": "RJ" }` | Freies JSON für Custom Fields. |

Alle nachfolgenden Endpoints gehen aus von:

```
{base_url} = https://app.woofedcrm.com
{account_id} = 1
```

---

## Kontakt erstellen

`POST /api/v1/accounts/{account_id}/contacts`

Erstellt einen neuen Kontakt im Account.

### Headers

| Header | Wert |
| --- | --- |
| `Content-Type` | `application/json` |
| `Authorization` | `Bearer IHR_TOKEN_HIER` |

### Path-Parameter

| Name | Typ | Pflicht | Beschreibung |
| --- | --- | --- | --- |
| `account_id` | integer | Ja | Account-Scope. |

### Body

```json
{
  "full_name": "Tim Maia",
  "phone": "+5541996910256",
  "email": "tim@maia.com",
  "custom_attributes": { "city": "RJ" },
  "label_list": ["label1", "label2"]
}
```

### Beispiel-Request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/contacts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer IHR_TOKEN_HIER" \
  -d '{
    "full_name": "Tim Maia",
    "phone": "+5541996910256",
    "email": "tim@maia.com",
    "custom_attributes": { "city": "RJ" },
    "label_list": ["label1", "label2"]
  }'
```

### Beispiel-Antwort — `201 Created`

```json
{
  "id": 12,
  "full_name": "Tim Maia",
  "phone": "+5541996910256",
  "email": "tim@maia.com",
  "custom_attributes": { "city": "RJ" },
  "additional_attributes": {},
  "app_type": null,
  "app_id": null,
  "account_id": 1,
  "label_list": ["label1", "label2"],
  "chatwoot_conversations_label_list": [],
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

### Antwortfelder

| Feld | Beschreibung |
| --- | --- |
| `id` | Numerische ID. In Folgeaufrufen verwenden. |
| `full_name`, `phone`, `email` | Die übertragenen Werte, normalisiert. |
| `label_list` | Tags als Array (auch wenn Sie sie als komma-getrennten String gesendet haben). |
| `custom_attributes` | Wird genauso zurückgegeben, wie übermittelt. |
| `created_at`, `updated_at` | ISO 8601 (UTC). |

### Mögliche Fehler

| Status | Wann |
| --- | --- |
| `401` | Token fehlt oder ungültig. |
| `422` | Ungültiges E-Mail-Format oder andere Validierungsregel verletzt. |

---

## Kontakte suchen

`POST /api/v1/accounts/{account_id}/contacts/search`

Sucht Kontakte mit einem `query`-Objekt im Ransack-Stil. Die vollständige Prädikatsliste finden Sie in [API-Struktur → Suche](../api-structure#suche).

### Body

```json
{
  "query": {
    "full_name_cont": "John Doe",
    "email_cont": "@example.com",
    "phone_cont": "+55",
    "created_at_gteq": "2025-01-01T00:00:00Z",
    "updated_at_lteq": "2025-01-31T23:59:59Z",
    "id_eq": 42
  }
}
```

### Beispiel-Request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/contacts/search" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer IHR_TOKEN_HIER" \
  -d '{
    "query": {
      "full_name_cont": "John",
      "email_cont": "@example.com"
    }
  }'
```

### Beispiel-Antwort — `200 OK`

```json
{
  "data": [
    {
      "id": 42,
      "full_name": "John Doe",
      "phone": "+5511999999999",
      "email": "john.doe@example.com",
      "custom_attributes": { "city": "RJ" },
      "additional_attributes": {},
      "app_type": null,
      "app_id": null,
      "created_at": "2025-01-12T18:21:03Z",
      "updated_at": "2025-01-12T18:21:03Z",
      "account_id": 1,
      "label_list": ["vip"],
      "chatwoot_conversations_label_list": []
    }
  ],
  "pagination": {
    "page": 1,
    "items": 1,
    "count": 1,
    "pages": 1,
    "from": 1,
    "last": 1,
    "to": 1,
    "prev": null,
    "next": null
  }
}
```

### Mögliche Fehler

| Status | Wann |
| --- | --- |
| `400` | JSON-Body ungültig. |
| `401` | Token fehlt oder ungültig. |
| `422` | Unbekanntes Prädikat oder nicht durchsuchbares Feld. |

---

## Kontakt abrufen

`GET /api/v1/accounts/{account_id}/contacts/{id}`

Liest einen einzelnen Kontakt per ID.

### Path-Parameter

| Name | Typ | Pflicht | Beschreibung |
| --- | --- | --- | --- |
| `account_id` | integer | Ja | Account-Scope. |
| `id` | integer | Ja | Kontakt-ID. |

### Beispiel-Request

```bash
curl -X GET "https://app.woofedcrm.com/api/v1/accounts/1/contacts/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer IHR_TOKEN_HIER"
```

### Beispiel-Antwort — `200 OK`

Die Antwort enthält außerdem die zum Kontakt gehörenden **Deals** und **Events**.

```json
{
  "id": 1,
  "full_name": "Tim Maia",
  "phone": "+5541996910256",
  "email": "tim@maia.com",
  "custom_attributes": { "city": "RJ" },
  "additional_attributes": {},
  "app_type": null,
  "app_id": null,
  "account_id": 1,
  "label_list": ["label1", "label2"],
  "chatwoot_conversations_label_list": [],
  "created_at": "2025-01-12T18:21:03Z",
  "updated_at": "2025-01-12T18:21:03Z",
  "deals": [
    {
      "id": 1,
      "name": "Test Deal",
      "status": "open",
      "stage_id": 1,
      "contact_id": 1,
      "custom_attributes": {},
      "created_at": "2025-01-12T18:21:05Z",
      "updated_at": "2025-01-12T18:21:05Z",
      "pipeline_id": 2,
      "position": 1,
      "created_by_id": null,
      "total_deal_products_amount_in_cents": 0,
      "lost_at": null,
      "won_at": null,
      "lost_reason": "",
      "account_id": 1
    }
  ],
  "events": [
    {
      "id": 1,
      "deal_id": 1,
      "contact_id": 1,
      "app_type": null,
      "app_id": null,
      "kind": "deal_opened",
      "scheduled_at": null,
      "done_at": "2025-01-12T18:21:06Z",
      "from_me": true,
      "status": null,
      "custom_attributes": {},
      "additional_attributes": {
        "stage_id": 1,
        "deal_name": "Test Deal",
        "stage_name": "Stage 1",
        "pipeline_id": 2,
        "pipeline_name": "sales"
      },
      "created_at": "2025-01-12T18:21:06Z",
      "updated_at": "2025-01-12T18:21:06Z",
      "title": "",
      "auto_done": false,
      "account_id": 1,
      "done": true,
      "send_now": null,
      "files": [],
      "files_events": [],
      "invalid_files": null
    },
    {
      "id": 2,
      "deal_id": 1,
      "contact_id": 1,
      "app_type": null,
      "app_id": null,
      "kind": "activity",
      "scheduled_at": null,
      "done_at": null,
      "from_me": null,
      "status": null,
      "custom_attributes": {},
      "additional_attributes": {},
      "created_at": "2025-01-12T18:21:07Z",
      "updated_at": "2025-01-12T18:21:08Z",
      "title": "Test Event",
      "auto_done": false,
      "account_id": 1,
      "done": false,
      "send_now": null,
      "files": [],
      "files_events": [],
      "invalid_files": null
    }
  ]
}
```

### Mögliche Fehler

| Status | Wann |
| --- | --- |
| `401` | Token fehlt oder ungültig. |
| `404` | Kontakt in diesem Account nicht gefunden. |

---

## Kontakt-Upsert

`POST /api/v1/accounts/{account_id}/contacts/upsert`

**Erstellt** den Kontakt, falls kein Match im Account existiert, sonst **aktualisiert** den vorhandenen. Match-Schlüssel sind typischerweise `email` und/oder `phone` — wird einer übergeben, sucht die API einen Kontakt mit demselben Wert im Account.

Das ist der Endpoint der Wahl für nächtliche Sync-Jobs.

### Body

```json
{
  "full_name": "Tim Maia",
  "phone": "+5541996910256",
  "email": "tim@maia.com",
  "custom_attributes": { "city": "RJ" },
  "label_list": ["label1", "label2"]
}
```

### Beispiel-Request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/contacts/upsert" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer IHR_TOKEN_HIER" \
  -d '{
    "full_name": "Tim Maia",
    "phone": "+5541996910256",
    "email": "tim@maia.com",
    "custom_attributes": { "city": "RJ" },
    "label_list": ["label1", "label2"]
  }'
```

### Beispiel-Antwort — `200 OK` (aktualisiert) oder `201 Created` (neu)

```json
{
  "id": 12,
  "full_name": "Tim Maia",
  "phone": "+5541996910256",
  "email": "tim@maia.com",
  "custom_attributes": { "city": "RJ" },
  "additional_attributes": {},
  "app_type": null,
  "app_id": null,
  "account_id": 1,
  "label_list": ["label1", "label2"],
  "chatwoot_conversations_label_list": [],
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-20T11:42:18Z"
}
```

### Mögliche Fehler

| Status | Wann |
| --- | --- |
| `401` | Token fehlt oder ungültig. |
| `422` | Validierungsfehler (ungültige E-Mail, Konflikt bei Unique-Feldern, …). |

---

## Kontakt löschen

`DELETE /api/v1/accounts/{account_id}/contacts/{id}`

Entfernt einen Kontakt und alle Verknüpfungen dauerhaft. **Nicht umkehrbar.**

### Path-Parameter

| Name | Typ | Pflicht | Beschreibung |
| --- | --- | --- | --- |
| `account_id` | integer | Ja | Account-Scope. |
| `id` | integer | Ja | Kontakt-ID. |

### Beispiel-Request

```bash
curl -X DELETE "https://app.woofedcrm.com/api/v1/accounts/1/contacts/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer IHR_TOKEN_HIER"
```

### Beispiel-Antwort — `204 No Content`

Es wird kein Body zurückgegeben.

### Mögliche Fehler

| Status | Wann |
| --- | --- |
| `401` | Token fehlt oder ungültig. |
| `404` | Kontakt in diesem Account nicht gefunden. |
