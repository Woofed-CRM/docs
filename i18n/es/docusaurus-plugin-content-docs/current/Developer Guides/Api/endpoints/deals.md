---
sidebar_label: "Negocios"
title: "Negocios (Deals)"
sidebar_position: 2
---

# Negocios

Un **negocio** (deal) es una oportunidad de venta dentro de un pipeline. Pertenece a un contacto, está en un estágio específico y tiene un status (`open`, `won`, `lost`).

## Estructura del recurso

| Atributo | Tipo | Obligatorio | Ejemplo | Notas |
| --- | --- | --- | --- | --- |
| `name` | string | No | `Negocio con John` | Título del negocio. |
| `status` | string | No | `open` | Default `open`. Valores comunes: `open`, `won`, `lost`. |
| `stage_id` | integer | Sí | `3` | Estágio en el que vive el negocio. |
| `pipeline_id` | integer | No | `1` | Debe corresponder al pipeline de `stage_id`. |
| `contact_id` | integer | Sí | `42` | Contacto asociado al negocio. |
| `position` | integer | No | `2` | Posición dentro del estágio (orden en el kanban). |
| `lost_reason` | string | No | `Precio demasiado alto` | Motivo cuando `status = lost`. |
| `lost_at` | datetime (UTC) | No | `2025-01-15T10:30:00Z` | Debe ser UTC. |
| `won_at` | datetime (UTC) | No | `2025-01-20T14:00:00Z` | Debe ser UTC. |
| `custom_attributes` | object | No | `{ "source": "Website" }` | Campos personalizados libres. |
| `contact_attributes` | object | No | `{ "id": 42, "full_name": "John" }` | Cuando se envía a `upsert`, encuentra un contacto existente o crea uno nuevo y lo asocia al negocio. |

Todos los endpoints siguientes asumen:

```
{base_url} = https://app.woofedcrm.com
{account_id} = 1
```

---

## Crear negocio

`POST /api/v1/accounts/{account_id}/deals`

Crea un nuevo negocio en la cuenta.

### Body

```json
{
  "name": "Lead site: Rubel",
  "status": "open",
  "stage_id": 1,
  "contact_id": 1,
  "custom_attributes": {
    "source": "Website",
    "campaign": "Google Ads",
    "utm_medium": "cpc",
    "utm_source": "google",
    "priority": "high",
    "estimated_budget": 15000
  }
}
```

### Ejemplo de petición

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUÍ" \
  -d '{
    "name": "Lead site: Rubel",
    "status": "open",
    "stage_id": 1,
    "contact_id": 1,
    "custom_attributes": {
      "source": "Website",
      "campaign": "Google Ads"
    }
  }'
