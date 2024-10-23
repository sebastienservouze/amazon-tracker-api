# amazon-tracker-api

## Description

Backend pour le projet Amazon Tracker.

## Installation

1. Cloner le projet
2. Installer les dépendances avec `npm install`
3. Créer un fichier `.env` à la racine du projet avec les variables d'environnement suivantes:

```
# Environment
NODE_ENV=dev

# Server
SERVER_PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=postgres

# JWT
JWT_ACCESS_SECRET=access_secret
JWT_REFRESH_SECRET=refresh_secret

# Logging
LOG_LEVEL=debug
```

4. Lancer le serveur avec `npm run dev`
5. Le serveur est accessible à l'adresse `http://localhost:3000`
