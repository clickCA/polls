<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { tierColors } from '$lib/tier';
	import type { PageData } from './$types';
	import { Share2, ArrowLeft } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();

	function copyLink() {
		const url = window.location.origin + `/poll/${data.poll.id}`;
		navigator.clipboard.writeText(url);
	}
</script>

<div class="container mx-auto max-w-4xl py-8 px-4">
	<div class="mb-6 flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold">{data.poll.title}</h1>
			{#if data.poll.description}
				<p class="text-muted-foreground mt-2">{data.poll.description}</p>
			{/if}
			<p class="text-sm text-muted-foreground mt-2">
				Total Votes: {data.totalVotes}
			</p>
		</div>
		<div class="flex gap-2">
			<Button href="/poll/{data.poll.id}" variant="outline" size="icon">
				<ArrowLeft class="h-4 w-4" />
			</Button>
			<Button onclick={copyLink} variant="outline">
				<Share2 class="h-4 w-4 mr-2" />
				Share
			</Button>
		</div>
	</div>

	<div class="space-y-4">
		{#each Object.entries(data.tiers) as [tier, items]}
			<Card class="p-4">
				<div class="flex items-start gap-4">
					<Badge class={`${tierColors[tier]} text-2xl font-bold px-4 py-2 min-w-[60px] justify-center`}>
						{tier}
					</Badge>
					
					<div class="flex-1 space-y-2">
						{#if items.length > 0}
							{#each items as item}
								<div class="rounded-md border p-3 flex justify-between items-center bg-card hover:bg-muted/50 transition-colors">
									<span class="font-medium">{item.text}</span>
									<div class="flex items-center gap-3">
										<span class="text-sm text-muted-foreground">
											{item.votes} vote{item.votes !== 1 ? 's' : ''}
										</span>
										{#if data.totalVotes > 0}
											<span class="text-sm font-medium">
												{Math.round((item.votes / data.totalVotes) * 100)}%
											</span>
										{/if}
									</div>
								</div>
							{/each}
						{:else}
							<div class="text-sm text-muted-foreground italic p-3">
								No items in this tier
							</div>
						{/if}
					</div>
				</div>
			</Card>
		{/each}
	</div>
</div>
