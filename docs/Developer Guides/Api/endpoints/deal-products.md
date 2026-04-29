---
sidebar_label: "Deal products"
title: "Deal products"
sidebar_position: 5
---

# Deal products

A **deal product** attaches a product (from the catalog — see [Products](./products)) to a deal with a specific quantity and unit price. The price and the product name are **snapshotted** at the time of association, so changes to the catalog don't rewrite past deals.

## Resource shape

| Attribute | Type | Required | Example | Notes |
| --- | --- | --- | --- | --- |
| `product_id` | integer | Yes (on create) | `10` | ID of an existing product. |
| `deal_id` | integer | Yes (on create) | `25` | ID of the deal that will receive the product. |
| `quantity` | integer | No | `2` | Defaults to `1`. |
| `unit_amount_in_cents` | integer | No | `5000` | Defaults to the product's `amount_in_cents`. |
| `product_name` | string | No | `Premium Subscription` | Snapshot. Defaults to the product's name. |
| `product_identifier` | string | No | `SKU-ABC-001` | Snapshot. Defaults to the product's identifier. |

All endpoints below assume:

```
{base_url} = https://app.woofedcrm.com
{account_id} = 1
```

---

## Create deal product

`POST /api/v1/accounts/{account_id}/deal_products`

Attaches a product to a deal.

### Body

```json
{
  "product_id": 1,
  "deal_id": 1,
  "quantity": 2
}
```

### Example request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deal_products" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "product_id": 1,
    "deal_id": 1,
    "quantity": 2
  }'
```

### Example response — `201 Created`

```json
{
  "id": 17,
  "deal_id": 1,
  "product_id": 1,
  "quantity": 2,
  "unit_amount_in_cents": 1000035,
  "product_name": "Car",
  "product_identifier": "SNS895SASXVDW",
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

### Response fields

| Field | Description |
| --- | --- |
| `id` | Numeric ID of the deal_product association. |
| `unit_amount_in_cents` | Defaulted from the product if not provided. |
| `product_name`, `product_identifier` | Snapshots of the product at the time of association. |

### Possible errors

| Status | When |
| --- | --- |
| `401` | Missing or invalid token. |
| `404` | The product or the deal does not exist in that account. |
| `422` | Missing `product_id` / `deal_id`, or invalid `quantity`. |

---

## Get deal product

`GET /api/v1/accounts/{account_id}/deal_products/{id}`

Retrieves a single deal product association.

### Example request

```bash
curl -X GET "https://app.woofedcrm.com/api/v1/accounts/1/deal_products/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Example response — `200 OK`

```json
{
  "id": 1,
  "deal_id": 1,
  "product_id": 1,
  "quantity": 1,
  "unit_amount_in_cents": 150000,
  "product_name": "Car",
  "product_identifier": "CAR-15632",
  "created_at": "2025-01-12T18:21:03Z",
  "updated_at": "2025-01-12T18:21:03Z"
}
```

### Possible errors

| Status | When |
| --- | --- |
| `401` | Missing or invalid token. |
| `404` | Deal product not found. |

---

## Update deal product

`PUT /api/v1/accounts/{account_id}/deal_products/{id}`

Updates the quantity, unit price or the snapshotted name/identifier of an existing association.

### Body

```json
{
  "quantity": 3,
  "unit_amount_in_cents": 150000,
  "product_name": "Car",
  "product_identifier": "CAR-15632"
}
```

### Example request

```bash
curl -X PUT "https://app.woofedcrm.com/api/v1/accounts/1/deal_products/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "quantity": 3,
    "unit_amount_in_cents": 150000
  }'
```

### Example response — `200 OK`

```json
{
  "id": 1,
  "deal_id": 1,
  "product_id": 1,
  "quantity": 3,
  "unit_amount_in_cents": 150000,
  "product_name": "Car",
  "product_identifier": "CAR-15632",
  "updated_at": "2025-01-20T11:42:18Z"
}
```

### Possible errors

| Status | When |
| --- | --- |
| `401` | Missing or invalid token. |
| `404` | Deal product not found. |
| `422` | Invalid `quantity` or `unit_amount_in_cents`. |
