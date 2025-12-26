<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLDivAttributes } from "svelte/elements";

	type $$Props = HTMLDivAttributes & {
		class?: string;
	};

	let { class: className, ...restProps }: $$Props = $props();
</script>

<div data-slot="card-content" class={cn("p-6 pt-0", className)} {...restProps}>
	{@render children?.()}
</div>
