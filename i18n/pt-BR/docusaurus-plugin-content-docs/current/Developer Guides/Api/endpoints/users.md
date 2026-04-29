---
sidebar_label: "Usuários"
title: "Usuários"
sidebar_position: 6
---

# Usuários

Um **usuário** é um membro da sua conta no Woofed CRM — tipicamente um vendedor, um SDR ou um gerente de contas. Usuários são donos de deals, executam atividades e recebem atribuições.

## Estrutura do recurso

| Atributo | Tipo | Obrigatório | Exemplo | Notas |
| --- | --- | --- | --- | --- |
| `email` | string | Sim (na criação) | `john.doe@example.com` | Deve ser um email válido. |
| `password` | string | Sim (na criação) | `StrongP@ssw0rd` | Senha do usuário. |
| `password_confirmation` | string | Sim (na criação) | `StrongP@ssw0rd` | Deve coincidir com `password`. |
| `full_name` | string | Não | `John Doe` | Default vazio. |
| `phone` | string | Não | `+5511999999999` | |
| `language` | string | Não | `en` | `en`, `pt-BR`, `es`, `de`. Default `en`. |
| `avatar_url` | string | Não | `https://example.com/avatar.png` | URL pública do avatar. |
| `job_description` | string | Não | `sales_manager` | Default `other`. |
| `webpush_notify_on_event_expired` | boolean | Não | `true` | Habilita Web Push quando um evento expira. |

Todos os endpoints abaixo assumem:

```
{base_url} = https://app.woofedcrm.com
{account_id} = 1
```

---

## Buscar usuários

`POST /api/v1/accounts/{account_id}/users/search`

Busca usuários com um objeto `query` no estilo Ransack. Veja [Estrutura da API → Busca](../api-structure#busca) para a lista de predicados.

### Body

```json
{
  "query": {
    "full_name_cont": "John Acme",
    "email_cont": "john.doe@example.com",
    "phone_cont": "+1555",
    "language_eq": "en",
    "job_description_cont": "ceo",
    "created_at_gteq": "2025-01-01T00:00:00Z",
    "created_at_lteq": "2025-01-31T23:59:59Z",
    "updated_at_gteq": "2025-01-10T00:00:00Z",
    "id_eq": 123
  }
}
```

### Exemplo de requisição

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/users/search" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "query": {
      "full_name_cont": "John",
      "language_eq": "en"
    }
  }'
```

### Exemplo de resposta — `200 OK`

```json
{
  "data": [
    {
      "id": 123,
      "full_name": "John Acme",
      "email": "john.doe@example.com",
      "created_at": "2025-01-12T18:21:03Z",
      "updated_at": "2025-01-12T18:21:03Z",
      "phone": "+15551234567",
      "language": "en",
      "notifications": { "webpush_notify_on_event_expired": true },
      "avatar_url": "https://example.com/avatar.png",
      "job_description": "ceo",
      "theme_preference": "system",
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

### Possíveis erros

| Status | Quando |
| --- | --- |
| `400` | JSON mal formatado. |
| `401` | Token ausente ou inválido. |
| `422` | Predicado desconhecido ou campo não pesquisável. |

---

## Criar usuário

`POST /api/v1/accounts/{account_id}/users`

Cria um novo usuário dentro da conta.

### Body

```json
{
  "email": "tim@maia.com",
  "password": "123456",
  "password_confirmation": "123456",
  "full_name": "Tim Maia",
  "phone": "+5541996910256",
  "language": "en",
  "avatar_url": "https://example.com/avatars/tim-maia.png",
  "job_description": "other",
  "webpush_notify_on_event_expired": true
}
```

### Exemplo de requisição

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "email": "tim@maia.com",
    "password": "StrongP@ssw0rd",
    "password_confirmation": "StrongP@ssw0rd",
    "full_name": "Tim Maia",
    "language": "pt-BR"
  }'
```

### Exemplo de resposta — `201 Created`

```json
{
  "id": 9,
  "full_name": "Tim Maia",
  "email": "tim@maia.com",
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z",
  "phone": "+5541996910256",
  "language": "pt-BR",
  "notifications": { "webpush_notify_on_event_expired": true },
  "avatar_url": "https://example.com/avatars/tim-maia.png",
  "job_description": "other",
  "theme_preference": "system",
  "account_id": 1
}
```

:::caution Endpoint sensível
Criar usuários concede acesso à conta. Garanta que o token usado para chamar este endpoint pertence a um usuário admin, e nunca exponha esta chamada em um formulário público.
:::

### Possíveis erros

| Status | Quando |
| --- | --- |
| `401` | Token ausente ou inválido. |
| `422` | Email já em uso, senha não confere, ou outro erro de validação. |
