---
sidebar_label: "Autenticación"
title: "Autenticación"
sidebar_position: 3
---

# Autenticación

La API de Woofed CRM autentica cada petición con un **JWT Bearer Token**. Existe un único tipo de token — no hay claves "publicables" o "secretas" separadas, ni flujo OAuth.

## Cómo funciona

1. Obtienes un token JWT desde el panel de administración — consulta la guía [**Obtener Token**](./GeToken).
2. Incluyes ese token en la cabecera `Authorization` de cada petición de la API:

```http
Authorization: Bearer TU_TOKEN_AQUÍ
```

3. El token identifica **al usuario** en cuyo nombre se realiza la llamada, lo que significa que **todos los permisos, logs de auditoría y reglas de propiedad se comportan exactamente como si ese usuario hubiera realizado la acción desde la UI**.

:::caution El token es una credencial
Un token de Woofed CRM puede leer y modificar todos los datos a los que el usuario al que pertenece tiene acceso. Trátalo como una contraseña.
:::

## Enviando el token

La cabecera es la misma sin importar el lenguaje o el cliente HTTP que uses.

### curl

```bash
curl -X GET "https://app.woofedcrm.com/api/v1/accounts/1/contacts/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUÍ"
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

## Errores comunes de autenticación

| Status | Significado | Qué revisar |
| --- | --- | --- |
| `401 Unauthorized` | Token ausente, mal formateado o expirado | La cabecera está exactamente como `Authorization: Bearer <token>` (cuidado con el espacio, sin comillas alrededor del token, sin espacios al inicio o al final). |
| `403 Forbidden` | Token válido, pero el usuario no tiene acceso al recurso | El usuario dueño del token pertenece a la cuenta correcta y tiene permiso sobre el recurso. |
| `404 Not Found` | `account_id` incorrecto en la URL, o el registro no existe en esa cuenta | El token pertenece a un usuario de la misma cuenta que aparece en la URL. |

## Mejores prácticas de seguridad

Seguir estas reglas te protege de las fugas de token más comunes.

- **Nunca incrustes un token en código del lado cliente.** Navegadores, apps móviles y cualquier código que se entregue al dispositivo del usuario deben llamar a **tu propio backend**, que luego llama a Woofed CRM con el token guardado en el servidor.
- **Nunca commitees tokens en git.** Usa variables de entorno (archivos `.env` fuera del control de versiones, gestores de secretos, secretos de CI/CD, …).
- **Un token por integración.** Si un token se filtra, puedes rotar solo esa integración sin afectar a las demás.
- **Rota los tokens en offboarding.** Un token vinculado a un colaborador debe regenerarse cuando esa persona deja la empresa.
- **Usa siempre HTTPS.** La API solo acepta conexiones TLS — pero también deberías forzar HTTPS en cualquier servicio que haga proxy de las llamadas.
- **Solo server-to-server.** Evita enviar el token a cualquier tercero (chatbots, plataformas no-code, …) en el que no confíes plenamente.

:::tip Almacenando el token
Patrones comunes:
- **Aplicación backend** — una variable de entorno `WOOFED_TOKEN` inyectada por tu runtime (Heroku, Render, Fly, secret de Kubernetes, …).
- **n8n / Make / Zapier** — guárdalo en el almacén de "credenciales" de la plataforma, nunca en texto plano dentro de un step.
- **Script local** — un archivo `.env` agregado a `.gitignore` y cargado con una librería como `dotenv`.
:::

## Siguiente paso

Estás listo para llamar a cualquier endpoint. Dirígete a la página de [**Estructura de la API**](./api-structure) para conocer los formatos de respuesta y el manejo de errores, o salta directamente a la [**Referencia de endpoints**](./endpoints/contacts).
