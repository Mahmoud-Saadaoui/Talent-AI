# Base de Données - Guide Complet

## Table des matières
1. [Introduction](#introduction)
2. [Configuration de la base de données](#configuration-de-la-base-de-données)
3. [Structure du schéma Prisma](#structure-du-schéma-prisma)
4. [Modèles de données actuels](#modèles-de-données-actuels)
5. [Ajouter des tables](#ajouter-des-tables)
6. [Modifier des tables](#modifier-des-tables)
7. [Supprimer des tables](#supprimer-des-tables)
8. [Ajouter des colonnes](#ajouter-des-colonnes)
9. [Modifier des colonnes](#modifier-des-colonnes)
10. [Supprimer des colonnes](#supprimer-des-colonnes)
11. [Migrations avec Prisma Migrate](#migrations-avec-prisma-migrate)
12. [Après chaque modification du schéma](#après-chaque-modification-du-schéma)
13. [Prisma Studio](#prisma-studio)
14. [Bonnes pratiques](#bonnes-pratiques)

---

## Introduction

Ce projet utilise **Prisma ORM** comme couche d'accès à la base de données avec **PostgreSQL** comme système de gestion de base de données.

Prisma offre :
- Un **Object-Relational Mapping (ORM)** type-safe
- Des **migrations automatiques** pour gérer les schémas
- Une **API client** intuitive et puissante
- **Prisma Studio** pour explorer et gérer les données visuellement

---

## Configuration de la base de données

### Fichiers de configuration clés

#### 1. `prisma/schema.prisma`
C'est le fichier principal qui définit :
- La connexion à la base de données
- Les modèles de données (tables)
- Les relations entre tables
- Les validations et contraintes

#### 2. `.env` (racine du backend)
Contient les variables d'environnement, notamment :
```
DATABASE_URL=postgresql://user:password@host:port/database?schema=public
```

#### 3. `prisma.config.ts`
Configuration avancée de Prisma :
- Chemin du schéma
- Répertoire des migrations
- Configuration de la URL de la base de données

---

## Structure du schéma Prisma

Le fichier `schema.prisma` a la structure suivante :

```prisma
// Générateur Prisma Client
generator client {
  provider = "prisma-client-js"
}

// Configuration de la source de données
datasource db {
  provider = "postgresql"
}

// Définition des modèles (tables)
model NomModele {
  // Définition des colonnes
}
```

### Expliquer chaque section :

**`generator client`**
- Génère le Prisma Client (la bibliothèque pour interroger la BD)
- `provider = "prisma-client-js"` : client JavaScript/TypeScript

**`datasource db`**
- `provider = "postgresql"` : utilise PostgreSQL
- La connexion effective vient de `DATABASE_URL` dans `.env`

---

## Modèles de données actuels

### Modèle User

```prisma
model User {
  id       Int     @id @default(autoincrement())
  email    String  @unique
  name     String
  password String
}
```

**Explicaiton des colonnes :**

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | `Int` | Identifiant unique, auto-incrémenté |
| `email` | `String` | Email unique de l'utilisateur |
| `name` | `String` | Nom complet de l'utilisateur |
| `password` | `String` | Mot de passe (doit être hashé) |

**Explicaiton des attributs Prisma :**

- `@id` : indique que c'est la clé primaire
- `@default(autoincrement())` : la valeur init augmente automatiquement
- `@unique` : cette valeur doit être unique dans la table

---

## Ajouter des tables

Quand vous voulez ajouter une nouvelle table, vous devez ajouter un modèle au `schema.prisma`.

### Exemple 1 : Ajouter une table `Profile`

**Étape 1 : Modifier `schema.prisma`**

Ajoutez le modèle au fichier. Par exemple, ajouter une relation 1 à 1 avec User :

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
}

model User {
  id       Int      @id @default(autoincrement())
  email    String   @unique
  name     String
  password String
  profile  Profile? // Nouvelle relation : un User peut avoir un Profile
}

// Nouvelle table
model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  avatar String?
  userId Int     @unique // Clé étrangère vers User
  user   User    @relation(fields: [userId], references: [id])
}
```

**Explication des attributs :**
- `Profile?` : un User peut avoir 0 ou 1 Profile (le `?` rend optionnel)
- `@relation(fields: [userId], references: [id])` : définit la relation étrangère

**Étape 2 : [Voir section "Après chaque modification du schéma"](#après-chaque-modification-du-schéma)**

---

### Exemple 2 : Ajouter une table `Post` avec relation plusieurs à plusieurs

```prisma
model User {
  id       Int      @id @default(autoincrement())
  email    String   @unique
  name     String
  password String
  posts    Post[]   // Nouvelle relation : un User peut avoir plusieurs Posts
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  authorId  Int
  author    User    @relation(fields: [authorId], references: [id])
  tags      Tag[]   // Relation plusieurs à plusieurs
}

model Tag {
  id    Int     @id @default(autoincrement())
  name  String  @unique
  posts Post[]  // Relation plusieurs à plusieurs
}
```

---

## Modifier des tables

### Ajouter des colonnes à une table existante

Voir la section [Ajouter des colonnes](#ajouter-des-colonnes).

### Modifier le nom d'une table

Cela requiert une migration manuelle. Utilisez `@map` pour mapper le nom du modèle au nom de la table :

```prisma
model UserAccount {
  id Int @id @default(autoincrement())
  
  @@map("user_accounts") // La table PostgreSQL s'appelle user_accounts
}
```

---

## Supprimer des tables

Pour supprimer une table, vous devez simplement supprimer le modèle du `schema.prisma`.

**Exemple :**

```prisma
// Avant
model Post {
  id    Int     @id @default(autoincrement())
  title String
}

// Après (supprimer le bloc entier)
```

**Puis [voir section "Après chaque modification du schéma"](#après-chaque-modification-du-schéma)**

---

## Ajouter des colonnes

### Ajouter une colonne simple

**Modifiez le modèle dans `schema.prisma` :**

```prisma
model User {
  id       Int      @id @default(autoincrement())
  email    String   @unique
  name     String
  password String
  phone    String?  // Nouvelle colonne optionnelle
}
```

**Attributs utiles :**
- `?` : rend la colonne optionnelle (peut être NULL)
- `@unique` : la valeur doit être unique
- `@default(valeur)` : valeur par défaut

### Exemple : Ajouter plusieurs colonnes

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  password  String
  phone     String?
  createdAt DateTime @default(now())  // Date de création
  updatedAt DateTime @updatedAt       // Mise à jour automatique
  isActive  Boolean  @default(true)   // État actif/inactif
}
```

**Explication des nouveaux attributs :**
- `@default(now())` : défini automatiquement à la date/heure actuelle
- `@updatedAt` : mis à jour automatiquement à chaque modification

---

## Modifier des colonnes

### Ajouter une contrainte NOT NULL

Si une colonne est optionnelle mais vous voulez la rendre obligatoire :

```prisma
// Avant
model User {
  phone String?
}

// Après
model User {
  phone String  // Suppression du ?
}
```

⚠️ **Attention :** Si la table a déjà des lignes avec `phone = NULL`, cela causera une erreur lors de la migration. Vous devez d'abord mettre à jour les valeurs existantes.

### Renommer une colonne

```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String @map("full_name")  // La colonne PostgreSQL s'appelle full_name
}
```

### Ajouter une valeur par défaut

```prisma
model User {
  role String @default("user")  // Par défaut "user"
}
```

---

## Supprimer des colonnes

Pour supprimer une colonne, retirez simplement la ligne du modèle :

```prisma
// Avant
model User {
  id       Int    @id @default(autoincrement())
  email    String @unique
  name     String
  phone    String?  // À supprimer
}

// Après
model User {
  id       Int    @id @default(autoincrement())
  email    String @unique
  name     String
}
```

**Puis [voir section "Après chaque modification du schéma"](#après-chaque-modification-du-schéma)**

---

## Migrations avec Prisma Migrate

Les migrations sont des fichiers SQL qui enregistrent les modifications de votre schéma. Prisma les gère automatiquement.

### Structure des migrations

```
prisma/migrations/
├── migration_lock.toml
├── 20260218084016_init/
│   └── migration.sql
└── 20260218090000_add_post_table/
    └── migration.sql
```

Chaque dossier de migration contient un fichier `migration.sql` qui représente un changement au schéma.

### Exemple de contenu migration.sql

```sql
-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
```

---

## Après chaque modification du schéma

**IMPORTANT :** Après avoir modifié le fichier `schema.prisma` (ajout/suppression/modification), vous DEVEZ suivre ces étapes :

### Étape 1 : Créer la migration

Exécutez dans le terminal du dossier `backend/` :

```bash
npx prisma migrate dev --name description_du_changement
```

**Exemple :**
```bash
npx prisma migrate dev --name add_profile_table
npx prisma migrate dev --name add_phone_to_user
npx prisma migrate dev --name remove_old_posts_table
```

**Ce que cette commande fait :**
1. Détecte les changements dans `schema.prisma`
2. Génère un fichier `migration.sql` automatiquement
3. **Applique la migration à la base de données**
4. Régénère le Prisma Client

### Étape 2 : Régénérer le Prisma Client (si pas fais automatiquement)

```bash
npx prisma generate
```

Cela génère/met à jour les types TypeScript pour accéder à votre base de données.

### Étape 3 : Vérifier les changements

```bash
npx prisma studio
```

Ouvrez Prisma Studio pour vérifier visuellement que vos tables/colonnes ont été créées correctement.

### Étape 4 : Committer la migration

Ajoutez et commitez les fichiers générés :

```bash
# Si vous utilisez Git
git add prisma/migrations/
git add prisma/schema.prisma
git commit -m "Add migration: add_profile_table"
```

---

## Cas pratiques

### Cas 1 : Ajouter une nouvelle table et l'utiliser

**Étape 1 :** Ajouter au `schema.prisma`
```prisma
model JobPost {
  id          Int     @id @default(autoincrement())
  title       String
  description String?
  createdAt   DateTime @default(now())
}
```

**Étape 2 :** Exécuter la migration
```bash
npx prisma migrate dev --name add_job_post_table
```

**Étape 3 :** Utiliser dans votre code TypeScript
```typescript
import { prisma } from '@/config/db';

const job = await prisma.jobPost.create({
  data: {
    title: 'Senior Developer',
    description: 'Looking for a senior developer with 5+ years experience'
  }
});
```

### Cas 2 : Ajouter une colonne à une table existante

**Étape 1 :** Modifier le `schema.prisma`
```prisma
model User {
  id       Int      @id @default(autoincrement())
  email    String   @unique
  name     String
  password String
  role     String   @default("user")  // Nouvelle colonne
}
```

**Étape 2 :** Créer la migration
```bash
npx prisma migrate dev --name add_role_to_user
```

**Étape 3 :** Utiliser la nouvelle colonne
```typescript
const adminUser = await prisma.user.create({
  data: {
    email: 'admin@example.com',
    name: 'Admin',
    password: 'hashed_password',
    role: 'admin'
  }
});
```

### Cas 3 : Modifier une colonne d'optionnelle à obligatoire

**Attention :** Cette opération peut échouer si la table a déjà des valeurs NULL.

**Étape 1 :** Modifier le `schema.prisma`
```prisma
model User {
  phone String  // Avant : String?
}
```

**Étape 2 :** Si la table a des lignes avec phone = NULL, vous devez d'abord les mettre à jour :

```typescript
// Dans un script ou migration manuelle
await prisma.user.updateMany({
  where: {
    phone: null
  },
  data: {
    phone: '+1-xxx-xxxx-xxxx'  // Valeur par défaut
  }
});
```

**Étape 3 :** Créer la migration
```bash
npx prisma migrate dev --name make_phone_required
```

### Cas 4 : Supprimer une colonne

**Étape 1 :** Retirer la colonne du `schema.prisma`
```prisma
model User {
  id       Int    @id @default(autoincrement())
  email    String @unique
  name     String
  // Colonne "oldField" supprimée
}
```

**Étape 2 :** Créer la migration
```bash
npx prisma migrate dev --name remove_old_field_from_user
```

---

## Prisma Studio

Prisma Studio est un outil visuel pour explorer et gérer vos données.

### Lancer Prisma Studio

```bash
npx prisma studio
```

Cela ouvre l'interface à `http://localhost:5555` par défaut.

### Fonctionnalités

- **Voir les tables et colonnes**
- **Visualiser les données**
- **Créer/modifier/supprimer des enregistrements**
- **Voir les relations entre tables**
- **Requêtes sur les données**

---

## Bonnes pratiques

### 1. Commenter vos modèles

```prisma
/// Représente un utilisateur du système
model User {
  /// Identifiant unique auto-incrémenté
  id       Int     @id @default(autoincrement())
  /// Email unique de l'utilisateur
  email    String  @unique
  /// Nom complet
  name     String
  /// Mot de passe hashé
  password String
}
```

### 2. Utiliser les noms de colonnes en snake_case dans PostgreSQL

```prisma
model User {
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("users")
}
```

### 3. Ajouter des timestamps à vos tables

```prisma
model Post {
  id        Int     @id @default(autoincrement())
  title     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 4. Utiliser les relations correctement

```prisma
// Relation 1 à plusieurs
model Author {
  posts Post[]
}

model Post {
  authorId Int
  author   Author @relation(fields: [authorId], references: [id])
}

// Relation plusieurs à plusieurs
model Post {
  tags Tag[]
}

model Tag {
  posts Post[]
}
```

### 5. Valider les données côté application

Même si Prisma génère les types, validez les données avant de les enregistrer :

```typescript
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(8)
});

const userData = userSchema.parse(req.body);
await prisma.user.create({ data: userData });
```

### 6. Utiliser les transactions pour les opérations complexes

```typescript
const result = await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({
    data: { email: 'user@example.com', name: 'User', password: 'hash' }
  });

  const post = await tx.post.create({
    data: { title: 'Post', authorId: user.id }
  });

  return { user, post };
});
```

### 7. Gérer les migrations avec Git

- **Commitez toujours les fichiers de migration** : `prisma/migrations/`
- **Ne modifiez jamais les migrations existantes**
- **Pour corriger une migration, créez une nouvelle migration**

### 8. Cloner le projet et synchroniser la BD

Si vous clonez le projet ou que quelqu'un d'autre a ajouté des migrations :

```bash
# Applique toutes les migrations non appliquées
npx prisma migrate deploy

# Ou en développement
npx prisma migrate dev
```

---

## Dépannage

### "Migration failed with an error"

**Cause probable :** Conflit entre le schéma et les migrations.

**Solution :**
```bash
# Réinitialise la BD (ATTENTION : supprime les données)
npx prisma migrate reset

# Ou créez une migration de correction
npx prisma migrate dev --name fix_schema
```

### "Column does not exist"

**Cause probable :** Vous avez modifié le `schema.prisma` mais n'avez pas exécuté la migration.

**Solution :**
```bash
npx prisma migrate dev
```

### "Cannot access X of undefined"

**Cause probable :** Le Prisma Client n'a pas été régénéré après la modification du schéma.

**Solution :**
```bash
npx prisma generate
```

---

## Ressources supplémentaires

- [Documentation Prisma Officielle](https://www.prisma.io/docs)
- [Prisma Migrate](https://www.prisma.io/docs/orm/prisma-migrate)
- [Prisma Schema Reference](https://www.prisma.io/docs/orm/prisma-schema/overview)
- [Prisma Client API](https://www.prisma.io/docs/orm/prisma-client)
- [PostgreSQL avec Prisma](https://www.prisma.io/docs/orm/overview/databases/postgresql)
