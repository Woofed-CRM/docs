---
sidebar_label: "Docker Easy Install"
title: "Docker Easy Install"
sidebar_position: 1
---

Dieser Abschnitt bietet eine Anleitung zur Einrichtung der Woofed CRM Community Easy Install Selbstgehosteten Edition.

1. Erstellen Sie ein Volume, um Ihre Daten zu speichern:

```bash
docker volume create woofedcrm_data
```

2. Führen Sie den Woofed CRM-Container aus:

```bash
docker run -it --rm --name woofedcrm -p 3001:3001 -v woofedcrm_data:/app/storage douglara/woofedcrm:easy-install-latest
```

🎉 Fertig! Ihr Woofed CRM ist jetzt aktiv!

Zugreifen können Sie es unter: http://localhost:3001
