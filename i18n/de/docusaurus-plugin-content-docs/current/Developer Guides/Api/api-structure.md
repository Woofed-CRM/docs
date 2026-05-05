---
sidebar_label: "API-Struktur"
title: "API-Struktur"
sidebar_position: 5
---

# API-Struktur

Diese Seite beschreibt die Konventionen, denen jeder Endpoint der Woofed CRM API folgt. Wenn Sie die folgenden Regeln verstanden haben, liest sich jeder Endpoint in der [Referenz](./endpoints/contacts) auf gleiche Weise.

## URL-Muster

Alle Endpoints liegen unter einem einzigen, accountbezogenen Namespace:

```
{base_url}/api/v1/accounts/{account_id}/<resource>[/<id>][/<sub-action>]
```

| Segment | Beschreibung |
| --- | --- |
| `{base_url}` | `https://app.woofedcrm.com` in der Cloud, oder Ihr eigener Host bei Self-Hosting. |
| `api/v1` | API-Version. |
| `accounts/{account_id}` | Der Account, dem die Daten gehören. Jede Ressource ist account-scoped. |
| `<resource>` | Die Ressourcen-Collection: `contacts`, `deals`, `products`, `users`, `deal_products`, `deal_assignees`. |
| `<id>` | Eine konkrete Datensatz-ID (numerisch). |
| `<sub-action>` | Optionale Sub-Aktion wie `search`, `upsert` oder verschachtelte Ressourcen wie `events`. |

## HTTP-Verben

Die API folgt REST-Konventionen:

| Verb | Verwendung |
| --- | --- |
| `GET` | Einzelne Ressource abrufen. |
| `POST` | Ressource erstellen, Suche oder `upsert` ausführen. |
| `PUT` | Bestehende Ressource aktualisieren (vollständig / partiell). |
| `DELETE` | Ressource entfernen. |

## Request-Format

Requests mit Body verwenden immer **JSON**. Senden Sie immer diese beiden Header:

```http
Content-Type: application/json
Authorization: Bearer IHR_TOKEN_HIER
```

Beispiel-Body zum Erstellen eines Kontakts:

```json
{
  "full_name": "Tim Maia",
  "phone": "+5541996910256",
  "email": "tim@maia.com",
  "custom_attributes": { "city": "RJ" },
  "label_list": ["label1", "label2"]
}
```

## Response-Format

Erfolgreiche Antworten liefern ein JSON-Dokument, das die Ressource (oder ein Array von Ressourcen bei Listenoperationen) repräsentiert. Feldnamen verwenden `snake_case`, Zeitstempel sind ISO 8601 in UTC.

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

### Custom Attributes

Die meisten Ressourcen bieten ein JSON-Objekt `custom_attributes`. Es ist ein freier Key-Value-Speicher für Felder, die es nicht als native Spalten gibt (`source`, `cpf`, `priority`, …). Die hinterlegten Schlüssel werden exakt so zurückgegeben, wie Sie sie gesendet haben.

### Datum/Uhrzeit

Senden Sie Zeitwerte stets in **ISO 8601 UTC** (`2025-01-20T14:00:00Z`). Strings mit Zeitzone werden in `scheduled_at`, `done_at`, `won_at`, `lost_at` etc. nicht akzeptiert.

## Statuscodes

| Code | Bedeutung |
| --- | --- |
| `200 OK` | Request erfolgreich; Body enthält die angefragte Ressource. |
| `201 Created` | Ressource wurde erfolgreich erstellt. |
| `204 No Content` | Erfolgreich, kein Body (typischerweise bei `DELETE`). |
| `400 Bad Request` | Body ist kein gültiges JSON oder Pflichtfelder fehlen. |
| `401 Unauthorized` | Token fehlt, ist falsch formatiert oder abgelaufen. Siehe [Authentifizierung](./authentication). |
| `403 Forbidden` | Token gültig, aber Benutzer hat keinen Zugriff auf die Ressource. |
| `404 Not Found` | Falsche URL, oder der Datensatz existiert in diesem Account nicht. |
| `422 Unprocessable Entity` | Validierungsfehler — z. B. ungültiges E-Mail-Format, fehlende `stage_id` beim Erstellen eines Deals etc. |
| `429 Too Many Requests` | Rate Limit erreicht — Backoff machen und nach kurzer Pause neu versuchen. |
| `5xx` | Serverseitiger Fehler. Mit Exponential Backoff bis zu dreimal wiederholen, bei Persistenz Support kontaktieren. |

## Fehlerbehandlung

Fehler werden als JSON-Body mit Details geliefert. Häufige Form:

```json
{
  "errors": {
    "email": ["is invalid"],
    "stage_id": ["can't be blank"]
  }
}
```

Oder bei Top-Level-Fehlern:

```json
{
  "error": "Unauthorized"
}
```

Empfohlenes Client-Verhalten:

- `2xx` als Erfolg behandeln.
- `4xx` als **Client-Bug** behandeln: Request und Fehler-Body loggen, um den Input zu reparieren.
- `5xx` als **transienten Fehler** behandeln: bis zu dreimal mit Exponential Backoff wiederholen.

## Suche

Ressourcen mit `/search` (Kontakte, Produkte, Benutzer — siehe jeweilige Endpoint-Seite) verwenden eine mächtige **Ransack-artige Abfragesprache**. Sie bauen ein `query`-Objekt, dessen Schlüssel `<feld>_<prädikat>` sind:

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

Unterstützte Prädikate (die häufigsten):

| Prädikat | Bedeutung |
| --- | --- |
| `*_eq` | Gleich |
| `*_not_eq` | Ungleich |
| `*_cont` | Enthält (Substring) |
| `*_not_cont` | Enthält nicht |
| `*_start` / `*_end` | Beginnt mit / endet mit |
| `*_lt` / `*_lteq` | Kleiner / kleiner gleich |
| `*_gt` / `*_gteq` | Größer / größer gleich |
| `*_in` / `*_not_in` | In / nicht in einer Liste |
| `*_present` / `*_blank` | Vorhanden / leer |
| `*_null` / `*_not_null` | Null / nicht null |
| `*_true` / `*_false` | Boolean wahr / falsch |
| `*_matches` | Passt zu einem SQL-`LIKE`-Muster |

Jedes Prädikat akzeptiert zusätzlich die Suffixe `_any` und `_all`, um gegen eine Liste zu matchen:

```json
{ "query": { "label_list_cont_any": ["vip", "trial"] } }
```

Eine vollständige Prädikat-Referenz ist in jedem suchbaren Endpoint enthalten.

## Paginierung, Filter und Sortierung

Die meisten Listen-Endpoints akzeptieren Query-Parameter für Paginierung und Sortierung. Wenn unterstützt, gelten folgende Konventionen:

- `page` — Seitennummer (1-basiert).
- `per_page` — Einträge pro Seite (Default je Ressource unterschiedlich).
- `sort` — Sortierfeld (z. B. `sort=created_at desc`).

Jede Endpoint-Seite dokumentiert die tatsächlich unterstützten Parameter.

## Idempotenz und `upsert`

Manche Ressourcen bieten eine `upsert`-Aktion (z. B. `POST /contacts/upsert`, `POST /deals/upsert`). Sie **erzeugt** den Datensatz, falls keiner gefunden wird, oder **aktualisiert** den vorhandenen. Das ist das Mittel der Wahl für nächtliche Synchronisationen oder jede Pipeline, in der das Quellsystem die Wahrheit hält.

## Nächster Schritt

Stöbern Sie in der vollständigen Referenz, beginnend mit [**Kontakte**](./endpoints/contacts).
