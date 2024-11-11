---
sidebar_label: "Portainer e Traefik 2 (Docker Swarm Stack)"
title: "Portainer e Traefik 2 (Docker Swarm Stack)"
sidebar_position: 1
---

Esta seção fornece orientações para configurar a edição auto-hospedada do Woofed CRM Community Easy Install usando Portainer e Traefik 2.

## Stack

Atualize o `# Update` para sua configuração.

```bash
# Woofed CRM instalação fácil

version: "3.7"

services:
  woofedcrm:
    image: douglara/woofedcrm:easy-install-latest
    volumes:
      - woofedcrm_data:/app/storage
    networks:
      - traefik_public # Atualize para sua rede Traefik
    environment:
      - FRONTEND_URL=https://easy.woofedcrm.com # Atualize para sua URL externa
    deploy:
      mode: replicated
      replicas: 1
      placement:
        constraints:
          - node.role == manager
      labels:
        - traefik.enable=true
        - traefik.http.routers.woofedcrm.rule=Host(`easy.woofedcrm.com`) # Atualize para sua URL externa
        - traefik.http.routers.woofedcrm.entrypoints=websecure
        - traefik.http.routers.woofedcrm.tls.certresolver=le
        - traefik.http.routers.woofedcrm.priority=1
        - traefik.http.routers.woofedcrm.service=woofedcrm
        - traefik.http.services.woofedcrm.loadbalancer.server.port=3001
        - traefik.http.services.woofedcrm.loadbalancer.passhostheader=true
        - traefik.http.middlewares.sslheader.headers.customrequestheaders.X-Forwarded-Proto=https
        - traefik.http.routers.woofedcrm.middlewares=sslheader@docker

volumes:
  woofedcrm_data:
    external: true
    name: woofedcrm_data

networks:
  traefik_public: # Atualize para sua rede Traefik
    external: true
    name: traefik_public # Atualize para sua rede Traefik
