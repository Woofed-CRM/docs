---
sidebar_label: "Eventos de negócio"
title: "Eventos de negócio"
sidebar_position: 3
---

# Eventos de negócio

Um **evento de negócio** é qualquer coisa que aparece na timeline de um deal: uma nota, uma atividade agendada, ou uma mensagem disparada via Chatwoot ou Evolution API (WhatsApp).

Existe um único endpoint, mas ele aceita vários **tipos** (kinds) de evento. O campo `kind` decide quais campos são obrigatórios e quais efeitos colaterais o sistema executa.

## Endpoint

`POST /api/v1/accounts/{account_id}/deals/{deal_id}/events`

| Path param | Tipo | Obrigatório | Descrição |
| --- | --- | --- | --- |
| `account_id` | integer | Sim | Escopo da conta. |
| `deal_id` | integer | Sim | Negócio que receberá o evento. |

### Headers

| Header | Valor |
| --- | --- |
| `Content-Type` | `application/json` |
| `Authorization` | `Bearer SEU_TOKEN_AQUI` |

## Atributos comuns

| Atributo | Tipo | Obrigatório | Exemplo | Notas |
| --- | --- | --- | --- | --- |
| `kind` | string | Sim | `note` | Um de `note`, `activity`, `chatwoot_message`, `evolution_api_message`. |
| `title` | string | Não | `Ligação de follow-up` | Default vazio. |
| `content` | string | Geralmente sim | `Tudo certo?` | Corpo da nota / atividade / mensagem. |
| `done` | boolean | Não | `true` | Marca o evento como concluído. |
| `auto_done` | boolean | Não | `false` | Se `true`, o sistema marca o evento como done automaticamente (ex.: após enviar uma mensagem). |
| `done_at` | datetime (UTC) | Não | `2025-01-18T15:30:00Z` | Quando foi concluído. |
| `scheduled_at` | datetime (UTC) | Às vezes | `2025-01-20T14:00:00Z` | Obrigatório para mensagens agendadas. |
| `send_now` | boolean | Às vezes | `true` | Obrigatório para mensagens "enviar agora". |
| `app_type` | string | Às vezes | `Apps::Chatwoot` | Um de `Apps::Chatwoot`, `Apps::EvolutionApi`. |
| `app_id` | integer | Às vezes | `5` | ID da integração do app. |
| `additional_attributes` | object | Às vezes | `{ "chatwoot_inbox_id": "62483" }` | Extras específicos do app. |
| `custom_attributes` | object | Não | `{ "channel": "whatsapp" }` | Campos customizados livres. |

As próximas seções mostram o body exato para cada `kind`.

---

## 1. Criar nota (`kind = note`)

Uma nota é um registro em texto livre na timeline do negócio. Sem efeitos colaterais.

### Body

```json
{
  "kind": "note",
  "content": "Conteúdo do texto..."
}
```

### Exemplo de requisição

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals/1/events" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "kind": "note",
    "content": "Liguei para o cliente para discutir os próximos passos."
  }'
```

### Exemplo de resposta — `201 Created`

```json
{
  "id": 88,
  "deal_id": 1,
  "contact_id": 1,
  "app_type": null,
  "app_id": null,
  "kind": "note",
  "scheduled_at": null,
  "done_at": null,
  "from_me": true,
  "status": null,
  "custom_attributes": {},
  "additional_attributes": {},
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z",
  "title": "",
  "auto_done": false,
  "account_id": 1,
  "done": false,
  "send_now": null,
  "files": [],
  "files_events": [],
  "invalid_files": null,
  "content": "Liguei para o cliente para discutir os próximos passos."
}
```

---

## 2. Criar atividade (`kind = activity`)

Uma atividade é uma tarefa agendada na timeline (uma ligação, uma reunião, um follow-up).

### Body

```json
{
  "title": "Activity example title",
  "kind": "activity",
  "content": "Conteúdo do texto...",
  "scheduled_at": "2025-01-20T14:00:00Z",
  "done": false
}
```

### Exemplo de requisição

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals/1/events" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "title": "Ligação de follow-up",
    "kind": "activity",
    "content": "Confirmar que a proposta foi recebida",
    "scheduled_at": "2025-01-20T14:00:00Z",
    "done": false
  }'
```

