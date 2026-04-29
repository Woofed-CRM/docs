---
sidebar_label: "Usuarios"
title: "Usuarios"
sidebar_position: 6
---

# Usuarios

Un **usuario** es un miembro de tu cuenta de Woofed CRM — típicamente un vendedor, un SDR o un account manager. Los usuarios son dueños de deals, ejecutan actividades y reciben asignaciones.

## Estructura del recurso

| Atributo | Tipo | Obligatorio | Ejemplo | Notas |
| --- | --- | --- | --- | --- |
| `email` | string | Sí (en creación) | `john.doe@example.com` | Debe ser un email válido. |
| `password` | string | Sí (en creación) | `StrongP@ssw0rd` | Contraseña del usuario. |
| `password_confirmation` | string | Sí (en creación) | `StrongP@ssw0rd` | Debe coincidir con `password`. |
| `full_name` | string | No | `John Doe` | Default vacío. |
| `phone` | string | No | `+5511999999999` | |
| `language` | string | No | `en` | `en`, `pt-BR`, `es`, `de`. Default `en`. |
| `avatar_url` | string | No | `https://example.com/avatar.png` | URL pública del avatar. |
| `job_description` | string | No | `sales_manager` | Default `other`. |
| `webpush_notify_on_event_expired` | boolean | No | `true` | Habilita Web Push cuando un evento expira. |

Todos los endpoints siguientes asumen:

```
{base_url} = https://app.woofedcrm.com
{account_id} = 1
```

---

## Buscar usuarios

`POST /api/v1/accounts/{account_id}/users/search`

Busca usuarios con un objeto `query` al estilo Ransack. Consulta [Estructura de la API → Búsqueda](../api-structure#búsqueda) para la lista de predicados.

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

### Ejemplo de petición

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/users/search" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUÍ" \
  -d '{
    "query": {
      "full_name_cont": "John",
      "language_eq": "en"
    }
  }'
```

### Ejemplo de respuesta — `200 OK`

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

### Posibles errores

| Status | Cuándo |
| --- | --- |
| `400` | JSON mal formado. |
| `401` | Token ausente o inválido. |
| `422` | Predicado desconocido o campo no buscable. |

---

## Crear usuario

`POST /api/v1/accounts/{account_id}/users`

Crea un nuevo usuario dentro de la cuenta.

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

### Ejemplo de petición

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUÍ" \
  -d '{
    "email": "tim@maia.com",
    "password": "StrongP@ssw0rd",
    "password_confirmation": "StrongP@ssw0rd",
    "full_name": "Tim Maia",
    "language": "es"
  }'
```

### Ejemplo de respuesta — `201 Created`

```json
{
  "id": 9,
  "email": "tim@maia.com",
  "full_name": "Tim Maia",
  "phone": "+5541996910256",
  "language": "es",
  "avatar_url": "https://example.com/avatars/tim-maia.png",
  "job_description": "other",
  "webpush_notify_on_event_expired": true,
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

:::caution Endpoint sensible
Crear usuarios concede acceso a la cuenta. Asegúrate de que el token usado para llamar a este endpoint pertenezca a un usuario admin, y nunca expongas esta llamada a un formulario público.
:::

### Posibles errores

| Status | Cuándo |
| --- | --- |
| `401` | Token ausente o inválido. |
| `422` | Email ya en uso, contraseña no coincide, u otro error de validación. |
