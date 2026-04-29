---
sidebar_label: "Negócios"
title: "Negócios (Deals)"
sidebar_position: 2
---

# Negócios

Um **negócio** (deal) é uma oportunidade de venda dentro de um pipeline. Pertence a um contato, fica em um estágio específico e carrega um status (`open`, `won`, `lost`).

## Estrutura do recurso

| Atributo | Tipo | Obrigatório | Exemplo | Notas |
| --- | --- | --- | --- | --- |
| `name` | string | Não | `Negócio com John` | Título do negócio. |
| `status` | string | Não | `open` | Default `open`. Valores comuns: `open`, `won`, `lost`. |
| `stage_id` | integer | Sim | `3` | Estágio em que o negócio vive. |
| `pipeline_id` | integer | Não | `1` | Deve corresponder ao pipeline do `stage_id`. |
| `contact_id` | integer | Sim | `42` | Contato associado ao negócio. |
| `position` | integer | Não | `2` | Posição dentro do estágio (ordem no kanban). |
| `lost_reason` | string | Não | `Preço alto demais` | Motivo quando `status = lost`. |
| `lost_at` | datetime (UTC) | Não | `2025-01-15T10:30:00Z` | Deve ser UTC. |
| `won_at` | datetime (UTC) | Não | `2025-01-20T14:00:00Z` | Deve ser UTC. |
| `custom_attributes` | object | Não | `{ "source": "Website" }` | Campos customizados livres. |
| `contact_attributes` | object | Não | `{ "id": 42, "full_name": "John" }` | Quando enviado para `upsert`, encontra um contato existente ou cria um novo e o associa ao negócio. |

Todos os endpoints abaixo assumem:

```
{base_url} = https://app.woofedcrm.com
{account_id} = 1
```

---

## Criar negócio

`POST /api/v1/accounts/{account_id}/deals`

Cria um novo negócio na conta.

### Body

```json
{
  "name": "Lead site: Rubel",
  "status": "open",
  "stage_id": 1,
  "contact_id": 1,
  "custom_attributes": {
    "source": "Website",
    "campaign": "Google Ads",
    "utm_medium": "cpc",
    "utm_source": "google",
    "priority": "high",
    "estimated_budget": 15000
  }
}
```

### Exemplo de requisição

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "name": "Lead site: Rubel",
    "status": "open",
    "stage_id": 1,
    "contact_id": 1,
    "custom_attributes": {
      "source": "Website",
      "campaign": "Google Ads"
    }
  }'
```

### Exemplo de resposta — `201 Created`

```json
{
  "id": 27,
  "name": "Lead site: Rubel",
  "status": "open",
  "stage_id": 1,
  "pipeline_id": 1,
  "contact_id": 1,
  "position": 1,
  "custom_attributes": {
    "source": "Website",
    "campaign": "Google Ads"
  },
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

### Campos da resposta

| Campo | Descrição |
| --- | --- |
| `id` | ID numérico do negócio. |
| `pipeline_id` | Inferido do `stage_id` quando omitido. |
| `position` | Ordem dentro do estágio (kanban). |
| `custom_attributes` | Devolvido como enviado. |

### Possíveis erros

| Status | Quando |
| --- | --- |
| `401` | Token ausente ou inválido. |
| `422` | `stage_id` ou `contact_id` ausente/inválido, ou divergência de pipeline. |

---

## Buscar negócios

`POST /api/v1/accounts/{account_id}/deals/search`

Busca negócios usando um objeto `query` no estilo Ransack. Veja [Estrutura da API → Busca](../api-structure#busca) para a lista completa de predicados.

### Body

```json
{
  "query": {
    "name_cont": "Rubel",
    "status_eq": "open",
    "stage_id_eq": 1,
    "pipeline_id_eq": 1,
    "contact_id_eq": 42,
    "created_at_gteq": "2025-01-01T00:00:00Z",
    "updated_at_lteq": "2025-01-31T23:59:59Z",
    "id_eq": 27
  }
}
```

### Exemplo de requisição

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals/search" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "query": {
      "name_cont": "Rubel",
      "status_eq": "open"
    }
  }'
