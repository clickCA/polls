import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const response = await fetch('http://localhost:5173/api/polls');
	const polls = await response.json();

	return {
		polls
	};
};
