---
sidebar_label: "Deal-Events"
title: "Deal-Events"
sidebar_position: 3
---

# Deal-Events

Ein **Deal-Event** ist alles, was im Verlauf eines Deals erscheint: eine Notiz, eine geplante Aktivität, oder eine über Chatwoot bzw. Evolution API (WhatsApp) versendete Nachricht.

Es gibt nur einen Endpoint, aber er akzeptiert mehrere **Event-Arten** (`kind`). Das Feld `kind` bestimmt, welche Felder Pflicht sind und welche Side Effects das System ausführt.

## Endpoint

`POST /api/v1/accounts/{account_id}/deals/{deal_id}/events`

| Path-Parameter | Typ | Pflicht | Beschreibung |
| --- | --- | --- | --- |
| `account_id` | integer | Ja | Account-Scope. |
| `deal_id` | integer | Ja | Der Deal, der das Event erhält. |

### Headers

| Header | Wert |
| --- | --- |
| `Content-Type` | `application/json` |
| `Authorization` | `Bearer IHR_TOKEN_HIER` |

## Gemeinsame Attribute

| Attribut | Typ | Pflicht | Beispiel | Hinweise |
| --- | --- | --- | --- | --- |
| `kind` | string | Ja | `note` | Eines von `note`, `activity`, `chatwoot_message`, `evolution_api_message`. |
| `title` | string | Nein | `Follow-up-Anruf` | Default leer. |
| `content` | string | Meist ja | `Wie geht es?` | Inhalt der Notiz / Aktivität / Nachricht. |
| `done` | boolean | Nein | `true` | Markiert das Event als erledigt. |
| `auto_done` | boolean | Nein | `false` | Falls `true`, markiert das System das Event automatisch als erledigt (z. B. nach Versand einer Nachricht). |
| `done_at` | datetime (UTC) | Nein | `2025-01-18T15:30:00Z` | Wann erledigt. |
| `scheduled_at` | datetime (UTC) | Manchmal | `2025-01-20T14:00:00Z` | Pflicht für geplante Nachrichten. |
| `send_now` | boolean | Manchmal | `true` | Pflicht für "Jetzt senden"-Nachrichten. |
| `app_type` | string | Manchmal | `Apps::Chatwoot` | Eines von `Apps::Chatwoot`, `Apps::EvolutionApi`. |
| `app_id` | integer | Manchmal | `5` | ID der App-Integration. |
| `additional_attributes` | object | Manchmal | `{ "chatwoot_inbox_id": "62483" }` | App-spezifische Zusatzfelder. |
| `custom_attributes` | object | Nein | `{ "channel": "whatsapp" }` | Freie Custom Fields. |

Die nächsten Abschnitte zeigen den exakten Body je `kind`.

---

## 1. Notiz erstellen (`kind = note`)

Eine Notiz ist freier Text auf der Deal-Timeline. Keine Side Effects.

### Body

```json
{
  "kind": "note",
  "content": "Textinhalt..."
}
```

### Beispiel-Request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals/1/events" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer IHR_TOKEN_HIER" \
  -d '{
    "kind": "note",
    "content": "Kunden angerufen, um die nächsten Schritte zu besprechen."
  }'
```

### Beispiel-Antwort — `201 Created`

```json
{
  "id": 88,
  "deal_id": 1,
  "kind": "note",
  "content": "Kunden angerufen, um die nächsten Schritte zu besprechen.",
  "created_at": "2025-01-15T10:30:00Z"
}
```

---

## 2. Aktivität erstellen (`kind = activity`)

Eine Aktivität ist eine geplante Aufgabe auf der Timeline (Anruf, Termin, Follow-up).

### Body

```json
{
  "title": "Activity example title",
  "kind": "activity",
  "content": "Textinhalt...",
  "scheduled_at": "2025-01-20T14:00:00Z",
  "done": false
}
```

### Beispiel-Request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals/1/events" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer IHR_TOKEN_HIER" \
  -d '{
    "title": "Follow-up-Anruf",
    "kind": "activity",
    "content": "Bestätigen, dass das Angebot eingegangen ist",
    "scheduled_at": "2025-01-20T14:00:00Z",
    "done": false
  }'
```

### Beispiel-Antwort — `201 Created`

```json
{
  "id": 89,
  "deal_id": 1,
  "kind": "activity",
  "title": "Follow-up-Anruf",
  "content": "Bestätigen, dass das Angebot eingegangen ist",
  "scheduled_at": "2025-01-20T14:00:00Z",
  "done": false,
  "created_at": "2025-01-15T10:30:00Z"
}
```