```

### Exemplo de resposta — `200 OK`

```json
[
  {
    "id": 27,
    "name": "Lead site: Rubel",
    "status": "open",
    "stage_id": 1,
    "pipeline_id": 1,
    "contact_id": 1,
    "position": 1,
    "custom_attributes": { "source": "Website" },
    "created_at": "2025-01-12T18:21:03Z",
    "updated_at": "2025-01-12T18:21:03Z"
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

## Obter negócio

`GET /api/v1/accounts/{account_id}/deals/{id}`

Recupera um único negócio pelo ID.

### Exemplo de requisição

```bash
curl -X GET "https://app.woofedcrm.com/api/v1/accounts/1/deals/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### Exemplo de resposta — `200 OK`

```json
{
  "id": 1,
  "name": "Lead site: Rubel",
  "status": "open",
  "stage_id": 1,
  "pipeline_id": 1,
  "contact_id": 1,
  "position": 1,
  "custom_attributes": { "source": "Website" },
  "created_at": "2025-01-12T18:21:03Z",
  "updated_at": "2025-01-12T18:21:03Z"
}
```

### Possíveis erros

| Status | Quando |
| --- | --- |
| `401` | Token ausente ou inválido. |
| `404` | Negócio não encontrado nessa conta. |

---

## Atualizar negócio

`PUT /api/v1/accounts/{account_id}/deals/{id}`

Atualiza um negócio existente. Você pode mudar qualquer subconjunto de campos; campos omitidos não são modificados.

### Body

```json
{
  "name": "Lead site: Rubel (Lost)",
  "status": "lost",
  "stage_id": 2,
  "lost_reason": "Preço alto demais",
  "lost_at": "2025-01-18T16:45:00Z",
  "custom_attributes": {
    "source": "Website",
    "competitor": "Concorrente X",
    "final_offer_value": 12000
  }
}
```

### Exemplo de requisição

```bash
curl -X PUT "https://app.woofedcrm.com/api/v1/accounts/1/deals/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "status": "lost",
    "lost_reason": "Preço alto demais",
    "lost_at": "2025-01-18T16:45:00Z"
  }'
```

### Exemplo de resposta — `200 OK`

```json
{
  "id": 1,
  "name": "Lead site: Rubel (Lost)",
  "status": "lost",
  "stage_id": 2,
  "lost_reason": "Preço alto demais",
  "lost_at": "2025-01-18T16:45:00Z",
  "updated_at": "2025-01-18T16:45:00Z"
}
```

### Possíveis erros

| Status | Quando |
| --- | --- |
| `401` | Token ausente ou inválido. |
| `404` | Negócio não encontrado. |
| `422` | Erro de validação (ex.: `status` inválido, mismatch entre `stage_id` e `pipeline_id`, `lost_at` mal formatado). |

---

## Upsert de negócio

`POST /api/v1/accounts/{account_id}/deals/upsert`

Cria o negócio se nenhum match existir, ou atualiza o existente. Útil para sincronizar deals a partir de sistemas externos.

Quando você envia `contact_attributes`, a API tenta encontrar um contato existente que case com esses atributos; se não encontrar, cria um novo contato e o associa ao negócio.

### Body

```json
{
  "stage_id": 1,
  "pipeline_id": 1,
  "name": "Lead site: Rubel",
  "contact_id": 1,
  "status": "open",
  "custom_attributes": { "CPF": "123456789-87" }
}
```

### Exemplo de requisição

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals/upsert" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "stage_id": 1,
    "pipeline_id": 1,
    "name": "Lead site: Rubel",
    "contact_id": 1,
    "status": "open",
    "custom_attributes": { "CPF": "123456789-87" }
  }'
```

### Exemplo de resposta — `200 OK` (atualizado) ou `201 Created` (novo)

```json
{
  "id": 27,
  "stage_id": 1,
  "pipeline_id": 1,
  "name": "Lead site: Rubel",
  "contact_id": 1,
  "status": "open",
  "custom_attributes": { "CPF": "123456789-87" },
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-20T11:42:18Z"
}
```

### Possíveis erros

| Status | Quando |
| --- | --- |
| `401` | Token ausente ou inválido. |
| `422` | Mismatch de pipeline / estágio, ou campo obrigatório ausente. |

---

## Endpoints relacionados

- [**Eventos de negócio**](./deal-events) — adicione notas, atividades e mensagens agendadas (WhatsApp / Chatwoot) a um negócio.
- [**Produtos do negócio**](./deal-products) — anexe produtos a um negócio.
- [**Responsáveis pelo negócio**](./deal-assignees) — atribua negócios a usuários.
