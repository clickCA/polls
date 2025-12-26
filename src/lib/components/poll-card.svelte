<script lang="ts">
	import { goto } from '$app/navigation';
	import { Badge } from '$lib/components/ui/badge';
	import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Calendar, Users } from 'lucide-svelte';
	import type { PollWithCandidates } from '$lib/db';

	type $$Props = {
		poll: PollWithCandidates;
	};

	let { poll }: $$Props = $props();

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	};
</script>

<Card class="hover:shadow-lg transition-shadow cursor-pointer h-full" onclick={() => goto(`/polls/${poll.id}`)}>
	<CardHeader>
		<div class="flex items-start justify-between">
			<div class="flex-1">
				<CardTitle class="text-xl line-clamp-2">{poll.question}</CardTitle>
				<CardDescription class="mt-2 flex items-center gap-4">
					<span class="flex items-center gap-1">
						<Users size={14} />
						{poll.total_votes} {poll.total_votes === 1 ? 'vote' : 'votes'}
					</span>
					<span class="flex items-center gap-1">
						<Calendar size={14} />
						{formatDate(poll.created_at)}
					</span>
				</CardDescription>
			</div>
		</div>
	</CardHeader>

	<CardContent>
		<div class="flex flex-wrap gap-2">
			{#each poll.candidates.slice(0, 4) as candidate}
				<Badge variant="secondary">{candidate.name}</Badge>
			{/each}
			{#if poll.candidates.length > 4}
				<Badge variant="outline">+{poll.candidates.length - 4} more</Badge>
			{/if}
		</div>
	</CardContent>

	<CardFooter>
		<Button class="w-full">Vote Now</Button>
	</CardFooter>
</Card>
