---
sidebar_label: "Produkte"
title: "Produkte"
sidebar_position: 4
---

# Produkte

Ein **Produkt** ist alles, was Sie verkaufen — ein SaaS-Plan, ein physisches Produkt, eine Dienstleistung. Produkte leben im Account-Katalog und können über [**Deal-Produkte**](./deal-products) an Deals geheftet werden, um den Deal-Wert zu berechnen.

## Ressourcenstruktur

| Attribut | Typ | Pflicht | Beispiel | Hinweise |
| --- | --- | --- | --- | --- |
| `identifier` | string | Nein | `SKU-ABC-001` | SKU oder eindeutiger Code. Default leer. |
| `name` | string | Nein | `Premium-Abo` | Default leer. |
| `description` | string | Nein | `Jährliches Premium-Abo mit allen Funktionen.` | |
| `amount_in_cents` | integer | Nein | `19900` | Preis in Cent (`19900` = 199,00 €). Default `0`. |
| `quantity_available` | integer | Nein | `100` | Lagerbestand. Default `0`. |
| `custom_attributes` | object | Nein | `{ "category": "Software" }` | Freie Custom Fields. |

Alle nachfolgenden Endpoints gehen aus von:

```
{base_url} = https://app.woofedcrm.com
{account_id} = 1
```

---

## Produkt abrufen

`GET /api/v1/accounts/{account_id}/products/{id}`

Liest ein einzelnes Produkt per ID.

### Beispiel-Request

```bash
curl -X GET "https://app.woofedcrm.com/api/v1/accounts/1/products/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer IHR_TOKEN_HIER"
```

### Beispiel-Antwort — `200 OK`

```json
{
  "id": 1,
  "identifier": "SNS895SASXVDW",
  "name": "Auto",
  "description": "Schönes Auto",
  "amount_in_cents": 1000035,
  "quantity_available": 2,
  "custom_attributes": { "number_of_doors": "4" },
  "created_at": "2025-01-12T18:21:03Z",
  "updated_at": "2025-01-12T18:21:03Z"
}
```

### Mögliche Fehler

| Status | Wann |
| --- | --- |
| `401` | Token fehlt oder ungültig. |
| `404` | Produkt nicht gefunden. |

---

## Produkt erstellen

`POST /api/v1/accounts/{account_id}/products`

Erstellt ein neues Produkt im Katalog.

### Body

```json
{
  "identifier": "SNS895SASXVDW",
  "amount_in_cents": 1000035,
  "quantity_available": 2,
  "description": "Schönes Auto",
  "name": "Auto",
  "custom_attributes": { "number_of_doors": "4" }
}
```

### Beispiel-Request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/products" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer IHR_TOKEN_HIER" \
  -d '{
    "identifier": "SNS895SASXVDW",
    "amount_in_cents": 1000035,
    "quantity_available": 2,
    "description": "Schönes Auto",
    "name": "Auto",
    "custom_attributes": { "number_of_doors": "4" }
  }'
```

### Beispiel-Antwort — `201 Created`

```json
{
  "id": 7,
  "identifier": "SNS895SASXVDW",
  "name": "Auto",
  "description": "Schönes Auto",
  "amount_in_cents": 1000035,
  "quantity_available": 2,
  "custom_attributes": { "number_of_doors": "4" },
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

### Mögliche Fehler

| Status | Wann |
| --- | --- |
| `401` | Token fehlt oder ungültig. |
| `422` | Validierungsfehler. |

---

## Produkte suchen

`POST /api/v1/accounts/{account_id}/products/search`

Sucht Produkte mit einem `query`-Objekt im Ransack-Stil. Prädikatsliste in [API-Struktur → Suche](../api-structure#suche).

### Body

```json
{
  "query": {
    "identifier_eq": "SKU-12345",
    "name_cont": "Auto",
    "description_cont": "elektrisch",
    "amount_in_cents_gteq": 1000,
    "quantity_available_gt": 0,
    "created_at_gteq": "2025-01-01T00:00:00Z",
    "updated_at_lteq": "2025-01-31T23:59:59Z"
  }
}
```

### Beispiel-Request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/products/search" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer IHR_TOKEN_HIER" \
  -d '{
    "query": {
      "name_cont": "Auto",
      "amount_in_cents_gteq": 1000
    }
  }'
```

### Beispiel-Antwort — `200 OK`

```json
[
  {
    "id": 7,
    "identifier": "SNS895SASXVDW",
    "name": "Auto",
    "amount_in_cents": 1000035,
    "quantity_available": 2,
    "custom_attributes": { "number_of_doors": "4" }
  }
]
```

### Mögliche Fehler

| Status | Wann |
| --- | --- |
| `400` | JSON-Body ungültig. |
| `401` | Token fehlt oder ungültig. |
| `422` | Unbekanntes Prädikat oder nicht durchsuchbares Feld. |

---

## Produkt aktualisieren

`PUT /api/v1/accounts/{account_id}/products/{id}`

Aktualisiert ein bestehendes Produkt. Beliebige Felder änderbar; ausgelassene bleiben unverändert.

### Body

```json
{
  "identifier": "PROD-123",
  "amount_in_cents": 150099,
  "quantity_available": 2,
  "description": "Auto-Beschreibung",
  "name": "Auto",
  "custom_attributes": { "number_of_doors": "4" }
}
```

### Beispiel-Request

```bash
curl -X PUT "https://app.woofedcrm.com/api/v1/accounts/1/products/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer IHR_TOKEN_HIER" \
  -d '{
    "amount_in_cents": 150099,
    "quantity_available": 2
  }'
```

### Beispiel-Antwort — `200 OK`

```json
{
  "id": 1,
  "identifier": "PROD-123",
  "name": "Auto",
  "description": "Auto-Beschreibung",
  "amount_in_cents": 150099,
  "quantity_available": 2,
  "custom_attributes": { "number_of_doors": "4" },
  "updated_at": "2025-01-20T11:42:18Z"
}
```

### Mögliche Fehler

| Status | Wann |
| --- | --- |
| `401` | Token fehlt oder ungültig. |
| `404` | Produkt nicht gefunden. |
| `422` | Validierungsfehler. |
