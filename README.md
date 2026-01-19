# Music Library API

A RESTful API for managing a music library with artists, songs, and playlists. Built with Express.js, TypeScript, and PostgreSQL using Prisma ORM.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [API Routes](#api-routes)
- [Database Tools](#database-tools)

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- Docker & Docker Compose
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/bojanugrinov/music-library-api.git
   cd music-library-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/music_library"

   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   POSTGRES_DB=music_library

   PGADMIN_DEFAULT_EMAIL=admin@admin.com
   PGADMIN_DEFAULT_PASSWORD=admin

   PGWEB_DATABASE_URL=postgres://postgres:postgres@postgres:5432/music_library?sslmode=disable
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The script will automatically:

- Start Docker containers (PostgreSQL, pgAdmin, pgWeb)
- Wait for PostgreSQL to be ready
- Reset and seed the database
- Start the development server with hot reload

The API will be running at `http://localhost:3000`

## � Environment Setup

The project includes Docker services:

- **PostgreSQL** (port 5432): Main database
- **pgAdmin** (port 8080): Database management UI
- **pgWeb** (port 8081): Web-based database client

Access them at:

- pgAdmin: `http://localhost:8080`
- pgWeb: `http://localhost:8081`

## 📡 API Routes

### Base URL

```
http://localhost:3000/api
```

### Postman Workspace

Import and test all API endpoints using this Postman workspace:
[Music Library API - Postman Workspace](https://www.postman.com/bojanugrinov/workspace/music-library-api)

### Artists

| Method | Route          | Description         |
| ------ | -------------- | ------------------- |
| GET    | `/artists`     | Get all artists     |
| GET    | `/artists/:id` | Get artist by ID    |
| POST   | `/artists`     | Create a new artist |
| PUT    | `/artists/:id` | Update artist       |
| DELETE | `/artists/:id` | Delete artist       |

### Songs

| Method | Route        | Description       |
| ------ | ------------ | ----------------- |
| GET    | `/songs`     | Get all songs     |
| GET    | `/songs/:id` | Get song by ID    |
| POST   | `/songs`     | Create a new song |
| PUT    | `/songs/:id` | Update song       |
| DELETE | `/songs/:id` | Delete song       |

### Playlists

| Method | Route                          | Description               |
| ------ | ------------------------------ | ------------------------- |
| GET    | `/playlists`                   | Get all playlists         |
| GET    | `/playlists/:id`               | Get playlist by ID        |
| POST   | `/playlists`                   | Create a new playlist     |
| POST   | `/playlists/:id/songs`         | Add song to playlist      |
| PUT    | `/playlists/:id`               | Update playlist           |
| DELETE | `/playlists/:id/songs/:songId` | Remove song from playlist |
| DELETE | `/playlists/:id`               | Delete playlist           |

## 📊 Database Tools

Once the project is running, you can access these tools:

### pgAdmin

- URL: `http://localhost:8080`
- Email: `admin@admin.com`
- Password: `admin`

### pgWeb

- URL: `http://localhost:8081`
- A lightweight web-based PostgreSQL client

### Prisma Studio

View and manage your database data visually:

```bash
npx prisma studio
```

---

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run install` - Generate Prisma client

---

## 📝 Notes

- All API endpoints expect and return JSON
- The API includes CORS support for cross-origin requests
- Database transactions are handled through Prisma ORM
- TypeScript is used for type safety throughout the project
