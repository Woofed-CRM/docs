---
sidebar_label: "Portainer and Traefik 2 (Docker Swarm Stack)"
title: "Portainer and Traefik 2 (Docker Swarm Stack)"
sidebar_position: 1
---


This section provides guidance on setting Woofed CRM Community Easy install self-hosted edition with Portainer and Traefik 2.


## Stack

Update `# Update` for your configuration.

```bash
# Woofed CRM easy install

version: "3.7"

services:
  woofedcrm:
    image: douglara/woofedcrm:easy-install-latest
    volumes:
      - woofedcrm_data:/app/storage
    networks:
      - traefik_public # Update for you traefik network
    environment:
      - FRONTEND_URL=https://easy.woofedcrm.com # Update for you external url
    deploy:
      mode: replicated
      replicas: 1
      placement:
        constraints:
          - node.role == manager
    labels:
      - traefik.enable=true
      - traefik.http.routers.woofedcrm.rule=Host(`easy.woofedcrm.com`) # Update for you external url
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
  traefik_public: # Update for you traefik network
    external: true
    name: traefik_public # Update for you traefik network

```
