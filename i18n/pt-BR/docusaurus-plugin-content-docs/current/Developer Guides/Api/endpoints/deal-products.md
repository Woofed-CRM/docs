---
sidebar_label: "Produtos do negócio"
title: "Produtos do negócio"
sidebar_position: 5
---

# Produtos do negócio

Um **produto do negócio** (deal product) anexa um produto (do catálogo — veja [Produtos](./products)) a um negócio com uma quantidade e um preço unitário específicos. O preço e o nome do produto são **fotografados** (snapshot) no momento da associação, então mudanças no catálogo não reescrevem deals antigos.

## Estrutura do recurso

| Atributo | Tipo | Obrigatório | Exemplo | Notas |
| --- | --- | --- | --- | --- |
| `product_id` | integer | Sim (na criação) | `10` | ID de um produto existente. |
| `deal_id` | integer | Sim (na criação) | `25` | ID do negócio que receberá o produto. |
| `quantity` | integer | Não | `2` | Default `1`. |
| `unit_amount_in_cents` | integer | Não | `5000` | Default = `amount_in_cents` do produto. |
| `product_name` | string | Não | `Plano Premium` | Snapshot. Default = nome do produto. |
| `product_identifier` | string | Não | `SKU-ABC-001` | Snapshot. Default = identificador do produto. |

Todos os endpoints abaixo assumem:

```
{base_url} = https://app.woofedcrm.com
{account_id} = 1
```

---

## Criar produto do negócio

`POST /api/v1/accounts/{account_id}/deal_products`

Anexa um produto a um negócio.

### Body

```json
{
  "product_id": 1,
  "deal_id": 1,
  "quantity": 2
}
```

### Exemplo de requisição

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deal_products" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "product_id": 1,
    "deal_id": 1,
    "quantity": 2
  }'
```

### Exemplo de resposta — `201 Created`

A resposta também retorna o **product** e o **deal** pertencentes ao deal product.

```json
{
  "id": 17,
  "product_id": 1,
  "deal_id": 1,
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z",
  "unit_amount_in_cents": 1000035,
  "product_identifier": "SNS895SASXVDW",
  "product_name": "Carro",
  "total_amount_in_cents": 2000070,
  "quantity": 2,
  "account_id": 1,
  "product": {
    "id": 1,
    "identifier": "SNS895SASXVDW",
    "amount_in_cents": 1000035,
    "quantity_available": 2,
    "description": "Carro legal",
    "name": "Carro",
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

### Campos da resposta

| Campo | Descrição |
| --- | --- |
| `id` | ID numérico da associação deal_product. |
| `unit_amount_in_cents` | Default vindo do produto se não informado. |
| `product_name`, `product_identifier` | Snapshots do produto no momento da associação. |

### Possíveis erros

| Status | Quando |
| --- | --- |
| `401` | Token ausente ou inválido. |
| `404` | Produto ou negócio não existe na conta. |
| `422` | `product_id` / `deal_id` ausente, ou `quantity` inválida. |

---

## Obter produto do negócio

`GET /api/v1/accounts/{account_id}/deal_products/{id}`

Recupera uma única associação deal_product.

### Exemplo de requisição

```bash
curl -X GET "https://app.woofedcrm.com/api/v1/accounts/1/deal_products/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### Exemplo de resposta — `200 OK`

A resposta também retorna o **product** e o **deal** pertencentes ao deal product.

```json
{
  "id": 1,
  "product_id": 1,
  "deal_id": 1,
  "created_at": "2025-01-12T18:21:03Z",
  "updated_at": "2025-01-12T18:21:03Z",
  "unit_amount_in_cents": 150000,
  "product_identifier": "CAR-15632",
  "product_name": "Carro",
  "total_amount_in_cents": 150000,
  "quantity": 1,
  "account_id": 1,
  "product": {
    "id": 1,
    "identifier": "CAR-15632",
    "amount_in_cents": 150000,
    "quantity_available": 2,
    "description": "Carro legal",
    "name": "Carro",
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

### Possíveis erros

| Status | Quando |
| --- | --- |
| `401` | Token ausente ou inválido. |
| `404` | Deal product não encontrado. |

---

## Atualizar produto do negócio

`PUT /api/v1/accounts/{account_id}/deal_products/{id}`

Atualiza a quantidade, o preço unitário ou o snapshot de nome/identificador de uma associação existente.

### Body

```json
{
  "quantity": 3,
  "unit_amount_in_cents": 150000,
  "product_name": "Carro",
  "product_identifier": "CAR-15632"
}
```

### Exemplo de requisição

```bash
curl -X PUT "https://app.woofedcrm.com/api/v1/accounts/1/deal_products/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "quantity": 3,
    "unit_amount_in_cents": 150000
  }'
```

### Exemplo de resposta — `200 OK`

A resposta também retorna o **product** e o **deal** pertencentes ao deal product.

```json
{
  "id": 1,
  "product_id": 1,
  "deal_id": 1,
  "created_at": "2025-01-12T18:21:03Z",
  "updated_at": "2025-01-20T11:42:18Z",
  "unit_amount_in_cents": 150000,
  "product_identifier": "CAR-15632",
  "product_name": "Carro",
  "total_amount_in_cents": 450000,
  "quantity": 3,
  "account_id": 1,
  "product": {
    "id": 1,
    "identifier": "CAR-15632",
    "amount_in_cents": 150000,
    "quantity_available": 2,
    "description": "Carro legal",
    "name": "Carro",
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

### Possíveis erros

| Status | Quando |
| --- | --- |
| `401` | Token ausente ou inválido. |
| `404` | Deal product não encontrado. |
| `422` | `quantity` ou `unit_amount_in_cents` inválido. |

---

## Endpoints relacionados

- [**Obter produto**](./products#obter-produto) — para descobrir o `id` de um `deal_product`, faça um `GET /api/v1/accounts/{account_id}/products/{id}` no produto. A resposta inclui um array `deal_products` com todas as associações daquele produto e todos os seus campos (`id`, `product_id`, `deal_id`, …).
- [**Obter negócio**](./deals#obter-negócio) — alternativamente, faça um `GET /api/v1/accounts/{account_id}/deals/{id}` no negócio. A resposta também inclui um array `deal_products` com todas as associações daquele negócio — use o `id` retornado para chamar [Obter produto do negócio](#obter-produto-do-negócio) ou [Atualizar produto do negócio](#atualizar-produto-do-negócio).
