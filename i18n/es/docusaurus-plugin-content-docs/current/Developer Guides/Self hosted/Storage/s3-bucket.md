---
sidebar_label: "Bucket S3"
title: "Configurar el Bucket S3 como almacenamiento en Woofed CRM"
sidebar_position: 2
---

### Usando Amazon S3

Puedes comenzar con [Crear un bucket S3](https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html) y [Crear un usuario IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) para configurar los siguientes detalles.

Configura las siguientes variables de entorno.

```bash
ACTIVE_STORAGE_SERVICE='amazon'
S3_BUCKET_NAME=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
```

**Agregar configuración CORS en tus buckets S3**

Necesitas configurar los ajustes CORS.

Consulta este enlace para más información: https://edgeguides.rubyonrails.org/active_storage_overview.html#cross-origin-resource-sharing-cors-configuration

Para hacer cambios en la configuración CORS en S3:

1. Ve a tu bucket S3
2. Haz clic en la pestaña de permisos.
3. Desplázate hasta "Cross-origin resource sharing (CORS)" y haz clic en `Editar`, luego agrega los cambios respectivos mostrados abajo.


```
[
  {
    "AllowedHeaders": [
      "*"
    ],
    "AllowedMethods": [
      "PUT",
      "POST",
      "DELETE",
      "GET"
    ],
    "AllowedOrigins": [
      "*"
    ],
    "ExposeHeaders": [
      "Origin",
      "Content-Type",
      "Content-MD5",
      "Content-Disposition"
    ],
    "MaxAgeSeconds": 3600
  }
]
```
