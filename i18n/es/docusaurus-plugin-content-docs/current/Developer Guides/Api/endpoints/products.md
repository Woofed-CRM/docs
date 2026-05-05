---
sidebar_label: "Productos"
title: "Productos"
sidebar_position: 4
---

# Productos

Un **producto** es cualquier cosa que vendes — un plan SaaS, un producto físico, un servicio. Los productos viven en el catálogo de la cuenta y pueden adjuntarse a negocios mediante [**Productos del negocio**](./deal-products) para calcular el valor del deal.

## Estructura del recurso

| Atributo | Tipo | Obligatorio | Ejemplo | Notas |
| --- | --- | --- | --- | --- |
| `identifier` | string | No | `SKU-ABC-001` | SKU o código único. Default vacío. |
| `name` | string | No | `Plan Premium` | Default vacío. |
| `description` | string | No | `Plan premium anual con todas las funciones.` | |
| `amount_in_cents` | integer | No | `19900` | Precio en centavos (`19900` = $199,00). Default `0`. |
| `quantity_available` | integer | No | `100` | Cantidad en stock. Default `0`. |
| `custom_attributes` | object | No | `{ "category": "Software" }` | Campos personalizados libres. |

Todos los endpoints siguientes asumen:

```
{base_url} = https://app.woofedcrm.com
{account_id} = 1
```

---

## Obtener producto

`GET /api/v1/accounts/{account_id}/products/{id}`

Obtiene un único producto por ID.

### Ejemplo de petición

```bash
curl -X GET "https://app.woofedcrm.com/api/v1/accounts/1/products/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUÍ"
```

### Ejemplo de respuesta — `200 OK`

La respuesta también devuelve los **deal_products** pertenecientes al producto.

```json
{
  "id": 1,
  "identifier": "SNS895SASXVDW",
  "amount_in_cents": 1000035,
  "quantity_available": 2,
  "description": "Auto lindo",
  "name": "Auto",
  "custom_attributes": { "number_of_doors": "4" },
  "additional_attributes": {},
  "created_at": "2025-01-12T18:21:03Z",
  "updated_at": "2025-01-12T18:21:03Z",
  "account_id": 1,
  "deal_products": [
    {
      "id": 3,
      "product_id": 1,
      "deal_id": 10,
      "created_at": "2025-01-12T18:21:05Z",
      "updated_at": "2025-01-12T18:21:05Z",
      "unit_amount_in_cents": 0,
      "product_identifier": "",
      "product_name": "",
      "total_amount_in_cents": 0,
      "quantity": 1,
      "account_id": 1
    }
  ]
}
```

### Posibles errores

| Status | Cuándo |
| --- | --- |
| `401` | Token ausente o inválido. |
| `404` | Producto no encontrado. |

---

## Crear producto

`POST /api/v1/accounts/{account_id}/products`

Crea un nuevo producto en el catálogo.

### Body

```json
{
  "identifier": "SNS895SASXVDW",
  "amount_in_cents": 1000035,
  "quantity_available": 2,
  "description": "Auto lindo",
  "name": "Auto",
  "custom_attributes": { "number_of_doors": "4" }
}
```

### Ejemplo de petición

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/products" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUÍ" \
  -d '{
    "identifier": "SNS895SASXVDW",
    "amount_in_cents": 1000035,
    "quantity_available": 2,
    "description": "Auto lindo",
    "name": "Auto",
    "custom_attributes": { "number_of_doors": "4" }
  }'
```

### Ejemplo de respuesta — `201 Created`

```json
{
  "id": 7,
  "identifier": "SNS895SASXVDW",
  "name": "Auto",
  "description": "Auto lindo",
  "amount_in_cents": 1000035,
  "quantity_available": 2,
  "custom_attributes": { "number_of_doors": "4" },
  "additional_attributes": {},
  "account_id": 1,
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

### Posibles errores

| Status | Cuándo |
| --- | --- |
| `401` | Token ausente o inválido. |
| `422` | Error de validación. |

---

## Buscar productos

`POST /api/v1/accounts/{account_id}/products/search`

Busca productos con un objeto `query` al estilo Ransack. Consulta [Estructura de la API → Búsqueda](../api-structure#búsqueda) para la lista de predicados.

### Body

```json
{
  "query": {
    "identifier_eq": "SKU-12345",
    "name_cont": "Auto",
    "description_cont": "eléctrico",
    "amount_in_cents_gteq": 1000,
    "quantity_available_gt": 0,
    "created_at_gteq": "2025-01-01T00:00:00Z",
    "updated_at_lteq": "2025-01-31T23:59:59Z"
  }
}
```

### Ejemplo de petición

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/products/search" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUÍ" \
  -d '{
    "query": {
      "name_cont": "Auto",
      "amount_in_cents_gteq": 1000
    }
  }'
```

### Ejemplo de respuesta — `200 OK`

```json
{
  "data": [
    {
      "id": 7,
      "identifier": "SNS895SASXVDW",
      "amount_in_cents": 1000035,
      "quantity_available": 2,
      "description": "Auto lindo",
      "name": "Auto",
      "custom_attributes": { "number_of_doors": "4" },
      "additional_attributes": {},
      "created_at": "2025-01-12T18:21:03Z",
      "updated_at": "2025-01-12T18:21:03Z",
      "account_id": 1
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

## Actualizar producto

`PUT /api/v1/accounts/{account_id}/products/{id}`

Actualiza un producto existente. Puedes cambiar cualquier subconjunto de campos; los omitidos no se modifican.

### Body

```json
{
  "identifier": "PROD-123",
  "amount_in_cents": 150099,
  "quantity_available": 2,
  "description": "Descripción del auto",
  "name": "Auto",
  "custom_attributes": { "number_of_doors": "4" }
}
```

### Ejemplo de petición

```bash
curl -X PUT "https://app.woofedcrm.com/api/v1/accounts/1/products/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUÍ" \
  -d '{
    "amount_in_cents": 150099,
    "quantity_available": 2
  }'
```

### Ejemplo de respuesta — `200 OK`

```json
{
  "id": 1,
  "identifier": "PROD-123",
  "name": "Auto",
  "description": "Descripción del auto",
  "amount_in_cents": 150099,
  "quantity_available": 2,
  "custom_attributes": { "number_of_doors": "4" },
  "additional_attributes": {},
  "account_id": 1,
  "updated_at": "2025-01-20T11:42:18Z"
}
```

### Posibles errores

| Status | Cuándo |
| --- | --- |
| `401` | Token ausente o inválido. |
| `404` | Producto no encontrado. |
| `422` | Error de validación. |
