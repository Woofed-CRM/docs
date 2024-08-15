---
sidebar_label: "Environment Variables"
title: "Environment Variables"
---

## General

| Parameter | Default | Description |
| ------ | ------ | ------ |
| DATABASE_URL <span style={{color: '#ef5151'}}>\*</span> |  | Database URL  |
| REDIS_URL <span style={{color: '#ef5151'}}>\*</span> |  | Redis URL|
| FRONTEND_URL <span style={{color: '#ef5151'}}>\*</span> |  | App base URL. Should be publicly accessible URL (ex: `https://app.woofedcrm.com`) |
| ENABLE_USER_SIGNUP | false | Enable new user sign ups. |
| MOTOR_AUTH_USERNAME | lovewoofed | Motor admin access user |
| MOTOR_AUTH_PASSWORD | lovewoofed | Motor admin access password |
| LANGUAGE  | en | Default app language, availables: `pt-BR, es, en` |
| DEFAULT_TIMEZONE  | brasilia | Default app timezone |
| EVOLUTION_API_ENDPOINT_TOKEN  |  | EvolutionAPI global key |
| EVOLUTION_API_ENDPOINT  |  | EvolutionAPI endpoint (ex: `https://evolution-api.com/`) |
| EVOLUTION_API_ENDPOINT_TOKEN  |  | EvolutionAPI global key |
| VAPID_PUBLIC_KEY  |  | Public key used for VAPID (Voluntary Application Server Identification) authentication in web push notifications |
| VAPID_PRIVATE_KEY  |  | Private key used for VAPID (Voluntary Application Server Identification) authentication in web push notifications |
| OPENAI_API_KEY  |  | API key for authenticating OpenAI’s integrations |
