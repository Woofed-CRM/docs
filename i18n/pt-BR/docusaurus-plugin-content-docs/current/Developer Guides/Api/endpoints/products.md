---
sidebar_label: "Produtos"
title: "Produtos"
sidebar_position: 4
---

# Produtos

Um **produto** é qualquer coisa que você vende — um plano SaaS, um produto físico, um serviço. Produtos vivem no catálogo da conta e podem ser anexados a negócios via [**Produtos do negócio**](./deal-products) para calcular o valor do deal.

## Estrutura do recurso

| Atributo | Tipo | Obrigatório | Exemplo | Notas |
| --- | --- | --- | --- | --- |
| `identifier` | string | Não | `SKU-ABC-001` | SKU ou código único. Default vazio. |
| `name` | string | Não | `Plano Premium` | Default vazio. |
| `description` | string | Não | `Plano premium anual com todos os recursos.` | |
| `amount_in_cents` | integer | Não | `19900` | Preço em centavos (`19900` = R$ 199,00). Default `0`. |
| `quantity_available` | integer | Não | `100` | Quantidade em estoque. Default `0`. |
| `custom_attributes` | object | Não | `{ "category": "Software" }` | Campos customizados livres. |

Todos os endpoints abaixo assumem:

```
{base_url} = https://app.woofedcrm.com
{account_id} = 1
```

---

## Obter produto

`GET /api/v1/accounts/{account_id}/products/{id}`

Recupera um único produto pelo ID.

### Exemplo de requisição

```bash
curl -X GET "https://app.woofedcrm.com/api/v1/accounts/1/products/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### Exemplo de resposta — `200 OK`

```json
{
  "id": 1,
  "identifier": "SNS895SASXVDW",
  "name": "Carro",
  "description": "Carro legal",
  "amount_in_cents": 1000035,
  "quantity_available": 2,
  "custom_attributes": { "number_of_doors": "4" },
  "created_at": "2025-01-12T18:21:03Z",
  "updated_at": "2025-01-12T18:21:03Z"
}
```

### Possíveis erros

| Status | Quando |
| --- | --- |
| `401` | Token ausente ou inválido. |
| `404` | Produto não encontrado. |

---

## Criar produto

`POST /api/v1/accounts/{account_id}/products`

Cria um novo produto no catálogo.

### Body

```json
{
  "identifier": "SNS895SASXVDW",
  "amount_in_cents": 1000035,
  "quantity_available": 2,
  "description": "Carro legal",
  "name": "Carro",
  "custom_attributes": { "number_of_doors": "4" }
}
```

### Exemplo de requisição

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/products" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "identifier": "SNS895SASXVDW",
    "amount_in_cents": 1000035,
    "quantity_available": 2,
    "description": "Carro legal",
    "name": "Carro",
    "custom_attributes": { "number_of_doors": "4" }
  }'
```

### Exemplo de resposta — `201 Created`

```json
{
  "id": 7,
  "identifier": "SNS895SASXVDW",
  "name": "Carro",
  "description": "Carro legal",
  "amount_in_cents": 1000035,
  "quantity_available": 2,
  "custom_attributes": { "number_of_doors": "4" },
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

### Possíveis erros

| Status | Quando |
| --- | --- |
| `401` | Token ausente ou inválido. |
| `422` | Erro de validação. |

---

## Buscar produtos

`POST /api/v1/accounts/{account_id}/products/search`

Busca produtos com um objeto `query` no estilo Ransack. Veja [Estrutura da API → Busca](../api-structure#busca) para a lista de predicados.

### Body

```json
{
  "query": {
    "identifier_eq": "SKU-12345",
    "name_cont": "Carro",
    "description_cont": "elétrico",
    "amount_in_cents_gteq": 1000,
    "quantity_available_gt": 0,
    "created_at_gteq": "2025-01-01T00:00:00Z",
    "updated_at_lteq": "2025-01-31T23:59:59Z"
  }
}
```

### Exemplo de requisição

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/products/search" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "query": {
      "name_cont": "Carro",
      "amount_in_cents_gteq": 1000
    }
  }'
```

### Exemplo de resposta — `200 OK`

```json
[
  {
    "id": 7,
    "identifier": "SNS895SASXVDW",
    "name": "Carro",
    "amount_in_cents": 1000035,
    "quantity_available": 2,
    "custom_attributes": { "number_of_doors": "4" }
  }
]
```

### Possíveis erros

| Status | Quando |
| --- | --- |
| `400` | JSON mal formatado. |
| `401` | Token ausente ou inválido. |
| `422` | Predicado desconhecido ou campo não pesquisável. |

---

## Atualizar produto

`PUT /api/v1/accounts/{account_id}/products/{id}`

Atualiza um produto existente. Você pode mudar qualquer subconjunto de campos; os omitidos ficam intactos.

### Body

```json
{
  "identifier": "PROD-123",
  "amount_in_cents": 150099,
  "quantity_available": 2,
  "description": "Descrição do carro",
  "name": "Carro",
  "custom_attributes": { "number_of_doors": "4" }
}
```

### Exemplo de requisição

```bash
curl -X PUT "https://app.woofedcrm.com/api/v1/accounts/1/products/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "amount_in_cents": 150099,
    "quantity_available": 2
  }'
```

### Exemplo de resposta — `200 OK`

```json
{
  "id": 1,
  "identifier": "PROD-123",
  "name": "Carro",
  "description": "Descrição do carro",
  "amount_in_cents": 150099,
  "quantity_available": 2,
  "custom_attributes": { "number_of_doors": "4" },
  "updated_at": "2025-01-20T11:42:18Z"
}
```

### Possíveis erros

| Status | Quando |
| --- | --- |
| `401` | Token ausente ou inválido. |
| `404` | Produto não encontrado. |
| `422` | Erro de validação. |
