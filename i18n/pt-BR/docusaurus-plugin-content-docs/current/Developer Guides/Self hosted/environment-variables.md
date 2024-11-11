---
sidebar_label: "Variáveis de Ambiente"
title: "Variáveis de Ambiente"
---

## Geral

| Parâmetro | Padrão | Descrição |
| --------- | ------ | --------- |
| DATABASE_URL <span style={{color: '#ef5151'}}>\*</span> |  | URL do banco de dados (ex: `postgres://pg_username:pg_password@pg_host:pg_port/db_name`) |
| REDIS_URL <span style={{color: '#ef5151'}}>\*</span> |  | URL do Redis (ex: `redis://:redis_password@redis_host:6379/0`) |
| FRONTEND_URL <span style={{color: '#ef5151'}}>\*</span> |  | URL base do app. Deve ser uma URL acessível publicamente (ex: `https://app.woofedcrm.com`) |
| ENABLE_USER_SIGNUP | false | Habilitar o registro de novos usuários. |
| MOTOR_AUTH_USERNAME | lovewoofed | Usuário de acesso admin do Motor |
| MOTOR_AUTH_PASSWORD | lovewoofed | Senha de acesso admin do Motor |
| LANGUAGE  | en | Idioma padrão do app, disponíveis: `pt-BR, es, en` |
| DEFAULT_TIMEZONE  | brasilia | Fuso horário padrão do app |
| EVOLUTION_API_ENDPOINT  |  | Endpoint da EvolutionAPI (ex: `https://evolution-api.com/`). Obs: deve ser configurado para a integração com o WhatsApp funcionar corretamente. |
| EVOLUTION_API_ENDPOINT_TOKEN  |  | Chave global da EvolutionAPI. Obs: deve ser configurado para a integração com o WhatsApp funcionar corretamente. |
| VAPID_PUBLIC_KEY  |  | Chave pública usada para autenticação VAPID (Identificação Voluntária do Servidor de Aplicações) em notificações push web |
| VAPID_PRIVATE_KEY  |  | Chave privada usada para autenticação VAPID (Identificação Voluntária do Servidor de Aplicações) em notificações push web |
| OPENAI_API_KEY  |  | Chave da API para autenticar integrações com o OpenAI |
