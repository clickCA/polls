import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const response = await fetch(`http://localhost:5173/api/polls/${params.id}`);
	if (!response.ok) {
		throw error(404, 'Poll not found');
	}
	const poll = await response.json();

	return {
		poll
	};
};
