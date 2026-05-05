---
sidebar_label: "Contatos"
title: "Contatos"
sidebar_position: 1
---

# Contatos

Um **contato** é uma pessoa dentro do Woofed CRM. Contatos podem ser ligados a negócios, podem ter atributos customizados (cidade, CPF, origem, …) e podem ser marcados com labels.

## Estrutura do recurso

| Atributo | Tipo | Obrigatório | Exemplo | Notas |
| --- | --- | --- | --- | --- |
| `full_name` | string | Não | `John Doe` | Nome completo do contato. |
| `phone` | string | Não | `+5511999999999` | Formato E.164 recomendado. |
| `email` | string | Não | `john.doe@example.com` | Deve ser um email válido se informado. |
| `label_list` | string \| array | Não | `["customer","vip"]` | Tags. String separada por vírgulas ou array. |
| `custom_attributes` | object | Não | `{ "city": "RJ" }` | JSON livre para campos customizados. |

Todos os endpoints abaixo assumem:

```
{base_url} = https://app.woofedcrm.com
{account_id} = 1
```

---

## Criar contato

`POST /api/v1/accounts/{account_id}/contacts`

Cria um novo contato na conta.

### Headers

| Header | Valor |
| --- | --- |
| `Content-Type` | `application/json` |
| `Authorization` | `Bearer SEU_TOKEN_AQUI` |

### Path params

| Nome | Tipo | Obrigatório | Descrição |
| --- | --- | --- | --- |
| `account_id` | integer | Sim | Escopo da conta. |

### Body

```json
{
  "full_name": "Tim Maia",
  "phone": "+5541996910256",
  "email": "tim@maia.com",
  "custom_attributes": { "city": "RJ" },
  "label_list": ["label1", "label2"]
}
```

### Exemplo de requisição

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/contacts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "full_name": "Tim Maia",
    "phone": "+5541996910256",
    "email": "tim@maia.com",
    "custom_attributes": { "city": "RJ" },
    "label_list": ["label1", "label2"]
  }'
```

### Exemplo de resposta — `201 Created`

```json
{
  "id": 12,
  "full_name": "Tim Maia",
  "phone": "+5541996910256",
  "email": "tim@maia.com",
  "custom_attributes": { "city": "RJ" },
  "additional_attributes": {},
  "app_type": null,
  "app_id": null,
  "account_id": 1,
  "label_list": ["label1", "label2"],
  "chatwoot_conversations_label_list": [],
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

### Campos da resposta

| Campo | Descrição |
| --- | --- |
| `id` | ID numérico. Use-o em chamadas posteriores. |
| `full_name`, `phone`, `email` | Os valores enviados, normalizados. |
| `label_list` | Tags em formato de array (mesmo se você enviou string separada por vírgulas). |
| `custom_attributes` | Devolvido exatamente como enviado. |
| `created_at`, `updated_at` | ISO 8601 (UTC). |

### Possíveis erros

| Status | Quando |
| --- | --- |
| `401` | Token ausente ou inválido. |
| `422` | Formato de email inválido, ou outra regra de validação falhou. |

---

## Buscar contatos

`POST /api/v1/accounts/{account_id}/contacts/search`

Busca contatos usando um objeto `query` no estilo Ransack. Veja [Estrutura da API → Busca](../api-structure#busca) para a lista completa de predicados.

### Body

```json
{
  "query": {
    "full_name_cont": "John Doe",
    "email_cont": "@example.com",
    "phone_cont": "+55",
    "created_at_gteq": "2025-01-01T00:00:00Z",
    "updated_at_lteq": "2025-01-31T23:59:59Z",
    "id_eq": 42
  }
}
```

### Exemplo de requisição

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/contacts/search" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "query": {
      "full_name_cont": "John",
      "email_cont": "@example.com"
    }
  }'
