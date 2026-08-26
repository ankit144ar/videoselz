# Videoselz Shoppable Video Analytics Dashboard

A full-stack application for tracking the performance of shoppable videos.

The application provides a React dashboard where merchants can view video
engagement metrics and simulate traffic against the backend API.

## Features

* Video analytics dashboard
* Views, clicks and add-to-cart conversions
* Conversion rate calculated on the frontend
* Paginated analytics
* Engagement event ingestion API
* Simulate Traffic functionality
* SQLite database
* Database migrations
* Development seed data
* Responsive dashboard
* Backend request logging
* Centralized API error handling

---

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* Node.js
* Express
* JavaScript
* SQLite
* sqlite3
* Zod
* Pino
* pino-http
* Nodemon

### Database

* SQLite

---

# Project Structure

```text
videoselz-takehome/
│
├── backend/
│   ├── data/
│   │   └── videoselz.db
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── db/
│   │   │   ├── migrations/
│   │   │   ├── database.js
│   │   │   ├── migrate.js
│   │   │   └── seed.js
│   │   ├── middleware/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── utils/
│   └── package.json
│
├── docs/
├── AI_PROMPTING.md
├── .env.example
├── .gitignore
├── package.json
└── package-lock.json
```

---

# Prerequisites

Before starting, install:

* Node.js
* npm
* Git

Check your installation:

```powershell
node --version
npm --version
git --version
```

The project was developed using JavaScript and does not require TypeScript.

---

# Installation

## 1. Clone the repository

```powershell
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd videoselz-takehome
```

Replace `<YOUR_GITHUB_REPOSITORY_URL>` with the actual public repository URL.

---

## 2. Install dependencies

The project uses npm workspaces, so dependencies for both applications can
be installed from the root.

Run:

```powershell
npm install
```

This installs dependencies for:

```text
frontend/
backend/
```

You do not need to run `npm install` separately inside each directory.

---

# Database Setup

The backend uses SQLite.

The local database is stored at:

```text
backend/data/videoselz.db
```

The database file is ignored by Git.

## 3. Run database migrations

From the project root:

```powershell
npm run migrate --workspace=backend
```

This creates the required database tables:

```text
products
videos
engagement_events
```

It also creates the database migration tracking table.

---

## 4. Seed the database

Run:

```powershell
npm run seed --workspace=backend
```

The seed script creates development data including:

* Products
* Videos
* Views
* Clicks
* Add-to-cart events

The data is deterministic and can be seeded again during development.

---

# Start the Application

The backend and frontend run as two separate development processes.

You need **two terminal windows**.

---

## 5. Start the backend

Open Terminal 1.

From the project root:

```powershell
npm run dev --workspace=backend
```

Nodemon starts the Express server.

The backend runs on:

```text
http://localhost:5000
```

You should see something similar to:

```text
Backend server running on port 5000
Connected to SQLite database: videoselz.db
```

---

## 6. Verify the backend

Open a browser and visit:

```text
http://localhost:5000/health
```

Expected response:

```json
{
  "status": "ok"
}
```

You can also test the analytics endpoint:

```text
http://localhost:5000/api/analytics/videos
```

---

## 7. Start the frontend

Open Terminal 2.

From the project root:

```powershell
npm run dev --workspace=frontend
```

Vite will display a local URL, normally:

```text
http://localhost:5173
```

Open it in your browser.

---

# Environment Configuration

The frontend can use the following environment variable:

```text
VITE_API_BASE_URL
```

The example configuration is provided in:

```text
.env.example
```

Example:

```env
VITE_API_BASE_URL=http://localhost:5000
```

The frontend defaults to:

```text
http://localhost:5000
```

when the variable is not provided.

For local development, create the environment file only when you need to
override the default backend URL.

---

# Running Frontend and Backend Separately

### Backend

```powershell
npm run dev --workspace=backend
```

### Frontend

```powershell
npm run dev --workspace=frontend
```

Both processes need to be running at the same time for the dashboard to
work.

---

# Application Workflow

Once both applications are running:

```text
Browser
   ↓
React Dashboard
   ↓
GET /api/analytics/videos
   ↓
Express Backend
   ↓
SQLite
```

When **Simulate Traffic** is clicked:

```text
Simulate Traffic
       ↓
Random video + event type
       ↓
POST /api/events
       ↓
SQLite
       ↓
Refresh analytics
       ↓
Updated dashboard
```

---

# API Endpoints

## Health

```http
GET /health
```

## Create engagement event

```http
POST /api/events
```

Example:

```json
{
  "videoId": 1,
  "eventType": "view"
}
```

Supported event types:

```text
view
click
add_to_cart
```

## Get video analytics

```http
GET /api/analytics/videos?page=1&limit=10
```

More complete API documentation is available in:

```text
docs/API.md
```

---

# Useful Commands

## Install all dependencies

```powershell
npm install
```

## Start backend

```powershell
npm run dev --workspace=backend
```

## Start frontend

```powershell
npm run dev --workspace=frontend
```

## Run migrations

```powershell
npm run migrate --workspace=backend
```

## Seed database

```powershell
npm run seed --workspace=backend
```

## Build frontend

```powershell
npm run build --workspace=frontend
```

## Preview frontend build

```powershell
npm run preview --workspace=frontend
```

---

# Reset Local Database

For development, you can completely recreate the database.

Stop the backend and delete:

```powershell
Remove-Item backend\data\videoselz.db
```

Then recreate the database:

```powershell
npm run migrate --workspace=backend
npm run seed --workspace=backend
```

This removes all local database data, so this should only be used for local
development.

---

# Documentation

Additional documentation is available in the `docs` directory:

```text
docs/
├── API.md
├── ARCHITECTURAL.md
├── DATABASE.md
├── DEVELOPMENT.md
└── TESTING.md
```

### API

Details about endpoints, requests, responses and pagination.

### Architectural

Explains the project structure and major technical decisions.

### Database

Documents the SQLite schema, relationships, indexes, migrations and seed
data.

### Development

Contains development commands and local development guidance.

### Testing

Documents the current manual verification approach and future testing
considerations.

---

# AI Collaboration

The project includes:

```text
AI_PROMPTING.md
```

This file contains significant AI interactions used during development.

Routine development work such as:

* Installing dependencies
* Creating files
* Running commands
* Git operations
* Basic application setup

was performed directly and is not represented as AI prompts.

Meaningful architecture, implementation and debugging interactions are
documented with the actual prompts used.

---

# Testing

Automated Jest testing was not included in the final implementation.

The application was manually verified across the main workflows, including:

* Database migrations
* Seed data
* Health endpoint
* Engagement event creation
* Invalid event handling
* Missing video handling
* Analytics aggregation
* Pagination
* Dashboard rendering
* Conversion-rate calculation
* Simulate Traffic
* Analytics refresh
* Responsive dashboard behavior

See:

```text
docs/TESTING.md
```

for more information.

---

# License

This project was created as part of the Videoselz Full Stack Developer
technical evaluation.
