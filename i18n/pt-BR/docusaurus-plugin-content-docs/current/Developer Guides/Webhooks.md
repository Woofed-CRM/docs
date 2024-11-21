# Webhooks

Você pode configurar um webhook para receber todos os eventos que ocorrem no seu CRM.

Exemplos de webhooks:

<details>

<summary>Negócio criado</summary>

```json
{
  "event": "deal_created",
  "data": {
    "id": 1,
    "name": "Negócio com Tom Jobim",
    "status": "open",
    "account_id": 1,
    "stage_id": 1,
    "contact_id": 1,
    "custom_attributes": {},
    "created_at": "2024-04-28T19:36:59.285-03:00",
    "updated_at": "2024-04-28T19:36:59.285-03:00",
    "pipeline_id": 1,
    "position": 1,
    "contact": {
      "id": 1,
      "account_id": 1,
      "full_name": "Tom Jobim",
      "phone": "+5522998813788",
      "email": "tomjobim@eamil.com",
      "custom_attributes": {
        "CPF": "",
        "Cpf": "",
        "cep": "",
        "Cnpj": "",
        "TEste": "",
        "hgfhfgh": "",
        "Endereço de casa": ""
      },
      "additional_attributes": {
        "chatwoot_id": 6646
      },
      "app_type": null,
      "app_id": null,
      "created_at": "2024-04-22T14:39:36.418-03:00",
      "updated_at": "2024-04-25T14:35:33.138-03:00",
      "label_list": [],
      "chatwoot_conversations_label_list": []
    },
    "changed_attributes": [
      {
        "id": {
          "previous_value": null,
          "current_value": 1
        }
      },
      {
        "name": {
          "previous_value": "",
          "current_value": "Negócio com BBBBBBBBBBBBBBBBBBBBB"
        }
      },
      {
        "account_id": {
          "previous_value": null,
          "current_value": 1
        }
      },
      {
        "stage_id": {
          "previous_value": null,
          "current_value": 1
        }
      },
      {
        "contact_id": {
          "previous_value": null,
          "current_value": 1
        }
      },
      {
        "created_at": {
          "previous_value": null,
          "current_value": "2024-04-28T19:36:59.285-03:00"
        }
      },
      {
        "updated_at": {
          "previous_value": null,
          "current_value": "2024-04-28T19:36:59.285-03:00"
        }
      },
      {
        "pipeline_id": {
          "previous_value": null,
          "current_value": 1
        }
      }
    ]
  }
}
```
</details>
