---
sidebar_label: "Introducción"
title: "Introducción a la API"
sidebar_position: 1
---

# API de Woofed CRM

Bienvenido a la **API REST de Woofed CRM**. La API expone los mismos recursos que usas dentro del producto — contactos, negocios, eventos de negocios, productos, usuarios y asignados — para que puedas conectar Woofed CRM a cualquier sistema que hable HTTP.

## ¿Qué es la API de Woofed CRM?

La API de Woofed CRM es una **API HTTP/JSON, en estilo REST**. Cada recurso tiene una URL estable, cada acción se realiza con un verbo HTTP estándar (`GET`, `POST`, `PUT`, `DELETE`), y todo payload — tanto de entrada como de salida — es **JSON**.

Si has trabajado con APIs como Stripe, Twilio o GitHub, te sentirás como en casa: las convenciones son las mismas.

## Qué puedes hacer con ella

- **Sincronizar tu base de contactos** entre Woofed CRM y tu sitio web, landing page, plataformas de anuncios o herramienta de marketing automation.
- **Crear y actualizar negocios** automáticamente cuando un lead convierte en otro sistema (un Typeform, un checkout, una llamada telefónica, etc.).
- **Agregar notas, actividades y mensajes** al timeline del negocio (incluyendo mensajes de WhatsApp programados vía Evolution API y conversaciones de Chatwoot).
- **Gestionar tu catálogo de productos** y adjuntar productos a negocios para calcular el valor del negocio automáticamente.
- **Asignar negocios a usuarios** programáticamente — perfecto para distribución round-robin de leads, asignación automática de SDR o rebalanceo cuando un usuario sale.
- **Buscar cualquier recurso** con predicados ricos al estilo Ransack (`*_eq`, `*_cont`, `*_gteq`, …) para construir dashboards, exportaciones y auditorías sin tener que scrapear la UI.

## Casos de uso comunes

| Escenario | Qué llamarías |
| --- | --- |
| Nuevo lead desde tu sitio | `POST /contacts` seguido de `POST /deals` |
| Sincronización nocturna CRM ↔ ERP | `POST /contacts/upsert`, `POST /deals/upsert` |
| Construir una vista “mis negocios de hoy” | `POST /deals/.../events` + `POST /contacts/search` |
| Programar un follow-up por WhatsApp | `POST /deals/{id}/events` con `kind: evolution_api_message` |
| Distribución round-robin | `POST /deal_assignees` |

## Conceptos que deberías conocer

Aunque esta documentación no asume gran experiencia con APIs, tres ideas aparecen en todas partes:

- **REST** — cada entidad (contacto, negocio, …) vive en una URL predecible, y el verbo HTTP le indica al servidor qué hacer con ella.
- **JSON** — tanto los cuerpos de las peticiones como las respuestas son JSON puro. Envía siempre la cabecera `Content-Type: application/json` cuando tengas un cuerpo.
- **Autenticación con Bearer Token** — cada llamada debe llevar un JWT en la cabecera `Authorization`. No hay API keys, ni URLs firmadas, ni flujo OAuth: solo un token.

Si alguno de estos términos es nuevo, la guía [Primeros pasos](./getting-started) te lleva por la primera llamada paso a paso.

## Cómo está organizada esta sección

1. [**Primeros pasos**](./getting-started) — URL base, tu primera petición y la anatomía de la respuesta.
2. [**Autenticación**](./authentication) — cómo enviar el Bearer Token y mejores prácticas de seguridad.
3. [**Obtener Token**](./GeToken) — cómo recuperar tu JWT desde el panel de administración.
4. [**Estructura de la API**](./api-structure) — formato de request/response, status codes, manejo de errores y predicados de búsqueda.
5. [**Endpoints**](./endpoints/contacts) — una página por recurso, con cada parámetro documentado y ejemplos listos para copiar y pegar.

:::tip Colección de Postman
La colección completa de Postman, usada como fuente de verdad para esta documentación, está disponible aquí:
[API de Woofed CRM — Workspace de Postman](https://www.postman.com/dark-shuttle-5185/workspace/woofed-crm-api/collection/905262-e0bb0d71-a634-4fa2-8b03-4ae4c6dde690)
:::
