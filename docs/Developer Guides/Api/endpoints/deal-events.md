---
sidebar_label: "Deal events"
title: "Deal events"
sidebar_position: 3
---

# Deal events

A **deal event** is anything that lands on a deal's timeline: a note, a scheduled activity, or a message that is dispatched through Chatwoot or the Evolution API (WhatsApp).

There is a single endpoint, but it accepts several **kinds** of events. The `kind` field decides which fields are required, and which side effects the system runs.

## Endpoint

`POST /api/v1/accounts/{account_id}/deals/{deal_id}/events`

| Path parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | integer | Yes | Account scope. |
| `deal_id` | integer | Yes | The deal that will receive the event. |

### Headers

| Header | Value |
| --- | --- |
| `Content-Type` | `application/json` |
| `Authorization` | `Bearer YOUR_TOKEN_HERE` |

## Common attributes

| Attribute | Type | Required | Example | Notes |
| --- | --- | --- | --- | --- |
| `kind` | string | Yes | `note` | One of `note`, `activity`, `chatwoot_message`, `evolution_api_message`. |
| `title` | string | No | `Follow-up call` | Defaults to empty. |
| `content` | string | Mostly yes | `How are you?` | Body of the note / activity / message. |
| `done` | boolean | No | `true` | Marks the event as completed. |
| `auto_done` | boolean | No | `false` | If `true`, the system marks the event as done automatically (e.g. after sending a message). |
| `done_at` | datetime (UTC) | No | `2025-01-18T15:30:00Z` | When it was completed. |
| `scheduled_at` | datetime (UTC) | Sometimes | `2025-01-20T14:00:00Z` | Required for scheduled messages. |
| `send_now` | boolean | Sometimes | `true` | Required for "send now" messages. |
| `app_type` | string | Sometimes | `Apps::Chatwoot` | One of `Apps::Chatwoot`, `Apps::EvolutionApi`. |
| `app_id` | integer | Sometimes | `5` | ID of the app integration. |
| `additional_attributes` | object | Sometimes | `{ "chatwoot_inbox_id": "62483" }` | App‑specific extras. |
| `custom_attributes` | object | No | `{ "channel": "whatsapp" }` | Free‑form custom fields. |

The next sections show the exact body for each `kind`.

---

## 1. Create a note (`kind = note`)

A note is a free‑text record on the deal's timeline. No side effects.

### Body

```json
{
  "kind": "note",
  "content": "Text content..."
}
```

### Example request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals/1/events" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "kind": "note",
    "content": "Called the customer to discuss next steps."
  }'
```

### Example response — `201 Created`

```json
{
  "id": 88,
  "deal_id": 1,
  "kind": "note",
  "content": "Called the customer to discuss next steps.",
  "created_at": "2025-01-15T10:30:00Z"
}
```

---

## 2. Create an activity (`kind = activity`)

An activity is a task scheduled on the timeline (a call, a meeting, a follow‑up).

### Body

```json
{
  "title": "Activity example title",
  "kind": "activity",
  "content": "Text content...",
  "scheduled_at": "2025-01-20T14:00:00Z",
  "done": false
}
```

### Example request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals/1/events" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Follow-up call",
    "kind": "activity",
    "content": "Confirm proposal received",
    "scheduled_at": "2025-01-20T14:00:00Z",
    "done": false
  }'
```

### Example response — `201 Created`

```json
{
  "id": 89,
  "deal_id": 1,
  "kind": "activity",
  "title": "Follow-up call",
  "content": "Confirm proposal received",
  "scheduled_at": "2025-01-20T14:00:00Z",
  "done": false,
  "created_at": "2025-01-15T10:30:00Z"
}
```

---

## 3. Schedule a Chatwoot message (`kind = chatwoot_message`)

Schedules a message that will be sent through a Chatwoot inbox at `scheduled_at`.

### Body

