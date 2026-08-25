const db = require('../db/database');

function getAllVideos() {
  return new Promise((resolve, reject) => {
    db.all(
      `
        SELECT
          id,
          product_id,
          video_url,
          title
        FROM videos
        ORDER BY id ASC
      `,
      [],
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

function getVideoById(id) {
  return new Promise((resolve, reject) => {
    db.get(
      `
        SELECT
          id,
          product_id,
          video_url,
          title
        FROM videos
        WHERE id = ?
      `,
      [id],
      (error, row) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(row);
      }
    );
  });
}

function createVideo(productId, videoUrl, title) {
  return new Promise((resolve, reject) => {
    db.run(
      `
        INSERT INTO videos (
          product_id,
          video_url,
          title
        )
        VALUES (?, ?, ?)
      `,
      [productId, videoUrl, title],
      function (error) {
        if (error) {
          reject(error);
          return;
        }

        resolve({
          id: this.lastID,
          productId,
          videoUrl,
          title
        });
      }
    );
  });
}

module.exports = {
  getAllVideos,
  getVideoById,
  createVideo
};