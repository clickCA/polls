<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { ArrowLeft, Plus, X } from 'lucide-svelte';

	let question = $state('');
	let candidates = $state<Array<{ name: string; photo: string; description: string }>>([
		{ name: '', photo: '', description: '' },
		{ name: '', photo: '', description: '' }
	]);
	let isSubmitting = $state(false);
	let errorMessage = $state('');

	function addCandidate() {
		candidates = [...candidates, { name: '', photo: '', description: '' }];
	}

	function removeCandidate(index: number) {
		if (candidates.length > 2) {
			candidates = candidates.filter((_, i) => i !== index);
		}
	}

	function updateCandidate(index: number, field: string, value: string) {
		const newCandidates = [...candidates];
		newCandidates[index] = { ...newCandidates[index], [field]: value };
		candidates = newCandidates;
	}

	async function createPoll() {
		// Validation
		if (!question.trim()) {
			errorMessage = 'Please enter a question';
			return;
		}

		const validCandidates = candidates.filter((c) => c.name.trim());

		if (validCandidates.length < 2) {
			errorMessage = 'Please provide at least 2 candidates with names';
			return;
		}

		isSubmitting = true;
		errorMessage = '';

		try {
			const response = await fetch('/api/polls', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					question: question.trim(),
					candidates: validCandidates.map((c) => ({
						name: c.name.trim(),
						photo: c.photo.trim() || undefined,
						description: c.description.trim() || undefined
					}))
				})
			});

			const result = await response.json();

			if (response.ok) {
				goto(`/polls/${result.id}`);
			} else {
				errorMessage = result.error || 'Failed to create poll';
			}
		} catch (error) {
			errorMessage = 'Network error. Please try again.';
			console.error('Error creating poll:', error);
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>Create Poll</title>
	<meta name="description" content="Create a new poll" />
</svelte:head>

<div class="container mx-auto px-4 py-8 max-w-3xl">
	<Button href="/polls" variant="ghost" class="mb-6 gap-2">
		<ArrowLeft size={18} />
		Back to Polls
	</Button>

	<Card>
		<CardHeader>
			<CardTitle class="text-2xl">Create New Poll</CardTitle>
			<CardDescription>Ask a question and let people vote on their favorite choice</CardDescription>
		</CardHeader>

		<CardContent class="space-y-6">
			{#if errorMessage}
				<div class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200">
					{errorMessage}
				</div>
			{/if}

			<div class="space-y-2">
				<label for="question" class="block text-sm font-medium text-slate-900 dark:text-slate-100">
					Question *
				</label>
				<input
					id="question"
					type="text"
					bind:value={question}
					placeholder="e.g., Who is your favorite developer?"
					class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-slate-100"
				/>
			</div>

			<div class="space-y-4">
				<div class="flex items-center justify-between">
					<label class="block text-sm font-medium text-slate-900 dark:text-slate-100">
						Candidates *
					</label>
					<Button onclick={addCandidate} variant="outline" size="sm" class="gap-2">
						<Plus size={16} />
						Add Candidate
					</Button>
				</div>

				<div class="space-y-4">
					{#each candidates as candidate, index}
						<div class="p-4 border border-slate-200 rounded-lg space-y-3 dark:border-slate-800">
							<div class="flex items-center justify-between">
								<h4 class="font-medium text-slate-900 dark:text-slate-100">Candidate {index + 1}</h4>
								{#if candidates.length > 2}
									<Button
										onclick={() => removeCandidate(index)}
										variant="ghost"
										size="sm"
										class="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
									>
										<X size={16} />
									</Button>
								{/if}
							</div>

							<div class="space-y-2">
								<label
									for="candidate-name-{index}"
									class="block text-sm font-medium text-slate-900 dark:text-slate-100"
								>
									Name *
								</label>
								<input
									id="candidate-name-{index}"
									type="text"
									value={candidate.name}
									oninput={(e) => updateCandidate(index, 'name', e.currentTarget.value)}
									placeholder="Candidate name"
									class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-slate-100"
								/>
							</div>

							<div class="space-y-2">
								<label
									for="candidate-photo-{index}"
									class="block text-sm font-medium text-slate-900 dark:text-slate-100"
								>
									Photo URL
								</label>
								<input
									id="candidate-photo-{index}"
									type="url"
									value={candidate.photo}
									oninput={(e) => updateCandidate(index, 'photo', e.currentTarget.value)}
									placeholder="https://example.com/photo.jpg"
									class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-slate-100"
								/>
							</div>

							<div class="space-y-2">
								<label
									for="candidate-desc-{index}"
									class="block text-sm font-medium text-slate-900 dark:text-slate-100"
								>
									Description
								</label>
								<textarea
									id="candidate-desc-{index}"
									value={candidate.description}
									oninput={(e) => updateCandidate(index, 'description', e.currentTarget.value)}
									placeholder="Optional description"
									rows="2"
									class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-slate-100 resize-none"
								></textarea>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="flex gap-3 pt-4">
				<Button
					onclick={createPoll}
					disabled={isSubmitting}
					class="flex-1"
				>
					{isSubmitting ? 'Creating...' : 'Create Poll'}
				</Button>
				<Button href="/polls" variant="outline" class="flex-1">
					Cancel
				</Button>
			</div>
		</CardContent>
	</Card>
</div>
