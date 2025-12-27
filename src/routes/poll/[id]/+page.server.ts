import { db } from '$lib/db';
import { polls, options, votes } from '$lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { error, redirect } from '@sveltejs/kit';
import { createVoterHash } from '$lib/hash';
import type { Actions, PageServerLoad } from './$types';
import { randomBytes } from 'crypto';

function generateId(): string {
	return randomBytes(8).toString('hex');
}

export const load: PageServerLoad = async ({ params, request, getClientAddress }) => {
	const pollId = params.id;

	const poll = await db.query.polls.findFirst({
		where: eq(polls.id, pollId)
	});

	if (!poll) {
		throw error(404, 'Poll not found');
	}

	const pollOptions = await db.query.options.findMany({
		where: eq(options.pollId, pollId),
		orderBy: (options, { asc }) => [asc(options.sortOrder)]
	});

	// Check if user already voted
	const userAgent = request.headers.get('user-agent') || '';
	const ip = getClientAddress();
	const voterHash = await createVoterHash(ip, userAgent, pollId);

	const existingVote = await db.query.votes.findFirst({
		where: and(eq(votes.pollId, pollId), eq(votes.voterHash, voterHash))
	});

	return {
		poll,
		options: pollOptions,
		alreadyVoted: !!existingVote
	};
};

export const actions: Actions = {
	default: async ({ request, params, getClientAddress }) => {
		const formData = await request.formData();
		const optionId = formData.get('optionId') as string;
		const pollId = params.id;

		if (!optionId) {
			return { error: 'Please select an option' };
		}

		// Create voter hash
		const userAgent = request.headers.get('user-agent') || '';
		const ip = getClientAddress();
		const voterHash = await createVoterHash(ip, userAgent, pollId);

		// Check if already voted
		const existingVote = await db.query.votes.findFirst({
			where: and(eq(votes.pollId, pollId), eq(votes.voterHash, voterHash))
		});

		if (existingVote) {
			return { error: 'You have already voted in this poll' };
		}

		// Insert vote
		await db.insert(votes).values({
			id: generateId(),
			pollId,
			optionId,
			voterHash
		});

		throw redirect(303, `/poll/${pollId}/dashboard`);
	}
};
