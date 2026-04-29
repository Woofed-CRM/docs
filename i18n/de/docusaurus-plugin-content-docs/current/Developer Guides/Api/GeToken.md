---
sidebar_label: "Token abrufen"
title: "Token abrufen"
sidebar_position: 4
---

# Token abrufen

Jeder API-Aufruf bei Woofed CRM benötigt einen **JWT-Bearer-Token**. Der Token wird auf der Detailseite des Benutzers erzeugt und repräsentiert einen bestimmten Benutzer — jede Aktion mit diesem Token wird protokolliert und autorisiert, als hätte dieser Benutzer sie in der UI ausgeführt.

## So erhalten Sie den Token

Öffnen Sie die Detailseite des Benutzers in Woofed CRM und kopieren Sie den Token wie unten gezeigt:

![So erhalten Sie den Token auf der Detailseite des Benutzers](/img/get-token.gif)

Kopieren Sie diesen Wert und verwenden Sie ihn als `Bearer <token>` in jeder Anfrage — Beispiele finden Sie unter [**Authentifizierung**](./authentication).

## Sobald Sie den Token haben

- Schneller erster Aufruf: [**Erste Schritte → Ihr erster Request**](./getting-started#4-ihr-erster-request)
- Wo der Header hingehört: [**Authentifizierung → Token mitsenden**](./authentication#token-mitsenden)
- Sicher aufbewahren: [**Authentifizierung → Sicherheits-Best-Practices**](./authentication#sicherheits-best-practices)

:::caution Bewahren Sie Ihren Token sicher auf
Der Token gewährt vollen API-Zugriff im Namen Ihres Benutzers. Nicht weitergeben und nicht in öffentliche Repositories committen.
:::
