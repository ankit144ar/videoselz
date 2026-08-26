# API Documentation

## Overview

The Videoselz application exposes a small REST API for recording video
engagement events and retrieving aggregated video analytics.

The backend runs on:

```text
http://localhost:5000
```

---

## GET /health

Checks whether the backend is running.

### Request

```http
GET /health
```

### Response

HTTP `200`

```json
{
  "status": "ok"
}
```

---

## POST /api/events

Creates a new engagement event for a video.

This endpoint simulates the webhook traffic that would normally come from
a storefront.

### Request

```http
POST /api/events
Content-Type: application/json
```

Example:

```json
{
  "videoId": 1,
  "eventType": "view"
}
```

### Request fields

| Field       | Type   | Required | Description                               |
| ----------- | ------ | -------- | ----------------------------------------- |
| `videoId`   | number | Yes      | ID of the video associated with the event |
| `eventType` | string | Yes      | `view`, `click`, or `add_to_cart`         |
| `timestamp` | string | No       | Optional ISO 8601 timestamp               |

### Supported event types

```text
view
click
add_to_cart
```

### Successful response

HTTP `201`

```json
{
  "data": {
    "id": 21,
    "videoId": 1,
    "eventType": "view",
    "timestamp": null
  }
}
```

When `timestamp` is not supplied, SQLite uses its default timestamp.

### Invalid request

HTTP `400`

```json
{
  "error": "Invalid event payload",
  "details": []
}
```

Examples of invalid requests include:

```json
{
  "videoId": 1,
  "eventType": "invalid"
}
```

or:

```json
{
  "eventType": "view"
}
```

### Video not found

If the referenced video does not exist:

HTTP `404`

```json
{
  "error": "Video not found"
}
```

---

## GET /api/analytics/videos

Returns videos with aggregated engagement metrics.

The aggregation is calculated from the `engagement_events` table.

### Request

```http
GET /api/analytics/videos
```

Pagination can be supplied through query parameters:

```http
GET /api/analytics/videos?page=1&limit=5
```

### Query parameters

| Parameter       | Type   | Required | Default | Description                |
| --------------- | ------ | -------- | ------- | -------------------------- |
| `page`          | number | No       | `1`     | Page number                |
| `limit`         | number | No       | `10`    | Number of records returned |
| `limit` maximum | number | —        | `100`   | Maximum allowed page size  |

### Example response

HTTP `200`

```json
{
  "data": [
    {
      "id": 1,
      "product_id": 1,
      "video_url": "https://example.com/videos/tshirt-styling.mp4",
      "title": "Black T-Shirt Styling",
      "views": 10,
      "clicks": 5,
      "conversions": 2
    },
    {
      "id": 2,
      "product_id": 1,
      "video_url": "https://example.com/videos/tshirt-review.mp4",
      "title": "Black T-Shirt Review",
      "views": 8,
      "clicks": 4,
      "conversions": 2
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total": 10,
    "totalPages": 2
  }
}
```

### Analytics definitions

`views`:

```text
Number of engagement events where event_type = "view"
```

`clicks`:

```text
Number of engagement events where event_type = "click"
```

`conversions`:

```text
Number of engagement events where event_type = "add_to_cart"
```

### Conversion rate

Conversion rate is intentionally **not calculated by the backend**.

The frontend calculates it using:

```text
Conversions / Views × 100
```

For example:

```text
2 conversions / 10 views × 100 = 20%
```

If views are zero, the frontend displays:

```text
0%
```

### Pagination validation

The API rejects invalid pagination values.

For example:

```http
GET /api/analytics/videos?page=0&limit=5
```

returns HTTP `400`.

A page must be greater than or equal to `1`.

The limit must be between `1` and `100`.

---

## Error handling

Unexpected backend errors are handled by centralized Express error
middleware.

A generic unexpected error returns:

HTTP `500`

```json
{
  "error": "Internal server error"
}
```

Database constraint errors are returned without exposing the raw SQLite
error details.

---

## Example workflow

A typical storefront interaction can look like this:

```text
User watches video
        ↓
POST /api/events
        ↓
event stored in SQLite
        ↓
GET /api/analytics/videos
        ↓
frontend receives updated metrics
        ↓
conversion rate calculated in React
```

The "Simulate Traffic" button on the dashboard follows this same flow.
