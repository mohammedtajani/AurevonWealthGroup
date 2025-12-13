# Aurevon Wealth Group - Website & Admin Panel

## Overview
Premium semi-static website with a dynamic Admin Panel for Aurevon Wealth Group. Built with Next.js 14, Tailwind CSS, and Firebase.

## Features
- **Public**: Home (Parallax/Magnetic), About, Contact, Services.
- **Admin**: Dashboard, Investor Management (CRUD), Blog (CMS).
- **Tech Stack**: Next.js (App Router), Firebase (Auth, Firestore), Tailwind CSS, Framer Motion.

## Prerequisites
- Node.js 18+
- npm
- Firebase Project (configured with Auth and Firestore)

## Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env.local` based on `.env.example` (see below).
4. Run development server:
   ```bash
   npm run dev
   ```

## Environment Variables
Create a `.env.local` file with your Firebase credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Testing
- **Lint**: `npm run lint`
- **Unit Tests**: `npm test`

## Build
```bash
npm run build
npm start
```

## Docker Deployment
1. Build image: `docker build -t aurevon-web .`
2. Run container: `docker run -p 3000:3000 aurevon-web`

## Directory Structure
- `src/app`: Page routes (Public & Admin).
- `src/components/ui`: Reusable UI components.
- `src/lib/firebase`: Firebase client and helpers.