```

### Exemplo de resposta — `200 OK`

```json
{
  "data": [
    {
      "id": 42,
      "full_name": "John Doe",
      "phone": "+5511999999999",
      "email": "john.doe@example.com",
      "custom_attributes": { "city": "RJ" },
      "additional_attributes": {},
      "app_type": null,
      "app_id": null,
      "created_at": "2025-01-12T18:21:03Z",
      "updated_at": "2025-01-12T18:21:03Z",
      "account_id": 1,
      "label_list": ["vip"],
      "chatwoot_conversations_label_list": []
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

### Possíveis erros

| Status | Quando |
| --- | --- |
| `400` | JSON mal formatado. |
| `401` | Token ausente ou inválido. |
| `422` | Predicado desconhecido ou campo não pesquisável. |

---

## Obter contato

`GET /api/v1/accounts/{account_id}/contacts/{id}`

Recupera um único contato pelo ID.

### Path params

| Nome | Tipo | Obrigatório | Descrição |
| --- | --- | --- | --- |
| `account_id` | integer | Sim | Escopo da conta. |
| `id` | integer | Sim | ID do contato. |

### Exemplo de requisição

```bash
curl -X GET "https://app.woofedcrm.com/api/v1/accounts/1/contacts/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### Exemplo de resposta — `200 OK`

A resposta também retorna os **deals** e **events** pertencentes ao contato.

```json
{
  "id": 1,
  "full_name": "Tim Maia",
  "phone": "+5541996910256",
  "email": "tim@maia.com",
  "custom_attributes": { "city": "RJ" },
  "additional_attributes": {},
  "app_type": null,
  "app_id": null,
  "account_id": 1,
  "label_list": ["label1", "label2"],
  "chatwoot_conversations_label_list": [],
  "created_at": "2025-01-12T18:21:03Z",
  "updated_at": "2025-01-12T18:21:03Z",
  "deals": [
    {
      "id": 1,
      "name": "Test Deal",
      "status": "open",
      "stage_id": 1,
      "contact_id": 1,
      "custom_attributes": {},
      "created_at": "2025-01-12T18:21:05Z",
      "updated_at": "2025-01-12T18:21:05Z",
      "pipeline_id": 2,
      "position": 1,
      "created_by_id": null,
      "total_deal_products_amount_in_cents": 0,
      "lost_at": null,
      "won_at": null,
      "lost_reason": "",
      "account_id": 1
    }
  ],
  "events": [
    {
      "id": 1,
      "deal_id": 1,
      "contact_id": 1,
      "app_type": null,
      "app_id": null,
      "kind": "deal_opened",
      "scheduled_at": null,
      "done_at": "2025-01-12T18:21:06Z",
      "from_me": true,
      "status": null,
      "custom_attributes": {},
      "additional_attributes": {
        "stage_id": 1,
        "deal_name": "Test Deal",
        "stage_name": "Stage 1",
        "pipeline_id": 2,
        "pipeline_name": "sales"
      },
      "created_at": "2025-01-12T18:21:06Z",
      "updated_at": "2025-01-12T18:21:06Z",
      "title": "",
      "auto_done": false,
      "account_id": 1,
      "done": true,
      "send_now": null,
      "files": [],
      "files_events": [],
      "invalid_files": null
    },
    {
      "id": 2,
      "deal_id": 1,
      "contact_id": 1,
      "app_type": null,
      "app_id": null,
      "kind": "activity",
      "scheduled_at": null,
      "done_at": null,
      "from_me": null,
      "status": null,
      "custom_attributes": {},
      "additional_attributes": {},
      "created_at": "2025-01-12T18:21:07Z",
      "updated_at": "2025-01-12T18:21:08Z",
      "title": "Test Event",
      "auto_done": false,
      "account_id": 1,
      "done": false,
      "send_now": null,
      "files": [],
      "files_events": [],
      "invalid_files": null
    }
  ]
}
```

### Possíveis erros

| Status | Quando |
| --- | --- |
| `401` | Token ausente ou inválido. |
| `404` | Contato não encontrado nessa conta. |

---

## Upsert de contato

`POST /api/v1/accounts/{account_id}/contacts/upsert`

**Cria** o contato se nenhum match existir na conta, ou **atualiza** o existente. As chaves de match são tipicamente `email` e/ou `phone` — se você passa qualquer um, a API procura um contato existente com o mesmo valor na conta.

É o endpoint preferido para sincronizações noturnas.

### Body

```json
{
  "full_name": "Tim Maia",
  "phone": "+5541996910256",
  "email": "tim@maia.com",
  "custom_attributes": { "city": "RJ" },
  "label_list": ["label1", "label2"]
}
```

### Exemplo de requisição

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/contacts/upsert" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "full_name": "Tim Maia",
    "phone": "+5541996910256",
    "email": "tim@maia.com",
    "custom_attributes": { "city": "RJ" },
    "label_list": ["label1", "label2"]
  }'
```

### Exemplo de resposta — `200 OK` (atualizado) ou `201 Created` (novo)

```json
{
  "id": 12,
  "full_name": "Tim Maia",
  "phone": "+5541996910256",
  "email": "tim@maia.com",
  "custom_attributes": { "city": "RJ" },
  "additional_attributes": {},
  "app_type": null,
  "app_id": null,
  "account_id": 1,
  "label_list": ["label1", "label2"],
  "chatwoot_conversations_label_list": [],
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-20T11:42:18Z"
}
```

### Possíveis erros

| Status | Quando |
| --- | --- |
| `401` | Token ausente ou inválido. |
| `422` | Erro de validação (email inválido, conflito de campos únicos, …). |

---

## Excluir contato

`DELETE /api/v1/accounts/{account_id}/contacts/{id}`

Remove permanentemente um contato e todas as suas associações. **Esta ação não pode ser desfeita.**

### Path params

| Nome | Tipo | Obrigatório | Descrição |
| --- | --- | --- | --- |
| `account_id` | integer | Sim | Escopo da conta. |
| `id` | integer | Sim | ID do contato. |

### Exemplo de requisição

```bash
curl -X DELETE "https://app.woofedcrm.com/api/v1/accounts/1/contacts/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### Exemplo de resposta — `204 No Content`

Nenhum body é retornado.

### Possíveis erros

| Status | Quando |
| --- | --- |
| `401` | Token ausente ou inválido. |
| `404` | Contato não encontrado nessa conta. |
