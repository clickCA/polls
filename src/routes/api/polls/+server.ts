import { json } from '@sveltejs/kit';
import { getAll_pollsWithCandidates, createPollWithCandidates } from '$lib/db';

export async function GET() {
	try {
		const polls = getAll_pollsWithCandidates();
		return json(polls);
	} catch (error) {
		console.error('Error fetching polls:', error);
		return json({ error: 'Failed to fetch polls' }, { status: 500 });
	}
}

export async function POST({ request }) {
	try {
		const { question, candidates } = await request.json();

		if (!question || !candidates || candidates.length < 2) {
			return json({ error: 'Question and at least 2 candidates required' }, { status: 400 });
		}

		const pollId = `poll-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

		const candidatesWithIds = candidates.map((candidate: any) => ({
			id: `candidate-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
			...candidate
		}));

		const poll = createPollWithCandidates({ id: pollId, question }, candidatesWithIds);

		return json(poll, { status: 201 });
	} catch (error) {
		console.error('Error creating poll:', error);
		return json({ error: 'Failed to create poll' }, { status: 500 });
	}
}
