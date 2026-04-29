---
sidebar_label: "Obtener Token"
title: "Obtener Token"
sidebar_position: 4
---

# Obtener Token

Cada llamada a la API de Woofed CRM necesita un **JWT Bearer Token**. El token se genera desde el panel de administración y representa a un usuario específico — toda acción realizada con ese token queda registrada y autorizada como si ese usuario la hubiera ejecutado dentro de la UI.

## Paso a paso

1. Ingresa a Woofed CRM con un **usuario admin**.
2. Abre el panel de administración:

   ```
   https://<tu-subdominio>/motor_admin
   ```

   En el cloud de Woofed CRM, normalmente es `https://app.woofedcrm.com/motor_admin`. En una instalación self-hosted, reemplaza el host por el tuyo.

3. Haz clic en **`*` (Configuración)** en la parte superior del panel.
4. Abre la sección **Usuarios**.
5. Haz clic en **Agregar Columna** y completa:
   - **Nombre:** `get_jwt_token`
   - **Tipo:** `Solo lectura` (ReadOnly)
6. Guarda la columna. La nueva columna aparecerá en la grilla de usuarios; el valor de esa celda, en la fila del usuario que quieres autenticar, **es tu token**.

Copia ese valor y úsalo como `Bearer <token>` en cada petición — consulta [**Autenticación**](./authentication) para ejemplos.

## Después de tener el token

- Primera llamada rápida: [**Primeros pasos → Tu primera petición**](./getting-started#4-tu-primera-petición)
- Dónde poner la cabecera: [**Autenticación → Enviando el token**](./authentication#enviando-el-token)
- Cómo mantenerlo seguro: [**Autenticación → Mejores prácticas de seguridad**](./authentication#mejores-prácticas-de-seguridad)

:::caution No compartas esta columna con usuarios no admin
La columna `get_jwt_token` muestra tokens de acceso completos. Asegúrate de que solo usuarios admin de confianza puedan ver la grilla de Usuarios en el panel de administración.
:::
