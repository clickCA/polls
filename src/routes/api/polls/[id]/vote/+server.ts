import { json } from '@sveltejs/kit';
import { castVote, voteQueries } from '$lib/db';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ params, request }) => {
	try {
		const { candidateId, userId } = await request.json();

		if (!candidateId || !userId) {
			return json({ error: 'Candidate ID and User ID required' }, { status: 400 });
		}

		const result = castVote(params.id, candidateId, userId);

		if (!result.success) {
			return json(result, { status: 400 });
		}

		return json({ success: true, message: 'Vote cast successfully' });
	} catch (error) {
		console.error('Error casting vote:', error);
		return json({ error: 'Failed to cast vote' }, { status: 500 });
	}
};

export const GET: RequestHandler = async ({ params, url }) => {
	try {
		const userId = url.searchParams.get('userId');

		if (!userId) {
			return json({ error: 'User ID required' }, { status: 400 });
		}

		const hasVoted = voteQueries.hasVoted(params.id, userId);
		return json({ hasVoted });
	} catch (error) {
		console.error('Error checking vote status:', error);
		return json({ error: 'Failed to check vote status' }, { status: 500 });
	}
};
