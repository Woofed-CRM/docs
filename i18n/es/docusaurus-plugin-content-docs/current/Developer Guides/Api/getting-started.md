---
sidebar_label: "Primeros pasos"
title: "Primeros pasos"
sidebar_position: 2
---

# Primeros pasos

Esta página te lleva de cero a tu primera llamada exitosa a la API en menos de cinco minutos.

## 1. URL base

Todas las peticiones se envían al cloud de Woofed CRM (o a tu instancia self-hosted):

```
https://app.woofedcrm.com
```

Si estás haciendo **self-hosting** de Woofed CRM, reemplaza este host por tu propio dominio (p. ej. `https://crm.tuempresa.com`). La estructura del path (`/api/v1/accounts/{account_id}/...`) es idéntica en ambos casos.

## 2. ID de la cuenta

Cada endpoint está acotado a una cuenta, por lo que la URL siempre contiene tu account ID:

```
/api/v1/accounts/{account_id}/<resource>
```

Puedes encontrar tu `account_id` en la URL del dashboard de Woofed CRM, justo después de `/app/`. En la mayoría de las instalaciones, la primera cuenta es `1`.

## 3. Autenticación, en una línea

Cada petición debe llevar un Bearer Token en la cabecera `Authorization`:

```http
Authorization: Bearer TU_TOKEN_AQUÍ
```

Si aún no tienes un token, sigue primero la breve guía [**Obtener Token**](./GeToken). Los detalles completos de seguridad están en [**Autenticación**](./authentication).

## 4. Tu primera petición

Vamos a obtener un único contacto (asumiendo que existe un contacto con id `1` en la cuenta `1`):

```bash
curl -X GET "https://app.woofedcrm.com/api/v1/accounts/1/contacts/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUÍ"
```

La misma llamada en JavaScript:

```javascript
const res = await fetch(
  "https://app.woofedcrm.com/api/v1/accounts/1/contacts/1",
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer TU_TOKEN_AQUÍ",
    },
  }
);

const contact = await res.json();
console.log(contact);
```

Una respuesta exitosa es JSON puro describiendo el contacto:

```json
{
  "id": 1,
  "full_name": "Tim Maia",
  "phone": "+5541996910256",
  "email": "tim@maia.com",
  "custom_attributes": {
    "city": "RJ"
  },
  "label_list": ["label1", "label2"],
  "created_at": "2025-01-12T18:21:03Z",
  "updated_at": "2025-01-12T18:21:03Z"
}
```

Listo — ya estás hablando con Woofed CRM.

## 5. Herramientas recomendadas

Mientras desarrollas, las siguientes herramientas ahorran mucho tiempo:

- **[Postman](https://www.postman.com/)** — la [colección oficial de Woofed CRM en Postman](https://www.postman.com/dark-shuttle-5185/workspace/woofed-crm-api/collection/905262-e0bb0d71-a634-4fa2-8b03-4ae4c6dde690) viene con todos los endpoints preconfigurados. Solo necesitas definir las variables de colección `endpoint`, `account_id` y `token`.
- **`curl`** — perfecto para scripting, debugging y para pegar en esta documentación.
- **HTTPie** — sintaxis más amigable que curl: `http GET https://app.woofedcrm.com/... "Authorization: Bearer …"`.
- **Browser DevTools** — la pestaña **Network** muestra exactamente qué está enviando tu frontend si estás integrando desde una SPA.

## 6. Anatomía de una respuesta

La mayoría de las respuestas siguen la misma estructura general:

```json
{
  "id": 42,
  "name": "Lead site: Rubel",
  "status": "open",
  "stage_id": 1,
  "contact_id": 1,
  "custom_attributes": { "source": "Website" },
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

Puntos clave:

- **`id`** — todo registro tiene un ID numérico, acotado por cuenta. Úsalo para referirte al registro en peticiones siguientes (`GET /deals/42`, `PUT /deals/42`, …).
- **Timestamps** — `created_at` y `updated_at` están en formato ISO 8601, en UTC.
- **`custom_attributes`** — un objeto JSON libre. Úsalo para campos que no existen como columnas nativas (`source`, `cpf`, `priority`, …).
- **HTTP status code** — `2xx` para éxito, `4xx` para errores del cliente, `5xx` para errores del servidor. La lista completa está en [Estructura de la API → Status codes](./api-structure#status-codes).

## ¿Qué sigue?

Ya tienes todo lo necesario para que cualquier llamada de esta documentación funcione. Continúa con:

- [**Autenticación**](./authentication) para mejores prácticas de seguridad.
- [**Estructura de la API**](./api-structure) para status codes, manejo de errores y la sintaxis de búsqueda.
- [**Endpoints**](./endpoints/contacts) para la referencia completa.
