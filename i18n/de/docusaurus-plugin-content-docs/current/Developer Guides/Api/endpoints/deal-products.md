---
sidebar_label: "Deal-Produkte"
title: "Deal-Produkte"
sidebar_position: 5
---

# Deal-Produkte

Ein **Deal-Produkt** verbindet ein Produkt (aus dem Katalog — siehe [Produkte](./products)) mit einem Deal — inkl. einer bestimmten Menge und einem bestimmten Stückpreis. Preis und Produktname werden zum Zeitpunkt der Verknüpfung **eingefroren** (Snapshot), sodass spätere Änderungen am Katalog vergangene Deals nicht überschreiben.

## Ressourcenstruktur

| Attribut | Typ | Pflicht | Beispiel | Hinweise |
| --- | --- | --- | --- | --- |
| `product_id` | integer | Ja (beim Anlegen) | `10` | ID eines bestehenden Produkts. |
| `deal_id` | integer | Ja (beim Anlegen) | `25` | ID des Deals, der das Produkt erhält. |
| `quantity` | integer | Nein | `2` | Default `1`. |
| `unit_amount_in_cents` | integer | Nein | `5000` | Default = `amount_in_cents` des Produkts. |
| `product_name` | string | Nein | `Premium-Abo` | Snapshot. Default = Produktname. |
| `product_identifier` | string | Nein | `SKU-ABC-001` | Snapshot. Default = Produkt-Identifier. |

Alle nachfolgenden Endpoints gehen aus von:

```
{base_url} = https://app.woofedcrm.com
{account_id} = 1
```

---

## Deal-Produkt erstellen

`POST /api/v1/accounts/{account_id}/deal_products`

Hängt ein Produkt an einen Deal.

### Body

```json
{
  "product_id": 1,
  "deal_id": 1,
  "quantity": 2
}
```

### Beispiel-Request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deal_products" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer IHR_TOKEN_HIER" \
  -d '{
    "product_id": 1,
    "deal_id": 1,
    "quantity": 2
  }'
```

### Beispiel-Antwort — `201 Created`

```json
{
  "id": 17,
  "deal_id": 1,
  "product_id": 1,
  "quantity": 2,
  "unit_amount_in_cents": 1000035,
  "product_name": "Auto",
  "product_identifier": "SNS895SASXVDW",
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

### Antwortfelder

| Feld | Beschreibung |
| --- | --- |
| `id` | Numerische ID der Verknüpfung Deal-Produkt. |
| `unit_amount_in_cents` | Default vom Produkt, falls nicht übergeben. |
| `product_name`, `product_identifier` | Snapshots des Produkts zum Zeitpunkt der Verknüpfung. |

### Mögliche Fehler

| Status | Wann |
| --- | --- |
| `401` | Token fehlt oder ungültig. |
| `404` | Produkt oder Deal existiert in diesem Account nicht. |
| `422` | `product_id` / `deal_id` fehlt oder `quantity` ungültig. |

---

## Deal-Produkt abrufen

`GET /api/v1/accounts/{account_id}/deal_products/{id}`

Liest eine einzelne Deal-Produkt-Verknüpfung.

### Beispiel-Request

```bash
curl -X GET "https://app.woofedcrm.com/api/v1/accounts/1/deal_products/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer IHR_TOKEN_HIER"
```

### Beispiel-Antwort — `200 OK`

```json
{
  "id": 1,
  "deal_id": 1,
  "product_id": 1,
  "quantity": 1,
  "unit_amount_in_cents": 150000,
  "product_name": "Auto",
  "product_identifier": "CAR-15632",
  "created_at": "2025-01-12T18:21:03Z",
  "updated_at": "2025-01-12T18:21:03Z"
}
```

### Mögliche Fehler

| Status | Wann |
| --- | --- |
| `401` | Token fehlt oder ungültig. |
| `404` | Deal-Produkt nicht gefunden. |

---

## Deal-Produkt aktualisieren

`PUT /api/v1/accounts/{account_id}/deal_products/{id}`

Aktualisiert Menge, Stückpreis oder den Snapshot von Name/Identifier einer bestehenden Verknüpfung.

### Body

```json
{
  "quantity": 3,
  "unit_amount_in_cents": 150000,
  "product_name": "Auto",
  "product_identifier": "CAR-15632"
}
```

### Beispiel-Request

```bash
curl -X PUT "https://app.woofedcrm.com/api/v1/accounts/1/deal_products/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer IHR_TOKEN_HIER" \
  -d '{
    "quantity": 3,
    "unit_amount_in_cents": 150000
  }'
```

### Beispiel-Antwort — `200 OK`

```json
{
  "id": 1,
  "deal_id": 1,
  "product_id": 1,
  "quantity": 3,
  "unit_amount_in_cents": 150000,
  "product_name": "Auto",
  "product_identifier": "CAR-15632",
  "updated_at": "2025-01-20T11:42:18Z"
}
```

### Mögliche Fehler

| Status | Wann |
| --- | --- |
| `401` | Token fehlt oder ungültig. |
| `404` | Deal-Produkt nicht gefunden. |
| `422` | `quantity` oder `unit_amount_in_cents` ungültig. |