```

### Ejemplo de respuesta — `201 Created`

```json
{
  "id": 27,
  "name": "Lead site: Rubel",
  "status": "open",
  "stage_id": 1,
  "pipeline_id": 1,
  "contact_id": 1,
  "position": 1,
  "custom_attributes": {
    "source": "Website",
    "campaign": "Google Ads"
  },
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

### Campos de la respuesta

| Campo | Descripción |
| --- | --- |
| `id` | ID numérico del negocio. |
| `pipeline_id` | Inferido de `stage_id` cuando se omite. |
| `position` | Orden dentro del estágio (kanban). |
| `custom_attributes` | Devuelto como se envió. |

### Posibles errores

| Status | Cuándo |
| --- | --- |
| `401` | Token ausente o inválido. |
| `422` | `stage_id` o `contact_id` ausente/inválido, o desajuste de pipeline. |

---

## Buscar negocios

`POST /api/v1/accounts/{account_id}/deals/search`

Busca negocios usando un objeto `query` al estilo Ransack. Consulta [Estructura de la API → Búsqueda](../api-structure#búsqueda) para la lista completa de predicados.

### Body

```json
{
  "query": {
    "name_cont": "Rubel",
    "status_eq": "open",
    "stage_id_eq": 1,
    "pipeline_id_eq": 1,
    "contact_id_eq": 42,
    "created_at_gteq": "2025-01-01T00:00:00Z",
    "updated_at_lteq": "2025-01-31T23:59:59Z",
    "id_eq": 27
  }
}
```

### Ejemplo de petición

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals/search" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUÍ" \
  -d '{
    "query": {
      "name_cont": "Rubel",
      "status_eq": "open"
    }
  }'
```

### Ejemplo de respuesta — `200 OK`

```json
[
  {
    "id": 27,
    "name": "Lead site: Rubel",
    "status": "open",
    "stage_id": 1,
    "pipeline_id": 1,
    "contact_id": 1,
    "position": 1,
    "custom_attributes": { "source": "Website" },
    "created_at": "2025-01-12T18:21:03Z",
    "updated_at": "2025-01-12T18:21:03Z"
  }
]
```

### Posibles errores

| Status | Cuándo |
| --- | --- |
| `400` | JSON mal formado. |
| `401` | Token ausente o inválido. |
| `422` | Predicado desconocido o campo no buscable. |

---

## Obtener negocio

`GET /api/v1/accounts/{account_id}/deals/{id}`

Obtiene un único negocio por ID.

### Ejemplo de petición

```bash
curl -X GET "https://app.woofedcrm.com/api/v1/accounts/1/deals/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUÍ"
```

### Ejemplo de respuesta — `200 OK`

```json
{
  "id": 1,
  "name": "Lead site: Rubel",
  "status": "open",
  "stage_id": 1,
  "pipeline_id": 1,
  "contact_id": 1,
  "position": 1,
  "custom_attributes": { "source": "Website" },
  "created_at": "2025-01-12T18:21:03Z",
  "updated_at": "2025-01-12T18:21:03Z"
}
```

### Posibles errores

| Status | Cuándo |
| --- | --- |
| `401` | Token ausente o inválido. |
| `404` | Negocio no encontrado en esa cuenta. |

---

## Actualizar negocio

`PUT /api/v1/accounts/{account_id}/deals/{id}`

Actualiza un negocio existente. Puedes cambiar cualquier subconjunto de campos; los campos omitidos no se modifican.

### Body

```json
{
  "name": "Lead site: Rubel (Lost)",
  "status": "lost",
  "stage_id": 2,
  "lost_reason": "Precio demasiado alto",
  "lost_at": "2025-01-18T16:45:00Z",
  "custom_attributes": {
    "source": "Website",
    "competitor": "Competidor X",
    "final_offer_value": 12000
  }
}
```

### Ejemplo de petición

```bash
curl -X PUT "https://app.woofedcrm.com/api/v1/accounts/1/deals/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUÍ" \
  -d '{
    "status": "lost",
    "lost_reason": "Precio demasiado alto",
    "lost_at": "2025-01-18T16:45:00Z"
  }'
```

### Ejemplo de respuesta — `200 OK`

```json
{
  "id": 1,
  "name": "Lead site: Rubel (Lost)",
  "status": "lost",
  "stage_id": 2,
  "lost_reason": "Precio demasiado alto",
  "lost_at": "2025-01-18T16:45:00Z",
  "updated_at": "2025-01-18T16:45:00Z"
}
```

### Posibles errores

| Status | Cuándo |
| --- | --- |
| `401` | Token ausente o inválido. |
| `404` | Negocio no encontrado. |
| `422` | Error de validación (p. ej. `status` inválido, mismatch entre `stage_id` y `pipeline_id`, `lost_at` mal formado). |

---

## Upsert de negocio

`POST /api/v1/accounts/{account_id}/deals/upsert`

Crea el negocio si no existe ningún match, o actualiza el existente. Útil para sincronizar deals desde sistemas externos.

Cuando envías `contact_attributes`, la API intenta encontrar un contacto existente que coincida con esos atributos; si no lo encuentra, crea un nuevo contacto y lo asocia al negocio.

### Body

```json
{
  "stage_id": 1,
  "pipeline_id": 1,
  "name": "Lead site: Rubel",
  "contact_id": 1,
  "status": "open",
  "custom_attributes": { "CPF": "123456789-87" }
}
```

### Ejemplo de petición

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals/upsert" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUÍ" \
  -d '{
    "stage_id": 1,
    "pipeline_id": 1,
    "name": "Lead site: Rubel",
    "contact_id": 1,
    "status": "open",
    "custom_attributes": { "CPF": "123456789-87" }
  }'
```

### Ejemplo de respuesta — `200 OK` (actualizado) o `201 Created` (nuevo)

```json
{
  "id": 27,
  "stage_id": 1,
  "pipeline_id": 1,
  "name": "Lead site: Rubel",
  "contact_id": 1,
  "status": "open",
  "custom_attributes": { "CPF": "123456789-87" },
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-20T11:42:18Z"
}
```

### Posibles errores

| Status | Cuándo |
| --- | --- |
| `401` | Token ausente o inválido. |
| `422` | Mismatch de pipeline / estágio, o campo obligatorio ausente. |

---

## Endpoints relacionados

- [**Eventos de negocio**](./deal-events) — agrega notas, actividades y mensajes programados (WhatsApp / Chatwoot) a un negocio.
- [**Productos del negocio**](./deal-products) — adjunta productos a un negocio.
- [**Asignados al negocio**](./deal-assignees) — asigna negocios a usuarios.
