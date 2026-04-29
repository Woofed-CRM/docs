---
sidebar_label: "Contactos"
title: "Contactos"
sidebar_position: 1
---

# Contactos

Un **contacto** es una persona dentro de Woofed CRM. Los contactos pueden vincularse a negocios, pueden tener atributos personalizados (ciudad, RUT/CPF, fuente, …) y pueden etiquetarse con labels.

## Estructura del recurso

| Atributo | Tipo | Obligatorio | Ejemplo | Notas |
| --- | --- | --- | --- | --- |
| `full_name` | string | No | `John Doe` | Nombre completo del contacto. |
| `phone` | string | No | `+5511999999999` | Se recomienda formato E.164. |
| `email` | string | No | `john.doe@example.com` | Debe ser un email válido si se proporciona. |
| `label_list` | string \| array | No | `["customer","vip"]` | Etiquetas. String separada por comas o array. |
| `custom_attributes` | object | No | `{ "city": "RJ" }` | JSON libre para campos personalizados. |

Todos los endpoints siguientes asumen:

```
{base_url} = https://app.woofedcrm.com
{account_id} = 1
```

---

## Crear contacto

`POST /api/v1/accounts/{account_id}/contacts`

Crea un nuevo contacto en la cuenta.

### Headers

| Header | Valor |
| --- | --- |
| `Content-Type` | `application/json` |
| `Authorization` | `Bearer TU_TOKEN_AQUÍ` |

### Path params

| Nombre | Tipo | Obligatorio | Descripción |
| --- | --- | --- | --- |
| `account_id` | integer | Sí | Ámbito de la cuenta. |

### Body

```json
{
  "full_name": "Tim Maia",
  "phone": "+5541996910256",
  "email": "tim@maia.com",
  "custom_attributes": { "city": "RJ" },
  "label_list": ["label1", "label2"]
}
```

### Ejemplo de petición

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/contacts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUÍ" \
  -d '{
    "full_name": "Tim Maia",
    "phone": "+5541996910256",
    "email": "tim@maia.com",
    "custom_attributes": { "city": "RJ" },
    "label_list": ["label1", "label2"]
  }'
