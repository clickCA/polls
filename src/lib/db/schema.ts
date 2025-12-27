import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const polls = sqliteTable('polls', {
	id: text('id').primaryKey(),
	title: text('title').notNull(),
	description: text('description'),
	resultType: text('result_type').notNull().default('TIERLIST'),
	tierLabels: text('tier_labels').notNull().default('["S","A","B","C"]'),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(unixepoch())`)
});

export const options = sqliteTable('options', {
	id: text('id').primaryKey(),
	pollId: text('poll_id')
		.notNull()
		.references(() => polls.id, { onDelete: 'cascade' }),
	text: text('text').notNull(),
	sortOrder: integer('sort_order').notNull()
});

export const votes = sqliteTable('votes', {
	id: text('id').primaryKey(),
	pollId: text('poll_id')
		.notNull()
		.references(() => polls.id, { onDelete: 'cascade' }),
	optionId: text('option_id')
		.notNull()
		.references(() => options.id, { onDelete: 'cascade' }),
	voterHash: text('voter_hash').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(unixepoch())`)
});

export type Poll = typeof polls.$inferSelect;
export type NewPoll = typeof polls.$inferInsert;
export type Option = typeof options.$inferSelect;
export type NewOption = typeof options.$inferInsert;
export type Vote = typeof votes.$inferSelect;
export type NewVote = typeof votes.$inferInsert;