### Exemplo de resposta — `201 Created`

```json
{
  "id": 89,
  "deal_id": 1,
  "contact_id": 1,
  "app_type": null,
  "app_id": null,
  "kind": "activity",
  "scheduled_at": "2025-01-20T14:00:00Z",
  "done_at": null,
  "from_me": true,
  "status": null,
  "custom_attributes": {},
  "additional_attributes": {},
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z",
  "title": "Ligação de follow-up",
  "auto_done": false,
  "account_id": 1,
  "done": false,
  "send_now": null,
  "files": [],
  "files_events": [],
  "invalid_files": null,
  "content": "Confirmar que a proposta foi recebida"
}
```

---

## 3. Agendar mensagem do Chatwoot (`kind = chatwoot_message`)

Agenda uma mensagem que será enviada por uma inbox do Chatwoot em `scheduled_at`.

### Body

```json
{
  "title": "Chatwoot Message",
  "content": "Tudo certo?",
  "kind": "chatwoot_message",
  "auto_done": false,
  "scheduled_at": "2025-01-20T14:00:00Z",
  "app_type": "Apps::Chatwoot",
  "app_id": 6,
  "additional_attributes": {
    "chatwoot_inbox_id": "62483"
  }
}
```

### Campos obrigatórios deste kind

| Atributo | Obrigatório | Notas |
| --- | --- | --- |
| `kind` | Sim | Deve ser `chatwoot_message`. |
| `content` | Sim | Corpo da mensagem. |
| `scheduled_at` | Sim | UTC. |
| `app_type` | Sim | `Apps::Chatwoot`. |
| `app_id` | Sim | ID da integração Chatwoot. |
| `additional_attributes.chatwoot_inbox_id` | Sim | Inbox de destino. |

### Exemplo de requisição

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals/1/events" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "title": "Chatwoot Message",
    "content": "Tudo certo?",
    "kind": "chatwoot_message",
    "auto_done": false,
    "scheduled_at": "2025-01-20T14:00:00Z",
    "app_type": "Apps::Chatwoot",
    "app_id": 6,
    "additional_attributes": { "chatwoot_inbox_id": "62483" }
  }'
```

### Exemplo de resposta — `201 Created`

```json
{
  "id": 90,
  "deal_id": 1,
  "contact_id": 1,
  "app_type": "Apps::Chatwoot",
  "app_id": 6,
  "kind": "chatwoot_message",
  "scheduled_at": "2025-01-20T14:00:00Z",
  "done_at": null,
  "from_me": true,
  "status": null,
  "custom_attributes": {},
  "additional_attributes": { "chatwoot_inbox_id": "62483" },
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z",
  "title": "Chatwoot Message",
  "auto_done": false,
  "account_id": 1,
  "done": false,
  "send_now": null,
  "files": [],
  "files_events": [],
  "invalid_files": null,
  "content": "Tudo certo?"
}
```

---

## 4. Enviar mensagem do Chatwoot imediatamente

Mesmo `kind` do anterior, mas **enviada imediatamente** com `send_now: true`.

### Body

```json
{
  "title": "Chatwoot Message",
  "content": "Tudo certo?",
  "kind": "chatwoot_message",
  "send_now": true,
  "app_type": "Apps::Chatwoot",
  "app_id": 5,
  "additional_attributes": {
    "chatwoot_inbox_id": "62483"
  }
}
```

### Campos obrigatórios deste kind

| Atributo | Obrigatório | Notas |
| --- | --- | --- |
| `kind` | Sim | `chatwoot_message`. |
| `content` | Sim | Corpo da mensagem. |
| `send_now` | Sim | `true`. |
| `app_type` | Sim | `Apps::Chatwoot`. |
| `app_id` | Sim | ID da integração Chatwoot. |
| `additional_attributes.chatwoot_inbox_id` | Sim | Inbox de destino. |

### Exemplo de resposta — `201 Created`

```json
{
  "id": 91,
  "deal_id": 1,
  "contact_id": 1,
  "app_type": "Apps::Chatwoot",
  "app_id": 5,
  "kind": "chatwoot_message",
  "scheduled_at": null,
  "done_at": "2025-01-15T10:30:00Z",
  "from_me": true,
  "status": null,
  "custom_attributes": {},
  "additional_attributes": { "chatwoot_inbox_id": "62483" },
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z",
  "title": "Chatwoot Message",
  "auto_done": true,
  "account_id": 1,
  "done": true,
  "send_now": true,
  "files": [],
  "files_events": [],
  "invalid_files": null,
  "content": "Tudo certo?"
}
```

---

## 5. Agendar mensagem do WhatsApp (`kind = evolution_api_message`)

Agenda uma mensagem da Evolution API (WhatsApp) para ser enviada em `scheduled_at`.

### Body

```json
{
  "title": "Whatsapp Message",
  "content": "Tudo certo?",
  "kind": "evolution_api_message",
  "auto_done": false,
  "scheduled_at": "2025-01-20T14:00:00Z",
  "app_type": "Apps::EvolutionApi",
  "app_id": 5
}
```

### Campos obrigatórios deste kind

| Atributo | Obrigatório | Notas |
| --- | --- | --- |
| `kind` | Sim | `evolution_api_message`. |
| `content` | Sim | Corpo da mensagem. |
| `scheduled_at` | Sim | UTC. |
| `app_type` | Sim | `Apps::EvolutionApi`. |
| `app_id` | Sim | ID da integração Evolution API. |

### Exemplo de requisição

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals/1/events" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "title": "Whatsapp Message",
    "content": "Tudo certo?",
    "kind": "evolution_api_message",
    "scheduled_at": "2025-01-20T14:00:00Z",
    "app_type": "Apps::EvolutionApi",
    "app_id": 5
  }'
```

