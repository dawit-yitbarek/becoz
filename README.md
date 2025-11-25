# Becoz Rentals

Becoz Rentals is a modern rental house listing platform featuring a clean UI, detailed property pages, filtering system, and an admin panel for managing listings, images, and property details. The project includes a full-stack architecture with a React frontend, Node.js/Express backend, PostgreSQL database, Cloudinary integration, and JWT authentication for admin access.

---

## 🚀 Features

### 🏡 User Features
- Browse available properties with a modern and responsive UI  
- View detailed property pages (images, description, address, features, and pricing)  
- Filter by **rent** or **sell**  
- Contact form powered by Brevo (emails sent directly to admin)

### 🔧 Admin Features
- Login using JWT authentication  
- Create, update, and delete property listings  
- Upload and manage main images + image collections using Cloudinary  
- View user feedback  
- Fully functioning admin panel for managing all listings  

# Becoz — Rental Listings

Becoz is a full-stack rental/property listing application with a React + Vite frontend and a Node.js + Express backend. It supports an admin panel (JWT auth) for managing properties, Cloudinary image uploads, feedback collection, and email notifications (Brevo).

**Status:** development

---

**Table of contents**
- [Features](#features)
- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Environment variables](#environment-variables)
- [Local setup](#local-setup)
- [API endpoints](#api-endpoints)
- [Project structure](#project-structure)
- [Deployment notes](#deployment-notes)
- [Contributing](#contributing)

---

## Features

- User-facing property listings and detail pages
- Admin panel with JWT-based authentication
- Create / update / delete property listings
- Image upload and management using Cloudinary
- Feedback form and admin feedback viewer
- Email sending via Brevo

## Tech stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express
- Database: PostgreSQL (via `pg`)
- Storage: Cloudinary (image uploads)
- Email: Brevo (via `@getbrevo/brevo`)

## Prerequisites

- Node.js (>=16) and npm
- PostgreSQL or a managed Postgres (connection string in `DATABASE_URL`)
- Cloudinary account (for uploads)
- Brevo (or another email provider) API key and verified sender

## Environment variables

Create a `.env` file in the `backend` folder with the following variables (example names used in code):

- `DATABASE_URL` — PostgreSQL connection string (include SSL if required)
- `FRONTEND_URL` — front-end origin (for CORS)
- `BACKEND_URL` — backend origin (optional)
- `CLOUDINARY_CLOUD_NAME` — Cloudinary cloud name
- `CLOUDINARY_API_KEY` — Cloudinary API key
- `CLOUDINARY_API_SECRET` — Cloudinary API secret
- `JWT_SECRET` — secret used to sign admin JWTs
- `EMAIL_USER` — sender email (Brevo-verified)
- `BREVO_API_KEY` — Brevo API key
- `BROKER_EMAIL` — email to receive contact messages
- `PORT` — backend port (e.g. `5000`)

Frontend environment variables (create `.env` in the `becoz` folder):

- `VITE_BACKEND_URL` — URL of the backend (e.g. `http://localhost:5000`)
- `VITE_FRONTEND_URL` — frontend public URL (optional)

## Local setup

Open two terminals (backend and frontend). Use PowerShell on Windows.

Backend:

```powershell
cd c:\Users\user\Desktop\Cli\becoz-main\backend
npm install
# create .env with the variables above
npm run dev
```

Frontend:

```powershell
cd c:\Users\user\Desktop\Cli\becoz-main\becoz
npm install
npm run dev
```

Health check (backend):

```powershell
# when backend is running
curl http://localhost:PORT/health
```

## API endpoints

The backend exposes the following routes (mounted under `/api`):

- `GET /health` — health check
- `POST /api/admin` and related admin routes — admin authentication and management
- `GET/POST/PUT/DELETE /api/properties` — property CRUD
- `GET/POST /api/feedback` — submit and view feedback
- `POST /api/upload` — image upload endpoints (Cloudinary)
- `POST /api/email` — send email/contact messages

Check the `backend/src/routes` folder for full route details.

## Project structure

- `backend/` — Express backend
  - `src/routes/` — route definitions (`adminRoute.js`, `propertiesRoute.js`, etc.)
  - `src/controllers/` — request handlers
  - `src/config/db.js` — Postgres connection (uses `DATABASE_URL`)
  - `src/models/` — Cloudinary helper
- `becoz/` — React + Vite frontend (Tailwind)

## Deployment notes

- The frontend is built with Vite and can be deployed to Vercel or Netlify.
- The backend requires a Node environment and a Postgres database (ensure `DATABASE_URL` and SSL settings are correct). Managed hosts such as Render, Heroku, or Fly work well.
- Keep secrets out of the repo; use platform environment variables in production.