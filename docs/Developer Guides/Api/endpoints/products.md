---
sidebar_label: "Products"
title: "Products"
sidebar_position: 4
---

# Products

A **product** is anything you sell — a SaaS plan, a physical product, a service. Products live in the account catalog and can be attached to deals through [**Deal products**](./deal-products) to compute the deal value.

## Resource shape

| Attribute | Type | Required | Example | Notes |
| --- | --- | --- | --- | --- |
| `identifier` | string | No | `SKU-ABC-001` | SKU or unique code. Defaults to empty. |
| `name` | string | No | `Premium Subscription` | Defaults to empty. |
| `description` | string | No | `Annual premium plan with full features.` | |
| `amount_in_cents` | integer | No | `19900` | Price in cents (`19900` = R$ 199,00). Defaults to `0`. |
| `quantity_available` | integer | No | `100` | Stock count. Defaults to `0`. |
| `custom_attributes` | object | No | `{ "category": "Software" }` | Free‑form custom fields. |

All endpoints below assume:

```
{base_url} = https://app.woofedcrm.com
{account_id} = 1
```

---

## Get product

`GET /api/v1/accounts/{account_id}/products/{id}`

Retrieves a single product by ID.

### Example request

```bash
curl -X GET "https://app.woofedcrm.com/api/v1/accounts/1/products/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Example response — `200 OK`

The response also returns the **deal_products** belonging to the product.

```json
{
  "id": 1,
  "identifier": "SNS895SASXVDW",
  "amount_in_cents": 1000035,
  "quantity_available": 2,
  "description": "Nice car",
  "name": "Car",
  "custom_attributes": { "number_of_doors": "4" },
  "additional_attributes": {},
  "created_at": "2025-01-12T18:21:03Z",
  "updated_at": "2025-01-12T18:21:03Z",
  "account_id": 1,
  "deal_products": [
    {
      "id": 3,
      "product_id": 1,
      "deal_id": 10,
      "created_at": "2025-01-12T18:21:05Z",
      "updated_at": "2025-01-12T18:21:05Z",
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

### Possible errors

| Status | When |
| --- | --- |
| `401` | Missing or invalid token. |
| `404` | Product not found. |

---

## Create product

`POST /api/v1/accounts/{account_id}/products`

Creates a new product in the catalog.

### Body

```json
{
  "identifier": "SNS895SASXVDW",
  "amount_in_cents": 1000035,
  "quantity_available": 2,
  "description": "Nice car",
  "name": "Car",
  "custom_attributes": { "number_of_doors": "4" }
}
```

### Example request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/products" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "identifier": "SNS895SASXVDW",
    "amount_in_cents": 1000035,
    "quantity_available": 2,
    "description": "Nice car",
    "name": "Car",
    "custom_attributes": { "number_of_doors": "4" }
  }'
```

### Example response — `201 Created`

```json
{
  "id": 7,
  "identifier": "SNS895SASXVDW",
  "name": "Car",
  "description": "Nice car",
  "amount_in_cents": 1000035,
  "quantity_available": 2,
  "custom_attributes": { "number_of_doors": "4" },
  "additional_attributes": {},
  "account_id": 1,
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

### Possible errors

| Status | When |
| --- | --- |
| `401` | Missing or invalid token. |
| `422` | Validation error. |

---

## Search products

`POST /api/v1/accounts/{account_id}/products/search`

Searches products with a Ransack‑style `query` object. See [API structure → Search](../api-structure#search) for the predicate list.

### Body

```json
{
  "query": {
    "identifier_eq": "SKU-12345",
    "name_cont": "Car",
    "description_cont": "electric",
    "amount_in_cents_gteq": 1000,
    "quantity_available_gt": 0,
    "created_at_gteq": "2025-01-01T00:00:00Z",
    "updated_at_lteq": "2025-01-31T23:59:59Z"
  }
}
```

### Example request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/products/search" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "query": {
      "name_cont": "Car",
      "amount_in_cents_gteq": 1000
    }
  }'
```

### Example response — `200 OK`

```json
{
  "data": [
    {
      "id": 7,
      "identifier": "SNS895SASXVDW",
      "amount_in_cents": 1000035,
      "quantity_available": 2,
      "description": "Nice car",
      "name": "Car",
      "custom_attributes": { "number_of_doors": "4" },
      "additional_attributes": {},
      "created_at": "2025-01-12T18:21:03Z",
      "updated_at": "2025-01-12T18:21:03Z",
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

### Possible errors

| Status | When |
| --- | --- |
| `400` | Malformed JSON body. |
| `401` | Missing or invalid token. |
| `422` | Unknown predicate or unsearchable field. |

---

## Update product

`PUT /api/v1/accounts/{account_id}/products/{id}`

Updates an existing product. You can change any subset of fields; omitted fields are left untouched.

### Body

```json
{
  "identifier": "PROD-123",
  "amount_in_cents": 150099,
  "quantity_available": 2,
  "description": "Car description",
  "name": "Car",
  "custom_attributes": { "number_of_doors": "4" }
}
```

### Example request

```bash
curl -X PUT "https://app.woofedcrm.com/api/v1/accounts/1/products/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "amount_in_cents": 150099,
    "quantity_available": 2
  }'
```

### Example response — `200 OK`

```json
{
  "id": 1,
  "identifier": "PROD-123",
  "name": "Car",
  "description": "Car description",
  "amount_in_cents": 150099,
  "quantity_available": 2,
  "custom_attributes": { "number_of_doors": "4" },
  "additional_attributes": {},
  "account_id": 1,
  "updated_at": "2025-01-20T11:42:18Z"
}
```

### Possible errors

| Status | When |
| --- | --- |
| `401` | Missing or invalid token. |
| `404` | Product not found. |
| `422` | Validation error. |
