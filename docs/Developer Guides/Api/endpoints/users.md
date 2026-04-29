---
sidebar_label: "Users"
title: "Users"
sidebar_position: 6
---

# Users

A **user** is a member of your Woofed CRM account — typically a salesperson, an SDR or an account manager. Users own deals, perform activities and receive assignments.

## Resource shape

| Attribute | Type | Required | Example | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | Yes (on create) | `john.doe@example.com` | Must be a valid email. |
| `password` | string | Yes (on create) | `StrongP@ssw0rd` | User password. |
| `password_confirmation` | string | Yes (on create) | `StrongP@ssw0rd` | Must match `password`. |
| `full_name` | string | No | `John Doe` | Defaults to empty. |
| `phone` | string | No | `+5511999999999` | |
| `language` | string | No | `en` | `en`, `pt-BR`, `es`, `de`. Defaults to `en`. |
| `avatar_url` | string | No | `https://example.com/avatar.png` | Public URL of the avatar. |
| `job_description` | string | No | `sales_manager` | Defaults to `other`. |
| `webpush_notify_on_event_expired` | boolean | No | `true` | Enables Web Push when an event expires. |

All endpoints below assume:

```
{base_url} = https://app.woofedcrm.com
{account_id} = 1
```

---

## Search users

`POST /api/v1/accounts/{account_id}/users/search`

Searches users with a Ransack‑style `query` object. See [API structure → Search](../api-structure#search) for the predicate list.

### Body

```json
{
  "query": {
    "full_name_cont": "John Acme",
    "email_cont": "john.doe@example.com",
    "phone_cont": "+1555",
    "language_eq": "en",
    "job_description_cont": "ceo",
    "created_at_gteq": "2025-01-01T00:00:00Z",
    "created_at_lteq": "2025-01-31T23:59:59Z",
    "updated_at_gteq": "2025-01-10T00:00:00Z",
    "id_eq": 123
  }
}
```

### Example request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/users/search" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "query": {
      "full_name_cont": "John",
      "language_eq": "en"
    }
  }'
```

### Example response — `200 OK`

```json
{
  "data": [
    {
      "id": 123,
      "full_name": "John Acme",
      "email": "john.doe@example.com",
      "created_at": "2025-01-12T18:21:03Z",
      "updated_at": "2025-01-12T18:21:03Z",
      "phone": "+15551234567",
      "language": "en",
      "notifications": { "webpush_notify_on_event_expired": true },
      "avatar_url": "https://example.com/avatar.png",
      "job_description": "ceo",
      "theme_preference": "system",
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

## Create user

`POST /api/v1/accounts/{account_id}/users`

Creates a new user inside the account.

### Body

```json
{
  "email": "tim@maia.com",
  "password": "123456",
  "password_confirmation": "123456",
  "full_name": "Tim Maia",
  "phone": "+5541996910256",
  "language": "en",
  "avatar_url": "https://example.com/avatars/tim-maia.png",
  "job_description": "other",
  "webpush_notify_on_event_expired": true
}
```

### Example request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "email": "tim@maia.com",
    "password": "StrongP@ssw0rd",
    "password_confirmation": "StrongP@ssw0rd",
    "full_name": "Tim Maia",
    "language": "en"
  }'
```

### Example response — `201 Created`

```json
{
  "id": 9,
  "full_name": "Tim Maia",
  "email": "tim@maia.com",
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z",
  "phone": "+5541996910256",
  "language": "en",
  "notifications": { "webpush_notify_on_event_expired": true },
  "avatar_url": "https://example.com/avatars/tim-maia.png",
  "job_description": "other",
  "theme_preference": "system",
  "account_id": 1
}
```

:::caution Sensitive endpoint
Creating users grants access to the account. Make sure the token used to call this endpoint belongs to an admin user, and never expose this call to a public form.
:::

### Possible errors

| Status | When |
| --- | --- |
| `401` | Missing or invalid token. |
| `422` | Email already taken, password mismatch, or other validation error. |
