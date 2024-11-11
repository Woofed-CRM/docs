---
sidebar_label: "Variables de Entorno"
title: "Variables de Entorno"
---

## General

| Parámetro | Predeterminado | Descripción |
| ------ | ------ | ------ |
| DATABASE_URL <span style={{color: '#ef5151'}}>\*</span> |  | URL de la base de datos (ej: `postgres://pg_username:pg_password@pg_host:pg_port/db_name`) |
| REDIS_URL <span style={{color: '#ef5151'}}>\*</span> |  | URL de Redis (ej: `redis://:redis_password@redis_host:6379/0`) |
| FRONTEND_URL <span style={{color: '#ef5151'}}>\*</span> |  | URL base de la aplicación. Debe ser una URL accesible públicamente (ej: `https://app.woofedcrm.com`) |
| ENABLE_USER_SIGNUP | false | Habilitar registros de nuevos usuarios. |
| MOTOR_AUTH_USERNAME | lovewoofed | Usuario de acceso al administrador del motor |
| MOTOR_AUTH_PASSWORD | lovewoofed | Contraseña de acceso al administrador del motor |
| LANGUAGE  | en | Idioma predeterminado de la aplicación, disponibles: `pt-BR, es, en` |
| DEFAULT_TIMEZONE  | brasilia | Zona horaria predeterminada de la aplicación |
| EVOLUTION_API_ENDPOINT  |  | Endpoint de EvolutionAPI (ej: `https://evolution-api.com/`). Obs: debe configurarse para que la integración con WhatsApp funcione correctamente. |
| EVOLUTION_API_ENDPOINT_TOKEN  |  | Clave global de EvolutionAPI. Obs: debe configurarse para que la integración con WhatsApp funcione correctamente. |
| VAPID_PUBLIC_KEY  |  | Clave pública utilizada para la autenticación VAPID (Identificación Voluntaria del Servidor de Aplicaciones) en las notificaciones push web |
| VAPID_PRIVATE_KEY  |  | Clave privada utilizada para la autenticación VAPID (Identificación Voluntaria del Servidor de Aplicaciones) en las notificaciones push web |
| OPENAI_API_KEY  |  | Clave de API para autenticar las integraciones de OpenAI |
