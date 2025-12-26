import { createPollWithCandidates } from '../src/lib/db';

const samplePolls = [
	{
		question: 'Who is your favorite TypeScript developer?',
		candidates: [
			{
				name: 'Daniel Rosenwasser',
				photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
				description: 'TypeScript Program Manager at Microsoft'
			},
			{
				name: 'Matt Pocock',
				photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
				description: 'TypeScript educator and TotalTypeScript founder'
			},
			{
				name: 'Ryan Cavanaugh',
				photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
				description: 'TypeScript engineering lead'
			}
		]
	},
	{
		question: 'Which frontend framework do you prefer?',
		candidates: [
			{
				name: 'Svelte',
				photo: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&h=200&fit=crop',
				description: 'Cybernetically enhanced web apps'
			},
			{
				name: 'React',
				photo: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=200&fit=crop',
				description: 'A JavaScript library for building UIs'
			},
			{
				name: 'Vue.js',
				photo: 'https://images.unsplash.com/photo-1618788372246-79faff0c3742?w=200&h=200&fit=crop',
				description: 'The Progressive JavaScript Framework'
			},
			{
				name: 'Angular',
				photo: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=200&h=200&fit=crop',
				description: 'The modern web developer\'s platform'
			}
		]
	},
	{
		question: 'What is your favorite programming language?',
		candidates: [
			{
				name: 'TypeScript',
				photo: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=200&h=200&fit=crop',
				description: 'JavaScript with syntax for types'
			},
			{
				name: 'Rust',
				photo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=200&fit=crop',
				description: 'Performance, reliability, productivity'
			},
			{
				name: 'Python',
				photo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200&h=200&fit=crop',
				description: 'Beautiful is better than ugly'
			},
			{
				name: 'Go',
				photo: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=200&h=200&fit=crop',
				description: 'Fast, simple, and efficient'
			}
		]
	}
];

samplePolls.forEach((pollData) => {
	const pollId = `poll-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

	const candidatesWithIds = pollData.candidates.map((candidate) => ({
		id: `candidate-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
		...candidate
	}));

	createPollWithCandidates({ id: pollId, question: pollData.question }, candidatesWithIds);
	console.log(`Created poll: ${pollData.question}`);
});

console.log('Database seeded successfully!');
