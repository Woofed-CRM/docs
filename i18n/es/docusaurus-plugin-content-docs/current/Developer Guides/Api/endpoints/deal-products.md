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

```json
{
  "id": 17,
  "deal_id": 1,
  "product_id": 1,
  "quantity": 2,
  "unit_amount_in_cents": 1000035,
  "product_name": "Auto",
  "product_identifier": "SNS895SASXVDW",
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
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

```json
{
  "id": 1,
  "deal_id": 1,
  "product_id": 1,
  "quantity": 1,
  "unit_amount_in_cents": 150000,
  "product_name": "Auto",
  "product_identifier": "CAR-15632",
  "created_at": "2025-01-12T18:21:03Z",
  "updated_at": "2025-01-12T18:21:03Z"
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

```json
{
  "id": 1,
  "deal_id": 1,
  "product_id": 1,
  "quantity": 3,
  "unit_amount_in_cents": 150000,
  "product_name": "Auto",
  "product_identifier": "CAR-15632",
  "updated_at": "2025-01-20T11:42:18Z"
}
```

### Posibles errores

| Status | Cuándo |
| --- | --- |
| `401` | Token ausente o inválido. |
| `404` | Deal product no encontrado. |
| `422` | `quantity` o `unit_amount_in_cents` inválido. |
