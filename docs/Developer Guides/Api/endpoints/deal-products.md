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

The response also returns the **product** and **deal** belonging to the deal product.

```json
{
  "id": 17,
  "product_id": 1,
  "deal_id": 1,
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z",
  "unit_amount_in_cents": 1000035,
  "product_identifier": "SNS895SASXVDW",
  "product_name": "Car",
  "total_amount_in_cents": 2000070,
  "quantity": 2,
  "account_id": 1,
  "product": {
    "id": 1,
    "identifier": "SNS895SASXVDW",
    "amount_in_cents": 1000035,
    "quantity_available": 2,
    "description": "Nice car",
    "name": "Car",
    "custom_attributes": {},
    "additional_attributes": {},
    "created_at": "2025-01-12T18:21:03Z",
    "updated_at": "2025-01-12T18:21:03Z",
    "account_id": 1
  },
  "deal": {
    "total_deal_products_amount_in_cents": 2000070,
    "contact_id": 1,
    "stage_id": 1,
    "pipeline_id": 1,
    "id": 1,
    "name": "Deal 1",
    "status": "open",
    "custom_attributes": {},
    "created_at": "2025-01-12T18:20:50Z",
    "updated_at": "2025-01-15T10:30:00Z",
    "position": 1,
    "created_by_id": null,
    "lost_at": null,
    "won_at": null,
    "lost_reason": "",
    "account_id": 1
  }
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

The response also returns the **product** and **deal** belonging to the deal product.

```json
{
  "id": 1,
  "product_id": 1,
  "deal_id": 1,
  "created_at": "2025-01-12T18:21:03Z",
  "updated_at": "2025-01-12T18:21:03Z",
  "unit_amount_in_cents": 150000,
  "product_identifier": "CAR-15632",
  "product_name": "Car",
  "total_amount_in_cents": 150000,
  "quantity": 1,
  "account_id": 1,
  "product": {
    "id": 1,
    "identifier": "CAR-15632",
    "amount_in_cents": 150000,
    "quantity_available": 2,
    "description": "Nice car",
    "name": "Car",
    "custom_attributes": {},
    "additional_attributes": {},
    "created_at": "2025-01-12T18:21:00Z",
    "updated_at": "2025-01-12T18:21:00Z",
    "account_id": 1
  },
  "deal": {
    "total_deal_products_amount_in_cents": 150000,
    "contact_id": 1,
    "stage_id": 1,
    "pipeline_id": 1,
    "id": 1,
    "name": "Deal 1",
    "status": "open",
    "custom_attributes": {},
    "created_at": "2025-01-12T18:20:50Z",
    "updated_at": "2025-01-12T18:21:03Z",
    "position": 1,
    "created_by_id": null,
    "lost_at": null,
    "won_at": null,
    "lost_reason": "",
    "account_id": 1
  }
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

The response also returns the **product** and **deal** belonging to the deal product.

```json
{
  "id": 1,
  "product_id": 1,
  "deal_id": 1,
  "created_at": "2025-01-12T18:21:03Z",
  "updated_at": "2025-01-20T11:42:18Z",
  "unit_amount_in_cents": 150000,
  "product_identifier": "CAR-15632",
  "product_name": "Car",
  "total_amount_in_cents": 450000,
  "quantity": 3,
  "account_id": 1,
  "product": {
    "id": 1,
    "identifier": "CAR-15632",
    "amount_in_cents": 150000,
    "quantity_available": 2,
    "description": "Nice car",
    "name": "Car",
    "custom_attributes": {},
    "additional_attributes": {},
    "created_at": "2025-01-12T18:21:00Z",
    "updated_at": "2025-01-12T18:21:00Z",
    "account_id": 1
  },
  "deal": {
    "total_deal_products_amount_in_cents": 450000,
    "contact_id": 1,
    "stage_id": 1,
    "pipeline_id": 1,
    "id": 1,
    "name": "Deal 1",
    "status": "open",
    "custom_attributes": {},
    "created_at": "2025-01-12T18:20:50Z",
    "updated_at": "2025-01-20T11:42:18Z",
    "position": 1,
    "created_by_id": null,
    "lost_at": null,
    "won_at": null,
    "lost_reason": "",
    "account_id": 1
  }
}
```

### Possible errors

| Status | When |
| --- | --- |
| `401` | Missing or invalid token. |
| `404` | Deal product not found. |
| `422` | Invalid `quantity` or `unit_amount_in_cents`. |

---

## Related endpoints

- [**Get product**](./products#get-product) — to find the `id` of a `deal_product`, fetch the product with `GET /api/v1/accounts/{account_id}/products/{id}`. The response includes a `deal_products` array with every association of that product and all of their fields (`id`, `product_id`, `deal_id`, …).
- [**Get deal**](./deals#get-deal) — alternatively, fetch the deal with `GET /api/v1/accounts/{account_id}/deals/{id}`. The response also includes a `deal_products` array with every association of that deal — use the `id` from there to call [Get deal product](#get-deal-product) or [Update deal product](#update-deal-product).
