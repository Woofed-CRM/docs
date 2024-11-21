---
sidebar_label: "Portainer und Traefik 2 (Docker Swarm Stack)"
title: "Portainer und Traefik 2 (Docker Swarm Stack)"
sidebar_position: 1
---

Dieser Abschnitt bietet eine Anleitung zur Einrichtung der Woofed CRM Community Easy Install Selbstgehosteten Edition mit Portainer und Traefik 2.

## Stack

Aktualisieren Sie `# Update` für Ihre Konfiguration.

```bash
# Woofed CRM Easy Install

version: "3.7"

services:
  woofedcrm:
    image: douglara/woofedcrm:easy-install-latest
    volumes:
      - woofedcrm_data:/app/storage
    networks:
      - traefik_public # Aktualisieren Sie Ihr Traefik-Netzwerk
    environment:
      - FRONTEND_URL=https://easy.woofedcrm.com # Aktualisieren Sie Ihre externe URL
    deploy:
      mode: replicated
      replicas: 1
      placement:
        constraints:
          - node.role == manager
      labels:
        - traefik.enable=true
        - traefik.http.routers.woofedcrm.rule=Host(`easy.woofedcrm.com`) # Aktualisieren Sie Ihre externe URL
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
  traefik_public: # Aktualisieren Sie Ihr Traefik-Netzwerk
    external: true
    name: traefik_public # Aktualisieren Sie Ihr Traefik-Netzwerk

```
