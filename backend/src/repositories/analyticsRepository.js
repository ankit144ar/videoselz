const db = require('../db/database');

function getVideoAnalytics(limit, offset) {
  return new Promise((resolve, reject) => {
    db.all(
      `
        SELECT
          v.id,
          v.product_id,
          v.video_url,
          v.title,

          COUNT(
            CASE
              WHEN e.event_type = 'view'
              THEN 1
            END
          ) AS views,

          COUNT(
            CASE
              WHEN e.event_type = 'click'
              THEN 1
            END
          ) AS clicks,

          COUNT(
            CASE
              WHEN e.event_type = 'add_to_cart'
              THEN 1
            END
          ) AS conversions

        FROM videos v

        LEFT JOIN engagement_events e
          ON e.video_id = v.id

        GROUP BY
          v.id,
          v.product_id,
          v.video_url,
          v.title

        ORDER BY v.id ASC

        LIMIT ?
        OFFSET ?
      `,
      [limit, offset],
      (error, rows) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(rows);
      }
    );
  });
}

function countVideos() {
  return new Promise((resolve, reject) => {
    db.get(
      `
        SELECT COUNT(*) AS total
        FROM videos
      `,
      [],
      (error, row) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(row.total);
      }
    );
  });
}

module.exports = {
  getVideoAnalytics,
  countVideos
};