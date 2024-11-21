---
sidebar_label: "Portainer y Traefik 2 (Docker Swarm Stack)"
title: "Portainer y Traefik 2 (Docker Swarm Stack)"
sidebar_position: 1
---

Esta sección proporciona una guía sobre cómo configurar la edición autoalojada de Woofed CRM Community usando instalación fácil con Portainer y Traefik 2.

## Stack

Actualiza `# Update` según tu configuración.

```bash
# Instalación fácil de Woofed CRM

version: "3.7"

services:
  woofedcrm:
    image: douglara/woofedcrm:easy-install-latest
    volumes:
      - woofedcrm_data:/app/storage
    networks:
      - traefik_public # Actualiza tu red de traefik
    environment:
      - FRONTEND_URL=https://easy.woofedcrm.com # Actualiza tu URL externa
    deploy:
      mode: replicated
      replicas: 1
      placement:
        constraints:
          - node.role == manager
      labels:
        - traefik.enable=true
        - traefik.http.routers.woofedcrm.rule=Host(`easy.woofedcrm.com`) # Actualiza tu URL externa
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
  traefik_public: # Actualiza tu red de traefik
    external: true
    name: traefik_public # Actualiza tu red de traefik
