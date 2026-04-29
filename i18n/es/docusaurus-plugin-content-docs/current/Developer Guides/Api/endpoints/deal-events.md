---
sidebar_label: "Eventos de negocio"
title: "Eventos de negocio"
sidebar_position: 3
---

# Eventos de negocio

Un **evento de negocio** es cualquier cosa que aparece en el timeline de un deal: una nota, una actividad programada, o un mensaje despachado vía Chatwoot o Evolution API (WhatsApp).

Hay un único endpoint, pero acepta varios **tipos** (kinds) de evento. El campo `kind` decide qué campos son obligatorios y qué efectos secundarios ejecuta el sistema.

## Endpoint

`POST /api/v1/accounts/{account_id}/deals/{deal_id}/events`

| Path param | Tipo | Obligatorio | Descripción |
| --- | --- | --- | --- |
| `account_id` | integer | Sí | Ámbito de la cuenta. |
| `deal_id` | integer | Sí | El negocio que recibirá el evento. |

### Headers

| Header | Valor |
| --- | --- |
| `Content-Type` | `application/json` |
| `Authorization` | `Bearer TU_TOKEN_AQUÍ` |

## Atributos comunes

| Atributo | Tipo | Obligatorio | Ejemplo | Notas |
| --- | --- | --- | --- | --- |
| `kind` | string | Sí | `note` | Uno de `note`, `activity`, `chatwoot_message`, `evolution_api_message`. |
| `title` | string | No | `Llamada de seguimiento` | Default vacío. |
| `content` | string | Casi siempre | `¿Cómo estás?` | Cuerpo de la nota / actividad / mensaje. |
| `done` | boolean | No | `true` | Marca el evento como completado. |
| `auto_done` | boolean | No | `false` | Si es `true`, el sistema marca el evento como done automáticamente (p. ej. tras enviar un mensaje). |
| `done_at` | datetime (UTC) | No | `2025-01-18T15:30:00Z` | Cuándo se completó. |
| `scheduled_at` | datetime (UTC) | A veces | `2025-01-20T14:00:00Z` | Obligatorio para mensajes programados. |
| `send_now` | boolean | A veces | `true` | Obligatorio para mensajes "enviar ahora". |
| `app_type` | string | A veces | `Apps::Chatwoot` | Uno de `Apps::Chatwoot`, `Apps::EvolutionApi`. |
| `app_id` | integer | A veces | `5` | ID de la integración del app. |
| `additional_attributes` | object | A veces | `{ "chatwoot_inbox_id": "62483" }` | Extras específicos del app. |
| `custom_attributes` | object | No | `{ "channel": "whatsapp" }` | Campos personalizados libres. |

Las siguientes secciones muestran el body exacto para cada `kind`.

---

## 1. Crear nota (`kind = note`)

Una nota es un registro de texto libre en el timeline del negocio. Sin efectos secundarios.

### Body

```json
{
  "kind": "note",
  "content": "Contenido del texto..."
}
```

### Ejemplo de petición

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals/1/events" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUÍ" \
  -d '{
    "kind": "note",
    "content": "Llamé al cliente para discutir los próximos pasos."
  }'
```

### Ejemplo de respuesta — `201 Created`

```json
{
  "id": 88,
  "deal_id": 1,
  "kind": "note",
  "content": "Llamé al cliente para discutir los próximos pasos.",
  "created_at": "2025-01-15T10:30:00Z"
}
```

---

## 2. Crear actividad (`kind = activity`)

Una actividad es una tarea programada en el timeline (una llamada, una reunión, un follow-up).

### Body

```json
{
  "title": "Activity example title",
  "kind": "activity",
  "content": "Contenido del texto...",
  "scheduled_at": "2025-01-20T14:00:00Z",
  "done": false
}
```

### Ejemplo de petición

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals/1/events" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUÍ" \
  -d '{
    "title": "Llamada de seguimiento",
    "kind": "activity",
    "content": "Confirmar que se recibió la propuesta",
    "scheduled_at": "2025-01-20T14:00:00Z",
    "done": false
  }'
```

### Ejemplo de respuesta — `201 Created`

```json
{
  "id": 89,
  "deal_id": 1,
  "kind": "activity",
  "title": "Llamada de seguimiento",
  "content": "Confirmar que se recibió la propuesta",
  "scheduled_at": "2025-01-20T14:00:00Z",
  "done": false,
  "created_at": "2025-01-15T10:30:00Z"
}
```

