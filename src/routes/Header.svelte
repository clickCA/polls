<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import { Plus, BarChart3 } from 'lucide-svelte';
</script>

<header class="border-b">
	<div class="container mx-auto max-w-7xl px-4">
		<div class="flex h-16 items-center justify-between">
			<div class="flex items-center gap-8">
				<a href="/" class="text-2xl font-bold">
					Poll<span class="text-primary">Tier</span>
				</a>

				<nav class="hidden md:flex items-center gap-6">
					<a
						href="/"
						class="text-sm font-medium transition-colors hover:text-primary"
						class:text-primary={page.url.pathname === '/'}
					>
						Home
					</a>
					<a
						href="/polls"
						class="text-sm font-medium transition-colors hover:text-primary"
						class:text-primary={page.url.pathname === '/polls'}
					>
						Browse Polls
					</a>
				</nav>
			</div>

			<div class="flex items-center gap-2">
				<Button href="/create" size="sm">
					<Plus class="h-4 w-4 mr-2" />
					Create
				</Button>
			</div>
		</div>
	</div>
</header>
