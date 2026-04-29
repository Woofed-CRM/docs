---
sidebar_label: "Authentication"
title: "Authentication"
sidebar_position: 3
---

# Authentication

The Woofed CRM API authenticates every request with a **JWT Bearer Token**. There is a single token type — there are no separate "publishable" or "secret" keys, and no OAuth flow.

## How it works

1. You retrieve a JWT token from the admin panel — see the [**Get Token**](./GeToken) guide.
2. You include that token in the `Authorization` header of every API request:

```http
Authorization: Bearer YOUR_TOKEN_HERE
```

3. The token identifies **the user** the call is acting as, which means **all permissions, audit logs and ownership rules behave exactly as if that user had performed the action from the UI**.

:::caution The token is a credential
A Woofed CRM token can read and modify all data the user it belongs to can see. Treat it like a password.
:::

## Sending the token

The header is the same regardless of the language or HTTP client you use.

### curl

```bash
curl -X GET "https://app.woofedcrm.com/api/v1/accounts/1/contacts/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### JavaScript / fetch

```javascript
const res = await fetch(
  "https://app.woofedcrm.com/api/v1/accounts/1/contacts/1",
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.WOOFED_TOKEN}`,
    },
  }
);
```

### Node.js / axios

```javascript
import axios from "axios";

const woofed = axios.create({
  baseURL: "https://app.woofedcrm.com/api/v1/accounts/1",
  headers: {
    Authorization: `Bearer ${process.env.WOOFED_TOKEN}`,
    "Content-Type": "application/json",
  },
});

const { data } = await woofed.get("/contacts/1");
```

### Python / requests

```python
import os
import requests

headers = {
    "Authorization": f"Bearer {os.environ['WOOFED_TOKEN']}",
    "Content-Type": "application/json",
}

r = requests.get(
    "https://app.woofedcrm.com/api/v1/accounts/1/contacts/1",
    headers=headers,
)
r.raise_for_status()
print(r.json())
```

### Ruby / Net::HTTP

```ruby
require "net/http"
require "json"

uri = URI("https://app.woofedcrm.com/api/v1/accounts/1/contacts/1")
req = Net::HTTP::Get.new(uri)
req["Authorization"] = "Bearer #{ENV['WOOFED_TOKEN']}"
req["Content-Type"]  = "application/json"

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
puts JSON.parse(res.body)
```

## Common authentication errors

| Status | Meaning | What to check |
| --- | --- | --- |
| `401 Unauthorized` | Missing, malformed or expired token | The header is exactly `Authorization: Bearer <token>` (mind the space, no quotes around the token, no leading/trailing whitespace). |
| `403 Forbidden` | Token is valid, but the user does not have access to that resource | The user owning the token belongs to the right account and has permission for the resource. |
| `404 Not Found` | Wrong `account_id` in the URL, or the record doesn't exist in that account | The token belongs to a user of the same account that appears in the URL. |

## Security best practices

Following these rules will save you from the most common token leaks.

- **Never embed a token in client‑side code.** Browsers, mobile apps and any code that ships to a user's device must call your **own backend**, which then calls Woofed CRM with the token kept on the server.
- **Never commit tokens to git.** Use environment variables (`.env` files outside of version control, secret managers, CI/CD secrets, …).
- **One token per integration.** If a token is leaked, you can rotate just that integration without disrupting the others.
- **Rotate tokens on offboarding.** A token tied to an employee should be regenerated when that person leaves the company.
- **Always use HTTPS.** The API only accepts TLS connections — but you should also enforce HTTPS on any service that proxies the calls.
- **Server‑to‑server only.** Avoid sending the token to any third party (chatbots, no‑code platforms, …) you do not fully trust.

:::tip Storing the token
Common patterns:
- **Backend application** — a `WOOFED_TOKEN` environment variable injected by your runtime (Heroku, Render, Fly, Kubernetes secret, …).
- **n8n / Make / Zapier** — store it in the platform's "credentials" store, never in plain text inside a step.
- **Local script** — a `.env` file added to `.gitignore` and loaded with a library like `dotenv`.
:::

## Next step

You are ready to call any endpoint. Head over to the [**API structure**](./api-structure) page to learn about response formats and error handling, or jump straight to the [**Endpoints reference**](./endpoints/contacts).