---

## 3. Programar mensaje de Chatwoot (`kind = chatwoot_message`)

Programa un mensaje que será enviado por una inbox de Chatwoot en `scheduled_at`.

### Body

```json
{
  "title": "Chatwoot Message",
  "content": "¿Cómo estás?",
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

### Campos obligatorios para este kind

| Atributo | Obligatorio | Notas |
| --- | --- | --- |
| `kind` | Sí | Debe ser `chatwoot_message`. |
| `content` | Sí | Cuerpo del mensaje. |
| `scheduled_at` | Sí | UTC. |
| `app_type` | Sí | `Apps::Chatwoot`. |
| `app_id` | Sí | ID de la integración Chatwoot. |
| `additional_attributes.chatwoot_inbox_id` | Sí | Inbox de destino. |

### Ejemplo de petición

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals/1/events" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUÍ" \
  -d '{
    "title": "Chatwoot Message",
    "content": "¿Cómo estás?",
    "kind": "chatwoot_message",
    "auto_done": false,
    "scheduled_at": "2025-01-20T14:00:00Z",
    "app_type": "Apps::Chatwoot",
    "app_id": 6,
    "additional_attributes": { "chatwoot_inbox_id": "62483" }
  }'
```

---

## 4. Enviar mensaje de Chatwoot inmediatamente

Mismo `kind` que el anterior, pero **enviado inmediatamente** con `send_now: true` y el ID de una conversación existente.

### Body

```json
{
  "title": "Chatwoot Message",
  "content": "¿Cómo estás?",
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

### Campos obligatorios para este kind

| Atributo | Obligatorio | Notas |
| --- | --- | --- |
| `kind` | Sí | `chatwoot_message`. |
| `content` | Sí | Cuerpo del mensaje. |
| `send_now` | Sí | `true`. |
| `app_type` | Sí | `Apps::Chatwoot`. |
| `app_id` | Sí | ID de la integración Chatwoot. |
| `additional_attributes.chatwoot_inbox_id` | Sí | Inbox de destino. |
| `additional_attributes.chatwoot_conversation_id` | Sí | Conversación que recibirá el mensaje. |

---

## 5. Programar mensaje de WhatsApp (`kind = evolution_api_message`)

Programa un mensaje de Evolution API (WhatsApp) para enviarse en `scheduled_at`.

### Body

```json
{
  "title": "Whatsapp Message",
  "content": "¿Cómo estás?",
  "kind": "evolution_api_message",
  "auto_done": false,
  "scheduled_at": "2025-01-20T14:00:00Z",
  "app_type": "Apps::EvolutionApi",
  "app_id": 5
}
```

### Campos obligatorios para este kind

| Atributo | Obligatorio | Notas |
| --- | --- | --- |
| `kind` | Sí | `evolution_api_message`. |
| `content` | Sí | Cuerpo del mensaje. |
| `scheduled_at` | Sí | UTC. |
| `app_type` | Sí | `Apps::EvolutionApi`. |
| `app_id` | Sí | ID de la integración Evolution API. |

### Ejemplo de petición

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals/1/events" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUÍ" \
  -d '{
    "title": "Whatsapp Message",
    "content": "¿Cómo estás?",
    "kind": "evolution_api_message",
    "scheduled_at": "2025-01-20T14:00:00Z",
    "app_type": "Apps::EvolutionApi",
    "app_id": 5
  }'
```

---

## 6. Enviar mensaje de WhatsApp inmediatamente

Mismo `kind` que el anterior, pero con `send_now: true`.

### Body

```json
{
  "title": "Whatsapp Message",
  "content": "¿Cómo estás?",
  "kind": "evolution_api_message",
  "send_now": true,
  "app_type": "Apps::EvolutionApi",
  "app_id": 5
}
```

### Ejemplo de petición

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals/1/events" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUÍ" \
  -d '{
    "title": "Whatsapp Message",
    "content": "¿Cómo estás?",
    "kind": "evolution_api_message",
    "send_now": true,
    "app_type": "Apps::EvolutionApi",
    "app_id": 5
  }'
```

---

## Posibles errores

| Status | Cuándo |
| --- | --- |
| `401` | Token ausente o inválido. |
| `404` | El negocio no existe en esa cuenta. |
| `422` | `kind` inválido, campo obligatorio del kind ausente, `scheduled_at` mal formado, o `app_id` / `app_type` desconocido. |
