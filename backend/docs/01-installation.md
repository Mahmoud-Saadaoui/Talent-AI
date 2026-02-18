# 📦 Installation & Configuration

Guide d'installation complet pour le backend Talent AI.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** 18.x ou supérieur ([télécharger](https://nodejs.org/))
- **PostgreSQL** 14.x ou supérieur ([télécharger](https://www.postgresql.org/download/))
- **Git** (pour cloner le projet)
- **Un IDE** (VS Code, IntelliJ IDEA, etc.)

---

## 1. Cloner le projet

```bash
git clone <url-du-repo>
cd backend
```

---

## 2. Installer les dépendances

```bash
npm install
```

### Dépendances principales

| Package              | Usage                     |
| -------------------- | ------------------------- |
| `express`            | Framework web             |
| `pg`                 | Client PostgreSQL         |
| `dotenv`             | Variables d'environnement |
| `cors`               | Gestion CORS              |
| `helmet`             | Headers HTTP sécurisés    |
| `express-rate-limit` | Rate limiting             |

### Dépendances de développement

| Package      | Usage               |
| ------------ | ------------------- |
| `typescript` | Compilateur TS      |
| `tsx`        | Exécution TS en dev |
| `@types/*`   | Types TypeScript    |

---

## 3. Configuration des variables d'environnement

Créer le fichier `.env` à la racine du projet :

```bash
# Option 1 : Copier l'exemple (si disponible)
cp .env.example .env

# Option 2 : Créer manuellement
```

### Contenu du fichier `.env`

```env
# ========================================
# Configuration serveur
# ========================================
PORT=3000
NODE_ENV=development

# URL du frontend (pour le CORS)
CLIENT_URL=http://localhost:5173

# ========================================
# Configuration PostgreSQL
# ========================================
DB_USER=postgres
DB_HOST=localhost
DB_NAME=talent_ai_db
DB_PASSWORD=votre_mot_de_passe
DB_PORT=5432
```

### Variables expliquées

| Variable      | Description                       | Exemple                             |
| ------------- | --------------------------------- | ----------------------------------- |
| `PORT`        | Port d'écoute du serveur          | `3000`                              |
| `NODE_ENV`    | Environnement                     | `development`, `production`, `test` |
| `CLIENT_URL`  | URL du frontend autorisé par CORS | `http://localhost:5173`             |
| `DB_USER`     | Utilisateur PostgreSQL            | `postgres`                          |
| `DB_HOST`     | Hôte de la base                   | `localhost`                         |
| `DB_NAME`     | Nom de la base de données         | `talent_ai_db`                      |
| `DB_PASSWORD` | Mot de passe PostgreSQL           | `*****`                             |
| `DB_PORT`     | Port PostgreSQL                   | `5432`                              |

---

## 4. Configuration de la base de données

### Méthode 1 : Via scripts npm (recommandé)

```bash
# Créer la base de données
npm run db:init

# Créer les tables
npm run db:schema
```

### Méthode 2 : Via votre IDE (DataGrip, pgAdmin, etc.)

1. **Exécuter `create_db.sql`** pour créer la base de données
2. **Exécuter `create_tables.sql`** pour créer les tables

Les fichiers sont situés dans `src/config/`.

⚠️ **Note :** Après chaque modification des tables de la base de données, vous devez réexécuter :

```bash
npm run db:schema
```

### Vérifier la connexion

```bash
# Lancer le serveur
npm run backend

# Vous devriez voir :
# ✓ Serveur lancé sur le port 3000
# ✓ Base de données connectée
```

---

## 5. Lancer le serveur

### Mode développement

```bash
npm run backend
```

Le serveur se relancera automatiquement à chaque modification.

### Mode production

```bash
# Compiler le projet
npm run build

# Lancer le serveur
npm start
```

---

## 6. Vérifier l'installation

### Test de santé

```bash
curl http://localhost:3000/api/health
```

**Réponse attendue :**

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

## 🔧 Dépannage

### Erreur "Connection refused"

- Vérifiez que PostgreSQL est démarré
- Vérifiez les identifiants dans `.env`
- Vérifiez que le port 5432 est disponible

### Erreur "Database does not exist"

- Lancez `npm run db:init` pour créer la base

### Erreur "Permission denied"

- Vérifiez que l'utilisateur PostgreSQL a les droits nécessaires

---

**Prochaine étape : [Comprendre l'architecture](./02-architecture.md)**
