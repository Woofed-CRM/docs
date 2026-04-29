---
sidebar_label: "Productos del negocio"
title: "Productos del negocio"
sidebar_position: 5
---

# Productos del negocio

Un **producto del negocio** (deal product) adjunta un producto (del catálogo — consulta [Productos](./products)) a un negocio con una cantidad y un precio unitario específicos. El precio y el nombre del producto se **fotografían** (snapshot) en el momento de la asociación, así los cambios en el catálogo no reescriben deals pasados.

## Estructura del recurso

| Atributo | Tipo | Obligatorio | Ejemplo | Notas |
| --- | --- | --- | --- | --- |
| `product_id` | integer | Sí (en creación) | `10` | ID de un producto existente. |
| `deal_id` | integer | Sí (en creación) | `25` | ID del negocio que recibirá el producto. |
| `quantity` | integer | No | `2` | Default `1`. |
| `unit_amount_in_cents` | integer | No | `5000` | Default = `amount_in_cents` del producto. |
| `product_name` | string | No | `Plan Premium` | Snapshot. Default = nombre del producto. |
| `product_identifier` | string | No | `SKU-ABC-001` | Snapshot. Default = identificador del producto. |

Todos los endpoints siguientes asumen:

```
{base_url} = https://app.woofedcrm.com
{account_id} = 1
```

---

## Crear producto del negocio

`POST /api/v1/accounts/{account_id}/deal_products`

Adjunta un producto a un negocio.

### Body

```json
{
  "product_id": 1,
  "deal_id": 1,
  "quantity": 2
}
```

### Ejemplo de petición

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deal_products" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUÍ" \
  -d '{
    "product_id": 1,
    "deal_id": 1,
    "quantity": 2
  }'
```

### Ejemplo de respuesta — `201 Created`

La respuesta también devuelve el **product** y el **deal** pertenecientes al deal product.

```json
{
  "id": 17,
  "product_id": 1,
  "deal_id": 1,
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z",
  "unit_amount_in_cents": 1000035,
  "product_identifier": "SNS895SASXVDW",
  "product_name": "Auto",
  "total_amount_in_cents": 2000070,
  "quantity": 2,
  "account_id": 1,
  "product": {
    "id": 1,
    "identifier": "SNS895SASXVDW",
    "amount_in_cents": 1000035,
    "quantity_available": 2,
    "description": "Auto lindo",
    "name": "Auto",
    "custom_attributes": {},
    "additional_attributes": {},
    "created_at": "2025-01-12T18:21:03Z",
    "updated_at": "2025-01-12T18:21:03Z",
    "account_id": 1
  },
  "deal": {
    "total_deal_products_amount_in_cents": 2000070,
    "contact_id": 1,
    "stage_id": 1,
    "pipeline_id": 1,
    "id": 1,
    "name": "Deal 1",
    "status": "open",
    "custom_attributes": {},
    "created_at": "2025-01-12T18:20:50Z",
    "updated_at": "2025-01-15T10:30:00Z",
    "position": 1,
    "created_by_id": null,
    "lost_at": null,
    "won_at": null,
    "lost_reason": "",
    "account_id": 1
  }
}
```

### Campos de la respuesta

| Campo | Descripción |
| --- | --- |
| `id` | ID numérico de la asociación deal_product. |
| `unit_amount_in_cents` | Default desde el producto si no se proporciona. |
| `product_name`, `product_identifier` | Snapshots del producto en el momento de la asociación. |

### Posibles errores

| Status | Cuándo |
| --- | --- |
| `401` | Token ausente o inválido. |
| `404` | Producto o negocio no existe en la cuenta. |
| `422` | `product_id` / `deal_id` ausente, o `quantity` inválida. |

---

## Obtener producto del negocio

`GET /api/v1/accounts/{account_id}/deal_products/{id}`

Obtiene una única asociación deal_product.

### Ejemplo de petición

```bash
curl -X GET "https://app.woofedcrm.com/api/v1/accounts/1/deal_products/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUÍ"
```

### Ejemplo de respuesta — `200 OK`

La respuesta también devuelve el **product** y el **deal** pertenecientes al deal product.

```json
{
  "id": 1,
  "product_id": 1,
  "deal_id": 1,
  "created_at": "2025-01-12T18:21:03Z",
  "updated_at": "2025-01-12T18:21:03Z",
  "unit_amount_in_cents": 150000,
  "product_identifier": "CAR-15632",
  "product_name": "Auto",
  "total_amount_in_cents": 150000,
  "quantity": 1,
  "account_id": 1,
  "product": {
    "id": 1,
    "identifier": "CAR-15632",
    "amount_in_cents": 150000,
    "quantity_available": 2,
    "description": "Auto lindo",
    "name": "Auto",
    "custom_attributes": {},
    "additional_attributes": {},
    "created_at": "2025-01-12T18:21:00Z",
    "updated_at": "2025-01-12T18:21:00Z",
    "account_id": 1
  },
  "deal": {
    "total_deal_products_amount_in_cents": 150000,
    "contact_id": 1,
    "stage_id": 1,
    "pipeline_id": 1,
    "id": 1,
    "name": "Deal 1",
    "status": "open",
    "custom_attributes": {},
    "created_at": "2025-01-12T18:20:50Z",
    "updated_at": "2025-01-12T18:21:03Z",
    "position": 1,
    "created_by_id": null,
    "lost_at": null,
    "won_at": null,
    "lost_reason": "",
    "account_id": 1
  }
}
```

### Posibles errores

| Status | Cuándo |
| --- | --- |
| `401` | Token ausente o inválido. |
| `404` | Deal product no encontrado. |

---

## Actualizar producto del negocio

`PUT /api/v1/accounts/{account_id}/deal_products/{id}`

Actualiza la cantidad, el precio unitario o el snapshot de nombre/identificador de una asociación existente.

### Body

```json
{
  "quantity": 3,
  "unit_amount_in_cents": 150000,
  "product_name": "Auto",
  "product_identifier": "CAR-15632"
}
```

### Ejemplo de petición

```bash
curl -X PUT "https://app.woofedcrm.com/api/v1/accounts/1/deal_products/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUÍ" \
  -d '{
    "quantity": 3,
    "unit_amount_in_cents": 150000
  }'
