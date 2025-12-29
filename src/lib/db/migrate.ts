import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

const { Pool } = pg;

console.log('Running migrations...');

const pool = new Pool({
	connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/polls'
});

const db = drizzle(pool);

try {
	await migrate(db, { migrationsFolder: './drizzle' });
	console.log('✅ Migrations completed successfully!');
} catch (err) {
	console.error('❌ Migration failed:', err);
	process.exit(1);
} finally {
	await pool.end();
}
