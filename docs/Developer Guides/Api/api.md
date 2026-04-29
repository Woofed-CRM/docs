---
sidebar_label: "Introduction"
title: "API Introduction"
sidebar_position: 1
---

# Woofed CRM API

Welcome to the **Woofed CRM REST API**. The API exposes the same primitives you use inside the product — contacts, deals, deal events, products, users and assignees — so you can plug Woofed CRM into any system that speaks HTTP.

## What is the Woofed CRM API?

The Woofed CRM API is an **HTTP/JSON, REST‑style API**. Every resource has a stable URL, every action is performed with a standard HTTP verb (`GET`, `POST`, `PUT`, `DELETE`), and every payload — both in and out — is **JSON**.

If you have ever worked with the Stripe, Twilio or GitHub APIs, you will feel at home: the conventions are the same.

## What you can do with it

- **Sync your contact base** between Woofed CRM and your website, landing page, ad platforms or marketing automation tool.
- **Create and update deals** automatically when a lead converts in another system (a typeform, a checkout, a phone call, etc.).
- **Push notes, activities and messages** into the deal timeline (including scheduled WhatsApp messages via Evolution API and Chatwoot conversations).
- **Manage your product catalog** and attach products to deals to compute deal value automatically.
- **Assign deals to users** programmatically — perfect for round‑robin lead distribution, automatic SDR assignment or rebalancing on user offboarding.
- **Search any resource** with rich, Ransack‑style predicates (`*_eq`, `*_cont`, `*_gteq`, …) so you can build dashboards, exports and audits without scraping the UI.

## Common use cases

| Scenario | What you would call |
| --- | --- |
| New lead from your website | `POST /contacts` followed by `POST /deals` |
| Nightly CRM ↔ ERP sync | `POST /contacts/upsert`, `POST /deals/upsert` |
| Build a custom “my deals today” view | `POST /deals/.../events` + `POST /contacts/search` |
| Schedule a follow‑up WhatsApp message | `POST /deals/{id}/events` with `kind: evolution_api_message` |
| Round‑robin distribution | `POST /deal_assignees` |

## Concepts you should know

Even though this documentation does not assume deep API expertise, three ideas come up everywhere:

- **REST** — every entity (contact, deal, …) lives at a predictable URL, and the HTTP verb tells the server what to do with it.
- **JSON** — both request bodies and responses are plain JSON. Always send the header `Content-Type: application/json` when you have a body.
- **Bearer Token authentication** — every call must carry a JWT in the `Authorization` header. There are no API keys, no signed URLs and no OAuth dance: just a token.

If any of these terms is new, the [Getting started](./getting-started) guide walks you through the very first call step by step.

## How this section is organised

1. [**Getting started**](./getting-started) — base URL, your first request and response anatomy.
2. [**Authentication**](./authentication) — how to send the Bearer Token and security best practices.
3. [**Get Token**](./GeToken) — how to retrieve your JWT from the admin panel.
4. [**API structure**](./api-structure) — request/response format, status codes, error handling and search predicates.
5. [**Endpoints**](./endpoints/contacts) — one page per resource, with every parameter documented and copy‑pastable examples.

:::tip Postman collection
The full Postman collection used as the source of truth for this documentation is available here:
[Woofed CRM API — Postman workspace](https://www.postman.com/dark-shuttle-5185/workspace/woofed-crm-api/collection/905262-e0bb0d71-a634-4fa2-8b03-4ae4c6dde690)
:::
