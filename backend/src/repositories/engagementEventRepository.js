const db = require('../db/database');

function createEvent(videoId, eventType, timestamp) {
  return new Promise((resolve, reject) => {
    const query = timestamp
      ? `
          INSERT INTO engagement_events (
            video_id,
            event_type,
            timestamp
          )
          VALUES (?, ?, ?)
        `
      : `
          INSERT INTO engagement_events (
            video_id,
            event_type
          )
          VALUES (?, ?)
        `;

    const params = timestamp
      ? [videoId, eventType, timestamp]
      : [videoId, eventType];

    db.run(query, params, function (error) {
      if (error) {
        reject(error);
        return;
      }

      resolve({
        id: this.lastID,
        videoId,
        eventType,
        timestamp: timestamp || null
      });
    });
  });
}

function getEventsByVideoId(videoId) {
  return new Promise((resolve, reject) => {
    db.all(
      `
        SELECT
          id,
          video_id,
          event_type,
          timestamp
        FROM engagement_events
        WHERE video_id = ?
        ORDER BY timestamp DESC
      `,
      [videoId],
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

module.exports = {
  createEvent,
  getEventsByVideoId
};