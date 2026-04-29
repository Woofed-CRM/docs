---
sidebar_label: "Contacts"
title: "Contacts"
sidebar_position: 1
---

# Contacts

A **contact** is a person inside Woofed CRM. Contacts can be linked to deals, can hold custom attributes (city, CPF, source, …) and can be tagged with labels.

## Resource shape

| Attribute | Type | Required | Example | Notes |
| --- | --- | --- | --- | --- |
| `full_name` | string | No | `John Doe` | Contact full name. |
| `phone` | string | No | `+5511999999999` | E.164 format recommended. |
| `email` | string | No | `john.doe@example.com` | Must be a valid email format if provided. |
| `label_list` | string \| array | No | `["customer","vip"]` | Tags. Comma‑separated string or array. |
| `custom_attributes` | object | No | `{ "city": "RJ" }` | Free‑form JSON for custom fields. |

All endpoints below assume:

```
{base_url} = https://app.woofedcrm.com
{account_id} = 1
```

---

## Create contact

`POST /api/v1/accounts/{account_id}/contacts`

Creates a new contact in the account.

### Headers

| Header | Value |
| --- | --- |
| `Content-Type` | `application/json` |
| `Authorization` | `Bearer YOUR_TOKEN_HERE` |

### Path parameters

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | integer | Yes | Account scope. |

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

### Example request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/contacts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "full_name": "Tim Maia",
    "phone": "+5541996910256",
    "email": "tim@maia.com",
    "custom_attributes": { "city": "RJ" },
    "label_list": ["label1", "label2"]
  }'
```

### Example response — `201 Created`

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

### Response fields

| Field | Description |
| --- | --- |
| `id` | Numeric ID. Use it on subsequent calls. |
| `full_name`, `phone`, `email` | The values you submitted, normalised. |
| `label_list` | Tags as an array (even if you sent a comma‑separated string). |
| `custom_attributes` | Echoed back exactly as submitted. |
| `created_at`, `updated_at` | ISO 8601 (UTC). |

### Possible errors

| Status | When |
| --- | --- |
| `401` | Missing or invalid token. |
| `422` | Invalid email format, or another validation rule failed. |

---

## Search contacts

`POST /api/v1/accounts/{account_id}/contacts/search`

Searches contacts using a Ransack‑style `query` object. See [API structure → Search](../api-structure#search) for the full predicate list.

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

### Example request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/contacts/search" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "query": {
      "full_name_cont": "John",
      "email_cont": "@example.com"
    }
  }'
```

### Example response — `200 OK`

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

### Possible errors

| Status | When |
| --- | --- |
| `400` | Malformed JSON body. |
| `401` | Missing or invalid token. |
| `422` | Unknown predicate or unsearchable field. |

---

## Get contact

`GET /api/v1/accounts/{account_id}/contacts/{id}`

Retrieves a single contact by ID.

### Path parameters

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | integer | Yes | Account scope. |
| `id` | integer | Yes | Contact ID. |

### Example request

```bash
curl -X GET "https://app.woofedcrm.com/api/v1/accounts/1/contacts/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Example response — `200 OK`

The response also returns the **deals** and **events** belonging to the contact.

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

### Possible errors

| Status | When |
| --- | --- |
| `401` | Missing or invalid token. |
| `404` | Contact not found in that account. |

---

## Upsert contact

`POST /api/v1/accounts/{account_id}/contacts/upsert`

**Creates** the contact if no match exists in the account, or **updates** the existing one. Match keys are typically `email` and/or `phone` — if you pass either, the API will look for an existing contact with the same value in that account.

This is the endpoint of choice for nightly sync jobs.

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

### Example request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/contacts/upsert" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "full_name": "Tim Maia",
    "phone": "+5541996910256",
    "email": "tim@maia.com",
    "custom_attributes": { "city": "RJ" },
    "label_list": ["label1", "label2"]
  }'
```

### Example response — `200 OK` (updated) or `201 Created` (new)

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

### Possible errors

| Status | When |
| --- | --- |
| `401` | Missing or invalid token. |
| `422` | Validation error (invalid email, conflicting unique fields, …). |

---

## Delete contact

`DELETE /api/v1/accounts/{account_id}/contacts/{id}`

Permanently removes a contact and all of its associations. **This action cannot be undone.**

### Path parameters

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | integer | Yes | Account scope. |
| `id` | integer | Yes | Contact ID. |

### Example request

```bash
curl -X DELETE "https://app.woofedcrm.com/api/v1/accounts/1/contacts/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Example response — `204 No Content`

No body is returned.

### Possible errors

| Status | When |
| --- | --- |
| `401` | Missing or invalid token. |
| `404` | Contact not found in that account. |
