---
sidebar_label: "Umgebungsvariablen"
title: "Umgebungsvariablen"
---

## Allgemein

| Parameter | Standardwert | Beschreibung |
| --------- | ------------ | ------------ |
| DATABASE_URL <span style={{color: '#ef5151'}}>\*</span> |  | Datenbank-URL (z. B. `postgres://pg_benutzer:pg_passwort@pg_host:pg_port/db_name`) |
| REDIS_URL <span style={{color: '#ef5151'}}>\*</span> |  | Redis-URL (z. B. `redis://:redis_passwort@redis_host:6379/0`) |
| FRONTEND_URL <span style={{color: '#ef5151'}}>\*</span> |  | Basis-URL der App. Sollte eine öffentlich zugängliche URL sein (z. B. `https://app.woofedcrm.com`) |
| ENABLE_USER_SIGNUP | false | Ermöglicht neue Benutzeranmeldungen. |
| MOTOR_AUTH_USERNAME | lovewoofed | Benutzer für den Admin-Zugang zum Motor |
| MOTOR_AUTH_PASSWORD | lovewoofed | Passwort für den Admin-Zugang zum Motor |
| LANGUAGE | en | Standardsprache der App, verfügbar: `pt-BR, es, en` |
| DEFAULT_TIMEZONE | brasilia | Standard-Zeitzone der App |
| EVOLUTION_API_ENDPOINT |  | EvolutionAPI-Endpunkt (z. B. `https://evolution-api.com/`). Hinweis: muss für die WhatsApp-Integration korrekt gesetzt sein. |
| EVOLUTION_API_ENDPOINT_TOKEN |  | EvolutionAPI-Global-Key. Hinweis: muss für die WhatsApp-Integration korrekt gesetzt sein. |
| VAPID_PUBLIC_KEY |  | Öffentlicher Schlüssel für die VAPID (Voluntary Application Server Identification) Authentifizierung bei Web-Push-Benachrichtigungen |
| VAPID_PRIVATE_KEY |  | Privater Schlüssel für die VAPID (Voluntary Application Server Identification) Authentifizierung bei Web-Push-Benachrichtigungen |
| OPENAI_API_KEY |  | API-Schlüssel zur Authentifizierung der OpenAI-Integrationen |
