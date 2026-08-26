# Architectural Decisions

## Overview

The Videoselz take-home project is a small full-stack application for
tracking the performance of shoppable videos.

The project has two main applications:

```text
frontend/
    React application

backend/
    Express REST API
```

SQLite is used as the relational database.

The overall request flow is:

```text
React
  ↓
HTTP API
  ↓
Express Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
SQLite
```

The project intentionally keeps the architecture simple because this is
a take-home application and not a large production system.

---

## Frontend Architecture

The React application is organized into a few focused areas.

```text
src/
├── api/
├── components/
├── hooks/
├── pages/
├── services/
├── styles/
└── utils/
```

### API layer

The API layer contains the code responsible for making HTTP requests.

For example:

```text
api/analyticsApi.js
api/eventApi.js
```

Components do not need to know the backend URL or construct request
details themselves.

### Services

Services sit above the API layer and provide application-specific
operations.

Examples:

```text
analyticsService.js
trafficSimulationService.js
```

This keeps request details separate from UI code.

### Hooks

The `useVideoAnalytics` hook handles loading analytics data and exposes:

* video data
* pagination information
* loading state
* error state
* refresh functionality

### Components

Components are kept focused on presentation and user interaction.

Examples:

```text
VideoAnalyticsTable
Pagination
LoadingState
ErrorState
SimulateTrafficButton
```

### Page

`Dashboard.jsx` combines the components and coordinates the dashboard
state.

---

## Backend Architecture

The Express backend is divided into several responsibilities.

```text
src/
├── config/
├── controllers/
├── db/
├── middleware/
├── repositories/
├── routes/
├── services/
└── validators/
```

### Routes

Routes map HTTP requests to controllers.

For example:

```text
POST /api/events
GET /api/analytics/videos
```

The route layer should remain small.

### Controllers

Controllers handle the HTTP-specific work.

They are responsible for:

* reading request data
* validating input
* calling services
* returning HTTP responses
* forwarding unexpected errors

Controllers do not contain SQL.

### Services

Services contain application-level logic.

For example, before creating an engagement event, the event service checks
whether the requested video exists.

This keeps business rules out of the controller.

### Repositories

Repositories are responsible for database access.

Examples:

```text
productRepository.js
videoRepository.js
engagementEventRepository.js
analyticsRepository.js
```

SQL is kept inside repositories rather than spread throughout the backend.

---

## Why SQLite?

SQLite was selected because the assignment requires a SQL database and the
application has a small relational model.

The application does not require:

* a separate database server
* connection pooling
* multiple database instances
* complex database administration

SQLite keeps local setup simple while still allowing us to demonstrate
normalization, relationships, constraints, indexes and SQL aggregation.

The application uses the `sqlite3` Node.js package to communicate with
the SQLite database.

---

## Why use SQL directly?

The database consists of three main entities and the required queries are
relatively simple.

Using SQL directly makes the database behavior visible and easy to reason
about for a take-home project.

It also makes the analytics aggregation query explicit rather than hiding
it behind an ORM abstraction.

---

## Data ownership

The database tables are:

```text
products
   ↓
videos
   ↓
engagement_events
```

Engagement events are the source of truth for analytics.

We intentionally do not store:

```text
views
clicks
conversions
conversion_rate
```

as counters on the `videos` table.

Instead they are calculated from the event data.

This avoids having to keep separate counters synchronized with individual
events.

---

## Why calculate conversion rate in React?

The assignment specifically asks for the conversion rate to be calculated
on the frontend.

The API therefore returns:

```text
views
clicks
conversions
```

and the React application calculates:

```text
conversions / views × 100
```

This keeps the API response focused on the raw aggregated metrics.

---

## Error handling

The backend uses centralized Express error middleware.

Controllers pass unexpected errors using:

```js
next(error)
```

The error middleware then decides what should be returned to the client.

This prevents raw database errors and stack traces from being exposed in
normal API responses.

---

## Logging

The backend uses Pino and pino-http.

Request logging includes useful HTTP information such as:

* method
* path
* response status
* request duration

Application-level events such as successful engagement creation are also
logged.

The project avoids unnecessarily logging complete request payloads.

---

## Database migrations

Database schema changes are stored in numbered SQL files:

```text
001_initial_schema.sql
002_future_change.sql
003_future_change.sql
```

A migration table records migrations that have already been executed.

This allows the database structure to be reproduced consistently.

---

## Seed data

Development seed data is stored separately from migrations.

The seed script creates:

* products
* videos
* engagement events

The seed script captures the generated SQLite IDs rather than assuming
that auto-increment IDs always start at `1`.

This makes the seed process safer to run more than once.

---

## No Tailwind CSS

Tailwind CSS was deliberately not used because the assignment explicitly
requires styling through semantic HTML and modular or regular CSS.

The project therefore uses standard CSS files.

---

## Scaling considerations

The current architecture is intentionally appropriate for the scope of the
take-home.

If the application grew significantly, I would consider:

### Event ingestion

High-volume events could be placed into a queue and processed
asynchronously rather than writing every event synchronously through the
API.

### Database

A production relational database such as PostgreSQL would be more
appropriate for a larger deployment.

### Analytics

For very large event volumes, I would consider pre-aggregated metrics,
background aggregation jobs, caching or an analytics-specific data store.

### Observability

A production system would also require stronger monitoring, metrics,
alerting and distributed tracing.


videoselz/
├── backend/
│   ├── data/
│   │   └── videoselz.db
│   ├── src/
│   │   ├── config/
│   │   │   └── logger.js
│   │   ├── db/
│   │   │   ├── migrations/
│   │   │   │   └── 001_initial_schema.sql
│   │   │   ├── database.js
│   │   │   ├── migrate.js
│   │   │   └── seed.js
│   │   ├── app.js
│   │   └── server.js
│   ├── tests/
│   │   └── database.test.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.test.jsx
│   │   └── testSetup.js
│   ├── jest.config.js
│   └── package.json
│
├── docs/
│   ├── ARCHITECTURAL.md
│   ├── API.md
│   ├── DATABASE.md
│   ├── DEVELOPMENT.md
│   └── TESTING.md
│
├── README.md
├── AI_PROMPTING.md
├── .env.example
├── .gitignore
├── package.json
└── package-lock.json