---

## 3. Chatwoot-Nachricht planen (`kind = chatwoot_message`)

Plant eine Nachricht, die zum Zeitpunkt `scheduled_at` über eine Chatwoot-Inbox versendet wird.

### Body

```json
{
  "title": "Chatwoot Message",
  "content": "Wie geht es?",
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

### Pflichtfelder dieses kinds

| Attribut | Pflicht | Hinweise |
| --- | --- | --- |
| `kind` | Ja | Muss `chatwoot_message` sein. |
| `content` | Ja | Nachrichtentext. |
| `scheduled_at` | Ja | UTC. |
| `app_type` | Ja | `Apps::Chatwoot`. |
| `app_id` | Ja | ID der Chatwoot-Integration. |
| `additional_attributes.chatwoot_inbox_id` | Ja | Ziel-Inbox. |

### Beispiel-Request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals/1/events" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer IHR_TOKEN_HIER" \
  -d '{
    "title": "Chatwoot Message",
    "content": "Wie geht es?",
    "kind": "chatwoot_message",
    "auto_done": false,
    "scheduled_at": "2025-01-20T14:00:00Z",
    "app_type": "Apps::Chatwoot",
    "app_id": 6,
    "additional_attributes": { "chatwoot_inbox_id": "62483" }
  }'
```

---

## 4. Chatwoot-Nachricht sofort senden

Selber `kind`, aber **sofort gesendet** mit `send_now: true`.

### Body

```json
{
  "title": "Chatwoot Message",
  "content": "Wie geht es?",
  "kind": "chatwoot_message",
  "send_now": true,
  "app_type": "Apps::Chatwoot",
  "app_id": 5,
  "additional_attributes": {
    "chatwoot_inbox_id": "62483"
  }
}
```

### Pflichtfelder dieses kinds

| Attribut | Pflicht | Hinweise |
| --- | --- | --- |
| `kind` | Ja | `chatwoot_message`. |
| `content` | Ja | Nachrichtentext. |
| `send_now` | Ja | `true`. |
| `app_type` | Ja | `Apps::Chatwoot`. |
| `app_id` | Ja | ID der Chatwoot-Integration. |
| `additional_attributes.chatwoot_inbox_id` | Ja | Ziel-Inbox. |

---

## 5. WhatsApp-Nachricht planen (`kind = evolution_api_message`)

Plant eine Evolution-API-(WhatsApp-)Nachricht für `scheduled_at`.

### Body

```json
{
  "title": "Whatsapp Message",
  "content": "Wie geht es?",
  "kind": "evolution_api_message",
  "auto_done": false,
  "scheduled_at": "2025-01-20T14:00:00Z",
  "app_type": "Apps::EvolutionApi",
  "app_id": 5
}
```

### Pflichtfelder dieses kinds

| Attribut | Pflicht | Hinweise |
| --- | --- | --- |
| `kind` | Ja | `evolution_api_message`. |
| `content` | Ja | Nachrichtentext. |
| `scheduled_at` | Ja | UTC. |
| `app_type` | Ja | `Apps::EvolutionApi`. |
| `app_id` | Ja | ID der Evolution-API-Integration. |

### Beispiel-Request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals/1/events" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer IHR_TOKEN_HIER" \
  -d '{
    "title": "Whatsapp Message",
    "content": "Wie geht es?",
    "kind": "evolution_api_message",
    "scheduled_at": "2025-01-20T14:00:00Z",
    "app_type": "Apps::EvolutionApi",
    "app_id": 5
  }'
```

---

## 6. WhatsApp-Nachricht sofort senden

Selber `kind` wie zuvor, aber mit `send_now: true`.

### Body

```json
{
  "title": "Whatsapp Message",
  "content": "Wie geht es?",
  "kind": "evolution_api_message",
  "send_now": true,
  "app_type": "Apps::EvolutionApi",
  "app_id": 5
}
```

### Beispiel-Request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals/1/events" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer IHR_TOKEN_HIER" \
  -d '{
    "title": "Whatsapp Message",
    "content": "Wie geht es?",
    "kind": "evolution_api_message",
    "send_now": true,
    "app_type": "Apps::EvolutionApi",
    "app_id": 5
  }'
```

---

## Mögliche Fehler

| Status | Wann |
| --- | --- |
| `401` | Token fehlt oder ungültig. |
| `404` | Der Deal existiert in diesem Account nicht. |
| `422` | Ungültiger `kind`, fehlendes Pflichtfeld für den gewählten Kind, ungültiger `scheduled_at`, oder unbekannte `app_id` / `app_type`. |
