# Database Documentation

## Overview

The application uses SQLite as its relational database.

The database file is stored locally under:

```text
backend/data/videoselz.db
```

The local database files are ignored by Git.

---

## Database Entities

The database contains three main entities:

```text
Products
   1
   |
   | many
   ↓
Videos
   1
   |
   | many
   ↓
EngagementEvents
```

---

## Products

The `products` table stores information about products that can have
shoppable videos.

### Schema

```sql
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### Fields

| Field        | Type     | Description               |
| ------------ | -------- | ------------------------- |
| `id`         | INTEGER  | Primary key               |
| `name`       | TEXT     | Product name              |
| `price`      | REAL     | Product price             |
| `created_at` | DATETIME | Record creation timestamp |

---

## Videos

The `videos` table stores videos associated with products.

### Schema

```sql
CREATE TABLE videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    video_url TEXT NOT NULL,
    title TEXT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
        ON DELETE CASCADE
);
```

### Fields

| Field        | Type    | Description            |
| ------------ | ------- | ---------------------- |
| `id`         | INTEGER | Primary key            |
| `product_id` | INTEGER | References the product |
| `video_url`  | TEXT    | Video URL              |
| `title`      | TEXT    | Video title            |

A product can have multiple videos.

---

## Engagement Events

The `engagement_events` table stores individual interactions with
videos.

### Schema

```sql
CREATE TABLE engagement_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    video_id INTEGER NOT NULL,
    event_type TEXT NOT NULL CHECK (
        event_type IN ('view', 'click', 'add_to_cart')
    ),
    timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (video_id) REFERENCES videos(id)
        ON DELETE CASCADE
);
```

### Fields

| Field        | Type     | Description          |
| ------------ | -------- | -------------------- |
| `id`         | INTEGER  | Primary key          |
| `video_id`   | INTEGER  | References the video |
| `event_type` | TEXT     | Type of interaction  |
| `timestamp`  | DATETIME | Event timestamp      |

### Supported event types

```text
view
click
add_to_cart
```

The database constraint prevents unsupported event types from being
inserted.

---

## Indexes

The following indexes are created:

```sql
CREATE INDEX idx_videos_product_id
    ON videos(product_id);

CREATE INDEX idx_engagement_events_video_id
    ON engagement_events(video_id);

CREATE INDEX idx_engagement_events_type
    ON engagement_events(event_type);

CREATE INDEX idx_engagement_events_timestamp
    ON engagement_events(timestamp);
```

### Why these indexes?

`product_id` is frequently used to relate products to videos.

`video_id` is used when retrieving events for a specific video and during
analytics aggregation.

`event_type` is used when counting views, clicks and conversions.

`timestamp` provides an index for future time-based analytics queries.

---

## Analytics

The database does not store aggregate counters such as:

```text
views
clicks
conversions
conversion_rate
```

These values are calculated from `engagement_events`.

For example:

```sql
COUNT(
    CASE
        WHEN e.event_type = 'view'
        THEN 1
    END
)
```

is used to calculate views.

The same approach is used for clicks and add-to-cart conversions.

---

## Why events are the source of truth

Each interaction is stored as an individual record.

For example:

```text
Video 1
   ├── view
   ├── view
   ├── click
   ├── view
   └── add_to_cart
```

This gives the system a complete event history and allows analytics to be
recalculated when needed.

It also avoids keeping multiple counters synchronized.

---

## Foreign Keys

Foreign keys are enabled when the SQLite connection is created:

```sql
PRAGMA foreign_keys = ON;
```

The relationships are:

```text
products.id
    ↓
videos.product_id

videos.id
    ↓
engagement_events.video_id
```

Both relationships use `ON DELETE CASCADE`.

That means deleting a product also removes its videos and their associated
engagement events.

---

## Migrations

Migrations are stored in:

```text
backend/src/db/migrations/
```

The initial migration is:

```text
001_initial_schema.sql
```

The migration runner maintains a `migrations` table in SQLite to keep track
of migrations that have already been executed.

Run migrations with:

```bash
npm run migrate --workspace=backend
```

---

## Seed Data

Development seed data is created by:

```text
backend/src/db/seed.js
```

Run:

```bash
npm run seed --workspace=backend
```

The seed inserts:

* sample products
* sample videos
* sample engagement events

The seed captures generated SQLite IDs instead of assuming fixed IDs.

This is important because SQLite `AUTOINCREMENT` IDs can change after
records have been deleted and recreated.

---

## Database reset

For a clean local database during development, stop the backend and delete
the local SQLite file:

```powershell
Remove-Item backend\data\videoselz.db
```

Then recreate it:

```powershell
npm run migrate --workspace=backend
npm run seed --workspace=backend
```

This should only be done for local development because deleting the database
removes all stored data.
