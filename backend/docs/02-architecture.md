# 🏗️ Architecture du projet

Comprendre la structure et l'organisation du code.

## Vue d'ensemble

```
backend/
│
├── src/
│   ├── config/              # Configuration de l'application
│   │   ├── db.ts            # Pool de connexions PostgreSQL
│   │   ├── initDb.sql       # Script de création de la BDD
│   │   └── schema.sql       # Script de création des tables
│   │
│   ├── middlewares/         # Middlewares globaux
│   │   └── errorHandler.ts  # Gestionnaire d'erreurs centralisé
│   │
│   ├── modules/             # Modules fonctionnels
│   │   ├── health/          # Module de santé
│   │   │   ├── health.controller.ts
│   │   │   ├── health.routes.ts
│   │   │   └── types.ts
│   │   │
│   │   └── users/           # Module utilisateurs (à créer)
│   │       ├── users.controller.ts
│   │       ├── users.routes.ts
│   │       └── types.ts
│   │
│   ├── types/               # Types globaux partagés
│   │   └── index.ts
│   │
│   ├── app.ts               # Configuration Express
│   └── server.ts            # Point d'entrée
│
├── docs/                    # Documentation
├── .env                     # Variables d'environnement
├── package.json
└── tsconfig.json
```

---

## Organisation modulaire

### Principe

Chaque fonctionnalité est organisée en **module** autonome contenant :

- **Controller** : Logique de traitement des requêtes
- **Routes** : Définition des endpoints
- **Types** : Types TypeScript spécifiques au module

### Structure d'un module

```
users/
├── users.controller.ts    # Logique métier
├── users.routes.ts        # Définition des routes
└── types.ts               # Types spécifiques
```

---

## Fichiers principaux

### `server.ts` - Point d'entrée

```typescript
// Démarrage du serveur Express
import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✓ Serveur lancé sur le port ${PORT}`);
});
```

### `app.ts` - Configuration Express

```typescript
// Configure middlewares globaux, sécurité, routes
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import healthRoutes from './modules/health/health.routes.js';

const app = express();

// Sécurité
app.use(helmet());
app.use(cors());

// Parsing JSON
app.use(express.json());

// Routes
app.use('/api/health', healthRoutes);

// Gestion des erreurs
app.use(errorHandler);

export default app;
```

### `src/config/db.ts` - Connexion BDD

```typescript
// Pool de connexions PostgreSQL
import pg from 'pg';

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export default pool;
```

---

## Types TypeScript

### Types globaux (`src/types/index.ts`)

Types partagés par plusieurs modules :

| Type | Usage |
|------|-------|
| `ApiResponse<T>` | Format de réponse standard |
| `ApiErrorResponse` | Format d'erreur standard |
| `AppConfig` | Configuration de l'app |
| `PaginationParams` | Paramètres de pagination |
| `PaginatedResponse<T>` | Réponse paginée |

### Types locaux (`src/modules/xxx/types.ts`)

Types spécifiques à un module :

```typescript
// Exemple pour le module users
export interface User {
  id: number;
  nom: string;
  email: string;
  created_at: Date;
}

export interface CreateUserDto {
  nom: string;
  email: string;
}
```

---

## Middlewares

### Middleware d'erreur global (`src/middlewares/errorHandler.ts`)

Capture et formate toutes les erreurs de l'application.

### Ajouter un middleware global

```typescript
// src/middlewares/logger.ts
export const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
};

// Dans app.ts
import { logger } from './middlewares/logger.js';
app.use(logger);
```

---

## Bonnes pratiques

### ✅ À faire

- Chaque module est indépendant et réutilisable
- Les types partagés vont dans `src/types/`
- Les types spécifiques vont dans `src/modules/xxx/types.ts`
- Utiliser les extensions `.js` dans les imports (ES modules)

### ❌ À éviter

- Mettre des types spécifiques dans `src/types/`
- Créer des contrôleurs monolithiques
- Oublier de typer les requêtes/réponses

---

**Prochaine étape : [Base de données](./03-database.md)**
