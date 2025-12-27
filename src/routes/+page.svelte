<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Plus, BarChart3, Vote } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Polls - Create & Vote in Tierlist Style</title>
	<meta name="description" content="Create polls and see results in tierlist format" />
</svelte:head>

<div class="container mx-auto max-w-5xl py-16 px-4">
	<div class="text-center mb-12">
		<h1 class="text-5xl font-bold mb-4">
			Poll<span class="text-primary">Tier</span>
		</h1>
		<p class="text-xl text-muted-foreground max-w-2xl mx-auto">
			Create polls easily and see results ranked in tierlist style. Simple voting, fun results.
		</p>
	</div>

	<div class="flex justify-center gap-4 mb-16">
		<Button href="/create" size="lg" class="text-lg px-8 py-6">
			<Plus class="mr-2 h-5 w-5" />
			Create Poll
		</Button>
		<Button href="/polls" variant="outline" size="lg" class="text-lg px-8 py-6">
			<BarChart3 class="mr-2 h-5 w-5" />
			Browse Polls
		</Button>
	</div>

	<div class="grid md:grid-cols-3 gap-6">
		<Card class="p-6 text-center">
			<div class="flex justify-center mb-4">
				<div class="p-3 bg-primary/10 rounded-full">
					<Plus class="h-8 w-8 text-primary" />
				</div>
			</div>
			<h3 class="text-xl font-semibold mb-2">Create</h3>
			<p class="text-muted-foreground">
				Create a poll in seconds. Add your question and options.
			</p>
		</Card>

		<Card class="p-6 text-center">
			<div class="flex justify-center mb-4">
				<div class="p-3 bg-primary/10 rounded-full">
					<Vote class="h-8 w-8 text-primary" />
				</div>
			</div>
			<h3 class="text-xl font-semibold mb-2">Vote</h3>
			<p class="text-muted-foreground">
				Share your poll link. Anyone can vote instantly, no signup needed.
			</p>
		</Card>

		<Card class="p-6 text-center">
			<div class="flex justify-center mb-4">
				<div class="p-3 bg-primary/10 rounded-full">
					<BarChart3 class="h-8 w-8 text-primary" />
				</div>
			</div>
			<h3 class="text-xl font-semibold mb-2">See Results</h3>
			<p class="text-muted-foreground">
				Results displayed as a tierlist. S for the best, C for the rest.
			</p>
		</Card>
	</div>

	<div class="mt-16 text-center">
		<div class="inline-block p-6 bg-muted rounded-lg">
			<h2 class="text-2xl font-bold mb-3">How it works</h2>
			<div class="flex items-center gap-4 text-left">
				<div class="flex flex-col gap-2">
					<div class="flex items-center gap-3">
						<Badge class="bg-red-500 text-white">S</Badge>
						<span class="text-sm">Top 20% by votes</span>
					</div>
					<div class="flex items-center gap-3">
						<Badge class="bg-orange-500 text-white">A</Badge>
						<span class="text-sm">Next 30% by votes</span>
					</div>
					<div class="flex items-center gap-3">
						<Badge class="bg-yellow-500 text-black">B</Badge>
						<span class="text-sm">Next 30% by votes</span>
					</div>
					<div class="flex items-center gap-3">
						<Badge class="bg-slate-500 text-white">C</Badge>
						<span class="text-sm">Remaining options</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
