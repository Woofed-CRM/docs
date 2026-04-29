---
sidebar_label: "Autenticação"
title: "Autenticação"
sidebar_position: 3
---

# Autenticação

A API do Woofed CRM autentica toda requisição com um **JWT Bearer Token**. Existe um único tipo de token — não há chaves "publicáveis" ou "secretas" separadas, e não há fluxo OAuth.

## Como funciona

1. Você obtém um token JWT no painel de administração — veja o guia [**Obter Token**](./GeToken).
2. Você inclui esse token no cabeçalho `Authorization` de toda requisição da API:

```http
Authorization: Bearer SEU_TOKEN_AQUI
```

3. O token identifica **o usuário** em nome de quem a chamada está sendo feita, ou seja, **todas as permissões, logs de auditoria e regras de propriedade se comportam exatamente como se aquele usuário tivesse feito a ação pela UI**.

:::caution O token é uma credencial
Um token do Woofed CRM pode ler e modificar todos os dados que o usuário dono dele consegue ver. Trate-o como uma senha.
:::

## Enviando o token

O cabeçalho é o mesmo independentemente da linguagem ou cliente HTTP que você usa.

### curl

```bash
curl -X GET "https://app.woofedcrm.com/api/v1/accounts/1/contacts/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### JavaScript / fetch

```javascript
const res = await fetch(
  "https://app.woofedcrm.com/api/v1/accounts/1/contacts/1",
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.WOOFED_TOKEN}`,
    },
  }
);
```

### Node.js / axios

```javascript
import axios from "axios";

const woofed = axios.create({
  baseURL: "https://app.woofedcrm.com/api/v1/accounts/1",
  headers: {
    Authorization: `Bearer ${process.env.WOOFED_TOKEN}`,
    "Content-Type": "application/json",
  },
});

const { data } = await woofed.get("/contacts/1");
```

### Python / requests

```python
import os
import requests

headers = {
    "Authorization": f"Bearer {os.environ['WOOFED_TOKEN']}",
    "Content-Type": "application/json",
}

r = requests.get(
    "https://app.woofedcrm.com/api/v1/accounts/1/contacts/1",
    headers=headers,
)
r.raise_for_status()
print(r.json())
```

### Ruby / Net::HTTP

```ruby
require "net/http"
require "json"

uri = URI("https://app.woofedcrm.com/api/v1/accounts/1/contacts/1")
req = Net::HTTP::Get.new(uri)
req["Authorization"] = "Bearer #{ENV['WOOFED_TOKEN']}"
req["Content-Type"]  = "application/json"

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
puts JSON.parse(res.body)
```

## Erros comuns de autenticação

| Status | Significado | O que verificar |
| --- | --- | --- |
| `401 Unauthorized` | Token ausente, mal formatado ou expirado | O cabeçalho está exatamente como `Authorization: Bearer <token>` (atenção ao espaço, sem aspas em volta do token, sem espaços antes ou depois). |
| `403 Forbidden` | Token válido, mas o usuário não tem acesso ao recurso | O usuário dono do token pertence à conta correta e tem permissão sobre o recurso. |
| `404 Not Found` | `account_id` errado na URL, ou o registro não existe nessa conta | O token pertence a um usuário da mesma conta que aparece na URL. |

## Boas práticas de segurança

Seguir as regras abaixo te protege dos vazamentos de token mais comuns.

- **Nunca embuta um token em código client-side.** Navegadores, apps móveis e qualquer código que vá para o dispositivo do usuário devem chamar **seu próprio backend**, que então chama o Woofed CRM com o token mantido no servidor.
- **Nunca commite tokens no git.** Use variáveis de ambiente (arquivos `.env` fora do versionamento, gestores de segredos, secrets de CI/CD, …).
- **Um token por integração.** Se um token vazar, você consegue rotacionar apenas aquela integração sem impactar as outras.
- **Rotacione tokens em offboarding.** Um token associado a um colaborador deve ser regerado quando essa pessoa sair da empresa.
- **Sempre use HTTPS.** A API só aceita conexões TLS — mas você também deve forçar HTTPS em qualquer serviço que faça proxy das chamadas.
- **Apenas server-to-server.** Evite enviar o token para qualquer terceiro (chatbots, plataformas no-code, …) que você não confie totalmente.

:::tip Armazenando o token
Padrões comuns:
- **Aplicação backend** — uma variável de ambiente `WOOFED_TOKEN` injetada pelo seu runtime (Heroku, Render, Fly, secret do Kubernetes, …).
- **n8n / Make / Zapier** — armazene no cofre de "credenciais" da plataforma, nunca em texto puro dentro de um step.
- **Script local** — um arquivo `.env` listado no `.gitignore` e carregado por uma lib como `dotenv`.
:::

## Próximo passo

Você está pronto para chamar qualquer endpoint. Vá para a página [**Estrutura da API**](./api-structure) para entender formatos de resposta e tratamento de erros, ou pule direto para a [**Referência de endpoints**](./endpoints/contacts).
