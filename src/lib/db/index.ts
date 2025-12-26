export { db, Poll, Candidate, UserVote, PollWithCandidates } from './schema';
export {
	pollQueries,
	candidateQueries,
	voteQueries,
	getPollWithCandidates,
	getAll_pollsWithCandidates,
	castVote,
	createPollWithCandidates
} from './queries';
