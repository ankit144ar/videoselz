const db = require('../db/database');

function getAllProducts() {
  return new Promise((resolve, reject) => {
    db.all(
      `
        SELECT
          id,
          name,
          price,
          created_at
        FROM products
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

function getProductById(id) {
  return new Promise((resolve, reject) => {
    db.get(
      `
        SELECT
          id,
          name,
          price,
          created_at
        FROM products
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

function createProduct(name, price) {
  return new Promise((resolve, reject) => {
    db.run(
      `
        INSERT INTO products (name, price)
        VALUES (?, ?)
      `,
      [name, price],
      function (error) {
        if (error) {
          reject(error);
          return;
        }

        resolve({
          id: this.lastID,
          name,
          price
        });
      }
    );
  });
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct
};