### Exemplo de resposta — `201 Created`

```json
{
  "id": 92,
  "deal_id": 1,
  "contact_id": 1,
  "app_type": "Apps::EvolutionApi",
  "app_id": 5,
  "kind": "evolution_api_message",
  "scheduled_at": "2025-01-20T14:00:00Z",
  "done_at": null,
  "from_me": true,
  "status": null,
  "custom_attributes": {},
  "additional_attributes": {},
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z",
  "title": "Whatsapp Message",
  "auto_done": false,
  "account_id": 1,
  "done": false,
  "send_now": null,
  "files": [],
  "files_events": [],
  "invalid_files": null,
  "content": "Tudo certo?"
}
```

---

## 6. Enviar mensagem do WhatsApp imediatamente

Mesmo `kind` do anterior, mas com `send_now: true`.

### Body

```json
{
  "title": "Whatsapp Message",
  "content": "Tudo certo?",
  "kind": "evolution_api_message",
  "send_now": true,
  "app_type": "Apps::EvolutionApi",
  "app_id": 5
}
```

### Exemplo de requisição

```bash
curl -X POST "https://app.woofedcrm.com/api/v1/accounts/1/deals/1/events" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "title": "Whatsapp Message",
    "content": "Tudo certo?",
    "kind": "evolution_api_message",
    "send_now": true,
    "app_type": "Apps::EvolutionApi",
    "app_id": 5
  }'
```

### Exemplo de resposta — `201 Created`

```json
{
  "id": 93,
  "deal_id": 1,
  "contact_id": 1,
  "app_type": "Apps::EvolutionApi",
  "app_id": 5,
  "kind": "evolution_api_message",
  "scheduled_at": null,
  "done_at": "2025-01-15T10:30:00Z",
  "from_me": true,
  "status": null,
  "custom_attributes": {},
  "additional_attributes": {},
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z",
  "title": "Whatsapp Message",
  "auto_done": true,
  "account_id": 1,
  "done": true,
  "send_now": true,
  "files": [],
  "files_events": [],
  "invalid_files": null,
  "content": "Tudo certo?"
}
```

---

## Possíveis erros

| Status | Quando |
| --- | --- |
| `401` | Token ausente ou inválido. |
| `404` | O negócio não existe nessa conta. |
| `422` | `kind` inválido, campo obrigatório do kind ausente, `scheduled_at` mal formatado, ou `app_id` / `app_type` desconhecidos. |
