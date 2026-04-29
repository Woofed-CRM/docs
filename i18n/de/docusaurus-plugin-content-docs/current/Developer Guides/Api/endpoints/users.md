---
sidebar_label: "Benutzer"
title: "Benutzer"
sidebar_position: 6
---

# Benutzer

Ein **Benutzer** ist Mitglied Ihres Woofed-CRM-Accounts — typischerweise ein Vertriebsmitarbeitender, ein SDR oder ein Account Manager. Benutzer besitzen Deals, führen Aktivitäten aus und erhalten Zuweisungen.

## Ressourcenstruktur

| Attribut | Typ | Pflicht | Beispiel | Hinweise |
| --- | --- | --- | --- | --- |
| `email` | string | Ja (beim Anlegen) | `john.doe@example.com` | Muss eine gültige E-Mail-Adresse sein. |
| `password` | string | Ja (beim Anlegen) | `StrongP@ssw0rd` | Benutzerpasswort. |
| `password_confirmation` | string | Ja (beim Anlegen) | `StrongP@ssw0rd` | Muss mit `password` übereinstimmen. |
| `full_name` | string | Nein | `John Doe` | Default leer. |
| `phone` | string | Nein | `+5511999999999` | |
| `language` | string | Nein | `en` | `en`, `pt-BR`, `es`, `de`. Default `en`. |
| `avatar_url` | string | Nein | `https://example.com/avatar.png` | Öffentliche URL des Avatars. |
| `job_description` | string | Nein | `sales_manager` | Default `other`. |
| `webpush_notify_on_event_expired` | boolean | Nein | `true` | Aktiviert Web-Push, wenn ein Event abläuft. |

Alle nachfolgenden Endpoints gehen aus von:

```
{base_url} = https://app.woofedcrm.com
{account_id} = 1
```

---

## Benutzer suchen

`POST /api/v1/accounts/{account_id}/users/search`

Sucht Benutzer mit einem `query`-Objekt im Ransack-Stil. Prädikatsliste in [API-Struktur → Suche](../api-structure#suche).

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

### Beispiel-Request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/users/search" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer IHR_TOKEN_HIER" \
  -d '{
    "query": {
      "full_name_cont": "John",
      "language_eq": "en"
    }
  }'
```

### Beispiel-Antwort — `200 OK`

```json
[
  {
    "id": 123,
    "email": "john.doe@example.com",
    "full_name": "John Acme",
    "phone": "+15551234567",
    "language": "en",
    "job_description": "ceo",
    "avatar_url": "https://example.com/avatar.png",
    "webpush_notify_on_event_expired": true,
    "created_at": "2025-01-12T18:21:03Z",
    "updated_at": "2025-01-12T18:21:03Z"
  }
]
```

### Mögliche Fehler

| Status | Wann |
| --- | --- |
| `400` | JSON-Body ungültig. |
| `401` | Token fehlt oder ungültig. |
| `422` | Unbekanntes Prädikat oder nicht durchsuchbares Feld. |

---

## Benutzer erstellen

`POST /api/v1/accounts/{account_id}/users`

Erstellt einen neuen Benutzer im Account.

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

### Beispiel-Request

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer IHR_TOKEN_HIER" \
  -d '{
    "email": "tim@maia.com",
    "password": "StrongP@ssw0rd",
    "password_confirmation": "StrongP@ssw0rd",
    "full_name": "Tim Maia",
    "language": "de"
  }'
```

### Beispiel-Antwort — `201 Created`

```json
{
  "id": 9,
  "email": "tim@maia.com",
  "full_name": "Tim Maia",
  "phone": "+5541996910256",
  "language": "de",
  "avatar_url": "https://example.com/avatars/tim-maia.png",
  "job_description": "other",
  "webpush_notify_on_event_expired": true,
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

:::caution Sensibler Endpoint
Das Anlegen von Benutzern gewährt Zugriff auf den Account. Stellen Sie sicher, dass der verwendete Token einem Admin-Benutzer gehört, und exponieren Sie diesen Aufruf niemals in einem öffentlichen Formular.
:::

### Mögliche Fehler

| Status | Wann |
| --- | --- |
| `401` | Token fehlt oder ungültig. |
| `422` | E-Mail bereits vergeben, Passwörter stimmen nicht überein, oder anderer Validierungsfehler. |
