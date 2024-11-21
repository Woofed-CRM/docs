---
sidebar_label: "Unterstützte Anbieter"
title: "Cloud-Speicher konfigurieren"
sidebar_position: 1
---

### Verwendung von Amazon S3

Sie können beginnen mit dem [Erstellen eines S3-Buckets](https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html) und [Erstellen eines IAM-Benutzers](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html), um die folgenden Details zu konfigurieren.

Konfigurieren Sie die folgenden Umgebungsvariablen.

```bash
ACTIVE_STORAGE_SERVICE=amazon
S3_BUCKET_NAME=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
```


### Verwendung von Google GCS

**Hinweis**: Ab Version 2.17+ müssen die Umgebungsvariablen GCS_CREDENTIALS in einfache Anführungszeichen gesetzt werden.

Konfigurieren Sie die folgenden Umgebungsvariablen.

```bash
ACTIVE_STORAGE_SERVICE=google
GCS_PROJECT=
GCS_CREDENTIALS=
GCS_BUCKET=
```

Der Wert von `GCS_CREDENTIALS` sollte eine im JSON-Format formatierte Zeichenkette sein, die die folgenden Schlüssel enthält.

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

Wenn Sie die Anmeldeinformationen in die ENV-Datei einfügen, stellen Sie sicher, dass Sie die Zeilenumbrüche entfernen und sie in einer einzigen Zeile einfügen.

```
GCS_CREDENTIALS={"type": "service_account","project_id": "","private_key_id": "","private_key": "","client_email": "","client_id": "","auth_uri": "","token_uri": "","auth_provider_x509_cert_url": "","client_x509_cert_url": ""}
```

### Verwendung von Microsoft Azure

Konfigurieren Sie die folgenden Umgebungsvariablen.

```bash
ACTIVE_STORAGE_SERVICE=microsoft
AZURE_STORAGE_ACCOUNT_NAME=
AZURE_STORAGE_ACCESS_KEY=
AZURE_STORAGE_CONTAINER=
```

### Verwendung eines Amazon S3-kompatiblen Dienstes

Um einen S3-kompatiblen Dienst wie [DigitalOcean Spaces](https://www.digitalocean.com/docs/spaces/resources/s3-sdk-examples/#configure-a-client), Minio etc..

Konfigurieren Sie die folgenden Umgebungsvariablen.

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
