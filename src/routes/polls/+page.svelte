<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import type { PageData } from './$types';
	import { BarChart3, Plus, Clock } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();

	function formatDate(date: Date) {
		return new Intl.DateTimeFormat('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		}).format(date);
	}
</script>

<svelte:head>
	<title>All Polls - PollTier</title>
</svelte:head>

<div class="container mx-auto max-w-5xl py-8 px-4">
	<div class="flex items-center justify-between mb-8">
		<div>
			<h1 class="text-4xl font-bold">All Polls</h1>
			<p class="text-muted-foreground mt-2">
				Browse and vote on active polls
			</p>
		</div>
		<Button href="/create" size="lg">
			<Plus class="mr-2 h-5 w-5" />
			Create Poll
		</Button>
	</div>

	{#if data.polls.length === 0}
		<Card class="p-12 text-center">
			<div class="flex flex-col items-center gap-4">
				<div class="p-4 bg-muted rounded-full">
					<BarChart3 class="h-12 w-12 text-muted-foreground" />
				</div>
				<div>
					<h3 class="text-xl font-semibold mb-2">No polls yet</h3>
					<p class="text-muted-foreground mb-4">
						Be the first to create a poll!
					</p>
					<Button href="/create">
						<Plus class="mr-2 h-4 w-4" />
						Create Your First Poll
					</Button>
				</div>
			</div>
		</Card>
	{:else}
		<div class="grid gap-4">
			{#each data.polls as poll}
				<Card class="p-6 hover:shadow-lg transition-shadow">
					<div class="flex items-start justify-between gap-4">
						<div class="flex-1">
							<h3 class="text-xl font-semibold mb-2">
								<a href="/poll/{poll.id}" class="hover:text-primary transition-colors">
									{poll.title}
								</a>
							</h3>
							
							{#if poll.description}
								<p class="text-muted-foreground mb-3 line-clamp-2">
									{poll.description}
								</p>
							{/if}

							<div class="flex items-center gap-4 text-sm text-muted-foreground">
								<div class="flex items-center gap-1">
									<Clock class="h-4 w-4" />
									<span>{formatDate(poll.createdAt)}</span>
								</div>
								<Badge variant="secondary">
									{poll.totalVotes} vote{poll.totalVotes !== 1 ? 's' : ''}
								</Badge>
								<Badge variant="outline">
									{poll.optionsCount} option{poll.optionsCount !== 1 ? 's' : ''}
								</Badge>
							</div>
						</div>

						<div class="flex flex-col gap-2">
							<Button href="/poll/{poll.id}" size="sm">
								Vote
							</Button>
							<Button href="/poll/{poll.id}/dashboard" variant="outline" size="sm">
								<BarChart3 class="h-4 w-4 mr-2" />
								Results
							</Button>
						</div>
					</div>
				</Card>
			{/each}
		</div>
	{/if}
</div>
