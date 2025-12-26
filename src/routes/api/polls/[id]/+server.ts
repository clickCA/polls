import { json } from '@sveltejs/kit';
import { getPollWithCandidates, pollQueries } from '$lib/db';

export async function GET({ params }) {
	try {
		const poll = getPollWithCandidates(params.id);
		if (!poll) {
			return json({ error: 'Poll not found' }, { status: 404 });
		}
		return json(poll);
	} catch (error) {
		console.error('Error fetching poll:', error);
		return json({ error: 'Failed to fetch poll' }, { status: 500 });
	}
}

export async function DELETE({ params }) {
	try {
		pollQueries.delete(params.id);
		return json({ success: true });
	} catch (error) {
		console.error('Error deleting poll:', error);
		return json({ error: 'Failed to delete poll' }, { status: 500 });
	}
}
