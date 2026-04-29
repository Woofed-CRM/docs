---
sidebar_label: "Estrutura da API"
title: "Estrutura da API"
sidebar_position: 5
---

# Estrutura da API

Esta página descreve as convenções que todo endpoint da API do Woofed CRM segue. Uma vez que você entenda as regras abaixo, todo endpoint da [referência](./endpoints/contacts) se lê da mesma maneira.

## Padrão de URL

Todos os endpoints vivem sob um único namespace, escopado por conta:

```
{base_url}/api/v1/accounts/{account_id}/<resource>[/<id>][/<sub-action>]
```

| Segmento | Descrição |
| --- | --- |
| `{base_url}` | `https://app.woofedcrm.com` no cloud, ou seu próprio host em uma instalação self-hosted. |
| `api/v1` | Versão da API. |
| `accounts/{account_id}` | A conta dona dos dados. Todo recurso é escopado por conta. |
| `<resource>` | A coleção do recurso: `contacts`, `deals`, `products`, `users`, `deal_products`, `deal_assignees`. |
| `<id>` | Um ID específico (numérico). |
| `<sub-action>` | Sub-ação opcional como `search`, `upsert`, ou recursos aninhados como `events`. |

## Verbos HTTP

A API segue convenções REST:

| Verbo | Usado para |
| --- | --- |
| `GET` | Recuperar um único recurso. |
| `POST` | Criar um recurso, executar uma busca ou rodar um `upsert`. |
| `PUT` | Atualizar um recurso existente (substituição total / parcial). |
| `DELETE` | Remover um recurso. |

## Formato da requisição

Requisições que enviam um corpo sempre usam **JSON**. Você deve sempre enviar estes dois cabeçalhos:

```http
Content-Type: application/json
Authorization: Bearer SEU_TOKEN_AQUI
```

Exemplo de body para criar um contato:

```json
{
  "full_name": "Tim Maia",
  "phone": "+5541996910256",
  "email": "tim@maia.com",
  "custom_attributes": { "city": "RJ" },
  "label_list": ["label1", "label2"]
}
```

## Formato da resposta

Respostas bem-sucedidas retornam um documento JSON representando o recurso (ou um array de recursos, em operações de listagem). Os nomes dos campos usam `snake_case` e timestamps são ISO 8601 em UTC.

```json
{
  "id": 1,
  "name": "Lead site: Rubel",
  "status": "open",
  "stage_id": 1,
  "contact_id": 1,
  "custom_attributes": { "source": "Website" },
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

### Atributos customizados

A maioria dos recursos expõe um objeto JSON `custom_attributes`. É um saco de chave/valor livre, pensado para guardar campos que não existem como colunas nativas (`source`, `cpf`, `priority`, …). As chaves que você guardar lá são devolvidas exatamente como você enviou.

### Datas e horários

Sempre envie datas em **ISO 8601 UTC** (`2025-01-20T14:00:00Z`). Strings com timezone não são aceitas em `scheduled_at`, `done_at`, `won_at`, `lost_at`, etc.

## Status codes

| Código | Significado |
| --- | --- |
| `200 OK` | A requisição teve sucesso; o body contém o recurso solicitado. |
| `201 Created` | Um recurso foi criado com sucesso. |
| `204 No Content` | A requisição teve sucesso e não há body para retornar (tipicamente `DELETE`). |
| `400 Bad Request` | Body com JSON mal formatado, ou campos obrigatórios faltando. |
| `401 Unauthorized` | Token ausente, mal formatado ou expirado. Veja [Autenticação](./authentication). |
| `403 Forbidden` | Token válido, mas o usuário não tem acesso ao recurso. |
| `404 Not Found` | URL incorreta, ou o registro não existe nessa conta. |
| `422 Unprocessable Entity` | Erro de validação — ex.: formato de email inválido, `stage_id` ausente na criação de um deal, etc. |
| `429 Too Many Requests` | Limite de requisições atingido — faça back-off e tente de novo após uma pequena espera. |
| `5xx` | Erro do servidor. Tente novamente com backoff exponencial e contate o suporte se persistir. |

## Tratamento de erros

Erros retornam um body JSON com detalhes do que deu errado. O formato comum é:

```json
{
  "errors": {
    "email": ["is invalid"],
    "stage_id": ["can't be blank"]
  }
}
```

Ou para erros de nível superior:

```json
{
  "error": "Unauthorized"
}
```

Comportamento recomendado para o cliente:

- Trate qualquer `2xx` como sucesso.
- Trate qualquer `4xx` como **bug do cliente**: faça log da requisição e do body de erro para corrigir o input.
- Trate qualquer `5xx` como **falha transitória**: tente até 3 vezes com backoff exponencial.

## Busca

Recursos que expõem `/search` (contatos, produtos, usuários — veja a página de cada endpoint) usam uma poderosa **linguagem de busca no estilo Ransack**. Você monta um objeto `query` em que as chaves são `<campo>_<predicado>`:

```json
{
  "query": {
    "full_name_cont": "John",
    "email_cont": "@example.com",
    "created_at_gteq": "2025-01-01T00:00:00Z",
    "id_eq": 42
  }
}
```

Predicados suportados (os mais comuns):

| Predicado | Significado |
| --- | --- |
| `*_eq` | Igual a |
| `*_not_eq` | Diferente de |
| `*_cont` | Contém (substring) |
| `*_not_cont` | Não contém |
| `*_start` / `*_end` | Começa com / termina com |
| `*_lt` / `*_lteq` | Menor que / menor ou igual a |
| `*_gt` / `*_gteq` | Maior que / maior ou igual a |
| `*_in` / `*_not_in` | Está / não está numa lista |
| `*_present` / `*_blank` | Está presente / em branco |
| `*_null` / `*_not_null` | É nulo / não nulo |
| `*_true` / `*_false` | Booleano verdadeiro / falso |
| `*_matches` | Casa com um padrão SQL `LIKE` |

Cada predicado também aceita os sufixos `_any` e `_all` para casar contra uma lista de valores:

```json
{ "query": { "label_list_cont_any": ["vip", "trial"] } }
```

Uma referência completa de predicados acompanha cada endpoint pesquisável.

## Paginação, filtros e ordenação

A maioria dos endpoints de listagem aceita query params para paginação e ordenação. Quando suportados, seguem estas convenções:

- `page` — número da página (começa em 1).
- `per_page` — itens por página (o padrão varia por recurso).
- `sort` — campo para ordenar (ex.: `sort=created_at desc`).

Cada página de endpoint documenta os parâmetros realmente suportados.

## Idempotência e `upsert`

Alguns recursos expõem uma ação `upsert` (ex.: `POST /contacts/upsert`, `POST /deals/upsert`). Ela vai **criar** o registro se nenhum match for encontrado, ou **atualizar** o existente caso contrário. Esse é o padrão preferido para sincronizações noturnas ou qualquer pipeline em que o sistema de origem é a fonte da verdade.

## Próximo passo

Navegue pela referência completa, um recurso por vez, começando por [**Contatos**](./endpoints/contacts).
