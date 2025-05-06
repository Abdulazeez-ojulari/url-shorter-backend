# ShortLink – URL Shortening Service

A modern, developer-friendly URL shortening service built with Node.js, TypeScript, Express, and MongoDB.

## Features

- Shorten long URLs to short, unique code
- Redirect short URLs to the original destination
- Decode short URLs via API
- Stats on short url
- Fully tested API endpoints using Jest and Supertest

## Requirements

- Node.js >= 23

## Getting Started

### 1. Clone the Repository

git clone https://github.com/Abdulazeez-ojulari/url-shorter-backend.git
cd url-shorter-backend

### 2. Install Dependencies

npm install

### 3. Environment Setup

Create two `.env` files in the root directory:

#### .env (for development)

PORT=8000
MONGODB_URL='mongodb+srv://<your-production-uri>'
BASE_PATH="/api"
SHORTER_BASE_URL="http://localhost:8000/api"

#### .env.test (for testing)

PORT=8000
MONGODB_URL='mongodb+srv://<your-production-uri>'
BASE_PATH="/api"
SHORTER_BASE_URL="http://localhost:8000/api"

Ensure MongoDB is running locally or use a hosted MongoDB URI for testing.

### 4. Running the Application

#### Development

npm run dev

#### Build and Start for Production

npm run build  
npm start

## Running Tests

Tests are executed using Jest and Supertest and run against a dedicated test database defined in `.env.test`.

### Run All Tests

npm test

## Development Tips

- Use Postman or Insomnia to test the API manually.
- Use MongoDB Compass to inspect your local or cloud databases.
- Avoid writing to your production database during tests by using environment-specific connections.

## License

MIT © Your Name
