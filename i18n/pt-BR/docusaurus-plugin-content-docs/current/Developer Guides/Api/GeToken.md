---
sidebar_label: "Obter Token"
title: "Obter Token"
sidebar_position: 4
---

# Obter Token

Toda chamada da API do Woofed CRM precisa de um **JWT Bearer Token**. O token é gerado pelo painel de administração e representa um usuário específico — toda ação realizada com esse token é registrada e autorizada como se aquele usuário tivesse feito pela UI.

## Passo a passo

1. Faça login no Woofed CRM com um **usuário admin**.
2. Abra o painel de administração:

   ```
   https://<seu-subdominio>/motor_admin
   ```

   No Woofed CRM cloud isso normalmente é `https://app.woofedcrm.com/motor_admin`. Em uma instalação self-hosted, troque pelo seu host.

3. Clique em **`*` (Configurações)** no topo do painel.
4. Abra a seção **Usuários**.
5. Clique em **Adicionar Coluna** e preencha:
   - **Nome:** `get_jwt_token`
   - **Tipo:** `Somente leitura` (ReadOnly)
6. Salve a coluna. A nova coluna aparecerá na grade de usuários; o valor dessa célula, na linha do usuário que você quer autenticar, **é o seu token**.

Copie esse valor e use-o como `Bearer <token>` em todas as requisições — veja [**Autenticação**](./authentication) para exemplos.

## Depois de ter o token

- Primeira chamada rápida: [**Primeiros passos → Sua primeira requisição**](./getting-started#4-sua-primeira-requisição)
- Onde colocar o cabeçalho: [**Autenticação → Enviando o token**](./authentication#enviando-o-token)
- Como mantê-lo seguro: [**Autenticação → Boas práticas de segurança**](./authentication#boas-práticas-de-segurança)

:::caution Não compartilhe essa coluna com usuários não-admin
A coluna `get_jwt_token` mostra tokens de acesso completo. Garanta que apenas usuários admin de confiança consigam ver a grade de Usuários no painel.
:::
