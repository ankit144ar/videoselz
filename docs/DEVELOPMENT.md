# Development Guide

## Prerequisites

Install the following before starting the project:

* Node.js
* npm
* Git

Check the installed versions:

```bash
node --version
npm --version
git --version
```

---

## Project Structure

```text
videoselz-takehome/
├── backend/
├── frontend/
├── docs/
├── README.md
├── AI_PROMPTING.md
├── .env.example
├── .gitignore
├── package.json
└── package-lock.json
```

---

## Install Dependencies

From the repository root:

```bash
npm install
```

The repository uses npm workspaces for the frontend and backend.

---

## Environment Configuration

The frontend can use:

```text
VITE_API_BASE_URL
```

The example configuration is provided in:

```text
.env.example
```

Default API URL:

```text
http://localhost:5000
```

The frontend also falls back to this URL if the environment variable is
not set.

---

## Database Setup

### Run migrations

From the repository root:

```bash
npm run migrate --workspace=backend
```

This creates the database schema and records executed migrations.

### Seed development data

```bash
npm run seed --workspace=backend
```

This inserts sample products, videos and engagement events.

---

## Start the Backend

From the repository root:

```bash
npm run dev --workspace=backend
```

The backend uses Nodemon during development and runs on:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/health
```

Expected response:

```json
{
  "status": "ok"
}
```

---

## Start the Frontend

Open another terminal and run:

```bash
npm run dev --workspace=frontend
```

Vite will provide a local development URL, normally:

```text
http://localhost:5173
```

Open that URL in a browser.

---

## Development Workflow

A typical new developer setup is:

```bash
npm install
npm run migrate --workspace=backend
npm run seed --workspace=backend
```

Then start:

```bash
npm run dev --workspace=backend
```

and in another terminal:

```bash
npm run dev --workspace=frontend
```

---

## Useful Backend Commands

Start development server:

```bash
npm run dev --workspace=backend
```

Start server without Nodemon:

```bash
npm start --workspace=backend
```

Run migrations:

```bash
npm run migrate --workspace=backend
```

Seed database:

```bash
npm run seed --workspace=backend
```

---

## Useful Frontend Commands

Start development server:

```bash
npm run dev --workspace=frontend
```

Create production build:

```bash
npm run build --workspace=frontend
```

Preview the production build:

```bash
npm run preview --workspace=frontend
```

---

## API Development

The main API endpoints are:

```text
POST /api/events
GET /api/analytics/videos
GET /health
```

Full API details are documented in:

```text
docs/API.md
```

---

## Database Development

Database schema is managed through:

```text
backend/src/db/migrations/
```

Do not manually modify the generated SQLite database to change the schema.

Instead, create a new migration:

```text
002_description.sql
```

and run:

```bash
npm run migrate --workspace=backend
```

Development seed data is managed through:

```text
backend/src/db/seed.js
```

---

## Frontend Development

The dashboard is located at:

```text
frontend/src/pages/Dashboard.jsx
```

Reusable components are located at:

```text
frontend/src/components/
```

API calls are located at:

```text
frontend/src/api/
```

Frontend application logic is kept in:

```text
frontend/src/services/
frontend/src/hooks/
frontend/src/utils/
```

---

## Styling

The project does not use Tailwind CSS.

Styles are maintained using regular CSS in:

```text
frontend/src/styles/
```

The dashboard uses semantic HTML and responsive CSS.

---

## Logging

The backend uses Pino for application logging and pino-http for request
logging.

Logs are written to the backend terminal during development.

Avoid adding `console.log` calls for normal application logging.

---

## Manual Verification

Before submitting changes, verify the following.

### Backend

* Backend starts successfully.
* `/health` responds with HTTP 200.
* Migrations run successfully.
* Seed script runs successfully.
* `POST /api/events` accepts valid events.
* Invalid event payloads return HTTP 400.
* Missing videos return HTTP 404.
* `GET /api/analytics/videos` returns aggregated metrics.
* Pagination works.

### Frontend

* Dashboard loads successfully.
* Analytics table displays data.
* Conversion rate is calculated correctly.
* Loading state appears while data is being fetched.
* Error state provides a retry option.
* Empty state is displayed when there is no data.
* Pagination changes the displayed records.
* Simulate Traffic creates an event.
* The table refreshes after simulated traffic.
* The dashboard works at smaller viewport widths.

---

## Testing

Automated Jest testing was not included in the final implementation.

The core application flows were manually verified during development.

For a production application, automated API and frontend tests would be
added before deployment.

---

## Git Workflow

Create small, descriptive commits as features are completed.

Examples:

```bash
git add .
git commit -m "feat: add video analytics endpoint"
```

```bash
git add .
git commit -m "feat: add traffic simulation"
```

```bash
git add .
git commit -m "docs: update API documentation"
```

Avoid using a single large commit for the entire project.

---

## AI Collaboration

Significant AI interactions are recorded in:

```text
AI_PROMPTING.md
```

Routine commands, package installation, file creation and other normal
development work are not recorded as AI interactions.

The AI log contains the actual prompts used for meaningful architecture,
implementation and debugging tasks.
