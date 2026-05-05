---
sidebar_label: "Getting started"
title: "Getting started"
sidebar_position: 2
---

# Getting started

This page takes you from zero to your first successful API call in under five minutes.

## 1. Base URL

All requests are sent to the Woofed CRM cloud (or to your self‑hosted instance):

```
https://app.woofedcrm.com
```

If you are **self‑hosting** Woofed CRM, replace this host with your own domain (e.g. `https://crm.yourcompany.com`). The path structure (`/api/v1/accounts/{account_id}/...`) is identical in both cases.

## 2. Account ID

Every endpoint is scoped to an account, so the URL always contains your account ID:

```
/api/v1/accounts/{account_id}/<resource>
```

You can find your `account_id` in the URL of the Woofed CRM dashboard, right after `/app/`. For most installations the first account is `1`.

## 3. Authentication, in one line

Every request must carry a Bearer Token in the `Authorization` header:

```http
Authorization: Bearer YOUR_TOKEN_HERE
```

If you don't have a token yet, follow the short [**Get Token**](./GeToken) guide first. The full security details live in [**Authentication**](./authentication).

## 4. Your first request

Let's fetch a single contact (assuming a contact with id `1` exists in account `1`):

```bash
curl -X GET "https://app.woofedcrm.com/api/v1/accounts/1/contacts/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

The same call from JavaScript:

```javascript
const res = await fetch(
  "https://app.woofedcrm.com/api/v1/accounts/1/contacts/1",
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_TOKEN_HERE",
    },
  }
);

const contact = await res.json();
console.log(contact);
```

A successful response is plain JSON describing the contact:

```json
{
  "id": 1,
  "full_name": "Tim Maia",
  "phone": "+5541996910256",
  "email": "tim@maia.com",
  "custom_attributes": {
    "city": "RJ"
  },
  "label_list": ["label1", "label2"],
  "created_at": "2025-01-12T18:21:03Z",
  "updated_at": "2025-01-12T18:21:03Z"
}
```

That's it — you are talking to Woofed CRM.

## 5. Recommended tools

While building, the following tools save a lot of time:

- **[Postman](https://www.postman.com/)** — the [official Woofed CRM Postman collection](https://www.postman.com/dark-shuttle-5185/workspace/woofed-crm-api/collection/905262-e0bb0d71-a634-4fa2-8b03-4ae4c6dde690) ships with every endpoint pre‑configured. Just set the `endpoint`, `account_id` and `token` collection variables.
- **`curl`** — perfect for scripting, debugging and pasting in this documentation.
- **HTTPie** — friendlier syntax than curl: `http GET https://app.woofedcrm.com/... "Authorization: Bearer …"`.
- **Browser DevTools** — the **Network** tab shows you exactly what your frontend is sending if you are integrating from a SPA.

## 6. Anatomy of a response

Most responses follow the same general shape:

```json
{
  "id": 42,
  "name": "Lead site: Rubel",
  "status": "open",
  "stage_id": 1,
  "contact_id": 1,
  "custom_attributes": { "source": "Website" },
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

Key things to notice:

- **`id`** — every record has a numeric, account‑scoped ID. Use it to address the record in subsequent requests (`GET /deals/42`, `PUT /deals/42`, …).
- **Timestamps** — `created_at` and `updated_at` are ISO 8601 in UTC.
- **`custom_attributes`** — a free‑form JSON object. Use it for fields that don't exist as native columns (`source`, `cpf`, `priority`, …).
- **HTTP status code** — `2xx` for success, `4xx` for client errors, `5xx` for server errors. The full list lives in [API structure → Status codes](./api-structure#status-codes).

## What's next?

You now have everything to make any call in this documentation work. Continue with:

- [**Authentication**](./authentication) for security best practices.
- [**API structure**](./api-structure) for status codes, error handling and the search syntax.
- [**Endpoints**](./endpoints/contacts) for the full reference.
