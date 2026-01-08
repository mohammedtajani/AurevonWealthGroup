# PostgreSQL Setup Guide for Windows

This guide will help you install and configure PostgreSQL for the AurevonWealthGroup application.

## 📥 Installation

### Step 1: Download PostgreSQL

1. Visit the official PostgreSQL download page: [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)
2. Click on **"Download the installer"** 
3. Download the latest **PostgreSQL 16.x** installer for Windows

### Step 2: Run the Installer

1. Run the downloaded `.exe` file
2. Click **Next** through the welcome screen
3. Choose installation directory (default is fine: `C:\Program Files\PostgreSQL\16`)
4. Select components to install:
   - ✅ PostgreSQL Server
   - ✅ pgAdmin 4 (GUI management tool)
   - ✅ Command Line Tools
   - ✅ Stack Builder (optional)
5. Choose data directory (default is fine)
6. **Set a password for the database superuser (postgres)**
   - ⚠️ **IMPORTANT**: Remember this password! You'll need it later
   - Suggested: Use a strong password and save it securely
7. Set port number: **5432** (default)
8. Set locale: **Default locale**
9. Click **Next** and then **Install**
10. Wait for installation to complete (may take a few minutes)
11. Uncheck **Launch Stack Builder** and click **Finish**

## 🗄️ Create Database

### Option 1: Using pgAdmin (GUI - Recommended for Beginners)

1. Open **pgAdmin 4** from Start Menu
2. Click on **Servers** → **PostgreSQL 16**
3. Enter the password you set during installation
4. Right-click on **Databases** → **Create** → **Database**
5. Enter database name: `aurevonwealthgroup`
6. Click **Save**

### Option 2: Using Command Line (Advanced)

1. Open **Command Prompt** or **PowerShell**
2. Navigate to PostgreSQL bin directory:
   ```powershell
   cd "C:\Program Files\PostgreSQL\16\bin"
   ```
3. Login to PostgreSQL:
   ```powershell
   psql -U postgres
   ```
4. Enter your postgres password when prompted
5. Create the database:
   ```sql
   CREATE DATABASE aurevonwealthgroup;
   ```
6. Verify database was created:
   ```sql
   \l
   ```
7. Exit psql:
   ```sql
   \q
   ```

## 🔧 Configure Environment Variables

### Step 1: Update `.env` File

In your project root, update the `DATABASE_URL` in `.env`:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/aurevonwealthgroup"
```

Replace `YOUR_PASSWORD` with the password you set during PostgreSQL installation.

### Step 2: Update `.env.local` File

Also update `.env.local` with the same connection string:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/aurevonwealthgroup"
```

## 🚀 Initialize Database Schema

1. Open terminal in your project root
2. Generate Prisma client:
   ```bash
   npx prisma generate
   ```
3. Push schema to PostgreSQL:
   ```bash
   npx prisma db push
   ```
4. Seed the database:
   ```bash
   npx prisma db seed
   ```

## ✅ Verify Installation

Test your PostgreSQL connection:

1. Open **pgAdmin 4**
2. Navigate to: **Servers** → **PostgreSQL 16** → **Databases** → **aurevonwealthgroup** → **Schemas** → **public** → **Tables**
3. You should see your tables: `User`, `Investor`, `Post`

Or use command line:
```bash
npx prisma studio
```
This opens a web interface to browse your database.

## 🔍 Troubleshooting

### "Connection refused" error

- Verify PostgreSQL service is running:
  1. Press `Win + R`
  2. Type `services.msc` and press Enter
  3. Find **postgresql-x64-16** service
  4. Ensure it's **Running**. If not, right-click and select **Start**

### "Authentication failed" error

- Double-check your password in the connection string
- Ensure you're using the correct postgres user password

### "Database does not exist" error

- Create the database using pgAdmin or psql (see instructions above)
- Verify database name matches exactly: `aurevonwealthgroup`

### "Role does not exist" error

- You may be using wrong username. Default is `postgres`
- Connection string format: `postgresql://USERNAME:PASSWORD@localhost:5432/DATABASE_NAME`

## 🌐 Production Deployment

For production deployment (Vercel, Railway, Render, etc.), you'll get a PostgreSQL connection string from your hosting provider. Update your production environment variables with that connection string.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🛟 Additional Resources

- [PostgreSQL Official Documentation](https://www.postgresql.org/docs/)
- [Prisma PostgreSQL Guide](https://www.prisma.io/docs/concepts/database-connectors/postgresql)
- [pgAdmin Documentation](https://www.pgadmin.org/docs/)

---

**Need Help?** Check the troubleshooting section above or consult the [PostgreSQL Community](https://www.postgresql.org/community/).
