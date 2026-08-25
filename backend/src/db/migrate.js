const fs = require('fs');
const path = require('path');
const db = require('./database');

const migrationsPath = path.join(__dirname, 'migrations');

function createMigrationsTable() {
  return new Promise((resolve, reject) => {
    db.run(
      `
        CREATE TABLE IF NOT EXISTS migrations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL UNIQUE,
          executed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `,
      (error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      }
    );
  });
}

function getExecutedMigrations() {
  return new Promise((resolve, reject) => {
    db.all(
      `
        SELECT name
        FROM migrations
        ORDER BY id ASC
      `,
      [],
      (error, rows) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(rows.map((row) => row.name));
      }
    );
  });
}

function runMigration(name, sql) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run('BEGIN TRANSACTION', (beginError) => {
        if (beginError) {
          reject(beginError);
          return;
        }

        db.exec(sql, (migrationError) => {
          if (migrationError) {
            db.run('ROLLBACK', () => {
              reject(migrationError);
            });
            return;
          }

          db.run(
            `
              INSERT INTO migrations (name)
              VALUES (?)
            `,
            [name],
            (insertError) => {
              if (insertError) {
                db.run('ROLLBACK', () => {
                  reject(insertError);
                });
                return;
              }

              db.run('COMMIT', (commitError) => {
                if (commitError) {
                  reject(commitError);
                  return;
                }

                resolve();
              });
            }
          );
        });
      });
    });
  });
}

async function runMigrations() {
  try {
    await createMigrationsTable();

    const executedMigrations = await getExecutedMigrations();

    const migrationFiles = fs
      .readdirSync(migrationsPath)
      .filter((file) => file.endsWith('.sql'))
      .sort();

    for (const migrationFile of migrationFiles) {
      if (executedMigrations.includes(migrationFile)) {
        console.log(`Skipping migration: ${migrationFile}`);
        continue;
      }

      const filePath = path.join(migrationsPath, migrationFile);
      const sql = fs.readFileSync(filePath, 'utf8');

      await runMigration(migrationFile, sql);

      console.log(`Migration completed: ${migrationFile}`);
    }

    console.log('Database migrations completed.');
  } catch (error) {
    console.error('Migration failed:', error.message);
    process.exitCode = 1;
  } finally {
    db.close();
  }
}

runMigrations();