---
sidebar_label: "Introdução"
title: "Introdução à API"
sidebar_position: 1
---

# API do Woofed CRM

Bem-vindo à **API REST do Woofed CRM**. A API expõe os mesmos recursos que você usa dentro do produto — contatos, negócios, eventos de negócios, produtos, usuários e responsáveis — para que você possa conectar o Woofed CRM a qualquer sistema que fale HTTP.

## O que é a API do Woofed CRM?

A API do Woofed CRM é uma **API HTTP/JSON, no padrão REST**. Cada recurso tem uma URL estável, cada ação é executada com um verbo HTTP padrão (`GET`, `POST`, `PUT`, `DELETE`) e todo payload — tanto de entrada quanto de saída — é **JSON**.

Se você já trabalhou com APIs como Stripe, Twilio ou GitHub, vai se sentir em casa: as convenções são as mesmas.

## O que você pode fazer com ela

- **Sincronizar sua base de contatos** entre o Woofed CRM e seu site, landing page, plataformas de anúncios ou ferramentas de automação de marketing.
- **Criar e atualizar negócios** automaticamente quando um lead converte em outro sistema (um Typeform, um checkout, uma ligação telefônica, etc.).
- **Adicionar notas, atividades e mensagens** à timeline do negócio (incluindo mensagens de WhatsApp agendadas via Evolution API e conversas no Chatwoot).
- **Gerenciar seu catálogo de produtos** e anexar produtos a negócios para calcular o valor do negócio automaticamente.
- **Atribuir negócios a usuários** programaticamente — perfeito para distribuição round-robin de leads, atribuição automática de SDR ou rebalanceamento na saída de usuários.
- **Pesquisar qualquer recurso** com predicados ricos no estilo Ransack (`*_eq`, `*_cont`, `*_gteq`, …) para que você construa dashboards, exportações e auditorias sem ter que raspar a UI.

## Casos de uso comuns

| Cenário | O que você chamaria |
| --- | --- |
| Novo lead vindo do seu site | `POST /contacts` seguido de `POST /deals` |
| Sincronização noturna CRM ↔ ERP | `POST /contacts/upsert`, `POST /deals/upsert` |
| Construir uma visão "meus negócios de hoje" | `POST /deals/.../events` + `POST /contacts/search` |
| Agendar um follow-up por WhatsApp | `POST /deals/{id}/events` com `kind: evolution_api_message` |
| Distribuição round-robin | `POST /deal_assignees` |

## Conceitos que você precisa conhecer

Embora esta documentação não pressuponha grande experiência com APIs, três conceitos aparecem em todo lugar:

- **REST** — cada entidade (contato, negócio, …) vive em uma URL previsível, e o verbo HTTP indica ao servidor o que fazer com ela.
- **JSON** — tanto os corpos das requisições quanto as respostas são JSON puro. Sempre envie o cabeçalho `Content-Type: application/json` quando houver um corpo.
- **Autenticação por Bearer Token** — toda chamada deve carregar um JWT no cabeçalho `Authorization`. Não há API keys, URLs assinadas ou OAuth: apenas um token.

Se algum desses termos for novo, o guia de [Primeiros passos](./getting-started) te leva pela primeira chamada passo a passo.

## Como esta seção está organizada

1. [**Primeiros passos**](./getting-started) — URL base, sua primeira requisição e a anatomia da resposta.
2. [**Autenticação**](./authentication) — como enviar o Bearer Token e boas práticas de segurança.
3. [**Obter Token**](./GeToken) — como obter seu JWT no painel de administração.
4. [**Estrutura da API**](./api-structure) — formato de request/response, status codes, tratamento de erros e predicados de busca.
5. [**Endpoints**](./endpoints/contacts) — uma página por recurso, com cada parâmetro documentado e exemplos prontos para copiar e colar.

:::tip Coleção do Postman
A coleção completa do Postman, usada como fonte de verdade para esta documentação, está disponível aqui:
[API do Woofed CRM — Workspace do Postman](https://www.postman.com/dark-shuttle-5185/workspace/woofed-crm-api/collection/905262-e0bb0d71-a634-4fa2-8b03-4ae4c6dde690)
:::
