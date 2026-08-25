CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    video_url TEXT NOT NULL,
    title TEXT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS engagement_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    video_id INTEGER NOT NULL,
    event_type TEXT NOT NULL CHECK (
        event_type IN ('view', 'click', 'add_to_cart')
    ),
    timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (video_id) REFERENCES videos(id)
        ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_videos_product_id
    ON videos(product_id);

CREATE INDEX IF NOT EXISTS idx_engagement_events_video_id
    ON engagement_events(video_id);

CREATE INDEX IF NOT EXISTS idx_engagement_events_type
    ON engagement_events(event_type);

CREATE INDEX IF NOT EXISTS idx_engagement_events_timestamp
    ON engagement_events(timestamp);