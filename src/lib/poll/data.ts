import type { Poll } from "./types";

export const SAMPLE_POLLS: Poll[] = [
	{
		id: "best-developer-2025",
		question: "Who is the best developer of 2025?",
		candidates: [
			{
				id: "sarah-chen",
				name: "Sarah Chen",
				photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
				description: "Full-stack wizard",
				votes: 0,
			},
			{
				id: "marcus-johnson",
				name: "Marcus Johnson",
				photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
				description: "Frontend specialist",
				votes: 0,
			},
			{
				id: "elena-rodriguez",
				name: "Elena Rodriguez",
				photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
				description: "Backend expert",
				votes: 0,
			},
			{
				id: "david-kim",
				name: "David Kim",
				photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
				description: "DevOps engineer",
				votes: 0,
			},
		],
		totalVotes: 0,
	},
	{
		id: "favorite-designer",
		question: "Who's your favorite designer?",
		candidates: [
			{
				id: "alex-morgan",
				name: "Alex Morgan",
				photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
				description: "UX/UI designer",
				votes: 0,
			},
			{
				id: "jordan-lee",
				name: "Jordan Lee",
				photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
				description: "Graphic designer",
				votes: 0,
			},
			{
				id: "taylor-patel",
				name: "Taylor Patel",
				photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
				description: "Product designer",
				votes: 0,
			},
		],
		totalVotes: 0,
	},
];
