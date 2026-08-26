const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const databaseFile =
  process.env.NODE_ENV === 'test'
    ? 'videoselz.test.db'
    : 'videoselz.db';

const databasePath = path.join(
  __dirname,
  '../../data',
  databaseFile
);

const db = new sqlite3.Database(databasePath, (error) => {
  if (error) {
    console.error(
      'Failed to connect to SQLite:',
      error.message
    );
    return;
  }

  console.log(`Connected to SQLite database: ${databaseFile}`);
});

db.run('PRAGMA foreign_keys = ON');

module.exports = db;