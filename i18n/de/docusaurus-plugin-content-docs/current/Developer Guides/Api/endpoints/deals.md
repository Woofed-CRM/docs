---
sidebar_label: "Deals"
title: "Deals"
sidebar_position: 2
---

# Deals

Ein **Deal** ist eine Verkaufschance in einer Pipeline. Er gehört zu einem Kontakt, befindet sich in einer bestimmten Stage und trägt einen Status (`open`, `won`, `lost`).

## Ressourcenstruktur

| Attribut | Typ | Pflicht | Beispiel | Hinweise |
| --- | --- | --- | --- | --- |
| `name` | string | Nein | `Deal mit John` | Deal-Titel. |
| `status` | string | Nein | `open` | Default `open`. Übliche Werte: `open`, `won`, `lost`. |
| `stage_id` | integer | Ja | `3` | Stage des Deals. |
| `pipeline_id` | integer | Nein | `1` | Muss zur Pipeline der `stage_id` passen. |
| `contact_id` | integer | Ja | `42` | Mit dem Deal verknüpfter Kontakt. |
| `position` | integer | Nein | `2` | Position innerhalb der Stage (Kanban-Reihenfolge). |
| `lost_reason` | string | Nein | `Preis zu hoch` | Grund, wenn `status = lost`. |
| `lost_at` | datetime (UTC) | Nein | `2025-01-15T10:30:00Z` | Muss UTC sein. |
| `won_at` | datetime (UTC) | Nein | `2025-01-20T14:00:00Z` | Muss UTC sein. |
| `custom_attributes` | object | Nein | `{ "source": "Website" }` | Freie Custom Fields. |
| `contact_attributes` | object | Nein | `{ "id": 42, "full_name": "John" }` | Bei `upsert`: findet einen passenden Kontakt oder legt einen neuen an und verknüpft ihn mit dem Deal. |

Alle nachfolgenden Endpoints gehen aus von:

```
{base_url} = https://app.woofedcrm.com
{account_id} = 1
```

---

## Deal erstellen

`POST /api/v1/accounts/{account_id}/deals`

Erstellt einen neuen Deal im Account.

### Body

```json
{
  "name": "Lead site: Rubel",
  "status": "open",
  "stage_id": 1,
  "contact_id": 1,
  "custom_attributes": {
    "source": "Website",
    "campaign": "Google Ads",
    "utm_medium": "cpc",
    "utm_source": "google",
    "priority": "high",
    "estimated_budget": 15000
  }
}
```

### Beispiel-Request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer IHR_TOKEN_HIER" \
  -d '{
    "name": "Lead site: Rubel",
    "status": "open",
    "stage_id": 1,
    "contact_id": 1,
    "custom_attributes": {
      "source": "Website",
      "campaign": "Google Ads"
    }
  }'
