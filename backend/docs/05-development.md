# 💻 Guide de développement

Guide pour contribuer au développement du backend.

## Environnement de développement

### Lancer le serveur

```bash
npm run backend
```

Le serveur utilise `tsx watch` qui recompile automatiquement à chaque modification.

### Vérifier les types

```bash
npm run type-check
```

### Compiler pour production

```bash
npm run build
```

---

## Créer un nouveau module

### Étape 1 : Créer le dossier

```bash
mkdir src/modules/mon_module
```

### Étape 2 : Créer les fichiers

```
src/modules/monmodule/
├── monmodule.controller.ts    # Logique métier
├── monmodule.routes.ts        # Définition des routes
└── types.ts                   # Types spécifiques
```

### Étape 3 : Définir les types

```typescript
// src/modules/monmodule/types.ts

export interface MonItem {
  id: number;
  nom: string;
  created_at: Date;
}

export interface CreateMonItemDto {
  nom: string;
}

export interface UpdateMonItemDto {
  nom?: string;
}
```

### Étape 4 : Créer le controller

```typescript
// src/modules/monmodule/monmodule.controller.ts

import { Request, Response } from 'express';
import pool from '../../config/db.js';
import type { CreateMonItemDto, MonItem } from './types.js';

export const getAll = async (req: Request, res: Response) => {
  const result = await pool.query('SELECT * FROM monitem ORDER BY id');
  res.status(200).json({
    status: 'success',
    data: result.rows
  });
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await pool.query(
    'SELECT * FROM monitem WHERE id = $1',
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({
      status: 'error',
      message: 'Élément non trouvé'
    });
  }

  res.status(200).json({
    status: 'success',
    data: result.rows[0]
  });
};

export const create = async (req: Request, res: Response) => {
  const { nom } = req.body;

  const result = await pool.query(
    'INSERT INTO monitem (nom) VALUES ($1) RETURNING *',
    [nom]
  );

  res.status(201).json({
    status: 'success',
    message: 'Élément créé',
    data: result.rows[0]
  });
};
```

### Étape 5 : Définir les routes

```typescript
// src/modules/monmodule/monmodule.routes.ts

import { Router } from 'express';
import * as controller from './monmodule.controller.js';

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);

export default router;
```

### Étape 6 : Enregistrer les routes dans app.ts

```typescript
// src/app.ts

import monModuleRoutes from './modules/monmodule/monmodule.routes.js';

// ...

app.use('/api/monmodule', monModuleRoutes);
```

---

## Conventions de code

### Imports

Toujours utiliser l'extension `.js` (ES modules) :

```typescript
// ✅ Correct
import pool from '../config/db.js';
import type { User } from './types.js';

// ❌ Incorrect
import pool from '../config/db';
import { User } from './types';
```

### Typage

Toujours typer les requêtes et réponses :

```typescript
// ✅ Correct
export const getById = async (req: Request, res: Response) => {
  // ...
};

// ❌ Incorrect
export const getById = async (req, res) => {
  // ...
};
```

### Format de réponse

Toujours utiliser le format `ApiResponse` :

```typescript
// ✅ Correct
res.status(200).json({
  status: 'success',
  data: result.rows
});

// ❌ Incorrect
res.json(result.rows);
```

---

## Gestion des erreurs

### Erreurs de base de données

```typescript
try {
  const result = await pool.query(/* ... */);
} catch (error) {
  if (error.code === '23505') { // Violation contrainte unique
    return res.status(409).json({
      status: 'error',
      message: 'Cet email existe déjà'
    });
  }

  console.error(error);
  res.status(500).json({
    status: 'error',
    message: 'Erreur serveur'
  });
}
```

### Valider les données

```typescript
const { nom, email } = req.body;

if (!nom || !email) {
  return res.status(400).json({
    status: 'error',
    message: 'Les champs nom et email sont requis'
  });
}

if (email && !email.includes('@')) {
  return res.status(400).json({
    status: 'error',
    message: 'Email invalide'
  });
}
```

---

## Ajouter une table

### 1. Modifier `schema.sql`

```sql
CREATE TABLE IF NOT EXISTS matable (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Exécuter le script

```bash
npm run db:schema
```

### 3. Créer le module correspondant

Voir "Créer un nouveau module" ci-dessus.

---

## Debug

### Logs

```typescript
console.log('Info');     // Information
console.warn('Warning'); // Avertissement
console.error('Error');  // Erreur
```

### VS Code Debugger

Créer `.vscode/launch.json` :

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Server",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "backend"],
      "cwd": "${workspaceFolder}",
      "console": "integratedTerminal"
    }
  ]
}
```

---

**🎉 Vous êtes prêt à développer !**
