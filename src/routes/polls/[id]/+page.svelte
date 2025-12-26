<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import Candidate_vote from '$lib/components/candidate-vote.svelte';
	import { ArrowLeft, Calendar, Users, AlertCircle } from 'lucide-svelte';
	import type { PageData } from './$types';

	type $$Props = {
		data: PageData;
	};

	let { data }: $$Props = $props();

	let selectedCandidateId = $state<string | null>(null);
	let hasVoted = $state(false);
	let showResults = $state(false);
	let votingError = $state<string | null>(null);
	let isSubmitting = $state(false);

	// Generate or retrieve user ID
	let userId = $state('');
	if (browser) {
		userId = localStorage.getItem('userId') || `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
		if (!localStorage.getItem('userId')) {
			localStorage.setItem('userId', userId);
		}

		// Check if already voted
		checkVoteStatus();

		// Set up polling for real-time updates
		const pollInterval = setInterval(async () => {
			try {
				const response = await fetch(`/api/polls/${data.poll.id}`);
				const updatedPoll = await response.json();
				if (updatedPoll.id === data.poll.id) {
					data.poll = updatedPoll;
				}
			} catch (error) {
				console.error('Error polling for updates:', error);
			}
		}, 5000); // Poll every 5 seconds

		// Cleanup on unmount
		return () => clearInterval(pollInterval);
	}

	async function checkVoteStatus() {
		try {
			const response = await fetch(`/api/polls/${data.poll.id}/vote?userId=${userId}`);
			const result = await response.json();
			hasVoted = result.hasVoted;
			showResults = result.hasVoted;
		} catch (error) {
			console.error('Error checking vote status:', error);
		}
	}

	async function castVote() {
		if (!selectedCandidateId || isSubmitting) return;

		isSubmitting = true;
		votingError = null;

		try {
			const response = await fetch(`/api/polls/${data.poll.id}/vote`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ candidateId: selectedCandidateId, userId })
			});

			const result = await response.json();

			if (result.success) {
				hasVoted = true;
				showResults = true;
				// Refresh poll data to get updated vote counts
				window.location.reload();
			} else {
				votingError = result.error || 'Failed to cast vote';
			}
		} catch (error) {
			votingError = 'Network error. Please try again.';
			console.error('Error casting vote:', error);
		} finally {
			isSubmitting = false;
		}
	}

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
	};
</script>

<svelte:head>
	<title>{data.poll.question}</title>
	<meta name="description" content="Vote in this poll" />
</svelte:head>

<div class="container mx-auto px-4 py-8 max-w-3xl">
	<Button href="/polls" variant="ghost" class="mb-6 gap-2">
		<ArrowLeft size={18} />
		Back to Polls
	</Button>

	<Card>
		<CardHeader>
			<div class="flex items-start justify-between">
				<div class="flex-1">
					<CardTitle class="text-2xl">{data.poll.question}</CardTitle>
					<CardDescription class="mt-2 flex items-center gap-4">
						<span class="flex items-center gap-1">
							<Users size={14} />
							{data.poll.total_votes} {data.poll.total_votes === 1 ? 'vote' : 'votes'}
						</span>
						<span class="flex items-center gap-1">
							<Calendar size={14} />
							{formatDate(data.poll.created_at)}
						</span>
					</CardDescription>
				</div>
				{#if showResults}
					<Badge variant="default">Results</Badge>
				{/if}
			</div>
		</CardHeader>

		<CardContent class="space-y-6">
			{#if votingError}
				<div class="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 dark:bg-red-900/20 dark:border-red-800">
					<AlertCircle class="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" size={18} />
					<p class="text-sm text-red-800 dark:text-red-200">{votingError}</p>
				</div>
			{/if}

			{#if showResults}
				<div class="space-y-3">
					{#each data.poll.candidates as candidate}
						<Candidate_vote
							{candidate}
							totalVotes={data.poll.total_votes}
							{hasVoted}
							{showResults}
						/>
					{/each}
				</div>
				<p class="text-sm text-slate-600 dark:text-slate-400 text-center">
					You have already voted in this poll
				</p>
			{:else}
				<div class="space-y-3">
					<p class="text-sm text-slate-600 dark:text-slate-400">
						Select a candidate and cast your vote:
					</p>
					{#each data.poll.candidates as candidate}
						<Candidate_vote
							{candidate}
							totalVotes={data.poll.total_votes}
							{hasVoted}
							isSelected={selectedCandidateId === candidate.id}
							onVote={() => (selectedCandidateId = candidate.id)}
						/>
					{/each}
				</div>

				{#if hasVoted}
					<div class="text-center">
						<p class="text-sm text-slate-600 dark:text-slate-400 mb-4">
							You have already voted in this poll
						</p>
						<Button onclick={() => (showResults = true)} variant="outline" class="w-full">
							View Results
						</Button>
					</div>
				{:else}
					<div class="flex gap-3">
						<Button
							onclick={castVote}
							disabled={!selectedCandidateId || isSubmitting}
							class="flex-1"
						>
							{isSubmitting ? 'Submitting...' : 'Cast Vote'}
						</Button>
						{#if data.poll.total_votes > 0}
							<Button
								onclick={() => (showResults = true)}
								variant="outline"
								class="flex-1"
							>
								View Results
							</Button>
						{/if}
					</div>
				{/if}
			{/if}
		</CardContent>
	</Card>
</div>
