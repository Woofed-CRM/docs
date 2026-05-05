---
sidebar_label: "Estructura de la API"
title: "Estructura de la API"
sidebar_position: 5
---

# Estructura de la API

Esta página describe las convenciones que sigue cada endpoint de la API de Woofed CRM. Una vez que entiendas las reglas siguientes, todo endpoint de la [referencia](./endpoints/contacts) se lee de la misma manera.

## Patrón de URL

Todos los endpoints viven bajo un único namespace, acotado por cuenta:

```
{base_url}/api/v1/accounts/{account_id}/<resource>[/<id>][/<sub-action>]
```

| Segmento | Descripción |
| --- | --- |
| `{base_url}` | `https://app.woofedcrm.com` en el cloud, o tu propio host en una instalación self-hosted. |
| `api/v1` | Versión de la API. |
| `accounts/{account_id}` | La cuenta dueña de los datos. Cada recurso está acotado por cuenta. |
| `<resource>` | La colección del recurso: `contacts`, `deals`, `products`, `users`, `deal_products`, `deal_assignees`. |
| `<id>` | Un ID específico (numérico). |
| `<sub-action>` | Sub-acción opcional como `search`, `upsert`, o recursos anidados como `events`. |

## Verbos HTTP

La API sigue las convenciones REST:

| Verbo | Usado para |
| --- | --- |
| `GET` | Obtener un único recurso. |
| `POST` | Crear un recurso, ejecutar una búsqueda o un `upsert`. |
| `PUT` | Actualizar un recurso existente (reemplazo total / parcial). |
| `DELETE` | Eliminar un recurso. |

## Formato de la petición

Las peticiones que envían cuerpo siempre usan **JSON**. Debes enviar siempre estas dos cabeceras:

```http
Content-Type: application/json
Authorization: Bearer TU_TOKEN_AQUÍ
```

Ejemplo de body para crear un contacto:

```json
{
  "full_name": "Tim Maia",
  "phone": "+5541996910256",
  "email": "tim@maia.com",
  "custom_attributes": { "city": "RJ" },
  "label_list": ["label1", "label2"]
}
```

## Formato de la respuesta

Las respuestas exitosas devuelven un documento JSON que representa el recurso (o un array de recursos, en operaciones de listado). Los nombres de campos usan `snake_case` y los timestamps están en ISO 8601 en UTC.

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

### Atributos personalizados

La mayoría de los recursos exponen un objeto JSON `custom_attributes`. Es una bolsa libre de pares clave/valor pensada para guardar campos que no existen como columnas nativas (`source`, `cpf`, `priority`, …). Las claves que guardes ahí se devuelven exactamente como las enviaste.

### Fechas y horas

Envía siempre las fechas en **ISO 8601 UTC** (`2025-01-20T14:00:00Z`). Las cadenas con zona horaria no son aceptadas en `scheduled_at`, `done_at`, `won_at`, `lost_at`, etc.

## Status codes

| Código | Significado |
| --- | --- |
| `200 OK` | La petición tuvo éxito; el body contiene el recurso solicitado. |
| `201 Created` | Un recurso se creó con éxito. |
| `204 No Content` | La petición tuvo éxito y no hay body para devolver (típicamente `DELETE`). |
| `400 Bad Request` | El body es JSON mal formado, o faltan campos obligatorios. |
| `401 Unauthorized` | Token ausente, mal formateado o expirado. Consulta [Autenticación](./authentication). |
| `403 Forbidden` | El token es válido pero el usuario no tiene acceso al recurso. |
| `404 Not Found` | URL incorrecta, o el registro no existe en esa cuenta. |
| `422 Unprocessable Entity` | Error de validación — p. ej. formato de email inválido, falta `stage_id` al crear un deal, etc. |
| `429 Too Many Requests` | Límite de peticiones alcanzado — haz back-off y reintenta tras una pequeña espera. |
| `5xx` | Error del servidor. Reintenta con backoff exponencial y contacta a soporte si persiste. |

## Manejo de errores

Los errores devuelven un body JSON con detalles de qué salió mal. La forma común es:

```json
{
  "errors": {
    "email": ["is invalid"],
    "stage_id": ["can't be blank"]
  }
}
```

O para errores de nivel superior:

```json
{
  "error": "Unauthorized"
}
```

Comportamiento recomendado del cliente:

- Trata cualquier `2xx` como éxito.
- Trata cualquier `4xx` como un **bug del cliente**: registra la petición y el body de error para corregir el input.
- Trata cualquier `5xx` como un **fallo transitorio**: reintenta hasta 3 veces con backoff exponencial.

## Búsqueda

Los recursos que exponen `/search` (contactos, productos, usuarios — consulta la página de cada endpoint) usan un poderoso **lenguaje de búsqueda al estilo Ransack**. Construyes un objeto `query` cuyas claves son `<campo>_<predicado>`:

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

Predicados soportados (los más comunes):

| Predicado | Significado |
| --- | --- |
| `*_eq` | Igual a |
| `*_not_eq` | Distinto de |
| `*_cont` | Contiene (substring) |
| `*_not_cont` | No contiene |
| `*_start` / `*_end` | Empieza con / termina con |
| `*_lt` / `*_lteq` | Menor que / menor o igual |
| `*_gt` / `*_gteq` | Mayor que / mayor o igual |
| `*_in` / `*_not_in` | Está / no está en una lista |
| `*_present` / `*_blank` | Está presente / en blanco |
| `*_null` / `*_not_null` | Es nulo / no nulo |
| `*_true` / `*_false` | Booleano verdadero / falso |
| `*_matches` | Coincide con un patrón SQL `LIKE` |

Cada predicado también acepta los sufijos `_any` y `_all` para coincidir contra una lista de valores:

```json
{ "query": { "label_list_cont_any": ["vip", "trial"] } }
```

Una referencia completa de predicados acompaña a cada endpoint con búsqueda.

## Paginación, filtros y ordenamiento

La mayoría de los endpoints de listado aceptan query params para paginación y ordenamiento. Cuando se soportan, siguen estas convenciones:

- `page` — número de página (empieza en 1).
- `per_page` — ítems por página (el default varía por recurso).
- `sort` — campo por el que ordenar (p. ej. `sort=created_at desc`).

Cada página de endpoint documenta los parámetros realmente soportados.

## Idempotencia y `upsert`

Algunos recursos exponen una acción `upsert` (p. ej. `POST /contacts/upsert`, `POST /deals/upsert`). **Crea** el registro si no se encuentra ningún match, o **actualiza** el existente. Es el patrón preferido para sincronizaciones nocturnas o cualquier pipeline donde el sistema origen es la fuente de verdad.

## Siguiente paso

Recorre la referencia completa, un recurso a la vez, comenzando por [**Contactos**](./endpoints/contacts).
