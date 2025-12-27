<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let selectedOption = $state('');
</script>

<div class="container mx-auto max-w-2xl py-8 px-4">
	{#if data.alreadyVoted}
		<Card class="p-6 mb-4 bg-blue-50 border-blue-200">
			<p class="text-blue-900">
				You've already voted in this poll! View the results below.
			</p>
		</Card>
	{/if}

	<div class="mb-6">
		<h1 class="text-3xl font-bold">{data.poll.title}</h1>
		{#if data.poll.description}
			<p class="text-muted-foreground mt-2">{data.poll.description}</p>
		{/if}
	</div>

	{#if !data.alreadyVoted}
		<Card class="p-6">
			<form method="POST" class="space-y-6">
				<RadioGroup.Root name="optionId" bind:value={selectedOption}>
					<div class="space-y-3">
						{#each data.options as option}
							<div class="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors">
								<RadioGroup.Item value={option.id} id={option.id} />
								<label
									for={option.id}
									class="flex-1 cursor-pointer text-base font-medium"
								>
									{option.text}
								</label>
							</div>
						{/each}
					</div>
				</RadioGroup.Root>

				<Button type="submit" class="w-full" size="lg" disabled={!selectedOption}>
					Vote
				</Button>
			</form>
		</Card>
	{/if}

	<div class="mt-6">
		<Button href="/poll/{data.poll.id}/dashboard" variant="outline" class="w-full">
			View Dashboard
		</Button>
	</div>
</div>
