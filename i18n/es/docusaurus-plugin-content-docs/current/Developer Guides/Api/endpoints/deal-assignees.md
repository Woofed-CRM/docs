---
sidebar_label: "Asignados al negocio"
title: "Asignados al negocio"
sidebar_position: 7
---

# Asignados al negocio

Un **asignado al negocio** (deal assignee) es el vínculo entre un [negocio](./deals) y un [usuario](./users). Un negocio puede tener uno o más asignados — típicamente los vendedores a cargo de hacerlo avanzar.

Este endpoint es el que llamas para **asignar negocios automáticamente** (distribución round-robin, asignación automática de SDR, rebalanceo cuando un usuario sale, …).

## Estructura del recurso

| Atributo | Tipo | Obligatorio | Ejemplo | Notas |
| --- | --- | --- | --- | --- |
| `deal_id` | integer | Sí | `25` | Negocio que será asignado. |
| `user_id` | integer | Sí | `7` | Usuario que será asignado al negocio. |

Todos los endpoints siguientes asumen:

```
{base_url} = https://app.woofedcrm.com
{account_id} = 1
```

---

## Crear asignado al negocio

`POST /api/v1/accounts/{account_id}/deal_assignees`

Asigna un usuario a un negocio.

### Body

```json
{
  "user_id": 1,
  "deal_id": 1
}
```

### Ejemplo de petición

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deal_assignees" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUÍ" \
  -d '{
    "user_id": 1,
    "deal_id": 1
  }'
```

### Ejemplo de respuesta — `201 Created`

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

### Posibles errores

| Status | Cuándo |
| --- | --- |
| `401` | Token ausente o inválido. |
| `404` | El negocio o el usuario no existe en esa cuenta. |
| `422` | `user_id` / `deal_id` ausente, o el usuario ya está asignado a ese negocio. |

---

## Eliminar asignado al negocio

`DELETE /api/v1/accounts/{account_id}/deal_assignees/{id}`

Elimina la asignación entre un usuario y un negocio.

### Path params

| Nombre | Tipo | Obligatorio | Descripción |
| --- | --- | --- | --- |
| `account_id` | integer | Sí | Ámbito de la cuenta. |
| `id` | integer | Sí | ID del deal assignee (de la respuesta del create). |

### Ejemplo de petición

```bash
curl -X DELETE "https://app.woofedcrm.com/api/v1/accounts/1/deal_assignees/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUÍ"
```

### Ejemplo de respuesta — `204 No Content`

No se devuelve body.

### Posibles errores

| Status | Cuándo |
| --- | --- |
| `401` | Token ausente o inválido. |
| `404` | Deal assignee no encontrado en esa cuenta. |

---

## Endpoints relacionados

- [**Obtener negocio**](./deals#obtener-negocio) — para obtener el `id` de un `deal_assignee`, consulta el negocio al que pertenece con `GET /api/v1/accounts/{account_id}/deals/{id}`. La respuesta incluye un array `deal_assignees` con todos los asignados de ese negocio y todos sus campos (`id`, `deal_id`, `user_id`, …) — usa el `id` devuelto para llamar a [Eliminar asignado al negocio](#eliminar-asignado-al-negocio).
