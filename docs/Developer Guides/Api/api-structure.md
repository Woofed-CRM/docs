---
sidebar_label: "API structure"
title: "API structure"
sidebar_position: 5
---

# API structure

This page describes the conventions every endpoint of the Woofed CRM API follows. Once you understand the rules below, every endpoint in the [reference](./endpoints/contacts) reads the same way.

## URL pattern

All endpoints live under a single, account‑scoped namespace:

```
{base_url}/api/v1/accounts/{account_id}/<resource>[/<id>][/<sub-action>]
```

| Segment | Description |
| --- | --- |
| `{base_url}` | `https://app.woofedcrm.com` on the cloud, or your own host on a self‑hosted install. |
| `api/v1` | API version. |
| `accounts/{account_id}` | The account that owns the data. Every resource is account‑scoped. |
| `<resource>` | The resource collection: `contacts`, `deals`, `products`, `users`, `deal_products`, `deal_assignees`. |
| `<id>` | A specific record ID (numeric). |
| `<sub-action>` | Optional sub‑action like `search`, `upsert`, or nested resources like `events`. |

## HTTP verbs

The API follows REST conventions:

| Verb | Used for |
| --- | --- |
| `GET` | Retrieving a single resource. |
| `POST` | Creating a resource, performing a search, or running an `upsert`. |
| `PUT` | Updating an existing resource (full / partial replace). |
| `DELETE` | Removing a resource. |

## Request format

Requests that send a body always use **JSON**. You should always send these two headers:

```http
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE
```

Example body for creating a contact:

```json
{
  "full_name": "Tim Maia",
  "phone": "+5541996910256",
  "email": "tim@maia.com",
  "custom_attributes": { "city": "RJ" },
  "label_list": ["label1", "label2"]
}
```

## Response format

Successful responses return a JSON document representing the resource (or an array of resources, for list operations). Field names use `snake_case` and timestamps are ISO 8601 in UTC.

```json
{
  "id": 1,
  "name": "Lead site: Rubel",
  "status": "open",
  "stage_id": 1,
  "contact_id": 1,
  "custom_attributes": { "source": "Website" },
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

### Custom attributes

Most resources expose a `custom_attributes` JSON object. It is a free‑form key/value bag intended to store fields that don't exist as native columns (`source`, `cpf`, `priority`, …). The keys you store there are returned exactly as you sent them.

### Datetimes

Always send dates as **ISO 8601 in UTC** (`2025-01-20T14:00:00Z`). Time‑zoned strings are not accepted by `scheduled_at`, `done_at`, `won_at`, `lost_at`, etc.

## Status codes

| Code | Meaning |
| --- | --- |
| `200 OK` | The request succeeded; the body contains the requested resource. |
| `201 Created` | A resource was successfully created. |
| `204 No Content` | The request succeeded and there is no body to return (typically `DELETE`). |
| `400 Bad Request` | The request body is malformed JSON, or required fields are missing. |
| `401 Unauthorized` | Missing, malformed or expired token. See [Authentication](./authentication). |
| `403 Forbidden` | The token is valid but the user has no access to that resource. |
| `404 Not Found` | The URL is wrong, or the record does not exist in that account. |
| `422 Unprocessable Entity` | Validation error — e.g. invalid email format, missing `stage_id` on a deal creation, etc. |
| `429 Too Many Requests` | Rate limit reached — back off and retry after a short delay. |
| `5xx` | Server‑side error. Retry with exponential backoff and contact support if the error persists. |

## Error handling

Errors return a JSON body with details about what went wrong. The common shape is:

```json
{
  "errors": {
    "email": ["is invalid"],
    "stage_id": ["can't be blank"]
  }
}
```

Or for top‑level errors:

```json
{
  "error": "Unauthorized"
}
```

Recommended client behaviour:

- Treat any `2xx` as success.
- Treat any `4xx` as a **client bug**: log the request and the error body so you can fix the input.
- Treat any `5xx` as a **transient failure**: retry up to 3 times with exponential backoff.

## Search

Resources that expose `/search` (contacts, products, users — see each endpoint page) use a powerful **Ransack‑style** query language. You build a `query` object whose keys are `<field>_<predicate>`:

```json
{
  "query": {
    "full_name_cont": "John",
    "email_cont": "@example.com",
    "created_at_gteq": "2025-01-01T00:00:00Z",
    "id_eq": 42
  }
}
```

Supported predicates (the most common ones):

| Predicate | Meaning |
| --- | --- |
| `*_eq` | Equals |
| `*_not_eq` | Not equal |
| `*_cont` | Contains (substring) |
| `*_not_cont` | Does not contain |
| `*_start` / `*_end` | Starts with / ends with |
| `*_lt` / `*_lteq` | Less than / less than or equal |
| `*_gt` / `*_gteq` | Greater than / greater than or equal |
| `*_in` / `*_not_in` | Value is / is not in a list |
| `*_present` / `*_blank` | Field is present / blank |
| `*_null` / `*_not_null` | Field is null / not null |
| `*_true` / `*_false` | Boolean is true / false |
| `*_matches` | Matches a SQL `LIKE` pattern |

Each predicate also accepts the suffixes `_any` and `_all` to match against a list of values:

```json
{ "query": { "label_list_cont_any": ["vip", "trial"] } }
```

A complete predicate reference is shipped with each searchable endpoint.

## Pagination, filtering and ordering

Most list endpoints accept query parameters for pagination and ordering. When supported, they follow these conventions:

- `page` — page number (1‑based).
- `per_page` — items per page (defaults vary per resource).
- `sort` — field to order by (e.g. `sort=created_at desc`).

Each endpoint page documents the parameters that are actually supported.

## Idempotency and `upsert`

Some resources expose an `upsert` action (e.g. `POST /contacts/upsert`, `POST /deals/upsert`). It will **create** the record if no match is found, or **update** the existing one otherwise. This is the pattern of choice for nightly syncs or any pipeline where the source system is the source of truth.

## Next step

Browse the full reference, one resource at a time, starting with [**Contacts**](./endpoints/contacts).
