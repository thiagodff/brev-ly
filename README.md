# brev-ly

**brev-ly** is a modern and efficient URL shortener developed with a full-stack architecture. It features a monorepo structure containing a Node.js backend and a React frontend.

## Key Features

- **URL Shortening:** Create short links with random or custom slugs.
- **Analytics:** Track visits to shortened links.
- **Image Upload:** Upload images for custom links (integrated with Cloudflare R2).
- **Management:** List, manage, and delete links.
- **Export:** Export link data to CSV.
- **API Documentation:** RESTful API documented with Swagger.

## Architecture

The project is organized as a monorepo:
- `server/`: Backend API (Node.js/Fastify)
- `web/`: Frontend Interface (React/Vite)

## Technology Stack

### Backend (`/server`)

- **Runtime & Framework:**
  - [Node.js](https://nodejs.org/)
  - [Fastify](https://www.fastify.io/) v5.6.0
  - [TypeScript](https://www.typescriptlang.org/) v5.9.2

- **Database & ORM:**
  - [PostgreSQL](https://www.postgresql.org/)
  - [Drizzle ORM](https://orm.drizzle.team/) v0.44.5
  - [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview) v0.31.5

- **Validation & Documentation:**
  - [Zod](https://zod.dev/) v4.1.11
  - [Fastify Swagger](https://github.com/fastify/fastify-swagger) v9.5.2

- **Storage & Infrastructure:**
  - [AWS SDK S3](https://aws.amazon.com/sdk-for-javascript/) v3.899.0 (Cloudflare R2 integration)
  - [Docker](https://www.docker.com/)

- **Tooling:**
  - [TSX](https://github.com/esbuild-kit/tsx)
  - [TSup](https://tsup.egoist.dev/)
  - [Biome](https://biomejs.dev/)

### Frontend (`/web`)

- **Core:**
  - [React](https://react.dev/) v19.1.1
  - [Vite](https://vitejs.dev/) v7.1.7
  - [TypeScript](https://www.typescriptlang.org/) v5.8.3

- **Routing & State:**
  - [TanStack Router](https://tanstack.com/router) v1.132.47
  - [TanStack Query](https://tanstack.com/query) v5.90.2

- **Styling:**
  - [Tailwind CSS](https://tailwindcss.com/) v4.1.13
  - [Tailwind Variants](https://www.tailwind-variants.org/)

- **UI Components & Utils:**
  - [React Hook Form](https://react-hook-form.com/)
  - [React Toastify](https://fkhadra.github.io/react-toastify/)
  - [Phosphor Icons](https://phosphoricons.com/)

### Package Management
- [pnpm](https://pnpm.io/) v10.12.1

## Setup and Execution Guide

### Prerequisites
- Node.js >= 18.x
- pnpm >= 10.x
- Docker & Docker Compose

### 1. Backend Setup (`/server`)

```bash
cd server
pnpm install

# Configure Environment
cp .env.example .env
# Edit .env with your credentials

# Start Database
docker-compose up -d db

# Run Migrations
pnpm db:generate
pnpm db:migrate

# Start Dev Server
pnpm dev
```
Server runs at `http://localhost:3333`. Swagger docs at `/docs`.

### 2. Frontend Setup (`/web`)

```bash
cd web
pnpm install

# Configure Environment
cp .env.example .env

# Start Dev Server
pnpm dev
```
Frontend runs at `http://localhost:5173`.

### 3. Docker Execution (Full Stack)

To run the backend and database entirely in Docker:

```bash
cd server
docker-compose up -d
```

## Available Scripts

### Backend
- `pnpm dev`: Development mode
- `pnpm build`: Build for production
- `pnpm start`: Start production build
- `pnpm db:studio`: Open Drizzle Studio

### Frontend
- `pnpm dev`: Development server
- `pnpm build`: Production build
- `pnpm preview`: Preview production build
- `pnpm lint`: Run ESLint
