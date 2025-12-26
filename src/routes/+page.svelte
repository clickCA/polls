<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ArrowRight, BarChart3 } from 'lucide-svelte';
</script>

<svelte:head>
	<title>VoteHub - Community Polls</title>
	<meta name="description" content="Create and vote on community polls" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<BarChart3 size={200} />
		</span>

		VoteHub
	</h1>

	<h2>Create polls, share opinions, and see real-time results</h2>

	<div class="actions">
		<Button href="/polls" size="lg" class="gap-2">
			View Polls
			<ArrowRight size={18} />
		</Button>
		<Button href="/polls/create" variant="outline" size="lg">Create Poll</Button>
	</div>
</section>

<style>
section {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex: 0.6;
}

h1 {
	width: 100%;
}

.welcome {
	display: flex;
	justify-content: center;
	align-items: center;
	color: var(--color-theme-1);
	margin-bottom: 2rem;
}

.actions {
	display: flex;
	gap: 1rem;
	margin-top: 2rem;
}
</style>
