const fs = require('fs');
const path = require('path');
const db = require('./database');

const migrationsPath = path.join(__dirname, 'migrations');

const migrationFiles = fs
  .readdirSync(migrationsPath)
  .filter((file) => file.endsWith('.sql'))
  .sort();

function runMigrations() {
  db.serialize(() => {
    migrationFiles.forEach((file) => {
      const filePath = path.join(migrationsPath, file);
      const sql = fs.readFileSync(filePath, 'utf-8');

      db.exec(sql, (error) => {
        if (error) {
          console.error(`Migration failed: ${file}`);
          console.error(error.message);
          process.exit(1);
        }

        console.log(`Migration completed: ${file}`);
      });
    });
  });
}

runMigrations();