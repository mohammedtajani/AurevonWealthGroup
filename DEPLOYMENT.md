# 🚀 Deployment Guide - AurevonWealthGroup

This guide covers deploying your AurevonWealthGroup application to production with PostgreSQL database.

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ PostgreSQL database (local or cloud)
- ✅ All environment variables configured
- ✅ Application tested locally
- ✅ Git repository set up

## 🌐 Recommended Hosting Platforms

### Option 1: Vercel + Neon PostgreSQL (Recommended)

**Best for**: Serverless Next.js applications, Free tier available

#### Step 1: Set up PostgreSQL Database (Neon)

1. Go to [https://neon.tech](https://neon.tech)
2. Sign up for free account
3. Create new project: `aurevonwealthgroup`
4. Copy the **Connection String** (looks like: `postgresql://user:pass@host.neon.tech/dbname`)

#### Step 2: Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Add environment variables in Vercel Dashboard:
   - Go to your project → **Settings** → **Environment Variables**
   - Add:
     - `DATABASE_URL` = Your Neon PostgreSQL connection string
     - `NEXTAUTH_SECRET` = Generate with: `openssl rand -base64 32`
     - `NEXTAUTH_URL` = Your production URL (e.g., `https://aurevonwealthgroup.vercel.app`)
     - `AUTH_TRUST_HOST` = `true`
     - Add all Firebase variables if using Firebase

5. Redeploy after adding environment variables:
   ```bash
   vercel --prod
   ```

6. Run database migrations:
   ```bash
   # Set DATABASE_URL to your production database
   npx prisma db push
   npx prisma db seed
   ```

---

### Option 2: Railway (All-in-One)

**Best for**: Includes PostgreSQL hosting, Simple setup

#### Step 1: Set up Railway

1. Go to [https://railway.app](https://railway.app)
2. Sign up with GitHub
3. Click **New Project** → **Deploy from GitHub repo**
4. Select your repository

#### Step 2: Add PostgreSQL

1. In your Railway project, click **New** → **Database** → **PostgreSQL**
2. Railway will automatically add `DATABASE_URL` environment variable

#### Step 3: Configure Environment Variables

1. Click on your web service
2. Go to **Variables** tab
3. Add:
   - `NEXTAUTH_SECRET` = Generate with: `openssl rand -base64 32`
   - `NEXTAUTH_URL` = Your Railway URL (e.g., `https://your-app.railway.app`)
   - `AUTH_TRUST_HOST` = `true`
   - Add all Firebase variables if using Firebase

#### Step 4: Deploy

1. Railway automatically deploys on git push
2. Run migrations from Railway shell:
   - Click **Settings** → **Deploy**
   - Or use Railway CLI

---

### Option 3: Render + Render PostgreSQL

**Best for**: Free tier with databases, Easy setup

#### Step 1: Create PostgreSQL Database

1. Go to [https://render.com](https://render.com)
2. Click **New** → **PostgreSQL**
3. Name: `aurevonwealthgroup-db`
4. Choose free tier
5. Copy **Internal Database URL**

#### Step 2: Create Web Service

1. Click **New** → **Web Service**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `aurevonwealthgroup`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npm start`

#### Step 3: Add Environment Variables

1. In your web service, go to **Environment**
2. Add:
   - `DATABASE_URL` = Your Render PostgreSQL Internal Database URL
   - `NEXTAUTH_SECRET` = Generate with: `openssl rand -base64 32`
   - `NEXTAUTH_URL` = Your Render URL
   - `AUTH_TRUST_HOST` = `true`
   - Add all Firebase variables

#### Step 4: Deploy

1. Click **Manual Deploy** → **Deploy latest commit**
2. Run migrations via Render shell or locally with production DATABASE_URL

---

### Option 4: AWS (Enterprise Production)

**Best for**: Large-scale applications, Full control

See AWS deployment guide for detailed instructions.

---

## 🗄️ Database Migration for Production

After deploying, you need to initialize your production database:

### Method 1: Local Migration (Recommended)

1. Temporarily set DATABASE_URL to production:
   ```bash
   # Windows PowerShell
   $env:DATABASE_URL="postgresql://production-connection-string"
   
   # Run migrations
   npx prisma db push
   
   # Seed database
   npx prisma db seed
   ```

### Method 2: Platform Shell

Use your hosting platform's shell/console to run:
```bash
npx prisma db push
npx prisma db seed
```

---

## 🔐 Security Checklist

Before going live, ensure:

- [ ] `NEXTAUTH_SECRET` is a strong random string (not the default)
- [ ] `DATABASE_URL` uses SSL for production (`?sslmode=require`)
- [ ] All sensitive environment variables are set
- [ ] No `.env` files committed to git
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] Database backups configured

---

## 🔄 Continuous Deployment (CI/CD)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install dependencies
        run: npm install
      
      - name: Generate Prisma Client
        run: npx prisma generate
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          NEXTAUTH_SECRET: ${{ secrets.NEXTAUTH_SECRET }}
```

---

## 📊 Monitoring & Maintenance

### Database Backups

**Neon**: Automatic daily backups included
**Railway**: Automatic backups on paid plans
**Render**: Configure backup schedule in settings

### Manual Backup Script

See [scripts/backup-database.ts](./scripts/backup-database.ts)

```bash
npm run db:backup
```

---

## 🐛 Troubleshooting

### "Cannot connect to database"

- Verify `DATABASE_URL` is correctly set in environment variables
- Check database is running and accessible
- For production, ensure connection string includes SSL: `?sslmode=require`

### "Prisma Client not generated"

- Ensure build command includes: `npx prisma generate`
- Check `postinstall` script in package.json

### "Environment variable not found"

- Verify all required environment variables are set in hosting platform
- Redeploy after adding environment variables

---

## 📚 Additional Resources

- [Vercel Deployment Docs](https://vercel.com/docs)
- [Railway Deployment Docs](https://docs.railway.app)
- [Render Deployment Docs](https://render.com/docs)
- [Prisma Production Best Practices](https://www.prisma.io/docs/guides/deployment/deployment-guides)

---

## 🎉 Post-Deployment

After successful deployment:

1. ✅ Test all functionality in production
2. ✅ Set up monitoring (e.g., Sentry, LogRocket)
3. ✅ Configure custom domain
4. ✅ Set up SSL certificate
5. ✅ Configure database backups
6. ✅ Set up error tracking

**Your AurevonWealthGroup application is now live! 🚀**
