<script lang="ts">
	import Poll_card from '$lib/components/poll-card.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Plus } from 'lucide-svelte';
	import type { PageData } from './$types';

	type $$Props = {
		data: PageData;
	};

	let { data }: $$Props = $props();
</script>

<svelte:head>
	<title>All Polls</title>
	<meta name="description" content="Vote in active polls" />
</svelte:head>

<div class="container mx-auto px-4 py-8 max-w-6xl">
	<div class="flex items-center justify-between mb-8">
		<div>
			<h1 class="text-3xl font-bold text-slate-900 dark:text-slate-100">Active Polls</h1>
			<p class="text-slate-600 dark:text-slate-400 mt-1">
				{data.polls.length} {data.polls.length === 1 ? 'poll' : 'polls'} available
			</p>
		</div>
		<Button href="/polls/create" class="gap-2">
			<Plus size={18} />
			Create Poll
		</Button>
	</div>

	{#if data.polls.length === 0}
		<div class="text-center py-12">
			<p class="text-slate-600 dark:text-slate-400 text-lg">No polls available yet.</p>
			<Button href="/polls/create" class="mt-4 gap-2">
				<Plus size={18} />
				Create the first poll
			</Button>
		</div>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each data.polls as poll (poll.id)}
				<Poll_card {poll} />
			{/each}
		</div>
	{/if}
</div>