```

### Ejemplo de respuesta — `201 Created`

```json
{
  "id": 12,
  "full_name": "Tim Maia",
  "phone": "+5541996910256",
  "email": "tim@maia.com",
  "custom_attributes": { "city": "RJ" },
  "additional_attributes": {},
  "app_type": null,
  "app_id": null,
  "account_id": 1,
  "label_list": ["label1", "label2"],
  "chatwoot_conversations_label_list": [],
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

### Campos de la respuesta

| Campo | Descripción |
| --- | --- |
| `id` | ID numérico. Úsalo en llamadas posteriores. |
| `full_name`, `phone`, `email` | Los valores enviados, normalizados. |
| `label_list` | Etiquetas como array (incluso si enviaste una string separada por comas). |
| `custom_attributes` | Devuelto exactamente como se envió. |
| `created_at`, `updated_at` | ISO 8601 (UTC). |

### Posibles errores

| Status | Cuándo |
| --- | --- |
| `401` | Token ausente o inválido. |
| `422` | Formato de email inválido u otra regla de validación falló. |

---

## Buscar contactos

`POST /api/v1/accounts/{account_id}/contacts/search`

Busca contactos usando un objeto `query` al estilo Ransack. Consulta [Estructura de la API → Búsqueda](../api-structure#búsqueda) para la lista completa de predicados.

### Body

```json
{
  "query": {
    "full_name_cont": "John Doe",
    "email_cont": "@example.com",
    "phone_cont": "+55",
    "created_at_gteq": "2025-01-01T00:00:00Z",
    "updated_at_lteq": "2025-01-31T23:59:59Z",
    "id_eq": 42
  }
}
```

### Ejemplo de petición

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/contacts/search" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUÍ" \
  -d '{
    "query": {
      "full_name_cont": "John",
      "email_cont": "@example.com"
    }
  }'
```

### Ejemplo de respuesta — `200 OK`

```json
{
  "data": [
    {
      "id": 42,
      "full_name": "John Doe",
      "phone": "+5511999999999",
      "email": "john.doe@example.com",
      "custom_attributes": { "city": "RJ" },
      "additional_attributes": {},
      "app_type": null,
      "app_id": null,
      "created_at": "2025-01-12T18:21:03Z",
      "updated_at": "2025-01-12T18:21:03Z",
      "account_id": 1,
      "label_list": ["vip"],
      "chatwoot_conversations_label_list": []
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

### Posibles errores

| Status | Cuándo |
| --- | --- |
| `400` | JSON mal formado. |
| `401` | Token ausente o inválido. |
| `422` | Predicado desconocido o campo no buscable. |

---

## Obtener contacto

`GET /api/v1/accounts/{account_id}/contacts/{id}`

Obtiene un único contacto por ID.

### Path params

| Nombre | Tipo | Obligatorio | Descripción |
| --- | --- | --- | --- |
| `account_id` | integer | Sí | Ámbito de la cuenta. |
| `id` | integer | Sí | ID del contacto. |

### Ejemplo de petición

```bash
curl -X GET "https://app.woofedcrm.com/api/v1/accounts/1/contacts/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUÍ"
```

### Ejemplo de respuesta — `200 OK`

La respuesta también devuelve los **deals** y **events** pertenecientes al contacto.

```json
{
  "id": 1,
  "full_name": "Tim Maia",
  "phone": "+5541996910256",
  "email": "tim@maia.com",
  "custom_attributes": { "city": "RJ" },
  "additional_attributes": {},
  "app_type": null,
  "app_id": null,
  "account_id": 1,
  "label_list": ["label1", "label2"],
  "chatwoot_conversations_label_list": [],
  "created_at": "2025-01-12T18:21:03Z",
  "updated_at": "2025-01-12T18:21:03Z",
  "deals": [
    {
      "id": 1,
      "name": "Test Deal",
      "status": "open",
      "stage_id": 1,
      "contact_id": 1,
      "custom_attributes": {},
      "created_at": "2025-01-12T18:21:05Z",
      "updated_at": "2025-01-12T18:21:05Z",
      "pipeline_id": 2,
      "position": 1,
      "created_by_id": null,
      "total_deal_products_amount_in_cents": 0,
      "lost_at": null,
      "won_at": null,
      "lost_reason": "",
      "account_id": 1
    }
  ],
  "events": [
    {
      "id": 1,
      "deal_id": 1,
      "contact_id": 1,
      "app_type": null,
      "app_id": null,
      "kind": "deal_opened",
      "scheduled_at": null,
      "done_at": "2025-01-12T18:21:06Z",
      "from_me": true,
      "status": null,
      "custom_attributes": {},
      "additional_attributes": {
        "stage_id": 1,
        "deal_name": "Test Deal",
        "stage_name": "Stage 1",
        "pipeline_id": 2,
        "pipeline_name": "sales"
      },
      "created_at": "2025-01-12T18:21:06Z",
      "updated_at": "2025-01-12T18:21:06Z",
      "title": "",
      "auto_done": false,
      "account_id": 1,
      "done": true,
      "send_now": null,
      "files": [],
      "files_events": [],
      "invalid_files": null
    },
    {
      "id": 2,
      "deal_id": 1,
      "contact_id": 1,
      "app_type": null,
      "app_id": null,
      "kind": "activity",
      "scheduled_at": null,
      "done_at": null,
      "from_me": null,
      "status": null,
      "custom_attributes": {},
      "additional_attributes": {},
      "created_at": "2025-01-12T18:21:07Z",
      "updated_at": "2025-01-12T18:21:08Z",
      "title": "Test Event",
      "auto_done": false,
      "account_id": 1,
      "done": false,
      "send_now": null,
      "files": [],
      "files_events": [],
      "invalid_files": null
    }
  ]
}
```

### Posibles errores

| Status | Cuándo |
| --- | --- |
| `401` | Token ausente o inválido. |
| `404` | Contacto no encontrado en esa cuenta. |

---

## Upsert de contacto

`POST /api/v1/accounts/{account_id}/contacts/upsert`

**Crea** el contacto si no existe ningún match en la cuenta, o **actualiza** el existente. Las claves de match suelen ser `email` y/o `phone` — si pasas alguno, la API busca un contacto existente con el mismo valor en esa cuenta.

Es el endpoint preferido para jobs de sincronización nocturna.

### Body

```json
{
  "full_name": "Tim Maia",
  "phone": "+5541996910256",
  "email": "tim@maia.com",
  "custom_attributes": { "city": "RJ" },
  "label_list": ["label1", "label2"]
}
```

### Ejemplo de petición

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/contacts/upsert" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUÍ" \
  -d '{
    "full_name": "Tim Maia",
    "phone": "+5541996910256",
    "email": "tim@maia.com",
    "custom_attributes": { "city": "RJ" },
    "label_list": ["label1", "label2"]
  }'
```

### Ejemplo de respuesta — `200 OK` (actualizado) o `201 Created` (nuevo)

```json
{
  "id": 12,
  "full_name": "Tim Maia",
  "phone": "+5541996910256",
  "email": "tim@maia.com",
  "custom_attributes": { "city": "RJ" },
  "additional_attributes": {},
  "app_type": null,
  "app_id": null,
  "account_id": 1,
  "label_list": ["label1", "label2"],
  "chatwoot_conversations_label_list": [],
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-20T11:42:18Z"
}
```

### Posibles errores

| Status | Cuándo |
| --- | --- |
| `401` | Token ausente o inválido. |
| `422` | Error de validación (email inválido, conflicto de campos únicos, …). |

---

## Eliminar contacto

`DELETE /api/v1/accounts/{account_id}/contacts/{id}`

Elimina permanentemente un contacto y todas sus asociaciones. **Esta acción no se puede deshacer.**

### Path params

| Nombre | Tipo | Obligatorio | Descripción |
| --- | --- | --- | --- |
| `account_id` | integer | Sí | Ámbito de la cuenta. |
| `id` | integer | Sí | ID del contacto. |

### Ejemplo de petición

```bash
curl -X DELETE "https://app.woofedcrm.com/api/v1/accounts/1/contacts/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUÍ"
```

### Ejemplo de respuesta — `204 No Content`

No se devuelve body.

### Posibles errores

| Status | Cuándo |
| --- | --- |
| `401` | Token ausente o inválido. |
| `404` | Contacto no encontrado en esa cuenta. |
