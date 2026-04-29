---
sidebar_label: "Deal-Zuweisungen"
title: "Deal-Zuweisungen"
sidebar_position: 7
---

# Deal-Zuweisungen

Eine **Deal-Zuweisung** (deal assignee) ist die Verknüpfung zwischen einem [Deal](./deals) und einem [Benutzer](./users). Ein Deal kann eine oder mehrere Zuweisungen haben — typischerweise die Vertriebspersonen, die den Deal voranbringen.

Diesen Endpoint rufen Sie auf, um **Deals automatisch zuzuweisen** (Round-Robin-Verteilung, automatische SDR-Zuweisung, Rebalancing beim Offboarding, …).

## Ressourcenstruktur

| Attribut | Typ | Pflicht | Beispiel | Hinweise |
| --- | --- | --- | --- | --- |
| `deal_id` | integer | Ja | `25` | Der Deal, der zugewiesen wird. |
| `user_id` | integer | Ja | `7` | Der Benutzer, der dem Deal zugewiesen wird. |

Alle nachfolgenden Endpoints gehen aus von:

```
{base_url} = https://app.woofedcrm.com
{account_id} = 1
```

---

## Deal-Zuweisung erstellen

`POST /api/v1/accounts/{account_id}/deal_assignees`

Weist einen Benutzer einem Deal zu.

### Body

```json
{
  "user_id": 1,
  "deal_id": 1
}
```

### Beispiel-Request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deal_assignees" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer IHR_TOKEN_HIER" \
  -d '{
    "user_id": 1,
    "deal_id": 1
  }'
```

### Beispiel-Antwort — `201 Created`

```json
{
  "id": 33,
  "user_id": 1,
  "deal_id": 1,
  "created_at": "2025-01-15T10:30:00Z"
}
```

### Mögliche Fehler

| Status | Wann |
| --- | --- |
| `401` | Token fehlt oder ungültig. |
| `404` | Deal oder Benutzer existiert in diesem Account nicht. |
| `422` | `user_id` / `deal_id` fehlt, oder Benutzer ist diesem Deal bereits zugewiesen. |

---

## Deal-Zuweisung löschen

`DELETE /api/v1/accounts/{account_id}/deal_assignees/{id}`

Entfernt die Zuweisung zwischen einem Benutzer und einem Deal.

### Path-Parameter

| Name | Typ | Pflicht | Beschreibung |
| --- | --- | --- | --- |
| `account_id` | integer | Ja | Account-Scope. |
| `id` | integer | Ja | ID der Deal-Zuweisung (aus der Antwort des Create-Aufrufs). |

### Beispiel-Request

```bash
curl -X DELETE "https://app.woofedcrm.com/api/v1/accounts/1/deal_assignees/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer IHR_TOKEN_HIER"
```

### Beispiel-Antwort — `204 No Content`

Es wird kein Body zurückgegeben.

### Mögliche Fehler

| Status | Wann |
| --- | --- |
| `401` | Token fehlt oder ungültig. |
| `404` | Deal-Zuweisung in diesem Account nicht gefunden. |
