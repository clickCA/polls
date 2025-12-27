import { db } from '$lib/db';
import { polls, options, votes } from '$lib/db/schema';
import { sql, desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Get all polls with vote counts and option counts
	const allPolls = await db
		.select({
			id: polls.id,
			title: polls.title,
			description: polls.description,
			createdAt: polls.createdAt,
			totalVotes: sql<number>`count(distinct ${votes.id})`.as('total_votes'),
			optionsCount: sql<number>`count(distinct ${options.id})`.as('options_count')
		})
		.from(polls)
		.leftJoin(options, sql`${options.pollId} = ${polls.id}`)
		.leftJoin(votes, sql`${votes.pollId} = ${polls.id}`)
		.groupBy(polls.id, polls.title, polls.description, polls.createdAt)
		.orderBy(desc(polls.createdAt));

	return {
		polls: allPolls.map((poll) => ({
			...poll,
			totalVotes: Number(poll.totalVotes) || 0,
			optionsCount: Number(poll.optionsCount) || 0
		}))
	};
};
