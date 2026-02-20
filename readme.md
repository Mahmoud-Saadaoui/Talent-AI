# Talent AI

Une plateforme de recrutement intelligente connectant candidats et recruteurs avec l'aide de l'IA.

## Overview

Talent AI est une application fullstack qui permet aux candidats de créer des profils détaillés et aux recruteurs de publier des offres. La plateforme utilise l'IA pour matcher les compétences des candidats avec les besoins des entreprises.

## Technologies

### Frontend
- **React 19** - Framework UI
- **Vite** - Build tool
- **TypeScript** - Typage statique
- **TailwindCSS** - Styling
- **React Router** - Navigation
- **React Hook Form** - Gestion des formulaires
- **i18next** - Internationalisation (FR/EN)
- **Axios** - Client HTTP
- **Tanstack Query** - Gestion d'état serveur

### Backend
- **Node.js + Express** - Serveur API
- **TypeScript** - Typage statique
- **Prisma** - ORM pour base de données
- **PostgreSQL** - Base de données
- **JWT** - Authentification
- **bcrypt** - Hachage des mots de passe
- **Zod** - Validation des données
- **Helmet** - Sécurité HTTP
- **Rate Limiting** - Protection contre les abus

## Structure du Projet

```
talent-ai/
├── frontend/
│   ├── src/
│   │   ├── app/          # Configuration principale
│   │   ├── modules/      # Fonctionnalités (auth, home, profiles)
│   │   ├── shared/       # Composants et utilitaires partagés
│   │   └── i18n/         # Configuration des langues
│   └── package.json
│
└── backend/
    ├── src/
    │   ├── modules/      # Routes, controllers, services
    │   ├── middlewares/  # Middlewares Express
    │   ├── config/       # Configuration Prisma, etc.
    │   └── types/        # Types TypeScript
    ├── prisma/
    │   └── schema.prisma # Schéma de base de données
    └── package.json
```

## Installation

### Prérequis
- Node.js (v18+)
- PostgreSQL
- npm ou yarn

### Backend

1. Cloner le projet et aller dans le dossier backend :
```bash
cd backend
```

2. Installer les dépendances :
```bash
npm install
```

3. Créer un fichier `.env` dans le dossier backend :
```env
DATABASE_URL="postgresql://user:password@localhost:5432/talent_ai"
JWT_SECRET="votre_secret_jwt_ici"
CLIENT_URL="http://localhost:5173"
PORT=4000
```

4. Lancer les migrations Prisma :
```bash
npx prisma migrate dev
```

5. Démarrer le serveur en développement :
```bash
npm run server
```

Le serveur démarre sur `http://localhost:4000`

### Frontend

1. Aller dans le dossier frontend :
```bash
cd frontend
```

2. Installer les dépendances :
```bash
npm install
```

3. Démarrer le client en développement :
```bash
npm run client
```

Le frontend démarre sur `http://localhost:5173`

## Scripts Disponibles

### Backend
| Script | Description |
|--------|-------------|
| `npm run server` | Démarrer en mode développement avec hot-reload |
| `npm run build` | Compiler TypeScript |
| `npm start` | Démarrer le serveur de production |

### Frontend
| Script | Description |
|--------|-------------|
| `npm run client` | Démarrer le serveur de développement |
| `npm run build` | Compiler pour la production |
| `npm run preview` | Prévisualiser le build de production |
| `npm run lint` | Exécuter ESLint |

## Fonctionnalités

### Authentification
- Inscription (Candidat / Recruteur)
- Connexion avec JWT
- Vérification de compte par email
- Rôles : CANDIDATE, RECRUITER, ADMIN

### Profils Candidats
- Informations personnelles
- Compétences techniques et soft skills
- Expériences professionnelles
- Formation
- Langues
- CV (PDF)

### Profils Recruteurs
- Informations entreprise
- Description et secteur d'activité
- Taille de l'entreprise
- Site web

## API Routes

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/v1/health` | Vérifier l'état du serveur |
| POST | `/api/v1/auth/register` | Inscription |
| POST | `/api/v1/auth/login` | Connexion |
| POST | `/api/v1/auth/logout` | Déconnexion |

## Auteur

**Saadaoui Mahmoud**

## Licence

ISC
