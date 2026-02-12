# Clone TabNews

Re-implementation of [TabNews](https://github.com/filipedeschamps/tabnews.com.br) following the [curso.dev](https://curso.dev/) course by [Filipe Deschamps](https://github.com/filipedeschamps).

Based on the [clone-tabnews](https://github.com/filipedeschamps/clone-tabnews) template repository.

## Tech Stack

- **Framework:** Next.js 14
- **Database:** PostgreSQL 16 (Alpine)
- **Containerization:** Docker Compose
- **Testing:** Jest
- **Code Quality:** ESLint, Prettier, Husky, Commitlint

## Prerequisites

- Node.js
- Docker and Docker Compose

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/dezugin/curso.dev.git
cd curso.dev
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.development` file with your PostgreSQL configuration:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_database
```

### 4. Start development server

```bash
npm run dev
```

This will:

- Start the PostgreSQL container
- Wait for the database to be ready
- Run pending migrations
- Start the Next.js development server

## Available Scripts

| Script                        | Description                            |
| ----------------------------- | -------------------------------------- |
| `npm run dev`                 | Start development server with database |
| `npm run test`                | Run integration tests                  |
| `npm run test:watch`          | Run tests in watch mode                |
| `npm run services:up`         | Start Docker containers                |
| `npm run services:down`       | Stop and remove Docker containers      |
| `npm run services:stop`       | Stop Docker containers                 |
| `npm run migrations:create`   | Create a new migration file            |
| `npm run migrations:up`       | Run pending migrations                 |
| `npm run lint:prettier:check` | Check code formatting                  |
| `npm run lint:prettier:fix`   | Fix code formatting                    |
| `npm run lint:eslint:check`   | Run ESLint                             |
| `npm run commit`              | Create a conventional commit           |

## API Endpoints

### Status

- **GET** `/api/v1/status` - Returns system status including database information

Response example:

```json
{
  "updated_at": "2026-02-11T12:00:00.000Z",
  "dependencies": {
    "database": {
      "version": "16.0",
      "max_connections": 100,
      "opened_connections": 1
    }
  }
}
```

### Migrations

- **GET** `/api/v1/migrations` - List pending migrations (dry run)
- **POST** `/api/v1/migrations` - Execute pending migrations

## Pages

- `/` - Home page
- `/status` - Status page with real-time database information

## Project Structure

```
├── infra/                    # Infrastructure files
│   ├── compose.yaml          # Docker Compose configuration
│   ├── database.js           # Database connection module
│   ├── errors.js             # Custom error classes
│   ├── migrations/           # Database migrations
│   └── scripts/              # Utility scripts
├── models/                   # Data models
├── pages/                    # Next.js pages and API routes
│   ├── api/v1/               # API endpoints
│   └── status/               # Status page
└── tests/                    # Integration tests
    └── integration/          # API integration tests
```

## License

MIT
