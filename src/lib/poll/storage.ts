import type { Poll } from "./types";

const STORAGE_KEY = "polls";

export function loadPolls(): Record<string, Poll> {
	if (typeof localStorage === "undefined") return {};

	const data = localStorage.getItem(STORAGE_KEY);
	if (!data) return {};

	try {
		return JSON.parse(data);
	} catch {
		return {};
	}
}

export function savePolls(polls: Record<string, Poll>): void {
	if (typeof localStorage === "undefined") return;

	localStorage.setItem(STORAGE_KEY, JSON.stringify(polls));
}

export function getPoll(pollId: string): Poll | undefined {
	const polls = loadPolls();
	return polls[pollId];
}

export function vote(pollId: string, candidateId: string): Poll | null {
	const polls = loadPolls();
	const poll = polls[pollId];

	if (!poll) return null;

	// Check if already voted
	const hasVoted = localStorage.getItem(`voted-${pollId}`);
	if (hasVoted) return null;

	// Add vote
	const candidate = poll.candidates.find((c) => c.id === candidateId);
	if (!candidate) return null;

	candidate.votes += 1;
	poll.totalVotes += 1;

	// Save updated polls
	polls[pollId] = poll;
	savePolls(polls);

	// Mark as voted
	localStorage.setItem(`voted-${pollId}`, "true");

	return poll;
}

export function hasVoted(pollId: string): boolean {
	if (typeof localStorage === "undefined") return false;
	return localStorage.getItem(`voted-${pollId}`) === "true";
}

export function initializePolls(polls: Poll[]): void {
	const existing = loadPolls();

	// Only initialize if empty
	if (Object.keys(existing).length === 0) {
		const pollsMap: Record<string, Poll> = {};
		polls.forEach((poll) => {
			pollsMap[poll.id] = poll;
		});
		savePolls(pollsMap);
	}
}
