# amazon-tracker-api

## Description

This is a simple API that allows you to track the price of a product on Amazon.

## Installation

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file in the root directory and fill it with the following properties:

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

4. Run `npm run dev`
5. The API will be running on `http://localhost:3000`

## Endpoints

### GET /discover?url={url}

This endpoint will return informations about the product in the given URL.

### GET /trackers/{userId}

This endpoint will return all the trackers that have been created by the user with the given ID.

### GET /trackers/{productId}

This endpoint will return all the trackers that have been created for the product with the given ID.

### POST /trackers/{productId}

This endpoint will start tracking the price of the product with the given ID.

### GET /scans/{trackerId}

This endpoint will return all the scans that have been made for the tracker with the given ID.



