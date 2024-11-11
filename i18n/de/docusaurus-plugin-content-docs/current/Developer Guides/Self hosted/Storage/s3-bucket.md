---
sidebar_label: "S3 Bucket"
title: "S3 Bucket als Speicher in Woofed CRM konfigurieren"
sidebar_position: 2
---

### Verwendung von Amazon S3

Sie können beginnen mit dem [Erstellen eines S3 Buckets](https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html) und [Erstellen eines IAM-Benutzers](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html), um die folgenden Details zu konfigurieren.

Konfigurieren Sie die folgenden Umgebungsvariablen.

```bash
ACTIVE_STORAGE_SERVICE='amazon'
S3_BUCKET_NAME=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
```

**Fügen Sie CORS-Konfigurationen für Ihre S3-Buckets hinzu**

Sie müssen die CORS-Einstellungen konfigurieren.

Weitere Informationen finden Sie unter diesem Link: https://edgeguides.rubyonrails.org/active_storage_overview.html#cross-origin-resource-sharing-cors-configuration

Um CORS-Konfigurationsänderungen auf S3 vorzunehmen:

1. Gehen Sie zu Ihrem S3-Bucket.
2. Klicken Sie auf den Tab "Berechtigungen".
3. Scrollen Sie zu "Cross-origin resource sharing (CORS)" und klicken Sie auf Bearbeiten und fügen Sie die jeweiligen Änderungen wie unten gezeigt hinzu.

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
