import { db, Poll, Candidate, UserVote, PollWithCandidates } from './schema';

// Poll operations
export const pollQueries = {
	getAll: (): Poll[] => {
		const stmt = db.prepare('SELECT * FROM polls ORDER BY created_at DESC');
		return stmt.all() as Poll[];
	},

	getById: (id: string): Poll | null => {
		const stmt = db.prepare('SELECT * FROM polls WHERE id = ?');
		return stmt.get(id) as Poll | null;
	},

	create: (poll: { id: string; question: string }): Poll => {
		const stmt = db.prepare('INSERT INTO polls (id, question) VALUES (?, ?)');
		stmt.run(poll.id, poll.question);
		return pollQueries.getById(poll.id)!;
	},

	update: (id: string, question: string): Poll | null => {
		const stmt = db.prepare('UPDATE polls SET question = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
		stmt.run(question, id);
		return pollQueries.getById(id);
	},

	delete: (id: string): void => {
		const stmt = db.prepare('DELETE FROM polls WHERE id = ?');
		stmt.run(id);
	}
};

// Candidate operations
export const candidateQueries = {
	getByPollId: (pollId: string): Candidate[] => {
		const stmt = db.prepare('SELECT * FROM candidates WHERE poll_id = ? ORDER BY votes DESC');
		return stmt.all(pollId) as Candidate[];
	},

	create: (candidate: {
		id: string;
		poll_id: string;
		name: string;
		photo?: string;
		description?: string;
	}): Candidate => {
		const stmt = db.prepare(
			'INSERT INTO candidates (id, poll_id, name, photo, description) VALUES (?, ?, ?, ?, ?)'
		);
		stmt.run(candidate.id, candidate.poll_id, candidate.name, candidate.photo || null, candidate.description || null);
		return candidateQueries.getById(candidate.id)!;
	},

	getById: (id: string): Candidate | null => {
		const stmt = db.prepare('SELECT * FROM candidates WHERE id = ?');
		return stmt.get(id) as Candidate | null;
	},

	updateVotes: (id: string, votes: number): Candidate | null => {
		const stmt = db.prepare('UPDATE candidates SET votes = ? WHERE id = ?');
		stmt.run(votes, id);
		return candidateQueries.getById(id);
	},

	delete: (id: string): void => {
		const stmt = db.prepare('DELETE FROM candidates WHERE id = ?');
		stmt.run(id);
	}
};

// User vote operations
export const voteQueries = {
	hasVoted: (pollId: string, userId: string): boolean => {
		const stmt = db.prepare('SELECT 1 FROM user_votes WHERE poll_id = ? AND user_id = ?');
		return stmt.get(pollId, userId) !== undefined;
	},

	create: (vote: { id: string; poll_id: string; candidate_id: string; user_id: string }): UserVote => {
		const stmt = db.prepare(
			'INSERT INTO user_votes (id, poll_id, candidate_id, user_id) VALUES (?, ?, ?, ?)'
		);
		stmt.run(vote.id, vote.poll_id, vote.candidate_id, vote.user_id);
		return vote;
	},

	getByPollId: (pollId: string): UserVote[] => {
		const stmt = db.prepare('SELECT * FROM user_votes WHERE poll_id = ?');
		return stmt.all(pollId) as UserVote[];
	},

	getCandidateVotes: (candidateId: string): number => {
		const stmt = db.prepare('SELECT COUNT(*) as count FROM user_votes WHERE candidate_id = ?');
		const result = stmt.get(candidateId) as { count: number };
		return result.count;
	}
};

// Combined queries
export const getPollWithCandidates = (pollId: string): PollWithCandidates | null => {
	const poll = pollQueries.getById(pollId);
	if (!poll) return null;

	const candidates = candidateQueries.getByPollId(pollId);
	const total_votes = candidates.reduce((sum, c) => sum + c.votes, 0);

	return {
		...poll,
		candidates,
		total_votes
	};
};

export const getAll_pollsWithCandidates = (): PollWithCandidates[] => {
	const polls = pollQueries.getAll();
	return polls.map((poll) => {
		const candidates = candidateQueries.getByPollId(poll.id);
		const total_votes = candidates.reduce((sum, c) => sum + c.votes, 0);
		return {
			...poll,
			candidates,
			total_votes
		};
	});
};

export const castVote = (pollId: string, candidateId: string, userId: string): { success: boolean; error?: string } => {
	// Check if already voted
	if (voteQueries.hasVoted(pollId, userId)) {
		return { success: false, error: 'You have already voted in this poll' };
	}

	// Verify candidate exists
	const candidate = candidateQueries.getById(candidateId);
	if (!candidate || candidate.poll_id !== pollId) {
		return { success: false, error: 'Invalid candidate' };
	}

	// Create vote record
	const voteId = `vote-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
	voteQueries.create({
		id: voteId,
		poll_id: pollId,
		candidate_id: candidateId,
		user_id: userId
	});

	// Update candidate vote count
	const currentVotes = voteQueries.getCandidateVotes(candidateId);
	candidateQueries.updateVotes(candidateId, currentVotes);

	return { success: true };
};

export const createPollWithCandidates = (
	poll: { id: string; question: string },
	candidates: Array<{ id: string; name: string; photo?: string; description?: string }>
): PollWithCandidates => {
	pollQueries.create(poll);

	candidates.forEach((candidate) => {
		candidateQueries.create({
			...candidate,
			poll_id: poll.id
		});
	});

	return getPollWithCandidates(poll.id)!;
};
