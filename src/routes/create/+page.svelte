<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Card } from '$lib/components/ui/card';
	import { Plus, X } from 'lucide-svelte';

	let options = $state(['', '']);

	function addOption() {
		options.push('');
	}

	function removeOption(index: number) {
		if (options.length > 2) {
			options = options.filter((_, i) => i !== index);
		}
	}
</script>

<div class="container mx-auto max-w-2xl py-8 px-4">
	<div class="mb-6">
		<h1 class="text-3xl font-bold">Create a Poll</h1>
		<p class="text-muted-foreground mt-2">
			Create a poll and see results in a tierlist format
		</p>
	</div>

	<Card class="p-6">
		<form method="POST" class="space-y-6">
			<div class="space-y-2">
				<label for="title" class="text-sm font-medium">Poll Title</label>
				<Input
					id="title"
					name="title"
					placeholder="Who is the best character?"
					required
				/>
			</div>

			<div class="space-y-2">
				<label for="description" class="text-sm font-medium">
					Description (optional)
				</label>
				<Textarea
					id="description"
					name="description"
					placeholder="Add more details about your poll..."
					rows={3}
				/>
			</div>

			<div class="space-y-3">
				<label class="text-sm font-medium">Options</label>
				{#each options as option, i}
					<div class="flex gap-2">
						<Input
							name="options[]"
							placeholder={`Option ${i + 1}`}
							required
							bind:value={options[i]}
						/>
						{#if options.length > 2}
							<Button
								type="button"
								variant="outline"
								size="icon"
								onclick={() => removeOption(i)}
							>
								<X class="h-4 w-4" />
							</Button>
						{/if}
					</div>
				{/each}

				<Button
					type="button"
					variant="outline"
					class="w-full"
					onclick={addOption}
				>
					<Plus class="h-4 w-4 mr-2" />
					Add Option
				</Button>
			</div>

			<Button type="submit" class="w-full" size="lg">
				Create Poll
			</Button>
		</form>
	</Card>
</div>
