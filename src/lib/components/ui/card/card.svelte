<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLDivAttributes } from "svelte/elements";

	type $$Props = HTMLDivAttributes & {
		class?: string;
	};

	let { class: className, ...restProps }: $$Props = $props();
</script>

<div
	data-slot="card"
	class={cn(
		"bg-card text-card-foreground rounded-xl border shadow-xs",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
