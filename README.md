# README - Monorepo Structure

This project has been restructured as a monorepo with separate admin and client applications.

## Project Structure

```
AurevonWealthGroup/
├── admin/          # Admin application (port 3001)
├── client/         # Client-facing application (port 3000)
├── shared/         # Shared resources (Prisma schema, database)
└── package.json    # Root workspace configuration
```

## Quick Start

### Install Dependencies
```bash
npm install
```

This will install dependencies for all workspaces (admin, client, shared).

### Run Development Servers

**Run both apps concurrently:**
```bash
npm run dev
```

**Run admin only (port 3001):**
```bash
npm run dev:admin
```

**Run client only (port 3000):**
```bash
npm run dev:client
```

### Database Setup

See [DB_SETUP.md](./DB_SETUP.md) for detailed database configuration.

```bash
cd shared
npx prisma generate
npx prisma db push
```

## Applications

### Admin App (localhost:3001)
- Login page at `/`
- Dashboard, Investors, Posts, Settings
- Requires authentication
- Uses NextAuth with credentials provider

### Client App (localhost:3000)
- Public-facing website
- Homepage, About, Services, Contact
- No authentication required

## Environment Variables

- **Admin:** `admin/.env.local` - NextAuth secrets, auth URLs
- **Shared:** `shared/.env` - DATABASE_URL

## Build

```bash
npm run build          # Build all workspaces
npm run build:admin    # Build admin only
npm run build:client   # Build client only
```

## Tech Stack

- **Framework:** Next.js 16 (React 19)
- **Database:** SQLite with Prisma ORM
- **Auth:** NextAuth v5 (admin only)
- **Styling:** Tailwind CSS v4
- **UI:** Custom components with Framer Motion
