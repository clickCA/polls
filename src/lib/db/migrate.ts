import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

console.log('Running migrations...');

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite);

try {
	migrate(db, { migrationsFolder: './drizzle' });
	console.log('✅ Migrations completed successfully!');
} catch (err) {
	console.error('❌ Migration failed:', err);
	process.exit(1);
} finally {
	sqlite.close();
}
