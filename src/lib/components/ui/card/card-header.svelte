<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLDivAttributes } from "svelte/elements";

	type $$Props = HTMLDivAttributes & {
		class?: string;
	};

	let { class: className, ...restProps }: $$Props = $props();
</script>

<div
	data-slot="card-header"
	class={cn("flex flex-col space-y-1.5 p-6", className)}
	{...restProps}
>
	{@render children?.()}
</div>
