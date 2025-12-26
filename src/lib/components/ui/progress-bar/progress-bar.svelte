<script lang="ts">
	import { cn } from '$lib/utils';

	type $$Props = {
		value: number;
		max?: number;
		class?: string;
	};

	export let value: $$Props['value'];
	export let max: $$Props['max'] = 100;
	let { class: className = '' }: $$Props = $props();

	const percentage = Math.min((value / max) * 100, 100);
</script>

<div class={cn('w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800', className)}>
	<div
		class="h-full rounded-full bg-slate-900 transition-all duration-500 ease-out dark:bg-slate-50"
		style="width: {percentage}%"
	></div>
</div>
