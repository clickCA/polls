<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { ProgressBar } from '$lib/components/ui/progress-bar';
	import { Check } from 'lucide-svelte';
	import type { Candidate } from '$lib/db';

	type $$Props = {
		candidate: Candidate;
		totalVotes: number;
		hasVoted: boolean;
		isSelected?: boolean;
		showResults?: boolean;
		onVote?: () => void;
	};

	let { candidate, totalVotes, hasVoted, isSelected = false, showResults = false, onVote }: $$Props = $props();

	const percentage = totalVotes > 0 ? Math.round((candidate.votes / totalVotes) * 100) : 0;
</script>

<div
	class="relative p-4 border rounded-lg transition-all {isSelected
		? 'border-slate-900 bg-slate-50 dark:border-slate-50 dark:bg-slate-900'
		: 'border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700'}"
>
	{#if showResults}
		<div class="space-y-3">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-3 flex-1 min-w-0">
					{#if candidate.photo}
						<img
							src={candidate.photo}
							alt={candidate.name}
							class="w-12 h-12 rounded-lg object-cover flex-shrink-0"
						/>
					{/if}
					<div class="flex-1 min-w-0">
						<h3 class="font-semibold text-slate-900 dark:text-slate-100 truncate">{candidate.name}</h3>
						{#if candidate.description}
							<p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-1">{candidate.description}</p>
						{/if}
					</div>
				</div>
				<div class="flex items-center gap-2 flex-shrink-0">
					<span class="text-2xl font-bold text-slate-900 dark:text-slate-100">{percentage}%</span>
					<Badge variant="secondary">{candidate.votes} votes</Badge>
				</div>
			</div>
			<ProgressBar value={candidate.votes} max={totalVotes} />
		</div>
	{:else}
		<button
			onclick={onVote}
			class="w-full text-left flex items-center gap-3"
			disabled={hasVoted}
			class:opacity-50={hasVoted}
		>
			{#if candidate.photo}
				<img
					src={candidate.photo}
					alt={candidate.name}
					class="w-12 h-12 rounded-lg object-cover flex-shrink-0"
				/>
			{/if}
			<div class="flex-1 min-w-0">
				<h3 class="font-semibold text-slate-900 dark:text-slate-100 truncate">{candidate.name}</h3>
				{#if candidate.description}
					<p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-1">{candidate.description}</p>
				{/if}
			</div>
			{#if isSelected}
				<div class="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 text-white dark:bg-slate-50 dark:text-slate-900 flex items-center justify-center">
					<Check size={14} />
				</div>
			{:else}
				<div class="flex-shrink-0 w-6 h-6 rounded-full border-2 border-slate-300 dark:border-slate-700"></div>
			{/if}
		</button>
	{/if}
</div>
