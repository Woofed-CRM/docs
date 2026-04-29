---
sidebar_label: "Responsáveis pelo negócio"
title: "Responsáveis pelo negócio"
sidebar_position: 7
---

# Responsáveis pelo negócio

Um **responsável pelo negócio** (deal assignee) é o vínculo entre um [negócio](./deals) e um [usuário](./users). Um negócio pode ter um ou mais responsáveis — tipicamente os vendedores encarregados de fazê-lo avançar.

Este endpoint é o que você chama para **atribuir negócios automaticamente** (distribuição round-robin, atribuição automática de SDR, rebalanceamento na saída de usuários, …).

## Estrutura do recurso

| Atributo | Tipo | Obrigatório | Exemplo | Notas |
| --- | --- | --- | --- | --- |
| `deal_id` | integer | Sim | `25` | Negócio a ser atribuído. |
| `user_id` | integer | Sim | `7` | Usuário que receberá o negócio. |

Todos os endpoints abaixo assumem:

```
{base_url} = https://app.woofedcrm.com
{account_id} = 1
```

---

## Criar responsável pelo negócio

`POST /api/v1/accounts/{account_id}/deal_assignees`

Atribui um usuário a um negócio.

### Body

```json
{
  "user_id": 1,
  "deal_id": 1
}
```

### Exemplo de requisição

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deal_assignees" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "user_id": 1,
    "deal_id": 1
  }'
```

### Exemplo de resposta — `201 Created`

```json
{
  "id": 33,
  "deal_id": 1,
  "user_id": 1,
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z",
  "account_id": 1
}
```

### Possíveis erros

| Status | Quando |
| --- | --- |
| `401` | Token ausente ou inválido. |
| `404` | Negócio ou usuário não existe nessa conta. |
| `422` | `user_id` / `deal_id` ausente, ou usuário já atribuído ao negócio. |

---

## Excluir responsável pelo negócio

`DELETE /api/v1/accounts/{account_id}/deal_assignees/{id}`

Remove a atribuição entre um usuário e um negócio.

### Path params

| Nome | Tipo | Obrigatório | Descrição |
| --- | --- | --- | --- |
| `account_id` | integer | Sim | Escopo da conta. |
| `id` | integer | Sim | ID do deal assignee (vindo da resposta do create). |

### Exemplo de requisição

```bash
curl -X DELETE "https://app.woofedcrm.com/api/v1/accounts/1/deal_assignees/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### Exemplo de resposta — `204 No Content`

Nenhum body é retornado.

### Possíveis erros

| Status | Quando |
| --- | --- |
| `401` | Token ausente ou inválido. |
| `404` | Deal assignee não encontrado nessa conta. |

---

## Endpoints relacionados

- [**Obter negócio**](./deals#obter-negócio) — para descobrir o `id` de um `deal_assignee`, faça um `GET /api/v1/accounts/{account_id}/deals/{id}` no negócio ao qual ele pertence. A resposta inclui um array `deal_assignees` com todos os assignees daquele negócio e todos os seus campos (`id`, `deal_id`, `user_id`, …) — use o `id` retornado para chamar [Excluir responsável pelo negócio](#excluir-responsável-pelo-negócio).
