---
sidebar_label: "Bucket S3"
title: "Configurando um Bucket S3 como armazenamento no Woofed CRM"
sidebar_position: 2
---

### Usando o Amazon S3

Você pode começar criando um [Bucket S3](https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html) e [Criando um usuário IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) para configurar os seguintes detalhes.

Configure as variáveis de ambiente a seguir.

```bash
ACTIVE_STORAGE_SERVICE='amazon'
S3_BUCKET_NAME=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
```

### Adicione a configuração CORS nos seus buckets S3

Você precisa configurar as configurações CORS.

Consulte este link para mais informações: Active Storage CORS

Para fazer alterações na configuração CORS no S3:

1. Acesse seu bucket S3
2. Clique na guia "Permissions" (Permissões).
3. Role até "Cross-origin resource sharing (CORS)" e clique em Edit (Editar) e adicione as alterações mostradas abaixo.


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
