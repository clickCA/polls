import { db } from '$lib/db';
import { polls, options } from '$lib/db/schema';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { randomBytes } from 'crypto';

function generateId(): string {
	return randomBytes(8).toString('hex');
}

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const title = formData.get('title') as string;
		const description = formData.get('description') as string;
		const optionTexts = formData.getAll('options[]') as string[];

		// Filter out empty options
		const validOptions = optionTexts.filter((text) => text.trim().length > 0);

		if (!title || validOptions.length < 2) {
			return { error: 'Title and at least 2 options are required' };
		}

		const pollId = generateId();

		// Insert poll
		await db.insert(polls).values({
			id: pollId,
			title: title.trim(),
			description: description?.trim() || null,
			resultType: 'TIERLIST',
			tierLabels: JSON.stringify(['S', 'A', 'B', 'C'])
		});

		// Insert options
		const optionValues = validOptions.map((text, index) => ({
			id: generateId(),
			pollId,
			text: text.trim(),
			sortOrder: index
		}));

		await db.insert(options).values(optionValues);

		throw redirect(303, `/poll/${pollId}`);
	}
};
