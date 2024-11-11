---
sidebar_label: "Docker Easy Install"
title: "Docker Easy Install"
sidebar_position: 1
---


Esta seção fornece orientações sobre como configurar a edição auto-hospedada do Woofed CRM Community Easy Install.

1. Crie um volume para armazenar seus dados:
```bash
docker volume create woofedcrm_data
```

2. Execute o container do Woofed CRM:
```bash
docker run -it --rm --name woofedcrm -p 3001:3001 -v woofedcrm_data:/app/storage douglara/woofedcrm:easy-install-latest
```

🎉 Pronto! Seu Woofed CRM está instalado e funcionando!

Acesse em: http://localhost:3001
