---
sidebar_label: "Proveedores soportados"
title: "Configurar Almacenamiento en la Nube"
sidebar_position: 1
---

### Usando Amazon S3

Puedes comenzar con [Crear un bucket S3](https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html) y [Crear un usuario IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) para configurar los siguientes detalles.

Configura las siguientes variables de entorno.

```bash
ACTIVE_STORAGE_SERVICE=amazon
S3_BUCKET_NAME=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
```

### Usando Google GCS

**Nota**: A partir de la versión 2.17+, envuelve la variable de entorno `GCS_CREDENTIALS` entre comillas simples.

Configura las siguientes variables de entorno.

```bash
ACTIVE_STORAGE_SERVICE=google
GCS_PROJECT=
GCS_CREDENTIALS=
GCS_BUCKET=
```

El valor de GCS_CREDENTIALS debe ser una cadena en formato JSON que contenga las siguientes claves.

```bash
{
  "type": "service_account",
  "project_id" : "",
  "private_key_id" : "",
  "private_key" : "",
  "client_email" : "",
  "client_id" : "",
  "auth_uri" : "",
  "token_uri" : "",
  "auth_provider_x509_cert_url" : "",
  "client_x509_cert_url" : ""
}
```

Al pegar las credenciales en el archivo ENV, asegúrate de eliminar las nuevas líneas y pegarlas en una sola línea.

```
GCS_CREDENTIALS={"type": "service_account","project_id": "","private_key_id": "","private_key": "","client_email": "","client_id": "","auth_uri": "","token_uri": "","auth_provider_x509_cert_url": "","client_x509_cert_url": ""}
```

### Usando Microsoft Azure

Configura las siguientes variables de entorno.

```bash
ACTIVE_STORAGE_SERVICE=microsoft
AZURE_STORAGE_ACCOUNT_NAME=
AZURE_STORAGE_ACCESS_KEY=
AZURE_STORAGE_CONTAINER=
```


### Usando un servicio compatible con Amazon S3

Para usar un servicio compatible con S3 como [DigitalOcean Spaces](https://www.digitalocean.com/docs/spaces/resources/s3-sdk-examples/#configure-a-client), Minio etc..

Configura las siguientes variables de entorno.

```bash
ACTIVE_STORAGE_SERVICE=s3_compatible
STORAGE_BUCKET_NAME=
STORAGE_ACCESS_KEY_ID=
STORAGE_SECRET_ACCESS_KEY=
STORAGE_REGION=nyc3
STORAGE_ENDPOINT=https://nyc3.digitaloceanspaces.com
#set force_path_style to true if using minio
#STORAGE_FORCE_PATH_STYLE=true
```