```

### Beispiel-Antwort — `201 Created`

```json
{
  "id": 27,
  "name": "Lead site: Rubel",
  "status": "open",
  "stage_id": 1,
  "pipeline_id": 1,
  "contact_id": 1,
  "position": 1,
  "created_by_id": 5,
  "total_deal_products_amount_in_cents": 0,
  "lost_at": null,
  "won_at": null,
  "lost_reason": "",
  "account_id": 1,
  "custom_attributes": {
    "source": "Website",
    "campaign": "Google Ads"
  },
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

### Antwortfelder

| Feld | Beschreibung |
| --- | --- |
| `id` | Numerische Deal-ID. |
| `pipeline_id` | Wird aus `stage_id` abgeleitet, wenn weggelassen. |
| `position` | Reihenfolge in der Stage (Kanban). |
| `custom_attributes` | Wird wie übermittelt zurückgegeben. |

### Mögliche Fehler

| Status | Wann |
| --- | --- |
| `401` | Token fehlt oder ungültig. |
| `422` | `stage_id` oder `contact_id` fehlt/ungültig, oder Pipeline-Mismatch. |

---

## Deals suchen

`POST /api/v1/accounts/{account_id}/deals/search`

Sucht Deals mit einem `query`-Objekt im Ransack-Stil. Die vollständige Prädikatsliste finden Sie in [API-Struktur → Suche](../api-structure#suche).

### Body

```json
{
  "query": {
    "name_cont": "Rubel",
    "status_eq": "open",
    "stage_id_eq": 1,
    "pipeline_id_eq": 1,
    "contact_id_eq": 42,
    "created_at_gteq": "2025-01-01T00:00:00Z",
    "updated_at_lteq": "2025-01-31T23:59:59Z",
    "id_eq": 27
  }
}
```

### Beispiel-Request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals/search" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer IHR_TOKEN_HIER" \
  -d '{
    "query": {
      "name_cont": "Rubel",
      "status_eq": "open"
    }
  }'
```

### Beispiel-Antwort — `200 OK`

```json
{
  "data": [
    {
      "id": 27,
      "name": "Lead site: Rubel",
      "status": "open",
      "stage_id": 1,
      "contact_id": 1,
      "custom_attributes": { "source": "Website" },
      "created_at": "2025-01-12T18:21:03Z",
      "updated_at": "2025-01-12T18:21:03Z",
      "pipeline_id": 1,
      "position": 1,
      "created_by_id": null,
      "total_deal_products_amount_in_cents": 0,
      "lost_at": null,
      "won_at": null,
      "lost_reason": "",
      "account_id": 1
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

## Deal abrufen

`GET /api/v1/accounts/{account_id}/deals/{id}`

Liest einen einzelnen Deal per ID.

### Beispiel-Request

```bash
curl -X GET "https://app.woofedcrm.com/api/v1/accounts/1/deals/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer IHR_TOKEN_HIER"
```

### Beispiel-Antwort — `200 OK`

Die Antwort enthält außerdem den zum Deal gehörenden **Contact**, **Stage**, **Pipeline**, die **deal_assignees** und **deal_products**.

```json
{
  "id": 1,
  "name": "Lead site: Rubel",
  "status": "open",
  "stage_id": 1,
  "contact_id": 1,
  "custom_attributes": { "source": "Website" },
  "created_at": "2025-01-12T18:21:03Z",
  "updated_at": "2025-01-12T18:21:03Z",
  "pipeline_id": 1,
  "position": 1,
  "created_by_id": null,
  "total_deal_products_amount_in_cents": 0,
  "lost_at": null,
  "won_at": null,
  "lost_reason": "",
  "account_id": 1,
  "contact": {
    "id": 1,
    "full_name": "Tim Maia",
    "phone": "+555678606681",
    "email": "sabina.lockman@robel.example",
    "custom_attributes": {},
    "additional_attributes": {},
    "app_type": null,
    "app_id": null,
    "created_at": "2025-01-12T18:21:00Z",
    "updated_at": "2025-01-12T18:21:00Z",
    "account_id": 1,
    "label_list": [],
    "chatwoot_conversations_label_list": []
  },
  "stage": {
    "id": 1,
    "name": "Stage 1",
    "pipeline_id": 1,
    "position": 1,
    "created_at": "2025-01-12T18:20:50Z",
    "updated_at": "2025-01-12T18:20:50Z",
    "account_id": 1
  },
  "pipeline": {
    "id": 1,
    "name": "sales",
    "created_at": "2025-01-12T18:20:45Z",
    "updated_at": "2025-01-12T18:20:46Z",
    "account_id": 1
  },
  "deal_assignees": [
    {
      "id": 2,
      "deal_id": 1,
      "user_id": 9,
      "created_at": "2025-01-12T18:21:05Z",
      "updated_at": "2025-01-12T18:21:05Z",
      "account_id": 1
    }
  ],
  "deal_products": [
    {
      "id": 1,
      "product_id": 4,
      "deal_id": 1,
      "created_at": "2025-01-12T18:21:06Z",
      "updated_at": "2025-01-12T18:21:06Z",
      "unit_amount_in_cents": 0,
      "product_identifier": "",
      "product_name": "",
      "total_amount_in_cents": 0,
      "quantity": 1,
      "account_id": 1
    }
  ]
}
```

### Mögliche Fehler

| Status | Wann |
| --- | --- |
| `401` | Token fehlt oder ungültig. |
| `404` | Deal in diesem Account nicht gefunden. |

---

## Deal aktualisieren

`PUT /api/v1/accounts/{account_id}/deals/{id}`

Aktualisiert einen bestehenden Deal. Sie können beliebige Teilmengen von Feldern ändern; weggelassene Felder bleiben unverändert.

### Body

```json
{
  "name": "Lead site: Rubel (Lost)",
  "status": "lost",
  "stage_id": 2,
  "lost_reason": "Preis zu hoch",
  "lost_at": "2025-01-18T16:45:00Z",
  "custom_attributes": {
    "source": "Website",
    "competitor": "Wettbewerber X",
    "final_offer_value": 12000
  }
}
```

### Beispiel-Request

```bash
curl -X PUT "https://app.woofedcrm.com/api/v1/accounts/1/deals/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer IHR_TOKEN_HIER" \
  -d '{
    "status": "lost",
    "lost_reason": "Preis zu hoch",
    "lost_at": "2025-01-18T16:45:00Z"
  }'
```

### Beispiel-Antwort — `200 OK`

```json
{
  "id": 1,
  "name": "Lead site: Rubel (Lost)",
  "status": "lost",
  "stage_id": 2,
  "pipeline_id": 1,
  "contact_id": 1,
  "position": 1,
  "created_by_id": 5,
  "total_deal_products_amount_in_cents": 0,
  "lost_at": "2025-01-18T16:45:00Z",
  "won_at": null,
  "lost_reason": "Preis zu hoch",
  "account_id": 1,
  "updated_at": "2025-01-18T16:45:00Z"
}
```

### Mögliche Fehler

| Status | Wann |
| --- | --- |
| `401` | Token fehlt oder ungültig. |
| `404` | Deal nicht gefunden. |
| `422` | Validierungsfehler (z. B. ungültiger `status`, Mismatch zwischen `stage_id` und `pipeline_id`, `lost_at` ungültig). |

---

## Deal-Upsert

`POST /api/v1/accounts/{account_id}/deals/upsert`

Erstellt den Deal, falls kein Match existiert, sonst aktualisiert den vorhandenen. Praktisch für die Synchronisation aus Fremdsystemen.

Wird `contact_attributes` mitgegeben, sucht die API einen passenden Kontakt; existiert keiner, wird ein neuer angelegt und verknüpft.

### Body

```json
{
  "stage_id": 1,
  "pipeline_id": 1,
  "name": "Lead site: Rubel",
  "contact_id": 1,
  "status": "open",
  "custom_attributes": { "CPF": "123456789-87" }
}
```

### Beispiel-Request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals/upsert" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer IHR_TOKEN_HIER" \
  -d '{
    "stage_id": 1,
    "pipeline_id": 1,
    "name": "Lead site: Rubel",
    "contact_id": 1,
    "status": "open",
    "custom_attributes": { "CPF": "123456789-87" }
  }'
```

### Beispiel-Antwort — `200 OK` (aktualisiert) oder `201 Created` (neu)

```json
{
  "id": 27,
  "stage_id": 1,
  "pipeline_id": 1,
  "name": "Lead site: Rubel",
  "contact_id": 1,
  "status": "open",
  "position": 1,
  "created_by_id": 5,
  "total_deal_products_amount_in_cents": 0,
  "lost_at": null,
  "won_at": null,
  "lost_reason": "",
  "account_id": 1,
  "custom_attributes": { "CPF": "123456789-87" },
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-20T11:42:18Z"
}
```

### Mögliche Fehler

| Status | Wann |
| --- | --- |
| `401` | Token fehlt oder ungültig. |
| `422` | Pipeline-/Stage-Mismatch oder Pflichtfeld fehlt. |

---

## Verwandte Endpoints

- [**Deal-Events**](./deal-events) — Notizen, Aktivitäten und geplante WhatsApp-/Chatwoot-Nachrichten an einen Deal anhängen.
- [**Deal-Produkte**](./deal-products) — Produkte an einen Deal hängen.
- [**Deal-Zuweisungen**](./deal-assignees) — Deals an Benutzer zuweisen.
