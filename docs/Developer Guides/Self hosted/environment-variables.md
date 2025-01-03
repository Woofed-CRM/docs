---
sidebar_label: "Environment Variables"
title: "Environment Variables"
---

## General

| Parameter | Default | Description |
| ------ | ------ | ------ |
| DATABASE_URL <span style={{color: '#ef5151'}}>\*</span> |  | Database URL (ex: `postgres://pg_username:pg_password@pg_host:pg_port/db_name`) |
| REDIS_URL <span style={{color: '#ef5151'}}>\*</span> |  | Redis URL (ex: `redis://:redis_password@redis_host:6379/0`) |
| FRONTEND_URL <span style={{color: '#ef5151'}}>\*</span> |  | App base URL. Should be publicly accessible URL (ex: `https://app.woofedcrm.com`) |
| ENABLE_USER_SIGNUP | false | Enable new user sign ups. |
| MOTOR_AUTH_USERNAME | lovewoofed | Motor admin access user |
| MOTOR_AUTH_PASSWORD | lovewoofed | Motor admin access password |
| LANGUAGE  | en | Default app language, availables: `pt-BR, es, en` |
| DEFAULT_TIMEZONE  | brasilia | Default app timezone. Timezone list: `https://gist.github.com/eikes/5a64b661022c756bd6522ed94770e2a6` |
| EVOLUTION_API_ENDPOINT  |  | EvolutionAPI (versions below v2.0) endpoint (ex: `https://evolution-api.com/`). Obs: must be set for WhatsApp integration to function correctly. |
| EVOLUTION_API_ENDPOINT_TOKEN  |  | EvolutionAPI (versions below v2.0) global key. Obs: must be set for WhatsApp integration to function correctly. |
| VAPID_PUBLIC_KEY  |  | Public key used for VAPID (Voluntary Application Server Identification) authentication in web push notifications |
| VAPID_PRIVATE_KEY  |  | Private key used for VAPID (Voluntary Application Server Identification) authentication in web push notifications |
| OPENAI_API_KEY  |  | API key for authenticating OpenAI’s integrations |
