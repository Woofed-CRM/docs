---
sidebar_label: "Deals"
title: "Deals"
sidebar_position: 2
---

# Deals

A **deal** is a sales opportunity inside a pipeline. It belongs to a contact, sits at a particular stage and carries a status (`open`, `won`, `lost`).

## Resource shape

| Attribute | Type | Required | Example | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | No | `Deal with John` | Deal title. |
| `status` | string | No | `open` | Defaults to `open`. Common values: `open`, `won`, `lost`. |
| `stage_id` | integer | Yes | `3` | Stage where the deal lives. |
| `pipeline_id` | integer | No | `1` | Must match the pipeline of `stage_id`. |
| `contact_id` | integer | Yes | `42` | Contact associated with the deal. |
| `position` | integer | No | `2` | Position within the stage (kanban order). |
| `lost_reason` | string | No | `Price too high` | Reason when `status = lost`. |
| `lost_at` | datetime (UTC) | No | `2025-01-15T10:30:00Z` | Must be UTC. |
| `won_at` | datetime (UTC) | No | `2025-01-20T14:00:00Z` | Must be UTC. |
| `custom_attributes` | object | No | `{ "source": "Website" }` | Free‑form custom fields. |
| `contact_attributes` | object | No | `{ "id": 42, "full_name": "John" }` | When provided to `upsert`, finds an existing contact or creates a new one and associates it with the deal. |

All endpoints below assume:

```
{base_url} = https://app.woofedcrm.com
{account_id} = 1
```

---

## Create deal

`POST /api/v1/accounts/{account_id}/deals`

Creates a new deal in the account.

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

### Example request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
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

### Example response — `201 Created`

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

### Response fields

| Field | Description |
| --- | --- |
| `id` | Numeric deal ID. |
| `pipeline_id` | Inferred from `stage_id` when omitted. |
| `position` | Order within the stage (kanban). |
| `custom_attributes` | Echoed back as submitted. |

### Possible errors

| Status | When |
| --- | --- |
| `401` | Missing or invalid token. |
| `422` | `stage_id` or `contact_id` missing/invalid, or pipeline mismatch. |

---

## Search deals

`POST /api/v1/accounts/{account_id}/deals/search`

Searches deals using a Ransack‑style `query` object. See [API structure → Search](../api-structure#search) for the full predicate list.

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

### Example request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals/search" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "query": {
      "name_cont": "Rubel",
      "status_eq": "open"
    }
  }'
```

### Example response — `200 OK`

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

### Possible errors

| Status | When |
| --- | --- |
| `400` | Malformed JSON body. |
| `401` | Missing or invalid token. |
| `422` | Unknown predicate or unsearchable field. |

---

## Get deal

`GET /api/v1/accounts/{account_id}/deals/{id}`

Retrieves a single deal by ID.

### Example request

```bash
curl -X GET "https://app.woofedcrm.com/api/v1/accounts/1/deals/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Example response — `200 OK`

The response also returns the **contact**, **stage**, **pipeline**, **deal_assignees** and **deal_products** belonging to the deal.

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

### Possible errors

| Status | When |
| --- | --- |
| `401` | Missing or invalid token. |
| `404` | Deal not found in that account. |

---

## Update deal

`PUT /api/v1/accounts/{account_id}/deals/{id}`

Updates an existing deal. You can change any subset of fields; omitted fields are not modified.

### Body

```json
{
  "name": "Lead site: Rubel (Lost)",
  "status": "lost",
  "stage_id": 2,
  "lost_reason": "Price too high",
  "lost_at": "2025-01-18T16:45:00Z",
  "custom_attributes": {
    "source": "Website",
    "competitor": "Competitor X",
    "final_offer_value": 12000
  }
}
```

### Example request

```bash
curl -X PUT "https://app.woofedcrm.com/api/v1/accounts/1/deals/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "status": "lost",
    "lost_reason": "Price too high",
    "lost_at": "2025-01-18T16:45:00Z"
  }'
```

### Example response — `200 OK`

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
  "lost_reason": "Price too high",
  "account_id": 1,
  "updated_at": "2025-01-18T16:45:00Z"
}
```

### Possible errors

| Status | When |
| --- | --- |
| `401` | Missing or invalid token. |
| `404` | Deal not found. |
| `422` | Validation error (e.g. invalid `status`, mismatch between `stage_id` and `pipeline_id`, malformed `lost_at`). |

---

## Upsert deal

`POST /api/v1/accounts/{account_id}/deals/upsert`

Creates the deal if no match exists, or updates the existing one. Useful for syncing deals from external systems.

When you pass `contact_attributes`, the API tries to find an existing contact matching those attributes; if it doesn't find one, it creates a new contact and associates it with the deal.

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

### Example request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals/upsert" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "stage_id": 1,
    "pipeline_id": 1,
    "name": "Lead site: Rubel",
    "contact_id": 1,
    "status": "open",
    "custom_attributes": { "CPF": "123456789-87" }
  }'
```

### Example response — `200 OK` (updated) or `201 Created` (new)

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

### Possible errors

| Status | When |
| --- | --- |
| `401` | Missing or invalid token. |
| `422` | Pipeline / stage mismatch, or required field missing. |

---

## Related endpoints

- [**Deal events**](./deal-events) — add notes, activities and scheduled WhatsApp / Chatwoot messages to a deal.
- [**Deal products**](./deal-products) — attach products to a deal.
- [**Deal assignees**](./deal-assignees) — assign deals to users.
