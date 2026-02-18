# 🌐 API Endpoints

Routes et endpoints disponibles de l'API.

## Base URL

```
http://localhost:3000/api
```

---

## Format de réponse

Toutes les réponses suivent ce format :

### Succès

```json
{
  "status": "success",
  "message": "Message optionnel",
  "data": { ... },
  "timestamp": "2026-02-12T10:30:00.000Z"
}
```

### Erreur

```json
{
  "status": "error",
  "message": "Message d'erreur détaillé",
  "statusCode": 400
}
```

---

## Endpoints disponibles

### Health Check

Vérifie l'état de santé du serveur.

```http
GET /api/health
```

**Réponse :**

```json
{
  "status": "success",
  "message": "Serveur opérationnel",
  "data": {
    "uptime": 12.5,
    "timestamp": "2026-02-12T10:30:00.000Z"
  }
}
```

---

## Endpoints Users (à venir)

### Liste des utilisateurs

```http
GET /api/users?page=1&limit=10&sortBy=id&sortOrder=asc
```

**Query Params :**

| Param | Type | Défaut | Description |
|-------|------|--------|-------------|
| `page` | number | 1 | Numéro de page |
| `limit` | number | 10 | Éléments par page |
| `sortBy` | string | id | Champ de tri |
| `sortOrder` | string | asc | `asc` ou `desc` |

**Réponse :**

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "nom": "John Doe",
      "email": "john@example.com",
      "created_at": "2026-02-12T10:00:00.000Z",
      "updated_at": "2026-02-12T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

---

### Obtenir un utilisateur

```http
GET /api/users/:id
```

**Réponse :**

```json
{
  "status": "success",
  "data": {
    "id": 1,
    "nom": "John Doe",
    "email": "john@example.com",
    "created_at": "2026-02-12T10:00:00.000Z",
    "updated_at": "2026-02-12T10:00:00.000Z"
  }
}
```

---

### Créer un utilisateur

```http
POST /api/users
Content-Type: application/json

{
  "nom": "John Doe",
  "email": "john@example.com"
}
```

**Réponse (201) :**

```json
{
  "status": "success",
  "message": "Utilisateur créé",
  "data": {
    "id": 1,
    "nom": "John Doe",
    "email": "john@example.com",
    "created_at": "2026-02-12T10:00:00.000Z",
    "updated_at": "2026-02-12T10:00:00.000Z"
  }
}
```

---

### Mettre à jour un utilisateur

```http
PUT /api/users/:id
Content-Type: application/json

{
  "nom": "Jane Doe",
  "email": "jane@example.com"
}
```

**Réponse :**

```json
{
  "status": "success",
  "message": "Utilisateur mis à jour",
  "data": {
    "id": 1,
    "nom": "Jane Doe",
    "email": "jane@example.com",
    "created_at": "2026-02-12T10:00:00.000Z",
    "updated_at": "2026-02-12T10:30:00.000Z"
  }
}
```

---

### Supprimer un utilisateur

```http
DELETE /api/users/:id
```

**Réponse (204) :**

```
(no content)
```

---

## Codes HTTP

| Code | Signification |
|------|---------------|
| 200 | Succès |
| 201 | Créé |
| 204 | Pas de contenu (suppression) |
| 400 | Requête invalide |
| 404 | Non trouvé |
| 500 | Erreur serveur |

---

## Tester l'API

### Avec cURL

```bash
# Health check
curl http://localhost:3000/api/health

# Créer un utilisateur
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"nom":"John Doe","email":"john@example.com"}'
```

### avec un client HTTP

- **Postman** : [https://www.postman.com/](https://www.postman.com/)
- **Insomnia** : [https://insomnia.rest/](https://insomnia.rest/)
- **Bruno** : [https://www.usebruno.com/](https://www.usebruno.com/)

---

**Prochaine étape : [Développement](./05-development.md)**
