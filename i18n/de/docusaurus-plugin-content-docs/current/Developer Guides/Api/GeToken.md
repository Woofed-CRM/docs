---
sidebar_label: "Token abrufen"
title: "Token abrufen"
sidebar_position: 4
---

# Token abrufen

Jeder API-Aufruf bei Woofed CRM benötigt einen **JWT-Bearer-Token**. Der Token wird im Admin-Panel erzeugt und repräsentiert einen bestimmten Benutzer — jede Aktion mit diesem Token wird protokolliert und autorisiert, als hätte dieser Benutzer sie in der UI ausgeführt.

## Schritt für Schritt

1. Melden Sie sich bei Woofed CRM mit einem **Admin-Benutzer** an.
2. Öffnen Sie das Admin-Panel:

   ```
   https://<ihre-subdomain>/motor_admin
   ```

   In der Cloud ist das in der Regel `https://app.woofedcrm.com/motor_admin`. In einer selbst gehosteten Installation ersetzen Sie den Host durch Ihren eigenen.

3. Klicken Sie oben im Panel auf **`*` (Einstellungen)**.
4. Öffnen Sie den Bereich **Benutzer**.
5. Klicken Sie auf **Spalte hinzufügen** und tragen Sie ein:
   - **Name:** `get_jwt_token`
   - **Typ:** `Schreibgeschützt` (ReadOnly)
6. Spalte speichern. Die neue Spalte erscheint im Benutzer-Grid; der Wert in der Zelle für den gewünschten Benutzer **ist Ihr Token**.

Kopieren Sie diesen Wert und verwenden Sie ihn als `Bearer <token>` in jeder Anfrage — Beispiele finden Sie unter [**Authentifizierung**](./authentication).

## Sobald Sie den Token haben

- Schneller erster Aufruf: [**Erste Schritte → Ihr erster Request**](./getting-started#4-ihr-erster-request)
- Wo der Header hingehört: [**Authentifizierung → Token mitsenden**](./authentication#token-mitsenden)
- Sicher aufbewahren: [**Authentifizierung → Sicherheits-Best-Practices**](./authentication#sicherheits-best-practices)

:::caution Diese Spalte nicht für Nicht-Admins freigeben
Die Spalte `get_jwt_token` zeigt vollwertige Zugriffstokens. Stellen Sie sicher, dass nur vertrauenswürdige Admin-Benutzer das Benutzer-Grid im Admin-Panel sehen können.
:::