```

### Ejemplo de respuesta — `200 OK`

La respuesta también devuelve el **product** y el **deal** pertenecientes al deal product.

```json
{
  "id": 1,
  "product_id": 1,
  "deal_id": 1,
  "created_at": "2025-01-12T18:21:03Z",
  "updated_at": "2025-01-20T11:42:18Z",
  "unit_amount_in_cents": 150000,
  "product_identifier": "CAR-15632",
  "product_name": "Auto",
  "total_amount_in_cents": 450000,
  "quantity": 3,
  "account_id": 1,
  "product": {
    "id": 1,
    "identifier": "CAR-15632",
    "amount_in_cents": 150000,
    "quantity_available": 2,
    "description": "Auto lindo",
    "name": "Auto",
    "custom_attributes": {},
    "additional_attributes": {},
    "created_at": "2025-01-12T18:21:00Z",
    "updated_at": "2025-01-12T18:21:00Z",
    "account_id": 1
  },
  "deal": {
    "total_deal_products_amount_in_cents": 450000,
    "contact_id": 1,
    "stage_id": 1,
    "pipeline_id": 1,
    "id": 1,
    "name": "Deal 1",
    "status": "open",
    "custom_attributes": {},
    "created_at": "2025-01-12T18:20:50Z",
    "updated_at": "2025-01-20T11:42:18Z",
    "position": 1,
    "created_by_id": null,
    "lost_at": null,
    "won_at": null,
    "lost_reason": "",
    "account_id": 1
  }
}
```

### Posibles errores

| Status | Cuándo |
| --- | --- |
| `401` | Token ausente o inválido. |
| `404` | Deal product no encontrado. |
| `422` | `quantity` o `unit_amount_in_cents` inválido. |

---

## Endpoints relacionados

- [**Obtener producto**](./products#obtener-producto) — para obtener el `id` de un `deal_product`, consulta el producto con `GET /api/v1/accounts/{account_id}/products/{id}`. La respuesta incluye un array `deal_products` con todas las asociaciones de ese producto y todos sus campos (`id`, `product_id`, `deal_id`, …).
- [**Obtener negocio**](./deals#obtener-negocio) — alternativamente, consulta el negocio con `GET /api/v1/accounts/{account_id}/deals/{id}`. La respuesta también incluye un array `deal_products` con todas las asociaciones de ese negocio — usa el `id` devuelto para llamar a [Obtener producto del negocio](#obtener-producto-del-negocio) o [Actualizar producto del negocio](#actualizar-producto-del-negocio).
