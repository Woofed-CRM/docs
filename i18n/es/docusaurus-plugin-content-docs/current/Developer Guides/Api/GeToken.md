---
sidebar_label: "Obtener Token"
title: "Obtener Token"
sidebar_position: 4
---

# Obtener Token

Cada llamada a la API de Woofed CRM necesita un **JWT Bearer Token**. El token se genera desde la página de detalles del usuario y representa a un usuario específico — toda acción realizada con ese token queda registrada y autorizada como si ese usuario la hubiera ejecutado dentro de la UI.

## Cómo obtener el token

Accede a la página de detalles del usuario en Woofed CRM y copia el token como se muestra a continuación:

![Cómo obtener el token en la página de detalles del usuario](/img/get-token.gif)

Copia ese valor y úsalo como `Bearer <token>` en cada petición — consulta [**Autenticación**](./authentication) para ejemplos.

## Después de tener el token

- Primera llamada rápida: [**Primeros pasos → Tu primera petición**](./getting-started#4-tu-primera-petición)
- Dónde poner la cabecera: [**Autenticación → Enviando el token**](./authentication#enviando-el-token)
- Cómo mantenerlo seguro: [**Autenticación → Mejores prácticas de seguridad**](./authentication#mejores-prácticas-de-seguridad)

:::caution Mantén tu token seguro
El token concede acceso completo a la API en nombre de tu usuario. No lo compartas ni lo subas a repositorios públicos.
:::
