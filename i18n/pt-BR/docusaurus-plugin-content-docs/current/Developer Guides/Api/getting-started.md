---
sidebar_label: "Primeiros passos"
title: "Primeiros passos"
sidebar_position: 2
---

# Primeiros passos

Esta página te leva do zero à sua primeira chamada de API bem-sucedida em menos de cinco minutos.

## 1. URL base

Todas as requisições são enviadas para o Woofed CRM cloud (ou para sua instância self-hosted):

```
https://app.woofedcrm.com
```

Se você está usando **self-hosting** do Woofed CRM, substitua este host pelo seu próprio domínio (ex.: `https://crm.suaempresa.com`). A estrutura de path (`/api/v1/accounts/{account_id}/...`) é idêntica nos dois casos.

## 2. ID da conta

Cada endpoint é escopado para uma conta, então a URL sempre contém seu account ID:

```
/api/v1/accounts/{account_id}/<resource>
```

Você pode encontrar seu `account_id` na URL do dashboard do Woofed CRM, logo após `/app/`. Para a maioria das instalações, a primeira conta é `1`.

## 3. Autenticação, em uma linha

Toda requisição precisa carregar um Bearer Token no cabeçalho `Authorization`:

```http
Authorization: Bearer SEU_TOKEN_AQUI
```

Se você ainda não tem um token, siga o pequeno guia [**Obter Token**](./GeToken) primeiro. Os detalhes completos de segurança ficam em [**Autenticação**](./authentication).

## 4. Sua primeira requisição

Vamos buscar um único contato (assumindo que existe um contato com id `1` na conta `1`):

```bash
curl -X GET "https://app.woofedcrm.com/api/v1/accounts/1/contacts/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

A mesma chamada em JavaScript:

```javascript
const res = await fetch(
  "https://app.woofedcrm.com/api/v1/accounts/1/contacts/1",
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer SEU_TOKEN_AQUI",
    },
  }
);

const contact = await res.json();
console.log(contact);
```

Uma resposta bem-sucedida é um JSON simples descrevendo o contato:

```json
{
  "id": 1,
  "full_name": "Tim Maia",
  "phone": "+5541996910256",
  "email": "tim@maia.com",
  "custom_attributes": {
    "city": "RJ"
  },
  "label_list": ["label1", "label2"],
  "created_at": "2025-01-12T18:21:03Z",
  "updated_at": "2025-01-12T18:21:03Z"
}
```

Pronto — você está conversando com o Woofed CRM.

## 5. Ferramentas recomendadas

Durante o desenvolvimento, as ferramentas a seguir economizam muito tempo:

- **[Postman](https://www.postman.com/)** — a [coleção oficial do Woofed CRM no Postman](https://www.postman.com/dark-shuttle-5185/workspace/woofed-crm-api/collection/905262-e0bb0d71-a634-4fa2-8b03-4ae4c6dde690) já vem com todos os endpoints pré-configurados. Basta definir as variáveis de coleção `endpoint`, `account_id` e `token`.
- **`curl`** — perfeito para scripts, debugging e para colar nesta documentação.
- **HTTPie** — sintaxe mais amigável que o curl: `http GET https://app.woofedcrm.com/... "Authorization: Bearer …"`.
- **Browser DevTools** — a aba **Network** mostra exatamente o que seu frontend está enviando, caso você esteja integrando a partir de uma SPA.

## 6. Anatomia de uma resposta

A maioria das respostas segue a mesma estrutura geral:

```json
{
  "id": 42,
  "name": "Lead site: Rubel",
  "status": "open",
  "stage_id": 1,
  "contact_id": 1,
  "custom_attributes": { "source": "Website" },
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

Pontos-chave:

- **`id`** — todo registro tem um ID numérico, escopado pela conta. Use-o para se referir ao registro em requisições subsequentes (`GET /deals/42`, `PUT /deals/42`, …).
- **Timestamps** — `created_at` e `updated_at` estão no formato ISO 8601, em UTC.
- **`custom_attributes`** — um objeto JSON livre. Use-o para campos que não existem como colunas nativas (`source`, `cpf`, `priority`, …).
- **HTTP status code** — `2xx` para sucesso, `4xx` para erros do cliente, `5xx` para erros do servidor. A lista completa fica em [Estrutura da API → Status codes](./api-structure#status-codes).

## Próximos passos

Você já tem tudo o que precisa para fazer qualquer chamada desta documentação funcionar. Continue por:

- [**Autenticação**](./authentication) para boas práticas de segurança.
- [**Estrutura da API**](./api-structure) para status codes, tratamento de erros e a sintaxe de busca.
- [**Endpoints**](./endpoints/contacts) para a referência completa.
