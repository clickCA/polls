export interface Candidate {
	id: string;
	name: string;
	photo: string;
	description?: string;
	votes: number;
}

export interface Poll {
	id: string;
	question: string;
	candidates: Candidate[];
	totalVotes: number;
}

export type PollData = Record<string, Poll>;
