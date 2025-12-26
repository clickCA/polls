import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Ensure database directory exists
const dbDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dbDir)) {
	fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'polls.db');

// Initialize database
export const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create tables
db.exec(`
	CREATE TABLE IF NOT EXISTS polls (
		id TEXT PRIMARY KEY,
		question TEXT NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);

	CREATE TABLE IF NOT EXISTS candidates (
		id TEXT PRIMARY KEY,
		poll_id TEXT NOT NULL,
		name TEXT NOT NULL,
		photo TEXT,
		description TEXT,
		votes INTEGER DEFAULT 0,
		FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE CASCADE
	);

	CREATE TABLE IF NOT EXISTS user_votes (
		id TEXT PRIMARY KEY,
		poll_id TEXT NOT NULL,
		candidate_id TEXT NOT NULL,
		user_id TEXT NOT NULL,
		voted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE CASCADE,
		FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE,
		UNIQUE(poll_id, user_id)
	);

	CREATE INDEX IF NOT EXISTS idx_candidates_poll_id ON candidates(poll_id);
	CREATE INDEX IF NOT EXISTS idx_user_votes_poll_id ON user_votes(poll_id);
	CREATE INDEX IF NOT EXISTS idx_user_votes_user_id ON user_votes(user_id);
`);

// Database interface
export interface Poll {
	id: string;
	question: string;
	created_at: string;
	updated_at: string;
}

export interface Candidate {
	id: string;
	poll_id: string;
	name: string;
	photo: string | null;
	description: string | null;
	votes: number;
}

export interface UserVote {
	id: string;
	poll_id: string;
	candidate_id: string;
	user_id: string;
	voted_at: string;
}

export interface PollWithCandidates extends Poll {
	candidates: Candidate[];
	total_votes: number;
}
