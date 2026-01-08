# Database Configuration

AurevonWealthGroup now uses **PostgreSQL** for production-ready deployment.

## 📋 Prerequisites

Before setting up the database, ensure you have:
- Node.js and npm installed
- PostgreSQL installed (see [POSTGRESQL_SETUP.md](./POSTGRESQL_SETUP.md))

## 🚀 Quick Setup

### 1. Install PostgreSQL

If you haven't already, follow the complete installation guide:
👉 **[POSTGRESQL_SETUP.md](./POSTGRESQL_SETUP.md)**

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Update `DATABASE_URL` in `.env`:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/aurevonwealthgroup"
```

Replace `YOUR_PASSWORD` with the password you set during PostgreSQL installation.

### 3. Install Dependencies

```bash
npm install
```

### 4. Generate Prisma Client

```bash
npm run db:generate
```

### 5. Push Schema to Database

This creates all tables in PostgreSQL:
```bash
npm run db:push
```

### 6. Seed the Database (Optional)

Populate database with initial data:
```bash
npm run db:seed
```

## 📁 Database Files Location

- **Schema**: `prisma/schema.prisma`
- **Seed Script**: `prisma/seed.ts`
- **Migrations**: `prisma/migrations/` (when using migrations)

## 🔧 Available Commands

| Command | Description |
|---------|-------------|
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:push` | Push schema to database |
| `npm run db:seed` | Seed database with initial data |
| `npm run db:migrate` | Migrate data from SQLite to PostgreSQL |
| `npm run db:backup` | Create database backup |
| `npm run db:studio` | Open Prisma Studio (database GUI) |

## 🔄 Migrating from SQLite

If you have existing data in SQLite (`dev.db`), you can migrate it to PostgreSQL:

1. Set up PostgreSQL database (steps 1-5 above)
2. Run migration script:
   ```bash
   npm run db:migrate
   ```

This will copy all users, investors, and posts from SQLite to PostgreSQL.

## 🌐 Production Deployment

For production deployment, see:
👉 **[DEPLOYMENT.md](./DEPLOYMENT.md)**

You'll need to:
1. Get PostgreSQL connection string from your hosting provider
2. Set `DATABASE_URL` environment variable in production
3. Run `npx prisma db push` on production database
4. Run `npx prisma db seed` to populate initial data

## 🛟 Troubleshooting

### "Cannot connect to database"
- Verify PostgreSQL is running
- Check your `DATABASE_URL` is correct
- See [POSTGRESQL_SETUP.md](./POSTGRESQL_SETUP.md) troubleshooting section

### "Prisma Client not found"
- Run `npm run db:generate`

### "Database does not exist"
- Create the database in PostgreSQL: `CREATE DATABASE aurevonwealthgroup;`
- See [POSTGRESQL_SETUP.md](./POSTGRESQL_SETUP.md) for instructions

## 📚 Additional Resources

- [PostgreSQL Setup Guide](./POSTGRESQL_SETUP.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Prisma Documentation](https://www.prisma.io/docs)
