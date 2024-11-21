---
sidebar_label: "Provedores Suportados"
title: "Configurar Armazenamento em Nuvem"
sidebar_position: 1
---

### Usando o Amazon S3

Você pode começar criando um [Bucket S3](https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html) e [Criando um usuário IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) para configurar os seguintes detalhes.

Configure as variáveis de ambiente a seguir.

```bash
ACTIVE_STORAGE_SERVICE=amazon
S3_BUCKET_NAME=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
```

### Usando o Google GCS

**Nota**: A partir da versão 2.17+, envolva a variável de ambiente GCS_CREDENTIALS com aspas simples.

Configure as variáveis de ambiente a seguir.

```bash
ACTIVE_STORAGE_SERVICE=google
GCS_PROJECT=
GCS_CREDENTIALS=
GCS_BUCKET=
```

O valor de GCS_CREDENTIALS deve ser uma string JSON contendo as seguintes chaves.

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

Ao colar as credenciais no arquivo ENV, certifique-se de remover as quebras de linha e colar em uma única linha.

```
GCS_CREDENTIALS={"type": "service_account","project_id": "","private_key_id": "","private_key": "","client_email": "","client_id": "","auth_uri": "","token_uri": "","auth_provider_x509_cert_url": "","client_x509_cert_url": ""}
```

### Usando o Microsoft Azure

Configure as variáveis de ambiente a seguir.

```bash
ACTIVE_STORAGE_SERVICE=microsoft
AZURE_STORAGE_ACCOUNT_NAME=
AZURE_STORAGE_ACCESS_KEY=
AZURE_STORAGE_CONTAINER=
```


### Usando um Serviço Compatível com S3

Para usar um serviço compatível com S3, como [DigitalOcean Spaces](https://www.digitalocean.com/docs/spaces/resources/s3-sdk-examples/#configure-a-client), Minio, etc.

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
