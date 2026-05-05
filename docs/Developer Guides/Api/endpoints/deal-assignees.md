---
sidebar_label: "Deal assignees"
title: "Deal assignees"
sidebar_position: 7
---

# Deal assignees

A **deal assignee** is the link between a [deal](./deals) and a [user](./users). A deal can have one or more assignees — typically the salespeople in charge of moving it forward.

This endpoint is what you call to **assign deals automatically** (round‑robin distribution, automatic SDR assignment, rebalancing on user offboarding, …).

## Resource shape

| Attribute | Type | Required | Example | Notes |
| --- | --- | --- | --- | --- |
| `deal_id` | integer | Yes | `25` | The deal to assign. |
| `user_id` | integer | Yes | `7` | The user who will be assigned. |

All endpoints below assume:

```
{base_url} = https://app.woofedcrm.com
{account_id} = 1
```

---

## Create deal assignee

`POST /api/v1/accounts/{account_id}/deal_assignees`

Assigns a user to a deal.

### Body

```json
{
  "user_id": 1,
  "deal_id": 1
}
```

### Example request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deal_assignees" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "user_id": 1,
    "deal_id": 1
  }'
```

### Example response — `201 Created`

```json
{
  "id": 33,
  "deal_id": 1,
  "user_id": 1,
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z",
  "account_id": 1
}
```

### Possible errors

| Status | When |
| --- | --- |
| `401` | Missing or invalid token. |
| `404` | The deal or the user does not exist in that account. |
| `422` | Missing `user_id` / `deal_id`, or the user is already assigned to that deal. |

---

## Delete deal assignee

`DELETE /api/v1/accounts/{account_id}/deal_assignees/{id}`

Removes the assignment between a user and a deal.

### Path parameters

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | integer | Yes | Account scope. |
| `id` | integer | Yes | Deal assignee ID (from the response of the create call). |

### Example request

```bash
curl -X DELETE "https://app.woofedcrm.com/api/v1/accounts/1/deal_assignees/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Example response — `204 No Content`

No body is returned.

### Possible errors

| Status | When |
| --- | --- |
| `401` | Missing or invalid token. |
| `404` | Deal assignee not found in that account. |

---

## Related endpoints

- [**Get deal**](./deals#get-deal) — to find the `id` of a `deal_assignee`, fetch the deal it belongs to with `GET /api/v1/accounts/{account_id}/deals/{id}`. The response includes a `deal_assignees` array with every assignee of that deal and all of their fields (`id`, `deal_id`, `user_id`, …) — use the `id` from there to call [Delete deal assignee](#delete-deal-assignee).
