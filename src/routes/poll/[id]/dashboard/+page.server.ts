import { db } from '$lib/db';
import { polls, options, votes } from '$lib/db/schema';
import { eq, sql } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import { calculateTiers, type OptionWithVotes } from '$lib/tier';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const pollId = params.id;

	const poll = await db.query.polls.findFirst({
		where: eq(polls.id, pollId)
	});

	if (!poll) {
		throw error(404, 'Poll not found');
	}

	// Get options with vote counts
	const optionsWithVotes = await db
		.select({
			id: options.id,
			text: options.text,
			votes: sql<number>`count(${votes.id})`.as('votes')
		})
		.from(options)
		.leftJoin(votes, eq(votes.optionId, options.id))
		.where(eq(options.pollId, pollId))
		.groupBy(options.id, options.text, options.sortOrder)
		.orderBy(options.sortOrder);

	const optionsData: OptionWithVotes[] = optionsWithVotes.map((opt) => ({
		id: opt.id,
		text: opt.text,
		votes: Number(opt.votes) || 0
	}));

	const tiers = calculateTiers(optionsData);
	const totalVotes = optionsData.reduce((sum, opt) => sum + opt.votes, 0);

	return {
		poll,
		tiers,
		totalVotes
	};
};
