---
sidebar_label: "Obter Token"
title: "Obter Token"
sidebar_position: 4
---

# Obter Token

Toda chamada da API do Woofed CRM precisa de um **JWT Bearer Token**. O token é gerado a partir da página de detalhes do usuário e representa um usuário específico — toda ação realizada com esse token é registrada e autorizada como se aquele usuário tivesse feito pela UI.

## Como obter o token

Acesse a página de detalhes do usuário no Woofed CRM e copie o token conforme demonstrado abaixo:

![Como obter o token na página de detalhes do usuário](/img/get-token.gif)

Copie o valor e use-o como `Bearer <token>` em todas as requisições — veja [**Autenticação**](./authentication) para exemplos.

## Depois de ter o token

- Primeira chamada rápida: [**Primeiros passos → Sua primeira requisição**](./getting-started#4-sua-primeira-requisição)
- Onde colocar o cabeçalho: [**Autenticação → Enviando o token**](./authentication#enviando-o-token)
- Como mantê-lo seguro: [**Autenticação → Boas práticas de segurança**](./authentication#boas-práticas-de-segurança)

:::caution Mantenha seu token seguro
O token concede acesso completo à API em nome do seu usuário. Não compartilhe e não comite em repositórios públicos.
:::