```json
{
  "title": "Chatwoot Message",
  "content": "How are you?",
  "kind": "chatwoot_message",
  "auto_done": false,
  "scheduled_at": "2025-01-20T14:00:00Z",
  "app_type": "Apps::Chatwoot",
  "app_id": 6,
  "additional_attributes": {
    "chatwoot_inbox_id": "62483"
  }
}
```

### Required fields for this kind

| Attribute | Required | Notes |
| --- | --- | --- |
| `kind` | Yes | Must be `chatwoot_message`. |
| `content` | Yes | Message body. |
| `scheduled_at` | Yes | UTC. |
| `app_type` | Yes | `Apps::Chatwoot`. |
| `app_id` | Yes | The Chatwoot app integration ID. |
| `additional_attributes.chatwoot_inbox_id` | Yes | Target inbox. |

### Example request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals/1/events" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Chatwoot Message",
    "content": "How are you?",
    "kind": "chatwoot_message",
    "auto_done": false,
    "scheduled_at": "2025-01-20T14:00:00Z",
    "app_type": "Apps::Chatwoot",
    "app_id": 6,
    "additional_attributes": { "chatwoot_inbox_id": "62483" }
  }'
```

---

## 4. Send a Chatwoot message immediately

Same `kind` as above, but **sent immediately** by setting `send_now: true` and providing an existing conversation ID.

### Body

```json
{
  "title": "Chatwoot Message",
  "content": "How are you?",
  "kind": "chatwoot_message",
  "send_now": true,
  "app_type": "Apps::Chatwoot",
  "app_id": 5,
  "additional_attributes": {
    "chatwoot_inbox_id": "62483",
    "chatwoot_conversation_id": 4
  }
}
```

### Required fields for this kind

| Attribute | Required | Notes |
| --- | --- | --- |
| `kind` | Yes | `chatwoot_message`. |
| `content` | Yes | Message body. |
| `send_now` | Yes | `true`. |
| `app_type` | Yes | `Apps::Chatwoot`. |
| `app_id` | Yes | Chatwoot integration ID. |
| `additional_attributes.chatwoot_inbox_id` | Yes | Target inbox. |
| `additional_attributes.chatwoot_conversation_id` | Yes | Conversation that will receive the message. |

---

## 5. Schedule a WhatsApp message (`kind = evolution_api_message`)

Schedules an Evolution API (WhatsApp) message to be sent at `scheduled_at`.

### Body

```json
{
  "title": "Whatsapp Message",
  "content": "How are you?",
  "kind": "evolution_api_message",
  "auto_done": false,
  "scheduled_at": "2025-01-20T14:00:00Z",
  "app_type": "Apps::EvolutionApi",
  "app_id": 5
}
```

### Required fields for this kind

| Attribute | Required | Notes |
| --- | --- | --- |
| `kind` | Yes | `evolution_api_message`. |
| `content` | Yes | Message body. |
| `scheduled_at` | Yes | UTC. |
| `app_type` | Yes | `Apps::EvolutionApi`. |
| `app_id` | Yes | Evolution API integration ID. |

### Example request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals/1/events" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Whatsapp Message",
    "content": "How are you?",
    "kind": "evolution_api_message",
    "scheduled_at": "2025-01-20T14:00:00Z",
    "app_type": "Apps::EvolutionApi",
    "app_id": 5
  }'
```

---

## 6. Send a WhatsApp message immediately

Same `kind` as above, but with `send_now: true`.

### Body

```json
{
  "title": "Whatsapp Message",
  "content": "How are you?",
  "kind": "evolution_api_message",
  "send_now": true,
  "app_type": "Apps::EvolutionApi",
  "app_id": 5
}
```

### Example request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals/1/events" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Whatsapp Message",
    "content": "How are you?",
    "kind": "evolution_api_message",
    "send_now": true,
    "app_type": "Apps::EvolutionApi",
    "app_id": 5
  }'
```

---

## Possible errors

| Status | When |
| --- | --- |
| `401` | Missing or invalid token. |
| `404` | The deal does not exist in that account. |
| `422` | Invalid `kind`, missing required field for the chosen kind, malformed `scheduled_at`, or unknown `app_id` / `app_type`. |
