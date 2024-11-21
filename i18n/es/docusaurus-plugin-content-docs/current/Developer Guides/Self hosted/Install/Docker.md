---
sidebar_label: "Instalación Fácil con Docker"
title: "Instalación Fácil con Docker"
sidebar_position: 1
---

Esta sección proporciona una guía sobre cómo configurar la edición autoalojada de Woofed CRM Community usando instalación fácil con Docker.

1. Crea un volumen para almacenar tus datos:

```bash
docker volume create woofedcrm_data
```

2. Ejecuta el contenedor de Woofed CRM:

```bash
docker run -it --rm --name woofedcrm -p 3001:3001 -v woofedcrm_data:/app/storage douglara/woofedcrm:easy-install-latest
```

🎉 ¡Listo! ¡Tu Woofed CRM está en funcionamiento!

Accede a él en: http://localhost:3001
